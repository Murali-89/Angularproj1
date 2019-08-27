import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { UserService } from '../services/user.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public submitMessage: string;
  userName = new FormControl('', [ Validators.required ]);
  userPassword = new FormControl('', [ Validators.required ]);
  userMobile = new FormControl('', [ Validators.required ]);
  firstName = new FormControl('', [ Validators.required ]);
  lastName = new FormControl('', [ Validators.required ]);
  constructor(public routerService: RouterService,public noteService: NotesService) { }

  ngOnInit() {}
  cancel(){
    this.routerService.routeToLogin();
  }
  loginSubmit() {
    
    if (this.userName.valid && this.userPassword.valid) {
      this.noteService.registerUser({
        userId: this.userName.value,
        userName: this.userName.value,
        userPassword: this.userPassword.value,
        userMobile: this.userMobile.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value
        
      }).subscribe(
      res => {
        this.routerService.routeToLogin();
      },
      err => {
          if (err.status === 403) {
            this.submitMessage = err.error.message;
          } else {
            this.submitMessage = err.message;
          }
        }
      );
      }
    }

    getErrorMessage() {
      return this.userName.hasError('required') ? 'You must enter a value' :
            this.userPassword.hasError('required') ? 'You must enter a value ' :
              '';
    }

}
