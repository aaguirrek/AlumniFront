import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService} from 'src/app/data/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  documento:String;
  fields:[];
  datas:[];
  constructor(private dataService: DataService,private _Activatedroute:ActivatedRoute) { 
    this.documento = "";
    this.fields=[];
    this.datas=[];
  }

  ngOnInit(): void {
    const docname:String = this._Activatedroute.snapshot.paramMap.get("docname");
    this.documento = docname
    this.dataService.getTables(docname).subscribe(fields => {
      this.fields = fields["message"]
      this.dataService.getListData(docname,fields["message"]).subscribe(data => {
        this.datas = data['data']
        console.log(data['data'])
      })
    })
  }
  asIsOrder(a, b) {
    return 1;
  }
}
