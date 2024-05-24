import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';
import { UserData, defaultData } from '../userData.model';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css']
})
export class InspectComponent implements OnInit {

  username: string = ""
  userData: UserData = defaultData;
  errorMessage: string = '';
  showProfile: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsername(valueEmitted: string) {
    this.username = valueEmitted;
  }

  onSubmit() {
    this.userService.inspectUser(this.username)
      .then(data => {
        this.errorMessage = '';
        this.userData = data as UserData
        this.showProfile = true;
      }, error => {
        this.showProfile = false;
        this.userData = defaultData;
        console.error('Error occurred:', error);
        this.errorMessage = error.message;
      })
  }
}
