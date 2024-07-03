import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable, map } from 'rxjs';
import {
  Client,
  ClientResponse,
  GetClientResponse,
  PostClient,
} from '../models/clients.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiUrl;

  getClients(
    pageIndex: number,
    pageLimit: number,
    activeSortTarget: string,
    order: string,
    value = '',
  ): Observable<GetClientResponse> {
    let params = new HttpParams()
      .append('_page', pageIndex + 1)
      .append('_limit', pageLimit);
    if (activeSortTarget) {
      params = params.append('_sort', activeSortTarget).append('_order', order);
    }
    if (value) {
      params = params.append('firstname_like', value);
    }
    return this.http
      .get<ClientResponse[]>(`${this.apiUrl}/clients`, {
        params,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (!response.body) {
            return { clients: [], totalCount: 0 };
          }
          const totalCount = Number(response.headers.get('X-Total-Count'));
          const clientsArr: Client[] = response.body.map(
            ({ id, firstname, surname, email, phone, address, postcode }) =>
              new Client(
                id,
                firstname,
                surname,
                email,
                phone,
                address,
                postcode,
              ),
          );
          return { clients: clientsArr, totalCount };
        }),
      );
  }

  getClient(id: number): Observable<Client> {
    return this.http
      .get<ClientResponse>(`${this.apiUrl}/clients/${id}`)
      .pipe(
        map(
          ({ id, firstname, surname, email, phone, address, postcode }) =>
            new Client(id, firstname, surname, email, phone, address, postcode),
        ),
      );
  }

  postClients(client: PostClient): Observable<Client> {
    return this.http
      .post<ClientResponse>(`${this.apiUrl}/clients`, client)
      .pipe(
        map(
          ({ id, firstname, surname, email, phone, address, postcode }) =>
            new Client(id, firstname, surname, email, phone, address, postcode),
        ),
      );
  }

  putClient(client: PostClient, id: number): Observable<Client> {
    return this.http
      .put<ClientResponse>(`${this.apiUrl}/clients/${id}`, client)
      .pipe(
        map(
          ({ id, firstname, surname, email, phone, address, postcode }) =>
            new Client(id, firstname, surname, email, phone, address, postcode),
        ),
      );
  }

  deleteClient(id: number): Observable<Record<string, never>> {
    return this.http.delete<Record<string, never>>(
      `${this.apiUrl}/clients/${id}`,
    );
  }
}
