import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocgptComponent } from './docgpt.component';

const routes: Routes = [

    {    
      path: '',
      component: DocgptComponent,
      pathMatch: 'full'
    },
    {    
      path: 'project/:projectId',
      component: DocgptComponent,
      pathMatch: 'full'
    },
    {    
      path: 'project/:projectId/chat/:chatId',
      component: DocgptComponent,
      pathMatch: 'full'
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocgptRoutingModule { }
