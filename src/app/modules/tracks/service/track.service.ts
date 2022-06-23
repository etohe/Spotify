import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;
  private handleError = '';

  constructor(private httpClient: HttpClient) { 
    
  }

  private skipBiID(listTrack: TrackModel[], id: number): Promise<TrackModel[]> {
    return new Promise( (resolve, reject) => {      
      const listTmp = listTrack.filter( a => Number(a._id) !== id)
      resolve(listTmp)
    })
  }

  /**
   * 
   * @returns Retorna todas las conciones
   */

  getAllTracks$():Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
      .pipe(
        map( ({data}: any) => {
          return data
        })      
      )
      
  }

  /**
   * 
   * @returns Retorna todas las canciones random
   */

  getAllRandom$():Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
      .pipe(
        
        tap( (data) => console.log('Data antes del Observable', data)),
        map( ({data}: any) => data),
        //mergeMap( ({data}: any) => this.skipBiID(data, 1) ),
        //tap( (data) => console.log('Data despues del Observable', data)),
        //mergeMap( (data: any) => this.skipBiID(data, 3) ),
        //tap( (data) => console.log('Data despues del Observable', data)),
        catchError ( (err) => {
          const { status, statusText } = err;
          console.log('getAllRandom$ Algo paso aqui -> 💔💔', [status, statusText]);

          return of([])
        })
      )
  }

  /**
   * 
   * @returns Retorna las canciones que coinciden con el nombre...
   */

   

}
