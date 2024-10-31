var CD = CD || {};
var protocol = document.location.protocol;
CD.API_HOST = protocol + '//api.coindesk.com';
CD.WEBSITE_HOST = protocol + '//www.coindesk.com';
CD.ENVIRONMENT = 'live';
window.bpiIndex = "USD";

function CHF_rate(val) {
	return val / window.diff_rate;
}

function get_currency() {
	return window.current_currency;
}

function applyWidgetCurrency(currency) {	
	window.current_currency = currency;
	getDiffCurrency(function(rate) {
		var currencies = ["BTC", "ETH", "BCH", "LTC", "XRP"];

		if( typeof window.pricingWidget == 'undefined' && !(window.pricingWidget instanceof PricingWidget) )
			window.pricingWidget = new PricingWidget();
		window.pricingWidget.diff_rate = rate;
		window.pricingWidget.init(currencies);
		window.diff_rate = rate;
	});
}

function getDiffCurrency(callback) {
	jQuery.getJSON(protocol + '//api.coindesk.com/v1/bpi/currentprice/' + get_currency() + '.json', function(data) {
		var rate = data.bpi.USD.rate_float / data.bpi[get_currency()].rate_float;
		callback(rate);
	});
}
jQuery(document).ready(function() {
	jQuery('.bitcoin-chart-currency-selection').change(function(event) {
		window.current_currency = this.value;
		MarketCenterPage();
	});
});

