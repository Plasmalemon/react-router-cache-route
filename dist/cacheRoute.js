'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var reactRouterDom = require('react-router-dom');

// 值类型判断 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var isUndefined = function isUndefined(val) {
  return typeof val === 'undefined';
};

var isNull = function isNull(val) {
  return val === null;
};

var isFunction = function isFunction(val) {
  return typeof val === 'function';
};

var isString = function isString(val) {
  return typeof val === 'string';
};

var isExist = function isExist(val) {
  return !(isUndefined(val) || isNull(val));
};
// 值类型判断 -------------------------------------------------------------

var get = function get(obj) {
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var defaultValue = arguments[2];

  keys = isString(keys) ? keys.split('.') : keys;

  var result = void 0;
  var res = obj;
  var idx = 0;

  for (; idx < keys.length; idx++) {
    var key = keys[idx];

    if (isExist(res)) {
      res = res[key];
    } else {
      break;
    }
  }

  if (idx === keys.length) {
    result = res;
  }

  return isUndefined(result) ? defaultValue : result;
};

var run = function run(obj) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  keys = isString(keys) ? keys.split('.') : keys;

  var func = get(obj, keys);
  var context = get(obj, keys.slice(0, -1));

  return isFunction(func) ? func.call.apply(func, [context].concat(args)) : func;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var __new__lifecycles = React__default.version.startsWith('16.3');

var getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
  var nextPropsMatch = nextProps.match,
      _nextProps$when = nextProps.when,
      when = _nextProps$when === undefined ? 'forward' : _nextProps$when;

  /**
   * Note:
   * Turn computedMatch from CacheSwitch to a real null value if necessary
   *
   * 必要时将 CacheSwitch 计算得到的 computedMatch 值转换为真正的 null
   */

  if (get(nextPropsMatch, '__CacheRoute__computedMatch__null')) {
    nextPropsMatch = null;
  }

  if (!prevState.cached && nextPropsMatch) {
    return {
      cached: true,
      matched: true
    };
  }

  /**
   * Determines whether it needs to cancel the cache based on the next unmatched props action
   * 
   * 根据下个未匹配状态动作决定是否需要取消缓存
   */
  if (prevState.matched && !nextPropsMatch) {
    var nextAction = get(nextProps, 'history.action');

    var __cancel__cache = false;

    switch (when) {
      case 'always':
        break;
      case 'back':
        if (['PUSH', 'REPLACE'].includes(nextAction)) {
          __cancel__cache = true;
        }

        break;
      case 'forward':
      default:
        if (nextAction === 'POP') {
          __cancel__cache = true;
        }
    }

    if (__cancel__cache) {
      return {
        cached: false,
        matched: false
      };
    }
  }

  return {
    matched: !!nextPropsMatch
  };
};

