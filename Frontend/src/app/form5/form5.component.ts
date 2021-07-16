import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../form.service';

@Component({
  selector: 'app-form5',
  templateUrl: './form5.component.html',
  styleUrls: ['./form5.component.css']
})
export class Form5Component implements OnInit {
   
  

  constructor(public http:FormService,private router:Router) { }

  ngOnInit(): void {
  }
  resumedata5(){
    this.http.form1(this.http.Resumedata);
    console.log("called");
    alert("sucess");
  
   
  }
  insert(){
    this.http.Resumedata.languages.push({language:""});
  }

}
