import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessHistoryComponent } from './history.component';

describe('BusinessHistoryComponent', () => {
  let component: BusinessHistoryComponent;
  let fixture: ComponentFixture<BusinessHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
