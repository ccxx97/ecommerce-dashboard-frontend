import { Component } from '@angular/core';

@Component({
  selector: 'app-add-payment-integration',
  templateUrl: './add-payment-integration.component.html',
  styleUrl: './add-payment-integration.component.scss'
})
export class AddPaymentIntegrationComponent {


  newIntegration: any = {
    name: '',
    apiKey: '',
    secretKey: '',
    isActive: true
  };

  addIntegration() {
  }

}
