import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../shared/theme.service';
import { DebugService } from '../shared/debug.service';
import { LocalStorageService } from '../shared/local-storage.service';
import { SettingsService } from '../shared/settings.service';
import { UserSettings } from '../docgpt/api/user-settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings!: UserSettings;
  constructor(private settingsService: SettingsService) {}

  toggleTheme(event: any) {
    this.settingsService.toggleTheme();
  }

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((s) => (this.settings = s));
  }

  toggleDebug(event: any) {
    this.settingsService.toggleDebug();
  }
}
