import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBeweryComponent } from './single-bewery.component';

describe('SingleBeweryComponent', () => {
  let component: SingleBeweryComponent;
  let fixture: ComponentFixture<SingleBeweryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleBeweryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleBeweryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
