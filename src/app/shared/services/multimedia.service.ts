import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();
  

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public audio: HTMLAudioElement
  public timeElapsed$ : BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining$ : BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$ : BehaviorSubject<string> = new BehaviorSubject('paused')
  public playerPercentage$ : BehaviorSubject<number> = new BehaviorSubject(0)
  public volumePercentage$ : BehaviorSubject<number> = new BehaviorSubject(0)
  public volumeStatus$ : BehaviorSubject<string> = new BehaviorSubject('nomute')
  public volumencurrent = 0
  public songList: Array<TrackModel>
  public currentTrackArray = -1
  public songListFavorites: Array<TrackModel> ;
  public songFavorite$ : BehaviorSubject<string> = new BehaviorSubject('false')
  public listSongFavorite$:  BehaviorSubject<any> = new BehaviorSubject(undefined)
  public listCurrentSong$:  BehaviorSubject<any> = new BehaviorSubject(undefined)

  boolTrackFinded: Boolean = false;

  myObservable1$: BehaviorSubject<any> = new BehaviorSubject('🥛')
  
  constructor() { 
    this.audio = new Audio   
    this.volumencurrent = 0 
    this.songList = new Array<TrackModel>();         
    this.songListFavorites = new Array<TrackModel>();         
    this.trackInfo$.subscribe( responseOK => {
      if (responseOK){
        console.log('-> Audio a Reproducir: '+Object.values(responseOK))        
        this.boolTrackFinded = false
        this.songList.forEach(object =>{
          if(object._id === responseOK._id){
            this.boolTrackFinded = true
            console.log('🎶---> Audio Encontrado: {id:'+ object._id+'},{titulo: '+object.name+'}' )        
          }
        });
        //Si no fue encontrado el Track agregarlo a songList
        if (!this.boolTrackFinded){
          this.songList.push(responseOK)
          this.currentTrackArray = this.songList.length - 1            
          console.log('🎧🎧🎧 (N.'+(this.currentTrackArray+1)+') ---> Audio Agregado a la lista: {id:'+ responseOK._id+'},{titulo: '+responseOK.name+'}' )        
        }else{
          //sino, obtener la posición del arreglo
          this.currentTrackArray = this.songList.findIndex( (element) => element._id === responseOK._id);
          console.log('🎧🔎📃 (N.'+(this.currentTrackArray+1)+') ---> Audio a Reproducir de la lista: {id:'+ responseOK._id+'},{titulo: '+responseOK.name+'}' )        
        }        
        this.setAudio(responseOK)              
      }            
    })  

    this.listSongFavorite$.subscribe( responseOK => this.songListFavorites)

    //this.listCurrentSong$.subscribe( responseOK => this.songList[this.currentTrackArray])
    this.listCurrentSong$.subscribe( responseOK => this.currentTrackArray)
    
    this.listenAllEvent()

  }

  private listenAllEvent(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime , false)    
    this.audio.addEventListener('playing', this.setPlayerStatus , false)
    this.audio.addEventListener('play', this.setPlayerStatus , false)
    this.audio.addEventListener('pause', this.setPlayerStatus , false)
    this.audio.addEventListener('ended', this.setPlayerStatus , false)        

  }

  private setPlayerStatus = (state: any) => {
    console.log('🍌🍌', state)
    switch(state.type){ //Playing
      case 'play': 
        this.playerStatus$.next('play')
        break;
      case 'playing': 
        this.playerStatus$.next('playing')
        break;
      case 'paused': 
        this.playerStatus$.next('paused')
        break;
      case 'ended':         
        if (this.currentTrackArray>=this.songList.length-1){
          this.currentTrackArray=0          
          
        }else{
          this.currentTrackArray=this.currentTrackArray+1          
        }
        this.trackInfo$.next(this.songList[this.currentTrackArray])        
        break;      
      default:
        this.playerStatus$.next('paused')
        break;
    }
  }

  private setVolumeStatus = (state: any) => {
    if (state.type=='mute'){ //Playing
        this.volumeStatus$.next('mute')                
    }else{
      this.volumeStatus$.next('nomute')
    }
  }

  private calculateTime = ()  => {
    const { duration, currentTime } = this.audio
    this.setTimeElapse(currentTime);
    this.setTimeRemaining(currentTime, duration)
    this.setTimepercentage(currentTime, duration)
  }

  private setTimeElapse(currentTime: number) : void {
    let seconds = Math.floor(currentTime % 60)
    let minutes = Math.floor( (currentTime/60) % 60)

    const displaySeconds = (seconds < 10 ) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10 ) ? `0${minutes}` : minutes;

    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat)
  }

  private setTimeRemaining(currentTime: number,duration: number) : void {
    let seconds = Math.floor((duration-currentTime) % 60)
    let minutes = Math.floor( ((duration-currentTime)/60) % 60)

    const displaySeconds = (seconds < 10 ) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10 ) ? `0${minutes}` : minutes;

    let displayFormat = `-${displayMinutes}:${displaySeconds}`
    if(isNaN(duration)){
      this.timeRemaining$.next('00:00')
    }else{
      this.timeRemaining$.next(displayFormat)
    }    
  }

  private setTimepercentage(currentTime: number, duration: number) : void {
    let percentage = currentTime * 100 / duration
    this.playerPercentage$.next(percentage) 
  }
  
    
  //TODO: Funciones publicas
  public setAudio(track: TrackModel): void {
    //console.log('Reproducir 🍳', track)
    //this.listCurrentSong$.next(track)  
    this.listCurrentSong$.next(this.currentTrackArray+1)  
    this.audio.pause();
    this.audio.src = track.url
    console.log('**** songList -> ('+(this.currentTrackArray+1)+'/'+this.songList.length+') '+ JSON.stringify( this.songList) )
    /*
    this.audio.play();
    */
    var playPromise = this.audio.play() 
    if (playPromise !== undefined) {
      playPromise.then(_ => {
        this.audio.play();        
      })
      .catch(error => {
        console.log('😂😂 Error al reproducir audio...')
      });
    }
    //buscar si el track es favorito
    this.boolTrackFinded = false
    this.songListFavorites.forEach(object =>{
      if(object._id === track._id){
        this.boolTrackFinded = true        
      }
    });    
    if (this.boolTrackFinded){
      this.songFavorite$.next('true')
    }else{
      this.songFavorite$.next('false')
    }                   
  }

  public togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }

  public  seekAudio(percentage: number) : void {    
    const { duration } = this.audio    
    const percentageToSecond = percentage * duration  / 100
    console.log("🍘 Ir al ", percentage, "% de la canción (" , percentageToSecond , " segundos)")
    this.audio.currentTime = percentageToSecond
  }

  public  seekVolume(percentage: number) : void {    
    console.log("🔉 Ajustar al ", percentage, "% del Volumen")
    this.audio.volume = percentage/100    
    this.volumePercentage$.next(percentage)    

  }

  public setVolumeZero(): void {
    if (this.audio.volume==0){
      this.audio.volume = this.volumencurrent
      this.volumencurrent = 0
      console.log(`Desmuteado`)
      this.volumeStatus$.next('nomute')
    }else{
      this.volumencurrent = this.audio.volume
      this.audio.volume = 0
      console.log(`Muteado al ${this.volumencurrent}`)
      this.volumeStatus$.next('mute')
    }            
  }

  public setNextTrack(): void {
    if (this.currentTrackArray >= this.songList.length - 1){
      this.currentTrackArray = 0  
      
    }else{
      this.currentTrackArray = this.currentTrackArray + 1
    }
    this.trackInfo$.next(this.songList[this.currentTrackArray])  
  }

  public setPreviusTrack(): void {
    if (this.currentTrackArray == 0){
      this.currentTrackArray = this.songList.length - 1       
    }else{
      this.currentTrackArray = this.currentTrackArray - 1  
    }
    this.trackInfo$.next(this.songList[this.currentTrackArray])  
  }

  public setSongFavorite(track: TrackModel): void {
    this.boolTrackFinded = false
    this.songListFavorites.forEach(object =>{
      if(object._id === track._id){
        this.boolTrackFinded = true
        console.log('❤❤❤ 🎶---> Audio Encontrado en FAVORITES: {id:'+ object._id+'},{titulo: '+object.name+'}' )        
      }
    });
    //Si no fue encontrado el Track agregarlo a songListFavorites
    if (!this.boolTrackFinded){
      this.songListFavorites.push(track)      
      this.songFavorite$.next('true')
      console.log('❤❤❤ 🎧 ---> Audio Agregado a la lista FAVORITES: {id:'+ track._id+'},{titulo: '+track.name+'}' )                        
    }else{
      this.songListFavorites = this.songListFavorites.filter((object) => object._id !== track._id);
      this.songFavorite$.next('false')    
      console.log('❤❤❤ 🎧 ---> Audio Eliminado de la lista FAVORITES: {id:'+ track._id+'},{titulo: '+track.name+'}' )                              
    }    
    this.listSongFavorite$.next(this.songListFavorites)        
  }  

  public setSongListFavoriteToPlaylist(): void {
    if (this.songListFavorites.length>0){
      this.songList = this.songListFavorites.slice()
      this.currentTrackArray = 0
      this.listSongFavorite$.next(this.songListFavorites)    
      this.trackInfo$.next(this.songList[this.currentTrackArray])
      console.log('👉 Reproduciendo  SongListFavorite: '+ JSON.stringify( this.songList))
    }    
  }  
}
