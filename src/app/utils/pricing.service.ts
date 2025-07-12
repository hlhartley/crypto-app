import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PricingService {
  private http = inject(HttpClient);

  getPricing(tokenIds: Array<number>): Observable<any> {
    const baseUrl = `https://api.tokenmetrics.com/v2/price`;
    const params = new HttpParams()
      .set('token_id', tokenIds.join(','));
    const apiKey = 'tm-0286d1de-8a2b-4614-b6fa-0b54ff84a3c0';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-api-key': apiKey,
      },
      params,
    }
    return this.http.get<any>(baseUrl, options);
  }
}
