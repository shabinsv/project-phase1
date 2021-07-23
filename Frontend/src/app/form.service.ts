import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  ID2=localStorage.getItem("UserId");
  Resumedata={
    ID:localStorage.getItem("UserId"),
    name:"",
    email:"",
    phonenumber:"",
    dob:"",
    gender:"",
    address:"",
    about:"",
    photo:"",
    education:[{degree:"",specialisation:"",year: "",name:""}],
    job:[{jobname:"", companyname:"", jobyear:"",jobdes:""}],
    skills:[{skill:""}],
    achievements:"",
    languages:[{language:""}]
    }

    Updatedata={
      ID:localStorage.getItem("UserId"),
      name:"",
      email:"",
      phonenumber:"",
      dob:"",
      gender:"",
      address:"",
      about:"",
      photo:"",
      education:[{degree:"",specialisation:"",year: "",name:""}],
      job:[{jobname:"", companyname:"", jobyear:"",jobdes:""}],
      skills:[{skill:""}],
      achievements:"",
      languages:[{language:""}]
      }
  

  constructor(private http:HttpClient) { }

  form1(form:any){
    return this.http.post("http://localhost:3000/form1",form)
    .subscribe(data=>{console.log(data)})
  }
  image(image:any){
    return this.http.post("http://localhost:3000/image/"+this.ID2,image)
    .subscribe(data=>{console.log(data)})
  }
  usercvdata(id:any){
    return this.http.get("http://localhost:3000/usercvdata/"+id);
  }
  updatedata(form:any)
  {
    console.log('client update')
    return this.http.put("http://localhost:3000/updateform",form)
    .subscribe(data =>{console.log(data)})
  }
  check(data:any){
      this.http.get("http://localhost:3000/check/"+data).subscribe(res=>{
      if(res){
        var x="checked";
        localStorage.setItem('check',x);
      }
      else{
        localStorage.removeItem('check');
      }
     })

  }
  deletedata(id:any){
    return this.http.delete("http://localhost:3000/deletedata/"+id);
  }
  
}
