import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingRoleComponent } from './role.component';

describe('SettingRoleComponent', () => {
  let component: SettingRoleComponent;
  let fixture: ComponentFixture<SettingRoleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
