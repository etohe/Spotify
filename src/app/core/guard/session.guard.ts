import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkCookieSession();
  }

  checkCookieSession():boolean {
    try{
      const cookie = this.cookieService.check('tokenSession')
      if (!cookie){
        this.router.navigate(['/','auth']);                  
      }      
      return(cookie);
    }catch (e){
      console.log('Algo paso en el guardian 👀🔴👀🔴');
      this.router.navigate(['/','auth']);
      return false;
    }
  }
  
}
