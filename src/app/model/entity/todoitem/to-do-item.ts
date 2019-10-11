import { AbstractEntity } from '../abstract-entity';
import { SimpleEntity } from '../simple-entity';

export class ToDoItem extends AbstractEntity {

  name: string;
	detail: string;
  status: boolean;
  deadline: Date;
  dependencyItemList: SimpleEntity;
  toDoList: SimpleEntity;

}
