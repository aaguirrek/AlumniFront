import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService} from 'src/app/data/data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService } from 'angular2-notifications';
import { Colors } from '../../../../constants/colors.service';


import {  Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'gestor',
  templateUrl: './asesorias.html',
  styleUrls: ['./asesorias.scss']
})
export class ResultadosComponent implements  AfterViewInit, OnDestroy {

  @Input() shadow = false;
  @Input() options;
  @Input() data;
  @Input() class = 'chart-container';
  @ViewChild('chart', { static: true }) chartRef: ElementRef;

  chart: Chart;

  doc:any={};
  doc_list:any[]=[];
  doc_aprovado:any[]=[];
  modalRef: BsModalRef;
  constructor(private dataService: DataService,private _Activatedroute:ActivatedRoute, private notifications: NotificationsService, private modalService: BsModalService) { }


  ngAfterViewInit() {
    if (this.shadow) {
      Chart.defaults.radarWithShadow = Chart.defaults.radar;
      Chart.controllers.radarWithShadow = Chart.controllers.radar.extend({
        draw(ease) {
          Chart.controllers.radar.prototype.draw.call(this, ease);
          const chartCtx = this.chart.chart.ctx;
          chartCtx.save();
          chartCtx.shadowColor = 'rgba(0,0,0,0.2)';
          chartCtx.shadowBlur = 7;
          chartCtx.shadowOffsetX = 0;
          chartCtx.shadowOffsetY = 7;
          chartCtx.responsive = true;
          Chart.controllers.radar.prototype.draw.apply(this, arguments);
          chartCtx.restore();
        }
      });
    }

    const chartRefEl = this.chartRef.nativeElement;
    const ctx = chartRefEl.getContext('2d');
    this.chart = new Chart(ctx, {
      type: this.shadow ? 'radarWithShadow' : 'radar',
      data: {
        datasets: [
          {
            label: 'Requerido',
            borderWidth: 2,
            pointBackgroundColor: Colors.getColors().themeColor1,
            borderColor: Colors.getColors().themeColor1,
            backgroundColor: Colors.getColors().themeColor1_10,
            data: [80, 90, 70]
          },
          {
            label: 'Tu nivel',
            borderWidth: 2,
            pointBackgroundColor: Colors.getColors().themeColor2,
            borderColor: Colors.getColors().themeColor2,
            backgroundColor: Colors.getColors().themeColor2_10,
            data: [68, 80, 95]
          }
        ],
        labels: ['Programacion', 'Base de datos', 'Estadística']
      },
      options: this.options
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
