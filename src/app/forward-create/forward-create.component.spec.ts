import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardCreateComponent } from './forward-create.component';

describe('ForwardCreateComponent', () => {
  let component: ForwardCreateComponent;
  let fixture: ComponentFixture<ForwardCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForwardCreateComponent]
    });
    fixture = TestBed.createComponent(ForwardCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
