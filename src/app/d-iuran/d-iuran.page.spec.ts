import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DIuranPage } from './d-iuran.page';

describe('DIuranPage', () => {
  let component: DIuranPage;
  let fixture: ComponentFixture<DIuranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DIuranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
