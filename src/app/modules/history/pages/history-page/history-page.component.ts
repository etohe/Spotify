import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {
  listResults$: Observable<any> = of([])

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  receivedData(event: string): void{
    //TODO: Agarras el termino y solo se ejecuta cuando tenga 3 caracteres
    console.log('HistoryPageComponent 🧐🧐 ', event);
    //this.listResults$ =  this.searchService.searchTracks$(event)      
    this.listResults$ =  this.searchService.getFindTrack$(event)      
    
  }

}
