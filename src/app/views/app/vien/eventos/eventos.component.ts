import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService} from 'src/app/data/data.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-ofertas',
  templateUrl: './eventos.html',
  styleUrls: ['./eventos.scss']
})
export class EventosComponent implements OnInit {

  doc_list:any[]=[];
  constructor(private dataService: DataService,private _Activatedroute:ActivatedRoute, private notifications: NotificationsService) {
   }

  ngOnInit() {
    (document.querySelector(".preloader") as HTMLElement ).style.cssText = "";
    var date = new Date();
    date.setDate(date.getDate() - 1);
    this.dataService.get_list("Eventos Alumnis",["*"],[["fecha",">", (date.toISOString().slice(0, 10)) ]]).subscribe(data=>{
      this.doc_list = data["data"];
      (document.querySelector(".preloader") as HTMLElement ).style.cssText = "display:none;";

    })

  }
}
