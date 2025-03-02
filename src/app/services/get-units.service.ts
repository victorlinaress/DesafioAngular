import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnitsResponse } from '../types/unitsResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class GetUnitsService {
  readonly apiUrl =
    'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';

  constructor(private httpCliente: HttpClient) {}

  getAllUnits(): Observable<UnitsResponse> {
    return this.httpCliente.get<UnitsResponse>(this.apiUrl); //retorna a requição da api


  }
}
