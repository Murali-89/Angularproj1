import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormControl} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public bearerToken: any;
  public submitMessage: string;
  username = new FormControl('', [ Validators.required ]);
  password = new FormControl('', [ Validators.required ]);

  constructor(private authService: AuthenticationService, public routerService: RouterService) { }

  ngOnInit() {}
  loginSubmit() {
    if (this.username.valid && this.password.valid) {
    this.authService.authenticateUser({
      userId: this.username.value,
      userPassword: this.password.value
    }).subscribe(
    res => {
      this.bearerToken = res['token'];
      this.authService.setBearerToken(this.bearerToken);
      this.routerService.routeToDashboard(this.username.value);
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
      return this.username.hasError('required') ? 'You must enter a value' :
            this.password.hasError('required') ? 'You must enter a value ' :
              '';
    }

    navRegister(){
      this.routerService.routeToRegister();
    }
}
