import { Component, OnInit } from '@angular/core';
import { ContextService } from '../services/context.service';
import { Subscription } from 'rxjs';
import { Chat } from '../api/chat';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.scss']
})
export class SummaryPanelComponent implements OnInit {
  cities: City[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Paris', code: 'PRS' }
  ];
  editFiles = false;
  selectedCity: City[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Paris', code: 'PRS' }
  ];

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  onModifyFiles() {
    this.editFiles = true;
  }
  onConfirmModify() {
    this.editFiles = false;
  }
}
