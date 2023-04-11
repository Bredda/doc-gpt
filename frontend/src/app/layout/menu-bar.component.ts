import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth/services/auth.service';
import { ContextService } from '../docgpt/services/context.service';
import { ThemeService } from '../shared/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
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
