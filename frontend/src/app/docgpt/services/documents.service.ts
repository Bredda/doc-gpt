import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  url = `${environment.API_URL}/doc-gpt/projects`;
  public documents = new BehaviorSubject<Array<any>>([]);

  constructor(private httpClient: HttpClient) {}

  public getProjectDocuments(projectId: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}/${projectId}/documents`);
  }

  public triggerContextRefresh(projectId: string): void {
    this.getProjectDocuments(projectId).subscribe((c) =>
      this.documents.next(c)
    );
  }

  public uploadFiles(projectId: string | undefined, files: Array<File>): void {
    if (projectId !== undefined) {
      files.map((f) => {
        const formData = new FormData();
        formData.append('file', f);
        this.httpClient
          .post<any[]>(`${this.url}/${projectId}/documents`, formData)
          .subscribe((d) => this.documents.next(d));
      });
    }
  }

  public deleteFile(projectId: string, docId: string): Observable<any> {
    return this.httpClient
      .delete<any[]>(`${this.url}/${projectId}/documents/${docId}`)
      .pipe(tap((d) => this.documents.next(d)));
  }

  public getCurrentProjectContext(): Observable<any[]> {
    return this.documents.asObservable();
  }

  public getUploadedDocContent(
    projectId: string,
    docId: string
  ): Observable<any> {
    return this.httpClient.get(`${this.url}/${projectId}/documents/${docId}`, {
      responseType: 'text'
    });
  }

  public getUploadedDocUrl(projectId: string, docId: string) {
    return `${this.url}/${projectId}/documents/${docId}`;
  }

  public uploadFile(
    projectId: string | undefined,
    file: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename_as_doc_id', 'true');
    return this.httpClient
      .post<any[]>(`${this.url}/${projectId}/documents`, formData)
      .pipe(tap((docs: any[]) => this.documents.next(docs)));
  }
}
