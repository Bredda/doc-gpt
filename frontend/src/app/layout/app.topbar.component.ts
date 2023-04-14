import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth/services/auth.service';
import { ThemeService } from '../shared/theme.service';
import { ContextService } from '../docgpt/services/context.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  styleUrls: ['./app.topbar.component.scss']
})
export class AppTopbarComponent implements OnInit, OnDestroy {
  darkIcon = 'pi pi-moon';
  lightIcon = 'pi pi-sun';
  actualIcon = 'pi pi-sun';
  dark = false;
  items: MenuItem[] = [
    {
      label: 'Paramètres',
      icon: 'pi pi-cog'
    },
    {
      label: 'Déconnexion',
      icon: 'pi pi-refresh',
      command: () => {
        this.signout();
      }
    }
  ];

  projectName: string | undefined;
  chatName: string | undefined;
  listenToDataChange!: Subscription;
  constructor(
    private auth: AuthService,
    private themeService: ThemeService,
    private contexteService: ContextService
  ) {}

  ngOnInit(): void {
    this.listenToDataChange = this.contexteService
      .listenToDataChange()
      .subscribe((v) => {
        this.projectName = v[1] !== undefined ? v[1].name : undefined;
        this.chatName = v[2] !== undefined ? v[2].name : undefined;
      });
  }

  ngOnDestroy(): void {
    this.listenToDataChange.unsubscribe();
  }

  signout() {
    this.auth.signout();
  }

  toggleTheme() {
    this.dark = !this.dark;
    this.actualIcon = this.dark ? this.darkIcon : this.lightIcon;
    this.themeService.switchTheme(
      this.dark ? 'lara-dark-blue' : 'lara-light-blue'
    );
  }
}
