import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';
import { UserData, defaultData } from '../userData.model';

interface KeyStat {
  key: string,
  winner: string,
  highScore: number
}

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {
  usernameOne: string = ""
  usernameTwo: string = ""
  userProfiles: UserData[] = [];
  errorMessage: string = '';
  winner: string = '';
  keyStats: KeyStat[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }

  decideWinner() {
    let profileZeroScore = 0;
    let profileOneScore = 0;

    //Loading up our keyStats so we can highlight differences
    const comparingKeys = ['total-stars', 'highest-starred', 'public-repos', 'perfect-repos', 'followers', 'following']
    for (const key of comparingKeys) {
      if (this.userProfiles[0][key] > this.userProfiles[1][key]) {
        this.keyStats.push({ key, winner: this.userProfiles[0].username, highScore: this.userProfiles[0][key] as number })
      }
      else if (this.userProfiles[1][key] > this.userProfiles[0][key]) {
        this.keyStats.push({ key, winner: this.userProfiles[1].username, highScore: this.userProfiles[1][key] as number })
      }
      else {
        this.keyStats.push({ key, winner: 'tie', highScore: this.userProfiles[1][key] as number })
      }

      profileZeroScore += this.userProfiles[0][key] as number;
      profileOneScore += this.userProfiles[1][key] as number;
    }

    if (profileZeroScore > profileOneScore) {
      this.winner = this.userProfiles[0].username;
    }
    else if (profileOneScore > profileZeroScore) {
      this.winner = this.userProfiles[1].username;
    }
    else {
      this.winner = 'Tie! (no winner)';
    }
  }

  onSubmit() {
    this.userService.duelUsers(this.usernameOne, this.usernameTwo)
      .then(profiles => {
        this.keyStats = [];
        this.errorMessage = '';
        this.userProfiles = profiles as UserData[];
        this.decideWinner();
      }, error => {
        this.userProfiles = [];
        this.winner = '';
        console.error('Error occurred:', error);
        this.errorMessage = error.message;
      });
  }
}
