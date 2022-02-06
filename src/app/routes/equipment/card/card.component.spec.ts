import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentCardComponent } from './card.component';

describe('EquipmentCardComponent', () => {
  let component: EquipmentCardComponent;
  let fixture: ComponentFixture<EquipmentCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
