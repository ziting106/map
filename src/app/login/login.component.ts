import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConFunsService } from 'src/util/con-funs.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/util/user.service';
import { MenuNode } from '../app.interface';
import { Auth, AuthResult, ChangeMima } from './login.intereface';
import { HttpService } from 'src/util/http.service';
import { ApiActionMode, ApiPath } from 'src/util/con-type.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;
  authResult!: AuthResult;
  cookieCheck!: boolean;
  errMsg!: string;
  sysName = environment.sysName;
  // cookie
  path = environment.path;
  domain = environment.domain;
  // token aes
  aesFront = environment.aesFront;
  aesAfter = environment.aesAfter;

  // dialogRef!: MatDialogRef<any>;
  menuData: MenuNode[] = [];
  isNdemo: boolean = false;
  // 路由網路URL
  beUrl = environment.beUrl;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private cookieService: CookieService,
    private conFunsService: ConFunsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.conFunsService.setPageTitle('登入');
    if (this.cookieService.check('Login')) {
      this.router.navigate(['/home']);
    }
    this.loginForm = new FormGroup({
      Account: new FormControl(null, Validators.required),
      Password: new FormControl(null, Validators.required),
      DeviceCode: new FormControl(''),
    });
    // 當路由路徑包含localhost時，輸入預設帳密
    if (location.hostname.includes('localhost')) {
      this.loginForm.patchValue({
        Account: 'futaba',
        Password: '3612321',
      });
    }
    const hostname = window.location.hostname;
    if (hostname.includes('ndemo')) {
      this.isNdemo = true;
    } else {
      this.isNdemo = false;
    }
  }
  onSubmit() {
    console.log('提交!');
    let dialogRef = this.conFunsService.openDialog('', {});
    this.errMsg = '登入中...';
    const loginValue: Auth = {
      Account: encodeURI(this.loginForm.value.Account),
      Password: encodeURI(this.loginForm.value.Password),
      DeviceCode: encodeURI(this.loginForm.value.DeviceCode),
    };
    this.httpService
      .apiAction(ApiPath.Account, ApiActionMode.Auth, loginValue)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.authResult = data;
        },
        error: (error) => {
          console.log(error.message);
        },
        complete: () => {
          dialogRef.close();
          if (this.authResult.Success) {
            // 設定Cookie - Login
            this.cookieService.set(
              'Login',
              'logined',
              0.5,
              this.path,
              this.domain,
              false,
              'Lax'
            );
            this.userService.isLoggingState = true;
            //   //this.cookieCheck = this.cookieService.check('Login');
            // 設定Cookie - User Data
            this.cookieService.set(
              'UserName',
              this.authResult.Data.UserName,
              1,
              this.path,
              this.domain,
              false,
              'Lax'
            );
            this.cookieService.set(
              'UserCode',
              this.authResult.Data.UserCode,
              1,
              this.path,
              this.domain,
              false,
              'Lax'
            );
            this.cookieService.set(
              'Verified',
              this.authResult.Data.Verified,
              1,
              this.path,
              this.domain,
              false,
              'Lax'
            );
            this.cookieService.set(
              'UserId',
              this.authResult.Data.UserId,
              1,
              this.path,
              this.domain,
              false,
              'Lax'
            );
            this.cookieService.set(
              'Secret',
              this.aesFront + this.authResult.Data.Token + this.aesAfter,
              1,
              this.path,
              this.domain,
              false,
              'Lax'
            );

            //   if(this.authResult.Data.Verified == 'N'){
            //       const changePwdDataset: ChangeMima = {
            //         Code: this.authResult.Data.UserCode,
            //         OldMima: '',
            //         NewMima: '',
            //         Verified: this.authResult.Data.Verified
            //       };
            //       this.dialogRef = this.utilService.openDialog(DialogEditComponent, 'changePwd', 'changeMima', changePwdDataset);
            //   }

            // 取得menu至localstorage再登入
            this.httpService
              .apiAction(
                ApiPath.EoMenu,
                ApiActionMode.UserMenu,
                { userId: this.authResult.Data.UserId },
                true
              )
              .subscribe({
                next: (data) => {
                  if (data.Data && data.Data.length > 0) {
                    this.menuData = data.Data;
                    // console.log(data);
                  } else {
                    this.menuData = [
                      {
                        Icon: '',
                        Name: '您無作業權限，請洽系統管理員',
                        Link: '',
                        Children: [],
                      },
                    ];
                  }
                },
                error: (error) => {
                  console.log(error.message);
                },
                complete: () => {
                  localStorage.setItem(
                    'UserMenu',
                    JSON.stringify(this.menuData)
                  );
                  this.userService.setUserMenu = this.menuData;
                  this.router.navigate([this.beUrl + '/home']);
                },
              });
          } else {
            this.conFunsService.openSnackBar(
              '登入失敗' + this.authResult.Message,
              false
            );
            this.errMsg = this.authResult.Message;
          }
        },
      });
  }

  resetMima() {
    const resetMima: ChangeMima = {
      Code: '',
      VerifyKey: '',
    };
  }
}
