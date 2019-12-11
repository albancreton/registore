export const getPathsWarnings = paths =>
  paths
    .map(path => (Array.isArray(path) ? path.join('.') : path))
    .sort()
    .reduce(
      ([all, last], path) => [
        last && path.indexOf(last) === 0 ? [...all, last] : all,
        path
      ],
      [[]]
    )[0];

export const unfold = (parts, base = {}, end) => {
  const [key, ...nextParts] = parts;

  return {
    ...base,
    [key]: nextParts.length ? unfold(nextParts, base[key], end) : end
  };
};

export const asArrayParts = pathParts =>
  Array.isArray(pathParts) ? pathParts : pathParts.toString().split('.');

export const sortByPath = reducersWithPath =>
  [...reducersWithPath].sort((a, b) => {
    const pa = Array.isArray(a[0]) ? a[0].join('.') : a[0];
    const pb = Array.isArray(b[0]) ? b[0].join('.') : b[0];

    return pa.localeCompare(pb);
  });
