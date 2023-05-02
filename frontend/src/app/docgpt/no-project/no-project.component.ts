import { Component } from '@angular/core';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-no-project',
  templateUrl: './no-project.component.html',
  styleUrls: ['./no-project.component.scss']
})
export class NoProjectComponent {
  constructor(private uiService: UiService) {}

  onCreateProject() {
    this.uiService.triggerProjectDiag();
  }
}
