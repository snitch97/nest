import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Action } from "src/enum/action.enum";

class Article{
    id:number;
    isPublished: boolean;
    authorId: number;
}

class User{
    id:number;
    isAdmin:boolean;
}

type Subjects = InferSubjects<typeof Article | typeof User> | 'all';
export type AppAbility = Ability<[Action, Subjects]>;
export class CaslAbilityFactory {
    createForUser(user:User){
        const { can, cannot, build } = new AbilityBuilder<
        Ability<[Action,Subjects]>>(Ability as AbilityClass<AppAbility>);

        if(user.isAdmin){
            can(Action.Manage, 'all');
        }else {
            can(Action.Read,'all');
        }

        can(Action.Update,Article, {authorId: user.id});
        cannot(Action.Delete, Article, {isPublished: true});

        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>
        });
    }
}
