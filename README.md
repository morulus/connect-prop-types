assign-prop-types
----

Allows you to create stateless [React](https://facebook.github.io/react/) components with assigned [propTypes](https://github.com/reactjs/prop-types) (and [defaultProps](https://facebook.github.io/react/docs/typechecking-with-proptypes.html) & [contextTypes](https://facebook.github.io/react/docs/context.html)) without breaking the chain.

```js
export default assignPropTypes({
  children: PropTypes.node.isRequired,
})(({ children }) => (<div>{children}</div>));
```

Install
----

Yarn:
```shell
yarn add assign-prop-types
```

Npm:
```shell
npm install assign-prop-types --S
```

Import
----

```js
import assignPropTypes from 'assign-prop-types';
```

In most cases, you will also need to import packages [react](https://www.npmjs.com/package/react) and [prop-types](https://www.npmjs.com/package/prop-types) (or `React.PropTypes` for [React v15.5](https://facebook.github.io/react/warnings/dont-call-proptypes.html)).

```js
import React from 'react';
import PropTypes from 'prop-types';
import assignPropTypes from 'assign-prop-types';
```

Usage
----

The function assignPropTypes accepts optional arguments `propTypes`, `defaultProp`, `contextTypes`. It returns function, called assigner, which, in turn, accepts React component and returns component, mutaded by passed properties.

```js
export default assignPropTypes({
  children: PropTypes.node.isRequired,
})(({ children }) => (<div>{children}</div>));
```

Identical to:

```js
const Component = ({ children }) => (<div>{children}</div>);
Component.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Component;
```

Reusable assigner
----

Assigners can be prepared in advance:

```js
const assignUsualTypes = assignPropTypes({
  children: PropTypes.node.isRequired,
});
```
And applied later:

```js
export default assignUsualTypes(({ children }) => (<h2>{children}</h2>));
```

Extending
----

Assigners can be extended. To perform it, just call assigner with advanced configuration:

```js
const usualPropTypes = assignPropTypes({
  children: PropTypes.node.isRequired,
});
export default usualPropTypes({
  title: PropTypes.string,
})(YourComponent);
```

Or passing another assigner(s):

```js
import assignerA from './assignerA';
import assignerB from './assignerB';
import assignerC from './assignerC';

export default assignPropTypes(
  assignerA,
  assignerB,
  assignerC
)(YourComponent);
```

👾 Mutates!
----

Target component will be mutated. Keep this fact in your mind.

Author
----

Vladimir Kalmykov <vladimirmorulus@gmail.com>

License
----

MIT, 2017
