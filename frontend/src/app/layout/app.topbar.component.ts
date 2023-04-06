import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../auth/services/auth.service';
import { ProjectService } from '../docgpt/services/project.service';
import { Project } from '../docgpt/api/project';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  styleUrls: ['./app.topbar.component.scss']
})
export class AppTopbarComponent implements OnInit {
  cities: City[] = [];
  items: MenuItem[] = [
    {
      label: 'Settings',
      icon: 'pi pi-refresh',
      command: () => {
        this.update();
      }
    },
    {
      label: 'Se déconnecter',
      icon: 'pi pi-refresh',
      command: () => {
        this.signout();
      }
    }
  ];

  projects: Project[] = [];
  selectedCity!: City;

  constructor(private auth: AuthService, private prjService: ProjectService) {}

  ngOnInit() {
    this.prjService
      .getProjectList()
      .subscribe((prjs) => (this.projects = prjs));
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  update(): void {}

  signout() {
    this.auth.signout();
  }
}
