var hasOwn = {}.hasOwnProperty;

const util = {
	extend(){
		var src, copyIsArray, copy, name, options, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		if ( typeof target !== "object" && !util.isFunction(target) ) {
			target = {};
		}

		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( util.isPlainObject(copy) || (copyIsArray = util.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && util.isArray(src) ? src : [];

						} else {
							clone = src && util.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = util.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	},


	isFunction( obj ) {
		return util.type(obj) === "function";
	},
	isArray: Array.isArray || function( obj ) {
		return util.type(obj) === "array";
	},
	isWindow( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},
	isPlainObject( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || util.type(obj) !== "object" || obj.nodeType || util.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( {}.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},
	type( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			{}[ toString.call(obj) ] || "object" :
			typeof obj;
	}
};

export default util;