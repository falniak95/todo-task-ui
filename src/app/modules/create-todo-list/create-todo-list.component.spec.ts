import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTodoListComponent } from './create-todo-list.component';

describe('CreateTodoListComponent', () => {
  let component: CreateTodoListComponent;
  let fixture: ComponentFixture<CreateTodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTodoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
