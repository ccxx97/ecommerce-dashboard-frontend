import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentIntegrationComponent } from './add-payment-integration.component';

describe('AddPaymentIntegrationComponent', () => {
  let component: AddPaymentIntegrationComponent;
  let fixture: ComponentFixture<AddPaymentIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPaymentIntegrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPaymentIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
