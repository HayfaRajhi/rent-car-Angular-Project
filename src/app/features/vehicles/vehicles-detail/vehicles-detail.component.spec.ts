import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesDetailComponent } from './vehicles-detail.component';

describe('VehiclesEditComponent', () => {
  let component: VehiclesDetailComponent;
  let fixture: ComponentFixture<VehiclesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiclesDetailComponent]
    });
    fixture = TestBed.createComponent(VehiclesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
