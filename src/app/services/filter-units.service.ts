import { Injectable } from '@angular/core';
import { Location } from '../types/location.interface';

type Hour_Indexes = 'morning' | 'afternoon' | 'night'; // horários permitidos

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

@Injectable({
  providedIn: 'root',
})
export class FilterUnitsService {
  constructor() {}

  // Converte o número do dia da semana para um formato específico
  transformWeekday(weekday: number): string {
    switch (weekday) {
      case 0:
        return 'Dom.';
      case 6:
        return 'Sáb.';
      default:
        return 'Seg. à Sex.';
    }
  }

  // Filtra as unidades com base no horário de funcionamento
  filterUnits(unit: Location, open_Hour: string, close_Hour: string): boolean {
    if (!unit.schedules) return true;

    let open_hour_filter = parseInt(open_Hour, 10); // Converte o horário de abertura para número
    let close_hour_filter = parseInt(close_Hour, 10); // Converte o horário de fechamento para número
    let todays_weekday = this.transformWeekday(new Date().getDay()); // Converte o dia da semana para o formato ideal

    for (let i = 0; i < unit.schedules.length; i++) {
      let schedule_hour = unit.schedules[i].hour; // Horário de funcionamento
      let schedule_weekday = unit.schedules[i].weekdays; // Dias da semana que funciona

      // Verifica se o dia atual está dentro dos dias de funcionamento da unidade
      if (todays_weekday === schedule_weekday) {
        if (schedule_hour !== 'Fechada') {
          // Divide a string para pegar os horários de abertura e fechamento
          let [unit_open_hour, unit_close_hour] = schedule_hour.split(' às ');
          let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''), 10);
          let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''), 10);

          // Verifica se a unidade está dentro do intervalo de horário selecionado
          if (unit_open_hour_int <= open_hour_filter && unit_close_hour_int >= close_hour_filter) {
            return true;
          }
        }
      }
    }
    return false;
  }

  // Aplica os filtros nas unidades disponíveis
  filter(results: Location[], showClosed: boolean, hour: string): Location[] {
    let intermediateResults = results;

    // Se a opção "mostrar unidades fechadas" estiver desmarcada, remove as fechadas
    if (!showClosed) {
      intermediateResults = results.filter((location) => location.opened === true);
    }

    // Se um horário foi selecionado, aplica o filtro de horário
    if (hour) {
      const Open_Hour = OPENING_HOURS[hour as Hour_Indexes].first; // Horário de abertura
      const Close_Hour = OPENING_HOURS[hour as Hour_Indexes].last; // Horário de fechamento

      return intermediateResults.filter((location) =>
        this.filterUnits(location, Open_Hour, Close_Hour)//
      );
    }

    // Se nenhum horário for selecionado, mantém a lista sem filtro de horário
    return intermediateResults;
  }
}