var CacheComponent = function (_Component) {
  inherits(CacheComponent, _Component);

  function CacheComponent() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, CacheComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = CacheComponent.__proto__ || Object.getPrototypeOf(CacheComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = getDerivedStateFromProps(_this.props, {
      cached: false,
      matched: false
    }), _this.componentWillReceiveProps = !__new__lifecycles ? function (nextProps) {
      var nextState = _this.setState(getDerivedStateFromProps(nextProps, _this.state));
    } : undefined, _this.cacheLifecycles = {
      __listener: {},
      didCache: function didCache(listener) {
        _this.cacheLifecycles.__listener['didCache'] = listener;
      },
      didRecover: function didRecover(listener) {
        _this.cacheLifecycles.__listener['didRecover'] = listener;
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(CacheComponent, [{
    key: 'render',
    value: function render() {
      return this.state.cached ? React__default.createElement(
        'div',
        {
          className: this.props.className,
          style: this.state.matched ? {} : {
            display: 'none'
          }
        },
        run(this.props, 'children', this.cacheLifecycles)
      ) : null;
    }

    /**
     * New lifecycle for replacing the `componentWillReceiveProps` in React 16.3 +
     * React 16.3 + 版本中替代 componentWillReceiveProps 的新生命周期
     */


    /**
     * Compatible React 16.3 -
     * 兼容 React 16.3 - 版本
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (!prevState.cached || !this.state.cached) {
        return;
      }

      if (prevState.matched === true && this.state.matched === false) {
        return run(this, 'cacheLifecycles.__listener.didCache');
      }

      if (prevState.matched === false && this.state.matched === true) {
        return run(this, 'cacheLifecycles.__listener.didRecover');
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.state.matched || nextState.matched;
    }
  }]);
  return CacheComponent;
}(React.Component);

CacheComponent.propsTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
  when: PropTypes.oneOf(['forward', 'back', 'always'])
};
CacheComponent.defaultProps = {
  when: 'forward'
};
CacheComponent.getDerivedStateFromProps = __new__lifecycles ? getDerivedStateFromProps : undefined;

var Updatable = function (_Component) {
  inherits(Updatable, _Component);

  function Updatable() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, Updatable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Updatable.__proto__ || Object.getPrototypeOf(Updatable)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
      return _this.props.render();
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(Updatable, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return isExist(nextProps.match) && get(nextProps, 'match.__CacheRoute__computedMatch__null') !== true;
    }
  }]);
  return Updatable;
}(React.Component);

Updatable.propsTypes = {
  render: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

var isEmptyChildren = function isEmptyChildren(children) {
  return React__default.Children.count(children) === 0;
};

var CacheRoute = function (_Component) {
  inherits(CacheRoute, _Component);

  function CacheRoute() {
    classCallCheck(this, CacheRoute);
    return possibleConstructorReturn(this, (CacheRoute.__proto__ || Object.getPrototypeOf(CacheRoute)).apply(this, arguments));
  }

  createClass(CacheRoute, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _children = _props.children,
          _render = _props.render,
          component = _props.component,
          className = _props.className,
          when = _props.when,
          __rest__route__props = objectWithoutProperties(_props, ['children', 'render', 'component', 'className', 'when']);

      /**
       * Note:
       * If children prop is a React Element, define the corresponding wrapper component for supporting multiple children
       *
       * 说明：如果 children 属性是 React Element 则定义对应的包裹组件以支持多个子组件
       */


      if (React__default.isValidElement(_children) || !isEmptyChildren(_children)) {
        _render = function render() {
          return _children;
        };
      }

      return (
        /**
         * Only children prop of Route can help to control rendering behavior
         * 只有 Router 的 children 属性有助于主动控制渲染行为
         */
        React__default.createElement(reactRouterDom.Route, _extends({}, __rest__route__props, {
          children: function children(props) {
            return React__default.createElement(
              CacheComponent,
              _extends({}, props, { when: when, className: className }),
              function (cacheLifecycles) {
                return React__default.createElement(Updatable, {
                  match: props.match,
                  render: function render() {
                    Object.assign(props, { cacheLifecycles: cacheLifecycles });

                    if (component) {
                      return React__default.createElement(component, props);
                    }

                    return run(_render || _children, undefined, props);
                  }
                });
              }
            );
          }
        }))
      );
    }
  }]);
  return CacheRoute;
}(React.Component);

CacheRoute.componentName = 'CacheRoute';
CacheRoute.propTypes = {
  component: PropTypes.func,
  render: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  className: PropTypes.string,
  when: PropTypes.oneOf(['forward', 'back', 'always'])
};
CacheRoute.defaultProps = {
  when: 'forward'
};

var CacheSwitch = function (_Switch) {
  inherits(CacheSwitch, _Switch);

  function CacheSwitch() {
    classCallCheck(this, CacheSwitch);
    return possibleConstructorReturn(this, (CacheSwitch.__proto__ || Object.getPrototypeOf(CacheSwitch)).apply(this, arguments));
  }

  createClass(CacheSwitch, [{
    key: 'render',
    value: function render() {
      var route = this.context.router.route;
      var children = this.props.children;

      var location = this.props.location || route.location;

      var __matched__already = false;

      return React__default.Children.map(children, function (element) {
        if (!React__default.isValidElement(element)) {
          return null;
        }

        var _element$props = element.props,
            pathProp = _element$props.path,
            exact = _element$props.exact,
            strict = _element$props.strict,
            sensitive = _element$props.sensitive,
            from = _element$props.from;

        var path = pathProp || from;
        var match = __matched__already ? null : reactRouterDom.matchPath(location.pathname, { path: path, exact: exact, strict: strict, sensitive: sensitive }, route.match);

        var child = void 0;
        switch (get(element, 'type.componentName')) {
          case 'CacheRoute':
            child = React__default.cloneElement(element, {
              location: location,
              /**
               * https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Route.js#L57
               *
               * Note:
               * Route would use computedMatch as its next match state ONLY when computedMatch is a true value
               * So here we have to do some trick to let the unmatch result pass Route's computedMatch check
               *
               * 注意：只有当 computedMatch 为真值时，Route 才会使用 computedMatch 作为其下一个匹配状态
               * 所以这里我们必须做一些手脚，让 unmatch 结果通过 Route 的 computedMatch 检查
               */
              computedMatch: isNull(match) ? {
                __CacheRoute__computedMatch__null: true
              } : match
            });
            break;
          default:
            child = match && !__matched__already ? React__default.cloneElement(element, { location: location, computedMatch: match }) : null;
        }

        if (!__matched__already) {
          __matched__already = !!match;
        }

        return child;
      });
    }
  }]);
  return CacheSwitch;
}(reactRouterDom.Switch);

CacheSwitch.contextTypes = {
  router: PropTypes.shape({
    route: PropTypes.object.isRequired
  }).isRequired
};
CacheSwitch.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object
};

exports.default = CacheRoute;
exports.CacheRoute = CacheRoute;
exports.CacheSwitch = CacheSwitch;
