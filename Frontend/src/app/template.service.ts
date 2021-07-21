import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
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

  constructor(private http:HttpClient) { }

  usercvdata(id:any){
    return this.http.get("http://localhost:3000/usercvdata/"+id);
  }
}
