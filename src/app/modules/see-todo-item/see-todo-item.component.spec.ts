import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeTodoItemComponent } from './see-todo-item.component';

describe('SeeTodoItemComponent', () => {
  let component: SeeTodoItemComponent;
  let fixture: ComponentFixture<SeeTodoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeTodoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeTodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
