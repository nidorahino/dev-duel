import { Component, OnInit, Input } from '@angular/core';
import { UserData, defaultData } from 'src/app/userData.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() userData: UserData = defaultData;

  dataKeys: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.dataKeys = Object.keys(this.userData);
  }

}
