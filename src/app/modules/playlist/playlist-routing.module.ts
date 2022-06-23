import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomListComponent } from './pages/custom-list/custom-list.component';

const routes: Routes = [
  {
    path: '',
    component: CustomListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistRoutingModule { }
