import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Guarded } from './guarded';

describe('Guarded', () => {
  let component: Guarded;
  let fixture: ComponentFixture<Guarded>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Guarded]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Guarded);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
