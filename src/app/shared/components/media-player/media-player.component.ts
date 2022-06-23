import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs'; //Programación Reactiva

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  listObservers$: Array<Subscription> = [];
  state: string = 'paused'
  stateVol: string = 'mute'
  stateSongFavorite: string = 'false'
  porcentaje: Number = 0;
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')
  @ViewChild('progressBar2') progressBar2: ElementRef = new ElementRef('')

  constructor(public multimediaService: MultimediaService) { }  

  ngOnInit(): void {
    const observer1$ = this.multimediaService.playerStatus$
      .subscribe(status => this.state = status) 

    const observer2$ = this.multimediaService.volumeStatus$
      .subscribe(status => this.stateVol = status) 

    const observer3$ = this.multimediaService.songFavorite$
      .subscribe(status => this.stateSongFavorite = status) 
    let songList = this.multimediaService.songList      
    let currentTrackArray = this.multimediaService.currentTrackArray
    this.listObservers$ = [observer1$, observer2$, observer3$]
  }

  ngOnDestroy():void {
    this.listObservers$.forEach( u => u.unsubscribe() );
    console.log('💣 Finalizando Componente Media-Player')         
  }

  handlePosition(event: MouseEvent): void{
    const elNative: HTMLElement = this.progressBar.nativeElement
    const { clientX } = event
    const { x, width } = elNative.getBoundingClientRect()    
    let xSelProgressBar = clientX - x
    let percentageSel = xSelProgressBar * 100 / width
    //console.log("🍳  clientX: ", clientX, " 🍳 x: ", x, " 🍳 Width:", width, " 🍖🍖🍖 Porcentage:  Porcentage: " , percentageSel)
    this.multimediaService.seekAudio(percentageSel)

  }

  handlePositionVolume(event: MouseEvent): void{
    const elNative: HTMLElement = this.progressBar2.nativeElement
    const { clientX } = event
    const { x, width } = elNative.getBoundingClientRect()        
    let xSelProgressBar = clientX - x
    let percentageSel = xSelProgressBar * 100 / width
    if (percentageSel<0){  percentageSel=0    }
    if (percentageSel>100){  percentageSel=100    }
    //console.log("🍳  clientX: ", clientX, " 🍳 x: ", x, " 🍳 Width:", width, " 🍖🍖🍖 Porcentage:  Porcentage: " , percentageSel)
    this.multimediaService.seekVolume(percentageSel)    

  }


}
