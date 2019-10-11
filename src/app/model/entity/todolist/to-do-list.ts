
import { AbstractEntity } from "../abstract-entity";
import { SimpleEntity } from '../simple-entity';

export class ToDoList extends AbstractEntity {

	name: string;
	detail: string;
  status: boolean;
  user: SimpleEntity;
  toDoItemList: SimpleEntity[];

}
