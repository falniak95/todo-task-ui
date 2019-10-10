import { AbstractEntity } from "../../abstract-entity";
import { SimpleEntity } from "../../simple-entity";



export class User extends AbstractEntity {

	username: string;
	password: string;
	firstName: string;
	lastName: string;
	status: boolean;
  phoneNo: string;

}
