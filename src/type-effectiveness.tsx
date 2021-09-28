import { PokedexEntry } from "./app-context";

/**
 * Interface defining an object holding a damage value and a
 * list of types dealing that damage.
 */
export interface Effectiveness {
  /** The numeric damage value, eg. 2.0 */
  damage: number,
  /** A list of pokemon types that deal that amount of damage */
  types: string[]
};

/**
 * Interface defining an object holding a label, a damage value,
 * and a list of types dealing that damage.
 */
export interface EffectivenessGroup {
  /** The label for the damage group, eg. "Super Effective" */
  label: string,
  /** The numeric damage value, eg. 2.0 */
  damage: number,
  /** A list of pokemon types that deal that amount of damage */
  types: string[]
}

/**
 * A tuple containing a damage label and
 * the amount of damage for that label.
 */
export type DamageTuple = [string, number];

/**
 * TypeEffectivness - the main class calculating all things
 * related to determining the amount of damage a type (or types)
 * will do against another pokemon type.
 */
export default class TypeEffectiveness {
  /** The pokemon type to use for comparison */
  pokemonType: string;

  /**
   * Default constructor
   * 
   * @param {string} pokemonType
   */
  constructor(pokemonType: string) {
    /** The pokemon type to use for comparison */
    this.pokemonType = pokemonType.toLowerCase();
    this.checkType(this.pokemonType, "constructor");
  }

  // The order of these elements is important as it relates to the chart below
  /** A list of all 18 current Pokemon types */
  static Types = [ "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost",
                   "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"
  ];

  /** The damage lookup chart is based on the table presented here: https://bulbapedia.bulbagarden.net/wiki/Type */
  static Chart = [
    // Bug, Drk, Drg, Ele, Fai, Fig, Fir, Fly, Gho, Gra, Gro, Ice, Nor, Poi, Psy, Roc, Ste, Wat
      [1.0, 2.0, 1.0, 1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 2.0, 1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 0.5, 1.0], // Bug
      [1.0, 0.5, 1.0, 1.0, 0.5, 0.5, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0], // Dark
      [1.0, 1.0, 2.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], // Dragon
      [1.0, 1.0, 0.5, 0.5, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0], // Electric
      [1.0, 2.0, 2.0, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 0.5, 1.0], // Fairy
      [0.5, 2.0, 1.0, 1.0, 0.5, 1.0, 1.0, 0.5, 0.0, 1.0, 1.0, 2.0, 2.0, 0.5, 0.5, 2.0, 2.0, 1.0], // Fighting
      [2.0, 1.0, 0.5, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 0.5, 2.0, 0.5], // Fire
      [2.0, 1.0, 1.0, 0.5, 1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 0.5, 1.0], // Flying
      [1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 0.0, 1.0, 2.0, 1.0, 1.0, 1.0], // Ghost
      [0.5, 1.0, 0.5, 1.0, 1.0, 1.0, 0.5, 0.5, 1.0, 0.5, 2.0, 1.0, 1.0, 0.5, 1.0, 2.0, 0.5, 2.0], // Grass
      [0.5, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 0.0, 1.0, 0.5, 1.0, 1.0, 1.0, 2.0, 1.0, 2.0, 2.0, 1.0], // Ground
      [1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 2.0, 2.0, 0.5, 1.0, 1.0, 1.0, 1.0, 0.5, 0.5], // Ice
      [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 0.5, 1.0], // Normal
      [1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 0.5, 2.0, 0.5, 1.0, 1.0, 0.5, 1.0, 0.5, 0.0, 1.0], // Poison
      [1.0, 0.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 0.5, 1.0], // Psychic
      [2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 2.0, 2.0, 1.0, 1.0, 0.5, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], // Rock
      [1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 0.5, 0.5], // Steel
      [1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.5, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5]  // Water
  ];

  /** All possible damage types with their labels and damage values */
  static Labels: DamageTuple[] = [
    [ "Super Effective (4x)", 4.0 ],
    [ "Super Effective", 2.0 ],
    [ "Effective", 1.0 ],
    [ "Not Very Effective", 0.5 ],
    [ "Not Very Effective (0.25x)", 0.25 ],
    [ "No Effect", 0 ]
  ];

