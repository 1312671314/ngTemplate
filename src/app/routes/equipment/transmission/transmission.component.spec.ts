import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentTransmissionComponent } from './transmission.component';

describe('EquipmentTransmissionComponent', () => {
  let component: EquipmentTransmissionComponent;
  let fixture: ComponentFixture<EquipmentTransmissionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentTransmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentTransmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
