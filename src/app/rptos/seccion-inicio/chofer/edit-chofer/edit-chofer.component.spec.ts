import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChoferComponent } from './edit-chofer.component';

describe('EditChoferComponent', () => {
  let component: EditChoferComponent;
  let fixture: ComponentFixture<EditChoferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditChoferComponent]
    });
    fixture = TestBed.createComponent(EditChoferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
