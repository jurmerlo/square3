import type { Body } from './body';

/**
 * Represents the different types of interactions that can occur in the collision system.
 */
export type InteractionType =
  | 'triggerStart'
  | 'triggerStay'
  | 'triggerEnd'
  | 'collisionStart'
  | 'collisionStay'
  | 'collisionEnd';

/**
 * An interaction between two bodies.
 */
export class Interaction {
  /**
   * The type of interaction.
   */
  type: InteractionType;

  /**
   * The first body involved in the interaction.
   */
  body1: Body;

  /**
   * The second body involved in the interaction.
   */
  body2: Body;

  /**
   * A pool of interactions to reduce garbage collection.
   */
  private static pool: Interaction[] = [];

  /**
   * Get an object from the pool or create a new one if the pool is empty.
   * @param type - The type of interaction.
   * @param body1 - The first body involved in the interaction.
   * @param body2 - The second body involved in the interaction.
   * @returns The interaction object.
   */
  static get(type: InteractionType, body1: Body, body2: Body): Interaction {
    const interaction = Interaction.pool.pop();
    if (interaction) {
      interaction.type = type;
      interaction.body1 = body1;
      interaction.body2 = body2;

      return interaction;
    }

    return new Interaction(type, body1, body2);
  }

  /**
   * Create a new interaction.
   * @param type - The type of interaction.
   * @param body1 - The first body involved in the interaction.
   * @param body2 - The second body involved in the interaction.
   */
  constructor(type: InteractionType, body1: Body, body2: Body) {
    this.type = type;
    this.body1 = body1;
    this.body2 = body2;
  }

  /**
   * Put the interaction back into the pool.
   */
  put(): void {
    Interaction.pool.push(this);
  }
}
