import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsComponent } from './views.component';
import { ViewRoutingModule } from './views.routing';
import { SharedModule } from '../shared/shared.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { UiModalsContainersModule } from '../containers/ui/modals/ui.modals.containers.module';


@NgModule({
  declarations: [ViewsComponent],
  imports: [
    UiModalsContainersModule,
    DropzoneModule,
    CommonModule,
    ViewRoutingModule,
    SharedModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule
  ]
})
export class ViewsModule {}
