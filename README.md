# Registore

Better README TBD.

```js

// moduleA/reducerA.js
export const reducer = () => 'dumb reducer A';
export const key = ['moduleA', 'featureA'];
export default [key, reducer];

// moduleA/reducerB.js
export const reducer = () => 'dumb reducer B';
export const key = ['moduleA', 'featureB'];
export default [key, reducer];

// moduleB/reducerC.js
export const reducer = () => 'dumb reducer C';
export const key = ['moduleB', 'featureC'];
export default [key, reducer];

// moduleB/reducerD.js
export const reducer = () => 'dumb reducer D';
export const key = ['moduleB', 'sub', 'featureD'];
export default [key, reducer];

// moduleB/reducerE.js
export const reducer = () => 'dumb reducer E';
export const key = ['moduleB', 'sub', 'featureE'];
export default [key, reducer];

// rootreducer
import registore from 'registore';

import featureA from 'moduleA/ReducerA';
import featureB from 'moduleA/ReducerB';
import featureC from 'moduleA/ReducerC';
import featureD from 'moduleA/ReducerD';
import featureE from 'moduleA/ReducerE';

export default registore(
  featureA,
  featureB,
  featureC,
  featureD,
  featureE,
);
```

your store will look something like:

```
{
  moduleA: {
    featureA: 'dumb reducer A',
    featureB: 'dumb reducer B',
  },
  moduleB: {
    featureC: 'dumb reducer C',
    sub: {
      featureD: 'dumb reducer D',
      featureE: 'dumb reducer E',
    }
  }
}
```

## why?

To create modularized redux units, that can be shared **with their selectors**, as the placement in the store is now secured.
