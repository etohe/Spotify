import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistRoutingModule } from './playlist-routing.module';
import { CustomListComponent } from './pages/custom-list/custom-list.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    CustomListComponent
  ],
  imports: [
    CommonModule,
    PlaylistRoutingModule,
    SharedModule
  ]
})
export class PlaylistModule { }
