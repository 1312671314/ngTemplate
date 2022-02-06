import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentGasComponent } from './gas.component';

describe('EquipmentGasComponent', () => {
  let component: EquipmentGasComponent;
  let fixture: ComponentFixture<EquipmentGasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentGasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentGasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
