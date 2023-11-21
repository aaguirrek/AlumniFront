import { Component, OnInit,  AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService} from 'src/app/data/data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-form',
  templateUrl: './alianza.html',
  styleUrls: ['./alianza.scss']
})
export class AlianzaComponent implements OnInit, AfterContentInit {
  
  constructor(private dataService: DataService,private modalService: BsModalService,private _Activatedroute:ActivatedRoute) {
    
  }

  ngAfterContentInit():void{
  
  }
  ngOnDestroy():void{
    
  }
  ngOnInit():void{
    
  }
  
}




//nosotros protegemos lo que mas quieres