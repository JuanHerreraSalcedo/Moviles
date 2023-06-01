import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrilPage } from './carril.page';

describe('CarrilPage', () => {
  let component: CarrilPage;
  let fixture: ComponentFixture<CarrilPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CarrilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
