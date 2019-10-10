import { ContextItem } from "./context-item";
import { Type } from "../../../../node_modules/@angular/core";
import { GenericEntity } from "../entity/generic-entity";
import { AbstractService } from '../../service/abstract.service';
import { AbstractFormComponent } from "../component/abstract-form-component";

export default class AppContext {

    private static context: Map<string, ContextItem> = new Map();

    public static add<E extends GenericEntity, S extends AbstractService<E>>
        (key: string, entity: Type<E>, service: Type<S>): void {
        const item = new ContextItem(entity, service);
        this.context.set(key, item);
    }

    public static get(key: string): ContextItem {
        let context = this.context.get(key);
        if (context == null) {
            throw Error("AppContext'e "  + "'" + key + "'" + " tanımlanmamış!");
        }
        return context;
    }

    public static getInstance<E extends GenericEntity>(key: string): E {
        return new (this.get(key).entity);
    }

}
