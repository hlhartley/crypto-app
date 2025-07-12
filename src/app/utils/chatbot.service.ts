import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private http = inject(HttpClient);

  constructor() { }

  getChatbotResponse(messages: any) {
    // Currently only for paid API subscriptions
    const baseUrl = 'https://api.tokenmetrics.com/v2/tmai';
    const apiKey = 'tm-c6ec5e74-9bd2-496e-802e-044833b8a4fb';
    const body = JSON.stringify({messages: messages});
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'x-api-key': apiKey,
        'content-type': 'application/json',
      },
    }
    return this.http.post(baseUrl, body, options);
  }
}
