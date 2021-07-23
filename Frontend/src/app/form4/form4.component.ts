import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../form.service';
import { Form5Component } from '../form5/form5.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-form4',
  templateUrl: './form4.component.html',
  styleUrls: ['./form4.component.css']
})
export class Form4Component implements OnInit {
  ID2=localStorage.getItem("UserId");

  constructor(public http:FormService,private router:Router,private form:UserService) { }

  ngOnInit(): void {
  }
  
  resumedata4(){
    this.http.form1(this.http.Resumedata);
    alert("Sucessfully Created");
    this.http.check(this.ID2);
    this.form.LoggedIn();
    this.router.navigate(['user/form5']);
  
   
  }
  insert(){
    this.http.Resumedata.skills.push({skill:""});
  }

  insert2(){
    this.http.Resumedata.languages.push({language:""});
  }


}
