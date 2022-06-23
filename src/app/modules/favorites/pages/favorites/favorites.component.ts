import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  listObservers$: Array<Subscription> = [];
  listResults: Array<TrackModel> = []
  title: String = '' 

  constructor(private multimediaService: MultimediaService) {
      this.title='Canciones que te gustan'
      console.log('FavoritesPageComponent 🧐🧐 ', event);      
   }  

  ngOnInit(): void {
    const observer1$ = this.multimediaService.listSongFavorite$
      .subscribe((res:any) => {
        if (res){
          this.listResults = res.slice()
        }        
      }) 
    this.listObservers$ = [observer1$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach( u => u.unsubscribe() );
    console.log('💣 FavoritesPageComponent 💣 Finalizando Observer songListFavorites')         
  }

}