  /**
   * Ensure the given pokemon type is valid. Throws an error if the type is invalid.
   * 
   * @param {string} pokemonType  - The string name of the pokemon type to check
   * @param {string} caller - Optional name, useful for logging errors
   * @returns {boolean} - True if the pokemon is valid
   */
  checkType(pokemonType: string, caller?: string) : boolean {
    if (!TypeEffectiveness.Types.includes(pokemonType.toLowerCase())) {
      const callerName = caller != null ? caller : "checkType";
      const msg = callerName + ": " + pokemonType + " is not a valid Pokémon type.";
      console.error(msg);
      throw new Error(pokemonType + " is not a valid Pokémon type.");
    }
    return true;
  }

  /**
   * Given a tuple of one or two types, calculate the damage amount dealt for
   * this instance's pokemon type.
   * 
   * @param {[string, string?]} against - A tuple of one or two types for the comparison
   * @returns {number} - The damage amount, eg. 4.0, 2.0, 0, 0.25
   */
  effectiveness(against: [string, string?]) : number {
    this.checkType(against[0], "effectiveness");
    if (against[1]) {
      this.checkType(against[1]);
    }

    const typeIndex = TypeEffectiveness.Types.indexOf(this.pokemonType.toLowerCase());
    const against1Damage = TypeEffectiveness.Chart[typeIndex][TypeEffectiveness.Types.indexOf(against[0].toLowerCase())];
    const against2Damage = against[1] != null ? TypeEffectiveness.Chart[typeIndex][TypeEffectiveness.Types.indexOf(against[1].toLowerCase())] : 1;

    return against1Damage * against2Damage;
  }

  /**
   * Static function used to calculate the type effectivess for all
   * pokemon types versus a tuple of one or two types.
   * 
   * @param {[string, string?]} types - A tuple of one or two types for the comparison
   * @returns {Effectivness[]} - A list of Effectiveness objects, or types grouped by damage amount
   */
  static By(types: [string, string?]) : Effectiveness[] {
    const results: Effectiveness[] = [];

    for (const pokemonType of TypeEffectiveness.Types) {
      const typeToCheck = new TypeEffectiveness(pokemonType);
      const value = typeToCheck.effectiveness(types);
      const grouping = results.find((result) =>
        result.damage === value
      );
      if (grouping) {
        if (grouping.types) {
          grouping.types.push(pokemonType);
        } else {
          grouping.types = [pokemonType];
        }
      } else {
        results.push({ damage: value, types: [pokemonType] });
      }
    }
    return results;
  }

  /**
   * Static function to group the results of `TypeEffectiveness.By(types)` with labels
   * suitable for displaying to users.
   * 
   * @param {Effectiveness[]} results - The calculated results from `TypeEffectiveness.By(types)`
   * @returns {EffectivenessGroup[]} - A list of EffectivenessGroup objects, with labels, damage, and types
   */
  static GroupResults(results: Effectiveness[]) : EffectivenessGroup[] {
    const grouped: EffectivenessGroup[] = [];
    for (const damageTuple of TypeEffectiveness.Labels) {
      const [label, damage] = damageTuple;
      const grouping = results.find((result) =>
        result.damage === damage
      );
      if (grouping) {
        const damageGroup = {label: label, damage: damage, types: grouping.types};
        grouped.push(damageGroup);
      }
    }
    return grouped;
  }

  /**
   * Static function to return a list of Pokemon of a given type or types
   * 
   * @param {[string, string?]} types  - A tuple of one or two Pokemon types
   * @param {PokedexEntry[]} pokedex - The pokedex used for looking up the Pokemon
   * @param {boolean} onlyEvolved - If true, only return matching Pokemon that are fully evolved or have no evolution
   * @returns {PokedexEntry[]} - An array of Pokemon
   */
  static PokemonOfType(types: [string, string?], pokedex: PokedexEntry[], onlyEvolved: boolean = false) : PokedexEntry[] {
    return pokedex.filter((pokemon) => {
      const lowercaseTypes = pokemon.types.map((type) => type.toLowerCase());
      return lowercaseTypes.includes(types[0].toLowerCase()) && ((types[1] != null) ? lowercaseTypes.includes(types[1].toLowerCase()) : lowercaseTypes.length === 1);
    })
    .filter((pokemon) => onlyEvolved ? pokemon.fully_evolved === true : true);
  }

