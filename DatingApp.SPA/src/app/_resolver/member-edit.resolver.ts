import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(private userService: UserService , private router: Router,
    private alertify: AlertifyService, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot):  Observable<User> {
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertify.error('problem retriving data MemberEditResolver');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }


}
