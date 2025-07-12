import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { PricingComponent } from './Components/pricing/pricing.component';
import { CommonModule } from '@angular/common';
import { PricingService } from './utils/pricing.service';
import { Cryptocurrency } from './models/models';
import { ChatbotComponent } from './Components/chatbot/chatbot.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, PricingComponent, ChatbotComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private pricingService = inject(PricingService);
  private tokenIds = [3375, 2359, 3388];
  cryptocurrencies: Cryptocurrency[] = [];
  constructor() {
    effect(() => {
      this.pricingService.getPricing(this.tokenIds).subscribe({
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
