import { Component, effect, inject } from '@angular/core';
import { PricingService } from '../../utils/pricing.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})

export class PricingComponent {
  pricingData: any;
  private pricingService = inject(PricingService);

  constructor() {
    effect(() => {
      this.pricingData = this.pricingService.getPricing().subscribe({
        next: response => {
          if (response.success) {
            this.pricingData = response.data;
          }
        },
        error: err => {
          console.log(err);
        }
      });
    })
  }
}