  /**
   * Static function to return a list of Pokemon of a given type,
   * excluding any pokemon containing a secondary type in the provided list.
   * eg. `TypeEffectiveness.PokemonOfTypeExcluding('fire', ['steel', 'grass'], false)`
   * Will return Pokemon with types `['fire', 'bug']` but not `['fire', 'grass']` or `['fire', 'steel']`
   * 
   * @param {string} type - The first type that must be present
   * @param {string[]} excluding - A list of potential secondary types that must be excluded
   * @param {PokedexEntry[]} pokedex - The pokedex used for looking up the Pokemon
   * @param {boolean} onlyEvolved - If true, only return matching Pokemon that are fully evolved or have no evolution
   * @returns {PokedexEntry[]} - An array of Pokemon
   */
  static PokemonOfTypeExcluding(type: string, excluding: string[], pokedex: PokedexEntry[], onlyEvolved: boolean = false) : PokedexEntry[] {
    return pokedex.filter((pokemon) => {
      const lowercaseTypes = pokemon.types.map((type) => type.toLowerCase());
      return lowercaseTypes.length === 2 && lowercaseTypes.includes(type.toLowerCase()) && !lowercaseTypes.some(r => excluding.indexOf(r.toLowerCase()) >= 0);
    })
    .filter((pokemon) => onlyEvolved ? pokemon.fully_evolved === true : true);
  }

  /**
   * Static function to try really hard to recommend a list of Pokemon to use against a Pokemon
   * of a given type. It includes:
   *   * 4x/2x super effective Pokemon, including any permutations that do not include a "not very effective" secondary type
   *   * Includes only fully-evolved Pokemon, or Pokemon without evolutions
   * This is somewhat limited in usefulness as it disregards stats, the game/generation, and moves
   * 
   * @param {[string, string?]} types - A tuple of one or two Pokemon types
   * @param {PokedexEntry[]} pokedex - The Pokedex used for lookup
   * @returns {Set<PokedexEntry>} - A Set of Pokemon used as a starting point for recommendations
   */
  static Suggestions(types: [string, string?], pokedex: PokedexEntry[]) : Set<PokedexEntry> {
    const results = new Set<PokedexEntry>();
    const effectiveness = TypeEffectiveness.GroupResults(TypeEffectiveness.By(types));
    const se_types: string[] = [];
    const nve_types: string[] = [];

    // Add all 4x and 2x single-type Pokémon to the set
    for (const type_se of effectiveness.filter((types) => [4.0, 2.0].includes(types.damage)).map((types) => types.types).flat()) {
      se_types.push(type_se);
      const pokemon = TypeEffectiveness.PokemonOfType([type_se, undefined], pokedex, true);
      pokemon.forEach(elem => results.add(elem));
    }
    // Get permutations of all 4x and 2x types together
    const combinations = se_types.flatMap( (val1, i) => se_types.slice(i+1).map( val2 => [val1, val2] as [string, string]));
    for (var typeCombo of combinations) {
      const pokemon = TypeEffectiveness.PokemonOfType(typeCombo, pokedex, true);
      pokemon.forEach(elem => results.add(elem));
    }
    // Get all other combinations of super effective types that
    // do not have a "not very effective" type as the secondary type
    for (const type_nve of effectiveness.filter((types) => types.damage < 1.0).map((types) => types.types).flat()) {
      nve_types.push(type_nve);
    }
    for (var se_type of se_types) {
      const pokemon = TypeEffectiveness.PokemonOfTypeExcluding(se_type, nve_types, pokedex, true);
      pokemon.forEach(elem => results.add(elem));
    }
    return results;
  }
}