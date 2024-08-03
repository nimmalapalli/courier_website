import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bCreateComponent } from './b2b-create.component';

describe('B2bCreateComponent', () => {
  let component: B2bCreateComponent;
  let fixture: ComponentFixture<B2bCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [B2bCreateComponent]
    });
    fixture = TestBed.createComponent(B2bCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
