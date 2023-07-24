const mapping: Record<string, string> = {
  organizations: 'organization',
  rerolls: 'reroll',
  todos: 'todo',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
