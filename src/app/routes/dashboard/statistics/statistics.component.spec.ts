import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardStatisticsComponent } from './statistics.component';

describe('DashboardStatisticsComponent', () => {
  let component: DashboardStatisticsComponent;
  let fixture: ComponentFixture<DashboardStatisticsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
