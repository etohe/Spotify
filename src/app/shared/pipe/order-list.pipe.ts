import { Pipe, PipeTransform } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';

@Pipe({
  name: 'orderList'
})
export class OrderListPipe implements PipeTransform {  
  transform(value: Array<any>, args: string | null = null, sort: string | 'asc') : Array<any> {
    /*
    console.log( 'πΆπΆ Pipe Oder πΆπΆ OrderListPipe π€'  + value);
    console.log( 'OrderListPipe π'  + args);
    console.log( 'OrderListPipe π΅'  + sort);
    */
    try{  
      if (!(value == null)){
        if ( args === null){
          return value;
        }else{
          if (!(args=='none')){
            const tmpList = value.sort(function (a, b) {
              if (a[args] < b[args]) {
                return -1;
              }
              else if (a[args] === b[args]) {
                return 0;
              }
              else if (a[args] > b[args]){
                return 1;
              }          
              return 1;
            });
            return ( sort==='asc') ? tmpList : tmpList.reverse();
          }else{
            return value;
          }            
        }      
      }else{
        return value;
      }
    }catch (e){
      console.log('OrderListPipe π¨ Algo paso!!! ', e);
      return value;
    }

    
  }

}
