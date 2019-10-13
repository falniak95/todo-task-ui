import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../service/manage/auth/login.service';
import { User } from 'src/app/model/entity/manage/auth/user';
import { UserService } from 'src/app/service/manage/auth/user.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: [`
  .dark-modal .modal-content {
    background-color: #292b2c;
    color: white;
  }
  .dark-modal .close {
    color: white;
  }
  .light-blue-backdrop {
    background-color: #5cb3fd;
  }
`]

})
export class LoginComponent implements OnInit {

  responseErrorMessage:any = "";
  stateIcon: string = '';
  newUser: User;
  uName: string;
  pass: string;
  fName: string;
  lName: string;
  pNo: string;
  constructor(private loginService: LoginService,
              private modalService: NgbModal,
              private userService: UserService) { }

  ngOnInit() {
  this.stateIcon = 'default';
  }

  async initEntity(){
    this.newUser = await this.userService.new();
  }

  openLg(content) {
    this.initEntity();
    const modal: NgbModalRef = this.modalService.open(content, { size: 'lg' });
  }

  async createUser(formValue){

    if(this.uName!=null)
    this.newUser.username=this.uName;
    if(this.pass!=null)
    this.newUser.password=this.pass;
    if(this.fName!=null)
    this.newUser.firstName=this.fName;
    if(this.lName!=null)
    this.newUser.lastName=this.lName;
    if(this.pNo!=null)
    this.newUser.phoneNo=this.pNo;
    

      this.newUser = await this.userService.save(this.newUser);
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
