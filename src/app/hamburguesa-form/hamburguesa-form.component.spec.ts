import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburguesaFormComponent } from './hamburguesa-form.component';

describe('SangucheFormComponent', () => {
  let component: HamburguesaFormComponent;
  let fixture: ComponentFixture<HamburguesaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HamburguesaFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HamburguesaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
