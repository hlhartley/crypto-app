import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { PricingComponent } from './Components/pricing/pricing.component';
import { CommonModule } from '@angular/common';
import { PricingService } from './utils/pricing.service';
import { Cryptocurrency } from './models/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, PricingComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private pricingService = inject(PricingService);
  cryptocurrencies: Cryptocurrency[] = [];

  constructor() {
    effect(() => {
      this.pricingService.getPricing().subscribe({
        next: response => {
          if (response.success) {
            response.data.forEach((item: any) => {
              this.cryptocurrencies.push(new Cryptocurrency(item));
            });
            this.cryptocurrencies.sort((a, b) => {
              if (a.price < b.price) {
                return -1;
              } else if (a.price > b.price) {
                return 1;
              }
              return 0;
            })
          }
        },
        error: err => {
          console.log(err);
        }
      });
    })
  }
}