CD.Api = function(a, b) {
	var c = function(a, b) {
			var c = {};
			if (a && void 0 != a) {
				if (c.url = CD.API_HOST + a,
					c.dataType = "json",
					void 0 !== b)
					for (var d in b)
						c[d] = b[d];
				return c
			}
		},
		d = function(a) {
			var b = {};
			return a && "[object Function]" === b.toString.call(a)
		},
		e = function(a, c) {
			var d = c.times,
				e = a.timeout;
			return function(f, g, h) {
				function i() {
					b.ajax(j).retry({
						times: d - 1,
						timeout: c.timeout
					}).pipe(k.resolve, k.reject)
				}
				var j = this,
					k = new b.Deferred,
					l = a.getResponseHeader("Retry-After");
				return d > 1 && (!a.statusCodes || b.inArray(f.status, a.statusCodes) > -1) ? (l && (e = isNaN(l) ? new Date(l).getTime() - b.now() : 1e3 * parseInt(l, 10),
							(isNaN(e) || e < 0) && (e = a.timeout)),
						void 0 !== e ? setTimeout(i, e) : i()) : k.rejectWith(this, arguments),
					k
			}
		};
	return b.ajaxPrefilter(function(a, b, c) {
			c.retry = function(a) {
				return a.timeout && (this.timeout = a.timeout),
					a.statusCodes && (this.statusCodes = a.statusCodes),
					this.pipe(null, e(this, a))
			}
		}),
		a.getSparklineAndDisplayData = function(a, e) {
			if ("object" != typeof a)
				return e && d(e) ? e(!1, null) : void 0;
			var f = a.currencies || void 0;
			if (void 0 == f || null == f)
				return e && d(e) ? e(!1, null) : void 0;
			if ("string" != typeof f) {
				if (1 != Array.isArray(f))
					return e && d(e) ? e(!1, null) : void 0;
				f = f.join(",")
			}
			var g = "/site/chartandheaderdata?currency=" + f,
				h = c(g, a);
			if (!e || !d(e))
				return b.ajax(h);
			b.ajax(h).done(function(a, b, c) {
				return e(!0, a, b, c)
			}).fail(function(a, b, c) {
				return e(!1, a, b, a)
			})
		},
		a.getBPICurrentPriceCalc = function(a, e) {
			var f = "/v1/bpi/currentprice/allcurrencies.json?showex=1&calc=1",
				g = c(f, a);
			if (!e || !d(e))
				return b.ajax(g);
			b.ajax(g).done(function(a, b, c) {
				return e(!0, a, b, c)
			}).fail(function(a, b, c) {
				return e(!1, a, b, a)
			})
		},
		a.getMarketCenterTop5Movers = function(a, e) {
			var f = "/marketcenter/top5movers",
				g = c(f, a);
			if (!e || !d(e))
				return b.ajax(g);
			b.ajax(g).done(function(a, b, c) {
				return e(!0, a, b, c)
			}).fail(function(a, b, c) {
				return e(!1, a, b, a)
			})
		},
		a.getBPICurrentPrice24Hours = function(a, e) {
			if ("object" != typeof a)
				return e && d(e) ? e(!1, null) : void 0;
			var f = a.currency || void 0;
			if (void 0 == f || null == f)
				return e && d(e) ? e(!1, null) : void 0;
			"string" != typeof f && (f = f.toString());
			var g = "/headerchart/history?currency=" + f,
				h = c(g, a);
			if (!e || !d(e))
				return b.ajax(h);
			b.ajax(h).done(function(a, b, c) {
				return e(!0, a, b, c)
			}).fail(function(a, b, c) {
				return e(!1, a, b, a)
			})
		},
		a.getMarketCenterCurrencyTable = function(a, e) {
			var f = "/marketcenter/currencytable",
				g = c(f, a);
			if (!e || !d(e))
				return b.ajax(g);
			b.ajax(g).done(function(a, b, c) {
				return e(!0, a, b, c)
			}).fail(function(a, b, c) {
				return e(!1, a, b, a)
			})
		},
		a.getChartData = function(a, e) {
			if ("object" != typeof a)
				return e && d(e) ? e(!1, null) : void 0;
			void 0 == a.chartType && (a.chartType = ""),
				void 0 == a.startDate && (a.startDate = ""),
				void 0 == a.endDate && (a.endDate = ""),
				void 0 == a.exchanges && (a.exchanges = ""),
				void 0 == a.dev && (a.dev = ""),
				void 0 == a.index && (a.index = "");
			var f = "/charts/data?data=" + a.chartType + "&startdate=" + a.startDate + "&enddate=" + a.endDate + "&exchanges=" + a.exchanges + "&dev=" + a.dev + "&index=" + a.index;
			a.callback && (f += "&callback=" + a.callback);
			var g = c(f, a);
			if (!e || !d(e))
				return b.ajax(g);
			b.ajax(g).done(function(a, b, c) {
				return e(!0, a, b, c)
			}).fail(function(a, b, c) {
				return e(!1, a, b, a)
			})
		},
		a.getBPIMetaData = function(a, e) {
			if ("object" != typeof a)
				return e && d(e) ? e(!1, null) : void 0;
			var f = a.bpiIndex || void 0;
			if (void 0 == f || null == f)
				return e && d(e) ? e(!1, null) : void 0;
			"string" != typeof f && (f = f.toString());
			var g = "/charts/metadata.json?index=" + f,
				h = c(g, a);
			if (!e || !d(e))
				return b.ajax(h);
			b.ajax(h).done(function(a, b, c) {
				return e(!0, a, b, c)
			}).fail(function(a, b, c) {
				return e(!1, a, b, a)
			})
		},
		a._exchangeRates = function() {
			var a = this;
			a.rates = [],
				a.currencies = [{
					iso: "AED",
					currency: "United Arab Emirates Dirham",
					symbol: "د.إ"
				}, {
					iso: "AFN",
					currency: "Afghan Afghani",
					symbol: "؋"
				}, {
					iso: "ALL",
					currency: "Albanian Lek",
					symbol: "L"
				}, {
					iso: "AMD",
					currency: "Armenian Dram",
					symbol: "դր"
				}, {
					iso: "ANG",
					currency: "Netherlands Antillean Guilder",
					symbol: "ƒ"
				}, {
					iso: "AOA",
					currency: "Angolan Kwanza",
					symbol: ""
				}, {
					iso: "ARS",
					currency: "Argentine Peso",
					symbol: "$"
				}, {
					iso: "AUD",
					currency: "Australian Dollar",
					symbol: "$"
				}, {
					iso: "AWG",
					currency: "Aruban Florin",
					symbol: "ƒ"
				}, {
					iso: "AZN",
					currency: "Azerbaijani Manat",
					symbol: "₼"
				}, {
					iso: "BAM",
					currency: "Bosnia-Herzegovina Convertible Mark",
					symbol: "KM"
				}, {
					iso: "BBD",
					currency: "Barbadian Dollar",
					symbol: "$"
				}, {
					iso: "BDT",
					currency: "Bangladeshi Taka",
					symbol: ""
				}, {
					iso: "BGN",
					currency: "Bulgarian Lev",
					symbol: "лв"
				}, {
					iso: "BHD",
					currency: "Bahraini Dinar",
					symbol: ""
				}, {
					iso: "BIF",
					currency: "Burundian Franc",
					symbol: ""
				}, {
					iso: "BMD",
					currency: "Bermudan Dollar",
					symbol: "$"
				}, {
					iso: "BND",
					currency: "Brunei Dollar",
					symbol: "$"
				}, {
					iso: "BOB",
					currency: "Bolivian Boliviano",
					symbol: "$b"
				}, {
					iso: "BRL",
					currency: "Brazilian Real",
					symbol: "R$"
				}, {
					iso: "BSD",
					currency: "Bahamian Dollar",
					symbol: "$"
				}, {
					iso: "BTC",
					currency: "Bitcoin",
					symbol: "Ƀ"
				}, {
					iso: "BTN",
					currency: "Bhutanese Ngultrum",
					symbol: ""
				}, {
					iso: "BWP",
					currency: "Botswanan Pula",
					symbol: "P"
				}, {
					iso: "BYR",
					currency: "Belarusian Ruble",
					symbol: ""
				}, {
					iso: "BZD",
					currency: "Belize Dollar",
					symbol: "BZ$"
				}, {
					iso: "CAD",
					currency: "Canadian Dollar",
					symbol: "$"
				}, {
					iso: "CDF",
					currency: "Congolese Franc",
					symbol: ""
				}, {
					iso: "CHF",
					currency: "Swiss Franc",
					symbol: "CHF"
				}, {
					iso: "CLF",
					currency: "Chilean Unit of Account (UF)",
					symbol: ""
				}, {
					iso: "CLP",
					currency: "Chilean Peso",
					symbol: "$"
				}, {
					iso: "CNY",
					currency: "Chinese Yuan",
					symbol: "¥"
				}, {
					iso: "COP",
					currency: "Colombian Peso",
					symbol: "$"
				}, {
					iso: "CRC",
					currency: "Costa Rican Colón",
					symbol: "₡"
				}, {
					iso: "CUP",
					currency: "Cuban Peso",
					symbol: "₱"
				}, {
					iso: "CVE",
					currency: "Cape Verdean Escudo",
					symbol: ""
				}, {
					iso: "CZK",
					currency: "Czech Republic Koruna",
					symbol: "Kč"
				}, {
					iso: "DJF",
					currency: "Djiboutian Franc",
					symbol: ""
				}, {
					iso: "DKK",
					currency: "Danish Krone",
					symbol: "kr"
				}, {
					iso: "DOP",
					currency: "Dominican Peso",
					symbol: "RD$"
				}, {
					iso: "DZD",
					currency: "Algerian Dinar",
					symbol: ""
				}, {
					iso: "EEK",
					currency: "Estonian Kroon",
					symbol: ""
				}, {
					iso: "EGP",
					currency: "Egyptian Pound",
					symbol: "£"
				}, {
					iso: "ERN",
					currency: "Eritrean Nnakfa",
					symbol: ""
				}, {
					iso: "ETB",
					currency: "Ethiopian Birr",
					symbol: ""
				}, {
					iso: "EUR",
					currency: "Euro",
					symbol: "€"
				}, {
					iso: "FJD",
					currency: "Fijian Dollar",
					symbol: "$"
				}, {
					iso: "FKP",
					currency: "Falkland Islands Pound",
					symbol: "£"
				}, {
					iso: "GBP",
					currency: "British Pound Sterling",
					symbol: "£"
				}, {
					iso: "GEL",
					currency: "Georgian Lari",
					symbol: ""
				}, {
					iso: "GHS",
					currency: "Ghanaian Cedi",
					symbol: "¢"
				}, {
					iso: "GIP",
					currency: "Gibraltar Pound",
					symbol: "£"
				}, {
					iso: "GMD",
					currency: "Gambian Dalasi",
					symbol: ""
				}, {
					iso: "GNF",
					currency: "Guinean Franc",
					symbol: ""
				}, {
					iso: "GTQ",
					currency: "Guatemalan Quetzal",
					symbol: "Q"
				}, {
					iso: "GYD",
					currency: "Guyanaese Dollar",
					symbol: "$"
				}, {
					iso: "HKD",
					currency: "Hong Kong Dollar",
					symbol: "$"
				}, {
					iso: "HNL",
					currency: "Honduran Lempira",
					symbol: "L"
				}, {
					iso: "HRK",
					currency: "Croatian Kuna",
					symbol: "kn"
				}, {
					iso: "HTG",
					currency: "Haitian Gourde",
					symbol: ""
				}, {
					iso: "HUF",
					currency: "Hungarian Forint",
					symbol: "Ft"
				}, {
					iso: "IDR",
					currency: "Indonesian Rupiah",
					symbol: "Rp"
				}, {
					iso: "ILS",
					currency: "Israeli New Sheqel",
					symbol: "₪"
				}, {
					iso: "INR",
					currency: "Indian Rupee",
					symbol: ""
				}, {
					iso: "IQD",
					currency: "Iraqi Dinar",
					symbol: ""
				}, {
					iso: "IRR",
					currency: "Iranian Rial",
					symbol: "﷼"
				}, {
					iso: "ISK",
					currency: "Icelandic Króna",
					symbol: "kr"
				}, {
					iso: "JEP",
					currency: "Jersey Pound",
					symbol: "£"
				}, {
					iso: "JMD",
					currency: "Jamaican Dollar",
					symbol: "J$"
				}, {
					iso: "JOD",
					currency: "Jordanian Dinar",
					symbol: ""
				}, {
					iso: "JPY",
					currency: "Japanese Yen",
					symbol: "¥"
				}, {
					iso: "KES",
					currency: "Kenyan Shilling",
					symbol: ""
				}, {
					iso: "KGS",
					currency: "Kyrgystani Som",
					symbol: "лв"
				}, {
					iso: "KHR",
					currency: "Cambodian Riel",
					symbol: "៛"
				}, {
					iso: "KMF",
					currency: "Comorian Franc",
					symbol: ""
				}, {
					iso: "KPW",
					currency: "North Korean Won",
					symbol: "₩"
				}, {
					iso: "KRW",
					currency: "South Korean Won",
					symbol: "₩"
				}, {
					iso: "KWD",
					currency: "Kuwaiti Dinar",
					symbol: ""
				}, {
					iso: "KYD",
					currency: "Cayman Islands Dollar",
					symbol: "$"
				}, {
					iso: "KZT",
					currency: "Kazakhstani Tenge",
					symbol: "лв"
				}, {
					iso: "LAK",
					currency: "Laotian Kip",
					symbol: "₭"
				}, {
					iso: "LBP",
					currency: "Lebanese Pound",
					symbol: "£"
				}, {
					iso: "LKR",
					currency: "Sri Lankan Rupee",
					symbol: "₨"
				}, {
					iso: "LRD",
					currency: "Liberian Dollar",
					symbol: "$"
				}, {
					iso: "LSL",
					currency: "Lesotho Loti",
					symbol: ""
				}, {
					iso: "LTL",
					currency: "Lithuanian Litas",
					symbol: ""
				}, {
					iso: "LVL",
					currency: "Latvian Lats",
					symbol: ""
				}, {
					iso: "LYD",
					currency: "Libyan Dinar",
					symbol: ""
				}, {
					iso: "MAD",
					currency: "Moroccan Dirham",
					symbol: ""
				}, {
					iso: "MDL",
					currency: "Moldovan Leu",
					symbol: ""
				}, {
					iso: "MGA",
					currency: "Malagasy Ariary",
					symbol: ""
				}, {
					iso: "MKD",
					currency: "Macedonian Denar",
					symbol: "ден"
				}, {
					iso: "MMK",
					currency: "Myanma Kyat",
					symbol: ""
				}, {
					iso: "MNT",
					currency: "Mongolian Tugrik",
					symbol: "₮"
				}, {
					iso: "MOP",
					currency: "Macanese Pataca",
					symbol: ""
				}, {
					iso: "MRO",
					currency: "Mauritanian Ouguiya",
					symbol: ""
				}, {
					iso: "MTL",
					currency: "Maltese Lira",
					symbol: ""
				}, {
					iso: "MUR",
					currency: "Mauritian Rupee",
					symbol: "₨"
				}, {
					iso: "MVR",
					currency: "Maldivian Rufiyaa",
					symbol: ""
				}, {
					iso: "MWK",
					currency: "Malawian Kwacha",
					symbol: ""
				}, {
					iso: "MXN",
					currency: "Mexican Peso",
					symbol: "$"
				}, {
					iso: "MYR",
					currency: "Malaysian Ringgit",
					symbol: "RM"
				}, {
					iso: "MZN",
					currency: "Mozambican Metical",
					symbol: "MT"
				}, {
					iso: "NAD",
					currency: "Namibian Dollar",
					symbol: "$"
				}, {
					iso: "NGN",
					currency: "Nigerian Naira",
					symbol: "₦"
				}, {
					iso: "NIO",
					currency: "Nicaraguan Córdoba",
					symbol: "C$"
				}, {
					iso: "NOK",
					currency: "Norwegian Krone",
					symbol: "kr"
				}, {
					iso: "NPR",
					currency: "Nepalese Rupee",
					symbol: "₨"
				}, {
					iso: "NZD",
					currency: "New Zealand Dollar",
					symbol: "$"
				}, {
					iso: "OMR",
					currency: "Omani Rial",
					symbol: "﷼"
				}, {
					iso: "PAB",
					currency: "Panamanian Balboa",
					symbol: "B/."
				}, {
					iso: "PEN",
					currency: "Peruvian Nuevo Sol",
					symbol: "S/."
				}, {
					iso: "PGK",
					currency: "Papua New Guinean Kina",
					symbol: ""
				}, {
					iso: "PHP",
					currency: "Philippine Peso",
					symbol: "₱"
				}, {
					iso: "PKR",
					currency: "Pakistani Rupee",
					symbol: "₨"
				}, {
					iso: "PLN",
					currency: "Polish Zloty",
					symbol: "zł"
				}, {
					iso: "PYG",
					currency: "Paraguayan Guarani",
					symbol: "Gs"
				}, {
					iso: "QAR",
					currency: "Qatari Rial",
					symbol: "﷼"
				}, {
					iso: "RON",
					currency: "Romanian Leu",
					symbol: "lei"
				}, {
					iso: "RSD",
					currency: "Serbian Dinar",
					symbol: "Дин."
				}, {
					iso: "RUB",
					currency: "Russian Ruble",
					symbol: "Br"
				}, {
					iso: "RWF",
					currency: "Rwandan Franc",
					symbol: ""
				}, {
					iso: "SAR",
					currency: "Saudi Riyal",
					symbol: "﷼"
				}, {
					iso: "SBD",
					currency: "Solomon Islands Dollar",
					symbol: "$"
				}, {
					iso: "SCR",
					currency: "Seychellois Rupee",
					symbol: "₨"
				}, {
					iso: "SDG",
					currency: "Sudanese Pound",
					symbol: ""
				}, {
					iso: "SEK",
					currency: "Swedish Krona",
					symbol: "kr"
				}, {
					iso: "SGD",
					currency: "Singapore Dollar",
					symbol: "$"
				}, {
					iso: "SHP",
					currency: "Saint Helena Pound",
					symbol: "£"
				}, {
					iso: "SLL",
					currency: "Sierra Leonean Leone",
					symbol: ""
				}, {
					iso: "SOS",
					currency: "Somali Shilling",
					symbol: "S"
				}, {
					iso: "SRD",
					currency: "Surinamese Dollar",
					symbol: "$"
				}, {
					iso: "STD",
					currency: "São Tomé and Príncipe Dobra",
					symbol: ""
				}, {
					iso: "SVC",
					currency: "Salvadoran Colón",
					symbol: "$"
				}, {
					iso: "SYP",
					currency: "Syrian Pound",
					symbol: "£"
				}, {
					iso: "SZL",
					currency: "Swazi Lilangeni",
					symbol: ""
				}, {
					iso: "THB",
					currency: "Thai Baht",
					symbol: "฿"
				}, {
					iso: "TJS",
					currency: "Tajikistani Somoni",
					symbol: ""
				}, {
					iso: "TMT",
					currency: "Turkmenistani Manat",
					symbol: ""
				}, {
					iso: "TND",
					currency: "Tunisian Dinar",
					symbol: ""
				}, {
					iso: "TOP",
					currency: "Tongan Pa?anga",
					symbol: ""
				}, {
					iso: "TRY",
					currency: "Turkish Lira",
					symbol: ""
				}, {
					iso: "TTD",
					currency: "Trinidad and Tobago Dollar",
					symbol: "TT$"
				}, {
					iso: "TWD",
					currency: "New Taiwan Dollar",
					symbol: "NT$"
				}, {
					iso: "TZS",
					currency: "Tanzanian Shilling",
					symbol: ""
				}, {
					iso: "UAH",
					currency: "Ukrainian Hryvnia",
					symbol: "₴"
				}, {
					iso: "UGX",
					currency: "Ugandan Shilling",
					symbol: ""
				}, {
					iso: "USD",
					currency: "United States Dollar",
					symbol: "$"
				}, {
					iso: "UYU",
					currency: "Uruguayan Peso",
					symbol: "$U"
				}, {
					iso: "UZS",
					currency: "Uzbekistan Som",
					symbol: "лв"
				}, {
					iso: "VEF",
					currency: "Venezuelan Bolívar Fuerte",
					symbol: "Bs"
				}, {
					iso: "VND",
					currency: "Vietnamese Dong",
					symbol: "₫"
				}, {
					iso: "VUV",
					currency: "Vanuatu Vatu",
					symbol: ""
				}, {
					iso: "WST",
					currency: "Samoan Tala",
					symbol: ""
				}, {
					iso: "XAF",
					currency: "CFA Franc BEAC",
					symbol: ""
				}, {
					iso: "XAG",
					currency: "Silver (troy ounce)",
					symbol: ""
				}, {
					iso: "XAU",
					currency: "Gold (troy ounce)",
					symbol: ""
				}, {
					iso: "XBT",
					currency: "Bitcoin",
					symbol: "Ƀ"
				}, {
					iso: "XCD",
					currency: "East Caribbean Dollar",
					symbol: "$"
				}, {
					iso: "XDR",
					currency: "Special Drawing Rights",
					symbol: ""
				}, {
					iso: "XOF",
					currency: "CFA Franc BCEAO",
					symbol: ""
				}, {
					iso: "XPF",
					currency: "CFP Franc",
					symbol: ""
				}, {
					iso: "YER",
					currency: "Yemeni Rial",
					symbol: "﷼"
				}, {
					iso: "ZAR",
					currency: "South African Rand",
					symbol: "R"
				}, {
					iso: "ZMK",
					currency: "Zambian Kwacha (pre-)",
					symbol: ""
				}, {
					iso: "ZMW",
					currency: "Zambian Kwacha",
					symbol: ""
				}, {
					iso: "ZWL",
					currency: "Zimbabwean Dollar",
					symbol: ""
				}, {
					iso: "ETH",
					currency: "Ethereum",
					symbol: ""
				}],
				a.getRates = function(b) {
					function c() {
						return b ? b(a.rates) : a.rates
					}
					if (0 != a.rates.length)
						return c();
					a.loadRates({}, function(a, b) {
						return c()
					})
				},
				a.loadRates = function(e, f) {
					null != e.shouldCache && void 0 != e.shouldCache || (e.shouldCache = !0);
					var g = "/mapi/exchangerates.json",
						h = c(g, e);
					if (!f || !d(f))
						return b.ajax(h);
					b.ajax(h).done(function(b, c, d) {
						return a.rates = b.bpi || [],
							f(!0, b, c, d)
					}).fail(function(a, b, c) {
						return f(!1, a, b, a)
					})
				}
		},
		a.exchangeRates = new a._exchangeRates,
		a.getSentimentIndexData = function(a) {
			return a = a.toUpperCase(),
				b.ajax({
					type: "GET",
					url: "//widgets.qriously.com/coindesk/idxI_" + a + "_s_v2.json"
				})
		},
		a.redditSearch = function(a) {
			return b.ajax({
				type: "GET",
				contentType: "text/plain",
				xhrFields: {
					withCredentials: !1
				},
				url: "//www.reddit.com/search.json?q=url:" + a
			})
		},
		a
}(CD.Api || {}, jQuery);

