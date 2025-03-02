import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../../types/location.interface';

@Component({
  selector: 'app-forms',
  imports: [ReactiveFormsModule], // ✅ Importa o ReactiveFormsModule aqui
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private uniteService: GetUnitsService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true,
    });

    this.uniteService.getAllUnits().subscribe((data) => {
      this.results = data.locations; // pega a requisição para escutar a resposta
      this.filteredResults = data.locations;
    });
  }

  OnSubmit(): void {
    if (!this.formGroup.value.showClosed) {
      // Caso não mostre os fechados, filtra apenas os abertos
      this.filteredResults = this.results.filter(
        (location) => location.opened === true
      );
    } else {
      this.filteredResults = this.results;
    }
  }


  OnClear(): void {
    this.formGroup.reset();
  }
}
