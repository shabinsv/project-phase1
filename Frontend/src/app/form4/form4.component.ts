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
    console.log("called");
    alert("sucess");
    this.router.navigate(['form5']);
  
   
  }
  insert(){
    this.http.Resumedata.skills.push({skill:""});
  }


}
