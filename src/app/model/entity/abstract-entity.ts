import { GenericEntity } from './generic-entity';
import { SimpleEntity } from './simple-entity';

export abstract class AbstractEntity implements GenericEntity {

    constructor(public id?: number, public createDate?: Date) {

    }

}
