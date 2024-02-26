import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTransactionComponent } from './custom-transaction.component';

describe('CustomTransactionComponent', () => {
  let component: CustomTransactionComponent;
  let fixture: ComponentFixture<CustomTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
