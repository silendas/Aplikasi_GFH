import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DLainPage } from './d-lain.page';

describe('DLainPage', () => {
  let component: DLainPage;
  let fixture: ComponentFixture<DLainPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DLainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
