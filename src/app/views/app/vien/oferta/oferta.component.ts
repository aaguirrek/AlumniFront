import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService} from 'src/app/data/data.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-ofertas',
  templateUrl: './oferta.html',
  styleUrls: ['./oferta.scss']
})
export class OfertaComponent implements OnInit {

  doc:any={};
  postulado:number=0;
  ofertas:any[]=[];
  constructor(private dataService: DataService,private _Activatedroute:ActivatedRoute, private notifications: NotificationsService) {
    this.doc = {};
   }

  ngOnInit() {
    (document.querySelector(".preloader") as HTMLElement ).style.cssText = "";
    const docname:String = this._Activatedroute.snapshot.paramMap.get("docname");
    const doctype = "Oferta Laboral"
    this.dataService.get_doc(doctype,docname).subscribe(data => {
      let resp = data["data"]
      this.doc = resp;
      (document.querySelector(".preloader") as HTMLElement ).style.cssText = "display:none;";
    })

    this.dataService.get_list("Postulacion",["*"],[["exalumno","=",localStorage.getItem("email")],["oferta_laboral","=",docname]]).subscribe(data=>{
      this.ofertas = data["data"];
    })

  }
  postular(){
    const docname:String = this._Activatedroute.snapshot.paramMap.get("docname");
    const doctype:String = "Postulacion"
    const egresado:String = localStorage.getItem("email")
    this.dataService.insert_doc(doctype,{"oferta_laboral":docname,"exalumno":egresado}).subscribe(data=>console.log(data));
    this.notifications.create("Has postulado!", "Tu postulación se ha realizado exitosamente", NotificationType.Success, { timeOut: 3000, showProgressBar: true });
    this.postulado=1;
  }
}
