import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiAndIntegrationComponent } from './api-and-integration.component';

describe('ApiAndIntegrationComponent', () => {
  let component: ApiAndIntegrationComponent;
  let fixture: ComponentFixture<ApiAndIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiAndIntegrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiAndIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
