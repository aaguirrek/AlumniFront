import { NgModule } from '@angular/core';
import { StartComponent } from './start/start.component';
import { PerfilComponent } from './exalumno/perfil';
import { VienComponent } from './vien.component';
import { FormsContainersModule } from 'src/app/containers/forms/forms.containers.module';
import { VienRoutingModule } from './vien.routing';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { OfertasLaboralesComponent } from './ofertas-laborales/ofertas-laborales.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { GestorComponent } from './gestor/gestor.component';
import { OfertaComponent } from './oferta/oferta.component';
import { EventosComponent } from './eventos/eventos.component';
import { NetworkingComponent } from './networking/networking.component';
import { EmprendedoresComponent } from './emprendedores/emprendedores.component';
import { AsesoriasComponent } from './asesorias/asesorias.component';
import { SearchComponent } from './search/search.component';
import { NouisliderModule } from 'ng2-nouislider';
import { PreguntasComponent } from './preguntas/asesorias.component';
import { ResultadosComponent } from './resultados/asesorias.component';
import { AptitudesComponent } from './aptitudes/gestor.component';
import { QuillModule } from 'ngx-quill';
@NgModule({
  declarations: [
    VienComponent,
    StartComponent,
    PerfilComponent,
    FormComponent,
    ListComponent,
    OfertasLaboralesComponent,
    OfertasComponent,
    GestorComponent,
    OfertaComponent,
    PreguntasComponent,
    ResultadosComponent,
    AptitudesComponent,
    EventosComponent,
    AsesoriasComponent,
    EmprendedoresComponent,
    NetworkingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    FormsContainersModule,
    VienRoutingModule,
    LayoutContainersModule,
    NouisliderModule,
    SimpleNotificationsModule.forRoot(),
    QuillModule.forRoot()
  ],
  providers:[BsDatepickerConfig]
})
export class VienModule { }
