import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditKkPage } from './edit-kk.page';

describe('EditKkPage', () => {
  let component: EditKkPage;
  let fixture: ComponentFixture<EditKkPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditKkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
