import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../service/manage/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  responseErrorMessage:any = "";
  stateIcon: string = '';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  this.stateIcon = 'default';
  }

  submit(formValue) {

    this.stateIcon = 'success';
    this.responseErrorMessage = "";

    this.loginService.login(formValue).then(errorMessage => {

      console.log("msg is ",errorMessage);

      if(errorMessage == "usernamePasswordFail"){
        this.responseErrorMessage = errorMessage;
        this.stateIcon = 'password';
      }
      else if(errorMessage == "userIsNotActive"){
        this.responseErrorMessage = errorMessage;
        this.stateIcon = 'error';
      }
      else if(typeof errorMessage === 'object'){
        this.responseErrorMessage = "object";
        this.stateIcon = 'error';
      }

    });
  }

  clean(){
    this.responseErrorMessage = "";
    this.stateIcon = 'default';
  }

}
