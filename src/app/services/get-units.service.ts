import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitsResponse } from '../types/unitsResponse.interface';
import { Location } from '../types/location.interface';

@Injectable({
  providedIn: 'root',
})
export class GetUnitsService {
  readonly apiUrl =
    'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';

  private AllUnisSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]); // armazena e emite a lista de unidades, faz mudanças
  private AllUnits$: Observable<Location[]> = this.AllUnisSubject.asObservable(); // vai observar e notificar os outros
  private filteredUnits: Location[] = []; // armazena a versão filtrada

  constructor(private httpCliente: HttpClient) {
    this.httpCliente.get<UnitsResponse>(this.apiUrl).subscribe((data) => {
      // Retorna a requisição da API
      this.AllUnisSubject.next(data.locations); // Pode mudar o valor através do next
      this.filteredUnits = data.locations; // Atualiza o location
    });
  }

  getAllUnits(): Observable<Location[]> {
    return this.AllUnits$;
  }

  getfilteredUnits () {
    return this.filteredUnits;
  }

  setfilteredUnits(value:Location[]) {
    this.filteredUnits = value;
  }
}
