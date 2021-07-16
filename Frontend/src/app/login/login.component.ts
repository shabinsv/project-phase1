import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { InjectSetupWrapper } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user={
    username:"",
    password:"",
    sub:[{sub1:"",sub2:""}]
  }
  myObjArray = [
    {id: 1, name: "Hardik" },
    {id: 2, name: "Vimal" },
    {id: 3, name: "Paresh" }
  ];

  constructor(private http:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  loginUser(){
    this.http.login(this.user)
    .subscribe(res=>{
      localStorage.setItem('UserId',res.UserId)
  })
  }

  insert(){
    this.user.sub.push({sub1:"",sub2:""});
  }

 

}
