!function(a, b) {
	"object" == typeof exports && "undefined" != typeof module ? b(exports) : "function" == typeof define && define.amd ? define(["exports"], b) : b(a.async = a.async || {})
}(this, function(exports) {
	"use strict";
	function apply(a, b, c) {
		switch (c.length) {
		case 0:
			return a.call(b);
		case 1:
			return a.call(b, c[0]);
		case 2:
			return a.call(b, c[0], c[1]);
		case 3:
			return a.call(b, c[0], c[1], c[2])
		}
		return a.apply(b, c)
	}
	function overRest$1(a, b, c) {
		return b = nativeMax(void 0 === b ? a.length - 1 : b, 0),
		function() {
			for (var d = arguments, e = -1, f = nativeMax(d.length - b, 0), g = Array(f); ++e < f; )
				g[e] = d[b + e];
			e = -1;
			for (var h = Array(b + 1); ++e < b; )
				h[e] = d[e];
			return h[b] = c(g),
			apply(a, this, h)
		}
	}
	function identity(a) {
		return a
	}
	function rest(a, b) {
		return overRest$1(a, b, identity)
	}
	function isObject(a) {
		var b = typeof a;
		return null != a && ("object" == b || "function" == b)
	}
	function asyncify(a) {
		return initialParams(function(b, c) {
			var d;
			try {
				d = a.apply(this, b)
			} catch (a) {
				return c(a)
			}
			isObject(d) && "function" == typeof d.then ? d.then(function(a) {
				c(null, a)
			}, function(a) {
				c(a.message ? a : new Error(a))
			}) : c(null, d)
		})
	}
	function supportsAsync() {
		var supported;
		try {
			supported = isAsync(eval("(async function () {})"))
		} catch (a) {
			supported = !1
		}
		return supported
	}
	function isAsync(a) {
		return supportsSymbol && "AsyncFunction" === a[Symbol.toStringTag]
	}
	function wrapAsync(a) {
		return isAsync(a) ? asyncify(a) : a
	}
	function applyEach$1(a) {
		return rest(function(b, c) {
			var d = initialParams(function(c, d) {
				var e = this;
				return a(b, function(a, b) {
					wrapAsync$1(a).apply(e, c.concat(b))
				}, d)
			});
			return c.length ? d.apply(this, c) : d
		})
	}
	function getRawTag(a) {
		var b = hasOwnProperty.call(a, symToStringTag$1)
		  , c = a[symToStringTag$1];
		try {
			a[symToStringTag$1] = void 0;
			var d = !0
		} catch (a) {}
		var e = nativeObjectToString.call(a);
		return d && (b ? a[symToStringTag$1] = c : delete a[symToStringTag$1]),
		e
	}
	function objectToString(a) {
		return nativeObjectToString$1.call(a)
	}
	function baseGetTag(a) {
		return null == a ? void 0 === a ? undefinedTag : nullTag : (a = Object(a),
		symToStringTag && symToStringTag in a ? getRawTag(a) : objectToString(a))
	}
	function isFunction(a) {
		if (!isObject(a))
			return !1;
		var b = baseGetTag(a);
		return b == funcTag || b == genTag || b == asyncTag || b == proxyTag
	}
	function isLength(a) {
		return "number" == typeof a && a > -1 && a % 1 == 0 && a <= MAX_SAFE_INTEGER
	}
	function isArrayLike(a) {
		return null != a && isLength(a.length) && !isFunction(a)
	}
	function noop() {}
	function once(a) {
		return function() {
			if (null !== a) {
				var b = a;
				a = null,
				b.apply(this, arguments)
			}
		}
	}
	function baseTimes(a, b) {
		for (var c = -1, d = Array(a); ++c < a; )
			d[c] = b(c);
		return d
	}
	function isObjectLike(a) {
		return null != a && "object" == typeof a
	}
	function baseIsArguments(a) {
		return isObjectLike(a) && baseGetTag(a) == argsTag
	}
	function stubFalse() {
		return !1
	}
	function isIndex(a, b) {
		return !!(b = null == b ? MAX_SAFE_INTEGER$1 : b) && ("number" == typeof a || reIsUint.test(a)) && a > -1 && a % 1 == 0 && a < b
	}
	function baseIsTypedArray(a) {
		return isObjectLike(a) && isLength(a.length) && !!typedArrayTags[baseGetTag(a)]
	}
	function baseUnary(a) {
		return function(b) {
			return a(b)
		}
	}
	function arrayLikeKeys(a, b) {
		var c = isArray(a)
		  , d = !c && isArguments(a)
		  , e = !c && !d && isBuffer(a)
		  , f = !c && !d && !e && isTypedArray(a)
		  , g = c || d || e || f
		  , h = g ? baseTimes(a.length, String) : []
		  , i = h.length;
		for (var j in a)
			!b && !hasOwnProperty$1.call(a, j) || g && ("length" == j || e && ("offset" == j || "parent" == j) || f && ("buffer" == j || "byteLength" == j || "byteOffset" == j) || isIndex(j, i)) || h.push(j);
		return h
	}
	function isPrototype(a) {
		var b = a && a.constructor;
		return a === ("function" == typeof b && b.prototype || objectProto$5)
	}
	function overArg(a, b) {
		return function(c) {
			return a(b(c))
		}
	}
	function baseKeys(a) {
		if (!isPrototype(a))
			return nativeKeys(a);
		var b = [];
		for (var c in Object(a))
			hasOwnProperty$3.call(a, c) && "constructor" != c && b.push(c);
		return b
	}
	function keys(a) {
		return isArrayLike(a) ? arrayLikeKeys(a) : baseKeys(a)
	}
	function createArrayIterator(a) {
		var b = -1
		  , c = a.length;
		return function() {
			return ++b < c ? {
				value: a[b],
				key: b
			} : null
		}
	}
	function createES2015Iterator(a) {
		var b = -1;
		return function() {
			var c = a.next();
			return c.done ? null : (b++,
			{
				value: c.value,
				key: b
			})
		}
	}
	function createObjectIterator(a) {
		var b = keys(a)
		  , c = -1
		  , d = b.length;
		return function() {
			var e = b[++c];
			return c < d ? {
				value: a[e],
				key: e
			} : null
		}
	}
	function iterator(a) {
		if (isArrayLike(a))
			return createArrayIterator(a);
		var b = getIterator(a);
		return b ? createES2015Iterator(b) : createObjectIterator(a)
	}
	function onlyOnce(a) {
		return function() {
			if (null === a)
				throw new Error("Callback was already called.");
			var b = a;
			a = null,
			b.apply(this, arguments)
		}
	}
	function _eachOfLimit(a) {
		return function(b, c, d) {
			function e(a, b) {
				if (i -= 1,
				a)
					h = !0,
					d(a);
				else {
					if (b === breakLoop || h && i <= 0)
						return h = !0,
						d(null);
					f()
				}
			}
			function f() {
				for (; i < a && !h; ) {
					var b = g();
					if (null === b)
						return h = !0,
						void (i <= 0 && d(null));
					i += 1,
					c(b.value, b.key, onlyOnce(e))
				}
			}
			if (d = once(d || noop),
			a <= 0 || !b)
				return d(null);
			var g = iterator(b)
			  , h = !1
			  , i = 0;
			f()
		}
	}
	function eachOfLimit(a, b, c, d) {
		_eachOfLimit(b)(a, wrapAsync$1(c), d)
	}
	function doLimit(a, b) {
		return function(c, d, e) {
			return a(c, b, d, e)
		}
	}
	function eachOfArrayLike(a, b, c) {
		function d(a, b) {
			a ? c(a) : ++f !== g && b !== breakLoop || c(null)
		}
		c = once(c || noop);
		var e = 0
		  , f = 0
		  , g = a.length;
		for (0 === g && c(null); e < g; e++)
			b(a[e], e, onlyOnce(d))
	}
	function doParallel(a) {
		return function(b, c, d) {
			return a(eachOf, b, wrapAsync$1(c), d)
		}
	}
	function _asyncMap(a, b, c, d) {
		d = d || noop,
		b = b || [];
		var e = []
		  , f = 0
		  , g = wrapAsync$1(c);
		a(b, function(a, b, c) {
			var d = f++;
			g(a, function(a, b) {
				e[d] = b,
				c(a)
			})
		}, function(a) {
			d(a, e)
		})
	}
	function doParallelLimit(a) {
		return function(b, c, d, e) {
			return a(_eachOfLimit(c), b, wrapAsync$1(d), e)
		}
	}
	function arrayEach(a, b) {
		for (var c = -1, d = null == a ? 0 : a.length; ++c < d && !1 !== b(a[c], c, a); )
			;
		return a
	}
	function createBaseFor(a) {
		return function(b, c, d) {
			for (var e = -1, f = Object(b), g = d(b), h = g.length; h--; ) {
				var i = g[a ? h : ++e];
				if (!1 === c(f[i], i, f))
					break
			}
			return b
		}
	}
	function baseForOwn(a, b) {
		return a && baseFor(a, b, keys)
	}
	function baseFindIndex(a, b, c, d) {
		for (var e = a.length, f = c + (d ? 1 : -1); d ? f-- : ++f < e; )
			if (b(a[f], f, a))
				return f;
		return -1
	}
	function baseIsNaN(a) {
		return a !== a
	}
	function strictIndexOf(a, b, c) {
		for (var d = c - 1, e = a.length; ++d < e; )
			if (a[d] === b)
				return d;
		return -1
	}
	function baseIndexOf(a, b, c) {
		return b === b ? strictIndexOf(a, b, c) : baseFindIndex(a, baseIsNaN, c)
	}
	function arrayMap(a, b) {
		for (var c = -1, d = null == a ? 0 : a.length, e = Array(d); ++c < d; )
			e[c] = b(a[c], c, a);
		return e
	}
	function isSymbol(a) {
		return "symbol" == typeof a || isObjectLike(a) && baseGetTag(a) == symbolTag
	}
	function baseToString(a) {
		if ("string" == typeof a)
			return a;
		if (isArray(a))
			return arrayMap(a, baseToString) + "";
		if (isSymbol(a))
			return symbolToString ? symbolToString.call(a) : "";
		var b = a + "";
		return "0" == b && 1 / a == -INFINITY ? "-0" : b
	}
	function baseSlice(a, b, c) {
		var d = -1
		  , e = a.length;
		b < 0 && (b = -b > e ? 0 : e + b),
		c = c > e ? e : c,
		c < 0 && (c += e),
		e = b > c ? 0 : c - b >>> 0,
		b >>>= 0;
		for (var f = Array(e); ++d < e; )
			f[d] = a[d + b];
		return f
	}
	function castSlice(a, b, c) {
		var d = a.length;
		return c = void 0 === c ? d : c,
		!b && c >= d ? a : baseSlice(a, b, c)
	}
	function charsEndIndex(a, b) {
		for (var c = a.length; c-- && baseIndexOf(b, a[c], 0) > -1; )
			;
		return c
	}
	function charsStartIndex(a, b) {
		for (var c = -1, d = a.length; ++c < d && baseIndexOf(b, a[c], 0) > -1; )
			;
		return c
	}
	function asciiToArray(a) {
		return a.split("")
	}
	function hasUnicode(a) {
		return reHasUnicode.test(a)
	}
	function unicodeToArray(a) {
		return a.match(reUnicode) || []
	}
	function stringToArray(a) {
		return hasUnicode(a) ? unicodeToArray(a) : asciiToArray(a)
	}
	function toString(a) {
		return null == a ? "" : baseToString(a)
	}
	function trim(a, b, c) {
		if ((a = toString(a)) && (c || void 0 === b))
			return a.replace(reTrim, "");
		if (!a || !(b = baseToString(b)))
			return a;
		var d = stringToArray(a)
		  , e = stringToArray(b);
		return castSlice(d, charsStartIndex(d, e), charsEndIndex(d, e) + 1).join("")
	}
	function parseParams(a) {
		return a = a.toString().replace(STRIP_COMMENTS, ""),
		a = a.match(FN_ARGS)[2].replace(" ", ""),
		a = a ? a.split(FN_ARG_SPLIT) : [],
		a = a.map(function(a) {
			return trim(a.replace(FN_ARG, ""))
		})
	}
	function autoInject(a, b) {
		var c = {};
		baseForOwn(a, function(a, b) {
			function d(b, c) {
				var d = arrayMap(e, function(a) {
					return b[a]
				});
				d.push(c),
				wrapAsync$1(a).apply(null, d)
			}
			var e, f = isAsync(a), g = !f && 1 === a.length || f && 0 === a.length;
			if (isArray(a))
				e = a.slice(0, -1),
				a = a[a.length - 1],
				c[b] = e.concat(e.length > 0 ? d : a);
			else if (g)
				c[b] = a;
			else {
				if (e = parseParams(a),
				0 === a.length && !f && 0 === e.length)
					throw new Error("autoInject task functions require explicit parameters.");
				f || e.pop(),
				c[b] = e.concat(d)
			}
		}),
		auto(c, b)
	}
	function fallback(a) {
		setTimeout(a, 0)
	}
	function wrap(a) {
		return rest(function(b, c) {
			a(function() {
				b.apply(null, c)
			})
		})
	}
	function DLL() {
		this.head = this.tail = null,
		this.length = 0
	}
	function setInitial(a, b) {
		a.length = 1,
		a.head = a.tail = b
	}
	function queue(a, b, c) {
		function d(a, b, c) {
			if (null != c && "function" != typeof c)
				throw new Error("task callback must be a function");
			if (j.started = !0,
			isArray(a) || (a = [a]),
			0 === a.length && j.idle())
				return setImmediate$1(function() {
					j.drain()
				});
			for (var d = 0, e = a.length; d < e; d++) {
				var f = {
					data: a[d],
					callback: c || noop
				};
				b ? j._tasks.unshift(f) : j._tasks.push(f)
			}
			setImmediate$1(j.process)
		}
		function e(a) {
			return rest(function(b) {
				g -= 1;
				for (var c = 0, d = a.length; c < d; c++) {
					var e = a[c]
					  , f = baseIndexOf(h, e, 0);
					f >= 0 && h.splice(f),
					e.callback.apply(e, b),
					null != b[0] && j.error(b[0], e.data)
				}
				g <= j.concurrency - j.buffer && j.unsaturated(),
				j.idle() && j.drain(),
				j.process()
			})
		}
		if (null == b)
			b = 1;
		else if (0 === b)
			throw new Error("Concurrency must not be zero");
		var f = wrapAsync$1(a)
		  , g = 0
		  , h = []
		  , i = !1
		  , j = {
			_tasks: new DLL,
			concurrency: b,
			payload: c,
			saturated: noop,
			unsaturated: noop,
			buffer: b / 4,
			empty: noop,
			drain: noop,
			error: noop,
			started: !1,
			paused: !1,
			push: function(a, b) {
				d(a, !1, b)
			},
			kill: function() {
				j.drain = noop,
				j._tasks.empty()
			},
			unshift: function(a, b) {
				d(a, !0, b)
			},
			process: function() {
				if (!i) {
					for (i = !0; !j.paused && g < j.concurrency && j._tasks.length; ) {
						var a = []
						  , b = []
						  , c = j._tasks.length;
						j.payload && (c = Math.min(c, j.payload));
						for (var d = 0; d < c; d++) {
							var k = j._tasks.shift();
							a.push(k),
							b.push(k.data)
						}
						0 === j._tasks.length && j.empty(),
						g += 1,
						h.push(a[0]),
						g === j.concurrency && j.saturated();
						var l = onlyOnce(e(a));
						f(b, l)
					}
					i = !1
				}
			},
			length: function() {
				return j._tasks.length
			},
			running: function() {
				return g
			},
			workersList: function() {
				return h
			},
			idle: function() {
				return j._tasks.length + g === 0
			},
			pause: function() {
				j.paused = !0
			},
			resume: function() {
				!1 !== j.paused && (j.paused = !1,
				setImmediate$1(j.process))
			}
		};
		return j
	}
	function cargo(a, b) {
		return queue(a, 1, b)
	}
	function reduce(a, b, c, d) {
		d = once(d || noop);
		var e = wrapAsync$1(c);
		eachOfSeries(a, function(a, c, d) {
			e(b, a, function(a, c) {
				b = c,
				d(a)
			})
		}, function(a) {
			d(a, b)
		})
	}
	function concat$1(a, b, c, d) {
		var e = [];
		a(b, function(a, b, d) {
			c(a, function(a, b) {
				e = e.concat(b || []),
				d(a)
			})
		}, function(a) {
			d(a, e)
		})
	}
	function doSeries(a) {
		return function(b, c, d) {
			return a(eachOfSeries, b, wrapAsync$1(c), d)
		}
	}
	function _createTester(a, b) {
		return function(c, d, e, f) {
			f = f || noop;
			var g, h = !1;
			c(d, function(c, d, f) {
				e(c, function(d, e) {
					d ? f(d) : a(e) && !g ? (h = !0,
					g = b(!0, c),
					f(null, breakLoop)) : f()
				})
			}, function(a) {
				a ? f(a) : f(null, h ? g : b(!1))
			})
		}
	}
	function _findGetResult(a, b) {
		return b
	}
	function consoleFunc(a) {
		return rest(function(b, c) {
			wrapAsync$1(b).apply(null, c.concat(rest(function(b, c) {
				"object" == typeof console && (b ? console.error && console.error(b) : console[a] && arrayEach(c, function(b) {
					console[a](b)
				}))
			})))
		})
	}
	function doDuring(a, b, c) {
		function d(a, b) {
			return a ? c(a) : b ? void e(g) : c(null)
		}
		c = onlyOnce(c || noop);
		var e = wrapAsync$1(a)
		  , f = wrapAsync$1(b)
		  , g = rest(function(a, b) {
			return a ? c(a) : (b.push(d),
			void f.apply(this, b))
		});
		d(null, !0)
	}
	function doWhilst(a, b, c) {
		c = onlyOnce(c || noop);
		var d = wrapAsync$1(a)
		  , e = rest(function(a, f) {
			return a ? c(a) : b.apply(this, f) ? d(e) : void c.apply(null, [null].concat(f))
		});
		d(e)
	}
	function doUntil(a, b, c) {
		doWhilst(a, function() {
			return !b.apply(this, arguments)
		}, c)
	}
	function during(a, b, c) {
		function d(a) {
			return a ? c(a) : void g(e)
		}
		function e(a, b) {
			return a ? c(a) : b ? void f(d) : c(null)
		}
		c = onlyOnce(c || noop);
		var f = wrapAsync$1(b)
		  , g = wrapAsync$1(a);
		g(e)
	}
	function _withoutIndex(a) {
		return function(b, c, d) {
			return a(b, d)
		}
	}
	function eachLimit(a, b, c) {
		eachOf(a, _withoutIndex(wrapAsync$1(b)), c)
	}
	function eachLimit$1(a, b, c, d) {
		_eachOfLimit(b)(a, _withoutIndex(wrapAsync$1(c)), d)
	}
	function ensureAsync(a) {
		return isAsync(a) ? a : initialParams(function(b, c) {
			var d = !0;
			b.push(function() {
				var a = arguments;
				d ? setImmediate$1(function() {
					c.apply(null, a)
				}) : c.apply(null, a)
			}),
			a.apply(this, b),
			d = !1
		})
	}
	function notId(a) {
		return !a
	}
	function baseProperty(a) {
		return function(b) {
			return null == b ? void 0 : b[a]
		}
	}
	function filterArray(a, b, c, d) {
		var e = new Array(b.length);
		a(b, function(a, b, d) {
			c(a, function(a, c) {
				e[b] = !!c,
				d(a)
			})
		}, function(a) {
			if (a)
				return d(a);
			for (var c = [], f = 0; f < b.length; f++)
				e[f] && c.push(b[f]);
			d(null, c)
		})
	}
	function filterGeneric(a, b, c, d) {
		var e = [];
		a(b, function(a, b, d) {
			c(a, function(c, f) {
				c ? d(c) : (f && e.push({
					index: b,
					value: a
				}),
				d())
			})
		}, function(a) {
			a ? d(a) : d(null, arrayMap(e.sort(function(a, b) {
				return a.index - b.index
			}), baseProperty("value")))
		})
	}
	function _filter(a, b, c, d) {
		(isArrayLike(b) ? filterArray : filterGeneric)(a, b, wrapAsync$1(c), d || noop)
	}
	function forever(a, b) {
		function c(a) {
			return a ? d(a) : void e(c)
		}
		var d = onlyOnce(b || noop)
		  , e = wrapAsync$1(ensureAsync(a));
		c()
	}
	function mapValuesLimit(a, b, c, d) {
		d = once(d || noop);
		var e = {}
		  , f = wrapAsync$1(c);
		eachOfLimit(a, b, function(a, b, c) {
			f(a, b, function(a, d) {
				return a ? c(a) : (e[b] = d,
				void c())
			})
		}, function(a) {
			d(a, e)
		})
	}
	function has(a, b) {
		return b in a
	}
	function memoize(a, b) {
		var c = Object.create(null)
		  , d = Object.create(null);
		b = b || identity;
		var e = wrapAsync$1(a)
		  , f = initialParams(function(a, f) {
			var g = b.apply(null, a);
			has(c, g) ? setImmediate$1(function() {
				f.apply(null, c[g])
			}) : has(d, g) ? d[g].push(f) : (d[g] = [f],
			e.apply(null, a.concat(rest(function(a) {
				c[g] = a;
				var b = d[g];
				delete d[g];
				for (var e = 0, f = b.length; e < f; e++)
					b[e].apply(null, a)
			}))))
		});
		return f.memo = c,
		f.unmemoized = a,
		f
	}
	function _parallel(a, b, c) {
		c = c || noop;
		var d = isArrayLike(b) ? [] : {};
		a(b, function(a, b, c) {
			wrapAsync$1(a)(rest(function(a, e) {
				e.length <= 1 && (e = e[0]),
				d[b] = e,
				c(a)
			}))
		}, function(a) {
			c(a, d)
		})
	}
	function parallelLimit(a, b) {
		_parallel(eachOf, a, b)
	}
	function parallelLimit$1(a, b, c) {
		_parallel(_eachOfLimit(b), a, c)
	}
	function race(a, b) {
		if (b = once(b || noop),
		!isArray(a))
			return b(new TypeError("First argument to race must be an array of functions"));
		if (!a.length)
			return b();
		for (var c = 0, d = a.length; c < d; c++)
			wrapAsync$1(a[c])(b)
	}
	function reduceRight(a, b, c, d) {
		reduce(slice.call(a).reverse(), b, c, d)
	}
	function reflect(a) {
		var b = wrapAsync$1(a);
		return initialParams(function(a, c) {
			return a.push(rest(function(a, b) {
				if (a)
					c(null, {
						error: a
					});
				else {
					var d = null;
					1 === b.length ? d = b[0] : b.length > 1 && (d = b),
					c(null, {
						value: d
					})
				}
			})),
			b.apply(this, a)
		})
	}
	function reject$1(a, b, c, d) {
		_filter(a, b, function(a, b) {
			c(a, function(a, c) {
				b(a, !c)
			})
		}, d)
	}
	function reflectAll(a) {
		var b;
		return isArray(a) ? b = arrayMap(a, reflect) : (b = {},
		baseForOwn(a, function(a, c) {
			b[c] = reflect.call(this, a)
		})),
		b
	}
	function constant$1(a) {
		return function() {
			return a
		}
	}
	function retry(a, b, c) {
		function d(a, b) {
			if ("object" == typeof b)
				a.times = +b.times || f,
				a.intervalFunc = "function" == typeof b.interval ? b.interval : constant$1(+b.interval || g),
				a.errorFilter = b.errorFilter;
			else {
				if ("number" != typeof b && "string" != typeof b)
					throw new Error("Invalid arguments for async.retry");
				a.times = +b || f
			}
		}
		function e() {
			i(function(a) {
				a && j++ < h.times && ("function" != typeof h.errorFilter || h.errorFilter(a)) ? setTimeout(e, h.intervalFunc(j)) : c.apply(null, arguments)
			})
		}
		var f = 5
		  , g = 0
		  , h = {
			times: f,
			intervalFunc: constant$1(g)
		};
		if (arguments.length < 3 && "function" == typeof a ? (c = b || noop,
		b = a) : (d(h, a),
		c = c || noop),
		"function" != typeof b)
			throw new Error("Invalid arguments for async.retry");
		var i = wrapAsync$1(b)
		  , j = 1;
		e()
	}
	function series(a, b) {
		_parallel(eachOfSeries, a, b)
	}
	function sortBy(a, b, c) {
		function d(a, b) {
			var c = a.criteria
			  , d = b.criteria;
			return c < d ? -1 : c > d ? 1 : 0
		}
		var e = wrapAsync$1(b);
		map(a, function(a, b) {
			e(a, function(c, d) {
				return c ? b(c) : void b(null, {
					value: a,
					criteria: d
				})
			})
		}, function(a, b) {
			return a ? c(a) : void c(null, arrayMap(b.sort(d), baseProperty("value")))
		})
	}
	function timeout(a, b, c) {
		function d() {
			h || (f.apply(null, arguments),
			clearTimeout(g))
		}
		function e() {
			var b = a.name || "anonymous"
			  , d = new Error('Callback function "' + b + '" timed out.');
			d.code = "ETIMEDOUT",
			c && (d.info = c),
			h = !0,
			f(d)
		}
		var f, g, h = !1, i = wrapAsync$1(a);
		return initialParams(function(a, c) {
			f = c,
			g = setTimeout(e, b),
			i.apply(null, a.concat(d))
		})
	}
	function baseRange(a, b, c, d) {
		for (var e = -1, f = nativeMax$1(nativeCeil((b - a) / (c || 1)), 0), g = Array(f); f--; )
			g[d ? f : ++e] = a,
			a += c;
		return g
	}
	function timeLimit(a, b, c, d) {
		var e = wrapAsync$1(c);
		mapLimit(baseRange(0, a, 1), b, e, d)
	}
	function transform(a, b, c, d) {
		arguments.length <= 3 && (d = c,
		c = b,
		b = isArray(a) ? [] : {}),
		d = once(d || noop);
		var e = wrapAsync$1(c);
		eachOf(a, function(a, c, d) {
			e(b, a, c, d)
		}, function(a) {
			d(a, b)
		})
	}
	function unmemoize(a) {
		return function() {
			return (a.unmemoized || a).apply(null, arguments)
		}
	}
	function whilst(a, b, c) {
		c = onlyOnce(c || noop);
		var d = wrapAsync$1(b);
		if (!a())
			return c(null);
		var e = rest(function(b, f) {
			return b ? c(b) : a() ? d(e) : void c.apply(null, [null].concat(f))
		});
		d(e)
	}
	function until(a, b, c) {
		whilst(function() {
			return !a.apply(this, arguments)
		}, b, c)
	}
	var nativeMax = Math.max
	  , initialParams = function(a) {
		return rest(function(b) {
			var c = b.pop();
			a.call(this, b, c)
		})
	}
	  , supportsSymbol = "function" == typeof Symbol
	  , wrapAsync$1 = supportsAsync() ? wrapAsync : identity
	  , freeGlobal = "object" == typeof global && global && global.Object === Object && global
	  , freeSelf = "object" == typeof self && self && self.Object === Object && self
	  , root = freeGlobal || freeSelf || Function("return this")()
	  , Symbol$1 = root.Symbol
	  , objectProto = Object.prototype
	  , hasOwnProperty = objectProto.hasOwnProperty
	  , nativeObjectToString = objectProto.toString
	  , symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0
	  , objectProto$1 = Object.prototype
	  , nativeObjectToString$1 = objectProto$1.toString
	  , nullTag = "[object Null]"
	  , undefinedTag = "[object Undefined]"
	  , symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0
	  , asyncTag = "[object AsyncFunction]"
	  , funcTag = "[object Function]"
	  , genTag = "[object GeneratorFunction]"
	  , proxyTag = "[object Proxy]"
	  , MAX_SAFE_INTEGER = 9007199254740991
	  , breakLoop = {}
	  , iteratorSymbol = "function" == typeof Symbol && Symbol.iterator
	  , getIterator = function(a) {
		return iteratorSymbol && a[iteratorSymbol] && a[iteratorSymbol]()
	}
	  , argsTag = "[object Arguments]"
	  , objectProto$3 = Object.prototype
	  , hasOwnProperty$2 = objectProto$3.hasOwnProperty
	  , propertyIsEnumerable = objectProto$3.propertyIsEnumerable
	  , isArguments = baseIsArguments(function() {
		return arguments
	}()) ? baseIsArguments : function(a) {
		return isObjectLike(a) && hasOwnProperty$2.call(a, "callee") && !propertyIsEnumerable.call(a, "callee")
	}
	  , isArray = Array.isArray
	  , freeExports = "object" == typeof exports && exports && !exports.nodeType && exports
	  , freeModule = freeExports && "object" == typeof module && module && !module.nodeType && module
	  , moduleExports = freeModule && freeModule.exports === freeExports
	  , Buffer = moduleExports ? root.Buffer : void 0
	  , nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0
	  , isBuffer = nativeIsBuffer || stubFalse
	  , MAX_SAFE_INTEGER$1 = 9007199254740991
	  , reIsUint = /^(?:0|[1-9]\d*)$/
	  , argsTag$1 = "[object Arguments]"
	  , arrayTag = "[object Array]"
	  , boolTag = "[object Boolean]"
	  , dateTag = "[object Date]"
	  , errorTag = "[object Error]"
	  , funcTag$1 = "[object Function]"
	  , mapTag = "[object Map]"
	  , numberTag = "[object Number]"
	  , objectTag = "[object Object]"
	  , regexpTag = "[object RegExp]"
	  , setTag = "[object Set]"
	  , stringTag = "[object String]"
	  , weakMapTag = "[object WeakMap]"
	  , arrayBufferTag = "[object ArrayBuffer]"
	  , dataViewTag = "[object DataView]"
	  , float32Tag = "[object Float32Array]"
	  , float64Tag = "[object Float64Array]"
	  , int8Tag = "[object Int8Array]"
	  , int16Tag = "[object Int16Array]"
	  , int32Tag = "[object Int32Array]"
	  , uint8Tag = "[object Uint8Array]"
	  , uint8ClampedTag = "[object Uint8ClampedArray]"
	  , uint16Tag = "[object Uint16Array]"
	  , uint32Tag = "[object Uint32Array]"
	  , typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = !0,
	typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = !1;
	var freeExports$1 = "object" == typeof exports && exports && !exports.nodeType && exports, freeModule$1 = freeExports$1 && "object" == typeof module && module && !module.nodeType && module, moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1, freeProcess = moduleExports$1 && freeGlobal.process, nodeUtil = function() {
		try {
			return freeProcess && freeProcess.binding("util")
		} catch (a) {}
	}(), nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray, isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray, objectProto$2 = Object.prototype, hasOwnProperty$1 = objectProto$2.hasOwnProperty, objectProto$5 = Object.prototype, nativeKeys = overArg(Object.keys, Object), objectProto$4 = Object.prototype, hasOwnProperty$3 = objectProto$4.hasOwnProperty, eachOfGeneric = doLimit(eachOfLimit, 1 / 0), eachOf = function(a, b, c) {
		(isArrayLike(a) ? eachOfArrayLike : eachOfGeneric)(a, wrapAsync$1(b), c)
	}, map = doParallel(_asyncMap), applyEach = applyEach$1(map), mapLimit = doParallelLimit(_asyncMap), mapSeries = doLimit(mapLimit, 1), applyEachSeries = applyEach$1(mapSeries), apply$2 = rest(function(a, b) {
		return rest(function(c) {
			return a.apply(null, b.concat(c))
		})
	}), baseFor = createBaseFor(), auto = function(a, b, c) {
		function d(a, b) {
			q.push(function() {
				h(a, b)
			})
		}
		function e() {
			if (0 === q.length && 0 === n)
				return c(null, m);
			for (; q.length && n < b; ) {
				q.shift()()
			}
		}
		function f(a, b) {
			var c = p[a];
			c || (c = p[a] = []),
			c.push(b)
		}
		function g(a) {
			arrayEach(p[a] || [], function(a) {
				a()
			}),
			e()
		}
		function h(a, b) {
			if (!o) {
				var d = onlyOnce(rest(function(b, d) {
					if (n--,
					d.length <= 1 && (d = d[0]),
					b) {
						var e = {};
						baseForOwn(m, function(a, b) {
							e[b] = a
						}),
						e[a] = d,
						o = !0,
						p = Object.create(null),
						c(b, e)
					} else
						m[a] = d,
						g(a)
				}));
				n++;
				var e = wrapAsync$1(b[b.length - 1]);
				b.length > 1 ? e(m, d) : e(d)
			}
		}
		function i() {
			for (var a, b = 0; r.length; )
				a = r.pop(),
				b++,
				arrayEach(j(a), function(a) {
					0 == --s[a] && r.push(a)
				});
			if (b !== l)
				throw new Error("async.auto cannot execute tasks due to a recursive dependency")
		}
		function j(b) {
			var c = [];
			return baseForOwn(a, function(a, d) {
				isArray(a) && baseIndexOf(a, b, 0) >= 0 && c.push(d)
			}),
			c
		}
		"function" == typeof b && (c = b,
		b = null),
		c = once(c || noop);
		var k = keys(a)
		  , l = k.length;
		if (!l)
			return c(null);
		b || (b = l);
		var m = {}
		  , n = 0
		  , o = !1
		  , p = Object.create(null)
		  , q = []
		  , r = []
		  , s = {};
		baseForOwn(a, function(b, c) {
			if (!isArray(b))
				return d(c, [b]),
				void r.push(c);
			var e = b.slice(0, b.length - 1)
			  , g = e.length;
			return 0 === g ? (d(c, b),
			void r.push(c)) : (s[c] = g,
			void arrayEach(e, function(h) {
				if (!a[h])
					throw new Error("async.auto task `" + c + "` has a non-existent dependency `" + h + "` in " + e.join(", "));
				f(h, function() {
					0 === --g && d(c, b)
				})
			}))
		}),
		i(),
		e()
	}, symbolTag = "[object Symbol]", INFINITY = 1 / 0, symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0, rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23", rsComboSymbolsRange = "\\u20d0-\\u20f0", rsVarRange = "\\ufe0e\\ufe0f", rsZWJ = "\\u200d", reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + "]"), rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$1 = "\\u0300-\\u036f\\ufe20-\\ufe23", rsComboSymbolsRange$1 = "\\u20d0-\\u20f0", rsVarRange$1 = "\\ufe0e\\ufe0f", rsAstral = "[" + rsAstralRange$1 + "]", rsCombo = "[" + rsComboMarksRange$1 + rsComboSymbolsRange$1 + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange$1 + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ$1 = "\\u200d", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange$1 + "]?", rsOptJoin = "(?:" + rsZWJ$1 + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")", reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g"), reTrim = /^\s+|\s+$/g, FN_ARGS = /^(?:async\s+)?(function)?\s*[^\(]*\(\s*([^\)]*)\)/m, FN_ARG_SPLIT = /,/, FN_ARG = /(=.+)?(\s*)$/, STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, hasSetImmediate = "function" == typeof setImmediate && setImmediate, hasNextTick = "object" == typeof process && "function" == typeof process.nextTick, _defer;
	_defer = hasSetImmediate ? setImmediate : hasNextTick ? process.nextTick : fallback;
	var setImmediate$1 = wrap(_defer);
	DLL.prototype.removeLink = function(a) {
		return a.prev ? a.prev.next = a.next : this.head = a.next,
		a.next ? a.next.prev = a.prev : this.tail = a.prev,
		a.prev = a.next = null,
		this.length -= 1,
		a
	}
	,
	DLL.prototype.empty = DLL,
	DLL.prototype.insertAfter = function(a, b) {
		b.prev = a,
		b.next = a.next,
		a.next ? a.next.prev = b : this.tail = b,
		a.next = b,
		this.length += 1
	}
	,
	DLL.prototype.insertBefore = function(a, b) {
		b.prev = a.prev,
		b.next = a,
		a.prev ? a.prev.next = b : this.head = b,
		a.prev = b,
		this.length += 1
	}
	,
	DLL.prototype.unshift = function(a) {
		this.head ? this.insertBefore(this.head, a) : setInitial(this, a)
	}
	,
	DLL.prototype.push = function(a) {
		this.tail ? this.insertAfter(this.tail, a) : setInitial(this, a)
	}
	,
	DLL.prototype.shift = function() {
		return this.head && this.removeLink(this.head)
	}
	,
	DLL.prototype.pop = function() {
		return this.tail && this.removeLink(this.tail)
	}
	;
	var eachOfSeries = doLimit(eachOfLimit, 1), seq$1 = rest(function(a) {
		var b = arrayMap(a, wrapAsync$1);
		return rest(function(a) {
			var c = this
			  , d = a[a.length - 1];
			"function" == typeof d ? a.pop() : d = noop,
			reduce(b, a, function(a, b, d) {
				b.apply(c, a.concat(rest(function(a, b) {
					d(a, b)
				})))
			}, function(a, b) {
				d.apply(c, [a].concat(b))
			})
		})
	}), compose = rest(function(a) {
		return seq$1.apply(null, a.reverse())
	}), concat = doParallel(concat$1), concatSeries = doSeries(concat$1), constant = rest(function(a) {
		var b = [null].concat(a);
		return initialParams(function(a, c) {
			return c.apply(this, b)
		})
	}), detect = doParallel(_createTester(identity, _findGetResult)), detectLimit = doParallelLimit(_createTester(identity, _findGetResult)), detectSeries = doLimit(detectLimit, 1), dir = consoleFunc("dir"), eachSeries = doLimit(eachLimit$1, 1), every = doParallel(_createTester(notId, notId)), everyLimit = doParallelLimit(_createTester(notId, notId)), everySeries = doLimit(everyLimit, 1), filter = doParallel(_filter), filterLimit = doParallelLimit(_filter), filterSeries = doLimit(filterLimit, 1), groupByLimit = function(a, b, c, d) {
		d = d || noop;
		var e = wrapAsync$1(c);
		mapLimit(a, b, function(a, b) {
			e(a, function(c, d) {
				return c ? b(c) : b(null, {
					key: d,
					val: a
				})
			})
		}, function(a, b) {
			for (var c = {}, e = Object.prototype.hasOwnProperty, f = 0; f < b.length; f++)
				if (b[f]) {
					var g = b[f].key
					  , h = b[f].val;
					e.call(c, g) ? c[g].push(h) : c[g] = [h]
				}
			return d(a, c)
		})
	}, groupBy = doLimit(groupByLimit, 1 / 0), groupBySeries = doLimit(groupByLimit, 1), log = consoleFunc("log"), mapValues = doLimit(mapValuesLimit, 1 / 0), mapValuesSeries = doLimit(mapValuesLimit, 1), _defer$1;
	_defer$1 = hasNextTick ? process.nextTick : hasSetImmediate ? setImmediate : fallback;
	var nextTick = wrap(_defer$1)
	  , queue$1 = function(a, b) {
		var c = wrapAsync$1(a);
		return queue(function(a, b) {
			c(a[0], b)
		}, b, 1)
	}
	  , priorityQueue = function(a, b) {
		var c = queue$1(a, b);
		return c.push = function(a, b, d) {
			if (null == d && (d = noop),
			"function" != typeof d)
				throw new Error("task callback must be a function");
			if (c.started = !0,
			isArray(a) || (a = [a]),
			0 === a.length)
				return setImmediate$1(function() {
					c.drain()
				});
			b = b || 0;
			for (var e = c._tasks.head; e && b >= e.priority; )
				e = e.next;
			for (var f = 0, g = a.length; f < g; f++) {
				var h = {
					data: a[f],
					priority: b,
					callback: d
				};
				e ? c._tasks.insertBefore(e, h) : c._tasks.push(h)
			}
			setImmediate$1(c.process)
		}
		,
		delete c.unshift,
		c
	}
	  , slice = Array.prototype.slice
	  , reject = doParallel(reject$1)
	  , rejectLimit = doParallelLimit(reject$1)
	  , rejectSeries = doLimit(rejectLimit, 1)
	  , retryable = function(a, b) {
		b || (b = a,
		a = null);
		var c = wrapAsync$1(b);
		return initialParams(function(b, d) {
			function e(a) {
				c.apply(null, b.concat(a))
			}
			a ? retry(a, e, d) : retry(e, d)
		})
	}
	  , some = doParallel(_createTester(Boolean, identity))
	  , someLimit = doParallelLimit(_createTester(Boolean, identity))
	  , someSeries = doLimit(someLimit, 1)
	  , nativeCeil = Math.ceil
	  , nativeMax$1 = Math.max
	  , times = doLimit(timeLimit, 1 / 0)
	  , timesSeries = doLimit(timeLimit, 1)
	  , waterfall = function(a, b) {
		function c(e) {
			if (d === a.length)
				return b.apply(null, [null].concat(e));
			var f = onlyOnce(rest(function(a, d) {
				return a ? b.apply(null, [a].concat(d)) : void c(d)
			}));
			e.push(f),
			wrapAsync$1(a[d++]).apply(null, e)
		}
		if (b = once(b || noop),
		!isArray(a))
			return b(new Error("First argument to waterfall must be an array of functions"));
		if (!a.length)
			return b();
		var d = 0;
		c([])
	}
	  , index = {
		applyEach: applyEach,
		applyEachSeries: applyEachSeries,
		apply: apply$2,
		asyncify: asyncify,
		auto: auto,
		autoInject: autoInject,
		cargo: cargo,
		compose: compose,
		concat: concat,
		concatSeries: concatSeries,
		constant: constant,
		detect: detect,
		detectLimit: detectLimit,
		detectSeries: detectSeries,
		dir: dir,
		doDuring: doDuring,
		doUntil: doUntil,
		doWhilst: doWhilst,
		during: during,
		each: eachLimit,
		eachLimit: eachLimit$1,
		eachOf: eachOf,
		eachOfLimit: eachOfLimit,
		eachOfSeries: eachOfSeries,
		eachSeries: eachSeries,
		ensureAsync: ensureAsync,
		every: every,
		everyLimit: everyLimit,
		everySeries: everySeries,
		filter: filter,
		filterLimit: filterLimit,
		filterSeries: filterSeries,
		forever: forever,
		groupBy: groupBy,
		groupByLimit: groupByLimit,
		groupBySeries: groupBySeries,
		log: log,
		map: map,
		mapLimit: mapLimit,
		mapSeries: mapSeries,
		mapValues: mapValues,
		mapValuesLimit: mapValuesLimit,
		mapValuesSeries: mapValuesSeries,
		memoize: memoize,
		nextTick: nextTick,
		parallel: parallelLimit,
		parallelLimit: parallelLimit$1,
		priorityQueue: priorityQueue,
		queue: queue$1,
		race: race,
		reduce: reduce,
		reduceRight: reduceRight,
		reflect: reflect,
		reflectAll: reflectAll,
		reject: reject,
		rejectLimit: rejectLimit,
		rejectSeries: rejectSeries,
		retry: retry,
		retryable: retryable,
		seq: seq$1,
		series: series,
		setImmediate: setImmediate$1,
		some: some,
		someLimit: someLimit,
		someSeries: someSeries,
		sortBy: sortBy,
		timeout: timeout,
		times: times,
		timesLimit: timeLimit,
		timesSeries: timesSeries,
		transform: transform,
		unmemoize: unmemoize,
		until: until,
		waterfall: waterfall,
		whilst: whilst,
		all: every,
		any: some,
		forEach: eachLimit,
		forEachSeries: eachSeries,
		forEachLimit: eachLimit$1,
		forEachOf: eachOf,
		forEachOfSeries: eachOfSeries,
		forEachOfLimit: eachOfLimit,
		inject: reduce,
		foldl: reduce,
		foldr: reduceRight,
		select: filter,
		selectLimit: filterLimit,
		selectSeries: filterSeries,
		wrapSync: asyncify
	};
	exports.default = index,
	exports.applyEach = applyEach,
	exports.applyEachSeries = applyEachSeries,
	exports.apply = apply$2,
	exports.asyncify = asyncify,
	exports.auto = auto,
	exports.autoInject = autoInject,
	exports.cargo = cargo,
	exports.compose = compose,
	exports.concat = concat,
	exports.concatSeries = concatSeries,
	exports.constant = constant,
	exports.detect = detect,
	exports.detectLimit = detectLimit,
	exports.detectSeries = detectSeries,
	exports.dir = dir,
	exports.doDuring = doDuring,
	exports.doUntil = doUntil,
	exports.doWhilst = doWhilst,
	exports.during = during,
	exports.each = eachLimit,
	exports.eachLimit = eachLimit$1,
	exports.eachOf = eachOf,
	exports.eachOfLimit = eachOfLimit,
	exports.eachOfSeries = eachOfSeries,
	exports.eachSeries = eachSeries,
	exports.ensureAsync = ensureAsync,
	exports.every = every,
	exports.everyLimit = everyLimit,
	exports.everySeries = everySeries,
	exports.filter = filter,
	exports.filterLimit = filterLimit,
	exports.filterSeries = filterSeries,
	exports.forever = forever,
	exports.groupBy = groupBy,
	exports.groupByLimit = groupByLimit,
	exports.groupBySeries = groupBySeries,
	exports.log = log,
	exports.map = map,
	exports.mapLimit = mapLimit,
	exports.mapSeries = mapSeries,
	exports.mapValues = mapValues,
	exports.mapValuesLimit = mapValuesLimit,
	exports.mapValuesSeries = mapValuesSeries,
	exports.memoize = memoize,
	exports.nextTick = nextTick,
	exports.parallel = parallelLimit,
	exports.parallelLimit = parallelLimit$1,
	exports.priorityQueue = priorityQueue,
	exports.queue = queue$1,
	exports.race = race,
	exports.reduce = reduce,
	exports.reduceRight = reduceRight,
	exports.reflect = reflect,
	exports.reflectAll = reflectAll,
	exports.reject = reject,
	exports.rejectLimit = rejectLimit,
	exports.rejectSeries = rejectSeries,
	exports.retry = retry,
	exports.retryable = retryable,
	exports.seq = seq$1,
	exports.series = series,
	exports.setImmediate = setImmediate$1,
	exports.some = some,
	exports.someLimit = someLimit,
	exports.someSeries = someSeries,
	exports.sortBy = sortBy,
	exports.timeout = timeout,
	exports.times = times,
	exports.timesLimit = timeLimit,
	exports.timesSeries = timesSeries,
	exports.transform = transform,
	exports.unmemoize = unmemoize,
	exports.until = until,
	exports.waterfall = waterfall,
	exports.whilst = whilst,
	exports.all = every,
	exports.allLimit = everyLimit,
	exports.allSeries = everySeries,
	exports.any = some,
	exports.anyLimit = someLimit,
	exports.anySeries = someSeries,
	exports.find = detect,
	exports.findLimit = detectLimit,
	exports.findSeries = detectSeries,
	exports.forEach = eachLimit,
	exports.forEachSeries = eachSeries,
	exports.forEachLimit = eachLimit$1,
	exports.forEachOf = eachOf,
	exports.forEachOfSeries = eachOfSeries,
	exports.forEachOfLimit = eachOfLimit,
	exports.inject = reduce,
	exports.foldl = reduce,
	exports.foldr = reduceRight,
	exports.select = filter,
	exports.selectLimit = filterLimit,
	exports.selectSeries = filterSeries,
	exports.wrapSync = asyncify,
	Object.defineProperty(exports, "__esModule", {
		value: !0
	})
});
var device = function() {
	var a = navigator.userAgent.toLowerCase()
	  , b = function(b) {
		return void 0 === b ? b = a : a = b.toLowerCase(),
		/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(a) ? "tablet" : /(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(a) ? "phone" : "desktop"
	};
	return {
		device: b(),
		detect: b,
		isMobile: "desktop" != b(),
		userAgent: a
	}
}();
window.device = device,
function(a, b) {
	"object" == typeof module && module.exports ? module.exports = a.document ? b(a) : b : a.Highcharts = b(a)
}("undefined" != typeof window ? window : this, function(a) {
	a = function() {
		var a = window
		  , b = a.document
		  , c = a.navigator && a.navigator.userAgent || ""
		  , d = b && b.createElementNS && !!b.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
		  , e = /(edge|msie|trident)/i.test(c) && !window.opera
		  , f = !d
		  , g = /Firefox/.test(c)
		  , h = g && 4 > parseInt(c.split("Firefox/")[1], 10);
		return a.Highcharts ? a.Highcharts.error(16, !0) : {
			product: "Highstock",
			version: "5.0.14",
			deg2rad: 2 * Math.PI / 360,
			doc: b,
			hasBidiBug: h,
			hasTouch: b && void 0 !== b.documentElement.ontouchstart,
			isMS: e,
			isWebKit: /AppleWebKit/.test(c),
			isFirefox: g,
			isTouchDevice: /(Mobile|Android|Windows Phone)/.test(c),
			SVG_NS: "http://www.w3.org/2000/svg",
			chartCount: 0,
			seriesTypes: {},
			symbolSizes: {},
			svg: d,
			vml: f,
			win: a,
			marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
			noop: function() {},
			charts: []
		}
	}(),
	function(a) {
		var b = []
		  , c = a.charts
		  , d = a.doc
		  , e = a.win;
		a.error = function(b, c) {
			if (b = a.isNumber(b) ? "Highcharts error #" + b + ": www.highcharts.com/errors/" + b : b,
			c)
				throw Error(b);
			e.console && console.log(b)
		}
		,
		a.Fx = function(a, b, c) {
			this.options = b,
			this.elem = a,
			this.prop = c
		}
		,
		a.Fx.prototype = {
			dSetter: function() {
				var a, b = this.paths[0], c = this.paths[1], d = [], e = this.now, f = b.length;
				if (1 === e)
					d = this.toD;
				else if (f === c.length && 1 > e)
					for (; f--; )
						a = parseFloat(b[f]),
						d[f] = isNaN(a) ? b[f] : e * parseFloat(c[f] - a) + a;
				else
					d = c;
				this.elem.attr("d", d, null, !0)
			},
			update: function() {
				var a = this.elem
				  , b = this.prop
				  , c = this.now
				  , d = this.options.step;
				this[b + "Setter"] ? this[b + "Setter"]() : a.attr ? a.element && a.attr(b, c, null, !0) : a.style[b] = c + this.unit,
				d && d.call(a, c, this)
			},
			run: function(a, c, d) {
				var e, f = this, g = function(a) {
					return !g.stopped && f.step(a)
				};
				this.startTime = +new Date,
				this.start = a,
				this.end = c,
				this.unit = d,
				this.now = this.start,
				this.pos = 0,
				g.elem = this.elem,
				g.prop = this.prop,
				g() && 1 === b.push(g) && (g.timerId = setInterval(function() {
					for (e = 0; e < b.length; e++)
						b[e]() || b.splice(e--, 1);
					b.length || clearInterval(g.timerId)
				}, 13))
			},
			step: function(b) {
				var c, d = +new Date, e = this.options, f = this.elem, g = e.complete, h = e.duration, i = e.curAnim;
				return f.attr && !f.element ? b = !1 : b || d >= h + this.startTime ? (this.now = this.end,
				this.pos = 1,
				this.update(),
				c = i[this.prop] = !0,
				a.objectEach(i, function(a) {
					!0 !== a && (c = !1)
				}),
				c && g && g.call(f),
				b = !1) : (this.pos = e.easing((d - this.startTime) / h),
				this.now = this.start + (this.end - this.start) * this.pos,
				this.update(),
				b = !0),
				b
			},
			initPath: function(b, c, d) {
				function e(a) {
					var b, c;
					for (k = a.length; k--; )
						b = "M" === a[k] || "L" === a[k],
						c = /[a-zA-Z]/.test(a[k + 3]),
						b && c && a.splice(k + 1, 0, a[k + 1], a[k + 2], a[k + 1], a[k + 2])
				}
				function f(a, b) {
					for (; a.length < i; ) {
						a[0] = b[i - a.length];
						var c = a.slice(0, o);
						[].splice.apply(a, [0, 0].concat(c)),
						q && (c = a.slice(a.length - o),
						[].splice.apply(a, [a.length, 0].concat(c)),
						k--)
					}
					a[0] = "M"
				}
				function g(a, b) {
					for (var c = (i - a.length) / o; 0 < c && c--; )
						j = a.slice().splice(a.length / r - o, o * r),
						j[0] = b[i - o - c * o],
						n && (j[o - 6] = j[o - 2],
						j[o - 5] = j[o - 1]),
						[].splice.apply(a, [a.length / r, 0].concat(j)),
						q && c--
				}
				c = c || "";
				var h, i, j, k, l = b.startX, m = b.endX, n = -1 < c.indexOf("C"), o = n ? 7 : 3;
				c = c.split(" "),
				d = d.slice();
				var p, q = b.isArea, r = q ? 2 : 1;
				if (n && (e(c),
				e(d)),
				l && m) {
					for (k = 0; k < l.length; k++) {
						if (l[k] === m[0]) {
							h = k;
							break
						}
						if (l[0] === m[m.length - l.length + k]) {
							h = k,
							p = !0;
							break
						}
					}
					void 0 === h && (c = [])
				}
				return c.length && a.isNumber(h) && (i = d.length + h * r * o,
				p ? (f(c, d),
				g(d, c)) : (f(d, c),
				g(c, d))),
				[c, d]
			}
		},
		a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter = function() {
			this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
		}
		,
		a.extend = function(a, b) {
			var c;
			a || (a = {});
			for (c in b)
				a[c] = b[c];
			return a
		}
		,
		a.merge = function() {
			var b, c, d = arguments, e = {}, f = function(b, c) {
				return "object" != typeof b && (b = {}),
				a.objectEach(c, function(d, e) {
					!a.isObject(d, !0) || a.isClass(d) || a.isDOMElement(d) ? b[e] = c[e] : b[e] = f(b[e] || {}, d)
				}),
				b
			};
			for (!0 === d[0] && (e = d[1],
			d = Array.prototype.slice.call(d, 2)),
			c = d.length,
			b = 0; b < c; b++)
				e = f(e, d[b]);
			return e
		}
		,
		a.pInt = function(a, b) {
			return parseInt(a, b || 10)
		}
		,
		a.isString = function(a) {
			return "string" == typeof a
		}
		,
		a.isArray = function(a) {
			return "[object Array]" === (a = Object.prototype.toString.call(a)) || "[object Array Iterator]" === a
		}
		,
		a.isObject = function(b, c) {
			return !(!b || "object" != typeof b || c && a.isArray(b))
		}
		,
		a.isDOMElement = function(b) {
			return a.isObject(b) && "number" == typeof b.nodeType
		}
		,
		a.isClass = function(b) {
			var c = b && b.constructor;
			return !(!a.isObject(b, !0) || a.isDOMElement(b) || !c || !c.name || "Object" === c.name)
		}
		,
		a.isNumber = function(a) {
			return "number" == typeof a && !isNaN(a)
		}
		,
		a.erase = function(a, b) {
			for (var c = a.length; c--; )
				if (a[c] === b) {
					a.splice(c, 1);
					break
				}
		}
		,
		a.defined = function(a) {
			return void 0 !== a && null !== a
		}
		,
		a.attr = function(b, c, d) {
			var e;
			return a.isString(c) ? a.defined(d) ? b.setAttribute(c, d) : b && b.getAttribute && (e = b.getAttribute(c)) : a.defined(c) && a.isObject(c) && a.objectEach(c, function(a, c) {
				b.setAttribute(c, a)
			}),
			e
		}
		,
		a.splat = function(b) {
			return a.isArray(b) ? b : [b]
		}
		,
		a.syncTimeout = function(a, b, c) {
			if (b)
				return setTimeout(a, b, c);
			a.call(0, c)
		}
		,
		a.pick = function() {
			var a, b, c = arguments, d = c.length;
			for (a = 0; a < d; a++)
				if (void 0 !== (b = c[a]) && null !== b)
					return b
		}
		,
		a.css = function(b, c) {
			a.isMS && !a.svg && c && void 0 !== c.opacity && (c.filter = "alpha(opacity=" + 100 * c.opacity + ")"),
			a.extend(b.style, c)
		}
		,
		a.createElement = function(b, c, e, f, g) {
			b = d.createElement(b);
			var h = a.css;
			return c && a.extend(b, c),
			g && h(b, {
				padding: 0,
				border: "none",
				margin: 0
			}),
			e && h(b, e),
			f && f.appendChild(b),
			b
		}
		,
		a.extendClass = function(b, c) {
			var d = function() {};
			return d.prototype = new b,
			a.extend(d.prototype, c),
			d
		}
		,
		a.pad = function(a, b, c) {
			return Array((b || 2) + 1 - String(a).length).join(c || 0) + a
		}
		,
		a.relativeLength = function(a, b, c) {
			return /%$/.test(a) ? b * parseFloat(a) / 100 + (c || 0) : parseFloat(a)
		}
		,
		a.wrap = function(a, b, c) {
			var d = a[b];
			a[b] = function() {
				var a = Array.prototype.slice.call(arguments)
				  , b = arguments
				  , e = this;
				return e.proceed = function() {
					d.apply(e, arguments.length ? arguments : b)
				}
				,
				a.unshift(d),
				a = c.apply(this, a),
				e.proceed = null,
				a
			}
		}
		,
		a.getTZOffset = function(b) {
			var c = a.Date;
			return 6e4 * (c.hcGetTimezoneOffset && c.hcGetTimezoneOffset(b) || c.hcTimezoneOffset || 0)
		}
		,
		a.dateFormat = function(b, c, d) {
			if (!a.defined(c) || isNaN(c))
				return a.defaultOptions.lang.invalidDate || "";
			b = a.pick(b, "%Y-%m-%d %H:%M:%S");
			var e = a.Date
			  , f = new e(c - a.getTZOffset(c))
			  , g = f[e.hcGetHours]()
			  , h = f[e.hcGetDay]()
			  , i = f[e.hcGetDate]()
			  , j = f[e.hcGetMonth]()
			  , k = f[e.hcGetFullYear]()
			  , l = a.defaultOptions.lang
			  , m = l.weekdays
			  , n = l.shortWeekdays
			  , o = a.pad
			  , e = a.extend({
				a: n ? n[h] : m[h].substr(0, 3),
				A: m[h],
				d: o(i),
				e: o(i, 2, " "),
				w: h,
				b: l.shortMonths[j],
				B: l.months[j],
				m: o(j + 1),
				y: k.toString().substr(2, 2),
				Y: k,
				H: o(g),
				k: g,
				I: o(g % 12 || 12),
				l: g % 12 || 12,
				M: o(f[e.hcGetMinutes]()),
				p: 12 > g ? "AM" : "PM",
				P: 12 > g ? "am" : "pm",
				S: o(f.getSeconds()),
				L: o(Math.round(c % 1e3), 3)
			}, a.dateFormats);
			return a.objectEach(e, function(a, d) {
				for (; -1 !== b.indexOf("%" + d); )
					b = b.replace("%" + d, "function" == typeof a ? a(c) : a)
			}),
			d ? b.substr(0, 1).toUpperCase() + b.substr(1) : b
		}
		,
		a.formatSingle = function(b, c) {
			var d = /\.([0-9])/
			  , e = a.defaultOptions.lang;
			return /f$/.test(b) ? (d = (d = b.match(d)) ? d[1] : -1,
			null !== c && (c = a.numberFormat(c, d, e.decimalPoint, -1 < b.indexOf(",") ? e.thousandsSep : ""))) : c = a.dateFormat(b, c),
			c
		}
		,
		a.format = function(b, c) {
			for (var d, e, f, g, h, i = "{", j = !1, k = []; b && -1 !== (i = b.indexOf(i)); ) {
				if (d = b.slice(0, i),
				j) {
					for (d = d.split(":"),
					e = d.shift().split("."),
					g = e.length,
					h = c,
					f = 0; f < g; f++)
						h = h[e[f]];
					d.length && (h = a.formatSingle(d.join(":"), h)),
					k.push(h)
				} else
					k.push(d);
				b = b.slice(i + 1),
				i = (j = !j) ? "}" : "{"
			}
			return k.push(b),
			k.join("")
		}
		,
		a.getMagnitude = function(a) {
			return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
		}
		,
		a.normalizeTickInterval = function(b, c, d, e, f) {
			var g, h = b;
			for (d = a.pick(d, 1),
			g = b / d,
			c || (c = f ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10],
			!1 === e && (1 === d ? c = a.grep(c, function(a) {
				return 0 == a % 1
			}) : .1 >= d && (c = [1 / d]))),
			e = 0; e < c.length && (h = c[e],
			!(f && h * d >= b || !f && g <= (c[e] + (c[e + 1] || c[e])) / 2)); e++)
				;
			return h = a.correctFloat(h * d, -Math.round(Math.log(.001) / Math.LN10))
		}
		,
		a.stableSort = function(a, b) {
			var c, d, e = a.length;
			for (d = 0; d < e; d++)
				a[d].safeI = d;
			for (a.sort(function(a, d) {
				return c = b(a, d),
				0 === c ? a.safeI - d.safeI : c
			}),
			d = 0; d < e; d++)
				delete a[d].safeI
		}
		,
		a.arrayMin = function(a) {
			for (var b = a.length, c = a[0]; b--; )
				a[b] < c && (c = a[b]);
			return c
		}
		,
		a.arrayMax = function(a) {
			for (var b = a.length, c = a[0]; b--; )
				a[b] > c && (c = a[b]);
			return c
		}
		,
		a.destroyObjectProperties = function(b, c) {
			a.objectEach(b, function(a, d) {
				a && a !== c && a.destroy && a.destroy(),
				delete b[d]
			})
		}
		,
		a.discardElement = function(b) {
			var c = a.garbageBin;
			c || (c = a.createElement("div")),
			b && c.appendChild(b),
			c.innerHTML = ""
		}
		,
		a.correctFloat = function(a, b) {
			return parseFloat(a.toPrecision(b || 14))
		}
		,
		a.setAnimation = function(b, c) {
			c.renderer.globalAnimation = a.pick(b, c.options.chart.animation, !0)
		}
		,
		a.animObject = function(b) {
			return a.isObject(b) ? a.merge(b) : {
				duration: b ? 500 : 0
			}
		}
		,
		a.timeUnits = {
			millisecond: 1,
			second: 1e3,
			minute: 6e4,
			hour: 36e5,
			day: 864e5,
			week: 6048e5,
			month: 24192e5,
			year: 314496e5
		},
		a.numberFormat = function(b, c, d, e) {
			b = +b || 0,
			c = +c;
			var f, g, h = a.defaultOptions.lang, i = (b.toString().split(".")[1] || "").split("e")[0].length, j = b.toString().split("e");
			return -1 === c ? c = Math.min(i, 20) : a.isNumber(c) || (c = 2),
			g = (Math.abs(j[1] ? j[0] : b) + Math.pow(10, -Math.max(c, i) - 1)).toFixed(c),
			i = String(a.pInt(g)),
			f = 3 < i.length ? i.length % 3 : 0,
			d = a.pick(d, h.decimalPoint),
			e = a.pick(e, h.thousandsSep),
			b = (0 > b ? "-" : "") + (f ? i.substr(0, f) + e : ""),
			b += i.substr(f).replace(/(\d{3})(?=\d)/g, "$1" + e),
			c && (b += d + g.slice(-c)),
			j[1] && (b += "e" + j[1]),
			b
		}
		,
		Math.easeInOutSine = function(a) {
			return -.5 * (Math.cos(Math.PI * a) - 1)
		}
		,
		a.getStyle = function(b, c, d) {
			return "width" === c ? Math.min(b.offsetWidth, b.scrollWidth) - a.getStyle(b, "padding-left") - a.getStyle(b, "padding-right") : "height" === c ? Math.min(b.offsetHeight, b.scrollHeight) - a.getStyle(b, "padding-top") - a.getStyle(b, "padding-bottom") : ((b = e.getComputedStyle(b, void 0)) && (b = b.getPropertyValue(c),
			a.pick(d, !0) && (b = a.pInt(b))),
			b)
		}
		,
		a.inArray = function(a, b) {
			return b.indexOf ? b.indexOf(a) : [].indexOf.call(b, a)
		}
		,
		a.grep = function(a, b) {
			return [].filter.call(a, b)
		}
		,
		a.find = function(a, b) {
			return [].find.call(a, b)
		}
		,
		a.map = function(a, b) {
			for (var c = [], d = 0, e = a.length; d < e; d++)
				c[d] = b.call(a[d], a[d], d, a);
			return c
		}
		,
		a.offset = function(a) {
			var b = d.documentElement;
			return a = a.getBoundingClientRect(),
			{
				top: a.top + (e.pageYOffset || b.scrollTop) - (b.clientTop || 0),
				left: a.left + (e.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
			}
		}
		,
		a.stop = function(a, c) {
			for (var d = b.length; d--; )
				b[d].elem !== a || c && c !== b[d].prop || (b[d].stopped = !0)
		}
		,
		a.each = function(a, b, c) {
			return Array.prototype.forEach.call(a, b, c)
		}
		,
		a.objectEach = function(a, b, c) {
			for (var d in a)
				a.hasOwnProperty(d) && b.call(c, a[d], d, a)
		}
		,
		a.addEvent = function(b, c, d) {
			function f(a) {
				a.target = a.srcElement || e,
				d.call(b, a)
			}
			var g = b.hcEvents = b.hcEvents || {};
			return b.addEventListener ? b.addEventListener(c, d, !1) : b.attachEvent && (b.hcEventsIE || (b.hcEventsIE = {}),
			d.hcGetKey || (d.hcGetKey = a.uniqueKey()),
			b.hcEventsIE[d.hcGetKey] = f,
			b.attachEvent("on" + c, f)),
			g[c] || (g[c] = []),
			g[c].push(d),
			function() {
				a.removeEvent(b, c, d)
			}
		}
		,
		a.removeEvent = function(b, c, d) {
			function e(a, c) {
				b.removeEventListener ? b.removeEventListener(a, c, !1) : b.attachEvent && (c = b.hcEventsIE[c.hcGetKey],
				b.detachEvent("on" + a, c))
			}
			function f() {
				var d, f;
				b.nodeName && (c ? (d = {},
				d[c] = !0) : d = i,
				a.objectEach(d, function(a, b) {
					if (i[b])
						for (f = i[b].length; f--; )
							e(b, i[b][f])
				}))
			}
			var g, h, i = b.hcEvents;
			i && (c ? (g = i[c] || [],
			d ? (h = a.inArray(d, g),
			-1 < h && (g.splice(h, 1),
			i[c] = g),
			e(c, d)) : (f(),
			i[c] = [])) : (f(),
			b.hcEvents = {}))
		}
		,
		a.fireEvent = function(b, c, e, f) {
			var g;
			g = b.hcEvents;
			var h, i;
			if (e = e || {},
			d.createEvent && (b.dispatchEvent || b.fireEvent))
				g = d.createEvent("Events"),
				g.initEvent(c, !0, !0),
				a.extend(g, e),
				b.dispatchEvent ? b.dispatchEvent(g) : b.fireEvent(c, g);
			else if (g)
				for (g = g[c] || [],
				h = g.length,
				e.target || a.extend(e, {
					preventDefault: function() {
						e.defaultPrevented = !0
					},
					target: b,
					type: c
				}),
				c = 0; c < h; c++)
					(i = g[c]) && !1 === i.call(b, e) && e.preventDefault();
			f && !e.defaultPrevented && f(e)
		}
		,
		a.animate = function(b, c, d) {
			var e, f, g, h, i = "";
			a.isObject(d) || (h = arguments,
			d = {
				duration: h[2],
				easing: h[3],
				complete: h[4]
			}),
			a.isNumber(d.duration) || (d.duration = 400),
			d.easing = "function" == typeof d.easing ? d.easing : Math[d.easing] || Math.easeInOutSine,
			d.curAnim = a.merge(c),
			a.objectEach(c, function(h, j) {
				a.stop(b, j),
				g = new a.Fx(b,d,j),
				f = null,
				"d" === j ? (g.paths = g.initPath(b, b.d, c.d),
				g.toD = c.d,
				e = 0,
				f = 1) : b.attr ? e = b.attr(j) : (e = parseFloat(a.getStyle(b, j)) || 0,
				"opacity" !== j && (i = "px")),
				f || (f = h),
				f && f.match && f.match("px") && (f = f.replace(/px/g, "")),
				g.run(e, f, i)
			})
		}
		,
		a.seriesType = function(b, c, d, e, f) {
			var g = a.getOptions()
			  , h = a.seriesTypes;
			return g.plotOptions[b] = a.merge(g.plotOptions[c], d),
			h[b] = a.extendClass(h[c] || function() {}
			, e),
			h[b].prototype.type = b,
			f && (h[b].prototype.pointClass = a.extendClass(a.Point, f)),
			h[b]
		}
		,
		a.uniqueKey = function() {
			var a = Math.random().toString(36).substring(2, 9)
			  , b = 0;
			return function() {
				return "highcharts-" + a + "-" + b++
			}
		}(),
		e.jQuery && (e.jQuery.fn.highcharts = function() {
			var b = [].slice.call(arguments);
			if (this[0])
				return b[0] ? (new (a[a.isString(b[0]) ? b.shift() : "Chart"])(this[0],b[0],b[1]),
				this) : c[a.attr(this[0], "data-highcharts-chart")]
		}
		),
		d && !d.defaultView && (a.getStyle = function(b, c) {
			var d = {
				width: "clientWidth",
				height: "clientHeight"
			}[c];
			return b.style[c] ? a.pInt(b.style[c]) : ("opacity" === c && (c = "filter"),
			d ? (b.style.zoom = 1,
			Math.max(b[d] - 2 * a.getStyle(b, "padding"), 0)) : (b = b.currentStyle[c.replace(/\-(\w)/g, function(a, b) {
				return b.toUpperCase()
			})],
			"filter" === c && (b = b.replace(/alpha\(opacity=([0-9]+)\)/, function(a, b) {
				return b / 100
			})),
			"" === b ? 1 : a.pInt(b)))
		}
		),
		Array.prototype.forEach || (a.each = function(a, b, c) {
			for (var d = 0, e = a.length; d < e; d++)
				if (!1 === b.call(c, a[d], d, a))
					return d
		}
		),
		Array.prototype.indexOf || (a.inArray = function(a, b) {
			var c, d = 0;
			if (b)
				for (c = b.length; d < c; d++)
					if (b[d] === a)
						return d;
			return -1
		}
		),
		Array.prototype.filter || (a.grep = function(a, b) {
			for (var c = [], d = 0, e = a.length; d < e; d++)
				b(a[d], d) && c.push(a[d]);
			return c
		}
		),
		Array.prototype.find || (a.find = function(a, b) {
			var c, d = a.length;
			for (c = 0; c < d; c++)
				if (b(a[c], c))
					return a[c]
		}
		)
	}(a),
	function(a) {
		var b = a.each
		  , c = a.isNumber
		  , d = a.map
		  , e = a.merge
		  , f = a.pInt;
		a.Color = function(b) {
			if (!(this instanceof a.Color))
				return new a.Color(b);
			this.init(b)
		}
		,
		a.Color.prototype = {
			parsers: [{
				regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
				parse: function(a) {
					return [f(a[1]), f(a[2]), f(a[3]), parseFloat(a[4], 10)]
				}
			}, {
				regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
				parse: function(a) {
					return [f(a[1]), f(a[2]), f(a[3]), 1]
				}
			}],
			names: {
				none: "rgba(255,255,255,0)",
				white: "#ffffff",
				black: "#000000"
			},
			init: function(b) {
				var c, e, f, g;
				if ((this.input = b = this.names[b && b.toLowerCase ? b.toLowerCase() : ""] || b) && b.stops)
					this.stops = d(b.stops, function(b) {
						return new a.Color(b[1])
					});
				else if (b && "#" === b.charAt() && (c = b.length,
				b = parseInt(b.substr(1), 16),
				7 === c ? e = [(16711680 & b) >> 16, (65280 & b) >> 8, 255 & b, 1] : 4 === c && (e = [(3840 & b) >> 4 | (3840 & b) >> 8, (240 & b) >> 4 | 240 & b, (15 & b) << 4 | 15 & b, 1])),
				!e)
					for (f = this.parsers.length; f-- && !e; )
						g = this.parsers[f],
						(c = g.regex.exec(b)) && (e = g.parse(c));
				this.rgba = e || []
			},
			get: function(a) {
				var d, f = this.input, g = this.rgba;
				return this.stops ? (d = e(f),
				d.stops = [].concat(d.stops),
				b(this.stops, function(b, c) {
					d.stops[c] = [d.stops[c][0], b.get(a)]
				})) : d = g && c(g[0]) ? "rgb" === a || !a && 1 === g[3] ? "rgb(" + g[0] + "," + g[1] + "," + g[2] + ")" : "a" === a ? g[3] : "rgba(" + g.join(",") + ")" : f,
				d
			},
			brighten: function(a) {
				var d, e = this.rgba;
				if (this.stops)
					b(this.stops, function(b) {
						b.brighten(a)
					});
				else if (c(a) && 0 !== a)
					for (d = 0; 3 > d; d++)
						e[d] += f(255 * a),
						0 > e[d] && (e[d] = 0),
						255 < e[d] && (e[d] = 255);
				return this
			},
			setOpacity: function(a) {
				return this.rgba[3] = a,
				this
			},
			tweenTo: function(a, b) {
				var c, d;
				return a.rgba.length ? (c = this.rgba,
				a = a.rgba,
				d = 1 !== a[3] || 1 !== c[3],
				a = (d ? "rgba(" : "rgb(") + Math.round(a[0] + (c[0] - a[0]) * (1 - b)) + "," + Math.round(a[1] + (c[1] - a[1]) * (1 - b)) + "," + Math.round(a[2] + (c[2] - a[2]) * (1 - b)) + (d ? "," + (a[3] + (c[3] - a[3]) * (1 - b)) : "") + ")") : a = a.input || "none",
				a
			}
		},
		a.color = function(b) {
			return new a.Color(b)
		}
	}(a),
	function(a) {
		var b, c, d = a.addEvent, e = a.animate, f = a.attr, g = a.charts, h = a.color, i = a.css, j = a.createElement, k = a.defined, l = a.deg2rad, m = a.destroyObjectProperties, n = a.doc, o = a.each, p = a.extend, q = a.erase, r = a.grep, s = a.hasTouch, t = a.inArray, u = a.isArray, v = a.isFirefox, w = a.isMS, x = a.isObject, y = a.isString, z = a.isWebKit, A = a.merge, B = a.noop, C = a.objectEach, D = a.pick, E = a.pInt, F = a.removeEvent, G = a.stop, H = a.svg, I = a.SVG_NS, J = a.symbolSizes, K = a.win;
		b = a.SVGElement = function() {
			return this
		}
		,
		p(b.prototype, {
			opacity: 1,
			SVG_NS: I,
			textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
			init: function(a, b) {
				this.element = "span" === b ? j(b) : n.createElementNS(this.SVG_NS, b),
				this.renderer = a
			},
			animate: function(b, c, d) {
				return c = a.animObject(D(c, this.renderer.globalAnimation, !0)),
				0 !== c.duration ? (d && (c.complete = d),
				e(this, b, c)) : (this.attr(b, null, d),
				c.step && c.step.call(this)),
				this
			},
			colorGradient: function(b, c, d) {
				var e, f, g, h, i, j, l, m, n, p, q, r = this.renderer, s = [];
				b.radialGradient ? f = "radialGradient" : b.linearGradient && (f = "linearGradient"),
				f && (g = b[f],
				i = r.gradients,
				l = b.stops,
				p = d.radialReference,
				u(g) && (b[f] = g = {
					x1: g[0],
					y1: g[1],
					x2: g[2],
					y2: g[3],
					gradientUnits: "userSpaceOnUse"
				}),
				"radialGradient" === f && p && !k(g.gradientUnits) && (h = g,
				g = A(g, r.getRadialAttr(p, h), {
					gradientUnits: "userSpaceOnUse"
				})),
				C(g, function(a, b) {
					"id" !== b && s.push(b, a)
				}),
				C(l, function(a) {
					s.push(a)
				}),
				s = s.join(","),
				i[s] ? p = i[s].attr("id") : (g.id = p = a.uniqueKey(),
				i[s] = j = r.createElement(f).attr(g).add(r.defs),
				j.radAttr = h,
				j.stops = [],
				o(l, function(b) {
					0 === b[1].indexOf("rgba") ? (e = a.color(b[1]),
					m = e.get("rgb"),
					n = e.get("a")) : (m = b[1],
					n = 1),
					b = r.createElement("stop").attr({
						offset: b[0],
						"stop-color": m,
						"stop-opacity": n
					}).add(j),
					j.stops.push(b)
				})),
				q = "url(" + r.url + "#" + p + ")",
				d.setAttribute(c, q),
				d.gradient = s,
				b.toString = function() {
					return q
				}
				)
			},
			applyTextOutline: function(b) {
				var c, d, e, g, h, i = this.element;
				if (-1 !== b.indexOf("contrast") && (b = b.replace(/contrast/g, this.renderer.getContrast(i.style.fill))),
				b = b.split(" "),
				d = b[b.length - 1],
				(e = b[0]) && "none" !== e && a.svg) {
					for (this.fakeTS = !0,
					b = [].slice.call(i.getElementsByTagName("tspan")),
					this.ySetter = this.xSetter,
					e = e.replace(/(^[\d\.]+)(.*?)$/g, function(a, b, c) {
						return 2 * b + c
					}),
					h = b.length; h--; )
						c = b[h],
						"highcharts-text-outline" === c.getAttribute("class") && q(b, i.removeChild(c));
					g = i.firstChild,
					o(b, function(a, b) {
						0 === b && (a.setAttribute("x", i.getAttribute("x")),
						b = i.getAttribute("y"),
						a.setAttribute("y", b || 0),
						null === b && i.setAttribute("y", 0)),
						a = a.cloneNode(1),
						f(a, {
							class: "highcharts-text-outline",
							fill: d,
							stroke: d,
							"stroke-width": e,
							"stroke-linejoin": "round"
						}),
						i.insertBefore(a, g)
					})
				}
			},
			attr: function(a, b, c, d) {
				var e, f, g, h, i = this.element, j = this;
				return "string" == typeof a && void 0 !== b && (e = a,
				a = {},
				a[e] = b),
				"string" == typeof a ? j = (this[a + "Getter"] || this._defaultGetter).call(this, a, i) : (C(a, function(b, c) {
					g = !1,
					d || G(this, c),
					this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(c) && (f || (this.symbolAttr(a),
					f = !0),
					g = !0),
					!this.rotation || "x" !== c && "y" !== c || (this.doTransform = !0),
					g || (h = this[c + "Setter"] || this._defaultSetter,
					h.call(this, b, c, i),
					this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c) && this.updateShadows(c, b, h))
				}, this),
				this.afterSetters()),
				c && c(),
				j
			},
			afterSetters: function() {
				this.doTransform && (this.updateTransform(),
				this.doTransform = !1)
			},
			updateShadows: function(a, b, c) {
				for (var d = this.shadows, e = d.length; e--; )
					c.call(d[e], "height" === a ? Math.max(b - (d[e].cutHeight || 0), 0) : "d" === a ? this.d : b, a, d[e])
			},
			addClass: function(a, b) {
				var c = this.attr("class") || "";
				return -1 === c.indexOf(a) && (b || (a = (c + (c ? " " : "") + a).replace("  ", " ")),
				this.attr("class", a)),
				this
			},
			hasClass: function(a) {
				return -1 !== t(a, (this.attr("class") || "").split(" "))
			},
			removeClass: function(a) {
				return this.attr("class", (this.attr("class") || "").replace(a, ""))
			},
			symbolAttr: function(a) {
				var b = this;
				o("x y r start end width height innerR anchorX anchorY".split(" "), function(c) {
					b[c] = D(a[c], b[c])
				}),
				b.attr({
					d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)
				})
			},
			clip: function(a) {
				return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
			},
			crisp: function(a, b) {
				var c, d = this, e = {};
				return b = b || a.strokeWidth || 0,
				c = Math.round(b) % 2 / 2,
				a.x = Math.floor(a.x || d.x || 0) + c,
				a.y = Math.floor(a.y || d.y || 0) + c,
				a.width = Math.floor((a.width || d.width || 0) - 2 * c),
				a.height = Math.floor((a.height || d.height || 0) - 2 * c),
				k(a.strokeWidth) && (a.strokeWidth = b),
				C(a, function(a, b) {
					d[b] !== a && (d[b] = e[b] = a)
				}),
				e
			},
			css: function(a) {
				var b, c, d = this.styles, e = {}, g = this.element, h = "", j = !d, k = ["textOutline", "textOverflow", "width"];
				return a && a.color && (a.fill = a.color),
				d && C(a, function(a, b) {
					a !== d[b] && (e[b] = a,
					j = !0)
				}),
				j && (d && (a = p(d, e)),
				b = this.textWidth = a && a.width && "auto" !== a.width && "text" === g.nodeName.toLowerCase() && E(a.width),
				this.styles = a,
				b && !H && this.renderer.forExport && delete a.width,
				w && !H ? i(this.element, a) : (c = function(a, b) {
					return "-" + b.toLowerCase()
				}
				,
				C(a, function(a, b) {
					-1 === t(b, k) && (h += b.replace(/([A-Z])/g, c) + ":" + a + ";")
				}),
				h && f(g, "style", h)),
				this.added && ("text" === this.element.nodeName && this.renderer.buildText(this),
				a && a.textOutline && this.applyTextOutline(a.textOutline))),
				this
			},
			strokeWidth: function() {
				return this["stroke-width"] || 0
			},
			on: function(a, b) {
				var c = this
				  , d = c.element;
				return s && "click" === a ? (d.ontouchstart = function(a) {
					c.touchEventFired = Date.now(),
					a.preventDefault(),
					b.call(d, a)
				}
				,
				d.onclick = function(a) {
					(-1 === K.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (c.touchEventFired || 0)) && b.call(d, a)
				}
				) : d["on" + a] = b,
				this
			},
			setRadialReference: function(a) {
				var b = this.renderer.gradients[this.element.gradient];
				return this.element.radialReference = a,
				b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr)),
				this
			},
			translate: function(a, b) {
				return this.attr({
					translateX: a,
					translateY: b
				})
			},
			invert: function(a) {
				return this.inverted = a,
				this.updateTransform(),
				this
			},
			updateTransform: function() {
				var a = this.translateX || 0
				  , b = this.translateY || 0
				  , c = this.scaleX
				  , d = this.scaleY
				  , e = this.inverted
				  , f = this.rotation
				  , g = this.element;
				e && (a += this.width,
				b += this.height),
				a = ["translate(" + a + "," + b + ")"],
				e ? a.push("rotate(90) scale(-1,1)") : f && a.push("rotate(" + f + " " + (g.getAttribute("x") || 0) + " " + (g.getAttribute("y") || 0) + ")"),
				(k(c) || k(d)) && a.push("scale(" + D(c, 1) + " " + D(d, 1) + ")"),
				a.length && g.setAttribute("transform", a.join(" "))
			},
			toFront: function() {
				var a = this.element;
				return a.parentNode.appendChild(a),
				this
			},
			align: function(a, b, c) {
				var d, e, f, g, h = {};
				e = this.renderer,
				f = e.alignedObjects;
				var i, j;
				return a ? (this.alignOptions = a,
				this.alignByTranslate = b,
				(!c || y(c)) && (this.alignTo = d = c || "renderer",
				q(f, this),
				f.push(this),
				c = null)) : (a = this.alignOptions,
				b = this.alignByTranslate,
				d = this.alignTo),
				c = D(c, e[d], e),
				d = a.align,
				e = a.verticalAlign,
				f = (c.x || 0) + (a.x || 0),
				g = (c.y || 0) + (a.y || 0),
				"right" === d ? i = 1 : "center" === d && (i = 2),
				i && (f += (c.width - (a.width || 0)) / i),
				h[b ? "translateX" : "x"] = Math.round(f),
				"bottom" === e ? j = 1 : "middle" === e && (j = 2),
				j && (g += (c.height - (a.height || 0)) / j),
				h[b ? "translateY" : "y"] = Math.round(g),
				this[this.placed ? "animate" : "attr"](h),
				this.placed = !0,
				this.alignAttr = h,
				this
			},
			getBBox: function(a, b) {
				var c, d, e, f, g, h = this.renderer, i = this.element, j = this.styles, k = this.textStr, m = h.cache, n = h.cacheKeys;
				if (b = D(b, this.rotation),
				d = b * l,
				e = j && j.fontSize,
				void 0 !== k && (g = k.toString(),
				-1 === g.indexOf("<") && (g = g.replace(/[0-9]/g, "0")),
				g += ["", b || 0, e, j && j.width, j && j.textOverflow].join()),
				g && !a && (c = m[g]),
				!c) {
					if (i.namespaceURI === this.SVG_NS || h.forExport) {
						try {
							(f = this.fakeTS && function(a) {
								o(i.querySelectorAll(".highcharts-text-outline"), function(b) {
									b.style.display = a
								})
							}
							) && f("none"),
							c = i.getBBox ? p({}, i.getBBox()) : {
								width: i.offsetWidth,
								height: i.offsetHeight
							},
							f && f("")
						} catch (a) {}
						(!c || 0 > c.width) && (c = {
							width: 0,
							height: 0
						})
					} else
						c = this.htmlGetBBox();
					if (h.isSVG && (a = c.width,
					h = c.height,
					j && "11px" === j.fontSize && 17 === Math.round(h) && (c.height = h = 14),
					b && (c.width = Math.abs(h * Math.sin(d)) + Math.abs(a * Math.cos(d)),
					c.height = Math.abs(h * Math.cos(d)) + Math.abs(a * Math.sin(d)))),
					g && 0 < c.height) {
						for (; 250 < n.length; )
							delete m[n.shift()];
						m[g] || n.push(g),
						m[g] = c
					}
				}
				return c
			},
			show: function(a) {
				return this.attr({
					visibility: a ? "inherit" : "visible"
				})
			},
			hide: function() {
				return this.attr({
					visibility: "hidden"
				})
			},
			fadeOut: function(a) {
				var b = this;
				b.animate({
					opacity: 0
				}, {
					duration: a || 150,
					complete: function() {
						b.attr({
							y: -9999
						})
					}
				})
			},
			add: function(a) {
				var b, c = this.renderer, d = this.element;
				return a && (this.parentGroup = a),
				this.parentInverted = a && a.inverted,
				void 0 !== this.textStr && c.buildText(this),
				this.added = !0,
				(!a || a.handleZ || this.zIndex) && (b = this.zIndexSetter()),
				b || (a ? a.element : c.box).appendChild(d),
				this.onAdd && this.onAdd(),
				this
			},
			safeRemoveChild: function(a) {
				var b = a.parentNode;
				b && b.removeChild(a)
			},
			destroy: function() {
				var a = this
				  , b = a.element || {}
				  , c = a.renderer.isSVG && "SPAN" === b.nodeName && a.parentGroup
				  , d = b.ownerSVGElement;
				if (b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null,
				G(a),
				a.clipPath && d && (o(d.querySelectorAll("[clip-path]"), function(b) {
					-1 < b.getAttribute("clip-path").indexOf(a.clipPath.element.id + ")") && b.removeAttribute("clip-path")
				}),
				a.clipPath = a.clipPath.destroy()),
				a.stops) {
					for (d = 0; d < a.stops.length; d++)
						a.stops[d] = a.stops[d].destroy();
					a.stops = null
				}
				for (a.safeRemoveChild(b),
				a.destroyShadows(); c && c.div && 0 === c.div.childNodes.length; )
					b = c.parentGroup,
					a.safeRemoveChild(c.div),
					delete c.div,
					c = b;
				return a.alignTo && q(a.renderer.alignedObjects, a),
				C(a, function(b, c) {
					delete a[c]
				}),
				null
			},
			shadow: function(a, b, c) {
				var d, e, g, h, i, j, k = [], l = this.element;
				if (a) {
					if (!this.shadows) {
						for (h = D(a.width, 3),
						i = (a.opacity || .15) / h,
						j = this.parentInverted ? "(-1,-1)" : "(" + D(a.offsetX, 1) + ", " + D(a.offsetY, 1) + ")",
						d = 1; d <= h; d++)
							e = l.cloneNode(0),
							g = 2 * h + 1 - 2 * d,
							f(e, {
								isShadow: "true",
								stroke: a.color || "#000000",
								"stroke-opacity": i * d,
								"stroke-width": g,
								transform: "translate" + j,
								fill: "none"
							}),
							c && (f(e, "height", Math.max(f(e, "height") - g, 0)),
							e.cutHeight = g),
							b ? b.element.appendChild(e) : l.parentNode.insertBefore(e, l),
							k.push(e);
						this.shadows = k
					}
				} else
					this.destroyShadows();
				return this
			},
			destroyShadows: function() {
				o(this.shadows || [], function(a) {
					this.safeRemoveChild(a)
				}, this),
				this.shadows = void 0
			},
			xGetter: function(a) {
				return "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy")),
				this._defaultGetter(a)
			},
			_defaultGetter: function(a) {
				return a = D(this[a], this.element ? this.element.getAttribute(a) : null, 0),
				/^[\-0-9\.]+$/.test(a) && (a = parseFloat(a)),
				a
			},
			dSetter: function(a, b, c) {
				a && a.join && (a = a.join(" ")),
				/(NaN| {2}|^$)/.test(a) && (a = "M 0 0"),
				this[b] !== a && (c.setAttribute(b, a),
				this[b] = a)
			},
			dashstyleSetter: function(a) {
				var b, c = this["stroke-width"];
				if ("inherit" === c && (c = 1),
				a = a && a.toLowerCase()) {
					for (a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(","),
					b = a.length; b--; )
						a[b] = E(a[b]) * c;
					a = a.join(",").replace(/NaN/g, "none"),
					this.element.setAttribute("stroke-dasharray", a)
				}
			},
			alignSetter: function(a) {
				this.element.setAttribute("text-anchor", {
					left: "start",
					center: "middle",
					right: "end"
				}[a])
			},
			opacitySetter: function(a, b, c) {
				this[b] = a,
				c.setAttribute(b, a)
			},
			titleSetter: function(a) {
				var b = this.element.getElementsByTagName("title")[0];
				b || (b = n.createElementNS(this.SVG_NS, "title"),
				this.element.appendChild(b)),
				b.firstChild && b.removeChild(b.firstChild),
				b.appendChild(n.createTextNode(String(D(a), "").replace(/<[^>]*>/g, "")))
			},
			textSetter: function(a) {
				a !== this.textStr && (delete this.bBox,
				this.textStr = a,
				this.added && this.renderer.buildText(this))
			},
			fillSetter: function(a, b, c) {
				"string" == typeof a ? c.setAttribute(b, a) : a && this.colorGradient(a, b, c)
			},
			visibilitySetter: function(a, b, c) {
				"inherit" === a ? c.removeAttribute(b) : this[b] !== a && c.setAttribute(b, a),
				this[b] = a
			},
			zIndexSetter: function(a, b) {
				var c, d, e = this.renderer, f = this.parentGroup, g = (f || e).element || e.box, h = this.element;
				c = this.added;
				var i;
				if (k(a) && (h.zIndex = a,
				a = +a,
				this[b] === a && (c = !1),
				this[b] = a),
				c) {
					for ((a = this.zIndex) && f && (f.handleZ = !0),
					b = g.childNodes,
					i = 0; i < b.length && !d; i++)
						f = b[i],
						c = f.zIndex,
						f !== h && (E(c) > a || !k(a) && k(c) || 0 > a && !k(c) && g !== e.box) && (g.insertBefore(h, f),
						d = !0);
					d || g.appendChild(h)
				}
				return d
			},
			_defaultSetter: function(a, b, c) {
				c.setAttribute(b, a)
			}
		}),
		b.prototype.yGetter = b.prototype.xGetter,
		b.prototype.translateXSetter = b.prototype.translateYSetter = b.prototype.rotationSetter = b.prototype.verticalAlignSetter = b.prototype.scaleXSetter = b.prototype.scaleYSetter = function(a, b) {
			this[b] = a,
			this.doTransform = !0
		}
		,
		b.prototype["stroke-widthSetter"] = b.prototype.strokeSetter = function(a, c, d) {
			this[c] = a,
			this.stroke && this["stroke-width"] ? (b.prototype.fillSetter.call(this, this.stroke, "stroke", d),
			d.setAttribute("stroke-width", this["stroke-width"]),
			this.hasStroke = !0) : "stroke-width" === c && 0 === a && this.hasStroke && (d.removeAttribute("stroke"),
			this.hasStroke = !1)
		}
		,
		c = a.SVGRenderer = function() {
			this.init.apply(this, arguments)
		}
		,
		p(c.prototype, {
			Element: b,
			SVG_NS: I,
			init: function(a, b, c, e, g, h) {
				var j;
				e = this.createElement("svg").attr({
					version: "1.1",
					class: "highcharts-root"
				}).css(this.getStyle(e)),
				j = e.element,
				a.appendChild(j),
				-1 === a.innerHTML.indexOf("xmlns") && f(j, "xmlns", this.SVG_NS),
				this.isSVG = !0,
				this.box = j,
				this.boxWrapper = e,
				this.alignedObjects = [],
				this.url = (v || z) && n.getElementsByTagName("base").length ? K.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "",
				this.createElement("desc").add().element.appendChild(n.createTextNode("Created with Highstock 5.0.14")),
				this.defs = this.createElement("defs").add(),
				this.allowHTML = h,
				this.forExport = g,
				this.gradients = {},
				this.cache = {},
				this.cacheKeys = [],
				this.imgCount = 0,
				this.setSize(b, c, !1);
				var k;
				v && a.getBoundingClientRect && (b = function() {
					i(a, {
						left: 0,
						top: 0
					}),
					k = a.getBoundingClientRect(),
					i(a, {
						left: Math.ceil(k.left) - k.left + "px",
						top: Math.ceil(k.top) - k.top + "px"
					})
				}
				,
				b(),
				this.unSubPixelFix = d(K, "resize", b))
			},
			getStyle: function(a) {
				return this.style = p({
					fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
					fontSize: "12px"
				}, a)
			},
			setStyle: function(a) {
				this.boxWrapper.css(this.getStyle(a))
			},
			isHidden: function() {
				return !this.boxWrapper.getBBox().width
			},
			destroy: function() {
				var a = this.defs;
				return this.box = null,
				this.boxWrapper = this.boxWrapper.destroy(),
				m(this.gradients || {}),
				this.gradients = null,
				a && (this.defs = a.destroy()),
				this.unSubPixelFix && this.unSubPixelFix(),
				this.alignedObjects = null
			},
			createElement: function(a) {
				var b = new this.Element;
				return b.init(this, a),
				b
			},
			draw: B,
			getRadialAttr: function(a, b) {
				return {
					cx: a[0] - a[2] / 2 + b.cx * a[2],
					cy: a[1] - a[2] / 2 + b.cy * a[2],
					r: b.r * a[2]
				}
			},
			getSpanWidth: function(a, b) {
				var c = a.getBBox(!0).width;
				return !H && this.forExport && (c = this.measureSpanWidth(b.firstChild.data, a.styles)),
				c
			},
			applyEllipsis: function(a, b, c, d) {
				var e, f, g = a.rotation, h = c, i = 0, j = c.length, k = function(a) {
					b.removeChild(b.firstChild),
					a && b.appendChild(n.createTextNode(a))
				};
				if (a.rotation = 0,
				h = this.getSpanWidth(a, b),
				f = h > d) {
					for (; i <= j; )
						e = Math.ceil((i + j) / 2),
						h = c.substring(0, e) + "…",
						k(h),
						h = this.getSpanWidth(a, b),
						i === j ? i = j + 1 : h > d ? j = e - 1 : i = e;
					0 === j && k("")
				}
				return a.rotation = g,
				f
			},
			buildText: function(a) {
				var b, c, d, e, g, h, j = a.element, k = this, l = k.forExport, m = D(a.textStr, "").toString(), p = -1 !== m.indexOf("<"), q = j.childNodes, s = f(j, "x"), t = a.styles, u = a.textWidth, v = t && t.lineHeight, w = t && t.textOutline, x = t && "ellipsis" === t.textOverflow, y = t && "nowrap" === t.whiteSpace, z = t && t.fontSize, A = q.length, t = u && !a.added && this.box, B = function(a) {
					var b;
					return b = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : z || k.style.fontSize || 12,
					v ? E(v) : k.fontMetrics(b, a.getAttribute("style") ? a : j).h
				};
				if ((g = [m, x, y, v, w, z, u].join()) !== a.textCache) {
					for (a.textCache = g; A--; )
						j.removeChild(q[A]);
					p || w || x || u || -1 !== m.indexOf(" ") ? (b = /<.*class="([^"]+)".*>/,
					c = /<.*style="([^"]+)".*>/,
					d = /<.*href="([^"]+)".*>/,
					t && t.appendChild(j),
					m = p ? m.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [m],
					m = r(m, function(a) {
						return "" !== a
					}),
					o(m, function(g, m) {
						var p, q = 0;
						g = g.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||"),
						p = g.split("|||"),
						o(p, function(g) {
							if ("" !== g || 1 === p.length) {
								var o, r, t = {}, v = n.createElementNS(k.SVG_NS, "tspan");
								if (b.test(g) && (o = g.match(b)[1],
								f(v, "class", o)),
								c.test(g) && (r = g.match(c)[1].replace(/(;| |^)color([ :])/, "$1fill$2"),
								f(v, "style", r)),
								d.test(g) && !l && (f(v, "onclick", 'location.href="' + g.match(d)[1] + '"'),
								i(v, {
									cursor: "pointer"
								})),
								" " !== (g = (g.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">"))) {
									if (v.appendChild(n.createTextNode(g)),
									q ? t.dx = 0 : m && null !== s && (t.x = s),
									f(v, t),
									j.appendChild(v),
									!q && h && (!H && l && i(v, {
										display: "block"
									}),
									f(v, "dy", B(v))),
									u) {
										t = g.replace(/([^\^])-/g, "$1- ").split(" "),
										o = 1 < p.length || m || 1 < t.length && !y;
										var w, z = [], A = B(v), C = a.rotation;
										for (x && (e = k.applyEllipsis(a, v, g, u)); !x && o && (t.length || z.length); )
											a.rotation = 0,
											w = k.getSpanWidth(a, v),
											g = w > u,
											void 0 === e && (e = g),
											g && 1 !== t.length ? (v.removeChild(v.firstChild),
											z.unshift(t.pop())) : (t = z,
											z = [],
											t.length && !y && (v = n.createElementNS(I, "tspan"),
											f(v, {
												dy: A,
												x: s
											}),
											r && f(v, "style", r),
											j.appendChild(v)),
											w > u && (u = w)),
											t.length && v.appendChild(n.createTextNode(t.join(" ").replace(/- /g, "-")));
										a.rotation = C
									}
									q++
								}
							}
						}),
						h = h || j.childNodes.length
					}),
					e && a.attr("title", a.textStr),
					t && t.removeChild(j),
					w && a.applyTextOutline && a.applyTextOutline(w)) : j.appendChild(n.createTextNode(m.replace(/&lt;/g, "<").replace(/&gt;/g, ">")))
				}
			},
			getContrast: function(a) {
				return a = h(a).rgba,
				510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
			},
			button: function(a, b, c, e, f, g, h, i, j) {
				var k = this.label(a, b, c, j, null, null, null, null, "button")
				  , l = 0;
				k.attr(A({
					padding: 8,
					r: 2
				}, f));
				var m, n, o, q;
				return f = A({
					fill: "#f7f7f7",
					stroke: "#cccccc",
					"stroke-width": 1,
					style: {
						color: "#333333",
						cursor: "pointer",
						fontWeight: "normal"
					}
				}, f),
				m = f.style,
				delete f.style,
				g = A(f, {
					fill: "#e6e6e6"
				}, g),
				n = g.style,
				delete g.style,
				h = A(f, {
					fill: "#e6ebf5",
					style: {
						color: "#000000",
						fontWeight: "bold"
					}
				}, h),
				o = h.style,
				delete h.style,
				i = A(f, {
					style: {
						color: "#cccccc"
					}
				}, i),
				q = i.style,
				delete i.style,
				d(k.element, w ? "mouseover" : "mouseenter", function() {
					3 !== l && k.setState(1)
				}),
				d(k.element, w ? "mouseout" : "mouseleave", function() {
					3 !== l && k.setState(l)
				}),
				k.setState = function(a) {
					1 !== a && (k.state = l = a),
					k.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]),
					k.attr([f, g, h, i][a || 0]).css([m, n, o, q][a || 0])
				}
				,
				k.attr(f).css(p({
					cursor: "default"
				}, m)),
				k.on("click", function(a) {
					3 !== l && e.call(k, a)
				})
			},
			crispLine: function(a, b) {
				return a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2),
				a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2),
				a
			},
			path: function(a) {
				var b = {
					fill: "none"
				};
				return u(a) ? b.d = a : x(a) && p(b, a),
				this.createElement("path").attr(b)
			},
			circle: function(a, b, c) {
				return a = x(a) ? a : {
					x: a,
					y: b,
					r: c
				},
				b = this.createElement("circle"),
				b.xSetter = b.ySetter = function(a, b, c) {
					c.setAttribute("c" + b, a)
				}
				,
				b.attr(a)
			},
			arc: function(a, b, c, d, e, f) {
				return x(a) ? (d = a,
				b = d.y,
				c = d.r,
				a = d.x) : d = {
					innerR: d,
					start: e,
					end: f
				},
				a = this.symbol("arc", a, b, c, c, d),
				a.r = c,
				a
			},
			rect: function(a, b, c, d, e, g) {
				e = x(a) ? a.r : e;
				var h = this.createElement("rect");
				return a = x(a) ? a : void 0 === a ? {} : {
					x: a,
					y: b,
					width: Math.max(c, 0),
					height: Math.max(d, 0)
				},
				void 0 !== g && (a.strokeWidth = g,
				a = h.crisp(a)),
				a.fill = "none",
				e && (a.r = e),
				h.rSetter = function(a, b, c) {
					f(c, {
						rx: a,
						ry: a
					})
				}
				,
				h.attr(a)
			},
			setSize: function(a, b, c) {
				var d = this.alignedObjects
				  , e = d.length;
				for (this.width = a,
				this.height = b,
				this.boxWrapper.animate({
					width: a,
					height: b
				}, {
					step: function() {
						this.attr({
							viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
						})
					},
					duration: D(c, !0) ? void 0 : 0
				}); e--; )
					d[e].align()
			},
			g: function(a) {
				var b = this.createElement("g");
				return a ? b.attr({
					class: "highcharts-" + a
				}) : b
			},
			image: function(a, b, c, d, e) {
				var f = {
					preserveAspectRatio: "none"
				};
				return 1 < arguments.length && p(f, {
					x: b,
					y: c,
					width: d,
					height: e
				}),
				f = this.createElement("image").attr(f),
				f.element.setAttributeNS ? f.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : f.element.setAttribute("hc-svg-href", a),
				f
			},
			symbol: function(a, b, c, d, e, f) {
				var h, l, m, q = this, r = /^url\((.*?)\)$/, s = r.test(a), t = !s && (this.symbols[a] ? a : "circle"), u = t && this.symbols[t], v = k(b) && u && u.call(this.symbols, Math.round(b), Math.round(c), d, e, f);
				return u ? (h = this.path(v),
				h.attr("fill", "none"),
				p(h, {
					symbolName: t,
					x: b,
					y: c,
					width: d,
					height: e
				}),
				f && p(h, f)) : s && (l = a.match(r)[1],
				h = this.image(l),
				h.imgwidth = D(J[l] && J[l].width, f && f.width),
				h.imgheight = D(J[l] && J[l].height, f && f.height),
				m = function() {
					h.attr({
						width: h.width,
						height: h.height
					})
				}
				,
				o(["width", "height"], function(a) {
					h[a + "Setter"] = function(a, b) {
						var c = {}
						  , d = this["img" + b]
						  , e = "width" === b ? "translateX" : "translateY";
						this[b] = a,
						k(d) && (this.element && this.element.setAttribute(b, d),
						this.alignByTranslate || (c[e] = ((this[b] || 0) - d) / 2,
						this.attr(c)))
					}
				}),
				k(b) && h.attr({
					x: b,
					y: c
				}),
				h.isImg = !0,
				k(h.imgwidth) && k(h.imgheight) ? m() : (h.attr({
					width: 0,
					height: 0
				}),
				j("img", {
					onload: function() {
						var a = g[q.chartIndex];
						0 === this.width && (i(this, {
							position: "absolute",
							top: "-999em"
						}),
						n.body.appendChild(this)),
						J[l] = {
							width: this.width,
							height: this.height
						},
						h.imgwidth = this.width,
						h.imgheight = this.height,
						h.element && m(),
						this.parentNode && this.parentNode.removeChild(this),
						!--q.imgCount && a && a.onload && a.onload()
					},
					src: l
				}),
				this.imgCount++)),
				h
			},
			symbols: {
				circle: function(a, b, c, d) {
					return this.arc(a + c / 2, b + d / 2, c / 2, d / 2, {
						start: 0,
						end: 2 * Math.PI,
						open: !1
					})
				},
				square: function(a, b, c, d) {
					return ["M", a, b, "L", a + c, b, a + c, b + d, a, b + d, "Z"]
				},
				triangle: function(a, b, c, d) {
					return ["M", a + c / 2, b, "L", a + c, b + d, a, b + d, "Z"]
				},
				"triangle-down": function(a, b, c, d) {
					return ["M", a, b, "L", a + c, b, a + c / 2, b + d, "Z"]
				},
				diamond: function(a, b, c, d) {
					return ["M", a + c / 2, b, "L", a + c, b + d / 2, a + c / 2, b + d, a, b + d / 2, "Z"]
				},
				arc: function(a, b, c, d, e) {
					var f = e.start
					  , g = e.r || c
					  , h = e.r || d || c
					  , i = e.end - .001;
					c = e.innerR,
					d = D(e.open, .001 > Math.abs(e.end - e.start - 2 * Math.PI));
					var j = Math.cos(f)
					  , l = Math.sin(f)
					  , m = Math.cos(i)
					  , i = Math.sin(i);
					return e = .001 > e.end - f - Math.PI ? 0 : 1,
					g = ["M", a + g * j, b + h * l, "A", g, h, 0, e, 1, a + g * m, b + h * i],
					k(c) && g.push(d ? "M" : "L", a + c * m, b + c * i, "A", c, c, 0, e, 0, a + c * j, b + c * l),
					g.push(d ? "" : "Z"),
					g
				},
				callout: function(a, b, c, d, e) {
					var f = Math.min(e && e.r || 0, c, d)
					  , g = f + 6
					  , h = e && e.anchorX;
					e = e && e.anchorY;
					var i;
					return i = ["M", a + f, b, "L", a + c - f, b, "C", a + c, b, a + c, b, a + c, b + f, "L", a + c, b + d - f, "C", a + c, b + d, a + c, b + d, a + c - f, b + d, "L", a + f, b + d, "C", a, b + d, a, b + d, a, b + d - f, "L", a, b + f, "C", a, b, a, b, a + f, b],
					h && h > c ? e > b + g && e < b + d - g ? i.splice(13, 3, "L", a + c, e - 6, a + c + 6, e, a + c, e + 6, a + c, b + d - f) : i.splice(13, 3, "L", a + c, d / 2, h, e, a + c, d / 2, a + c, b + d - f) : h && 0 > h ? e > b + g && e < b + d - g ? i.splice(33, 3, "L", a, e + 6, a - 6, e, a, e - 6, a, b + f) : i.splice(33, 3, "L", a, d / 2, h, e, a, d / 2, a, b + f) : e && e > d && h > a + g && h < a + c - g ? i.splice(23, 3, "L", h + 6, b + d, h, b + d + 6, h - 6, b + d, a + f, b + d) : e && 0 > e && h > a + g && h < a + c - g && i.splice(3, 3, "L", h - 6, b, h, b - 6, h + 6, b, c - f, b),
					i
				}
			},
			clipRect: function(b, c, d, e) {
				var f = a.uniqueKey()
				  , g = this.createElement("clipPath").attr({
					id: f
				}).add(this.defs);
				return b = this.rect(b, c, d, e, 0).add(g),
				b.id = f,
				b.clipPath = g,
				b.count = 0,
				b
			},
			text: function(a, b, c, d) {
				var e = !H && this.forExport
				  , f = {};
				return !d || !this.allowHTML && this.forExport ? (f.x = Math.round(b || 0),
				c && (f.y = Math.round(c)),
				(a || 0 === a) && (f.text = a),
				a = this.createElement("text").attr(f),
				e && a.css({
					position: "absolute"
				}),
				d || (a.xSetter = function(a, b, c) {
					var d, e, f = c.getElementsByTagName("tspan"), g = c.getAttribute(b);
					for (e = 0; e < f.length; e++)
						d = f[e],
						d.getAttribute(b) === g && d.setAttribute(b, a);
					c.setAttribute(b, a)
				}
				),
				a) : this.html(a, b, c)
			},
			fontMetrics: function(a, b) {
				return a = a || b && b.style && b.style.fontSize || this.style && this.style.fontSize,
				a = /px/.test(a) ? E(a) : /em/.test(a) ? parseFloat(a) * (b ? this.fontMetrics(null, b.parentNode).f : 16) : 12,
				b = 24 > a ? a + 3 : Math.round(1.2 * a),
				{
					h: b,
					b: Math.round(.8 * b),
					f: a
				}
			},
			rotCorr: function(a, b, c) {
				var d = a;
				return b && c && (d = Math.max(d * Math.cos(b * l), 4)),
				{
					x: -a / 3 * Math.sin(b * l),
					y: d
				}
			},
			label: function(c, d, e, f, g, h, i, j, l) {
				var m, n, q, r, s, t, u, v, w, x, y, z, B, C = this, D = C.g("button" !== l && "label"), E = D.text = C.text("", 0, 0, i).attr({
					zIndex: 1
				}), G = 0, H = 3, I = 0, J = {}, K = /^url\((.*?)\)$/.test(f), L = K;
				l && D.addClass("highcharts-" + l),
				L = K,
				x = function() {
					return (v || 0) % 2 / 2
				}
				,
				y = function() {
					var a = E.element.style
					  , b = {};
					n = (void 0 === q || void 0 === r || u) && k(E.textStr) && E.getBBox(),
					D.width = (q || n.width || 0) + 2 * H + I,
					D.height = (r || n.height || 0) + 2 * H,
					w = H + C.fontMetrics(a && a.fontSize, E).b,
					L && (m || (D.box = m = C.symbols[f] || K ? C.symbol(f) : C.rect(),
					m.addClass(("button" === l ? "" : "highcharts-label-box") + (l ? " highcharts-" + l + "-box" : "")),
					m.add(D),
					a = x(),
					b.x = a,
					b.y = (j ? -w : 0) + a),
					b.width = Math.round(D.width),
					b.height = Math.round(D.height),
					m.attr(p(b, J)),
					J = {})
				}
				,
				z = function() {
					var a, b = I + H;
					a = j ? 0 : w,
					k(q) && n && ("center" === u || "right" === u) && (b += {
						center: .5,
						right: 1
					}[u] * (q - n.width)),
					b === E.x && a === E.y || (E.attr("x", b),
					void 0 !== a && E.attr("y", a)),
					E.x = b,
					E.y = a
				}
				,
				B = function(a, b) {
					m ? m.attr(a, b) : J[a] = b
				}
				,
				D.onAdd = function() {
					E.add(D),
					D.attr({
						text: c || 0 === c ? c : "",
						x: d,
						y: e
					}),
					m && k(g) && D.attr({
						anchorX: g,
						anchorY: h
					})
				}
				,
				D.widthSetter = function(b) {
					q = a.isNumber(b) ? b : null
				}
				,
				D.heightSetter = function(a) {
					r = a
				}
				,
				D["text-alignSetter"] = function(a) {
					u = a
				}
				,
				D.paddingSetter = function(a) {
					k(a) && a !== H && (H = D.padding = a,
					z())
				}
				,
				D.paddingLeftSetter = function(a) {
					k(a) && a !== I && (I = a,
					z())
				}
				,
				D.alignSetter = function(a) {
					(a = {
						left: 0,
						center: .5,
						right: 1
					}[a]) !== G && (G = a,
					n && D.attr({
						x: s
					}))
				}
				,
				D.textSetter = function(a) {
					void 0 !== a && E.textSetter(a),
					y(),
					z()
				}
				,
				D["stroke-widthSetter"] = function(a, b) {
					a && (L = !0),
					v = this["stroke-width"] = a,
					B(b, a)
				}
				,
				D.strokeSetter = D.fillSetter = D.rSetter = function(a, b) {
					"r" !== b && ("fill" === b && a && (L = !0),
					D[b] = a),
					B(b, a)
				}
				,
				D.anchorXSetter = function(a, b) {
					g = D.anchorX = a,
					B(b, Math.round(a) - x() - s)
				}
				,
				D.anchorYSetter = function(a, b) {
					h = D.anchorY = a,
					B(b, a - t)
				}
				,
				D.xSetter = function(a) {
					D.x = a,
					G && (a -= G * ((q || n.width) + 2 * H)),
					s = Math.round(a),
					D.attr("translateX", s)
				}
				,
				D.ySetter = function(a) {
					t = D.y = Math.round(a),
					D.attr("translateY", t)
				}
				;
				var M = D.css;
				return p(D, {
					css: function(a) {
						if (a) {
							var b = {};
							a = A(a),
							o(D.textProps, function(c) {
								void 0 !== a[c] && (b[c] = a[c],
								delete a[c])
							}),
							E.css(b)
						}
						return M.call(D, a)
					},
					getBBox: function() {
						return {
							width: n.width + 2 * H,
							height: n.height + 2 * H,
							x: n.x - H,
							y: n.y - H
						}
					},
					shadow: function(a) {
						return a && (y(),
						m && m.shadow(a)),
						D
					},
					destroy: function() {
						F(D.element, "mouseenter"),
						F(D.element, "mouseleave"),
						E && (E = E.destroy()),
						m && (m = m.destroy()),
						b.prototype.destroy.call(D),
						D = C = y = z = B = null
					}
				})
			}
		}),
		a.Renderer = c
	}(a),
	function(a) {
		var b = a.attr
		  , c = a.createElement
		  , d = a.css
		  , e = a.defined
		  , f = a.each
		  , g = a.extend
		  , h = a.isFirefox
		  , i = a.isMS
		  , j = a.isWebKit
		  , k = a.pInt
		  , l = a.SVGRenderer
		  , m = a.win
		  , n = a.wrap;
		g(a.SVGElement.prototype, {
			htmlCss: function(a) {
				var b = this.element;
				return (b = a && "SPAN" === b.tagName && a.width) && (delete a.width,
				this.textWidth = b,
				this.updateTransform()),
				a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap",
				a.overflow = "hidden"),
				this.styles = g(this.styles, a),
				d(this.element, a),
				this
			},
			htmlGetBBox: function() {
				var a = this.element;
				return "text" === a.nodeName && (a.style.position = "absolute"),
				{
					x: a.offsetLeft,
					y: a.offsetTop,
					width: a.offsetWidth,
					height: a.offsetHeight
				}
			},
			htmlUpdateTransform: function() {
				if (this.added) {
					var a = this.renderer
					  , b = this.element
					  , c = this.translateX || 0
					  , g = this.translateY || 0
					  , h = this.x || 0
					  , i = this.y || 0
					  , l = this.textAlign || "left"
					  , m = {
						left: 0,
						center: .5,
						right: 1
					}[l]
					  , n = this.styles;
					if (d(b, {
						marginLeft: c,
						marginTop: g
					}),
					this.shadows && f(this.shadows, function(a) {
						d(a, {
							marginLeft: c + 1,
							marginTop: g + 1
						})
					}),
					this.inverted && f(b.childNodes, function(c) {
						a.invertChild(c, b)
					}),
					"SPAN" === b.tagName) {
						var o = this.rotation
						  , p = k(this.textWidth)
						  , q = n && n.whiteSpace
						  , r = [o, l, b.innerHTML, this.textWidth, this.textAlign].join();
						r !== this.cTT && (n = a.fontMetrics(b.style.fontSize).b,
						e(o) && this.setSpanRotation(o, m, n),
						d(b, {
							width: "",
							whiteSpace: q || "nowrap"
						}),
						b.offsetWidth > p && /[ \-]/.test(b.textContent || b.innerText) && d(b, {
							width: p + "px",
							display: "block",
							whiteSpace: q || "normal"
						}),
						this.getSpanCorrection(b.offsetWidth, n, m, o, l)),
						d(b, {
							left: h + (this.xCorr || 0) + "px",
							top: i + (this.yCorr || 0) + "px"
						}),
						j && (n = b.offsetHeight),
						this.cTT = r
					}
				} else
					this.alignOnAdd = !0
			},
			setSpanRotation: function(a, b, c) {
				var e = {}
				  , f = i ? "-ms-transform" : j ? "-webkit-transform" : h ? "MozTransform" : m.opera ? "-o-transform" : "";
				e[f] = e.transform = "rotate(" + a + "deg)",
				e[f + (h ? "Origin" : "-origin")] = e.transformOrigin = 100 * b + "% " + c + "px",
				d(this.element, e)
			},
			getSpanCorrection: function(a, b, c) {
				this.xCorr = -a * c,
				this.yCorr = -b
			}
		}),
		g(l.prototype, {
			html: function(a, d, e) {
				var h = this.createElement("span")
				  , i = h.element
				  , j = h.renderer
				  , k = j.isSVG
				  , l = function(a, b) {
					f(["opacity", "visibility"], function(c) {
						n(a, c + "Setter", function(a, c, d, e) {
							a.call(this, c, d, e),
							b[d] = c
						})
					})
				};
				return h.textSetter = function(a) {
					a !== i.innerHTML && delete this.bBox,
					i.innerHTML = this.textStr = a,
					h.htmlUpdateTransform()
				}
				,
				k && l(h, h.element.style),
				h.xSetter = h.ySetter = h.alignSetter = h.rotationSetter = function(a, b) {
					"align" === b && (b = "textAlign"),
					h[b] = a,
					h.htmlUpdateTransform()
				}
				,
				h.attr({
					text: a,
					x: Math.round(d),
					y: Math.round(e)
				}).css({
					fontFamily: this.style.fontFamily,
					fontSize: this.style.fontSize,
					position: "absolute"
				}),
				i.style.whiteSpace = "nowrap",
				h.css = h.htmlCss,
				k && (h.add = function(a) {
					var d, e = j.box.parentNode, k = [];
					if (this.parentGroup = a) {
						if (!(d = a.div)) {
							for (; a; )
								k.push(a),
								a = a.parentGroup;
							f(k.reverse(), function(a) {
								var f, i = b(a.element, "class");
								i && (i = {
									className: i
								}),
								d = a.div = a.div || c("div", i, {
									position: "absolute",
									left: (a.translateX || 0) + "px",
									top: (a.translateY || 0) + "px",
									display: a.display,
									opacity: a.opacity,
									pointerEvents: a.styles && a.styles.pointerEvents
								}, d || e),
								f = d.style,
								g(a, {
									classSetter: function(a) {
										this.element.setAttribute("class", a),
										d.className = a
									},
									on: function() {
										return k[0].div && h.on.apply({
											element: k[0].div
										}, arguments),
										a
									},
									translateXSetter: function(b, c) {
										f.left = b + "px",
										a[c] = b,
										a.doTransform = !0
									},
									translateYSetter: function(b, c) {
										f.top = b + "px",
										a[c] = b,
										a.doTransform = !0
									}
								}),
								l(a, f)
							})
						}
					} else
						d = e;
					return d.appendChild(i),
					h.added = !0,
					h.alignOnAdd && h.htmlUpdateTransform(),
					h
				}
				),
				h
			}
		})
	}(a),
	function(a) {
		var b, c, d = a.createElement, e = a.css, f = a.defined, g = a.deg2rad, h = a.discardElement, i = a.doc, j = a.each, k = a.erase, l = a.extend;
		b = a.extendClass;
		var m = a.isArray
		  , n = a.isNumber
		  , o = a.isObject
		  , p = a.merge;
		c = a.noop;
		var q = a.pick
		  , r = a.pInt
		  , s = a.SVGElement
		  , t = a.SVGRenderer
		  , u = a.win;
		a.svg || (c = {
			docMode8: i && 8 === i.documentMode,
			init: function(a, b) {
				var c = ["<", b, ' filled="f" stroked="f"']
				  , e = ["position: ", "absolute", ";"]
				  , f = "div" === b;
				("shape" === b || f) && e.push("left:0;top:0;width:1px;height:1px;"),
				e.push("visibility: ", f ? "hidden" : "visible"),
				c.push(' style="', e.join(""), '"/>'),
				b && (c = f || "span" === b || "img" === b ? c.join("") : a.prepVML(c),
				this.element = d(c)),
				this.renderer = a
			},
			add: function(a) {
				var b = this.renderer
				  , c = this.element
				  , d = b.box
				  , e = a && a.inverted
				  , d = a ? a.element || a : d;
				return a && (this.parentGroup = a),
				e && b.invertChild(c, d),
				d.appendChild(c),
				this.added = !0,
				this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform(),
				this.onAdd && this.onAdd(),
				this.className && this.attr("class", this.className),
				this
			},
			updateTransform: s.prototype.htmlUpdateTransform,
			setSpanRotation: function() {
				var a = this.rotation
				  , b = Math.cos(a * g)
				  , c = Math.sin(a * g);
				e(this.element, {
					filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", b, ", M12=", -c, ", M21=", c, ", M22=", b, ", sizingMethod='auto expand')"].join("") : "none"
				})
			},
			getSpanCorrection: function(a, b, c, d, f) {
				var h, i = d ? Math.cos(d * g) : 1, j = d ? Math.sin(d * g) : 0, k = q(this.elemHeight, this.element.offsetHeight);
				this.xCorr = 0 > i && -a,
				this.yCorr = 0 > j && -k,
				h = 0 > i * j,
				this.xCorr += j * b * (h ? 1 - c : c),
				this.yCorr -= i * b * (d ? h ? c : 1 - c : 1),
				f && "left" !== f && (this.xCorr -= a * c * (0 > i ? -1 : 1),
				d && (this.yCorr -= k * c * (0 > j ? -1 : 1)),
				e(this.element, {
					textAlign: f
				}))
			},
			pathToVML: function(a) {
				for (var b = a.length, c = []; b--; )
					n(a[b]) ? c[b] = Math.round(10 * a[b]) - 5 : "Z" === a[b] ? c[b] = "x" : (c[b] = a[b],
					!a.isArc || "wa" !== a[b] && "at" !== a[b] || (c[b + 5] === c[b + 7] && (c[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1),
					c[b + 6] === c[b + 8] && (c[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1)));
				return c.join(" ") || "x"
			},
			clip: function(a) {
				var b, c = this;
				return a ? (b = a.members,
				k(b, c),
				b.push(c),
				c.destroyClip = function() {
					k(b, c)
				}
				,
				a = a.getCSS(c)) : (c.destroyClip && c.destroyClip(),
				a = {
					clip: c.docMode8 ? "inherit" : "rect(auto)"
				}),
				c.css(a)
			},
			css: s.prototype.htmlCss,
			safeRemoveChild: function(a) {
				a.parentNode && h(a)
			},
			destroy: function() {
				return this.destroyClip && this.destroyClip(),
				s.prototype.destroy.apply(this)
			},
			on: function(a, b) {
				return this.element["on" + a] = function() {
					var a = u.event;
					a.target = a.srcElement,
					b(a)
				}
				,
				this
			},
			cutOffPath: function(a, b) {
				var c;
				return a = a.split(/[ ,]/),
				c = a.length,
				9 !== c && 11 !== c || (a[c - 4] = a[c - 2] = r(a[c - 2]) - 10 * b),
				a.join(" ")
			},
			shadow: function(a, b, c) {
				var e, f, g, h, i, j, k, l = [], m = this.element, n = this.renderer, o = m.style, p = m.path;
				if (p && "string" != typeof p.value && (p = "x"),
				i = p,
				a) {
					for (j = q(a.width, 3),
					k = (a.opacity || .15) / j,
					e = 1; 3 >= e; e++)
						h = 2 * j + 1 - 2 * e,
						c && (i = this.cutOffPath(p.value, h + .5)),
						g = ['<shape isShadow="true" strokeweight="', h, '" filled="false" path="', i, '" coordsize="10 10" style="', m.style.cssText, '" />'],
						f = d(n.prepVML(g), null, {
							left: r(o.left) + q(a.offsetX, 1),
							top: r(o.top) + q(a.offsetY, 1)
						}),
						c && (f.cutOff = h + 1),
						g = ['<stroke color="', a.color || "#000000", '" opacity="', k * e, '"/>'],
						d(n.prepVML(g), null, null, f),
						b ? b.element.appendChild(f) : m.parentNode.insertBefore(f, m),
						l.push(f);
					this.shadows = l
				}
				return this
			},
			updateShadows: c,
			setAttr: function(a, b) {
				this.docMode8 ? this.element[a] = b : this.element.setAttribute(a, b)
			},
			classSetter: function(a) {
				(this.added ? this.element : this).className = a
			},
			dashstyleSetter: function(a, b, c) {
				(c.getElementsByTagName("stroke")[0] || d(this.renderer.prepVML(["<stroke/>"]), null, null, c))[b] = a || "solid",
				this[b] = a
			},
			dSetter: function(a, b, c) {
				var d = this.shadows;
				if (a = a || [],
				this.d = a.join && a.join(" "),
				c.path = a = this.pathToVML(a),
				d)
					for (c = d.length; c--; )
						d[c].path = d[c].cutOff ? this.cutOffPath(a, d[c].cutOff) : a;
				this.setAttr(b, a)
			},
			fillSetter: function(a, b, c) {
				var d = c.nodeName;
				"SPAN" === d ? c.style.color = a : "IMG" !== d && (c.filled = "none" !== a,
				this.setAttr("fillcolor", this.renderer.color(a, c, b, this)))
			},
			"fill-opacitySetter": function(a, b, c) {
				d(this.renderer.prepVML(["<", b.split("-")[0], ' opacity="', a, '"/>']), null, null, c)
			},
			opacitySetter: c,
			rotationSetter: function(a, b, c) {
				c = c.style,
				this[b] = c[b] = a,
				c.left = -Math.round(Math.sin(a * g) + 1) + "px",
				c.top = Math.round(Math.cos(a * g)) + "px"
			},
			strokeSetter: function(a, b, c) {
				this.setAttr("strokecolor", this.renderer.color(a, c, b, this))
			},
			"stroke-widthSetter": function(a, b, c) {
				c.stroked = !!a,
				this[b] = a,
				n(a) && (a += "px"),
				this.setAttr("strokeweight", a)
			},
			titleSetter: function(a, b) {
				this.setAttr(b, a)
			},
			visibilitySetter: function(a, b, c) {
				"inherit" === a && (a = "visible"),
				this.shadows && j(this.shadows, function(c) {
					c.style[b] = a
				}),
				"DIV" === c.nodeName && (a = "hidden" === a ? "-999em" : 0,
				this.docMode8 || (c.style[b] = a ? "visible" : "hidden"),
				b = "top"),
				c.style[b] = a
			},
			xSetter: function(a, b, c) {
				this[b] = a,
				"x" === b ? b = "left" : "y" === b && (b = "top"),
				this.updateClipping ? (this[b] = a,
				this.updateClipping()) : c.style[b] = a
			},
			zIndexSetter: function(a, b, c) {
				c.style[b] = a
			}
		},
		c["stroke-opacitySetter"] = c["fill-opacitySetter"],
		a.VMLElement = c = b(s, c),
		c.prototype.ySetter = c.prototype.widthSetter = c.prototype.heightSetter = c.prototype.xSetter,
		c = {
			Element: c,
			isIE8: -1 < u.navigator.userAgent.indexOf("MSIE 8.0"),
			init: function(a, b, c) {
				var d, e;
				if (this.alignedObjects = [],
				d = this.createElement("div").css({
					position: "relative"
				}),
				e = d.element,
				a.appendChild(d.element),
				this.isVML = !0,
				this.box = e,
				this.boxWrapper = d,
				this.gradients = {},
				this.cache = {},
				this.cacheKeys = [],
				this.imgCount = 0,
				this.setSize(b, c, !1),
				!i.namespaces.hcv) {
					i.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
					try {
						i.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
					} catch (a) {
						i.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
					}
				}
			},
			isHidden: function() {
				return !this.box.offsetWidth
			},
			clipRect: function(a, b, c, d) {
				var e = this.createElement()
				  , f = o(a);
				return l(e, {
					members: [],
					count: 0,
					left: (f ? a.x : a) + 1,
					top: (f ? a.y : b) + 1,
					width: (f ? a.width : c) - 1,
					height: (f ? a.height : d) - 1,
					getCSS: function(a) {
						var b = a.element
						  , c = b.nodeName
						  , d = a.inverted
						  , e = this.top - ("shape" === c ? b.offsetTop : 0)
						  , f = this.left
						  , b = f + this.width
						  , g = e + this.height
						  , e = {
							clip: "rect(" + Math.round(d ? f : e) + "px," + Math.round(d ? g : b) + "px," + Math.round(d ? b : g) + "px," + Math.round(d ? e : f) + "px)"
						};
						return !d && a.docMode8 && "DIV" === c && l(e, {
							width: b + "px",
							height: g + "px"
						}),
						e
					},
					updateClipping: function() {
						j(e.members, function(a) {
							a.element && a.css(e.getCSS(a))
						})
					}
				})
			},
			color: function(b, c, e, f) {
				var g, h, i, k = this, l = /^rgba/, m = "none";
				if (b && b.linearGradient ? i = "gradient" : b && b.radialGradient && (i = "pattern"),
				i) {
					var n, o, p, q, r, s, t, u = b.linearGradient || b.radialGradient, v = "";
					b = b.stops;
					var w, x = [], y = function() {
						h = ['<fill colors="' + x.join(",") + '" opacity="', r, '" o:opacity2="', q, '" type="', i, '" ', v, 'focus="100%" method="any" />'],
						d(k.prepVML(h), null, null, c)
					};
					if (p = b[0],
					w = b[b.length - 1],
					0 < p[0] && b.unshift([0, p[1]]),
					1 > w[0] && b.push([1, w[1]]),
					j(b, function(b, c) {
						l.test(b[1]) ? (g = a.color(b[1]),
						n = g.get("rgb"),
						o = g.get("a")) : (n = b[1],
						o = 1),
						x.push(100 * b[0] + "% " + n),
						c ? (r = o,
						s = n) : (q = o,
						t = n)
					}),
					"fill" === e)
						if ("gradient" === i)
							e = u.x1 || u[0] || 0,
							b = u.y1 || u[1] || 0,
							p = u.x2 || u[2] || 0,
							u = u.y2 || u[3] || 0,
							v = 'angle="' + (90 - 180 * Math.atan((u - b) / (p - e)) / Math.PI) + '"',
							y();
						else {
							var z, m = u.r, A = 2 * m, B = 2 * m, C = u.cx, D = u.cy, E = c.radialReference, m = function() {
								E && (z = f.getBBox(),
								C += (E[0] - z.x) / z.width - .5,
								D += (E[1] - z.y) / z.height - .5,
								A *= E[2] / z.width,
								B *= E[2] / z.height),
								v = 'src="' + a.getOptions().global.VMLRadialGradientURL + '" size="' + A + "," + B + '" origin="0.5,0.5" position="' + C + "," + D + '" color2="' + t + '" ',
								y()
							};
							f.added ? m() : f.onAdd = m,
							m = s
						}
					else
						m = n
				} else
					l.test(b) && "IMG" !== c.tagName ? (g = a.color(b),
					f[e + "-opacitySetter"](g.get("a"), e, c),
					m = g.get("rgb")) : (m = c.getElementsByTagName(e),
					m.length && (m[0].opacity = 1,
					m[0].type = "solid"),
					m = b);
				return m
			},
			prepVML: function(a) {
				var b = this.isIE8;
				return a = a.join(""),
				b ? (a = a.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'),
				a = -1 === a.indexOf('style="') ? a.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : a = a.replace("<", "<hcv:"),
				a
			},
			text: t.prototype.html,
			path: function(a) {
				var b = {
					coordsize: "10 10"
				};
				return m(a) ? b.d = a : o(a) && l(b, a),
				this.createElement("shape").attr(b)
			},
			circle: function(a, b, c) {
				var d = this.symbol("circle");
				return o(a) && (c = a.r,
				b = a.y,
				a = a.x),
				d.isCircle = !0,
				d.r = c,
				d.attr({
					x: a,
					y: b
				})
			},
			g: function(a) {
				var b;
				return a && (b = {
					className: "highcharts-" + a,
					class: "highcharts-" + a
				}),
				this.createElement("div").attr(b)
			},
			image: function(a, b, c, d, e) {
				var f = this.createElement("img").attr({
					src: a
				});
				return 1 < arguments.length && f.attr({
					x: b,
					y: c,
					width: d,
					height: e
				}),
				f
			},
			createElement: function(a) {
				return "rect" === a ? this.symbol(a) : t.prototype.createElement.call(this, a)
			},
			invertChild: function(a, b) {
				var c = this;
				b = b.style;
				var d = "IMG" === a.tagName && a.style;
				e(a, {
					flip: "x",
					left: r(b.width) - (d ? r(d.top) : 1),
					top: r(b.height) - (d ? r(d.left) : 1),
					rotation: -90
				}),
				j(a.childNodes, function(b) {
					c.invertChild(b, a)
				})
			},
			symbols: {
				arc: function(a, b, c, d, e) {
					var f = e.start
					  , g = e.end
					  , h = e.r || c || d;
					c = e.innerR,
					d = Math.cos(f);
					var i = Math.sin(f)
					  , j = Math.cos(g)
					  , k = Math.sin(g);
					return 0 == g - f ? ["x"] : (f = ["wa", a - h, b - h, a + h, b + h, a + h * d, b + h * i, a + h * j, b + h * k],
					e.open && !c && f.push("e", "M", a, b),
					f.push("at", a - c, b - c, a + c, b + c, a + c * j, b + c * k, a + c * d, b + c * i, "x", "e"),
					f.isArc = !0,
					f)
				},
				circle: function(a, b, c, d, e) {
					return e && f(e.r) && (c = d = 2 * e.r),
					e && e.isCircle && (a -= c / 2,
					b -= d / 2),
					["wa", a, b, a + c, b + d, a + c, b + d / 2, a + c, b + d / 2, "e"]
				},
				rect: function(a, b, c, d, e) {
					return t.prototype.symbols[f(e) && e.r ? "callout" : "square"].call(0, a, b, c, d, e)
				}
			}
		},
		a.VMLRenderer = b = function() {
			this.init.apply(this, arguments)
		}
		,
		b.prototype = p(t.prototype, c),
		a.Renderer = b),
		t.prototype.measureSpanWidth = function(a, b) {
			var c = i.createElement("span");
			return a = i.createTextNode(a),
			c.appendChild(a),
			e(c, b),
			this.box.appendChild(c),
			b = c.offsetWidth,
			h(c),
			b
		}
	}(a),
	function(a) {
		function b() {
			var b = a.defaultOptions.global
			  , c = i.moment;
			if (b.timezone) {
				if (c)
					return function(a) {
						return -c.tz(a, b.timezone).utcOffset()
					}
					;
				a.error(25)
			}
			return b.useUTC && b.getTimezoneOffset
		}
		function c() {
			var c, d = a.defaultOptions.global, g = d.useUTC, j = g ? "getUTC" : "get", k = g ? "setUTC" : "set";
			a.Date = c = d.Date || i.Date,
			c.hcTimezoneOffset = g && d.timezoneOffset,
			c.hcGetTimezoneOffset = b(),
			c.hcMakeTime = function(a, b, d, e, i, j) {
				var k;
				return g ? (k = c.UTC.apply(0, arguments),
				k += f(k)) : k = new c(a,b,h(d, 1),h(e, 0),h(i, 0),h(j, 0)).getTime(),
				k
			}
			,
			e("Minutes Hours Day Date Month FullYear".split(" "), function(a) {
				c["hcGet" + a] = j + a
			}),
			e("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function(a) {
				c["hcSet" + a] = k + a
			})
		}
		var d = a.color
		  , e = a.each
		  , f = a.getTZOffset
		  , g = a.merge
		  , h = a.pick
		  , i = a.win;
		a.defaultOptions = {
			colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
			symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
			lang: {
				loading: "Loading...",
				months: "January February March April May June July August September October November December".split(" "),
				shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
				weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
				decimalPoint: ".",
				numericSymbols: "kMGTPE".split(""),
				resetZoom: "Reset zoom",
				resetZoomTitle: "Reset zoom level 1:1",
				thousandsSep: " "
			},
			global: {
				useUTC: !0,
				VMLRadialGradientURL: "http://code.highcharts.com/5.0.14/gfx/vml-radial-gradient.png"
			},
			chart: {
				borderRadius: 0,
				defaultSeriesType: "line",
				ignoreHiddenSeries: !0,
				spacing: [10, 10, 15, 10],
				resetZoomButton: {
					theme: {
						zIndex: 20
					},
					position: {
						align: "right",
						x: -10,
						y: 10
					}
				},
				width: null,
				height: null,
				borderColor: "#335cad",
				backgroundColor: "#ffffff",
				plotBorderColor: "#cccccc"
			},
			title: {
				text: "Chart title",
				align: "center",
				margin: 15,
				widthAdjust: -44
			},
			subtitle: {
				text: "",
				align: "center",
				widthAdjust: -44
			},
			plotOptions: {},
			labels: {
				style: {
					position: "absolute",
					color: "#333333"
				}
			},
			legend: {
				enabled: !0,
				align: "center",
				layout: "horizontal",
				labelFormatter: function() {
					return this.name
				},
				borderColor: "#999999",
				borderRadius: 0,
				navigation: {
					activeColor: "#003399",
					inactiveColor: "#cccccc"
				},
				itemStyle: {
					color: "#333333",
					fontSize: "12px",
					fontWeight: "bold",
					textOverflow: "ellipsis"
				},
				itemHoverStyle: {
					color: "#000000"
				},
				itemHiddenStyle: {
					color: "#cccccc"
				},
				shadow: !1,
				itemCheckboxStyle: {
					position: "absolute",
					width: "13px",
					height: "13px"
				},
				squareSymbol: !0,
				symbolPadding: 5,
				verticalAlign: "bottom",
				x: 0,
				y: 0,
				title: {
					style: {
						fontWeight: "bold"
					}
				}
			},
			loading: {
				labelStyle: {
					fontWeight: "bold",
					position: "relative",
					top: "45%"
				},
				style: {
					position: "absolute",
					backgroundColor: "#ffffff",
					opacity: .5,
					textAlign: "center"
				}
			},
			tooltip: {
				enabled: !0,
				animation: a.svg,
				borderRadius: 3,
				dateTimeLabelFormats: {
					millisecond: "%A, %b %e, %H:%M:%S.%L",
					second: "%A, %b %e, %H:%M:%S",
					minute: "%A, %b %e, %H:%M",
					hour: "%A, %b %e, %H:%M",
					day: "%A, %b %e, %Y",
					week: "Week from %A, %b %e, %Y",
					month: "%B %Y",
					year: "%Y"
				},
				footerFormat: "",
				padding: 8,
				snap: a.isTouchDevice ? 25 : 10,
				backgroundColor: d("#f7f7f7").setOpacity(.85).get(),
				borderWidth: 1,
				headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
				pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
				shadow: !0,
				style: {
					color: "#333333",
					cursor: "default",
					fontSize: "12px",
					pointerEvents: "none",
					whiteSpace: "nowrap"
				}
			},
			credits: {
				enabled: !0,
				href: "http://www.highcharts.com",
				position: {
					align: "right",
					x: -10,
					verticalAlign: "bottom",
					y: -5
				},
				style: {
					cursor: "pointer",
					color: "#999999",
					fontSize: "9px"
				},
				text: "Highcharts.com"
			}
		},
		a.setOptions = function(b) {
			return a.defaultOptions = g(!0, a.defaultOptions, b),
			c(),
			a.defaultOptions
		}
		,
		a.getOptions = function() {
			return a.defaultOptions
		}
		,
		a.defaultPlotOptions = a.defaultOptions.plotOptions,
		c()
	}(a),
	function(a) {
		var b = a.correctFloat
		  , c = a.defined
		  , d = a.destroyObjectProperties
		  , e = a.isNumber
		  , f = a.merge
		  , g = a.pick
		  , h = a.deg2rad;
		a.Tick = function(a, b, c, d) {
			this.axis = a,
			this.pos = b,
			this.type = c || "",
			this.isNewLabel = this.isNew = !0,
			c || d || this.addLabel()
		}
		,
		a.Tick.prototype = {
			addLabel: function() {
				var a, d = this.axis, e = d.options, h = d.chart, i = d.categories, j = d.names, k = this.pos, l = e.labels, m = d.tickPositions, n = k === m[0], o = k === m[m.length - 1], j = i ? g(i[k], j[k], k) : k, i = this.label, m = m.info;
				d.isDatetimeAxis && m && (a = e.dateTimeLabelFormats[m.higherRanks[k] || m.unitName]),
				this.isFirst = n,
				this.isLast = o,
				e = d.labelFormatter.call({
					axis: d,
					chart: h,
					isFirst: n,
					isLast: o,
					dateTimeLabelFormat: a,
					value: d.isLog ? b(d.lin2log(j)) : j,
					pos: k
				}),
				c(i) ? i && i.attr({
					text: e
				}) : (this.labelLength = (this.label = i = c(e) && l.enabled ? h.renderer.text(e, 0, 0, l.useHTML).css(f(l.style)).add(d.labelGroup) : null) && i.getBBox().width,
				this.rotation = 0)
			},
			getLabelSize: function() {
				return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
			},
			handleOverflow: function(a) {
				var b, c = this.axis, d = a.x, e = c.chart.chartWidth, f = c.chart.spacing, i = g(c.labelLeft, Math.min(c.pos, f[3])), f = g(c.labelRight, Math.max(c.pos + c.len, e - f[1])), j = this.label, k = this.rotation, l = {
					left: 0,
					center: .5,
					right: 1
				}[c.labelAlign], m = j.getBBox().width, n = c.getSlotWidth(), o = n, p = 1, q = {};
				k ? 0 > k && d - l * m < i ? b = Math.round(d / Math.cos(k * h) - i) : 0 < k && d + l * m > f && (b = Math.round((e - d) / Math.cos(k * h))) : (e = d + (1 - l) * m,
				d - l * m < i ? o = a.x + o * (1 - l) - i : e > f && (o = f - a.x + o * l,
				p = -1),
				o = Math.min(n, o),
				o < n && "center" === c.labelAlign && (a.x += p * (n - o - l * (n - Math.min(m, o)))),
				(m > o || c.autoRotation && (j.styles || {}).width) && (b = o)),
				b && (q.width = b,
				(c.options.labels.style || {}).textOverflow || (q.textOverflow = "ellipsis"),
				j.css(q))
			},
			getPosition: function(a, b, c, d) {
				var e = this.axis
				  , f = e.chart
				  , g = d && f.oldChartHeight || f.chartHeight;
				return {
					x: a ? e.translate(b + c, null, null, d) + e.transB : e.left + e.offset + (e.opposite ? (d && f.oldChartWidth || f.chartWidth) - e.right - e.left : 0),
					y: a ? g - e.bottom + e.offset - (e.opposite ? e.height : 0) : g - e.translate(b + c, null, null, d) - e.transB
				}
			},
			getLabelPosition: function(a, b, d, e, f, g, i, j) {
				var k = this.axis
				  , l = k.transA
				  , m = k.reversed
				  , n = k.staggerLines
				  , o = k.tickRotCorr || {
					x: 0,
					y: 0
				}
				  , p = f.y;
				return c(p) || (p = 0 === k.side ? d.rotation ? -8 : -d.getBBox().height : 2 === k.side ? o.y + 8 : Math.cos(d.rotation * h) * (o.y - d.getBBox(!1, 0).height / 2)),
				a = a + f.x + o.x - (g && e ? g * l * (m ? -1 : 1) : 0),
				b = b + p - (g && !e ? g * l * (m ? 1 : -1) : 0),
				n && (d = i / (j || 1) % n,
				k.opposite && (d = n - d - 1),
				b += k.labelOffset / n * d),
				{
					x: a,
					y: Math.round(b)
				}
			},
			getMarkPath: function(a, b, c, d, e, f) {
				return f.crispLine(["M", a, b, "L", a + (e ? 0 : -c), b + (e ? c : 0)], d)
			},
			renderGridLine: function(a, b, c) {
				var d = this.axis
				  , e = d.options
				  , f = this.gridLine
				  , g = {}
				  , h = this.pos
				  , i = this.type
				  , j = d.tickmarkOffset
				  , k = d.chart.renderer
				  , l = i ? i + "Grid" : "grid"
				  , m = e[l + "LineWidth"]
				  , n = e[l + "LineColor"]
				  , e = e[l + "LineDashStyle"];
				f || (g.stroke = n,
				g["stroke-width"] = m,
				e && (g.dashstyle = e),
				i || (g.zIndex = 1),
				a && (g.opacity = 0),
				this.gridLine = f = k.path().attr(g).addClass("highcharts-" + (i ? i + "-" : "") + "grid-line").add(d.gridGroup)),
				!a && f && (a = d.getPlotLinePath(h + j, f.strokeWidth() * c, a, !0)) && f[this.isNew ? "attr" : "animate"]({
					d: a,
					opacity: b
				})
			},
			renderMark: function(a, b, c) {
				var d = this.axis
				  , e = d.options
				  , f = d.chart.renderer
				  , h = this.type
				  , i = h ? h + "Tick" : "tick"
				  , j = d.tickSize(i)
				  , k = this.mark
				  , l = !k
				  , m = a.x;
				a = a.y;
				var n = g(e[i + "Width"], !h && d.isXAxis ? 1 : 0)
				  , e = e[i + "Color"];
				j && (d.opposite && (j[0] = -j[0]),
				l && (this.mark = k = f.path().addClass("highcharts-" + (h ? h + "-" : "") + "tick").add(d.axisGroup),
				k.attr({
					stroke: e,
					"stroke-width": n
				})),
				k[l ? "attr" : "animate"]({
					d: this.getMarkPath(m, a, j[0], k.strokeWidth() * c, d.horiz, f),
					opacity: b
				}))
			},
			renderLabel: function(a, b, c, d) {
				var f = this.axis
				  , h = f.horiz
				  , i = f.options
				  , j = this.label
				  , k = i.labels
				  , l = k.step
				  , m = f.tickmarkOffset
				  , n = !0
				  , o = a.x;
				a = a.y,
				j && e(o) && (j.xy = a = this.getLabelPosition(o, a, j, h, k, m, d, l),
				this.isFirst && !this.isLast && !g(i.showFirstLabel, 1) || this.isLast && !this.isFirst && !g(i.showLastLabel, 1) ? n = !1 : !h || f.isRadial || k.step || k.rotation || b || 0 === c || this.handleOverflow(a),
				l && d % l && (n = !1),
				n && e(a.y) ? (a.opacity = c,
				j[this.isNewLabel ? "attr" : "animate"](a),
				this.isNewLabel = !1) : (j.attr("y", -9999),
				this.isNewLabel = !0),
				this.isNew = !1)
			},
			render: function(a, b, c) {
				var d = this.axis
				  , e = d.horiz
				  , f = this.getPosition(e, this.pos, d.tickmarkOffset, b)
				  , h = f.x
				  , i = f.y
				  , d = e && h === d.pos + d.len || !e && i === d.pos ? -1 : 1;
				c = g(c, 1),
				this.isActive = !0,
				this.renderGridLine(b, c, d),
				this.renderMark(f, c, d),
				this.renderLabel(f, b, c, a)
			},
			destroy: function() {
				d(this, this.axis)
			}
		}
	}(a);
	var b = function(a) {
		var b = a.addEvent
		  , c = a.animObject
		  , d = a.arrayMax
		  , e = a.arrayMin
		  , f = a.color
		  , g = a.correctFloat
		  , h = a.defaultOptions
		  , i = a.defined
		  , j = a.deg2rad
		  , k = a.destroyObjectProperties
		  , l = a.each
		  , m = a.extend
		  , n = a.fireEvent
		  , o = a.format
		  , p = a.getMagnitude
		  , q = a.grep
		  , r = a.inArray
		  , s = a.isArray
		  , t = a.isNumber
		  , u = a.isString
		  , v = a.merge
		  , w = a.normalizeTickInterval
		  , x = a.objectEach
		  , y = a.pick
		  , z = a.removeEvent
		  , A = a.splat
		  , B = a.syncTimeout
		  , C = a.Tick
		  , D = function() {
			this.init.apply(this, arguments)
		};
		return a.extend(D.prototype, {
			defaultOptions: {
				dateTimeLabelFormats: {
					millisecond: "%H:%M:%S.%L",
					second: "%H:%M:%S",
					minute: "%H:%M",
					hour: "%H:%M",
					day: "%e. %b",
					week: "%e. %b",
					month: "%b '%y",
					year: "%Y"
				},
				endOnTick: !1,
				labels: {
					enabled: !0,
					style: {
						color: "#666666",
						cursor: "default",
						fontSize: "11px"
					},
					x: 0
				},
				minPadding: .01,
				maxPadding: .01,
				minorTickLength: 2,
				minorTickPosition: "outside",
				startOfWeek: 1,
				startOnTick: !1,
				tickLength: 10,
				tickmarkPlacement: "between",
				tickPixelInterval: 100,
				tickPosition: "outside",
				title: {
					align: "middle",
					style: {
						color: "#666666"
					}
				},
				type: "linear",
				minorGridLineColor: "#f2f2f2",
				minorGridLineWidth: 1,
				minorTickColor: "#999999",
				lineColor: "#ccd6eb",
				lineWidth: 1,
				gridLineColor: "#e6e6e6",
				tickColor: "#ccd6eb"
			},
			defaultYAxisOptions: {
				endOnTick: !0,
				tickPixelInterval: 72,
				showLastLabel: !0,
				labels: {
					x: -8
				},
				maxPadding: .05,
				minPadding: .05,
				startOnTick: !0,
				title: {
					rotation: 270,
					text: "Values"
				},
				stackLabels: {
					allowOverlap: !1,
					enabled: !1,
					formatter: function() {
						return a.numberFormat(this.total, -1)
					},
					style: {
						fontSize: "11px",
						fontWeight: "bold",
						color: "#000000",
						textOutline: "1px contrast"
					}
				},
				gridLineWidth: 1,
				lineWidth: 0
			},
			defaultLeftAxisOptions: {
				labels: {
					x: -15
				},
				title: {
					rotation: 270
				}
			},
			defaultRightAxisOptions: {
				labels: {
					x: 15
				},
				title: {
					rotation: 90
				}
			},
			defaultBottomAxisOptions: {
				labels: {
					autoRotation: [-45],
					x: 0
				},
				title: {
					rotation: 0
				}
			},
			defaultTopAxisOptions: {
				labels: {
					autoRotation: [-45],
					x: 0
				},
				title: {
					rotation: 0
				}
			},
			init: function(a, c) {
				var d = c.isX
				  , e = this;
				e.chart = a,
				e.horiz = a.inverted && !e.isZAxis ? !d : d,
				e.isXAxis = d,
				e.coll = e.coll || (d ? "xAxis" : "yAxis"),
				e.opposite = c.opposite,
				e.side = c.side || (e.horiz ? e.opposite ? 0 : 2 : e.opposite ? 1 : 3),
				e.setOptions(c);
				var f = this.options
				  , g = f.type;
				e.labelFormatter = f.labels.formatter || e.defaultLabelFormatter,
				e.userOptions = c,
				e.minPixelPadding = 0,
				e.reversed = f.reversed,
				e.visible = !1 !== f.visible,
				e.zoomEnabled = !1 !== f.zoomEnabled,
				e.hasNames = "category" === g || !0 === f.categories,
				e.categories = f.categories || e.hasNames,
				e.names = e.names || [],
				e.plotLinesAndBandsGroups = {},
				e.isLog = "logarithmic" === g,
				e.isDatetimeAxis = "datetime" === g,
				e.positiveValuesOnly = e.isLog && !e.allowNegativeLog,
				e.isLinked = i(f.linkedTo),
				e.ticks = {},
				e.labelEdge = [],
				e.minorTicks = {},
				e.plotLinesAndBands = [],
				e.alternateBands = {},
				e.len = 0,
				e.minRange = e.userMinRange = f.minRange || f.maxZoom,
				e.range = f.range,
				e.offset = f.offset || 0,
				e.stacks = {},
				e.oldStacks = {},
				e.stacksTouched = 0,
				e.max = null,
				e.min = null,
				e.crosshair = y(f.crosshair, A(a.options.tooltip.crosshairs)[d ? 0 : 1], !1),
				c = e.options.events,
				-1 === r(e, a.axes) && (d ? a.axes.splice(a.xAxis.length, 0, e) : a.axes.push(e),
				a[e.coll].push(e)),
				e.series = e.series || [],
				a.inverted && !e.isZAxis && d && void 0 === e.reversed && (e.reversed = !0),
				x(c, function(a, c) {
					b(e, c, a)
				}),
				e.lin2log = f.linearToLogConverter || e.lin2log,
				e.isLog && (e.val2lin = e.log2lin,
				e.lin2val = e.lin2log)
			},
			setOptions: function(a) {
				this.options = v(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], v(h[this.coll], a))
			},
			defaultLabelFormatter: function() {
				var b, c = this.axis, d = this.value, e = c.categories, f = this.dateTimeLabelFormat, g = h.lang, i = g.numericSymbols, g = g.numericSymbolMagnitude || 1e3, j = i && i.length, k = c.options.labels.format, c = c.isLog ? Math.abs(d) : c.tickInterval;
				if (k)
					b = o(k, this);
				else if (e)
					b = d;
				else if (f)
					b = a.dateFormat(f, d);
				else if (j && 1e3 <= c)
					for (; j-- && void 0 === b; )
						e = Math.pow(g, j + 1),
						c >= e && 0 == 10 * d % e && null !== i[j] && 0 !== d && (b = a.numberFormat(d / e, -1) + i[j]);
				return void 0 === b && (b = 1e4 <= Math.abs(d) ? a.numberFormat(d, -1) : a.numberFormat(d, -1, void 0, "")),
				b
			},
			getSeriesExtremes: function() {
				var a = this
				  , b = a.chart;
				a.hasVisibleSeries = !1,
				a.dataMin = a.dataMax = a.threshold = null,
				a.softThreshold = !a.isXAxis,
				a.buildStacks && a.buildStacks(),
				l(a.series, function(c) {
					if (c.visible || !b.options.chart.ignoreHiddenSeries) {
						var f, g = c.options, h = g.threshold;
						a.hasVisibleSeries = !0,
						a.positiveValuesOnly && 0 >= h && (h = null),
						a.isXAxis ? (g = c.xData,
						g.length && (c = e(g),
						t(c) || c instanceof Date || (g = q(g, function(a) {
							return t(a)
						}),
						c = e(g)),
						a.dataMin = Math.min(y(a.dataMin, g[0]), c),
						a.dataMax = Math.max(y(a.dataMax, g[0]), d(g)))) : (c.getExtremes(),
						f = c.dataMax,
						c = c.dataMin,
						i(c) && i(f) && (a.dataMin = Math.min(y(a.dataMin, c), c),
						a.dataMax = Math.max(y(a.dataMax, f), f)),
						i(h) && (a.threshold = h),
						(!g.softThreshold || a.positiveValuesOnly) && (a.softThreshold = !1))
					}
				})
			},
			translate: function(a, b, c, d, e, f) {
				var g = this.linkedParent || this
				  , h = 1
				  , i = 0
				  , j = d ? g.oldTransA : g.transA;
				d = d ? g.oldMin : g.min;
				var k = g.minPixelPadding;
				return e = (g.isOrdinal || g.isBroken || g.isLog && e) && g.lin2val,
				j || (j = g.transA),
				c && (h *= -1,
				i = g.len),
				g.reversed && (h *= -1,
				i -= h * (g.sector || g.len)),
				b ? (a = (a * h + i - k) / j + d,
				e && (a = g.lin2val(a))) : (e && (a = g.val2lin(a)),
				a = h * (a - d) * j + i + h * k + (t(f) ? j * f : 0)),
				a
			},
			toPixels: function(a, b) {
				return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
			},
			toValue: function(a, b) {
				return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
			},
			getPlotLinePath: function(a, b, c, d, e) {
				var f, g, h, i = this.chart, j = this.left, k = this.top, l = c && i.oldChartHeight || i.chartHeight, m = c && i.oldChartWidth || i.chartWidth;
				f = this.transB;
				var n = function(a, b, c) {
					return (a < b || a > c) && (d ? a = Math.min(Math.max(b, a), c) : h = !0),
					a
				};
				return e = y(e, this.translate(a, null, null, c)),
				a = c = Math.round(e + f),
				f = g = Math.round(l - e - f),
				t(e) ? this.horiz ? (f = k,
				g = l - this.bottom,
				a = c = n(a, j, j + this.width)) : (a = j,
				c = m - this.right,
				f = g = n(f, k, k + this.height)) : h = !0,
				h && !d ? null : i.renderer.crispLine(["M", a, f, "L", c, g], b || 1)
			},
			getLinearTickPositions: function(a, b, c) {
				var d, e = g(Math.floor(b / a) * a);
				c = g(Math.ceil(c / a) * a);
				var f = [];
				if (this.single)
					return [b];
				for (b = e; b <= c && (f.push(b),
				(b = g(b + a)) !== d); )
					d = b;
				return f
			},
			getMinorTickPositions: function() {
				var a = this
				  , b = a.options
				  , c = a.tickPositions
				  , d = a.minorTickInterval
				  , e = []
				  , f = a.pointRangePadding || 0
				  , g = a.min - f
				  , f = a.max + f
				  , h = f - g;
				if (h && h / d < a.len / 3)
					if (a.isLog)
						l(this.paddedTicks, function(b, c, f) {
							c && e.push.apply(e, a.getLogTickPositions(d, f[c - 1], f[c], !0))
						});
					else if (a.isDatetimeAxis && "auto" === b.minorTickInterval)
						e = e.concat(a.getTimeTicks(a.normalizeTimeTickInterval(d), g, f, b.startOfWeek));
					else
						for (b = g + (c[0] - g) % d; b <= f && b !== e[0]; b += d)
							e.push(b);
				return 0 !== e.length && a.trimTicks(e),
				e
			},
			adjustForMinRange: function() {
				var a, b, c, f, g, h, j, k, m = this.options, n = this.min, o = this.max;
				this.isXAxis && void 0 === this.minRange && !this.isLog && (i(m.min) || i(m.max) ? this.minRange = null : (l(this.series, function(a) {
					for (h = a.xData,
					f = j = a.xIncrement ? 1 : h.length - 1; 0 < f; f--)
						g = h[f] - h[f - 1],
						(void 0 === c || g < c) && (c = g)
				}),
				this.minRange = Math.min(5 * c, this.dataMax - this.dataMin))),
				o - n < this.minRange && (b = this.dataMax - this.dataMin >= this.minRange,
				k = this.minRange,
				a = (k - o + n) / 2,
				a = [n - a, y(m.min, n - a)],
				b && (a[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin),
				n = d(a),
				o = [n + k, y(m.max, n + k)],
				b && (o[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax),
				(o = e(o)) - n < k && (a[0] = o - k,
				a[1] = y(m.min, o - k),
				n = d(a))),
				this.min = n,
				this.max = o
			},
			getClosest: function() {
				var a;
				return this.categories ? a = 1 : l(this.series, function(b) {
					var c = b.closestPointRange
					  , d = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
					!b.noSharedTooltip && i(c) && d && (a = i(a) ? Math.min(a, c) : c)
				}),
				a
			},
			nameToX: function(a) {
				var b, c = s(this.categories), d = c ? this.categories : this.names, e = a.options.x;
				return a.series.requireSorting = !1,
				i(e) || (e = !1 === this.options.uniqueNames ? a.series.autoIncrement() : r(a.name, d)),
				-1 === e ? c || (b = d.length) : b = e,
				void 0 !== b && (this.names[b] = a.name),
				b
			},
			updateNames: function() {
				var a = this;
				0 < this.names.length && (this.names.length = 0,
				this.minRange = this.userMinRange,
				l(this.series || [], function(b) {
					b.xIncrement = null,
					b.points && !b.isDirtyData || (b.processData(),
					b.generatePoints()),
					l(b.points, function(c, d) {
						var e;
						c.options && void 0 !== (e = a.nameToX(c)) && e !== c.x && (c.x = e,
						b.xData[d] = e)
					})
				}))
			},
			setAxisTranslation: function(a) {
				var b, c = this, d = c.max - c.min, e = c.axisPointRange || 0, f = 0, g = 0, h = c.linkedParent, i = !!c.categories, j = c.transA, k = c.isXAxis;
				(k || i || e) && (b = c.getClosest(),
				h ? (f = h.minPointOffset,
				g = h.pointRangePadding) : l(c.series, function(a) {
					var d = i ? 1 : k ? y(a.options.pointRange, b, 0) : c.axisPointRange || 0;
					a = a.options.pointPlacement,
					e = Math.max(e, d),
					c.single || (f = Math.max(f, u(a) ? 0 : d / 2),
					g = Math.max(g, "on" === a ? 0 : d))
				}),
				h = c.ordinalSlope && b ? c.ordinalSlope / b : 1,
				c.minPointOffset = f *= h,
				c.pointRangePadding = g *= h,
				c.pointRange = Math.min(e, d),
				k && (c.closestPointRange = b)),
				a && (c.oldTransA = j),
				c.translationSlope = c.transA = j = c.options.staticScale || c.len / (d + g || 1),
				c.transB = c.horiz ? c.left : c.bottom,
				c.minPixelPadding = j * f
			},
			minFromRange: function() {
				return this.max - this.range
			},
			setTickInterval: function(b) {
				var c, d, e, f, h = this, j = h.chart, k = h.options, m = h.isLog, o = h.log2lin, q = h.isDatetimeAxis, r = h.isXAxis, s = h.isLinked, u = k.maxPadding, v = k.minPadding, x = k.tickInterval, z = k.tickPixelInterval, A = h.categories, B = h.threshold, C = h.softThreshold;
				q || A || s || this.getTickAmount(),
				e = y(h.userMin, k.min),
				f = y(h.userMax, k.max),
				s ? (h.linkedParent = j[h.coll][k.linkedTo],
				j = h.linkedParent.getExtremes(),
				h.min = y(j.min, j.dataMin),
				h.max = y(j.max, j.dataMax),
				k.type !== h.linkedParent.options.type && a.error(11, 1)) : (!C && i(B) && (h.dataMin >= B ? (c = B,
				v = 0) : h.dataMax <= B && (d = B,
				u = 0)),
				h.min = y(e, c, h.dataMin),
				h.max = y(f, d, h.dataMax)),
				m && (h.positiveValuesOnly && !b && 0 >= Math.min(h.min, y(h.dataMin, h.min)) && a.error(10, 1),
				h.min = g(o(h.min), 15),
				h.max = g(o(h.max), 15)),
				h.range && i(h.max) && (h.userMin = h.min = e = Math.max(h.dataMin, h.minFromRange()),
				h.userMax = f = h.max,
				h.range = null),
				n(h, "foundExtremes"),
				h.beforePadding && h.beforePadding(),
				h.adjustForMinRange(),
				!(A || h.axisPointRange || h.usePercentage || s) && i(h.min) && i(h.max) && (o = h.max - h.min) && (!i(e) && v && (h.min -= o * v),
				!i(f) && u && (h.max += o * u)),
				t(k.softMin) && (h.min = Math.min(h.min, k.softMin)),
				t(k.softMax) && (h.max = Math.max(h.max, k.softMax)),
				t(k.floor) && (h.min = Math.max(h.min, k.floor)),
				t(k.ceiling) && (h.max = Math.min(h.max, k.ceiling)),
				C && i(h.dataMin) && (B = B || 0,
				!i(e) && h.min < B && h.dataMin >= B ? h.min = B : !i(f) && h.max > B && h.dataMax <= B && (h.max = B)),
				h.tickInterval = h.min === h.max || void 0 === h.min || void 0 === h.max ? 1 : s && !x && z === h.linkedParent.options.tickPixelInterval ? x = h.linkedParent.tickInterval : y(x, this.tickAmount ? (h.max - h.min) / Math.max(this.tickAmount - 1, 1) : void 0, A ? 1 : (h.max - h.min) * z / Math.max(h.len, z)),
				r && !b && l(h.series, function(a) {
					a.processData(h.min !== h.oldMin || h.max !== h.oldMax)
				}),
				h.setAxisTranslation(!0),
				h.beforeSetTickPositions && h.beforeSetTickPositions(),
				h.postProcessTickInterval && (h.tickInterval = h.postProcessTickInterval(h.tickInterval)),
				h.pointRange && !x && (h.tickInterval = Math.max(h.pointRange, h.tickInterval)),
				b = y(k.minTickInterval, h.isDatetimeAxis && h.closestPointRange),
				!x && h.tickInterval < b && (h.tickInterval = b),
				q || m || x || (h.tickInterval = w(h.tickInterval, null, p(h.tickInterval), y(k.allowDecimals, !(.5 < h.tickInterval && 5 > h.tickInterval && 1e3 < h.max && 9999 > h.max)), !!this.tickAmount)),
				this.tickAmount || (h.tickInterval = h.unsquish()),
				this.setTickPositions()
			},
			setTickPositions: function() {
				var a, b = this.options, c = b.tickPositions, d = b.tickPositioner, e = b.startOnTick, f = b.endOnTick;
				this.tickmarkOffset = this.categories && "between" === b.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0,
				this.minorTickInterval = "auto" === b.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : b.minorTickInterval,
				this.single = this.min === this.max && i(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals),
				this.tickPositions = a = c && c.slice(),
				!a && (a = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, b.units), this.min, this.max, b.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max),
				a.length > this.len && (a = [a[0], a.pop()]),
				this.tickPositions = a,
				d && (d = d.apply(this, [this.min, this.max]))) && (this.tickPositions = a = d),
				this.paddedTicks = a.slice(0),
				this.trimTicks(a, e, f),
				this.isLinked || (this.single && 2 > a.length && (this.min -= .5,
				this.max += .5),
				c || d || this.adjustTickAmount())
			},
			trimTicks: function(a, b, c) {
				var d = a[0]
				  , e = a[a.length - 1]
				  , f = this.minPointOffset || 0;
				if (!this.isLinked) {
					if (b && -1 / 0 !== d)
						this.min = d;
					else
						for (; this.min - f > a[0]; )
							a.shift();
					if (c)
						this.max = e;
					else
						for (; this.max + f < a[a.length - 1]; )
							a.pop();
					0 === a.length && i(d) && a.push((e + d) / 2)
				}
			},
			alignToOthers: function() {
				var a, b = {}, c = this.options;
				return !1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || this.isLog || l(this.chart[this.coll], function(c) {
					var d = c.options
					  , d = [c.horiz ? d.left : d.top, d.width, d.height, d.pane].join();
					c.series.length && (b[d] ? a = !0 : b[d] = 1)
				}),
				a
			},
			getTickAmount: function() {
				var a = this.options
				  , b = a.tickAmount
				  , c = a.tickPixelInterval;
				!i(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2),
				!b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1),
				4 > b && (this.finalTickAmt = b,
				b = 5),
				this.tickAmount = b
			},
			adjustTickAmount: function() {
				var a = this.tickInterval
				  , b = this.tickPositions
				  , c = this.tickAmount
				  , d = this.finalTickAmt
				  , e = b && b.length;
				if (e < c) {
					for (; b.length < c; )
						b.push(g(b[b.length - 1] + a));
					this.transA *= (e - 1) / (c - 1),
					this.max = b[b.length - 1]
				} else
					e > c && (this.tickInterval *= 2,
					this.setTickPositions());
				if (i(d)) {
					for (a = c = b.length; a--; )
						(3 === d && 1 == a % 2 || 2 >= d && 0 < a && a < c - 1) && b.splice(a, 1);
					this.finalTickAmt = void 0
				}
			},
			setScale: function() {
				var a, b;
				this.oldMin = this.min,
				this.oldMax = this.max,
				this.oldAxisLength = this.len,
				this.setAxisSize(),
				b = this.len !== this.oldAxisLength,
				l(this.series, function(b) {
					(b.isDirtyData || b.isDirty || b.xAxis.isDirty) && (a = !0)
				}),
				b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(),
				this.forceRedraw = !1,
				this.getSeriesExtremes(),
				this.setTickInterval(),
				this.oldUserMin = this.userMin,
				this.oldUserMax = this.userMax,
				this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
			},
			setExtremes: function(a, b, c, d, e) {
				var f = this
				  , g = f.chart;
				c = y(c, !0),
				l(f.series, function(a) {
					delete a.kdTree
				}),
				e = m(e, {
					min: a,
					max: b
				}),
				n(f, "setExtremes", e, function() {
					f.userMin = a,
					f.userMax = b,
					f.eventArgs = e,
					c && g.redraw(d)
				})
			},
			zoom: function(a, b) {
				var c = this.dataMin
				  , d = this.dataMax
				  , e = this.options
				  , f = Math.min(c, y(e.min, c))
				  , e = Math.max(d, y(e.max, d));
				return a === this.min && b === this.max || (this.allowZoomOutside || (i(c) && (a < f && (a = f),
				a > e && (a = e)),
				i(d) && (b < f && (b = f),
				b > e && (b = e))),
				this.displayBtn = void 0 !== a || void 0 !== b,
				this.setExtremes(a, b, !1, void 0, {
					trigger: "zoom"
				})),
				!0
			},
			setAxisSize: function() {
				var b = this.chart
				  , c = this.options
				  , d = c.offsets || [0, 0, 0, 0]
				  , e = this.horiz
				  , f = this.width = Math.round(a.relativeLength(y(c.width, b.plotWidth - d[3] + d[1]), b.plotWidth))
				  , g = this.height = Math.round(a.relativeLength(y(c.height, b.plotHeight - d[0] + d[2]), b.plotHeight))
				  , h = this.top = Math.round(a.relativeLength(y(c.top, b.plotTop + d[0]), b.plotHeight, b.plotTop))
				  , c = this.left = Math.round(a.relativeLength(y(c.left, b.plotLeft + d[3]), b.plotWidth, b.plotLeft));
				this.bottom = b.chartHeight - g - h,
				this.right = b.chartWidth - f - c,
				this.len = Math.max(e ? f : g, 0),
				this.pos = e ? c : h
			},
			getExtremes: function() {
				var a = this.isLog
				  , b = this.lin2log;
				return {
					min: a ? g(b(this.min)) : this.min,
					max: a ? g(b(this.max)) : this.max,
					dataMin: this.dataMin,
					dataMax: this.dataMax,
					userMin: this.userMin,
					userMax: this.userMax
				}
			},
			getThreshold: function(a) {
				var b = this.isLog
				  , c = this.lin2log
				  , d = b ? c(this.min) : this.min
				  , b = b ? c(this.max) : this.max;
				return null === a ? a = d : d > a ? a = d : b < a && (a = b),
				this.translate(a, 0, 1, 0, 1)
			},
			autoLabelAlign: function(a) {
				return a = (y(a, 0) - 90 * this.side + 720) % 360,
				15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
			},
			tickSize: function(a) {
				var b = this.options
				  , c = b[a + "Length"]
				  , d = y(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
				if (d && c)
					return "inside" === b[a + "Position"] && (c = -c),
					[c, d]
			},
			labelMetrics: function() {
				var a = this.tickPositions && this.tickPositions[0] || 0;
				return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
			},
			unsquish: function() {
				var a, b, c, d = this.options.labels, e = this.horiz, f = this.tickInterval, g = f, h = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / f), k = d.rotation, m = this.labelMetrics(), n = Number.MAX_VALUE, o = function(a) {
					return a /= h || 1,
					(a = 1 < a ? Math.ceil(a) : 1) * f
				};
				return e ? (c = !d.staggerLines && !d.step && (i(k) ? [k] : h < y(d.autoRotationLimit, 80) && d.autoRotation)) && l(c, function(c) {
					var d;
					(c === k || c && -90 <= c && 90 >= c) && (b = o(Math.abs(m.h / Math.sin(j * c))),
					(d = b + Math.abs(c / 360)) < n && (n = d,
					a = c,
					g = b))
				}) : d.step || (g = o(m.h)),
				this.autoRotation = c,
				this.labelRotation = y(a, k),
				g
			},
			getSlotWidth: function() {
				var a = this.chart
				  , b = this.horiz
				  , c = this.options.labels
				  , d = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1)
				  , e = a.margin[3];
				return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * this.len / d || !b && (e && e - a.spacing[3] || .33 * a.chartWidth)
			},
			renderUnsquish: function() {
				var a, b, c, d = this.chart, e = d.renderer, f = this.tickPositions, g = this.ticks, h = this.options.labels, i = this.horiz, j = this.getSlotWidth(), k = Math.max(1, Math.round(j - 2 * (h.padding || 5))), m = {}, n = this.labelMetrics(), o = h.style && h.style.textOverflow, p = 0;
				if (u(h.rotation) || (m.rotation = h.rotation || 0),
				l(f, function(a) {
					(a = g[a]) && a.labelLength > p && (p = a.labelLength)
				}),
				this.maxLabelLength = p,
				this.autoRotation)
					p > k && p > n.h ? m.rotation = this.labelRotation : this.labelRotation = 0;
				else if (j && (a = {
					width: k + "px"
				},
				!o))
					for (a.textOverflow = "clip",
					b = f.length; !i && b--; )
						c = f[b],
						(k = g[c].label) && (k.styles && "ellipsis" === k.styles.textOverflow ? k.css({
							textOverflow: "clip"
						}) : g[c].labelLength > j && k.css({
							width: j + "px"
						}),
						k.getBBox().height > this.len / f.length - (n.h - n.f) && (k.specCss = {
							textOverflow: "ellipsis"
						}));
				m.rotation && (a = {
					width: (p > .5 * d.chartHeight ? .33 * d.chartHeight : d.chartHeight) + "px"
				},
				o || (a.textOverflow = "ellipsis")),
				(this.labelAlign = h.align || this.autoLabelAlign(this.labelRotation)) && (m.align = this.labelAlign),
				l(f, function(b) {
					var c = (b = g[b]) && b.label;
					c && (c.attr(m),
					a && c.css(v(a, c.specCss)),
					delete c.specCss,
					b.rotation = m.rotation)
				}),
				this.tickRotCorr = e.rotCorr(n.b, this.labelRotation || 0, 0 !== this.side)
			},
			hasData: function() {
				return this.hasVisibleSeries || i(this.min) && i(this.max) && !!this.tickPositions
			},
			addTitle: function(a) {
				var b, c = this.chart.renderer, d = this.horiz, e = this.opposite, f = this.options.title;
				this.axisTitle || ((b = f.textAlign) || (b = (d ? {
					low: "left",
					middle: "center",
					high: "right"
				} : {
					low: e ? "right" : "left",
					middle: "center",
					high: e ? "left" : "right"
				})[f.align]),
				this.axisTitle = c.text(f.text, 0, 0, f.useHTML).attr({
					zIndex: 7,
					rotation: f.rotation || 0,
					align: b
				}).addClass("highcharts-axis-title").css(f.style).add(this.axisGroup),
				this.axisTitle.isNew = !0),
				f.style.width || this.isRadial || this.axisTitle.css({
					width: this.len
				}),
				this.axisTitle[a ? "show" : "hide"](!0)
			},
			generateTick: function(a) {
				var b = this.ticks;
				b[a] ? b[a].addLabel() : b[a] = new C(this,a)
			},
			getOffset: function() {
				var a, b, c, d = this, e = d.chart, f = e.renderer, g = d.options, h = d.tickPositions, j = d.ticks, k = d.horiz, m = d.side, n = e.inverted && !d.isZAxis ? [1, 0, 3, 2][m] : m, o = 0, p = 0, q = g.title, r = g.labels, s = 0, t = e.axisOffset, e = e.clipOffset, u = [-1, 1, 1, -1][m], v = g.className, w = d.axisParent, z = this.tickSize("tick");
				a = d.hasData(),
				d.showAxis = b = a || y(g.showEmpty, !0),
				d.staggerLines = d.horiz && r.staggerLines,
				d.axisGroup || (d.gridGroup = f.g("grid").attr({
					zIndex: g.gridZIndex || 1
				}).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (v || "")).add(w),
				d.axisGroup = f.g("axis").attr({
					zIndex: g.zIndex || 2
				}).addClass("highcharts-" + this.coll.toLowerCase() + " " + (v || "")).add(w),
				d.labelGroup = f.g("axis-labels").attr({
					zIndex: r.zIndex || 7
				}).addClass("highcharts-" + d.coll.toLowerCase() + "-labels " + (v || "")).add(w)),
				a || d.isLinked ? (l(h, function(a, b) {
					d.generateTick(a, b)
				}),
				d.renderUnsquish(),
				!1 === r.reserveSpace || 0 !== m && 2 !== m && {
					1: "left",
					3: "right"
				}[m] !== d.labelAlign && "center" !== d.labelAlign || l(h, function(a) {
					s = Math.max(j[a].getLabelSize(), s)
				}),
				d.staggerLines && (s *= d.staggerLines,
				d.labelOffset = s * (d.opposite ? -1 : 1))) : x(j, function(a, b) {
					a.destroy(),
					delete j[b]
				}),
				q && q.text && !1 !== q.enabled && (d.addTitle(b),
				b && !1 !== q.reserveSpace && (d.titleOffset = o = d.axisTitle.getBBox()[k ? "height" : "width"],
				c = q.offset,
				p = i(c) ? 0 : y(q.margin, k ? 5 : 10))),
				d.renderLine(),
				d.offset = u * y(g.offset, t[m]),
				d.tickRotCorr = d.tickRotCorr || {
					x: 0,
					y: 0
				},
				f = 0 === m ? -d.labelMetrics().h : 2 === m ? d.tickRotCorr.y : 0,
				p = Math.abs(s) + p,
				s && (p = p - f + u * (k ? y(r.y, d.tickRotCorr.y + 8 * u) : r.x)),
				d.axisTitleMargin = y(c, p),
				t[m] = Math.max(t[m], d.axisTitleMargin + o + u * d.offset, p, a && h.length && z ? z[0] + u * d.offset : 0),
				h = 2 * Math.floor(d.axisLine.strokeWidth() / 2),
				0 < g.offset && (h -= 2 * g.offset),
				e[n] = Math.max(e[n] || h, h)
			},
			getLinePath: function(a) {
				var b = this.chart
				  , c = this.opposite
				  , d = this.offset
				  , e = this.horiz
				  , f = this.left + (c ? this.width : 0) + d
				  , d = b.chartHeight - this.bottom - (c ? this.height : 0) + d;
				return c && (a *= -1),
				b.renderer.crispLine(["M", e ? this.left : f, e ? d : this.top, "L", e ? b.chartWidth - this.right : f, e ? d : b.chartHeight - this.bottom], a)
			},
			renderLine: function() {
				this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
				this.axisLine.attr({
					stroke: this.options.lineColor,
					"stroke-width": this.options.lineWidth,
					zIndex: 7
				}))
			},
			getTitlePosition: function() {
				var a = this.horiz
				  , b = this.left
				  , c = this.top
				  , d = this.len
				  , e = this.options.title
				  , f = a ? b : c
				  , g = this.opposite
				  , h = this.offset
				  , i = e.x || 0
				  , j = e.y || 0
				  , k = this.axisTitle
				  , l = this.chart.renderer.fontMetrics(e.style && e.style.fontSize, k)
				  , k = Math.max(k.getBBox(null, 0).height - l.h - 1, 0)
				  , d = {
					low: f + (a ? 0 : d),
					middle: f + d / 2,
					high: f + (a ? d : 0)
				}[e.align]
				  , b = (a ? c + this.height : b) + (a ? 1 : -1) * (g ? -1 : 1) * this.axisTitleMargin + [-k, k, l.f, -k][this.side];
				return {
					x: a ? d + i : b + (g ? this.width : 0) + h + i,
					y: a ? b + j - (g ? this.height : 0) + h : d + j
				}
			},
			renderMinorTick: function(a) {
				var b = this.chart.hasRendered && t(this.oldMin)
				  , c = this.minorTicks;
				c[a] || (c[a] = new C(this,a,"minor")),
				b && c[a].isNew && c[a].render(null, !0),
				c[a].render(null, !1, 1)
			},
			renderTick: function(a, b) {
				var c = this.isLinked
				  , d = this.ticks
				  , e = this.chart.hasRendered && t(this.oldMin);
				(!c || a >= this.min && a <= this.max) && (d[a] || (d[a] = new C(this,a)),
				e && d[a].isNew && d[a].render(b, !0, .1),
				d[a].render(b))
			},
			render: function() {
				var b, d, e = this, f = e.chart, g = e.options, h = e.isLog, i = e.lin2log, j = e.isLinked, k = e.tickPositions, m = e.axisTitle, n = e.ticks, o = e.minorTicks, p = e.alternateBands, q = g.stackLabels, r = g.alternateGridColor, s = e.tickmarkOffset, u = e.axisLine, v = e.showAxis, w = c(f.renderer.globalAnimation);
				e.labelEdge.length = 0,
				e.overlap = !1,
				l([n, o, p], function(a) {
					x(a, function(a) {
						a.isActive = !1
					})
				}),
				(e.hasData() || j) && (e.minorTickInterval && !e.categories && l(e.getMinorTickPositions(), function(a) {
					e.renderMinorTick(a)
				}),
				k.length && (l(k, function(a, b) {
					e.renderTick(a, b)
				}),
				s && (0 === e.min || e.single) && (n[-1] || (n[-1] = new C(e,-1,null,!0)),
				n[-1].render(-1))),
				r && l(k, function(c, g) {
					d = void 0 !== k[g + 1] ? k[g + 1] + s : e.max - s,
					0 == g % 2 && c < e.max && d <= e.max + (f.polar ? -s : s) && (p[c] || (p[c] = new a.PlotLineOrBand(e)),
					b = c + s,
					p[c].options = {
						from: h ? i(b) : b,
						to: h ? i(d) : d,
						color: r
					},
					p[c].render(),
					p[c].isActive = !0)
				}),
				e._addedPlotLB || (l((g.plotLines || []).concat(g.plotBands || []), function(a) {
					e.addPlotBandOrLine(a)
				}),
				e._addedPlotLB = !0)),
				l([n, o, p], function(a) {
					var b, c = [], d = w.duration;
					x(a, function(a, b) {
						a.isActive || (a.render(b, !1, 0),
						a.isActive = !1,
						c.push(b))
					}),
					B(function() {
						for (b = c.length; b--; )
							a[c[b]] && !a[c[b]].isActive && (a[c[b]].destroy(),
							delete a[c[b]])
					}, a !== p && f.hasRendered && d ? d : 0)
				}),
				u && (u[u.isPlaced ? "animate" : "attr"]({
					d: this.getLinePath(u.strokeWidth())
				}),
				u.isPlaced = !0,
				u[v ? "show" : "hide"](!0)),
				m && v && (g = e.getTitlePosition(),
				t(g.y) ? (m[m.isNew ? "attr" : "animate"](g),
				m.isNew = !1) : (m.attr("y", -9999),
				m.isNew = !0)),
				q && q.enabled && e.renderStackTotals(),
				e.isDirty = !1
			},
			redraw: function() {
				this.visible && (this.render(),
				l(this.plotLinesAndBands, function(a) {
					a.render()
				})),
				l(this.series, function(a) {
					a.isDirty = !0
				})
			},
			keepProps: "extKey hcEvents names series userMax userMin".split(" "),
			destroy: function(a) {
				var b, c = this, d = c.stacks, e = c.plotLinesAndBands;
				if (a || z(c),
				x(d, function(a, b) {
					k(a),
					d[b] = null
				}),
				l([c.ticks, c.minorTicks, c.alternateBands], function(a) {
					k(a)
				}),
				e)
					for (a = e.length; a--; )
						e[a].destroy();
				l("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function(a) {
					c[a] && (c[a] = c[a].destroy())
				});
				for (b in c.plotLinesAndBandsGroups)
					c.plotLinesAndBandsGroups[b] = c.plotLinesAndBandsGroups[b].destroy();
				x(c, function(a, b) {
					-1 === r(b, c.keepProps) && delete c[b]
				})
			},
			drawCrosshair: function(a, b) {
				var c, d, e = this.crosshair, g = y(e.snap, !0), h = this.cross;
				a || (a = this.cross && this.cross.e),
				this.crosshair && !1 !== (i(b) || !g) ? (g ? i(b) && (d = this.isXAxis ? b.plotX : this.len - b.plotY) : d = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos),
				i(d) && (c = this.getPlotLinePath(b && (this.isXAxis ? b.x : y(b.stackY, b.y)), null, null, null, d) || null),
				i(c) ? (b = this.categories && !this.isRadial,
				h || (this.cross = h = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category " : "thin ") + e.className).attr({
					zIndex: y(e.zIndex, 2)
				}).add(),
				h.attr({
					stroke: e.color || (b ? f("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
					"stroke-width": y(e.width, 1)
				}),
				e.dashStyle && h.attr({
					dashstyle: e.dashStyle
				})),
				h.show().attr({
					d: c
				}),
				b && !e.width && h.attr({
					"stroke-width": this.transA
				}),
				this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
			},
			hideCrosshair: function() {
				this.cross && this.cross.hide()
			}
		}),
		a.Axis = D
	}(a);
	return function(a) {
		var b = a.Axis
		  , c = a.Date
		  , d = a.dateFormat
		  , e = a.defaultOptions
		  , f = a.defined
		  , g = a.each
		  , h = a.extend
		  , i = a.getMagnitude
		  , j = a.getTZOffset
		  , k = a.normalizeTickInterval
		  , l = a.pick
		  , m = a.timeUnits;
		b.prototype.getTimeTicks = function(a, b, i, k) {
			var n, o, p, q = [], r = {}, s = e.global.useUTC, t = new c(b - Math.max(j(b), j(i))), u = c.hcMakeTime, v = a.unitRange, w = a.count;
			if (f(b)) {
				t[c.hcSetMilliseconds](v >= m.second ? 0 : w * Math.floor(t.getMilliseconds() / w)),
				v >= m.second && t[c.hcSetSeconds](v >= m.minute ? 0 : w * Math.floor(t.getSeconds() / w)),
				v >= m.minute && t[c.hcSetMinutes](v >= m.hour ? 0 : w * Math.floor(t[c.hcGetMinutes]() / w)),
				v >= m.hour && t[c.hcSetHours](v >= m.day ? 0 : w * Math.floor(t[c.hcGetHours]() / w)),
				v >= m.day && t[c.hcSetDate](v >= m.month ? 1 : w * Math.floor(t[c.hcGetDate]() / w)),
				v >= m.month && (t[c.hcSetMonth](v >= m.year ? 0 : w * Math.floor(t[c.hcGetMonth]() / w)),
				n = t[c.hcGetFullYear]()),
				v >= m.year && t[c.hcSetFullYear](n - n % w),
				v === m.week && t[c.hcSetDate](t[c.hcGetDate]() - t[c.hcGetDay]() + l(k, 1)),
				n = t[c.hcGetFullYear](),
				k = t[c.hcGetMonth]();
				var x = t[c.hcGetDate]()
				  , y = t[c.hcGetHours]();
				for ((c.hcTimezoneOffset || c.hcGetTimezoneOffset) && (p = (!s || !!c.hcGetTimezoneOffset) && (i - b > 4 * m.month || j(b) !== j(i)),
				t = t.getTime(),
				o = j(t),
				t = new c(t + o)),
				s = t.getTime(),
				b = 1; s < i; )
					q.push(s),
					s = v === m.year ? u(n + b * w, 0) : v === m.month ? u(n, k + b * w) : !p || v !== m.day && v !== m.week ? p && v === m.hour ? u(n, k, x, y + b * w, 0, 0, o) - o : s + v * w : u(n, k, x + b * w * (v === m.day ? 1 : 7)),
					b++;
				q.push(s),
				v <= m.hour && 1e4 > q.length && g(q, function(a) {
					0 == a % 18e5 && "000000000" === d("%H%M%S%L", a) && (r[a] = "day")
				})
			}
			return q.info = h(a, {
				higherRanks: r,
				totalRange: v * w
			}),
			q
		}
		,
		b.prototype.normalizeTimeTickInterval = function(a, b) {
			var c = b || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];
			b = c[c.length - 1];
			var d, e = m[b[0]], f = b[1];
			for (d = 0; d < c.length && (b = c[d],
			e = m[b[0]],
			f = b[1],
			!(c[d + 1] && a <= (e * f[f.length - 1] + m[c[d + 1][0]]) / 2)); d++)
				;
			return e === m.year && a < 5 * e && (f = [1, 2, 5]),
			a = k(a / e, f, "year" === b[0] ? Math.max(i(a / e), 1) : 1),
			{
				unitRange: e,
				count: a,
				unitName: b[0]
			}
		}
	}(a),
	function(a) {
		var b = a.Axis
		  , c = a.getMagnitude
		  , d = a.map
		  , e = a.normalizeTickInterval
		  , f = a.pick;
		b.prototype.getLogTickPositions = function(a, b, g, h) {
			var i = this.options
			  , j = this.len
			  , k = this.lin2log
			  , l = this.log2lin
			  , m = [];
			if (h || (this._minorAutoInterval = null),
			.5 <= a)
				a = Math.round(a),
				m = this.getLinearTickPositions(a, b, g);
			else if (.08 <= a)
				for (var n, o, p, q, r, j = Math.floor(b), i = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; j < g + 1 && !r; j++)
					for (o = i.length,
					n = 0; n < o && !r; n++)
						p = l(k(j) * i[n]),
						p > b && (!h || q <= g) && void 0 !== q && m.push(q),
						q > g && (r = !0),
						q = p;
			else
				b = k(b),
				g = k(g),
				a = i[h ? "minorTickInterval" : "tickInterval"],
				a = f("auto" === a ? null : a, this._minorAutoInterval, i.tickPixelInterval / (h ? 5 : 1) * (g - b) / ((h ? j / this.tickPositions.length : j) || 1)),
				a = e(a, null, c(a)),
				m = d(this.getLinearTickPositions(a, b, g), l),
				h || (this._minorAutoInterval = a / 5);
			return h || (this.tickInterval = a),
			m
		}
		,
		b.prototype.log2lin = function(a) {
			return Math.log(a) / Math.LN10
		}
		,
		b.prototype.lin2log = function(a) {
			return Math.pow(10, a)
		}
	}(a),
	function(a, b) {
		var c = a.arrayMax
		  , d = a.arrayMin
		  , e = a.defined
		  , f = a.destroyObjectProperties
		  , g = a.each
		  , h = a.erase
		  , i = a.merge
		  , j = a.pick;
		a.PlotLineOrBand = function(a, b) {
			this.axis = a,
			b && (this.options = b,
			this.id = b.id)
		}
		,
		a.PlotLineOrBand.prototype = {
			render: function() {
				var b = this
				  , c = b.axis
				  , d = c.horiz
				  , f = b.options
				  , g = f.label
				  , h = b.label
				  , k = f.to
				  , l = f.from
				  , m = f.value
				  , n = e(l) && e(k)
				  , o = e(m)
				  , p = b.svgElem
				  , q = !p
				  , r = []
				  , s = f.color
				  , t = j(f.zIndex, 0)
				  , u = f.events
				  , r = {
					class: "highcharts-plot-" + (n ? "band " : "line ") + (f.className || "")
				}
				  , v = {}
				  , w = c.chart.renderer
				  , x = n ? "bands" : "lines"
				  , y = c.log2lin;
				if (c.isLog && (l = y(l),
				k = y(k),
				m = y(m)),
				o ? (r = {
					stroke: s,
					"stroke-width": f.width
				},
				f.dashStyle && (r.dashstyle = f.dashStyle)) : n && (s && (r.fill = s),
				f.borderWidth && (r.stroke = f.borderColor,
				r["stroke-width"] = f.borderWidth)),
				v.zIndex = t,
				x += "-" + t,
				(s = c.plotLinesAndBandsGroups[x]) || (c.plotLinesAndBandsGroups[x] = s = w.g("plot-" + x).attr(v).add()),
				q && (b.svgElem = p = w.path().attr(r).add(s)),
				o)
					r = c.getPlotLinePath(m, p.strokeWidth());
				else {
					if (!n)
						return;
					r = c.getPlotBandPath(l, k, f)
				}
				return q && r && r.length ? (p.attr({
					d: r
				}),
				u && a.objectEach(u, function(a, c) {
					p.on(c, function(a) {
						u[c].apply(b, [a])
					})
				})) : p && (r ? (p.show(),
				p.animate({
					d: r
				})) : (p.hide(),
				h && (b.label = h = h.destroy()))),
				g && e(g.text) && r && r.length && 0 < c.width && 0 < c.height && !r.flat ? (g = i({
					align: d && n && "center",
					x: d ? !n && 4 : 10,
					verticalAlign: !d && n && "middle",
					y: d ? n ? 16 : 10 : n ? 6 : -4,
					rotation: d && !n && 90
				}, g),
				this.renderLabel(g, r, n, t)) : h && h.hide(),
				b
			},
			renderLabel: function(a, b, e, f) {
				var g = this.label
				  , h = this.axis.chart.renderer;
				g || (g = {
					align: a.textAlign || a.align,
					rotation: a.rotation,
					class: "highcharts-plot-" + (e ? "band" : "line") + "-label " + (a.className || "")
				},
				g.zIndex = f,
				this.label = g = h.text(a.text, 0, 0, a.useHTML).attr(g).add(),
				g.css(a.style)),
				f = [b[1], b[4], e ? b[6] : b[1]],
				b = [b[2], b[5], e ? b[7] : b[2]],
				e = d(f),
				h = d(b),
				g.align(a, !1, {
					x: e,
					y: h,
					width: c(f) - e,
					height: c(b) - h
				}),
				g.show()
			},
			destroy: function() {
				h(this.axis.plotLinesAndBands, this),
				delete this.axis,
				f(this)
			}
		},
		a.extend(b.prototype, {
			getPlotBandPath: function(a, b) {
				var c = this.getPlotLinePath(b, null, null, !0)
				  , d = this.getPlotLinePath(a, null, null, !0)
				  , e = this.horiz
				  , f = 1;
				return a = a < this.min && b < this.min || a > this.max && b > this.max,
				d && c ? (a && (d.flat = d.toString() === c.toString(),
				f = 0),
				d.push(e && c[4] === d[4] ? c[4] + f : c[4], e || c[5] !== d[5] ? c[5] : c[5] + f, e && c[1] === d[1] ? c[1] + f : c[1], e || c[2] !== d[2] ? c[2] : c[2] + f)) : d = null,
				d
			},
			addPlotBand: function(a) {
				return this.addPlotBandOrLine(a, "plotBands")
			},
			addPlotLine: function(a) {
				return this.addPlotBandOrLine(a, "plotLines")
			},
			addPlotBandOrLine: function(b, c) {
				var d = new a.PlotLineOrBand(this,b).render()
				  , e = this.userOptions;
				return d && (c && (e[c] = e[c] || [],
				e[c].push(b)),
				this.plotLinesAndBands.push(d)),
				d
			},
			removePlotBandOrLine: function(a) {
				for (var b = this.plotLinesAndBands, c = this.options, d = this.userOptions, e = b.length; e--; )
					b[e].id === a && b[e].destroy();
				g([c.plotLines || [], d.plotLines || [], c.plotBands || [], d.plotBands || []], function(b) {
					for (e = b.length; e--; )
						b[e].id === a && h(b, b[e])
				})
			},
			removePlotBand: function(a) {
				this.removePlotBandOrLine(a)
			},
			removePlotLine: function(a) {
				this.removePlotBandOrLine(a)
			}
		})
	}(a, b),
	function(a) {
		var b = a.dateFormat
		  , c = a.each
		  , d = a.extend
		  , e = a.format
		  , f = a.isNumber
		  , g = a.map
		  , h = a.merge
		  , i = a.pick
		  , j = a.splat
		  , k = a.syncTimeout
		  , l = a.timeUnits;
		a.Tooltip = function() {
			this.init.apply(this, arguments)
		}
		,
		a.Tooltip.prototype = {
			init: function(a, b) {
				this.chart = a,
				this.options = b,
				this.crosshairs = [],
				this.now = {
					x: 0,
					y: 0
				},
				this.isHidden = !0,
				this.split = b.split && !a.inverted,
				this.shared = b.shared || this.split
			},
			cleanSplit: function(a) {
				c(this.chart.series, function(b) {
					var c = b && b.tt;
					c && (!c.isActive || a ? b.tt = c.destroy() : c.isActive = !1)
				})
			},
			getLabel: function() {
				var a = this.chart.renderer
				  , b = this.options;
				return this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, b.shape || "callout", null, null, b.useHTML, null, "tooltip").attr({
					padding: b.padding,
					r: b.borderRadius
				}),
				this.label.attr({
					fill: b.backgroundColor,
					"stroke-width": b.borderWidth
				}).css(b.style).shadow(b.shadow)),
				this.label.attr({
					zIndex: 8
				}).add()),
				this.label
			},
			update: function(a) {
				this.destroy(),
				h(!0, this.chart.options.tooltip.userOptions, a),
				this.init(this.chart, h(!0, this.options, a))
			},
			destroy: function() {
				this.label && (this.label = this.label.destroy()),
				this.split && this.tt && (this.cleanSplit(this.chart, !0),
				this.tt = this.tt.destroy()),
				clearTimeout(this.hideTimer),
				clearTimeout(this.tooltipTimeout)
			},
			move: function(a, b, c, e) {
				var f = this
				  , g = f.now
				  , h = !1 !== f.options.animation && !f.isHidden && (1 < Math.abs(a - g.x) || 1 < Math.abs(b - g.y))
				  , i = f.followPointer || 1 < f.len;
				d(g, {
					x: h ? (2 * g.x + a) / 3 : a,
					y: h ? (g.y + b) / 2 : b,
					anchorX: i ? void 0 : h ? (2 * g.anchorX + c) / 3 : c,
					anchorY: i ? void 0 : h ? (g.anchorY + e) / 2 : e
				}),
				f.getLabel().attr(g),
				h && (clearTimeout(this.tooltipTimeout),
				this.tooltipTimeout = setTimeout(function() {
					f && f.move(a, b, c, e)
				}, 32))
			},
			hide: function(a) {
				var b = this;
				clearTimeout(this.hideTimer),
				a = i(a, this.options.hideDelay, 500),
				this.isHidden || (this.hideTimer = k(function() {
					b.getLabel()[a ? "fadeOut" : "hide"](),
					b.isHidden = !0
				}, a))
			},
			getAnchor: function(a, b) {
				var d, e, f, h = this.chart, i = h.inverted, k = h.plotTop, l = h.plotLeft, m = 0, n = 0;
				return a = j(a),
				d = a[0].tooltipPos,
				this.followPointer && b && (void 0 === b.chartX && (b = h.pointer.normalize(b)),
				d = [b.chartX - h.plotLeft, b.chartY - k]),
				d || (c(a, function(a) {
					e = a.series.yAxis,
					f = a.series.xAxis,
					m += a.plotX + (!i && f ? f.left - l : 0),
					n += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!i && e ? e.top - k : 0)
				}),
				m /= a.length,
				n /= a.length,
				d = [i ? h.plotWidth - n : m, this.shared && !i && 1 < a.length && b ? b.chartY - k : i ? h.plotHeight - m : n]),
				g(d, Math.round)
			},
			getPosition: function(a, b, c) {
				var d, e = this.chart, f = this.distance, g = {}, h = c.h || 0, j = ["y", e.chartHeight, b, c.plotY + e.plotTop, e.plotTop, e.plotTop + e.plotHeight], k = ["x", e.chartWidth, a, c.plotX + e.plotLeft, e.plotLeft, e.plotLeft + e.plotWidth], l = !this.followPointer && i(c.ttBelow, !e.inverted == !!c.negative), m = function(a, b, c, d, e, i) {
					var j = c < d - f
					  , k = d + f + c < b
					  , m = d - f - c;
					if (d += f,
					l && k)
						g[a] = d;
					else if (!l && j)
						g[a] = m;
					else if (j)
						g[a] = Math.min(i - c, 0 > m - h ? m : m - h);
					else {
						if (!k)
							return !1;
						g[a] = Math.max(e, d + h + c > b ? d : d + h)
					}
				}, n = function(a, b, c, d) {
					var e;
					return d < f || d > b - f ? e = !1 : g[a] = d < c / 2 ? 1 : d > b - c / 2 ? b - c - 2 : d - c / 2,
					e
				}, o = function(a) {
					var b = j;
					j = k,
					k = b,
					d = a
				}, p = function() {
					!1 !== m.apply(0, j) ? !1 !== n.apply(0, k) || d || (o(!0),
					p()) : d ? g.x = g.y = 0 : (o(!0),
					p())
				};
				return (e.inverted || 1 < this.len) && o(),
				p(),
				g
			},
			defaultFormatter: function(a) {
				var b, c = this.points || j(this);
				return b = [a.tooltipFooterHeaderFormatter(c[0])],
				b = b.concat(a.bodyFormatter(c)),
				b.push(a.tooltipFooterHeaderFormatter(c[0], !0)),
				b
			},
			refresh: function(a, b) {
				var d, e, f, g = this.options, h = a, k = {}, l = [];
				d = g.formatter || this.defaultFormatter;
				var m, k = this.shared;
				g.enabled && (clearTimeout(this.hideTimer),
				this.followPointer = j(h)[0].series.tooltipOptions.followPointer,
				f = this.getAnchor(h, b),
				b = f[0],
				e = f[1],
				!k || h.series && h.series.noSharedTooltip ? k = h.getLabelConfig() : (c(h, function(a) {
					a.setState("hover"),
					l.push(a.getLabelConfig())
				}),
				k = {
					x: h[0].category,
					y: h[0].y
				},
				k.points = l,
				h = h[0]),
				this.len = l.length,
				k = d.call(k, this),
				m = h.series,
				this.distance = i(m.tooltipOptions.distance, 16),
				!1 === k ? this.hide() : (d = this.getLabel(),
				this.isHidden && d.attr({
					opacity: 1
				}).show(),
				this.split ? this.renderSplit(k, a) : (g.style.width || d.css({
					width: this.chart.spacingBox.width
				}),
				d.attr({
					text: k && k.join ? k.join("") : k
				}),
				d.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + i(h.colorIndex, m.colorIndex)),
				d.attr({
					stroke: g.borderColor || h.color || m.color || "#666666"
				}),
				this.updatePosition({
					plotX: b,
					plotY: e,
					negative: h.negative,
					ttBelow: h.ttBelow,
					h: f[2] || 0
				})),
				this.isHidden = !1))
			},
			renderSplit: function(b, d) {
				var e = this
				  , f = []
				  , g = this.chart
				  , h = g.renderer
				  , j = !0
				  , k = this.options
				  , l = 0
				  , m = this.getLabel();
				c(b.slice(0, d.length + 1), function(a, b) {
					if (!1 !== a) {
						b = d[b - 1] || {
							isHeader: !0,
							plotX: d[0].plotX
						};
						var c = b.series || e
						  , n = c.tt
						  , o = b.series || {}
						  , p = "highcharts-color-" + i(b.colorIndex, o.colorIndex, "none");
						n || (c.tt = n = h.label(null, null, null, "callout").addClass("highcharts-tooltip-box " + p).attr({
							padding: k.padding,
							r: k.borderRadius,
							fill: k.backgroundColor,
							stroke: k.borderColor || b.color || o.color || "#333333",
							"stroke-width": k.borderWidth
						}).add(m)),
						n.isActive = !0,
						n.attr({
							text: a
						}),
						n.css(k.style).shadow(k.shadow),
						a = n.getBBox(),
						o = a.width + n.strokeWidth(),
						b.isHeader ? (l = a.height,
						o = Math.max(0, Math.min(b.plotX + g.plotLeft - o / 2, g.chartWidth - o))) : o = b.plotX + g.plotLeft - i(k.distance, 16) - o,
						0 > o && (j = !1),
						a = (b.series && b.series.yAxis && b.series.yAxis.pos) + (b.plotY || 0),
						a -= g.plotTop,
						f.push({
							target: b.isHeader ? g.plotHeight + l : a,
							rank: b.isHeader ? 1 : 0,
							size: c.tt.getBBox().height + 1,
							point: b,
							x: o,
							tt: n
						})
					}
				}),
				this.cleanSplit(),
				a.distribute(f, g.plotHeight + l),
				c(f, function(a) {
					var b = a.point
					  , c = b.series;
					a.tt.attr({
						visibility: void 0 === a.pos ? "hidden" : "inherit",
						x: j || b.isHeader ? a.x : b.plotX + g.plotLeft + i(k.distance, 16),
						y: a.pos + g.plotTop,
						anchorX: b.isHeader ? b.plotX + g.plotLeft : b.plotX + c.xAxis.pos,
						anchorY: b.isHeader ? a.pos + g.plotTop - 15 : b.plotY + c.yAxis.pos
					})
				})
			},
			updatePosition: function(a) {
				var b = this.chart
				  , c = this.getLabel()
				  , c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a);
				this.move(Math.round(c.x), Math.round(c.y || 0), a.plotX + b.plotLeft, a.plotY + b.plotTop)
			},
			getDateFormat: function(a, c, d, e) {
				var f, g, h = b("%m-%d %H:%M:%S.%L", c), i = {
					millisecond: 15,
					second: 12,
					minute: 9,
					hour: 6,
					day: 3
				}, j = "millisecond";
				for (g in l) {
					if (a === l.week && +b("%w", c) === d && "00:00:00.000" === h.substr(6)) {
						g = "week";
						break
					}
					if (l[g] > a) {
						g = j;
						break
					}
					if (i[g] && h.substr(i[g]) !== "01-01 00:00:00.000".substr(i[g]))
						break;
					"week" !== g && (j = g)
				}
				return g && (f = e[g]),
				f
			},
			getXDateFormat: function(a, b, c) {
				b = b.dateTimeLabelFormats;
				var d = c && c.closestPointRange;
				return (d ? this.getDateFormat(d, a.x, c.options.startOfWeek, b) : b.day) || b.year
			},
			tooltipFooterHeaderFormatter: function(a, b) {
				var c = b ? "footer" : "header";
				b = a.series;
				var d = b.tooltipOptions
				  , g = d.xDateFormat
				  , h = b.xAxis
				  , i = h && "datetime" === h.options.type && f(a.key)
				  , c = d[c + "Format"];
				return i && !g && (g = this.getXDateFormat(a, d, h)),
				i && g && (c = c.replace("{point.key}", "{point.key:" + g + "}")),
				e(c, {
					point: a,
					series: b
				})
			},
			bodyFormatter: function(a) {
				return g(a, function(a) {
					var b = a.series.tooltipOptions;
					return (b.pointFormatter || a.point.tooltipFormatter).call(a.point, b.pointFormat)
				})
			}
		}
	}(a),
	function(a) {
		var b = a.addEvent
		  , c = a.attr
		  , d = a.charts
		  , e = a.color
		  , f = a.css
		  , g = a.defined
		  , h = a.each
		  , i = a.extend
		  , j = a.find
		  , k = a.fireEvent
		  , l = a.isObject
		  , m = a.offset
		  , n = a.pick
		  , o = a.removeEvent
		  , p = a.splat
		  , q = a.Tooltip
		  , r = a.win;
		a.Pointer = function(a, b) {
			this.init(a, b)
		}
		,
		a.Pointer.prototype = {
			init: function(a, b) {
				this.options = b,
				this.chart = a,
				this.runChartClick = b.chart.events && !!b.chart.events.click,
				this.pinchDown = [],
				this.lastValidTouch = {},
				q && (a.tooltip = new q(a,b.tooltip),
				this.followTouchMove = n(b.tooltip.followTouchMove, !0)),
				this.setDOMEvents()
			},
			zoomOption: function(a) {
				var b = this.chart
				  , c = b.options.chart
				  , d = c.zoomType || ""
				  , b = b.inverted;
				/touch/.test(a.type) && (d = n(c.pinchType, d)),
				this.zoomX = a = /x/.test(d),
				this.zoomY = d = /y/.test(d),
				this.zoomHor = a && !b || d && b,
				this.zoomVert = d && !b || a && b,
				this.hasZoom = a || d
			},
			normalize: function(a, b) {
				var c, d;
				return a = a || r.event,
				a.target || (a.target = a.srcElement),
				d = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a,
				b || (this.chartPosition = b = m(this.chart.container)),
				void 0 === d.pageX ? (c = Math.max(a.x, a.clientX - b.left),
				b = a.y) : (c = d.pageX - b.left,
				b = d.pageY - b.top),
				i(a, {
					chartX: Math.round(c),
					chartY: Math.round(b)
				})
			},
			getCoordinates: function(a) {
				var b = {
					xAxis: [],
					yAxis: []
				};
				return h(this.chart.axes, function(c) {
					b[c.isXAxis ? "xAxis" : "yAxis"].push({
						axis: c,
						value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
					})
				}),
				b
			},
			findNearestKDPoint: function(a, b, c) {
				var d;
				return h(a, function(a) {
					var e = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y");
					if (a = a.searchPoint(c, e),
					(e = l(a, !0)) && !(e = !l(d, !0)))
						var e = d.distX - a.distX
						  , f = d.dist - a.dist
						  , g = (a.series.group && a.series.group.zIndex) - (d.series.group && d.series.group.zIndex)
						  , e = 0 < (0 !== e && b ? e : 0 !== f ? f : 0 !== g ? g : d.series.index > a.series.index ? -1 : 1);
					e && (d = a)
				}),
				d
			},
			getPointFromEvent: function(a) {
				a = a.target;
				for (var b; a && !b; )
					b = a.point,
					a = a.parentNode;
				return b
			},
			getChartCoordinatesFromPoint: function(a, b) {
				var c = a.series
				  , d = c.xAxis
				  , c = c.yAxis;
				if (d && c)
					return b ? {
						chartX: d.len + d.pos - a.clientX,
						chartY: c.len + c.pos - a.plotY
					} : {
						chartX: a.clientX + d.pos,
						chartY: a.plotY + c.pos
					}
			},
			getHoverData: function(b, c, d, e, f, g) {
				var i, k = [];
				e = !(!e || !b);
				var m = c && !c.stickyTracking ? [c] : a.grep(d, function(a) {
					return a.visible && !(!f && a.directTouch) && n(a.options.enableMouseTracking, !0) && a.stickyTracking
				});
				return c = (i = e ? b : this.findNearestKDPoint(m, f, g)) && i.series,
				i && (f && !c.noSharedTooltip ? (m = a.grep(d, function(a) {
					return a.visible && !(!f && a.directTouch) && n(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
				}),
				h(m, function(a) {
					a = j(a.points, function(a) {
						return a.x === i.x
					}),
					l(a) && !a.isNull && k.push(a)
				})) : k.push(i)),
				{
					hoverPoint: i,
					hoverSeries: c,
					hoverPoints: k
				}
			},
			runPointActions: function(c, e) {
				var f, g = this.chart, i = g.tooltip, j = !!i && i.shared, k = e || g.hoverPoint, l = k && k.series || g.hoverSeries, l = this.getHoverData(k, l, g.series, !!e || l && l.directTouch && this.isDirectTouch, j, c), k = l.hoverPoint;
				f = l.hoverPoints,
				e = (l = l.hoverSeries) && l.tooltipOptions.followPointer,
				j = j && l && !l.noSharedTooltip,
				k && (k !== g.hoverPoint || i && i.isHidden) ? (h(g.hoverPoints || [], function(b) {
					-1 === a.inArray(b, f) && b.setState()
				}),
				h(f || [], function(a) {
					a.setState("hover")
				}),
				g.hoverSeries !== l && l.onMouseOver(),
				g.hoverPoint && g.hoverPoint.firePointEvent("mouseOut"),
				k.firePointEvent("mouseOver"),
				g.hoverPoints = f,
				g.hoverPoint = k,
				i && i.refresh(j ? f : k, c)) : e && i && !i.isHidden && (k = i.getAnchor([{}], c),
				i.updatePosition({
					plotX: k[0],
					plotY: k[1]
				})),
				this.unDocMouseMove || (this.unDocMouseMove = b(g.container.ownerDocument, "mousemove", function(b) {
					var c = d[a.hoverChartIndex];
					c && c.pointer.onDocumentMouseMove(b)
				})),
				h(g.axes, function(b) {
					var d = n(b.crosshair.snap, !0)
					  , e = d ? a.find(f, function(a) {
						return a.series[b.coll] === b
					}) : void 0;
					e || !d ? b.drawCrosshair(c, e) : b.hideCrosshair()
				})
			},
			reset: function(a, b) {
				var c = this.chart
				  , d = c.hoverSeries
				  , e = c.hoverPoint
				  , f = c.hoverPoints
				  , g = c.tooltip
				  , i = g && g.shared ? f : e;
				a && i && h(p(i), function(b) {
					b.series.isCartesian && void 0 === b.plotX && (a = !1)
				}),
				a ? g && i && (g.refresh(i),
				e && (e.setState(e.state, !0),
				h(c.axes, function(a) {
					a.crosshair && a.drawCrosshair(null, e)
				}))) : (e && e.onMouseOut(),
				f && h(f, function(a) {
					a.setState()
				}),
				d && d.onMouseOut(),
				g && g.hide(b),
				this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove()),
				h(c.axes, function(a) {
					a.hideCrosshair()
				}),
				this.hoverX = c.hoverPoints = c.hoverPoint = null)
			},
			scaleGroups: function(a, b) {
				var c, d = this.chart;
				h(d.series, function(e) {
					c = a || e.getPlotBox(),
					e.xAxis && e.xAxis.zoomEnabled && e.group && (e.group.attr(c),
					e.markerGroup && (e.markerGroup.attr(c),
					e.markerGroup.clip(b ? d.clipRect : null)),
					e.dataLabelsGroup && e.dataLabelsGroup.attr(c))
				}),
				d.clipRect.attr(b || d.clipBox)
			},
			dragStart: function(a) {
				var b = this.chart;
				b.mouseIsDown = a.type,
				b.cancelClick = !1,
				b.mouseDownX = this.mouseDownX = a.chartX,
				b.mouseDownY = this.mouseDownY = a.chartY
			},
			drag: function(a) {
				var b, c = this.chart, d = c.options.chart, f = a.chartX, g = a.chartY, h = this.zoomHor, i = this.zoomVert, j = c.plotLeft, k = c.plotTop, l = c.plotWidth, m = c.plotHeight, n = this.selectionMarker, o = this.mouseDownX, p = this.mouseDownY, q = d.panKey && a[d.panKey + "Key"];
				n && n.touch || (f < j ? f = j : f > j + l && (f = j + l),
				g < k ? g = k : g > k + m && (g = k + m),
				this.hasDragged = Math.sqrt(Math.pow(o - f, 2) + Math.pow(p - g, 2)),
				10 < this.hasDragged && (b = c.isInsidePlot(o - j, p - k),
				c.hasCartesianSeries && (this.zoomX || this.zoomY) && b && !q && !n && (this.selectionMarker = n = c.renderer.rect(j, k, h ? 1 : l, i ? 1 : m, 0).attr({
					fill: d.selectionMarkerFill || e("#335cad").setOpacity(.25).get(),
					class: "highcharts-selection-marker",
					zIndex: 7
				}).add()),
				n && h && (f -= o,
				n.attr({
					width: Math.abs(f),
					x: (0 < f ? 0 : f) + o
				})),
				n && i && (f = g - p,
				n.attr({
					height: Math.abs(f),
					y: (0 < f ? 0 : f) + p
				})),
				b && !n && d.panning && c.pan(a, d.panning)))
			},
			drop: function(a) {
				var b = this
				  , c = this.chart
				  , d = this.hasPinched;
				if (this.selectionMarker) {
					var e, j = {
						originalEvent: a,
						xAxis: [],
						yAxis: []
					}, l = this.selectionMarker, m = l.attr ? l.attr("x") : l.x, n = l.attr ? l.attr("y") : l.y, o = l.attr ? l.attr("width") : l.width, p = l.attr ? l.attr("height") : l.height;
					(this.hasDragged || d) && (h(c.axes, function(c) {
						if (c.zoomEnabled && g(c.min) && (d || b[{
							xAxis: "zoomX",
							yAxis: "zoomY"
						}[c.coll]])) {
							var f = c.horiz
							  , h = "touchend" === a.type ? c.minPixelPadding : 0
							  , i = c.toValue((f ? m : n) + h)
							  , f = c.toValue((f ? m + o : n + p) - h);
							j[c.coll].push({
								axis: c,
								min: Math.min(i, f),
								max: Math.max(i, f)
							}),
							e = !0
						}
					}),
					e && k(c, "selection", j, function(a) {
						c.zoom(i(a, d ? {
							animation: !1
						} : null))
					})),
					this.selectionMarker = this.selectionMarker.destroy(),
					d && this.scaleGroups()
				}
				c && (f(c.container, {
					cursor: c._cursor
				}),
				c.cancelClick = 10 < this.hasDragged,
				c.mouseIsDown = this.hasDragged = this.hasPinched = !1,
				this.pinchDown = [])
			},
			onContainerMouseDown: function(a) {
				a = this.normalize(a),
				this.zoomOption(a),
				a.preventDefault && a.preventDefault(),
				this.dragStart(a)
			},
			onDocumentMouseUp: function(b) {
				d[a.hoverChartIndex] && d[a.hoverChartIndex].pointer.drop(b)
			},
			onDocumentMouseMove: function(a) {
				var b = this.chart
				  , c = this.chartPosition;
				a = this.normalize(a, c),
				!c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
			},
			onContainerMouseLeave: function(b) {
				var c = d[a.hoverChartIndex];
				c && (b.relatedTarget || b.toElement) && (c.pointer.reset(),
				c.pointer.chartPosition = null)
			},
			onContainerMouseMove: function(b) {
				var c = this.chart;
				g(a.hoverChartIndex) && d[a.hoverChartIndex] && d[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index),
				b = this.normalize(b),
				b.returnValue = !1,
				"mousedown" === c.mouseIsDown && this.drag(b),
				!this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b)
			},
			inClass: function(a, b) {
				for (var d; a; ) {
					if (d = c(a, "class")) {
						if (-1 !== d.indexOf(b))
							return !0;
						if (-1 !== d.indexOf("highcharts-container"))
							return !1
					}
					a = a.parentNode
				}
			},
			onTrackerMouseOut: function(a) {
				var b = this.chart.hoverSeries;
				a = a.relatedTarget || a.toElement,
				this.isDirectTouch = !1,
				!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker") || b.onMouseOut()
			},
			onContainerClick: function(a) {
				var b = this.chart
				  , c = b.hoverPoint
				  , d = b.plotLeft
				  , e = b.plotTop;
				a = this.normalize(a),
				b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (k(c.series, "click", i(a, {
					point: c
				})),
				b.hoverPoint && c.firePointEvent("click", a)) : (i(a, this.getCoordinates(a)),
				b.isInsidePlot(a.chartX - d, a.chartY - e) && k(b, "click", a)))
			},
			setDOMEvents: function() {
				var c = this
				  , d = c.chart.container
				  , e = d.ownerDocument;
				d.onmousedown = function(a) {
					c.onContainerMouseDown(a)
				}
				,
				d.onmousemove = function(a) {
					c.onContainerMouseMove(a)
				}
				,
				d.onclick = function(a) {
					c.onContainerClick(a)
				}
				,
				b(d, "mouseleave", c.onContainerMouseLeave),
				1 === a.chartCount && b(e, "mouseup", c.onDocumentMouseUp),
				a.hasTouch && (d.ontouchstart = function(a) {
					c.onContainerTouchStart(a)
				}
				,
				d.ontouchmove = function(a) {
					c.onContainerTouchMove(a)
				}
				,
				1 === a.chartCount && b(e, "touchend", c.onDocumentTouchEnd))
			},
			destroy: function() {
				var b = this
				  , c = this.chart.container.ownerDocument;
				b.unDocMouseMove && b.unDocMouseMove(),
				o(b.chart.container, "mouseleave", b.onContainerMouseLeave),
				a.chartCount || (o(c, "mouseup", b.onDocumentMouseUp),
				a.hasTouch && o(c, "touchend", b.onDocumentTouchEnd)),
				clearInterval(b.tooltipTimeout),
				a.objectEach(b, function(a, c) {
					b[c] = null
				})
			}
		}
	}(a),
	function(a) {
		var b = a.charts
		  , c = a.each
		  , d = a.extend
		  , e = a.map
		  , f = a.noop
		  , g = a.pick;
		d(a.Pointer.prototype, {
			pinchTranslate: function(a, b, c, d, e, f) {
				this.zoomHor && this.pinchTranslateDirection(!0, a, b, c, d, e, f),
				this.zoomVert && this.pinchTranslateDirection(!1, a, b, c, d, e, f)
			},
			pinchTranslateDirection: function(a, b, c, d, e, f, g, h) {
				var i, j, k, l = this.chart, m = a ? "x" : "y", n = a ? "X" : "Y", o = "chart" + n, p = a ? "width" : "height", q = l["plot" + (a ? "Left" : "Top")], r = h || 1, s = l.inverted, t = l.bounds[a ? "h" : "v"], u = 1 === b.length, v = b[0][o], w = c[0][o], x = !u && b[1][o], y = !u && c[1][o];
				c = function() {
					!u && 20 < Math.abs(v - x) && (r = h || Math.abs(w - y) / Math.abs(v - x)),
					j = (q - w) / r + v,
					i = l["plot" + (a ? "Width" : "Height")] / r
				}
				,
				c(),
				b = j,
				b < t.min ? (b = t.min,
				k = !0) : b + i > t.max && (b = t.max - i,
				k = !0),
				k ? (w -= .8 * (w - g[m][0]),
				u || (y -= .8 * (y - g[m][1])),
				c()) : g[m] = [w, y],
				s || (f[m] = j - q,
				f[p] = i),
				f = s ? 1 / r : r,
				e[p] = i,
				e[m] = b,
				d[s ? a ? "scaleY" : "scaleX" : "scale" + n] = r,
				d["translate" + n] = f * q + (w - f * v)
			},
			pinch: function(a) {
				var b = this
				  , h = b.chart
				  , i = b.pinchDown
				  , j = a.touches
				  , k = j.length
				  , l = b.lastValidTouch
				  , m = b.hasZoom
				  , n = b.selectionMarker
				  , o = {}
				  , p = 1 === k && (b.inClass(a.target, "highcharts-tracker") && h.runTrackerClick || b.runChartClick)
				  , q = {};
				1 < k && (b.initiated = !0),
				m && b.initiated && !p && a.preventDefault(),
				e(j, function(a) {
					return b.normalize(a)
				}),
				"touchstart" === a.type ? (c(j, function(a, b) {
					i[b] = {
						chartX: a.chartX,
						chartY: a.chartY
					}
				}),
				l.x = [i[0].chartX, i[1] && i[1].chartX],
				l.y = [i[0].chartY, i[1] && i[1].chartY],
				c(h.axes, function(a) {
					if (a.zoomEnabled) {
						var b = h.bounds[a.horiz ? "h" : "v"]
						  , c = a.minPixelPadding
						  , d = a.toPixels(g(a.options.min, a.dataMin))
						  , e = a.toPixels(g(a.options.max, a.dataMax))
						  , f = Math.max(d, e);
						b.min = Math.min(a.pos, Math.min(d, e) - c),
						b.max = Math.max(a.pos + a.len, f + c)
					}
				}),
				b.res = !0) : b.followTouchMove && 1 === k ? this.runPointActions(b.normalize(a)) : i.length && (n || (b.selectionMarker = n = d({
					destroy: f,
					touch: !0
				}, h.plotBox)),
				b.pinchTranslate(i, j, o, n, q, l),
				b.hasPinched = m,
				b.scaleGroups(o, q),
				b.res && (b.res = !1,
				this.reset(!1, 0)))
			},
			touch: function(b, c) {
				var d, e = this.chart;
				e.index !== a.hoverChartIndex && this.onContainerMouseLeave({
					relatedTarget: !0
				}),
				a.hoverChartIndex = e.index,
				1 === b.touches.length ? (b = this.normalize(b),
				e.isInsidePlot(b.chartX - e.plotLeft, b.chartY - e.plotTop) && !e.openMenu ? (c && this.runPointActions(b),
				"touchmove" === b.type && (c = this.pinchDown,
				d = !!c[0] && 4 <= Math.sqrt(Math.pow(c[0].chartX - b.chartX, 2) + Math.pow(c[0].chartY - b.chartY, 2))),
				g(d, !0) && this.pinch(b)) : c && this.reset()) : 2 === b.touches.length && this.pinch(b)
			},
			onContainerTouchStart: function(a) {
				this.zoomOption(a),
				this.touch(a, !0)
			},
			onContainerTouchMove: function(a) {
				this.touch(a)
			},
			onDocumentTouchEnd: function(c) {
				b[a.hoverChartIndex] && b[a.hoverChartIndex].pointer.drop(c)
			}
		})
	}(a),
	function(a) {
		var b = a.addEvent
		  , c = a.charts
		  , d = a.css
		  , e = a.doc
		  , f = a.extend
		  , g = a.noop
		  , h = a.Pointer
		  , i = a.removeEvent
		  , j = a.win
		  , k = a.wrap;
		if (!a.hasTouch && (j.PointerEvent || j.MSPointerEvent)) {
			var l = {}
			  , m = !!j.PointerEvent
			  , n = function() {
				var b = [];
				return b.item = function(a) {
					return this[a]
				}
				,
				a.objectEach(l, function(a) {
					b.push({
						pageX: a.pageX,
						pageY: a.pageY,
						target: a.target
					})
				}),
				b
			}
			  , o = function(b, d, e, f) {
				"touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH || !c[a.hoverChartIndex] || (f(b),
				f = c[a.hoverChartIndex].pointer,
				f[d]({
					type: e,
					target: b.currentTarget,
					preventDefault: g,
					touches: n()
				}))
			};
			f(h.prototype, {
				onContainerPointerDown: function(a) {
					o(a, "onContainerTouchStart", "touchstart", function(a) {
						l[a.pointerId] = {
							pageX: a.pageX,
							pageY: a.pageY,
							target: a.currentTarget
						}
					})
				},
				onContainerPointerMove: function(a) {
					o(a, "onContainerTouchMove", "touchmove", function(a) {
						l[a.pointerId] = {
							pageX: a.pageX,
							pageY: a.pageY
						},
						l[a.pointerId].target || (l[a.pointerId].target = a.currentTarget)
					})
				},
				onDocumentPointerUp: function(a) {
					o(a, "onDocumentTouchEnd", "touchend", function(a) {
						delete l[a.pointerId]
					})
				},
				batchMSEvents: function(a) {
					a(this.chart.container, m ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown),
					a(this.chart.container, m ? "pointermove" : "MSPointerMove", this.onContainerPointerMove),
					a(e, m ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
				}
			}),
			k(h.prototype, "init", function(a, b, c) {
				a.call(this, b, c),
				this.hasZoom && d(b.container, {
					"-ms-touch-action": "none",
					"touch-action": "none"
				})
			}),
			k(h.prototype, "setDOMEvents", function(a) {
				a.apply(this),
				(this.hasZoom || this.followTouchMove) && this.batchMSEvents(b)
			}),
			k(h.prototype, "destroy", function(a) {
				this.batchMSEvents(i),
				a.call(this)
			})
		}
	}(a),
	function(a) {
		var b = a.addEvent
		  , c = a.css
		  , d = a.discardElement
		  , e = a.defined
		  , f = a.each
		  , g = a.isFirefox
		  , h = a.marginNames
		  , i = a.merge
		  , j = a.pick
		  , k = a.setAnimation
		  , l = a.stableSort
		  , m = a.win
		  , n = a.wrap;
		a.Legend = function(a, b) {
			this.init(a, b)
		}
		,
		a.Legend.prototype = {
			init: function(a, c) {
				this.chart = a,
				this.setOptions(c),
				c.enabled && (this.render(),
				b(this.chart, "endResize", function() {
					this.legend.positionCheckboxes()
				}))
			},
			setOptions: function(a) {
				var b = j(a.padding, 8);
				this.options = a,
				this.itemStyle = a.itemStyle,
				this.itemHiddenStyle = i(this.itemStyle, a.itemHiddenStyle),
				this.itemMarginTop = a.itemMarginTop || 0,
				this.padding = b,
				this.initialItemY = b - 5,
				this.itemHeight = this.maxItemWidth = 0,
				this.symbolWidth = j(a.symbolWidth, 16),
				this.pages = []
			},
			update: function(a, b) {
				var c = this.chart;
				this.setOptions(i(!0, this.options, a)),
				this.destroy(),
				c.isDirtyLegend = c.isDirtyBox = !0,
				j(b, !0) && c.redraw()
			},
			colorizeItem: function(a, b) {
				a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
				var c = this.options
				  , d = a.legendItem
				  , e = a.legendLine
				  , f = a.legendSymbol
				  , g = this.itemHiddenStyle.color
				  , c = b ? c.itemStyle.color : g
				  , h = b ? a.color || g : g
				  , i = a.options && a.options.marker
				  , j = {
					fill: h
				};
				d && d.css({
					fill: c,
					color: c
				}),
				e && e.attr({
					stroke: h
				}),
				f && (i && f.isMarker && (j = a.pointAttribs(),
				b || (j.stroke = j.fill = g)),
				f.attr(j))
			},
			positionItem: function(a) {
				var b = this.options
				  , c = b.symbolPadding
				  , b = !b.rtl
				  , d = a._legendItemPos
				  , e = d[0]
				  , d = d[1]
				  , f = a.checkbox;
				(a = a.legendGroup) && a.element && a.translate(b ? e : this.legendWidth - e - 2 * c - 4, d),
				f && (f.x = e,
				f.y = d)
			},
			destroyItem: function(a) {
				var b = a.checkbox;
				f(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(b) {
					a[b] && (a[b] = a[b].destroy())
				}),
				b && d(a.checkbox)
			},
			destroy: function() {
				function a(a) {
					this[a] && (this[a] = this[a].destroy())
				}
				f(this.getAllItems(), function(b) {
					f(["legendItem", "legendGroup"], a, b)
				}),
				f("clipRect up down pager nav box title group".split(" "), a, this),
				this.display = null
			},
			positionCheckboxes: function(a) {
				var b, d = this.group && this.group.alignAttr, e = this.clipHeight || this.legendHeight, g = this.titleHeight;
				d && (b = d.translateY,
				f(this.allItems, function(f) {
					var h, i = f.checkbox;
					i && (h = b + g + i.y + (a || 0) + 3,
					c(i, {
						left: d.translateX + f.checkboxOffset + i.x - 20 + "px",
						top: h + "px",
						display: h > b - 6 && h < b + e - 6 ? "" : "none"
					}))
				}))
			},
			renderTitle: function() {
				var a = this.options
				  , b = this.padding
				  , c = a.title
				  , d = 0;
				c.text && (this.title || (this.title = this.chart.renderer.label(c.text, b - 3, b - 4, null, null, null, a.useHTML, null, "legend-title").attr({
					zIndex: 1
				}).css(c.style).add(this.group)),
				a = this.title.getBBox(),
				d = a.height,
				this.offsetWidth = a.width,
				this.contentGroup.attr({
					translateY: d
				})),
				this.titleHeight = d
			},
			setText: function(b) {
				var c = this.options;
				b.legendItem.attr({
					text: c.labelFormat ? a.format(c.labelFormat, b) : c.labelFormatter.call(b)
				})
			},
			renderItem: function(a) {
				var b = this.chart
				  , c = b.renderer
				  , d = this.options
				  , e = "horizontal" === d.layout
				  , f = this.symbolWidth
				  , g = d.symbolPadding
				  , h = this.itemStyle
				  , k = this.itemHiddenStyle
				  , l = this.padding
				  , m = e ? j(d.itemDistance, 20) : 0
				  , n = !d.rtl
				  , o = d.width
				  , p = d.itemMarginBottom || 0
				  , q = this.itemMarginTop
				  , r = a.legendItem
				  , s = !a.series
				  , t = !s && a.series.drawLegendSymbol ? a.series : a
				  , u = t.options
				  , v = this.createCheckboxForItem && u && u.showCheckbox
				  , u = f + g + m + (v ? 20 : 0)
				  , w = d.useHTML
				  , x = a.options.className;
				r || (a.legendGroup = c.g("legend-item").addClass("highcharts-" + t.type + "-series highcharts-color-" + a.colorIndex + (x ? " " + x : "") + (s ? " highcharts-series-" + a.index : "")).attr({
					zIndex: 1
				}).add(this.scrollGroup),
				a.legendItem = r = c.text("", n ? f + g : -g, this.baseline || 0, w).css(i(a.visible ? h : k)).attr({
					align: n ? "left" : "right",
					zIndex: 2
				}).add(a.legendGroup),
				this.baseline || (f = h.fontSize,
				this.fontMetrics = c.fontMetrics(f, r),
				this.baseline = this.fontMetrics.f + 3 + q,
				r.attr("y", this.baseline)),
				this.symbolHeight = d.symbolHeight || this.fontMetrics.f,
				t.drawLegendSymbol(this, a),
				this.setItemEvents && this.setItemEvents(a, r, w),
				v && this.createCheckboxForItem(a)),
				this.colorizeItem(a, a.visible),
				h.width || r.css({
					width: (d.itemWidth || d.width || b.spacingBox.width) - u
				}),
				this.setText(a),
				c = r.getBBox(),
				h = a.checkboxOffset = d.itemWidth || a.legendItemWidth || c.width + u,
				this.itemHeight = c = Math.round(a.legendItemHeight || c.height || this.symbolHeight),
				e && this.itemX - l + h > (o || b.spacingBox.width - 2 * l - d.x) && (this.itemX = l,
				this.itemY += q + this.lastLineHeight + p,
				this.lastLineHeight = 0),
				this.maxItemWidth = Math.max(this.maxItemWidth, h),
				this.lastItemY = q + this.itemY + p,
				this.lastLineHeight = Math.max(c, this.lastLineHeight),
				a._legendItemPos = [this.itemX, this.itemY],
				e ? this.itemX += h : (this.itemY += q + c + p,
				this.lastLineHeight = c),
				this.offsetWidth = o || Math.max((e ? this.itemX - l - (a.checkbox ? 0 : m) : h) + l, this.offsetWidth)
			},
			getAllItems: function() {
				var a = [];
				return f(this.chart.series, function(b) {
					var c = b && b.options;
					b && j(c.showInLegend, !e(c.linkedTo) && void 0, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)))
				}),
				a
			},
			adjustMargins: function(a, b) {
				var c = this.chart
				  , d = this.options
				  , g = d.align.charAt(0) + d.verticalAlign.charAt(0) + d.layout.charAt(0);
				d.floating || f([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(f, i) {
					f.test(g) && !e(a[i]) && (c[h[i]] = Math.max(c[h[i]], c.legend[(i + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][i] * d[i % 2 ? "x" : "y"] + j(d.margin, 12) + b[i]))
				})
			},
			render: function() {
				var a, b, c, d, e = this, g = e.chart, h = g.renderer, j = e.group, k = e.box, m = e.options, n = e.padding;
				e.itemX = n,
				e.itemY = e.initialItemY,
				e.offsetWidth = 0,
				e.lastItemY = 0,
				j || (e.group = j = h.g("legend").attr({
					zIndex: 7
				}).add(),
				e.contentGroup = h.g().attr({
					zIndex: 1
				}).add(j),
				e.scrollGroup = h.g().add(e.contentGroup)),
				e.renderTitle(),
				a = e.getAllItems(),
				l(a, function(a, b) {
					return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
				}),
				m.reversed && a.reverse(),
				e.allItems = a,
				e.display = b = !!a.length,
				e.lastLineHeight = 0,
				f(a, function(a) {
					e.renderItem(a)
				}),
				c = (m.width || e.offsetWidth) + n,
				d = e.lastItemY + e.lastLineHeight + e.titleHeight,
				d = e.handleOverflow(d),
				d += n,
				k || (e.box = k = h.rect().addClass("highcharts-legend-box").attr({
					r: m.borderRadius
				}).add(j),
				k.isNew = !0),
				k.attr({
					stroke: m.borderColor,
					"stroke-width": m.borderWidth || 0,
					fill: m.backgroundColor || "none"
				}).shadow(m.shadow),
				0 < c && 0 < d && (k[k.isNew ? "attr" : "animate"](k.crisp({
					x: 0,
					y: 0,
					width: c,
					height: d
				}, k.strokeWidth())),
				k.isNew = !1),
				k[b ? "show" : "hide"](),
				e.legendWidth = c,
				e.legendHeight = d,
				f(a, function(a) {
					e.positionItem(a)
				}),
				b && j.align(i(m, {
					width: c,
					height: d
				}), !0, "spacingBox"),
				g.isResizing || this.positionCheckboxes()
			},
			handleOverflow: function(a) {
				var b, c, d = this, e = this.chart, g = e.renderer, h = this.options, i = h.y, k = this.padding, e = e.spacingBox.height + ("top" === h.verticalAlign ? -i : i) - k, i = h.maxHeight, l = this.clipRect, m = h.navigation, n = j(m.animation, !0), o = m.arrowSize || 12, p = this.nav, q = this.pages, r = this.allItems, s = function(a) {
					"number" == typeof a ? l.attr({
						height: a
					}) : l && (d.clipRect = l.destroy(),
					d.contentGroup.clip()),
					d.contentGroup.div && (d.contentGroup.div.style.clip = a ? "rect(" + k + "px,9999px," + (k + a) + "px,0)" : "auto")
				};
				return "horizontal" !== h.layout || "middle" === h.verticalAlign || h.floating || (e /= 2),
				i && (e = Math.min(e, i)),
				q.length = 0,
				a > e && !1 !== m.enabled ? (this.clipHeight = b = Math.max(e - 20 - this.titleHeight - k, 0),
				this.currentPage = j(this.currentPage, 1),
				this.fullHeight = a,
				f(r, function(a, d) {
					var e = a._legendItemPos[1];
					a = Math.round(a.legendItem.getBBox().height);
					var f = q.length;
					(!f || e - q[f - 1] > b && (c || e) !== q[f - 1]) && (q.push(c || e),
					f++),
					d === r.length - 1 && e + a - q[f - 1] > b && q.push(e),
					e !== c && (c = e)
				}),
				l || (l = d.clipRect = g.clipRect(0, k, 9999, 0),
				d.contentGroup.clip(l)),
				s(b),
				p || (this.nav = p = g.g().attr({
					zIndex: 1
				}).add(this.group),
				this.up = g.symbol("triangle", 0, 0, o, o).on("click", function() {
					d.scroll(-1, n)
				}).add(p),
				this.pager = g.text("", 15, 10).addClass("highcharts-legend-navigation").css(m.style).add(p),
				this.down = g.symbol("triangle-down", 0, 0, o, o).on("click", function() {
					d.scroll(1, n)
				}).add(p)),
				d.scroll(0),
				a = e) : p && (s(),
				this.nav = p.destroy(),
				this.scrollGroup.attr({
					translateY: 1
				}),
				this.clipHeight = 0),
				a
			},
			scroll: function(a, b) {
				var c = this.pages
				  , d = c.length;
				a = this.currentPage + a;
				var e = this.clipHeight
				  , f = this.options.navigation
				  , g = this.pager
				  , h = this.padding;
				a > d && (a = d),
				0 < a && (void 0 !== b && k(b, this.chart),
				this.nav.attr({
					translateX: h,
					translateY: e + this.padding + 7 + this.titleHeight,
					visibility: "visible"
				}),
				this.up.attr({
					class: 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
				}),
				g.attr({
					text: a + "/" + d
				}),
				this.down.attr({
					x: 18 + this.pager.getBBox().width,
					class: a === d ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
				}),
				this.up.attr({
					fill: 1 === a ? f.inactiveColor : f.activeColor
				}).css({
					cursor: 1 === a ? "default" : "pointer"
				}),
				this.down.attr({
					fill: a === d ? f.inactiveColor : f.activeColor
				}).css({
					cursor: a === d ? "default" : "pointer"
				}),
				b = -c[a - 1] + this.initialItemY,
				this.scrollGroup.animate({
					translateY: b
				}),
				this.currentPage = a,
				this.positionCheckboxes(b))
			}
		},
		a.LegendSymbolMixin = {
			drawRectangle: function(a, b) {
				var c = a.symbolHeight
				  , d = a.options.squareSymbol;
				b.legendSymbol = this.chart.renderer.rect(d ? (a.symbolWidth - c) / 2 : 0, a.baseline - c + 1, d ? c : a.symbolWidth, c, j(a.options.symbolRadius, c / 2)).addClass("highcharts-point").attr({
					zIndex: 3
				}).add(b.legendGroup)
			},
			drawLineMarker: function(a) {
				var b = this.options
				  , c = b.marker
				  , d = a.symbolWidth
				  , e = a.symbolHeight
				  , f = e / 2
				  , g = this.chart.renderer
				  , h = this.legendGroup;
				a = a.baseline - Math.round(.3 * a.fontMetrics.b);
				var k;
				k = {
					"stroke-width": b.lineWidth || 0
				},
				b.dashStyle && (k.dashstyle = b.dashStyle),
				this.legendLine = g.path(["M", 0, a, "L", d, a]).addClass("highcharts-graph").attr(k).add(h),
				c && !1 !== c.enabled && (b = Math.min(j(c.radius, f), f),
				0 === this.symbol.indexOf("url") && (c = i(c, {
					width: e,
					height: e
				}),
				b = 0),
				this.legendSymbol = c = g.symbol(this.symbol, d / 2 - b, a - b, 2 * b, 2 * b, c).addClass("highcharts-point").add(h),
				c.isMarker = !0)
			}
		},
		(/Trident\/7\.0/.test(m.navigator.userAgent) || g) && n(a.Legend.prototype, "positionItem", function(a, b) {
			var c = this
			  , d = function() {
				b._legendItemPos && a.call(c, b)
			};
			d(),
			setTimeout(d)
		})
	}(a),
	function(a) {
		var b = a.addEvent
		  , c = a.animate
		  , d = a.animObject
		  , e = a.attr
		  , f = a.doc
		  , g = a.Axis
		  , h = a.createElement
		  , i = a.defaultOptions
		  , j = a.discardElement
		  , k = a.charts
		  , l = a.css
		  , m = a.defined
		  , n = a.each
		  , o = a.extend
		  , p = a.find
		  , q = a.fireEvent
		  , r = a.getStyle
		  , s = a.grep
		  , t = a.isNumber
		  , u = a.isObject
		  , v = a.isString
		  , w = a.Legend
		  , x = a.marginNames
		  , y = a.merge
		  , z = a.objectEach
		  , A = a.Pointer
		  , B = a.pick
		  , C = a.pInt
		  , D = a.removeEvent
		  , E = a.seriesTypes
		  , F = a.splat
		  , G = a.svg
		  , H = a.syncTimeout
		  , I = a.win
		  , J = a.Renderer
		  , K = a.Chart = function() {
			this.getArgs.apply(this, arguments)
		}
		;
		a.chart = function(a, b, c) {
			return new K(a,b,c)
		}
		,
		o(K.prototype, {
			callbacks: [],
			getArgs: function() {
				var a = [].slice.call(arguments);
				(v(a[0]) || a[0].nodeName) && (this.renderTo = a.shift()),
				this.init(a[0], a[1])
			},
			init: function(c, d) {
				var e, f, g = c.series, h = c.plotOptions || {};
				c.series = null,
				e = y(i, c);
				for (f in e.plotOptions)
					e.plotOptions[f].tooltip = h[f] && y(h[f].tooltip) || void 0;
				e.tooltip.userOptions = c.chart && c.chart.forExport && c.tooltip.userOptions || c.tooltip,
				e.series = c.series = g,
				this.userOptions = c,
				c = e.chart,
				f = c.events,
				this.margin = [],
				this.spacing = [],
				this.bounds = {
					h: {},
					v: {}
				},
				this.callback = d,
				this.isResizing = 0,
				this.options = e,
				this.axes = [],
				this.series = [],
				this.hasCartesianSeries = c.showAxes;
				var j = this;
				j.index = k.length,
				k.push(j),
				a.chartCount++,
				f && z(f, function(a, c) {
					b(j, c, a)
				}),
				j.xAxis = [],
				j.yAxis = [],
				j.pointCount = j.colorCounter = j.symbolCounter = 0,
				j.firstRender()
			},
			initSeries: function(b) {
				var c = this.options.chart;
				return (c = E[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0),
				c = new c,
				c.init(this, b),
				c
			},
			orderSeries: function(a) {
				var b = this.series;
				for (a = a || 0; a < b.length; a++)
					b[a] && (b[a].index = a,
					b[a].name = b[a].name || "Series " + (b[a].index + 1))
			},
			isInsidePlot: function(a, b, c) {
				var d = c ? b : a;
				return a = c ? a : b,
				0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight
			},
			redraw: function(b) {
				var c, d, e, f = this.axes, g = this.series, h = this.pointer, i = this.legend, j = this.isDirtyLegend, k = this.hasCartesianSeries, l = this.isDirtyBox, m = this.renderer, p = m.isHidden(), r = [];
				for (this.setResponsive && this.setResponsive(!1),
				a.setAnimation(b, this),
				p && this.temporaryDisplay(),
				this.layOutTitles(),
				b = g.length; b--; )
					if (e = g[b],
					e.options.stacking && (c = !0,
					e.isDirty)) {
						d = !0;
						break
					}
				if (d)
					for (b = g.length; b--; )
						e = g[b],
						e.options.stacking && (e.isDirty = !0);
				n(g, function(a) {
					a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(),
					j = !0),
					a.isDirtyData && q(a, "updatedData")
				}),
				j && i.options.enabled && (i.render(),
				this.isDirtyLegend = !1),
				c && this.getStacks(),
				k && n(f, function(a) {
					a.updateNames(),
					a.setScale()
				}),
				this.getMargins(),
				k && (n(f, function(a) {
					a.isDirty && (l = !0)
				}),
				n(f, function(a) {
					var b = a.min + "," + a.max;
					a.extKey !== b && (a.extKey = b,
					r.push(function() {
						q(a, "afterSetExtremes", o(a.eventArgs, a.getExtremes())),
						delete a.eventArgs
					})),
					(l || c) && a.redraw()
				})),
				l && this.drawChartBox(),
				q(this, "predraw"),
				n(g, function(a) {
					(l || a.isDirty) && a.visible && a.redraw(),
					a.isDirtyData = !1
				}),
				h && h.reset(!0),
				m.draw(),
				q(this, "redraw"),
				q(this, "render"),
				p && this.temporaryDisplay(!0),
				n(r, function(a) {
					a.call()
				})
			},
			get: function(a) {
				function b(b) {
					return b.id === a || b.options && b.options.id === a
				}
				var c, d, e = this.series;
				for (c = p(this.axes, b) || p(this.series, b),
				d = 0; !c && d < e.length; d++)
					c = p(e[d].points || [], b);
				return c
			},
			getAxes: function() {
				var a = this
				  , b = this.options
				  , c = b.xAxis = F(b.xAxis || {})
				  , b = b.yAxis = F(b.yAxis || {});
				n(c, function(a, b) {
					a.index = b,
					a.isX = !0
				}),
				n(b, function(a, b) {
					a.index = b
				}),
				c = c.concat(b),
				n(c, function(b) {
					new g(a,b)
				})
			},
			getSelectedPoints: function() {
				var a = [];
				return n(this.series, function(b) {
					a = a.concat(s(b.data || [], function(a) {
						return a.selected
					}))
				}),
				a
			},
			getSelectedSeries: function() {
				return s(this.series, function(a) {
					return a.selected
				})
			},
			setTitle: function(a, b, c) {
				var d, e = this, f = e.options;
				d = f.title = y({
					style: {
						color: "#333333",
						fontSize: f.isStock ? "16px" : "18px"
					}
				}, f.title, a),
				f = f.subtitle = y({
					style: {
						color: "#666666"
					}
				}, f.subtitle, b),
				n([["title", a, d], ["subtitle", b, f]], function(a, b) {
					var c = a[0]
					  , d = e[c]
					  , f = a[1];
					a = a[2],
					d && f && (e[c] = d = d.destroy()),
					a && a.text && !d && (e[c] = e.renderer.text(a.text, 0, 0, a.useHTML).attr({
						align: a.align,
						class: "highcharts-" + c,
						zIndex: a.zIndex || 4
					}).add(),
					e[c].update = function(a) {
						e.setTitle(!b && a, b && a)
					}
					,
					e[c].css(a.style))
				}),
				e.layOutTitles(c)
			},
			layOutTitles: function(a) {
				var b, c = 0, d = this.renderer, e = this.spacingBox;
				n(["title", "subtitle"], function(a) {
					var b = this[a]
					  , f = this.options[a];
					a = "title" === a ? -3 : f.verticalAlign ? 0 : c + 2;
					var g;
					b && (g = f.style.fontSize,
					g = d.fontMetrics(g, b).b,
					b.css({
						width: (f.width || e.width + f.widthAdjust) + "px"
					}).align(o({
						y: a + g
					}, f), !1, "spacingBox"),
					f.floating || f.verticalAlign || (c = Math.ceil(c + b.getBBox(f.useHTML).height)))
				}, this),
				b = this.titleOffset !== c,
				this.titleOffset = c,
				!this.isDirtyBox && b && (this.isDirtyBox = b,
				this.hasRendered && B(a, !0) && this.isDirtyBox && this.redraw())
			},
			getChartSize: function() {
				var b = this.options.chart
				  , c = b.width
				  , b = b.height
				  , d = this.renderTo;
				m(c) || (this.containerWidth = r(d, "width")),
				m(b) || (this.containerHeight = r(d, "height")),
				this.chartWidth = Math.max(0, c || this.containerWidth || 600),
				this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || this.containerHeight || 400)
			},
			temporaryDisplay: function(b) {
				var c = this.renderTo;
				if (b)
					for (; c && c.style; )
						c.hcOrigStyle && (a.css(c, c.hcOrigStyle),
						delete c.hcOrigStyle),
						c.hcOrigDetached && (f.body.removeChild(c),
						c.hcOrigDetached = !1),
						c = c.parentNode;
				else
					for (; c && c.style && (f.body.contains(c) || (c.hcOrigDetached = !0,
					f.body.appendChild(c)),
					("none" === r(c, "display", !1) || c.hcOricDetached) && (c.hcOrigStyle = {
						display: c.style.display,
						height: c.style.height,
						overflow: c.style.overflow
					},
					b = {
						display: "block",
						overflow: "hidden"
					},
					c !== this.renderTo && (b.height = 0),
					a.css(c, b),
					c.offsetWidth || c.style.setProperty("display", "block", "important")),
					(c = c.parentNode) !== f.body); )
						;
			},
			setClassName: function(a) {
				this.container.className = "highcharts-container " + (a || "")
			},
			getContainer: function() {
				var b, c, d, g = this.options, i = g.chart;
				b = this.renderTo;
				var j, l = a.uniqueKey();
				b || (this.renderTo = b = i.renderTo),
				v(b) && (this.renderTo = b = f.getElementById(b)),
				b || a.error(13, !0),
				c = C(e(b, "data-highcharts-chart")),
				t(c) && k[c] && k[c].hasRendered && k[c].destroy(),
				e(b, "data-highcharts-chart", this.index),
				b.innerHTML = "",
				i.skipClone || b.offsetWidth || this.temporaryDisplay(),
				this.getChartSize(),
				c = this.chartWidth,
				d = this.chartHeight,
				j = o({
					position: "relative",
					overflow: "hidden",
					width: c + "px",
					height: d + "px",
					textAlign: "left",
					lineHeight: "normal",
					zIndex: 0,
					"-webkit-tap-highlight-color": "rgba(0,0,0,0)"
				}, i.style),
				this.container = b = h("div", {
					id: l
				}, j, b),
				this._cursor = b.style.cursor,
				this.renderer = new (a[i.renderer] || J)(b,c,d,null,i.forExport,g.exporting && g.exporting.allowHTML),
				this.setClassName(i.className),
				this.renderer.setStyle(i.style),
				this.renderer.chartIndex = this.index
			},
			getMargins: function(a) {
				var b = this.spacing
				  , c = this.margin
				  , d = this.titleOffset;
				this.resetMargins(),
				d && !m(c[0]) && (this.plotTop = Math.max(this.plotTop, d + this.options.title.margin + b[0])),
				this.legend.display && this.legend.adjustMargins(c, b),
				this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value),
				this.extraTopMargin && (this.plotTop += this.extraTopMargin),
				a || this.getAxisMargins()
			},
			getAxisMargins: function() {
				var a = this
				  , b = a.axisOffset = [0, 0, 0, 0]
				  , c = a.margin;
				a.hasCartesianSeries && n(a.axes, function(a) {
					a.visible && a.getOffset()
				}),
				n(x, function(d, e) {
					m(c[e]) || (a[d] += b[e])
				}),
				a.setChartSize()
			},
			reflow: function(a) {
				var b = this
				  , c = b.options.chart
				  , d = b.renderTo
				  , e = m(c.width) && m(c.height)
				  , g = c.width || r(d, "width")
				  , c = c.height || r(d, "height")
				  , d = a ? a.target : I;
				e || b.isPrinting || !g || !c || d !== I && d !== f || (g === b.containerWidth && c === b.containerHeight || (clearTimeout(b.reflowTimeout),
				b.reflowTimeout = H(function() {
					b.container && b.setSize(void 0, void 0, !1)
				}, a ? 100 : 0)),
				b.containerWidth = g,
				b.containerHeight = c)
			},
			initReflow: function() {
				var a, c = this;
				a = b(I, "resize", function(a) {
					c.reflow(a)
				}),
				b(c, "destroy", a)
			},
			setSize: function(b, e, f) {
				var g = this
				  , h = g.renderer;
				g.isResizing += 1,
				a.setAnimation(f, g),
				g.oldChartHeight = g.chartHeight,
				g.oldChartWidth = g.chartWidth,
				void 0 !== b && (g.options.chart.width = b),
				void 0 !== e && (g.options.chart.height = e),
				g.getChartSize(),
				b = h.globalAnimation,
				(b ? c : l)(g.container, {
					width: g.chartWidth + "px",
					height: g.chartHeight + "px"
				}, b),
				g.setChartSize(!0),
				h.setSize(g.chartWidth, g.chartHeight, f),
				n(g.axes, function(a) {
					a.isDirty = !0,
					a.setScale()
				}),
				g.isDirtyLegend = !0,
				g.isDirtyBox = !0,
				g.layOutTitles(),
				g.getMargins(),
				g.redraw(f),
				g.oldChartHeight = null,
				q(g, "resize"),
				H(function() {
					g && q(g, "endResize", null, function() {
						--g.isResizing
					})
				}, d(b).duration)
			},
			setChartSize: function(a) {
				function b(a) {
					return a = o[a] || 0,
					Math.max(g || a, a) / 2
				}
				var c, d, e, f, g, h = this.inverted, i = this.renderer, j = this.chartWidth, k = this.chartHeight, l = this.options.chart, m = this.spacing, o = this.clipOffset;
				this.plotLeft = c = Math.round(this.plotLeft),
				this.plotTop = d = Math.round(this.plotTop),
				this.plotWidth = e = Math.max(0, Math.round(j - c - this.marginRight)),
				this.plotHeight = f = Math.max(0, Math.round(k - d - this.marginBottom)),
				this.plotSizeX = h ? f : e,
				this.plotSizeY = h ? e : f,
				this.plotBorderWidth = l.plotBorderWidth || 0,
				this.spacingBox = i.spacingBox = {
					x: m[3],
					y: m[0],
					width: j - m[3] - m[1],
					height: k - m[0] - m[2]
				},
				this.plotBox = i.plotBox = {
					x: c,
					y: d,
					width: e,
					height: f
				},
				g = 2 * Math.floor(this.plotBorderWidth / 2),
				h = Math.ceil(b(3)),
				i = Math.ceil(b(0)),
				this.clipBox = {
					x: h,
					y: i,
					width: Math.floor(this.plotSizeX - b(1) - h),
					height: Math.max(0, Math.floor(this.plotSizeY - b(2) - i))
				},
				a || n(this.axes, function(a) {
					a.setAxisSize(),
					a.setAxisTranslation()
				})
			},
			resetMargins: function() {
				var a = this
				  , b = a.options.chart;
				n(["margin", "spacing"], function(c) {
					var d = b[c]
					  , e = u(d) ? d : [d, d, d, d];
					n(["Top", "Right", "Bottom", "Left"], function(d, f) {
						a[c][f] = B(b[c + d], e[f])
					})
				}),
				n(x, function(b, c) {
					a[b] = B(a.margin[c], a.spacing[c])
				}),
				a.axisOffset = [0, 0, 0, 0],
				a.clipOffset = []
			},
			drawChartBox: function() {
				var a, b, c = this.options.chart, d = this.renderer, e = this.chartWidth, f = this.chartHeight, g = this.chartBackground, h = this.plotBackground, i = this.plotBorder, j = this.plotBGImage, k = c.backgroundColor, l = c.plotBackgroundColor, m = c.plotBackgroundImage, n = this.plotLeft, o = this.plotTop, p = this.plotWidth, q = this.plotHeight, r = this.plotBox, s = this.clipRect, t = this.clipBox, u = "animate";
				g || (this.chartBackground = g = d.rect().addClass("highcharts-background").add(),
				u = "attr"),
				a = c.borderWidth || 0,
				b = a + (c.shadow ? 8 : 0),
				k = {
					fill: k || "none"
				},
				(a || g["stroke-width"]) && (k.stroke = c.borderColor,
				k["stroke-width"] = a),
				g.attr(k).shadow(c.shadow),
				g[u]({
					x: b / 2,
					y: b / 2,
					width: e - b - a % 2,
					height: f - b - a % 2,
					r: c.borderRadius
				}),
				u = "animate",
				h || (u = "attr",
				this.plotBackground = h = d.rect().addClass("highcharts-plot-background").add()),
				h[u](r),
				h.attr({
					fill: l || "none"
				}).shadow(c.plotShadow),
				m && (j ? j.animate(r) : this.plotBGImage = d.image(m, n, o, p, q).add()),
				s ? s.animate({
					width: t.width,
					height: t.height
				}) : this.clipRect = d.clipRect(t),
				u = "animate",
				i || (u = "attr",
				this.plotBorder = i = d.rect().addClass("highcharts-plot-border").attr({
					zIndex: 1
				}).add()),
				i.attr({
					stroke: c.plotBorderColor,
					"stroke-width": c.plotBorderWidth || 0,
					fill: "none"
				}),
				i[u](i.crisp({
					x: n,
					y: o,
					width: p,
					height: q
				}, -i.strokeWidth())),
				this.isDirtyBox = !1
			},
			propFromSeries: function() {
				var a, b, c, d = this, e = d.options.chart, f = d.options.series;
				n(["inverted", "angular", "polar"], function(g) {
					for (a = E[e.type || e.defaultSeriesType],
					c = e[g] || a && a.prototype[g],
					b = f && f.length; !c && b--; )
						(a = E[f[b].type]) && a.prototype[g] && (c = !0);
					d[g] = c
				})
			},
			linkSeries: function() {
				var a = this
				  , b = a.series;
				n(b, function(a) {
					a.linkedSeries.length = 0
				}),
				n(b, function(b) {
					var c = b.options.linkedTo;
					v(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b),
					b.linkedParent = c,
					b.visible = B(b.options.visible, c.options.visible, b.visible))
				})
			},
			renderSeries: function() {
				n(this.series, function(a) {
					a.translate(),
					a.render()
				})
			},
			renderLabels: function() {
				var a = this
				  , b = a.options.labels;
				b.items && n(b.items, function(c) {
					var d = o(b.style, c.style)
					  , e = C(d.left) + a.plotLeft
					  , f = C(d.top) + a.plotTop + 12;
					delete d.left,
					delete d.top,
					a.renderer.text(c.html, e, f).attr({
						zIndex: 2
					}).css(d).add()
				})
			},
			render: function() {
				var a, b, c, d = this.axes, e = this.renderer, f = this.options;
				this.setTitle(),
				this.legend = new w(this,f.legend),
				this.getStacks && this.getStacks(),
				this.getMargins(!0),
				this.setChartSize(),
				f = this.plotWidth,
				a = this.plotHeight -= 21,
				n(d, function(a) {
					a.setScale()
				}),
				this.getAxisMargins(),
				b = 1.1 < f / this.plotWidth,
				c = 1.05 < a / this.plotHeight,
				(b || c) && (n(d, function(a) {
					(a.horiz && b || !a.horiz && c) && a.setTickInterval(!0)
				}),
				this.getMargins()),
				this.drawChartBox(),
				this.hasCartesianSeries && n(d, function(a) {
					a.visible && a.render()
				}),
				this.seriesGroup || (this.seriesGroup = e.g("series-group").attr({
					zIndex: 3
				}).add()),
				this.renderSeries(),
				this.renderLabels(),
				this.addCredits(),
				this.setResponsive && this.setResponsive(),
				this.hasRendered = !0
			},
			addCredits: function(a) {
				var b = this;
				a = y(!0, this.options.credits, a),
				a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
					a.href && (I.location.href = a.href)
				}).attr({
					align: a.position.align,
					zIndex: 8
				}).css(a.style).add().align(a.position),
				this.credits.update = function(a) {
					b.credits = b.credits.destroy(),
					b.addCredits(a)
				}
				)
			},
			destroy: function() {
				var b, c = this, d = c.axes, e = c.series, f = c.container, g = f && f.parentNode;
				for (q(c, "destroy"),
				c.renderer.forExport ? a.erase(k, c) : k[c.index] = void 0,
				a.chartCount--,
				c.renderTo.removeAttribute("data-highcharts-chart"),
				D(c),
				b = d.length; b--; )
					d[b] = d[b].destroy();
				for (this.scroller && this.scroller.destroy && this.scroller.destroy(),
				b = e.length; b--; )
					e[b] = e[b].destroy();
				n("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function(a) {
					var b = c[a];
					b && b.destroy && (c[a] = b.destroy())
				}),
				f && (f.innerHTML = "",
				D(f),
				g && j(f)),
				z(c, function(a, b) {
					delete c[b]
				})
			},
			isReadyToRender: function() {
				var a = this;
				return !(!G && I == I.top && "complete" !== f.readyState) || (f.attachEvent("onreadystatechange", function() {
					f.detachEvent("onreadystatechange", a.firstRender),
					"complete" === f.readyState && a.firstRender()
				}),
				!1)
			},
			firstRender: function() {
				var a = this
				  , b = a.options;
				a.isReadyToRender() && (a.getContainer(),
				q(a, "init"),
				a.resetMargins(),
				a.setChartSize(),
				a.propFromSeries(),
				a.getAxes(),
				n(b.series || [], function(b) {
					a.initSeries(b)
				}),
				a.linkSeries(),
				q(a, "beforeRender"),
				A && (a.pointer = new A(a,b)),
				a.render(),
				!a.renderer.imgCount && a.onload && a.onload(),
				a.temporaryDisplay(!0))
			},
			onload: function() {
				n([this.callback].concat(this.callbacks), function(a) {
					a && void 0 !== this.index && a.apply(this, [this])
				}, this),
				q(this, "load"),
				q(this, "render"),
				m(this.index) && !1 !== this.options.chart.reflow && this.initReflow(),
				this.onload = null
			}
		})
	}(a),
	function(a) {
		var b, c = a.each, d = a.extend, e = a.erase, f = a.fireEvent, g = a.format, h = a.isArray, i = a.isNumber, j = a.pick, k = a.removeEvent;
		a.Point = b = function() {}
		,
		a.Point.prototype = {
			init: function(a, b, c) {
				return this.series = a,
				this.color = a.color,
				this.applyOptions(b, c),
				a.options.colorByPoint ? (b = a.options.colors || a.chart.options.colors,
				this.color = this.color || b[a.colorCounter],
				b = b.length,
				c = a.colorCounter,
				++a.colorCounter === b && (a.colorCounter = 0)) : c = a.colorIndex,
				this.colorIndex = j(this.colorIndex, c),
				a.chart.pointCount++,
				this
			},
			applyOptions: function(a, c) {
				var e = this.series
				  , f = e.options.pointValKey || e.pointValKey;
				return a = b.prototype.optionsToObject.call(this, a),
				d(this, a),
				this.options = this.options ? d(this.options, a) : a,
				a.group && delete this.group,
				f && (this.y = this[f]),
				this.isNull = j(this.isValid && !this.isValid(), null === this.x || !i(this.y, !0)),
				this.selected && (this.state = "select"),
				"name"in this && void 0 === c && e.xAxis && e.xAxis.hasNames && (this.x = e.xAxis.nameToX(this)),
				void 0 === this.x && e && (this.x = void 0 === c ? e.autoIncrement(this) : c),
				this
			},
			optionsToObject: function(a) {
				var b = {}
				  , c = this.series
				  , d = c.options.keys
				  , e = d || c.pointArrayMap || ["y"]
				  , f = e.length
				  , g = 0
				  , j = 0;
				if (i(a) || null === a)
					b[e[0]] = a;
				else if (h(a))
					for (!d && a.length > f && (c = typeof a[0],
					"string" === c ? b.name = a[0] : "number" === c && (b.x = a[0]),
					g++); j < f; )
						d && void 0 === a[g] || (b[e[j]] = a[g]),
						g++,
						j++;
				else
					"object" == typeof a && (b = a,
					a.dataLabels && (c._hasPointLabels = !0),
					a.marker && (c._hasPointMarkers = !0));
				return b
			},
			getClassName: function() {
				return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
			},
			getZone: function() {
				var a, b = this.series, c = b.zones, b = b.zoneAxis || "y", d = 0;
				for (a = c[d]; this[b] >= a.value; )
					a = c[++d];
				return a && a.color && !this.options.color && (this.color = a.color),
				a
			},
			destroy: function() {
				var a, b = this.series.chart, c = b.hoverPoints;
				b.pointCount--,
				c && (this.setState(),
				e(c, this),
				c.length || (b.hoverPoints = null)),
				this === b.hoverPoint && this.onMouseOut(),
				(this.graphic || this.dataLabel) && (k(this),
				this.destroyElements()),
				this.legendItem && b.legend.destroyItem(this);
				for (a in this)
					this[a] = null
			},
			destroyElements: function() {
				for (var a, b = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], c = 6; c--; )
					a = b[c],
					this[a] && (this[a] = this[a].destroy())
			},
			getLabelConfig: function() {
				return {
					x: this.category,
					y: this.y,
					color: this.color,
					colorIndex: this.colorIndex,
					key: this.name || this.category,
					series: this.series,
					point: this,
					percentage: this.percentage,
					total: this.total || this.stackTotal
				}
			},
			tooltipFormatter: function(a) {
				var b = this.series
				  , d = b.tooltipOptions
				  , e = j(d.valueDecimals, "")
				  , f = d.valuePrefix || ""
				  , h = d.valueSuffix || "";
				return c(b.pointArrayMap || ["y"], function(b) {
					b = "{point." + b,
					(f || h) && (a = a.replace(b + "}", f + b + "}" + h)),
					a = a.replace(b + "}", b + ":,." + e + "f}")
				}),
				g(a, {
					point: this,
					series: this.series
				})
			},
			firePointEvent: function(a, b, c) {
				var d = this
				  , e = this.series.options;
				(e.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents(),
				"click" === a && e.allowPointSelect && (c = function(a) {
					d.select && d.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
				}
				),
				f(this, a, b, c)
			},
			visible: !0
		}
	}(a),
	function(a) {
		var b = a.addEvent
		  , c = a.animObject
		  , d = a.arrayMax
		  , e = a.arrayMin
		  , f = a.correctFloat
		  , g = a.Date
		  , h = a.defaultOptions
		  , i = a.defaultPlotOptions
		  , j = a.defined
		  , k = a.each
		  , l = a.erase
		  , m = a.extend
		  , n = a.fireEvent
		  , o = a.grep
		  , p = a.isArray
		  , q = a.isNumber
		  , r = a.isString
		  , s = a.merge
		  , t = a.objectEach
		  , u = a.pick
		  , v = a.removeEvent
		  , w = a.splat
		  , x = a.SVGElement
		  , y = a.syncTimeout
		  , z = a.win;
		a.Series = a.seriesType("line", null, {
			lineWidth: 2,
			allowPointSelect: !1,
			showCheckbox: !1,
			animation: {
				duration: 1e3
			},
			events: {},
			marker: {
				lineWidth: 0,
				lineColor: "#ffffff",
				radius: 4,
				states: {
					hover: {
						animation: {
							duration: 50
						},
						enabled: !0,
						radiusPlus: 2,
						lineWidthPlus: 1
					},
					select: {
						fillColor: "#cccccc",
						lineColor: "#000000",
						lineWidth: 2
					}
				}
			},
			point: {
				events: {}
			},
			dataLabels: {
				align: "center",
				formatter: function() {
					return null === this.y ? "" : a.numberFormat(this.y, -1)
				},
				style: {
					fontSize: "11px",
					fontWeight: "bold",
					color: "contrast",
					textOutline: "1px contrast"
				},
				verticalAlign: "bottom",
				x: 0,
				y: 0,
				padding: 5
			},
			cropThreshold: 300,
			pointRange: 0,
			softThreshold: !0,
			states: {
				hover: {
					animation: {
						duration: 50
					},
					lineWidthPlus: 1,
					marker: {},
					halo: {
						size: 10,
						opacity: .25
					}
				},
				select: {
					marker: {}
				}
			},
			stickyTracking: !0,
			turboThreshold: 1e3,
			findNearestPointBy: "x"
		}, {
			isCartesian: !0,
			pointClass: a.Point,
			sorted: !0,
			requireSorting: !0,
			directTouch: !1,
			axisTypes: ["xAxis", "yAxis"],
			colorCounter: 0,
			parallelArrays: ["x", "y"],
			coll: "series",
			init: function(a, c) {
				var d, e, f = this, g = a.series;
				f.chart = a,
				f.options = c = f.setOptions(c),
				f.linkedSeries = [],
				f.bindAxes(),
				m(f, {
					name: c.name,
					state: "",
					visible: !1 !== c.visible,
					selected: !0 === c.selected
				}),
				d = c.events,
				t(d, function(a, c) {
					b(f, c, a)
				}),
				(d && d.click || c.point && c.point.events && c.point.events.click || c.allowPointSelect) && (a.runTrackerClick = !0),
				f.getColor(),
				f.getSymbol(),
				k(f.parallelArrays, function(a) {
					f[a + "Data"] = []
				}),
				f.setData(c.data, !1),
				f.isCartesian && (a.hasCartesianSeries = !0),
				g.length && (e = g[g.length - 1]),
				f._i = u(e && e._i, -1) + 1,
				a.orderSeries(this.insert(g))
			},
			insert: function(a) {
				var b, c = this.options.index;
				if (q(c)) {
					for (b = a.length; b--; )
						if (c >= u(a[b].options.index, a[b]._i)) {
							a.splice(b + 1, 0, this);
							break
						}
					-1 === b && a.unshift(this),
					b += 1
				} else
					a.push(this);
				return u(b, a.length - 1)
			},
			bindAxes: function() {
				var b, c = this, d = c.options, e = c.chart;
				k(c.axisTypes || [], function(f) {
					k(e[f], function(a) {
						b = a.options,
						(d[f] === b.index || void 0 !== d[f] && d[f] === b.id || void 0 === d[f] && 0 === b.index) && (c.insert(a.series),
						c[f] = a,
						a.isDirty = !0)
					}),
					c[f] || c.optionalAxis === f || a.error(18, !0)
				})
			},
			updateParallelArrays: function(a, b) {
				var c = a.series
				  , d = arguments
				  , e = q(b) ? function(d) {
					var e = "y" === d && c.toYData ? c.toYData(a) : a[d];
					c[d + "Data"][b] = e
				}
				: function(a) {
					Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2))
				}
				;
				k(c.parallelArrays, e)
			},
			autoIncrement: function() {
				var a, b = this.options, c = this.xIncrement, d = b.pointIntervalUnit, c = u(c, b.pointStart, 0);
				return this.pointInterval = a = u(this.pointInterval, b.pointInterval, 1),
				d && (b = new g(c),
				"day" === d ? b = +b[g.hcSetDate](b[g.hcGetDate]() + a) : "month" === d ? b = +b[g.hcSetMonth](b[g.hcGetMonth]() + a) : "year" === d && (b = +b[g.hcSetFullYear](b[g.hcGetFullYear]() + a)),
				a = b - c),
				this.xIncrement = c + a,
				c
			},
			setOptions: function(a) {
				var b = this.chart
				  , c = b.options
				  , d = c.plotOptions
				  , e = (b.userOptions || {}).plotOptions || {}
				  , f = d[this.type];
				return this.userOptions = a,
				b = s(f, d.series, a),
				this.tooltipOptions = s(h.tooltip, h.plotOptions.series && h.plotOptions.series.tooltip, h.plotOptions[this.type].tooltip, c.tooltip.userOptions, d.series && d.series.tooltip, d[this.type].tooltip, a.tooltip),
				this.stickyTracking = u(a.stickyTracking, e[this.type] && e[this.type].stickyTracking, e.series && e.series.stickyTracking, !(!this.tooltipOptions.shared || this.noSharedTooltip) || b.stickyTracking),
				null === f.marker && delete b.marker,
				this.zoneAxis = b.zoneAxis,
				a = this.zones = (b.zones || []).slice(),
				!b.negativeColor && !b.negativeFillColor || b.zones || a.push({
					value: b[this.zoneAxis + "Threshold"] || b.threshold || 0,
					className: "highcharts-negative",
					color: b.negativeColor,
					fillColor: b.negativeFillColor
				}),
				a.length && j(a[a.length - 1].value) && a.push({
					color: this.color,
					fillColor: this.fillColor
				}),
				b
			},
			getCyclic: function(a, b, c) {
				var d, e = this.chart, f = this.userOptions, g = a + "Index", h = a + "Counter", i = c ? c.length : u(e.options.chart[a + "Count"], e[a + "Count"]);
				b || (d = u(f[g], f["_" + g]),
				j(d) || (e.series.length || (e[h] = 0),
				f["_" + g] = d = e[h] % i,
				e[h] += 1),
				c && (b = c[d])),
				void 0 !== d && (this[g] = d),
				this[a] = b
			},
			getColor: function() {
				this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || i[this.type].color, this.chart.options.colors)
			},
			getSymbol: function() {
				this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
			},
			drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
			setData: function(b, c, d, e) {
				var f, g = this, h = g.points, i = h && h.length || 0, j = g.options, l = g.chart, m = null, n = g.xAxis, o = j.turboThreshold, s = this.xData, t = this.yData, v = (f = g.pointArrayMap) && f.length;
				if (b = b || [],
				f = b.length,
				c = u(c, !0),
				!1 !== e && f && i === f && !g.cropped && !g.hasGroupedData && g.visible)
					k(b, function(a, b) {
						h[b].update && a !== j.data[b] && h[b].update(a, !1, null, !1)
					});
				else {
					if (g.xIncrement = null,
					g.colorCounter = 0,
					k(this.parallelArrays, function(a) {
						g[a + "Data"].length = 0
					}),
					o && f > o) {
						for (d = 0; null === m && d < f; )
							m = b[d],
							d++;
						if (q(m))
							for (d = 0; d < f; d++)
								s[d] = this.autoIncrement(),
								t[d] = b[d];
						else if (p(m))
							if (v)
								for (d = 0; d < f; d++)
									m = b[d],
									s[d] = m[0],
									t[d] = m.slice(1, v + 1);
							else
								for (d = 0; d < f; d++)
									m = b[d],
									s[d] = m[0],
									t[d] = m[1];
						else
							a.error(12)
					} else
						for (d = 0; d < f; d++)
							void 0 !== b[d] && (m = {
								series: g
							},
							g.pointClass.prototype.applyOptions.apply(m, [b[d]]),
							g.updateParallelArrays(m, d));
					for (r(t[0]) && a.error(14, !0),
					g.data = [],
					g.options.data = g.userOptions.data = b,
					d = i; d--; )
						h[d] && h[d].destroy && h[d].destroy();
					n && (n.minRange = n.userMinRange),
					g.isDirty = l.isDirtyBox = !0,
					g.isDirtyData = !!h,
					d = !1
				}
				"point" === j.legendType && (this.processData(),
				this.generatePoints()),
				c && l.redraw(d)
			},
			processData: function(b) {
				var c, d = this.xData, e = this.yData, f = d.length;
				c = 0;
				var g, h, i, j = this.xAxis, k = this.options;
				i = k.cropThreshold;
				var l, m, n = this.getExtremesFromAll || k.getExtremesFromAll, o = this.isCartesian, k = j && j.val2lin, p = j && j.isLog;
				if (o && !this.isDirty && !j.isDirty && !this.yAxis.isDirty && !b)
					return !1;
				for (j && (b = j.getExtremes(),
				l = b.min,
				m = b.max),
				o && this.sorted && !n && (!i || f > i || this.forceCrop) && (d[f - 1] < l || d[0] > m ? (d = [],
				e = []) : (d[0] < l || d[f - 1] > m) && (c = this.cropData(this.xData, this.yData, l, m),
				d = c.xData,
				e = c.yData,
				c = c.start,
				g = !0)),
				i = d.length || 1; --i; )
					f = p ? k(d[i]) - k(d[i - 1]) : d[i] - d[i - 1],
					0 < f && (void 0 === h || f < h) ? h = f : 0 > f && this.requireSorting && a.error(15);
				this.cropped = g,
				this.cropStart = c,
				this.processedXData = d,
				this.processedYData = e,
				this.closestPointRange = h
			},
			cropData: function(a, b, c, d) {
				var e, f = a.length, g = 0, h = f, i = u(this.cropShoulder, 1);
				for (e = 0; e < f; e++)
					if (a[e] >= c) {
						g = Math.max(0, e - i);
						break
					}
				for (c = e; c < f; c++)
					if (a[c] > d) {
						h = c + i;
						break
					}
				return {
					xData: a.slice(g, h),
					yData: b.slice(g, h),
					start: g,
					end: h
				}
			},
			generatePoints: function() {
				var a, b, c, d, e = this.options, f = e.data, g = this.data, h = this.processedXData, i = this.processedYData, j = this.pointClass, k = h.length, l = this.cropStart || 0, m = this.hasGroupedData, e = e.keys, n = [];
				for (g || m || (g = [],
				g.length = f.length,
				g = this.data = g),
				e && m && (this.options.keys = !1),
				d = 0; d < k; d++)
					b = l + d,
					m ? (c = (new j).init(this, [h[d]].concat(w(i[d]))),
					c.dataGroup = this.groupMap[d]) : (c = g[b]) || void 0 === f[b] || (g[b] = c = (new j).init(this, f[b], h[d])),
					c && (c.index = b,
					n[d] = c);
				if (this.options.keys = e,
				g && (k !== (a = g.length) || m))
					for (d = 0; d < a; d++)
						d !== l || m || (d += k),
						g[d] && (g[d].destroyElements(),
						g[d].plotX = void 0);
				this.data = g,
				this.points = n
			},
			getExtremes: function(a) {
				var b, c = this.yAxis, f = this.processedXData, g = [], h = 0;
				b = this.xAxis.getExtremes();
				var i, j, k, l, m = b.min, n = b.max;
				for (a = a || this.stackedYData || this.processedYData || [],
				b = a.length,
				l = 0; l < b; l++)
					if (j = f[l],
					k = a[l],
					i = (q(k, !0) || p(k)) && (!c.positiveValuesOnly || k.length || 0 < k),
					j = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (f[l] || j) >= m && (f[l] || j) <= n,
					i && j)
						if (i = k.length)
							for (; i--; )
								null !== k[i] && (g[h++] = k[i]);
						else
							g[h++] = k;
				this.dataMin = e(g),
				this.dataMax = d(g)
			},
			translate: function() {
				this.processedXData || this.processData(),
				this.generatePoints();
				var a, b, c, d, e = this.options, g = e.stacking, h = this.xAxis, i = h.categories, k = this.yAxis, l = this.points, m = l.length, n = !!this.modifyValue, o = e.pointPlacement, p = "between" === o || q(o), r = e.threshold, s = e.startFromThreshold ? r : 0, t = Number.MAX_VALUE;
				for ("between" === o && (o = .5),
				q(o) && (o *= u(e.pointRange || h.pointRange)),
				e = 0; e < m; e++) {
					var v = l[e]
					  , w = v.x
					  , x = v.y;
					b = v.low;
					var y, z = g && k.stacks[(this.negStacks && x < (s ? 0 : r) ? "-" : "") + this.stackKey];
					k.positiveValuesOnly && null !== x && 0 >= x && (v.isNull = !0),
					v.plotX = a = f(Math.min(Math.max(-1e5, h.translate(w, 0, 0, 0, 1, o, "flags" === this.type)), 1e5)),
					g && this.visible && !v.isNull && z && z[w] && (d = this.getStackIndicator(d, w, this.index),
					y = z[w],
					x = y.points[d.key],
					b = x[0],
					x = x[1],
					b === s && d.key === z[w].base && (b = u(r, k.min)),
					k.positiveValuesOnly && 0 >= b && (b = null),
					v.total = v.stackTotal = y.total,
					v.percentage = y.total && v.y / y.total * 100,
					v.stackY = x,
					y.setOffset(this.pointXOffset || 0, this.barW || 0)),
					v.yBottom = j(b) ? k.translate(b, 0, 1, 0, 1) : null,
					n && (x = this.modifyValue(x, v)),
					v.plotY = b = "number" == typeof x && 1 / 0 !== x ? Math.min(Math.max(-1e5, k.translate(x, 0, 1, 0, 1)), 1e5) : void 0,
					v.isInside = void 0 !== b && 0 <= b && b <= k.len && 0 <= a && a <= h.len,
					v.clientX = p ? f(h.translate(w, 0, 0, 0, 1, o)) : a,
					v.negative = v.y < (r || 0),
					v.category = i && void 0 !== i[v.x] ? i[v.x] : v.x,
					v.isNull || (void 0 !== c && (t = Math.min(t, Math.abs(a - c))),
					c = a),
					v.zone = this.zones.length && v.getZone()
				}
				this.closestPointRangePx = t
			},
			getValidPoints: function(a, b) {
				var c = this.chart;
				return o(a || this.points || [], function(a) {
					return !(b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted)) && !a.isNull
				})
			},
			setClip: function(a) {
				var b = this.chart
				  , c = this.options
				  , d = b.renderer
				  , e = b.inverted
				  , f = this.clipBox
				  , g = f || b.clipBox
				  , h = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, c.xAxis, c.yAxis].join()
				  , i = b[h]
				  , j = b[h + "m"];
				i || (a && (g.width = 0,
				b[h + "m"] = j = d.clipRect(-99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight)),
				b[h] = i = d.clipRect(g),
				i.count = {
					length: 0
				}),
				a && !i.count[this.index] && (i.count[this.index] = !0,
				i.count.length += 1),
				!1 !== c.clip && (this.group.clip(a || f ? i : b.clipRect),
				this.markerGroup.clip(j),
				this.sharedClipKey = h),
				a || (i.count[this.index] && (delete i.count[this.index],
				--i.count.length),
				0 === i.count.length && h && b[h] && (f || (b[h] = b[h].destroy()),
				b[h + "m"] && (b[h + "m"] = b[h + "m"].destroy())))
			},
			animate: function(a) {
				var b, d = this.chart, e = c(this.options.animation);
				a ? this.setClip(e) : (b = this.sharedClipKey,
				(a = d[b]) && a.animate({
					width: d.plotSizeX
				}, e),
				d[b + "m"] && d[b + "m"].animate({
					width: d.plotSizeX + 99
				}, e),
				this.animate = null)
			},
			afterAnimate: function() {
				this.setClip(),
				n(this, "afterAnimate"),
				this.finishedAnimating = !0
			},
			drawPoints: function() {
				var a, b, c, d, e, f, g, h, i = this.points, j = this.chart, k = this.options.marker, l = this[this.specialGroup] || this.markerGroup, m = u(k.enabled, !!this.xAxis.isRadial || null, this.closestPointRangePx >= 2 * k.radius);
				if (!1 !== k.enabled || this._hasPointMarkers)
					for (b = 0; b < i.length; b++)
						c = i[b],
						a = c.plotY,
						d = c.graphic,
						e = c.marker || {},
						f = !!c.marker,
						g = m && void 0 === e.enabled || e.enabled,
						h = c.isInside,
						g && q(a) && null !== c.y ? (a = u(e.symbol, this.symbol),
						c.hasImage = 0 === a.indexOf("url"),
						g = this.markerAttribs(c, c.selected && "select"),
						d ? d[h ? "show" : "hide"](!0).animate(g) : h && (0 < g.width || c.hasImage) && (c.graphic = d = j.renderer.symbol(a, g.x, g.y, g.width, g.height, f ? e : k).add(l)),
						d && d.attr(this.pointAttribs(c, c.selected && "select")),
						d && d.addClass(c.getClassName(), !0)) : d && (c.graphic = d.destroy())
			},
			markerAttribs: function(a, b) {
				var c = this.options.marker
				  , d = a.marker || {}
				  , e = u(d.radius, c.radius);
				return b && (c = c.states[b],
				b = d.states && d.states[b],
				e = u(b && b.radius, c && c.radius, e + (c && c.radiusPlus || 0))),
				a.hasImage && (e = 0),
				a = {
					x: Math.floor(a.plotX) - e,
					y: a.plotY - e
				},
				e && (a.width = a.height = 2 * e),
				a
			},
			pointAttribs: function(a, b) {
				var c = this.options.marker
				  , d = a && a.options
				  , e = d && d.marker || {}
				  , f = this.color
				  , g = d && d.color
				  , h = a && a.color
				  , d = u(e.lineWidth, c.lineWidth);
				return a = a && a.zone && a.zone.color,
				f = g || a || h || f,
				a = e.fillColor || c.fillColor || f,
				f = e.lineColor || c.lineColor || f,
				b && (c = c.states[b],
				b = e.states && e.states[b] || {},
				d = u(b.lineWidth, c.lineWidth, d + u(b.lineWidthPlus, c.lineWidthPlus, 0)),
				a = b.fillColor || c.fillColor || a,
				f = b.lineColor || c.lineColor || f),
				{
					stroke: f,
					"stroke-width": d,
					fill: a
				}
			},
			destroy: function() {
				var a, b, c, d, e = this, f = e.chart, g = /AppleWebKit\/533/.test(z.navigator.userAgent), h = e.data || [];
				for (n(e, "destroy"),
				v(e),
				k(e.axisTypes || [], function(a) {
					(d = e[a]) && d.series && (l(d.series, e),
					d.isDirty = d.forceRedraw = !0)
				}),
				e.legendItem && e.chart.legend.destroyItem(e),
				b = h.length; b--; )
					(c = h[b]) && c.destroy && c.destroy();
				e.points = null,
				clearTimeout(e.animationTimeout),
				t(e, function(b, c) {
					b instanceof x && !b.survive && (a = g && "group" === c ? "hide" : "destroy",
					b[a]())
				}),
				f.hoverSeries === e && (f.hoverSeries = null),
				l(f.series, e),
				f.orderSeries(),
				t(e, function(a, b) {
					delete e[b]
				})
			},
			getGraphPath: function(a, b, c) {
				var d, e, f = this, g = f.options, h = g.step, i = [], l = [];
				return a = a || f.points,
				(d = a.reversed) && a.reverse(),
				(h = {
					right: 1,
					center: 2
				}[h] || h && 3) && d && (h = 4 - h),
				!g.connectNulls || b || c || (a = this.getValidPoints(a)),
				k(a, function(d, k) {
					var m = d.plotX
					  , n = d.plotY
					  , o = a[k - 1];
					(d.leftCliff || o && o.rightCliff) && !c && (e = !0),
					d.isNull && !j(b) && 0 < k ? e = !g.connectNulls : d.isNull && !b ? e = !0 : (0 === k || e ? k = ["M", d.plotX, d.plotY] : f.getPointSpline ? k = f.getPointSpline(a, d, k) : h ? (k = 1 === h ? ["L", o.plotX, n] : 2 === h ? ["L", (o.plotX + m) / 2, o.plotY, "L", (o.plotX + m) / 2, n] : ["L", m, o.plotY],
					k.push("L", m, n)) : k = ["L", m, n],
					l.push(d.x),
					h && l.push(d.x),
					i.push.apply(i, k),
					e = !1)
				}),
				i.xMap = l,
				f.graphPath = i
			},
			drawGraph: function() {
				var a = this
				  , b = this.options
				  , c = (this.gappedPath || this.getGraphPath).call(this)
				  , d = [["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]];
				k(this.zones, function(c, e) {
					d.push(["zone-graph-" + e, "highcharts-graph highcharts-zone-graph-" + e + " " + (c.className || ""), c.color || a.color, c.dashStyle || b.dashStyle])
				}),
				k(d, function(d, e) {
					var f = d[0]
					  , g = a[f];
					g ? (g.endX = c.xMap,
					g.animate({
						d: c
					})) : c.length && (a[f] = a.chart.renderer.path(c).addClass(d[1]).attr({
						zIndex: 1
					}).add(a.group),
					g = {
						stroke: d[2],
						"stroke-width": b.lineWidth,
						fill: a.fillGraph && a.color || "none"
					},
					d[3] ? g.dashstyle = d[3] : "square" !== b.linecap && (g["stroke-linecap"] = g["stroke-linejoin"] = "round"),
					g = a[f].attr(g).shadow(2 > e && b.shadow)),
					g && (g.startX = c.xMap,
					g.isArea = c.isArea)
				})
			},
			applyZones: function() {
				var a, b, c, d, e, f, g, h, i, j = this, l = this.chart, m = l.renderer, n = this.zones, o = this.clips || [], p = this.graph, q = this.area, r = Math.max(l.chartWidth, l.chartHeight), s = this[(this.zoneAxis || "y") + "Axis"], t = l.inverted, v = !1;
				n.length && (p || q) && s && void 0 !== s.min && (e = s.reversed,
				f = s.horiz,
				p && p.hide(),
				q && q.hide(),
				d = s.getExtremes(),
				k(n, function(k, n) {
					a = e ? f ? l.plotWidth : 0 : f ? 0 : s.toPixels(d.min),
					a = Math.min(Math.max(u(b, a), 0), r),
					b = Math.min(Math.max(Math.round(s.toPixels(u(k.value, d.max), !0)), 0), r),
					v && (a = b = s.toPixels(d.max)),
					g = Math.abs(a - b),
					h = Math.min(a, b),
					i = Math.max(a, b),
					s.isXAxis ? (c = {
						x: t ? i : h,
						y: 0,
						width: g,
						height: r
					},
					f || (c.x = l.plotHeight - c.x)) : (c = {
						x: 0,
						y: t ? i : h,
						width: r,
						height: g
					},
					f && (c.y = l.plotWidth - c.y)),
					t && m.isVML && (c = s.isXAxis ? {
						x: 0,
						y: e ? h : i,
						height: c.width,
						width: l.chartWidth
					} : {
						x: c.y - l.plotLeft - l.spacingBox.x,
						y: 0,
						width: c.height,
						height: l.chartHeight
					}),
					o[n] ? o[n].animate(c) : (o[n] = m.clipRect(c),
					p && j["zone-graph-" + n].clip(o[n]),
					q && j["zone-area-" + n].clip(o[n])),
					v = k.value > d.max
				}),
				this.clips = o)
			},
			invertGroups: function(a) {
				function c() {
					k(["group", "markerGroup"], function(b) {
						e[b] && (f.renderer.isVML && e[b].attr({
							width: e.yAxis.len,
							height: e.xAxis.len
						}),
						e[b].width = e.yAxis.len,
						e[b].height = e.xAxis.len,
						e[b].invert(a))
					})
				}
				var d, e = this, f = e.chart;
				e.xAxis && (d = b(f, "resize", c),
				b(e, "destroy", d),
				c(a),
				e.invertGroups = c)
			},
			plotGroup: function(a, b, c, d, e) {
				var f = this[a]
				  , g = !f;
				return g && (this[a] = f = this.chart.renderer.g().attr({
					zIndex: d || .1
				}).add(e)),
				f.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || ""), !0),
				f.attr({
					visibility: c
				})[g ? "attr" : "animate"](this.getPlotBox()),
				f
			},
			getPlotBox: function() {
				var a = this.chart
				  , b = this.xAxis
				  , c = this.yAxis;
				return a.inverted && (b = c,
				c = this.xAxis),
				{
					translateX: b ? b.left : a.plotLeft,
					translateY: c ? c.top : a.plotTop,
					scaleX: 1,
					scaleY: 1
				}
			},
			render: function() {
				var a, b = this, d = b.chart, e = b.options, f = !!b.animate && d.renderer.isSVG && c(e.animation).duration, g = b.visible ? "inherit" : "hidden", h = e.zIndex, i = b.hasRendered, j = d.seriesGroup, k = d.inverted;
				a = b.plotGroup("group", "series", g, h, j),
				b.markerGroup = b.plotGroup("markerGroup", "markers", g, h, j),
				f && b.animate(!0),
				a.inverted = !!b.isCartesian && k,
				b.drawGraph && (b.drawGraph(),
				b.applyZones()),
				b.drawDataLabels && b.drawDataLabels(),
				b.visible && b.drawPoints(),
				b.drawTracker && !1 !== b.options.enableMouseTracking && b.drawTracker(),
				b.invertGroups(k),
				!1 === e.clip || b.sharedClipKey || i || a.clip(d.clipRect),
				f && b.animate(),
				i || (b.animationTimeout = y(function() {
					b.afterAnimate()
				}, f)),
				b.isDirty = !1,
				b.hasRendered = !0
			},
			redraw: function() {
				var a = this.chart
				  , b = this.isDirty || this.isDirtyData
				  , c = this.group
				  , d = this.xAxis
				  , e = this.yAxis;
				c && (a.inverted && c.attr({
					width: a.plotWidth,
					height: a.plotHeight
				}),
				c.animate({
					translateX: u(d && d.left, a.plotLeft),
					translateY: u(e && e.top, a.plotTop)
				})),
				this.translate(),
				this.render(),
				b && delete this.kdTree
			},
			kdAxisArray: ["clientX", "plotY"],
			searchPoint: function(a, b) {
				var c = this.xAxis
				  , d = this.yAxis
				  , e = this.chart.inverted;
				return this.searchKDTree({
					clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos,
					plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos
				}, b)
			},
			buildKDTree: function() {
				function a(c, d, e) {
					var f, g;
					if (g = c && c.length)
						return f = b.kdAxisArray[d % e],
						c.sort(function(a, b) {
							return a[f] - b[f]
						}),
						g = Math.floor(g / 2),
						{
							point: c[g],
							left: a(c.slice(0, g), d + 1, e),
							right: a(c.slice(g + 1), d + 1, e)
						}
				}
				this.buildingKdTree = !0;
				var b = this
				  , c = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
				delete b.kdTree,
				y(function() {
					b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c),
					b.buildingKdTree = !1
				}, b.options.kdNow ? 0 : 1)
			},
			searchKDTree: function(a, b) {
				function c(a, b, h, i) {
					var k, l, m = b.point, n = d.kdAxisArray[h % i], o = m;
					return l = j(a[e]) && j(m[e]) ? Math.pow(a[e] - m[e], 2) : null,
					k = j(a[f]) && j(m[f]) ? Math.pow(a[f] - m[f], 2) : null,
					k = (l || 0) + (k || 0),
					m.dist = j(k) ? Math.sqrt(k) : Number.MAX_VALUE,
					m.distX = j(l) ? Math.sqrt(l) : Number.MAX_VALUE,
					n = a[n] - m[n],
					k = 0 > n ? "left" : "right",
					l = 0 > n ? "right" : "left",
					b[k] && (k = c(a, b[k], h + 1, i),
					o = k[g] < o[g] ? k : m),
					b[l] && Math.sqrt(n * n) < o[g] && (a = c(a, b[l], h + 1, i),
					o = a[g] < o[g] ? a : o),
					o
				}
				var d = this
				  , e = this.kdAxisArray[0]
				  , f = this.kdAxisArray[1]
				  , g = b ? "distX" : "dist";
				if (b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1,
				this.kdTree || this.buildingKdTree || this.buildKDTree(),
				this.kdTree)
					return c(a, this.kdTree, b, b)
			}
		})
	}(a),
	function(a) {
		var b = a.Axis
		  , c = a.Chart
		  , d = a.correctFloat
		  , e = a.defined
		  , f = a.destroyObjectProperties
		  , g = a.each
		  , h = a.format
		  , i = a.objectEach
		  , j = a.pick
		  , k = a.Series;
		a.StackItem = function(a, b, c, d, e) {
			var f = a.chart.inverted;
			this.axis = a,
			this.isNegative = c,
			this.options = b,
			this.x = d,
			this.total = null,
			this.points = {},
			this.stack = e,
			this.rightCliff = this.leftCliff = 0,
			this.alignOptions = {
				align: b.align || (f ? c ? "left" : "right" : "center"),
				verticalAlign: b.verticalAlign || (f ? "middle" : c ? "bottom" : "top"),
				y: j(b.y, f ? 4 : c ? 14 : -6),
				x: j(b.x, f ? c ? -6 : 6 : 0)
			},
			this.textAlign = b.textAlign || (f ? c ? "right" : "left" : "center")
		}
		,
		a.StackItem.prototype = {
			destroy: function() {
				f(this, this.axis)
			},
			render: function(a) {
				var b = this.options
				  , c = b.format
				  , c = c ? h(c, this) : b.formatter.call(this);
				this.label ? this.label.attr({
					text: c,
					visibility: "hidden"
				}) : this.label = this.axis.chart.renderer.text(c, null, null, b.useHTML).css(b.style).attr({
					align: this.textAlign,
					rotation: b.rotation,
					visibility: "hidden"
				}).add(a)
			},
			setOffset: function(a, b) {
				var c = this.axis
				  , d = c.chart
				  , e = c.translate(c.usePercentage ? 100 : this.total, 0, 0, 0, 1)
				  , c = c.translate(0)
				  , c = Math.abs(e - c);
				a = d.xAxis[0].translate(this.x) + a,
				e = this.getStackBox(d, this, a, e, b, c),
				(b = this.label) && (b.align(this.alignOptions, null, e),
				e = b.alignAttr,
				b[!1 === this.options.crop || d.isInsidePlot(e.x, e.y) ? "show" : "hide"](!0))
			},
			getStackBox: function(a, b, c, d, e, f) {
				var g = b.axis.reversed
				  , h = a.inverted;
				return a = a.plotHeight,
				b = b.isNegative && !g || !b.isNegative && g,
				{
					x: h ? b ? d : d - f : c,
					y: h ? a - c - e : b ? a - d - f : a - d,
					width: h ? f : e,
					height: h ? e : f
				}
			}
		},
		c.prototype.getStacks = function() {
			var a = this;
			g(a.yAxis, function(a) {
				a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
			}),
			g(a.series, function(b) {
				!b.options.stacking || !0 !== b.visible && !1 !== a.options.chart.ignoreHiddenSeries || (b.stackKey = b.type + j(b.options.stack, ""))
			})
		}
		,
		b.prototype.buildStacks = function() {
			var a, b = this.series, c = j(this.options.reversedStacks, !0), d = b.length;
			if (!this.isXAxis) {
				for (this.usePercentage = !1,
				a = d; a--; )
					b[c ? a : d - a - 1].setStackedPoints();
				if (this.usePercentage)
					for (a = 0; a < d; a++)
						b[a].setPercentStacks()
			}
		}
		,
		b.prototype.renderStackTotals = function() {
			var a = this.chart
			  , b = a.renderer
			  , c = this.stacks
			  , d = this.stackTotalGroup;
			d || (this.stackTotalGroup = d = b.g("stack-labels").attr({
				visibility: "visible",
				zIndex: 6
			}).add()),
			d.translate(a.plotLeft, a.plotTop),
			i(c, function(a) {
				i(a, function(a) {
					a.render(d)
				})
			})
		}
		,
		b.prototype.resetStacks = function() {
			var a = this
			  , b = a.stacks;
			a.isXAxis || i(b, function(b) {
				i(b, function(c, d) {
					c.touched < a.stacksTouched ? (c.destroy(),
					delete b[d]) : (c.total = null,
					c.cum = null)
				})
			})
		}
		,
		b.prototype.cleanStacks = function() {
			var a;
			this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks),
			i(a, function(a) {
				i(a, function(a) {
					a.cum = a.total
				})
			}))
		}
		,
		k.prototype.setStackedPoints = function() {
			if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
				var b, c, f, g, h, i, k, l = this.processedXData, m = this.processedYData, n = [], o = m.length, p = this.options, q = p.threshold, r = p.startFromThreshold ? q : 0, s = p.stack, p = p.stacking, t = this.stackKey, u = "-" + t, v = this.negStacks, w = this.yAxis, x = w.stacks, y = w.oldStacks;
				for (w.stacksTouched += 1,
				h = 0; h < o; h++)
					i = l[h],
					k = m[h],
					b = this.getStackIndicator(b, i, this.index),
					g = b.key,
					f = (c = v && k < (r ? 0 : q)) ? u : t,
					x[f] || (x[f] = {}),
					x[f][i] || (y[f] && y[f][i] ? (x[f][i] = y[f][i],
					x[f][i].total = null) : x[f][i] = new a.StackItem(w,w.options.stackLabels,c,i,s)),
					f = x[f][i],
					null !== k && (f.points[g] = f.points[this.index] = [j(f.cum, r)],
					e(f.cum) || (f.base = g),
					f.touched = w.stacksTouched,
					0 < b.index && !1 === this.singleStacks && (f.points[g][0] = f.points[this.index + "," + i + ",0"][0])),
					"percent" === p ? (c = c ? t : u,
					v && x[c] && x[c][i] ? (c = x[c][i],
					f.total = c.total = Math.max(c.total, f.total) + Math.abs(k) || 0) : f.total = d(f.total + (Math.abs(k) || 0))) : f.total = d(f.total + (k || 0)),
					f.cum = j(f.cum, r) + (k || 0),
					null !== k && (f.points[g].push(f.cum),
					n[h] = f.cum);
				"percent" === p && (w.usePercentage = !0),
				this.stackedYData = n,
				w.oldStacks = {}
			}
		}
		,
		k.prototype.setPercentStacks = function() {
			var a, b = this, c = b.stackKey, e = b.yAxis.stacks, f = b.processedXData;
			g([c, "-" + c], function(c) {
				for (var g, h, i = f.length; i--; )
					g = f[i],
					a = b.getStackIndicator(a, g, b.index, c),
					(g = (h = e[c] && e[c][g]) && h.points[a.key]) && (h = h.total ? 100 / h.total : 0,
					g[0] = d(g[0] * h),
					g[1] = d(g[1] * h),
					b.stackedYData[i] = g[1])
			})
		}
		,
		k.prototype.getStackIndicator = function(a, b, c, d) {
			return !e(a) || a.x !== b || d && a.key !== d ? a = {
				x: b,
				index: 0,
				key: d
			} : a.index++,
			a.key = [c, b, a.index].join(),
			a
		}
	}(a),
	function(a) {
		var b = a.addEvent
		  , c = a.animate
		  , d = a.Axis
		  , e = a.createElement
		  , f = a.css
		  , g = a.defined
		  , h = a.each
		  , i = a.erase
		  , j = a.extend
		  , k = a.fireEvent
		  , l = a.inArray
		  , m = a.isNumber
		  , n = a.isObject
		  , o = a.isArray
		  , p = a.merge
		  , q = a.objectEach
		  , r = a.pick
		  , s = a.Point
		  , t = a.Series
		  , u = a.seriesTypes
		  , v = a.setAnimation
		  , w = a.splat;
		j(a.Chart.prototype, {
			addSeries: function(a, b, c) {
				var d, e = this;
				return a && (b = r(b, !0),
				k(e, "addSeries", {
					options: a
				}, function() {
					d = e.initSeries(a),
					e.isDirtyLegend = !0,
					e.linkSeries(),
					b && e.redraw(c)
				})),
				d
			},
			addAxis: function(a, b, c, e) {
				var f = b ? "xAxis" : "yAxis"
				  , g = this.options;
				return a = p(a, {
					index: this[f].length,
					isX: b
				}),
				b = new d(this,a),
				g[f] = w(g[f] || {}),
				g[f].push(a),
				r(c, !0) && this.redraw(e),
				b
			},
			showLoading: function(a) {
				var d = this
				  , g = d.options
				  , h = d.loadingDiv
				  , i = g.loading
				  , k = function() {
					h && f(h, {
						left: d.plotLeft + "px",
						top: d.plotTop + "px",
						width: d.plotWidth + "px",
						height: d.plotHeight + "px"
					})
				};
				h || (d.loadingDiv = h = e("div", {
					className: "highcharts-loading highcharts-loading-hidden"
				}, null, d.container),
				d.loadingSpan = e("span", {
					className: "highcharts-loading-inner"
				}, null, h),
				b(d, "redraw", k)),
				h.className = "highcharts-loading",
				d.loadingSpan.innerHTML = a || g.lang.loading,
				f(h, j(i.style, {
					zIndex: 10
				})),
				f(d.loadingSpan, i.labelStyle),
				d.loadingShown || (f(h, {
					opacity: 0,
					display: ""
				}),
				c(h, {
					opacity: i.style.opacity || .5
				}, {
					duration: i.showDuration || 0
				})),
				d.loadingShown = !0,
				k()
			},
			hideLoading: function() {
				var a = this.options
				  , b = this.loadingDiv;
				b && (b.className = "highcharts-loading highcharts-loading-hidden",
				c(b, {
					opacity: 0
				}, {
					duration: a.loading.hideDuration || 100,
					complete: function() {
						f(b, {
							display: "none"
						})
					}
				})),
				this.loadingShown = !1
			},
			propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
			propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),
			update: function(a, b, c) {
				var d, e, f = this, i = {
					credits: "addCredits",
					title: "setTitle",
					subtitle: "setSubtitle"
				}, j = a.chart, k = [];
				j && (p(!0, f.options.chart, j),
				"className"in j && f.setClassName(j.className),
				("inverted"in j || "polar"in j) && (f.propFromSeries(),
				d = !0),
				"alignTicks"in j && (d = !0),
				q(j, function(a, b) {
					-1 !== l("chart." + b, f.propsRequireUpdateSeries) && (e = !0),
					-1 !== l(b, f.propsRequireDirtyBox) && (f.isDirtyBox = !0)
				}),
				"style"in j && f.renderer.setStyle(j.style)),
				a.colors && (this.options.colors = a.colors),
				a.plotOptions && p(!0, this.options.plotOptions, a.plotOptions),
				q(a, function(a, b) {
					f[b] && "function" == typeof f[b].update ? f[b].update(a, !1) : "function" == typeof f[i[b]] && f[i[b]](a),
					"chart" !== b && -1 !== l(b, f.propsRequireUpdateSeries) && (e = !0)
				}),
				h("xAxis yAxis zAxis series colorAxis pane".split(" "), function(b) {
					a[b] && (h(w(a[b]), function(a, d) {
						(d = g(a.id) && f.get(a.id) || f[b][d]) && d.coll === b && (d.update(a, !1),
						c && (d.touched = !0)),
						!d && c && ("series" === b ? f.addSeries(a, !1).touched = !0 : "xAxis" !== b && "yAxis" !== b || (f.addAxis(a, "xAxis" === b, !1).touched = !0))
					}),
					c && h(f[b], function(a) {
						a.touched ? delete a.touched : k.push(a)
					}))
				}),
				h(k, function(a) {
					a.remove(!1)
				}),
				d && h(f.axes, function(a) {
					a.update({}, !1)
				}),
				e && h(f.series, function(a) {
					a.update({}, !1)
				}),
				a.loading && p(!0, f.options.loading, a.loading),
				d = j && j.width,
				j = j && j.height,
				m(d) && d !== f.chartWidth || m(j) && j !== f.chartHeight ? f.setSize(d, j) : r(b, !0) && f.redraw()
			},
			setSubtitle: function(a) {
				this.setTitle(void 0, a)
			}
		}),
		j(s.prototype, {
			update: function(a, b, c, d) {
				function e() {
					g.applyOptions(a),
					null === g.y && i && (g.graphic = i.destroy()),
					n(a, !0) && (i && i.element && a && a.marker && void 0 !== a.marker.symbol && (g.graphic = i.destroy()),
					a && a.dataLabels && g.dataLabel && (g.dataLabel = g.dataLabel.destroy())),
					f = g.index,
					h.updateParallelArrays(g, f),
					k.data[f] = n(k.data[f], !0) || n(a, !0) ? g.options : a,
					h.isDirty = h.isDirtyData = !0,
					!h.fixedBox && h.hasCartesianSeries && (j.isDirtyBox = !0),
					"point" === k.legendType && (j.isDirtyLegend = !0),
					b && j.redraw(c)
				}
				var f, g = this, h = g.series, i = g.graphic, j = h.chart, k = h.options;
				b = r(b, !0),
				!1 === d ? e() : g.firePointEvent("update", {
					options: a
				}, e)
			},
			remove: function(a, b) {
				this.series.removePoint(l(this, this.series.data), a, b)
			}
		}),
		j(t.prototype, {
			addPoint: function(a, b, c, d) {
				var e, f, g, h, i = this.options, j = this.data, k = this.chart, l = this.xAxis, l = l && l.hasNames && l.names, m = i.data, n = this.xData;
				if (b = r(b, !0),
				e = {
					series: this
				},
				this.pointClass.prototype.applyOptions.apply(e, [a]),
				h = e.x,
				g = n.length,
				this.requireSorting && h < n[g - 1])
					for (f = !0; g && n[g - 1] > h; )
						g--;
				this.updateParallelArrays(e, "splice", g, 0, 0),
				this.updateParallelArrays(e, g),
				l && e.name && (l[h] = e.name),
				m.splice(g, 0, a),
				f && (this.data.splice(g, 0, null),
				this.processData()),
				"point" === i.legendType && this.generatePoints(),
				c && (j[0] && j[0].remove ? j[0].remove(!1) : (j.shift(),
				this.updateParallelArrays(e, "shift"),
				m.shift())),
				this.isDirtyData = this.isDirty = !0,
				b && k.redraw(d)
			},
			removePoint: function(a, b, c) {
				var d = this
				  , e = d.data
				  , f = e[a]
				  , g = d.points
				  , h = d.chart
				  , i = function() {
					g && g.length === e.length && g.splice(a, 1),
					e.splice(a, 1),
					d.options.data.splice(a, 1),
					d.updateParallelArrays(f || {
						series: d
					}, "splice", a, 1),
					f && f.destroy(),
					d.isDirty = !0,
					d.isDirtyData = !0,
					b && h.redraw()
				};
				v(c, h),
				b = r(b, !0),
				f ? f.firePointEvent("remove", null, i) : i()
			},
			remove: function(a, b, c) {
				function d() {
					e.destroy(),
					f.isDirtyLegend = f.isDirtyBox = !0,
					f.linkSeries(),
					r(a, !0) && f.redraw(b)
				}
				var e = this
				  , f = e.chart;
				!1 !== c ? k(e, "remove", null, d) : d()
			},
			update: function(a, b) {
				var c, d = this, e = d.chart, f = d.userOptions, g = d.oldType || d.type, i = a.type || f.type || e.options.chart.type, k = u[g].prototype, l = ["group", "markerGroup", "dataLabelsGroup", "navigatorSeries", "baseSeries"], m = d.finishedAnimating && {
					animation: !1
				};
				if (Object.keys && "data" === Object.keys(a).toString())
					return this.setData(a.data, b);
				(i && i !== g || void 0 !== a.zIndex) && (l.length = 0),
				h(l, function(a) {
					l[a] = d[a],
					delete d[a]
				}),
				a = p(f, m, {
					index: d.index,
					pointStart: d.xData[0]
				}, {
					data: d.options.data
				}, a),
				d.remove(!1, null, !1);
				for (c in k)
					d[c] = void 0;
				j(d, u[i || g].prototype),
				h(l, function(a) {
					d[a] = l[a]
				}),
				d.init(e, a),
				d.oldType = g,
				e.linkSeries(),
				r(b, !0) && e.redraw(!1)
			}
		}),
		j(d.prototype, {
			update: function(a, b) {
				var c = this.chart;
				a = c.options[this.coll][this.options.index] = p(this.userOptions, a),
				this.destroy(!0),
				this.init(c, j(a, {
					events: void 0
				})),
				c.isDirtyBox = !0,
				r(b, !0) && c.redraw()
			},
			remove: function(a) {
				for (var b = this.chart, c = this.coll, d = this.series, e = d.length; e--; )
					d[e] && d[e].remove(!1);
				i(b.axes, this),
				i(b[c], this),
				o(b.options[c]) ? b.options[c].splice(this.options.index, 1) : delete b.options[c],
				h(b[c], function(a, b) {
					a.options.index = b
				}),
				this.destroy(),
				b.isDirtyBox = !0,
				r(a, !0) && b.redraw()
			},
			setTitle: function(a, b) {
				this.update({
					title: a
				}, b)
			},
			setCategories: function(a, b) {
				this.update({
					categories: a
				}, b)
			}
		})
	}(a),
	function(a) {
		var b = a.color
		  , c = a.each
		  , d = a.map
		  , e = a.pick
		  , f = a.Series;
		(0,
		a.seriesType)("area", "line", {
			softThreshold: !1,
			threshold: 0
		}, {
			singleStacks: !1,
			getStackPoints: function(b) {
				var f, g, h = [], i = [], j = this.xAxis, k = this.yAxis, l = k.stacks[this.stackKey], m = {}, n = this.index, o = k.series, p = o.length, q = e(k.options.reversedStacks, !0) ? 1 : -1;
				if (b = b || this.points,
				this.options.stacking) {
					for (g = 0; g < b.length; g++)
						m[b[g].x] = b[g];
					a.objectEach(l, function(a, b) {
						null !== a.total && i.push(b)
					}),
					i.sort(function(a, b) {
						return a - b
					}),
					f = d(o, function() {
						return this.visible
					}),
					c(i, function(a, b) {
						var d, e, o = 0;
						if (m[a] && !m[a].isNull)
							h.push(m[a]),
							c([-1, 1], function(c) {
								var h = 1 === c ? "rightNull" : "leftNull"
								  , j = 0
								  , k = l[i[b + c]];
								if (k)
									for (g = n; 0 <= g && g < p; )
										d = k.points[g],
										d || (g === n ? m[a][h] = !0 : f[g] && (e = l[a].points[g]) && (j -= e[1] - e[0])),
										g += q;
								m[a][1 === c ? "rightCliff" : "leftCliff"] = j
							});
						else {
							for (g = n; 0 <= g && g < p; ) {
								if (d = l[a].points[g]) {
									o = d[1];
									break
								}
								g += q
							}
							o = k.translate(o, 0, 1, 0, 1),
							h.push({
								isNull: !0,
								plotX: j.translate(a, 0, 0, 0, 1),
								x: a,
								plotY: o,
								yBottom: o
							})
						}
					})
				}
				return h
			},
			getGraphPath: function(a) {
				var b, c, d, g, h = f.prototype.getGraphPath, i = this.options, j = i.stacking, k = this.yAxis, l = [], m = [], n = this.index, o = k.stacks[this.stackKey], p = i.threshold, q = k.getThreshold(i.threshold), i = i.connectNulls || "percent" === j, r = function(b, c, e) {
					var f = a[b];
					b = j && o[f.x].points[n];
					var g = f[e + "Null"] || 0;
					e = f[e + "Cliff"] || 0;
					var h, i, f = !0;
					e || g ? (h = (g ? b[0] : b[1]) + e,
					i = b[0] + e,
					f = !!g) : !j && a[c] && a[c].isNull && (h = i = p),
					void 0 !== h && (m.push({
						plotX: d,
						plotY: null === h ? q : k.getThreshold(h),
						isNull: f,
						isCliff: !0
					}),
					l.push({
						plotX: d,
						plotY: null === i ? q : k.getThreshold(i),
						doCurve: !1
					}))
				};
				for (a = a || this.points,
				j && (a = this.getStackPoints(a)),
				b = 0; b < a.length; b++)
					c = a[b].isNull,
					d = e(a[b].rectPlotX, a[b].plotX),
					g = e(a[b].yBottom, q),
					(!c || i) && (i || r(b, b - 1, "left"),
					c && !j && i || (m.push(a[b]),
					l.push({
						x: b,
						plotX: d,
						plotY: g
					})),
					i || r(b, b + 1, "right"));
				return b = h.call(this, m, !0, !0),
				l.reversed = !0,
				c = h.call(this, l, !0, !0),
				c.length && (c[0] = "L"),
				c = b.concat(c),
				h = h.call(this, m, !1, i),
				c.xMap = b.xMap,
				this.areaPath = c,
				h
			},
			drawGraph: function() {
				this.areaPath = [],
				f.prototype.drawGraph.apply(this);
				var a = this
				  , d = this.areaPath
				  , g = this.options
				  , h = [["area", "highcharts-area", this.color, g.fillColor]];
				c(this.zones, function(b, c) {
					h.push(["zone-area-" + c, "highcharts-area highcharts-zone-area-" + c + " " + b.className, b.color || a.color, b.fillColor || g.fillColor])
				}),
				c(h, function(c) {
					var f = c[0]
					  , h = a[f];
					h ? (h.endX = d.xMap,
					h.animate({
						d: d
					})) : (h = a[f] = a.chart.renderer.path(d).addClass(c[1]).attr({
						fill: e(c[3], b(c[2]).setOpacity(e(g.fillOpacity, .75)).get()),
						zIndex: 0
					}).add(a.group),
					h.isArea = !0),
					h.startX = d.xMap,
					h.shiftUnit = g.step ? 2 : 1
				})
			},
			drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
		})
	}(a),
	function(a) {
		var b = a.pick;
		(a = a.seriesType)("spline", "line", {}, {
			getPointSpline: function(a, c, d) {
				var e = c.plotX
				  , f = c.plotY
				  , g = a[d - 1];
				d = a[d + 1];
				var h, i, j, k;
				if (g && !g.isNull && !1 !== g.doCurve && !c.isCliff && d && !d.isNull && !1 !== d.doCurve && !c.isCliff) {
					a = g.plotY,
					j = d.plotX,
					d = d.plotY;
					var l = 0;
					h = (1.5 * e + g.plotX) / 2.5,
					i = (1.5 * f + a) / 2.5,
					j = (1.5 * e + j) / 2.5,
					k = (1.5 * f + d) / 2.5,
					j !== h && (l = (k - i) * (j - e) / (j - h) + f - k),
					i += l,
					k += l,
					i > a && i > f ? (i = Math.max(a, f),
					k = 2 * f - i) : i < a && i < f && (i = Math.min(a, f),
					k = 2 * f - i),
					k > d && k > f ? (k = Math.max(d, f),
					i = 2 * f - k) : k < d && k < f && (k = Math.min(d, f),
					i = 2 * f - k),
					c.rightContX = j,
					c.rightContY = k
				}
				return c = ["C", b(g.rightContX, g.plotX), b(g.rightContY, g.plotY), b(h, e), b(i, f), e, f],
				g.rightContX = g.rightContY = null,
				c
			}
		})
	}(a),
	function(a) {
		var b = a.seriesTypes.area.prototype;
		(0,
		a.seriesType)("areaspline", "spline", a.defaultPlotOptions.area, {
			getStackPoints: b.getStackPoints,
			getGraphPath: b.getGraphPath,
			drawGraph: b.drawGraph,
			drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
		})
	}(a),
	function(a) {
		var b = a.animObject
		  , c = a.color
		  , d = a.each
		  , e = a.extend
		  , f = a.isNumber
		  , g = a.merge
		  , h = a.pick
		  , i = a.Series
		  , j = a.seriesType
		  , k = a.svg;
		j("column", "line", {
			borderRadius: 0,
			crisp: !0,
			groupPadding: .2,
			marker: null,
			pointPadding: .1,
			minPointLength: 0,
			cropThreshold: 50,
			pointRange: null,
			states: {
				hover: {
					halo: !1,
					brightness: .1,
					shadow: !1
				},
				select: {
					color: "#cccccc",
					borderColor: "#000000",
					shadow: !1
				}
			},
			dataLabels: {
				align: null,
				verticalAlign: null,
				y: null
			},
			softThreshold: !1,
			startFromThreshold: !0,
			stickyTracking: !1,
			tooltip: {
				distance: 6
			},
			threshold: 0,
			borderColor: "#ffffff"
		}, {
			cropShoulder: 0,
			directTouch: !0,
			trackerGroups: ["group", "dataLabelsGroup"],
			negStacks: !0,
			init: function() {
				i.prototype.init.apply(this, arguments);
				var a = this
				  , b = a.chart;
				b.hasRendered && d(b.series, function(b) {
					b.type === a.type && (b.isDirty = !0)
				})
			},
			getColumnMetrics: function() {
				var a, b = this, c = b.options, e = b.xAxis, f = b.yAxis, g = e.reversed, i = {}, j = 0;
				!1 === c.grouping ? j = 1 : d(b.chart.series, function(c) {
					var d, e = c.options, g = c.yAxis;
					c.type !== b.type || !c.visible && b.chart.options.chart.ignoreHiddenSeries || f.len !== g.len || f.pos !== g.pos || (e.stacking ? (a = c.stackKey,
					void 0 === i[a] && (i[a] = j++),
					d = i[a]) : !1 !== e.grouping && (d = j++),
					c.columnIndex = d)
				});
				var k = Math.min(Math.abs(e.transA) * (e.ordinalSlope || c.pointRange || e.closestPointRange || e.tickInterval || 1), e.len)
				  , l = k * c.groupPadding
				  , m = (k - 2 * l) / (j || 1)
				  , c = Math.min(c.maxPointWidth || e.len, h(c.pointWidth, m * (1 - 2 * c.pointPadding)));
				return b.columnMetrics = {
					width: c,
					offset: (m - c) / 2 + (l + ((b.columnIndex || 0) + (g ? 1 : 0)) * m - k / 2) * (g ? -1 : 1)
				},
				b.columnMetrics
			},
			crispCol: function(a, b, c, d) {
				var e = this.chart
				  , f = this.borderWidth
				  , g = -(f % 2 ? .5 : 0)
				  , f = f % 2 ? .5 : 1;
				return e.inverted && e.renderer.isVML && (f += 1),
				this.options.crisp && (c = Math.round(a + c) + g,
				a = Math.round(a) + g,
				c -= a),
				d = Math.round(b + d) + f,
				g = .5 >= Math.abs(b) && .5 < d,
				b = Math.round(b) + f,
				d -= b,
				g && d && (--b,
				d += 1),
				{
					x: a,
					y: b,
					width: c,
					height: d
				}
			},
			translate: function() {
				var a = this
				  , b = a.chart
				  , c = a.options
				  , e = a.dense = 2 > a.closestPointRange * a.xAxis.transA
				  , e = a.borderWidth = h(c.borderWidth, e ? 0 : 1)
				  , f = a.yAxis
				  , g = a.translatedThreshold = f.getThreshold(c.threshold)
				  , j = h(c.minPointLength, 5)
				  , k = a.getColumnMetrics()
				  , l = k.width
				  , m = a.barW = Math.max(l, 1 + 2 * e)
				  , n = a.pointXOffset = k.offset;
				b.inverted && (g -= .5),
				c.pointPadding && (m = Math.ceil(m)),
				i.prototype.translate.apply(a),
				d(a.points, function(c) {
					var d, e = h(c.yBottom, g), i = 999 + Math.abs(e), i = Math.min(Math.max(-i, c.plotY), f.len + i), k = c.plotX + n, o = m, p = Math.min(i, e), q = Math.max(i, e) - p;
					Math.abs(q) < j && j && (q = j,
					d = !f.reversed && !c.negative || f.reversed && c.negative,
					p = Math.abs(p - g) > j ? e - j : g - (d ? j : 0)),
					c.barX = k,
					c.pointWidth = l,
					c.tooltipPos = b.inverted ? [f.len + f.pos - b.plotLeft - i, a.xAxis.len - k - o / 2, q] : [k + o / 2, i + f.pos - b.plotTop, q],
					c.shapeType = "rect",
					c.shapeArgs = a.crispCol.apply(a, c.isNull ? [k, g, o, 0] : [k, p, o, q])
				})
			},
			getSymbol: a.noop,
			drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
			drawGraph: function() {
				this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
			},
			pointAttribs: function(a, b) {
				var d, e = this.options, f = this.pointAttrToOptions || {};
				d = f.stroke || "borderColor";
				var h = f["stroke-width"] || "borderWidth"
				  , i = a && a.color || this.color
				  , j = a[d] || e[d] || this.color || i
				  , k = a[h] || e[h] || this[h] || 0
				  , f = e.dashStyle;
				return a && this.zones.length && (i = a.getZone(),
				i = a.options.color || i && i.color || this.color),
				b && (a = g(e.states[b], a.options.states && a.options.states[b] || {}),
				b = a.brightness,
				i = a.color || void 0 !== b && c(i).brighten(a.brightness).get() || i,
				j = a[d] || j,
				k = a[h] || k,
				f = a.dashStyle || f),
				d = {
					fill: i,
					stroke: j,
					"stroke-width": k
				},
				f && (d.dashstyle = f),
				d
			},
			drawPoints: function() {
				var a, b = this, c = this.chart, e = b.options, h = c.renderer, i = e.animationLimit || 250;
				d(b.points, function(d) {
					var j = d.graphic;
					f(d.plotY) && null !== d.y ? (a = d.shapeArgs,
					j ? j[c.pointCount < i ? "animate" : "attr"](g(a)) : d.graphic = j = h[d.shapeType](a).add(d.group || b.group),
					e.borderRadius && j.attr({
						r: e.borderRadius
					}),
					j.attr(b.pointAttribs(d, d.selected && "select")).shadow(e.shadow, null, e.stacking && !e.borderRadius),
					j.addClass(d.getClassName(), !0)) : j && (d.graphic = j.destroy())
				})
			},
			animate: function(a) {
				var c = this
				  , d = this.yAxis
				  , f = c.options
				  , g = this.chart.inverted
				  , h = {};
				k && (a ? (h.scaleY = .001,
				a = Math.min(d.pos + d.len, Math.max(d.pos, d.toPixels(f.threshold))),
				g ? h.translateX = a - d.len : h.translateY = a,
				c.group.attr(h)) : (h[g ? "translateX" : "translateY"] = d.pos,
				c.group.animate(h, e(b(c.options.animation), {
					step: function(a, b) {
						c.group.attr({
							scaleY: Math.max(.001, b.pos)
						})
					}
				})),
				c.animate = null))
			},
			remove: function() {
				var a = this
				  , b = a.chart;
				b.hasRendered && d(b.series, function(b) {
					b.type === a.type && (b.isDirty = !0)
				}),
				i.prototype.remove.apply(a, arguments)
			}
		})
	}(a),
	function(a) {
		(a = a.seriesType)("bar", "column", null, {
			inverted: !0
		})
	}(a),
	function(a) {
		var b = a.Series;
		(a = a.seriesType)("scatter", "line", {
			lineWidth: 0,
			findNearestPointBy: "xy",
			marker: {
				enabled: !0
			},
			tooltip: {
				headerFormat: '<span style="color:{point.color}">●</span> <span style="font-size: 0.85em"> {series.name}</span><br/>',
				pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
			}
		}, {
			sorted: !1,
			requireSorting: !1,
			noSharedTooltip: !0,
			trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
			takeOrdinalPosition: !1,
			drawGraph: function() {
				this.options.lineWidth && b.prototype.drawGraph.call(this)
			}
		})
	}(a),
	function(a) {
		var b = a.pick
		  , c = a.relativeLength;
		a.CenteredSeriesMixin = {
			getCenter: function() {
				var a, d, e = this.options, f = this.chart, g = 2 * (e.slicedOffset || 0), h = f.plotWidth - 2 * g, f = f.plotHeight - 2 * g, i = e.center, i = [b(i[0], "50%"), b(i[1], "50%"), e.size || "100%", e.innerSize || 0], j = Math.min(h, f);
				for (a = 0; 4 > a; ++a)
					d = i[a],
					e = 2 > a || 2 === a && /%$/.test(d),
					i[a] = c(d, [h, f, j, i[2]][a]) + (e ? g : 0);
				return i[3] > i[2] && (i[3] = i[2]),
				i
			}
		}
	}(a),
	function(a) {
		var b = a.addEvent
		  , c = a.defined
		  , d = a.each
		  , e = a.extend
		  , f = a.inArray
		  , g = a.noop
		  , h = a.pick
		  , i = a.Point
		  , j = a.Series
		  , k = a.seriesType
		  , l = a.setAnimation;
		k("pie", "line", {
			center: [null, null],
			clip: !1,
			colorByPoint: !0,
			dataLabels: {
				distance: 30,
				enabled: !0,
				formatter: function() {
					return this.point.isNull ? void 0 : this.point.name
				},
				x: 0
			},
			ignoreHiddenPoint: !0,
			legendType: "point",
			marker: null,
			size: null,
			showInLegend: !1,
			slicedOffset: 10,
			stickyTracking: !1,
			tooltip: {
				followPointer: !0
			},
			borderColor: "#ffffff",
			borderWidth: 1,
			states: {
				hover: {
					brightness: .1,
					shadow: !1
				}
			}
		}, {
			isCartesian: !1,
			requireSorting: !1,
			directTouch: !0,
			noSharedTooltip: !0,
			trackerGroups: ["group", "dataLabelsGroup"],
			axisTypes: [],
			pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
			animate: function(a) {
				var b = this
				  , c = b.points
				  , e = b.startAngleRad;
				a || (d(c, function(a) {
					var c = a.graphic
					  , d = a.shapeArgs;
					c && (c.attr({
						r: a.startR || b.center[3] / 2,
						start: e,
						end: e
					}),
					c.animate({
						r: d.r,
						start: d.start,
						end: d.end
					}, b.options.animation))
				}),
				b.animate = null)
			},
			updateTotals: function() {
				var a, b, c = 0, d = this.points, e = d.length, f = this.options.ignoreHiddenPoint;
				for (a = 0; a < e; a++)
					b = d[a],
					c += f && !b.visible ? 0 : b.isNull ? 0 : b.y;
				for (this.total = c,
				a = 0; a < e; a++)
					b = d[a],
					b.percentage = 0 < c && (b.visible || !f) ? b.y / c * 100 : 0,
					b.total = c
			},
			generatePoints: function() {
				j.prototype.generatePoints.call(this),
				this.updateTotals()
			},
			translate: function(a) {
				this.generatePoints();
				var b, c, d, e, f, g, i = 0, j = this.options, k = j.slicedOffset, l = k + (j.borderWidth || 0), m = j.startAngle || 0, n = this.startAngleRad = Math.PI / 180 * (m - 90), m = (this.endAngleRad = Math.PI / 180 * (h(j.endAngle, m + 360) - 90)) - n, o = this.points, p = j.dataLabels.distance, j = j.ignoreHiddenPoint, q = o.length;
				for (a || (this.center = a = this.getCenter()),
				this.getX = function(b, c, e) {
					return d = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + e.labelDistance), 1)),
					a[0] + (c ? -1 : 1) * Math.cos(d) * (a[2] / 2 + e.labelDistance)
				}
				,
				f = 0; f < q; f++)
					g = o[f],
					g.labelDistance = h(g.options.dataLabels && g.options.dataLabels.distance, p),
					this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, g.labelDistance),
					b = n + i * m,
					j && !g.visible || (i += g.percentage / 100),
					c = n + i * m,
					g.shapeType = "arc",
					g.shapeArgs = {
						x: a[0],
						y: a[1],
						r: a[2] / 2,
						innerR: a[3] / 2,
						start: Math.round(1e3 * b) / 1e3,
						end: Math.round(1e3 * c) / 1e3
					},
					d = (c + b) / 2,
					d > 1.5 * Math.PI ? d -= 2 * Math.PI : d < -Math.PI / 2 && (d += 2 * Math.PI),
					g.slicedTranslation = {
						translateX: Math.round(Math.cos(d) * k),
						translateY: Math.round(Math.sin(d) * k)
					},
					c = Math.cos(d) * a[2] / 2,
					e = Math.sin(d) * a[2] / 2,
					g.tooltipPos = [a[0] + .7 * c, a[1] + .7 * e],
					g.half = d < -Math.PI / 2 || d > Math.PI / 2 ? 1 : 0,
					g.angle = d,
					b = Math.min(l, g.labelDistance / 5),
					g.labelPos = [a[0] + c + Math.cos(d) * g.labelDistance, a[1] + e + Math.sin(d) * g.labelDistance, a[0] + c + Math.cos(d) * b, a[1] + e + Math.sin(d) * b, a[0] + c, a[1] + e, 0 > g.labelDistance ? "center" : g.half ? "right" : "left", d]
			},
			drawGraph: null,
			drawPoints: function() {
				var a, b, c, f, g = this, h = g.chart.renderer, i = g.options.shadow;
				i && !g.shadowGroup && (g.shadowGroup = h.g("shadow").add(g.group)),
				d(g.points, function(d) {
					if (!d.isNull) {
						b = d.graphic,
						f = d.shapeArgs,
						a = d.getTranslate();
						var j = d.shadowGroup;
						i && !j && (j = d.shadowGroup = h.g("shadow").add(g.shadowGroup)),
						j && j.attr(a),
						c = g.pointAttribs(d, d.selected && "select"),
						b ? b.setRadialReference(g.center).attr(c).animate(e(f, a)) : (d.graphic = b = h[d.shapeType](f).setRadialReference(g.center).attr(a).add(g.group),
						d.visible || b.attr({
							visibility: "hidden"
						}),
						b.attr(c).attr({
							"stroke-linejoin": "round"
						}).shadow(i, j)),
						b.addClass(d.getClassName())
					}
				})
			},
			searchPoint: g,
			sortByAngle: function(a, b) {
				a.sort(function(a, c) {
					return void 0 !== a.angle && (c.angle - a.angle) * b
				})
			},
			drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
			getCenter: a.CenteredSeriesMixin.getCenter,
			getSymbol: g
		}, {
			init: function() {
				i.prototype.init.apply(this, arguments);
				var a, c = this;
				return c.name = h(c.name, "Slice"),
				a = function(a) {
					c.slice("select" === a.type)
				}
				,
				b(c, "select", a),
				b(c, "unselect", a),
				c
			},
			isValid: function() {
				return a.isNumber(this.y, !0) && 0 <= this.y
			},
			setVisible: function(a, b) {
				var c = this
				  , e = c.series
				  , g = e.chart
				  , i = e.options.ignoreHiddenPoint;
				b = h(b, i),
				a !== c.visible && (c.visible = c.options.visible = a = void 0 === a ? !c.visible : a,
				e.options.data[f(c, e.data)] = c.options,
				d(["graphic", "dataLabel", "connector", "shadowGroup"], function(b) {
					c[b] && c[b][a ? "show" : "hide"](!0)
				}),
				c.legendItem && g.legend.colorizeItem(c, a),
				a || "hover" !== c.state || c.setState(""),
				i && (e.isDirty = !0),
				b && g.redraw())
			},
			slice: function(a, b, d) {
				var e = this.series;
				l(d, e.chart),
				h(b, !0),
				this.sliced = this.options.sliced = c(a) ? a : !this.sliced,
				e.options.data[f(this, e.data)] = this.options,
				this.graphic.animate(this.getTranslate()),
				this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
			},
			getTranslate: function() {
				return this.sliced ? this.slicedTranslation : {
					translateX: 0,
					translateY: 0
				}
			},
			haloPath: function(a) {
				var b = this.shapeArgs;
				return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(b.x, b.y, b.r + a, b.r + a, {
					innerR: this.shapeArgs.r,
					start: b.start,
					end: b.end
				})
			}
		})
	}(a),
	function(a) {
		var b = a.addEvent
		  , c = a.arrayMax
		  , d = a.defined
		  , e = a.each
		  , f = a.extend
		  , g = a.format
		  , h = a.map
		  , i = a.merge
		  , j = a.noop
		  , k = a.pick
		  , l = a.relativeLength
		  , m = a.Series
		  , n = a.seriesTypes
		  , o = a.stableSort;
		a.distribute = function(a, b) {
			function c(a, b) {
				return a.target - b.target
			}
			var d, f, g = !0, i = a, j = [];
			for (f = 0,
			d = a.length; d--; )
				f += a[d].size;
			if (f > b) {
				for (o(a, function(a, b) {
					return (b.rank || 0) - (a.rank || 0)
				}),
				f = d = 0; f <= b; )
					f += a[d].size,
					d++;
				j = a.splice(d - 1, a.length)
			}
			for (o(a, c),
			a = h(a, function(a) {
				return {
					size: a.size,
					targets: [a.target]
				}
			}); g; ) {
				for (d = a.length; d--; )
					g = a[d],
					f = (Math.min.apply(0, g.targets) + Math.max.apply(0, g.targets)) / 2,
					g.pos = Math.min(Math.max(0, f - g.size / 2), b - g.size);
				for (d = a.length,
				g = !1; d--; )
					0 < d && a[d - 1].pos + a[d - 1].size > a[d].pos && (a[d - 1].size += a[d].size,
					a[d - 1].targets = a[d - 1].targets.concat(a[d].targets),
					a[d - 1].pos + a[d - 1].size > b && (a[d - 1].pos = b - a[d - 1].size),
					a.splice(d, 1),
					g = !0)
			}
			d = 0,
			e(a, function(a) {
				var b = 0;
				e(a.targets, function() {
					i[d].pos = a.pos + b,
					b += i[d].size,
					d++
				})
			}),
			i.push.apply(i, j),
			o(i, c)
		}
		,
		m.prototype.drawDataLabels = function() {
			var c, f, h, j, l = this, m = l.options, n = m.dataLabels, o = l.points, p = l.hasRendered || 0, q = k(n.defer, !!m.animation), r = l.chart.renderer;
			(n.enabled || l._hasPointLabels) && (l.dlProcessOptions && l.dlProcessOptions(n),
			j = l.plotGroup("dataLabelsGroup", "data-labels", q && !p ? "hidden" : "visible", n.zIndex || 6),
			q && (j.attr({
				opacity: +p
			}),
			p || b(l, "afterAnimate", function() {
				l.visible && j.show(!0),
				j[m.animation ? "animate" : "attr"]({
					opacity: 1
				}, {
					duration: 200
				})
			})),
			f = n,
			e(o, function(b) {
				var e, o, p, q, s = b.dataLabel, t = b.connector, u = !s;
				c = b.dlOptions || b.options && b.options.dataLabels,
				(e = k(c && c.enabled, f.enabled) && null !== b.y) && (n = i(f, c),
				o = b.getLabelConfig(),
				h = n.format ? g(n.format, o) : n.formatter.call(o, n),
				q = n.style,
				o = n.rotation,
				q.color = k(n.color, q.color, l.color, "#000000"),
				"contrast" === q.color && (b.contrastColor = r.getContrast(b.color || l.color),
				q.color = n.inside || 0 > k(b.labelDistance, n.distance) || m.stacking ? b.contrastColor : "#000000"),
				m.cursor && (q.cursor = m.cursor),
				p = {
					fill: n.backgroundColor,
					stroke: n.borderColor,
					"stroke-width": n.borderWidth,
					r: n.borderRadius || 0,
					rotation: o,
					padding: n.padding,
					zIndex: 1
				},
				a.objectEach(p, function(a, b) {
					void 0 === a && delete p[b]
				})),
				!s || e && d(h) ? e && d(h) && (s ? p.text = h : (s = b.dataLabel = r[o ? "text" : "label"](h, 0, -9999, n.shape, null, null, n.useHTML, null, "data-label"),
				s.addClass("highcharts-data-label-color-" + b.colorIndex + " " + (n.className || "") + (n.useHTML ? "highcharts-tracker" : ""))),
				s.attr(p),
				s.css(q).shadow(n.shadow),
				s.added || s.add(j),
				l.alignDataLabel(b, s, n, null, u)) : (b.dataLabel = s = s.destroy(),
				t && (b.connector = t.destroy()))
			}))
		}
		,
		m.prototype.alignDataLabel = function(a, b, c, d, e) {
			var g, h = this.chart, i = h.inverted, j = k(a.plotX, -9999), l = k(a.plotY, -9999), m = b.getBBox(), n = c.rotation, o = c.align, p = this.visible && (a.series.forceDL || h.isInsidePlot(j, Math.round(l), i) || d && h.isInsidePlot(j, i ? d.x + 1 : d.y + d.height - 1, i)), q = "justify" === k(c.overflow, "justify");
			p && (g = c.style.fontSize,
			g = h.renderer.fontMetrics(g, b).b,
			d = f({
				x: i ? this.yAxis.len - l : j,
				y: Math.round(i ? this.xAxis.len - j : l),
				width: 0,
				height: 0
			}, d),
			f(c, {
				width: m.width,
				height: m.height
			}),
			n ? (q = !1,
			j = h.renderer.rotCorr(g, n),
			j = {
				x: d.x + c.x + d.width / 2 + j.x,
				y: d.y + c.y + {
					top: 0,
					middle: .5,
					bottom: 1
				}[c.verticalAlign] * d.height
			},
			b[e ? "attr" : "animate"](j).attr({
				align: o
			}),
			l = (n + 720) % 360,
			l = 180 < l && 360 > l,
			"left" === o ? j.y -= l ? m.height : 0 : "center" === o ? (j.x -= m.width / 2,
			j.y -= m.height / 2) : "right" === o && (j.x -= m.width,
			j.y -= l ? 0 : m.height)) : (b.align(c, null, d),
			j = b.alignAttr),
			q ? a.isLabelJustified = this.justifyDataLabel(b, c, j, m, d, e) : k(c.crop, !0) && (p = h.isInsidePlot(j.x, j.y) && h.isInsidePlot(j.x + m.width, j.y + m.height)),
			c.shape && !n) && b[e ? "attr" : "animate"]({
				anchorX: i ? h.plotWidth - a.plotY : a.plotX,
				anchorY: i ? h.plotHeight - a.plotX : a.plotY
			}),
			p || (b.attr({
				y: -9999
			}),
			b.placed = !1)
		}
		,
		m.prototype.justifyDataLabel = function(a, b, c, d, e, f) {
			var g, h, i = this.chart, j = b.align, k = b.verticalAlign, l = a.box ? 0 : a.padding || 0;
			return g = c.x + l,
			0 > g && ("right" === j ? b.align = "left" : b.x = -g,
			h = !0),
			g = c.x + d.width - l,
			g > i.plotWidth && ("left" === j ? b.align = "right" : b.x = i.plotWidth - g,
			h = !0),
			g = c.y + l,
			0 > g && ("bottom" === k ? b.verticalAlign = "top" : b.y = -g,
			h = !0),
			g = c.y + d.height - l,
			g > i.plotHeight && ("top" === k ? b.verticalAlign = "bottom" : b.y = i.plotHeight - g,
			h = !0),
			h && (a.placed = !f,
			a.align(b, null, e)),
			h
		}
		,
		n.pie && (n.pie.prototype.drawDataLabels = function() {
			var b, f, g, h, i, j, l, n, o, p, q = this, r = q.data, s = q.chart, t = q.options.dataLabels, u = k(t.connectorPadding, 10), v = k(t.connectorWidth, 1), w = s.plotWidth, x = s.plotHeight, y = q.center, z = y[2] / 2, A = y[1], B = [[], []], C = [0, 0, 0, 0];
			q.visible && (t.enabled || q._hasPointLabels) && (e(r, function(a) {
				a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
					width: "auto"
				}).css({
					width: "auto",
					textOverflow: "clip"
				}),
				a.dataLabel.shortened = !1)
			}),
			m.prototype.drawDataLabels.apply(q),
			e(r, function(a) {
				a.dataLabel && a.visible && (B[a.half].push(a),
				a.dataLabel._pos = null)
			}),
			e(B, function(c, f) {
				var m, r, v, B = c.length, D = [];
				if (B)
					for (q.sortByAngle(c, f - .5),
					0 < q.maxLabelDistance && (m = Math.max(0, A - z - q.maxLabelDistance),
					r = Math.min(A + z + q.maxLabelDistance, s.plotHeight),
					e(c, function(a) {
						0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, A - z - a.labelDistance),
						a.bottom = Math.min(A + z + a.labelDistance, s.plotHeight),
						v = a.dataLabel.getBBox().height || 21,
						a.positionsIndex = D.push({
							target: a.labelPos[1] - a.top + v / 2,
							size: v,
							rank: a.y
						}) - 1)
					}),
					a.distribute(D, r + v - m)),
					p = 0; p < B; p++)
						b = c[p],
						r = b.positionsIndex,
						i = b.labelPos,
						g = b.dataLabel,
						o = !1 === b.visible ? "hidden" : "inherit",
						m = i[1],
						D && d(D[r]) ? void 0 === D[r].pos ? o = "hidden" : (j = D[r].size,
						n = b.top + D[r].pos) : n = m,
						delete b.positionIndex,
						l = t.justify ? y[0] + (f ? -1 : 1) * (z + b.labelDistance) : q.getX(n < b.top + 2 || n > b.bottom - 2 ? m : n, f, b),
						g._attr = {
							visibility: o,
							align: i[6]
						},
						g._pos = {
							x: l + t.x + ({
								left: u,
								right: -u
							}[i[6]] || 0),
							y: n + t.y - 10
						},
						i.x = l,
						i.y = n,
						k(t.crop, !0) && (h = g.getBBox().width,
						m = null,
						l - h < u ? (m = Math.round(h - l + u),
						C[3] = Math.max(m, C[3])) : l + h > w - u && (m = Math.round(l + h - w + u),
						C[1] = Math.max(m, C[1])),
						0 > n - j / 2 ? C[0] = Math.max(Math.round(j / 2 - n), C[0]) : n + j / 2 > x && (C[2] = Math.max(Math.round(n + j / 2 - x), C[2])),
						g.sideOverflow = m)
			}),
			0 === c(C) || this.verifyDataLabelOverflow(C)) && (this.placeDataLabels(),
			v && e(this.points, function(a) {
				var b;
				f = a.connector,
				(g = a.dataLabel) && g._pos && a.visible && 0 < a.labelDistance ? (o = g._attr.visibility,
				(b = !f) && (a.connector = f = s.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(q.dataLabelsGroup),
				f.attr({
					"stroke-width": v,
					stroke: t.connectorColor || a.color || "#666666"
				})),
				f[b ? "attr" : "animate"]({
					d: q.connectorPath(a.labelPos)
				}),
				f.attr("visibility", o)) : f && (a.connector = f.destroy())
			}))
		}
		,
		n.pie.prototype.connectorPath = function(a) {
			var b = a.x
			  , c = a.y;
			return k(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
		}
		,
		n.pie.prototype.placeDataLabels = function() {
			e(this.points, function(a) {
				var b = a.dataLabel;
				b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow,
				b.css({
					width: b._attr.width + "px",
					textOverflow: "ellipsis"
				}),
				b.shortened = !0),
				b.attr(b._attr),
				b[b.moved ? "animate" : "attr"](a),
				b.moved = !0) : b && b.attr({
					y: -9999
				}))
			}, this)
		}
		,
		n.pie.prototype.alignDataLabel = j,
		n.pie.prototype.verifyDataLabelOverflow = function(a) {
			var b, c = this.center, d = this.options, e = d.center, f = d.minSize || 80, g = null !== d.size;
			return g || (null !== e[0] ? b = Math.max(c[2] - Math.max(a[1], a[3]), f) : (b = Math.max(c[2] - a[1] - a[3], f),
			c[0] += (a[3] - a[1]) / 2),
			null !== e[1] ? b = Math.max(Math.min(b, c[2] - Math.max(a[0], a[2])), f) : (b = Math.max(Math.min(b, c[2] - a[0] - a[2]), f),
			c[1] += (a[0] - a[2]) / 2),
			b < c[2] ? (c[2] = b,
			c[3] = Math.min(l(d.innerSize || 0, b), b),
			this.translate(c),
			this.drawDataLabels && this.drawDataLabels()) : g = !0),
			g
		}
		),
		n.column && (n.column.prototype.alignDataLabel = function(a, b, c, d, e) {
			var f = this.chart.inverted
			  , g = a.series
			  , h = a.dlBox || a.shapeArgs
			  , j = k(a.below, a.plotY > k(this.translatedThreshold, g.yAxis.len))
			  , l = k(c.inside, !!this.options.stacking);
			h && (d = i(h),
			0 > d.y && (d.height += d.y,
			d.y = 0),
			h = d.y + d.height - g.yAxis.len,
			0 < h && (d.height -= h),
			f && (d = {
				x: g.yAxis.len - d.y - d.height,
				y: g.xAxis.len - d.x - d.width,
				width: d.height,
				height: d.width
			}),
			l || (f ? (d.x += j ? 0 : d.width,
			d.width = 0) : (d.y += j ? d.height : 0,
			d.height = 0))),
			c.align = k(c.align, !f || l ? "center" : j ? "right" : "left"),
			c.verticalAlign = k(c.verticalAlign, f || l ? "middle" : j ? "top" : "bottom"),
			m.prototype.alignDataLabel.call(this, a, b, c, d, e),
			a.isLabelJustified && a.contrastColor && a.dataLabel.css({
				color: a.contrastColor
			})
		}
		)
	}(a),
	function(a) {
		var b = a.Chart
		  , c = a.each
		  , d = a.objectEach
		  , e = a.pick
		  , f = a.addEvent;
		b.prototype.callbacks.push(function(a) {
			function b() {
				var b = [];
				c(a.yAxis || [], function(a) {
					a.options.stackLabels && !a.options.stackLabels.allowOverlap && d(a.stacks, function(a) {
						d(a, function(a) {
							b.push(a.label)
						})
					})
				}),
				c(a.series || [], function(a) {
					var d = a.options.dataLabels
					  , f = a.dataLabelCollections || ["dataLabel"];
					(d.enabled || a._hasPointLabels) && !d.allowOverlap && a.visible && c(f, function(d) {
						c(a.points, function(a) {
							a[d] && (a[d].labelrank = e(a.labelrank, a.shapeArgs && a.shapeArgs.height),
							b.push(a[d]))
						})
					})
				}),
				a.hideOverlappingLabels(b)
			}
			b(),
			f(a, "redraw", b)
		}),
		b.prototype.hideOverlappingLabels = function(a) {
			var b, d, e, f, g, h, i, j, k, l = a.length, m = function(a, b, c, d, e, f, g, h) {
				return !(e > a + c || e + g < a || f > b + d || f + h < b)
			};
			for (d = 0; d < l; d++)
				(b = a[d]) && (b.oldOpacity = b.opacity,
				b.newOpacity = 1,
				b.width || (e = b.getBBox(),
				b.width = e.width,
				b.height = e.height));
			for (a.sort(function(a, b) {
				return (b.labelrank || 0) - (a.labelrank || 0)
			}),
			d = 0; d < l; d++)
				for (e = a[d],
				b = d + 1; b < l; ++b)
					f = a[b],
					e && f && e !== f && e.placed && f.placed && 0 !== e.newOpacity && 0 !== f.newOpacity && (g = e.alignAttr,
					h = f.alignAttr,
					i = e.parentGroup,
					j = f.parentGroup,
					k = 2 * (e.box ? 0 : e.padding || 0),
					g = m(g.x + i.translateX, g.y + i.translateY, e.width - k, e.height - k, h.x + j.translateX, h.y + j.translateY, f.width - k, f.height - k)) && ((e.labelrank < f.labelrank ? e : f).newOpacity = 0);
			c(a, function(a) {
				var b, c;
				a && (c = a.newOpacity,
				a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function() {
					a.hide()
				}
				,
				a.alignAttr.opacity = c,
				a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)),
				a.isOld = !0)
			})
		}
	}(a),
	function(a) {
		var b, c = a.addEvent, d = a.Chart, e = a.createElement, f = a.css, g = a.defaultOptions, h = a.defaultPlotOptions, i = a.each, j = a.extend, k = a.fireEvent, l = a.hasTouch, m = a.inArray, n = a.isObject, o = a.Legend, p = a.merge, q = a.pick, r = a.Point, s = a.Series, t = a.seriesTypes, u = a.svg;
		b = a.TrackerMixin = {
			drawTrackerPoint: function() {
				var a = this
				  , b = a.chart.pointer
				  , c = function(a) {
					var c = b.getPointFromEvent(a);
					void 0 !== c && (b.isDirectTouch = !0,
					c.onMouseOver(a))
				};
				i(a.points, function(a) {
					a.graphic && (a.graphic.element.point = a),
					a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
				}),
				a._hasTracking || (i(a.trackerGroups, function(d) {
					a[d] && (a[d].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function(a) {
						b.onTrackerMouseOut(a)
					}),
					l && a[d].on("touchstart", c),
					a.options.cursor && a[d].css(f).css({
						cursor: a.options.cursor
					}))
				}),
				a._hasTracking = !0)
			},
			drawTrackerGraph: function() {
				var a, b = this, c = b.options, d = c.trackByArea, e = [].concat(d ? b.areaPath : b.graphPath), f = e.length, g = b.chart, h = g.pointer, j = g.renderer, k = g.options.tooltip.snap, m = b.tracker, n = function() {
					g.hoverSeries !== b && b.onMouseOver()
				}, o = "rgba(192,192,192," + (u ? 1e-4 : .002) + ")";
				if (f && !d)
					for (a = f + 1; a--; )
						"M" === e[a] && e.splice(a + 1, 0, e[a + 1] - k, e[a + 2], "L"),
						(a && "M" === e[a] || a === f) && e.splice(a, 0, "L", e[a - 2] + k, e[a - 1]);
				m ? m.attr({
					d: e
				}) : b.graph && (b.tracker = j.path(e).attr({
					"stroke-linejoin": "round",
					visibility: b.visible ? "visible" : "hidden",
					stroke: o,
					fill: d ? o : "none",
					"stroke-width": b.graph.strokeWidth() + (d ? 0 : 2 * k),
					zIndex: 2
				}).add(b.group),
				i([b.tracker, b.markerGroup], function(a) {
					a.addClass("highcharts-tracker").on("mouseover", n).on("mouseout", function(a) {
						h.onTrackerMouseOut(a)
					}),
					c.cursor && a.css({
						cursor: c.cursor
					}),
					l && a.on("touchstart", n)
				}))
			}
		},
		t.column && (t.column.prototype.drawTracker = b.drawTrackerPoint),
		t.pie && (t.pie.prototype.drawTracker = b.drawTrackerPoint),
		t.scatter && (t.scatter.prototype.drawTracker = b.drawTrackerPoint),
		j(o.prototype, {
			setItemEvents: function(a, b, c) {
				var d = this
				  , e = d.chart.renderer.boxWrapper
				  , f = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
				(c ? b : a.legendGroup).on("mouseover", function() {
					a.setState("hover"),
					e.addClass(f),
					b.css(d.options.itemHoverStyle)
				}).on("mouseout", function() {
					b.css(p(a.visible ? d.itemStyle : d.itemHiddenStyle)),
					e.removeClass(f),
					a.setState()
				}).on("click", function(b) {
					var c = function() {
						a.setVisible && a.setVisible()
					};
					b = {
						browserEvent: b
					},
					a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : k(a, "legendItemClick", b, c)
				})
			},
			createCheckboxForItem: function(a) {
				a.checkbox = e("input", {
					type: "checkbox",
					checked: a.selected,
					defaultChecked: a.selected
				}, this.options.itemCheckboxStyle, this.chart.container),
				c(a.checkbox, "click", function(b) {
					k(a.series || a, "checkboxClick", {
						checked: b.target.checked,
						item: a
					}, function() {
						a.select()
					})
				})
			}
		}),
		g.legend.itemStyle.cursor = "pointer",
		j(d.prototype, {
			showResetZoom: function() {
				var a = this
				  , b = g.lang
				  , c = a.options.chart.resetZoomButton
				  , d = c.theme
				  , e = d.states
				  , f = "chart" === c.relativeTo ? null : "plotBox";
				this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function() {
					a.zoomOut()
				}, d, e && e.hover).attr({
					align: c.position.align,
					title: b.resetZoomTitle
				}).addClass("highcharts-reset-zoom").add().align(c.position, !1, f)
			},
			zoomOut: function() {
				var a = this;
				k(a, "selection", {
					resetSelection: !0
				}, function() {
					a.zoom()
				})
			},
			zoom: function(a) {
				var b, c, d = this.pointer, e = !1;
				!a || a.resetSelection ? (i(this.axes, function(a) {
					b = a.zoom()
				}),
				d.initiated = !1) : i(a.xAxis.concat(a.yAxis), function(a) {
					var c = a.axis;
					d[c.isXAxis ? "zoomX" : "zoomY"] && (b = c.zoom(a.min, a.max),
					c.displayBtn && (e = !0))
				}),
				c = this.resetZoomButton,
				e && !c ? this.showResetZoom() : !e && n(c) && (this.resetZoomButton = c.destroy()),
				b && this.redraw(q(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
			},
			pan: function(a, b) {
				var c, d = this, e = d.hoverPoints;
				e && i(e, function(a) {
					a.setState()
				}),
				i("xy" === b ? [1, 0] : [1], function(b) {
					b = d[b ? "xAxis" : "yAxis"][0];
					var e, f = b.horiz, g = a[f ? "chartX" : "chartY"], f = f ? "mouseDownX" : "mouseDownY", h = d[f], i = (b.pointRange || 0) / 2, j = b.getExtremes(), k = b.toValue(h - g, !0) + i, i = b.toValue(h + b.len - g, !0) - i, l = i < k, h = l ? i : k, k = l ? k : i, i = Math.min(j.dataMin, b.toValue(b.toPixels(j.min) - b.minPixelPadding)), l = Math.max(j.dataMax, b.toValue(b.toPixels(j.max) + b.minPixelPadding));
					e = i - h,
					0 < e && (k += e,
					h = i),
					e = k - l,
					0 < e && (k = l,
					h -= e),
					b.series.length && h !== j.min && k !== j.max && (b.setExtremes(h, k, !1, !1, {
						trigger: "pan"
					}),
					c = !0),
					d[f] = g
				}),
				c && d.redraw(!1),
				f(d.container, {
					cursor: "move"
				})
			}
		}),
		j(r.prototype, {
			select: function(a, b) {
				var c = this
				  , d = c.series
				  , e = d.chart;
				a = q(a, !c.selected),
				c.firePointEvent(a ? "select" : "unselect", {
					accumulate: b
				}, function() {
					c.selected = c.options.selected = a,
					d.options.data[m(c, d.data)] = c.options,
					c.setState(a && "select"),
					b || i(e.getSelectedPoints(), function(a) {
						a.selected && a !== c && (a.selected = a.options.selected = !1,
						d.options.data[m(a, d.data)] = a.options,
						a.setState(""),
						a.firePointEvent("unselect"))
					})
				})
			},
			onMouseOver: function(a) {
				var b = this.series.chart
				  , c = b.pointer;
				a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted),
				c.runPointActions(a, this)
			},
			onMouseOut: function() {
				var a = this.series.chart;
				this.firePointEvent("mouseOut"),
				i(a.hoverPoints || [], function(a) {
					a.setState()
				}),
				a.hoverPoints = a.hoverPoint = null
			},
			importEvents: function() {
				if (!this.hasImportedEvents) {
					var b = this
					  , d = p(b.series.options.point, b.options).events;
					b.events = d,
					a.objectEach(d, function(a, d) {
						c(b, d, a)
					}),
					this.hasImportedEvents = !0
				}
			},
			setState: function(a, b) {
				var c, d = Math.floor(this.plotX), e = this.plotY, f = this.series, g = f.options.states[a] || {}, i = h[f.type].marker && f.options.marker, k = i && !1 === i.enabled, l = i && i.states && i.states[a] || {}, m = !1 === l.enabled, n = f.stateMarkerGraphic, o = this.marker || {}, p = f.chart, r = f.halo, s = i && f.markerAttribs;
				(a = a || "") === this.state && !b || this.selected && "select" !== a || !1 === g.enabled || a && (m || k && !1 === l.enabled) || a && o.states && o.states[a] && !1 === o.states[a].enabled || (s && (c = f.markerAttribs(this, a)),
				this.graphic ? (this.state && this.graphic.removeClass("highcharts-point-" + this.state),
				a && this.graphic.addClass("highcharts-point-" + a),
				this.graphic.animate(f.pointAttribs(this, a), q(p.options.chart.animation, g.animation)),
				c && this.graphic.animate(c, q(p.options.chart.animation, l.animation, i.animation)),
				n && n.hide()) : (a && l && (i = o.symbol || f.symbol,
				n && n.currentSymbol !== i && (n = n.destroy()),
				n ? n[b ? "animate" : "attr"]({
					x: c.x,
					y: c.y
				}) : i && (f.stateMarkerGraphic = n = p.renderer.symbol(i, c.x, c.y, c.width, c.height).add(f.markerGroup),
				n.currentSymbol = i),
				n && n.attr(f.pointAttribs(this, a))),
				n && (n[a && p.isInsidePlot(d, e, p.inverted) ? "show" : "hide"](),
				n.element.point = this)),
				(d = g.halo) && d.size ? (r || (f.halo = r = p.renderer.path().add((this.graphic || n).parentGroup)),
				r[b ? "animate" : "attr"]({
					d: this.haloPath(d.size)
				}),
				r.attr({
					class: "highcharts-halo highcharts-color-" + q(this.colorIndex, f.colorIndex)
				}),
				r.point = this,
				r.attr(j({
					fill: this.color || f.color,
					"fill-opacity": d.opacity,
					zIndex: -1
				}, d.attributes))) : r && r.point && r.point.haloPath && r.animate({
					d: r.point.haloPath(0)
				}),
				this.state = a)
			},
			haloPath: function(a) {
				return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
			}
		}),
		j(s.prototype, {
			onMouseOver: function() {
				var a = this.chart
				  , b = a.hoverSeries;
				b && b !== this && b.onMouseOut(),
				this.options.events.mouseOver && k(this, "mouseOver"),
				this.setState("hover"),
				a.hoverSeries = this
			},
			onMouseOut: function() {
				var a = this.options
				  , b = this.chart
				  , c = b.tooltip
				  , d = b.hoverPoint;
				b.hoverSeries = null,
				d && d.onMouseOut(),
				this && a.events.mouseOut && k(this, "mouseOut"),
				!c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide(),
				this.setState()
			},
			setState: function(a) {
				var b = this
				  , c = b.options
				  , d = b.graph
				  , e = c.states
				  , f = c.lineWidth
				  , c = 0;
				if (a = a || "",
				b.state !== a && (i([b.group, b.markerGroup, b.dataLabelsGroup], function(c) {
					c && (b.state && c.removeClass("highcharts-series-" + b.state),
					a && c.addClass("highcharts-series-" + a))
				}),
				b.state = a,
				!e[a] || !1 !== e[a].enabled) && (a && (f = e[a].lineWidth || f + (e[a].lineWidthPlus || 0)),
				d && !d.dashstyle))
					for (f = {
						"stroke-width": f
					},
					d.animate(f, q(b.chart.options.chart.animation, e[a] && e[a].animation)); b["zone-graph-" + c]; )
						b["zone-graph-" + c].attr(f),
						c += 1
			},
			setVisible: function(a, b) {
				var c, d = this, e = d.chart, f = d.legendItem, g = e.options.chart.ignoreHiddenSeries, h = d.visible;
				c = (d.visible = a = d.options.visible = d.userOptions.visible = void 0 === a ? !h : a) ? "show" : "hide",
				i(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function(a) {
					d[a] && d[a][c]()
				}),
				e.hoverSeries !== d && (e.hoverPoint && e.hoverPoint.series) !== d || d.onMouseOut(),
				f && e.legend.colorizeItem(d, a),
				d.isDirty = !0,
				d.options.stacking && i(e.series, function(a) {
					a.options.stacking && a.visible && (a.isDirty = !0)
				}),
				i(d.linkedSeries, function(b) {
					b.setVisible(a, !1)
				}),
				g && (e.isDirtyBox = !0),
				!1 !== b && e.redraw(),
				k(d, c)
			},
			show: function() {
				this.setVisible(!0)
			},
			hide: function() {
				this.setVisible(!1)
			},
			select: function(a) {
				this.selected = a = void 0 === a ? !this.selected : a,
				this.checkbox && (this.checkbox.checked = a),
				k(this, a ? "select" : "unselect")
			},
			drawTracker: b.drawTrackerGraph
		})
	}(a),
	function(a) {
		var b = a.Chart
		  , c = a.each
		  , d = a.inArray
		  , e = a.isArray
		  , f = a.isObject
		  , g = a.pick
		  , h = a.splat;
		b.prototype.setResponsive = function(b) {
			var d = this.options.responsive
			  , e = []
			  , f = this.currentResponsive;
			d && d.rules && c(d.rules, function(c) {
				void 0 === c._id && (c._id = a.uniqueKey()),
				this.matchResponsiveRule(c, e, b)
			}, this);
			var g = a.merge.apply(0, a.map(e, function(b) {
				return a.find(d.rules, function(a) {
					return a._id === b
				}).chartOptions
			}))
			  , e = e.toString() || void 0;
			e !== (f && f.ruleIds) && (f && this.update(f.undoOptions, b),
			e ? (this.currentResponsive = {
				ruleIds: e,
				mergedOptions: g,
				undoOptions: this.currentOptions(g)
			},
			this.update(g, b)) : this.currentResponsive = void 0)
		}
		,
		b.prototype.matchResponsiveRule = function(a, b) {
			var c = a.condition;
			(c.callback || function() {
				return this.chartWidth <= g(c.maxWidth, Number.MAX_VALUE) && this.chartHeight <= g(c.maxHeight, Number.MAX_VALUE) && this.chartWidth >= g(c.minWidth, 0) && this.chartHeight >= g(c.minHeight, 0)
			}
			).call(this) && b.push(a._id)
		}
		,
		b.prototype.currentOptions = function(b) {
			function c(b, g, i, j) {
				var k;
				a.objectEach(b, function(a, l) {
					if (!j && -1 < d(l, ["series", "xAxis", "yAxis"]))
						for (b[l] = h(b[l]),
						i[l] = [],
						k = 0; k < b[l].length; k++)
							g[l][k] && (i[l][k] = {},
							c(a[k], g[l][k], i[l][k], j + 1));
					else
						f(a) ? (i[l] = e(a) ? [] : {},
						c(a, g[l] || {}, i[l], j + 1)) : i[l] = g[l] || null
				})
			}
			var g = {};
			return c(b, this.options, g, 0),
			g
		}
	}(a),
	function(a) {
		var b = a.addEvent
		  , c = a.Axis
		  , d = a.Chart
		  , e = a.css
		  , f = a.dateFormat
		  , g = a.defined
		  , h = a.each
		  , i = a.extend
		  , j = a.noop
		  , k = a.timeUnits
		  , l = a.wrap;
		l(a.Series.prototype, "init", function(a) {
			var c;
			a.apply(this, Array.prototype.slice.call(arguments, 1)),
			(c = this.xAxis) && c.options.ordinal && b(this, "updatedData", function() {
				delete c.ordinalIndex
			})
		}),
		l(c.prototype, "getTimeTicks", function(a, b, c, d, e, h, i, j) {
			var l, m, n, o, p, q = 0, r = {}, s = [], t = -Number.MAX_VALUE, u = this.options.tickPixelInterval;
			if (!this.options.ordinal && !this.options.breaks || !h || 3 > h.length || void 0 === c)
				return a.call(this, b, c, d, e);
			for (o = h.length,
			l = 0; l < o; l++) {
				if (p = l && h[l - 1] > d,
				h[l] < c && (q = l),
				l === o - 1 || h[l + 1] - h[l] > 5 * i || p) {
					if (h[l] > t) {
						for (m = a.call(this, b, h[q], h[l], e); m.length && m[0] <= t; )
							m.shift();
						m.length && (t = m[m.length - 1]),
						s = s.concat(m)
					}
					q = l + 1
				}
				if (p)
					break
			}
			if (a = m.info,
			j && a.unitRange <= k.hour) {
				for (l = s.length - 1,
				q = 1; q < l; q++)
					f("%d", s[q]) !== f("%d", s[q - 1]) && (r[s[q]] = "day",
					n = !0);
				n && (r[s[0]] = "day"),
				a.higherRanks = r
			}
			if (s.info = a,
			j && g(u)) {
				j = a = s.length,
				l = [];
				var v;
				for (n = []; j--; )
					q = this.translate(s[j]),
					v && (n[j] = v - q),
					l[j] = v = q;
				for (n.sort(),
				n = n[Math.floor(n.length / 2)],
				n < .6 * u && (n = null),
				j = s[a - 1] > d ? a - 1 : a,
				v = void 0; j--; )
					q = l[j],
					d = Math.abs(v - q),
					v && d < .8 * u && (null === n || d < .8 * n) ? (r[s[j]] && !r[s[j + 1]] ? (d = j + 1,
					v = q) : d = j,
					s.splice(d, 1)) : v = q
			}
			return s
		}),
		i(c.prototype, {
			beforeSetTickPositions: function() {
				var a, b, c, d = [], e = !1, f = this.getExtremes(), g = f.min, i = f.max, j = this.isXAxis && !!this.options.breaks, f = this.options.ordinal, k = this.chart.options.chart.ignoreHiddenSeries;
				if (f || j) {
					if (h(this.series, function(b, c) {
						if (!(k && !1 === b.visible || !1 === b.takeOrdinalPosition && !j) && (d = d.concat(b.processedXData),
						a = d.length,
						d.sort(function(a, b) {
							return a - b
						}),
						a))
							for (c = a - 1; c--; )
								d[c] === d[c + 1] && d.splice(c, 1)
					}),
					2 < (a = d.length)) {
						for (b = d[1] - d[0],
						c = a - 1; c-- && !e; )
							d[c + 1] - d[c] !== b && (e = !0);
						!this.options.keepOrdinalPadding && (d[0] - g > b || i - d[d.length - 1] > b) && (e = !0)
					}
					e ? (this.ordinalPositions = d,
					b = this.ordinal2lin(Math.max(g, d[0]), !0),
					c = Math.max(this.ordinal2lin(Math.min(i, d[d.length - 1]), !0), 1),
					this.ordinalSlope = i = (i - g) / (c - b),
					this.ordinalOffset = g - b * i) : this.ordinalPositions = this.ordinalSlope = this.ordinalOffset = void 0
				}
				this.isOrdinal = f && e,
				this.groupIntervalFactor = null
			},
			val2lin: function(a, b) {
				var c = this.ordinalPositions;
				if (c) {
					var d, e, f = c.length;
					for (d = f; d--; )
						if (c[d] === a) {
							e = d;
							break
						}
					for (d = f - 1; d--; )
						if (a > c[d] || 0 === d) {
							a = (a - c[d]) / (c[d + 1] - c[d]),
							e = d + a;
							break
						}
					b = b ? e : this.ordinalSlope * (e || 0) + this.ordinalOffset
				} else
					b = a;
				return b
			},
			lin2val: function(a, b) {
				var c = this.ordinalPositions;
				if (c) {
					var d, e = this.ordinalSlope, f = this.ordinalOffset, g = c.length - 1;
					if (b)
						0 > a ? a = c[0] : a > g ? a = c[g] : (g = Math.floor(a),
						d = a - g);
					else
						for (; g--; )
							if (b = e * g + f,
							a >= b) {
								e = e * (g + 1) + f,
								d = (a - b) / (e - b);
								break
							}
					return void 0 !== d && void 0 !== c[g] ? c[g] + (d ? d * (c[g + 1] - c[g]) : 0) : a
				}
				return a
			},
			getExtendedPositions: function() {
				var a, b, d = this.chart, e = this.series[0].currentDataGrouping, f = this.ordinalIndex, g = e ? e.count + e.unitName : "raw", i = this.getExtremes();
				return f || (f = this.ordinalIndex = {}),
				f[g] || (a = {
					series: [],
					chart: d,
					getExtremes: function() {
						return {
							min: i.dataMin,
							max: i.dataMax
						}
					},
					options: {
						ordinal: !0
					},
					val2lin: c.prototype.val2lin,
					ordinal2lin: c.prototype.ordinal2lin
				},
				h(this.series, function(c) {
					b = {
						xAxis: a,
						xData: c.xData,
						chart: d,
						destroyGroupedData: j
					},
					b.options = {
						dataGrouping: e ? {
							enabled: !0,
							forced: !0,
							approximation: "open",
							units: [[e.unitName, [e.count]]]
						} : {
							enabled: !1
						}
					},
					c.processData.apply(b),
					a.series.push(b)
				}),
				this.beforeSetTickPositions.apply(a),
				f[g] = a.ordinalPositions),
				f[g]
			},
			getGroupIntervalFactor: function(a, b, c) {
				var d;
				c = c.processedXData;
				var e = c.length
				  , f = [];
				if (!(d = this.groupIntervalFactor)) {
					for (d = 0; d < e - 1; d++)
						f[d] = c[d + 1] - c[d];
					f.sort(function(a, b) {
						return a - b
					}),
					f = f[Math.floor(e / 2)],
					a = Math.max(a, c[0]),
					b = Math.min(b, c[e - 1]),
					this.groupIntervalFactor = d = e * f / (b - a)
				}
				return d
			},
			postProcessTickInterval: function(a) {
				var b = this.ordinalSlope;
				return b ? this.options.breaks ? this.closestPointRange : a / (b / this.closestPointRange) : a
			}
		}),
		c.prototype.ordinal2lin = c.prototype.val2lin,
		l(d.prototype, "pan", function(a, b) {
			var c = this.xAxis[0]
			  , d = b.chartX
			  , f = !1;
			if (c.options.ordinal && c.series.length) {
				var g, i = this.mouseDownX, j = c.getExtremes(), k = j.dataMax, l = j.min, m = j.max, n = this.hoverPoints, o = c.closestPointRange, i = (i - d) / (c.translationSlope * (c.ordinalSlope || o)), p = {
					ordinalPositions: c.getExtendedPositions()
				}, o = c.lin2val, q = c.val2lin;
				p.ordinalPositions ? 1 < Math.abs(i) && (n && h(n, function(a) {
					a.setState()
				}),
				0 > i ? (n = p,
				g = c.ordinalPositions ? c : p) : (n = c.ordinalPositions ? c : p,
				g = p),
				p = g.ordinalPositions,
				k > p[p.length - 1] && p.push(k),
				this.fixedRange = m - l,
				i = c.toFixedRange(null, null, o.apply(n, [q.apply(n, [l, !0]) + i, !0]), o.apply(g, [q.apply(g, [m, !0]) + i, !0])),
				i.min >= Math.min(j.dataMin, l) && i.max <= Math.max(k, m) && c.setExtremes(i.min, i.max, !0, !1, {
					trigger: "pan"
				}),
				this.mouseDownX = d,
				e(this.container, {
					cursor: "move"
				})) : f = !0
			} else
				f = !0;
			f && a.apply(this, Array.prototype.slice.call(arguments, 1))
		})
	}(a),
	function(a) {
		function b() {
			return Array.prototype.slice.call(arguments, 1)
		}
		function c(a) {
			a.apply(this),
			this.drawBreaks(this.xAxis, ["x"]),
			this.drawBreaks(this.yAxis, d(this.pointArrayMap, ["y"]))
		}
		var d = a.pick
		  , e = a.wrap
		  , f = a.each
		  , g = a.extend
		  , h = a.isArray
		  , i = a.fireEvent
		  , j = a.Axis
		  , k = a.Series;
		g(j.prototype, {
			isInBreak: function(a, b) {
				var c = a.repeat || 1 / 0
				  , d = a.from
				  , e = a.to - a.from;
				return b = b >= d ? (b - d) % c : c - (d - b) % c,
				a.inclusive ? b <= e : b < e && 0 !== b
			},
			isInAnyBreak: function(a, b) {
				var c, e, f, g = this.options.breaks, h = g && g.length;
				if (h) {
					for (; h--; )
						this.isInBreak(g[h], a) && (c = !0,
						e || (e = d(g[h].showPoints, !this.isXAxis)));
					f = c && b ? c && !e : c
				}
				return f
			}
		}),
		e(j.prototype, "setTickPositions", function(a) {
			if (a.apply(this, Array.prototype.slice.call(arguments, 1)),
			this.options.breaks) {
				var b, c = this.tickPositions, d = this.tickPositions.info, e = [];
				for (b = 0; b < c.length; b++)
					this.isInAnyBreak(c[b]) || e.push(c[b]);
				this.tickPositions = e,
				this.tickPositions.info = d
			}
		}),
		e(j.prototype, "init", function(a, b, c) {
			var e = this;
			c.breaks && c.breaks.length && (c.ordinal = !1),
			a.call(this, b, c),
			a = this.options.breaks,
			e.isBroken = h(a) && !!a.length,
			e.isBroken && (e.val2lin = function(a) {
				var b, c, d = a;
				for (c = 0; c < e.breakArray.length; c++)
					if (b = e.breakArray[c],
					b.to <= a)
						d -= b.len;
					else {
						if (b.from >= a)
							break;
						if (e.isInBreak(b, a)) {
							d -= a - b.from;
							break
						}
					}
				return d
			}
			,
			e.lin2val = function(a) {
				var b, c;
				for (c = 0; c < e.breakArray.length && (b = e.breakArray[c],
				!(b.from >= a)); c++)
					b.to < a ? a += b.len : e.isInBreak(b, a) && (a += b.len);
				return a
			}
			,
			e.setExtremes = function(a, b, c, d, e) {
				for (; this.isInAnyBreak(a); )
					a -= this.closestPointRange;
				for (; this.isInAnyBreak(b); )
					b -= this.closestPointRange;
				j.prototype.setExtremes.call(this, a, b, c, d, e)
			}
			,
			e.setAxisTranslation = function(a) {
				j.prototype.setAxisTranslation.call(this, a),
				a = e.options.breaks;
				var b, c, g, h, k = [], l = [], m = 0, n = e.userMin || e.min, o = e.userMax || e.max, p = d(e.pointRangePadding, 0);
				f(a, function(a) {
					c = a.repeat || 1 / 0,
					e.isInBreak(a, n) && (n += a.to % c - n % c),
					e.isInBreak(a, o) && (o -= o % c - a.from % c)
				}),
				f(a, function(a) {
					for (g = a.from,
					c = a.repeat || 1 / 0; g - c > n; )
						g -= c;
					for (; g < n; )
						g += c;
					for (h = g; h < o; h += c)
						k.push({
							value: h,
							move: "in"
						}),
						k.push({
							value: h + (a.to - a.from),
							move: "out",
							size: a.breakSize
						})
				}),
				k.sort(function(a, b) {
					return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value
				}),
				b = 0,
				g = n,
				f(k, function(a) {
					b += "in" === a.move ? 1 : -1,
					1 === b && "in" === a.move && (g = a.value),
					0 === b && (l.push({
						from: g,
						to: a.value,
						len: a.value - g - (a.size || 0)
					}),
					m += a.value - g - (a.size || 0))
				}),
				e.breakArray = l,
				e.unitLength = o - n - m + p,
				i(e, "afterBreaks"),
				e.options.staticScale ? e.transA = e.options.staticScale : e.unitLength && (e.transA *= (o - e.min + p) / e.unitLength),
				p && (e.minPixelPadding = e.transA * e.minPointOffset),
				e.min = n,
				e.max = o
			}
			)
		}),
		e(k.prototype, "generatePoints", function(a) {
			a.apply(this, b(arguments));
			var c, d = this.xAxis, e = this.yAxis, f = this.points, g = f.length, h = this.options.connectNulls;
			if (d && e && (d.options.breaks || e.options.breaks))
				for (; g--; )
					c = f[g],
					null === c.y && !1 === h || !d.isInAnyBreak(c.x, !0) && !e.isInAnyBreak(c.y, !0) || (f.splice(g, 1),
					this.data[g] && this.data[g].destroyElements())
		}),
		a.Series.prototype.drawBreaks = function(a, b) {
			var c, e, g, h, j = this, k = j.points;
			a && f(b, function(b) {
				c = a.breakArray || [],
				e = a.isXAxis ? a.min : d(j.options.threshold, a.min),
				f(k, function(j) {
					h = d(j["stack" + b.toUpperCase()], j[b]),
					f(c, function(b) {
						g = !1,
						e < b.from && h > b.to || e > b.from && h < b.from ? g = "pointBreak" : (e < b.from && h > b.from && h < b.to || e > b.from && h > b.to && h < b.from) && (g = "pointInBreak"),
						g && i(a, g, {
							point: j,
							brk: b
						})
					})
				})
			})
		}
		,
		a.Series.prototype.gappedPath = function() {
			var b, c = this.options.gapSize, d = this.points.slice(), e = d.length - 1, f = this.yAxis;
			if (c && 0 < e)
				for ("value" !== this.options.gapUnit && (c *= this.closestPointRange); e--; )
					d[e + 1].x - d[e].x > c && (b = (d[e].x + d[e + 1].x) / 2,
					d.splice(e + 1, 0, {
						isNull: !0,
						x: b
					}),
					this.options.stacking && (b = f.stacks[this.stackKey][b] = new a.StackItem(f,f.options.stackLabels,!1,b,this.stack),
					b.total = 0));
			return this.getGraphPath(d)
		}
		,
		e(a.seriesTypes.column.prototype, "drawPoints", c),
		e(a.Series.prototype, "drawPoints", c)
	}(a),
	function(a) {
		var b = a.arrayMax
		  , c = a.arrayMin
		  , d = a.Axis
		  , e = a.defaultPlotOptions
		  , f = a.defined
		  , g = a.each
		  , h = a.extend
		  , i = a.format
		  , j = a.isNumber
		  , k = a.merge
		  , l = a.pick
		  , m = a.Point
		  , n = a.Tooltip
		  , o = a.wrap
		  , p = a.Series.prototype
		  , q = p.processData
		  , r = p.generatePoints
		  , s = p.destroy
		  , t = {
			approximation: "average",
			groupPixelWidth: 2,
			dateTimeLabelFormats: {
				millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"],
				second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
				minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
				hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
				day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
				week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
				month: ["%B %Y", "%B", "-%B %Y"],
				year: ["%Y", "%Y", "-%Y"]
			}
		}
		  , u = {
			line: {},
			spline: {},
			area: {},
			areaspline: {},
			column: {
				approximation: "sum",
				groupPixelWidth: 10
			},
			arearange: {
				approximation: "range"
			},
			areasplinerange: {
				approximation: "range"
			},
			columnrange: {
				approximation: "range",
				groupPixelWidth: 10
			},
			candlestick: {
				approximation: "ohlc",
				groupPixelWidth: 10
			},
			ohlc: {
				approximation: "ohlc",
				groupPixelWidth: 5
			}
		}
		  , v = a.defaultDataGroupingUnits = [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1]], ["week", [1]], ["month", [1, 3, 6]], ["year", null]]
		  , w = {
			sum: function(a) {
				var b, c = a.length;
				if (!c && a.hasNulls)
					b = null;
				else if (c)
					for (b = 0; c--; )
						b += a[c];
				return b
			},
			average: function(a) {
				var b = a.length;
				return a = w.sum(a),
				j(a) && b && (a /= b),
				a
			},
			averages: function() {
				var a = [];
				return g(arguments, function(b) {
					a.push(w.average(b))
				}),
				a
			},
			open: function(a) {
				return a.length ? a[0] : a.hasNulls ? null : void 0
			},
			high: function(a) {
				return a.length ? b(a) : a.hasNulls ? null : void 0
			},
			low: function(a) {
				return a.length ? c(a) : a.hasNulls ? null : void 0
			},
			close: function(a) {
				return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0
			},
			ohlc: function(a, b, c, d) {
				if (a = w.open(a),
				b = w.high(b),
				c = w.low(c),
				d = w.close(d),
				j(a) || j(b) || j(c) || j(d))
					return [a, b, c, d]
			},
			range: function(a, b) {
				return a = w.low(a),
				b = w.high(b),
				j(a) || j(b) ? [a, b] : null === a && null === b ? null : void 0
			}
		};
		p.groupData = function(a, b, c, d) {
			var e, f, h = this.data, i = this.options.data, k = [], l = [], m = [], n = a.length, o = !!b, p = [];
			d = "function" == typeof d ? d : w[d] || u[this.type] && w[u[this.type].approximation] || w[t.approximation];
			var q = this.pointArrayMap
			  , r = q && q.length
			  , s = 0;
			f = 0;
			var v, x;
			for (r ? g(q, function() {
				p.push([])
			}) : p.push([]),
			v = r || 1,
			x = 0; x <= n && !(a[x] >= c[0]); x++)
				;
			for (x; x <= n; x++) {
				for (; void 0 !== c[s + 1] && a[x] >= c[s + 1] || x === n; ) {
					for (e = c[s],
					this.dataGroupInfo = {
						start: f,
						length: p[0].length
					},
					f = d.apply(this, p),
					void 0 !== f && (k.push(e),
					l.push(f),
					m.push(this.dataGroupInfo)),
					f = x,
					e = 0; e < v; e++)
						p[e].length = 0,
						p[e].hasNulls = !1;
					if (s += 1,
					x === n)
						break
				}
				if (x === n)
					break;
				if (q) {
					e = this.cropStart + x;
					var y, z = h && h[e] || this.pointClass.prototype.applyOptions.apply({
						series: this
					}, [i[e]]);
					for (e = 0; e < r; e++)
						y = z[q[e]],
						j(y) ? p[e].push(y) : null === y && (p[e].hasNulls = !0)
				} else
					e = o ? b[x] : null,
					j(e) ? p[0].push(e) : null === e && (p[0].hasNulls = !0)
			}
			return [k, l, m]
		}
		,
		p.processData = function() {
			var a, b = this.chart, c = this.options.dataGrouping, d = !1 !== this.allowDG && c && l(c.enabled, b.options.isStock), e = this.visible || !b.options.chart.ignoreHiddenSeries;
			if (this.forceCrop = d,
			this.groupPixelWidth = null,
			this.hasProcessed = !0,
			!1 !== q.apply(this, arguments) && d) {
				this.destroyGroupedData();
				var g = this.processedXData
				  , h = this.processedYData
				  , i = b.plotSizeX
				  , b = this.xAxis
				  , j = b.options.ordinal
				  , k = this.groupPixelWidth = b.getGroupPixelWidth && b.getGroupPixelWidth();
				if (k) {
					this.isDirty = a = !0,
					this.points = null;
					var m = b.getExtremes()
					  , d = m.min
					  , m = m.max
					  , j = j && b.getGroupIntervalFactor(d, m, this) || 1
					  , i = k * (m - d) / i * j
					  , k = b.getTimeTicks(b.normalizeTimeTickInterval(i, c.units || v), Math.min(d, g[0]), Math.max(m, g[g.length - 1]), b.options.startOfWeek, g, this.closestPointRange)
					  , g = p.groupData.apply(this, [g, h, k, c.approximation])
					  , h = g[0]
					  , j = g[1];
					if (c.smoothed) {
						for (c = h.length - 1,
						h[c] = Math.min(h[c], m); c-- && 0 < c; )
							h[c] += i / 2;
						h[0] = Math.max(h[0], d)
					}
					this.currentDataGrouping = k.info,
					this.closestPointRange = k.info.totalRange,
					this.groupMap = g[2],
					f(h[0]) && h[0] < b.dataMin && e && (b.min === b.dataMin && (b.min = h[0]),
					b.dataMin = h[0]),
					this.processedXData = h,
					this.processedYData = j
				} else
					this.currentDataGrouping = this.groupMap = null;
				this.hasGroupedData = a
			}
		}
		,
		p.destroyGroupedData = function() {
			var a = this.groupedData;
			g(a || [], function(b, c) {
				b && (a[c] = b.destroy ? b.destroy() : null)
			}),
			this.groupedData = null
		}
		,
		p.generatePoints = function() {
			r.apply(this),
			this.destroyGroupedData(),
			this.groupedData = this.hasGroupedData ? this.points : null
		}
		,
		o(m.prototype, "update", function(b) {
			this.dataGroup ? a.error(24) : b.apply(this, [].slice.call(arguments, 1))
		}),
		o(n.prototype, "tooltipFooterHeaderFormatter", function(b, c, d) {
			var e, f = c.series, g = f.tooltipOptions, k = f.options.dataGrouping, l = g.xDateFormat, m = f.xAxis, n = a.dateFormat;
			return m && "datetime" === m.options.type && k && j(c.key) ? (b = f.currentDataGrouping,
			k = k.dateTimeLabelFormats,
			b ? (m = k[b.unitName],
			1 === b.count ? l = m[0] : (l = m[1],
			e = m[2])) : !l && k && (l = this.getXDateFormat(c, g, m)),
			l = n(l, c.key),
			e && (l += n(e, c.key + b.totalRange - 1)),
			i(g[(d ? "footer" : "header") + "Format"], {
				point: h(c.point, {
					key: l
				}),
				series: f
			})) : b.call(this, c, d)
		}),
		p.destroy = function() {
			for (var a = this.groupedData || [], b = a.length; b--; )
				a[b] && a[b].destroy();
			s.apply(this)
		}
		,
		o(p, "setOptions", function(a, b) {
			a = a.call(this, b);
			var c = this.type
			  , d = this.chart.options.plotOptions
			  , f = e[c].dataGrouping;
			return u[c] && (f || (f = k(t, u[c])),
			a.dataGrouping = k(f, d.series && d.series.dataGrouping, d[c].dataGrouping, b.dataGrouping)),
			this.chart.options.isStock && (this.requireSorting = !0),
			a
		}),
		o(d.prototype, "setScale", function(a) {
			a.call(this),
			g(this.series, function(a) {
				a.hasProcessed = !1
			})
		}),
		d.prototype.getGroupPixelWidth = function() {
			var a, b, c = this.series, d = c.length, e = 0, f = !1;
			for (a = d; a--; )
				(b = c[a].options.dataGrouping) && (e = Math.max(e, b.groupPixelWidth));
			for (a = d; a--; )
				(b = c[a].options.dataGrouping) && c[a].hasProcessed && (d = (c[a].processedXData || c[a].data).length,
				c[a].groupPixelWidth || d > this.chart.plotSizeX / e || d && b.forced) && (f = !0);
			return f ? e : 0
		}
		,
		d.prototype.setDataGrouping = function(a, b) {
			var c;
			if (b = l(b, !0),
			a || (a = {
				forced: !1,
				units: null
			}),
			this instanceof d)
				for (c = this.series.length; c--; )
					this.series[c].update({
						dataGrouping: a
					}, !1);
			else
				g(this.chart.options.series, function(b) {
					b.dataGrouping = a
				}, !1);
			b && this.chart.redraw()
		}
	}(a),
	function(a) {
		var b = a.each
		  , c = a.Point
		  , d = a.seriesType
		  , e = a.seriesTypes;
		d("ohlc", "column", {
			lineWidth: 1,
			tooltip: {
				pointFormat: '<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>'
			},
			threshold: null,
			states: {
				hover: {
					lineWidth: 3
				}
			},
			stickyTracking: !0
		}, {
			directTouch: !1,
			pointArrayMap: ["open", "high", "low", "close"],
			toYData: function(a) {
				return [a.open, a.high, a.low, a.close]
			},
			pointValKey: "close",
			pointAttrToOptions: {
				stroke: "color",
				"stroke-width": "lineWidth"
			},
			pointAttribs: function(a, b) {
				b = e.column.prototype.pointAttribs.call(this, a, b);
				var c = this.options;
				return delete b.fill,
				!a.options.color && c.upColor && a.open < a.close && (b.stroke = c.upColor),
				b
			},
			translate: function() {
				var a = this
				  , c = a.yAxis
				  , d = !!a.modifyValue
				  , f = ["plotOpen", "plotHigh", "plotLow", "plotClose", "yBottom"];
				e.column.prototype.translate.apply(a),
				b(a.points, function(e) {
					b([e.open, e.high, e.low, e.close, e.low], function(b, g) {
						null !== b && (d && (b = a.modifyValue(b)),
						e[f[g]] = c.toPixels(b, !0))
					}),
					e.tooltipPos[1] = e.plotHigh + c.pos - a.chart.plotTop
				})
			},
			drawPoints: function() {
				var a = this
				  , c = a.chart;
				b(a.points, function(b) {
					var d, e, f, g, h, i = b.graphic, j = !i;
					void 0 !== b.plotY && (i || (b.graphic = i = c.renderer.path().add(a.group)),
					i.attr(a.pointAttribs(b, b.selected && "select")),
					e = i.strokeWidth() % 2 / 2,
					h = Math.round(b.plotX) - e,
					f = Math.round(b.shapeArgs.width / 2),
					g = ["M", h, Math.round(b.yBottom), "L", h, Math.round(b.plotHigh)],
					null !== b.open && (d = Math.round(b.plotOpen) + e,
					g.push("M", h, d, "L", h - f, d)),
					null !== b.close && (d = Math.round(b.plotClose) + e,
					g.push("M", h, d, "L", h + f, d)),
					i[j ? "attr" : "animate"]({
						d: g
					}).addClass(b.getClassName(), !0))
				})
			},
			animate: null
		}, {
			getClassName: function() {
				return c.prototype.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down")
			}
		})
	}(a),
	function(a) {
		var b = a.defaultPlotOptions
		  , c = a.each
		  , d = a.merge
		  , e = a.seriesType
		  , f = a.seriesTypes;
		e("candlestick", "ohlc", d(b.column, {
			states: {
				hover: {
					lineWidth: 2
				}
			},
			tooltip: b.ohlc.tooltip,
			threshold: null,
			lineColor: "#000000",
			lineWidth: 1,
			upColor: "#ffffff",
			stickyTracking: !0
		}), {
			pointAttribs: function(a, b) {
				var c = f.column.prototype.pointAttribs.call(this, a, b)
				  , d = this.options
				  , e = a.open < a.close
				  , g = d.lineColor || this.color;
				return c["stroke-width"] = d.lineWidth,
				c.fill = a.options.color || (e ? d.upColor || this.color : this.color),
				c.stroke = a.lineColor || (e ? d.upLineColor || g : g),
				b && (a = d.states[b],
				c.fill = a.color || c.fill,
				c.stroke = a.lineColor || c.stroke,
				c["stroke-width"] = a.lineWidth || c["stroke-width"]),
				c
			},
			drawPoints: function() {
				var a = this
				  , b = a.chart;
				c(a.points, function(c) {
					var d, e, f, g, h, i, j, k = c.graphic, l = !k;
					void 0 !== c.plotY && (k || (c.graphic = k = b.renderer.path().add(a.group)),
					k.attr(a.pointAttribs(c, c.selected && "select")).shadow(a.options.shadow),
					h = k.strokeWidth() % 2 / 2,
					i = Math.round(c.plotX) - h,
					d = c.plotOpen,
					e = c.plotClose,
					f = Math.min(d, e),
					d = Math.max(d, e),
					j = Math.round(c.shapeArgs.width / 2),
					e = Math.round(f) !== Math.round(c.plotHigh),
					g = d !== c.yBottom,
					f = Math.round(f) + h,
					d = Math.round(d) + h,
					h = [],
					h.push("M", i - j, d, "L", i - j, f, "L", i + j, f, "L", i + j, d, "Z", "M", i, f, "L", i, e ? Math.round(c.plotHigh) : f, "M", i, d, "L", i, g ? Math.round(c.yBottom) : d),
					k[l ? "attr" : "animate"]({
						d: h
					}).addClass(c.getClassName(), !0))
				})
			}
		})
	}(a),
	function(a) {
		var b = a.addEvent
		  , c = a.each
		  , d = a.merge
		  , e = a.noop
		  , f = a.Renderer
		  , g = a.seriesType
		  , h = a.seriesTypes
		  , i = a.TrackerMixin
		  , j = a.VMLRenderer
		  , k = a.SVGRenderer.prototype.symbols
		  , l = a.stableSort;
		g("flags", "column", {
			pointRange: 0,
			shape: "flag",
			stackDistance: 12,
			textAlign: "center",
			tooltip: {
				pointFormat: "{point.text}<br/>"
			},
			threshold: null,
			y: -30,
			fillColor: "#ffffff",
			lineWidth: 1,
			states: {
				hover: {
					lineColor: "#000000",
					fillColor: "#ccd6eb"
				}
			},
			style: {
				fontSize: "11px",
				fontWeight: "bold"
			}
		}, {
			sorted: !1,
			noSharedTooltip: !0,
			allowDG: !1,
			takeOrdinalPosition: !1,
			trackerGroups: ["markerGroup"],
			forceCrop: !0,
			init: a.Series.prototype.init,
			pointAttribs: function(a, b) {
				var c = this.options
				  , d = a && a.color || this.color
				  , e = c.lineColor
				  , f = a && a.lineWidth;
				return a = a && a.fillColor || c.fillColor,
				b && (a = c.states[b].fillColor,
				e = c.states[b].lineColor,
				f = c.states[b].lineWidth),
				{
					fill: a || d,
					stroke: e || d,
					"stroke-width": f || c.lineWidth || 0
				}
			},
			translate: function() {
				h.column.prototype.translate.apply(this);
				var a, b, d = this.options, e = this.chart, f = this.points, g = f.length - 1, i = d.onSeries;
				a = i && e.get(i);
				var j, k, m, d = d.onKey || "y", i = a && a.options.step, n = a && a.points, o = n && n.length, p = this.xAxis, q = this.yAxis, r = p.getExtremes(), s = 0;
				if (a && a.visible && o)
					for (s = (a.pointXOffset || 0) + (a.barW || 0) / 2,
					a = a.currentDataGrouping,
					k = n[o - 1].x + (a ? a.totalRange : 0),
					l(f, function(a, b) {
						return a.x - b.x
					}),
					d = "plot" + d[0].toUpperCase() + d.substr(1); o-- && f[g] && (a = f[g],
					j = n[o],
					!(j.x <= a.x && void 0 !== j[d] && (a.x <= k && (a.plotY = j[d],
					j.x < a.x && !i && (m = n[o + 1]) && void 0 !== m[d] && (a.plotY += (a.x - j.x) / (m.x - j.x) * (m[d] - j[d]))),
					g--,
					o++,
					0 > g))); )
						;
				c(f, function(a, c) {
					var d;
					void 0 === a.plotY && (a.x >= r.min && a.x <= r.max ? a.plotY = e.chartHeight - p.bottom - (p.opposite ? p.height : 0) + p.offset - q.top : a.shapeArgs = {}),
					a.plotX += s,
					(b = f[c - 1]) && b.plotX === a.plotX && (void 0 === b.stackIndex && (b.stackIndex = 0),
					d = b.stackIndex + 1),
					a.stackIndex = d
				})
			},
			drawPoints: function() {
				var b, c, e, f, g, h, i, j, k, l = this.points, m = this.chart, n = m.renderer, o = this.options, p = o.y, q = this.yAxis;
				for (f = l.length; f--; )
					g = l[f],
					k = g.plotX > this.xAxis.len,
					b = g.plotX,
					h = g.stackIndex,
					e = g.options.shape || o.shape,
					c = g.plotY,
					void 0 !== c && (c = g.plotY + p - (void 0 !== h && h * o.stackDistance)),
					i = h ? void 0 : g.plotX,
					j = h ? void 0 : g.plotY,
					h = g.graphic,
					void 0 !== c && 0 <= b && !k ? (h || (h = g.graphic = n.label("", null, null, e, null, null, o.useHTML).attr(this.pointAttribs(g)).css(d(o.style, g.style)).attr({
						align: "flag" === e ? "left" : "center",
						width: o.width,
						height: o.height,
						"text-align": o.textAlign
					}).addClass("highcharts-point").add(this.markerGroup),
					g.graphic.div && (g.graphic.div.point = g),
					h.shadow(o.shadow)),
					0 < b && (b -= h.strokeWidth() % 2),
					h.attr({
						text: g.options.title || o.title || "A",
						x: b,
						y: c,
						anchorX: i,
						anchorY: j
					}),
					g.tooltipPos = m.inverted ? [q.len + q.pos - m.plotLeft - c, this.xAxis.len - b] : [b, c + q.pos - m.plotTop]) : h && (g.graphic = h.destroy());
				o.useHTML && a.wrap(this.markerGroup, "on", function(b) {
					return a.SVGElement.prototype.on.apply(b.apply(this, [].slice.call(arguments, 1)), [].slice.call(arguments, 1))
				})
			},
			drawTracker: function() {
				var a = this.points;
				i.drawTrackerPoint.apply(this),
				c(a, function(d) {
					var e = d.graphic;
					e && b(e.element, "mouseover", function() {
						0 < d.stackIndex && !d.raised && (d._y = e.y,
						e.attr({
							y: d._y - 8
						}),
						d.raised = !0),
						c(a, function(a) {
							a !== d && a.raised && a.graphic && (a.graphic.attr({
								y: a._y
							}),
							a.raised = !1)
						})
					})
				})
			},
			animate: e,
			buildKDTree: e,
			setClip: e
		}),
		k.flag = function(a, b, c, d, e) {
			return ["M", e && e.anchorX || a, e && e.anchorY || b, "L", a, b + d, a, b, a + c, b, a + c, b + d, a, b + d, "Z"]
		}
		,
		c(["circle", "square"], function(a) {
			k[a + "pin"] = function(b, c, d, e, f) {
				var g = f && f.anchorX;
				return f = f && f.anchorY,
				"circle" === a && e > d && (b -= Math.round((e - d) / 2),
				d = e),
				b = k[a](b, c, d, e),
				g && f && b.push("M", g, c > f ? c : c + e, "L", g, f),
				b
			}
		}),
		f === j && c(["flag", "circlepin", "squarepin"], function(a) {
			j.prototype.symbols[a] = k[a]
		})
	}(a),
	function(a) {
		function b(a, b, c) {
			this.init(a, b, c)
		}
		var c, d = a.addEvent, e = a.Axis, f = a.correctFloat, g = a.defaultOptions, h = a.defined, i = a.destroyObjectProperties, j = a.each, k = a.fireEvent, l = a.hasTouch, m = a.isTouchDevice, n = a.merge, o = a.pick, p = a.removeEvent, q = a.wrap, r = {
			height: m ? 20 : 14,
			barBorderRadius: 0,
			buttonBorderRadius: 0,
			liveRedraw: a.svg && !m,
			margin: 10,
			minWidth: 6,
			step: .2,
			zIndex: 3,
			barBackgroundColor: "#cccccc",
			barBorderWidth: 1,
			barBorderColor: "#cccccc",
			buttonArrowColor: "#333333",
			buttonBackgroundColor: "#e6e6e6",
			buttonBorderColor: "#cccccc",
			buttonBorderWidth: 1,
			rifleColor: "#333333",
			trackBackgroundColor: "#f2f2f2",
			trackBorderColor: "#f2f2f2",
			trackBorderWidth: 1
		};
		g.scrollbar = n(!0, r, g.scrollbar),
		a.swapXY = c = function(a, b) {
			var c, d = a.length;
			if (b)
				for (b = 0; b < d; b += 3)
					c = a[b + 1],
					a[b + 1] = a[b + 2],
					a[b + 2] = c;
			return a
		}
		,
		b.prototype = {
			init: function(a, b, c) {
				this.scrollbarButtons = [],
				this.renderer = a,
				this.userOptions = b,
				this.options = n(r, b),
				this.chart = c,
				this.size = o(this.options.size, this.options.height),
				b.enabled && (this.render(),
				this.initEvents(),
				this.addEvents())
			},
			render: function() {
				var a, b = this.renderer, d = this.options, e = this.size;
				this.group = a = b.g("scrollbar").attr({
					zIndex: d.zIndex,
					translateY: -99999
				}).add(),
				this.track = b.rect().addClass("highcharts-scrollbar-track").attr({
					x: 0,
					r: d.trackBorderRadius || 0,
					height: e,
					width: e
				}).add(a),
				this.track.attr({
					fill: d.trackBackgroundColor,
					stroke: d.trackBorderColor,
					"stroke-width": d.trackBorderWidth
				}),
				this.trackBorderWidth = this.track.strokeWidth(),
				this.track.attr({
					y: -this.trackBorderWidth % 2 / 2
				}),
				this.scrollbarGroup = b.g().add(a),
				this.scrollbar = b.rect().addClass("highcharts-scrollbar-thumb").attr({
					height: e,
					width: e,
					r: d.barBorderRadius || 0
				}).add(this.scrollbarGroup),
				this.scrollbarRifles = b.path(c(["M", -3, e / 4, "L", -3, 2 * e / 3, "M", 0, e / 4, "L", 0, 2 * e / 3, "M", 3, e / 4, "L", 3, 2 * e / 3], d.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup),
				this.scrollbar.attr({
					fill: d.barBackgroundColor,
					stroke: d.barBorderColor,
					"stroke-width": d.barBorderWidth
				}),
				this.scrollbarRifles.attr({
					stroke: d.rifleColor,
					"stroke-width": 1
				}),
				this.scrollbarStrokeWidth = this.scrollbar.strokeWidth(),
				this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2),
				this.drawScrollbarButton(0),
				this.drawScrollbarButton(1)
			},
			position: function(a, b, c, d) {
				var e = this.options.vertical
				  , f = 0
				  , g = this.rendered ? "animate" : "attr";
				this.x = a,
				this.y = b + this.trackBorderWidth,
				this.width = c,
				this.xOffset = this.height = d,
				this.yOffset = f,
				e ? (this.width = this.yOffset = c = f = this.size,
				this.xOffset = b = 0,
				this.barWidth = d - 2 * c,
				this.x = a += this.options.margin) : (this.height = this.xOffset = d = b = this.size,
				this.barWidth = c - 2 * d,
				this.y += this.options.margin),
				this.group[g]({
					translateX: a,
					translateY: this.y
				}),
				this.track[g]({
					width: c,
					height: d
				}),
				this.scrollbarButtons[1][g]({
					translateX: e ? 0 : c - b,
					translateY: e ? d - f : 0
				})
			},
			drawScrollbarButton: function(a) {
				var b, d = this.renderer, e = this.scrollbarButtons, f = this.options, g = this.size;
				b = d.g().add(this.group),
				e.push(b),
				b = d.rect().addClass("highcharts-scrollbar-button").add(b),
				b.attr({
					stroke: f.buttonBorderColor,
					"stroke-width": f.buttonBorderWidth,
					fill: f.buttonBackgroundColor
				}),
				b.attr(b.crisp({
					x: -.5,
					y: -.5,
					width: g + 1,
					height: g + 1,
					r: f.buttonBorderRadius
				}, b.strokeWidth())),
				b = d.path(c(["M", g / 2 + (a ? -1 : 1), g / 2 - 3, "L", g / 2 + (a ? -1 : 1), g / 2 + 3, "L", g / 2 + (a ? 2 : -2), g / 2], f.vertical)).addClass("highcharts-scrollbar-arrow").add(e[a]),
				b.attr({
					fill: f.buttonArrowColor
				})
			},
			setRange: function(a, b) {
				var c, d, e = this.options, g = e.vertical, i = e.minWidth, j = this.barWidth, k = this.rendered && !this.hasDragged ? "animate" : "attr";
				h(j) && (a = Math.max(a, 0),
				c = Math.ceil(j * a),
				this.calculatedWidth = d = f(j * Math.min(b, 1) - c),
				d < i && (c = (j - i + d) * a,
				d = i),
				i = Math.floor(c + this.xOffset + this.yOffset),
				j = d / 2 - .5,
				this.from = a,
				this.to = b,
				g ? (this.scrollbarGroup[k]({
					translateY: i
				}),
				this.scrollbar[k]({
					height: d
				}),
				this.scrollbarRifles[k]({
					translateY: j
				}),
				this.scrollbarTop = i,
				this.scrollbarLeft = 0) : (this.scrollbarGroup[k]({
					translateX: i
				}),
				this.scrollbar[k]({
					width: d
				}),
				this.scrollbarRifles[k]({
					translateX: j
				}),
				this.scrollbarLeft = i,
				this.scrollbarTop = 0),
				12 >= d ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0),
				!1 === e.showFull && (0 >= a && 1 <= b ? this.group.hide() : this.group.show()),
				this.rendered = !0)
			},
			initEvents: function() {
				var a = this;
				a.mouseMoveHandler = function(b) {
					var c = a.chart.pointer.normalize(b)
					  , d = a.options.vertical ? "chartY" : "chartX"
					  , e = a.initPositions;
					!a.grabbedCenter || b.touches && 0 === b.touches[0][d] || (c = a.cursorToScrollbarPosition(c)[d],
					d = a[d],
					d = c - d,
					a.hasDragged = !0,
					a.updatePosition(e[0] + d, e[1] + d),
					a.hasDragged && k(a, "changed", {
						from: a.from,
						to: a.to,
						trigger: "scrollbar",
						DOMType: b.type,
						DOMEvent: b
					}))
				}
				,
				a.mouseUpHandler = function(b) {
					a.hasDragged && k(a, "changed", {
						from: a.from,
						to: a.to,
						trigger: "scrollbar",
						DOMType: b.type,
						DOMEvent: b
					}),
					a.grabbedCenter = a.hasDragged = a.chartX = a.chartY = null
				}
				,
				a.mouseDownHandler = function(b) {
					b = a.chart.pointer.normalize(b),
					b = a.cursorToScrollbarPosition(b),
					a.chartX = b.chartX,
					a.chartY = b.chartY,
					a.initPositions = [a.from, a.to],
					a.grabbedCenter = !0
				}
				,
				a.buttonToMinClick = function(b) {
					var c = f(a.to - a.from) * a.options.step;
					a.updatePosition(f(a.from - c), f(a.to - c)),
					k(a, "changed", {
						from: a.from,
						to: a.to,
						trigger: "scrollbar",
						DOMEvent: b
					})
				}
				,
				a.buttonToMaxClick = function(b) {
					var c = (a.to - a.from) * a.options.step;
					a.updatePosition(a.from + c, a.to + c),
					k(a, "changed", {
						from: a.from,
						to: a.to,
						trigger: "scrollbar",
						DOMEvent: b
					})
				}
				,
				a.trackClick = function(b) {
					var c = a.chart.pointer.normalize(b)
					  , d = a.to - a.from
					  , e = a.y + a.scrollbarTop
					  , f = a.x + a.scrollbarLeft;
					a.options.vertical && c.chartY > e || !a.options.vertical && c.chartX > f ? a.updatePosition(a.from + d, a.to + d) : a.updatePosition(a.from - d, a.to - d),
					k(a, "changed", {
						from: a.from,
						to: a.to,
						trigger: "scrollbar",
						DOMEvent: b
					})
				}
			},
			cursorToScrollbarPosition: function(a) {
				var b = this.options
				  , b = b.minWidth > this.calculatedWidth ? b.minWidth : 0;
				return {
					chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - b),
					chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - b)
				}
			},
			updatePosition: function(a, b) {
				1 < b && (a = f(1 - f(b - a)),
				b = 1),
				0 > a && (b = f(b - a),
				a = 0),
				this.from = a,
				this.to = b
			},
			update: function(a) {
				this.destroy(),
				this.init(this.chart.renderer, n(!0, this.options, a), this.chart)
			},
			addEvents: function() {
				var a = this.options.inverted ? [1, 0] : [0, 1]
				  , b = this.scrollbarButtons
				  , c = this.scrollbarGroup.element
				  , e = this.mouseDownHandler
				  , f = this.mouseMoveHandler
				  , g = this.mouseUpHandler
				  , a = [[b[a[0]].element, "click", this.buttonToMinClick], [b[a[1]].element, "click", this.buttonToMaxClick], [this.track.element, "click", this.trackClick], [c, "mousedown", e], [c.ownerDocument, "mousemove", f], [c.ownerDocument, "mouseup", g]];
				l && a.push([c, "touchstart", e], [c.ownerDocument, "touchmove", f], [c.ownerDocument, "touchend", g]),
				j(a, function(a) {
					d.apply(null, a)
				}),
				this._events = a
			},
			removeEvents: function() {
				j(this._events, function(a) {
					p.apply(null, a)
				}),
				this._events.length = 0
			},
			destroy: function() {
				var a = this.chart.scroller;
				this.removeEvents(),
				j(["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"], function(a) {
					this[a] && this[a].destroy && (this[a] = this[a].destroy())
				}, this),
				a && this === a.scrollbar && (a.scrollbar = null,
				i(a.scrollbarButtons))
			}
		},
		q(e.prototype, "init", function(a) {
			var c = this;
			a.apply(c, Array.prototype.slice.call(arguments, 1)),
			c.options.scrollbar && c.options.scrollbar.enabled && (c.options.scrollbar.vertical = !c.horiz,
			c.options.startOnTick = c.options.endOnTick = !1,
			c.scrollbar = new b(c.chart.renderer,c.options.scrollbar,c.chart),
			d(c.scrollbar, "changed", function(a) {
				var b, d = Math.min(o(c.options.min, c.min), c.min, c.dataMin), e = Math.max(o(c.options.max, c.max), c.max, c.dataMax) - d;
				c.horiz && !c.reversed || !c.horiz && c.reversed ? (b = d + e * this.to,
				d += e * this.from) : (b = d + e * (1 - this.from),
				d += e * (1 - this.to)),
				c.setExtremes(d, b, !0, !1, a)
			}))
		}),
		q(e.prototype, "render", function(a) {
			var b = Math.min(o(this.options.min, this.min), this.min, o(this.dataMin, this.min))
			  , c = Math.max(o(this.options.max, this.max), this.max, o(this.dataMax, this.max))
			  , d = this.scrollbar
			  , e = this.titleOffset || 0;
			a.apply(this, Array.prototype.slice.call(arguments, 1)),
			d && (this.horiz ? (d.position(this.left, this.top + this.height + 2 + this.chart.scrollbarsOffsets[1] + (this.opposite ? 0 : e + this.axisTitleMargin + this.offset), this.width, this.height),
			e = 1) : (d.position(this.left + this.width + 2 + this.chart.scrollbarsOffsets[0] + (this.opposite ? e + this.axisTitleMargin + this.offset : 0), this.top, this.width, this.height),
			e = 0),
			(!this.opposite && !this.horiz || this.opposite && this.horiz) && (this.chart.scrollbarsOffsets[e] += this.scrollbar.size + this.scrollbar.options.margin),
			isNaN(b) || isNaN(c) || !h(this.min) || !h(this.max) ? d.setRange(0, 0) : (e = (this.min - b) / (c - b),
			b = (this.max - b) / (c - b),
			this.horiz && !this.reversed || !this.horiz && this.reversed ? d.setRange(e, b) : d.setRange(1 - b, 1 - e)))
		}),
		q(e.prototype, "getOffset", function(a) {
			var b = this.horiz ? 2 : 1
			  , c = this.scrollbar;
			a.apply(this, Array.prototype.slice.call(arguments, 1)),
			c && (this.chart.scrollbarsOffsets = [0, 0],
			this.chart.axisOffset[b] += c.size + c.options.margin)
		}),
		q(e.prototype, "destroy", function(a) {
			this.scrollbar && (this.scrollbar = this.scrollbar.destroy()),
			a.apply(this, Array.prototype.slice.call(arguments, 1))
		}),
		a.Scrollbar = b
	}(a),
	function(a) {
		function b(a) {
			this.init(a)
		}
		var c = a.addEvent
		  , d = a.Axis
		  , e = a.Chart
		  , f = a.color
		  , g = a.defaultOptions
		  , h = a.defined
		  , i = a.destroyObjectProperties
		  , j = a.each
		  , k = a.erase
		  , l = a.error
		  , m = a.extend
		  , n = a.grep
		  , o = a.hasTouch
		  , p = a.isArray
		  , q = a.isNumber
		  , r = a.isObject
		  , s = a.merge
		  , t = a.pick
		  , u = a.removeEvent
		  , v = a.Scrollbar
		  , w = a.Series
		  , x = a.seriesTypes
		  , y = a.wrap
		  , z = a.swapXY
		  , A = [].concat(a.defaultDataGroupingUnits)
		  , B = function(a) {
			var b = n(arguments, q);
			if (b.length)
				return Math[a].apply(0, b)
		};
		A[4] = ["day", [1, 2, 3, 4]],
		A[5] = ["week", [1, 2, 3]],
		x = void 0 === x.areaspline ? "line" : "areaspline",
		m(g, {
			navigator: {
				height: 40,
				margin: 25,
				maskInside: !0,
				handles: {
					backgroundColor: "#f2f2f2",
					borderColor: "#999999"
				},
				maskFill: f("#6685c2").setOpacity(.3).get(),
				outlineColor: "#cccccc",
				outlineWidth: 1,
				series: {
					type: x,
					color: "#335cad",
					fillOpacity: .05,
					lineWidth: 1,
					compare: null,
					dataGrouping: {
						approximation: "average",
						enabled: !0,
						groupPixelWidth: 2,
						smoothed: !0,
						units: A
					},
					dataLabels: {
						enabled: !1,
						zIndex: 2
					},
					id: "highcharts-navigator-series",
					className: "highcharts-navigator-series",
					lineColor: null,
					marker: {
						enabled: !1
					},
					pointRange: 0,
					shadow: !1,
					threshold: null
				},
				xAxis: {
					className: "highcharts-navigator-xaxis",
					tickLength: 0,
					lineWidth: 0,
					gridLineColor: "#e6e6e6",
					gridLineWidth: 1,
					tickPixelInterval: 200,
					labels: {
						align: "left",
						style: {
							color: "#999999"
						},
						x: 3,
						y: -4
					},
					crosshair: !1
				},
				yAxis: {
					className: "highcharts-navigator-yaxis",
					gridLineWidth: 0,
					startOnTick: !1,
					endOnTick: !1,
					minPadding: .1,
					maxPadding: .1,
					labels: {
						enabled: !1
					},
					crosshair: !1,
					title: {
						text: null
					},
					tickLength: 0,
					tickWidth: 0
				}
			}
		}),
		b.prototype = {
			drawHandle: function(a, b, c, d) {
				this.handles[b][d](c ? {
					translateX: Math.round(this.left + this.height / 2 - 8),
					translateY: Math.round(this.top + parseInt(a, 10) + .5)
				} : {
					translateX: Math.round(this.left + parseInt(a, 10)),
					translateY: Math.round(this.top + this.height / 2 - 8)
				})
			},
			getHandlePath: function(a) {
				return z(["M", -4.5, .5, "L", 3.5, .5, "L", 3.5, 15.5, "L", -4.5, 15.5, "L", -4.5, .5, "M", -1.5, 4, "L", -1.5, 12, "M", .5, 4, "L", .5, 12], a)
			},
			drawOutline: function(a, b, c, d) {
				var e = this.navigatorOptions.maskInside
				  , f = this.outline.strokeWidth()
				  , g = f / 2
				  , f = f % 2 / 2
				  , h = this.outlineHeight
				  , i = this.scrollbarHeight
				  , j = this.size
				  , k = this.left - i
				  , l = this.top;
				c ? (k -= g,
				c = l + b + f,
				b = l + a + f,
				a = ["M", k + h, l - i - f, "L", k + h, c, "L", k, c, "L", k, b, "L", k + h, b, "L", k + h, l + j + i].concat(e ? ["M", k + h, c - g, "L", k + h, b + g] : [])) : (a += k + i - f,
				b += k + i - f,
				l += g,
				a = ["M", k, l, "L", a, l, "L", a, l + h, "L", b, l + h, "L", b, l, "L", k + j + 2 * i, l].concat(e ? ["M", a - g, l, "L", b + g, l] : [])),
				this.outline[d]({
					d: a
				})
			},
			drawMasks: function(a, b, c, d) {
				var e, f, g, h, i = this.left, k = this.top, l = this.height;
				c ? (g = [i, i, i],
				h = [k, k + a, k + b],
				f = [l, l, l],
				e = [a, b - a, this.size - b]) : (g = [i, i + a, i + b],
				h = [k, k, k],
				f = [a, b - a, this.size - b],
				e = [l, l, l]),
				j(this.shades, function(a, b) {
					a[d]({
						x: g[b],
						y: h[b],
						width: f[b],
						height: e[b]
					})
				})
			},
			renderElements: function() {
				var a, b = this, c = b.navigatorOptions, d = c.maskInside, e = b.chart, f = e.inverted, g = e.renderer;
				b.navigatorGroup = a = g.g("navigator").attr({
					zIndex: 8,
					visibility: "hidden"
				}).add();
				var h = {
					cursor: f ? "ns-resize" : "ew-resize"
				};
				j([!d, d, !d], function(d, e) {
					b.shades[e] = g.rect().addClass("highcharts-navigator-mask" + (1 === e ? "-inside" : "-outside")).attr({
						fill: d ? c.maskFill : "rgba(0,0,0,0)"
					}).css(1 === e && h).add(a)
				}),
				b.outline = g.path().addClass("highcharts-navigator-outline").attr({
					"stroke-width": c.outlineWidth,
					stroke: c.outlineColor
				}).add(a),
				j([0, 1], function(d) {
					b.handles[d] = g.path(b.getHandlePath(f)).attr({
						zIndex: 7 - d
					}).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][d]).add(a);
					var e = c.handles;
					b.handles[d].attr({
						fill: e.backgroundColor,
						stroke: e.borderColor,
						"stroke-width": 1
					}).css(h)
				})
			},
			update: function(a) {
				j(this.series || [], function(a) {
					a.baseSeries && delete a.baseSeries.navigatorSeries
				}),
				this.destroy(),
				s(!0, this.chart.options.navigator, this.options, a),
				this.init(this.chart)
			},
			render: function(a, b, c, d) {
				var e, f, g, i = this.chart, j = this.scrollbarHeight, k = this.xAxis;
				e = k.fake ? i.xAxis[0] : k;
				var l, m = this.navigatorEnabled, n = this.rendered;
				f = i.inverted;
				var o = i.xAxis[0].minRange;
				if (!this.hasDragged || h(c)) {
					if (!q(a) || !q(b)) {
						if (!n)
							return;
						c = 0,
						d = k.width
					}
					if (this.left = t(k.left, i.plotLeft + j + (f ? i.plotWidth : 0)),
					this.size = l = g = t(k.len, (f ? i.plotHeight : i.plotWidth) - 2 * j),
					i = f ? j : g + 2 * j,
					c = t(c, k.toPixels(a, !0)),
					d = t(d, k.toPixels(b, !0)),
					q(c) && 1 / 0 !== Math.abs(c) || (c = 0,
					d = i),
					a = k.toValue(c, !0),
					b = k.toValue(d, !0),
					Math.abs(b - a) < o)
						if (this.grabbedLeft)
							c = k.toPixels(b - o, !0);
						else {
							if (!this.grabbedRight)
								return;
							d = k.toPixels(a + o, !0)
						}
					this.zoomedMax = Math.min(Math.max(c, d, 0), l),
					this.zoomedMin = Math.min(Math.max(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(c, d), 0), l),
					this.range = this.zoomedMax - this.zoomedMin,
					l = Math.round(this.zoomedMax),
					c = Math.round(this.zoomedMin),
					m && (this.navigatorGroup.attr({
						visibility: "visible"
					}),
					n = n && !this.hasDragged ? "animate" : "attr",
					this.drawMasks(c, l, f, n),
					this.drawOutline(c, l, f, n),
					this.drawHandle(c, 0, f, n),
					this.drawHandle(l, 1, f, n)),
					this.scrollbar && (f ? (f = this.top - j,
					e = this.left - j + (m || !e.opposite ? 0 : (e.titleOffset || 0) + e.axisTitleMargin),
					j = g + 2 * j) : (f = this.top + (m ? this.height : -j),
					e = this.left - j),
					this.scrollbar.position(e, f, i, j),
					this.scrollbar.setRange(this.zoomedMin / g, this.zoomedMax / g)),
					this.rendered = !0
				}
			},
			addMouseEvents: function() {
				var a, b, d = this, e = d.chart, f = e.container, g = [];
				d.mouseMoveHandler = a = function(a) {
					d.onMouseMove(a)
				}
				,
				d.mouseUpHandler = b = function(a) {
					d.onMouseUp(a)
				}
				,
				g = d.getPartsEvents("mousedown"),
				g.push(c(f, "mousemove", a), c(f.ownerDocument, "mouseup", b)),
				o && (g.push(c(f, "touchmove", a), c(f.ownerDocument, "touchend", b)),
				g.concat(d.getPartsEvents("touchstart"))),
				d.eventsToUnbind = g,
				d.series && d.series[0] && g.push(c(d.series[0].xAxis, "foundExtremes", function() {
					e.navigator.modifyNavigatorAxisExtremes()
				}))
			},
			getPartsEvents: function(a) {
				var b = this
				  , d = [];
				return j(["shades", "handles"], function(e) {
					j(b[e], function(f, g) {
						d.push(c(f.element, a, function(a) {
							b[e + "Mousedown"](a, g)
						}))
					})
				}),
				d
			},
			shadesMousedown: function(a, b) {
				a = this.chart.pointer.normalize(a);
				var c, d = this.chart, e = this.xAxis, f = this.zoomedMin, g = this.left, h = this.size, i = this.range, j = a.chartX;
				d.inverted && (j = a.chartY,
				g = this.top),
				1 === b ? (this.grabbedCenter = j,
				this.fixedWidth = i,
				this.dragOffset = j - f) : (a = j - g - i / 2,
				0 === b ? a = Math.max(0, a) : 2 === b && a + i >= h && (a = h - i,
				c = this.getUnionExtremes().dataMax),
				a !== f && (this.fixedWidth = i,
				b = e.toFixedRange(a, a + i, null, c),
				d.xAxis[0].setExtremes(Math.min(b.min, b.max), Math.max(b.min, b.max), !0, null, {
					trigger: "navigator"
				})))
			},
			handlesMousedown: function(a, b) {
				this.chart.pointer.normalize(a),
				a = this.chart;
				var c = a.xAxis[0]
				  , d = a.inverted && !c.reversed || !a.inverted && c.reversed;
				0 === b ? (this.grabbedLeft = !0,
				this.otherHandlePos = this.zoomedMax,
				this.fixedExtreme = d ? c.min : c.max) : (this.grabbedRight = !0,
				this.otherHandlePos = this.zoomedMin,
				this.fixedExtreme = d ? c.max : c.min),
				a.fixedRange = null
			},
			onMouseMove: function(a) {
				var b = this
				  , c = b.chart
				  , d = b.left
				  , e = b.navigatorSize
				  , f = b.range
				  , g = b.dragOffset
				  , h = c.inverted;
				a.touches && 0 === a.touches[0].pageX || (a = c.pointer.normalize(a),
				c = a.chartX,
				h && (d = b.top,
				c = a.chartY),
				b.grabbedLeft ? (b.hasDragged = !0,
				b.render(0, 0, c - d, b.otherHandlePos)) : b.grabbedRight ? (b.hasDragged = !0,
				b.render(0, 0, b.otherHandlePos, c - d)) : b.grabbedCenter && (b.hasDragged = !0,
				c < g ? c = g : c > e + g - f && (c = e + g - f),
				b.render(0, 0, c - g, c - g + f)),
				b.hasDragged && b.scrollbar && b.scrollbar.options.liveRedraw && (a.DOMType = a.type,
				setTimeout(function() {
					b.onMouseUp(a)
				}, 0)))
			},
			onMouseUp: function(a) {
				var b, c, d = this.chart, e = this.xAxis, f = this.scrollbar, g = a.DOMEvent || a;
				(!this.hasDragged || f && f.hasDragged) && "scrollbar" !== a.trigger || (this.zoomedMin === this.otherHandlePos ? b = this.fixedExtreme : this.zoomedMax === this.otherHandlePos && (c = this.fixedExtreme),
				this.zoomedMax === this.size && (c = this.getUnionExtremes().dataMax),
				e = e.toFixedRange(this.zoomedMin, this.zoomedMax, b, c),
				h(e.min) && d.xAxis[0].setExtremes(Math.min(e.min, e.max), Math.max(e.min, e.max), !0, !this.hasDragged && null, {
					trigger: "navigator",
					triggerOp: "navigator-drag",
					DOMEvent: g
				})),
				"mousemove" !== a.DOMType && (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null)
			},
			removeEvents: function() {
				this.eventsToUnbind && (j(this.eventsToUnbind, function(a) {
					a()
				}),
				this.eventsToUnbind = void 0),
				this.removeBaseSeriesEvents()
			},
			removeBaseSeriesEvents: function() {
				var a = this.baseSeries || [];
				this.navigatorEnabled && a[0] && (!1 !== this.navigatorOptions.adaptToUpdatedData && j(a, function(a) {
					u(a, "updatedData", this.updatedDataHandler)
				}, this),
				a[0].xAxis && u(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes))
			},
			init: function(a) {
				var b = a.options
				  , e = b.navigator
				  , f = e.enabled
				  , g = b.scrollbar
				  , h = g.enabled
				  , b = f ? e.height : 0
				  , i = h ? g.height : 0;
				this.handles = [],
				this.shades = [],
				this.chart = a,
				this.setBaseSeries(),
				this.height = b,
				this.scrollbarHeight = i,
				this.scrollbarEnabled = h,
				this.navigatorEnabled = f,
				this.navigatorOptions = e,
				this.scrollbarOptions = g,
				this.outlineHeight = b + i,
				this.opposite = t(e.opposite, !f && a.inverted);
				var j = this
				  , g = j.baseSeries
				  , h = a.xAxis.length
				  , k = a.yAxis.length
				  , l = g && g[0] && g[0].xAxis || a.xAxis[0];
				a.extraMargin = {
					type: j.opposite ? "plotTop" : "marginBottom",
					value: (f || !a.inverted ? j.outlineHeight : 0) + e.margin
				},
				a.inverted && (a.extraMargin.type = j.opposite ? "marginRight" : "plotLeft"),
				a.isDirtyBox = !0,
				j.navigatorEnabled ? (j.xAxis = new d(a,s({
					breaks: l.options.breaks,
					ordinal: l.options.ordinal
				}, e.xAxis, {
					id: "navigator-x-axis",
					yAxis: "navigator-y-axis",
					isX: !0,
					type: "datetime",
					index: h,
					offset: 0,
					keepOrdinalPadding: !0,
					startOnTick: !1,
					endOnTick: !1,
					minPadding: 0,
					maxPadding: 0,
					zoomEnabled: !1
				}, a.inverted ? {
					offsets: [i, 0, -i, 0],
					width: b
				} : {
					offsets: [0, -i, 0, i],
					height: b
				})),
				j.yAxis = new d(a,s(e.yAxis, {
					id: "navigator-y-axis",
					alignTicks: !1,
					offset: 0,
					index: k,
					zoomEnabled: !1
				}, a.inverted ? {
					width: b
				} : {
					height: b
				})),
				g || e.series.data ? j.updateNavigatorSeries() : 0 === a.series.length && y(a, "redraw", function(b, c) {
					0 < a.series.length && !j.series && (j.setBaseSeries(),
					a.redraw = b),
					b.call(a, c)
				}),
				j.renderElements(),
				j.addMouseEvents()) : j.xAxis = {
					translate: function(b, c) {
						var d = a.xAxis[0]
						  , e = d.getExtremes()
						  , f = d.len - 2 * i
						  , g = B("min", d.options.min, e.dataMin)
						  , d = B("max", d.options.max, e.dataMax) - g;
						return c ? b * d / f + g : f * (b - g) / d
					},
					toPixels: function(a) {
						return this.translate(a)
					},
					toValue: function(a) {
						return this.translate(a, !0)
					},
					toFixedRange: d.prototype.toFixedRange,
					fake: !0
				},
				a.options.scrollbar.enabled && (a.scrollbar = j.scrollbar = new v(a.renderer,s(a.options.scrollbar, {
					margin: j.navigatorEnabled ? 0 : 10,
					vertical: a.inverted
				}),a),
				c(j.scrollbar, "changed", function(b) {
					var c = j.size
					  , d = c * this.to
					  , c = c * this.from;
					j.hasDragged = j.scrollbar.hasDragged,
					j.render(0, 0, c, d),
					(a.options.scrollbar.liveRedraw || "mousemove" !== b.DOMType) && setTimeout(function() {
						j.onMouseUp(b)
					})
				})),
				j.addBaseSeriesEvents(),
				j.addChartEvents()
			},
			getUnionExtremes: function(a) {
				var b, c = this.chart.xAxis[0], d = this.xAxis, e = d.options, f = c.options;
				return a && null === c.dataMin || (b = {
					dataMin: t(e && e.min, B("min", f.min, c.dataMin, d.dataMin, d.min)),
					dataMax: t(e && e.max, B("max", f.max, c.dataMax, d.dataMax, d.max))
				}),
				b
			},
			setBaseSeries: function(a) {
				var b = this.chart
				  , c = this.baseSeries = [];
				a = a || b.options && b.options.navigator.baseSeries || 0,
				j(b.series || [], function(b, d) {
					b.options.isInternal || !b.options.showInNavigator && (d !== a && b.options.id !== a || !1 === b.options.showInNavigator) || c.push(b)
				}),
				this.xAxis && !this.xAxis.fake && this.updateNavigatorSeries()
			},
			updateNavigatorSeries: function() {
				var b, c, d, e = this, f = e.chart, g = e.baseSeries, h = e.navigatorOptions.series, i = {
					enableMouseTracking: !1,
					index: null,
					linkedTo: null,
					group: "nav",
					padXAxis: !1,
					xAxis: "navigator-x-axis",
					yAxis: "navigator-y-axis",
					showInLegend: !1,
					stacking: !1,
					isInternal: !0,
					visible: !0
				}, k = e.series = a.grep(e.series || [], function(b) {
					var c = b.baseSeries;
					return !(0 > a.inArray(c, g)) || (c && (u(c, "updatedData", e.updatedDataHandler),
					delete c.navigatorSeries),
					b.destroy(),
					!1)
				});
				g && g.length && j(g, function(a, g) {
					var j = a.navigatorSeries
					  , l = p(h) ? {} : h;
					j && !1 === e.navigatorOptions.adaptToUpdatedData || (i.name = "Navigator " + (g + 1),
					b = a.options || {},
					d = b.navigatorOptions || {},
					c = s(b, i, l, d),
					g = d.data || l.data,
					e.hasNavigatorData = e.hasNavigatorData || !!g,
					c.data = g || b.data && b.data.slice(0),
					j ? j.update(c) : (a.navigatorSeries = f.initSeries(c),
					a.navigatorSeries.baseSeries = a,
					k.push(a.navigatorSeries)))
				}),
				(!h.data || g && g.length) && !p(h) || (e.hasNavigatorData = !1,
				h = a.splat(h),
				j(h, function(a, b) {
					c = s({
						color: f.series[b] && !f.series[b].options.isInternal && f.series[b].color || f.options.colors[b] || f.options.colors[0]
					}, a, i),
					c.data = a.data,
					c.data && (e.hasNavigatorData = !0,
					k.push(f.initSeries(c)))
				})),
				this.addBaseSeriesEvents()
			},
			addBaseSeriesEvents: function() {
				var a = this
				  , b = a.baseSeries || [];
				b[0] && b[0].xAxis && c(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes),
				j(b, function(b) {
					c(b, "show", function() {
						this.navigatorSeries && this.navigatorSeries.show()
					}),
					c(b, "hide", function() {
						this.navigatorSeries && this.navigatorSeries.hide()
					}),
					!1 !== this.navigatorOptions.adaptToUpdatedData && b.xAxis && c(b, "updatedData", this.updatedDataHandler),
					c(b, "remove", function() {
						this.navigatorSeries && (k(a.series, this.navigatorSeries),
						this.navigatorSeries.remove(!1),
						delete this.navigatorSeries)
					})
				}, this)
			},
			modifyNavigatorAxisExtremes: function() {
				var a, b = this.xAxis;
				b.getExtremes && (!(a = this.getUnionExtremes(!0)) || a.dataMin === b.min && a.dataMax === b.max || (b.min = a.dataMin,
				b.max = a.dataMax))
			},
			modifyBaseAxisExtremes: function() {
				var a, b, c = this.chart.navigator, d = this.getExtremes(), e = d.dataMin, f = d.dataMax, d = d.max - d.min, g = c.stickToMin, h = c.stickToMax, i = c.series && c.series[0], j = !!this.setExtremes;
				this.eventArgs && "rangeSelectorButton" === this.eventArgs.trigger || (g && (b = e,
				a = b + d),
				h && (a = f,
				g || (b = Math.max(a - d, i && i.xData ? i.xData[0] : -Number.MAX_VALUE))),
				j && (g || h) && q(b) && (this.min = this.userMin = b,
				this.max = this.userMax = a)),
				c.stickToMin = c.stickToMax = null
			},
			updatedDataHandler: function() {
				var a = this.chart.navigator
				  , b = this.navigatorSeries;
				a.stickToMax = Math.round(a.zoomedMax) >= Math.round(a.size),
				a.stickToMin = q(this.xAxis.min) && this.xAxis.min <= this.xData[0] && (!this.chart.fixedRange || !a.stickToMax),
				b && !a.hasNavigatorData && (b.options.pointStart = this.xData[0],
				b.setData(this.options.data, !1, null, !1))
			},
			addChartEvents: function() {
				c(this.chart, "redraw", function() {
					var a = this.navigator
					  , b = a && (a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis || a.scrollbar && this.xAxis[0]);
					b && a.render(b.min, b.max)
				})
			},
			destroy: function() {
				this.removeEvents(),
				this.xAxis && (k(this.chart.xAxis, this.xAxis),
				k(this.chart.axes, this.xAxis)),
				this.yAxis && (k(this.chart.yAxis, this.yAxis),
				k(this.chart.axes, this.yAxis)),
				j(this.series || [], function(a) {
					a.destroy && a.destroy()
				}),
				j("series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" "), function(a) {
					this[a] && this[a].destroy && this[a].destroy(),
					this[a] = null
				}, this),
				j([this.handles], function(a) {
					i(a)
				}, this)
			}
		},
		a.Navigator = b,
		y(d.prototype, "zoom", function(a, b, c) {
			var d, e = this.chart, f = e.options, g = f.chart.zoomType, i = f.navigator, f = f.rangeSelector;
			return this.isXAxis && (i && i.enabled || f && f.enabled) && ("x" === g ? e.resetZoomButton = "blocked" : "y" === g ? d = !1 : "xy" === g && (e = this.previousZoom,
			h(b) ? this.previousZoom = [this.min, this.max] : e && (b = e[0],
			c = e[1],
			delete this.previousZoom))),
			void 0 !== d ? d : a.call(this, b, c)
		}),
		y(e.prototype, "init", function(a, d, e) {
			c(this, "beforeRender", function() {
				var a = this.options;
				(a.navigator.enabled || a.scrollbar.enabled) && (this.scroller = this.navigator = new b(this))
			}),
			a.call(this, d, e)
		}),
		y(e.prototype, "setChartSize", function(a) {
			var b, c, d, e, f = this.legend, g = this.navigator;
			a.apply(this, [].slice.call(arguments, 1)),
			g && (c = f.options,
			d = g.xAxis,
			e = g.yAxis,
			b = g.scrollbarHeight,
			this.inverted ? (g.left = g.opposite ? this.chartWidth - b - g.height : this.spacing[3] + b,
			g.top = this.plotTop + b) : (g.left = this.plotLeft + b,
			g.top = g.navigatorOptions.top || this.chartHeight - g.height - b - this.spacing[2] - ("bottom" === c.verticalAlign && c.enabled && !c.floating ? f.legendHeight + t(c.margin, 10) : 0)),
			d && e && (this.inverted ? d.options.left = e.options.left = g.left : d.options.top = e.options.top = g.top,
			d.setAxisSize(),
			e.setAxisSize()))
		}),
		y(w.prototype, "addPoint", function(a, b, c, d, e) {
			var f = this.options.turboThreshold;
			f && this.xData.length > f && r(b, !0) && this.chart.navigator && l(20, !0),
			a.call(this, b, c, d, e)
		}),
		y(e.prototype, "addSeries", function(a, b, c, d) {
			return a = a.call(this, b, !1, d),
			this.navigator && this.navigator.setBaseSeries(),
			t(c, !0) && this.redraw(),
			a
		}),
		y(w.prototype, "update", function(a, b, c) {
			a.call(this, b, !1),
			this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(),
			t(c, !0) && this.chart.redraw()
		}),
		e.prototype.callbacks.push(function(a) {
			var b = a.navigator;
			b && (a = a.xAxis[0].getExtremes(),
			b.render(a.min, a.max))
		})
	}(a),
	function(a) {
		function b(a) {
			this.init(a)
		}
		var c = a.addEvent
		  , d = a.Axis
		  , e = a.Chart
		  , f = a.css
		  , g = a.createElement
		  , h = a.dateFormat
		  , i = a.defaultOptions
		  , j = i.global.useUTC
		  , k = a.defined
		  , l = a.destroyObjectProperties
		  , m = a.discardElement
		  , n = a.each
		  , o = a.extend
		  , p = a.fireEvent
		  , q = a.Date
		  , r = a.isNumber
		  , s = a.merge
		  , t = a.pick
		  , u = a.pInt
		  , v = a.splat
		  , w = a.wrap;
		o(i, {
			rangeSelector: {
				buttonTheme: {
					"stroke-width": 0,
					width: 28,
					height: 18,
					padding: 2,
					zIndex: 7
				},
				height: 35,
				inputPosition: {
					align: "right"
				},
				labelStyle: {
					color: "#666666"
				}
			}
		}),
		i.lang = s(i.lang, {
			rangeSelectorZoom: "Zoom",
			rangeSelectorFrom: "From",
			rangeSelectorTo: "To"
		}),
		b.prototype = {
			clickButton: function(a, b) {
				var e, f, g, h, i, k = this, l = k.chart, m = k.buttonOptions[a], o = l.xAxis[0], p = l.scroller && l.scroller.getUnionExtremes() || o || {}, q = p.dataMin, s = p.dataMax, u = o && Math.round(Math.min(o.max, t(s, o.max))), w = m.type, p = m._range, x = m.dataGrouping;
				if (null !== q && null !== s) {
					if (l.fixedRange = p,
					x && (this.forcedDataGrouping = !0,
					d.prototype.setDataGrouping.call(o || {
						chart: this.chart
					}, x, !1)),
					"month" === w || "year" === w)
						o ? (w = {
							range: m,
							max: u,
							dataMin: q,
							dataMax: s
						},
						e = o.minFromRange.call(w),
						r(w.newMax) && (u = w.newMax)) : p = m;
					else if (p)
						e = Math.max(u - p, q),
						u = Math.min(e + p, s);
					else if ("ytd" === w) {
						if (!o)
							return void c(l, "beforeRender", function() {
								k.clickButton(a)
							});
						void 0 === s && (q = Number.MAX_VALUE,
						s = Number.MIN_VALUE,
						n(l.series, function(a) {
							a = a.xData,
							q = Math.min(a[0], q),
							s = Math.max(a[a.length - 1], s)
						}),
						b = !1),
						u = k.getYTDExtremes(s, q, j),
						e = g = u.min,
						u = u.max
					} else
						"all" === w && o && (e = q,
						u = s);
					k.setSelected(a),
					o ? o.setExtremes(e, u, t(b, 1), null, {
						trigger: "rangeSelectorButton",
						rangeSelectorButton: m
					}) : (f = v(l.options.xAxis)[0],
					i = f.range,
					f.range = p,
					h = f.min,
					f.min = g,
					c(l, "load", function() {
						f.range = i,
						f.min = h
					}))
				}
			},
			setSelected: function(a) {
				this.selected = this.options.selected = a
			},
			defaultButtons: [{
				type: "month",
				count: 1,
				text: "1m"
			}, {
				type: "month",
				count: 3,
				text: "3m"
			}, {
				type: "month",
				count: 6,
				text: "6m"
			}, {
				type: "ytd",
				text: "YTD"
			}, {
				type: "year",
				count: 1,
				text: "1y"
			}, {
				type: "all",
				text: "All"
			}],
			init: function(a) {
				var b = this
				  , d = a.options.rangeSelector
				  , e = d.buttons || [].concat(b.defaultButtons)
				  , f = d.selected
				  , g = function() {
					var a = b.minInput
					  , c = b.maxInput;
					a && a.blur && p(a, "blur"),
					c && c.blur && p(c, "blur")
				};
				b.chart = a,
				b.options = d,
				b.buttons = [],
				a.extraTopMargin = d.height,
				b.buttonOptions = e,
				this.unMouseDown = c(a.container, "mousedown", g),
				this.unResize = c(a, "resize", g),
				n(e, b.computeButtonRange),
				void 0 !== f && e[f] && this.clickButton(f, !1),
				c(a, "load", function() {
					c(a.xAxis[0], "setExtremes", function(c) {
						this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger && b.forcedDataGrouping && this.setDataGrouping(!1, !1)
					})
				})
			},
			updateButtonStates: function() {
				var a = this.chart
				  , b = a.xAxis[0]
				  , c = Math.round(b.max - b.min)
				  , d = !b.hasVisibleSeries
				  , a = a.scroller && a.scroller.getUnionExtremes() || b
				  , e = a.dataMin
				  , f = a.dataMax
				  , a = this.getYTDExtremes(f, e, j)
				  , g = a.min
				  , h = a.max
				  , i = this.selected
				  , k = r(i)
				  , l = this.options.allButtonsEnabled
				  , m = this.buttons;
				n(this.buttonOptions, function(a, j) {
					var n = a._range
					  , o = a.type
					  , p = a.count || 1;
					a = m[j];
					var q = 0;
					j = j === i;
					var r = n > f - e
					  , s = n < b.minRange
					  , t = !1
					  , u = !1
					  , n = n === c;
					("month" === o || "year" === o) && c >= 864e5 * {
						month: 28,
						year: 365
					}[o] * p && c <= 864e5 * {
						month: 31,
						year: 366
					}[o] * p ? n = !0 : "ytd" === o ? (n = h - g === c,
					t = !j) : "all" === o && (n = b.max - b.min >= f - e,
					u = !j && k && n),
					o = !l && (r || s || u || d),
					n = j && n || n && !k && !t,
					o ? q = 3 : n && (k = !0,
					q = 2),
					a.state !== q && a.setState(q)
				})
			},
			computeButtonRange: function(a) {
				var b = a.type
				  , c = a.count || 1
				  , d = {
					millisecond: 1,
					second: 1e3,
					minute: 6e4,
					hour: 36e5,
					day: 864e5,
					week: 6048e5
				};
				d[b] ? a._range = d[b] * c : "month" !== b && "year" !== b || (a._range = 864e5 * {
					month: 30,
					year: 365
				}[b] * c)
			},
			setInputValue: function(a, b) {
				var c = this.chart.options.rangeSelector
				  , d = this[a + "Input"];
				k(b) && (d.previousValue = d.HCTime,
				d.HCTime = b),
				d.value = h(c.inputEditDateFormat || "%Y-%m-%d", d.HCTime),
				this[a + "DateBox"].attr({
					text: h(c.inputDateFormat || "%b %e, %Y", d.HCTime)
				})
			},
			showInput: function(a) {
				var b = this.inputGroup
				  , c = this[a + "DateBox"];
				f(this[a + "Input"], {
					left: b.translateX + c.x + "px",
					top: b.translateY + "px",
					width: c.width - 2 + "px",
					height: c.height - 2 + "px",
					border: "2px solid silver"
				})
			},
			hideInput: function(a) {
				f(this[a + "Input"], {
					border: 0,
					width: "1px",
					height: "1px"
				}),
				this.setInputValue(a)
			},
			drawInput: function(a) {
				function b() {
					var a = c.value
					  , b = (m.inputDateParser || Date.parse)(a)
					  , d = h.xAxis[0]
					  , f = h.scroller && h.scroller.xAxis ? h.scroller.xAxis : d
					  , g = f.dataMin
					  , f = f.dataMax;
					b !== c.previousValue && (c.previousValue = b,
					r(b) || (b = a.split("-"),
					b = Date.UTC(u(b[0]), u(b[1]) - 1, u(b[2]))),
					r(b) && (j || (b += 6e4 * (new Date).getTimezoneOffset()),
					p ? b > e.maxInput.HCTime ? b = void 0 : b < g && (b = g) : b < e.minInput.HCTime ? b = void 0 : b > f && (b = f),
					void 0 !== b && d.setExtremes(p ? b : d.min, p ? d.max : b, void 0, void 0, {
						trigger: "rangeSelectorInput"
					})))
				}
				var c, d, e = this, h = e.chart, k = h.renderer.style || {}, l = h.renderer, m = h.options.rangeSelector, n = e.div, p = "min" === a, q = this.inputGroup;
				this[a + "Label"] = d = l.label(i.lang[p ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).addClass("highcharts-range-label").attr({
					padding: 2
				}).add(q),
				q.offset += d.width + 5,
				this[a + "DateBox"] = l = l.label("", q.offset).addClass("highcharts-range-input").attr({
					padding: 2,
					width: m.inputBoxWidth || 90,
					height: m.inputBoxHeight || 17,
					stroke: m.inputBoxBorderColor || "#cccccc",
					"stroke-width": 1,
					"text-align": "center"
				}).on("click", function() {
					e.showInput(a),
					e[a + "Input"].focus()
				}).add(q),
				q.offset += l.width + (p ? 10 : 0),
				this[a + "Input"] = c = g("input", {
					name: a,
					className: "highcharts-range-selector",
					type: "text"
				}, {
					top: h.plotTop + "px"
				}, n),
				d.css(s(k, m.labelStyle)),
				l.css(s({
					color: "#333333"
				}, k, m.inputStyle)),
				f(c, o({
					position: "absolute",
					border: 0,
					width: "1px",
					height: "1px",
					padding: 0,
					textAlign: "center",
					fontSize: k.fontSize,
					fontFamily: k.fontFamily,
					left: "-9em"
				}, m.inputStyle)),
				c.onfocus = function() {
					e.showInput(a)
				}
				,
				c.onblur = function() {
					e.hideInput(a)
				}
				,
				c.onchange = b,
				c.onkeypress = function(a) {
					13 === a.keyCode && b()
				}
			},
			getPosition: function() {
				var a = this.chart
				  , b = a.options.rangeSelector
				  , a = t((b.buttonPosition || {}).y, a.plotTop - a.axisOffset[0] - b.height);
				return {
					buttonTop: a,
					inputTop: a - 10
				}
			},
			getYTDExtremes: function(a, b, c) {
				var d = new q(a)
				  , e = d[q.hcGetFullYear]();
				return c = c ? q.UTC(e, 0, 1) : +new q(e,0,1),
				b = Math.max(b || 0, c),
				d = d.getTime(),
				{
					max: Math.min(a || d, d),
					min: b
				}
			},
			render: function(a, b) {
				var c, d = this, e = d.chart, f = e.renderer, h = e.container, j = e.options, l = j.exporting && !1 !== j.exporting.enabled && j.navigation && j.navigation.buttonOptions, m = j.rangeSelector, p = d.buttons, j = i.lang, q = d.div, q = d.inputGroup, r = m.buttonTheme, s = m.buttonPosition || {}, u = m.inputEnabled, v = r && r.states, w = e.plotLeft, x = this.getPosition(), y = d.group, z = d.rendered;
				!1 !== m.enabled && (z || (d.group = y = f.g("range-selector-buttons").add(),
				d.zoomText = f.text(j.rangeSelectorZoom, t(s.x, w), 15).css(m.labelStyle).add(y),
				c = t(s.x, w) + d.zoomText.getBBox().width + 5,
				n(d.buttonOptions, function(a, b) {
					p[b] = f.button(a.text, c, 0, function() {
						d.clickButton(b),
						d.isActive = !0
					}, r, v && v.hover, v && v.select, v && v.disabled).attr({
						"text-align": "center"
					}).add(y),
					c += p[b].width + t(m.buttonSpacing, 5)
				}),
				!1 !== u && (d.div = q = g("div", null, {
					position: "relative",
					height: 0,
					zIndex: 1
				}),
				h.parentNode.insertBefore(q, h),
				d.inputGroup = q = f.g("input-group").add(),
				q.offset = 0,
				d.drawInput("min"),
				d.drawInput("max"))),
				d.updateButtonStates(),
				y[z ? "animate" : "attr"]({
					translateY: x.buttonTop
				}),
				!1 !== u && (q.align(o({
					y: x.inputTop,
					width: q.offset,
					x: l && x.inputTop < (l.y || 0) + l.height - e.spacing[0] ? -40 : 0
				}, m.inputPosition), !0, e.spacingBox),
				k(u) || (e = y.getBBox(),
				q[q.alignAttr.translateX < e.x + e.width + 10 ? "hide" : "show"]()),
				d.setInputValue("min", a),
				d.setInputValue("max", b)),
				d.rendered = !0)
			},
			update: function(a) {
				var b = this.chart;
				s(!0, b.options.rangeSelector, a),
				this.destroy(),
				this.init(b)
			},
			destroy: function() {
				var c = this
				  , d = c.minInput
				  , e = c.maxInput;
				c.unMouseDown(),
				c.unResize(),
				l(c.buttons),
				d && (d.onfocus = d.onblur = d.onchange = null),
				e && (e.onfocus = e.onblur = e.onchange = null),
				a.objectEach(c, function(a, d) {
					a && "chart" !== d && (a.destroy ? a.destroy() : a.nodeType && m(this[d])),
					a !== b.prototype[d] && (c[d] = null)
				}, this)
			}
		},
		d.prototype.toFixedRange = function(a, b, c, d) {
			var e = this.chart && this.chart.fixedRange;
			return a = t(c, this.translate(a, !0, !this.horiz)),
			b = t(d, this.translate(b, !0, !this.horiz)),
			c = e && (b - a) / e,
			.7 < c && 1.3 > c && (d ? a = b - e : b = a + e),
			r(a) || (a = b = void 0),
			{
				min: a,
				max: b
			}
		}
		,
		d.prototype.minFromRange = function() {
			var a, b, c, d = this.range, e = {
				month: "Month",
				year: "FullYear"
			}[d.type], f = this.max, g = function(a, b) {
				var c = new Date(a)
				  , d = c["get" + e]();
				return c["set" + e](d + b),
				d === c["get" + e]() && c.setDate(0),
				c.getTime() - a
			};
			return r(d) ? (a = f - d,
			c = d) : (a = f + g(f, -d.count),
			this.chart && (this.chart.fixedRange = f - a)),
			b = t(this.dataMin, Number.MIN_VALUE),
			r(a) || (a = b),
			a <= b && (a = b,
			void 0 === c && (c = g(a, d.count)),
			this.newMax = Math.min(a + c, this.dataMax)),
			r(f) || (a = void 0),
			a
		}
		,
		w(e.prototype, "init", function(a, d, e) {
			c(this, "init", function() {
				this.options.rangeSelector.enabled && (this.rangeSelector = new b(this))
			}),
			a.call(this, d, e)
		}),
		e.prototype.callbacks.push(function(a) {
			function b() {
				d = a.xAxis[0].getExtremes(),
				r(d.min) && g.render(d.min, d.max)
			}
			var d, e, f, g = a.rangeSelector;
			g && (f = c(a.xAxis[0], "afterSetExtremes", function(a) {
				g.render(a.min, a.max)
			}),
			e = c(a, "redraw", b),
			b()),
			c(a, "destroy", function() {
				g && (e(),
				f())
			})
		}),
		a.RangeSelector = b
	}(a),
	function(a) {
		var b = a.arrayMax
		  , c = a.arrayMin
		  , d = a.Axis
		  , e = a.Chart
		  , f = a.defined
		  , g = a.each
		  , h = a.extend
		  , i = a.format
		  , j = a.grep
		  , k = a.inArray
		  , l = a.isNumber
		  , m = a.isString
		  , n = a.map
		  , o = a.merge
		  , p = a.pick
		  , q = a.Point
		  , r = a.Renderer
		  , s = a.Series
		  , t = a.splat
		  , u = a.SVGRenderer
		  , v = a.VMLRenderer
		  , w = a.wrap
		  , x = s.prototype
		  , y = x.init
		  , z = x.processData
		  , A = q.prototype.tooltipFormatter;
		a.StockChart = a.stockChart = function(b, c, d) {
			var f, g = m(b) || b.nodeName, h = arguments[g ? 1 : 0], i = h.series, j = a.getOptions(), k = p(h.navigator && h.navigator.enabled, j.navigator.enabled, !0), l = k ? {
				startOnTick: !1,
				endOnTick: !1
			} : null, q = {
				marker: {
					enabled: !1,
					radius: 2
				}
			}, r = {
				shadow: !1,
				borderWidth: 0
			};
			return h.xAxis = n(t(h.xAxis || {}), function(a) {
				return o({
					minPadding: 0,
					maxPadding: 0,
					ordinal: !0,
					title: {
						text: null
					},
					labels: {
						overflow: "justify"
					},
					showLastLabel: !0
				}, j.xAxis, a, {
					type: "datetime",
					categories: null
				}, l)
			}),
			h.yAxis = n(t(h.yAxis || {}), function(a) {
				return f = p(a.opposite, !0),
				o({
					labels: {
						y: -2
					},
					opposite: f,
					showLastLabel: !1,
					title: {
						text: null
					}
				}, j.yAxis, a)
			}),
			h.series = null,
			h = o({
				chart: {
					panning: !0,
					pinchType: "x"
				},
				navigator: {
					enabled: k
				},
				scrollbar: {
					enabled: p(j.scrollbar.enabled, !0)
				},
				rangeSelector: {
					enabled: p(j.rangeSelector.enabled, !0)
				},
				title: {
					text: null
				},
				tooltip: {
					shared: !0,
					crosshairs: !0
				},
				legend: {
					enabled: !1
				},
				plotOptions: {
					line: q,
					spline: q,
					area: q,
					areaspline: q,
					arearange: q,
					areasplinerange: q,
					column: r,
					columnrange: r,
					candlestick: r,
					ohlc: r
				}
			}, h, {
				isStock: !0
			}),
			h.series = i,
			g ? new e(b,h,d) : new e(h,c)
		}
		,
		w(d.prototype, "autoLabelAlign", function(a) {
			var b = this.chart
			  , c = this.options
			  , b = b._labelPanes = b._labelPanes || {}
			  , d = this.options.labels;
			return this.chart.options.isStock && "yAxis" === this.coll && (c = c.top + "," + c.height,
			!b[c] && d.enabled) ? (15 === d.x && (d.x = 0),
			void 0 === d.align && (d.align = "right"),
			b[c] = this,
			"right") : a.apply(this, [].slice.call(arguments, 1))
		}),
		w(d.prototype, "destroy", function(a) {
			var b = this.chart
			  , c = this.options && this.options.top + "," + this.options.height;
			return c && b._labelPanes && b._labelPanes[c] === this && delete b._labelPanes[c],
			a.apply(this, Array.prototype.slice.call(arguments, 1))
		}),
		w(d.prototype, "getPlotLinePath", function(b, c, d, e, h, i) {
			var j, o, q, r, s, t, u = this, v = this.isLinked && !this.series ? this.linkedParent.series : this.series, w = u.chart, x = w.renderer, y = u.left, z = u.top, A = [], B = [];
			return "xAxis" !== u.coll && "yAxis" !== u.coll ? b.apply(this, [].slice.call(arguments, 1)) : (B = function(a) {
				var b = "xAxis" === a ? "yAxis" : "xAxis";
				return a = u.options[b],
				l(a) ? [w[b][a]] : m(a) ? [w.get(a)] : n(v, function(a) {
					return a[b]
				})
			}(u.coll),
			g(u.isXAxis ? w.yAxis : w.xAxis, function(a) {
				if (f(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) {
					var b = a.isXAxis ? "yAxis" : "xAxis"
					  , b = f(a.options[b]) ? w[b][a.options[b]] : w[b][0];
					u === b && B.push(a)
				}
			}),
			s = B.length ? [] : [u.isXAxis ? w.yAxis[0] : w.xAxis[0]],
			g(B, function(b) {
				-1 !== k(b, s) || a.find(s, function(a) {
					return a.pos === b.pos && a.len && b.len
				}) || s.push(b)
			}),
			t = p(i, u.translate(c, null, null, e)),
			l(t) && (u.horiz ? g(s, function(a) {
				var b;
				o = a.pos,
				r = o + a.len,
				j = q = Math.round(t + u.transB),
				(j < y || j > y + u.width) && (h ? j = q = Math.min(Math.max(y, j), y + u.width) : b = !0),
				b || A.push("M", j, o, "L", q, r)
			}) : g(s, function(a) {
				var b;
				j = a.pos,
				q = j + a.len,
				o = r = Math.round(z + u.height - t),
				(o < z || o > z + u.height) && (h ? o = r = Math.min(Math.max(z, o), u.top + u.height) : b = !0),
				b || A.push("M", j, o, "L", q, r)
			})),
			0 < A.length ? x.crispPolyLine(A, d || 1) : null)
		}),
		d.prototype.getPlotBandPath = function(a, b) {
			b = this.getPlotLinePath(b, null, null, !0),
			a = this.getPlotLinePath(a, null, null, !0);
			var c, d = [];
			if (a && b)
				if (a.toString() === b.toString())
					d = a,
					d.flat = !0;
				else
					for (c = 0; c < a.length; c += 6)
						d.push("M", a[c + 1], a[c + 2], "L", a[c + 4], a[c + 5], b[c + 4], b[c + 5], b[c + 1], b[c + 2], "z");
			else
				d = null;
			return d
		}
		,
		u.prototype.crispPolyLine = function(a, b) {
			var c;
			for (c = 0; c < a.length; c += 6)
				a[c + 1] === a[c + 4] && (a[c + 1] = a[c + 4] = Math.round(a[c + 1]) - b % 2 / 2),
				a[c + 2] === a[c + 5] && (a[c + 2] = a[c + 5] = Math.round(a[c + 2]) + b % 2 / 2);
			return a
		}
		,
		r === v && (v.prototype.crispPolyLine = u.prototype.crispPolyLine),
		w(d.prototype, "hideCrosshair", function(a, b) {
			a.call(this, b),
			this.crossLabel && (this.crossLabel = this.crossLabel.hide())
		}),
		w(d.prototype, "drawCrosshair", function(a, b, c) {
			var d, e;
			if (a.call(this, b, c),
			f(this.crosshair.label) && this.crosshair.label.enabled && this.cross) {
				a = this.chart;
				var g = this.options.crosshair.label
				  , j = this.horiz;
				d = this.opposite,
				e = this.left;
				var k, l = this.top, m = this.crossLabel, n = g.format, o = "", q = "inside" === this.options.tickPosition, r = !1 !== this.crosshair.snap, s = 0;
				b || (b = this.cross && this.cross.e),
				k = j ? "center" : d ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center",
				m || (m = this.crossLabel = a.renderer.label(null, null, null, g.shape || "callout").addClass("highcharts-crosshair-label" + (this.series[0] && " highcharts-color-" + this.series[0].colorIndex)).attr({
					align: g.align || k,
					padding: p(g.padding, 8),
					r: p(g.borderRadius, 3),
					zIndex: 2
				}).add(this.labelGroup),
				m.attr({
					fill: g.backgroundColor || this.series[0] && this.series[0].color || "#666666",
					stroke: g.borderColor || "",
					"stroke-width": g.borderWidth || 0
				}).css(h({
					color: "#ffffff",
					fontWeight: "normal",
					fontSize: "11px",
					textAlign: "center"
				}, g.style))),
				j ? (k = r ? c.plotX + e : b.chartX,
				l += d ? 0 : this.height) : (k = d ? this.width + e : 0,
				l = r ? c.plotY + l : b.chartY),
				n || g.formatter || (this.isDatetimeAxis && (o = "%b %d, %Y"),
				n = "{value" + (o ? ":" + o : "") + "}"),
				b = r ? c[this.isXAxis ? "x" : "y"] : this.toValue(j ? b.chartX : b.chartY),
				m.attr({
					text: n ? i(n, {
						value: b
					}) : g.formatter.call(this, b),
					x: k,
					y: l,
					visibility: "visible"
				}),
				b = m.getBBox(),
				j ? (q && !d || !q && d) && (l = m.y - b.height) : l = m.y - b.height / 2,
				j ? (d = e - b.x,
				e = e + this.width - b.x) : (d = "left" === this.labelAlign ? e : 0,
				e = "right" === this.labelAlign ? e + this.width : a.chartWidth),
				m.translateX < d && (s = d - m.translateX),
				m.translateX + b.width >= e && (s = -(m.translateX + b.width - e)),
				m.attr({
					x: k + s,
					y: l,
					anchorX: j ? k : this.opposite ? 0 : a.chartWidth,
					anchorY: j ? this.opposite ? a.chartHeight : 0 : l + b.height / 2
				})
			}
		}),
		x.init = function() {
			y.apply(this, arguments),
			this.setCompare(this.options.compare)
		}
		,
		x.setCompare = function(a) {
			this.modifyValue = "value" === a || "percent" === a ? function(b, c) {
				var d = this.compareValue;
				if (void 0 !== b && void 0 !== d)
					return b = "value" === a ? b - d : b / d * 100 - (100 === this.options.compareBase ? 0 : 100),
					c && (c.change = b),
					b
			}
			: null,
			this.userOptions.compare = a,
			this.chart.hasRendered && (this.isDirty = !0)
		}
		,
		x.processData = function() {
			var a, b, c, d, e, f = -1;
			if (z.apply(this, arguments),
			this.xAxis && this.processedYData)
				for (b = this.processedXData,
				c = this.processedYData,
				d = c.length,
				this.pointArrayMap && -1 === (f = k("close", this.pointArrayMap)) && (f = k(this.pointValKey || "y", this.pointArrayMap)),
				a = 0; a < d - 1; a++)
					if (e = c[a] && -1 < f ? c[a][f] : c[a],
					l(e) && b[a + 1] >= this.xAxis.min && 0 !== e) {
						this.compareValue = e;
						break
					}
		}
		,
		w(x, "getExtremes", function(a) {
			var d;
			a.apply(this, [].slice.call(arguments, 1)),
			this.modifyValue && (d = [this.modifyValue(this.dataMin), this.modifyValue(this.dataMax)],
			this.dataMin = c(d),
			this.dataMax = b(d))
		}),
		d.prototype.setCompare = function(a, b) {
			this.isXAxis || (g(this.series, function(b) {
				b.setCompare(a)
			}),
			p(b, !0) && this.chart.redraw())
		}
		,
		q.prototype.tooltipFormatter = function(b) {
			return b = b.replace("{point.change}", (0 < this.change ? "+" : "") + a.numberFormat(this.change, p(this.series.tooltipOptions.changeDecimals, 2))),
			A.apply(this, [b])
		}
		,
		w(s.prototype, "render", function(a) {
			this.chart.is3d && this.chart.is3d() || this.chart.polar || !this.xAxis || this.xAxis.isRadial || (!this.clipBox && this.animate ? (this.clipBox = o(this.chart.clipBox),
			this.clipBox.width = this.xAxis.len,
			this.clipBox.height = this.yAxis.len) : this.chart[this.sharedClipKey] ? this.chart[this.sharedClipKey].attr({
				width: this.xAxis.len,
				height: this.yAxis.len
			}) : this.clipBox && (this.clipBox.width = this.xAxis.len,
			this.clipBox.height = this.yAxis.len)),
			a.call(this)
		}),
		w(e.prototype, "getSelectedPoints", function(a) {
			var b = a.call(this);
			return g(this.series, function(a) {
				a.hasGroupedData && (b = b.concat(j(a.points || [], function(a) {
					return a.selected
				})))
			}),
			b
		}),
		w(e.prototype, "update", function(a, b) {
			return "scrollbar"in b && this.navigator && (o(!0, this.options.scrollbar, b.scrollbar),
			this.navigator.update({}, !1),
			delete b.scrollbar),
			a.apply(this, Array.prototype.slice.call(arguments, 1))
		})
	}(a),
	a
}),
function(a) {
	var b, c = a.Chart, d = a.addEvent, e = a.removeEvent, f = a.createElement, g = a.discardElement, h = a.css, i = a.merge, j = a.each, k = a.extend, l = Math.max, m = document, n = window, o = a.isTouchDevice, p = a.Renderer.prototype.symbols, q = a.getOptions();
	k(q.lang, {
		printChart: "Print chart",
		downloadPNG: "Download PNG image",
		downloadJPEG: "Download JPEG image",
		downloadPDF: "Download PDF document",
		downloadSVG: "Download SVG vector image",
		contextButtonTitle: "Chart context menu"
	}),
	q.navigation = {
		menuStyle: {
			border: "1px solid #A0A0A0",
			background: "#FFFFFF",
			padding: "5px 0"
		},
		menuItemStyle: {
			padding: "0 10px",
			background: "none",
			color: "#303030",
			fontSize: o ? "14px" : "11px"
		},
		menuItemHoverStyle: {
			background: "#4572A5",
			color: "#FFFFFF"
		},
		buttonOptions: {
			symbolFill: "#E0E0E0",
			symbolSize: 14,
			symbolStroke: "#666",
			symbolStrokeWidth: 3,
			symbolX: 12.5,
			symbolY: 10.5,
			align: "right",
			buttonSpacing: 3,
			height: 22,
			theme: {
				fill: "white",
				stroke: "none"
			},
			verticalAlign: "top",
			width: 24
		}
	},
	q.exporting = {
		type: "image/png",
		url: "http://export.highcharts.com/",
		buttons: {
			contextButton: {
				menuClassName: "highcharts-contextmenu",
				symbol: "menu",
				_titleKey: "contextButtonTitle",
				menuItems: [{
					textKey: "printChart",
					onclick: function() {
						this.print()
					}
				}, {
					separator: !0
				}, {
					textKey: "downloadPNG",
					onclick: function() {
						this.exportChart()
					}
				}, {
					textKey: "downloadJPEG",
					onclick: function() {
						this.exportChart({
							type: "image/jpeg"
						})
					}
				}, {
					textKey: "downloadPDF",
					onclick: function() {
						this.exportChart({
							type: "application/pdf"
						})
					}
				}, {
					textKey: "downloadSVG",
					onclick: function() {
						this.exportChart({
							type: "image/svg+xml"
						})
					}
				}]
			}
		}
	},
	a.post = function(a, b) {
		var c, d;
		d = f("form", {
			method: "post",
			action: a,
			enctype: "multipart/form-data"
		}, {
			display: "none"
		}, m.body);
		for (c in b)
			f("input", {
				type: "hidden",
				name: c,
				value: b[c]
			}, null, d);
		d.submit(),
		g(d)
	}
	,
	k(c.prototype, {
		getSVG: function(b) {
			var c, d, e, h, l = this, n = i(l.options, b);
			return m.createElementNS || (m.createElementNS = function(a, b) {
				return m.createElement(b)
			}
			),
			b = f("div", null, {
				position: "absolute",
				top: "-9999em",
				width: l.chartWidth + "px",
				height: l.chartHeight + "px"
			}, m.body),
			d = l.renderTo.style.width,
			h = l.renderTo.style.height,
			d = n.exporting.sourceWidth || n.chart.width || /px$/.test(d) && parseInt(d, 10) || 600,
			h = n.exporting.sourceHeight || n.chart.height || /px$/.test(h) && parseInt(h, 10) || 400,
			k(n.chart, {
				animation: !1,
				renderTo: b,
				forExport: !0,
				width: d,
				height: h
			}),
			n.exporting.enabled = !1,
			n.series = [],
			j(l.series, function(a) {
				e = i(a.options, {
					animation: !1,
					showCheckbox: !1,
					visible: a.visible
				}),
				e.isInternal || n.series.push(e)
			}),
			c = new a.Chart(n,l.callback),
			j(["xAxis", "yAxis"], function(a) {
				j(l[a], function(b, d) {
					var e = c[a][d]
					  , f = b.getExtremes()
					  , g = f.userMin
					  , f = f.userMax;
					e && (void 0 !== g || void 0 !== f) && e.setExtremes(g, f, !0, !1)
				})
			}),
			d = c.container.innerHTML,
			n = null,
			c.destroy(),
			g(b),
			d = d.replace(/zIndex="[^"]+"/g, "").replace(/isShadow="[^"]+"/g, "").replace(/symbolName="[^"]+"/g, "").replace(/jQuery[0-9]+="[^"]+"/g, "").replace(/url\([^#]+#/g, "url(#").replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ href=/g, " xlink:href=").replace(/\n/, " ").replace(/<\/svg>.*?$/, "</svg>").replace(/&nbsp;/g, " ").replace(/&shy;/g, "­").replace(/<IMG /g, "<image ").replace(/height=([^" ]+)/g, 'height="$1"').replace(/width=([^" ]+)/g, 'width="$1"').replace(/hc-svg-href="([^"]+)">/g, 'xlink:href="$1"/>').replace(/id=([^" >]+)/g, 'id="$1"').replace(/class=([^" >]+)/g, 'class="$1"').replace(/ transform /g, " ").replace(/:(path|rect)/g, "$1").replace(/style="([^"]+)"/g, function(a) {
				return a.toLowerCase()
			}),
			d = d.replace(/(url\(#highcharts-[0-9]+)&quot;/g, "$1").replace(/&quot;/g, "'")
		},
		exportChart: function(b, c) {
			var b = b || {}
			  , d = this.options.exporting
			  , d = this.getSVG(i({
				chart: {
					borderRadius: 0
				}
			}, d.chartOptions, c, {
				exporting: {
					sourceWidth: b.sourceWidth || d.sourceWidth,
					sourceHeight: b.sourceHeight || d.sourceHeight
				}
			}))
			  , b = i(this.options.exporting, b);
			a.post(b.url, {
				filename: b.filename || "chart",
				type: b.type,
				width: b.width || 0,
				scale: b.scale || 2,
				svg: d
			})
		},
		print: function() {
			var a = this
			  , b = a.container
			  , c = []
			  , d = b.parentNode
			  , e = m.body
			  , f = e.childNodes;
			a.isPrinting || (a.isPrinting = !0,
			j(f, function(a, b) {
				1 === a.nodeType && (c[b] = a.style.display,
				a.style.display = "none")
			}),
			e.appendChild(b),
			n.focus(),
			n.print(),
			setTimeout(function() {
				d.appendChild(b),
				j(f, function(a, b) {
					1 === a.nodeType && (a.style.display = c[b])
				}),
				a.isPrinting = !1
			}, 1e3))
		},
		contextMenu: function(a, b, c, e, g, i, m) {
			var n, o, p, q = this, r = q.options.navigation, s = r.menuItemStyle, t = q.chartWidth, u = q.chartHeight, v = "cache-" + a, w = q[v], x = l(g, i);
			w || (q[v] = w = f("div", {
				className: a
			}, {
				position: "absolute",
				zIndex: 1e3,
				padding: x + "px"
			}, q.container),
			n = f("div", null, k({
				MozBoxShadow: "3px 3px 10px #888",
				WebkitBoxShadow: "3px 3px 10px #888",
				boxShadow: "3px 3px 10px #888"
			}, r.menuStyle), w),
			o = function() {
				h(w, {
					display: "none"
				}),
				m && m.setState(0),
				q.openMenu = !1
			}
			,
			d(w, "mouseleave", function() {
				p = setTimeout(o, 500)
			}),
			d(w, "mouseenter", function() {
				clearTimeout(p)
			}),
			d(document, "mouseup", function(b) {
				q.pointer.inClass(b.target, a) || o()
			}),
			j(b, function(a) {
				if (a) {
					var b = a.separator ? f("hr", null, null, n) : f("div", {
						onmouseover: function() {
							h(this, r.menuItemHoverStyle)
						},
						onmouseout: function() {
							h(this, s)
						},
						onclick: function() {
							o(),
							a.onclick.apply(q, arguments)
						},
						innerHTML: a.text || q.options.lang[a.textKey]
					}, k({
						cursor: "pointer"
					}, s), n);
					q.exportDivElements.push(b)
				}
			}),
			q.exportDivElements.push(n, w),
			q.exportMenuWidth = w.offsetWidth,
			q.exportMenuHeight = w.offsetHeight),
			b = {
				display: "block"
			},
			c + q.exportMenuWidth > t ? b.right = t - c - g - x + "px" : b.left = c - x + "px",
			e + i + q.exportMenuHeight > u && "top" !== m.alignOptions.verticalAlign ? b.bottom = u - e - x + "px" : b.top = e + i - x + "px",
			h(w, b),
			q.openMenu = !0
		},
		addButton: function(c) {
			var d, e, f = this, g = f.renderer, h = i(f.options.navigation.buttonOptions, c), j = h.onclick, l = h.menuItems, m = {
				stroke: h.symbolStroke,
				fill: h.symbolFill
			}, n = h.symbolSize || 12;
			if (f.btnCount || (f.btnCount = 0),
			f.exportDivElements || (f.exportDivElements = [],
			f.exportSVGElements = []),
			!1 !== h.enabled) {
				var o, p = h.theme, q = p.states, r = q && q.hover, q = q && q.select;
				delete p.states,
				j ? o = function() {
					j.apply(f, arguments)
				}
				: l && (o = function() {
					f.contextMenu(e.menuClassName, l, e.translateX, e.translateY, e.width, e.height, e),
					e.setState(2)
				}
				),
				h.text && h.symbol ? p.paddingLeft = a.pick(p.paddingLeft, 25) : h.text || k(p, {
					width: h.width,
					height: h.height,
					padding: 0
				}),
				e = g.button(h.text, 0, 0, o, p, r, q).attr({
					title: f.options.lang[h._titleKey],
					"stroke-linecap": "round"
				}),
				e.menuClassName = c.menuClassName || "highcharts-menu-" + f.btnCount++,
				h.symbol && (d = g.symbol(h.symbol, h.symbolX - n / 2, h.symbolY - n / 2, n, n).attr(k(m, {
					"stroke-width": h.symbolStrokeWidth || 1,
					zIndex: 1
				})).add(e)),
				e.add().align(k(h, {
					width: e.width,
					x: a.pick(h.x, b)
				}), !0, "spacingBox"),
				b += (e.width + h.buttonSpacing) * ("right" === h.align ? -1 : 1),
				f.exportSVGElements.push(e, d)
			}
		},
		destroyExport: function(a) {
			var b, c, a = a.target;
			for (b = 0; b < a.exportSVGElements.length; b++)
				(c = a.exportSVGElements[b]) && (c.onclick = c.ontouchstart = null,
				a.exportSVGElements[b] = c.destroy());
			for (b = 0; b < a.exportDivElements.length; b++)
				c = a.exportDivElements[b],
				e(c, "mouseleave"),
				a.exportDivElements[b] = c.onmouseout = c.onmouseover = c.ontouchstart = c.onclick = null,
				g(c)
		}
	}),
	p.menu = function(a, b, c, d) {
		return ["M", a, b + 2.5, "L", a + c, b + 2.5, "M", a, b + d / 2 + .5, "L", a + c, b + d / 2 + .5, "M", a, b + d - 1.5, "L", a + c, b + d - 1.5]
	}
	,
	c.prototype.callbacks.push(function(a) {
		var c, e = a.options.exporting, f = e.buttons;
		if (b = 0,
		!1 !== e.enabled) {
			for (c in f)
				a.addButton(f[c]);
			d(a, "destroy", a.destroyExport)
		}
	})
}(Highcharts),
function(a, b, c) {
	function d(a) {
		return a
	}
	function e(a) {
		return f(decodeURIComponent(a.replace(h, " ")))
	}
	function f(a) {
		return 0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")),
		a
	}
	function g(a) {
		return i.json ? JSON.parse(a) : a
	}
	var h = /\+/g
	  , i = a.cookie = function(f, h, j) {
		if (h !== c) {
			if (j = a.extend({}, i.defaults, j),
			null === h && (j.expires = -1),
			"number" == typeof j.expires) {
				var k = j.expires
				  , l = j.expires = new Date;
				l.setDate(l.getDate() + k)
			}
			return h = i.json ? JSON.stringify(h) : String(h),
			b.cookie = [encodeURIComponent(f), "=", i.raw ? h : encodeURIComponent(h), j.expires ? "; expires=" + j.expires.toUTCString() : "", j.path ? "; path=" + j.path : "", j.domain ? "; domain=" + j.domain : "", j.secure ? "; secure" : ""].join("")
		}
		for (var m = i.raw ? d : e, n = b.cookie.split("; "), o = f ? null : {}, p = 0, q = n.length; p < q; p++) {
			var r = n[p].split("=")
			  , s = m(r.shift())
			  , t = m(r.join("="));
			if (f && f === s) {
				o = g(t);
				break
			}
			f || (o[s] = g(t))
		}
		return o
	}
	;
	i.defaults = {
		path: "/"
	},
	a.removeCookie = function(b, c) {
		return null !== a.cookie(b) && (a.cookie(b, null, c),
		!0)
	}
}(jQuery, document),
function(a, b) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.moment = b()
}(this, function() {
	"use strict";
	function a() {
		return zb.apply(null, arguments)
	}
	function b(a) {
		return a instanceof Array || "[object Array]" === Object.prototype.toString.call(a)
	}
	function c(a) {
		return null != a && "[object Object]" === Object.prototype.toString.call(a)
	}
	function d(a) {
		if (Object.getOwnPropertyNames)
			return 0 === Object.getOwnPropertyNames(a).length;
		var b;
		for (b in a)
			if (a.hasOwnProperty(b))
				return !1;
		return !0
	}
	function e(a) {
		return void 0 === a
	}
	function f(a) {
		return "number" == typeof a || "[object Number]" === Object.prototype.toString.call(a)
	}
	function g(a) {
		return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a)
	}
	function h(a, b) {
		var c, d = [];
		for (c = 0; c < a.length; ++c)
			d.push(b(a[c], c));
		return d
	}
	function i(a, b) {
		return Object.prototype.hasOwnProperty.call(a, b)
	}
	function j(a, b) {
		for (var c in b)
			i(b, c) && (a[c] = b[c]);
		return i(b, "toString") && (a.toString = b.toString),
		i(b, "valueOf") && (a.valueOf = b.valueOf),
		a
	}
	function k(a, b, c, d) {
		return Pa(a, b, c, d, !0).utc()
	}
	function l() {
		return {
			empty: !1,
			unusedTokens: [],
			unusedInput: [],
			overflow: -2,
			charsLeftOver: 0,
			nullInput: !1,
			invalidMonth: null,
			invalidFormat: !1,
			userInvalidated: !1,
			iso: !1,
			parsedDateParts: [],
			meridiem: null,
			rfc2822: !1,
			weekdayMismatch: !1
		}
	}
	function m(a) {
		return null == a._pf && (a._pf = l()),
		a._pf
	}
	function n(a) {
		if (null == a._isValid) {
			var b = m(a)
			  , c = Ab.call(b.parsedDateParts, function(a) {
				return null != a
			})
			  , d = !isNaN(a._d.getTime()) && b.overflow < 0 && !b.empty && !b.invalidMonth && !b.invalidWeekday && !b.weekdayMismatch && !b.nullInput && !b.invalidFormat && !b.userInvalidated && (!b.meridiem || b.meridiem && c);
			if (a._strict && (d = d && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour),
			null != Object.isFrozen && Object.isFrozen(a))
				return d;
			a._isValid = d
		}
		return a._isValid
	}
	function o(a) {
		var b = k(NaN);
		return null != a ? j(m(b), a) : m(b).userInvalidated = !0,
		b
	}
	function p(a, b) {
		var c, d, f;
		if (e(b._isAMomentObject) || (a._isAMomentObject = b._isAMomentObject),
		e(b._i) || (a._i = b._i),
		e(b._f) || (a._f = b._f),
		e(b._l) || (a._l = b._l),
		e(b._strict) || (a._strict = b._strict),
		e(b._tzm) || (a._tzm = b._tzm),
		e(b._isUTC) || (a._isUTC = b._isUTC),
		e(b._offset) || (a._offset = b._offset),
		e(b._pf) || (a._pf = m(b)),
		e(b._locale) || (a._locale = b._locale),
		Bb.length > 0)
			for (c = 0; c < Bb.length; c++)
				e(f = b[d = Bb[c]]) || (a[d] = f);
		return a
	}
	function q(b) {
		p(this, b),
		this._d = new Date(null != b._d ? b._d.getTime() : NaN),
		this.isValid() || (this._d = new Date(NaN)),
		!1 === Cb && (Cb = !0,
		a.updateOffset(this),
		Cb = !1)
	}
	function r(a) {
		return a instanceof q || null != a && null != a._isAMomentObject
	}
	function s(a) {
		return a < 0 ? Math.ceil(a) || 0 : Math.floor(a)
	}
	function t(a) {
		var b = +a
		  , c = 0;
		return 0 !== b && isFinite(b) && (c = s(b)),
		c
	}
	function u(a, b, c) {
		var d, e = Math.min(a.length, b.length), f = Math.abs(a.length - b.length), g = 0;
		for (d = 0; d < e; d++)
			(c && a[d] !== b[d] || !c && t(a[d]) !== t(b[d])) && g++;
		return g + f
	}
	function v(b) {
		!1 === a.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + b)
	}
	function w(b, c) {
		var d = !0;
		return j(function() {
			if (null != a.deprecationHandler && a.deprecationHandler(null, b),
			d) {
				for (var e, f = [], g = 0; g < arguments.length; g++) {
					if (e = "",
					"object" == typeof arguments[g]) {
						e += "\n[" + g + "] ";
						for (var h in arguments[0])
							e += h + ": " + arguments[0][h] + ", ";
						e = e.slice(0, -2)
					} else
						e = arguments[g];
					f.push(e)
				}
				v(b + "\nArguments: " + Array.prototype.slice.call(f).join("") + "\n" + (new Error).stack),
				d = !1
			}
			return c.apply(this, arguments)
		}, c)
	}
	function x(b, c) {
		null != a.deprecationHandler && a.deprecationHandler(b, c),
		Db[b] || (v(c),
		Db[b] = !0)
	}
	function y(a) {
		return a instanceof Function || "[object Function]" === Object.prototype.toString.call(a)
	}
	function z(a, b) {
		var d, e = j({}, a);
		for (d in b)
			i(b, d) && (c(a[d]) && c(b[d]) ? (e[d] = {},
			j(e[d], a[d]),
			j(e[d], b[d])) : null != b[d] ? e[d] = b[d] : delete e[d]);
		for (d in a)
			i(a, d) && !i(b, d) && c(a[d]) && (e[d] = j({}, e[d]));
		return e
	}
	function A(a) {
		null != a && this.set(a)
	}
	function B(a, b) {
		var c = a.toLowerCase();
		Jb[c] = Jb[c + "s"] = Jb[b] = a
	}
	function C(a) {
		return "string" == typeof a ? Jb[a] || Jb[a.toLowerCase()] : void 0
	}
	function D(a) {
		var b, c, d = {};
		for (c in a)
			i(a, c) && (b = C(c)) && (d[b] = a[c]);
		return d
	}
	function E(a, b) {
		Kb[a] = b
	}
	function F(a) {
		var b = [];
		for (var c in a)
			b.push({
				unit: c,
				priority: Kb[c]
			});
		return b.sort(function(a, b) {
			return a.priority - b.priority
		}),
		b
	}
	function G(a, b, c) {
		var d = "" + Math.abs(a)
		  , e = b - d.length;
		return (a >= 0 ? c ? "+" : "" : "-") + Math.pow(10, Math.max(0, e)).toString().substr(1) + d
	}
	function H(a, b, c, d) {
		var e = d;
		"string" == typeof d && (e = function() {
			return this[d]()
		}
		),
		a && (Ob[a] = e),
		b && (Ob[b[0]] = function() {
			return G(e.apply(this, arguments), b[1], b[2])
		}
		),
		c && (Ob[c] = function() {
			return this.localeData().ordinal(e.apply(this, arguments), a)
		}
		)
	}
	function I(a) {
		return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
	}
	function J(a) {
		var b, c, d = a.match(Lb);
		for (b = 0,
		c = d.length; b < c; b++)
			Ob[d[b]] ? d[b] = Ob[d[b]] : d[b] = I(d[b]);
		return function(b) {
			var e, f = "";
			for (e = 0; e < c; e++)
				f += y(d[e]) ? d[e].call(b, a) : d[e];
			return f
		}
	}
	function K(a, b) {
		return a.isValid() ? (b = L(b, a.localeData()),
		Nb[b] = Nb[b] || J(b),
		Nb[b](a)) : a.localeData().invalidDate()
	}
	function L(a, b) {
		var c = 5;
		for (Mb.lastIndex = 0; c >= 0 && Mb.test(a); )
			a = a.replace(Mb, function(a) {
				return b.longDateFormat(a) || a
			}),
			Mb.lastIndex = 0,
			c -= 1;
		return a
	}
	function M(a, b, c) {
		ec[a] = y(b) ? b : function(a, d) {
			return a && c ? c : b
		}
	}
	function N(a, b) {
		return i(ec, a) ? ec[a](b._strict, b._locale) : new RegExp(O(a))
	}
	function O(a) {
		return P(a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(a, b, c, d, e) {
			return b || c || d || e
		}))
	}
	function P(a) {
		return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
	}
	function Q(a, b) {
		var c, d = b;
		for ("string" == typeof a && (a = [a]),
		f(b) && (d = function(a, c) {
			c[b] = t(a)
		}
		),
		c = 0; c < a.length; c++)
			fc[a[c]] = d
	}
	function R(a, b) {
		Q(a, function(a, c, d, e) {
			d._w = d._w || {},
			b(a, d._w, d, e)
		})
	}
	function S(a, b, c) {
		null != b && i(fc, a) && fc[a](b, c._a, c, a)
	}
	function T(a) {
		return U(a) ? 366 : 365
	}
	function U(a) {
		return a % 4 == 0 && a % 100 != 0 || a % 400 == 0
	}
	function V(b, c) {
		return function(d) {
			return null != d ? (X(this, b, d),
			a.updateOffset(this, c),
			this) : W(this, b)
		}
	}
	function W(a, b) {
		return a.isValid() ? a._d["get" + (a._isUTC ? "UTC" : "") + b]() : NaN
	}
	function X(a, b, c) {
		a.isValid() && !isNaN(c) && ("FullYear" === b && U(a.year()) ? a._d["set" + (a._isUTC ? "UTC" : "") + b](c, a.month(), Z(c, a.month())) : a._d["set" + (a._isUTC ? "UTC" : "") + b](c))
	}
	function Y(a, b) {
		return (a % b + b) % b
	}
	function Z(a, b) {
		if (isNaN(a) || isNaN(b))
			return NaN;
		var c = Y(b, 12);
		return a += (b - c) / 12,
		1 === c ? U(a) ? 29 : 28 : 31 - c % 7 % 2
	}
	function $(a, b, c) {
		var d, e, f, g = a.toLocaleLowerCase();
		if (!this._monthsParse)
			for (this._monthsParse = [],
			this._longMonthsParse = [],
			this._shortMonthsParse = [],
			d = 0; d < 12; ++d)
				f = k([2e3, d]),
				this._shortMonthsParse[d] = this.monthsShort(f, "").toLocaleLowerCase(),
				this._longMonthsParse[d] = this.months(f, "").toLocaleLowerCase();
		return c ? "MMM" === b ? -1 !== (e = pc.call(this._shortMonthsParse, g)) ? e : null : -1 !== (e = pc.call(this._longMonthsParse, g)) ? e : null : "MMM" === b ? -1 !== (e = pc.call(this._shortMonthsParse, g)) ? e : -1 !== (e = pc.call(this._longMonthsParse, g)) ? e : null : -1 !== (e = pc.call(this._longMonthsParse, g)) ? e : -1 !== (e = pc.call(this._shortMonthsParse, g)) ? e : null
	}
	function _(a, b) {
		var c;
		if (!a.isValid())
			return a;
		if ("string" == typeof b)
			if (/^\d+$/.test(b))
				b = t(b);
			else if (b = a.localeData().monthsParse(b),
			!f(b))
				return a;
		return c = Math.min(a.date(), Z(a.year(), b)),
		a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c),
		a
	}
	function aa(b) {
		return null != b ? (_(this, b),
		a.updateOffset(this, !0),
		this) : W(this, "Month")
	}
	function ba() {
		function a(a, b) {
			return b.length - a.length
		}
		var b, c, d = [], e = [], f = [];
		for (b = 0; b < 12; b++)
			c = k([2e3, b]),
			d.push(this.monthsShort(c, "")),
			e.push(this.months(c, "")),
			f.push(this.months(c, "")),
			f.push(this.monthsShort(c, ""));
		for (d.sort(a),
		e.sort(a),
		f.sort(a),
		b = 0; b < 12; b++)
			d[b] = P(d[b]),
			e[b] = P(e[b]);
		for (b = 0; b < 24; b++)
			f[b] = P(f[b]);
		this._monthsRegex = new RegExp("^(" + f.join("|") + ")","i"),
		this._monthsShortRegex = this._monthsRegex,
		this._monthsStrictRegex = new RegExp("^(" + e.join("|") + ")","i"),
		this._monthsShortStrictRegex = new RegExp("^(" + d.join("|") + ")","i")
	}
	function ca(a, b, c, d, e, f, g) {
		var h = new Date(a,b,c,d,e,f,g);
		return a < 100 && a >= 0 && isFinite(h.getFullYear()) && h.setFullYear(a),
		h
	}
	function da(a) {
		var b = new Date(Date.UTC.apply(null, arguments));
		return a < 100 && a >= 0 && isFinite(b.getUTCFullYear()) && b.setUTCFullYear(a),
		b
	}
	function ea(a, b, c) {
		var d = 7 + b - c;
		return -(7 + da(a, 0, d).getUTCDay() - b) % 7 + d - 1
	}
	function fa(a, b, c, d, e) {
		var f, g, h = 1 + 7 * (b - 1) + (7 + c - d) % 7 + ea(a, d, e);
		return h <= 0 ? g = T(f = a - 1) + h : h > T(a) ? (f = a + 1,
		g = h - T(a)) : (f = a,
		g = h),
		{
			year: f,
			dayOfYear: g
		}
	}
	function ga(a, b, c) {
		var d, e, f = ea(a.year(), b, c), g = Math.floor((a.dayOfYear() - f - 1) / 7) + 1;
		return g < 1 ? d = g + ha(e = a.year() - 1, b, c) : g > ha(a.year(), b, c) ? (d = g - ha(a.year(), b, c),
		e = a.year() + 1) : (e = a.year(),
		d = g),
		{
			week: d,
			year: e
		}
	}
	function ha(a, b, c) {
		var d = ea(a, b, c)
		  , e = ea(a + 1, b, c);
		return (T(a) - d + e) / 7
	}
	function ia(a, b) {
		return "string" != typeof a ? a : isNaN(a) ? "number" == typeof (a = b.weekdaysParse(a)) ? a : null : parseInt(a, 10)
	}
	function ja(a, b) {
		return "string" == typeof a ? b.weekdaysParse(a) % 7 || 7 : isNaN(a) ? null : a
	}
	function ka(a, b, c) {
		var d, e, f, g = a.toLocaleLowerCase();
		if (!this._weekdaysParse)
			for (this._weekdaysParse = [],
			this._shortWeekdaysParse = [],
			this._minWeekdaysParse = [],
			d = 0; d < 7; ++d)
				f = k([2e3, 1]).day(d),
				this._minWeekdaysParse[d] = this.weekdaysMin(f, "").toLocaleLowerCase(),
				this._shortWeekdaysParse[d] = this.weekdaysShort(f, "").toLocaleLowerCase(),
				this._weekdaysParse[d] = this.weekdays(f, "").toLocaleLowerCase();
		return c ? "dddd" === b ? -1 !== (e = pc.call(this._weekdaysParse, g)) ? e : null : "ddd" === b ? -1 !== (e = pc.call(this._shortWeekdaysParse, g)) ? e : null : -1 !== (e = pc.call(this._minWeekdaysParse, g)) ? e : null : "dddd" === b ? -1 !== (e = pc.call(this._weekdaysParse, g)) ? e : -1 !== (e = pc.call(this._shortWeekdaysParse, g)) ? e : -1 !== (e = pc.call(this._minWeekdaysParse, g)) ? e : null : "ddd" === b ? -1 !== (e = pc.call(this._shortWeekdaysParse, g)) ? e : -1 !== (e = pc.call(this._weekdaysParse, g)) ? e : -1 !== (e = pc.call(this._minWeekdaysParse, g)) ? e : null : -1 !== (e = pc.call(this._minWeekdaysParse, g)) ? e : -1 !== (e = pc.call(this._weekdaysParse, g)) ? e : -1 !== (e = pc.call(this._shortWeekdaysParse, g)) ? e : null
	}
	function la() {
		function a(a, b) {
			return b.length - a.length
		}
		var b, c, d, e, f, g = [], h = [], i = [], j = [];
		for (b = 0; b < 7; b++)
			c = k([2e3, 1]).day(b),
			d = this.weekdaysMin(c, ""),
			e = this.weekdaysShort(c, ""),
			f = this.weekdays(c, ""),
			g.push(d),
			h.push(e),
			i.push(f),
			j.push(d),
			j.push(e),
			j.push(f);
		for (g.sort(a),
		h.sort(a),
		i.sort(a),
		j.sort(a),
		b = 0; b < 7; b++)
			h[b] = P(h[b]),
			i[b] = P(i[b]),
			j[b] = P(j[b]);
		this._weekdaysRegex = new RegExp("^(" + j.join("|") + ")","i"),
		this._weekdaysShortRegex = this._weekdaysRegex,
		this._weekdaysMinRegex = this._weekdaysRegex,
		this._weekdaysStrictRegex = new RegExp("^(" + i.join("|") + ")","i"),
		this._weekdaysShortStrictRegex = new RegExp("^(" + h.join("|") + ")","i"),
		this._weekdaysMinStrictRegex = new RegExp("^(" + g.join("|") + ")","i")
	}
	function ma() {
		return this.hours() % 12 || 12
	}
	function na(a, b) {
		H(a, 0, 0, function() {
			return this.localeData().meridiem(this.hours(), this.minutes(), b)
		})
	}
	function oa(a, b) {
		return b._meridiemParse
	}
	function pa(a) {
		return a ? a.toLowerCase().replace("_", "-") : a
	}
	function qa(a) {
		for (var b, c, d, e, f = 0; f < a.length; ) {
			for (b = (e = pa(a[f]).split("-")).length,
			c = (c = pa(a[f + 1])) ? c.split("-") : null; b > 0; ) {
				if (d = ra(e.slice(0, b).join("-")))
					return d;
				if (c && c.length >= b && u(e, c, !0) >= b - 1)
					break;
				b--
			}
			f++
		}
		return null
	}
	function ra(a) {
		var b = null;
		if (!Hc[a] && "undefined" != typeof module && module && module.exports)
			try {
				b = Dc._abbr,
				require("./locale/" + a),
				sa(b)
			} catch (a) {}
		return Hc[a]
	}
	function sa(a, b) {
		var c;
		return a && (c = e(b) ? ua(a) : ta(a, b)) && (Dc = c),
		Dc._abbr
	}
	function ta(a, b) {
		if (null !== b) {
			var c = Gc;
			if (b.abbr = a,
			null != Hc[a])
				x("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),
				c = Hc[a]._config;
			else if (null != b.parentLocale) {
				if (null == Hc[b.parentLocale])
					return Ic[b.parentLocale] || (Ic[b.parentLocale] = []),
					Ic[b.parentLocale].push({
						name: a,
						config: b
					}),
					null;
				c = Hc[b.parentLocale]._config
			}
			return Hc[a] = new A(z(c, b)),
			Ic[a] && Ic[a].forEach(function(a) {
				ta(a.name, a.config)
			}),
			sa(a),
			Hc[a]
		}
		return delete Hc[a],
		null
	}
	function ua(a) {
		var c;
		if (a && a._locale && a._locale._abbr && (a = a._locale._abbr),
		!a)
			return Dc;
		if (!b(a)) {
			if (c = ra(a))
				return c;
			a = [a]
		}
		return qa(a)
	}
	function va(a) {
		var b, c = a._a;
		return c && -2 === m(a).overflow && (b = c[hc] < 0 || c[hc] > 11 ? hc : c[ic] < 1 || c[ic] > Z(c[gc], c[hc]) ? ic : c[jc] < 0 || c[jc] > 24 || 24 === c[jc] && (0 !== c[kc] || 0 !== c[lc] || 0 !== c[mc]) ? jc : c[kc] < 0 || c[kc] > 59 ? kc : c[lc] < 0 || c[lc] > 59 ? lc : c[mc] < 0 || c[mc] > 999 ? mc : -1,
		m(a)._overflowDayOfYear && (b < gc || b > ic) && (b = ic),
		m(a)._overflowWeeks && -1 === b && (b = nc),
		m(a)._overflowWeekday && -1 === b && (b = oc),
		m(a).overflow = b),
		a
	}
	function wa(a, b, c) {
		return null != a ? a : null != b ? b : c
	}
	function xa(b) {
		var c = new Date(a.now());
		return b._useUTC ? [c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()] : [c.getFullYear(), c.getMonth(), c.getDate()]
	}
	function ya(a) {
		var b, c, d, e, f = [];
		if (!a._d) {
			for (d = xa(a),
			a._w && null == a._a[ic] && null == a._a[hc] && za(a),
			null != a._dayOfYear && (e = wa(a._a[gc], d[gc]),
			(a._dayOfYear > T(e) || 0 === a._dayOfYear) && (m(a)._overflowDayOfYear = !0),
			c = da(e, 0, a._dayOfYear),
			a._a[hc] = c.getUTCMonth(),
			a._a[ic] = c.getUTCDate()),
			b = 0; b < 3 && null == a._a[b]; ++b)
				a._a[b] = f[b] = d[b];
			for (; b < 7; b++)
				a._a[b] = f[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
			24 === a._a[jc] && 0 === a._a[kc] && 0 === a._a[lc] && 0 === a._a[mc] && (a._nextDay = !0,
			a._a[jc] = 0),
			a._d = (a._useUTC ? da : ca).apply(null, f),
			null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm),
			a._nextDay && (a._a[jc] = 24),
			a._w && void 0 !== a._w.d && a._w.d !== a._d.getDay() && (m(a).weekdayMismatch = !0)
		}
	}
	function za(a) {
		var b, c, d, e, f, g, h, i;
		if (null != (b = a._w).GG || null != b.W || null != b.E)
			f = 1,
			g = 4,
			c = wa(b.GG, a._a[gc], ga(Qa(), 1, 4).year),
			d = wa(b.W, 1),
			((e = wa(b.E, 1)) < 1 || e > 7) && (i = !0);
		else {
			f = a._locale._week.dow,
			g = a._locale._week.doy;
			var j = ga(Qa(), f, g);
			c = wa(b.gg, a._a[gc], j.year),
			d = wa(b.w, j.week),
			null != b.d ? ((e = b.d) < 0 || e > 6) && (i = !0) : null != b.e ? (e = b.e + f,
			(b.e < 0 || b.e > 6) && (i = !0)) : e = f
		}
		d < 1 || d > ha(c, f, g) ? m(a)._overflowWeeks = !0 : null != i ? m(a)._overflowWeekday = !0 : (h = fa(c, d, e, f, g),
		a._a[gc] = h.year,
		a._dayOfYear = h.dayOfYear)
	}
	function Aa(a) {
		var b, c, d, e, f, g, h = a._i, i = Jc.exec(h) || Kc.exec(h);
		if (i) {
			for (m(a).iso = !0,
			b = 0,
			c = Mc.length; b < c; b++)
				if (Mc[b][1].exec(i[1])) {
					e = Mc[b][0],
					d = !1 !== Mc[b][2];
					break
				}
			if (null == e)
				return void (a._isValid = !1);
			if (i[3]) {
				for (b = 0,
				c = Nc.length; b < c; b++)
					if (Nc[b][1].exec(i[3])) {
						f = (i[2] || " ") + Nc[b][0];
						break
					}
				if (null == f)
					return void (a._isValid = !1)
			}
			if (!d && null != f)
				return void (a._isValid = !1);
			if (i[4]) {
				if (!Lc.exec(i[4]))
					return void (a._isValid = !1);
				g = "Z"
			}
			a._f = e + (f || "") + (g || ""),
			Ia(a)
		} else
			a._isValid = !1
	}
	function Ba(a, b, c, d, e, f) {
		var g = [Ca(a), tc.indexOf(b), parseInt(c, 10), parseInt(d, 10), parseInt(e, 10)];
		return f && g.push(parseInt(f, 10)),
		g
	}
	function Ca(a) {
		var b = parseInt(a, 10);
		return b <= 49 ? 2e3 + b : b <= 999 ? 1900 + b : b
	}
	function Da(a) {
		return a.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim()
	}
	function Ea(a, b, c) {
		return !a || yc.indexOf(a) === new Date(b[0],b[1],b[2]).getDay() || (m(c).weekdayMismatch = !0,
		c._isValid = !1,
		!1)
	}
	function Fa(a, b, c) {
		if (a)
			return Qc[a];
		if (b)
			return 0;
		var d = parseInt(c, 10)
		  , e = d % 100;
		return (d - e) / 100 * 60 + e
	}
	function Ga(a) {
		var b = Pc.exec(Da(a._i));
		if (b) {
			var c = Ba(b[4], b[3], b[2], b[5], b[6], b[7]);
			if (!Ea(b[1], c, a))
				return;
			a._a = c,
			a._tzm = Fa(b[8], b[9], b[10]),
			a._d = da.apply(null, a._a),
			a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm),
			m(a).rfc2822 = !0
		} else
			a._isValid = !1
	}
	function Ha(b) {
		var c = Oc.exec(b._i);
		null === c ? (Aa(b),
		!1 === b._isValid && (delete b._isValid,
		Ga(b),
		!1 === b._isValid && (delete b._isValid,
		a.createFromInputFallback(b)))) : b._d = new Date(+c[1])
	}
	function Ia(b) {
		if (b._f !== a.ISO_8601)
			if (b._f !== a.RFC_2822) {
				b._a = [],
				m(b).empty = !0;
				var c, d, e, f, g, h = "" + b._i, i = h.length, j = 0;
				for (e = L(b._f, b._locale).match(Lb) || [],
				c = 0; c < e.length; c++)
					f = e[c],
					(d = (h.match(N(f, b)) || [])[0]) && ((g = h.substr(0, h.indexOf(d))).length > 0 && m(b).unusedInput.push(g),
					h = h.slice(h.indexOf(d) + d.length),
					j += d.length),
					Ob[f] ? (d ? m(b).empty = !1 : m(b).unusedTokens.push(f),
					S(f, d, b)) : b._strict && !d && m(b).unusedTokens.push(f);
				m(b).charsLeftOver = i - j,
				h.length > 0 && m(b).unusedInput.push(h),
				b._a[jc] <= 12 && !0 === m(b).bigHour && b._a[jc] > 0 && (m(b).bigHour = void 0),
				m(b).parsedDateParts = b._a.slice(0),
				m(b).meridiem = b._meridiem,
				b._a[jc] = Ja(b._locale, b._a[jc], b._meridiem),
				ya(b),
				va(b)
			} else
				Ga(b);
		else
			Aa(b)
	}
	function Ja(a, b, c) {
		var d;
		return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? ((d = a.isPM(c)) && b < 12 && (b += 12),
		d || 12 !== b || (b = 0),
		b) : b
	}
	function Ka(a) {
		var b, c, d, e, f;
		if (0 === a._f.length)
			return m(a).invalidFormat = !0,
			void (a._d = new Date(NaN));
		for (e = 0; e < a._f.length; e++)
			f = 0,
			b = p({}, a),
			null != a._useUTC && (b._useUTC = a._useUTC),
			b._f = a._f[e],
			Ia(b),
			n(b) && (f += m(b).charsLeftOver,
			f += 10 * m(b).unusedTokens.length,
			m(b).score = f,
			(null == d || f < d) && (d = f,
			c = b));
		j(a, c || b)
	}
	function La(a) {
		if (!a._d) {
			var b = D(a._i);
			a._a = h([b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], function(a) {
				return a && parseInt(a, 10)
			}),
			ya(a)
		}
	}
	function Ma(a) {
		var b = new q(va(Na(a)));
		return b._nextDay && (b.add(1, "d"),
		b._nextDay = void 0),
		b
	}
	function Na(a) {
		var c = a._i
		  , d = a._f;
		return a._locale = a._locale || ua(a._l),
		null === c || void 0 === d && "" === c ? o({
			nullInput: !0
		}) : ("string" == typeof c && (a._i = c = a._locale.preparse(c)),
		r(c) ? new q(va(c)) : (g(c) ? a._d = c : b(d) ? Ka(a) : d ? Ia(a) : Oa(a),
		n(a) || (a._d = null),
		a))
	}
	function Oa(d) {
		var i = d._i;
		e(i) ? d._d = new Date(a.now()) : g(i) ? d._d = new Date(i.valueOf()) : "string" == typeof i ? Ha(d) : b(i) ? (d._a = h(i.slice(0), function(a) {
			return parseInt(a, 10)
		}),
		ya(d)) : c(i) ? La(d) : f(i) ? d._d = new Date(i) : a.createFromInputFallback(d)
	}
	function Pa(a, e, f, g, h) {
		var i = {};
		return !0 !== f && !1 !== f || (g = f,
		f = void 0),
		(c(a) && d(a) || b(a) && 0 === a.length) && (a = void 0),
		i._isAMomentObject = !0,
		i._useUTC = i._isUTC = h,
		i._l = f,
		i._i = a,
		i._f = e,
		i._strict = g,
		Ma(i)
	}
	function Qa(a, b, c, d) {
		return Pa(a, b, c, d, !1)
	}
	function Ra(a, c) {
		var d, e;
		if (1 === c.length && b(c[0]) && (c = c[0]),
		!c.length)
			return Qa();
		for (d = c[0],
		e = 1; e < c.length; ++e)
			c[e].isValid() && !c[e][a](d) || (d = c[e]);
		return d
	}
	function Sa(a) {
		for (var b in a)
			if (-1 === pc.call(Tc, b) || null != a[b] && isNaN(a[b]))
				return !1;
		for (var c = !1, d = 0; d < Tc.length; ++d)
			if (a[Tc[d]]) {
				if (c)
					return !1;
				parseFloat(a[Tc[d]]) !== t(a[Tc[d]]) && (c = !0)
			}
		return !0
	}
	function Ta(a) {
		var b = D(a)
		  , c = b.year || 0
		  , d = b.quarter || 0
		  , e = b.month || 0
		  , f = b.week || 0
		  , g = b.day || 0
		  , h = b.hour || 0
		  , i = b.minute || 0
		  , j = b.second || 0
		  , k = b.millisecond || 0;
		this._isValid = Sa(b),
		this._milliseconds = +k + 1e3 * j + 6e4 * i + 1e3 * h * 60 * 60,
		this._days = +g + 7 * f,
		this._months = +e + 3 * d + 12 * c,
		this._data = {},
		this._locale = ua(),
		this._bubble()
	}
	function Ua(a) {
		return a instanceof Ta
	}
	function Va(a) {
		return a < 0 ? -1 * Math.round(-1 * a) : Math.round(a)
	}
	function Wa(a, b) {
		H(a, 0, 0, function() {
			var a = this.utcOffset()
			  , c = "+";
			return a < 0 && (a = -a,
			c = "-"),
			c + G(~~(a / 60), 2) + b + G(~~a % 60, 2)
		})
	}
	function Xa(a, b) {
		var c = (b || "").match(a);
		if (null === c)
			return null;
		var d = ((c[c.length - 1] || []) + "").match(Uc) || ["-", 0, 0]
		  , e = 60 * d[1] + t(d[2]);
		return 0 === e ? 0 : "+" === d[0] ? e : -e
	}
	function Ya(b, c) {
		var d, e;
		return c._isUTC ? (d = c.clone(),
		e = (r(b) || g(b) ? b.valueOf() : Qa(b).valueOf()) - d.valueOf(),
		d._d.setTime(d._d.valueOf() + e),
		a.updateOffset(d, !1),
		d) : Qa(b).local()
	}
	function Za(a) {
		return 15 * -Math.round(a._d.getTimezoneOffset() / 15)
	}
	function $a() {
		return !!this.isValid() && this._isUTC && 0 === this._offset
	}
	function _a(a, b) {
		var c, d, e, g = a, h = null;
		return Ua(a) ? g = {
			ms: a._milliseconds,
			d: a._days,
			M: a._months
		} : f(a) ? (g = {},
		b ? g[b] = a : g.milliseconds = a) : (h = Vc.exec(a)) ? (c = "-" === h[1] ? -1 : 1,
		g = {
			y: 0,
			d: t(h[ic]) * c,
			h: t(h[jc]) * c,
			m: t(h[kc]) * c,
			s: t(h[lc]) * c,
			ms: t(Va(1e3 * h[mc])) * c
		}) : (h = Wc.exec(a)) ? (c = "-" === h[1] ? -1 : (h[1],
		1),
		g = {
			y: ab(h[2], c),
			M: ab(h[3], c),
			w: ab(h[4], c),
			d: ab(h[5], c),
			h: ab(h[6], c),
			m: ab(h[7], c),
			s: ab(h[8], c)
		}) : null == g ? g = {} : "object" == typeof g && ("from"in g || "to"in g) && (e = cb(Qa(g.from), Qa(g.to)),
		(g = {}).ms = e.milliseconds,
		g.M = e.months),
		d = new Ta(g),
		Ua(a) && i(a, "_locale") && (d._locale = a._locale),
		d
	}
	function ab(a, b) {
		var c = a && parseFloat(a.replace(",", "."));
		return (isNaN(c) ? 0 : c) * b
	}
	function bb(a, b) {
		var c = {
			milliseconds: 0,
			months: 0
		};
		return c.months = b.month() - a.month() + 12 * (b.year() - a.year()),
		a.clone().add(c.months, "M").isAfter(b) && --c.months,
		c.milliseconds = +b - +a.clone().add(c.months, "M"),
		c
	}
	function cb(a, b) {
		var c;
		return a.isValid() && b.isValid() ? (b = Ya(b, a),
		a.isBefore(b) ? c = bb(a, b) : ((c = bb(b, a)).milliseconds = -c.milliseconds,
		c.months = -c.months),
		c) : {
			milliseconds: 0,
			months: 0
		}
	}
	function db(a, b) {
		return function(c, d) {
			var e, f;
			return null === d || isNaN(+d) || (x(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),
			f = c,
			c = d,
			d = f),
			c = "string" == typeof c ? +c : c,
			e = _a(c, d),
			eb(this, e, a),
			this
		}
	}
	function eb(b, c, d, e) {
		var f = c._milliseconds
		  , g = Va(c._days)
		  , h = Va(c._months);
		b.isValid() && (e = null == e || e,
		h && _(b, W(b, "Month") + h * d),
		g && X(b, "Date", W(b, "Date") + g * d),
		f && b._d.setTime(b._d.valueOf() + f * d),
		e && a.updateOffset(b, g || h))
	}
	function fb(a, b) {
		var c, d = 12 * (b.year() - a.year()) + (b.month() - a.month()), e = a.clone().add(d, "months");
		return c = b - e < 0 ? (b - e) / (e - a.clone().add(d - 1, "months")) : (b - e) / (a.clone().add(d + 1, "months") - e),
		-(d + c) || 0
	}
	function gb(a) {
		var b;
		return void 0 === a ? this._locale._abbr : (null != (b = ua(a)) && (this._locale = b),
		this)
	}
	function hb() {
		return this._locale
	}
	function ib(a, b) {
		H(0, [a, a.length], 0, b)
	}
	function jb(a, b, c, d, e) {
		var f;
		return null == a ? ga(this, d, e).year : (f = ha(a, d, e),
		b > f && (b = f),
		kb.call(this, a, b, c, d, e))
	}
	function kb(a, b, c, d, e) {
		var f = fa(a, b, c, d, e)
		  , g = da(f.year, 0, f.dayOfYear);
		return this.year(g.getUTCFullYear()),
		this.month(g.getUTCMonth()),
		this.date(g.getUTCDate()),
		this
	}
	function lb(a) {
		return a
	}
	function mb(a, b, c, d) {
		var e = ua()
		  , f = k().set(d, b);
		return e[c](f, a)
	}
	function nb(a, b, c) {
		if (f(a) && (b = a,
		a = void 0),
		a = a || "",
		null != b)
			return mb(a, b, c, "month");
		var d, e = [];
		for (d = 0; d < 12; d++)
			e[d] = mb(a, d, c, "month");
		return e
	}
	function ob(a, b, c, d) {
		"boolean" == typeof a ? (f(b) && (c = b,
		b = void 0),
		b = b || "") : (c = b = a,
		a = !1,
		f(b) && (c = b,
		b = void 0),
		b = b || "");
		var e = ua()
		  , g = a ? e._week.dow : 0;
		if (null != c)
			return mb(b, (c + g) % 7, d, "day");
		var h, i = [];
		for (h = 0; h < 7; h++)
			i[h] = mb(b, (h + g) % 7, d, "day");
		return i
	}
	function pb(a, b, c, d) {
		var e = _a(b, c);
		return a._milliseconds += d * e._milliseconds,
		a._days += d * e._days,
		a._months += d * e._months,
		a._bubble()
	}
	function qb(a) {
		return a < 0 ? Math.floor(a) : Math.ceil(a)
	}
	function rb(a) {
		return 4800 * a / 146097
	}
	function sb(a) {
		return 146097 * a / 4800
	}
	function tb(a) {
		return function() {
			return this.as(a)
		}
	}
	function ub(a) {
		return function() {
			return this.isValid() ? this._data[a] : NaN
		}
	}
	function vb(a, b, c, d, e) {
		return e.relativeTime(b || 1, !!c, a, d)
	}
	function wb(a, b, c) {
		var d = _a(a).abs()
		  , e = vd(d.as("s"))
		  , f = vd(d.as("m"))
		  , g = vd(d.as("h"))
		  , h = vd(d.as("d"))
		  , i = vd(d.as("M"))
		  , j = vd(d.as("y"))
		  , k = e <= wd.ss && ["s", e] || e < wd.s && ["ss", e] || f <= 1 && ["m"] || f < wd.m && ["mm", f] || g <= 1 && ["h"] || g < wd.h && ["hh", g] || h <= 1 && ["d"] || h < wd.d && ["dd", h] || i <= 1 && ["M"] || i < wd.M && ["MM", i] || j <= 1 && ["y"] || ["yy", j];
		return k[2] = b,
		k[3] = +a > 0,
		k[4] = c,
		vb.apply(null, k)
	}
	function xb(a) {
		return (a > 0) - (a < 0) || +a
	}
	function yb() {
		if (!this.isValid())
			return this.localeData().invalidDate();
		var a, b, c, d = xd(this._milliseconds) / 1e3, e = xd(this._days), f = xd(this._months);
		b = s((a = s(d / 60)) / 60),
		d %= 60,
		a %= 60;
		var g = c = s(f / 12)
		  , h = f %= 12
		  , i = e
		  , j = b
		  , k = a
		  , l = d ? d.toFixed(3).replace(/\.?0+$/, "") : ""
		  , m = this.asSeconds();
		if (!m)
			return "P0D";
		var n = m < 0 ? "-" : ""
		  , o = xb(this._months) !== xb(m) ? "-" : ""
		  , p = xb(this._days) !== xb(m) ? "-" : ""
		  , q = xb(this._milliseconds) !== xb(m) ? "-" : "";
		return n + "P" + (g ? o + g + "Y" : "") + (h ? o + h + "M" : "") + (i ? p + i + "D" : "") + (j || k || l ? "T" : "") + (j ? q + j + "H" : "") + (k ? q + k + "M" : "") + (l ? q + l + "S" : "")
	}
	var zb, Ab;
	Ab = Array.prototype.some ? Array.prototype.some : function(a) {
		for (var b = Object(this), c = b.length >>> 0, d = 0; d < c; d++)
			if (d in b && a.call(this, b[d], d, b))
				return !0;
		return !1
	}
	;
	var Bb = a.momentProperties = []
	  , Cb = !1
	  , Db = {};
	a.suppressDeprecationWarnings = !1,
	a.deprecationHandler = null;
	var Eb;
	Eb = Object.keys ? Object.keys : function(a) {
		var b, c = [];
		for (b in a)
			i(a, b) && c.push(b);
		return c
	}
	;
	var Fb = {
		sameDay: "[Today at] LT",
		nextDay: "[Tomorrow at] LT",
		nextWeek: "dddd [at] LT",
		lastDay: "[Yesterday at] LT",
		lastWeek: "[Last] dddd [at] LT",
		sameElse: "L"
	}
	  , Gb = {
		LTS: "h:mm:ss A",
		LT: "h:mm A",
		L: "MM/DD/YYYY",
		LL: "MMMM D, YYYY",
		LLL: "MMMM D, YYYY h:mm A",
		LLLL: "dddd, MMMM D, YYYY h:mm A"
	}
	  , Hb = /\d{1,2}/
	  , Ib = {
		future: "in %s",
		past: "%s ago",
		s: "a few seconds",
		ss: "%d seconds",
		m: "a minute",
		mm: "%d minutes",
		h: "an hour",
		hh: "%d hours",
		d: "a day",
		dd: "%d days",
		M: "a month",
		MM: "%d months",
		y: "a year",
		yy: "%d years"
	}
	  , Jb = {}
	  , Kb = {}
	  , Lb = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g
	  , Mb = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g
	  , Nb = {}
	  , Ob = {}
	  , Pb = /\d/
	  , Qb = /\d\d/
	  , Rb = /\d{3}/
	  , Sb = /\d{4}/
	  , Tb = /[+-]?\d{6}/
	  , Ub = /\d\d?/
	  , Vb = /\d\d\d\d?/
	  , Wb = /\d\d\d\d\d\d?/
	  , Xb = /\d{1,3}/
	  , Yb = /\d{1,4}/
	  , Zb = /[+-]?\d{1,6}/
	  , $b = /\d+/
	  , _b = /[+-]?\d+/
	  , ac = /Z|[+-]\d\d:?\d\d/gi
	  , bc = /Z|[+-]\d\d(?::?\d\d)?/gi
	  , cc = /[+-]?\d+(\.\d{1,3})?/
	  , dc = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i
	  , ec = {}
	  , fc = {}
	  , gc = 0
	  , hc = 1
	  , ic = 2
	  , jc = 3
	  , kc = 4
	  , lc = 5
	  , mc = 6
	  , nc = 7
	  , oc = 8;
	H("Y", 0, 0, function() {
		var a = this.year();
		return a <= 9999 ? "" + a : "+" + a
	}),
	H(0, ["YY", 2], 0, function() {
		return this.year() % 100
	}),
	H(0, ["YYYY", 4], 0, "year"),
	H(0, ["YYYYY", 5], 0, "year"),
	H(0, ["YYYYYY", 6, !0], 0, "year"),
	B("year", "y"),
	E("year", 1),
	M("Y", _b),
	M("YY", Ub, Qb),
	M("YYYY", Yb, Sb),
	M("YYYYY", Zb, Tb),
	M("YYYYYY", Zb, Tb),
	Q(["YYYYY", "YYYYYY"], gc),
	Q("YYYY", function(b, c) {
		c[gc] = 2 === b.length ? a.parseTwoDigitYear(b) : t(b)
	}),
	Q("YY", function(b, c) {
		c[gc] = a.parseTwoDigitYear(b)
	}),
	Q("Y", function(a, b) {
		b[gc] = parseInt(a, 10)
	}),
	a.parseTwoDigitYear = function(a) {
		return t(a) + (t(a) > 68 ? 1900 : 2e3)
	}
	;
	var pc, qc = V("FullYear", !0);
	pc = Array.prototype.indexOf ? Array.prototype.indexOf : function(a) {
		var b;
		for (b = 0; b < this.length; ++b)
			if (this[b] === a)
				return b;
		return -1
	}
	,
	H("M", ["MM", 2], "Mo", function() {
		return this.month() + 1
	}),
	H("MMM", 0, 0, function(a) {
		return this.localeData().monthsShort(this, a)
	}),
	H("MMMM", 0, 0, function(a) {
		return this.localeData().months(this, a)
	}),
	B("month", "M"),
	E("month", 8),
	M("M", Ub),
	M("MM", Ub, Qb),
	M("MMM", function(a, b) {
		return b.monthsShortRegex(a)
	}),
	M("MMMM", function(a, b) {
		return b.monthsRegex(a)
	}),
	Q(["M", "MM"], function(a, b) {
		b[hc] = t(a) - 1
	}),
	Q(["MMM", "MMMM"], function(a, b, c, d) {
		var e = c._locale.monthsParse(a, d, c._strict);
		null != e ? b[hc] = e : m(c).invalidMonth = a
	});
	var rc = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/
	  , sc = "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
	  , tc = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_")
	  , uc = dc
	  , vc = dc;
	H("w", ["ww", 2], "wo", "week"),
	H("W", ["WW", 2], "Wo", "isoWeek"),
	B("week", "w"),
	B("isoWeek", "W"),
	E("week", 5),
	E("isoWeek", 5),
	M("w", Ub),
	M("ww", Ub, Qb),
	M("W", Ub),
	M("WW", Ub, Qb),
	R(["w", "ww", "W", "WW"], function(a, b, c, d) {
		b[d.substr(0, 1)] = t(a)
	});
	var wc = {
		dow: 0,
		doy: 6
	};
	H("d", 0, "do", "day"),
	H("dd", 0, 0, function(a) {
		return this.localeData().weekdaysMin(this, a)
	}),
	H("ddd", 0, 0, function(a) {
		return this.localeData().weekdaysShort(this, a)
	}),
	H("dddd", 0, 0, function(a) {
		return this.localeData().weekdays(this, a)
	}),
	H("e", 0, 0, "weekday"),
	H("E", 0, 0, "isoWeekday"),
	B("day", "d"),
	B("weekday", "e"),
	B("isoWeekday", "E"),
	E("day", 11),
	E("weekday", 11),
	E("isoWeekday", 11),
	M("d", Ub),
	M("e", Ub),
	M("E", Ub),
	M("dd", function(a, b) {
		return b.weekdaysMinRegex(a)
	}),
	M("ddd", function(a, b) {
		return b.weekdaysShortRegex(a)
	}),
	M("dddd", function(a, b) {
		return b.weekdaysRegex(a)
	}),
	R(["dd", "ddd", "dddd"], function(a, b, c, d) {
		var e = c._locale.weekdaysParse(a, d, c._strict);
		null != e ? b.d = e : m(c).invalidWeekday = a
	}),
	R(["d", "e", "E"], function(a, b, c, d) {
		b[d] = t(a)
	});
	var xc = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_")
	  , yc = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_")
	  , zc = "Su_Mo_Tu_We_Th_Fr_Sa".split("_")
	  , Ac = dc
	  , Bc = dc
	  , Cc = dc;
	H("H", ["HH", 2], 0, "hour"),
	H("h", ["hh", 2], 0, ma),
	H("k", ["kk", 2], 0, function() {
		return this.hours() || 24
	}),
	H("hmm", 0, 0, function() {
		return "" + ma.apply(this) + G(this.minutes(), 2)
	}),
	H("hmmss", 0, 0, function() {
		return "" + ma.apply(this) + G(this.minutes(), 2) + G(this.seconds(), 2)
	}),
	H("Hmm", 0, 0, function() {
		return "" + this.hours() + G(this.minutes(), 2)
	}),
	H("Hmmss", 0, 0, function() {
		return "" + this.hours() + G(this.minutes(), 2) + G(this.seconds(), 2)
	}),
	na("a", !0),
	na("A", !1),
	B("hour", "h"),
	E("hour", 13),
	M("a", oa),
	M("A", oa),
	M("H", Ub),
	M("h", Ub),
	M("k", Ub),
	M("HH", Ub, Qb),
	M("hh", Ub, Qb),
	M("kk", Ub, Qb),
	M("hmm", Vb),
	M("hmmss", Wb),
	M("Hmm", Vb),
	M("Hmmss", Wb),
	Q(["H", "HH"], jc),
	Q(["k", "kk"], function(a, b, c) {
		var d = t(a);
		b[jc] = 24 === d ? 0 : d
	}),
	Q(["a", "A"], function(a, b, c) {
		c._isPm = c._locale.isPM(a),
		c._meridiem = a
	}),
	Q(["h", "hh"], function(a, b, c) {
		b[jc] = t(a),
		m(c).bigHour = !0
	}),
	Q("hmm", function(a, b, c) {
		var d = a.length - 2;
		b[jc] = t(a.substr(0, d)),
		b[kc] = t(a.substr(d)),
		m(c).bigHour = !0
	}),
	Q("hmmss", function(a, b, c) {
		var d = a.length - 4
		  , e = a.length - 2;
		b[jc] = t(a.substr(0, d)),
		b[kc] = t(a.substr(d, 2)),
		b[lc] = t(a.substr(e)),
		m(c).bigHour = !0
	}),
	Q("Hmm", function(a, b, c) {
		var d = a.length - 2;
		b[jc] = t(a.substr(0, d)),
		b[kc] = t(a.substr(d))
	}),
	Q("Hmmss", function(a, b, c) {
		var d = a.length - 4
		  , e = a.length - 2;
		b[jc] = t(a.substr(0, d)),
		b[kc] = t(a.substr(d, 2)),
		b[lc] = t(a.substr(e))
	});
	var Dc, Ec = /[ap]\.?m?\.?/i, Fc = V("Hours", !0), Gc = {
		calendar: Fb,
		longDateFormat: Gb,
		invalidDate: "Invalid date",
		ordinal: "%d",
		dayOfMonthOrdinalParse: Hb,
		relativeTime: Ib,
		months: sc,
		monthsShort: tc,
		week: wc,
		weekdays: xc,
		weekdaysMin: zc,
		weekdaysShort: yc,
		meridiemParse: Ec
	}, Hc = {}, Ic = {}, Jc = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Kc = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Lc = /Z|[+-]\d\d(?::?\d\d)?/, Mc = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]], Nc = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]], Oc = /^\/?Date\((\-?\d+)/i, Pc = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, Qc = {
		UT: 0,
		GMT: 0,
		EDT: -240,
		EST: -300,
		CDT: -300,
		CST: -360,
		MDT: -360,
		MST: -420,
		PDT: -420,
		PST: -480
	};
	a.createFromInputFallback = w("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(a) {
		a._d = new Date(a._i + (a._useUTC ? " UTC" : ""))
	}),
	a.ISO_8601 = function() {}
	,
	a.RFC_2822 = function() {}
	;
	var Rc = w("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
		var a = Qa.apply(null, arguments);
		return this.isValid() && a.isValid() ? a < this ? this : a : o()
	})
	  , Sc = w("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
		var a = Qa.apply(null, arguments);
		return this.isValid() && a.isValid() ? a > this ? this : a : o()
	})
	  , Tc = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
	Wa("Z", ":"),
	Wa("ZZ", ""),
	M("Z", bc),
	M("ZZ", bc),
	Q(["Z", "ZZ"], function(a, b, c) {
		c._useUTC = !0,
		c._tzm = Xa(bc, a)
	});
	var Uc = /([\+\-]|\d\d)/gi;
	a.updateOffset = function() {}
	;
	var Vc = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/
	  , Wc = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
	_a.fn = Ta.prototype,
	_a.invalid = function() {
		return _a(NaN)
	}
	;
	var Xc = db(1, "add")
	  , Yc = db(-1, "subtract");
	a.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ",
	a.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
	var Zc = w("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(a) {
		return void 0 === a ? this.localeData() : this.locale(a)
	});
	H(0, ["gg", 2], 0, function() {
		return this.weekYear() % 100
	}),
	H(0, ["GG", 2], 0, function() {
		return this.isoWeekYear() % 100
	}),
	ib("gggg", "weekYear"),
	ib("ggggg", "weekYear"),
	ib("GGGG", "isoWeekYear"),
	ib("GGGGG", "isoWeekYear"),
	B("weekYear", "gg"),
	B("isoWeekYear", "GG"),
	E("weekYear", 1),
	E("isoWeekYear", 1),
	M("G", _b),
	M("g", _b),
	M("GG", Ub, Qb),
	M("gg", Ub, Qb),
	M("GGGG", Yb, Sb),
	M("gggg", Yb, Sb),
	M("GGGGG", Zb, Tb),
	M("ggggg", Zb, Tb),
	R(["gggg", "ggggg", "GGGG", "GGGGG"], function(a, b, c, d) {
		b[d.substr(0, 2)] = t(a)
	}),
	R(["gg", "GG"], function(b, c, d, e) {
		c[e] = a.parseTwoDigitYear(b)
	}),
	H("Q", 0, "Qo", "quarter"),
	B("quarter", "Q"),
	E("quarter", 7),
	M("Q", Pb),
	Q("Q", function(a, b) {
		b[hc] = 3 * (t(a) - 1)
	}),
	H("D", ["DD", 2], "Do", "date"),
	B("date", "D"),
	E("date", 9),
	M("D", Ub),
	M("DD", Ub, Qb),
	M("Do", function(a, b) {
		return a ? b._dayOfMonthOrdinalParse || b._ordinalParse : b._dayOfMonthOrdinalParseLenient
	}),
	Q(["D", "DD"], ic),
	Q("Do", function(a, b) {
		b[ic] = t(a.match(Ub)[0], 10)
	});
	var $c = V("Date", !0);
	H("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
	B("dayOfYear", "DDD"),
	E("dayOfYear", 4),
	M("DDD", Xb),
	M("DDDD", Rb),
	Q(["DDD", "DDDD"], function(a, b, c) {
		c._dayOfYear = t(a)
	}),
	H("m", ["mm", 2], 0, "minute"),
	B("minute", "m"),
	E("minute", 14),
	M("m", Ub),
	M("mm", Ub, Qb),
	Q(["m", "mm"], kc);
	var _c = V("Minutes", !1);
	H("s", ["ss", 2], 0, "second"),
	B("second", "s"),
	E("second", 15),
	M("s", Ub),
	M("ss", Ub, Qb),
	Q(["s", "ss"], lc);
	var ad = V("Seconds", !1);
	H("S", 0, 0, function() {
		return ~~(this.millisecond() / 100)
	}),
	H(0, ["SS", 2], 0, function() {
		return ~~(this.millisecond() / 10)
	}),
	H(0, ["SSS", 3], 0, "millisecond"),
	H(0, ["SSSS", 4], 0, function() {
		return 10 * this.millisecond()
	}),
	H(0, ["SSSSS", 5], 0, function() {
		return 100 * this.millisecond()
	}),
	H(0, ["SSSSSS", 6], 0, function() {
		return 1e3 * this.millisecond()
	}),
	H(0, ["SSSSSSS", 7], 0, function() {
		return 1e4 * this.millisecond()
	}),
	H(0, ["SSSSSSSS", 8], 0, function() {
		return 1e5 * this.millisecond()
	}),
	H(0, ["SSSSSSSSS", 9], 0, function() {
		return 1e6 * this.millisecond()
	}),
	B("millisecond", "ms"),
	E("millisecond", 16),
	M("S", Xb, Pb),
	M("SS", Xb, Qb),
	M("SSS", Xb, Rb);
	var bd;
	for (bd = "SSSS"; bd.length <= 9; bd += "S")
		M(bd, $b);
	for (bd = "S"; bd.length <= 9; bd += "S")
		Q(bd, function(a, b) {
			b[mc] = t(1e3 * ("0." + a))
		});
	var cd = V("Milliseconds", !1);
	H("z", 0, 0, "zoneAbbr"),
	H("zz", 0, 0, "zoneName");
	var dd = q.prototype;
	dd.add = Xc,
	dd.calendar = function(b, c) {
		var d = b || Qa()
		  , e = Ya(d, this).startOf("day")
		  , f = a.calendarFormat(this, e) || "sameElse"
		  , g = c && (y(c[f]) ? c[f].call(this, d) : c[f]);
		return this.format(g || this.localeData().calendar(f, this, Qa(d)))
	}
	,
	dd.clone = function() {
		return new q(this)
	}
	,
	dd.diff = function(a, b, c) {
		var d, e, f;
		if (!this.isValid())
			return NaN;
		if (!(d = Ya(a, this)).isValid())
			return NaN;
		switch (e = 6e4 * (d.utcOffset() - this.utcOffset()),
		b = C(b)) {
		case "year":
			f = fb(this, d) / 12;
			break;
		case "month":
			f = fb(this, d);
			break;
		case "quarter":
			f = fb(this, d) / 3;
			break;
		case "second":
			f = (this - d) / 1e3;
			break;
		case "minute":
			f = (this - d) / 6e4;
			break;
		case "hour":
			f = (this - d) / 36e5;
			break;
		case "day":
			f = (this - d - e) / 864e5;
			break;
		case "week":
			f = (this - d - e) / 6048e5;
			break;
		default:
			f = this - d
		}
		return c ? f : s(f)
	}
	,
	dd.endOf = function(a) {
		return void 0 === (a = C(a)) || "millisecond" === a ? this : ("date" === a && (a = "day"),
		this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms"))
	}
	,
	dd.format = function(b) {
		b || (b = this.isUtc() ? a.defaultFormatUtc : a.defaultFormat);
		var c = K(this, b);
		return this.localeData().postformat(c)
	}
	,
	dd.from = function(a, b) {
		return this.isValid() && (r(a) && a.isValid() || Qa(a).isValid()) ? _a({
			to: this,
			from: a
		}).locale(this.locale()).humanize(!b) : this.localeData().invalidDate()
	}
	,
	dd.fromNow = function(a) {
		return this.from(Qa(), a)
	}
	,
	dd.to = function(a, b) {
		return this.isValid() && (r(a) && a.isValid() || Qa(a).isValid()) ? _a({
			from: this,
			to: a
		}).locale(this.locale()).humanize(!b) : this.localeData().invalidDate()
	}
	,
	dd.toNow = function(a) {
		return this.to(Qa(), a)
	}
	,
	dd.get = function(a) {
		return a = C(a),
		y(this[a]) ? this[a]() : this
	}
	,
	dd.invalidAt = function() {
		return m(this).overflow
	}
	,
	dd.isAfter = function(a, b) {
		var c = r(a) ? a : Qa(a);
		return !(!this.isValid() || !c.isValid()) && ("millisecond" === (b = C(e(b) ? "millisecond" : b)) ? this.valueOf() > c.valueOf() : c.valueOf() < this.clone().startOf(b).valueOf())
	}
	,
	dd.isBefore = function(a, b) {
		var c = r(a) ? a : Qa(a);
		return !(!this.isValid() || !c.isValid()) && ("millisecond" === (b = C(e(b) ? "millisecond" : b)) ? this.valueOf() < c.valueOf() : this.clone().endOf(b).valueOf() < c.valueOf())
	}
	,
	dd.isBetween = function(a, b, c, d) {
		return ("(" === (d = d || "()")[0] ? this.isAfter(a, c) : !this.isBefore(a, c)) && (")" === d[1] ? this.isBefore(b, c) : !this.isAfter(b, c))
	}
	,
	dd.isSame = function(a, b) {
		var c, d = r(a) ? a : Qa(a);
		return !(!this.isValid() || !d.isValid()) && ("millisecond" === (b = C(b || "millisecond")) ? this.valueOf() === d.valueOf() : (c = d.valueOf(),
		this.clone().startOf(b).valueOf() <= c && c <= this.clone().endOf(b).valueOf()))
	}
	,
	dd.isSameOrAfter = function(a, b) {
		return this.isSame(a, b) || this.isAfter(a, b)
	}
	,
	dd.isSameOrBefore = function(a, b) {
		return this.isSame(a, b) || this.isBefore(a, b)
	}
	,
	dd.isValid = function() {
		return n(this)
	}
	,
	dd.lang = Zc,
	dd.locale = gb,
	dd.localeData = hb,
	dd.max = Sc,
	dd.min = Rc,
	dd.parsingFlags = function() {
		return j({}, m(this))
	}
	,
	dd.set = function(a, b) {
		if ("object" == typeof a)
			for (var c = F(a = D(a)), d = 0; d < c.length; d++)
				this[c[d].unit](a[c[d].unit]);
		else if (a = C(a),
		y(this[a]))
			return this[a](b);
		return this
	}
	,
	dd.startOf = function(a) {
		switch (a = C(a)) {
		case "year":
			this.month(0);
		case "quarter":
		case "month":
			this.date(1);
		case "week":
		case "isoWeek":
		case "day":
		case "date":
			this.hours(0);
		case "hour":
			this.minutes(0);
		case "minute":
			this.seconds(0);
		case "second":
			this.milliseconds(0)
		}
		return "week" === a && this.weekday(0),
		"isoWeek" === a && this.isoWeekday(1),
		"quarter" === a && this.month(3 * Math.floor(this.month() / 3)),
		this
	}
	,
	dd.subtract = Yc,
	dd.toArray = function() {
		var a = this;
		return [a.year(), a.month(), a.date(), a.hour(), a.minute(), a.second(), a.millisecond()]
	}
	,
	dd.toObject = function() {
		var a = this;
		return {
			years: a.year(),
			months: a.month(),
			date: a.date(),
			hours: a.hours(),
			minutes: a.minutes(),
			seconds: a.seconds(),
			milliseconds: a.milliseconds()
		}
	}
	,
	dd.toDate = function() {
		return new Date(this.valueOf())
	}
	,
	dd.toISOString = function() {
		if (!this.isValid())
			return null;
		var a = this.clone().utc();
		return a.year() < 0 || a.year() > 9999 ? K(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : y(Date.prototype.toISOString) ? this.toDate().toISOString() : K(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
	}
	,
	dd.inspect = function() {
		if (!this.isValid())
			return "moment.invalid(/* " + this._i + " */)";
		var a = "moment"
		  , b = "";
		this.isLocal() || (a = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone",
		b = "Z");
		var c = "[" + a + '("]'
		  , d = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY"
		  , e = b + '[")]';
		return this.format(c + d + "-MM-DD[T]HH:mm:ss.SSS" + e)
	}
	,
	dd.toJSON = function() {
		return this.isValid() ? this.toISOString() : null
	}
	,
	dd.toString = function() {
		return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
	}
	,
	dd.unix = function() {
		return Math.floor(this.valueOf() / 1e3)
	}
	,
	dd.valueOf = function() {
		return this._d.valueOf() - 6e4 * (this._offset || 0)
	}
	,
	dd.creationData = function() {
		return {
			input: this._i,
			format: this._f,
			locale: this._locale,
			isUTC: this._isUTC,
			strict: this._strict
		}
	}
	,
	dd.year = qc,
	dd.isLeapYear = function() {
		return U(this.year())
	}
	,
	dd.weekYear = function(a) {
		return jb.call(this, a, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
	}
	,
	dd.isoWeekYear = function(a) {
		return jb.call(this, a, this.isoWeek(), this.isoWeekday(), 1, 4)
	}
	,
	dd.quarter = dd.quarters = function(a) {
		return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3)
	}
	,
	dd.month = aa,
	dd.daysInMonth = function() {
		return Z(this.year(), this.month())
	}
	,
	dd.week = dd.weeks = function(a) {
		var b = this.localeData().week(this);
		return null == a ? b : this.add(7 * (a - b), "d")
	}
	,
	dd.isoWeek = dd.isoWeeks = function(a) {
		var b = ga(this, 1, 4).week;
		return null == a ? b : this.add(7 * (a - b), "d")
	}
	,
	dd.weeksInYear = function() {
		var a = this.localeData()._week;
		return ha(this.year(), a.dow, a.doy)
	}
	,
	dd.isoWeeksInYear = function() {
		return ha(this.year(), 1, 4)
	}
	,
	dd.date = $c,
	dd.day = dd.days = function(a) {
		if (!this.isValid())
			return null != a ? this : NaN;
		var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
		return null != a ? (a = ia(a, this.localeData()),
		this.add(a - b, "d")) : b
	}
	,
	dd.weekday = function(a) {
		if (!this.isValid())
			return null != a ? this : NaN;
		var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
		return null == a ? b : this.add(a - b, "d")
	}
	,
	dd.isoWeekday = function(a) {
		if (!this.isValid())
			return null != a ? this : NaN;
		if (null != a) {
			var b = ja(a, this.localeData());
			return this.day(this.day() % 7 ? b : b - 7)
		}
		return this.day() || 7
	}
	,
	dd.dayOfYear = function(a) {
		var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
		return null == a ? b : this.add(a - b, "d")
	}
	,
	dd.hour = dd.hours = Fc,
	dd.minute = dd.minutes = _c,
	dd.second = dd.seconds = ad,
	dd.millisecond = dd.milliseconds = cd,
	dd.utcOffset = function(b, c, d) {
		var e, f = this._offset || 0;
		if (!this.isValid())
			return null != b ? this : NaN;
		if (null != b) {
			if ("string" == typeof b) {
				if (null === (b = Xa(bc, b)))
					return this
			} else
				Math.abs(b) < 16 && !d && (b *= 60);
			return !this._isUTC && c && (e = Za(this)),
			this._offset = b,
			this._isUTC = !0,
			null != e && this.add(e, "m"),
			f !== b && (!c || this._changeInProgress ? eb(this, _a(b - f, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0,
			a.updateOffset(this, !0),
			this._changeInProgress = null)),
			this
		}
		return this._isUTC ? f : Za(this)
	}
	,
	dd.utc = function(a) {
		return this.utcOffset(0, a)
	}
	,
	dd.local = function(a) {
		return this._isUTC && (this.utcOffset(0, a),
		this._isUTC = !1,
		a && this.subtract(Za(this), "m")),
		this
	}
	,
	dd.parseZone = function() {
		if (null != this._tzm)
			this.utcOffset(this._tzm, !1, !0);
		else if ("string" == typeof this._i) {
			var a = Xa(ac, this._i);
			null != a ? this.utcOffset(a) : this.utcOffset(0, !0)
		}
		return this
	}
	,
	dd.hasAlignedHourOffset = function(a) {
		return !!this.isValid() && (a = a ? Qa(a).utcOffset() : 0,
		(this.utcOffset() - a) % 60 == 0)
	}
	,
	dd.isDST = function() {
		return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
	}
	,
	dd.isLocal = function() {
		return !!this.isValid() && !this._isUTC
	}
	,
	dd.isUtcOffset = function() {
		return !!this.isValid() && this._isUTC
	}
	,
	dd.isUtc = $a,
	dd.isUTC = $a,
	dd.zoneAbbr = function() {
		return this._isUTC ? "UTC" : ""
	}
	,
	dd.zoneName = function() {
		return this._isUTC ? "Coordinated Universal Time" : ""
	}
	,
	dd.dates = w("dates accessor is deprecated. Use date instead.", $c),
	dd.months = w("months accessor is deprecated. Use month instead", aa),
	dd.years = w("years accessor is deprecated. Use year instead", qc),
	dd.zone = w("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function(a, b) {
		return null != a ? ("string" != typeof a && (a = -a),
		this.utcOffset(a, b),
		this) : -this.utcOffset()
	}),
	dd.isDSTShifted = w("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function() {
		if (!e(this._isDSTShifted))
			return this._isDSTShifted;
		var a = {};
		if (p(a, this),
		(a = Na(a))._a) {
			var b = a._isUTC ? k(a._a) : Qa(a._a);
			this._isDSTShifted = this.isValid() && u(a._a, b.toArray()) > 0
		} else
			this._isDSTShifted = !1;
		return this._isDSTShifted
	});
	var ed = A.prototype;
	ed.calendar = function(a, b, c) {
		var d = this._calendar[a] || this._calendar.sameElse;
		return y(d) ? d.call(b, c) : d
	}
	,
	ed.longDateFormat = function(a) {
		var b = this._longDateFormat[a]
		  , c = this._longDateFormat[a.toUpperCase()];
		return b || !c ? b : (this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g, function(a) {
			return a.slice(1)
		}),
		this._longDateFormat[a])
	}
	,
	ed.invalidDate = function() {
		return this._invalidDate
	}
	,
	ed.ordinal = function(a) {
		return this._ordinal.replace("%d", a)
	}
	,
	ed.preparse = lb,
	ed.postformat = lb,
	ed.relativeTime = function(a, b, c, d) {
		var e = this._relativeTime[c];
		return y(e) ? e(a, b, c, d) : e.replace(/%d/i, a)
	}
	,
	ed.pastFuture = function(a, b) {
		var c = this._relativeTime[a > 0 ? "future" : "past"];
		return y(c) ? c(b) : c.replace(/%s/i, b)
	}
	,
	ed.set = function(a) {
		var b, c;
		for (c in a)
			y(b = a[c]) ? this[c] = b : this["_" + c] = b;
		this._config = a,
		this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
	}
	,
	ed.months = function(a, c) {
		return a ? b(this._months) ? this._months[a.month()] : this._months[(this._months.isFormat || rc).test(c) ? "format" : "standalone"][a.month()] : b(this._months) ? this._months : this._months.standalone
	}
	,
	ed.monthsShort = function(a, c) {
		return a ? b(this._monthsShort) ? this._monthsShort[a.month()] : this._monthsShort[rc.test(c) ? "format" : "standalone"][a.month()] : b(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
	}
	,
	ed.monthsParse = function(a, b, c) {
		var d, e, f;
		if (this._monthsParseExact)
			return $.call(this, a, b, c);
		for (this._monthsParse || (this._monthsParse = [],
		this._longMonthsParse = [],
		this._shortMonthsParse = []),
		d = 0; d < 12; d++) {
			if (e = k([2e3, d]),
			c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$","i"),
			this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$","i")),
			c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""),
			this._monthsParse[d] = new RegExp(f.replace(".", ""),"i")),
			c && "MMMM" === b && this._longMonthsParse[d].test(a))
				return d;
			if (c && "MMM" === b && this._shortMonthsParse[d].test(a))
				return d;
			if (!c && this._monthsParse[d].test(a))
				return d
		}
	}
	,
	ed.monthsRegex = function(a) {
		return this._monthsParseExact ? (i(this, "_monthsRegex") || ba.call(this),
		a ? this._monthsStrictRegex : this._monthsRegex) : (i(this, "_monthsRegex") || (this._monthsRegex = vc),
		this._monthsStrictRegex && a ? this._monthsStrictRegex : this._monthsRegex)
	}
	,
	ed.monthsShortRegex = function(a) {
		return this._monthsParseExact ? (i(this, "_monthsRegex") || ba.call(this),
		a ? this._monthsShortStrictRegex : this._monthsShortRegex) : (i(this, "_monthsShortRegex") || (this._monthsShortRegex = uc),
		this._monthsShortStrictRegex && a ? this._monthsShortStrictRegex : this._monthsShortRegex)
	}
	,
	ed.week = function(a) {
		return ga(a, this._week.dow, this._week.doy).week
	}
	,
	ed.firstDayOfYear = function() {
		return this._week.doy
	}
	,
	ed.firstDayOfWeek = function() {
		return this._week.dow
	}
	,
	ed.weekdays = function(a, c) {
		return a ? b(this._weekdays) ? this._weekdays[a.day()] : this._weekdays[this._weekdays.isFormat.test(c) ? "format" : "standalone"][a.day()] : b(this._weekdays) ? this._weekdays : this._weekdays.standalone
	}
	,
	ed.weekdaysMin = function(a) {
		return a ? this._weekdaysMin[a.day()] : this._weekdaysMin
	}
	,
	ed.weekdaysShort = function(a) {
		return a ? this._weekdaysShort[a.day()] : this._weekdaysShort
	}
	,
	ed.weekdaysParse = function(a, b, c) {
		var d, e, f;
		if (this._weekdaysParseExact)
			return ka.call(this, a, b, c);
		for (this._weekdaysParse || (this._weekdaysParse = [],
		this._minWeekdaysParse = [],
		this._shortWeekdaysParse = [],
		this._fullWeekdaysParse = []),
		d = 0; d < 7; d++) {
			if (e = k([2e3, 1]).day(d),
			c && !this._fullWeekdaysParse[d] && (this._fullWeekdaysParse[d] = new RegExp("^" + this.weekdays(e, "").replace(".", ".?") + "$","i"),
			this._shortWeekdaysParse[d] = new RegExp("^" + this.weekdaysShort(e, "").replace(".", ".?") + "$","i"),
			this._minWeekdaysParse[d] = new RegExp("^" + this.weekdaysMin(e, "").replace(".", ".?") + "$","i")),
			this._weekdaysParse[d] || (f = "^" + this.weekdays(e, "") + "|^" + this.weekdaysShort(e, "") + "|^" + this.weekdaysMin(e, ""),
			this._weekdaysParse[d] = new RegExp(f.replace(".", ""),"i")),
			c && "dddd" === b && this._fullWeekdaysParse[d].test(a))
				return d;
			if (c && "ddd" === b && this._shortWeekdaysParse[d].test(a))
				return d;
			if (c && "dd" === b && this._minWeekdaysParse[d].test(a))
				return d;
			if (!c && this._weekdaysParse[d].test(a))
				return d
		}
	}
	,
	ed.weekdaysRegex = function(a) {
		return this._weekdaysParseExact ? (i(this, "_weekdaysRegex") || la.call(this),
		a ? this._weekdaysStrictRegex : this._weekdaysRegex) : (i(this, "_weekdaysRegex") || (this._weekdaysRegex = Ac),
		this._weekdaysStrictRegex && a ? this._weekdaysStrictRegex : this._weekdaysRegex)
	}
	,
	ed.weekdaysShortRegex = function(a) {
		return this._weekdaysParseExact ? (i(this, "_weekdaysRegex") || la.call(this),
		a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (i(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Bc),
		this._weekdaysShortStrictRegex && a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
	}
	,
	ed.weekdaysMinRegex = function(a) {
		return this._weekdaysParseExact ? (i(this, "_weekdaysRegex") || la.call(this),
		a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (i(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Cc),
		this._weekdaysMinStrictRegex && a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
	}
	,
	ed.isPM = function(a) {
		return "p" === (a + "").toLowerCase().charAt(0)
	}
	,
	ed.meridiem = function(a, b, c) {
		return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
	}
	,
	sa("en", {
		dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
		ordinal: function(a) {
			var b = a % 10;
			return a + (1 === t(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th")
		}
	}),
	a.lang = w("moment.lang is deprecated. Use moment.locale instead.", sa),
	a.langData = w("moment.langData is deprecated. Use moment.localeData instead.", ua);
	var fd = Math.abs
	  , gd = tb("ms")
	  , hd = tb("s")
	  , id = tb("m")
	  , jd = tb("h")
	  , kd = tb("d")
	  , ld = tb("w")
	  , md = tb("M")
	  , nd = tb("y")
	  , od = ub("milliseconds")
	  , pd = ub("seconds")
	  , qd = ub("minutes")
	  , rd = ub("hours")
	  , sd = ub("days")
	  , td = ub("months")
	  , ud = ub("years")
	  , vd = Math.round
	  , wd = {
		ss: 44,
		s: 45,
		m: 45,
		h: 22,
		d: 26,
		M: 11
	}
	  , xd = Math.abs
	  , yd = Ta.prototype;
	return yd.isValid = function() {
		return this._isValid
	}
	,
	yd.abs = function() {
		var a = this._data;
		return this._milliseconds = fd(this._milliseconds),
		this._days = fd(this._days),
		this._months = fd(this._months),
		a.milliseconds = fd(a.milliseconds),
		a.seconds = fd(a.seconds),
		a.minutes = fd(a.minutes),
		a.hours = fd(a.hours),
		a.months = fd(a.months),
		a.years = fd(a.years),
		this
	}
	,
	yd.add = function(a, b) {
		return pb(this, a, b, 1)
	}
	,
	yd.subtract = function(a, b) {
		return pb(this, a, b, -1)
	}
	,
	yd.as = function(a) {
		if (!this.isValid())
			return NaN;
		var b, c, d = this._milliseconds;
		if ("month" === (a = C(a)) || "year" === a)
			return b = this._days + d / 864e5,
			c = this._months + rb(b),
			"month" === a ? c : c / 12;
		switch (b = this._days + Math.round(sb(this._months)),
		a) {
		case "week":
			return b / 7 + d / 6048e5;
		case "day":
			return b + d / 864e5;
		case "hour":
			return 24 * b + d / 36e5;
		case "minute":
			return 1440 * b + d / 6e4;
		case "second":
			return 86400 * b + d / 1e3;
		case "millisecond":
			return Math.floor(864e5 * b) + d;
		default:
			throw new Error("Unknown unit " + a)
		}
	}
	,
	yd.asMilliseconds = gd,
	yd.asSeconds = hd,
	yd.asMinutes = id,
	yd.asHours = jd,
	yd.asDays = kd,
	yd.asWeeks = ld,
	yd.asMonths = md,
	yd.asYears = nd,
	yd.valueOf = function() {
		return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * t(this._months / 12) : NaN
	}
	,
	yd._bubble = function() {
		var a, b, c, d, e, f = this._milliseconds, g = this._days, h = this._months, i = this._data;
		return f >= 0 && g >= 0 && h >= 0 || f <= 0 && g <= 0 && h <= 0 || (f += 864e5 * qb(sb(h) + g),
		g = 0,
		h = 0),
		i.milliseconds = f % 1e3,
		a = s(f / 1e3),
		i.seconds = a % 60,
		b = s(a / 60),
		i.minutes = b % 60,
		c = s(b / 60),
		i.hours = c % 24,
		g += s(c / 24),
		e = s(rb(g)),
		h += e,
		g -= qb(sb(e)),
		d = s(h / 12),
		h %= 12,
		i.days = g,
		i.months = h,
		i.years = d,
		this
	}
	,
	yd.clone = function() {
		return _a(this)
	}
	,
	yd.get = function(a) {
		return a = C(a),
		this.isValid() ? this[a + "s"]() : NaN
	}
	,
	yd.milliseconds = od,
	yd.seconds = pd,
	yd.minutes = qd,
	yd.hours = rd,
	yd.days = sd,
	yd.weeks = function() {
		return s(this.days() / 7)
	}
	,
	yd.months = td,
	yd.years = ud,
	yd.humanize = function(a) {
		if (!this.isValid())
			return this.localeData().invalidDate();
		var b = this.localeData()
		  , c = wb(this, !a, b);
		return a && (c = b.pastFuture(+this, c)),
		b.postformat(c)
	}
	,
	yd.toISOString = yb,
	yd.toString = yb,
	yd.toJSON = yb,
	yd.locale = gb,
	yd.localeData = hb,
	yd.toIsoString = w("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", yb),
	yd.lang = Zc,
	H("X", 0, 0, "unix"),
	H("x", 0, 0, "valueOf"),
	M("x", _b),
	M("X", cc),
	Q("X", function(a, b, c) {
		c._d = new Date(1e3 * parseFloat(a, 10))
	}),
	Q("x", function(a, b, c) {
		c._d = new Date(t(a))
	}),
	a.version = "2.19.1",
	function(a) {
		zb = a
	}(Qa),
	a.fn = dd,
	a.min = function() {
		return Ra("isBefore", [].slice.call(arguments, 0))
	}
	,
	a.max = function() {
		return Ra("isAfter", [].slice.call(arguments, 0))
	}
	,
	a.now = function() {
		return Date.now ? Date.now() : +new Date
	}
	,
	a.utc = k,
	a.unix = function(a) {
		return Qa(1e3 * a)
	}
	,
	a.months = function(a, b) {
		return nb(a, b, "months")
	}
	,
	a.isDate = g,
	a.locale = sa,
	a.invalid = o,
	a.duration = _a,
	a.isMoment = r,
	a.weekdays = function(a, b, c) {
		return ob(a, b, c, "weekdays")
	}
	,
	a.parseZone = function() {
		return Qa.apply(null, arguments).parseZone()
	}
	,
	a.localeData = ua,
	a.isDuration = Ua,
	a.monthsShort = function(a, b) {
		return nb(a, b, "monthsShort")
	}
	,
	a.weekdaysMin = function(a, b, c) {
		return ob(a, b, c, "weekdaysMin")
	}
	,
	a.defineLocale = ta,
	a.updateLocale = function(a, b) {
		if (null != b) {
			var c, d = Gc;
			null != Hc[a] && (d = Hc[a]._config),
			(c = new A(b = z(d, b))).parentLocale = Hc[a],
			Hc[a] = c,
			sa(a)
		} else
			null != Hc[a] && (null != Hc[a].parentLocale ? Hc[a] = Hc[a].parentLocale : null != Hc[a] && delete Hc[a]);
		return Hc[a]
	}
	,
	a.locales = function() {
		return Eb(Hc)
	}
	,
	a.weekdaysShort = function(a, b, c) {
		return ob(a, b, c, "weekdaysShort")
	}
	,
	a.normalizeUnits = C,
	a.relativeTimeRounding = function(a) {
		return void 0 === a ? vd : "function" == typeof a && (vd = a,
		!0)
	}
	,
	a.relativeTimeThreshold = function(a, b) {
		return void 0 !== wd[a] && (void 0 === b ? wd[a] : (wd[a] = b,
		"s" === a && (wd.ss = b - 1),
		!0))
	}
	,
	a.calendarFormat = function(a, b) {
		var c = a.diff(b, "days", !0);
		return c < -6 ? "sameElse" : c < -1 ? "lastWeek" : c < 0 ? "lastDay" : c < 1 ? "sameDay" : c < 2 ? "nextDay" : c < 7 ? "nextWeek" : "sameElse"
	}
	,
	a.prototype = dd,
	a
});