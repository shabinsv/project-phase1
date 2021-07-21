import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../form.service';
import { Form5Component } from '../form5/form5.component';

@Component({
  selector: 'app-form4',
  templateUrl: './form4.component.html',
  styleUrls: ['./form4.component.css']
})
export class Form4Component implements OnInit {

  constructor(public http:FormService,private router:Router) { }

  ngOnInit(): void {
  }
  
  resumedata4(){
    this.http.form1(this.http.Resumedata);
    console.log("called");
    alert("Sucessfully Created");
    this.router.navigate(['user/form5']);
  
   
  }
  insert(){
    this.http.Resumedata.skills.push({skill:""});
  }

  insert2(){
    this.http.Resumedata.languages.push({language:""});
  }


}
