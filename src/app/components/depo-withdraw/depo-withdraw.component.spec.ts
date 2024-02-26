import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepoWithdrawComponent } from './depo-withdraw.component';

describe('DepoWithdrawComponent', () => {
  let component: DepoWithdrawComponent;
  let fixture: ComponentFixture<DepoWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepoWithdrawComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepoWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
