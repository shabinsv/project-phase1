import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  Resumedata={
    ID:localStorage.getItem("UserId"),
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

  form1(form:any){
    return this.http.post("http://localhost:3000/form1",form)
    .subscribe(data=>{console.log(data)})
  }
}
