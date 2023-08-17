import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService} from 'src/app/data/data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-ofertas',
  templateUrl: './emprendedores.html',
  styleUrls: ['./emprendedores.scss']
})
export class EmprendedoresComponent implements OnInit {
  attahRef: BsModalRef;
  uploadFieldName:string="";
  uploadSaveField:string="";
  filename:string="Agregar";
  uploadFieldType:string="";
  uploadPrivado:number=0;
  doc:any={};
  doc_list:any[]=[];
  modalRef: BsModalRef;
  constructor(private dataService: DataService,private _Activatedroute:ActivatedRoute, private notifications: NotificationsService, private modalService: BsModalService) {
    this.doc = {};
   }

  ngOnInit() {
    (document.querySelector(".preloader") as HTMLElement ).style.cssText = "";
    const docname:String = this._Activatedroute.snapshot.paramMap.get("docname");

    this.dataService.get_list("Emprendimiento de egresado",["*"]).subscribe(data=>{
      this.doc_list = data["data"];
      (document.querySelector(".preloader") as HTMLElement ).style.cssText = "display:none;";
    })

  }
  emprender(){
    const doctype:String = "Emprendimiento de egresado"
    const egresado:String = localStorage.getItem("email")
        this.dataService.insert_doc(doctype,{
          "empresa":(document.getElementById('empresa') as HTMLInputElement).value,
          "ruc":(document.getElementById('ruc') as HTMLSelectElement).value,
          "web":(document.getElementById('web') as HTMLSelectElement).value,
          "yt":(document.getElementById('yt') as HTMLInputElement).value,
          "redes":(document.getElementById('redes') as HTMLTextAreaElement).value,
          "nombre":(document.getElementById('nombre') as HTMLTextAreaElement).value,
          "telf":(document.getElementById('telf') as HTMLTextAreaElement).value,
          "email":(document.getElementById('email') as HTMLTextAreaElement).value,
          "logo":this.filename,
          "egresado":egresado
        }).subscribe(data=>{ this.filename="Agregar"; }, (error) => {
          let errores = JSON.parse( error.error._server_messages )
          this.modalRef.hide();
          for (const key in errores) {
              const element = errores[key]
              this.notifications.create("Error", JSON.parse(element).message , NotificationType.Error, { timeOut: 3000, showProgressBar: true });
          }

        });

  }
  Emprende(template: TemplateRef<any>):void{
      this.modalRef = this.modalService.show(
        template,Object.assign({}, { })
      );

  }
  openUploadFile(template: TemplateRef<any>, fieldtype:string="Attach", fieldname:string="") {
    this.uploadFieldName = fieldname;
    this.uploadFieldType = fieldtype;
    this.uploadSaveField = "";
    this.uploadPrivado = 0;
    this.attahRef = this.modalService.show(
      template,Object.assign({}, { class: 'modal-fade',ignoreBackdropClick: true })
    );

  }
  AttachFile():void {

    const doc_name = "Perfil del exalumno"

    let files:FileList = (document.querySelector("#inputUploadFile") as HTMLInputElement).files
    let file:{file_obj:File,name:string,private:number,file_url:string|boolean} = { file_obj: undefined, name: '', private: 0, file_url: '/'};
    file.file_obj = files[0];
    file.name = files[0].name;
    let doctype:string = "Perfil del exalumno";
    let docname:string = localStorage.getItem("email");
    let folder:string = "Home"
    let method:string = "none"
    this.dataService.UploadFile(file,folder,doctype,docname,method).subscribe(data =>{
          let r = null;
          let file_doc = null;
          try {
            r = data;
            if (r["message"]["doctype"] === 'File') {
              file_doc = r["message"];
              if(this.uploadFieldName !==""){
                (document.getElementById(this.uploadFieldName) as HTMLInputElement).value = file_doc.file_url;
                this.filename = file_doc.file_url;
              }
              if(this.uploadSaveField!==""){
                var doc={};
                doc[this.uploadSaveField] = file_doc.file_url;

                doc["name"] = localStorage.getItem("email");
                this.dataService.save_doc(doc_name,doc).subscribe(data =>{

                  this.notifications.create("Guardado", "Se ha subido el logo con exito", NotificationType.Success, { timeOut: 3000, showProgressBar: true });
                })

              }
            }
          } catch(e) {
            r = data;
          }
    })
    this.attahRef.hide()


  }
  changeFile():void{
    let files:FileList = (document.querySelector("#inputUploadFile") as HTMLInputElement).files;
    let name = files[0].name;
    (document.querySelector(`label[for="inputUploadFile"]`) as HTMLLabelElement).innerHTML =name;
    (document.querySelector(`#imgUploadFile`) as HTMLImageElement).src = "/assets/img/gif/56-document-gradient.gif";

  }
}
