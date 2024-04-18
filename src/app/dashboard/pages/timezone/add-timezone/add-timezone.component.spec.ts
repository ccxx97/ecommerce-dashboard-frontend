import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimezoneComponent } from './add-timezone.component';

describe('AddTimezoneComponent', () => {
  let component: AddTimezoneComponent;
  let fixture: ComponentFixture<AddTimezoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTimezoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTimezoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
