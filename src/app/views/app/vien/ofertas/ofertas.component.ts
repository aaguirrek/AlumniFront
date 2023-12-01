import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { DataService} from 'src/app/data/data.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.html'
})
export class OfertasComponent implements OnInit {

  cur_doc:any[] = [];
  filters:{[key:string]:string}={};
  filters2:{[key:string]:string}={};
  comment_ref:String;
  carreras:any[] = [];
  modals:{[key:string]:BsModalRef} = {};
  docname = "Oferta Laboral";
  values:{[key:string]:string} = {provincia:"Provincia",tipoDePuesto:"Tipo de puesto", modalidad:"Modalidad", carreras:"Todas las carreras"};
  constructor(private dataService: DataService,private modalService: BsModalService) {
    this.cur_doc = [];
   }
   formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
  }
  ngOnInit() {

    (document.querySelector(".preloader") as HTMLElement ).style.cssText = "display:inline-block;"
    this.dataService.get_list_order(this.docname, ["*"],[["docstatus","=","1"],["fin_de_publicación",">",this.formatDate(new Date())]]).subscribe(data => {
      let resp = data["data"]
      this.cur_doc = resp;

      (document.querySelector(".preloader") as HTMLElement ).style.cssText = "display:none;"
    })
    this.dataService.get_list_name_limit("Nombre de carrera", ["name","nombre"],250).subscribe(data => {
      let resp = data["data"]
      this.carreras = resp
    })
  }
  hideModal(modal:string = ""){
    this.modals[modal].hide();

  }
  showModal(template: TemplateRef<any>,name:string){
    this.comment_ref=name;
    this.modals[name] = this.modalService.show(
      template,Object.assign({}, { class: 'modal-fade' })
    );

  }
  SelectThis(modal:string, name:string,id?:string){
    this.values[modal]= name;
    this.filters[modal] = name;
    this.filters2[modal] = id;
    let filter=[]
    filter.push(["docstatus","=","1"])
    if(modal==="provincia" && name==="Todos"){
      this.values[modal]= "Provincia";
      delete this.filters[modal];
    }
    if(modal==="tipoDePuesto" && name==="Todos"){
      this.values[modal]= "Tipo de puesto";
      delete this.filters[modal];
    }
    if(modal==="modalidad" && name==="Todos"){
      this.values[modal]= "Modalidad";
      delete this.filters[modal];
    }
    if(modal==="carreras" && name==="Todas"){
      this.values[modal]= "Todas las carreras";
      delete this.filters[modal];
    }
    for (const key in this.filters) {
      if(key==="carreras"){
        filter.push([key,"like","%|"+this.filters2[key]+"|%"])
      }else{
        if(key==="modalidad"){
          filter.push(["modalidad_de_trabajo","=",this.filters[key]])
        }
        if(key==="provincia"){
          filter.push(["localidad","=",this.filters[key]])
        }
        if(key==="tipoDePuesto"){
          filter.push(["tipo_de_puesto","=",this.filters[key]])
        }
      }
    }
    this.dataService.get_list_order(this.docname, ["*"],filter).subscribe(data => {
      let resp = data["data"]
      this.cur_doc = resp
    })
    this.modals[modal].hide();
  }
}
