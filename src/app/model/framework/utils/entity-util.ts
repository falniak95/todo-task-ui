import { GenericEntity } from '../../entity/generic-entity';
import { SimpleEntity } from '../../entity/simple-entity';


export default class EntityUtil {

    public static toSimple<E extends GenericEntity>(entity: E): SimpleEntity {
      let simple = new SimpleEntity();
      simple.id = entity.id;
      simple.name = entity["name"];
      console.log('simple name is',simple.name);
      return simple;
    }

}
