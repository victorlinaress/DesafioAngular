import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FormsComponent } from './components/forms/forms.component';
import { BehaviorSubject } from 'rxjs';
import { CardsListComponent } from "./compoments/cards-list/cards-list.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FormsComponent, CardsListComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showlist = new BehaviorSubject(false);
  title = 'desafio-smartfit';
  onSubmit() {
    console.log('chegou no app');
  }
}