var CD = CD || {};

CD.Calculator = function(a, b) {
	var c = b("#btcinput"),
		d = b("#fiatinput"),
		e = b("#fiatcurrency"),
		f = b("#fiatcurrencymobile"),
		g = null,
		h = [],
		i = "btc",
		j = "Conversion rate as per Bitcoin Price Index, last updated at ",
		k = "USD",
		l = !1,
		m = function() {
			CD.Api.getBPICurrentPriceCalc().then(function(b) {
				a.storeCurrencyRates(b)
			})
		},
		n = function() {
			var a, f = e.val();
			if ("btc" === i) {
				var h = c.val();
				void 0 !== h && (h = parseFloat(h.replace(/[^0-9-.]/g, "")),
					a = h * g.bpi[f].rate_float,
					d.val(CD.Helpers.formatMoney(a, 2, "")))
			} else {
				var k = d.val();
				void 0 !== k && (k = parseFloat(k.replace(/[^0-9-.]/g, "")),
					a = k / g.bpi[f].rate_float,
					c.val(CD.Helpers.formatMoney(a, 6, "")))
			}
			b(".updatetime").html(j + g.time.updateduk)
		},
		o = function(a) {
			var c = "";
			return b.each(a, function(a, b) {
					if ("BTC" === a)
						return !0;
					c += '<option value="' + a + '">' + a + "</option>",
						h.push({
							iso: a,
							label: a + " - " + b.description
						})
				}),
				c
		},
		p = function() {
			f.append(o(g.bpi)),
				e.autocomplete({
					minLength: 0,
					source: h,
					position: {
						offset: "-150 4"
					},
					focus: function(a, b) {
						return e.val(b.item.iso), !1
					},
					select: function(a, b) {
						return e.val(b.item.iso).blur(),
							n(), !1
					},
					_resizeMenu: function() {
						this.menu.element.outerWidth(325)
					},
					open: function() {
						b(this).autocomplete("widget").css("width", 300)
					}
				})
		},
		q = function() {
			c.keyup(function(a) {
					9 !== a.which && (i = "btc",
						n())
				}),
				d.keyup(function(a) {
					9 !== a.which && (i = "fiat",
						n())
				}),
				b(".exchangeratecontainer .numericonly").bind("keyup paste", function() {
					setTimeout(b.proxy(function() {
						this.val(this.val().replace(/[^0-9.]/g, "")),
							n()
					}, b(this)), 0)
				}),
				e.on({
					change: function() {
						n()
					},
					focus: function() {
						return "" !== b(this).val() && (k = b(this).val()),
							b(this).val("").autocomplete("search", ""), !1
					},
					blur: function() {
						"" === b(this).val() && b(this).val(k)
					},
					keydown: function(a) {
						13 === a.keyCode && e.autocomplete("close")
					}
				}),
				d.add(c).on({
					focus: function() {
						var a = b(this).val();
						b(this).val(parseFloat(a.replace(/[^0-9-.]/g, "")))
					},
					blur: function() {
						var a = "fiatinput" === b(this).attr("id") ? 2 : 6,
							c = parseFloat(b(this).val());
						b(this).val(CD.Helpers.formatMoney(c, a, ""))
					},
					keydown: function(a) {
						38 === a.which && setTimeout(b.proxy(function() {
								this.val(parseFloat(this.val()) + 1)
							}, b(this)), 0),
							40 === a.which && setTimeout(b.proxy(function() {
								parseFloat(this.val()) > 0 && this.val(parseFloat(this.val()) - 1)
							}, b(this)), 0)
					}
				}),
				f.on("change", function() {
					e.val(f.find(":selected").text()).trigger("keyup"),
						n()
				})
		};
	return a.storeCurrencyRates = function(a) {
			g = a,
				0 === f.has("option").length && p(),
				n()
		},
		a.init = function() {
			l = CD.Helpers.detectPages("price"),
				setInterval(function() {
					m()
				}, 6e4),
				m(),
				q()
		},
		a
}(CD.Calculator || {}, jQuery);
var CD = CD || {};
CD.ChartConfigs = function(a, b) {
	var c = function(a, b) {
		return +(Math.round(a + "e+" + b) + "e-" + b)
	};
	return a.setGlobalChartOptions = function() {
			if (!Highcharts)
				return !1;
			Highcharts.setOptions({
				chart: {
					style: {
						fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
					}
				},
				lang: {
					rangeSelectorZoom: "",
					rangeSelectorFrom: "",
					rangeSelectorTo: "to"
				}
			})
		}(),
		a.getBaseConfig = function() {
			return {
				colors: ["#333"],
				subtitle: {
					text: '<strong>Source: <a href="https://bitcoinnews.ch">bitcoinnews.ch</a></strong>'
				},
				chart: {
					events: {
						// load: CD.ChartConfigs.addLogoToChart
					},
					alignTicks: !1,
					zoomType: "x",
					pinchType: "x",
					panning: !0,
					selectionMarkerFill: "rgba(251,192,1,0.25)",
					backgroundColor: "#fff",
					borderWidth: 0,
					borderRadius: 0,
					plotBackgroundColor: null,
					plotShadow: !1,
					plotBorderWidth: 0
				},
				lang: {
					contextButtonTitle: "Export options for this chart"
				},
				navigation: {
					menuItemStyle: {
						background: "none",
						padding: "10px",
						color: "#555",
						fontSize: "12px"
					},
					menuItemHoverStyle: {
						background: "#d8d8d8",
						color: "#555"
					},
					buttonOptions: {
						theme: {
							r: 0,
							states: {
								hover: {
									fill: "#fff",
									stroke: "#fff"
								},
								select: {
									stroke: "#fff",
									fill: "#fff"
								}
							}
						}
					}
				},
				navigator: {
					enabled: !1,
					adaptToUpdatedData: !0,
					handles: {
						backgroundColor: "#FBC001",
						borderColor: "#555"
					},
					outlineColor: "#555",
					maskFill: "rgba(255,255,255,.75)",
					series: {
						color: "#fcf0d7",
						lineColor: "#FBC001",
						fillOpacity: 1,
						lineWidth: 2
					}
				},
				rangeSelector: {
					inputPosition: {
						x: -80
					},
					buttonSpacing: 3,
					inputBoxBorderColor: "#d8d8d8",
					inputStyle: {
						color: "#8a8a8a",
						fontSize: "12px",
						fontFamily: "Arial"
					},
					labelStyle: {
						color: "#8a8a8a",
						fontSize: "13px",
						fontFamily: "Arial",
						marginTop: "-10px"
					},
					buttonTheme: {
						fill: "#e6e6e6",
						stroke: "#e6e6e6",
						r: 0,
						width: 30,
						style: {
							color: "#555",
							fontSize: "12px"
						},
						states: {
							hover: {
								fill: "#d8d8d8",
								stroke: "#d8d8d8",
								style: {
									color: "#555"
								}
							},
							select: {
								fill: "#FBC001",
								stroke: "#FBC001",
								style: {
									color: "#555"
								}
							}
						}
					}
				},
				title: {
					text: "",
					style: {
						fontSize: "20px",
						fontWeight: "bold",
						color: "#545454"
					}
				},
				scrollbar: {
					enabled: !1,
					liveRedraw: !1
				},
				yAxis: {
					opposite: !1,
					showFirstLabel: !1,
					endOnTick: !0,
					gridLineColor: "#e8e8e8",
					lineWidth: 0,
					tickWidth: 0,
					labels: {
						style: {
							color: "#8a8a8a"
						}
					}
				},
				xAxis: {
					gridLineWidth: 0,
					lineColor: "#fff",
					labels: {
						style: {
							color: "#8a8a8a"
						}
					},
					endOnTick: !1
				},
				legend: {
					itemStyle: {
						color: "#CCC"
					},
					itemHoverStyle: {
						color: "#ccc"
					},
					itemHiddenStyle: {
						color: "#333"
					}
				},
				labels: {
					style: {
						color: "#CCC"
					}
				},
				credits: {
					enabled: !1
				},
				exporting: {
					chartOptions: {
						scrollbar: {
							enabled: !1
						}
					},
					enabled: !0,
					scale: 1,
					sourceWidth: 800,
					sourceHeight: 400,
					buttons: {
						downArrow: {
							symbol: "url(" + window.bitcoin_plugin_url + "/images/cd-export.png)",
							symbolX: 15,
							symbolY: 17.5,
							height: 20,
							text: "Export",
							y: -1,
							x: 0,
							_titleKey: "contextButtonTitle",
							theme: {
								fill: "#fbc001",
								stroke: "#fff",
								r: 0,
								height: 16,
								width: 40,
								padding: 2,
								states: {
									hover: {
										fill: "#f0b91c",
										stroke: "#fff"
									},
									select: {
										fill: "#f0b91c",
										stroke: "#fff"
									}
								}
							},
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
									this.exportChart(null, {
										chart: {
											events: {
												load: CD.ChartConfigs.addLogoToChart
											}
										}
									})
								}
							}, {
								textKey: "downloadJPEG",
								onclick: function() {
									this.exportChart({
										type: "image/jpeg",
										events: {
											load: CD.ChartConfigs.addLogoToChart
										}
									})
								}
							}, {
								textKey: "downloadPDF",
								onclick: function() {
									this.exportChart({
										type: "application/pdf",
										events: {
											load: CD.ChartConfigs.addLogoToChart
										}
									})
								}
							}, {
								textKey: "downloadSVG",
								onclick: function() {
									this.exportChart({
										type: "image/svg+xml",
										events: {
											load: CD.ChartConfigs.addLogoToChart
										}
									})
								}
							}]
						}
					}
				}
			}
		},
		a.getBPIChartConfig = function(c, d, e, f, g, h) {
			var i, j;
			return i = a.getBaseConfig(),
				j = {
					chart: {
						renderTo: "xbtindex-chart"
					},
					navigator: {
						series: {
							data: c.navigator
						}
					},
					rangeSelector: {
						allButtonsEnabled: !0,
						buttonSpacing: 2,
						selected: d,
						inputEnabled: e,
						buttons: f
					},
					plotOptions: {
						candlestick: {
							borderWidth: 0,
							lineWidth: 1,
							color: "#b95516",
							lineColor: "#b95516",
							upColor: "#009b2c",
							upLineColor: "#009b2c",
							tooltip: {
								useHTML: !0,
								headerFormat: '<span style="font-size: 10px">{point.key}</span><br/><table>',
								pointFormat: '<tr><td style="color: {series.color}; font-weight: bold;">{series.name}</td></tr><tr><td style="font-weight: bold;">Open:<td><td style="text-align: right; padding-left: 20px"><b>{point.open}</b></td></tr><tr><td style="font-weight: bold;">High:<td><td style="text-align: right; padding-left: 20px"><b>{point.high}</b></td></tr><tr><td style="font-weight: bold;">Low:<td><td style="text-align: right; padding-left: 20px"><b>{point.low}</b></td></tr><tr><td style="font-weight: bold;">Close:<td><td style="text-align: right; padding-left: 20px"><b>{point.close}</b></td></tr>',
								footerFormat: "</table><br/>"
							}
						},
						ohlc: {
							borderWidth: 0,
							lineWidth: 1,
							marker: {
								enabled: !1,
								radius: 100
							}
						}
					},
					tooltip: {
						shadow: !1,
						backgroundColor: "#e6e6e6",
						borderWidth: 0,
						valueDecimals: 2,
						valuePrefix: undefined,
						valueSuffix: ' ' + get_currency(),
						color: "#333",
						shared: !0,
						useHTML: !0,
						headerFormat: "<small>{point.key} UTC</small><table>",
						pointFormat: '<tr><td style="color: {series.color}; font-weight: bold;">{series.name}:</td><td style="text-align: right; padding-left: 20px"><b>{point.y}</b></td></tr>',
						footerFormat: "</table>",
						formatter: function(a) {
							return a.tooltipFooterHeaderFormatter(this.points[0]) + '<tr><td style="color: #333; font-weight: bold;">BitcoinNews BPI:</td><td style="text-align: right; padding-left: 10px"><b>' + Highcharts.formatSingle('.2f', CHF_rate(this.y)) + ' ' + get_currency() + '</b></td></tr></table>';
						},
					},
					series: h.seriesOptions,
					yAxis: {
						labels: {
							format: "{value} " + get_currency(),
							formatter: function() {
								return Highcharts.formatSingle('.0f', CHF_rate(this.value));
							},
						}
					},
					xAxis: {
						tickPixelInterval: 200,
						type: "datetime",
						ordinal: !1
					},
					exporting: {
						filename: "bitcoinnews.ch-bpi-chart"
					}
				},
				b.extend(!0, i, j)
		},
		a.getSentimentChartConfig = function(c) {
			var d, e;
			return d = a.getBaseConfig(),
				e = {
					chart: {
						renderTo: "sentimentindex-chart"
					},
					rangeSelector: {
						selected: 4,
						inputEnabled: !0,
						buttons: [{
							type: "week",
							count: 1,
							text: "1w"
						}, {
							type: "month",
							count: 1,
							text: "1m"
						}, {
							type: "month",
							count: 3,
							text: "3m"
						}, {
							type: "year",
							count: 1,
							text: "1y"
						}, {
							type: "all",
							text: "All"
						}]
					},
					plotOptions: {
						series: {
							dataGrouping: {
								dateTimeLabelFormats: {
									minute: ["%A, %b %e, %Y", "%A, %b %e, %Y", ""],
									hour: ["%A, %b %e, %Y", "%A, %b %e, %Y", ""],
									day: ["%A, %b %e, %Y", "%A, %b %e, %Y", ""],
									week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
									month: ["%B %Y", "%B", ""],
									year: ["%Y", "%Y", ""]
								}
							}
						}
					},
					tooltip: {
						xDateFormat: "%Y-%m-%d",
						shadow: !1,
						backgroundColor: "#FBC001",
						borderWidth: 0,
						borderRadius: 0,
						valueDecimals: 2,
						style: {
							color: "#555",
							padding: "10px"
						}
					},
					series: [{
						name: "Score",
						data: c
					}],
					xAxis: {
						type: "datetime"
					},
					exporting: {
						filename: "sentiment-index",
						sourceWidth: 1260,
						sourceHeight: 800
					}
				},
				b.extend(!0, d, e)
		},
		a.getSidebarPricingWidgetChartConfig = function(a) {
			if (!a)
				return {};
			var d = a.data || [],
				e = (a.currency,
					a.chartElement || ""),
				f = b(window).width() <= 640,
				g = {},
				a = {
					chart: {
						width: 202,
						height: 100,
						renderTo: e,
						backgroundColor: null,
						borderWidth: 0,
						type: "area",
						margin: [8, 0, 8, 45],
						style: {
							overflow: "visible"
						},
						skipClone: !0
					},
					colors: ["#f1c40f"],
					title: {
						text: ""
					},
					credits: {
						enabled: !1
					},
					xAxis: {
						labels: {
							enabled: !1
						},
						title: {
							text: null
						},
						lineWidth: 0,
						tickPositions: []
					},
					yAxis: {
						tickPositioner: function() {
							return this.series[0].dataMax <= 1 ? [this.series[0].dataMin, (this.series[0].dataMin + this.series[0].dataMax) / 2, this.series[0].dataMax] : [Math.floor(this.series[0].dataMin), (this.series[0].dataMin + this.series[0].dataMax) / 2, Math.ceil(this.series[0].dataMax)]
						},
						lineWidth: 0,
						gridLineColor: "#383b3e",
						gridLineWidth: 1,
						labels: {
							enabled: !0,
							formatter: function() {
								return this.chart.series[0].dataMax/window.diff_rate <= 1 ? Highcharts.numberFormat(c((this.value/window.diff_rate), 3), 2, '.', ','): Highcharts.numberFormat(Math.round((this.value/window.diff_rate)), 0, '.', ',')
							},
							style: {
								color: "#fff",
								fontSize: 15
							},
							x: -4,
							y: 5
						},
						title: {
							text: null
						}
					},
					navigation: {
						buttonOptions: {
							enabled: !1
						}
					},
					legend: {
						enabled: !1
					},
					tooltip: {
						enabled: !1
					},
					plotOptions: {
						series: {
							animation: !1,
							lineWidth: 2,
							shadow: !1,
							states: {
								hover: {
									enabled: !1
								}
							},
							marker: {
								radius: 0
							},
							fillOpacity: 0
						}
					},
					series: [{
						data: d


					}]
				};
			return f && (g = {
						chart: {
							margin: [0, 0, 0, 0]
						},
						yAxis: {
							gridLineWidth: 0,
							labels: {
								enabled: !1
							}
						}
					},
					b.extend(!0, a, g)),
				a
		},
		a.addLogoToChart = function() {
			var a = b(this.container),
				c = a.width(),
				d = a.height(),
				e = document.location.protocol + "//" + document.location.hostname,
				f = {
					x: c - 85,
					y: d - 62
				};
			this.renderer.image(window.bitcoin_plugin_url + "/images/bitcoinschweiz.png", f.x, f.y, 85, 62).add()
		},
		a
}(CD.ChartConfigs || {}, jQuery);

