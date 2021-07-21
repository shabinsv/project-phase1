import { Component, OnInit } from '@angular/core';
import { Template1Component } from '../template1/template1.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public http:UserService) { }

  ngOnInit(): void {
    
  }
  

}
