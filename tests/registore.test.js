import { generateReducerBuilder } from '../src/registore';

jest.spyOn(global.console, 'warn');

describe('registore', () => {
  beforeEach(() => {
    console.warn.mockClear();
  });

  const genCombineReducer = () => {
    let callCount = 0;
    return function combineReducers(toCombine) {
      return { __: callCount++, ...toCombine };
    };
  };
  const reducer = jest.fn();

  test('it combines basic paths', () => {
    const combineReducers = genCombineReducer();
    const registore = generateReducerBuilder(combineReducers);

    const reducers = [['foo.bar', reducer], ['foo.baz', reducer]];

    expect(registore(...reducers)).toEqual({
      __: 1,
      foo: {
        __: 0,
        bar: reducer,
        baz: reducer,
      },
    });
  });

  test('it re-order paths', () => {
    const combineReducers = genCombineReducer();
    const registore = generateReducerBuilder(combineReducers);

    const reducers = [['foo.baz.e', reducer], ['foo.bar.e', reducer]];

    expect(registore(...reducers)).toEqual({
      __: 3,
      foo: {
        __: 2,
        bar: { __: 0, e: reducer },
        baz: { __: 1, e: reducer },
      },
    });
  });

  test('it combines deep path', () => {
    const combineReducers = genCombineReducer();
    const registore = generateReducerBuilder(combineReducers);

    const reducers = [
      ['foo.baz.biz', reducer],
      ['foo.baz.buz.boz', reducer],
      ['foo.bar.baz.buz.boo', reducer],
      ['foo.bar.baz.buz.baa', reducer],
    ];

    expect(registore(...reducers)).toEqual({
      __: 6,
      foo: {
        __: 5,
        bar: {
          __: 2,
          baz: {
            __: 1,
            buz: {
              __: 0,
              boo: reducer,
              baa: reducer,
            },
          },
        },
        baz: {
          __: 4,
          biz: reducer,
          buz: {
            __: 3,
            boz: reducer,
          },
        },
      },
    });
  });

  test('it warns when reducer overlaps', () => {
    const combineReducers = genCombineReducer();
    const registore = generateReducerBuilder(combineReducers);

    const reducers = [
      ['foo.bar', reducer],
      ['foo.baz', reducer],
      ['foo.baz.boo', reducer],
      ['foo.baz.boo.baa', reducer],
    ];

    registore(...reducers);
    expect(console.warn).toHaveBeenCalledWith(
      'These reducers have children and will be overriden: foo.baz, foo.baz.boo',
    );
  });

  test('it works with array and string paths', () => {
    const combineReducers = genCombineReducer();
    const registore = generateReducerBuilder(combineReducers);

    const reducers = [['foo.bar', reducer], [['foo', 'baz'], reducer]];

    expect(registore(...reducers)).toEqual({
      __: 1,
      foo: {
        __: 0,
        bar: reducer,
        baz: reducer,
      },
    });
  });
});
