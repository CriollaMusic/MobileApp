import { Component } from '@angular/core';
import { UserService } from '../code/services/users.service';
import { User } from '../code/models/User';
import { AuthenticatedDto } from '../code/AuthenticationDto';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user:AuthenticatedDto | undefined;
  photo!:string;

  constructor(private userService: UserService) {
    let storageContent = localStorage.getItem(UserService.UserLocalStorageKey);
    userService.loggedUser.subscribe(res => {
      if(res)
      this.user = res;
    });    
    if(storageContent){
      this.user = <AuthenticatedDto>JSON.parse(storageContent);    
      console.log('User',this.user) 
    }
    this.photo = <string>localStorage.getItem(`${UserService.UserLocalStorageKey}-picture`);
  }

}
