import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeTodoListComponent } from './see-todo-list.component';

describe('SeeTodoListComponent', () => {
  let component: SeeTodoListComponent;
  let fixture: ComponentFixture<SeeTodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeTodoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
