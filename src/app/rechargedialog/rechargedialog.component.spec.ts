import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargedialogComponent } from './rechargedialog.component';

describe('RechargedialogComponent', () => {
  let component: RechargedialogComponent;
  let fixture: ComponentFixture<RechargedialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechargedialogComponent]
    });
    fixture = TestBed.createComponent(RechargedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
