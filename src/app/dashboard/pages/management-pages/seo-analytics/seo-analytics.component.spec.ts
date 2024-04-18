import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoAnalyticsComponent } from './seo-analytics.component';

describe('SeoAnalyticsComponent', () => {
  let component: SeoAnalyticsComponent;
  let fixture: ComponentFixture<SeoAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeoAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeoAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
