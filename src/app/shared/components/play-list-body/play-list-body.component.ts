import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css']
})
export class PlayListBodyComponent implements OnInit {

  @Input() tracks: TrackModel[] = []
  @Input() track: TrackModel = {_id:0, name:'', album:'', url: '', cover: ''};
  @Input() iconFavorite: boolean = true;
  optionSort: { property: string | null, order: string } = { property: 'none', order: 'asc' }
  currentTrackArray: number = -1

  listObservers$: Array<Subscription> = [];  

  constructor(private multimediaService: MultimediaService) { }

  ngOnInit(): void {
    const observer1$ = this.multimediaService.listCurrentSong$
      .subscribe((res:any) => {
        if (res){
          console.log("🎧🎸🪕🎧🎸🪕🎧🎸🪕🎧🎸🪕 listCurrentSong: "+ res)
          this.currentTrackArray = res
        }        
      }) 
    this.listObservers$ = [observer1$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach( u => u.unsubscribe() );
    console.log('💣 PlayListBodyComponent 💣 Finalizando Observer listCurrentSong')         
  }

  sendPlay(track: TrackModel): void {    
    console.log('🏸 Info del: '+track)
    this.multimediaService.trackInfo$.next(track)
  }

  changeSort(property: string): void {
    const { order } = this.optionSort;
    this.optionSort = {
      property: property,
      order: order==='asc' ? 'desc' : 'asc'
    }
    console.log(this.optionSort);
  }

}
