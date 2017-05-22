import isAssigner from './isAssigner';
import isFalsy from './isFalsy';
import isNativeObject from './isNativeObject';
import isNotProduction from './isNotProduction';
import isComponentLike from './isComponentLike';
import markAssigner from './markAssigner';
import { expectedTypes } from './constants';

export default function assignPropTypes() {
  var advanceAssigners = [];
  var pdc = [];
  var length = arguments.length;
  var expectedType = 0;
  for (var i = 0; i < length; i++) {
    if (expectedType === 0) {
      if (isAssigner(arguments[i])) {
        advanceAssigners.push(arguments[i]);
        continue;
      } else {
        expectedType = 1;
      }
    }
    // Check for expected type
    if (expectedType >= expectedTypes.length) {
      throw new TypeError('Superfluous argument');
    }
    if (!isFalsy(arguments[i])) {
      // Type restriction
      if (!isNativeObject(arguments[i])) {
        throw new TypeError('Expects ' + expectedTypes[expectedType] + ' of type object, ' + typeof arguments[i] + ' passed');
      }
      // Check for non-empty object
      if (isNotProduction && Object.keys(arguments[i]).length === 0) {
        throw new TypeError('Useless empty ' + expectedTypes[expectedType]);
      }
    }
    pdc.push(arguments[i]);
    expectedType++;
  }
  var originalAssigner = function originalAssigner(component) {
    if (!isComponentLike(component)) {
      throw new TypeError('Assigner called on non-component');
    }
    if (advanceAssigners.length > 0) {
      var _length = advanceAssigners.length;
      for (var _i = 0; _i < _length; _i++) {
        component = advanceAssigners[_i](component);
      }
    }
    if (pdc[0]) {
      // propTypes
      component.propTypes = Object.assign({}, component.propTypes || {}, pdc[0]);
    }
    if (pdc[1]) {
      // defaultProps
      component.defaultProps = Object.assign({}, component.defaultProps || {}, pdc[1]);
    }
    if (pdc[2]) {
      // contextTypes
      component.contextTypes = Object.assign({}, component.contextTypes || {}, pdc[2]);
    }
    return component;
  };

  markAssigner(originalAssigner);

  var propTypesAssigner = function propTypesAssigner(component) {
    if (isNativeObject(component)) {
      // Extending
      var reassigner = assignPropTypes.apply(null, arguments);
      return assignPropTypes(originalAssigner, reassigner);
    } else {
      return originalAssigner(component);
    }
  };
  markAssigner(propTypesAssigner);
  return propTypesAssigner;
}