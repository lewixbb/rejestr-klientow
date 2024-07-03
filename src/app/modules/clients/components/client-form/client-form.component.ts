import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../../core/services/clients.service';
import { Router } from '@angular/router';
import {
  Client,
  PostClient,
  PostClientForm,
} from '../../../core/models/clients.model';
import { FormsService } from '../../../core/services/forms.service';
import { Observer } from 'rxjs';
import { ClientValidators } from '../../../shared/validators/client.validators';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  @Input() editMode = false;
  @Input() client!: Client;
  @Output() closeDialog = new EventEmitter<void>();
  clientForm!: FormGroup<PostClientForm>;
  errorMessage = '';
  observer: Observer<unknown> = {
    next: () => {
      if (this.editMode) {
        this.emitCloseDialog();
      }
      this.errorMessage = '';
    },
    error: (err) => (this.errorMessage = 'Wystąpił błąd'),
    complete: () => {
      this.editMode
        ? this.router.navigate(['/klienci'])
        : this.router.navigate(['/klienci']);
    },
  };

  constructor(
    private clientService: ClientsService,
    private router: Router,
    private forms: FormsService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get controls() {
    return this.clientForm.controls;
  }

  initForm() {
    this.clientForm = new FormGroup({
      firstname: new FormControl(this.editMode ? this.client.firstname : '', {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true,
      }),
      surname: new FormControl(this.editMode ? this.client.surname : '', {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true,
      }),
      email: new FormControl(this.editMode ? this.client.email : '', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      phone: new FormControl(this.editMode ? this.client.phone : '', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      address: new FormControl(this.editMode ? this.client.address : '', {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true,
      }),
      postcode: new FormControl(this.editMode ? this.client.postcode : '', {
        validators: [Validators.required, ClientValidators.postcode],
        nonNullable: true,
      }),
    });
  }

  getErrorMessage(control: FormControl) {
    return this.forms.getErrorMessage(control);
  }

  addClient(client: PostClient) {
    this.clientService.postClients(client).subscribe(this.observer);
  }

  editClient(client: PostClient, id: number) {
    this.clientService.putClient(client, id).subscribe(this.observer);
  }

  transferData() {
    const client: PostClient = this.clientForm.getRawValue();
    if (this.editMode) {
      this.editClient(client, this.client.id);
    } else {
      this.addClient(client);
    }
  }

  emitCloseDialog() {
    this.closeDialog.emit();
  }
}
