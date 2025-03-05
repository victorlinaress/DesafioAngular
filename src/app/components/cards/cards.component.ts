import { Component } from '@angular/core';
import { Location } from '../../types/location.interface';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsListComponent } from '../cards-list/cards-list.component';
@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
    @Input() card!: Location;

    constructor() {}

    ngOnInit(): void {
      
    }
}
