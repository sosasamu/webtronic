export const Endpoints = {
  baseUrl: 'https://rickandmortyapi.com/api',
  characters: '/character?page=:page',
  character: '/character/:id',
  episode: '/episode/:id',
};

export const buildRoute = (route: string, paramsValues: {}): string => {
  const arrayKeys = Object.keys(paramsValues);
  let result = route;
  arrayKeys.forEach((key: string) => {
    if (!result.includes(`:${key}`)) {
      throw new Error(`:${key} was not defined within the route`);
    }
    result = result.replace(`:${key}`, `${paramsValues[key]}`);
  });
  return result;
};
