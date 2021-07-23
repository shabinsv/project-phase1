import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }
  login(user:any){
    return this.http.post<any>("http://localhost:3000/login",user)
  }
  signup(user:any){
    return this.http.post<any>("http://localhost:3000/signup",user)
  }
  LoggedIn(){
    var x=localStorage.getItem('check')
    if(x=='checked'){
      console.log("ss");
      return  true;
      
    }
    else{
      console.log("12");
      return false;
    }
    
  }
}
