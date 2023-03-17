(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object")
    module.exports = factory(require("vue"));
  else if (typeof define === "function" && define.amd) define([], factory);
  else if (typeof exports === "object")
    exports["vue3-treeselect"] = factory(require("vue"));
  else root["vue3-treeselect"] = factory(root["Vue"]);
})(
  typeof self !== "undefined" ? self : this,
  function (__WEBPACK_EXTERNAL_MODULE__7203__) {
    return /******/ (function () {
      // webpackBootstrap
      /******/ var __webpack_modules__ = {
        /***/ 9662: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var isCallable = __webpack_require__(614);
          var tryToString = __webpack_require__(6330);

          var $TypeError = TypeError;

          // `Assert: IsCallable(argument) is true`
          module.exports = function (argument) {
            if (isCallable(argument)) return argument;
            throw $TypeError(tryToString(argument) + " is not a function");
          };

          /***/
        },

        /***/ 6077: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var isCallable = __webpack_require__(614);

          var $String = String;
          var $TypeError = TypeError;

          module.exports = function (argument) {
            if (typeof argument == "object" || isCallable(argument))
              return argument;
            throw $TypeError(
              "Can't set " + $String(argument) + " as a prototype"
            );
          };

          /***/
        },

        /***/ 1223: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var wellKnownSymbol = __webpack_require__(5112);
          var create = __webpack_require__(30);
          var defineProperty = __webpack_require__(3070).f;

          var UNSCOPABLES = wellKnownSymbol("unscopables");
          var ArrayPrototype = Array.prototype;

          // Array.prototype[@@unscopables]
          // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
          if (ArrayPrototype[UNSCOPABLES] == undefined) {
            defineProperty(ArrayPrototype, UNSCOPABLES, {
              configurable: true,
              value: create(null),
            });
          }

          // add a key to Array.prototype[@@unscopables]
          module.exports = function (key) {
            ArrayPrototype[UNSCOPABLES][key] = true;
          };

          /***/
        },

        /***/ 1530: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var charAt = __webpack_require__(8710).charAt;

          // `AdvanceStringIndex` abstract operation
          // https://tc39.es/ecma262/#sec-advancestringindex
          module.exports = function (S, index, unicode) {
            return index + (unicode ? charAt(S, index).length : 1);
          };

          /***/
        },

        /***/ 9670: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var isObject = __webpack_require__(111);

          var $String = String;
          var $TypeError = TypeError;

          // `Assert: Type(argument) is Object`
          module.exports = function (argument) {
            if (isObject(argument)) return argument;
            throw $TypeError($String(argument) + " is not an object");
          };

          /***/
        },

        /***/ 8533: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var $forEach = __webpack_require__(2092).forEach;
          var arrayMethodIsStrict = __webpack_require__(9341);

          var STRICT_METHOD = arrayMethodIsStrict("forEach");

          // `Array.prototype.forEach` method implementation
          // https://tc39.es/ecma262/#sec-array.prototype.foreach
          module.exports = !STRICT_METHOD
            ? function forEach(callbackfn /* , thisArg */) {
                return $forEach(
                  this,
                  callbackfn,
                  arguments.length > 1 ? arguments[1] : undefined
                );
                // eslint-disable-next-line es/no-array-prototype-foreach -- safe
              }
            : [].forEach;

          /***/
        },

        /***/ 1318: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var toIndexedObject = __webpack_require__(5656);
          var toAbsoluteIndex = __webpack_require__(1400);
          var lengthOfArrayLike = __webpack_require__(6244);

          // `Array.prototype.{ indexOf, includes }` methods implementation
          var createMethod = function (IS_INCLUDES) {
            return function ($this, el, fromIndex) {
              var O = toIndexedObject($this);
              var length = lengthOfArrayLike(O);
              var index = toAbsoluteIndex(fromIndex, length);
              var value;
              // Array#includes uses SameValueZero equality algorithm
              // eslint-disable-next-line no-self-compare -- NaN check
              if (IS_INCLUDES && el != el)
                while (length > index) {
                  value = O[index++];
                  // eslint-disable-next-line no-self-compare -- NaN check
                  if (value != value) return true;
                  // Array#indexOf ignores holes, Array#includes - not
                }
              else
                for (; length > index; index++) {
                  if ((IS_INCLUDES || index in O) && O[index] === el)
                    return IS_INCLUDES || index || 0;
                }
              return !IS_INCLUDES && -1;
            };
          };

          module.exports = {
            // `Array.prototype.includes` method
            // https://tc39.es/ecma262/#sec-array.prototype.includes
            includes: createMethod(true),
            // `Array.prototype.indexOf` method
            // https://tc39.es/ecma262/#sec-array.prototype.indexof
            indexOf: createMethod(false),
          };

          /***/
        },

        /***/ 2092: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var bind = __webpack_require__(9974);
          var uncurryThis = __webpack_require__(1702);
          var IndexedObject = __webpack_require__(8361);
          var toObject = __webpack_require__(7908);
          var lengthOfArrayLike = __webpack_require__(6244);
          var arraySpeciesCreate = __webpack_require__(5417);

          var push = uncurryThis([].push);

          // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
          var createMethod = function (TYPE) {
            var IS_MAP = TYPE == 1;
            var IS_FILTER = TYPE == 2;
            var IS_SOME = TYPE == 3;
            var IS_EVERY = TYPE == 4;
            var IS_FIND_INDEX = TYPE == 6;
            var IS_FILTER_REJECT = TYPE == 7;
            var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
            return function ($this, callbackfn, that, specificCreate) {
              var O = toObject($this);
              var self = IndexedObject(O);
              var boundFunction = bind(callbackfn, that);
              var length = lengthOfArrayLike(self);
              var index = 0;
              var create = specificCreate || arraySpeciesCreate;
              var target = IS_MAP
                ? create($this, length)
                : IS_FILTER || IS_FILTER_REJECT
                ? create($this, 0)
                : undefined;
              var value, result;
              for (; length > index; index++)
                if (NO_HOLES || index in self) {
                  value = self[index];
                  result = boundFunction(value, index, O);
                  if (TYPE) {
                    if (IS_MAP) target[index] = result; // map
                    else if (result)
                      switch (TYPE) {
                        case 3:
                          return true; // some
                        case 5:
                          return value; // find
                        case 6:
                          return index; // findIndex
                        case 2:
                          push(target, value); // filter
                      }
                    else
                      switch (TYPE) {
                        case 4:
                          return false; // every
                        case 7:
                          push(target, value); // filterReject
                      }
                  }
                }
              return IS_FIND_INDEX
                ? -1
                : IS_SOME || IS_EVERY
                ? IS_EVERY
                : target;
            };
          };

          module.exports = {
            // `Array.prototype.forEach` method
            // https://tc39.es/ecma262/#sec-array.prototype.foreach
            forEach: createMethod(0),
            // `Array.prototype.map` method
            // https://tc39.es/ecma262/#sec-array.prototype.map
            map: createMethod(1),
            // `Array.prototype.filter` method
            // https://tc39.es/ecma262/#sec-array.prototype.filter
            filter: createMethod(2),
            // `Array.prototype.some` method
            // https://tc39.es/ecma262/#sec-array.prototype.some
            some: createMethod(3),
            // `Array.prototype.every` method
            // https://tc39.es/ecma262/#sec-array.prototype.every
            every: createMethod(4),
            // `Array.prototype.find` method
            // https://tc39.es/ecma262/#sec-array.prototype.find
            find: createMethod(5),
            // `Array.prototype.findIndex` method
            // https://tc39.es/ecma262/#sec-array.prototype.findIndex
            findIndex: createMethod(6),
            // `Array.prototype.filterReject` method
            // https://github.com/tc39/proposal-array-filtering
            filterReject: createMethod(7),
          };

          /***/
        },

        /***/ 1194: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var fails = __webpack_require__(7293);
          var wellKnownSymbol = __webpack_require__(5112);
          var V8_VERSION = __webpack_require__(7392);

          var SPECIES = wellKnownSymbol("species");

          module.exports = function (METHOD_NAME) {
            // We can't use this feature detection in V8 since it causes
            // deoptimization and serious performance degradation
            // https://github.com/zloirock/core-js/issues/677
            return (
              V8_VERSION >= 51 ||
              !fails(function () {
                var array = [];
                var constructor = (array.constructor = {});
                constructor[SPECIES] = function () {
                  return { foo: 1 };
                };
                return array[METHOD_NAME](Boolean).foo !== 1;
              })
            );
          };

          /***/
        },

        /***/ 9341: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var fails = __webpack_require__(7293);

          module.exports = function (METHOD_NAME, argument) {
            var method = [][METHOD_NAME];
            return (
              !!method &&
              fails(function () {
                // eslint-disable-next-line no-useless-call -- required for testing
                method.call(
                  null,
                  argument ||
                    function () {
                      return 1;
                    },
                  1
                );
              })
            );
          };

          /***/
        },

        /***/ 3671: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var aCallable = __webpack_require__(9662);
          var toObject = __webpack_require__(7908);
          var IndexedObject = __webpack_require__(8361);
          var lengthOfArrayLike = __webpack_require__(6244);

          var $TypeError = TypeError;

          // `Array.prototype.{ reduce, reduceRight }` methods implementation
          var createMethod = function (IS_RIGHT) {
            return function (that, callbackfn, argumentsLength, memo) {
              aCallable(callbackfn);
              var O = toObject(that);
              var self = IndexedObject(O);
              var length = lengthOfArrayLike(O);
              var index = IS_RIGHT ? length - 1 : 0;
              var i = IS_RIGHT ? -1 : 1;
              if (argumentsLength < 2)
                while (true) {
                  if (index in self) {
                    memo = self[index];
                    index += i;
                    break;
                  }
                  index += i;
                  if (IS_RIGHT ? index < 0 : length <= index) {
                    throw $TypeError(
                      "Reduce of empty array with no initial value"
                    );
                  }
                }
              for (; IS_RIGHT ? index >= 0 : length > index; index += i)
                if (index in self) {
                  memo = callbackfn(memo, self[index], index, O);
                }
              return memo;
            };
          };

          module.exports = {
            // `Array.prototype.reduce` method
            // https://tc39.es/ecma262/#sec-array.prototype.reduce
            left: createMethod(false),
            // `Array.prototype.reduceRight` method
            // https://tc39.es/ecma262/#sec-array.prototype.reduceright
            right: createMethod(true),
          };

          /***/
        },

        /***/ 3658: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var DESCRIPTORS = __webpack_require__(9781);
          var isArray = __webpack_require__(3157);

          var $TypeError = TypeError;
          // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
          var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

          // Safari < 13 does not throw an error in this case
          var SILENT_ON_NON_WRITABLE_LENGTH_SET =
            DESCRIPTORS &&
            !(function () {
              // makes no sense without proper strict mode support
              if (this !== undefined) return true;
              try {
                // eslint-disable-next-line es/no-object-defineproperty -- safe
                Object.defineProperty([], "length", {
                  writable: false,
                }).length = 1;
              } catch (error) {
                return error instanceof TypeError;
              }
            })();

          module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET
            ? function (O, length) {
                if (
                  isArray(O) &&
                  !getOwnPropertyDescriptor(O, "length").writable
                ) {
                  throw $TypeError("Cannot set read only .length");
                }
                return (O.length = length);
              }
            : function (O, length) {
                return (O.length = length);
              };

          /***/
        },

        /***/ 1589: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var toAbsoluteIndex = __webpack_require__(1400);
          var lengthOfArrayLike = __webpack_require__(6244);
          var createProperty = __webpack_require__(6135);

          var $Array = Array;
          var max = Math.max;

          module.exports = function (O, start, end) {
            var length = lengthOfArrayLike(O);
            var k = toAbsoluteIndex(start, length);
            var fin = toAbsoluteIndex(end === undefined ? length : end, length);
            var result = $Array(max(fin - k, 0));
            for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
            result.length = n;
            return result;
          };

          /***/
        },

        /***/ 206: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var uncurryThis = __webpack_require__(1702);

          module.exports = uncurryThis([].slice);

          /***/
        },

        /***/ 4362: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var arraySlice = __webpack_require__(1589);

          var floor = Math.floor;

          var mergeSort = function (array, comparefn) {
            var length = array.length;
            var middle = floor(length / 2);
            return length < 8
              ? insertionSort(array, comparefn)
              : merge(
                  array,
                  mergeSort(arraySlice(array, 0, middle), comparefn),
                  mergeSort(arraySlice(array, middle), comparefn),
                  comparefn
                );
          };

          var insertionSort = function (array, comparefn) {
            var length = array.length;
            var i = 1;
            var element, j;

            while (i < length) {
              j = i;
              element = array[i];
              while (j && comparefn(array[j - 1], element) > 0) {
                array[j] = array[--j];
              }
              if (j !== i++) array[j] = element;
            }
            return array;
          };

          var merge = function (array, left, right, comparefn) {
            var llength = left.length;
            var rlength = right.length;
            var lindex = 0;
            var rindex = 0;

            while (lindex < llength || rindex < rlength) {
              array[lindex + rindex] =
                lindex < llength && rindex < rlength
                  ? comparefn(left[lindex], right[rindex]) <= 0
                    ? left[lindex++]
                    : right[rindex++]
                  : lindex < llength
                  ? left[lindex++]
                  : right[rindex++];
            }
            return array;
          };

          module.exports = mergeSort;

          /***/
        },

        /***/ 7475: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var isArray = __webpack_require__(3157);
          var isConstructor = __webpack_require__(4411);
          var isObject = __webpack_require__(111);
          var wellKnownSymbol = __webpack_require__(5112);

          var SPECIES = wellKnownSymbol("species");
          var $Array = Array;

          // a part of `ArraySpeciesCreate` abstract operation
          // https://tc39.es/ecma262/#sec-arrayspeciescreate
          module.exports = function (originalArray) {
            var C;
            if (isArray(originalArray)) {
              C = originalArray.constructor;
              // cross-realm fallback
              if (isConstructor(C) && (C === $Array || isArray(C.prototype)))
                C = undefined;
              else if (isObject(C)) {
                C = C[SPECIES];
                if (C === null) C = undefined;
              }
            }
            return C === undefined ? $Array : C;
          };

          /***/
        },

        /***/ 5417: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var arraySpeciesConstructor = __webpack_require__(7475);

          // `ArraySpeciesCreate` abstract operation
          // https://tc39.es/ecma262/#sec-arrayspeciescreate
          module.exports = function (originalArray, length) {
            return new (arraySpeciesConstructor(originalArray))(
              length === 0 ? 0 : length
            );
          };

          /***/
        },

        /***/ 4326: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var uncurryThis = __webpack_require__(1702);

          var toString = uncurryThis({}.toString);
          var stringSlice = uncurryThis("".slice);

          module.exports = function (it) {
            return stringSlice(toString(it), 8, -1);
          };

          /***/
        },

        /***/ 648: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
          var isCallable = __webpack_require__(614);
          var classofRaw = __webpack_require__(4326);
          var wellKnownSymbol = __webpack_require__(5112);

          var TO_STRING_TAG = wellKnownSymbol("toStringTag");
          var $Object = Object;

          // ES3 wrong here
          var CORRECT_ARGUMENTS =
            classofRaw(
              (function () {
                return arguments;
              })()
            ) == "Arguments";

          // fallback for IE11 Script Access Denied error
          var tryGet = function (it, key) {
            try {
              return it[key];
            } catch (error) {
              /* empty */
            }
          };

          // getting tag from ES6+ `Object.prototype.toString`
          module.exports = TO_STRING_TAG_SUPPORT
            ? classofRaw
            : function (it) {
                var O, tag, result;
                return it === undefined
                  ? "Undefined"
                  : it === null
                  ? "Null"
                  : // @@toStringTag case
                  typeof (tag = tryGet((O = $Object(it)), TO_STRING_TAG)) ==
                    "string"
                  ? tag
                  : // builtinTag case
                  CORRECT_ARGUMENTS
                  ? classofRaw(O)
                  : // ES3 arguments fallback
                  (result = classofRaw(O)) == "Object" && isCallable(O.callee)
                  ? "Arguments"
                  : result;
              };

          /***/
        },

        /***/ 9920: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var hasOwn = __webpack_require__(2597);
          var ownKeys = __webpack_require__(3887);
          var getOwnPropertyDescriptorModule = __webpack_require__(1236);
          var definePropertyModule = __webpack_require__(3070);

          module.exports = function (target, source, exceptions) {
            var keys = ownKeys(source);
            var defineProperty = definePropertyModule.f;
            var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (
                !hasOwn(target, key) &&
                !(exceptions && hasOwn(exceptions, key))
              ) {
                defineProperty(
                  target,
                  key,
                  getOwnPropertyDescriptor(source, key)
                );
              }
            }
          };

          /***/
        },

        /***/ 8544: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var fails = __webpack_require__(7293);

          module.exports = !fails(function () {
            function F() {
              /* empty */
            }
            F.prototype.constructor = null;
            // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
            return Object.getPrototypeOf(new F()) !== F.prototype;
          });

          /***/
        },

        /***/ 8880: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var DESCRIPTORS = __webpack_require__(9781);
          var definePropertyModule = __webpack_require__(3070);
          var createPropertyDescriptor = __webpack_require__(9114);

          module.exports = DESCRIPTORS
            ? function (object, key, value) {
                return definePropertyModule.f(
                  object,
                  key,
                  createPropertyDescriptor(1, value)
                );
              }
            : function (object, key, value) {
                object[key] = value;
                return object;
              };

          /***/
        },

        /***/ 9114: /***/ function (module) {
          module.exports = function (bitmap, value) {
            return {
              enumerable: !(bitmap & 1),
              configurable: !(bitmap & 2),
              writable: !(bitmap & 4),
              value: value,
            };
          };

          /***/
        },

        /***/ 6135: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var toPropertyKey = __webpack_require__(4948);
          var definePropertyModule = __webpack_require__(3070);
          var createPropertyDescriptor = __webpack_require__(9114);

          module.exports = function (object, key, value) {
            var propertyKey = toPropertyKey(key);
            if (propertyKey in object)
              definePropertyModule.f(
                object,
                propertyKey,
                createPropertyDescriptor(0, value)
              );
            else object[propertyKey] = value;
          };

          /***/
        },

        /***/ 8052: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var isCallable = __webpack_require__(614);
          var definePropertyModule = __webpack_require__(3070);
          var makeBuiltIn = __webpack_require__(6339);
          var defineGlobalProperty = __webpack_require__(3072);

          module.exports = function (O, key, value, options) {
            if (!options) options = {};
            var simple = options.enumerable;
            var name = options.name !== undefined ? options.name : key;
            if (isCallable(value)) makeBuiltIn(value, name, options);
            if (options.global) {
              if (simple) O[key] = value;
              else defineGlobalProperty(key, value);
            } else {
              try {
                if (!options.unsafe) delete O[key];
                else if (O[key]) simple = true;
              } catch (error) {
                /* empty */
              }
              if (simple) O[key] = value;
              else
                definePropertyModule.f(O, key, {
                  value: value,
                  enumerable: false,
                  configurable: !options.nonConfigurable,
                  writable: !options.nonWritable,
                });
            }
            return O;
          };

          /***/
        },

        /***/ 3072: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var global = __webpack_require__(7854);

          // eslint-disable-next-line es/no-object-defineproperty -- safe
          var defineProperty = Object.defineProperty;

          module.exports = function (key, value) {
            try {
              defineProperty(global, key, {
                value: value,
                configurable: true,
                writable: true,
              });
            } catch (error) {
              global[key] = value;
            }
            return value;
          };

          /***/
        },

        /***/ 5117: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var tryToString = __webpack_require__(6330);

          var $TypeError = TypeError;

          module.exports = function (O, P) {
            if (!delete O[P])
              throw $TypeError(
                "Cannot delete property " +
                  tryToString(P) +
                  " of " +
                  tryToString(O)
              );
          };

          /***/
        },

        /***/ 9781: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var fails = __webpack_require__(7293);

          // Detect IE8's incomplete defineProperty implementation
          module.exports = !fails(function () {
            // eslint-disable-next-line es/no-object-defineproperty -- required for testing
            return (
              Object.defineProperty({}, 1, {
                get: function () {
                  return 7;
                },
              })[1] != 7
            );
          });

          /***/
        },

        /***/ 4154: /***/ function (module) {
          var documentAll = typeof document == "object" && document.all;

          // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
          // eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
          var IS_HTMLDDA =
            typeof documentAll == "undefined" && documentAll !== undefined;

          module.exports = {
            all: documentAll,
            IS_HTMLDDA: IS_HTMLDDA,
          };

          /***/
        },

        /***/ 317: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var global = __webpack_require__(7854);
          var isObject = __webpack_require__(111);

          var document = global.document;
          // typeof document.createElement is 'object' in old IE
          var EXISTS = isObject(document) && isObject(document.createElement);

          module.exports = function (it) {
            return EXISTS ? document.createElement(it) : {};
          };

          /***/
        },

        /***/ 7207: /***/ function (module) {
          var $TypeError = TypeError;
          var MAX_SAFE_INTEGER = 0x1fffffffffffff; // 2 ** 53 - 1 == 9007199254740991

          module.exports = function (it) {
            if (it > MAX_SAFE_INTEGER)
              throw $TypeError("Maximum allowed index exceeded");
            return it;
          };

          /***/
        },

        /***/ 8324: /***/ function (module) {
          // iterable DOM collections
          // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
          module.exports = {
            CSSRuleList: 0,
            CSSStyleDeclaration: 0,
            CSSValueList: 0,
            ClientRectList: 0,
            DOMRectList: 0,
            DOMStringList: 0,
            DOMTokenList: 1,
            DataTransferItemList: 0,
            FileList: 0,
            HTMLAllCollection: 0,
            HTMLCollection: 0,
            HTMLFormElement: 0,
            HTMLSelectElement: 0,
            MediaList: 0,
            MimeTypeArray: 0,
            NamedNodeMap: 0,
            NodeList: 1,
            PaintRequestList: 0,
            Plugin: 0,
            PluginArray: 0,
            SVGLengthList: 0,
            SVGNumberList: 0,
            SVGPathSegList: 0,
            SVGPointList: 0,
            SVGStringList: 0,
            SVGTransformList: 0,
            SourceBufferList: 0,
            StyleSheetList: 0,
            TextTrackCueList: 0,
            TextTrackList: 0,
            TouchList: 0,
          };

          /***/
        },

        /***/ 8509: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
          var documentCreateElement = __webpack_require__(317);

          var classList = documentCreateElement("span").classList;
          var DOMTokenListPrototype =
            classList &&
            classList.constructor &&
            classList.constructor.prototype;

          module.exports =
            DOMTokenListPrototype === Object.prototype
              ? undefined
              : DOMTokenListPrototype;

          /***/
        },

        /***/ 8886: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var userAgent = __webpack_require__(8113);

          var firefox = userAgent.match(/firefox\/(\d+)/i);

          module.exports = !!firefox && +firefox[1];

          /***/
        },

        /***/ 256: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var UA = __webpack_require__(8113);

          module.exports = /MSIE|Trident/.test(UA);

          /***/
        },

        /***/ 5268: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var classof = __webpack_require__(4326);

          module.exports =
            typeof process != "undefined" && classof(process) == "process";

          /***/
        },

        /***/ 8113: /***/ function (module) {
          module.exports =
            (typeof navigator != "undefined" && String(navigator.userAgent)) ||
            "";

          /***/
        },

        /***/ 7392: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var global = __webpack_require__(7854);
          var userAgent = __webpack_require__(8113);

          var process = global.process;
          var Deno = global.Deno;
          var versions =
            (process && process.versions) || (Deno && Deno.version);
          var v8 = versions && versions.v8;
          var match, version;

          if (v8) {
            match = v8.split(".");
            // in old Chrome, versions of V8 isn't V8 = Chrome / 10
            // but their correct versions are not interesting for us
            version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
          }

          // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
          // so check `userAgent` even if `.v8` exists, but 0
          if (!version && userAgent) {
            match = userAgent.match(/Edge\/(\d+)/);
            if (!match || match[1] >= 74) {
              match = userAgent.match(/Chrome\/(\d+)/);
              if (match) version = +match[1];
            }
          }

          module.exports = version;

          /***/
        },

        /***/ 8008: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var userAgent = __webpack_require__(8113);

          var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

          module.exports = !!webkit && +webkit[1];

          /***/
        },

        /***/ 748: /***/ function (module) {
          // IE8- don't enum bug keys
          module.exports = [
            "constructor",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "toLocaleString",
            "toString",
            "valueOf",
          ];

          /***/
        },

        /***/ 2109: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var global = __webpack_require__(7854);
          var getOwnPropertyDescriptor = __webpack_require__(1236).f;
          var createNonEnumerableProperty = __webpack_require__(8880);
          var defineBuiltIn = __webpack_require__(8052);
          var defineGlobalProperty = __webpack_require__(3072);
          var copyConstructorProperties = __webpack_require__(9920);
          var isForced = __webpack_require__(4705);

          /*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
          module.exports = function (options, source) {
            var TARGET = options.target;
            var GLOBAL = options.global;
            var STATIC = options.stat;
            var FORCED, target, key, targetProperty, sourceProperty, descriptor;
            if (GLOBAL) {
              target = global;
            } else if (STATIC) {
              target = global[TARGET] || defineGlobalProperty(TARGET, {});
            } else {
              target = (global[TARGET] || {}).prototype;
            }
            if (target)
              for (key in source) {
                sourceProperty = source[key];
                if (options.dontCallGetSet) {
                  descriptor = getOwnPropertyDescriptor(target, key);
                  targetProperty = descriptor && descriptor.value;
                } else targetProperty = target[key];
                FORCED = isForced(
                  GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key,
                  options.forced
                );
                // contained in target
                if (!FORCED && targetProperty !== undefined) {
                  if (typeof sourceProperty == typeof targetProperty) continue;
                  copyConstructorProperties(sourceProperty, targetProperty);
                }
                // add a flag to not completely full polyfills
                if (options.sham || (targetProperty && targetProperty.sham)) {
                  createNonEnumerableProperty(sourceProperty, "sham", true);
                }
                defineBuiltIn(target, key, sourceProperty, options);
              }
          };

          /***/
        },

        /***/ 7293: /***/ function (module) {
          module.exports = function (exec) {
            try {
              return !!exec();
            } catch (error) {
              return true;
            }
          };

          /***/
        },

        /***/ 7007: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          // TODO: Remove from `core-js@4` since it's moved to entry points
          __webpack_require__(4916);
          var uncurryThis = __webpack_require__(1470);
          var defineBuiltIn = __webpack_require__(8052);
          var regexpExec = __webpack_require__(2261);
          var fails = __webpack_require__(7293);
          var wellKnownSymbol = __webpack_require__(5112);
          var createNonEnumerableProperty = __webpack_require__(8880);

          var SPECIES = wellKnownSymbol("species");
          var RegExpPrototype = RegExp.prototype;

          module.exports = function (KEY, exec, FORCED, SHAM) {
            var SYMBOL = wellKnownSymbol(KEY);

            var DELEGATES_TO_SYMBOL = !fails(function () {
              // String methods call symbol-named RegEp methods
              var O = {};
              O[SYMBOL] = function () {
                return 7;
              };
              return ""[KEY](O) != 7;
            });

            var DELEGATES_TO_EXEC =
              DELEGATES_TO_SYMBOL &&
              !fails(function () {
                // Symbol-named RegExp methods call .exec
                var execCalled = false;
                var re = /a/;

                if (KEY === "split") {
                  // We can't use real regex here since it causes deoptimization
                  // and serious performance degradation in V8
                  // https://github.com/zloirock/core-js/issues/306
                  re = {};
                  // RegExp[@@split] doesn't call the regex's exec method, but first creates
                  // a new one. We need to return the patched regex when creating the new one.
                  re.constructor = {};
                  re.constructor[SPECIES] = function () {
                    return re;
                  };
                  re.flags = "";
                  re[SYMBOL] = /./[SYMBOL];
                }

                re.exec = function () {
                  execCalled = true;
                  return null;
                };

                re[SYMBOL]("");
                return !execCalled;
              });

            if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
              var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
              var methods = exec(
                SYMBOL,
                ""[KEY],
                function (nativeMethod, regexp, str, arg2, forceStringMethod) {
                  var uncurriedNativeMethod = uncurryThis(nativeMethod);
                  var $exec = regexp.exec;
                  if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
                    if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                      // The native String method already delegates to @@method (this
                      // polyfilled function), leasing to infinite recursion.
                      // We avoid it by directly calling the native @@method method.
                      return {
                        done: true,
                        value: uncurriedNativeRegExpMethod(regexp, str, arg2),
                      };
                    }
                    return {
                      done: true,
                      value: uncurriedNativeMethod(str, regexp, arg2),
                    };
                  }
                  return { done: false };
                }
              );

              defineBuiltIn(String.prototype, KEY, methods[0]);
              defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
            }

            if (SHAM)
              createNonEnumerableProperty(
                RegExpPrototype[SYMBOL],
                "sham",
                true
              );
          };

          /***/
        },

        /***/ 6790: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var isArray = __webpack_require__(3157);
          var lengthOfArrayLike = __webpack_require__(6244);
          var doesNotExceedSafeInteger = __webpack_require__(7207);
          var bind = __webpack_require__(9974);

          // `FlattenIntoArray` abstract operation
          // https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
          var flattenIntoArray = function (
            target,
            original,
            source,
            sourceLen,
            start,
            depth,
            mapper,
            thisArg
          ) {
            var targetIndex = start;
            var sourceIndex = 0;
            var mapFn = mapper ? bind(mapper, thisArg) : false;
            var element, elementLen;

            while (sourceIndex < sourceLen) {
              if (sourceIndex in source) {
                element = mapFn
                  ? mapFn(source[sourceIndex], sourceIndex, original)
                  : source[sourceIndex];

                if (depth > 0 && isArray(element)) {
                  elementLen = lengthOfArrayLike(element);
                  targetIndex =
                    flattenIntoArray(
                      target,
                      original,
                      element,
                      elementLen,
                      targetIndex,
                      depth - 1
                    ) - 1;
                } else {
                  doesNotExceedSafeInteger(targetIndex + 1);
                  target[targetIndex] = element;
                }

                targetIndex++;
              }
              sourceIndex++;
            }
            return targetIndex;
          };

          module.exports = flattenIntoArray;

          /***/
        },

        /***/ 2104: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var NATIVE_BIND = __webpack_require__(4374);

          var FunctionPrototype = Function.prototype;
          var apply = FunctionPrototype.apply;
          var call = FunctionPrototype.call;

          // eslint-disable-next-line es/no-reflect -- safe
          module.exports =
            (typeof Reflect == "object" && Reflect.apply) ||
            (NATIVE_BIND
              ? call.bind(apply)
              : function () {
                  return call.apply(apply, arguments);
                });

          /***/
        },

        /***/ 9974: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var uncurryThis = __webpack_require__(1470);
          var aCallable = __webpack_require__(9662);
          var NATIVE_BIND = __webpack_require__(4374);

          var bind = uncurryThis(uncurryThis.bind);

          // optional / simple context binding
          module.exports = function (fn, that) {
            aCallable(fn);
            return that === undefined
              ? fn
              : NATIVE_BIND
              ? bind(fn, that)
              : function (/* ...args */) {
                  return fn.apply(that, arguments);
                };
          };

          /***/
        },

        /***/ 4374: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var fails = __webpack_require__(7293);

          module.exports = !fails(function () {
            // eslint-disable-next-line es/no-function-prototype-bind -- safe
            var test = function () {
              /* empty */
            }.bind();
            // eslint-disable-next-line no-prototype-builtins -- safe
            return (
              typeof test != "function" || test.hasOwnProperty("prototype")
            );
          });

          /***/
        },

        /***/ 6916: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var NATIVE_BIND = __webpack_require__(4374);

          var call = Function.prototype.call;

          module.exports = NATIVE_BIND
            ? call.bind(call)
            : function () {
                return call.apply(call, arguments);
              };

          /***/
        },

        /***/ 6530: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var DESCRIPTORS = __webpack_require__(9781);
          var hasOwn = __webpack_require__(2597);

          var FunctionPrototype = Function.prototype;
          // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
          var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

          var EXISTS = hasOwn(FunctionPrototype, "name");
          // additional protection from minified / mangled / dropped function names
          var PROPER =
            EXISTS &&
            function something() {
              /* empty */
            }.name === "something";
          var CONFIGURABLE =
            EXISTS &&
            (!DESCRIPTORS ||
              (DESCRIPTORS &&
                getDescriptor(FunctionPrototype, "name").configurable));

          module.exports = {
            EXISTS: EXISTS,
            PROPER: PROPER,
            CONFIGURABLE: CONFIGURABLE,
          };

          /***/
        },

        /***/ 5668: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var uncurryThis = __webpack_require__(1702);
          var aCallable = __webpack_require__(9662);

          module.exports = function (object, key, method) {
            try {
              // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
              return uncurryThis(
                aCallable(Object.getOwnPropertyDescriptor(object, key)[method])
              );
            } catch (error) {
              /* empty */
            }
          };

          /***/
        },

        /***/ 1470: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var classofRaw = __webpack_require__(4326);
          var uncurryThis = __webpack_require__(1702);

          module.exports = function (fn) {
            // Nashorn bug:
            //   https://github.com/zloirock/core-js/issues/1128
            //   https://github.com/zloirock/core-js/issues/1130
            if (classofRaw(fn) === "Function") return uncurryThis(fn);
          };

          /***/
        },

        /***/ 1702: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var NATIVE_BIND = __webpack_require__(4374);

          var FunctionPrototype = Function.prototype;
          var call = FunctionPrototype.call;
          var uncurryThisWithBind =
            NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

          module.exports = NATIVE_BIND
            ? uncurryThisWithBind
            : function (fn) {
                return function () {
                  return call.apply(fn, arguments);
                };
              };

          /***/
        },

        /***/ 5005: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var global = __webpack_require__(7854);
          var isCallable = __webpack_require__(614);

          var aFunction = function (argument) {
            return isCallable(argument) ? argument : undefined;
          };

          module.exports = function (namespace, method) {
            return arguments.length < 2
              ? aFunction(global[namespace])
              : global[namespace] && global[namespace][method];
          };

          /***/
        },

        /***/ 8044: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var uncurryThis = __webpack_require__(1702);
          var isArray = __webpack_require__(3157);
          var isCallable = __webpack_require__(614);
          var classof = __webpack_require__(4326);
          var toString = __webpack_require__(1340);

          var push = uncurryThis([].push);

          module.exports = function (replacer) {
            if (isCallable(replacer)) return replacer;
            if (!isArray(replacer)) return;
            var rawLength = replacer.length;
            var keys = [];
            for (var i = 0; i < rawLength; i++) {
              var element = replacer[i];
              if (typeof element == "string") push(keys, element);
              else if (
                typeof element == "number" ||
                classof(element) == "Number" ||
                classof(element) == "String"
              )
                push(keys, toString(element));
            }
            var keysLength = keys.length;
            var root = true;
            return function (key, value) {
              if (root) {
                root = false;
                return value;
              }
              if (isArray(this)) return value;
              for (var j = 0; j < keysLength; j++)
                if (keys[j] === key) return value;
            };
          };

          /***/
        },

        /***/ 8173: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var aCallable = __webpack_require__(9662);
          var isNullOrUndefined = __webpack_require__(8554);

          // `GetMethod` abstract operation
          // https://tc39.es/ecma262/#sec-getmethod
          module.exports = function (V, P) {
            var func = V[P];
            return isNullOrUndefined(func) ? undefined : aCallable(func);
          };

          /***/
        },

        /***/ 647: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var uncurryThis = __webpack_require__(1702);
          var toObject = __webpack_require__(7908);

          var floor = Math.floor;
          var charAt = uncurryThis("".charAt);
          var replace = uncurryThis("".replace);
          var stringSlice = uncurryThis("".slice);
          // eslint-disable-next-line redos/no-vulnerable -- safe
          var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
          var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

          // `GetSubstitution` abstract operation
          // https://tc39.es/ecma262/#sec-getsubstitution
          module.exports = function (
            matched,
            str,
            position,
            captures,
            namedCaptures,
            replacement
          ) {
            var tailPos = position + matched.length;
            var m = captures.length;
            var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
            if (namedCaptures !== undefined) {
              namedCaptures = toObject(namedCaptures);
              symbols = SUBSTITUTION_SYMBOLS;
            }
            return replace(replacement, symbols, function (match, ch) {
              var capture;
              switch (charAt(ch, 0)) {
                case "$":
                  return "$";
                case "&":
                  return matched;
                case "`":
                  return stringSlice(str, 0, position);
                case "'":
                  return stringSlice(str, tailPos);
                case "<":
                  capture = namedCaptures[stringSlice(ch, 1, -1)];
                  break;
                default: // \d\d?
                  var n = +ch;
                  if (n === 0) return match;
                  if (n > m) {
                    var f = floor(n / 10);
                    if (f === 0) return match;
                    if (f <= m)
                      return captures[f - 1] === undefined
                        ? charAt(ch, 1)
                        : captures[f - 1] + charAt(ch, 1);
                    return match;
                  }
                  capture = captures[n - 1];
              }
              return capture === undefined ? "" : capture;
            });
          };

          /***/
        },

        /***/ 7854: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var check = function (it) {
            return it && it.Math == Math && it;
          };

          // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
          module.exports =
            // eslint-disable-next-line es/no-global-this -- safe
            check(typeof globalThis == "object" && globalThis) ||
            check(typeof window == "object" && window) ||
            // eslint-disable-next-line no-restricted-globals -- safe
            check(typeof self == "object" && self) ||
            check(
              typeof __webpack_require__.g == "object" && __webpack_require__.g
            ) ||
            // eslint-disable-next-line no-new-func -- fallback
            (function () {
              return this;
            })() ||
            Function("return this")();

          /***/
        },

        /***/ 2597: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var uncurryThis = __webpack_require__(1702);
          var toObject = __webpack_require__(7908);

          var hasOwnProperty = uncurryThis({}.hasOwnProperty);

          // `HasOwnProperty` abstract operation
          // https://tc39.es/ecma262/#sec-hasownproperty
          // eslint-disable-next-line es/no-object-hasown -- safe
          module.exports =
            Object.hasOwn ||
            function hasOwn(it, key) {
              return hasOwnProperty(toObject(it), key);
            };

          /***/
        },

        /***/ 3501: /***/ function (module) {
          module.exports = {};

          /***/
        },

        /***/ 490: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var getBuiltIn = __webpack_require__(5005);

          module.exports = getBuiltIn("document", "documentElement");

          /***/
        },

        /***/ 4664: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var DESCRIPTORS = __webpack_require__(9781);
          var fails = __webpack_require__(7293);
          var createElement = __webpack_require__(317);

          // Thanks to IE8 for its funny defineProperty
          module.exports =
            !DESCRIPTORS &&
            !fails(function () {
              // eslint-disable-next-line es/no-object-defineproperty -- required for testing
              return (
                Object.defineProperty(createElement("div"), "a", {
                  get: function () {
                    return 7;
                  },
                }).a != 7
              );
            });

          /***/
        },

        /***/ 8361: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var uncurryThis = __webpack_require__(1702);
          var fails = __webpack_require__(7293);
          var classof = __webpack_require__(4326);

          var $Object = Object;
          var split = uncurryThis("".split);

          // fallback for non-array-like ES3 and non-enumerable old V8 strings
          module.exports = fails(function () {
            // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
            // eslint-disable-next-line no-prototype-builtins -- safe
            return !$Object("z").propertyIsEnumerable(0);
          })
            ? function (it) {
                return classof(it) == "String" ? split(it, "") : $Object(it);
              }
            : $Object;

          /***/
        },

        /***/ 9587: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var isCallable = __webpack_require__(614);
          var isObject = __webpack_require__(111);
          var setPrototypeOf = __webpack_require__(7674);

          // makes subclassing work correct for wrapped built-ins
          module.exports = function ($this, dummy, Wrapper) {
            var NewTarget, NewTargetPrototype;
            if (
              // it can work only with native `setPrototypeOf`
              setPrototypeOf &&
              // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
              isCallable((NewTarget = dummy.constructor)) &&
              NewTarget !== Wrapper &&
              isObject((NewTargetPrototype = NewTarget.prototype)) &&
              NewTargetPrototype !== Wrapper.prototype
            )
              setPrototypeOf($this, NewTargetPrototype);
            return $this;
          };

          /***/
        },

        /***/ 2788: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var uncurryThis = __webpack_require__(1702);
          var isCallable = __webpack_require__(614);
          var store = __webpack_require__(5465);

          var functionToString = uncurryThis(Function.toString);

          // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
          if (!isCallable(store.inspectSource)) {
            store.inspectSource = function (it) {
              return functionToString(it);
            };
          }

          module.exports = store.inspectSource;

          /***/
        },

        /***/ 9909: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var NATIVE_WEAK_MAP = __webpack_require__(4811);
          var global = __webpack_require__(7854);
          var isObject = __webpack_require__(111);
          var createNonEnumerableProperty = __webpack_require__(8880);
          var hasOwn = __webpack_require__(2597);
          var shared = __webpack_require__(5465);
          var sharedKey = __webpack_require__(6200);
          var hiddenKeys = __webpack_require__(3501);

          var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
          var TypeError = global.TypeError;
          var WeakMap = global.WeakMap;
          var set, get, has;

          var enforce = function (it) {
            return has(it) ? get(it) : set(it, {});
          };

          var getterFor = function (TYPE) {
            return function (it) {
              var state;
              if (!isObject(it) || (state = get(it)).type !== TYPE) {
                throw TypeError("Incompatible receiver, " + TYPE + " required");
              }
              return state;
            };
          };

          if (NATIVE_WEAK_MAP || shared.state) {
            var store = shared.state || (shared.state = new WeakMap());
            /* eslint-disable no-self-assign -- prototype methods protection */
            store.get = store.get;
            store.has = store.has;
            store.set = store.set;
            /* eslint-enable no-self-assign -- prototype methods protection */
            set = function (it, metadata) {
              if (store.has(it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
              metadata.facade = it;
              store.set(it, metadata);
              return metadata;
            };
            get = function (it) {
              return store.get(it) || {};
            };
            has = function (it) {
              return store.has(it);
            };
          } else {
            var STATE = sharedKey("state");
            hiddenKeys[STATE] = true;
            set = function (it, metadata) {
              if (hasOwn(it, STATE))
                throw TypeError(OBJECT_ALREADY_INITIALIZED);
              metadata.facade = it;
              createNonEnumerableProperty(it, STATE, metadata);
              return metadata;
            };
            get = function (it) {
              return hasOwn(it, STATE) ? it[STATE] : {};
            };
            has = function (it) {
              return hasOwn(it, STATE);
            };
          }

          module.exports = {
            set: set,
            get: get,
            has: has,
            enforce: enforce,
            getterFor: getterFor,
          };

          /***/
        },

        /***/ 3157: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var classof = __webpack_require__(4326);

          // `IsArray` abstract operation
          // https://tc39.es/ecma262/#sec-isarray
          // eslint-disable-next-line es/no-array-isarray -- safe
          module.exports =
            Array.isArray ||
            function isArray(argument) {
              return classof(argument) == "Array";
            };

          /***/
        },

        /***/ 614: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var $documentAll = __webpack_require__(4154);

          var documentAll = $documentAll.all;

          // `IsCallable` abstract operation
          // https://tc39.es/ecma262/#sec-iscallable
          module.exports = $documentAll.IS_HTMLDDA
            ? function (argument) {
                return (
                  typeof argument == "function" || argument === documentAll
                );
              }
            : function (argument) {
                return typeof argument == "function";
              };

          /***/
        },

        /***/ 4411: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var uncurryThis = __webpack_require__(1702);
          var fails = __webpack_require__(7293);
          var isCallable = __webpack_require__(614);
          var classof = __webpack_require__(648);
          var getBuiltIn = __webpack_require__(5005);
          var inspectSource = __webpack_require__(2788);

          var noop = function () {
            /* empty */
          };
          var empty = [];
          var construct = getBuiltIn("Reflect", "construct");
          var constructorRegExp = /^\s*(?:class|function)\b/;
          var exec = uncurryThis(constructorRegExp.exec);
          var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

          var isConstructorModern = function isConstructor(argument) {
            if (!isCallable(argument)) return false;
            try {
              construct(noop, empty, argument);
              return true;
            } catch (error) {
              return false;
            }
          };

          var isConstructorLegacy = function isConstructor(argument) {
            if (!isCallable(argument)) return false;
            switch (classof(argument)) {
              case "AsyncFunction":
              case "GeneratorFunction":
              case "AsyncGeneratorFunction":
                return false;
            }
            try {
              // we can't check .prototype since constructors produced by .bind haven't it
              // `Function#toString` throws on some built-it function in some legacy engines
              // (for example, `DOMQuad` and similar in FF41-)
              return (
                INCORRECT_TO_STRING ||
                !!exec(constructorRegExp, inspectSource(argument))
              );
            } catch (error) {
              return true;
            }
          };

          isConstructorLegacy.sham = true;

          // `IsConstructor` abstract operation
          // https://tc39.es/ecma262/#sec-isconstructor
          module.exports =
            !construct ||
            fails(function () {
              var called;
              return (
                isConstructorModern(isConstructorModern.call) ||
                !isConstructorModern(Object) ||
                !isConstructorModern(function () {
                  called = true;
                }) ||
                called
              );
            })
              ? isConstructorLegacy
              : isConstructorModern;

          /***/
        },

        /***/ 4705: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var fails = __webpack_require__(7293);
          var isCallable = __webpack_require__(614);

          var replacement = /#|\.prototype\./;

          var isForced = function (feature, detection) {
            var value = data[normalize(feature)];
            return value == POLYFILL
              ? true
              : value == NATIVE
              ? false
              : isCallable(detection)
              ? fails(detection)
              : !!detection;
          };

          var normalize = (isForced.normalize = function (string) {
            return String(string).replace(replacement, ".").toLowerCase();
          });

          var data = (isForced.data = {});
          var NATIVE = (isForced.NATIVE = "N");
          var POLYFILL = (isForced.POLYFILL = "P");

          module.exports = isForced;

          /***/
        },

        /***/ 8554: /***/ function (module) {
          // we can't use just `it == null` since of `document.all` special case
          // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
          module.exports = function (it) {
            return it === null || it === undefined;
          };

          /***/
        },

        /***/ 111: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var isCallable = __webpack_require__(614);
          var $documentAll = __webpack_require__(4154);

          var documentAll = $documentAll.all;

          module.exports = $documentAll.IS_HTMLDDA
            ? function (it) {
                return typeof it == "object"
                  ? it !== null
                  : isCallable(it) || it === documentAll;
              }
            : function (it) {
                return typeof it == "object" ? it !== null : isCallable(it);
              };

          /***/
        },

        /***/ 1913: /***/ function (module) {
          module.exports = false;

          /***/
        },

        /***/ 2190: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var getBuiltIn = __webpack_require__(5005);
          var isCallable = __webpack_require__(614);
          var isPrototypeOf = __webpack_require__(7976);
          var USE_SYMBOL_AS_UID = __webpack_require__(3307);

          var $Object = Object;

          module.exports = USE_SYMBOL_AS_UID
            ? function (it) {
                return typeof it == "symbol";
              }
            : function (it) {
                var $Symbol = getBuiltIn("Symbol");
                return (
                  isCallable($Symbol) &&
                  isPrototypeOf($Symbol.prototype, $Object(it))
                );
              };

          /***/
        },

        /***/ 6244: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var toLength = __webpack_require__(7466);

          // `LengthOfArrayLike` abstract operation
          // https://tc39.es/ecma262/#sec-lengthofarraylike
          module.exports = function (obj) {
            return toLength(obj.length);
          };

          /***/
        },

        /***/ 6339: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var uncurryThis = __webpack_require__(1702);
          var fails = __webpack_require__(7293);
          var isCallable = __webpack_require__(614);
          var hasOwn = __webpack_require__(2597);
          var DESCRIPTORS = __webpack_require__(9781);
          var CONFIGURABLE_FUNCTION_NAME =
            __webpack_require__(6530).CONFIGURABLE;
          var inspectSource = __webpack_require__(2788);
          var InternalStateModule = __webpack_require__(9909);

          var enforceInternalState = InternalStateModule.enforce;
          var getInternalState = InternalStateModule.get;
          var $String = String;
          // eslint-disable-next-line es/no-object-defineproperty -- safe
          var defineProperty = Object.defineProperty;
          var stringSlice = uncurryThis("".slice);
          var replace = uncurryThis("".replace);
          var join = uncurryThis([].join);

          var CONFIGURABLE_LENGTH =
            DESCRIPTORS &&
            !fails(function () {
              return (
                defineProperty(
                  function () {
                    /* empty */
                  },
                  "length",
                  { value: 8 }
                ).length !== 8
              );
            });

          var TEMPLATE = String(String).split("String");

          var makeBuiltIn = (module.exports = function (value, name, options) {
            if (stringSlice($String(name), 0, 7) === "Symbol(") {
              name =
                "[" + replace($String(name), /^Symbol\(([^)]*)\)/, "$1") + "]";
            }
            if (options && options.getter) name = "get " + name;
            if (options && options.setter) name = "set " + name;
            if (
              !hasOwn(value, "name") ||
              (CONFIGURABLE_FUNCTION_NAME && value.name !== name)
            ) {
              if (DESCRIPTORS)
                defineProperty(value, "name", {
                  value: name,
                  configurable: true,
                });
              else value.name = name;
            }
            if (
              CONFIGURABLE_LENGTH &&
              options &&
              hasOwn(options, "arity") &&
              value.length !== options.arity
            ) {
              defineProperty(value, "length", { value: options.arity });
            }
            try {
              if (
                options &&
                hasOwn(options, "constructor") &&
                options.constructor
              ) {
                if (DESCRIPTORS)
                  defineProperty(value, "prototype", { writable: false });
                // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
              } else if (value.prototype) value.prototype = undefined;
            } catch (error) {
              /* empty */
            }
            var state = enforceInternalState(value);
            if (!hasOwn(state, "source")) {
              state.source = join(
                TEMPLATE,
                typeof name == "string" ? name : ""
              );
            }
            return value;
          });

          // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
          // eslint-disable-next-line no-extend-native -- required
          Function.prototype.toString = makeBuiltIn(function toString() {
            return (
              (isCallable(this) && getInternalState(this).source) ||
              inspectSource(this)
            );
          }, "toString");

          /***/
        },

        /***/ 4758: /***/ function (module) {
          var ceil = Math.ceil;
          var floor = Math.floor;

          // `Math.trunc` method
          // https://tc39.es/ecma262/#sec-math.trunc
          // eslint-disable-next-line es/no-math-trunc -- safe
          module.exports =
            Math.trunc ||
            function trunc(x) {
              var n = +x;
              return (n > 0 ? floor : ceil)(n);
            };

          /***/
        },

        /***/ 30: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          /* global ActiveXObject -- old IE, WSH */
          var anObject = __webpack_require__(9670);
          var definePropertiesModule = __webpack_require__(6048);
          var enumBugKeys = __webpack_require__(748);
          var hiddenKeys = __webpack_require__(3501);
          var html = __webpack_require__(490);
          var documentCreateElement = __webpack_require__(317);
          var sharedKey = __webpack_require__(6200);

          var GT = ">";
          var LT = "<";
          var PROTOTYPE = "prototype";
          var SCRIPT = "script";
          var IE_PROTO = sharedKey("IE_PROTO");

          var EmptyConstructor = function () {
            /* empty */
          };

          var scriptTag = function (content) {
            return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
          };

          // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
          var NullProtoObjectViaActiveX = function (activeXDocument) {
            activeXDocument.write(scriptTag(""));
            activeXDocument.close();
            var temp = activeXDocument.parentWindow.Object;
            activeXDocument = null; // avoid memory leak
            return temp;
          };

          // Create object with fake `null` prototype: use iframe Object with cleared prototype
          var NullProtoObjectViaIFrame = function () {
            // Thrash, waste and sodomy: IE GC bug
            var iframe = documentCreateElement("iframe");
            var JS = "java" + SCRIPT + ":";
            var iframeDocument;
            iframe.style.display = "none";
            html.appendChild(iframe);
            // https://github.com/zloirock/core-js/issues/475
            iframe.src = String(JS);
            iframeDocument = iframe.contentWindow.document;
            iframeDocument.open();
            iframeDocument.write(scriptTag("document.F=Object"));
            iframeDocument.close();
            return iframeDocument.F;
          };

          // Check for document.domain and active x support
          // No need to use active x approach when document.domain is not set
          // see https://github.com/es-shims/es5-shim/issues/150
          // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
          // avoid IE GC bug
          var activeXDocument;
          var NullProtoObject = function () {
            try {
              activeXDocument = new ActiveXObject("htmlfile");
            } catch (error) {
              /* ignore */
            }
            NullProtoObject =
              typeof document != "undefined"
                ? document.domain && activeXDocument
                  ? NullProtoObjectViaActiveX(activeXDocument) // old IE
                  : NullProtoObjectViaIFrame()
                : NullProtoObjectViaActiveX(activeXDocument); // WSH
            var length = enumBugKeys.length;
            while (length--)
              delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
            return NullProtoObject();
          };

          hiddenKeys[IE_PROTO] = true;

          // `Object.create` method
          // https://tc39.es/ecma262/#sec-object.create
          // eslint-disable-next-line es/no-object-create -- safe
          module.exports =
            Object.create ||
            function create(O, Properties) {
              var result;
              if (O !== null) {
                EmptyConstructor[PROTOTYPE] = anObject(O);
                result = new EmptyConstructor();
                EmptyConstructor[PROTOTYPE] = null;
                // add "__proto__" for Object.getPrototypeOf polyfill
                result[IE_PROTO] = O;
              } else result = NullProtoObject();
              return Properties === undefined
                ? result
                : definePropertiesModule.f(result, Properties);
            };

          /***/
        },

        /***/ 6048: /***/ function (
          __unused_webpack_module,
          exports,
          __webpack_require__
        ) {
          var DESCRIPTORS = __webpack_require__(9781);
          var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
          var definePropertyModule = __webpack_require__(3070);
          var anObject = __webpack_require__(9670);
          var toIndexedObject = __webpack_require__(5656);
          var objectKeys = __webpack_require__(1956);

          // `Object.defineProperties` method
          // https://tc39.es/ecma262/#sec-object.defineproperties
          // eslint-disable-next-line es/no-object-defineproperties -- safe
          exports.f =
            DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG
              ? Object.defineProperties
              : function defineProperties(O, Properties) {
                  anObject(O);
                  var props = toIndexedObject(Properties);
                  var keys = objectKeys(Properties);
                  var length = keys.length;
                  var index = 0;
                  var key;
                  while (length > index)
                    definePropertyModule.f(
                      O,
                      (key = keys[index++]),
                      props[key]
                    );
                  return O;
                };

          /***/
        },

        /***/ 3070: /***/ function (
          __unused_webpack_module,
          exports,
          __webpack_require__
        ) {
          var DESCRIPTORS = __webpack_require__(9781);
          var IE8_DOM_DEFINE = __webpack_require__(4664);
          var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
          var anObject = __webpack_require__(9670);
          var toPropertyKey = __webpack_require__(4948);

          var $TypeError = TypeError;
          // eslint-disable-next-line es/no-object-defineproperty -- safe
          var $defineProperty = Object.defineProperty;
          // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
          var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
          var ENUMERABLE = "enumerable";
          var CONFIGURABLE = "configurable";
          var WRITABLE = "writable";

          // `Object.defineProperty` method
          // https://tc39.es/ecma262/#sec-object.defineproperty
          exports.f = DESCRIPTORS
            ? V8_PROTOTYPE_DEFINE_BUG
              ? function defineProperty(O, P, Attributes) {
                  anObject(O);
                  P = toPropertyKey(P);
                  anObject(Attributes);
                  if (
                    typeof O === "function" &&
                    P === "prototype" &&
                    "value" in Attributes &&
                    WRITABLE in Attributes &&
                    !Attributes[WRITABLE]
                  ) {
                    var current = $getOwnPropertyDescriptor(O, P);
                    if (current && current[WRITABLE]) {
                      O[P] = Attributes.value;
                      Attributes = {
                        configurable:
                          CONFIGURABLE in Attributes
                            ? Attributes[CONFIGURABLE]
                            : current[CONFIGURABLE],
                        enumerable:
                          ENUMERABLE in Attributes
                            ? Attributes[ENUMERABLE]
                            : current[ENUMERABLE],
                        writable: false,
                      };
                    }
                  }
                  return $defineProperty(O, P, Attributes);
                }
              : $defineProperty
            : function defineProperty(O, P, Attributes) {
                anObject(O);
                P = toPropertyKey(P);
                anObject(Attributes);
                if (IE8_DOM_DEFINE)
                  try {
                    return $defineProperty(O, P, Attributes);
                  } catch (error) {
                    /* empty */
                  }
                if ("get" in Attributes || "set" in Attributes)
                  throw $TypeError("Accessors not supported");
                if ("value" in Attributes) O[P] = Attributes.value;
                return O;
              };

          /***/
        },

        /***/ 1236: /***/ function (
          __unused_webpack_module,
          exports,
          __webpack_require__
        ) {
          var DESCRIPTORS = __webpack_require__(9781);
          var call = __webpack_require__(6916);
          var propertyIsEnumerableModule = __webpack_require__(5296);
          var createPropertyDescriptor = __webpack_require__(9114);
          var toIndexedObject = __webpack_require__(5656);
          var toPropertyKey = __webpack_require__(4948);
          var hasOwn = __webpack_require__(2597);
          var IE8_DOM_DEFINE = __webpack_require__(4664);

          // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
          var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

          // `Object.getOwnPropertyDescriptor` method
          // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
          exports.f = DESCRIPTORS
            ? $getOwnPropertyDescriptor
            : function getOwnPropertyDescriptor(O, P) {
                O = toIndexedObject(O);
                P = toPropertyKey(P);
                if (IE8_DOM_DEFINE)
                  try {
                    return $getOwnPropertyDescriptor(O, P);
                  } catch (error) {
                    /* empty */
                  }
                if (hasOwn(O, P))
                  return createPropertyDescriptor(
                    !call(propertyIsEnumerableModule.f, O, P),
                    O[P]
                  );
              };

          /***/
        },

        /***/ 8006: /***/ function (
          __unused_webpack_module,
          exports,
          __webpack_require__
        ) {
          var internalObjectKeys = __webpack_require__(6324);
          var enumBugKeys = __webpack_require__(748);

          var hiddenKeys = enumBugKeys.concat("length", "prototype");

          // `Object.getOwnPropertyNames` method
          // https://tc39.es/ecma262/#sec-object.getownpropertynames
          // eslint-disable-next-line es/no-object-getownpropertynames -- safe
          exports.f =
            Object.getOwnPropertyNames ||
            function getOwnPropertyNames(O) {
              return internalObjectKeys(O, hiddenKeys);
            };

          /***/
        },

        /***/ 5181: /***/ function (__unused_webpack_module, exports) {
          // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
          exports.f = Object.getOwnPropertySymbols;

          /***/
        },

        /***/ 9518: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var hasOwn = __webpack_require__(2597);
          var isCallable = __webpack_require__(614);
          var toObject = __webpack_require__(7908);
          var sharedKey = __webpack_require__(6200);
          var CORRECT_PROTOTYPE_GETTER = __webpack_require__(8544);

          var IE_PROTO = sharedKey("IE_PROTO");
          var $Object = Object;
          var ObjectPrototype = $Object.prototype;

          // `Object.getPrototypeOf` method
          // https://tc39.es/ecma262/#sec-object.getprototypeof
          // eslint-disable-next-line es/no-object-getprototypeof -- safe
          module.exports = CORRECT_PROTOTYPE_GETTER
            ? $Object.getPrototypeOf
            : function (O) {
                var object = toObject(O);
                if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
                var constructor = object.constructor;
                if (isCallable(constructor) && object instanceof constructor) {
                  return constructor.prototype;
                }
                return object instanceof $Object ? ObjectPrototype : null;
              };

          /***/
        },

        /***/ 7976: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var uncurryThis = __webpack_require__(1702);

          module.exports = uncurryThis({}.isPrototypeOf);

          /***/
        },

        /***/ 6324: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var uncurryThis = __webpack_require__(1702);
          var hasOwn = __webpack_require__(2597);
          var toIndexedObject = __webpack_require__(5656);
          var indexOf = __webpack_require__(1318).indexOf;
          var hiddenKeys = __webpack_require__(3501);

          var push = uncurryThis([].push);

          module.exports = function (object, names) {
            var O = toIndexedObject(object);
            var i = 0;
            var result = [];
            var key;
            for (key in O)
              !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
            // Don't enum bug & hidden keys
            while (names.length > i)
              if (hasOwn(O, (key = names[i++]))) {
                ~indexOf(result, key) || push(result, key);
              }
            return result;
          };

          /***/
        },

        /***/ 1956: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var internalObjectKeys = __webpack_require__(6324);
          var enumBugKeys = __webpack_require__(748);

          // `Object.keys` method
          // https://tc39.es/ecma262/#sec-object.keys
          // eslint-disable-next-line es/no-object-keys -- safe
          module.exports =
            Object.keys ||
            function keys(O) {
              return internalObjectKeys(O, enumBugKeys);
            };

          /***/
        },

        /***/ 5296: /***/ function (__unused_webpack_module, exports) {
          "use strict";

          var $propertyIsEnumerable = {}.propertyIsEnumerable;
          // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
          var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

          // Nashorn ~ JDK8 bug
          var NASHORN_BUG =
            getOwnPropertyDescriptor &&
            !$propertyIsEnumerable.call({ 1: 2 }, 1);

          // `Object.prototype.propertyIsEnumerable` method implementation
          // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
          exports.f = NASHORN_BUG
            ? function propertyIsEnumerable(V) {
                var descriptor = getOwnPropertyDescriptor(this, V);
                return !!descriptor && descriptor.enumerable;
              }
            : $propertyIsEnumerable;

          /***/
        },

        /***/ 7674: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          /* eslint-disable no-proto -- safe */
          var uncurryThisAccessor = __webpack_require__(5668);
          var anObject = __webpack_require__(9670);
          var aPossiblePrototype = __webpack_require__(6077);

          // `Object.setPrototypeOf` method
          // https://tc39.es/ecma262/#sec-object.setprototypeof
          // Works with __proto__ only. Old v8 can't work with null proto objects.
          // eslint-disable-next-line es/no-object-setprototypeof -- safe
          module.exports =
            Object.setPrototypeOf ||
            ("__proto__" in {}
              ? (function () {
                  var CORRECT_SETTER = false;
                  var test = {};
                  var setter;
                  try {
                    setter = uncurryThisAccessor(
                      Object.prototype,
                      "__proto__",
                      "set"
                    );
                    setter(test, []);
                    CORRECT_SETTER = test instanceof Array;
                  } catch (error) {
                    /* empty */
                  }
                  return function setPrototypeOf(O, proto) {
                    anObject(O);
                    aPossiblePrototype(proto);
                    if (CORRECT_SETTER) setter(O, proto);
                    else O.__proto__ = proto;
                    return O;
                  };
                })()
              : undefined);

          /***/
        },

        /***/ 288: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
          var classof = __webpack_require__(648);

          // `Object.prototype.toString` method implementation
          // https://tc39.es/ecma262/#sec-object.prototype.tostring
          module.exports = TO_STRING_TAG_SUPPORT
            ? {}.toString
            : function toString() {
                return "[object " + classof(this) + "]";
              };

          /***/
        },

        /***/ 2140: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var call = __webpack_require__(6916);
          var isCallable = __webpack_require__(614);
          var isObject = __webpack_require__(111);

          var $TypeError = TypeError;

          // `OrdinaryToPrimitive` abstract operation
          // https://tc39.es/ecma262/#sec-ordinarytoprimitive
          module.exports = function (input, pref) {
            var fn, val;
            if (
              pref === "string" &&
              isCallable((fn = input.toString)) &&
              !isObject((val = call(fn, input)))
            )
              return val;
            if (
              isCallable((fn = input.valueOf)) &&
              !isObject((val = call(fn, input)))
            )
              return val;
            if (
              pref !== "string" &&
              isCallable((fn = input.toString)) &&
              !isObject((val = call(fn, input)))
            )
              return val;
            throw $TypeError("Can't convert object to primitive value");
          };

          /***/
        },

        /***/ 3887: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var getBuiltIn = __webpack_require__(5005);
          var uncurryThis = __webpack_require__(1702);
          var getOwnPropertyNamesModule = __webpack_require__(8006);
          var getOwnPropertySymbolsModule = __webpack_require__(5181);
          var anObject = __webpack_require__(9670);

          var concat = uncurryThis([].concat);

          // all object keys, includes non-enumerable and symbols
          module.exports =
            getBuiltIn("Reflect", "ownKeys") ||
            function ownKeys(it) {
              var keys = getOwnPropertyNamesModule.f(anObject(it));
              var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
              return getOwnPropertySymbols
                ? concat(keys, getOwnPropertySymbols(it))
                : keys;
            };

          /***/
        },

        /***/ 857: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var global = __webpack_require__(7854);

          module.exports = global;

          /***/
        },

        /***/ 7651: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var call = __webpack_require__(6916);
          var anObject = __webpack_require__(9670);
          var isCallable = __webpack_require__(614);
          var classof = __webpack_require__(4326);
          var regexpExec = __webpack_require__(2261);

          var $TypeError = TypeError;

          // `RegExpExec` abstract operation
          // https://tc39.es/ecma262/#sec-regexpexec
          module.exports = function (R, S) {
            var exec = R.exec;
            if (isCallable(exec)) {
              var result = call(exec, R, S);
              if (result !== null) anObject(result);
              return result;
            }
            if (classof(R) === "RegExp") return call(regexpExec, R, S);
            throw $TypeError("RegExp#exec called on incompatible receiver");
          };

          /***/
        },

        /***/ 2261: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
          /* eslint-disable regexp/no-useless-quantifier -- testing */
          var call = __webpack_require__(6916);
          var uncurryThis = __webpack_require__(1702);
          var toString = __webpack_require__(1340);
          var regexpFlags = __webpack_require__(7066);
          var stickyHelpers = __webpack_require__(2999);
          var shared = __webpack_require__(2309);
          var create = __webpack_require__(30);
          var getInternalState = __webpack_require__(9909).get;
          var UNSUPPORTED_DOT_ALL = __webpack_require__(9441);
          var UNSUPPORTED_NCG = __webpack_require__(7168);

          var nativeReplace = shared(
            "native-string-replace",
            String.prototype.replace
          );
          var nativeExec = RegExp.prototype.exec;
          var patchedExec = nativeExec;
          var charAt = uncurryThis("".charAt);
          var indexOf = uncurryThis("".indexOf);
          var replace = uncurryThis("".replace);
          var stringSlice = uncurryThis("".slice);

          var UPDATES_LAST_INDEX_WRONG = (function () {
            var re1 = /a/;
            var re2 = /b*/g;
            call(nativeExec, re1, "a");
            call(nativeExec, re2, "a");
            return re1.lastIndex !== 0 || re2.lastIndex !== 0;
          })();

          var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

          // nonparticipating capturing group, copied from es5-shim's String#split patch.
          var NPCG_INCLUDED = /()??/.exec("")[1] !== undefined;

          var PATCH =
            UPDATES_LAST_INDEX_WRONG ||
            NPCG_INCLUDED ||
            UNSUPPORTED_Y ||
            UNSUPPORTED_DOT_ALL ||
            UNSUPPORTED_NCG;

          if (PATCH) {
            patchedExec = function exec(string) {
              var re = this;
              var state = getInternalState(re);
              var str = toString(string);
              var raw = state.raw;
              var result, reCopy, lastIndex, match, i, object, group;

              if (raw) {
                raw.lastIndex = re.lastIndex;
                result = call(patchedExec, raw, str);
                re.lastIndex = raw.lastIndex;
                return result;
              }

              var groups = state.groups;
              var sticky = UNSUPPORTED_Y && re.sticky;
              var flags = call(regexpFlags, re);
              var source = re.source;
              var charsAdded = 0;
              var strCopy = str;

              if (sticky) {
                flags = replace(flags, "y", "");
                if (indexOf(flags, "g") === -1) {
                  flags += "g";
                }

                strCopy = stringSlice(str, re.lastIndex);
                // Support anchored sticky behavior.
                if (
                  re.lastIndex > 0 &&
                  (!re.multiline ||
                    (re.multiline && charAt(str, re.lastIndex - 1) !== "\n"))
                ) {
                  source = "(?: " + source + ")";
                  strCopy = " " + strCopy;
                  charsAdded++;
                }
                // ^(? + rx + ) is needed, in combination with some str slicing, to
                // simulate the 'y' flag.
                reCopy = new RegExp("^(?:" + source + ")", flags);
              }

              if (NPCG_INCLUDED) {
                reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
              }
              if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

              match = call(nativeExec, sticky ? reCopy : re, strCopy);

              if (sticky) {
                if (match) {
                  match.input = stringSlice(match.input, charsAdded);
                  match[0] = stringSlice(match[0], charsAdded);
                  match.index = re.lastIndex;
                  re.lastIndex += match[0].length;
                } else re.lastIndex = 0;
              } else if (UPDATES_LAST_INDEX_WRONG && match) {
                re.lastIndex = re.global
                  ? match.index + match[0].length
                  : lastIndex;
              }
              if (NPCG_INCLUDED && match && match.length > 1) {
                // Fix browsers whose `exec` methods don't consistently return `undefined`
                // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
                call(nativeReplace, match[0], reCopy, function () {
                  for (i = 1; i < arguments.length - 2; i++) {
                    if (arguments[i] === undefined) match[i] = undefined;
                  }
                });
              }

              if (match && groups) {
                match.groups = object = create(null);
                for (i = 0; i < groups.length; i++) {
                  group = groups[i];
                  object[group[0]] = match[group[1]];
                }
              }

              return match;
            };
          }

          module.exports = patchedExec;

          /***/
        },

        /***/ 7066: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var anObject = __webpack_require__(9670);

          // `RegExp.prototype.flags` getter implementation
          // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
          module.exports = function () {
            var that = anObject(this);
            var result = "";
            if (that.hasIndices) result += "d";
            if (that.global) result += "g";
            if (that.ignoreCase) result += "i";
            if (that.multiline) result += "m";
            if (that.dotAll) result += "s";
            if (that.unicode) result += "u";
            if (that.unicodeSets) result += "v";
            if (that.sticky) result += "y";
            return result;
          };

          /***/
        },

        /***/ 2999: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var fails = __webpack_require__(7293);
          var global = __webpack_require__(7854);

          // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
          var $RegExp = global.RegExp;

          var UNSUPPORTED_Y = fails(function () {
            var re = $RegExp("a", "y");
            re.lastIndex = 2;
            return re.exec("abcd") != null;
          });

          // UC Browser bug
          // https://github.com/zloirock/core-js/issues/1008
          var MISSED_STICKY =
            UNSUPPORTED_Y ||
            fails(function () {
              return !$RegExp("a", "y").sticky;
            });

          var BROKEN_CARET =
            UNSUPPORTED_Y ||
            fails(function () {
              // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
              var re = $RegExp("^r", "gy");
              re.lastIndex = 2;
              return re.exec("str") != null;
            });

          module.exports = {
            BROKEN_CARET: BROKEN_CARET,
            MISSED_STICKY: MISSED_STICKY,
            UNSUPPORTED_Y: UNSUPPORTED_Y,
          };

          /***/
        },

        /***/ 9441: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var fails = __webpack_require__(7293);
          var global = __webpack_require__(7854);

          // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
          var $RegExp = global.RegExp;

          module.exports = fails(function () {
            var re = $RegExp(".", "s");
            return !(re.dotAll && re.exec("\n") && re.flags === "s");
          });

          /***/
        },

        /***/ 7168: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var fails = __webpack_require__(7293);
          var global = __webpack_require__(7854);

          // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
          var $RegExp = global.RegExp;

          module.exports = fails(function () {
            var re = $RegExp("(?<a>b)", "g");
            return (
              re.exec("b").groups.a !== "b" || "b".replace(re, "$<a>c") !== "bc"
            );
          });

          /***/
        },

        /***/ 4488: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var isNullOrUndefined = __webpack_require__(8554);

          var $TypeError = TypeError;

          // `RequireObjectCoercible` abstract operation
          // https://tc39.es/ecma262/#sec-requireobjectcoercible
          module.exports = function (it) {
            if (isNullOrUndefined(it))
              throw $TypeError("Can't call method on " + it);
            return it;
          };

          /***/
        },

        /***/ 6200: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var shared = __webpack_require__(2309);
          var uid = __webpack_require__(9711);

          var keys = shared("keys");

          module.exports = function (key) {
            return keys[key] || (keys[key] = uid(key));
          };

          /***/
        },

        /***/ 5465: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var global = __webpack_require__(7854);
          var defineGlobalProperty = __webpack_require__(3072);

          var SHARED = "__core-js_shared__";
          var store = global[SHARED] || defineGlobalProperty(SHARED, {});

          module.exports = store;

          /***/
        },

        /***/ 2309: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var IS_PURE = __webpack_require__(1913);
          var store = __webpack_require__(5465);

          (module.exports = function (key, value) {
            return (
              store[key] || (store[key] = value !== undefined ? value : {})
            );
          })("versions", []).push({
            version: "3.29.1",
            mode: IS_PURE ? "pure" : "global",
            copyright: "© 2014-2023 Denis Pushkarev (zloirock.ru)",
            license: "https://github.com/zloirock/core-js/blob/v3.29.1/LICENSE",
            source: "https://github.com/zloirock/core-js",
          });

          /***/
        },

        /***/ 8710: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var uncurryThis = __webpack_require__(1702);
          var toIntegerOrInfinity = __webpack_require__(9303);
          var toString = __webpack_require__(1340);
          var requireObjectCoercible = __webpack_require__(4488);

          var charAt = uncurryThis("".charAt);
          var charCodeAt = uncurryThis("".charCodeAt);
          var stringSlice = uncurryThis("".slice);

          var createMethod = function (CONVERT_TO_STRING) {
            return function ($this, pos) {
              var S = toString(requireObjectCoercible($this));
              var position = toIntegerOrInfinity(pos);
              var size = S.length;
              var first, second;
              if (position < 0 || position >= size)
                return CONVERT_TO_STRING ? "" : undefined;
              first = charCodeAt(S, position);
              return first < 0xd800 ||
                first > 0xdbff ||
                position + 1 === size ||
                (second = charCodeAt(S, position + 1)) < 0xdc00 ||
                second > 0xdfff
                ? CONVERT_TO_STRING
                  ? charAt(S, position)
                  : first
                : CONVERT_TO_STRING
                ? stringSlice(S, position, position + 2)
                : ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
            };
          };

          module.exports = {
            // `String.prototype.codePointAt` method
            // https://tc39.es/ecma262/#sec-string.prototype.codepointat
            codeAt: createMethod(false),
            // `String.prototype.at` method
            // https://github.com/mathiasbynens/String.prototype.at
            charAt: createMethod(true),
          };

          /***/
        },

        /***/ 6091: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var PROPER_FUNCTION_NAME = __webpack_require__(6530).PROPER;
          var fails = __webpack_require__(7293);
          var whitespaces = __webpack_require__(1361);

          var non = "\u200B\u0085\u180E";

          // check that a method works with the correct list
          // of whitespaces and has a correct name
          module.exports = function (METHOD_NAME) {
            return fails(function () {
              return (
                !!whitespaces[METHOD_NAME]() ||
                non[METHOD_NAME]() !== non ||
                (PROPER_FUNCTION_NAME &&
                  whitespaces[METHOD_NAME].name !== METHOD_NAME)
              );
            });
          };

          /***/
        },

        /***/ 3111: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var uncurryThis = __webpack_require__(1702);
          var requireObjectCoercible = __webpack_require__(4488);
          var toString = __webpack_require__(1340);
          var whitespaces = __webpack_require__(1361);

          var replace = uncurryThis("".replace);
          var ltrim = RegExp("^[" + whitespaces + "]+");
          var rtrim = RegExp(
            "(^|[^" + whitespaces + "])[" + whitespaces + "]+$"
          );

          // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
          var createMethod = function (TYPE) {
            return function ($this) {
              var string = toString(requireObjectCoercible($this));
              if (TYPE & 1) string = replace(string, ltrim, "");
              if (TYPE & 2) string = replace(string, rtrim, "$1");
              return string;
            };
          };

          module.exports = {
            // `String.prototype.{ trimLeft, trimStart }` methods
            // https://tc39.es/ecma262/#sec-string.prototype.trimstart
            start: createMethod(1),
            // `String.prototype.{ trimRight, trimEnd }` methods
            // https://tc39.es/ecma262/#sec-string.prototype.trimend
            end: createMethod(2),
            // `String.prototype.trim` method
            // https://tc39.es/ecma262/#sec-string.prototype.trim
            trim: createMethod(3),
          };

          /***/
        },

        /***/ 6293: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          /* eslint-disable es/no-symbol -- required for testing */
          var V8_VERSION = __webpack_require__(7392);
          var fails = __webpack_require__(7293);

          // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
          module.exports =
            !!Object.getOwnPropertySymbols &&
            !fails(function () {
              var symbol = Symbol();
              // Chrome 38 Symbol has incorrect toString conversion
              // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
              return (
                !String(symbol) ||
                !(Object(symbol) instanceof Symbol) ||
                // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
                (!Symbol.sham && V8_VERSION && V8_VERSION < 41)
              );
            });

          /***/
        },

        /***/ 863: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var uncurryThis = __webpack_require__(1702);

          // `thisNumberValue` abstract operation
          // https://tc39.es/ecma262/#sec-thisnumbervalue
          module.exports = uncurryThis((1.0).valueOf);

          /***/
        },

        /***/ 1400: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var toIntegerOrInfinity = __webpack_require__(9303);

          var max = Math.max;
          var min = Math.min;

          // Helper for a popular repeating case of the spec:
          // Let integer be ? ToInteger(index).
          // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
          module.exports = function (index, length) {
            var integer = toIntegerOrInfinity(index);
            return integer < 0
              ? max(integer + length, 0)
              : min(integer, length);
          };

          /***/
        },

        /***/ 5656: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          // toObject with fallback for non-array-like ES3 strings
          var IndexedObject = __webpack_require__(8361);
          var requireObjectCoercible = __webpack_require__(4488);

          module.exports = function (it) {
            return IndexedObject(requireObjectCoercible(it));
          };

          /***/
        },

        /***/ 9303: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var trunc = __webpack_require__(4758);

          // `ToIntegerOrInfinity` abstract operation
          // https://tc39.es/ecma262/#sec-tointegerorinfinity
          module.exports = function (argument) {
            var number = +argument;
            // eslint-disable-next-line no-self-compare -- NaN check
            return number !== number || number === 0 ? 0 : trunc(number);
          };

          /***/
        },

        /***/ 7466: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var toIntegerOrInfinity = __webpack_require__(9303);

          var min = Math.min;

          // `ToLength` abstract operation
          // https://tc39.es/ecma262/#sec-tolength
          module.exports = function (argument) {
            return argument > 0
              ? min(toIntegerOrInfinity(argument), 0x1fffffffffffff)
              : 0; // 2 ** 53 - 1 == 9007199254740991
          };

          /***/
        },

        /***/ 7908: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var requireObjectCoercible = __webpack_require__(4488);

          var $Object = Object;

          // `ToObject` abstract operation
          // https://tc39.es/ecma262/#sec-toobject
          module.exports = function (argument) {
            return $Object(requireObjectCoercible(argument));
          };

          /***/
        },

        /***/ 7593: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var call = __webpack_require__(6916);
          var isObject = __webpack_require__(111);
          var isSymbol = __webpack_require__(2190);
          var getMethod = __webpack_require__(8173);
          var ordinaryToPrimitive = __webpack_require__(2140);
          var wellKnownSymbol = __webpack_require__(5112);

          var $TypeError = TypeError;
          var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");

          // `ToPrimitive` abstract operation
          // https://tc39.es/ecma262/#sec-toprimitive
          module.exports = function (input, pref) {
            if (!isObject(input) || isSymbol(input)) return input;
            var exoticToPrim = getMethod(input, TO_PRIMITIVE);
            var result;
            if (exoticToPrim) {
              if (pref === undefined) pref = "default";
              result = call(exoticToPrim, input, pref);
              if (!isObject(result) || isSymbol(result)) return result;
              throw $TypeError("Can't convert object to primitive value");
            }
            if (pref === undefined) pref = "number";
            return ordinaryToPrimitive(input, pref);
          };

          /***/
        },

        /***/ 4948: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var toPrimitive = __webpack_require__(7593);
          var isSymbol = __webpack_require__(2190);

          // `ToPropertyKey` abstract operation
          // https://tc39.es/ecma262/#sec-topropertykey
          module.exports = function (argument) {
            var key = toPrimitive(argument, "string");
            return isSymbol(key) ? key : key + "";
          };

          /***/
        },

        /***/ 1694: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var wellKnownSymbol = __webpack_require__(5112);

          var TO_STRING_TAG = wellKnownSymbol("toStringTag");
          var test = {};

          test[TO_STRING_TAG] = "z";

          module.exports = String(test) === "[object z]";

          /***/
        },

        /***/ 1340: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var classof = __webpack_require__(648);

          var $String = String;

          module.exports = function (argument) {
            if (classof(argument) === "Symbol")
              throw TypeError("Cannot convert a Symbol value to a string");
            return $String(argument);
          };

          /***/
        },

        /***/ 6330: /***/ function (module) {
          var $String = String;

          module.exports = function (argument) {
            try {
              return $String(argument);
            } catch (error) {
              return "Object";
            }
          };

          /***/
        },

        /***/ 9711: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var uncurryThis = __webpack_require__(1702);

          var id = 0;
          var postfix = Math.random();
          var toString = uncurryThis((1.0).toString);

          module.exports = function (key) {
            return (
              "Symbol(" +
              (key === undefined ? "" : key) +
              ")_" +
              toString(++id + postfix, 36)
            );
          };

          /***/
        },

        /***/ 3307: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          /* eslint-disable es/no-symbol -- required for testing */
          var NATIVE_SYMBOL = __webpack_require__(6293);

          module.exports =
            NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";

          /***/
        },

        /***/ 3353: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var DESCRIPTORS = __webpack_require__(9781);
          var fails = __webpack_require__(7293);

          // V8 ~ Chrome 36-
          // https://bugs.chromium.org/p/v8/issues/detail?id=3334
          module.exports =
            DESCRIPTORS &&
            fails(function () {
              // eslint-disable-next-line es/no-object-defineproperty -- required for testing
              return (
                Object.defineProperty(
                  function () {
                    /* empty */
                  },
                  "prototype",
                  {
                    value: 42,
                    writable: false,
                  }
                ).prototype != 42
              );
            });

          /***/
        },

        /***/ 4811: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var global = __webpack_require__(7854);
          var isCallable = __webpack_require__(614);

          var WeakMap = global.WeakMap;

          module.exports =
            isCallable(WeakMap) && /native code/.test(String(WeakMap));

          /***/
        },

        /***/ 5112: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var global = __webpack_require__(7854);
          var shared = __webpack_require__(2309);
          var hasOwn = __webpack_require__(2597);
          var uid = __webpack_require__(9711);
          var NATIVE_SYMBOL = __webpack_require__(6293);
          var USE_SYMBOL_AS_UID = __webpack_require__(3307);

          var Symbol = global.Symbol;
          var WellKnownSymbolsStore = shared("wks");
          var createWellKnownSymbol = USE_SYMBOL_AS_UID
            ? Symbol["for"] || Symbol
            : (Symbol && Symbol.withoutSetter) || uid;

          module.exports = function (name) {
            if (!hasOwn(WellKnownSymbolsStore, name)) {
              WellKnownSymbolsStore[name] =
                NATIVE_SYMBOL && hasOwn(Symbol, name)
                  ? Symbol[name]
                  : createWellKnownSymbol("Symbol." + name);
            }
            return WellKnownSymbolsStore[name];
          };

          /***/
        },

        /***/ 1361: /***/ function (module) {
          // a string of all valid unicode whitespaces
          module.exports =
            "\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002" +
            "\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

          /***/
        },

        /***/ 2222: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var $ = __webpack_require__(2109);
          var fails = __webpack_require__(7293);
          var isArray = __webpack_require__(3157);
          var isObject = __webpack_require__(111);
          var toObject = __webpack_require__(7908);
          var lengthOfArrayLike = __webpack_require__(6244);
          var doesNotExceedSafeInteger = __webpack_require__(7207);
          var createProperty = __webpack_require__(6135);
          var arraySpeciesCreate = __webpack_require__(5417);
          var arrayMethodHasSpeciesSupport = __webpack_require__(1194);
          var wellKnownSymbol = __webpack_require__(5112);
          var V8_VERSION = __webpack_require__(7392);

          var IS_CONCAT_SPREADABLE = wellKnownSymbol("isConcatSpreadable");

          // We can't use this feature detection in V8 since it causes
          // deoptimization and serious performance degradation
          // https://github.com/zloirock/core-js/issues/679
          var IS_CONCAT_SPREADABLE_SUPPORT =
            V8_VERSION >= 51 ||
            !fails(function () {
              var array = [];
              array[IS_CONCAT_SPREADABLE] = false;
              return array.concat()[0] !== array;
            });

          var isConcatSpreadable = function (O) {
            if (!isObject(O)) return false;
            var spreadable = O[IS_CONCAT_SPREADABLE];
            return spreadable !== undefined ? !!spreadable : isArray(O);
          };

          var FORCED =
            !IS_CONCAT_SPREADABLE_SUPPORT ||
            !arrayMethodHasSpeciesSupport("concat");

          // `Array.prototype.concat` method
          // https://tc39.es/ecma262/#sec-array.prototype.concat
          // with adding support of @@isConcatSpreadable and @@species
          $(
            { target: "Array", proto: true, arity: 1, forced: FORCED },
            {
              // eslint-disable-next-line no-unused-vars -- required for `.length`
              concat: function concat(arg) {
                var O = toObject(this);
                var A = arraySpeciesCreate(O, 0);
                var n = 0;
                var i, k, length, len, E;
                for (i = -1, length = arguments.length; i < length; i++) {
                  E = i === -1 ? O : arguments[i];
                  if (isConcatSpreadable(E)) {
                    len = lengthOfArrayLike(E);
                    doesNotExceedSafeInteger(n + len);
                    for (k = 0; k < len; k++, n++)
                      if (k in E) createProperty(A, n, E[k]);
                  } else {
                    doesNotExceedSafeInteger(n + 1);
                    createProperty(A, n++, E);
                  }
                }
                A.length = n;
                return A;
              },
            }
          );

          /***/
        },

        /***/ 6541: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var $ = __webpack_require__(2109);
          var $every = __webpack_require__(2092).every;
          var arrayMethodIsStrict = __webpack_require__(9341);

          var STRICT_METHOD = arrayMethodIsStrict("every");

          // `Array.prototype.every` method
          // https://tc39.es/ecma262/#sec-array.prototype.every
          $(
            { target: "Array", proto: true, forced: !STRICT_METHOD },
            {
              every: function every(callbackfn /* , thisArg */) {
                return $every(
                  this,
                  callbackfn,
                  arguments.length > 1 ? arguments[1] : undefined
                );
              },
            }
          );

          /***/
        },

        /***/ 7327: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var $ = __webpack_require__(2109);
          var $filter = __webpack_require__(2092).filter;
          var arrayMethodHasSpeciesSupport = __webpack_require__(1194);

          var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("filter");

          // `Array.prototype.filter` method
          // https://tc39.es/ecma262/#sec-array.prototype.filter
          // with adding support of @@species
          $(
            { target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT },
            {
              filter: function filter(callbackfn /* , thisArg */) {
                return $filter(
                  this,
                  callbackfn,
                  arguments.length > 1 ? arguments[1] : undefined
                );
              },
            }
          );

          /***/
        },

        /***/ 4944: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var $ = __webpack_require__(2109);
          var flattenIntoArray = __webpack_require__(6790);
          var toObject = __webpack_require__(7908);
          var lengthOfArrayLike = __webpack_require__(6244);
          var toIntegerOrInfinity = __webpack_require__(9303);
          var arraySpeciesCreate = __webpack_require__(5417);

          // `Array.prototype.flat` method
          // https://tc39.es/ecma262/#sec-array.prototype.flat
          $(
            { target: "Array", proto: true },
            {
              flat: function flat(/* depthArg = 1 */) {
                var depthArg = arguments.length ? arguments[0] : undefined;
                var O = toObject(this);
                var sourceLen = lengthOfArrayLike(O);
                var A = arraySpeciesCreate(O, 0);
                A.length = flattenIntoArray(
                  A,
                  O,
                  O,
                  sourceLen,
                  0,
                  depthArg === undefined ? 1 : toIntegerOrInfinity(depthArg)
                );
                return A;
              },
            }
          );

          /***/
        },

        /***/ 9554: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var $ = __webpack_require__(2109);
          var forEach = __webpack_require__(8533);

          // `Array.prototype.forEach` method
          // https://tc39.es/ecma262/#sec-array.prototype.foreach
          // eslint-disable-next-line es/no-array-prototype-foreach -- safe
          $(
            { target: "Array", proto: true, forced: [].forEach != forEach },
            {
              forEach: forEach,
            }
          );

          /***/
        },

        /***/ 2772: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          /* eslint-disable es/no-array-prototype-indexof -- required for testing */
          var $ = __webpack_require__(2109);
          var uncurryThis = __webpack_require__(1470);
          var $indexOf = __webpack_require__(1318).indexOf;
          var arrayMethodIsStrict = __webpack_require__(9341);

          var nativeIndexOf = uncurryThis([].indexOf);

          var NEGATIVE_ZERO =
            !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
          var FORCED = NEGATIVE_ZERO || !arrayMethodIsStrict("indexOf");

          // `Array.prototype.indexOf` method
          // https://tc39.es/ecma262/#sec-array.prototype.indexof
          $(
            { target: "Array", proto: true, forced: FORCED },
            {
              indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
                var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
                return NEGATIVE_ZERO
                  ? // convert -0 to +0
                    nativeIndexOf(this, searchElement, fromIndex) || 0
                  : $indexOf(this, searchElement, fromIndex);
              },
            }
          );

          /***/
        },

        /***/ 9600: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var $ = __webpack_require__(2109);
          var uncurryThis = __webpack_require__(1702);
          var IndexedObject = __webpack_require__(8361);
          var toIndexedObject = __webpack_require__(5656);
          var arrayMethodIsStrict = __webpack_require__(9341);

          var nativeJoin = uncurryThis([].join);

          var ES3_STRINGS = IndexedObject != Object;
          var FORCED = ES3_STRINGS || !arrayMethodIsStrict("join", ",");

          // `Array.prototype.join` method
          // https://tc39.es/ecma262/#sec-array.prototype.join
          $(
            { target: "Array", proto: true, forced: FORCED },
            {
              join: function join(separator) {
                return nativeJoin(
                  toIndexedObject(this),
                  separator === undefined ? "," : separator
                );
              },
            }
          );

          /***/
        },

        /***/ 1249: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var $ = __webpack_require__(2109);
          var $map = __webpack_require__(2092).map;
          var arrayMethodHasSpeciesSupport = __webpack_require__(1194);

          var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("map");

          // `Array.prototype.map` method
          // https://tc39.es/ecma262/#sec-array.prototype.map
          // with adding support of @@species
          $(
            { target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT },
            {
              map: function map(callbackfn /* , thisArg */) {
                return $map(
                  this,
                  callbackfn,
                  arguments.length > 1 ? arguments[1] : undefined
                );
              },
            }
          );

          /***/
        },

        /***/ 7658: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var $ = __webpack_require__(2109);
          var toObject = __webpack_require__(7908);
          var lengthOfArrayLike = __webpack_require__(6244);
          var setArrayLength = __webpack_require__(3658);
          var doesNotExceedSafeInteger = __webpack_require__(7207);
          var fails = __webpack_require__(7293);

          var INCORRECT_TO_LENGTH = fails(function () {
            return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
          });

          // V8 and Safari <= 15.4, FF < 23 throws InternalError
          // https://bugs.chromium.org/p/v8/issues/detail?id=12681
          var properErrorOnNonWritableLength = function () {
            try {
              // eslint-disable-next-line es/no-object-defineproperty -- safe
              Object.defineProperty([], "length", { writable: false }).push();
            } catch (error) {
              return error instanceof TypeError;
            }
          };

          var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

          // `Array.prototype.push` method
          // https://tc39.es/ecma262/#sec-array.prototype.push
          $(
            { target: "Array", proto: true, arity: 1, forced: FORCED },
            {
              // eslint-disable-next-line no-unused-vars -- required for `.length`
              push: function push(item) {
                var O = toObject(this);
                var len = lengthOfArrayLike(O);
                var argCount = arguments.length;
                doesNotExceedSafeInteger(len + argCount);
                for (var i = 0; i < argCount; i++) {
                  O[len] = arguments[i];
                  len++;
                }
                setArrayLength(O, len);
                return len;
              },
            }
          );

          /***/
        },

        /***/ 5827: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var $ = __webpack_require__(2109);
          var $reduce = __webpack_require__(3671).left;
          var arrayMethodIsStrict = __webpack_require__(9341);
          var CHROME_VERSION = __webpack_require__(7392);
          var IS_NODE = __webpack_require__(5268);

          // Chrome 80-82 has a critical bug
          // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
          var CHROME_BUG =
            !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
          var FORCED = CHROME_BUG || !arrayMethodIsStrict("reduce");

          // `Array.prototype.reduce` method
          // https://tc39.es/ecma262/#sec-array.prototype.reduce
          $(
            { target: "Array", proto: true, forced: FORCED },
            {
              reduce: function reduce(callbackfn /* , initialValue */) {
                var length = arguments.length;
                return $reduce(
                  this,
                  callbackfn,
                  length,
                  length > 1 ? arguments[1] : undefined
                );
              },
            }
          );

          /***/
        },

        /***/ 7042: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var $ = __webpack_require__(2109);
          var isArray = __webpack_require__(3157);
          var isConstructor = __webpack_require__(4411);
          var isObject = __webpack_require__(111);
          var toAbsoluteIndex = __webpack_require__(1400);
          var lengthOfArrayLike = __webpack_require__(6244);
          var toIndexedObject = __webpack_require__(5656);
          var createProperty = __webpack_require__(6135);
          var wellKnownSymbol = __webpack_require__(5112);
          var arrayMethodHasSpeciesSupport = __webpack_require__(1194);
          var nativeSlice = __webpack_require__(206);

          var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("slice");

          var SPECIES = wellKnownSymbol("species");
          var $Array = Array;
          var max = Math.max;

          // `Array.prototype.slice` method
          // https://tc39.es/ecma262/#sec-array.prototype.slice
          // fallback for not array-like ES3 strings and DOM objects
          $(
            { target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT },
            {
              slice: function slice(start, end) {
                var O = toIndexedObject(this);
                var length = lengthOfArrayLike(O);
                var k = toAbsoluteIndex(start, length);
                var fin = toAbsoluteIndex(
                  end === undefined ? length : end,
                  length
                );
                // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
                var Constructor, result, n;
                if (isArray(O)) {
                  Constructor = O.constructor;
                  // cross-realm fallback
                  if (
                    isConstructor(Constructor) &&
                    (Constructor === $Array || isArray(Constructor.prototype))
                  ) {
                    Constructor = undefined;
                  } else if (isObject(Constructor)) {
                    Constructor = Constructor[SPECIES];
                    if (Constructor === null) Constructor = undefined;
                  }
                  if (Constructor === $Array || Constructor === undefined) {
                    return nativeSlice(O, k, fin);
                  }
                }
                result = new (Constructor === undefined ? $Array : Constructor)(
                  max(fin - k, 0)
                );
                for (n = 0; k < fin; k++, n++)
                  if (k in O) createProperty(result, n, O[k]);
                result.length = n;
                return result;
              },
            }
          );

          /***/
        },

        /***/ 5212: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var $ = __webpack_require__(2109);
          var $some = __webpack_require__(2092).some;
          var arrayMethodIsStrict = __webpack_require__(9341);

          var STRICT_METHOD = arrayMethodIsStrict("some");

          // `Array.prototype.some` method
          // https://tc39.es/ecma262/#sec-array.prototype.some
          $(
            { target: "Array", proto: true, forced: !STRICT_METHOD },
            {
              some: function some(callbackfn /* , thisArg */) {
                return $some(
                  this,
                  callbackfn,
                  arguments.length > 1 ? arguments[1] : undefined
                );
              },
            }
          );

          /***/
        },

        /***/ 2707: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var $ = __webpack_require__(2109);
          var uncurryThis = __webpack_require__(1702);
          var aCallable = __webpack_require__(9662);
          var toObject = __webpack_require__(7908);
          var lengthOfArrayLike = __webpack_require__(6244);
          var deletePropertyOrThrow = __webpack_require__(5117);
          var toString = __webpack_require__(1340);
          var fails = __webpack_require__(7293);
          var internalSort = __webpack_require__(4362);
          var arrayMethodIsStrict = __webpack_require__(9341);
          var FF = __webpack_require__(8886);
          var IE_OR_EDGE = __webpack_require__(256);
          var V8 = __webpack_require__(7392);
          var WEBKIT = __webpack_require__(8008);

          var test = [];
          var nativeSort = uncurryThis(test.sort);
          var push = uncurryThis(test.push);

          // IE8-
          var FAILS_ON_UNDEFINED = fails(function () {
            test.sort(undefined);
          });
          // V8 bug
          var FAILS_ON_NULL = fails(function () {
            test.sort(null);
          });
          // Old WebKit
          var STRICT_METHOD = arrayMethodIsStrict("sort");

          var STABLE_SORT = !fails(function () {
            // feature detection can be too slow, so check engines versions
            if (V8) return V8 < 70;
            if (FF && FF > 3) return;
            if (IE_OR_EDGE) return true;
            if (WEBKIT) return WEBKIT < 603;

            var result = "";
            var code, chr, value, index;

            // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
            for (code = 65; code < 76; code++) {
              chr = String.fromCharCode(code);

              switch (code) {
                case 66:
                case 69:
                case 70:
                case 72:
                  value = 3;
                  break;
                case 68:
                case 71:
                  value = 4;
                  break;
                default:
                  value = 2;
              }

              for (index = 0; index < 47; index++) {
                test.push({ k: chr + index, v: value });
              }
            }

            test.sort(function (a, b) {
              return b.v - a.v;
            });

            for (index = 0; index < test.length; index++) {
              chr = test[index].k.charAt(0);
              if (result.charAt(result.length - 1) !== chr) result += chr;
            }

            return result !== "DGBEFHACIJK";
          });

          var FORCED =
            FAILS_ON_UNDEFINED ||
            !FAILS_ON_NULL ||
            !STRICT_METHOD ||
            !STABLE_SORT;

          var getSortCompare = function (comparefn) {
            return function (x, y) {
              if (y === undefined) return -1;
              if (x === undefined) return 1;
              if (comparefn !== undefined) return +comparefn(x, y) || 0;
              return toString(x) > toString(y) ? 1 : -1;
            };
          };

          // `Array.prototype.sort` method
          // https://tc39.es/ecma262/#sec-array.prototype.sort
          $(
            { target: "Array", proto: true, forced: FORCED },
            {
              sort: function sort(comparefn) {
                if (comparefn !== undefined) aCallable(comparefn);

                var array = toObject(this);

                if (STABLE_SORT)
                  return comparefn === undefined
                    ? nativeSort(array)
                    : nativeSort(array, comparefn);

                var items = [];
                var arrayLength = lengthOfArrayLike(array);
                var itemsLength, index;

                for (index = 0; index < arrayLength; index++) {
                  if (index in array) push(items, array[index]);
                }

                internalSort(items, getSortCompare(comparefn));

                itemsLength = lengthOfArrayLike(items);
                index = 0;

                while (index < itemsLength) array[index] = items[index++];
                while (index < arrayLength)
                  deletePropertyOrThrow(array, index++);

                return array;
              },
            }
          );

          /***/
        },

        /***/ 561: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var $ = __webpack_require__(2109);
          var toObject = __webpack_require__(7908);
          var toAbsoluteIndex = __webpack_require__(1400);
          var toIntegerOrInfinity = __webpack_require__(9303);
          var lengthOfArrayLike = __webpack_require__(6244);
          var setArrayLength = __webpack_require__(3658);
          var doesNotExceedSafeInteger = __webpack_require__(7207);
          var arraySpeciesCreate = __webpack_require__(5417);
          var createProperty = __webpack_require__(6135);
          var deletePropertyOrThrow = __webpack_require__(5117);
          var arrayMethodHasSpeciesSupport = __webpack_require__(1194);

          var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("splice");

          var max = Math.max;
          var min = Math.min;

          // `Array.prototype.splice` method
          // https://tc39.es/ecma262/#sec-array.prototype.splice
          // with adding support of @@species
          $(
            { target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT },
            {
              splice: function splice(start, deleteCount /* , ...items */) {
                var O = toObject(this);
                var len = lengthOfArrayLike(O);
                var actualStart = toAbsoluteIndex(start, len);
                var argumentsLength = arguments.length;
                var insertCount, actualDeleteCount, A, k, from, to;
                if (argumentsLength === 0) {
                  insertCount = actualDeleteCount = 0;
                } else if (argumentsLength === 1) {
                  insertCount = 0;
                  actualDeleteCount = len - actualStart;
                } else {
                  insertCount = argumentsLength - 2;
                  actualDeleteCount = min(
                    max(toIntegerOrInfinity(deleteCount), 0),
                    len - actualStart
                  );
                }
                doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
                A = arraySpeciesCreate(O, actualDeleteCount);
                for (k = 0; k < actualDeleteCount; k++) {
                  from = actualStart + k;
                  if (from in O) createProperty(A, k, O[from]);
                }
                A.length = actualDeleteCount;
                if (insertCount < actualDeleteCount) {
                  for (k = actualStart; k < len - actualDeleteCount; k++) {
                    from = k + actualDeleteCount;
                    to = k + insertCount;
                    if (from in O) O[to] = O[from];
                    else deletePropertyOrThrow(O, to);
                  }
                  for (k = len; k > len - actualDeleteCount + insertCount; k--)
                    deletePropertyOrThrow(O, k - 1);
                } else if (insertCount > actualDeleteCount) {
                  for (k = len - actualDeleteCount; k > actualStart; k--) {
                    from = k + actualDeleteCount - 1;
                    to = k + insertCount - 1;
                    if (from in O) O[to] = O[from];
                    else deletePropertyOrThrow(O, to);
                  }
                }
                for (k = 0; k < insertCount; k++) {
                  O[k + actualStart] = arguments[k + 2];
                }
                setArrayLength(O, len - actualDeleteCount + insertCount);
                return A;
              },
            }
          );

          /***/
        },

        /***/ 3792: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          // this method was added to unscopables after implementation
          // in popular engines, so it's moved to a separate module
          var addToUnscopables = __webpack_require__(1223);

          // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
          addToUnscopables("flat");

          /***/
        },

        /***/ 8862: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var $ = __webpack_require__(2109);
          var getBuiltIn = __webpack_require__(5005);
          var apply = __webpack_require__(2104);
          var call = __webpack_require__(6916);
          var uncurryThis = __webpack_require__(1702);
          var fails = __webpack_require__(7293);
          var isCallable = __webpack_require__(614);
          var isSymbol = __webpack_require__(2190);
          var arraySlice = __webpack_require__(206);
          var getReplacerFunction = __webpack_require__(8044);
          var NATIVE_SYMBOL = __webpack_require__(6293);

          var $String = String;
          var $stringify = getBuiltIn("JSON", "stringify");
          var exec = uncurryThis(/./.exec);
          var charAt = uncurryThis("".charAt);
          var charCodeAt = uncurryThis("".charCodeAt);
          var replace = uncurryThis("".replace);
          var numberToString = uncurryThis((1.0).toString);

          var tester = /[\uD800-\uDFFF]/g;
          var low = /^[\uD800-\uDBFF]$/;
          var hi = /^[\uDC00-\uDFFF]$/;

          var WRONG_SYMBOLS_CONVERSION =
            !NATIVE_SYMBOL ||
            fails(function () {
              var symbol = getBuiltIn("Symbol")();
              // MS Edge converts symbol values to JSON as {}
              return (
                $stringify([symbol]) != "[null]" ||
                // WebKit converts symbol values to JSON as null
                $stringify({ a: symbol }) != "{}" ||
                // V8 throws on boxed symbols
                $stringify(Object(symbol)) != "{}"
              );
            });

          // https://github.com/tc39/proposal-well-formed-stringify
          var ILL_FORMED_UNICODE = fails(function () {
            return (
              $stringify("\uDF06\uD834") !== '"\\udf06\\ud834"' ||
              $stringify("\uDEAD") !== '"\\udead"'
            );
          });

          var stringifyWithSymbolsFix = function (it, replacer) {
            var args = arraySlice(arguments);
            var $replacer = getReplacerFunction(replacer);
            if (!isCallable($replacer) && (it === undefined || isSymbol(it)))
              return; // IE8 returns string on undefined
            args[1] = function (key, value) {
              // some old implementations (like WebKit) could pass numbers as keys
              if (isCallable($replacer))
                value = call($replacer, this, $String(key), value);
              if (!isSymbol(value)) return value;
            };
            return apply($stringify, null, args);
          };

          var fixIllFormed = function (match, offset, string) {
            var prev = charAt(string, offset - 1);
            var next = charAt(string, offset + 1);
            if (
              (exec(low, match) && !exec(hi, next)) ||
              (exec(hi, match) && !exec(low, prev))
            ) {
              return "\\u" + numberToString(charCodeAt(match, 0), 16);
            }
            return match;
          };

          if ($stringify) {
            // `JSON.stringify` method
            // https://tc39.es/ecma262/#sec-json.stringify
            $(
              {
                target: "JSON",
                stat: true,
                arity: 3,
                forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE,
              },
              {
                // eslint-disable-next-line no-unused-vars -- required for `.length`
                stringify: function stringify(it, replacer, space) {
                  var args = arraySlice(arguments);
                  var result = apply(
                    WRONG_SYMBOLS_CONVERSION
                      ? stringifyWithSymbolsFix
                      : $stringify,
                    null,
                    args
                  );
                  return ILL_FORMED_UNICODE && typeof result == "string"
                    ? replace(result, tester, fixIllFormed)
                    : result;
                },
              }
            );
          }

          /***/
        },

        /***/ 9653: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var $ = __webpack_require__(2109);
          var IS_PURE = __webpack_require__(1913);
          var DESCRIPTORS = __webpack_require__(9781);
          var global = __webpack_require__(7854);
          var path = __webpack_require__(857);
          var uncurryThis = __webpack_require__(1702);
          var isForced = __webpack_require__(4705);
          var hasOwn = __webpack_require__(2597);
          var inheritIfRequired = __webpack_require__(9587);
          var isPrototypeOf = __webpack_require__(7976);
          var isSymbol = __webpack_require__(2190);
          var toPrimitive = __webpack_require__(7593);
          var fails = __webpack_require__(7293);
          var getOwnPropertyNames = __webpack_require__(8006).f;
          var getOwnPropertyDescriptor = __webpack_require__(1236).f;
          var defineProperty = __webpack_require__(3070).f;
          var thisNumberValue = __webpack_require__(863);
          var trim = __webpack_require__(3111).trim;

          var NUMBER = "Number";
          var NativeNumber = global[NUMBER];
          var PureNumberNamespace = path[NUMBER];
          var NumberPrototype = NativeNumber.prototype;
          var TypeError = global.TypeError;
          var stringSlice = uncurryThis("".slice);
          var charCodeAt = uncurryThis("".charCodeAt);

          // `ToNumeric` abstract operation
          // https://tc39.es/ecma262/#sec-tonumeric
          var toNumeric = function (value) {
            var primValue = toPrimitive(value, "number");
            return typeof primValue == "bigint"
              ? primValue
              : toNumber(primValue);
          };

          // `ToNumber` abstract operation
          // https://tc39.es/ecma262/#sec-tonumber
          var toNumber = function (argument) {
            var it = toPrimitive(argument, "number");
            var first, third, radix, maxCode, digits, length, index, code;
            if (isSymbol(it))
              throw TypeError("Cannot convert a Symbol value to a number");
            if (typeof it == "string" && it.length > 2) {
              it = trim(it);
              first = charCodeAt(it, 0);
              if (first === 43 || first === 45) {
                third = charCodeAt(it, 2);
                if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
              } else if (first === 48) {
                switch (charCodeAt(it, 1)) {
                  case 66:
                  case 98:
                    radix = 2;
                    maxCode = 49;
                    break; // fast equal of /^0b[01]+$/i
                  case 79:
                  case 111:
                    radix = 8;
                    maxCode = 55;
                    break; // fast equal of /^0o[0-7]+$/i
                  default:
                    return +it;
                }
                digits = stringSlice(it, 2);
                length = digits.length;
                for (index = 0; index < length; index++) {
                  code = charCodeAt(digits, index);
                  // parseInt parses a string to a first unavailable symbol
                  // but ToNumber should return NaN if a string contains unavailable symbols
                  if (code < 48 || code > maxCode) return NaN;
                }
                return parseInt(digits, radix);
              }
            }
            return +it;
          };

          var FORCED = isForced(
            NUMBER,
            !NativeNumber(" 0o1") ||
              !NativeNumber("0b1") ||
              NativeNumber("+0x1")
          );

          var calledWithNew = function (dummy) {
            // includes check on 1..constructor(foo) case
            return (
              isPrototypeOf(NumberPrototype, dummy) &&
              fails(function () {
                thisNumberValue(dummy);
              })
            );
          };

          // `Number` constructor
          // https://tc39.es/ecma262/#sec-number-constructor
          var NumberWrapper = function Number(value) {
            var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
            return calledWithNew(this)
              ? inheritIfRequired(Object(n), this, NumberWrapper)
              : n;
          };

          NumberWrapper.prototype = NumberPrototype;
          if (FORCED && !IS_PURE) NumberPrototype.constructor = NumberWrapper;

          $(
            { global: true, constructor: true, wrap: true, forced: FORCED },
            {
              Number: NumberWrapper,
            }
          );

          // Use `internal/copy-constructor-properties` helper in `core-js@4`
          var copyConstructorProperties = function (target, source) {
            for (
              var keys = DESCRIPTORS
                  ? getOwnPropertyNames(source)
                  : // ES3:
                    (
                      "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY," +
                      // ES2015 (in case, if modules with ES2015 Number statics required before):
                      "EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt," +
                      // ESNext
                      "fromString,range"
                    ).split(","),
                j = 0,
                key;
              keys.length > j;
              j++
            ) {
              if (hasOwn(source, (key = keys[j])) && !hasOwn(target, key)) {
                defineProperty(
                  target,
                  key,
                  getOwnPropertyDescriptor(source, key)
                );
              }
            }
          };

          if (IS_PURE && PureNumberNamespace)
            copyConstructorProperties(path[NUMBER], PureNumberNamespace);
          if (FORCED || IS_PURE)
            copyConstructorProperties(path[NUMBER], NativeNumber);

          /***/
        },

        /***/ 489: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var $ = __webpack_require__(2109);
          var fails = __webpack_require__(7293);
          var toObject = __webpack_require__(7908);
          var nativeGetPrototypeOf = __webpack_require__(9518);
          var CORRECT_PROTOTYPE_GETTER = __webpack_require__(8544);

          var FAILS_ON_PRIMITIVES = fails(function () {
            nativeGetPrototypeOf(1);
          });

          // `Object.getPrototypeOf` method
          // https://tc39.es/ecma262/#sec-object.getprototypeof
          $(
            {
              target: "Object",
              stat: true,
              forced: FAILS_ON_PRIMITIVES,
              sham: !CORRECT_PROTOTYPE_GETTER,
            },
            {
              getPrototypeOf: function getPrototypeOf(it) {
                return nativeGetPrototypeOf(toObject(it));
              },
            }
          );

          /***/
        },

        /***/ 7941: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var $ = __webpack_require__(2109);
          var toObject = __webpack_require__(7908);
          var nativeKeys = __webpack_require__(1956);
          var fails = __webpack_require__(7293);

          var FAILS_ON_PRIMITIVES = fails(function () {
            nativeKeys(1);
          });

          // `Object.keys` method
          // https://tc39.es/ecma262/#sec-object.keys
          $(
            { target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES },
            {
              keys: function keys(it) {
                return nativeKeys(toObject(it));
              },
            }
          );

          /***/
        },

        /***/ 1539: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
          var defineBuiltIn = __webpack_require__(8052);
          var toString = __webpack_require__(288);

          // `Object.prototype.toString` method
          // https://tc39.es/ecma262/#sec-object.prototype.tostring
          if (!TO_STRING_TAG_SUPPORT) {
            defineBuiltIn(Object.prototype, "toString", toString, {
              unsafe: true,
            });
          }

          /***/
        },

        /***/ 4916: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var $ = __webpack_require__(2109);
          var exec = __webpack_require__(2261);

          // `RegExp.prototype.exec` method
          // https://tc39.es/ecma262/#sec-regexp.prototype.exec
          $(
            { target: "RegExp", proto: true, forced: /./.exec !== exec },
            {
              exec: exec,
            }
          );

          /***/
        },

        /***/ 7601: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          // TODO: Remove from `core-js@4` since it's moved to entry points
          __webpack_require__(4916);
          var $ = __webpack_require__(2109);
          var call = __webpack_require__(6916);
          var isCallable = __webpack_require__(614);
          var anObject = __webpack_require__(9670);
          var toString = __webpack_require__(1340);

          var DELEGATES_TO_EXEC = (function () {
            var execCalled = false;
            var re = /[ac]/;
            re.exec = function () {
              execCalled = true;
              return /./.exec.apply(this, arguments);
            };
            return re.test("abc") === true && execCalled;
          })();

          var nativeTest = /./.test;

          // `RegExp.prototype.test` method
          // https://tc39.es/ecma262/#sec-regexp.prototype.test
          $(
            { target: "RegExp", proto: true, forced: !DELEGATES_TO_EXEC },
            {
              test: function (S) {
                var R = anObject(this);
                var string = toString(S);
                var exec = R.exec;
                if (!isCallable(exec)) return call(nativeTest, R, string);
                var result = call(exec, R, string);
                if (result === null) return false;
                anObject(result);
                return true;
              },
            }
          );

          /***/
        },

        /***/ 5306: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var apply = __webpack_require__(2104);
          var call = __webpack_require__(6916);
          var uncurryThis = __webpack_require__(1702);
          var fixRegExpWellKnownSymbolLogic = __webpack_require__(7007);
          var fails = __webpack_require__(7293);
          var anObject = __webpack_require__(9670);
          var isCallable = __webpack_require__(614);
          var isNullOrUndefined = __webpack_require__(8554);
          var toIntegerOrInfinity = __webpack_require__(9303);
          var toLength = __webpack_require__(7466);
          var toString = __webpack_require__(1340);
          var requireObjectCoercible = __webpack_require__(4488);
          var advanceStringIndex = __webpack_require__(1530);
          var getMethod = __webpack_require__(8173);
          var getSubstitution = __webpack_require__(647);
          var regExpExec = __webpack_require__(7651);
          var wellKnownSymbol = __webpack_require__(5112);

          var REPLACE = wellKnownSymbol("replace");
          var max = Math.max;
          var min = Math.min;
          var concat = uncurryThis([].concat);
          var push = uncurryThis([].push);
          var stringIndexOf = uncurryThis("".indexOf);
          var stringSlice = uncurryThis("".slice);

          var maybeToString = function (it) {
            return it === undefined ? it : String(it);
          };

          // IE <= 11 replaces $0 with the whole match, as if it was $&
          // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
          var REPLACE_KEEPS_$0 = (function () {
            // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
            return "a".replace(/./, "$0") === "$0";
          })();

          // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
          var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
            if (/./[REPLACE]) {
              return /./[REPLACE]("a", "$0") === "";
            }
            return false;
          })();

          var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
            var re = /./;
            re.exec = function () {
              var result = [];
              result.groups = { a: "7" };
              return result;
            };
            // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
            return "".replace(re, "$<a>") !== "7";
          });

          // @@replace logic
          fixRegExpWellKnownSymbolLogic(
            "replace",
            function (_, nativeReplace, maybeCallNative) {
              var UNSAFE_SUBSTITUTE =
                REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";

              return [
                // `String.prototype.replace` method
                // https://tc39.es/ecma262/#sec-string.prototype.replace
                function replace(searchValue, replaceValue) {
                  var O = requireObjectCoercible(this);
                  var replacer = isNullOrUndefined(searchValue)
                    ? undefined
                    : getMethod(searchValue, REPLACE);
                  return replacer
                    ? call(replacer, searchValue, O, replaceValue)
                    : call(
                        nativeReplace,
                        toString(O),
                        searchValue,
                        replaceValue
                      );
                },
                // `RegExp.prototype[@@replace]` method
                // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
                function (string, replaceValue) {
                  var rx = anObject(this);
                  var S = toString(string);

                  if (
                    typeof replaceValue == "string" &&
                    stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
                    stringIndexOf(replaceValue, "$<") === -1
                  ) {
                    var res = maybeCallNative(
                      nativeReplace,
                      rx,
                      S,
                      replaceValue
                    );
                    if (res.done) return res.value;
                  }

                  var functionalReplace = isCallable(replaceValue);
                  if (!functionalReplace) replaceValue = toString(replaceValue);

                  var global = rx.global;
                  if (global) {
                    var fullUnicode = rx.unicode;
                    rx.lastIndex = 0;
                  }
                  var results = [];
                  while (true) {
                    var result = regExpExec(rx, S);
                    if (result === null) break;

                    push(results, result);
                    if (!global) break;

                    var matchStr = toString(result[0]);
                    if (matchStr === "")
                      rx.lastIndex = advanceStringIndex(
                        S,
                        toLength(rx.lastIndex),
                        fullUnicode
                      );
                  }

                  var accumulatedResult = "";
                  var nextSourcePosition = 0;
                  for (var i = 0; i < results.length; i++) {
                    result = results[i];

                    var matched = toString(result[0]);
                    var position = max(
                      min(toIntegerOrInfinity(result.index), S.length),
                      0
                    );
                    var captures = [];
                    // NOTE: This is equivalent to
                    //   captures = result.slice(1).map(maybeToString)
                    // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
                    // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
                    // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
                    for (var j = 1; j < result.length; j++)
                      push(captures, maybeToString(result[j]));
                    var namedCaptures = result.groups;
                    if (functionalReplace) {
                      var replacerArgs = concat(
                        [matched],
                        captures,
                        position,
                        S
                      );
                      if (namedCaptures !== undefined)
                        push(replacerArgs, namedCaptures);
                      var replacement = toString(
                        apply(replaceValue, undefined, replacerArgs)
                      );
                    } else {
                      replacement = getSubstitution(
                        matched,
                        S,
                        position,
                        captures,
                        namedCaptures,
                        replaceValue
                      );
                    }
                    if (position >= nextSourcePosition) {
                      accumulatedResult +=
                        stringSlice(S, nextSourcePosition, position) +
                        replacement;
                      nextSourcePosition = position + matched.length;
                    }
                  }
                  return accumulatedResult + stringSlice(S, nextSourcePosition);
                },
              ];
            },
            !REPLACE_SUPPORTS_NAMED_GROUPS ||
              !REPLACE_KEEPS_$0 ||
              REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
          );

          /***/
        },

        /***/ 3210: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          "use strict";

          var $ = __webpack_require__(2109);
          var $trim = __webpack_require__(3111).trim;
          var forcedStringTrimMethod = __webpack_require__(6091);

          // `String.prototype.trim` method
          // https://tc39.es/ecma262/#sec-string.prototype.trim
          $(
            {
              target: "String",
              proto: true,
              forced: forcedStringTrimMethod("trim"),
            },
            {
              trim: function trim() {
                return $trim(this);
              },
            }
          );

          /***/
        },

        /***/ 4747: /***/ function (
          __unused_webpack_module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var global = __webpack_require__(7854);
          var DOMIterables = __webpack_require__(8324);
          var DOMTokenListPrototype = __webpack_require__(8509);
          var forEach = __webpack_require__(8533);
          var createNonEnumerableProperty = __webpack_require__(8880);

          var handlePrototype = function (CollectionPrototype) {
            // some Chrome versions have non-configurable methods on DOMTokenList
            if (CollectionPrototype && CollectionPrototype.forEach !== forEach)
              try {
                createNonEnumerableProperty(
                  CollectionPrototype,
                  "forEach",
                  forEach
                );
              } catch (error) {
                CollectionPrototype.forEach = forEach;
              }
          };

          for (var COLLECTION_NAME in DOMIterables) {
            if (DOMIterables[COLLECTION_NAME]) {
              handlePrototype(
                global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype
              );
            }
          }

          handlePrototype(DOMTokenListPrototype);

          /***/
        },

        /***/ 4390: /***/ function (module) {
          "use strict";

          function fuzzysearch(needle, haystack) {
            var tlen = haystack.length;
            var qlen = needle.length;
            if (qlen > tlen) {
              return false;
            }
            if (qlen === tlen) {
              return needle === haystack;
            }
            outer: for (var i = 0, j = 0; i < qlen; i++) {
              var nch = needle.charCodeAt(i);
              while (j < tlen) {
                if (haystack.charCodeAt(j++) === nch) {
                  continue outer;
                }
              }
              return false;
            }
            return true;
          }

          module.exports = fuzzysearch;

          /***/
        },

        /***/ 2705: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var root = __webpack_require__(5639);

          /** Built-in value references. */
          var Symbol = root.Symbol;

          module.exports = Symbol;

          /***/
        },

        /***/ 4239: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var Symbol = __webpack_require__(2705),
            getRawTag = __webpack_require__(9607),
            objectToString = __webpack_require__(2333);

          /** `Object#toString` result references. */
          var nullTag = "[object Null]",
            undefinedTag = "[object Undefined]";

          /** Built-in value references. */
          var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

          /**
           * The base implementation of `getTag` without fallbacks for buggy environments.
           *
           * @private
           * @param {*} value The value to query.
           * @returns {string} Returns the `toStringTag`.
           */
          function baseGetTag(value) {
            if (value == null) {
              return value === undefined ? undefinedTag : nullTag;
            }
            return symToStringTag && symToStringTag in Object(value)
              ? getRawTag(value)
              : objectToString(value);
          }

          module.exports = baseGetTag;

          /***/
        },

        /***/ 7561: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var trimmedEndIndex = __webpack_require__(7990);

          /** Used to match leading whitespace. */
          var reTrimStart = /^\s+/;

          /**
           * The base implementation of `_.trim`.
           *
           * @private
           * @param {string} string The string to trim.
           * @returns {string} Returns the trimmed string.
           */
          function baseTrim(string) {
            return string
              ? string
                  .slice(0, trimmedEndIndex(string) + 1)
                  .replace(reTrimStart, "")
              : string;
          }

          module.exports = baseTrim;

          /***/
        },

        /***/ 1957: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          /** Detect free variable `global` from Node.js. */
          var freeGlobal =
            typeof __webpack_require__.g == "object" &&
            __webpack_require__.g &&
            __webpack_require__.g.Object === Object &&
            __webpack_require__.g;

          module.exports = freeGlobal;

          /***/
        },

        /***/ 9607: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var Symbol = __webpack_require__(2705);

          /** Used for built-in method references. */
          var objectProto = Object.prototype;

          /** Used to check objects for own properties. */
          var hasOwnProperty = objectProto.hasOwnProperty;

          /**
           * Used to resolve the
           * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
           * of values.
           */
          var nativeObjectToString = objectProto.toString;

          /** Built-in value references. */
          var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

          /**
           * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
           *
           * @private
           * @param {*} value The value to query.
           * @returns {string} Returns the raw `toStringTag`.
           */
          function getRawTag(value) {
            var isOwn = hasOwnProperty.call(value, symToStringTag),
              tag = value[symToStringTag];

            try {
              value[symToStringTag] = undefined;
              var unmasked = true;
            } catch (e) {}

            var result = nativeObjectToString.call(value);
            if (unmasked) {
              if (isOwn) {
                value[symToStringTag] = tag;
              } else {
                delete value[symToStringTag];
              }
            }
            return result;
          }

          module.exports = getRawTag;

          /***/
        },

        /***/ 2333: /***/ function (module) {
          /** Used for built-in method references. */
          var objectProto = Object.prototype;

          /**
           * Used to resolve the
           * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
           * of values.
           */
          var nativeObjectToString = objectProto.toString;

          /**
           * Converts `value` to a string using `Object.prototype.toString`.
           *
           * @private
           * @param {*} value The value to convert.
           * @returns {string} Returns the converted string.
           */
          function objectToString(value) {
            return nativeObjectToString.call(value);
          }

          module.exports = objectToString;

          /***/
        },

        /***/ 5639: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var freeGlobal = __webpack_require__(1957);

          /** Detect free variable `self`. */
          var freeSelf =
            typeof self == "object" && self && self.Object === Object && self;

          /** Used as a reference to the global object. */
          var root = freeGlobal || freeSelf || Function("return this")();

          module.exports = root;

          /***/
        },

        /***/ 7990: /***/ function (module) {
          /** Used to match a single whitespace character. */
          var reWhitespace = /\s/;

          /**
           * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
           * character of `string`.
           *
           * @private
           * @param {string} string The string to inspect.
           * @returns {number} Returns the index of the last non-whitespace character.
           */
          function trimmedEndIndex(string) {
            var index = string.length;

            while (index-- && reWhitespace.test(string.charAt(index))) {}
            return index;
          }

          module.exports = trimmedEndIndex;

          /***/
        },

        /***/ 9567: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var toInteger = __webpack_require__(554);

          /** Error message constants. */
          var FUNC_ERROR_TEXT = "Expected a function";

          /**
           * Creates a function that invokes `func`, with the `this` binding and arguments
           * of the created function, while it's called less than `n` times. Subsequent
           * calls to the created function return the result of the last `func` invocation.
           *
           * @static
           * @memberOf _
           * @since 3.0.0
           * @category Function
           * @param {number} n The number of calls at which `func` is no longer invoked.
           * @param {Function} func The function to restrict.
           * @returns {Function} Returns the new restricted function.
           * @example
           *
           * jQuery(element).on('click', _.before(5, addContactToList));
           * // => Allows adding up to 4 contacts to the list.
           */
          function before(n, func) {
            var result;
            if (typeof func != "function") {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function () {
              if (--n > 0) {
                result = func.apply(this, arguments);
              }
              if (n <= 1) {
                func = undefined;
              }
              return result;
            };
          }

          module.exports = before;

          /***/
        },

        /***/ 5703: /***/ function (module) {
          /**
           * Creates a function that returns `value`.
           *
           * @static
           * @memberOf _
           * @since 2.4.0
           * @category Util
           * @param {*} value The value to return from the new function.
           * @returns {Function} Returns the new constant function.
           * @example
           *
           * var objects = _.times(2, _.constant({ 'a': 1 }));
           *
           * console.log(objects);
           * // => [{ 'a': 1 }, { 'a': 1 }]
           *
           * console.log(objects[0] === objects[1]);
           * // => true
           */
          function constant(value) {
            return function () {
              return value;
            };
          }

          module.exports = constant;

          /***/
        },

        /***/ 3279: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var isObject = __webpack_require__(3218),
            now = __webpack_require__(7771),
            toNumber = __webpack_require__(4841);

          /** Error message constants. */
          var FUNC_ERROR_TEXT = "Expected a function";

          /* Built-in method references for those with the same name as other `lodash` methods. */
          var nativeMax = Math.max,
            nativeMin = Math.min;

          /**
           * Creates a debounced function that delays invoking `func` until after `wait`
           * milliseconds have elapsed since the last time the debounced function was
           * invoked. The debounced function comes with a `cancel` method to cancel
           * delayed `func` invocations and a `flush` method to immediately invoke them.
           * Provide `options` to indicate whether `func` should be invoked on the
           * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
           * with the last arguments provided to the debounced function. Subsequent
           * calls to the debounced function return the result of the last `func`
           * invocation.
           *
           * **Note:** If `leading` and `trailing` options are `true`, `func` is
           * invoked on the trailing edge of the timeout only if the debounced function
           * is invoked more than once during the `wait` timeout.
           *
           * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
           * until to the next tick, similar to `setTimeout` with a timeout of `0`.
           *
           * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
           * for details over the differences between `_.debounce` and `_.throttle`.
           *
           * @static
           * @memberOf _
           * @since 0.1.0
           * @category Function
           * @param {Function} func The function to debounce.
           * @param {number} [wait=0] The number of milliseconds to delay.
           * @param {Object} [options={}] The options object.
           * @param {boolean} [options.leading=false]
           *  Specify invoking on the leading edge of the timeout.
           * @param {number} [options.maxWait]
           *  The maximum time `func` is allowed to be delayed before it's invoked.
           * @param {boolean} [options.trailing=true]
           *  Specify invoking on the trailing edge of the timeout.
           * @returns {Function} Returns the new debounced function.
           * @example
           *
           * // Avoid costly calculations while the window size is in flux.
           * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
           *
           * // Invoke `sendMail` when clicked, debouncing subsequent calls.
           * jQuery(element).on('click', _.debounce(sendMail, 300, {
           *   'leading': true,
           *   'trailing': false
           * }));
           *
           * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
           * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
           * var source = new EventSource('/stream');
           * jQuery(source).on('message', debounced);
           *
           * // Cancel the trailing debounced invocation.
           * jQuery(window).on('popstate', debounced.cancel);
           */
          function debounce(func, wait, options) {
            var lastArgs,
              lastThis,
              maxWait,
              result,
              timerId,
              lastCallTime,
              lastInvokeTime = 0,
              leading = false,
              maxing = false,
              trailing = true;

            if (typeof func != "function") {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
            wait = toNumber(wait) || 0;
            if (isObject(options)) {
              leading = !!options.leading;
              maxing = "maxWait" in options;
              maxWait = maxing
                ? nativeMax(toNumber(options.maxWait) || 0, wait)
                : maxWait;
              trailing = "trailing" in options ? !!options.trailing : trailing;
            }

            function invokeFunc(time) {
              var args = lastArgs,
                thisArg = lastThis;

              lastArgs = lastThis = undefined;
              lastInvokeTime = time;
              result = func.apply(thisArg, args);
              return result;
            }

            function leadingEdge(time) {
              // Reset any `maxWait` timer.
              lastInvokeTime = time;
              // Start the timer for the trailing edge.
              timerId = setTimeout(timerExpired, wait);
              // Invoke the leading edge.
              return leading ? invokeFunc(time) : result;
            }

            function remainingWait(time) {
              var timeSinceLastCall = time - lastCallTime,
                timeSinceLastInvoke = time - lastInvokeTime,
                timeWaiting = wait - timeSinceLastCall;

              return maxing
                ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
                : timeWaiting;
            }

            function shouldInvoke(time) {
              var timeSinceLastCall = time - lastCallTime,
                timeSinceLastInvoke = time - lastInvokeTime;

              // Either this is the first call, activity has stopped and we're at the
              // trailing edge, the system time has gone backwards and we're treating
              // it as the trailing edge, or we've hit the `maxWait` limit.
              return (
                lastCallTime === undefined ||
                timeSinceLastCall >= wait ||
                timeSinceLastCall < 0 ||
                (maxing && timeSinceLastInvoke >= maxWait)
              );
            }

            function timerExpired() {
              var time = now();
              if (shouldInvoke(time)) {
                return trailingEdge(time);
              }
              // Restart the timer.
              timerId = setTimeout(timerExpired, remainingWait(time));
            }

            function trailingEdge(time) {
              timerId = undefined;

              // Only invoke if we have `lastArgs` which means `func` has been
              // debounced at least once.
              if (trailing && lastArgs) {
                return invokeFunc(time);
              }
              lastArgs = lastThis = undefined;
              return result;
            }

            function cancel() {
              if (timerId !== undefined) {
                clearTimeout(timerId);
              }
              lastInvokeTime = 0;
              lastArgs = lastCallTime = lastThis = timerId = undefined;
            }

            function flush() {
              return timerId === undefined ? result : trailingEdge(now());
            }

            function debounced() {
              var time = now(),
                isInvoking = shouldInvoke(time);

              lastArgs = arguments;
              lastThis = this;
              lastCallTime = time;

              if (isInvoking) {
                if (timerId === undefined) {
                  return leadingEdge(lastCallTime);
                }
                if (maxing) {
                  // Handle invocations in a tight loop.
                  clearTimeout(timerId);
                  timerId = setTimeout(timerExpired, wait);
                  return invokeFunc(lastCallTime);
                }
              }
              if (timerId === undefined) {
                timerId = setTimeout(timerExpired, wait);
              }
              return result;
            }
            debounced.cancel = cancel;
            debounced.flush = flush;
            return debounced;
          }

          module.exports = debounce;

          /***/
        },

        /***/ 6557: /***/ function (module) {
          /**
           * This method returns the first argument it receives.
           *
           * @static
           * @since 0.1.0
           * @memberOf _
           * @category Util
           * @param {*} value Any value.
           * @returns {*} Returns `value`.
           * @example
           *
           * var object = { 'a': 1 };
           *
           * console.log(_.identity(object) === object);
           * // => true
           */
          function identity(value) {
            return value;
          }

          module.exports = identity;

          /***/
        },

        /***/ 3218: /***/ function (module) {
          /**
           * Checks if `value` is the
           * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
           * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
           *
           * @static
           * @memberOf _
           * @since 0.1.0
           * @category Lang
           * @param {*} value The value to check.
           * @returns {boolean} Returns `true` if `value` is an object, else `false`.
           * @example
           *
           * _.isObject({});
           * // => true
           *
           * _.isObject([1, 2, 3]);
           * // => true
           *
           * _.isObject(_.noop);
           * // => true
           *
           * _.isObject(null);
           * // => false
           */
          function isObject(value) {
            var type = typeof value;
            return value != null && (type == "object" || type == "function");
          }

          module.exports = isObject;

          /***/
        },

        /***/ 7005: /***/ function (module) {
          /**
           * Checks if `value` is object-like. A value is object-like if it's not `null`
           * and has a `typeof` result of "object".
           *
           * @static
           * @memberOf _
           * @since 4.0.0
           * @category Lang
           * @param {*} value The value to check.
           * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
           * @example
           *
           * _.isObjectLike({});
           * // => true
           *
           * _.isObjectLike([1, 2, 3]);
           * // => true
           *
           * _.isObjectLike(_.noop);
           * // => false
           *
           * _.isObjectLike(null);
           * // => false
           */
          function isObjectLike(value) {
            return value != null && typeof value == "object";
          }

          module.exports = isObjectLike;

          /***/
        },

        /***/ 3448: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var baseGetTag = __webpack_require__(4239),
            isObjectLike = __webpack_require__(7005);

          /** `Object#toString` result references. */
          var symbolTag = "[object Symbol]";

          /**
           * Checks if `value` is classified as a `Symbol` primitive or object.
           *
           * @static
           * @memberOf _
           * @since 4.0.0
           * @category Lang
           * @param {*} value The value to check.
           * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
           * @example
           *
           * _.isSymbol(Symbol.iterator);
           * // => true
           *
           * _.isSymbol('abc');
           * // => false
           */
          function isSymbol(value) {
            return (
              typeof value == "symbol" ||
              (isObjectLike(value) && baseGetTag(value) == symbolTag)
            );
          }

          module.exports = isSymbol;

          /***/
        },

        /***/ 928: /***/ function (module) {
          /**
           * Gets the last element of `array`.
           *
           * @static
           * @memberOf _
           * @since 0.1.0
           * @category Array
           * @param {Array} array The array to query.
           * @returns {*} Returns the last element of `array`.
           * @example
           *
           * _.last([1, 2, 3]);
           * // => 3
           */
          function last(array) {
            var length = array == null ? 0 : array.length;
            return length ? array[length - 1] : undefined;
          }

          module.exports = last;

          /***/
        },

        /***/ 308: /***/ function (module) {
          /**
           * This method returns `undefined`.
           *
           * @static
           * @memberOf _
           * @since 2.3.0
           * @category Util
           * @example
           *
           * _.times(2, _.noop);
           * // => [undefined, undefined]
           */
          function noop() {
            // No operation performed.
          }

          module.exports = noop;

          /***/
        },

        /***/ 7771: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var root = __webpack_require__(5639);

          /**
           * Gets the timestamp of the number of milliseconds that have elapsed since
           * the Unix epoch (1 January 1970 00:00:00 UTC).
           *
           * @static
           * @memberOf _
           * @since 2.4.0
           * @category Date
           * @returns {number} Returns the timestamp.
           * @example
           *
           * _.defer(function(stamp) {
           *   console.log(_.now() - stamp);
           * }, _.now());
           * // => Logs the number of milliseconds it took for the deferred invocation.
           */
          var now = function () {
            return root.Date.now();
          };

          module.exports = now;

          /***/
        },

        /***/ 1463: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var before = __webpack_require__(9567);

          /**
           * Creates a function that is restricted to invoking `func` once. Repeat calls
           * to the function return the value of the first invocation. The `func` is
           * invoked with the `this` binding and arguments of the created function.
           *
           * @static
           * @memberOf _
           * @since 0.1.0
           * @category Function
           * @param {Function} func The function to restrict.
           * @returns {Function} Returns the new restricted function.
           * @example
           *
           * var initialize = _.once(createApplication);
           * initialize();
           * initialize();
           * // => `createApplication` is invoked once
           */
          function once(func) {
            return before(2, func);
          }

          module.exports = once;

          /***/
        },

        /***/ 8601: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var toNumber = __webpack_require__(4841);

          /** Used as references for various `Number` constants. */
          var INFINITY = 1 / 0,
            MAX_INTEGER = 1.7976931348623157e308;

          /**
           * Converts `value` to a finite number.
           *
           * @static
           * @memberOf _
           * @since 4.12.0
           * @category Lang
           * @param {*} value The value to convert.
           * @returns {number} Returns the converted number.
           * @example
           *
           * _.toFinite(3.2);
           * // => 3.2
           *
           * _.toFinite(Number.MIN_VALUE);
           * // => 5e-324
           *
           * _.toFinite(Infinity);
           * // => 1.7976931348623157e+308
           *
           * _.toFinite('3.2');
           * // => 3.2
           */
          function toFinite(value) {
            if (!value) {
              return value === 0 ? value : 0;
            }
            value = toNumber(value);
            if (value === INFINITY || value === -INFINITY) {
              var sign = value < 0 ? -1 : 1;
              return sign * MAX_INTEGER;
            }
            return value === value ? value : 0;
          }

          module.exports = toFinite;

          /***/
        },

        /***/ 554: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var toFinite = __webpack_require__(8601);

          /**
           * Converts `value` to an integer.
           *
           * **Note:** This method is loosely based on
           * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
           *
           * @static
           * @memberOf _
           * @since 4.0.0
           * @category Lang
           * @param {*} value The value to convert.
           * @returns {number} Returns the converted integer.
           * @example
           *
           * _.toInteger(3.2);
           * // => 3
           *
           * _.toInteger(Number.MIN_VALUE);
           * // => 0
           *
           * _.toInteger(Infinity);
           * // => 1.7976931348623157e+308
           *
           * _.toInteger('3.2');
           * // => 3
           */
          function toInteger(value) {
            var result = toFinite(value),
              remainder = result % 1;

            return result === result
              ? remainder
                ? result - remainder
                : result
              : 0;
          }

          module.exports = toInteger;

          /***/
        },

        /***/ 4841: /***/ function (
          module,
          __unused_webpack_exports,
          __webpack_require__
        ) {
          var baseTrim = __webpack_require__(7561),
            isObject = __webpack_require__(3218),
            isSymbol = __webpack_require__(3448);

          /** Used as references for various `Number` constants. */
          var NAN = 0 / 0;

          /** Used to detect bad signed hexadecimal string values. */
          var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

          /** Used to detect binary string values. */
          var reIsBinary = /^0b[01]+$/i;

          /** Used to detect octal string values. */
          var reIsOctal = /^0o[0-7]+$/i;

          /** Built-in method references without a dependency on `root`. */
          var freeParseInt = parseInt;

          /**
           * Converts `value` to a number.
           *
           * @static
           * @memberOf _
           * @since 4.0.0
           * @category Lang
           * @param {*} value The value to process.
           * @returns {number} Returns the number.
           * @example
           *
           * _.toNumber(3.2);
           * // => 3.2
           *
           * _.toNumber(Number.MIN_VALUE);
           * // => 5e-324
           *
           * _.toNumber(Infinity);
           * // => Infinity
           *
           * _.toNumber('3.2');
           * // => 3.2
           */
          function toNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            if (isObject(value)) {
              var other =
                typeof value.valueOf == "function" ? value.valueOf() : value;
              value = isObject(other) ? other + "" : other;
            }
            if (typeof value != "string") {
              return value === 0 ? value : +value;
            }
            value = baseTrim(value);
            var isBinary = reIsBinary.test(value);
            return isBinary || reIsOctal.test(value)
              ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
              : reIsBadHex.test(value)
              ? NAN
              : +value;
          }

          module.exports = toNumber;

          /***/
        },

        /***/ 3744: /***/ function (__unused_webpack_module, exports) {
          "use strict";
          var __webpack_unused_export__;

          __webpack_unused_export__ = { value: true };
          // runtime helper for setting properties on components
          // in a tree-shakable way
          exports.Z = (sfc, props) => {
            const target = sfc.__vccOpts || sfc;
            for (const [key, val] of props) {
              target[key] = val;
            }
            return target;
          };

          /***/
        },

        /***/ 7203: /***/ function (module) {
          "use strict";
          module.exports = __WEBPACK_EXTERNAL_MODULE__7203__;

          /***/
        },

        /******/
      };
      /************************************************************************/
      /******/ // The module cache
      /******/ var __webpack_module_cache__ = {};
      /******/
      /******/ // The require function
      /******/ function __webpack_require__(moduleId) {
        /******/ // Check if module is in cache
        /******/ var cachedModule = __webpack_module_cache__[moduleId];
        /******/ if (cachedModule !== undefined) {
          /******/ return cachedModule.exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = (__webpack_module_cache__[moduleId] = {
          /******/ // no module.id needed
          /******/ // no module.loaded needed
          /******/ exports: {},
          /******/
        });
        /******/
        /******/ // Execute the module function
        /******/ __webpack_modules__[moduleId](
          module,
          module.exports,
          __webpack_require__
        );
        /******/
        /******/ // Return the exports of the module
        /******/ return module.exports;
        /******/
      }
      /******/
      /************************************************************************/
      /******/ /* webpack/runtime/compat get default export */
      /******/ !(function () {
        /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/ __webpack_require__.n = function (module) {
          /******/ var getter =
            module && module.__esModule
              ? /******/ function () {
                  return module["default"];
                }
              : /******/ function () {
                  return module;
                };
          /******/ __webpack_require__.d(getter, { a: getter });
          /******/ return getter;
          /******/
        };
        /******/
      })();
      /******/
      /******/ /* webpack/runtime/define property getters */
      /******/ !(function () {
        /******/ // define getter functions for harmony exports
        /******/ __webpack_require__.d = function (exports, definition) {
          /******/ for (var key in definition) {
            /******/ if (
              __webpack_require__.o(definition, key) &&
              !__webpack_require__.o(exports, key)
            ) {
              /******/ Object.defineProperty(exports, key, {
                enumerable: true,
                get: definition[key],
              });
              /******/
            }
            /******/
          }
          /******/
        };
        /******/
      })();
      /******/
      /******/ /* webpack/runtime/global */
      /******/ !(function () {
        /******/ __webpack_require__.g = (function () {
          /******/ if (typeof globalThis === "object") return globalThis;
          /******/ try {
            /******/ return this || new Function("return this")();
            /******/
          } catch (e) {
            /******/ if (typeof window === "object") return window;
            /******/
          }
          /******/
        })();
        /******/
      })();
      /******/
      /******/ /* webpack/runtime/hasOwnProperty shorthand */
      /******/ !(function () {
        /******/ __webpack_require__.o = function (obj, prop) {
          return Object.prototype.hasOwnProperty.call(obj, prop);
        };
        /******/
      })();
      /******/
      /******/ /* webpack/runtime/make namespace object */
      /******/ !(function () {
        /******/ // define __esModule on exports
        /******/ __webpack_require__.r = function (exports) {
          /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            /******/ Object.defineProperty(exports, Symbol.toStringTag, {
              value: "Module",
            });
            /******/
          }
          /******/ Object.defineProperty(exports, "__esModule", {
            value: true,
          });
          /******/
        };
        /******/
      })();
      /******/
      /******/ /* webpack/runtime/publicPath */
      /******/ !(function () {
        /******/ __webpack_require__.p = "";
        /******/
      })();
      /******/
      /************************************************************************/
      var __webpack_exports__ = {};
      // This entry need to be wrapped in an IIFE because it need to be in strict mode.
      !(function () {
        "use strict";
        // ESM COMPAT FLAG
        __webpack_require__.r(__webpack_exports__);

        // EXPORTS
        __webpack_require__.d(__webpack_exports__, {
          ASYNC_SEARCH: function () {
            return /* reexport */ ASYNC_SEARCH;
          },
          LOAD_CHILDREN_OPTIONS: function () {
            return /* reexport */ LOAD_CHILDREN_OPTIONS;
          },
          LOAD_ROOT_OPTIONS: function () {
            return /* reexport */ LOAD_ROOT_OPTIONS;
          },
          Treeselect: function () {
            return /* reexport */ Treeselect;
          },
          default: function () {
            return /* binding */ entry_lib;
          },
          treeselectMixin: function () {
            return /* reexport */ treeselectMixin;
          },
        }); // CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js

        /* eslint-disable no-var */
        // This file is imported into lib/wc client bundles.

        if (typeof window !== "undefined") {
          var currentScript = window.document.currentScript;
          if (false) {
            var getCurrentScript;
          }

          var src =
            currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
          if (src) {
            __webpack_require__.p = src[1]; // eslint-disable-line
          }
        }

        // Indicate to webpack that this file can be concatenated
        /* harmony default export */ var setPublicPath = null;

        // EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
        var external_commonjs_vue_commonjs2_vue_root_Vue_ =
          __webpack_require__(7203); // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-85.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Treeselect.vue?vue&type=template&id=4fa337e8
        function render(_ctx, _cache, $props, $setup, $data, $options) {
          var _component_HiddenFields = (0,
          external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)(
            "HiddenFields"
          );
          var _component_Control = (0,
          external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)(
            "Control"
          );
          var _component_MenuPortal = (0,
          external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)(
            "MenuPortal"
          );
          var _component_Menu = (0,
          external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)(
            "Menu"
          );
          return (
            (0, external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(),
            (0,
            external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(
              "div",
              {
                ref: "wrapper",
                class: (0,
                external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(
                  _ctx.wrapperClass
                ),
              },
              [
                (0, external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                  _component_HiddenFields
                ),
                (0, external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                  _component_Control,
                  {
                    ref: "control",
                  },
                  null,
                  512
                ),
                _ctx.appendToBody
                  ? ((0,
                    external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(),
                    (0,
                    external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)(
                      _component_MenuPortal,
                      {
                        key: 0,
                        ref: "portal",
                      },
                      null,
                      512
                    ))
                  : ((0,
                    external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(),
                    (0,
                    external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)(
                      _component_Menu,
                      {
                        key: 1,
                        ref: "menu",
                      },
                      null,
                      512
                    )),
              ],
              2
            )
          );
        } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr;
        } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
        function _iterableToArrayLimit(arr, i) {
          var _i =
            null == arr
              ? null
              : ("undefined" != typeof Symbol && arr[Symbol.iterator]) ||
                arr["@@iterator"];
          if (null != _i) {
            var _s,
              _e,
              _x,
              _r,
              _arr = [],
              _n = !0,
              _d = !1;
            try {
              if (((_x = (_i = _i.call(arr)).next), 0 === i)) {
                if (Object(_i) !== _i) return;
                _n = !1;
              } else
                for (
                  ;
                  !(_n = (_s = _x.call(_i)).done) &&
                  (_arr.push(_s.value), _arr.length !== i);
                  _n = !0
                );
            } catch (err) {
              (_d = !0), (_e = err);
            } finally {
              try {
                if (
                  !_n &&
                  null != _i["return"] &&
                  ((_r = _i["return"]()), Object(_r) !== _r)
                )
                  return;
              } finally {
                if (_d) throw _e;
              }
            }
            return _arr;
          }
        } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;
          for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
          return arr2;
        } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === "string") return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor) n = o.constructor.name;
          if (n === "Map" || n === "Set") return Array.from(o);
          if (
            n === "Arguments" ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return _arrayLikeToArray(o, minLen);
        } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
        function _nonIterableRest() {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js
        function _slicedToArray(arr, i) {
          return (
            _arrayWithHoles(arr) ||
            _iterableToArrayLimit(arr, i) ||
            _unsupportedIterableToArray(arr, i) ||
            _nonIterableRest()
          );
        } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
        function _typeof(obj) {
          "@babel/helpers - typeof";

          return (
            (_typeof =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (obj) {
                    return typeof obj;
                  }
                : function (obj) {
                    return obj &&
                      "function" == typeof Symbol &&
                      obj.constructor === Symbol &&
                      obj !== Symbol.prototype
                      ? "symbol"
                      : typeof obj;
                  }),
            _typeof(obj)
          );
        } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js
        function _toPrimitive(input, hint) {
          if (_typeof(input) !== "object" || input === null) return input;
          var prim = input[Symbol.toPrimitive];
          if (prim !== undefined) {
            var res = prim.call(input, hint || "default");
            if (_typeof(res) !== "object") return res;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (hint === "string" ? String : Number)(input);
        } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
        function _toPropertyKey(arg) {
          var key = _toPrimitive(arg, "string");
          return _typeof(key) === "symbol" ? key : String(key);
        } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
        function _defineProperty(obj, key, value) {
          key = _toPropertyKey(key);
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true,
            });
          } else {
            obj[key] = value;
          }
          return obj;
        } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr)) return _arrayLikeToArray(arr);
        } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
        function _iterableToArray(iter) {
          if (
            (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
            iter["@@iterator"] != null
          )
            return Array.from(iter);
        } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
        function _nonIterableSpread() {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
        function _toConsumableArray(arr) {
          return (
            _arrayWithoutHoles(arr) ||
            _iterableToArray(arr) ||
            _unsupportedIterableToArray(arr) ||
            _nonIterableSpread()
          );
        } // CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            enumerableOnly &&
              (symbols = symbols.filter(function (sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
              })),
              keys.push.apply(keys, symbols);
          }
          return keys;
        }
        function _objectSpread2(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = null != arguments[i] ? arguments[i] : {};
            i % 2
              ? ownKeys(Object(source), !0).forEach(function (key) {
                  _defineProperty(target, key, source[key]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(
                  target,
                  Object.getOwnPropertyDescriptors(source)
                )
              : ownKeys(Object(source)).forEach(function (key) {
                  Object.defineProperty(
                    target,
                    key,
                    Object.getOwnPropertyDescriptor(source, key)
                  );
                });
          }
          return target;
        }
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
        var es_number_constructor = __webpack_require__(9653);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
        var es_array_map = __webpack_require__(1249);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.flat.js
        var es_array_flat = __webpack_require__(4944);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.unscopables.flat.js
        var es_array_unscopables_flat = __webpack_require__(3792);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
        var es_array_slice = __webpack_require__(7042);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
        var es_array_filter = __webpack_require__(7327);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
        var es_object_to_string = __webpack_require__(1539);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
        var es_array_for_each = __webpack_require__(9554);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
        var web_dom_collections_for_each = __webpack_require__(4747);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
        var es_array_push = __webpack_require__(7658);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
        var es_array_sort = __webpack_require__(2707);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.some.js
        var es_array_some = __webpack_require__(5212);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
        var es_string_trim = __webpack_require__(3210);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
        var es_regexp_exec = __webpack_require__(4916);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
        var es_string_replace = __webpack_require__(5306);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.every.js
        var es_array_every = __webpack_require__(6541);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
        var es_array_index_of = __webpack_require__(2772);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
        var es_array_reduce = __webpack_require__(5827);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
        var es_array_concat = __webpack_require__(2222);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
        var es_json_stringify = __webpack_require__(8862);
        // EXTERNAL MODULE: ./node_modules/fuzzysearch/index.js
        var fuzzysearch = __webpack_require__(4390);
        var fuzzysearch_default =
          /*#__PURE__*/ __webpack_require__.n(fuzzysearch); // CONCATENATED MODULE: ./src/utils/isNaN.js
        function isNaN_isNaN(x) {
          return x !== x;
        } // CONCATENATED MODULE: ./src/utils/includes.js
        function includes(arrOrStr, elem) {
          return arrOrStr.indexOf(elem) !== -1;
        }
        // EXTERNAL MODULE: ./node_modules/lodash/constant.js
        var constant = __webpack_require__(5703);
        var constant_default = /*#__PURE__*/ __webpack_require__.n(constant);
        // EXTERNAL MODULE: ./node_modules/lodash/identity.js
        var identity = __webpack_require__(6557);
        var identity_default = /*#__PURE__*/ __webpack_require__.n(identity); // CONCATENATED MODULE: ./src/utils/createMap.js
        var createMap = function createMap() {
          return Object.create(null);
        }; // CONCATENATED MODULE: ./src/utils/quickDiff.js
        function quickDiff(arrA, arrB) {
          if (arrA.length !== arrB.length) return true;
          for (var i = 0; i < arrA.length; i++) {
            if (arrA[i] !== arrB[i]) return true;
          }
          return false;
        }
        // EXTERNAL MODULE: ./node_modules/lodash/noop.js
        var noop = __webpack_require__(308);
        var noop_default = /*#__PURE__*/ __webpack_require__.n(noop); // CONCATENATED MODULE: ./src/utils/warning.js
        var warning = true ? /* istanbul ignore next */ noop_default() : 0; // CONCATENATED MODULE: ./src/utils/find.js
        function find(arr, predicate, ctx) {
          for (var i = 0, len = arr.length; i < len; i++) {
            if (predicate.call(ctx, arr[i], i, arr)) return arr[i];
          }
          return undefined;
        } // CONCATENATED MODULE: ./src/utils/onLeftClick.js
        function onLeftClick(mouseDownHandler) {
          return function onMouseDown(evt) {
            if (evt.type === "mousedown" && evt.button === 0) {
              for (
                var _len = arguments.length,
                  args = new Array(_len > 1 ? _len - 1 : 0),
                  _key = 1;
                _key < _len;
                _key++
              ) {
                args[_key - 1] = arguments[_key];
              }
              mouseDownHandler.call.apply(
                mouseDownHandler,
                [this, evt].concat(args)
              );
            }
          };
        } // CONCATENATED MODULE: ./src/utils/scrollIntoView.js
        // from react-select
        function scrollIntoView($scrollingEl, $focusedEl) {
          var scrollingReact = $scrollingEl.getBoundingClientRect();
          var focusedRect = $focusedEl.getBoundingClientRect();
          var overScroll = $focusedEl.offsetHeight / 3;
          if (focusedRect.bottom + overScroll > scrollingReact.bottom) {
            $scrollingEl.scrollTop = Math.min(
              $focusedEl.offsetTop +
                $focusedEl.clientHeight -
                $scrollingEl.offsetHeight +
                overScroll,
              $scrollingEl.scrollHeight
            );
          } else if (focusedRect.top - overScroll < scrollingReact.top) {
            $scrollingEl.scrollTop = Math.max(
              $focusedEl.offsetTop - overScroll,
              0
            );
          }
        }
        // EXTERNAL MODULE: ./node_modules/lodash/last.js
        var lodash_last = __webpack_require__(928);
        var last_default = /*#__PURE__*/ __webpack_require__.n(lodash_last);
        // EXTERNAL MODULE: ./node_modules/lodash/once.js
        var once = __webpack_require__(1463);
        var once_default = /*#__PURE__*/ __webpack_require__.n(once); // CONCATENATED MODULE: ./node_modules/is-promise/index.mjs
        function isPromise(obj) {
          return (
            !!obj &&
            (typeof obj === "object" || typeof obj === "function") &&
            typeof obj.then === "function"
          );
        }

        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
        var es_array_splice = __webpack_require__(561); // CONCATENATED MODULE: ./src/utils/removeFromArray.js
        function removeFromArray(arr, elem) {
          var idx = arr.indexOf(elem);
          if (idx !== -1) arr.splice(idx, 1);
        } // CONCATENATED MODULE: ./src/constants.js
        // Magic value that indicates a root level node.
        var NO_PARENT_NODE = null;

        // Types of checked state.
        var UNCHECKED = 0;
        var INDETERMINATE = 1;
        var CHECKED = 2;

        // Types of count number.
        var ALL_CHILDREN = "ALL_CHILDREN";
        var ALL_DESCENDANTS = "ALL_DESCENDANTS";
        var LEAF_CHILDREN = "LEAF_CHILDREN";
        var LEAF_DESCENDANTS = "LEAF_DESCENDANTS";

        // Action types of delayed loading.
        var LOAD_ROOT_OPTIONS = "LOAD_ROOT_OPTIONS";
        var LOAD_CHILDREN_OPTIONS = "LOAD_CHILDREN_OPTIONS";
        var ASYNC_SEARCH = "ASYNC_SEARCH";

        // Acceptable values of `valueConsistsOf` prop.
        var ALL = "ALL";
        var BRANCH_PRIORITY = "BRANCH_PRIORITY";
        var LEAF_PRIORITY = "LEAF_PRIORITY";
        var ALL_WITH_INDETERMINATE = "ALL_WITH_INDETERMINATE";

        // Acceptable values of `sortValueBy` prop.
        var ORDER_SELECTED = "ORDER_SELECTED";
        var LEVEL = "LEVEL";
        var INDEX = "INDEX";

        // Key codes look-up table.
        var KEY_CODES = {
          BACKSPACE: 8,
          ENTER: 13,
          ESCAPE: 27,
          END: 35,
          HOME: 36,
          ARROW_LEFT: 37,
          ARROW_UP: 38,
          ARROW_RIGHT: 39,
          ARROW_DOWN: 40,
          DELETE: 46,
        };

        // Other constants.
        var INPUT_DEBOUNCE_DELAY = false
          ? /* to speed up unit testing */ 0
          : /* istanbul ignore next */ 200;
        var MIN_INPUT_WIDTH = 5;
        var MENU_BUFFER = 40; // CONCATENATED MODULE: ./src/mixins/treeselectMixin.js
        function sortValueByIndex(a, b) {
          var i = 0;
          do {
            if (a.level < i) return -1;
            if (b.level < i) return 1;
            if (a.index[i] !== b.index[i]) return a.index[i] - b.index[i];
            i++;
          } while (true);
        }
        function sortValueByLevel(a, b) {
          return a.level === b.level
            ? sortValueByIndex(a, b)
            : a.level - b.level;
        }
        function createAsyncOptionsStates() {
          return {
            isLoaded: false,
            isLoading: false,
            loadingError: "",
          };
        }
        function stringifyOptionPropValue(value) {
          if (typeof value === "string") return value;
          if (typeof value === "number" && !isNaN_isNaN(value))
            return value + "";
          // istanbul ignore next
          return "";
        }
        function match(enableFuzzyMatch, needle, haystack) {
          return enableFuzzyMatch
            ? fuzzysearch_default()(needle, haystack)
            : includes(haystack, needle);
        }
        function getErrorMessage(err) {
          return err.message || /* istanbul ignore next */ String(err);
        }
        var instanceId = 0;
        /* harmony default export */ var treeselectMixin = {
          provide: function provide() {
            return {
              // Enable access to the instance of root component of vue-treeselect
              // across hierarchy.
              instance: this,
            };
          },
          props: {
            /**
             * Whether to allow resetting value even if there are disabled selected nodes.
             */
            allowClearingDisabled: {
              type: Boolean,
              default: false,
            },
            /**
             * When an ancestor node is selected/deselected, whether its disabled descendants should be selected/deselected.
             * You may want to use this in conjunction with `allowClearingDisabled` prop.
             */
            allowSelectingDisabledDescendants: {
              type: Boolean,
              default: false,
            },
            selectAllOption: {
              type: Boolean,
              default: false,
            },
            /**
             * Whether the menu should be always open.
             */
            alwaysOpen: {
              type: Boolean,
              default: false,
            },
            /**
             * Append the menu to <body />?
             */
            appendToBody: {
              type: Boolean,
              default: false,
            },
            /**
             * Whether to enable async search mode.
             */
            async: {
              type: Boolean,
              default: false,
            },
            /**
             * Automatically focus the component on mount?
             */
            autoFocus: {
              type: Boolean,
              default: false,
            },
            /**
             * Automatically load root options on mount. When set to `false`, root options will be loaded when the menu is opened.
             */
            autoLoadRootOptions: {
              type: Boolean,
              default: true,
            },
            /**
             * When user deselects a node, automatically deselect its ancestors. Applies to flat mode only.
             */
            autoDeselectAncestors: {
              type: Boolean,
              default: false,
            },
            /**
             * When user deselects a node, automatically deselect its descendants. Applies to flat mode only.
             */
            autoDeselectDescendants: {
              type: Boolean,
              default: false,
            },
            /**
             * When user selects a node, automatically select its ancestors. Applies to flat mode only.
             */
            autoSelectAncestors: {
              type: Boolean,
              default: false,
            },
            /**
             * When user selects a node, automatically select its descendants. Applies to flat mode only.
             */
            autoSelectDescendants: {
              type: Boolean,
              default: false,
            },
            /**
             * Whether pressing backspace key removes the last item if there is no text input.
             */
            backspaceRemoves: {
              type: Boolean,
              default: true,
            },
            /**
             * Function that processes before clearing all input fields.
             * Return `false` to prevent value from being cleared.
             * @type {function(): (boolean|Promise<boolean>)}
             */
            beforeClearAll: {
              type: Function,
              default: constant_default()(true),
            },
            /**
             * Show branch nodes before leaf nodes?
             */
            branchNodesFirst: {
              type: Boolean,
              default: false,
            },
            /**
             * Should cache results of every search request?
             */
            cacheOptions: {
              type: Boolean,
              default: true,
            },
            /**
             * Show an "×" button that resets value?
             */
            clearable: {
              type: Boolean,
              default: true,
            },
            /**
             * Title for the "×" button when `multiple: true`.
             */
            clearAllText: {
              type: String,
              default: "Clear all",
            },
            /**
             * Whether to clear the search input after selecting.
             * Use only when `multiple` is `true`.
             * For single-select mode, it **always** clears the input after selecting an option regardless of the prop value.
             */
            clearOnSelect: {
              type: Boolean,
              default: false,
            },
            /**
             * Title for the "×" button.
             */
            clearValueText: {
              type: String,
              default: "Clear value",
            },
            /**
             * Whether to close the menu after selecting an option?
             * Use only when `multiple` is `true`.
             */
            closeOnSelect: {
              type: Boolean,
              default: true,
            },
            /**
             * How many levels of branch nodes should be automatically expanded when loaded.
             * Set `Infinity` to make all branch nodes expanded by default.
             */
            defaultExpandLevel: {
              type: Number,
              default: 0,
            },
            /**
             * The default set of options to show before the user starts searching. Used for async search mode.
             * When set to `true`, the results for search query as a empty string will be autoloaded.
             * @type {boolean|node[]}
             */
            defaultOptions: {
              default: false,
            },
            /**
             * Whether pressing delete key removes the last item if there is no text input.
             */
            deleteRemoves: {
              type: Boolean,
              default: true,
            },
            /**
             * Delimiter to use to join multiple values for the hidden field value.
             */
            delimiter: {
              type: String,
              default: ",",
            },
            /**
             * Only show the nodes that match the search value directly, excluding its ancestors.
             *
             * @type {Object}
             */
            flattenSearchResults: {
              type: Boolean,
              default: false,
            },
            /**
             * Prevent branch nodes from being selected?
             */
            disableBranchNodes: {
              type: Boolean,
              default: false,
            },
            /**
             * Disable the control?
             */
            disabled: {
              type: Boolean,
              default: false,
            },
            /**
             * Disable the fuzzy matching functionality?
             */
            disableFuzzyMatching: {
              type: Boolean,
              default: false,
            },
            /**
             * Whether to enable flat mode or not. Non-flat mode (default) means:
             *   - Whenever a branch node gets checked, all its children will be checked too
             *   - Whenever a branch node has all children checked, the branch node itself will be checked too
             * Set `true` to disable this mechanism
             */
            flat: {
              type: Boolean,
              default: false,
            },
            /**
             * Will be passed with all events as the last param.
             * Useful for identifying events origin.
             */
            instanceId: {
              // Add two trailing "$" to distinguish from explictly specified ids.
              default: function _default() {
                return "".concat(instanceId++, "$$");
              },
              type: [String, Number],
            },
            /**
             * Joins multiple values into a single form field with the `delimiter` (legacy mode).
             */
            joinValues: {
              type: Boolean,
              default: false,
            },
            /**
             * Limit the display of selected options.
             * The rest will be hidden within the limitText string.
             */
            limit: {
              type: Number,
              default: Infinity,
            },
            /**
             * Function that processes the message shown when selected elements pass the defined limit.
             * @type {function(number): string}
             */
            limitText: {
              type: Function,
              default: function limitTextDefault(count) {
                // eslint-disable-line func-name-matching
                return "and ".concat(count, " more");
              },
            },
            /**
             * Text displayed when loading options.
             */
            loadingText: {
              type: String,
              default: "Loading...",
            },
            /**
             * Used for dynamically loading options.
             * @type {function({action: string, callback: (function((Error|string)=): void), parentNode: node=, instanceId}): void}
             */
            loadOptions: {
              type: Function,
            },
            /**
             * Which node properties to filter on.
             */
            matchKeys: {
              type: Array,
              default: constant_default()(["label"]),
            },
            /**
             * Sets `maxHeight` style value of the menu.
             */
            maxHeight: {
              type: Number,
              default: 300,
            },
            minChar: {
              type: Number,
              default: 1,
            },
            /**
             * Set `true` to allow selecting multiple options (a.k.a., multi-select mode).
             */
            multiple: {
              type: Boolean,
              default: false,
            },
            /**
             * Generates a hidden <input /> tag with this field name for html forms.
             */
            name: {
              type: String,
            },
            /**
             * Text displayed when a branch node has no children.
             */
            noChildrenText: {
              type: String,
              default: "No sub-options.",
            },
            /**
             * Text displayed when there are no available options.
             */
            noOptionsText: {
              type: String,
              default: "No options available.",
            },
            /**
             * Text displayed when there are no matching search results.
             */
            noResultsText: {
              type: String,
              default: "No results found...",
            },
            /**
             * Used for normalizing source data.
             * @type {function(node, instanceId): node}
             */
            normalizer: {
              type: Function,
              default: identity_default(),
            },
            /**
             * By default (`auto`), the menu will open below the control. If there is not
             * enough space, vue-treeselect will automatically flip the menu.
             * You can use one of other four options to force the menu to be always opened
             * to specified direction.
             * Acceptable values:
             *   - `"auto"`
             *   - `"below"`
             *   - `"bottom"`
             *   - `"above"`
             *   - `"top"`
             */
            openDirection: {
              type: String,
              default: "auto",
              validator: function validator(value) {
                var acceptableValues = [
                  "auto",
                  "top",
                  "bottom",
                  "above",
                  "below",
                ];
                return includes(acceptableValues, value);
              },
            },
            /**
             * Whether to automatically open the menu when the control is clicked.
             */
            openOnClick: {
              type: Boolean,
              default: true,
            },
            /**
             * Whether to automatically open the menu when the control is focused.
             */
            openOnFocus: {
              type: Boolean,
              default: false,
            },
            /**
             * Array of available options.
             * @type {node[]}
             */
            options: {
              type: Array,
            },
            /**
             * Field placeholder, displayed when there's no value.
             */
            placeholder: {
              type: String,
              default: "Select...",
            },
            /**
             * Applies HTML5 required attribute when needed.
             */
            required: {
              type: Boolean,
              default: false,
            },
            /**
             * Text displayed asking user whether to retry loading children options.
             */
            retryText: {
              type: String,
              default: "Retry?",
            },
            /**
             * Title for the retry button.
             */
            retryTitle: {
              type: String,
              default: "Click to retry",
            },
            /**
             * Enable searching feature?
             */
            searchable: {
              type: Boolean,
              default: true,
            },
            /**
             * Search in ancestor nodes too.
             */
            searchNested: {
              type: Boolean,
              default: false,
            },
            /**
             * Text tip to prompt for async search.
             */
            searchPromptText: {
              type: String,
              default: "Type to search...",
            },
            /**
             * Whether to show a children count next to the label of each branch node.
             */
            showCount: {
              type: Boolean,
              default: false,
            },
            /**
             * Used in conjunction with `showCount` to specify which type of count number should be displayed.
             * Acceptable values:
             *   - "ALL_CHILDREN"
             *   - "ALL_DESCENDANTS"
             *   - "LEAF_CHILDREN"
             *   - "LEAF_DESCENDANTS"
             */
            showCountOf: {
              type: String,
              default: ALL_CHILDREN,
              validator: function validator(value) {
                var acceptableValues = [
                  ALL_CHILDREN,
                  ALL_DESCENDANTS,
                  LEAF_CHILDREN,
                  LEAF_DESCENDANTS,
                ];
                return includes(acceptableValues, value);
              },
            },
            /**
             * Whether to show children count when searching.
             * Fallbacks to the value of `showCount` when not specified.
             * @type {boolean}
             */
            showCountOnSearch: null,
            /**
             * In which order the selected options should be displayed in trigger & sorted in `value` array.
             * Used for multi-select mode only.
             * Acceptable values:
             *   - "ORDER_SELECTED"
             *   - "LEVEL"
             *   - "INDEX"
             */
            sortValueBy: {
              type: String,
              default: ORDER_SELECTED,
              validator: function validator(value) {
                var acceptableValues = [ORDER_SELECTED, LEVEL, INDEX];
                return includes(acceptableValues, value);
              },
            },
            /**
             * Tab index of the control.
             */
            tabIndex: {
              type: Number,
              default: 0,
            },
            /**
             * The value of the control.
             * Should be `id` or `node` object for single-select mode, or an array of `id` or `node` object for multi-select mode.
             * Its format depends on the `valueFormat` prop.
             * For most cases, just use `v-model` instead.
             * @type {?Array}
             */
            modelValue: null,
            /**
             * Which kind of nodes should be included in the `value` array in multi-select mode.
             * Acceptable values:
             *   - "ALL" - Any node that is checked will be included in the `value` array
             *   - "BRANCH_PRIORITY" (default) - If a branch node is checked, all its descendants will be excluded in the `value` array
             *   - "LEAF_PRIORITY" - If a branch node is checked, this node itself and its branch descendants will be excluded from the `value` array but its leaf descendants will be included
             *   - "ALL_WITH_INDETERMINATE" - Any node that is checked will be included in the `value` array, plus indeterminate nodes
             */
            valueConsistsOf: {
              type: String,
              default: BRANCH_PRIORITY,
              validator: function validator(value) {
                var acceptableValues = [
                  ALL,
                  BRANCH_PRIORITY,
                  LEAF_PRIORITY,
                  ALL_WITH_INDETERMINATE,
                ];
                return includes(acceptableValues, value);
              },
            },
            /**
             * Format of `value` prop.
             * Note that, when set to `"object"`, only `id` & `label` properties are required in each `node` object in `value` prop.
             * Acceptable values:
             *   - "id"
             *   - "object"
             */
            valueFormat: {
              type: String,
              default: "id",
            },
            /**
             * z-index of the menu.
             */
            zIndex: {
              type: [Number, String],
              default: 999,
            },
          },
          data: function data() {
            return {
              key: 0,
              trigger: {
                // Is the control focused?
                isFocused: false,
                // User entered search query - value of the input.
                searchQuery: "",
              },
              menu: {
                // Is the menu opened?
                isOpen: false,
                // Id of current highlighted option.
                current: null,
                // The scroll position before last menu closing.
                lastScrollPosition: 0,
                // Which direction to open the menu.
                placement: "bottom",
              },
              forest: {
                // Normalized options.
                normalizedOptions: [],
                // <id, node> map for quick look-up.
                nodeMap: createMap(),
                // <id, checkedState> map, used for multi-select mode.
                checkedStateMap: createMap(),
                // Id list of all selected options.
                selectedNodeIds: this.extractCheckedNodeIdsFromValue(),
                // <id, true> map for fast checking:
                //   if (forest.selectedNodeIds.indexOf(id) !== -1) forest.selectedNodeMap[id] === true
                selectedNodeMap: createMap(),
              },
              // States of root options.
              rootOptionsStates: createAsyncOptionsStates(),
              localSearch: {
                // Has user entered any query to search local options?
                active: false,
                // Has any options matched the search query?
                noResults: true,
                // <id, countObject> map for counting matched children/descendants.
                countMap: createMap(),
              },
              // <searchQuery, remoteSearchEntry> map.
              remoteSearch: createMap(),
            };
          },
          computed: {
            /* eslint-disable valid-jsdoc */
            /**
             * Normalized nodes that have been selected.
             * @type {node[]}
             */
            selectedNodes: function selectedNodes() {
              return this.forest.selectedNodeIds.map(this.getNode);
            },
            /**
             * Id list of selected nodes with `sortValueBy` prop applied.
             * @type {nodeId[]}
             */
            internalValue: function internalValue() {
              var _this = this;
              var internalValue;

              // istanbul ignore else
              if (
                this.single ||
                this.flat ||
                this.disableBranchNodes ||
                this.valueConsistsOf === ALL
              ) {
                internalValue = this.forest.selectedNodeIds.slice();
              } else if (this.valueConsistsOf === BRANCH_PRIORITY) {
                internalValue = this.forest.selectedNodeIds.filter(function (
                  id
                ) {
                  var node = _this.getNode(id);
                  if (node.isRootNode) return true;
                  return !_this.isSelected(node.parentNode);
                });
              } else if (this.valueConsistsOf === LEAF_PRIORITY) {
                internalValue = this.forest.selectedNodeIds.filter(function (
                  id
                ) {
                  var node = _this.getNode(id);
                  if (node.isLeaf) return true;
                  return node.children.length === 0;
                });
              } else if (this.valueConsistsOf === ALL_WITH_INDETERMINATE) {
                var _internalValue;
                var indeterminateNodeIds = [];
                internalValue = this.forest.selectedNodeIds.slice();
                this.selectedNodes.forEach(function (selectedNode) {
                  selectedNode.ancestors.forEach(function (ancestor) {
                    if (includes(indeterminateNodeIds, ancestor.id)) return;
                    if (includes(internalValue, ancestor.id)) return;
                    indeterminateNodeIds.push(ancestor.id);
                  });
                });
                (_internalValue = internalValue).push.apply(
                  _internalValue,
                  indeterminateNodeIds
                );
              }
              if (this.sortValueBy === LEVEL) {
                internalValue.sort(function (a, b) {
                  return sortValueByLevel(_this.getNode(a), _this.getNode(b));
                });
              } else if (this.sortValueBy === INDEX) {
                internalValue.sort(function (a, b) {
                  return sortValueByIndex(_this.getNode(a), _this.getNode(b));
                });
              }
              return internalValue;
            },
            /**
             * Has any option been selected?
             * @type {boolean}
             */
            hasValue: function hasValue() {
              return this.internalValue.length > 0;
            },
            /**
             * Single-select mode?
             * @type {boolean}
             */
            single: function single() {
              return !this.multiple;
            },
            /**
             * Id list of nodes displayed in the menu. Nodes that are considered NOT visible:
             *   - descendants of a collapsed branch node
             *   - in local search mode, nodes that are not matched, unless
             *       - it's a branch node and has matched descendants
             *       - it's a leaf node and its parent node is explicitly set to show all children
             * @type {id[]}
             */
            visibleOptionIds: function visibleOptionIds() {
              var _this2 = this;
              var visibleOptionIds = [];
              this.traverseAllNodesByIndex(function (node) {
                if (
                  !_this2.localSearch.active ||
                  _this2.shouldOptionBeIncludedInSearchResult(node)
                ) {
                  visibleOptionIds.push(node.id);
                }
                // Skip the traversal of descendants of a branch node if it's not expanded.
                if (node.isBranch && !_this2.shouldExpand(node)) {
                  return false;
                }
              });
              return visibleOptionIds;
            },
            /**
             * Has any option should be displayed in the menu?
             * @type {boolean}
             */
            hasVisibleOptions: function hasVisibleOptions() {
              return this.visibleOptionIds.length !== 0;
            },
            /**
             * Should show children count when searching?
             * @type {boolean}
             */
            showCountOnSearchComputed: function showCountOnSearchComputed() {
              // Vue doesn't allow setting default prop value based on another prop value.
              // So use computed property as a workaround.
              // https://github.com/vuejs/vue/issues/6358
              return typeof this.showCountOnSearch === "boolean"
                ? this.showCountOnSearch
                : this.showCount;
            },
            /**
             * Is there any branch node?
             * @type {boolean}
             */
            hasBranchNodes: function hasBranchNodes() {
              return this.forest.normalizedOptions.some(function (rootNode) {
                return rootNode.isBranch;
              });
            },
            shouldFlattenOptions: function shouldFlattenOptions() {
              return this.localSearch.active && this.flattenSearchResults;
            } /* eslint-enable valid-jsdoc */,
          },
          watch: {
            alwaysOpen: function alwaysOpen(newValue) {
              if (newValue) this.openMenu();
              else this.closeMenu();
            },
            branchNodesFirst: function branchNodesFirst() {
              this.initialize();
            },
            disabled: function disabled(newValue) {
              // force close the menu after disabling the control
              if (newValue && this.menu.isOpen) this.closeMenu();
              else if (!newValue && !this.menu.isOpen && this.alwaysOpen)
                this.openMenu();
            },
            flat: function flat() {
              this.initialize();
            },
            internalValue: function internalValue(newValue, oldValue) {
              var hasChanged = quickDiff(newValue, oldValue);
              // #122
              // Vue would trigger this watcher when `newValue` and `oldValue` are shallow-equal.
              // We emit the `input` event only when the value actually changes.
              if (hasChanged)
                this.$emit(
                  "update:modelValue",
                  this.getValue(),
                  this.getInstanceId()
                );
            },
            matchKeys: function matchKeys() {
              this.initialize();
            },
            multiple: function multiple(newValue) {
              // We need to rebuild the state when switching from single-select mode
              // to multi-select mode.
              // istanbul ignore else
              if (newValue) this.buildForestState();
            },
            options: {
              handler: function handler() {
                if (this.async) return;
                // Re-initialize options when the `options` prop has changed.
                this.initialize();
                this.rootOptionsStates.isLoaded = Array.isArray(this.options);
              },
              deep: true,
              immediate: true,
            },
            "trigger.searchQuery": function triggerSearchQuery() {
              if (this.async) {
                this.handleRemoteSearch();
              } else {
                this.handleLocalSearch();
              }
              this.$emit(
                "search-change",
                this.trigger.searchQuery,
                this.getInstanceId()
              );
            },
            value: function value() {
              var nodeIdsFromValue = this.extractCheckedNodeIdsFromValue();
              var hasChanged = quickDiff(nodeIdsFromValue, this.internalValue);
              if (hasChanged) this.fixSelectedNodeIds(nodeIdsFromValue);
            },
          },
          methods: {
            verifyProps: function verifyProps() {
              var _this3 = this;
              warning(
                function () {
                  return _this3.async ? _this3.searchable : true;
                },
                function () {
                  return 'For async search mode, the value of "searchable" prop must be true.';
                }
              );
              if (this.options == null && !this.loadOptions) {
                warning(
                  function () {
                    return false;
                  },
                  function () {
                    return 'Are you meant to dynamically load options? You need to use "loadOptions" prop.';
                  }
                );
              }
              if (this.flat) {
                warning(
                  function () {
                    return _this3.multiple;
                  },
                  function () {
                    return 'You are using flat mode. But you forgot to add "multiple=true"?';
                  }
                );
              }
              if (!this.flat) {
                var propNames = [
                  "autoSelectAncestors",
                  "autoSelectDescendants",
                  "autoDeselectAncestors",
                  "autoDeselectDescendants",
                ];
                propNames.forEach(function (propName) {
                  warning(
                    function () {
                      return !_this3[propName];
                    },
                    function () {
                      return '"'.concat(
                        propName,
                        '" only applies to flat mode.'
                      );
                    }
                  );
                });
              }
            },
            resetFlags: function resetFlags() {
              this._blurOnSelect = false;
            },
            initialize: function initialize() {
              var options = this.async
                ? this.getRemoteSearchEntry().options
                : this.options;
              if (Array.isArray(options)) {
                // In case we are re-initializing options, keep the old state tree temporarily.
                var prevNodeMap = this.forest.nodeMap;
                this.forest.nodeMap = createMap();
                this.keepDataOfSelectedNodes(prevNodeMap);
                this.forest.normalizedOptions = this.normalize(
                  NO_PARENT_NODE,
                  options,
                  prevNodeMap
                );
                // Cases that need fixing `selectedNodeIds`:
                //   1) Children options of a checked node have been delayed loaded,
                //      we should also mark these children as checked. (multi-select mode)
                //   2) Root options have been delayed loaded, we need to initialize states
                //      of these nodes. (multi-select mode)
                //   3) Async search mode.
                this.fixSelectedNodeIds(this.internalValue);
              } else {
                this.forest.normalizedOptions = [];
              }
            },
            getInstanceId: function getInstanceId() {
              return this.instanceId == null ? this.id : this.instanceId;
            },
            getValue: function getValue() {
              var _this4 = this;
              if (this.valueFormat === "id") {
                return this.multiple
                  ? this.internalValue.slice()
                  : this.internalValue[0];
              }
              var rawNodes = this.internalValue.map(function (id) {
                return _this4.getNode(id).raw;
              });
              return this.multiple ? rawNodes : rawNodes[0];
            },
            getNode: function getNode(nodeId) {
              warning(
                function () {
                  return nodeId != null;
                },
                function () {
                  return "Invalid node id: ".concat(nodeId);
                }
              );
              if (nodeId == null) return null;
              return nodeId in this.forest.nodeMap
                ? this.forest.nodeMap[nodeId]
                : this.createFallbackNode(nodeId);
            },
            createFallbackNode: function createFallbackNode(id) {
              // In case there is a default selected node that is not loaded into the tree yet,
              // we create a fallback node to keep the component working.
              // When the real data is loaded, we'll override this fake node.

              var raw = this.extractNodeFromValue(id);
              var label =
                this.enhancedNormalizer(raw).label ||
                "".concat(id, " (unknown)");
              var fallbackNode = {
                id: id,
                label: label,
                ancestors: [],
                parentNode: NO_PARENT_NODE,
                isFallbackNode: true,
                isRootNode: true,
                isLeaf: true,
                isBranch: false,
                canSelectChildrenEvenIfDisabled: false,
                isDisabled: false,
                isNew: false,
                index: [-1],
                level: 0,
                raw: raw,
              };
              return (this.forest.nodeMap[id] = fallbackNode);
              // return this.$ set(this.forest.nodeMap, id, fallbackNode)
            },
            extractCheckedNodeIdsFromValue:
              function extractCheckedNodeIdsFromValue() {
                var _this5 = this;
                if (this.modelValue == null) return [];
                if (this.valueFormat === "id") {
                  return this.multiple
                    ? this.modelValue.slice()
                    : [this.modelValue];
                }
                return (this.multiple ? this.modelValue : [this.modelValue])
                  .map(function (node) {
                    return _this5.enhancedNormalizer(node);
                  })
                  .map(function (node) {
                    return node.id;
                  });
              },
            extractNodeFromValue: function extractNodeFromValue(id) {
              var _this6 = this;
              var defaultNode = {
                id: id,
              };
              if (this.valueFormat === "id") {
                return defaultNode;
              }
              var valueArray = this.multiple
                ? Array.isArray(this.modelValue)
                  ? this.modelValue
                  : []
                : this.modelValue
                ? [this.modelValue]
                : [];
              var matched = find(valueArray, function (node) {
                return node && _this6.enhancedNormalizer(node).id === id;
              });
              return matched || defaultNode;
            },
            fixSelectedNodeIds: function fixSelectedNodeIds(
              nodeIdListOfPrevValue
            ) {
              var _this7 = this;
              var nextSelectedNodeIds = [];

              // istanbul ignore else
              if (
                this.single ||
                this.flat ||
                this.disableBranchNodes ||
                this.valueConsistsOf === ALL
              ) {
                nextSelectedNodeIds = nodeIdListOfPrevValue;
              } else if (this.valueConsistsOf === BRANCH_PRIORITY) {
                nodeIdListOfPrevValue.forEach(function (nodeId) {
                  nextSelectedNodeIds.push(nodeId);
                  var node = _this7.getNode(nodeId);
                  if (node.isBranch)
                    _this7.traverseDescendantsBFS(node, function (descendant) {
                      nextSelectedNodeIds.push(descendant.id);
                    });
                });
              } else if (this.valueConsistsOf === LEAF_PRIORITY) {
                var map = createMap();
                var queue = nodeIdListOfPrevValue.slice();
                while (queue.length) {
                  var nodeId = queue.shift();
                  var node = this.getNode(nodeId);
                  nextSelectedNodeIds.push(nodeId);
                  if (node.isRootNode) continue;
                  if (!(node.parentNode.id in map))
                    map[node.parentNode.id] = node.parentNode.children.length;
                  if (--map[node.parentNode.id] === 0)
                    queue.push(node.parentNode.id);
                }
              } else if (this.valueConsistsOf === ALL_WITH_INDETERMINATE) {
                var _map = createMap();
                var _queue = nodeIdListOfPrevValue.filter(function (nodeId) {
                  var node = _this7.getNode(nodeId);
                  return node.isLeaf || node.children.length === 0;
                });
                while (_queue.length) {
                  var _nodeId = _queue.shift();
                  var _node = this.getNode(_nodeId);
                  nextSelectedNodeIds.push(_nodeId);
                  if (_node.isRootNode) continue;
                  if (!(_node.parentNode.id in _map))
                    _map[_node.parentNode.id] =
                      _node.parentNode.children.length;
                  if (--_map[_node.parentNode.id] === 0)
                    _queue.push(_node.parentNode.id);
                }
              }
              var hasChanged = quickDiff(
                this.forest.selectedNodeIds,
                nextSelectedNodeIds
              );
              // If `nextSelectedNodeIds` doesn't actually differ from old `selectedNodeIds`,
              // we don't make the assignment to avoid triggering its watchers which may cause
              // unnecessary calculations.
              if (hasChanged) this.forest.selectedNodeIds = nextSelectedNodeIds;
              this.buildForestState();
            },
            keepDataOfSelectedNodes: function keepDataOfSelectedNodes(
              prevNodeMap
            ) {
              var _this8 = this;
              // In case there is any selected node that is not present in the new `options` array.
              // It could be useful for async search mode.
              this.forest.selectedNodeIds.forEach(function (id) {
                if (!prevNodeMap[id]) return;
                var node = _objectSpread2(
                  _objectSpread2({}, prevNodeMap[id]),
                  {},
                  {
                    isFallbackNode: true,
                  }
                );
                // this.$ set(this.forest.nodeMap, id, node)
                _this8.forest.nodeMap[id] = node;
              });
            },
            isSelected: function isSelected(node) {
              // whether a node is selected (single-select mode) or fully-checked (multi-select mode)
              return node && this.forest.selectedNodeMap[node.id] === true;
            },
            traverseDescendantsBFS: function traverseDescendantsBFS(
              parentNode,
              callback
            ) {
              // istanbul ignore if
              if (!parentNode.isBranch) return;
              var queue = parentNode.children.slice();
              while (queue.length) {
                var currNode = queue[0];
                if (currNode.isBranch)
                  queue.push.apply(
                    queue,
                    _toConsumableArray(currNode.children)
                  );
                callback(currNode);
                queue.shift();
              }
            },
            traverseDescendantsDFS: function traverseDescendantsDFS(
              parentNode,
              callback
            ) {
              var _this9 = this;
              if (!parentNode.isBranch) return;
              parentNode.children.forEach(function (child) {
                // deep-level node first
                _this9.traverseDescendantsDFS(child, callback);
                callback(child);
              });
            },
            traverseAllNodesDFS: function traverseAllNodesDFS(callback) {
              var _this10 = this;
              this.forest.normalizedOptions.forEach(function (rootNode) {
                // deep-level node first
                _this10.traverseDescendantsDFS(rootNode, callback);
                callback(rootNode);
              });
            },
            traverseAllNodesByIndex: function traverseAllNodesByIndex(
              callback
            ) {
              var walk = function walk(parentNode) {
                parentNode.children.forEach(function (child) {
                  if (callback(child) !== false && child.isBranch) {
                    walk(child);
                  }
                });
              };

              // To simplify the code logic of traversal,
              // we create a fake root node that holds all the root options.
              walk({
                children: this.forest.normalizedOptions,
              });
            },
            toggleClickOutsideEvent: function toggleClickOutsideEvent(enabled) {
              if (enabled) {
                document.addEventListener(
                  "mousedown",
                  this.handleClickOutside,
                  false
                );
              } else {
                document.removeEventListener(
                  "mousedown",
                  this.handleClickOutside,
                  false
                );
              }
            },
            getValueContainer: function getValueContainer() {
              return this.$refs.control.$refs["value-container"];
            },
            getInput: function getInput() {
              return this.getValueContainer().$refs.input;
            },
            focusInput: function focusInput() {
              this.getInput().focus();
            },
            blurInput: function blurInput() {
              this.getInput().blur();
            },
            handleMouseDown: onLeftClick(function handleMouseDown(evt) {
              evt.preventDefault();
              evt.stopPropagation();
              if (this.disabled) return;
              var isClickedOnValueContainer =
                this.getValueContainer().$el.contains(evt.target);
              if (
                isClickedOnValueContainer &&
                !this.menu.isOpen &&
                (this.openOnClick || this.trigger.isFocused)
              ) {
                this.openMenu();
              }
              if (this._blurOnSelect) {
                this.blurInput();
              } else {
                // Focus the input or prevent blurring.
                this.focusInput();
              }
              this.resetFlags();
            }),
            handleClickOutside: function handleClickOutside(evt) {
              // istanbul ignore else
              if (
                this.$refs.wrapper &&
                !this.$refs.wrapper.contains(evt.target)
              ) {
                this.blurInput();
                this.closeMenu();
              }
            },
            handleLocalSearch: function handleLocalSearch() {
              var _this11 = this;
              var searchQuery = this.trigger.searchQuery;
              var done = function done() {
                return _this11.resetHighlightedOptionWhenNecessary(true);
              };
              if (!searchQuery) {
                // Exit sync search mode.
                this.localSearch.active = false;
                return done();
              }

              // Enter sync search mode.
              this.localSearch.active = true;

              // Reset states.
              this.localSearch.noResults = true;
              this.traverseAllNodesDFS(function (node) {
                if (node.isBranch) {
                  var _this11$localSearch$c;
                  node.isExpandedOnSearch = false;
                  node.showAllChildrenOnSearch = false;
                  node.isMatched = false;
                  node.hasMatchedDescendants = false;
                  _this11.localSearch.countMap[node.id] =
                    ((_this11$localSearch$c = {}),
                    _defineProperty(_this11$localSearch$c, ALL_CHILDREN, 0),
                    _defineProperty(_this11$localSearch$c, ALL_DESCENDANTS, 0),
                    _defineProperty(_this11$localSearch$c, LEAF_CHILDREN, 0),
                    _defineProperty(_this11$localSearch$c, LEAF_DESCENDANTS, 0),
                    _this11$localSearch$c);

                  // this.$ set(this.localSearch.countMap, node.id, {
                  //   [ALL_CHILDREN]: 0,
                  //   [ALL_DESCENDANTS]: 0,
                  //   [LEAF_CHILDREN]: 0,
                  //   [LEAF_DESCENDANTS]: 0,
                  // })
                }
              });

              var lowerCasedSearchQuery = searchQuery
                .trim()
                .toLocaleLowerCase();
              var splitSearchQuery = lowerCasedSearchQuery
                .replace(/\s+/g, " ")
                .split(" ");
              this.traverseAllNodesDFS(function (node) {
                if (_this11.searchNested && splitSearchQuery.length > 1) {
                  node.isMatched = splitSearchQuery.every(function (
                    filterValue
                  ) {
                    return match(false, filterValue, node.nestedSearchLabel);
                  });
                } else {
                  node.isMatched = _this11.matchKeys.some(function (matchKey) {
                    return match(
                      !_this11.disableFuzzyMatching,
                      lowerCasedSearchQuery,
                      node.lowerCased[matchKey]
                    );
                  });
                }
                if (node.isMatched) {
                  _this11.localSearch.noResults = false;
                  node.ancestors.forEach(function (ancestor) {
                    return _this11
                      .localSearch.countMap[ancestor.id][ALL_DESCENDANTS]++;
                  });
                  if (node.isLeaf)
                    node.ancestors.forEach(function (ancestor) {
                      return _this11
                        .localSearch.countMap[ancestor.id][LEAF_DESCENDANTS]++;
                    });
                  if (node.parentNode !== NO_PARENT_NODE) {
                    _this11.localSearch.countMap[node.parentNode.id][
                      ALL_CHILDREN
                    ] += 1;
                    // istanbul ignore else
                    if (node.isLeaf)
                      _this11.localSearch.countMap[node.parentNode.id][
                        LEAF_CHILDREN
                      ] += 1;
                  }
                }
                if (
                  (node.isMatched ||
                    (node.isBranch && node.isExpandedOnSearch)) &&
                  node.parentNode !== NO_PARENT_NODE
                ) {
                  node.parentNode.isExpandedOnSearch = true;
                  node.parentNode.hasMatchedDescendants = true;
                }
              });
              done();
            },
            handleRemoteSearch: function handleRemoteSearch() {
              var _this12 = this;
              var searchQuery = this.trigger.searchQuery;
              var _this66 = this;
              var entry = this.getRemoteSearchEntry();
              var done = function done() {
                _this12.initialize();
                _this12.resetHighlightedOptionWhenNecessary(true);
              };
              console.log(searchQuery, this.minChar);
              if (
                ((searchQuery === "" && this.minChar > 0) ||
                  this.cacheOptions) &&
                entry.isLoaded
              ) {
                return done();
              }
              if (searchQuery.length >= this.minChar) {
                this.callLoadOptionsProp({
                  action: ASYNC_SEARCH,
                  args: {
                    searchQuery: searchQuery,
                  },
                  isPending: function isPending() {
                    return entry.isLoading;
                  },
                  start: function start() {
                    entry.isLoading = true;
                    entry.isLoaded = false;
                    entry.loadingError = "";
                  },
                  succeed: function succeed(options) {
                    entry.isLoaded = true;
                    entry.options = options;
                    // When the request completes, the search query may have changed.
                    // We only show these options if they are for the current search query.
                    if (_this12.trigger.searchQuery === searchQuery) done();
                  },
                  fail: function fail(err) {
                    entry.loadingError = getErrorMessage(err);
                  },
                  end: function end() {
                    entry.isLoading = false;
                    _this66.key += 1;
                  },
                });
              }
            },
            getRemoteSearchEntry: function getRemoteSearchEntry() {
              var _this13 = this;
              var searchQuery = this.trigger.searchQuery;
              var entry =
                this.remoteSearch[searchQuery] ||
                _objectSpread2(
                  _objectSpread2({}, createAsyncOptionsStates()),
                  {},
                  {
                    options: [],
                  }
                );

              // Vue doesn't support directly watching on objects.
              this.$watch(
                function () {
                  return entry.options;
                },
                function () {
                  // TODO: potential redundant re-initialization.
                  if (_this13.trigger.searchQuery === searchQuery)
                    _this13.initialize();
                },
                {
                  deep: true,
                }
              );
              if (searchQuery === "" && this.minChar > 0) {
                if (Array.isArray(this.defaultOptions)) {
                  entry.options = this.defaultOptions;
                  entry.isLoaded = true;
                  return entry;
                } else if (this.defaultOptions !== true) {
                  entry.isLoaded = true;
                  return entry;
                }
              }
              if (!this.remoteSearch[searchQuery]) {
                // this.$ set(this.remoteSearch, searchQuery, entry)
                this.remoteSearch[searchQuery] = entry;
              }
              return entry;
            },
            shouldExpand: function shouldExpand(node) {
              return this.localSearch.active
                ? node.isExpandedOnSearch
                : node.isExpanded;
            },
            shouldOptionBeIncludedInSearchResult:
              function shouldOptionBeIncludedInSearchResult(node) {
                // 1) This option is matched.
                if (node.isMatched) return true;
                // 2) This option is not matched, but has matched descendant(s).
                if (
                  node.isBranch &&
                  node.hasMatchedDescendants &&
                  !this.flattenSearchResults
                )
                  return true;
                // 3) This option's parent has no matched descendants,
                //    but after being expanded, all its children should be shown.
                if (!node.isRootNode && node.parentNode.showAllChildrenOnSearch)
                  return true;
                // 4) The default case.
                return false;
              },
            shouldShowOptionInMenu: function shouldShowOptionInMenu(node) {
              if (
                this.localSearch.active &&
                !this.shouldOptionBeIncludedInSearchResult(node)
              ) {
                return false;
              }
              return true;
            },
            getControl: function getControl() {
              return this.$refs.control.$el;
            },
            getMenu: function getMenu() {
              var ref = this.appendToBody
                ? this.$refs.portal.portalTarget
                : this;
              var $menu = ref.$refs.menu.$refs.menu;
              return $menu && $menu.nodeName !== "#comment" ? $menu : null;
            },
            setCurrentHighlightedOption: function setCurrentHighlightedOption(
              node
            ) {
              var _this14 = this;
              var scroll =
                arguments.length > 1 && arguments[1] !== undefined
                  ? arguments[1]
                  : true;
              var prev = this.menu.current;
              if (prev != null && prev in this.forest.nodeMap) {
                this.forest.nodeMap[prev].isHighlighted = false;
              }
              this.menu.current = node.id;
              node.isHighlighted = true;
              if (this.menu.isOpen && scroll) {
                var scrollToOption = function scrollToOption() {
                  var $menu = _this14.getMenu();
                  var $option = $menu.querySelector(
                    '.vue-treeselect__option[data-id="'.concat(node.id, '"]')
                  );
                  if ($option) scrollIntoView($menu, $option);
                };

                // In case `openMenu()` is just called and the menu is not rendered yet.
                if (this.getMenu()) {
                  scrollToOption();
                } else {
                  // istanbul ignore next
                  this.$nextTick(scrollToOption);
                }
              }
            },
            resetHighlightedOptionWhenNecessary:
              function resetHighlightedOptionWhenNecessary() {
                var forceReset =
                  arguments.length > 0 && arguments[0] !== undefined
                    ? arguments[0]
                    : false;
                var current = this.menu.current;
                if (
                  forceReset ||
                  current == null ||
                  !(current in this.forest.nodeMap) ||
                  !this.shouldShowOptionInMenu(this.getNode(current))
                ) {
                  this.highlightFirstOption();
                }
              },
            highlightFirstOption: function highlightFirstOption() {
              if (!this.hasVisibleOptions) return;
              var first = this.visibleOptionIds[0];
              this.setCurrentHighlightedOption(this.getNode(first));
            },
            highlightPrevOption: function highlightPrevOption() {
              if (!this.hasVisibleOptions) return;
              var prev = this.visibleOptionIds.indexOf(this.menu.current) - 1;
              if (prev === -1) return this.highlightLastOption();
              this.setCurrentHighlightedOption(
                this.getNode(this.visibleOptionIds[prev])
              );
            },
            highlightNextOption: function highlightNextOption() {
              if (!this.hasVisibleOptions) return;
              var next = this.visibleOptionIds.indexOf(this.menu.current) + 1;
              if (next === this.visibleOptionIds.length)
                return this.highlightFirstOption();
              this.setCurrentHighlightedOption(
                this.getNode(this.visibleOptionIds[next])
              );
            },
            highlightLastOption: function highlightLastOption() {
              if (!this.hasVisibleOptions) return;
              var last = last_default()(this.visibleOptionIds);
              this.setCurrentHighlightedOption(this.getNode(last));
            },
            resetSearchQuery: function resetSearchQuery() {
              this.trigger.searchQuery = "";
            },
            closeMenu: function closeMenu() {
              if (!this.menu.isOpen || (!this.disabled && this.alwaysOpen))
                return;
              this.saveMenuScrollPosition();
              this.menu.isOpen = false;
              this.toggleClickOutsideEvent(false);
              this.resetSearchQuery();
              this.$emit("close", this.getValue(), this.getInstanceId());
            },
            openMenu: function openMenu() {
              if (this.disabled || this.menu.isOpen) return;
              this.menu.isOpen = true;
              this.$nextTick(this.resetHighlightedOptionWhenNecessary);
              this.$nextTick(this.restoreMenuScrollPosition);
              if (!this.options && !this.async) this.loadRootOptions();
              console.log(this.minChar);
              if (this.minChar == 0 && this.async) this.handleRemoteSearch();
              this.toggleClickOutsideEvent(true);
              this.$emit("open", this.getInstanceId());
            },
            toggleMenu: function toggleMenu() {
              if (this.menu.isOpen) {
                this.closeMenu();
              } else {
                this.openMenu();
              }
            },
            toggleExpanded: function toggleExpanded(node) {
              var nextState;
              if (this.localSearch.active) {
                nextState = node.isExpandedOnSearch = !node.isExpandedOnSearch;
                if (nextState) node.showAllChildrenOnSearch = true;
              } else {
                nextState = node.isExpanded = !node.isExpanded;
              }
              if (nextState && !node.childrenStates.isLoaded) {
                this.loadChildrenOptions(node);
              }
            },
            buildForestState: function buildForestState() {
              var _this15 = this;
              var selectedNodeMap = createMap();
              this.forest.selectedNodeIds.forEach(function (selectedNodeId) {
                selectedNodeMap[selectedNodeId] = true;
              });
              this.forest.selectedNodeMap = selectedNodeMap;
              var checkedStateMap = createMap();
              if (this.multiple) {
                this.traverseAllNodesByIndex(function (node) {
                  checkedStateMap[node.id] = UNCHECKED;
                });
                this.selectedNodes.forEach(function (selectedNode) {
                  checkedStateMap[selectedNode.id] = CHECKED;
                  if (!_this15.flat && !_this15.disableBranchNodes) {
                    selectedNode.ancestors.forEach(function (ancestorNode) {
                      if (!_this15.isSelected(ancestorNode)) {
                        checkedStateMap[ancestorNode.id] = INDETERMINATE;
                      }
                    });
                  }
                });
              }
              this.forest.checkedStateMap = checkedStateMap;
            },
            enhancedNormalizer: function enhancedNormalizer(raw) {
              return _objectSpread2(
                _objectSpread2({}, raw),
                this.normalizer(raw, this.getInstanceId())
              );
            },
            normalize: function normalize(parentNode, nodes, prevNodeMap) {
              var _this16 = this;
              var normalizedOptions = nodes
                .map(function (node) {
                  return [_this16.enhancedNormalizer(node), node];
                })
                .map(function (_ref, index) {
                  var _ref2 = _slicedToArray(_ref, 2),
                    node = _ref2[0],
                    raw = _ref2[1];
                  _this16.checkDuplication(node);
                  _this16.verifyNodeShape(node);
                  var id = node.id,
                    label = node.label,
                    children = node.children,
                    isDefaultExpanded = node.isDefaultExpanded,
                    canSelectChildrenEvenIfDisabled =
                      node.canSelectChildrenEvenIfDisabled;
                  var isRootNode = parentNode === NO_PARENT_NODE;
                  var level = isRootNode ? 0 : parentNode.level + 1;
                  var isBranch = Array.isArray(children) || children === null;
                  var isLeaf = !isBranch;
                  var isDisabled =
                    !!node.isDisabled ||
                    (!_this16.flat &&
                      !isRootNode &&
                      parentNode.isDisabled &&
                      !parentNode.canSelectChildrenEvenIfDisabled);
                  var isNew = !!node.isNew;
                  var lowerCased = _this16.matchKeys.reduce(function (
                    prev,
                    key
                  ) {
                    return _objectSpread2(
                      _objectSpread2({}, prev),
                      {},
                      _defineProperty(
                        {},
                        key,
                        stringifyOptionPropValue(node[key]).toLocaleLowerCase()
                      )
                    );
                  },
                  {});
                  var nestedSearchLabel = isRootNode
                    ? lowerCased.label
                    : parentNode.nestedSearchLabel + " " + lowerCased.label;

                  // this.$ set(this.forest.nodeMap, id, createMap())
                  _this16.forest.nodeMap[id] = createMap();
                  var normalized = _this16.forest.nodeMap[id];
                  normalized.id = id;
                  normalized.label = label;
                  normalized.level = level;
                  normalized.ancestors = isRootNode
                    ? []
                    : [parentNode].concat(parentNode.ancestors);
                  normalized.index = (
                    isRootNode ? [] : parentNode.index
                  ).concat(index);
                  normalized.parentNode = parentNode;
                  normalized.lowerCased = lowerCased;
                  normalized.nestedSearchLabel = nestedSearchLabel;
                  normalized.isDisabled = isDisabled;
                  normalized.canSelectChildrenEvenIfDisabled =
                    canSelectChildrenEvenIfDisabled;
                  normalized.isNew = isNew;
                  normalized.isMatched = false;
                  normalized.isHighlighted = false;
                  normalized.isBranch = isBranch;
                  normalized.isLeaf = isLeaf;
                  normalized.isRootNode = isRootNode;
                  normalized.raw = raw;

                  // this.$ set(normalized, 'id', id)
                  // this.$ set(normalized, 'label', label)
                  // this.$ set(normalized, 'level', level)
                  // this.$ set(normalized, 'ancestors', isRootNode ? [] : [ parentNode ].concat(parentNode.ancestors))
                  // this.$ set(normalized, 'index', (isRootNode ? [] : parentNode.index).concat(index))
                  // this.$ set(normalized, 'parentNode', parentNode)
                  // this.$ set(normalized, 'lowerCased', lowerCased)
                  // this.$ set(normalized, 'nestedSearchLabel', nestedSearchLabel)
                  // this.$ set(normalized, 'isDisabled', isDisabled)
                  // this.$ set(normalized, 'isNew', isNew)
                  // this.$ set(normalized, 'isMatched', false)
                  // this.$ set(normalized, 'isHighlighted', false)
                  // this.$ set(normalized, 'isBranch', isBranch)
                  // this.$ set(normalized, 'isLeaf', isLeaf)
                  // this.$ set(normalized, 'isRootNode', isRootNode)
                  // this.$ set(normalized, 'raw', raw)

                  if (isBranch) {
                    var _normalized$count;
                    var isLoaded = Array.isArray(children);

                    // this.$ set(normalized, 'childrenStates', {
                    //   ...createAsyncOptionsStates(),
                    //   isLoaded,
                    // })
                    normalized.childrenStates = _objectSpread2(
                      _objectSpread2({}, createAsyncOptionsStates()),
                      {},
                      {
                        isLoaded: isLoaded,
                      }
                    );

                    // this.$ set(normalized, 'isExpanded', typeof isDefaultExpanded === 'boolean'
                    //   ? isDefaultExpanded
                    //   : level < this.defaultExpandLevel)
                    normalized.isExpanded =
                      typeof isDefaultExpanded === "boolean"
                        ? isDefaultExpanded
                        : level < _this16.defaultExpandLevel;

                    // this.$ set(normalized, 'hasMatchedDescendants', false)
                    // this.$ set(normalized, 'hasDisabledDescendants', false)
                    // this.$ set(normalized, 'isExpandedOnSearch', false)
                    // this.$ set(normalized, 'showAllChildrenOnSearch', false)
                    // this.$ set(normalized, 'count', {
                    //   [ALL_CHILDREN]: 0,
                    //   [ALL_DESCENDANTS]: 0,
                    //   [LEAF_CHILDREN]: 0,
                    //   [LEAF_DESCENDANTS]: 0,
                    // })
                    // this.$ set(normalized, 'children', isLoaded
                    //   ? this.normalize(normalized, children, prevNodeMap)
                    //   : [])
                    normalized.hasMatchedDescendants = false;
                    normalized.hasDisabledDescendants = false;
                    normalized.isExpandedOnSearch = false;
                    normalized.showAllChildrenOnSearch = false;
                    normalized.count =
                      ((_normalized$count = {}),
                      _defineProperty(_normalized$count, ALL_CHILDREN, 0),
                      _defineProperty(_normalized$count, ALL_DESCENDANTS, 0),
                      _defineProperty(_normalized$count, LEAF_CHILDREN, 0),
                      _defineProperty(_normalized$count, LEAF_DESCENDANTS, 0),
                      _normalized$count);

                    // this.$ set(normalized, 'children', isLoaded
                    //   ? this.normalize(normalized, children, prevNodeMap)
                    //   : [])
                    normalized.children = isLoaded
                      ? _this16.normalize(normalized, children, prevNodeMap)
                      : [];
                    if (isDefaultExpanded === true)
                      normalized.ancestors.forEach(function (ancestor) {
                        ancestor.isExpanded = true;
                      });
                    if (
                      !isLoaded &&
                      typeof _this16.loadOptions !== "function"
                    ) {
                      warning(
                        function () {
                          return false;
                        },
                        function () {
                          return 'Unloaded branch node detected. "loadOptions" prop is required to load its children.';
                        }
                      );
                    } else if (!isLoaded && normalized.isExpanded) {
                      _this16.loadChildrenOptions(normalized);
                    }
                  }
                  normalized.ancestors.forEach(function (ancestor) {
                    return ancestor.count[ALL_DESCENDANTS]++;
                  });
                  if (isLeaf)
                    normalized.ancestors.forEach(function (ancestor) {
                      return ancestor.count[LEAF_DESCENDANTS]++;
                    });
                  if (!isRootNode) {
                    parentNode.count[ALL_CHILDREN] += 1;
                    if (isLeaf) parentNode.count[LEAF_CHILDREN] += 1;
                    if (isDisabled) parentNode.hasDisabledDescendants = true;
                  }

                  // Preserve previous states.
                  if (prevNodeMap && prevNodeMap[id]) {
                    var prev = prevNodeMap[id];
                    normalized.isMatched = prev.isMatched;
                    normalized.showAllChildrenOnSearch =
                      prev.showAllChildrenOnSearch;
                    normalized.isHighlighted = prev.isHighlighted;
                    if (prev.isBranch && normalized.isBranch) {
                      normalized.isExpanded = prev.isExpanded;
                      normalized.isExpandedOnSearch = prev.isExpandedOnSearch;
                      // #97
                      // If `isLoaded` was true, but IS NOT now, we consider this branch node
                      // to be reset to unloaded state by the user of this component.
                      if (
                        prev.childrenStates.isLoaded &&
                        !normalized.childrenStates.isLoaded
                      ) {
                        // Make sure the node is collapsed, then the user can load its
                        // children again (by expanding).
                        normalized.isExpanded = false;
                        // We have reset `childrenStates` and don't want to preserve states here.
                      } else {
                        normalized.childrenStates = _objectSpread2(
                          {},
                          prev.childrenStates
                        );
                      }
                    }
                  }
                  return normalized;
                });
              if (this.branchNodesFirst) {
                var branchNodes = normalizedOptions.filter(function (option) {
                  return option.isBranch;
                });
                var leafNodes = normalizedOptions.filter(function (option) {
                  return option.isLeaf;
                });
                normalizedOptions = branchNodes.concat(leafNodes);
              }
              return normalizedOptions;
            },
            loadRootOptions: function loadRootOptions() {
              var _this17 = this;
              this.callLoadOptionsProp({
                action: LOAD_ROOT_OPTIONS,
                isPending: function isPending() {
                  return _this17.rootOptionsStates.isLoading;
                },
                start: function start() {
                  _this17.rootOptionsStates.isLoading = true;
                  _this17.rootOptionsStates.loadingError = "";
                },
                succeed: function succeed() {
                  _this17.rootOptionsStates.isLoaded = true;
                  // Wait for `options` being re-initialized.
                  _this17.$nextTick(function () {
                    _this17.resetHighlightedOptionWhenNecessary(true);
                  });
                },
                fail: function fail(err) {
                  _this17.rootOptionsStates.loadingError = getErrorMessage(err);
                },
                end: function end() {
                  _this17.rootOptionsStates.isLoading = false;
                },
              });
            },
            loadChildrenOptions: function loadChildrenOptions(parentNode) {
              var _this18 = this;
              // The options may be re-initialized anytime during the loading process.
              // So `parentNode` can be stale and we use `getNode()` to avoid that.

              var id = parentNode.id,
                raw = parentNode.raw;
              this.callLoadOptionsProp({
                action: LOAD_CHILDREN_OPTIONS,
                args: {
                  // We always pass the raw node instead of the normalized node to any
                  // callback provided by the user of this component.
                  // Because the shape of the raw node is more likely to be closing to
                  // what the back-end API service of the application needs.
                  parentNode: raw,
                },
                isPending: function isPending() {
                  return _this18.getNode(id).childrenStates.isLoading;
                },
                start: function start() {
                  _this18.getNode(id).childrenStates.isLoading = true;
                  _this18.getNode(id).childrenStates.loadingError = "";
                },
                succeed: function succeed() {
                  _this18.getNode(id).childrenStates.isLoaded = true;
                },
                fail: function fail(err) {
                  _this18.getNode(id).childrenStates.loadingError =
                    getErrorMessage(err);
                },
                end: function end() {
                  _this18.getNode(id).childrenStates.isLoading = false;
                },
              });
            },
            callLoadOptionsProp: function callLoadOptionsProp(_ref3) {
              var action = _ref3.action,
                args = _ref3.args,
                isPending = _ref3.isPending,
                start = _ref3.start,
                succeed = _ref3.succeed,
                fail = _ref3.fail,
                end = _ref3.end;
              if (!this.loadOptions || isPending()) {
                return;
              }
              start();
              var callback = once_default()(function (err, result) {
                if (err) {
                  fail(err);
                } else {
                  succeed(result);
                }
                end();
              });
              var result = this.loadOptions(
                _objectSpread2(
                  _objectSpread2(
                    {
                      id: this.getInstanceId(),
                      instanceId: this.getInstanceId(),
                      action: action,
                    },
                    args
                  ),
                  {},
                  {
                    callback: callback,
                  }
                )
              );
              if (isPromise(result)) {
                result
                  .then(
                    function () {
                      callback();
                    },
                    function (err) {
                      callback(err);
                    }
                  )
                  .catch(function (err) {
                    // istanbul ignore next
                    console.error(err);
                  });
              }
            },
            checkDuplication: function checkDuplication(node) {
              var _this19 = this;
              warning(
                function () {
                  return !(
                    node.id in _this19.forest.nodeMap &&
                    !_this19.forest.nodeMap[node.id].isFallbackNode
                  );
                },
                function () {
                  return (
                    "Detected duplicate presence of node id ".concat(
                      JSON.stringify(node.id),
                      ". "
                    ) +
                    'Their labels are "'
                      .concat(_this19.forest.nodeMap[node.id].label, '" and "')
                      .concat(node.label, '" respectively.')
                  );
                }
              );
            },
            verifyNodeShape: function verifyNodeShape(node) {
              warning(
                function () {
                  return !(
                    node.children === undefined && node.isBranch === true
                  );
                },
                function () {
                  return (
                    "Are you meant to declare an unloaded branch node? " +
                    "`isBranch: true` is no longer supported, please use `children: null` instead."
                  );
                }
              );
            },
            select: function select(node) {
              if (this.disabled || node.isDisabled) {
                return;
              }
              if (this.single) {
                this.clear();
              }
              var nextState =
                this.multiple && !this.flat
                  ? this.forest.checkedStateMap[node.id] === UNCHECKED
                  : !this.isSelected(node);
              if (nextState) {
                this._selectNode(node);
              } else {
                this._deselectNode(node);
              }
              this.buildForestState();
              if (nextState) {
                this.$emit("select", node.raw, this.getInstanceId());
              } else {
                this.$emit("deselect", node.raw, this.getInstanceId());
              }
              if (
                this.localSearch.active &&
                nextState &&
                (this.single || this.clearOnSelect)
              ) {
                this.resetSearchQuery();
              }
              if (this.single && this.closeOnSelect) {
                this.closeMenu();

                // istanbul ignore else
                if (this.searchable) {
                  this._blurOnSelect = true;
                }
              }
            },
            clear: function clear() {
              var _this20 = this;
              if (this.hasValue) {
                if (this.single || this.allowClearingDisabled) {
                  this.forest.selectedNodeIds = [];
                } /* if (this.multiple && !this.allowClearingDisabled) */ else {
                  this.forest.selectedNodeIds =
                    this.forest.selectedNodeIds.filter(function (nodeId) {
                      return _this20.getNode(nodeId).isDisabled;
                    });
                }
                this.buildForestState();
              }
            },
            // This is meant to be called only by `select()`.
            _selectNode: function _selectNode(node) {
              var _this21 = this;
              if (this.single || this.disableBranchNodes) {
                return this.addValue(node);
              }
              if (this.flat) {
                this.addValue(node);
                if (this.autoSelectAncestors) {
                  node.ancestors.forEach(function (ancestor) {
                    if (!_this21.isSelected(ancestor) && !ancestor.isDisabled)
                      _this21.addValue(ancestor);
                  });
                } else if (this.autoSelectDescendants) {
                  this.traverseDescendantsBFS(node, function (descendant) {
                    if (
                      !_this21.isSelected(descendant) &&
                      !descendant.isDisabled
                    )
                      _this21.addValue(descendant);
                  });
                }
                return;
              }
              var isFullyChecked =
                node.isLeaf ||
                /* node.isBranch && */ !node.hasDisabledDescendants ||
                /* node.isBranch && */ this.allowSelectingDisabledDescendants;
              if (isFullyChecked) {
                this.addValue(node);
              }
              if (node.isBranch) {
                this.traverseDescendantsBFS(node, function (descendant) {
                  if (
                    !descendant.isDisabled ||
                    _this21.allowSelectingDisabledDescendants
                  ) {
                    _this21.addValue(descendant);
                  }
                });
              }
              if (isFullyChecked) {
                var curr = node;
                while ((curr = curr.parentNode) !== NO_PARENT_NODE) {
                  if (curr.children.every(this.isSelected) && !curr.isDisabled)
                    this.addValue(curr);
                  else break;
                }
              }
            },
            // This is meant to be called only by `select()`.
            _deselectNode: function _deselectNode(node) {
              var _this22 = this;
              if (this.disableBranchNodes) {
                return this.removeValue(node);
              }
              if (this.flat) {
                this.removeValue(node);
                if (this.autoDeselectAncestors) {
                  node.ancestors.forEach(function (ancestor) {
                    if (_this22.isSelected(ancestor) && !ancestor.isDisabled)
                      _this22.removeValue(ancestor);
                  });
                } else if (this.autoDeselectDescendants) {
                  this.traverseDescendantsBFS(node, function (descendant) {
                    if (
                      _this22.isSelected(descendant) &&
                      !descendant.isDisabled
                    )
                      _this22.removeValue(descendant);
                  });
                }
                return;
              }
              var hasUncheckedSomeDescendants = false;
              if (node.isBranch) {
                this.traverseDescendantsDFS(node, function (descendant) {
                  if (
                    !descendant.isDisabled ||
                    _this22.allowSelectingDisabledDescendants
                  ) {
                    _this22.removeValue(descendant);
                    hasUncheckedSomeDescendants = true;
                  }
                });
              }
              if (
                node.isLeaf ||
                /* node.isBranch && */ hasUncheckedSomeDescendants ||
                /* node.isBranch && */ node.children.length === 0
              ) {
                this.removeValue(node);
                var curr = node;
                while ((curr = curr.parentNode) !== NO_PARENT_NODE) {
                  if (this.isSelected(curr)) this.removeValue(curr);
                  else break;
                }
              }
            },
            addValue: function addValue(node) {
              this.forest.selectedNodeIds.push(node.id);
              this.forest.selectedNodeMap[node.id] = true;
            },
            removeValue: function removeValue(node) {
              removeFromArray(this.forest.selectedNodeIds, node.id);
              delete this.forest.selectedNodeMap[node.id];
            },
            removeLastValue: function removeLastValue() {
              if (!this.hasValue) return;
              if (this.single) return this.clear();
              var lastValue = last_default()(this.internalValue);
              var lastSelectedNode = this.getNode(lastValue);
              this.select(lastSelectedNode); // deselect
            },
            saveMenuScrollPosition: function saveMenuScrollPosition() {
              var $menu = this.getMenu();
              // istanbul ignore else
              if ($menu) this.menu.lastScrollPosition = $menu.scrollTop;
            },
            restoreMenuScrollPosition: function restoreMenuScrollPosition() {
              var $menu = this.getMenu();
              // istanbul ignore else
              if ($menu) $menu.scrollTop = this.menu.lastScrollPosition;
            },
          },
          created: function created() {
            this.verifyProps();
            this.resetFlags();
          },
          mounted: function mounted() {
            if (this.autoFocus) this.focusInput();
            if (!this.options && !this.async && this.autoLoadRootOptions)
              this.loadRootOptions();
            if (this.alwaysOpen) this.openMenu();
            if (this.async && this.defaultOptions) this.handleRemoteSearch();
          },
          unmounted: function unmounted() {
            // istanbul ignore next
            this.toggleClickOutsideEvent(false);
          },
        };
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
        var es_array_join = __webpack_require__(9600); // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-85.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/HiddenFields.vue?vue&type=script&lang=js
        function stringifyValue(value) {
          if (typeof value === "string") return value;
          // istanbul ignore else
          if (value != null && !isNaN_isNaN(value))
            return JSON.stringify(value);
          // istanbul ignore next
          return "";
        }
        /* harmony default export */ var HiddenFieldsvue_type_script_lang_js =
          (0, external_commonjs_vue_commonjs2_vue_root_Vue_.defineComponent)({
            name: "vue-treeselect--hidden-fields",
            inject: ["instance"],
            functional: true,
            render: function render(context) {
              var instance = context.instance;
              if (!instance.name || instance.disabled || !instance.hasValue)
                return null;
              var stringifiedValues =
                instance.internalValue.map(stringifyValue);
              if (instance.multiple && instance.joinValues)
                stringifiedValues = [
                  stringifiedValues.join(instance.delimiter),
                ];
              return stringifiedValues.map(function (stringifiedValue, i) {
                return (0,
                external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                  "input",
                  {
                    type: "hidden",
                    name: instance.name,
                    value: stringifiedValue,
                    key: "hidden-field-" + i,
                  },
                  null
                );
              });
            },
          }); // CONCATENATED MODULE: ./src/components/HiddenFields.vue
        const __exports__ = HiddenFieldsvue_type_script_lang_js;

        /* harmony default export */ var HiddenFields = __exports__;
        // EXTERNAL MODULE: ./node_modules/lodash/debounce.js
        var debounce = __webpack_require__(3279);
        var debounce_default = /*#__PURE__*/ __webpack_require__.n(debounce);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-prototype-of.js
        var es_object_get_prototype_of = __webpack_require__(489);
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
        var es_object_keys = __webpack_require__(7941); // CONCATENATED MODULE: ./src/utils/deepExtend.js
        function isPlainObject(value) {
          if (value == null || _typeof(value) !== "object") return false;
          return Object.getPrototypeOf(value) === Object.prototype;
        }
        function copy(obj, key, value) {
          if (isPlainObject(value)) {
            obj[key] || (obj[key] = {});
            deepExtend(obj[key], value);
          } else {
            obj[key] = value;
          }
        }
        function deepExtend(target, source) {
          if (isPlainObject(source)) {
            var keys = Object.keys(source);
            for (var i = 0, len = keys.length; i < len; i++) {
              copy(target, keys[i], source[keys[i]]);
            }
          }
          return target;
        } // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-85.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Input.vue?vue&type=script&lang=js
        var keysThatRequireMenuBeingOpen = [
          KEY_CODES.ENTER,
          KEY_CODES.END,
          KEY_CODES.HOME,
          KEY_CODES.ARROW_LEFT,
          KEY_CODES.ARROW_UP,
          KEY_CODES.ARROW_RIGHT,
          KEY_CODES.ARROW_DOWN,
        ];
        /* harmony default export */ var Inputvue_type_script_lang_js = {
          name: "vue-treeselect--input",
          inject: ["instance"],
          data: function data() {
            return {
              inputWidth: MIN_INPUT_WIDTH,
              value: "",
            };
          },
          computed: {
            needAutoSize: function needAutoSize() {
              var instance = this.instance;
              return (
                instance.searchable && !instance.disabled && instance.multiple
              );
            },
            inputStyle: function inputStyle() {
              return {
                width: this.needAutoSize
                  ? "".concat(this.inputWidth, "px")
                  : null,
              };
            },
          },
          watch: {
            "instance.trigger.searchQuery": function instanceTriggerSearchQuery(
              newValue
            ) {
              this.value = newValue;
            },
            value: function value() {
              // istanbul ignore else
              if (this.needAutoSize) this.$nextTick(this.updateInputWidth);
            },
          },
          created: function created() {
            this.debouncedCallback = debounce_default()(
              this.updateSearchQuery,
              INPUT_DEBOUNCE_DELAY,
              {
                leading: true,
                trailing: true,
              }
            );
          },
          methods: {
            clear: function clear() {
              this.onInput({
                target: {
                  value: "",
                },
              });
            },
            focus: function focus() {
              var instance = this.instance;
              if (!instance.disabled) {
                this.$refs.input && this.$refs.input.focus();
              }
            },
            blur: function blur() {
              this.$refs.input && this.$refs.input.blur();
            },
            onFocus: function onFocus() {
              var instance = this.instance;
              instance.trigger.isFocused = true;
              // istanbul ignore else
              if (instance.openOnFocus) instance.openMenu();
            },
            onBlur: function onBlur() {
              var instance = this.instance;
              var menu = instance.getMenu();

              // #15
              // istanbul ignore next
              if (menu && document.activeElement === menu) {
                return this.focus();
              }
              instance.trigger.isFocused = false;
              instance.closeMenu();
            },
            onInput: function onInput(evt) {
              var value = evt.target.value;
              this.value = value;
              if (value) {
                this.debouncedCallback();
              } else {
                this.debouncedCallback.cancel();
                this.updateSearchQuery();
              }
            },
            // 用 keyUp 事件存在一个问题，删除输入框最后一个字符也会导致取消选中最后一项
            onKeyDown: function onKeyDown(evt) {
              var instance = this.instance;
              // https://css-tricks.com/snippets/javascript/javascript-keycodes/
              // https://stackoverflow.com/questions/4471582/javascript-keycode-vs-which
              var key =
                "which" in evt
                  ? evt.which
                  : /* istanbul ignore next */ evt.keyCode;
              if (evt.ctrlKey || evt.shiftKey || evt.altKey || evt.metaKey)
                return;
              if (
                !instance.menu.isOpen &&
                includes(keysThatRequireMenuBeingOpen, key)
              ) {
                evt.preventDefault();
                return instance.openMenu();
              }
              switch (key) {
                case KEY_CODES.BACKSPACE: {
                  if (instance.backspaceRemoves && !this.value.length) {
                    instance.removeLastValue();
                  }
                  break;
                }
                case KEY_CODES.ENTER: {
                  evt.preventDefault();
                  if (instance.menu.current === null) return;
                  var current = instance.getNode(instance.menu.current);
                  if (current.isBranch && instance.disableBranchNodes) return;
                  instance.select(current);
                  break;
                }
                case KEY_CODES.ESCAPE: {
                  if (this.value.length) {
                    this.clear();
                  } else if (instance.menu.isOpen) {
                    instance.closeMenu();
                  }
                  break;
                }
                case KEY_CODES.END: {
                  evt.preventDefault();
                  instance.highlightLastOption();
                  break;
                }
                case KEY_CODES.HOME: {
                  evt.preventDefault();
                  instance.highlightFirstOption();
                  break;
                }
                case KEY_CODES.ARROW_LEFT: {
                  var _current = instance.getNode(instance.menu.current);
                  if (_current.isBranch && instance.shouldExpand(_current)) {
                    evt.preventDefault();
                    instance.toggleExpanded(_current);
                  } else if (
                    !_current.isRootNode &&
                    (_current.isLeaf ||
                      (_current.isBranch && !instance.shouldExpand(_current)))
                  ) {
                    evt.preventDefault();
                    instance.setCurrentHighlightedOption(_current.parentNode);
                  }
                  break;
                }
                case KEY_CODES.ARROW_UP: {
                  evt.preventDefault();
                  instance.highlightPrevOption();
                  break;
                }
                case KEY_CODES.ARROW_RIGHT: {
                  var _current2 = instance.getNode(instance.menu.current);
                  if (_current2.isBranch && !instance.shouldExpand(_current2)) {
                    evt.preventDefault();
                    instance.toggleExpanded(_current2);
                  }
                  break;
                }
                case KEY_CODES.ARROW_DOWN: {
                  evt.preventDefault();
                  instance.highlightNextOption();
                  break;
                }
                case KEY_CODES.DELETE: {
                  if (instance.deleteRemoves && !this.value.length) {
                    instance.removeLastValue();
                  }
                  break;
                }
                default: {
                  // istanbul ignore else
                  instance.openMenu();
                }
              }
            },
            onMouseDown: function onMouseDown(evt) {
              // istanbul ignore next
              if (this.value.length) {
                // Prevent it from bubbling to the top level and triggering `preventDefault()`
                // to make the textbox unselectable
                evt.stopPropagation();
              }
            },
            renderInputContainer: function renderInputContainer() {
              var instance = this.instance;
              var props = {};
              var children = [];
              if (instance.searchable && !instance.disabled) {
                children.push(this.renderInput());
                if (this.needAutoSize) children.push(this.renderSizer());
              }
              if (!instance.searchable) {
                deepExtend(props, {
                  on: {
                    focus: this.onFocus,
                    blur: this.onBlur,
                    keydown: this.onKeyDown,
                  },
                  ref: "input",
                });
              }
              if (!instance.searchable && !instance.disabled) {
                deepExtend(props, {
                  attrs: {
                    tabIndex: instance.tabIndex,
                  },
                });
              }
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                "div",
                (0, external_commonjs_vue_commonjs2_vue_root_Vue_.mergeProps)(
                  {
                    class: "vue-treeselect__input-container",
                  },
                  props
                ),
                [children]
              );
            },
            renderInput: function renderInput() {
              var instance = this.instance;
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                "input",
                {
                  ref: "input",
                  class: "vue-treeselect__input",
                  type: "text",
                  autocomplete: "off",
                  tabIndex: instance.tabIndex,
                  required: instance.required && !instance.hasValue,
                  value: this.value,
                  style: this.inputStyle,
                  onFocus: this.onFocus,
                  onInput: this.onInput,
                  onBlur: this.onBlur,
                  onKeydown: this.onKeyDown,
                  onMousedown: this.onMouseDown,
                },
                null
              );
            },
            renderSizer: function renderSizer() {
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                "div",
                {
                  ref: "sizer",
                  class: "vue-treeselect__sizer",
                },
                [this.value]
              );
            },
            updateInputWidth: function updateInputWidth() {
              this.inputWidth = Math.max(
                MIN_INPUT_WIDTH,
                this.$refs.sizer.scrollWidth + 15
              );
            },
            updateSearchQuery: function updateSearchQuery() {
              var instance = this.instance;
              instance.trigger.searchQuery = this.value;
            },
          },
          render: function render() {
            return this.renderInputContainer();
          },
        }; // CONCATENATED MODULE: ./src/components/Input.vue
        const Input_exports_ = Inputvue_type_script_lang_js;

        /* harmony default export */ var Input = Input_exports_; // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-85.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Placeholder.vue?vue&type=script&lang=js
        /* harmony default export */ var Placeholdervue_type_script_lang_js = {
          name: "vue-treeselect--placeholder",
          inject: ["instance"],
          render: function render() {
            var instance = this.instance;
            var placeholderClass = {
              "vue-treeselect__placeholder": true,
              "vue-treeselect-helper-zoom-effect-off": true,
              "vue-treeselect-helper-hide":
                instance.hasValue || instance.trigger.searchQuery,
            };
            return (0,
            external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
              "div",
              {
                class: placeholderClass,
              },
              [instance.placeholder]
            );
          },
        }; // CONCATENATED MODULE: ./src/components/Placeholder.vue
        const Placeholder_exports_ = Placeholdervue_type_script_lang_js;

        /* harmony default export */ var Placeholder = Placeholder_exports_; // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-85.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/SingleValue.vue?vue&type=script&lang=js
        /* harmony default export */ var SingleValuevue_type_script_lang_js = {
          name: "vue-treeselect--single-value",
          inject: ["instance"],
          methods: {
            renderSingleValueLabel: function renderSingleValueLabel() {
              var instance = this.instance;
              var node = instance.selectedNodes[0];
              var customValueLabelRenderer = instance.$slots["value-label"];
              return customValueLabelRenderer
                ? customValueLabelRenderer({
                    node: node,
                  })
                : node.label;
            },
          },
          render: function render() {
            var instance = this.instance,
              renderValueContainer = this.$parent.renderValueContainer;
            var shouldShowValue =
              instance.hasValue && !instance.trigger.searchQuery;
            return renderValueContainer([
              shouldShowValue &&
                (0, external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                  "div",
                  {
                    class: "vue-treeselect__single-value",
                  },
                  [this.renderSingleValueLabel()]
                ),
              (0, external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                Placeholder,
                null,
                null
              ),
              (0, external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                Input,
                {
                  ref: "input",
                },
                null
              ),
            ]);
          },
        }; // CONCATENATED MODULE: ./src/components/SingleValue.vue
        const SingleValue_exports_ = SingleValuevue_type_script_lang_js;

        /* harmony default export */ var SingleValue = SingleValue_exports_; // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-85.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/icons/Delete.vue?vue&type=template&id=12b4a02e
        var _hoisted_1 = {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 348.333 348.333",
        };
        var _hoisted_2 = /*#__PURE__*/ (0,
        external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)(
          "path",
          {
            d: "M336.559 68.611L231.016 174.165l105.543 105.549c15.699 15.705 15.699 41.145 0 56.85-7.844 7.844-18.128 11.769-28.407 11.769-10.296 0-20.581-3.919-28.419-11.769L174.167 231.003 68.609 336.563c-7.843 7.844-18.128 11.769-28.416 11.769-10.285 0-20.563-3.919-28.413-11.769-15.699-15.698-15.699-41.139 0-56.85l105.54-105.549L11.774 68.611c-15.699-15.699-15.699-41.145 0-56.844 15.696-15.687 41.127-15.687 56.829 0l105.563 105.554L279.721 11.767c15.705-15.687 41.139-15.687 56.832 0 15.705 15.699 15.705 41.145.006 56.844z",
          },
          null,
          -1
        );
        var _hoisted_3 = [_hoisted_2];
        function Deletevue_type_template_id_12b4a02e_render(
          _ctx,
          _cache,
          $props,
          $setup,
          $data,
          $options
        ) {
          return (
            (0, external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(),
            (0,
            external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(
              "svg",
              _hoisted_1,
              _hoisted_3
            )
          );
        } // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-85.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/icons/Delete.vue?vue&type=script&lang=js
        /* harmony default export */ var Deletevue_type_script_lang_js = {
          name: "vue-treeselect--x",
        };
        // EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
        var exportHelper = __webpack_require__(3744); // CONCATENATED MODULE: ./src/components/icons/Delete.vue
        const Delete_exports_ = /*#__PURE__*/ (0, exportHelper /* default */.Z)(
          Deletevue_type_script_lang_js,
          [["render", Deletevue_type_template_id_12b4a02e_render]]
        );

        /* harmony default export */ var Delete = Delete_exports_; // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-85.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/MultiValueItem.vue?vue&type=script&lang=js
        /* harmony default export */ var MultiValueItemvue_type_script_lang_js =
          {
            name: "vue-treeselect--multi-value-item",
            inject: ["instance"],
            props: {
              node: {
                type: Object,
                required: true,
              },
            },
            methods: {
              handleMouseDown: onLeftClick(function handleMouseDown() {
                var instance = this.instance,
                  node = this.node;

                // Deselect this node.
                instance.select(node);
              }),
            },
            render: function render() {
              var instance = this.instance,
                node = this.node;
              var itemClass = {
                "vue-treeselect__multi-value-item": true,
                "vue-treeselect__multi-value-item-disabled": node.isDisabled,
                "vue-treeselect__multi-value-item-new": node.isNew,
              };
              var customValueLabelRenderer = instance.$slots["value-label"];
              var labelRenderer = customValueLabelRenderer
                ? customValueLabelRenderer({
                    node: node,
                  })
                : node.label;
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                "div",
                {
                  class: "vue-treeselect__multi-value-item-container",
                },
                [
                  (0,
                  external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                    "div",
                    {
                      class: itemClass,
                      onMousedown: this.handleMouseDown,
                    },
                    [
                      (0,
                      external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                        "span",
                        {
                          class: "vue-treeselect__multi-value-label",
                        },
                        [labelRenderer]
                      ),
                      (0,
                      external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                        "span",
                        {
                          class:
                            "vue-treeselect__icon vue-treeselect__value-remove",
                        },
                        [
                          (0,
                          external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                            Delete,
                            null,
                            null
                          ),
                        ]
                      ),
                    ]
                  ),
                ]
              );
            },
          }; // CONCATENATED MODULE: ./src/components/MultiValueItem.vue
        const MultiValueItem_exports_ = MultiValueItemvue_type_script_lang_js;

        /* harmony default export */ var MultiValueItem =
          MultiValueItem_exports_; // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-85.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/MultiValue.vue?vue&type=script&lang=js
        /* harmony default export */ var MultiValuevue_type_script_lang_js = {
          name: "vue-treeselect--multi-value",
          inject: ["instance"],
          components: [
            external_commonjs_vue_commonjs2_vue_root_Vue_.TransitionGroup,
          ],
          methods: {
            renderMultiValueItems: function renderMultiValueItems() {
              var instance = this.instance;
              return instance.internalValue
                .slice(0, instance.limit)
                .map(instance.getNode)
                .map(function (node) {
                  return (0,
                  external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                    MultiValueItem,
                    {
                      key: "multi-value-item-".concat(node.id),
                      node: node,
                    },
                    null
                  );
                });
            },
            renderExceedLimitTip: function renderExceedLimitTip() {
              var instance = this.instance;
              var count = instance.internalValue.length - instance.limit;
              if (count <= 0) return null;
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                "div",
                {
                  class:
                    "vue-treeselect__limit-tip vue-treeselect-helper-zoom-effect-off",
                  key: "exceed-limit-tip",
                },
                [
                  (0,
                  external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                    "span",
                    {
                      class: "vue-treeselect__limit-tip-text",
                    },
                    [instance.limitText(count)]
                  ),
                ]
              );
            },
          },
          render: function render() {
            var _this = this;

            var renderValueContainer = this.$parent.renderValueContainer;
            // const transitionGroupProps = {
            //   props: {
            //     tag: 'div',
            //     name: 'vue-treeselect__multi-value-item--transition',
            //     appear: true,
            //   },
            // }

            return renderValueContainer(
              (0, external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                external_commonjs_vue_commonjs2_vue_root_Vue_.TransitionGroup,
                {
                  class: "vue-treeselect__multi-value",
                  tag: "div",
                  name: "vue-treeselect__multi-value-item--transition",
                  appear: true,
                },
                {
                  default: function _default() {
                    return [
                      _this.renderMultiValueItems(),
                      _this.renderExceedLimitTip(),
                      (0,
                      external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                        Placeholder,
                        {
                          key: "placeholder",
                        },
                        null
                      ),
                      (0,
                      external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                        Input,
                        {
                          ref: "input",
                          key: "input",
                        },
                        null
                      ),
                    ];
                  },
                }
              )
            );
          },
        }; // CONCATENATED MODULE: ./src/components/MultiValue.vue
        const MultiValue_exports_ = MultiValuevue_type_script_lang_js;

        /* harmony default export */ var MultiValue = MultiValue_exports_; // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-85.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/icons/Arrow.vue?vue&type=template&id=5d5151cb
        var Arrowvue_type_template_id_5d5151cb_hoisted_1 = {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 292.362 292.362",
        };
        var Arrowvue_type_template_id_5d5151cb_hoisted_2 = /*#__PURE__*/ (0,
        external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)(
          "path",
          {
            d: "M286.935 69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952 0-9.233 1.807-12.85 5.424C1.807 72.998 0 77.279 0 82.228c0 4.948 1.807 9.229 5.424 12.847l127.907 127.907c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428L286.935 95.074c3.613-3.617 5.427-7.898 5.427-12.847 0-4.948-1.814-9.229-5.427-12.85z",
          },
          null,
          -1
        );
        var Arrowvue_type_template_id_5d5151cb_hoisted_3 = [
          Arrowvue_type_template_id_5d5151cb_hoisted_2,
        ];
        function Arrowvue_type_template_id_5d5151cb_render(
          _ctx,
          _cache,
          $props,
          $setup,
          $data,
          $options
        ) {
          return (
            (0, external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(),
            (0,
            external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(
              "svg",
              Arrowvue_type_template_id_5d5151cb_hoisted_1,
              Arrowvue_type_template_id_5d5151cb_hoisted_3
            )
          );
        } // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-85.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/icons/Arrow.vue?vue&type=script&lang=js
        /* harmony default export */ var Arrowvue_type_script_lang_js = {
          name: "vue-treeselect--arrow",
        }; // CONCATENATED MODULE: ./src/components/icons/Arrow.vue
        const Arrow_exports_ = /*#__PURE__*/ (0, exportHelper /* default */.Z)(
          Arrowvue_type_script_lang_js,
          [["render", Arrowvue_type_template_id_5d5151cb_render]]
        );

        /* harmony default export */ var Arrow = Arrow_exports_; // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-85.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Control.vue?vue&type=script&lang=js
        /* harmony default export */ var Controlvue_type_script_lang_js = {
          name: "vue-treeselect--control",
          inject: ["instance"],
          computed: {
            /* eslint-disable valid-jsdoc */
            /**
             * Should show the "×" button that resets value?
             * @return {boolean}
             */
            shouldShowX: function shouldShowX() {
              var instance = this.instance;
              return (
                instance.clearable &&
                !instance.disabled &&
                instance.hasValue &&
                (this.hasUndisabledValue || instance.allowClearingDisabled)
              );
            },
            /**
             * Should show the arrow button that toggles menu?
             * @return {boolean}
             */
            shouldShowArrow: function shouldShowArrow() {
              var instance = this.instance;
              if (!instance.alwaysOpen) return true;
              // Even with `alwaysOpen: true`, sometimes the menu is still closed,
              // e.g. when the control is disabled.
              return !instance.menu.isOpen;
            },
            /**
             * Has any undisabled option been selected?
             * @type {boolean}
             */
            hasUndisabledValue: function hasUndisabledValue() {
              var instance = this.instance;
              return (
                instance.hasValue &&
                instance.internalValue.some(function (id) {
                  return !instance.getNode(id).isDisabled;
                })
              );
            } /* eslint-enable valid-jsdoc */,
          },
          methods: {
            renderX: function renderX() {
              var instance = this.instance;
              var title = instance.multiple
                ? instance.clearAllText
                : instance.clearValueText;
              if (!this.shouldShowX) return null;
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                "div",
                {
                  class: "vue-treeselect__x-container",
                  title: title,
                  onMousedown: this.handleMouseDownOnX,
                },
                [
                  (0,
                  external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                    Delete,
                    {
                      class: "vue-treeselect__x",
                    },
                    null
                  ),
                ]
              );
            },
            renderArrow: function renderArrow() {
              var instance = this.instance;
              var arrowClass = {
                "vue-treeselect__control-arrow": true,
                "vue-treeselect__control-arrow--rotated": instance.menu.isOpen,
              };
              if (!this.shouldShowArrow) return null;
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                "div",
                {
                  class: "vue-treeselect__control-arrow-container",
                  onMousedown: this.handleMouseDownOnArrow,
                },
                [
                  (0,
                  external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                    Arrow,
                    {
                      class: arrowClass,
                    },
                    null
                  ),
                ]
              );
            },
            handleMouseDownOnX: onLeftClick(function handleMouseDownOnX(evt) {
              /**
               * We don't use async/await here because we don't want
               * to rely on Babel polyfill or regenerator runtime.
               * See: https://babeljs.io/docs/plugins/transform-regenerator/
               * We also don't want to assume there is a global `Promise`
               * class, since we are targeting to support IE9 without the
               * need of any polyfill.
               */

              evt.stopPropagation();
              evt.preventDefault();
              var instance = this.instance;
              var result = instance.beforeClearAll();
              var handler = function handler(shouldClear) {
                if (shouldClear) instance.clear();
              };
              if (isPromise(result)) {
                // The handler will be called async.
                result.then(handler);
              } else {
                // Keep the same behavior here.
                setTimeout(function () {
                  return handler(result);
                }, 0);
                // Also, note that IE9 requires:
                //   setTimeout(() => fn(...args), delay)
                // Instead of:
                //   setTimeout(fn, delay, ...args)
              }
            }),

            handleMouseDownOnArrow: onLeftClick(function handleMouseDownOnArrow(
              evt
            ) {
              evt.preventDefault();
              evt.stopPropagation();
              var instance = this.instance;

              // Focus the input or prevent blurring.
              instance.focusInput();
              instance.toggleMenu();
            }),
            // This is meant to be called by child `<Value />` component.
            renderValueContainer: function renderValueContainer(children) {
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                "div",
                {
                  class: "vue-treeselect__value-container",
                },
                [children]
              );
            },
          },
          render: function render() {
            var instance = this.instance;
            var ValueContainer = instance.single ? SingleValue : MultiValue;
            return (0,
            external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
              "div",
              {
                class: "vue-treeselect__control",
                onMousedown: instance.handleMouseDown,
              },
              [
                (0, external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                  ValueContainer,
                  {
                    ref: "value-container",
                  },
                  null
                ),
                this.renderX(),
                this.renderArrow(),
              ]
            );
          },
        }; // CONCATENATED MODULE: ./src/components/Control.vue
        const Control_exports_ = Controlvue_type_script_lang_js;

        /* harmony default export */ var Control = Control_exports_; // CONCATENATED MODULE: ./node_modules/watch-size/index.es.mjs
        var index = function (element, listener) {
          var expand = document.createElement("_");
          var shrink = expand.appendChild(document.createElement("_"));
          var expandChild = expand.appendChild(document.createElement("_"));
          var shrinkChild = shrink.appendChild(document.createElement("_"));

          var lastWidth = void 0,
            lastHeight = void 0;

          shrink.style.cssText = expand.style.cssText =
            "height:100%;left:0;opacity:0;overflow:hidden;pointer-events:none;position:absolute;top:0;transition:0s;width:100%;z-index:-1";
          shrinkChild.style.cssText = expandChild.style.cssText =
            "display:block;height:100%;transition:0s;width:100%";
          shrinkChild.style.width = shrinkChild.style.height = "200%";

          element.appendChild(expand);

          test();

          return stop;

          function test() {
            unbind();

            var width = element.offsetWidth;
            var height = element.offsetHeight;

            if (width !== lastWidth || height !== lastHeight) {
              lastWidth = width;
              lastHeight = height;

              expandChild.style.width = width * 2 + "px";
              expandChild.style.height = height * 2 + "px";

              expand.scrollLeft = expand.scrollWidth;
              expand.scrollTop = expand.scrollHeight;
              shrink.scrollLeft = shrink.scrollWidth;
              shrink.scrollTop = shrink.scrollHeight;

              listener({ width: width, height: height });
            }

            shrink.addEventListener("scroll", test);
            expand.addEventListener("scroll", test);
          }

          function unbind() {
            shrink.removeEventListener("scroll", test);
            expand.removeEventListener("scroll", test);
          }

          function stop() {
            unbind();

            element.removeChild(expand);
          }
        };

        /* harmony default export */ var index_es = index; // CONCATENATED MODULE: ./src/utils/watchSize.js

        var intervalId;
        var registered = [];
        var INTERVAL_DURATION = 100;
        function run() {
          intervalId = setInterval(function () {
            registered.forEach(test);
          }, INTERVAL_DURATION);
        }
        function stop() {
          clearInterval(intervalId);
          intervalId = null;
        }
        function test(item) {
          var $el = item.$el,
            listener = item.listener,
            lastWidth = item.lastWidth,
            lastHeight = item.lastHeight;
          var width = $el.offsetWidth;
          var height = $el.offsetHeight;
          if (lastWidth !== width || lastHeight !== height) {
            item.lastWidth = width;
            item.lastHeight = height;
            listener({
              width: width,
              height: height,
            });
          }
        }
        function watchSizeForIE9($el, listener) {
          var item = {
            $el: $el,
            listener: listener,
            lastWidth: null,
            lastHeight: null,
          };
          var unwatch = function unwatch() {
            removeFromArray(registered, item);
            if (!registered.length) stop();
          };
          registered.push(item);
          // The original watch-size will call the listener on initialization.
          // Keep the same behavior here.
          test(item);
          run();
          return unwatch;
        }
        function watchSize($el, listener) {
          // See: https://stackoverflow.com/a/31293352
          var isIE9 = document.documentMode === 9;
          // watch-size will call the listener on initialization.
          // Disable this behavior with a lock to achieve a clearer code logic.
          var locked = true;
          var wrappedListener = function wrappedListener() {
            return locked || listener.apply(void 0, arguments);
          };
          var implementation = isIE9 ? watchSizeForIE9 : index_es;
          var removeSizeWatcher = implementation($el, wrappedListener);
          locked = false; // unlock after initialization

          return removeSizeWatcher;
        }
        // EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.test.js
        var es_regexp_test = __webpack_require__(7601); // CONCATENATED MODULE: ./src/utils/setupResizeAndScrollEventListeners.js
        function findScrollParents($el) {
          var $scrollParents = [];
          var $parent = $el.parentNode;
          while (
            $parent &&
            $parent.nodeName !== "BODY" &&
            $parent.nodeType === document.ELEMENT_NODE
          ) {
            if (isScrollElment($parent)) $scrollParents.push($parent);
            $parent = $parent.parentNode;
          }
          $scrollParents.push(window);
          return $scrollParents;
        }
        function isScrollElment($el) {
          // Firefox wants us to check `-x` and `-y` variations as well
          var _getComputedStyle = getComputedStyle($el),
            overflow = _getComputedStyle.overflow,
            overflowX = _getComputedStyle.overflowX,
            overflowY = _getComputedStyle.overflowY;
          return /(auto|scroll|overlay)/.test(overflow + overflowY + overflowX);
        }
        function setupResizeAndScrollEventListeners($el, listener) {
          var $scrollParents = findScrollParents($el);
          window.addEventListener("resize", listener, {
            passive: true,
          });
          $scrollParents.forEach(function (scrollParent) {
            scrollParent.addEventListener("scroll", listener, {
              passive: true,
            });
          });
          return function removeEventListeners() {
            window.removeEventListener("resize", listener, {
              passive: true,
            });
            $scrollParents.forEach(function ($scrollParent) {
              $scrollParent.removeEventListener("scroll", listener, {
                passive: true,
              });
            });
          };
        } // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-85.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Tip.vue?vue&type=script&lang=js
        /* harmony default export */ var Tipvue_type_script_lang_js = (0,
        external_commonjs_vue_commonjs2_vue_root_Vue_.defineComponent)({
          name: "vue-treeselect--tip",
          functional: true,
          props: {
            type: {
              type: String,
              required: true,
            },
            icon: {
              type: String,
              required: true,
            },
          },
          render: function render(context) {
            var type = this.type,
              icon = this.icon;
            return (0,
            external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
              "div",
              {
                class: "vue-treeselect__tip vue-treeselect__".concat(
                  type,
                  "-tip"
                ),
              },
              [
                (0, external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                  "div",
                  {
                    class: "vue-treeselect__icon-container",
                  },
                  [
                    (0,
                    external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                      "span",
                      {
                        class: "vue-treeselect__icon-".concat(icon),
                      },
                      null
                    ),
                  ]
                ),
                (0, external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                  "span",
                  {
                    class: "vue-treeselect__tip-text vue-treeselect__".concat(
                      type,
                      "-tip-text"
                    ),
                  },
                  [this.$slots.default()]
                ),
              ]
            );
          },
        }); // CONCATENATED MODULE: ./src/components/Tip.vue
        const Tip_exports_ = Tipvue_type_script_lang_js;

        /* harmony default export */ var Tip = Tip_exports_; // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-85.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Option.vue?vue&type=script&lang=js
        function _isSlot(s) {
          return (
            typeof s === "function" ||
            (Object.prototype.toString.call(s) === "[object Object]" &&
              !(0, external_commonjs_vue_commonjs2_vue_root_Vue_.isVNode)(s))
          );
        }
        var arrowPlaceholder, checkMark, minusMark;
        var Option = {
          name: "vue-treeselect--option",
          inject: ["instance"],
          components: [
            external_commonjs_vue_commonjs2_vue_root_Vue_.Transition,
          ],
          props: {
            node: {
              type: Object,
              required: true,
            },
          },
          computed: {
            shouldExpand: function shouldExpand() {
              var instance = this.instance,
                node = this.node;
              return node.isBranch && instance.shouldExpand(node);
            },
            shouldShow: function shouldShow() {
              var instance = this.instance,
                node = this.node;
              return instance.shouldShowOptionInMenu(node);
            },
          },
          methods: {
            renderOption: function renderOption() {
              var instance = this.instance,
                node = this.node;
              var optionClass = {
                "vue-treeselect__option": true,
                "vue-treeselect__option--disabled": node.isDisabled,
                "vue-treeselect__option--selected": instance.isSelected(node),
                "vue-treeselect__option--highlight": node.isHighlighted,
                "vue-treeselect__option--matched":
                  instance.localSearch.active && node.isMatched,
                "vue-treeselect__option--hide": !this.shouldShow,
              };
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                "div",
                {
                  class: optionClass,
                  onMouseenter: this.handleMouseEnterOption,
                  "data-id": node.id,
                },
                [
                  this.renderArrow(),
                  this.renderLabelContainer([
                    this.renderCheckboxContainer([this.renderCheckbox()]),
                    this.renderLabel(),
                  ]),
                ]
              );
            },
            renderSubOptionsList: function renderSubOptionsList() {
              if (!this.shouldExpand) return null;
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                "div",
                {
                  class: "vue-treeselect__list",
                },
                [
                  this.renderSubOptions(),
                  this.renderNoChildrenTip(),
                  this.renderLoadingChildrenTip(),
                  this.renderLoadingChildrenErrorTip(),
                ]
              );
            },
            renderArrow: function renderArrow() {
              var instance = this.instance,
                node = this.node;
              if (instance.shouldFlattenOptions && this.shouldShow) return null;
              if (node.isBranch) {
                var arrowClass = {
                  "vue-treeselect__option-arrow": true,
                  "vue-treeselect__option-arrow--rotated": this.shouldExpand,
                };
                return (0,
                external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                  "div",
                  {
                    class: "vue-treeselect__option-arrow-container",
                    onMousedown: this.handleMouseDownOnArrow,
                  },
                  [
                    (0,
                    external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                      external_commonjs_vue_commonjs2_vue_root_Vue_.Transition,
                      {
                        name: "vue-treeselect__option-arrow--prepare",
                        appear: true,
                      },
                      {
                        default: function _default() {
                          return [
                            (0,
                            external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                              Arrow,
                              {
                                class: arrowClass,
                              },
                              null
                            ),
                          ];
                        },
                      }
                    ),
                  ]
                );
              }

              // For leaf nodes, we render a placeholder to keep its label aligned to
              // branch nodes. Unless there is no branch nodes at all (a normal
              // non-tree select).
              if (/*node.isLeaf && */ instance.hasBranchNodes) {
                if (!arrowPlaceholder)
                  arrowPlaceholder = (0,
                  external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                    "div",
                    {
                      class: "vue-treeselect__option-arrow-placeholder",
                    },
                    [
                      (0,
                      external_commonjs_vue_commonjs2_vue_root_Vue_.createTextVNode)(
                        "\xA0"
                      ),
                    ]
                  );
                return arrowPlaceholder;
              }
              return null;
            },
            renderLabelContainer: function renderLabelContainer(children) {
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                "div",
                {
                  class: "vue-treeselect__label-container",
                  onMousedown: this.handleMouseDownOnLabelContainer,
                },
                [children]
              );
            },
            renderCheckboxContainer: function renderCheckboxContainer(
              children
            ) {
              var instance = this.instance,
                node = this.node;
              if (instance.single) return null;
              if (instance.disableBranchNodes && node.isBranch) return null;
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                "div",
                {
                  class: "vue-treeselect__checkbox-container",
                },
                [children]
              );
            },
            renderCheckbox: function renderCheckbox() {
              var instance = this.instance,
                node = this.node;
              var checkedState = instance.forest.checkedStateMap[node.id];
              var checkboxClass = {
                "vue-treeselect__checkbox": true,
                "vue-treeselect__checkbox--checked": checkedState === CHECKED,
                "vue-treeselect__checkbox--indeterminate":
                  checkedState === INDETERMINATE,
                "vue-treeselect__checkbox--unchecked":
                  checkedState === UNCHECKED,
                "vue-treeselect__checkbox--disabled": node.isDisabled,
              };
              if (!checkMark)
                checkMark = (0,
                external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                  "span",
                  {
                    class: "vue-treeselect__check-mark",
                  },
                  null
                );
              if (!minusMark)
                minusMark = (0,
                external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                  "span",
                  {
                    class: "vue-treeselect__minus-mark",
                  },
                  null
                );
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                "span",
                {
                  class: checkboxClass,
                },
                [checkMark, minusMark]
              );
            },
            renderLabel: function renderLabel() {
              var instance = this.instance,
                node = this.node;
              var shouldShowCount =
                node.isBranch &&
                (instance.localSearch.active
                  ? instance.showCountOnSearchComputed
                  : instance.showCount);
              var count = shouldShowCount
                ? instance.localSearch.active
                  ? instance.localSearch.countMap[node.id][instance.showCountOf]
                  : node.count[instance.showCountOf]
                : NaN;
              var labelClassName = "vue-treeselect__label";
              var countClassName = "vue-treeselect__count";
              var customLabelRenderer = instance.$slots["option-label"];
              if (customLabelRenderer)
                return customLabelRenderer({
                  node: node,
                  shouldShowCount: shouldShowCount,
                  count: count,
                  labelClassName: labelClassName,
                  countClassName: countClassName,
                });
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                "label",
                {
                  class: labelClassName,
                },
                [
                  node.label,
                  shouldShowCount &&
                    (0,
                    external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                      "span",
                      {
                        class: countClassName,
                      },
                      [
                        (0,
                        external_commonjs_vue_commonjs2_vue_root_Vue_.createTextVNode)(
                          "("
                        ),
                        count,
                        (0,
                        external_commonjs_vue_commonjs2_vue_root_Vue_.createTextVNode)(
                          ")"
                        ),
                      ]
                    ),
                ]
              );
            },
            renderSubOptions: function renderSubOptions() {
              var node = this.node;
              if (!node.childrenStates.isLoaded) return null;
              return node.children.map(function (childNode) {
                return (0,
                external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                  (0,
                  external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)(
                    "vue-treeselect--option"
                  ),
                  {
                    node: childNode,
                    key: childNode.id,
                  },
                  null
                );
              });
            },
            renderNoChildrenTip: function renderNoChildrenTip() {
              var instance = this.instance,
                node = this.node;
              if (!node.childrenStates.isLoaded || node.children.length)
                return null;
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                Tip,
                {
                  type: "no-children",
                  icon: "warning",
                },
                {
                  default: function _default() {
                    return [instance.noChildrenText];
                  },
                }
              );
            },
            renderLoadingChildrenTip: function renderLoadingChildrenTip() {
              var instance = this.instance,
                node = this.node;
              if (!node.childrenStates.isLoading) return null;
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                Tip,
                {
                  type: "loading",
                  icon: "loader",
                },
                {
                  default: function _default() {
                    return [instance.loadingText];
                  },
                }
              );
            },
            renderLoadingChildrenErrorTip:
              function renderLoadingChildrenErrorTip() {
                var _this = this;

                var instance = this.instance,
                  node = this.node;
                if (!node.childrenStates.loadingError) return null;
                return (0,
                external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                  Tip,
                  {
                    type: "error",
                    icon: "error",
                  },
                  {
                    default: function _default() {
                      return [
                        node.childrenStates.loadingError,
                        (0,
                        external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                          "a",
                          {
                            class: "vue-treeselect__retry",
                            title: instance.retryTitle,
                            onMousedown: _this.handleMouseDownOnRetry,
                          },
                          [instance.retryText]
                        ),
                      ];
                    },
                  }
                );
              },
            handleMouseEnterOption: function handleMouseEnterOption(evt) {
              var instance = this.instance,
                node = this.node;

              // Equivalent to `self` modifier.
              // istanbul ignore next
              if (evt.target !== evt.currentTarget) return;
              instance.setCurrentHighlightedOption(node, false);
            },
            handleMouseDownOnArrow: onLeftClick(
              function handleMouseDownOnOptionArrow() {
                var instance = this.instance,
                  node = this.node;
                instance.toggleExpanded(node);
              }
            ),
            handleMouseDownOnLabelContainer: onLeftClick(
              function handleMouseDownOnLabelContainer() {
                var instance = this.instance,
                  node = this.node;
                if (node.isBranch && instance.disableBranchNodes) {
                  instance.toggleExpanded(node);
                } else {
                  instance.select(node);
                }
              }
            ),
            handleMouseDownOnRetry: onLeftClick(
              function handleMouseDownOnRetry() {
                var instance = this.instance,
                  node = this.node;
                instance.loadChildrenOptions(node);
              }
            ),
          },
          render: function render() {
            var _slot;

            var node = this.node;
            var indentLevel = this.instance.shouldFlattenOptions
              ? 0
              : node.level;
            var listItemClass = _defineProperty(
              {
                "vue-treeselect__list-item": true,
              },
              "vue-treeselect__indent-level-".concat(indentLevel),
              true
            );
            return (0,
            external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
              "div",
              {
                class: listItemClass,
              },
              [
                this.renderOption(),
                node.isBranch
                  ? (0,
                    external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                      external_commonjs_vue_commonjs2_vue_root_Vue_.Transition,
                      {
                        name: "vue-treeselect__list--transition",
                      },
                      _isSlot((_slot = this.renderSubOptionsList()))
                        ? _slot
                        : {
                            default: function _default() {
                              return [_slot];
                            },
                          }
                    )
                  : "",
              ]
            );
          },
        };

        // eslint-disable-next-line vue/require-direct-export
        /* harmony default export */ var Optionvue_type_script_lang_js = Option; // CONCATENATED MODULE: ./src/components/Option.vue
        const Option_exports_ = Optionvue_type_script_lang_js;

        /* harmony default export */ var components_Option = Option_exports_; // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-85.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Menu.vue?vue&type=script&lang=js
        function Menuvue_type_script_lang_js_isSlot(s) {
          return (
            typeof s === "function" ||
            (Object.prototype.toString.call(s) === "[object Object]" &&
              !(0, external_commonjs_vue_commonjs2_vue_root_Vue_.isVNode)(s))
          );
        }
        var directionMap = {
          top: "top",
          bottom: "bottom",
          above: "top",
          below: "bottom",
        };
        /* harmony default export */ var Menuvue_type_script_lang_js = {
          name: "vue-treeselect--menu",
          inject: ["instance"],
          components: [
            external_commonjs_vue_commonjs2_vue_root_Vue_.Transition,
          ],
          computed: {
            menuStyle: function menuStyle() {
              var instance = this.instance;
              return {
                maxHeight: instance.maxHeight + "px",
              };
            },
            menuContainerStyle: function menuContainerStyle() {
              var instance = this.instance;
              return {
                zIndex: instance.appendToBody ? null : instance.zIndex,
              };
            },
          },
          watch: {
            "instance.menu.isOpen": function instanceMenuIsOpen(newValue) {
              if (newValue) {
                // In case `openMenu()` is just called and the menu is not rendered yet.
                this.$nextTick(this.onMenuOpen);
              } else {
                this.onMenuClose();
              }
            },
            "instance.forest": function instanceForest(newValue) {
              console.log("instance forest", newValue);
            },
          },
          created: function created() {
            this.menuSizeWatcher = null;
            this.menuResizeAndScrollEventListeners = null;
          },
          mounted: function mounted() {
            var instance = this.instance;
            if (instance.menu.isOpen) this.$nextTick(this.onMenuOpen);
          },
          unmounted: function unmounted() {
            this.onMenuClose();
          },
          methods: {
            renderMenu: function renderMenu() {
              var instance = this.instance;
              if (!instance.menu.isOpen) return null;
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                "div",
                {
                  key: instance.key,
                  ref: "menu",
                  class: "vue-treeselect__menu",
                  onMousedown: instance.handleMouseDown,
                  style: this.menuStyle,
                },
                [
                  this.renderBeforeList(),
                  instance.async
                    ? this.renderAsyncSearchMenuInner()
                    : instance.localSearch.active
                    ? this.renderLocalSearchMenuInner()
                    : this.renderNormalMenuInner(),
                  this.renderAfterList(),
                ]
              );
            },
            renderBeforeList: function renderBeforeList() {
              var instance = this.instance;
              var beforeListRenderer = instance.$slots["before-list"];
              return beforeListRenderer ? beforeListRenderer() : null;
            },
            renderAfterList: function renderAfterList() {
              var instance = this.instance;
              var afterListRenderer = instance.$slots["after-list"];
              return afterListRenderer ? afterListRenderer() : null;
            },
            renderNormalMenuInner: function renderNormalMenuInner() {
              var instance = this.instance;
              if (instance.rootOptionsStates.isLoading) {
                return this.renderLoadingOptionsTip();
              } else if (instance.rootOptionsStates.loadingError) {
                return this.renderLoadingRootOptionsErrorTip();
              } else if (
                instance.rootOptionsStates.isLoaded &&
                instance.forest.normalizedOptions.length === 0
              ) {
                return this.renderNoAvailableOptionsTip();
              } else {
                return this.renderOptionList();
              }
            },
            renderLocalSearchMenuInner: function renderLocalSearchMenuInner() {
              var instance = this.instance;
              if (instance.rootOptionsStates.isLoading) {
                return this.renderLoadingOptionsTip();
              } else if (instance.rootOptionsStates.loadingError) {
                return this.renderLoadingRootOptionsErrorTip();
              } else if (
                instance.rootOptionsStates.isLoaded &&
                instance.forest.normalizedOptions.length === 0
              ) {
                return this.renderNoAvailableOptionsTip();
              } else if (instance.localSearch.noResults) {
                return this.renderNoResultsTip();
              } else {
                return this.renderOptionList();
              }
            },
            renderAsyncSearchMenuInner: function renderAsyncSearchMenuInner() {
              var instance = this.instance;
              var entry = instance.getRemoteSearchEntry();
              var shouldShowSearchPromptTip =
                instance.trigger.searchQuery === "" &&
                !instance.defaultOptions &&
                instance.minChar > 0;
              var shouldShowNoResultsTip = shouldShowSearchPromptTip
                ? false
                : entry.isLoaded && entry.options.length === 0;
              if (shouldShowSearchPromptTip) {
                return this.renderSearchPromptTip();
              } else if (entry.isLoading) {
                return this.renderLoadingOptionsTip();
              } else if (entry.loadingError) {
                return this.renderAsyncSearchLoadingErrorTip();
              } else if (shouldShowNoResultsTip) {
                return this.renderNoResultsTip();
              } else {
                return this.renderOptionList();
              }
            },
            renderOptionList: function renderOptionList() {
              var instance = this.instance;
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                "div",
                {
                  class: "vue-treeselect__list",
                },
                [
                  instance.selectAllOption &&
                    (0,
                    external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                      "div",
                      {
                        class: "vue-treeselect__list-item",
                      },
                      [
                        (0,
                        external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                          "div",
                          {
                            class:
                              "vue-treeselect__option vue-treeselect__option--selected",
                            "data-id": "-1",
                          },
                          [
                            (0,
                            external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                              "div",
                              {
                                class:
                                  "vue-treeselect__option-arrow-placeholder",
                              },
                              [
                                (0,
                                external_commonjs_vue_commonjs2_vue_root_Vue_.createTextVNode)(
                                  "\xA0"
                                ),
                              ]
                            ),
                            (0,
                            external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                              "div",
                              {
                                class: "vue-treeselect__label-container",
                              },
                              [
                                (0,
                                external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                                  "div",
                                  {
                                    class: "vue-treeselect__checkbox-container",
                                  },
                                  [
                                    (0,
                                    external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                                      "span",
                                      {
                                        class:
                                          "vue-treeselect__checkbox vue-treeselect__checkbox--checked",
                                      },
                                      [
                                        (0,
                                        external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                                          "span",
                                          {
                                            class: "vue-treeselect__check-mark",
                                          },
                                          null
                                        ),
                                        (0,
                                        external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                                          "span",
                                          {
                                            class: "vue-treeselect__minus-mark",
                                          },
                                          null
                                        ),
                                      ]
                                    ),
                                  ]
                                ),
                                (0,
                                external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                                  "label",
                                  {
                                    class: "vue-treeselect__label",
                                  },
                                  [
                                    (0,
                                    external_commonjs_vue_commonjs2_vue_root_Vue_.createTextVNode)(
                                      "Tous"
                                    ),
                                  ]
                                ),
                              ]
                            ),
                          ]
                        ),
                      ]
                    ),
                  instance.forest.normalizedOptions.map(function (rootNode) {
                    return (0,
                    external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                      components_Option,
                      {
                        node: rootNode,
                        key: rootNode.id,
                      },
                      null
                    );
                  }),
                ]
              );
            },
            renderSearchPromptTip: function renderSearchPromptTip() {
              var instance = this.instance;
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                Tip,
                {
                  type: "search-prompt",
                  icon: "warning",
                },
                {
                  default: function _default() {
                    return [instance.searchPromptText];
                  },
                }
              );
            },
            renderLoadingOptionsTip: function renderLoadingOptionsTip() {
              var instance = this.instance;
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                Tip,
                {
                  type: "loading",
                  icon: "loader",
                },
                {
                  default: function _default() {
                    return [instance.loadingText];
                  },
                }
              );
            },
            renderLoadingRootOptionsErrorTip:
              function renderLoadingRootOptionsErrorTip() {
                var instance = this.instance;
                return (0,
                external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                  Tip,
                  {
                    type: "error",
                    icon: "error",
                  },
                  {
                    default: function _default() {
                      return [
                        instance.rootOptionsStates.loadingError,
                        (0,
                        external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                          "a",
                          {
                            class: "vue-treeselect__retry",
                            onClick: instance.loadRootOptions,
                            title: instance.retryTitle,
                          },
                          [instance.retryText]
                        ),
                      ];
                    },
                  }
                );
              },
            renderAsyncSearchLoadingErrorTip:
              function renderAsyncSearchLoadingErrorTip() {
                var instance = this.instance;
                var entry = instance.getRemoteSearchEntry();

                // TODO: retryTitle?

                return (0,
                external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                  Tip,
                  {
                    type: "error",
                    icon: "error",
                  },
                  {
                    default: function _default() {
                      return [
                        entry.loadingError,
                        (0,
                        external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                          "a",
                          {
                            class: "vue-treeselect__retry",
                            onClick: instance.handleRemoteSearch,
                            title: instance.retryTitle,
                          },
                          [instance.retryText]
                        ),
                      ];
                    },
                  }
                );
              },
            renderNoAvailableOptionsTip:
              function renderNoAvailableOptionsTip() {
                var instance = this.instance;
                return (0,
                external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                  Tip,
                  {
                    type: "no-options",
                    icon: "warning",
                  },
                  {
                    default: function _default() {
                      return [instance.noOptionsText];
                    },
                  }
                );
              },
            renderNoResultsTip: function renderNoResultsTip() {
              var instance = this.instance;
              return (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                Tip,
                {
                  type: "no-results",
                  icon: "warning",
                },
                {
                  default: function _default() {
                    return [instance.noResultsText];
                  },
                }
              );
            },
            onMenuOpen: function onMenuOpen() {
              this.adjustMenuOpenDirection();
              this.setupMenuSizeWatcher();
              this.setupMenuResizeAndScrollEventListeners();
            },
            onMenuClose: function onMenuClose() {
              this.removeMenuSizeWatcher();
              this.removeMenuResizeAndScrollEventListeners();
            },
            adjustMenuOpenDirection: function adjustMenuOpenDirection() {
              var instance = this.instance;
              if (!instance.menu.isOpen) return;
              var $menu = instance.getMenu();
              var $control = instance.getControl();
              var menuRect = $menu.getBoundingClientRect();
              var controlRect = $control.getBoundingClientRect();
              var menuHeight = menuRect.height;
              var viewportHeight = window.innerHeight;
              var spaceAbove = controlRect.top;
              var spaceBelow = window.innerHeight - controlRect.bottom;
              var isControlInViewport =
                (controlRect.top >= 0 && controlRect.top <= viewportHeight) ||
                (controlRect.top < 0 && controlRect.bottom > 0);
              var hasEnoughSpaceBelow = spaceBelow > menuHeight + MENU_BUFFER;
              var hasEnoughSpaceAbove = spaceAbove > menuHeight + MENU_BUFFER;
              if (!isControlInViewport) {
                instance.closeMenu();
              } else if (instance.openDirection !== "auto") {
                instance.menu.placement = directionMap[instance.openDirection];
              } else if (hasEnoughSpaceBelow || !hasEnoughSpaceAbove) {
                instance.menu.placement = "bottom";
              } else {
                instance.menu.placement = "top";
              }
            },
            setupMenuSizeWatcher: function setupMenuSizeWatcher() {
              var instance = this.instance;
              var $menu = instance.getMenu();

              // istanbul ignore next
              if (this.menuSizeWatcher) return;
              this.menuSizeWatcher = {
                remove: watchSize($menu, this.adjustMenuOpenDirection),
              };
            },
            setupMenuResizeAndScrollEventListeners:
              function setupMenuResizeAndScrollEventListeners() {
                var instance = this.instance;
                var $control = instance.getControl();

                // istanbul ignore next
                if (this.menuResizeAndScrollEventListeners) return;
                this.menuResizeAndScrollEventListeners = {
                  remove: setupResizeAndScrollEventListeners(
                    $control,
                    this.adjustMenuOpenDirection
                  ),
                };
              },
            removeMenuSizeWatcher: function removeMenuSizeWatcher() {
              if (!this.menuSizeWatcher) return;
              this.menuSizeWatcher.remove();
              this.menuSizeWatcher = null;
            },
            removeMenuResizeAndScrollEventListeners:
              function removeMenuResizeAndScrollEventListeners() {
                if (!this.menuResizeAndScrollEventListeners) return;
                this.menuResizeAndScrollEventListeners.remove();
                this.menuResizeAndScrollEventListeners = null;
              },
          },
          render: function render() {
            var _slot;

            return (0,
            external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
              "div",
              {
                ref: "menu-container",
                class: "vue-treeselect__menu-container",
                style: this.menuContainerStyle,
              },
              [
                (0, external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                  external_commonjs_vue_commonjs2_vue_root_Vue_.Transition,
                  {
                    name: "vue-treeselect__menu--transition",
                  },
                  Menuvue_type_script_lang_js_isSlot(
                    (_slot = this.renderMenu())
                  )
                    ? _slot
                    : {
                        default: function _default() {
                          return [_slot];
                        },
                      }
                ),
              ]
            );
          },
        }; // CONCATENATED MODULE: ./src/components/Menu.vue
        const Menu_exports_ = Menuvue_type_script_lang_js;

        /* harmony default export */ var Menu = Menu_exports_; // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-85.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/MenuPortal.vue?vue&type=script&lang=js
        var PortalTarget = {
          name: "vue-treeselect--portal-target",
          inject: ["instance"],
          watch: {
            "instance.menu.isOpen": function instanceMenuIsOpen(newValue) {
              if (newValue) {
                this.setupHandlers();
              } else {
                this.removeHandlers();
              }
            },
            "instance.menu.placement": function instanceMenuPlacement() {
              this.updateMenuContainerOffset();
            },
          },
          created: function created() {
            this.controlResizeAndScrollEventListeners = null;
            this.controlSizeWatcher = null;
          },
          mounted: function mounted() {
            var instance = this.instance;
            if (instance.menu.isOpen) this.setupHandlers();
          },
          methods: {
            setupHandlers: function setupHandlers() {
              this.updateWidth();
              this.updateMenuContainerOffset();
              this.setupControlResizeAndScrollEventListeners();
              this.setupControlSizeWatcher();
            },
            removeHandlers: function removeHandlers() {
              this.removeControlResizeAndScrollEventListeners();
              this.removeControlSizeWatcher();
            },
            setupControlResizeAndScrollEventListeners:
              function setupControlResizeAndScrollEventListeners() {
                var instance = this.instance;
                var $control = instance.getControl();

                // istanbul ignore next
                if (this.controlResizeAndScrollEventListeners) return;
                this.controlResizeAndScrollEventListeners = {
                  remove: setupResizeAndScrollEventListeners(
                    $control,
                    this.updateMenuContainerOffset
                  ),
                };
              },
            setupControlSizeWatcher: function setupControlSizeWatcher() {
              var _this = this;
              var instance = this.instance;
              var $control = instance.getControl();

              // istanbul ignore next
              if (this.controlSizeWatcher) return;
              this.controlSizeWatcher = {
                remove: watchSize($control, function () {
                  _this.updateWidth();
                  _this.updateMenuContainerOffset();
                }),
              };
            },
            removeControlResizeAndScrollEventListeners:
              function removeControlResizeAndScrollEventListeners() {
                if (!this.controlResizeAndScrollEventListeners) return;
                this.controlResizeAndScrollEventListeners.remove();
                this.controlResizeAndScrollEventListeners = null;
              },
            removeControlSizeWatcher: function removeControlSizeWatcher() {
              if (!this.controlSizeWatcher) return;
              this.controlSizeWatcher.remove();
              this.controlSizeWatcher = null;
            },
            updateWidth: function updateWidth() {
              var instance = this.instance;
              var $portalTarget = this.$el;
              var $control = instance.getControl();
              var controlRect = $control.getBoundingClientRect();
              $portalTarget.style.width = controlRect.width + "px";
            },
            updateMenuContainerOffset: function updateMenuContainerOffset() {
              var instance = this.instance;
              var $control = instance.getControl();
              var $portalTarget = this.$el;
              var controlRect = $control.getBoundingClientRect();
              var portalTargetRect = $portalTarget.getBoundingClientRect();
              var offsetY =
                instance.menu.placement === "bottom" ? controlRect.height : 0;
              var left =
                Math.round(controlRect.left - portalTargetRect.left) + "px";
              var top =
                Math.round(controlRect.top - portalTargetRect.top + offsetY) +
                "px";
              var menuContainerStyle =
                this.$refs.menu.$refs["menu-container"].style;
              var transformVariations = [
                "transform",
                "webkitTransform",
                "MozTransform",
                "msTransform",
              ];
              var transform = find(transformVariations, function (t) {
                return t in document.body.style;
              });

              // IE9 doesn't support `translate3d()`.
              menuContainerStyle[transform] = "translate("
                .concat(left, ", ")
                .concat(top, ")");
            },
          },
          render: function render() {
            var instance = this.instance;
            var portalTargetClass = [
              "vue-treeselect__portal-target",
              instance.wrapperClass,
            ];
            var portalTargetStyle = {
              zIndex: instance.zIndex,
            };
            return (0,
            external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
              "div",
              {
                class: portalTargetClass,
                style: portalTargetStyle,
                "data-instance-id": instance.getInstanceId(),
              },
              [
                (0, external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                  Menu,
                  {
                    ref: "menu",
                  },
                  null
                ),
              ]
            );
          },
          unmounted: function unmounted() {
            this.removeHandlers();
          },
        };
        var placeholder;
        /* harmony default export */ var MenuPortalvue_type_script_lang_js = {
          name: "vue-treeselect--menu-portal",
          created: function created() {
            this.portalTarget = null;
          },
          mounted: function mounted() {
            this.setup();
          },
          unmounted: function unmounted() {
            this.teardown();
          },
          methods: {
            setup: function setup() {
              var el = document.createElement("div");
              document.body.appendChild(el);
              this.portalTarget = (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createApp)(
                _objectSpread2(
                  {
                    parent: this,
                  },
                  PortalTarget
                )
              );
              this.portalTarget.mount(el);
              // this.portalTarget = new Vue({
              //   el,
              //   parent: this,
              //   ...PortalTarget,
              // })
            },
            teardown: function teardown() {
              document.body.removeChild(this.portalTarget.$el);
              this.portalTarget.$el.innerHTML = "";
              this.portalTarget.$destroy();
              this.portalTarget = null;
            },
          },
          render: function render() {
            if (!placeholder)
              placeholder = (0,
              external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(
                "div",
                {
                  class: "vue-treeselect__menu-placeholder",
                },
                null
              );
            return placeholder;
          },
        }; // CONCATENATED MODULE: ./src/components/MenuPortal.vue
        const MenuPortal_exports_ = MenuPortalvue_type_script_lang_js;

        /* harmony default export */ var MenuPortal = MenuPortal_exports_; // CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib/index.js??clonedRuleSet-85.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Treeselect.vue?vue&type=script&lang=js
        /* harmony default export */ var Treeselectvue_type_script_lang_js = (0,
        external_commonjs_vue_commonjs2_vue_root_Vue_.defineComponent)({
          name: "vue-treeselect",
          mixins: [treeselectMixin],
          components: {
            HiddenFields: HiddenFields,
            Control: Control,
            Menu: Menu,
            MenuPortal: MenuPortal,
          },
          computed: {
            wrapperClass: function wrapperClass() {
              return {
                "vue-treeselect": true,
                "vue-treeselect--single": this.single,
                "vue-treeselect--multi": this.multiple,
                "vue-treeselect--searchable": this.searchable,
                "vue-treeselect--disabled": this.disabled,
                "vue-treeselect--focused": this.trigger.isFocused,
                "vue-treeselect--has-value": this.hasValue,
                "vue-treeselect--open": this.menu.isOpen,
                "vue-treeselect--open-above": this.menu.placement === "top",
                "vue-treeselect--open-below": this.menu.placement === "bottom",
                "vue-treeselect--branch-nodes-disabled":
                  this.disableBranchNodes,
                "vue-treeselect--append-to-body": this.appendToBody,
              };
            },
          },

          // render() {
          //   return (
          //     <div ref="wrapper" class={this.wrapperClass}>
          //       <HiddenFields />
          //       <Control ref="control" />
          //       {this.appendToBody ? <MenuPortal ref="portal" /> : <Menu ref="menu" />}
          //     </div>
          //   )
          // },
        }); // CONCATENATED MODULE: ./src/components/Treeselect.vue
        const Treeselect_exports_ = /*#__PURE__*/ (0,
        exportHelper /* default */.Z)(Treeselectvue_type_script_lang_js, [
          ["render", render],
        ]);

        /* harmony default export */ var Treeselect = Treeselect_exports_; // CONCATENATED MODULE: ./styles/style.less // CONCATENATED MODULE: ./src/index.js
        // extracted by mini-css-extract-plugin

        /* harmony default export */ var src_0 = Treeselect; // CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js

        /* harmony default export */ var entry_lib = src_0;
      })();
      /******/ return __webpack_exports__;
      /******/
    })();
  }
);
//# sourceMappingURL=vue3-treeselect.umd.js.map
