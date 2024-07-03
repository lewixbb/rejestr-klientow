import { Component } from '@angular/core';
import { ClientsService } from '../core/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
  constructor(private clientsService: ClientsService) {}
}
