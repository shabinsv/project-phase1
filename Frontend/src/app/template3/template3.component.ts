import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../template.service';
import  jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-template3',
  templateUrl: './template3.component.html',
  styleUrls: ['./template3.component.css']
})
export class Template3Component implements OnInit {
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
    job:[{jobname:"",companyname:"",jobyear:"",jobdes:""}],
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
  public generatePdf()  
    {  
      var data = document.getElementById('makepdf');  
    html2canvas(data ,{scrollY: -window.scrollY}).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
       var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
       
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }  

}
