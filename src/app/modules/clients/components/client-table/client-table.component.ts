import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ClientsService } from '../../../core/services/clients.service';
import { Client } from '../../../core/models/clients.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, merge, Subscription } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss'],
})
export class ClientTableComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'lp',
    'firstname',
    'surname',
    'email',
    'buttons',
  ];
  dataSource!: MatTableDataSource<Client>;
  clients!: Client[];
  totalCount = 0;
  filterValue = new FormControl('', { nonNullable: true });
  sub = new Subscription();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientService: ClientsService) {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub.add(
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            return this.clientService.getClients(
              this.paginator.pageIndex,
              this.paginator.pageSize,
              this.sort.active,
              this.sort.direction,
            );
          }),
          map((data) => {
            this.totalCount = data.totalCount;
            return data.clients;
          }),
        )
        .subscribe(
          (clients) => {
            this.dataSource = new MatTableDataSource<Client>(clients);
          },
          (error) => console.log(error),
        ),
    );

    this.sub.add(
      this.filterValue.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe({
          next: (value) => {
            this.applyFilter(value?.trim());
          },
        }),
    );
  }

  applyFilter(value: string) {
    this.clientService
      .getClients(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction,
        value,
      )
      .subscribe({
        next: (response) => {
          this.totalCount = response.totalCount;
          this.dataSource = new MatTableDataSource<Client>(response.clients);
        },
      });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
