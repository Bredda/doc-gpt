import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  url = `http://localhost:3000/doc-gpt/projects`
  private $context  = new BehaviorSubject<Array<any>>([])
  
  constructor(private httpClient: HttpClient) {}

   public getProjectContext(projectId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}/${projectId}/context`)    
   }

   public listenCurrentProjectContext(): Observable<any[]> {
    return this.$context.asObservable()
   }

   public triggerContextRefresh(projectId: number): void {
    this.getProjectContext(projectId).subscribe(c => this.$context.next(c))
   }

  public uploadFiles(projectId: number |undefined, files: Array<File>): void{
    if (projectId!== undefined) {
      files.map((f) => {
        const formData = new FormData();
        formData.append('file', f);
        this.httpClient.post(`${this.url}/${projectId}/context`, formData).subscribe(() => this.triggerContextRefresh(projectId))
      })
    }

  }

  public getCurrentProjectContext(): Observable<any[]> {
    return this.$context.asObservable()
   }

  public uploadFile(file: File):Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename_as_doc_id', 'true');
    return this.httpClient.post(this.url, formData)
  }

 
 
}
