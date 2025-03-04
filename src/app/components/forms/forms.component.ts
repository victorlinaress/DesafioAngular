import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../../types/location.interface';
import { FilterUnitsService } from '../../services/filter-units.service';

type Hour_Indexes = 'morning' | 'afternoon' | 'night'; // Horários permitidos

@Component({
  selector: 'app-forms',
  imports: [ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  results: Location[] = []; // Unidades disponíveis
  filteredResults: Location[] = []; // Lista das unidades filtradas conforme o formulário
  formGroup!: FormGroup; // Formulário

  constructor(
    private formBuilder: FormBuilder,
    private uniteService: GetUnitsService, // Serviço para buscar as unidades
    private filterUnitsService: FilterUnitsService // Serviço para filtrar as unidades
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '', // Seleção de horário (morning, afternoon, night)
      showClosed: true, // Opção para exibir unidades fechadas ou não
    });

    this.uniteService.getAllUnits().subscribe((data) => {
      this.results = data; // Armazena as unidades
      this.filteredResults = data;
    });
  }

  OnSubmit(): void {
    let { showClosed, hour } = this.formGroup.value;

    this.filteredResults = this.filterUnitsService.filter(
      this.results,
      showClosed,
      hour
    );
    this.uniteService.setfilteredUnits(this.filteredResults);

  }

  OnClear(): void {
    this.formGroup.reset();
  }


}
