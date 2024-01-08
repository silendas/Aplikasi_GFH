import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateKkPage } from './create-kk.page';

describe('CreateKkPage', () => {
  let component: CreateKkPage;
  let fixture: ComponentFixture<CreateKkPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateKkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
