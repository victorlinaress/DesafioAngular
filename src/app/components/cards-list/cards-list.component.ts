import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../../types/location.interface';
import { CardsComponent } from "../cards/cards.component"; // Importando o componente correto
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [CardsComponent, CommonModule], // Certifique-se de incluir o CardsComponent
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
})
export class CardsListComponent implements OnInit {
  @Input() unitsList: Location[] = [];

  constructor() {}

  ngOnInit(): void {}

}
