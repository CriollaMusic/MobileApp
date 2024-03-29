import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../code/services/users.service';
import { Router } from '@angular/router';
import { AuthenticatedDto, AuthenticationDto } from '../code/AuthenticationDto';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { User } from '../code/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  formGroup!: FormGroup;
  remember:boolean = false;
  formConfig: any = {};

  constructor(private userService: UserService,    
    private socialAuthService: SocialAuthService,
    public router: Router) { }

  ngOnInit() {
    this.formConfig['userName'] = new FormControl('', [Validators.required, Validators.email]);
    this.formConfig['password'] = new FormControl('', [Validators.required]);
    this.formGroup = new FormGroup(this.formConfig);
    let storageContent = localStorage.getItem(UserService.UserLocalStorageKey);
    if(storageContent){
      let content = <AuthenticatedDto>JSON.parse(storageContent);
      this.formGroup.controls['userName'].setValue(content.email);
    }

  }

  async login(){
    let authDto = new AuthenticationDto();
    authDto.email = this.formGroup.controls['userName'].value;
    authDto.password = this.formGroup.controls['password'].value;
    (await this.userService.authenticate(authDto)).subscribe((res:AuthenticatedDto)=>{
      localStorage.setItem(UserService.UserLocalStorageKey, JSON.stringify(res));
      this.userService.$authenticated.next(true);
      this.userService.loggedUser.next(res);
      this.router.navigate(['tabs']);
    } );
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(async (res: 
      { email: string; firstName: string; lastName: string; provider: string; photoUrl:string; }) => {
      console.log('Google Response',res);
      let user = new User();
      user.email = res.email;
      user.name = res.firstName;
      user.lastName = res.lastName;
      user.isSocial = true;
      user.socialProvider = res.provider;
      localStorage.setItem(`${UserService.UserLocalStorageKey}-picture`,res.photoUrl);
      (await this.userService.authenticateSocial(user)).subscribe((res:AuthenticatedDto)=>{
        localStorage.setItem(UserService.UserLocalStorageKey, JSON.stringify(res));
        this.userService.$authenticated.next(true);
        this.userService.loggedUser.next(res);
        this.router.navigate(['tabs']);
      } );;
    });
  }
  
  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {
      console.log('Facebook Response',res);
    });
  }
}