var CD = CD || {};
CD.EventCountdown = function(a, b) {
	var c = 864e5,
		d = function(a, b, c, d, e) {
			a.find(".amount.days").text(b),
				a.find(".amount.hours").text(c),
				a.find(".amount.minutes").text(d),
				a.find(".amount.seconds").text(e)
		},
		e = function(a) {
			window.setInterval(function() {
				var b = new Date(1e3 * a.data("end-timestamp")),
					e = new Date(b - Date.now()),
					f = Math.floor(e.getTime() / c),
					g = e.getUTCHours(),
					h = e.getUTCMinutes(),
					i = e.getUTCSeconds();
				d(a, f, g, h, i)
			}, 1e3)
		};
	return a.init = function() {
			b(".event-countdown").each(function() {
				e(b(this))
			})
		},
		a
}(CD.EventCountdown || {}, jQuery);

var CD = CD || {};
CD.Helpers = function(a, b) {
	return a.toLocaleString = function(b, c, d) {
			return b = a.toNumber(b),
				void 0 == d && (d = b < 1 ? 6 : 2),
				b = b.toFixed(d),
				b = b.toString(),
				b = parseFloat(b),
				b = b.toLocaleString(void 0, {
					minimumFractionDigits: 0,
					maximumFractionDigits: 8
				}),
				c && (b = c + b),
				b
		},
		a.toNumber = function(a) {
			return void 0 == a || null == a ? 0 : ("string" == typeof a && (a = a.replace(/,/g, "")),
				a = parseFloat(a))
		},
		a.formatMoney = function(a, b, c, d, e) {
			var f, g, h;
			return b = isNaN(b = Math.abs(b)) ? 2 : b,
				c = void 0 !== c ? c : "$",
				c = "&dollar;" === c ? "$" : c,
				d = void 0 !== d ? d : ",",
				e = e || ".",
				f = a < 0 ? "-" : "",
				g = parseInt(a = Math.abs(+a || 0).toFixed(b), 10) + "",
				h = (h = g.length) > 3 ? h % 3 : 0,
				c + f + (h ? g.substr(0, h) + d : "") + g.substr(h).replace(/(\d{3})(?=\d)/g, "$1" + d) + (b ? e + Math.abs(a - g).toFixed(b).slice(2) : "")
		},
		a.addCommas = function(a) {
			a += "";
			for (var b = a.split("."), c = b[0], d = b.length > 1 ? "." + b[1] : "", e = /(\d+)(\d{3})/; e.test(c);)
				c = c.replace(e, "$1,$2");
			return c + d
		},
		a.displayRounded = function(a, b) {
			var c = b || 0,
				d = Math.pow(10, c);
			return Math.round(a * d) / d
		},
		a.abbreviateNumber = function(a) {
			var b, c, d, e, f, g = ["", "K", "M", "B", "T"];
			if (a >= 1e3) {
				for (c = Math.floor(("" + a).length / 3),
					d = "",
					f = 4; f >= 1 && (d = parseFloat((0 !== c ? a / Math.pow(1e3, c) : a).toPrecision(f)),
						e = (d + "").replace(/[^a-zA-Z 0-9]+/g, ""), !(e.length <= 4)); f--)
				;
				b = d + g[c]
			}
			return b
		},
		a.getPercentageChange = function(a, b) {
			return (b - a) / a * 100
		},
		a.stripDomainFromUrl = function(a) {
			return a.replace(/^.*\/\/[^\/]+/, "")
		},
		a.getReferrerDomain = function() {
			var a = document.referrer.match(/:\/\/(www\.|)([^\/]*)/);
			return a && a.length >= 3 && (a = a[2]),
				a
		},
		a.getFBWidth = function() {
			return b(window).width() < 400 ? 270 : 300
		},
		a.setupComments = function() {
			return b.ajax({
				type: "GET",
				url: "//coindesk.disqus.com/embed.js",
				dataType: "script",
				cache: !0
			})
		},
		a.debounce = function(a, b, c) {
			var d;
			return function() {
				function e() {
					c || a.apply(f, g),
						d = null
				}
				var f = this,
					g = arguments;
				d ? clearTimeout(d) : c && a.apply(f, g),
					d = setTimeout(e, b || 100)
			}
		},
		a.scrolledVisible = function(a) {
			var c = b(window).scrollTop(),
				d = c + b(window).height(),
				e = a.offset().top;
			return e + a.height() <= d && e >= c
		},
		a.scrolledPast = function(a) {
			var c = b(window).scrollTop(),
				d = c + b(window).height();
			return a.offset().top <= d
		},
		a.detectPages = function(a) {
			var b, c;
			if (a instanceof Array && a.length)
				b = a.join("|");
			else {
				if ("string" != typeof a)
					return !1;
				b = a
			}
			return c = new RegExp("/(" + b + ")/?$", "i"),
				null !== window.location.pathname.match(c)
		},
		a.dateToYMD = function(a) {
			var b = a.getDate(),
				c = a.getMonth() + 1;
			return a.getFullYear() + "-" + (c <= 9 ? "0" + c : c) + "-" + (b <= 9 ? "0" + b : b)
		},
		a.dateFromYMD = function(a) {
			var b = a.split("-");
			return 3 === b.length && new Date(b[0], b[1] - 1, b[2])
		},
		a.isWithinDateRange = function(a, b, c) {
			return a = a.setHours(0, 0, 0, 0),
				b = b.setHours(0, 0, 0, 0),
				c = c.setHours(23, 59, 59, 999),
				a >= b && a <= c
		},
		a.encompassesRange = function(a, b) {
			return a[0] = a[0].setHours(0, 0, 0, 0),
				b[0] = b[0].setHours(0, 0, 0, 0),
				a[1] = a[1].setHours(23, 59, 59, 999),
				b[1] = b[1].setHours(23, 59, 59, 999),
				a[0] >= b[0] && a[0] <= b[1] && a[1] >= b[0] && a[1] <= b[1]
		},
		a
}(CD.Helpers || {}, jQuery);

