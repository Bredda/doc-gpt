import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth/services/auth.service';
import { DialogService } from 'primeng/dynamicdialog';
import { SettingsComponent } from './settings.component';
@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  providers: [DialogService]
})
export class MenuBarComponent {
  darkIcon = 'pi pi-moon';
  lightIcon = 'pi pi-sun';
  actualIcon = 'pi pi-sun';
  dark = false;
  items: MenuItem[] = [
    {
      label: 'Paramètres',
      icon: 'pi pi-cog',
      command: () => {
        this.openSettings();
      }
    },
    {
      label: 'Déconnexion',
      icon: 'pi pi-refresh',
      command: () => {
        this.signout();
      }
    }
  ];
  constructor(private auth: AuthService, public dialogService: DialogService) {}

  signout() {
    this.auth.signout();
  }

  openSettings() {
    this.dialogService.open(SettingsComponent, {
      header: 'Paramètres',
      width: '70%',
      baseZIndex: 10000
    });
  }
}
