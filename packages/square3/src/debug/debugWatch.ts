import { updateDebugWatcher } from './debugWatcher.js';

export function debugWatch<This, Return>(name?: string) {
  return (
    target: ClassAccessorDecoratorTarget<This, Return>,
    context: ClassAccessorDecoratorContext<This, Return>,
  ): ClassAccessorDecoratorResult<This, Return> => {
    const result: ClassAccessorDecoratorResult<This, Return> = {
      get(this: This): Return {
        return target.get.call(this);
      },
      set(value: Return): void {
        const watchName = name || (context.name as string);
        updateDebugWatcher(watchName, String(value));
        target.set.call(this, value);
      },
      init(initialValue: Return): Return {
        const watchName = name || (context.name as string);
        updateDebugWatcher(watchName, JSON.stringify(initialValue, null, 2));
        return initialValue;
      },
    };

    return result;
  };
}
