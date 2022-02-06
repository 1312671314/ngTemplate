import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentApplianceComponent } from './appliance.component';

describe('EquipmentApplianceComponent', () => {
  let component: EquipmentApplianceComponent;
  let fixture: ComponentFixture<EquipmentApplianceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentApplianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentApplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
