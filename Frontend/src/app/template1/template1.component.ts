import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../template.service';

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.css']
})
export class Template1Component implements OnInit {

  Resumedata={
    ID:"",
    name:"",
    email:"",
    phonenumber:"",
    dob:"",
    gender:"",
    address:"",
    photo:"",
    education:[{degree:"",specialisation:"",year: "",name:""}],
    job:"",
    jobname:"",
    jobyear:"",
    jobdes:"",
    skills:[{skill:""}],
    achievements:"",
    languages:[{language:""}]
    }

  constructor(public http:TemplateService) { }

  ngOnInit(): void {
    let userdata = localStorage.getItem("UserId");
    this.http.usercvdata(userdata).subscribe((data)=>{
      this.Resumedata=JSON.parse(JSON.stringify(data));
    })
  }


}
