import { Component, OnInit, TemplateRef, AfterContentInit , OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService} from 'src/app/data/data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-form',
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.scss']
})
export class PerfilComponent implements OnInit, AfterContentInit {
  custom_atributes={
    correo_del_egresado:{read_only:1},
    apellidos:{read_only:1},
    "básico_section":{hidden:1},
    "datos_básicos_section":{hidden:1}
  }
  personalRef: BsModalRef;
  modalRef: BsModalRef;
  attahRef: BsModalRef;
  cur_doc:object = {
    'experiencia_laboral':[],
    'educacion_superior':[],
    'educacion_basica':[]
  };
  resultLink={
    fieldname:"",
    data:[]};
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  }
  arrays={ }
  uploadSaveField:string=""
  uploadFieldName:string=""
  uploadFieldType:string=""
  tableFieldName:String="";
  uploadPrivado:number = 0;
  tableData = { }
  jsonPostData = { };
  documento:string = "";
  tableObjs={}
  doc_name:string = "none"
  tableFields:Array<any> = [];
  DocFiles:Array<any> = [];
  tableName:String;
  fields:Array<any> = [];
  constructor(private dataService: DataService,private notifications: NotificationsService,private modalService: BsModalService,private _Activatedroute:ActivatedRoute) {
    this.tableName = "";
    this.tableFields=[];
   }

   ngAfterContentInit():void{

   }
   ngOnDestroy():void{
      this.custom_atributes={
        correo_del_egresado:{read_only:1},
        apellidos:{read_only:1},
        "básico_section":{hidden:1},
        "datos_básicos_section":{hidden:1}
      }
      this.cur_doc = {
        'experiencia_laboral':[],
        'educacion_superior':[],
        'educacion_basica':[]
      };
      this.resultLink={
        fieldname:"",
        data:[]};
        this.config = {
        backdrop: true,
        ignoreBackdropClick: true
      }
      this.arrays={ }
      this.uploadSaveField=""
      this.uploadFieldName=""
      this.uploadFieldType=""
      this.tableFieldName="";
      this.uploadPrivado = 0;
      this.tableData = { }
      this.jsonPostData = { };
      this.documento = "";
      this.tableObjs={}
      this.doc_name = "none"
      this.tableFields = [];
      this.tableName="";
      this.fields = [];
      this.DocFiles = [];
   }
  ngOnInit():void{
    (document.querySelector(".preloader") as HTMLElement ).style.cssText = "";
    this.loadForm();
    const docname = "Perfil del exalumno"
    if(DataService.ENV_VARS.UserData!==null ){
      this.cur_doc = DataService.ENV_VARS.UserData

      let response = this.dataService.renderDoc(this.cur_doc,this.arrays)
      this.tableData = Object.assign({}, this.tableData, response.tables);
      this.jsonPostData = Object.assign({}, this.jsonPostData, response.JsonPost);
    }else{

      this.loadDoc(docname)
    }
    this.dataService.getDocFiles(docname,localStorage.getItem("email")).subscribe(data => {
      this.DocFiles = data["data"];
      (document.querySelector(".preloader") as HTMLElement ).style.cssText = "display:none;";

    })
  }
  loadForm(){
    const docname = "Perfil del exalumno"
    let fieldTree:any[]=[]
    this.resultLink = {
      "fieldname":"",
      "data":[]
    }
    let child:number=0
    let sectionCounter:number=-1;
    this.documento = docname;
    let data = this.dataService.getLocalFields("Perfil del exalumno")
    const fields=data["message"];
    if(fields[0].fieldtype !== "Section Break"){
      fields.unshift(this.dataService.AddSection)
    }
    for (const key in fields) {
      const element = fields[key];
      if(this.custom_atributes[element.fieldname]!==undefined){
        if(this.custom_atributes[element.fieldname].hidden!==undefined){
          element.hidden = this.custom_atributes[element.fieldname].hidden
        }
        if(this.custom_atributes[element.fieldname].read_only!==undefined){
          element.read_only = this.custom_atributes[element.fieldname].read_only
        }
      }
      if(element.fieldtype === "Section Break"){
        sectionCounter++
        child=0;
        fieldTree[sectionCounter]={type:'Section', el:element,childs:[],columns:1,classes:"col-md-12"};
        fieldTree[sectionCounter].childs[child]=[];
      }else{
        if(element.fieldtype === "Column Break"){
          fieldTree[sectionCounter].columns++;
          child++;
          fieldTree[sectionCounter].classes="col-md-"+(12/fieldTree[sectionCounter].columns);
          fieldTree[sectionCounter].childs[child]=[];
        }else{

          if(element.fieldtype == 'Select'){
            if(typeof element.options == "string"){
            element.options = element.options.split("\n");}
          }
          if(element.fieldtype == 'Table'){
            this.tableData[element.fieldname]=[]
            element["table"]=[]
            let TableEl = this.dataService.getLocalTables(element.options)
            element["table"] = TableEl["message"];
            this.arrays[element.fieldname] = TableEl["message"];
          }
          if(this.custom_atributes[element.fieldname]!==undefined){
            if(this.custom_atributes[element.fieldname].hidden!==undefined){
              element.fieldtype = "Hidden"
            }
            if(this.custom_atributes[element.fieldname].read_only!==undefined){
              element.fieldtype = "Read Only"
            }
          }
          fieldTree[sectionCounter].childs[child].push(element);
        }
      }
    }
    this.fields=fieldTree;
  }
  loadDoc(docname){
    this.dataService.get_doc(docname,localStorage.getItem("email")).subscribe(data => {
      let resp = data["data"]
      this.cur_doc = resp
      let response = this.dataService.renderDoc(resp,this.arrays)
      this.tableData = Object.assign({}, this.tableData, response.tables);
      this.jsonPostData = Object.assign({}, this.jsonPostData, response.JsonPost);

    })

  }
  addTableData(fieldname):void{
    const docname = "Perfil del exalumno"
    let kvpairs:object[] = [];
    let tableform:object={};
    let kvpairs2:object[] = [];
    let form = (document.querySelector("#table_"+fieldname) as HTMLFormElement)
    for ( var i = 0; i < form.elements.length; i++ ) {
      var e = ((form.elements as HTMLFormControlsCollection)[i] as HTMLInputElement) ;
        let kv={fieldname:e.name,name:e.value, req:e.getAttribute("data-mandatory"), in_list_view:e.getAttribute("data-listview")};

        tableform[e.name]=e.value;
        kvpairs.push(kv);
    }

    kvpairs2.push(kvpairs)
    if(this.jsonPostData[fieldname] === undefined ){
      this.jsonPostData[fieldname] = []
    }

    if((document.getElementById("table_row_name") as HTMLInputElement).value!==""){
      tableform["name"]=(document.getElementById("table_row_name") as HTMLInputElement).value;
      let idx:string =(document.getElementById("table_row_idx") as HTMLInputElement).value
      this.jsonPostData[fieldname][parseInt(idx) - 1]=tableform
    }else{

      this.jsonPostData[fieldname].push(tableform)
    }
    this.jsonPostData["name"]=localStorage.getItem('email')
    this.dataService.save_doc(docname, this.jsonPostData).subscribe(data =>{

      DataService.ENV_VARS.UserData = data["data"]
      this.loadDoc(docname)
      this.notifications.create("Guardado", "Se han guardo los cambios de su perfil", NotificationType.Success, { timeOut: 3000, showProgressBar: true });
      this.modalRef.hide()
    }, (error) => {
      let errores = JSON.parse( error.error._server_messages )
      this.loadDoc(docname)
      this.modalRef.hide()
      for (const key in errores) {
          const element = errores[key]
          this.notifications.create("Error", JSON.parse(element).message , NotificationType.Error, { timeOut: 3000, showProgressBar: true });
      }

    })
    return
  }
  setLink(data,fieldname=""): void{
    (document.querySelector('#'+fieldname) as HTMLInputElement).value = data;
    (document.querySelector('#result-'+fieldname) as HTMLElement).style.display = 'none';

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
  openModal(template: TemplateRef<any>, name:String, fieldname:string="", row:[any]=null) {
    this.tableFields=[];
    this.tableName=name;
    this.tableFieldName=fieldname;
    let fieldTree=[];
    let child=0
    let sectionCounter=-1;
    const data = this.dataService.getLocalFields(name)
    let subFields = data["message"];
    if(subFields[0].fieldtype !== "Section Break"){
      subFields.unshift(this.dataService.AddSection)
    }
    for (const key in subFields) {
      const element = subFields[key];
      if(element.fieldtype === "Section Break"){
        sectionCounter++
        child=0;
        fieldTree[sectionCounter]={type:'Section', el:element,childs:[],columns:1,classes:"col-md-12"};
        fieldTree[sectionCounter].childs[child]=[];
      }else{
        if(element.fieldtype === "Column Break"){
          fieldTree[sectionCounter].columns++;
          child++;
          fieldTree[sectionCounter].classes="col-md-"+(12/fieldTree[sectionCounter].columns);
          fieldTree[sectionCounter].childs[child]=[];
        }else{
          if(element.fieldtype == 'Select'){
            element.options = element.options.split("\n");
          }
          fieldTree[sectionCounter].childs[child].push(element);
        }
      }
    }

    this.tableFields=fieldTree;
    this.modalRef = this.modalService.show(
      template,Object.assign({}, { class: 'modal-right',
      ignoreBackdropClick: true })
    );
    (document.getElementById(`table_row_name`) as HTMLInputElement).value = ""
      if(row!==null){
        this.dataService.renderTableData(fieldname, row)
      }

  }
  delete_row_table(fieldname:string, row:[any]=null):void {
      const docname = "Perfil del exalumno"
      let idx:number=-1;
      if(row!==null){
        idx=this.dataService.get_idx_table( row)
      }
      if(idx!==-1){
        this.jsonPostData[fieldname].splice(idx - 1, 1)

      }
      this.jsonPostData["name"]=localStorage.getItem('email')
      this.dataService.save_doc(docname, this.jsonPostData).subscribe(data =>{
        DataService.ENV_VARS.UserData = data["data"]
        this.loadDoc(docname)
        this.notifications.create("Guardado", "Se han guardo los cambios de su perfil", NotificationType.Success, { timeOut: 3000, showProgressBar: true });
      })
      return
  }
  LinkInput(event: any, linkDoctype:String){
    if(event.target.value.length == 0){
      (document.querySelector('#result-'+event.target.id) as HTMLElement).style.display = 'none';
    }else{
      (document.querySelector('#result-'+event.target.id) as HTMLElement).style.display = 'block';
    }
    this.dataService.getSearch(linkDoctype,event.target.value).subscribe(data=>{
      this.resultLink = {
        "fieldname":event.target.id,
        "data":data["message"]
      }
    })
    //
  }
  NewLink(template: TemplateRef<any>, name:String) {
    this.tableFields=[];
    this.tableName=name;
    let fieldTree=[];
    let child=0
    let sectionCounter=-1;
    this.dataService.getFields(name).subscribe(data => {
      const subFields = data["message"];
      if(subFields[0].fieldtype !== "Section Break"){
        subFields.unshift(this.dataService.AddSection)
      }
      for (const key in subFields) {
        const element = subFields[key];
        if(element.fieldtype === "Section Break"){
          sectionCounter++
          child=0;
          fieldTree[sectionCounter]={type:'Section', el:element,childs:[],columns:1,classes:"col-md-12"};
          fieldTree[sectionCounter].childs[child]=[];
        }else{
          if(element.fieldtype === "Column Break"){
            fieldTree[sectionCounter].columns++;
            child++;
            fieldTree[sectionCounter].classes="col-md-"+(12/fieldTree[sectionCounter].columns);
            fieldTree[sectionCounter].childs[child]=[];
          }else{
            if(element.fieldtype == 'Select'){
              element.options = element.options.split("\n");
            }
            fieldTree[sectionCounter].childs[child].push(element);
          }
        }
      }
    })
    this.tableFields=fieldTree;
    this.modalRef = this.modalService.show(
      template,Object.assign({}, { class: 'modal-fade' })
    );
  }
  AttachFile():void {

    const doc_name = "Perfil del exalumno"
    let files:FileList = (document.querySelector("#inputUploadFile") as HTMLInputElement).files
    let file:{file_obj:File,name:string,private:number,file_url:string|boolean} = { file_obj: undefined, name: '', private: this.uploadPrivado, file_url: '/'};
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
                (document.getElementById(this.uploadFieldName) as HTMLInputElement).value =file_doc.file_url;
              }
              if(this.uploadSaveField!==""){
                var doc={};
                doc[this.uploadSaveField] = file_doc.file_url;

                doc["name"] = localStorage.getItem("email");
                this.dataService.save_doc(doc_name,doc).subscribe(data =>{

                  DataService.ENV_VARS.UserData = data["data"]
                  this.loadDoc(doc_name)
                  this.notifications.create("Guardado", "Se han guardo los cambios de su perfil", NotificationType.Success, { timeOut: 3000, showProgressBar: true });
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
  OnGuardar(){
    const docname = "Perfil del exalumno"
    var formdata:any = document.getElementById('cur_doc');
    var data:any = new FormData(formdata);
    for (var [key, value] of data) {

        if(value.name===undefined){
          this.jsonPostData[key] = value;
        }

    }
    this.jsonPostData["name"] = localStorage.getItem("email");
    this.dataService.save_doc(docname, this.jsonPostData).subscribe(data =>{
      console.log(data)
      DataService.ENV_VARS.UserData = data["data"]
      this.loadDoc(docname)
      this.notifications.create("Guardado", "Se han guardo los cambios de su perfil", NotificationType.Success, { timeOut: 3000, showProgressBar: true });

    })
  }
  VisibleTable(control ):boolean{
    //console.log(control)
    return true

  }
  asIsOrder(a, b) {
    return 1;
  }
  openModalPersonal(template: TemplateRef<any>):void{
    this.personalRef = this.modalService.show(
      template,Object.assign({}, { class: 'modal-right',
      ignoreBackdropClick: true })
    );
  }
  OnGuardarDatosBasicos():void{
    const docname = "Perfil del exalumno"
    var formdata:any = document.getElementById('basico_datos_personales');
    var data:any = new FormData(formdata);
    for (var [key, value] of data) {
        if(value.name===undefined){
          this.jsonPostData[key] = value;
        }
    }

    this.jsonPostData["name"] = localStorage.getItem("email");
    this.dataService.save_doc(docname, this.jsonPostData).subscribe(data =>{

      DataService.ENV_VARS.UserData = data["data"]
      this.loadDoc(docname)
      this.notifications.create("Guardado", "Se han guardo los cambios de su perfil", NotificationType.Success, { timeOut: 3000, showProgressBar: true });
    })

    this.personalRef.hide()

  }
  ChangeFotoProfile(template: TemplateRef<any>, fieldname:string=""):void{
    this.uploadFieldName = "";
    this.uploadFieldType = "Attach";
    this.uploadPrivado = 0
    this.uploadSaveField = fieldname;
    this.attahRef = this.modalService.show(
      template,Object.assign({}, { class: 'modal-fade',
      ignoreBackdropClick: true })

    );

  }

}




//nosotros protegemos lo que mas quieres
