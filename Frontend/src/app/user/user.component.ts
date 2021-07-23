import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../form.service';
import { Template1Component } from '../template1/template1.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  ID2=localStorage.getItem("UserId");

  constructor(private router:Router,public form:FormService,public check:UserService) { }

  ngOnInit(): void {
     this.form.check(this.ID2);
     this.check.LoggedIn();
 
  }
  create(){
     this.router.navigate(['user/form1']);
  }
  update(){
    this.router.navigate(['user/updateform1']);
  }
  updatephoto(){
    this.router.navigate(['user/form5']);
  }
  delete(){
      this.form.deletedata(this.ID2)
      .subscribe((res:any) => {
        this.form.check(this.ID2);
        this.check.LoggedIn();
        alert(res.data);
      })
  }
  home(){
    this.router.navigate(['user']);
  }
  

}
