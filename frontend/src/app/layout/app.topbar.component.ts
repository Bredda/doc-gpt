import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth/services/auth.service';
import { ThemeService } from '../shared/theme.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  styleUrls: ['./app.topbar.component.scss']
})
export class AppTopbarComponent {
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

  constructor(private auth: AuthService, private themeService: ThemeService) {}

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
