import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../form.service';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.component.html',
  styleUrls: ['./form3.component.css']
})
export class Form3Component implements OnInit {
 constructor(public http:FormService,private router:Router) { }

  ngOnInit(): void {
  }
  resumedata3(){
    console.log("called");
    alert("sucess");
    this.router.navigate(['form4']);
   
  }

}
