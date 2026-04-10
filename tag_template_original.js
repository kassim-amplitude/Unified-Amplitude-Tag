//~~tv:1236.20250926
//~~tc: Enhanced functionality to allow for set/unset logic directly on the page view event, dynamic UTM parameter mapping, wildcard matching for UTM parameter keys, and improved handling of race conditions.
//~~tc: Updated defaultTracking with autocapture
//~~tc: Created new tag Amplitude Browser SDK

var amplitude = amplitude || { _q: [], _iq: {} };

//tealium universal tag - utag.sender.1236 ut4.0.##UTVERSION##, Copyright ##UTYEAR## Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {id: id};
    utag.o[loader].sender[id] = u;
    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; }
    // Start Tealium loader 4.41
    /* utag.js version 4.26 or above is required to avoid errors with this loader function */
    var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
    if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) { u.loader = function(o, a, b, c, l, m) { utag.DB(o); a = document; if (o.type == "iframe") { m = a.getElementById(o.id); if (m && m.tagName == "IFRAME") { b = m; } else { b = a.createElement("iframe"); } o.attrs = o.attrs || {}; utag.ut.merge(o.attrs, { "height": "1", "width": "1", "style": "display:none" }, 0); } else if (o.type == "img") { utag.DB("Attach img: " + o.src); b = new Image(); } else { b = a.createElement("script"); b.language = "javascript"; b.type = "text/javascript"; b.async = 1; b.charset = "utf-8"; } if (o.id) { b.id = o.id; } for (l in utag.loader.GV(o.attrs)) { b.setAttribute(l, o.attrs[l]); } b.setAttribute("src", o.src); if (typeof o.cb == "function") { if (b.addEventListener) { b.addEventListener("load", function() { o.cb(); }, false); } else { b.onreadystatechange = function() { if (this.readyState == "complete" || this.readyState == "loaded") { this.onreadystatechange = null; o.cb(); } }; } } if (o.type != "img" && !m) { l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l == "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } } } }; } else { u.loader = utag.ut.loader; }
    // End Tealium loader
    // Start Tealium typeOf 4.35
    if (utag.ut.typeOf === undefined) { u.typeOf = function(e) {return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};} else { u.typeOf = utag.ut.typeOf; }
    // End Tealium typeOf

    // Promise polyfill
    !function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t():"function"==typeof define&&define.amd?define(t):t()}(0,function(){"use strict";function e(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})}function t(e){return new this(function(t,n){function r(e,n){if(n&&("object"==typeof n||"function"==typeof n)){var f=n.then;if("function"==typeof f)return void f.call(n,function(t){r(e,t)},function(n){o[e]={status:"rejected",reason:n},0==--i&&t(o)})}o[e]={status:"fulfilled",value:n},0==--i&&t(o)}if(!e||"undefined"==typeof e.length)return n(new TypeError(typeof e+" "+e+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var o=Array.prototype.slice.call(e);if(0===o.length)return t([]);for(var i=o.length,f=0;o.length>f;f++)r(f,o[f])})}function n(e,t){this.name="AggregateError",this.errors=e,this.message=t||""}function r(e){var t=this;return new t(function(r,o){if(!e||"undefined"==typeof e.length)return o(new TypeError("Promise.any accepts an array"));var i=Array.prototype.slice.call(e);if(0===i.length)return o();for(var f=[],u=0;i.length>u;u++)try{t.resolve(i[u]).then(r)["catch"](function(e){f.push(e),f.length===i.length&&o(new n(f,"All promises were rejected"))})}catch(c){o(c)}})}function o(e){return!(!e||"undefined"==typeof e.length)}function i(){}function f(e){if(!(this instanceof f))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],s(e,this)}function u(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,f._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var r;try{r=n(e._value)}catch(o){return void a(t.promise,o)}c(t.promise,r)}else(1===e._state?c:a)(t.promise,e._value)})):e._deferreds.push(t)}function c(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof f)return e._state=3,e._value=t,void l(e);if("function"==typeof n)return void s(function(e,t){return function(){e.apply(t,arguments)}}(n,t),e)}e._state=1,e._value=t,l(e)}catch(r){a(e,r)}}function a(e,t){e._state=2,e._value=t,l(e)}function l(e){2===e._state&&0===e._deferreds.length&&f._immediateFn(function(){e._handled||f._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;n>t;t++)u(e,e._deferreds[t]);e._deferreds=null}function s(e,t){var n=!1;try{e(function(e){n||(n=!0,c(t,e))},function(e){n||(n=!0,a(t,e))})}catch(r){if(n)return;n=!0,a(t,r)}}n.prototype=Error.prototype;var d=setTimeout;f.prototype["catch"]=function(e){return this.then(null,e)},f.prototype.then=function(e,t){var n=new this.constructor(i);return u(this,new function(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}(e,t,n)),n},f.prototype["finally"]=e,f.all=function(e){return new f(function(t,n){function r(e,o){try{if(o&&("object"==typeof o||"function"==typeof o)){var u=o.then;if("function"==typeof u)return void u.call(o,function(t){r(e,t)},n)}i[e]=o,0==--f&&t(i)}catch(c){n(c)}}if(!o(e))return n(new TypeError("Promise.all accepts an array"));var i=Array.prototype.slice.call(e);if(0===i.length)return t([]);for(var f=i.length,u=0;i.length>u;u++)r(u,i[u])})},f.any=r,f.allSettled=t,f.resolve=function(e){return e&&"object"==typeof e&&e.constructor===f?e:new f(function(t){t(e)})},f.reject=function(e){return new f(function(t,n){n(e)})},f.race=function(e){return new f(function(t,n){if(!o(e))return n(new TypeError("Promise.race accepts an array"));for(var r=0,i=e.length;i>r;r++)f.resolve(e[r]).then(t,n)})},f._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){d(e,0)},f._unhandledRejectionFn=function(e){void 0!==console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var p=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw Error("unable to locate global object")}();"function"!=typeof p.Promise?p.Promise=f:(p.Promise.prototype["finally"]||(p.Promise.prototype["finally"]=e),p.Promise.allSettled||(p.Promise.allSettled=t),p.Promise.any||(p.Promise.any=r))});

    u.ev = {
      view: 1,
      link: 1
    };
    u.initialized = false;
    u.scriptrequested = false;
    u.last_event = null;
    u.last_data_layer = null;

    u.amplitudeReady = false;
    u.pending = [];c

