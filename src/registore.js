import { asArrayParts, getPathsWarnings, unfold, sortByPath } from './tools';

export const generateReducerBuilder = combineFunction => {
  const warn = console && console.warn;
  const asReducers = ob =>
    Object.entries(ob).reduce(
      (reducer, [k, v]) => ({
        ...reducer,
        [k]: typeof v === 'function' ? v : combineFunction(asReducers(v))
      }),
      {}
    );

  return (...reducersWithPath) => {
    const paths = reducersWithPath.map(([p]) => p);
    const warningPaths = getPathsWarnings(paths);

    if (warningPaths.length && warn) {
      const joined = warningPaths.join(', ');

      warn(`These reducers have children and will be overriden: ${joined}`);
    }

    return combineFunction(
      asReducers(
        sortByPath(reducersWithPath).reduce(
          (unfolded, [pathParts, reducer]) =>
            unfold(asArrayParts(pathParts), unfolded, reducer),
          {}
        )
      )
    );
  };
};
