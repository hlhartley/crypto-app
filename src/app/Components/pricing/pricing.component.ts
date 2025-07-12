import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cryptocurrency } from '../../models/models';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})

export class PricingComponent {
  @Input() cryptocurrencies: Cryptocurrency[] = [];
  constructor() {
  }

  trackByFn(index: number, item: any): any {
    return item.id;
  }
}
