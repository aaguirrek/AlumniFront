import { Component, OnInit } from '@angular/core';

import { DataService} from 'src/app/data/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.html'
})
export class SearchComponent implements OnInit {

  cur_doc:any[] = [];
  constructor(private dataService: DataService) {
    this.cur_doc = [];
   }

  ngOnInit() {
    const docname = "Oferta Laboral"
    this.dataService.get_list(docname, ["*"],[["docstatus","=","1"]]).subscribe(data => {
      let resp = data["data"]
      this.cur_doc = resp
    })

  }

}
