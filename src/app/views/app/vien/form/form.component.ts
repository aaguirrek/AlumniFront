import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService} from 'src/app/data/data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  modalRef: BsModalRef;
  resultLink={
    fieldname:"",
    data:[]};
  config = {
    backdrop: true,
  }
  tableFieldName:String="";
  tableData = { }
  documento = "";
  tableFields = [];
  tableName:String;
  fields = [];
  constructor(private dataService: DataService,private modalService: BsModalService,private _Activatedroute:ActivatedRoute) {
    this.tableName = "";
    this.tableFields=[];
   }
  ngOnInit() {
    const docname = this._Activatedroute.snapshot.paramMap.get("docname")
    let fieldTree=[]
    this.resultLink = {
      "fieldname":"",
      "data":[]
    }
    let child=0
    let sectionCounter=-1;
    this.documento = docname;
    this.dataService.getFields(docname).subscribe(data => {
      const fields=data["message"];
      if(fields[0].fieldtype !== "Section Break"){
        fields.unshift(this.dataService.AddSection) 
      }
      for (const key in fields) {
        const element = fields[key];
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
            if(element.fieldtype == 'Table'){
              element.options;
              this.tableData[element.fieldname]=[]
              element["table"]=[]
              this.dataService.getTables(element.options).subscribe(data => {
                element["table"] = data["message"];
              })
            }
            fieldTree[sectionCounter].childs[child].push(element);
          }
        }
      }
      this.fields=fieldTree;
    })
  }
  addTableData(fieldname){
    let kvpairs = [];
    let form = (document.querySelector("#table_"+fieldname) as HTMLFormElement)
    for ( var i = 0; i < form.elements.length; i++ ) {
      var e = ((form.elements as HTMLFormControlsCollection)[i] as HTMLInputElement) ;
        let kv={fieldname:e.name,name:e.value, req:e.getAttribute("data-mandatory"), in_list_view:e.getAttribute("data-listview")};
        

        kvpairs.push(kv);
    }
    if(this.tableData[fieldname] === undefined ){
      this.tableData[fieldname] = []
    }
    this.tableData[fieldname].push(kvpairs)
    console.log(this.tableData)
  }
  setLink(data,fieldname=""){
    (document.querySelector('#'+fieldname) as HTMLInputElement).value = data; 
    (document.querySelector('#result-'+fieldname) as HTMLElement).style.display = 'none'; 
    
  }
  openModal(template: TemplateRef<any>, name:String, fieldname:String="") {
    this.tableFields=[];
    this.tableName=name;
    this.tableFieldName=fieldname;
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
      template,Object.assign({}, { class: 'modal-right' })
      
    );
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
  uploadFile(template: TemplateRef<any>, name:String){
    this.modalRef = this.modalService.show(
      template,Object.assign({}, { class: 'modal-fade' })
    );

  }
  asIsOrder(a, b) {
    return 1;
  }
}
