import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService} from 'src/app/data/data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-asesorias',
  templateUrl: './asesorias.html',
  styleUrls: ['./asesorias.scss']
})
export class AsesoriasComponent implements OnInit {

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
    const doctype:String = "Asesorias"
    const egresado:String = localStorage.getItem("email")
    this.dataService.insert_doc(doctype,{
      "fecha":(document.getElementById('fecha') as HTMLInputElement).value,
      "hora":(document.getElementById('hora') as HTMLSelectElement).value,
      "alumni":(document.getElementById('alumni') as HTMLSelectElement).value,
      "egresado":egresado,
      "motivo":(document.getElementById('motivo') as HTMLInputElement).value,
      "estado":"Pendiente",
      "detalle":(document.getElementById('detalle') as HTMLTextAreaElement).value
    }).subscribe(
      data=>{
        this.dataService.get_list("Asesorias",["*"],[["egresado","=",localStorage.getItem("email")],["estado","=","Pendiente"]]).subscribe(data=>{
          this.doc_list = data["data"]
        })
        this.dataService.get_list("Asesorias",["*"],[["egresado","=",localStorage.getItem("email")],["estado","=","Aprobado"]]).subscribe(data=>{
          this.doc_aprovado= data["data"]
        })

        this.modalRef.hide();
        this.notifications.create("Guardado!", "Se ha realizado exitosamente", NotificationType.Success, { timeOut: 3000, showProgressBar: true });

      }, (error) => {
        let errores = JSON.parse( error.error._server_messages)
        for (const key in errores) {
            const element = errores[key]
            this.notifications.create("Error", JSON.parse(element).message , NotificationType.Error, { timeOut: 3000, showProgressBar: true });
        }
      }
    );
  }
  ReservaCita(template: TemplateRef<any>):void{
      this.modalRef = this.modalService.show(
        template,Object.assign({}, { })
      );

  }
  CancelarCita(name){
    this.dataService.delete_doc("Asesorias",name).subscribe(data=>{
      this.dataService.get_list("Asesorias",["*"],[["egresado","=",localStorage.getItem("email")],["estado","=","Pendiente"]]).subscribe(data=>{
        this.doc_list = data["data"]
      })
      this.dataService.get_list("Asesorias",["*"],[["egresado","=",localStorage.getItem("email")],["estado","=","Aprobado"]]).subscribe(data=>{
        this.doc_aprovado= data["data"]
      })
    })
  }
}
