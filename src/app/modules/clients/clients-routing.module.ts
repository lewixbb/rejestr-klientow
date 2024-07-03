import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientComponent } from './components/client/client.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { authActivateFunctionGuard } from '../core/guards/auth-activate.function.guard';
import { clientFormDeactivateGuard } from '../core/guards/client-form.deactivate.guard';

const routes: Routes = [
  {
    path: '',
    // canActivate: [authActivateFunctionGuard],
    component: ClientsComponent,
  },
  {
    path: 'dodaj',
    canDeactivate: [clientFormDeactivateGuard],
    component: ClientFormComponent,
  },
  { path: ':id', component: ClientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
