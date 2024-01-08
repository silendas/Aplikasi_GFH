import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IuranPage } from './iuran.page';

describe('IuranPage', () => {
  let component: IuranPage;
  let fixture: ComponentFixture<IuranPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(IuranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
