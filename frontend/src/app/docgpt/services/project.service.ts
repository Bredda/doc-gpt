import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from '../api/project';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url = `${environment.API_URL}/doc-gpt/projects`;
  public currentProject = new BehaviorSubject<Project | undefined>(undefined);

  public currentProjecChatList = new BehaviorSubject<Project[]>([]);
  constructor(private httpClient: HttpClient) {}

  public getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.url);
  }
  public deleteProject(project: Project): Observable<Project[]> {
    return this.httpClient.delete<Project[]>(`${this.url}/${project.id}`);
  }
  public createNewProject(name: string): Observable<Project[]> {
    return this.httpClient.post<Project[]>(this.url, { name: name });
  }
  public updateProjectList(project: Project[]) {
    this.currentProjecChatList.next(project);
  }
  public renameProject(projectId: string,name:string): Observable<Project[]> {
    return this.httpClient.put<Project[]>(`${this.url}/${projectId}`, { name: name });
  }
}
