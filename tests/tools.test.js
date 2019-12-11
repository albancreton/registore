import { getPathsWarnings } from '../src/tools';

describe('registore > getPathsWarning', () => {
  test('getPathsWarnings one level', () => {
    expect(
      getPathsWarnings(['foo.bar', 'foo.baz.boo', 'foo.baa', 'foo.bee', 'foo.boo', 'foo.baz']),
    ).toEqual(['foo.baz']);
  });
  test('getPathsWarnings more level', () => {
    expect(
      getPathsWarnings(['foo.bar', 'foo.baz', 'foo.baz.boo', 'foo.baz.boo.baa', 'foo.baa']),
    ).toEqual(['foo.baz', 'foo.baz.boo']);
  });
  test('getPathsWarnings with array paths', () => {
    expect(
      getPathsWarnings([
        ['foo', 'bar'],
        ['foo', 'baz', 'baa', 'bee', 'buu', 'bee', 'boo'],
        ['foo', 'baz'],
      ]),
    ).toEqual(['foo.baz']);
  });
});
