import { EventsService } from './events.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Global } from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private global: Global, private router: Router, private events: EventsService) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return true;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(next);
    console.log(state);
    // console.log(this.global.getUserInfo());
    // console.log(this.global.isLogin());
    if (this.global.isLogin()) {
      if (state.url.indexOf(this.getUserRoute(this.global.getUserInfo().category)) > -1) {
        return true;
      } else {
        this.router.navigate([this.getUserRoute(this.global.getUserInfo().category)]);
        return false;
      }
    } else {
      if (state.url.indexOf('/passport') > -1) {
        return true;
      } else {
        this.router.navigate(['/passport']);
        return false;
      }
    }
  }

  private getUserRoute(role: string) {
    switch (role) {
      case 'ORG':
        return '/org';
      case 'OP':
        return '/operate';
      default:
        return '/platform';
    }
  }
}
