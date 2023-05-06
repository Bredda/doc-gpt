import { Component, OnInit } from '@angular/core';
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

  toggleTheme() {
    this.settingsService.toggleTheme();
  }

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((s) => (this.settings = s));
  }

  toggleDebug() {
    this.settingsService.toggleDebug();
  }
}
