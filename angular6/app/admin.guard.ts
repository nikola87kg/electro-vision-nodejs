import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let answer = '';
        const realPassword = 'mikilegenda';
        function enterPassword() {
            answer = prompt('Unesite admin lozinku');
            if (answer === realPassword) {
                return true;
            }
            return false;
        }

        return enterPassword();
  }
}
