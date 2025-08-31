import { AbilityBuilder, Ability } from "@casl/ability";

export type Subjects = string;
export type Actions = "manage" | "create" | "read" | "update" | "delete";

export type AppAbility = Ability<[Actions, Subjects]> | undefined;

export const AppAbility = Ability as any;
export type ACLObj = {
  action: Actions;
  subject: string;
};

/**
 * Define rules based on abilities from local storage
 */
const defineRulesFromLocalStorage = (): ACLObj[] => {
  const abilitiesString = localStorage.getItem("abilities");
  if (!abilitiesString) return [];

  try {
    const abilities: ACLObj[] = JSON.parse(abilitiesString);

    return abilities;
  } catch (error) {
    console.error("Failed to parse abilities from local storage:", error);

    return [];
  }
};

const defineRulesFor = () => {
  const { can, rules } = new AbilityBuilder(AppAbility);
  const storedAbilities = defineRulesFromLocalStorage();

  if (storedAbilities.length > 0) {
    storedAbilities.forEach((ability) => {
      can(ability.action, ability.subject);
    });
  }

  return rules;
};

export const buildAbilityFor = (): AppAbility => {
  return new AppAbility(defineRulesFor(), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: (object) => object.type,
  });
};

export const defaultACLObj: ACLObj = {
  action: "manage",
  subject: "all",
};

export default defineRulesFor;
