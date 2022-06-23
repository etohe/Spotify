import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { TrackService } from '@modules/tracks/service/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {

  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel> = []

  listObservers$: Array<Subscription> = []  

  ErrCover: TrackModel = {
    cover: 'NE',
    name: 'ERROR DE SERVIDOR',
    album: 'NE',
    url: 'NE',
    _id: 404
  }

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    this.loadDataAll();
    this.loadDataRandom();

  }

  async loadDataAll(): Promise<any> {
    /*this.trackService.getAllTracks$()
    .subscribe( response => {
      this.tracksTrending = response;
    })*/
    this.tracksTrending = await this.trackService.getAllTracks$().toPromise();
    
  }

  loadDataRandom(): void {
    this.trackService.getAllRandom$()
      .subscribe( (response: TrackModel[]) => { 
          this.tracksRandom = response; 
        },
        err => {
          console.log('🔴🔴🔴 Error de conexión!');
          this.tracksRandom.push(this.ErrCover);
        }
    );

  }

  ngOnDestroy(): void{
    
  }



}
