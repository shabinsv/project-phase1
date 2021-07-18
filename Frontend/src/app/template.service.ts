import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http:HttpClient) { }

  usercvdata(id:any){
    return this.http.get("http://localhost:3000/usercvdata/"+id);
  }
}
