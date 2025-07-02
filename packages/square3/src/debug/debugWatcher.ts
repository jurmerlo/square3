const CONTAINER: Record<string, string> = {};

export function updateDebugWatcher(name: string, value: string): void {
  CONTAINER[name] = value;
}

export function getDebugWatcher(name: string): string | undefined {
  return CONTAINER[name];
}

export function removeDebugWatcher(name: string): void {
  if (CONTAINER[name]) {
    delete CONTAINER[name];
  }
}

export function getAllDebugWatchers(): { name: string; value: string }[] {
  return Object.entries(CONTAINER)
    .map(([name, value]) => ({ name, value: String(value) }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .reverse();
}
