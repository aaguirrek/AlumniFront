import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService} from 'src/app/data/data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-ofertas',
  templateUrl: './networking.html',
  styleUrls: ['./networking.scss']
})
export class NetworkingComponent implements OnInit {
  modalRef: BsModalRef;
  comment_ref:String;
  content:any;
  vermas_i:number;
  doc_list:any[]=[];
  constructor(private dataService: DataService,private modalService: BsModalService,private _Activatedroute:ActivatedRoute, private notifications: NotificationsService) {
   }

  ngOnInit() {
    (document.querySelector(".preloader") as HTMLElement ).style.cssText = "";
    this.dataService.get_list("Blog Post",["*"]).subscribe(data=>{
      this.doc_list = data["data"];
      (document.querySelector(".preloader") as HTMLElement ).style.cssText = "display:none;";


    })
  }
  vermas(i=0,docname){
    this.doc_list[i]['vermas']=1;

    this.dataService.get_list("Comment",["*"],[["reference_doctype","=","Blog Post"],["reference_name","=",docname],["comment_type","=","Comment"]]).subscribe(data=>{

      this.doc_list[i]['comments']=data["data"];
    })
  }
  showModal(template: TemplateRef<any>,name:String, i=0){
    this.comment_ref=name;
    this.vermas_i=i;
    this.modalRef = this.modalService.show(
      template,Object.assign({}, { class: 'modal-fade' })
    );
  }
  saveComment(){
    this.comment_ref
    let comment = document.querySelector("#comment .ql-editor").innerHTML as String
    let doc={
      doctype:"Comment",
      reference_doctype:"Blog Post",
      reference_name:this.comment_ref,
      comment_type:"Comment",
      comment_by:localStorage.getItem("email"),
      published:true,
      comment_email:localStorage.getItem("email"),
      content:comment
    }
    this.dataService.insert_doc("Comment", doc).subscribe(data =>{
      this.notifications.create("Guardado", "Se han guardo los cambios de su perfil", NotificationType.Success, { timeOut: 3000, showProgressBar: true });
      this.dataService.get_list("Comment",["*"],[["reference_doctype","=","Blog Post"],["reference_name","=",this.comment_ref],["comment_type","=","Comment"]]).subscribe(data=>{

        this.doc_list[this.vermas_i]['comments']=data["data"];
      })
    })
    this.modalRef.hide()
  }
  hideModal(){
    this.modalRef.hide()
  }

}