// Enqueue a function *and* a snapshot of u.data
u.enqueue = function(fn, dataSnapshot) {
  if (typeof fn === "function") {
    u.pending.push({ fn: fn, data: dataSnapshot });
  }
};

u.drain = function() {
  var q = u.pending.splice(0, u.pending.length);
  for (var i = 0; i < q.length; i++) {
    try {
      // restore the correct data for this event
      u.data = q[i].data;
      q[i].fn();
    } catch (e) {
      if (window.utag && utag.DB) utag.DB(e);
    }
  }
};

    u.isSDKReady = function () {
      try {
        return !!(window.amplitude && typeof amplitude.getDeviceId === "function" && amplitude.getDeviceId());
      } catch(_){ return false; }
    };


    u.ACTIONS = {
      ADD: "add",
      APPEND: "append",
      PREPEND: "prepend",
      SET: "set",
      SET_ONCE: "setOnce",
      UNSET: "unset"
    };

    u.toBoolean = function (val) {
      val = val || "";
      return val === true || val.toLowerCase() === "true" || val.toLowerCase() === "on";
    };

    u.setDefaultValue = function (val) {
      if (val === "") {
        return true;
      }
      return u.toBoolean(val);
    }

    u.mapFunc = function(arr, obj, item) {
      var i = arr.shift();
      obj[i] = obj[i] || {};
      if (arr.length > 0) {
        u.mapFunc(arr,obj[i], item);
      } else {
        obj[i] = item;
      }
    };

    u.clearEmptyKeys = function (object) {
      for (var key in object) {
        if (object[key] === "" || object[key] === undefined) {
          delete object[key];
        }
      }
      return object;
    };

    u.getFirstNonEmpty = function () {
      var candidates = Array.prototype.slice.call(arguments);

      var normalized = candidates.map(function (candidate) {
        return (typeof candidate === "string") ? candidate.trim() : candidate;
      });

      var first = normalized.find(function (candidateValue) {
        return candidateValue !== undefined && candidateValue !== null && candidateValue !== "";
      });

      return (first !== undefined) ? first : "";
    };

    ##UTGEN##

    u.identify = function (action, obj) {
      Object.keys(obj || {}).forEach(function(key) {
        var identifyEvent;

        switch (action) {
          case u.ACTIONS.ADD:
            identifyEvent = new amplitude.Identify().add(key, obj[key]);
            break;
          case u.ACTIONS.APPEND:
            identifyEvent = new amplitude.Identify().append(key, obj[key]);
            break;
          case u.ACTIONS.PREPEND:
            identifyEvent = new amplitude.Identify().prepend(key, obj[key]);
            break;
          case u.ACTIONS.SET:
            identifyEvent = new amplitude.Identify().set(key, obj[key]);
            break;
          case u.ACTIONS.SET_ONCE:
            identifyEvent = new amplitude.Identify().setOnce(key, obj[key]);
            break;
          case u.ACTIONS.UNSET:
            identifyEvent = new amplitude.Identify().unset(key);
            break;
        }
        if (identifyEvent) {
          amplitude.identify(identifyEvent);
        }
      });
    }

    u.collectUtmKeysSetFromObjectKeys = function (obj) {
      var utmKeysSetLocal = {};
      Object.keys(obj).forEach(function (rawKey) {
        var normalizedKey = String(rawKey || "").toLowerCase();

        if (normalizedKey.indexOf("qp.utm_") === 0) {
          utmKeysSetLocal[normalizedKey.slice(3)] = true;
        } else if (normalizedKey.indexOf("utm_") === 0) {
          utmKeysSetLocal[normalizedKey] = true;
        }
      });
      return utmKeysSetLocal;
    }

    u.sdkLoaderCallback = function () {
      var sessionReplayUrl =  "https://cdn.amplitude.com/libs/plugin-session-replay-browser-##session_replay_version##-min.js.gz".replace("##session_replay_version##", u.data.session_replay_version);

      Promise.all([
        u.toBoolean(u.data.session_replay) && new Promise(function (resolve) {
          u.loader({
            type: "script",
            src: sessionReplayUrl,
            cb: resolve,
            loc: "script",
            id: "utag_session_replay_##UTID##"
          });
        }),
        u.toBoolean(u.data.guides_and_surveys) && new Promise(function (resolve) {
          u.loader({
            type: "script",
            src: "https://cdn.amplitude.com/script/" + u.data.api_key + ".engagement.js",
            cb: resolve,
            loc: "script",
            id: "utag_guides_and_surveys_##UTID##"
          });
        })
      ].filter(Boolean)).then(function () {
        u.loaderCallback();
      })
    }

    // Start Loader Callback
    u.loaderCallback = function () {
      utag.DB('send:##UTID##:CALLBACK');
      u.initialized = true;

      var amplConfig = {
        flushIntervalMillis: u.data.flushIntervalMillis,
        flushQueueSize: u.data.flushQueueSize,
        flushMaxRetries: u.data.flushMaxRetries,
        logLevel: u.data.logLevel,
        serverUrl: u.data.serverUrl,
        serverZone: u.data.serverZone,
        useBatch: u.toBoolean(u.data.useBatch),
        autocapture: {
          attribution: u.setDefaultValue(u.data.attribution),
          pageViews: u.setDefaultValue(u.data.pageViews),
          sessions: u.setDefaultValue(u.data.sessions),
          fileDownload: u.setDefaultValue(u.data.fileDownloads),
          formInteractions: u.setDefaultValue(u.data.formInteractions),
          elementInteractions: u.setDefaultValue(u.data.elementInteractions)
        },
        deviceId: u.data.deviceId,
        cookieOptions: u.clearEmptyKeys({
            domain: u.data.domain,
            expiration: u.data.expiration,
            sameSite: u.data.sameSite,
            secure: u.data.secure,
            upgrade: u.setDefaultValue(u.data.upgrade),
        }),
        identityStorage: u.data.identityStorage,
        trackingOptions: {
          ipAddress: u.setDefaultValue(u.data.ipAddress),
          language: u.setDefaultValue(u.data.language),
          platform: u.setDefaultValue(u.data.platform),
        },
        transport: u.data.transport
      };

      if (!u.toBoolean(u.data.autocapture)) {
        amplConfig.autocapture = false;
      }

      if (u.data.customer_id === "" && u.data.userId) {
        u.data.customer_id = u.data.userId
      }

      // Initialize Amplitude Session Replay if session_replay_enabled is true
      if (u.toBoolean(u.data.session_replay)) {
        var sessionReplayTracking = window.sessionReplay.plugin();
        amplitude.add(sessionReplayTracking);
      }

      //Initialize Amplitude Guides and Surveys if guides_and_surveys_enabled is true
      if (u.toBoolean(u.data.guides_and_surveys)) {
        var guidesAndSurveys = window.engagement.plugin();
        amplitude.add(guidesAndSurveys);
      }


      var initResult = amplitude.init(u.data.api_key, u.data.customer_id, u.clearEmptyKeys(amplConfig));
      if (initResult && initResult.promise && typeof initResult.promise.then === "function") {
        initResult.promise.then(function () {
          u.amplitudeReady = true;
          u.drain();
        });
      } else {
        var start = Date.now();
        (function waitReady(){
          if (u.isSDKReady() || Date.now() - start > 5000) {
            u.amplitudeReady = true;
            u.drain();
          } else {
            setTimeout(waitReady, 50);
          }
        })();
      }
    };
    // End Loader Callback

    // Start Loader Callback
    u.callback = function () {
      utag.DB("send:##UTID##:CALLBACK");

      amplitude.setOptOut(u.toBoolean(u.data.optOut));

      // user properties
      if (u.data.set) {
        var identify_par = new amplitude.Identify();
        Object.keys(u.data.set).forEach(function(key) {
          identify_par.set(key, u.data.set[key]);
        });
        amplitude.identify(identify_par);
      }

      u.identify(u.ACTIONS.ADD, u.data.add);
      u.identify(u.ACTIONS.APPEND, u.data.append);
      u.identify(u.ACTIONS.PREPEND, u.data.prepend);
      u.identify(u.ACTIONS.SET_ONCE, u.data.setOnce);
      u.identify(u.ACTIONS.UNSET, u.data.unset);

      if (u.data.event_type) {
        amplitude.track({
          event_type: u.data.event_type,
          event_properties: u.data.eventProperties,
          groups: u.data.group
        });
      }

      if(u.data.group){
        Object.keys(u.data.group).forEach(function(key) {
          amplitude.setGroup(key, u.data.group[key]);
        });
      }

      // Revenue. Support revenue with and without order id
      if (u.data.order_id) {
        var revenueProperties = {
          order_id: u.data.order_id
        };

        u.data.product_id.forEach(function(productId, index) {
          if (u.data.product_quantity[index] && u.data.product_unit_price[index]) {
            var revenue = new amplitude
                .Revenue()
                .setProductId(productId)
                .setPrice(parseFloat(u.data.product_unit_price[index]))
                .setQuantity(parseInt(u.data.product_quantity[index]))
                .setRevenueType(u.data.order_type)
                .setEventProperties(revenueProperties);
            amplitude.revenue(revenue);
          }
        });
      }
      utag.DB("send:##UTID##:CALLBACK:COMPLETE");
    };
    // End Loader Callback


    u.send = function (utag_event, data_layer) {
      if (!u.ev[utag_event] && u.ev.all === undefined) {
        utag.DB('send:##UTID##:EVENT NOT SUPPORTED:COMPLETE');
        return;
      }

      var a, b, c, d, e, f, g, h;
      a = utag_event;
      b = data_layer;

      u.last_event = a;
      u.last_data_layer = b;

      u.data = {
        base_url: "https://cdn.amplitude.com/libs/analytics-browser-2.34.1-feat-zoning-alpha.0-min.js.gz",
        api_key: "##UTVARconfig_api_key##",
        sdk_version: "##UTVARconfig_sdk_version##",
        autocapture: true,
        elementInteractions: "",
        deviceId: "",
        flushIntervalMillis: "",
        flushQueueSize: "",
        flushMaxRetries: "",
        identityStorage: "",
        logLevel: "",
        optOut: false,
        serverUrl: "",
        serverZone: "",
        transport: "",
        useBatch: false,
        userId: "",
        // User Properties
        add: {},
        append: {},
        prepend: {},
        set: {},
        setOnce: {},
        unset: {},
        page_set: {},
        page_unset: {},
        // User Groups
        group: {},
        // E-Commerce Vars
        customer_id: "",
        product_id: [],
        product_quantity: [],
        product_unit_price: [],
        event: "",
        custom: {},
        eventProperties: {},
        // Default Tracking
        attribution: "",
        pageViews: "",
        sessions: "",
        formInteractions: "",
        fileDownloads: "",
        // Tracking Options
        ipAddress: "",
        language: "",
        platform: "",
        // session replay
        session_replay: "##UTVARconfig_session_replay##",
        session_replay_version: "##UTVARconfig_session_replay_version##",
        guides_and_surveys: "##UTVARconfig_guides_and_surveys##",
        // Cookie Options
        domain: "",
        expiration: "",
        sameSite: "",
        secure: false,
        upgrade: "",
        // UTM
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_term: "",
        utm_content: ""
      };

      // Start tag-scoped extensions
      ##UTEXTEND##
      utag.DB("send:##UTID##:EXTENSIONS");
      utag.DB(data_layer);
      // End tag-scoped extensions



      // Start Mapping
      Object.keys(utag.loader.GV(u.map)).forEach(function(mapping_key) {
        if (data_layer[mapping_key] !== undefined && data_layer[mapping_key] !== '') {
          var destinations = u.map[mapping_key].split(',');
          destinations.forEach(function(parameter) {
            u.mapFunc(parameter.split('.'), u.data, data_layer[mapping_key]);
          });
        }
      });
      utag.DB('send:##UTID##:MAPPINGS');
      utag.DB(u.data);
      // End Mapping

      // Pull E-Commerce extension values
      // Mappings override E-Commerce extension values

      var eCommerceMapping = [
        { eCommerceData: data_layer._corder, name: 'order_id', isArray: false },
        { eCommerceData: data_layer._ctype, name: 'order_type', isArray: false },
        { eCommerceData: data_layer._ccustid, name: 'customer_id', isArray: false },
        { eCommerceData: data_layer._cprod, name: 'product_id', isArray: true },
        { eCommerceData: data_layer._cprice, name: 'product_unit_price', isArray: true },
        { eCommerceData: data_layer._cquan, name: 'product_quantity', isArray: true }
      ];

      eCommerceMapping.forEach(function(dataObject){
        if (!dataObject.isArray) {
          u.data[dataObject.name] = u.data[dataObject.name] || dataObject.eCommerceData || '';
        } else if (
            u.data[dataObject.name].length  === 0 &&
            dataObject.eCommerceData !== undefined &&
            dataObject.isArray
        ) {
          u.data[dataObject.name] = dataObject.eCommerceData.slice(0);
        }
      });

      var utmKeysSet = u.collectUtmKeysSetFromObjectKeys(b);

      Object.keys(utmKeysSet).forEach(function (utmKey) {
        if (!u.data[utmKey]) {
          var candidate = u.getFirstNonEmpty(
              b[utmKey],
              b["qp." + utmKey]
          );
          if (candidate) u.data[utmKey] = candidate;
        }

        if (u.data[utmKey] && u.data.eventProperties[utmKey] == null) {
          u.data.eventProperties[utmKey] = u.data[utmKey];
        }
      });

      // Report required config is missing, and stop tag from firing.
      if (!u.data.api_key) {
        utag.DB(u.id + ": Tag not fired: Required attribute not populated");
        return;
      }

      if(u.data.sdk_version === ""){
        u.data.sdk_version = "2.6.0";
      }

      if (!u.data.session_replay_version) {
        u.data.session_replay_version = "1.13.9";
      }

      var runWork = function(){ u.callback(); };

      var pvIdentify = null;
      if (a === "view") {
        var pageSet = u.data.page_set || {};
        var pageUnset = u.data.page_unset || {};
        var hasSet = pageSet && Object.keys(pageSet).length > 0;
        var hasUnset = pageUnset && Object.keys(pageUnset).length > 0;
        if (hasSet || hasUnset) {
          pvIdentify = function () {
            var pvIdentify = new amplitude.Identify();
            if (hasSet) {
              Object.keys(pageSet).forEach(function (pageKey) {
                pvIdentify.set(pageKey, pageSet[pageKey]);
              });
            }
            if (hasUnset) {
              Object.keys(pageUnset).forEach(function (pageKey) {
                pvIdentify.unset(pageKey);
              });
            }
            amplitude.identify(pvIdentify);
          };
        }
      }

// Snapshot u.data for this event
var snapshot = JSON.parse(JSON.stringify(u.data));

if (u.amplitudeReady) {
  // Use the snapshot immediately
  u.data = snapshot;
  if (pvIdentify) { pvIdentify(); }
  runWork();
} else {
  // Queue both pvIdentify and runWork with this snapshot
  if (pvIdentify) { u.enqueue(pvIdentify, snapshot); }
  u.enqueue(runWork, snapshot);
        if (!u.scriptrequested) {
          u.scriptrequested = true;
          /* eslint-disable */
          (function() {
            "use strict";
            (function(e, t) {
              var n = e.amplitude || { q: [], iq: {} };
              if (n.invoked) {
                e.console && console.error && console.error("Amplitude snippet has been loaded.");
              } else {
                var r = function(e, t) {
                  e.prototype[t] = function() {
                    return this.q.push({
                      name: t,
                      args: Array.prototype.slice.call(arguments, 0)
                    }), this;
                  }
                };
                var s = function(e, t, n) {
                  return function(r) {
                    e.q.push({
                      name: t,
                      args: Array.prototype.slice.call(n, 0),
                      resolve: r
                    });
                  }
                };
                var o = function(e, t, n) {
                  e[t] = function() {
                    if (n) {
                      return {
                        promise: new Promise(s(e, t, Array.prototype.slice.call(arguments)))
                      };
                    }
                  }
                };
                var i = function(e) {
                  for (var t = 0; t < m.length; t++) o(e, m[t], false);
                  for (var n = 0; n < g.length; n++) o(e, g[n], true);
                };
                n.invoked = true;
                for (var c = function() {
                  return this.q = [], this;
                }, p = ["add", "append", "clearAll", "prepend", "set", "setOnce", "unset", "preInsert", "postInsert", "remove", "getUserProperties"], l = 0; l < p.length; l++) r(c, p[l]);
                n.Identify = c;
                for (var d = function() {
                  return this.q = [], this;
                }, f = ["getEventProperties", "setProductId", "setQuantity", "setPrice", "setRevenue", "setRevenueType", "setEventProperties"], v = 0; v < f.length; v++) r(d, f[v]);
                n.Revenue = d;
                var m = ["getDeviceId", "setDeviceId", "getSessionId", "setSessionId", "getUserId", "setUserId", "setOptOut", "setTransport", "reset", "extendSession"],
                    g = ["init", "add", "remove", "track", "logEvent", "identify", "groupIdentify", "setGroup", "revenue", "flush"];
                i(n);
                n.createInstance = function(e) {
                  return n.iq[e] = { q: [] }, i(n.iq[e]), n.iq[e];
                };
                e.amplitude = n;
              }
            })(window, document);
          })();
          /* eslint-enable */

          u.loader({
            type: "script",
            src: u.data.base_url.replace("##utag_sdk_version##", u.data.sdk_version),
            cb: u.sdkLoaderCallback,
            loc: "script",
            id: "utag_##UTID##",
            attrs: {}
          });
        }
      }

      utag.DB("send:##UTID##:COMPLETE");
    };
    utag.o[loader].loader.LOAD(id);
  }("##UTID##", "##UTLOADERID##"));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag