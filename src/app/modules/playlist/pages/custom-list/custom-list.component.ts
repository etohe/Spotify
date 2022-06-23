import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-custom-list',
  templateUrl: './custom-list.component.html',
  styleUrls: ['./custom-list.component.css']
})
export class CustomListComponent implements OnInit {

  listResults: Array<TrackModel> = []
  


  constructor(private multimediaService: MultimediaService) {
      
      console.log('CustomListComponent 🧐🧐 ', event);      
      this.listResults = this.multimediaService.songList.slice();
   }

  ngOnInit(): void {
  }

}
