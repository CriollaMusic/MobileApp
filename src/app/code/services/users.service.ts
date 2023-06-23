import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../BaseService';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticatedDto, AuthenticationDto } from '../AuthenticationDto';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  private user!: AuthenticatedDto | undefined;
  static UserLocalStorageKey = 'CWAK';
  $authenticated = new BehaviorSubject<boolean>(false);
  loggedUser = new BehaviorSubject<AuthenticatedDto | undefined>(new AuthenticatedDto());

  constructor(private http: HttpClient) {
    super(http, environment.userApi, 'User');
    this.loggedUser.subscribe(res => this.user = res);
  }

  private isSuperUser(permissions:string) : boolean{
    const _super = 'full_access';
    return _super.indexOf(_super) > -1;
  }

  CanDelete(entity: string) {
    let permDelete = `${entity}_delete`;
    let permissions = this.user ? this.user.permissions : '';
    if (permissions.indexOf(permDelete) > -1 || this.isSuperUser(permissions)) {
      return true;
    }
    return false
  }

  CanEdit(entity: string) {
    let permEdit = `${entity}_edit`;
    let permissions = this.user ? this.user.permissions : '';
    if (permissions.indexOf(permEdit) > -1 || this.isSuperUser(permissions)) {
      return true;
    }
    return false
  }

  async authenticate(authentication: AuthenticationDto): Promise<Observable<AuthenticatedDto>> {
    await this.setIpAddress(authentication);
    return this.http.post<AuthenticatedDto>(`${environment.userApi}User/authenticate`, authentication);
  }

  private async setIpAddress(authentication: AuthenticationDto) {
    try{
      await this.http.get("https://api.ipify.org?format=json").toPromise().then((res: any) => {
        authentication.ipAddress = res.ip;
      });
    }
    catch(err){
      authentication.ipAddress = "0.0.0.0";
    }
  }

}