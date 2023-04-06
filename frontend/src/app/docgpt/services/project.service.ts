import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  concat,
  concatMap,
  flatMap,
  switchMap,
  tap
} from 'rxjs';
import { Project } from '../api/project';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../api/chat';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url = 'http://localhost:3000/doc-gpt/projects';

  private _$projectList = new BehaviorSubject<Array<Project>>([]);
  private currentProjectId: number | undefined;
  private $currentProject = new BehaviorSubject<Project | undefined>(undefined);

  constructor(
    private httpClient: HttpClient,
    private navigationService: NavigationService
  ) {
    // On initialise la liste des projets du user
    this.refreshProjectList().subscribe((p) => this._$projectList.next(p));
    // On écoute la navigation pour déterminer si on a chargé un nouveau projet
    // Si c'est le cas, on update le currentProject directement depuis le back
    this.navigationService.onNavigationChange().subscribe((v) => {
      console.log('on navigation change called', v);
      if (this.currentProjectId !== v[0]) {
        this.currentProjectId = v[0];
        if (v[0])
          this.getProjectById(v[0]).subscribe((p) => {
            this.$currentProject.next(p);
            console.log('Projet chargé', this.$currentProject);
          });
      }
    });
  }

  public onProjectListChange(): Observable<Project[]> {
    return this._$projectList.asObservable();
  }

  public onCurrentProjectchange(): Observable<Project | undefined> {
    return this.$currentProject.asObservable();
  }

  public getProjectById(projectId: number): Observable<Project> {
    return this.httpClient.get<Project>(`${this.url}/${projectId}`);
  }

  /**
   * OLD
   */

  public getProjectList(): Observable<Array<Project>> {
    return this._$projectList.asObservable();
  }

  public refreshProjectList(): Observable<Array<Project>> {
    return this.httpClient.get<Array<Project>>(this.url);
  }

  public updateProjectList(projects: Project[]): void {
    return this._$projectList.next(projects);
  }

  public deleteProject(project: Project): Observable<Project[]> {
    return this.httpClient.delete<Project[]>(`${this.url}/${project.id}`).pipe(
      tap((p: Project[]) => {
        this._$projectList.next(p);
      })
    );
  }

  public createNewProject(name: string): Observable<Project[]> {
    return this.httpClient
      .post<Project[]>(this.url, { name: name })
      .pipe(tap((p: Project[]) => this._$projectList.next(p)));
  }

  public getCurrentProject(): Observable<Project | undefined> {
    return this.$currentProject.asObservable();
  }
  public setCurrentProject(project: Project): void {
    return this.$currentProject.next(project);
  }
}
