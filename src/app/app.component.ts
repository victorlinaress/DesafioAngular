import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FormsComponent } from './components/forms/forms.component';
import { BehaviorSubject } from 'rxjs';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { CommonModule } from '@angular/common';
import { GetUnitsService } from './services/get-units.service';
import { Location } from './types/location.interface';
import { LegendComponent } from "./components/legend/legend.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FormsComponent, CardsListComponent, CommonModule, LegendComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showlist = new BehaviorSubject(false);
  unitsLists: Location[] = []; // Armazena as unidades filtradas

  constructor(private unitService: GetUnitsService) {}

  title = 'desafio-smartfit';

  onSubmit() {
    this.unitsLists = this.unitService.getfilteredUnits();
    this.showlist.next(true);
  }
}
