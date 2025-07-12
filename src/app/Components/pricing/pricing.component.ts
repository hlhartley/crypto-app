import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cryptocurrency } from '../../models/models';
import { CurrencyPipe } from '@angular/common';
import { PricingService } from '../../utils/pricing.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})

export class PricingComponent {
  @Input() cryptocurrencies: Cryptocurrency[] = [];
  private pricingService = inject(PricingService);
  tokenId: number = 0;
  cryptocurrenciesSearchedFor: Cryptocurrency[] = [];

  constructor() {
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

  findPrice(e: Event) {
    e.preventDefault();
    if (this.tokenId) {
      this.pricingService.getPricing([this.tokenId]).subscribe({
        next: response => {
          if (response.success) {
            response.data.forEach((item: any) => {
              this.cryptocurrenciesSearchedFor.push(new Cryptocurrency(item));
            });
            this.tokenId = 0;
          }
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }

  removeSearchItem(id: number) {
    if (id) {
      this.cryptocurrenciesSearchedFor = this.cryptocurrenciesSearchedFor.filter((cryptocurrency) => cryptocurrency.id !== id);
    }
  }
}
