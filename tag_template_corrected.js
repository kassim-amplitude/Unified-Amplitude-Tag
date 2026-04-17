//~~tv:1236.20250926
//~~tc: Enhanced functionality to allow for set/unset logic directly on the page view event, dynamic UTM parameter mapping, wildcard matching for UTM parameter keys, and improved handling of race conditions.
//~~tc: Updated defaultTracking with autocapture
//~~tc: Created new tag Amplitude Browser SDK
//~~tc: Added Web Experiment plugin integration (polling + registration before init)

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

    // Promise polyfill (provides fallback for older browsers; no-op when native Promise exists)
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
    u.pending = [];

    u.enqueue = function(fn, dataSnapshot) {
      if (typeof fn === "function") {
        u.pending.push({ fn: fn, data: dataSnapshot });
      }
    };

    u.drain = function() {
      var q = u.pending.splice(0, u.pending.length);
      for (var i = 0; i < q.length; i++) {
        try {
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
      if (typeof val === "boolean") return val;
      val = String(val || "").toLowerCase();
      return val === "true" || val === "on";
    };

    u.setDefaultValue = function (val) {
      if (val === "") {
        return true;
      }
      return u.toBoolean(val);
    };

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

    // Script loader with onerror handling — resolves on load, rejects/resolves on error
    // to prevent Promise.all from hanging if a CDN request fails.
    u.loadScript = function (src, id) {
      return new Promise(function (resolve) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.charset = "utf-8";
        script.src = src;
        if (id) script.id = id;
        script.addEventListener("load", function () { resolve(true); });
        script.addEventListener("error", function () {
          utag.DB("utag ##UTID##: failed to load " + src);
          resolve(false); // resolve (not reject) so Promise.all continues
        });
        var head = document.getElementsByTagName("head")[0];
        if (head) head.appendChild(script);
      });
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
    };

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
    };

    // SDK Loader Callback: loads plugin scripts and waits for external dependencies,
    // then calls u.loaderCallback() which registers plugins and calls amplitude.init().
    // Sequencing: SR script + G&S script + webExperiment poll → register all → init
    u.sdkLoaderCallback = function () {
      // Orange uses EU data residency — always use cdn.eu.amplitude.com for script assets.
      var cdnBase = "https://cdn.eu.amplitude.com";
      var sessionReplayUrl = cdnBase + "/libs/plugin-session-replay-browser-##session_replay_version##-min.js.gz".replace("##session_replay_version##", u.data.session_replay_version);

      // Capture config values now to avoid stale u.data reads when loaderCallback runs later
      var initConfig = {
        api_key: u.data.api_key,
        customer_id: u.data.customer_id,
        userId: u.data.userId,
        data: JSON.parse(JSON.stringify(u.data))
      };

      Promise.all([
        // --- Plugin 1: Session Replay (loaded with onerror handling) ---
        u.toBoolean(u.data.session_replay) &&
          u.loadScript(sessionReplayUrl, "utag_session_replay_##UTID##"),

        // --- Plugin 2: Guides & Surveys / Engagement (loaded with onerror handling) ---
        u.toBoolean(u.data.guides_and_surveys) &&
          u.loadScript(cdnBase + "/script/" + u.data.api_key + ".engagement.js", "utag_guides_and_surveys_##UTID##"),

        // --- Plugin 3: Web Experiment (loaded by external synchronous Tag 1) ---
        // Poll for window.webExperiment which is set by the separate experiment.js tag.
        // This MUST resolve before amplitude.init() to support Page Triggers ("On Event Tracked").
        u.toBoolean(u.data.web_experiment) && new Promise(function (resolve) {
          if (window.webExperiment && typeof window.webExperiment.plugin === "function") {
            utag.DB("utag ##UTID##: webExperiment already available");
            resolve();
            return;
          }
          var start = Date.now();
          var timeout = 3000; // 3 seconds max wait
          (function poll() {
            if (window.webExperiment && typeof window.webExperiment.plugin === "function") {
              utag.DB("utag ##UTID##: webExperiment available after " + (Date.now() - start) + "ms");
              resolve();
            } else if (Date.now() - start > timeout) {
              utag.DB("utag ##UTID##: webExperiment not available after " + timeout + "ms, proceeding without");
              resolve(); // Don't block init — proceed without web experiment
            } else {
              setTimeout(poll, 50);
            }
          })();
        })
      ].filter(Boolean)).then(function () {
        u.loaderCallback(initConfig);
      });
    };

    // Start Loader Callback — registers all plugins, then calls amplitude.init()
    // Accepts initConfig snapshot captured at sdkLoaderCallback time to avoid stale u.data reads.
    u.loaderCallback = function (initConfig) {
      utag.DB('send:##UTID##:CALLBACK');
      u.initialized = true;

      // Use the captured config snapshot to avoid stale u.data if multiple events fired
      var d = (initConfig && initConfig.data) ? initConfig.data : u.data;

      var amplConfig = {
        flushIntervalMillis: d.flushIntervalMillis,
        flushQueueSize: d.flushQueueSize,
        flushMaxRetries: d.flushMaxRetries,
        logLevel: d.logLevel,
        serverUrl: d.serverUrl,
        serverZone: d.serverZone,
        useBatch: u.toBoolean(d.useBatch),
        autocapture: {
          attribution: u.setDefaultValue(d.attribution),
          pageViews: u.setDefaultValue(d.pageViews),
          sessions: u.setDefaultValue(d.sessions),
          fileDownload: u.setDefaultValue(d.fileDownloads),
          formInteractions: u.setDefaultValue(d.formInteractions),
          elementInteractions: u.setDefaultValue(d.elementInteractions)
        },
        deviceId: d.deviceId,
        sessionId: d.sessionId ? Number(d.sessionId) : undefined,
        cookieOptions: u.clearEmptyKeys({
            domain: d.domain,
            expiration: d.expiration,
            sameSite: d.sameSite,
            secure: d.secure,
            upgrade: u.setDefaultValue(d.upgrade),
        }),
        identityStorage: d.identityStorage,
        trackingOptions: {
          ipAddress: u.setDefaultValue(d.ipAddress),
          language: u.setDefaultValue(d.language),
          platform: u.setDefaultValue(d.platform),
        },
        transport: d.transport
      };

      if (!u.toBoolean(d.autocapture)) {
        amplConfig.autocapture = false;
      }

      var customerId = d.customer_id;
      if (customerId === "" && d.userId) {
        customerId = d.userId;
      }

      // --- Plugin Registration (ALL plugins BEFORE amplitude.init) ---
      // This ordering is critical: Page Triggers ("On Event Tracked") in Web Experiment
      // require the webExperiment plugin to be registered before autocaptured page views fire.

      // 1. Session Replay plugin
      if (u.toBoolean(d.session_replay) && window.sessionReplay && typeof window.sessionReplay.plugin === "function") {
        amplitude.add(window.sessionReplay.plugin());
        utag.DB("utag ##UTID##: Session Replay plugin registered");
      }

      // 2. Guides & Surveys (Engagement) plugin
      if (u.toBoolean(d.guides_and_surveys) && window.engagement && typeof window.engagement.plugin === "function") {
        amplitude.add(window.engagement.plugin());
        utag.DB("utag ##UTID##: Guides & Surveys plugin registered");
      }

      // 3. Web Experiment plugin (loaded by external synchronous tag)
      if (u.toBoolean(d.web_experiment) && window.webExperiment && typeof window.webExperiment.plugin === "function") {
        amplitude.add(window.webExperiment.plugin());
        utag.DB("utag ##UTID##: Web Experiment plugin registered");
      } else if (u.toBoolean(d.web_experiment)) {
        utag.DB("utag ##UTID##: Web Experiment plugin NOT available at init time — Page Triggers may not fire for autocaptured events");
      }

      // --- Initialize Amplitude (autocaptured page views fire after this) ---
      var initResult = amplitude.init(d.api_key, customerId, u.clearEmptyKeys(amplConfig));
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

    // Start Event Callback
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

      // Revenue
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
    // End Event Callback


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
        // NOTE: base_url is hardcoded to the zoning-enabled build. The sdk_version config
        // variable and the ##utag_sdk_version## replace below are unused with this URL.
        // To use a dynamic version, change this to include the placeholder, e.g.:
        // "https://cdn.amplitude.com/libs/analytics-browser-##utag_sdk_version##-min.js.gz"
        base_url: "https://cdn.amplitude.com/libs/analytics-browser-2.34.1-feat-zoning-alpha.0-min.js.gz",
        api_key: "##UTVARconfig_api_key##",
        sdk_version: "##UTVARconfig_sdk_version##",
        autocapture: true,
        elementInteractions: "",
        deviceId: "",
        sessionId: "",
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
        // Session Replay
        session_replay: "##UTVARconfig_session_replay##",
        session_replay_version: "##UTVARconfig_session_replay_version##",
        // Guides & Surveys
        guides_and_surveys: "##UTVARconfig_guides_and_surveys##",
        // Web Experiment (set to "true" when using the external synchronous experiment tag)
        web_experiment: "##UTVARconfig_web_experiment##",
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
            var pvId = new amplitude.Identify();
            if (hasSet) {
              Object.keys(pageSet).forEach(function (pageKey) {
                pvId.set(pageKey, pageSet[pageKey]);
              });
            }
            if (hasUnset) {
              Object.keys(pageUnset).forEach(function (pageKey) {
                pvId.unset(pageKey);
              });
            }
            amplitude.identify(pvId);
          };
        }
      }

      // Snapshot u.data for this event to prevent race conditions where
      // rapid successive events overwrite each other's u.data
      var snapshot = JSON.parse(JSON.stringify(u.data));

      if (u.amplitudeReady) {
        u.data = snapshot;
        if (pvIdentify) { pvIdentify(); }
        runWork();
      } else {
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
