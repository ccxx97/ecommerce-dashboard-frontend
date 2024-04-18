import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-api-and-integration',
  templateUrl: './api-and-integration.component.html',
  styleUrl: './api-and-integration.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class ApiAndIntegrationComponent {



  paymentIntegrations: any[] = [
    { id: 1, name: 'Stripe', apiKey: 'XXXXXXXXXXXXXXXXXXXXX', secretKey: 'YYYYYYYYYYYYYYYYYYYYY', isActive: true },
    { id: 2, name: 'PayPal', apiKey: 'AAAAAAAAAAAAAAAAAAAAA', secretKey: 'BBBBBBBBBBBBBBBBBBBBB', isActive: false },
  ];

  editIntegration(integration: any) {
    console.log('Entegrasyon düzenleme:', integration);
  }

  deleteIntegration(integration: any) {
    console.log('Entegrasyon silme:', integration);
  }

  updateIntegrationStatus(integration: any) {
    console.log('Entegrasyon durumu güncellendi:', integration);
  }

}
