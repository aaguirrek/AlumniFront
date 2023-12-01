import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService} from 'src/app/data/data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'gestor',
  templateUrl: './asesorias.html',
  styleUrls: ['./asesorias.scss']
})
export class PreguntasComponent implements OnInit {

  doc:any={};
  doc_list:any[]=[];
  doc_aprovado:any[]=[];
  modalRef: BsModalRef;
  constructor(private dataService: DataService,private _Activatedroute:ActivatedRoute, private notifications: NotificationsService, private modalService: BsModalService) { }

  ngOnInit() {
    (document.querySelector(".preloader") as HTMLElement ).style.cssText = "";
    this.dataService.get_list("Asesorias",["*"],[["egresado","=",localStorage.getItem("email")],["estado","=","Pendiente"]]).subscribe(data=>{
      this.doc_list = data["data"];
      this.dataService.get_list("Asesorias",["*"],[["egresado","=",localStorage.getItem("email")],["estado","=","Aprobado"]]).subscribe(data=>{
        this.doc_aprovado= data["data"];
        (document.querySelector(".preloader") as HTMLElement ).style.cssText = "display:none;";
      })
    })


  }
  Reservar(){
  }
}
