import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VienComponent } from './vien.component';
import { StartComponent } from './start/start.component';
import { PerfilComponent } from './exalumno/perfil';
import { OfertasComponent } from './ofertas/ofertas.component';
import { OfertaComponent } from './oferta/oferta.component';
import { AlianzaComponent } from './alianzas/alianza';
import { EventosComponent } from './eventos/eventos.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { NetworkingComponent } from './networking/networking.component';
import { EmprendedoresComponent } from './emprendedores/emprendedores.component';
import { AsesoriasComponent } from './asesorias/asesorias.component';
import { SearchComponent } from './search/search.component';
import { PreguntasComponent } from './preguntas/asesorias.component';
import { ResultadosComponent } from './resultados/asesorias.component';
import { SelAreaComponent } from './SeleccionaArea/asesorias.component';
import { GestorComponent } from './gestor/gestor.component';

import { AptitudesComponent } from './aptitudes/gestor.component';

const routes: Routes = [
    {
        path: '', component: VienComponent,
        children: [
            { path: '', redirectTo: 'start', pathMatch: 'full' },
            { path: 'start', component: StartComponent },
            { path: 'perfil',component: PerfilComponent },
            { path: 'ofertas',component: OfertasComponent },
            { path: 'gestorcarreras',component: GestorComponent },
            { path: 'networking',component: NetworkingComponent },
            { path: 'eventos',component: EventosComponent },
            { path: 'ofertas/:docname',component: OfertaComponent },
            { path: 'search/:values',component: SearchComponent },
            { path: 'doctype/:docname',component: FormComponent },
            { path: 'doctype/:docname/:name',component: FormComponent },
            { path: 'doctype/:docname/:name',component: FormComponent },
            { path: 'list/:docname',component: ListComponent },
            { path: 'emprendedores',component: EmprendedoresComponent },
            { path: 'enlaces',component: AlianzaComponent },
            { path: 'asesorias',component: AsesoriasComponent },
            { path: 'preguntas',component: PreguntasComponent },
            { path: 'aptitudes',component: AptitudesComponent },
            { path: 'selecciona',component: SelAreaComponent },
            { path: 'resultados',component: ResultadosComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VienRoutingModule { }
