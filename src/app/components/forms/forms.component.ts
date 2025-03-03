import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../../types/location.interface';

//horarios de funcionamento
const OPENING_HOURS = {
  morning: {
    first: '06',
    last: '12',
  },
  afternoon: {
    first: '12',
    last: '18',
  },
  night: {
    first: '18',
    last: '23',
  },
};

type Hour_Indexes = 'morning' | 'afternoon' | 'night'; //horarios permitidos

@Component({
  selector: 'app-forms',
  imports: [ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  results: Location[] = []; //unidades disponiveis
  filteredResults: Location[] = [];//lista das unidades filtradas conforme o formulário
  formGroup!: FormGroup; //formulario

  constructor(
    private formBuilder: FormBuilder,
    private uniteService: GetUnitsService //buscar as unidades
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '', // seleção de horário (morning, afternoon, night)
      showClosed: true, // opção para exibir unidades fechadas ou não
    });

    this.uniteService.getAllUnits().subscribe((data) => {
      this.results = data.locations; //armazena as unidades
      this.filteredResults = data.locations;
    });
  }

  transformWeekday(weekday: number): string { //converte o número do dia da semana para um formato específico

    switch (weekday) {
      case 0:
        return 'Dom.';
      case 6:
        return 'Sáb.';
      default:
        return 'Seg. à Sex.';
    }
  }

  filterUnits(unit: Location, open_Hour: string, close_Hour: string): boolean {
    if (!unit.schedules) return true;

    let open_hour_filter = parseInt(open_Hour, 10);// converte o horário de abertura para número
    let close_hour_filter = parseInt(close_Hour, 10);// converte o horário de fechadura para número
    let todays_weekday = this.transformWeekday(new Date().getDay()); //converte o dia da semana para o formato ideal

    for (let i = 0; i < unit.schedules.length; i++) {
      let schedule_hour = unit.schedules[i].hour; //horario de funcionamento
      let schedule_weekday = unit.schedules[i].weekdays; //dias das semanas que funciona

      if (todays_weekday === schedule_weekday) { // verifica se o dia atual está dentro dos dias de funcionamento da unidade
        if (schedule_hour !== 'Fechada') {
          let [unit_open_hour, unit_close_hour] = schedule_hour.split(' às '); // divide a string para pegar os horários de abertura e fechamento
          let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''), 10); // Converte os horários para números inteiros
          let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''), 10);

          if (unit_open_hour_int <= open_hour_filter && unit_close_hour_int >= close_hour_filter) { // verifica se a unidade está dentro do intervalo de horário selecionado

            return true;
          }
        }
      }
    }
    return false;
  }

  OnSubmit(): void {
    let { showClosed, hour } = this.formGroup.value;
    let intermediateResults = this.results;

    if (!showClosed) {  // se a opção "mostrar unidades fechadas" estiver desmarcada, remove as fechadas

      intermediateResults = this.results.filter((location) => location.opened === true);
    }

    if (hour) {  // se um horário foi selecionado, aplica o filtro de horário

      const Open_Hour = OPENING_HOURS[hour as Hour_Indexes].first;//horario de abertura
      const Close_Hour = OPENING_HOURS[hour as Hour_Indexes].last;//hor de fechnamento
      this.filteredResults = intermediateResults.filter((location) =>// filtra as unidades que estão abertas dentro do horário escolhido

        this.filterUnits(location, Open_Hour, Close_Hour) 
      );
    } else {
      this.filteredResults = intermediateResults; // se nenhum horário for selecionado, mantém a lista sem filtro de horário
    }

  }

  OnClear(): void {
    this.formGroup.reset();
  }
}
