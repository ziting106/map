import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { MenuNode } from '../app/app.interface';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userMenuStr: string = '';
  isLogging: boolean = false;
  path = environment.path;
  domain = environment.domain;
  beURL = environment.beUrl;
  constructor(private cookieService: CookieService, private router: Router) {}
  private getCookie(key: string): string {
    if (this.cookieService.check(key)) {
      return this.cookieService.get(key);
    } else {
      this.cookieService.deleteAll(this.path, this.domain, false, 'Lax');
      this.router.navigate([this.beURL + '/login']);
      return '';
    }
  }
  set isLoggingState(state: boolean) {
    this.isLogging = state;
  }
  get isLoggingState(): boolean {
    return this.isLogging;
  }
  // 少了就沒畫面
  set setUserMenu(menu: MenuNode[]) {
    this.userMenuStr = JSON.stringify(menu);
    // console.log(menu);
  }
  get getUserMenu(): MenuNode[] {
    if (this.userMenuStr) {
      return JSON.parse(this.userMenuStr);
    } else {
      return [];
    }
  }
  // ---------------------
  get userId(): string {
    return this.getCookie('UserId');
  }
  get userCode(): string {
    return this.getCookie('UserCode');
  }
  get userName(): string {
    return this.getCookie('UserName');
  }

  get organCode(): string {
    return this.getCookie('OrganCode');
  }

  get organName(): string {
    return this.getCookie('OrganName');
  }

  get organId(): string {
    return this.getCookie('OrganId');
  }

  get deptCode(): string {
    return this.getCookie('DeptCode');
  }

  get deptName(): string {
    return this.getCookie('DeptName');
  }

  get deptId(): string {
    return this.getCookie('DeptId');
  }
}
