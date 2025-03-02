import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';

@Component({
  selector: 'app-forms',
  imports: [ReactiveFormsModule], // ✅ Importa o ReactiveFormsModule aqui
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  results: any[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private uniteService: GetUnitsService
  ) {}

  ngOnInit(): void {
    this.uniteService.getAllUnits().subscribe((data) => console.log); //pega a requisição para escutar a resposta
    this.formGroup = this.formBuilder.group({
      hour: [''],
      showClosed: [false],
    });
  }

  OnSubmit(): void {
    console.log(this.formGroup.value);
  }

  OnClear(): void {
    this.formGroup.reset();
  }
}
