import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../../core/models/clients.model';
import { ClientsService } from '../../../../core/services/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-client-dialog',
  templateUrl: './delete-client-dialog.component.html',
  styleUrls: ['./delete-client-dialog.component.scss'],
})
export class DeleteClientDialogComponent implements OnInit {
  client!: Client;
  errorMessage = '';

  constructor(
    private dialogRef: MatDialogRef<DeleteClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { client: Client },
    private clientsService: ClientsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.client = this.data.client;
  }

  onDelete() {
    this.clientsService.deleteClient(this.client.id).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate(['/klienci']);
        this.dialogRef.close();
      },
      error: () => {
        this.errorMessage = 'Wystąpił błąd.';
      },
    });
  }
}
