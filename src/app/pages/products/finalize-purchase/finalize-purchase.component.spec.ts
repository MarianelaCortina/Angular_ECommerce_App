import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizePurchaseComponent } from './finalize-purchase.component';

describe('FinalizePurchaseComponent', () => {
  let component: FinalizePurchaseComponent;
  let fixture: ComponentFixture<FinalizePurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalizePurchaseComponent]
    });
    fixture = TestBed.createComponent(FinalizePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
