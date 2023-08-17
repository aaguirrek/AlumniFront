import { Component, OnInit } from '@angular/core';

import { DataService} from 'src/app/data/data.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html'
})
export class StartComponent implements OnInit {

  cur_doc:object = {};
  ofertas:any[]=[];
  doc_aprovado:any[]=[];
  eventos:any[]=[];
  constructor(private dataService: DataService) {
    this.cur_doc = {
      'experiencia_laboral':[],
      'educacion_superior':[],
      'educacion_basica':[]
    };
   }

  ngOnInit() {
    (document.querySelector(".preloader") as HTMLElement ).style.cssText = "display:inline-block;";
    const docname = "Perfil del exalumno";
    var date = new Date();
    date.setDate(date.getDate() - 1);
    if(DataService.ENV_VARS.UserData!==null ){
      this.cur_doc = DataService.ENV_VARS.UserData;

      this.dataService.get_list("Postulacion",["*"],[["exalumno","=",localStorage.getItem("email")]]).subscribe(data=>{
      this.ofertas = data["data"];
      (document.querySelector(".preloader") as HTMLElement ).style.cssText = "display:none;";

      })
      this.dataService.get_list("Asesorias",["name"],[["egresado","=",localStorage.getItem("email")],["estado","=","Aprobado"]]).subscribe(data=>{
        this.doc_aprovado= data["data"]
      })
      this.dataService.get_list("Eventos Alumnis",["*"],[["fecha",">", (date.toISOString().slice(0, 10)) ]]).subscribe(data=>{
        this.eventos = data["data"]
      })
    }else{
      this.dataService.get_doc(docname,localStorage.getItem("email")).subscribe(data => {
        let resp = data["data"]
        this.cur_doc = resp
      });
      this.dataService.get_list("Postulacion",["*"],[["exalumno","=",localStorage.getItem("email")]]).subscribe(data=>{
        this.ofertas = data["data"];
        setTimeout(()=>{
          (document.querySelector(".preloader") as HTMLElement ).style.cssText = "display:none;";
        },1000)
      })
      this.dataService.get_list("Asesorias",["name"],[["egresado","=",localStorage.getItem("email")],["estado","=","Aprobado"]]).subscribe(data=>{
        this.doc_aprovado= data["data"]
      })
      this.dataService.get_list("Eventos Alumnis",["*"],[["fecha",">", (date.toISOString().slice(0, 10)) ]]).subscribe(data=>{
        this.eventos = data["data"]
      })
    }
  }

}
