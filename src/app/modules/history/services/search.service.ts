import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly URL = environment.api

  constructor(private http: HttpClient ) {

   }

  searchTracks$(term: string): Observable<any>{
    return this.http.get(`${this.URL}/tracks?src=${term}`)
    .pipe(
      map( (dataRaw: any) => dataRaw.data)
    )
  }



  private skipByName(listTrack: TrackModel[], name: String): Promise<TrackModel[]> {
    return new Promise( (resolve, reject) => {      
      const listTmp = listTrack.filter( a => String(a.name).toLowerCase().search(String(name).toLowerCase())!=-1 || String(a.artist?.name).toLowerCase().search(String(name).toLowerCase())!=-1)
      console.log('🎁 skipByName: '+listTmp)
      resolve(listTmp)
    })
  }

  getFindTrack$(strFind:String):Observable<any> {
    return this.http.get(`${this.URL}/tracks`)
      .pipe(
        
        tap( (data) => console.log('Data antes del Observable', data)),
        mergeMap( ({data}: any) => this.skipByName(data, strFind) ),
        tap( (data) => console.log('Data despues del Filtro', data)),
        catchError ( (err) => {
          const { status, statusText } = err;
          console.log('getFindTrack$ Algo paso aqui -> 💔💔', [status, statusText]);

          return of([])
        })
      )
  }
}