var MarketCenterPage = function() {
	function a(a, b) {
		var c, d = z.btceDates,
			e = new Date(d.start.y, d.start.m - 1, d.start.d),
			f = new Date(d.end.y, d.end.m - 1, d.end.d);
		c = jQuery('.exchangeData input[name="btce"]').length ? jQuery('.exchangeData input[name="btce"]') : jQuery('.exchangeData input[value="btce"]'),
			a = "number" == typeof a ? new Date(a) : a,
			b = "number" == typeof b ? new Date(b) : b,
			CD.Helpers.isWithinDateRange(e, a, b) || CD.Helpers.isWithinDateRange(f, a, b) || CD.Helpers.encompassesRange([a, b], [e, f]) ? c.parent().fadeIn() : c.prop("checked", !1).parent().fadeOut()
	}

	function b(a, b) {
		var c, d = z.mtGoxDates,
			e = new Date(d.start.y, d.start.m - 1, d.start.d),
			f = new Date(d.end.y, d.end.m - 1, d.end.d);
		c = jQuery('.exchangeData input[name="mtgox"]').length ? jQuery('.exchangeData input[name="mtgox"]') : jQuery('.exchangeData input[value="mtgox"]'),
			a = "number" == typeof a ? new Date(a) : a,
			b = "number" == typeof b ? new Date(b) : b,
			CD.Helpers.isWithinDateRange(e, a, b) || CD.Helpers.isWithinDateRange(f, a, b) || CD.Helpers.encompassesRange([a, b], [e, f]) ? c.parent().fadeIn() : c.prop("checked", !1).parent().fadeOut()
	}

	function c(a, b) {
		var c, d = z.lakeBtcDates,
			e = new Date(d.start.y, d.start.m - 1, d.start.d),
			f = new Date(d.end.y, d.end.m - 1, d.end.d);
		c = jQuery('.exchangeData input[name="lakebtc"]').length ? jQuery('.exchangeData input[name="lakebtc"]') : jQuery('.exchangeData input[value="lakebtc"]'),
			a = "number" == typeof a ? new Date(a) : a,
			b = "number" == typeof b ? new Date(b) : b,
			CD.Helpers.isWithinDateRange(e, a, b) || CD.Helpers.isWithinDateRange(f, a, b) || CD.Helpers.encompassesRange([a, b], [e, f]) ? c.parent().fadeIn() : c.prop("checked", !1).parent().fadeOut()
	}

	function d() {
		var a = z.bpiDates;
		jQuery.datepicker.setDefaults({
			dateFormat: "yy-mm-dd",
			minDate: new Date(a[window.bpiIndex].y, a[window.bpiIndex].m - 1, a[window.bpiIndex].d),
			maxDate: new Date,
			onSelect: function() {
				this.onchange(),
					this.onblur()
			}
		})
	}

	function e() {
		var a = jQuery(".exchangeOptions.active .exchange"),
			b = [];
		return a.each(function() {
				jQuery(this).is(":checked") && b.push(jQuery(this).val())
			}),
			b.length || b.push("bpi"),
			b
	}

	function f(a) {
		var b, c = {},
			d = e();
		c.navigator = a.bpi,
			c.exchanges = {}, -1 === d.indexOf("bpi") && delete a.bpi;
		for (b in a)
			c.exchanges[b] = {
				data: a[b],
				color: z.exchangeConf[b].color,
				symbol: z.exchangeConf[b].symbol,
				name: z.exchangeConf[b].name
			};
		return c
	}

	function g(a) {
		jQuery(".exchangeOptions.active, table#price-historical tbody.active").removeClass("active"),
			"CNY" === a ? (window.currSymbol = "¥",
				jQuery(".exchangeOptions.CNY, table#price-historical tbody.CNY").addClass("active")) : (window.currSymbol = "$",
				jQuery(".exchangeOptions.USD, table#price-historical tbody.USD").addClass("active"))
	}

	function h(a) {
		var b, c = Object.keys(a)[0],
			d = 2 === a[c][0].length,
			e = 0;
		window.exchangeData = f(a);
		for (b in window.exchangeData.exchanges)
			z.seriesOptions[e] = {
				name: window.exchangeData.exchanges[b].name,
				data: window.exchangeData.exchanges[b].data,
				marker: {
					symbol: window.exchangeData.exchanges[b].symbol
				}
			},
			d ? (z.seriesOptions[e].color = window.exchangeData.exchanges[b].color,
				z.seriesOptions[e].type = "line") : z.seriesOptions[e].type = "candlestick",
			e++;
		if (window.bpiIndex && "USD" != window.bpiIndex && "CNY" != window.bpiIndex)
			var g = {
				type: "flags",
				name: "Flags on series",
				data: [{
					x: Date.UTC(z.bpiDates[window.bpiIndex].y, z.bpiDates[window.bpiIndex].m, z.bpiDates[window.bpiIndex].d),
					title: window.bpiIndex + " pricing in effect"
				}],
				shape: "squarepin"
			};
		else
			var g = {
				type: "flags",
				name: "Flags on series",
				data: [{
					x: Date.UTC(2013, 6, 1),
					title: "BitCoinNews BPI in effect"
				}],
				shape: "squarepin"
			};
		z.seriesOptions.push(g)
	}

	function i() {
		var a = p.xAxis[0].getExtremes();
		return {
			start: CD.Helpers.dateToYMD(new Date(Math.round(a.min))),
			end: CD.Helpers.dateToYMD(new Date(Math.round(a.max)))
		}
	}

	function j() {
		if (!p || !p.xAxis)
			return setTimeout(j, 100), !1;
		var a, b = e(jQuery(".exchangeOptions.active .exchange")),
			c = z.chartType,
			d = CD.WEBSITE_HOST + "/price/#",
			f = i();
		a = b.length > 1 ? b.join("|") : b,
			d += f.start + "," + f.end + "," + c,
			d = a ? d + "," + a : d + ",bpi",
			d += "," + z.bpiIndex,
			jQuery("#chart-share-url").val(d)
	}

	function k() {
		var a = jQuery(".exchangeData .button"),
			b = z.chartType;
		jQuery(".exchangeOptions.active .exchange").each(function() {
				var a = jQuery(this),
					c = a.is(":checked") ? "checked" : "",
					d = "ohlc" === b ? "radio" : "checkbox",
					e = "ohlc" === b ? "ohlc" : a.attr("name"),
					f = a.attr("value");
				a.replaceWith('<input type="' + d + '" class="exchange" name="' + e + '" value="' + f + '" ' + c + " />")
			}),
			"ohlc" === b ? (a.hide(),
				jQuery("input.exchange:radio").click(function() {
					a.click()
				})) : "close" === b && a.show()
	}

	function l(a) {
		var b, c, d = ["startDate", "endDate", "dataType", "exchanges", "index"],
			e = {};
		for (a = "#" === a.charAt(0) ? a.substr(1) : a,
			b = a.split(","),
			c = 0; c < b.length; c++)
			e[d[c]] = b[c];
		return e
	}

	function m() {
		var a, b, c, e, f = window.location.hash;
		for (f ? (c = l(f),
				c.startDate && c.endDate && (z.dateStart = c.startDate,
					b = CD.Helpers.dateFromYMD(c.endDate),
					z.dateEnd = CD.Helpers.dateToYMD(new Date(b.setTime(b.getTime() + 846e5)))),
				a = c.dataType ? c.dataType : "close",
				z.chartType = a,
				z.exchanges = c.exchanges ? c.exchanges.split("|") : ["bpi"],
				c.index && (window.bpiIndex = c.index,
					jQuery("#bpiIndexWrapper tabs.bpiIndexSel").find("li").removeClass("active"),
					jQuery("#bpiIndexWrapper tabs.bpiIndexSel li." + window.bpiIndex).addClass("active"),
					g(window.bpiIndex),
					d()),
				k()) : (a = "close",
				z.exchanges = ["bpi"]),
			e = 0; e < z.exchanges.length; e++)
			jQuery(".exchangeData input.exchange[value=" + z.exchanges[e] + "]").attr("checked", !0)
	}

	function n(a) {
		if (u)
			try {
				h(a);
				for (var b = p.series.length, c = b - 1; c > -1; c--)
					"Navigator" !== p.series[c].name && p.series[c].remove();
				for (c = 0; c < z.seriesOptions.length; c++)
					p.addSeries(z.seriesOptions[c], !1);
				return p.hideLoading(),
					p.redraw(),
					a = null,
					j(),
					setTimeout(function() {
						v = !1
					}, w), !0
			} catch (a) {
				setTimeout(function() {
					v = !1
				}, w)
			}
		else
			setTimeout(n(), 2 * w)
	}

	function o(a) {
		n(a)
	}
	console.log("Loading bpiprice.js");
	var p, q, r, s, t, u = !1,
		v = !1,
		w = 250;
	window.currSymbol = "$";
	var x = new Date,
		y = new Date;
	y.setDate(y.getDate() - 1);
	var z = {
		dateStart: y,
		dateEnd: x,
		chartType: "close",
		chartHeight: 400,
		exchanges: ["bpi"],
		seriesOptions: [],
		currSymbol: "$",
		bpiIndex: "USD",
		bpiDates: {
			USD: {
				y: 2010,
				m: 7,
				d: 17
			},
			CNY: {
				y: 2014,
				m: 2,
				d: 1
			},
			ETH: {
				y: 2015,
				m: 8,
				d: 1
			},
			LTC: {
				y: 2014,
				m: 3,
				d: 1
			},
			XRP: {
				y: 2014,
				m: 9,
				d: 1
			},
			NXT: {
				y: 2014,
				m: 2,
				d: 1
			},
			ETC: {
				y: 2016,
				m: 8,
				d: 1
			},
			ZEC: {
				y: 2016,
				m: 11,
				d: 1
			},
			XMR: {
				y: 2015,
				m: 2,
				d: 1
			},
			DASH: {
				y: 2014,
				m: 3,
				d: 1
			},
			BTS: {
				y: 2015,
				m: 9,
				d: 1
			},
			NEO: {
				y: 2016,
				m: 8,
				d: 22
			},
			QTUM: {
				y: 2016,
				m: 8,
				d: 22
			},
			OMG: {
				y: 2016,
				m: 8,
				d: 22
			},
			STRAT: {
				y: 2016,
				m: 8,
				d: 22
			},
			WAVES: {
				y: 2016,
				m: 8,
				d: 22
			},
			EOS: {
				y: 2016,
				m: 8,
				d: 22
			},
			USDT: {
				y: 2016,
				m: 8,
				d: 22
			},
			SNT: {
				y: 2016,
				m: 8,
				d: 22
			},
			BCH: {
				y: 2016,
				m: 8,
				d: 22
			},
			DGB: {
				y: 2016,
				m: 8,
				d: 22
			},
			HSR: {
				y: 2016,
				m: 8,
				d: 22
			},
			LSK: {
				y: 2016,
				m: 8,
				d: 22
			},
			LSK: {
				y: 2016,
				m: 8,
				d: 22
			},
			ADA: {
				y: 2016,
				m: 8,
				d: 22
			},
			IOT: {
				y: 2016,
				m: 8,
				d: 22
			},
			CVC: {
				y: 2016,
				m: 8,
				d: 22
			},
			WTC: {
				y: 2016,
				m: 8,
				d: 22
			},
			PAY: {
				y: 2016,
				m: 8,
				d: 22
			}
		},
		btceDates: {
			start: {
				y: 2013,
				m: 7,
				d: 1
			},
			end: {
				y: 2015,
				m: 11,
				d: 4
			}
		},
		lakeBtcDates: {
			start: {
				y: 2014,
				m: 6,
				d: 30
			},
			end: {
				y: 2015,
				m: 6,
				d: 25
			}
		},
		mtGoxDates: {
			start: {
				y: 2013,
				m: 4,
				d: 22
			},
			end: {
				y: 2014,
				m: 2,
				d: 9
			}
		},
		exchangeConf: {
			bpi: {
				color: "#333333",
				symbol: "circle",
				name: "BitCoinNews BPI"
			},
			bitstamp: {
				color: "#8EC919",
				symbol: "square",
				name: "Bitstamp"
			},
			bitfinex: {
				color: "#E15656",
				symbol: "triangle-down",
				name: "Bitfinex"
			},
			btce: {
				color: "#36348F",
				symbol: "triangle",
				name: "BTC-e"
			},
			coinbase: {
				color: "#2B71B1",
				symbol: "diamond",
				name: "Coinbase"
			},
			itbit: {
				color: "#3EB5AD",
				symbol: "circle",
				name: "itBit"
			},
			mtgox: {
				color: "#FC8131",
				symbol: "diamond",
				name: "Mt. Gox"
			},
			okcoin: {
				color: "#36348F",
				symbol: "triangle",
				name: "OKCoin"
			},
			btcchina: {
				color: "#FC8131",
				symbol: "diamond",
				name: "BTC China"
			},
			huobi: {
				color: "#8F8F8F",
				symbol: "diamond",
				name: "Huobi"
			},
			lakebtc: {
				color: "#37C0DA",
				symbol: "triangle-down",
				name: "LakeBTC"
			},
			ETH: {
				color: "#fcc118",
				symbol: "circle",
				name: "Ethereum"
			},
			XRP: {
				color: "#fcc118",
				symbol: "circle",
				name: "Ripple"
			},
			LTC: {
				color: "#fcc118",
				symbol: "circle",
				name: "Litecoin"
			},
			NXT: {
				color: "#fcc118",
				symbol: "circle",
				name: "Nxt"
			},
			ETC: {
				color: "#fcc118",
				symbol: "circle",
				name: "Ethereum Classic"
			},
			ZEC: {
				color: "#fcc118",
				symbol: "circle",
				name: "Zcash"
			},
			XMR: {
				color: "#fcc118",
				symbol: "circle",
				name: "Monero"
			},
			USD: {
				color: "#fcc118",
				symbol: "circle",
				name: "USD"
			},
			CNY: {
				color: "#fcc118",
				symbol: "circle",
				name: "CNY"
			},
			DASH: {
				color: "#fcc118",
				symbol: "circle",
				name: "Dash"
			},
			BTS: {
				color: "#fcc118",
				symbol: "circle",
				name: "BitShares"
			},
			NEO: {
				color: "#fcc118",
				symbol: "circle",
				name: "NEO"
			},
			QTUM: {
				color: "#fcc118",
				symbol: "circle",
				name: "Qtum"
			},
			OMG: {
				color: "#fcc118",
				symbol: "circle",
				name: "OmiseGo"
			},
			STRAT: {
				color: "#fcc118",
				symbol: "circle",
				name: "Stratis"
			},
			WAVES: {
				color: "#fcc118",
				symbol: "circle",
				name: "Waves"
			},
			EOS: {
				color: "#fcc118",
				symbol: "circle",
				name: "EOS"
			},
			USDT: {
				color: "#fcc118",
				symbol: "circle",
				name: "Tether"
			},
			SNT: {
				color: "#fcc118",
				symbol: "circle",
				name: "Status"
			},
			BCH: {
				color: "#fcc118",
				symbol: "circle",
				name: "Bitcoin Cash"
			}
		}
	};
	jQuery(document).ready(function() {
		function f() {
			q = null !== jQuery.browser.device && jQuery.browser.device ? jQuery(window).height() - 40 : jQuery(window).height() - 300,
				jQuery("#xbtindex-chart").css("height", q)
		}

		function l() {
			jQuery("#chart-rawdata").css("display", "none");
			var d, f, g, h, i = [],
				k = new Date;
			k.setHours(0, 0, 0, 0);
			var l = new Date(k.getFullYear(), k.getMonth(), k.getDate(), 0, 0, 0);
			void 0 !== p && p.destroy();
			var m = z.chartType;
			switch (m) {
				case "close":
					d = CD.API_HOST + "/charts/data?data=close",
						f = 2,
						g = l.getTime(),
						h = 36e5,
						i = "ETH" === window.bpiIndex || "CNY" === window.bpiIndex || "USD" === window.bpiIndex ? [{
							type: "hour",
							count: 1,
							text: "1h"
						}, {
							type: "hour",
							count: 12,
							text: "12h"
						}, {
							type: "day",
							count: 1,
							text: "1d"
						}, {
							type: "day",
							count: 7,
							text: "1w"
						}, {
							type: "month",
							count: 1,
							text: "1m"
						}, {
							type: "month",
							count: 3,
							text: "3m"
						}, {
							type: "year",
							count: 1,
							text: "1y"
						}, {
							type: "all",
							text: "All"
						}] : [{
							type: "hour",
							count: 1,
							text: "1h"
						}, {
							type: "hour",
							count: 12,
							text: "12h"
						}, {
							type: "day",
							count: 1,
							text: "1d"
						}, {
							type: "day",
							count: 7,
							text: "1w"
						}],
						s = new Date(Math.round(z.dateStart)),
						t = new Date(Math.round(z.dateEnd));
					break;
				case "olhc":
				case "ohlc":
					d = CD.API_HOST + "?data=ohlc",
						f = 2,
						g = l.getTime(),
						h = 216e5,
						i = "ETH" === window.bpiIndex || "CNY" === window.bpiIndex || "USD" === window.bpiIndex ? [{
							type: "hour",
							count: 6,
							text: "6h"
						}, {
							type: "hour",
							count: 12,
							text: "12h"
						}, {
							type: "day",
							count: 1,
							text: "1d"
						}, {
							type: "day",
							count: 7,
							text: "1w"
						}, {
							type: "month",
							count: 1,
							text: "1m"
						}, {
							type: "month",
							count: 3,
							text: "3m"
						}, {
							type: "year",
							count: 1,
							text: "1y"
						}, {
							type: "all",
							text: "All"
						}] : [{
							type: "hour",
							count: 6,
							text: "6h"
						}, {
							type: "hour",
							count: 12,
							text: "12h"
						}, {
							type: "day",
							count: 1,
							text: "1d"
						}, {
							type: "day",
							count: 7,
							text: "1w"
						}];
					break;
				default:
					alert("No chartType selection")
			}
			z.exchanges = e();
			var o, q;
			if (z.dateStart && z.dateEnd)
				s = new Date(Math.round(z.dateStart)),
				t = new Date(Math.round(z.dateEnd)),
				a(s, t),
				b(s, t),
				c(s, t),
				o = CD.Helpers.dateToYMD(s),
				q = CD.Helpers.dateToYMD(t);
			else {
				var r = new Date;
				r.setDate(r.getDate() - 1),
					a(r, k),
					b(r, k),
					c(r, k),
					o = CD.Helpers.dateToYMD(r),
					q = CD.Helpers.dateToYMD(k)
			}
			return CD.Api.getChartData({
					jsonp: "callback",
					dataType: "jsonp",
					cache: !0,
					chartType: m,
					callback: "?",
					startDate: o,
					endDate: q,
					exchanges: z.exchanges.join(","),
					dev: 1,
					index: window.bpiIndex
				}, function(a, b) {
					n(b, m, d, f, i, g, h)
				}),
				setTimeout(j, w),
				j(), !1
		}

		function n(a, c, d, e, f, g, k, l, m) {
			var n, q = new Date,
				r = q.getTime();
			n = !0,
				h(a),
				q.setHours(0, 0, 0, 0);
			var x = CD.ChartConfigs.getBPIChartConfig(window.exchangeData, e, n, f, window.currSymbol, z),
				y = {
					xAxis: {
						events: {
							setExtremes: function() {
								p.showLoading("Loading data from server...")
							},
							afterSetExtremes: function() {
								if (u && !v) {
									v = !0;
									var a = new Date;
									l = this.min + 6e4 * a.getTimezoneOffset(),
										m = this.max + 6e4 * a.getTimezoneOffset(),
										b(l, m),
										s = new Date(Math.round(l)),
										t = new Date(Math.round(m)),
										CD.Api.getChartData({
											dataType: "jsonp",
											jsonp: "callback",
											chartType: c,
											cache: !0,
											startDate: CD.Helpers.dateToYMD(s),
											endDate: CD.Helpers.dateToYMD(t),
											exchanges: z.exchanges.join(","),
											dev: 1,
											index: window.bpiIndex
										}, function(a, b) {
											if (a && b)
												return o(b);
											setTimeout(function() {
												v = !1
											}, 2 * w)
										})
								}
							}
						}
					}
				},
				A = {
					exporting: {
						buttons: {
							downArrow: {
								menuItems: [{
									textKey: "printChart",
									onclick: function() {
										this.print();
									}
								}, {
									separator: !0
								}, {
									textKey: "downloadPNG",
									onclick: function() {
										this.exportChart(null, {
											chart: {
												events: {
													load: CD.ChartConfigs.addLogoToChart
												}
											}
										});
									}
								}, {
									textKey: "downloadJPEG",
									onclick: function() {
										this.exportChart({
											type: "image/jpeg",
											chart: {
												events: {
													load: CD.ChartConfigs.addLogoToChart
												}
											}
										});
									}
								}, {
									textKey: "downloadPDF",
									onclick: function() {
										this.exportChart({
											type: "application/pdf",
											chart: {
												events: {
													load: CD.ChartConfigs.addLogoToChart
												}
											}
										});
									}
								}, {
									textKey: "downloadSVG",
									onclick: function() {
										this.exportChart({
											type: "image/svg+xml",
											chart: {
												events: {
													load: CD.ChartConfigs.addLogoToChart
												}
											}
										});
									}
								}, {
									text: "Download CSV Chart Data",
									onclick: function() {
										var a = i(),
											b = CD.API_HOST + "/charts/data?output=csv&data=" + z.chartType + "&index=" + window.bpiIndex + "&startdate=" + a.start + "&enddate=" + a.end + "&exchanges=" + z.exchanges.join(",") + "&dev=1";
										window.location.href = b
									}
								}]
							}
						}
					}
				};
			if (jQuery.extend(!0, x, y, A),
				CD.isMobile) {
				w = 400;
				var B = x.rangeSelector.buttons;
				"1w" === B[3].text && B.splice(3, 1),
					"All" === B[6].text && B.splice(6, 1),
					B = {
						resetZoomButton: {
							theme: {
								display: "none"
							}
						}
					},
					x.chart = jQuery.extend(x.chart, B);
				var E, F, G = window.orientation;
				90 === G || -90 === G ? (E = 0,
					F = 5) : (E = 30,
					F = -40);
				var H = {
					inputPosition: {
						y: E,
						x: F
					}
				};
				x.rangeSelector = jQuery.extend(x.rangeSelector, H);
				var I = {
					enabled: !1
				};
				x.exporting = jQuery.extend(x.exporting, I),
					jQuery("#chart-share-copy").hide(),
					jQuery("#price-historical-download").hide()
			}
			var J;
			"close" === c ? (J = {
						type: "line"
					},
					x.series[0] = jQuery.extend(x.series[0], J)) : "ohlc" === c && (J = {
						type: "candlestick"
					},
					x.series[0] = jQuery.extend(x.series[0], J)),
				p = new Highcharts.StockChart(x, function(a) {
					setTimeout(function() {
						jQuery("input.highcharts-range-selector", jQuery(a.container).parent()).datepicker(),
							C = jQuery(a.container).width(),
							D = jQuery(a.container).height()
					}, 0)
				}),
				l && (x.rangeSelector = 1,
					s = new Date(Math.round(z.dateStart)),
					t = new Date(Math.round(z.dateEnd)),
					p.xAxis[0].setExtremes(s, t),
					j()),
				u = !0
		}

		function x(a) {
			window.diff_rate = a.bpi.USD.rate_float / a.bpi[get_currency()].rate_float;
			var b = CD.Helpers.formatMoney;
			var dNumber = function(val) {
				if (typeof val != 'number')
					val = parseInt(val.replace(/,/g, ''));

				return Highcharts.numberFormat(CHF_rate(val), 2, '.', ',')
			};
			if (jQuery("#cdbpidata .latest .data").html(dNumber(a.bpi[window.bpiIndex].rate_float) + ' <span class="symbol">' + get_currency() + '</span>'),
				0 === a.dayopen)
				jQuery("#cdbpidata .todayopen .data").html("-"),
				jQuery("#cdbpidata .dailychange .data").html("-"),
				jQuery("#cdbpidata .latest .percent").html("");
			else {
				jQuery("#cdbpidata .todayopen .data").html(dNumber(a.dayopen) + ' ' + get_currency());
				var c;
				c = a.daychangepc > 0 ? "up" : "down",
					jQuery("#cdbpidata .dailychange .data").removeClass("data-up data-down").addClass("data-" + c).html(dNumber(a.daychange) + ' ' + get_currency()),
					jQuery("#cdbpidata .latest .percent").removeClass("data-up data-down").addClass("data-" + c).html(dNumber(a.daychangepc) + "%")
			}
			jQuery("#cdbpidata .todaylow .data").html(dNumber(a.dayrange.low) + ' ' + get_currency()),
				jQuery("#cdbpidata .todayhigh .data").html(dNumber(a.dayrange.high) + ' ' + get_currency()),
				jQuery("#cdbpidata .totalbtx .data").html(dNumber(a.totalbtx)),
				jQuery("#cdbpidata .marketcap .data").html(CD.Helpers.abbreviateNumber(Math.floor(a.marketcap_float / diff_rate)) + ' ' + get_currency()),
				jQuery("#cdbpidata .marketcap .data").attr("title", dNumber(a.marketcap) + ' ' + get_currency())
		}

		function y(a) {
			if (a || u && !v && E) {
				a && p.showLoading("Loading data from server..."),
					v = !0,
					z.exchanges = e();
				try {
					z.dateStart = p.xAxis[0].min,
						z.dateEnd = p.xAxis[0].max;
					var b, c;
					"number" == typeof z.dateStart ? (b = new Date(z.dateStart),
							c = new Date(z.dateEnd)) : (b = z.dateStart,
							c = z.dateEnd),
						CD.Api.getChartData({
							jsonp: !1,
							cache: !0,
							async: !1,
							startDate: CD.Helpers.dateToYMD(b),
							endDate: CD.Helpers.dateToYMD(c),
							chartType: z.chartType,
							exchanges: z.exchanges.join(","),
							dev: 1,
							index: window.bpiIndex
						}, function(a, b) {
							a && b || setTimeout(function() {
								v = !1
							}, 2 * w)
						})
				} catch (a) {}
				setTimeout(function() {
					v = !1
				}, w)
			}
		}

		function A(a) {
			if (!window.currSymbol || "Bitcoin" !== a.chartName)
				return !1;
			var b = CD.Helpers.formatMoney,
				c = b(a.bpi[window.bpiIndex].rate_float, 2, "");
			// document.title = window.currSymbol + c + " - BitCoinNews BPI"
		}

		function B() {
			console.log("updateBPIMetaData:", window.bpiIndex),
				CD.Api.getBPIMetaData({
					bpiIndex: window.bpiIndex,
					dataType: "jsonp",
					jsonp: "callback",
					cache: !0
				}, function(a, b) {
					if (null === r)
						r = b.bpi[bpiIndex].rate_float;
					else if (r === b.bpi[bpiIndex].rate_float)
						return;

					window.diff_rate = b.bpi.USD.rate_float / b.bpi.CHF.rate_float;

					x(b),
						"Bitcoin" == b.chartName && A(b),
						setTimeout(function() {
							y()
						}, 3e3)
				})
		}
		var C, D, E = !1;
		m(),
			jQuery("#checkbox3").change(function() {
				jQuery(this).is(":checked") ? (console.log("OHLC"),
						z.chartType = "ohlc") : (console.log("Closing Price"),
						z.chartType = "close"),
					k(),
					l(),
					l()
			}),
			jQuery("#create_report").click(function() {
				p.exportChart({
					type: "application/pdf",
					chart: {
						events: {
							load: CD.ChartConfigs.addLogoToChart
						}
					}
				})
			}),
			jQuery("#price-historical-download").click(function(a) {
				a.preventDefault();
				var b = p.xAxis[0].getExtremes(),
					c = new Date(b.max),
					d = z.chartType,
					e = CD.API_HOST + "/v1/bpi/historical/" + d + ".csv?start=2010-07-18&end=" + CD.Helpers.dateToYMD(c) + "&index=" + window.bpiIndex;
				window.location.href = e
			}),
			jQuery(window).on("orientationchange", function() {
				jQuery(window).resize(),
					f(),
					l()
			}),
			jQuery(window).resize(function() {
				clearTimeout(this.id),
					this.id = setTimeout(function() {
						p && p.setSize(C, D)
					}, 2 * w)
			});
		var F = 1;
		setInterval(function() {
			F++;
		}, 36e5);
		jQuery(".exchangeData .button").click(function(a) {
			a.preventDefault(),
				y(!0),
				j()
		});
		setInterval(function() {
			B()
		}, 3e4);
		if (setTimeout(function() {
				E = !0
			}, 3e4),
			CD.Helpers.detectPages("price-cny"))
			g("CNY");
		else if (CD.Helpers.detectPages("ethereum-price"))
			window.bpiIndex = "ETH",
			g(window.bpiIndex);
		else if (CD.Helpers.detectPages("price"))
			window.bpiIndex = "USD";
		else {
			if (g(window.bpiIndex), !z.bpiDates[window.bpiIndex] || !z.exchangeConf[window.bpiIndex])
				return console.log("Unchartable currency"),
					B(),
					jQuery(".below-price-chart-left").hide(),
					void jQuery("#xbtindex-chart").hide();
			jQuery(".below-price-chart-left").hide()
		}
		d(),
			B(),
			l(),
			j()
	})
},
MarketCenterTable = function() {
	function a() {
		var a = "market-center",
			b = encodeURIComponent(window.location.href),
			c = encodeURIComponent("Check out #CoinDeskMarketCenter - Cryptocurrency Price, Market Cap, Charts and more."),
			d = "CoinDesk";
		$('.share-btn-twitter[data-share-page="' + a + '"]').attr("href", "https://twitter.com/share?" + b + "&text=" + c + "&via=" + d),
			$('.share-btn-facebook[data-share-page="' + a + '"]').attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + b),
			$('.share-btn-google[data-share-page="' + a + '"]').attr("href", "https://plus.google.com/share?url=" + b),
			$('.share-btn-reddit[data-share-page="' + a + '"]').attr("href", "http://www.reddit.com/submit?url=" + b),
			$('.share-btn-tumblr[data-share-page="' + a + '"]').attr("href", "https://www.tumblr.com/share/link?url=" + b),
			$('.share-btn-linkedin[data-share-page="' + a + '"]').attr("href", "https://www.linkedin.com/shareArticle?mini=true&url=" + b),
			$('.share-btn-pinterest[data-share-page="' + a + '"]').attr("href", "https://www.pinterest.com/pin/create/button/?url=" + b),
			$('.share-btn-stumbleupon[data-share-page="' + a + '"]').attr("href", "http://www.stumbleupon.com/submit?url=" + b),
			$('.share-btn-delicious[data-share-page="' + a + '"]').attr("href", "https://delicious.com/save?v=5&noui&jump=close&url=" + b),
			$('.share-btn-email[data-share-page="' + a + '"]').attr("href", "mailto:?subject=" + c + " from " + d + "&body=" + b)
	}

	function b() {
		var a = CD.Api.exchangeRates.currencies;
		CD.Api.exchangeRates.getRates(function(b) {
			y = {};
			for (var d = "", e = 0; e < b.length; e++) {
				var f = b[e],
					g = {
						iso: "",
						currency: "",
						rate: "",
						symbol: ""
					};
				a: for (var h = 0; h < a.length; h++) {
					var i = a[h];
					if (f.code == i.iso) {
						g.iso = i.iso,
							g.symbol = i.symbol,
							g.currency = i.currency,
							g.rate_float = f.rate_float;
						break a
					}
				}
				y[g.iso] = {
						symbol: g.symbol,
						iso: g.iso,
						currency: g.currency,
						rate: g.rate_float
					},
					d += c(g)
			}
			s.html(d),
				l()
		})
	}

	function c(a) {
		var b = a.iso;
		return a.symbol && (b += " (" + a.symbol + ")"),
			"<option class='exchange-rate-currency' data-symbol='" + a.symbol + "' value='" + a.iso + "' data-iso='" + a.iso + "' data-currency='" + a.currency + "' data-rate='" + a.rate_float + "' class='active'>" + b + "</option>"
	}

	function d(a) {
		void 0 != a && null != a || (a = "all"),
			a = a.toString().toLowerCase();
		var b = $('.market-center-toolbar-asset-type-button[data-type="' + a + '"]');
		if (0 == b.length)
			return !1;
		if (b.hasClass("active"))
			return !1;
		var c = t.find(".active"),
			d = c.attr("data-type");
		c.removeClass("active"),
			t.removeClass(d),
			b.addClass("active");
		var f = b.attr("data-type"),
			g = b.attr("data-name");
		t.addClass(f),
			e(f, g, b.attr("data-sig"))
	}

	function e(a, b, c) {
		var d = $("#assets-table").dataTable(),
			e = d.fnGetNodes(),
			f = d.fnGetData();
		d.fnSort([
				[3, "desc"]
			]),
			z = 0;
		for (var g = 0; g < e.length; g++) {
			var h = $(e[g]),
				i = f[g],
				j = h.attr("data-type");
			0 != c && c ? c == j ? (h.show(),
				z += i.market_cap,
				void 0 == w[a] && (w[a] = []),
				w[a].push(i)) : h.hide() : (h.show(),
				h.find("td:first-of-type").html(i.rank),
				z += i.market_cap)
		}
		if (0 !== c) {
			var l = 1;
			d.find("tr").each(function() {
				var a = $(this);
				a.is(":visible") && void 0 !== a.attr("data-symbol") && (a.find("td:first-of-type").html(l),
					l++)
			})
		}
		w[a] = void 0,
			k(z, {
				asset_type: 0 == c ? "" : b,
				symbol: v.symbol,
				iso: v.iso
			})
	}

	function f(a) {
		void 0 != a && null != a || (a.currency = "");
		var b = "Error: Unable to compute conversion from currency: " + v.currency + " to currency: " + a.currency + ". Please refresh your page and try again.";
		if (!a.currency || !a.iso || void 0 == a.rate || null == a.rate)
			return alert(b);
		var c = y[v.iso] || void 0;
		if (void 0 == c || null == c)
			return alert(b);
		var d = c.rate;
		if (void 0 == d || null == d || isNaN(d))
			return alert(b);
		var e = y[a.iso] || void 0;
		if (void 0 == e || null == e)
			return alert(b);
		var f = e.rate;
		if (void 0 == f || null == f || isNaN(f))
			return alert(b);
		var g = d / f,
			h = $("#assets-table").dataTable(),
			i = h.fnGetNodes(),
			j = h.fnGetData();
		v = {
			symbol: a.symbol,
			iso: a.iso,
			currency: a.currency,
			rate: a.rate
		};
		for (var l = 0; l < i.length; l++) {
			var m = $(i[l]),
				n = (j[l],
					m.find("td:eq(3)")),
				o = CD.Helpers.toNumber(n.attr("data-float"));
			o /= g,
				n.attr("data-float", o),
				n.html(CD.Helpers.toLocaleString(o, v.symbol));
			var p = m.find("td:eq(4)"),
				q = CD.Helpers.toNumber(p.attr("data-float"));
			q /= g,
				p.attr("data-float", q),
				p.find("a").html(CD.Helpers.toLocaleString(q, v.symbol));
			var r = m.find("td:eq(5)"),
				s = CD.Helpers.toNumber(r.attr("data-float"));
			s /= g,
				r.attr("data-float", s),
				r.html(CD.Helpers.toLocaleString(s, v.symbol))
		}
		return $('#market-center-toolbar-fiat-switcher-select option[value="' + a.iso + '"]').attr("selected", "selected"),
			z /= g,
			k(z, {
				asset_type: A
			}),
			h.fnAdjustColumnSizing(),
			h.fnDraw(), !0
	}

	function g(a) {
		p.autocomplete({
			source: a,
			minLength: 1,
			autoFocus: !0,
			delay: 0,
			select: function(a, b) {
				i(D(b.item.value))
			}
		}).autocomplete("instance")._renderItem = function(a, b) {
			var c = '<a class="market-center-asset-link" href="/market-center/' + D(b.value) + '/"><span class="mc-v1-1-sprite-16 ' + b.symbol + '"></span>' + b.value + "</a>";
			return $("<li>").append(c).appendTo(a)
		}
	}

	function h(a, b, c, d) {
		return CD.Helpers.toLocaleString(a, v.symbol)
	}

	function i(a) {
		if (!a)
			return !1;
		var b = window.location.href;
		b += a,
			window.location.href = b
	}

	function j(a) {
		o = $("#assets-table").DataTable({
			data: a,
			scrollX: !0,
			scrollCollapse: !0,
			columnDefs: [{
				width: "40px",
				targets: 0
			}, {
				width: "160px",
				targets: 1
			}, {
				width: "60px",
				targets: 2
			}, {
				targets: 3,
				createdCell: function(a, b, c, d, e) {
					var f = CD.Helpers.toNumber(b);
					$(a).attr("data-float", f)
				}
			}, {
				targets: 4,
				createdCell: function(a, b, c, d, e) {
					var f = CD.Helpers.toNumber(b);
					$(a).attr("data-float", f)
				}
			}, {
				width: "90px",
				targets: 5,
				createdCell: function(a, b, c, d, e) {
					var f = CD.Helpers.toNumber(b);
					$(a).attr("data-float", f)
				}
			}, {
				width: "92px",
				targets: 6
			}, {
				targets: 7
			}],
			createdRow: function(a, b, c) {
				$(a).attr("data-type", b.type).attr("data-symbol", b.symbol).attr("data-slug", D(b.asset))
			},
			info: !1,
			paging: !1,
			searching: !1,
			order: [
				[3, "desc"]
			],
			language: {
				emptyTable: "Error: Unable to load Market Center data. Please refresh the page."
			},
			initComplete: function(a, c) {
				b()
			},
			columns: [{
				data: "rank",
				render: E
			}, {
				data: "asset",
				render: F
			}, {
				data: "symbol",
				render: E
			}, {
				data: function(a, b, c, d) {
					return String(a.market_cap).replace(/,/g, "")
				},
				className: "dt-right",
				render: h
			}, {
				data: "price",
				className: "dt-right",
				render: B
			}, {
				data: "volume",
				className: "dt-right",
				render: h
			}, {
				data: "change",
				className: "dt-right",
				render: C
			}, {
				data: function(a, b, c, d) {
					return String(a.current_supply).replace(/,/g, "")
				},
				className: "dt-right",
				render: $.fn.dataTable.render.number(",", ".", 0, "")
			}]
		})
	}

	function k(a, b) {
		var c = "Total Market Cap";
		a = CD.Helpers.toLocaleString(a, v.symbol),
			void 0 !== b && (b.asset_type && "all" !== b.asset_type ? c += " (" + b.asset_type + "): " : c += ": ",
				c += a),
			q.html(c)
	}

	function l() {
		for (var a, b = [], c = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), e = 0; e < c.length; e++)
			a = c[e].split("="),
			b.push(a[0]),
			b[a[0]] = a[1];
		var g = b.currency;
		if (g) {
			g = g.toString().toUpperCase();
			var h = y[g];
			if (void 0 == h || void 0 == h.iso || void 0 == h.symbol || void 0 == h.currency || void 0 == h.rate)
			;
			else {
				f({
					symbol: h.symbol,
					iso: h.iso,
					currency: h.currency,
					rate: h.rate
				})
			}
		}
		var i = b.asset_type;
		i && d(i)
	}

	function m() {
		var a = $("#assets-table").dataTable();
		a.fnAdjustColumnSizing(),
			a.fnDraw(),
			n(window.innerWidth <= 1024)
	}

	function n(a) {
		if (a == G)
			return !1;
		G = a
	}
	var o = $("#assets-table"),
		p = $("#market-center-toolbar-search"),
		q = $("#market-center-footer-title"),
		r = $("#market-center-footer-bottom-left-date-label"),
		s = $("#market-center-toolbar-fiat-switcher-select"),
		t = $(".market-center-toolbar-asset-type-button-block"),
		u = $(".market-center-toolbar-asset-type-button"),
		v = {
			symbol: "$",
			iso: "USD",
			currency: "United States Dollar",
			rate: -1
		},
		w = {},
		x = [],
		y = {},
		z = -1,
		A = "all";
	a(),
		s.on("change", function() {
			var a = $(this).find("option:selected"),
				b = a.attr("data-iso"),
				c = a.attr("data-rate"),
				d = a.attr("data-currency");
			f({
				symbol: a.attr("data-symbol"),
				iso: b,
				currency: d,
				rate: c
			})
		}),
		u.on("click", function() {
			var a = $(this);
			if (a.hasClass("active"))
				return !1;
			d(a.attr("data-type"))
		});
	var B = function(a, b, c, d) {
			a || (a = "");
			var e, f = a.toString(),
				g = f.indexOf(".") + 3;
			e = 2 === g ? f + ".00" : f.substring(0, g);
			for (var h = 0, i = 0; i < f.length && ("0" !== f.charAt(i) && "." !== f.charAt(i) && h++,
					i >= g && (e += f.charAt(i)),
					2 !== h && (1 !== h || "0" !== f.charAt(i))); i++)
			;
			return g = e.indexOf("."),
				e.length - g == 2 && (e += "0"),
				e.length - g == 1 && (e += "0"),
				'<a class="market-center-normal-link" href="/market-center/' + D(c.asset) + '/">' + CD.Helpers.toLocaleString(e, v.symbol) + "</a>"
		},
		C = function(a, b, c, d) {
			return '<span style="color: ' + (a >= 0 ? "#5cbb26" : "#c95e22") + '">' + a + "%</span>"
		},
		D = function(a) {
			return a ? a.toLowerCase().replace(" ", "-") : ""
		},
		E = function(a, b, c, d) {
			return "<span class='center-cell'>" + a + "</span>"
		},
		F = function(a, b, c, d) {
			var e = D(a),
				f = c.symbol || "";
			return f = f.toUpperCase(),
				'<a class="market-center-asset-link" href="/market-center/' + e + '/"><span class="mc-v1-1-sprite-16 ' + f + '"></span>' + a + "</a>"
		};
	$(document).on("click", "#assets-table tbody tr", function() {
			var a = $(this),
				b = a.attr("data-slug");
			if (void 0 == b || !b || null == b)
				return !1;
			i(b)
		}),
		CD.Api.getMarketCenterCurrencyTable(null, function(a, b) {
			x = b,
				z = 0;
			for (var c = moment.utc().format("MMMM Do YYYY, h:mm:ss A"), d = [], e = 0; e < x.length; e++) {
				var f = x[e],
					h = f.market_cap;
				h = CD.Helpers.toNumber(h),
					x[e].market_cap = h,
					z += parseFloat(h),
					d.push({
						value: f.asset,
						symbol: f.symbol
					})
			}
			k(z, {
					asset_type: A
				}),
				r.html("Last Updated: " + c + " UTC"),
				g(d),
				j(x)
		}),
		$(window).resize(m);
	var G = !1
},
PricingWidget = function() {
	function a(a) {
		return a ? (a = a.toString(),
			a.toLowerCase().replace(" ", "-")) : ""
	}

	function b(b) {
		if (!b)
			return "";
		var c = (b.changepc,
				a(b.chartName) || ""),
			d = b.bpi.USD,
			e = CD.Helpers.toLocaleString(d.rate_float, d.symbol) || "• • •",
			f = b.bpi.EUR,
			g = CD.Helpers.toLocaleString(f.rate_float, f.symbol) || "• • •",
			h = b.bpi.GBP,
			j = CD.Helpers.toLocaleString(h.rate_float, h.symbol) || "• • •",
			k = b.bpi.CNY,
			l = (CD.Helpers.toLocaleString(k.rate_float, k.symbol),
				b.chartName || "• • •"),
			m = (b.changepc,
				b.iso || "• • •");
			
		return "<div class='sidebar-price-widget-currency-block " + (-1 !== i.indexOf(m) ? " open " : "") + "' data-coin='" + m + "'><div class='sidebar-price-widget-currency-block-upper' data-coin='" + m + "'><span class='sidebar-price-widget-cbu-title'>" + l + "</span><span class='sidebar-price-widget-cbu-time'>(24h)</span><span class='sidebar-price-widget-cbu-price'>" + Highcharts.numberFormat(b.bpi[get_currency()].rate_float, 2, '.', ',') + " " + get_currency() + "</span></div><div class='sidebar-price-widget-currency-block-dropdown ease' data-coin='" + m + "'><span class='sidebar-price-widget-cbd-price'>" + Highcharts.numberFormat(b.bpi[get_currency()].rate_float, 2, '.', ',') + " " + get_currency() + "</span><span class='sidebar-price-widget-cbd-fiat-block' data-fiat='usd'><span>USD:</span><span>" + e + "</span></span><span class='sidebar-price-widget-cbd-fiat-block' data-fiat='eur'><span>EUR:</span><span>" + g + "</span></span><span class='sidebar-price-widget-cbd-fiat-block' data-fiat='gbp'><span>GBP:</span><span>" + j + "</span></span><div class='sidebar-price-widget-cbd-chart' data-coin='" + m.toLowerCase() + "'></div><a class='sidebar-price-widget-cbd-button' href='" + bitcoin_charturl + "'></a></div></div>"
	}

	function c(a) {
		if (!a)
			return !1;
		var b = a.iso || "";
		b = b.toLowerCase();
		var c = jQuery('.sidebar-price-widget-cbd-chart[data-coin="' + b + '"]')[0],
			d = CD.ChartConfigs.getSidebarPricingWidgetChartConfig({
				data: a.d,
				currency: b,
				chartElement: c
			}),
			e = new Highcharts.Chart(d);
		return g.push(e), !0
	}
	var d = this;
	d.coins = [];
	var e = jQuery("#sidebar-price-widget"),
		f = -1,
		g = {},
		h = [],
		i = [];
	jQuery(document).off("click", ".sidebar-price-widget-currency-block-upper");
	jQuery(document).on("click", ".sidebar-price-widget-currency-block-upper", function() {
			var a = jQuery(this),
				b = a.parent(".sidebar-price-widget-currency-block");
			b.toggleClass("open");
			var c = b.hasClass("open"),
				d = b.attr("data-coin"); -
			1 == i.indexOf(d) && c ? i.push(d) : -1 === i.indexOf(d) || c || i.splice(i.indexOf(d), 1)
		}),
		jQuery(window).on("resize", function() {
			for (var a = 0; a < g.length; a++)
				g[a].redraw()
		}),
		d.load = function(a) {
			if (void 0 == a || !a)
				return !1;
			async.race([function(b) {
				CD.Api.getSparklineAndDisplayData({
					currencies: a
				}, function(a, c) {
					b(!a, c)
				})
			}], function(a, f) {
				if (a || !f)
					d.setPriceWidgetStatus("error");
				else {
					h = f;
					var i = "";
					for (var j in h) {
						var k = h[j].header_data;
						if( typeof k.bpi[get_currency()] == 'undefined' )
							k.bpi[get_currency()] = {
								rate_float: k.bpi.USD.rate_float / d.diff_rate,
								symbol: get_currency()
							};
						k.iso = j,
							i += b(k)
					}
					e.html(i),
						g = [];
					for (var j in h) {
						var k = h[j].graph_data;
						k.iso = j,
							c(k)
					}
					d.setPriceWidgetStatus("none")
				}
			})
		},
		d.init = function(a) {
			if (void 0 == a || !a)
				return !1;
			
			// Clear previous Interval
			if( -1 != f ) {
				clearInterval(f);
				f = -1;
			}
			
			d.coins = a, -1 == f && (f = setInterval(function() {
					d.load(d.coins);
				}, 6e4)),
				d.load(d.coins);		},
		d.setPriceWidgetStatus = function(a) {
			if (!a || void 0 == a)
				return !1;
			a = a.toString().toLowerCase(),
				"loading" == a ? e.removeClass("error").addClass("loading") : "error" == a ? e.removeClass("loading").addClass("error") : "none" == a && e.removeClass("loading").removeClass("error")
		}
};