define(["exports","./bbbbc-segment-tracker.js"],function(_exports,_bbbbcSegmentTracker){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.usageStatistics=_exports.runIfDevelopmentMode=_exports.ThemePropertyMixin=_exports.ThemableMixin=_exports.Templatizer=_exports.StylingMixin=_exports.SortMixin=_exports.SelectionMixin=_exports.ScrollerElement=_exports.ScrollMixin=_exports.RowDetailsMixin=_exports.PolymerIronList=_exports.PaperButtonBehaviorImpl=_exports.PaperButtonBehavior=_exports.Lumo=_exports.KeyboardNavigationMixin=_exports.ItemCache=_exports.GridElement=_exports.GridColumnElement=_exports.FilterMixin=_exports.EventContextMixin=_exports.ElementMixin=_exports.DynamicColumnsMixin=_exports.DragAndDropMixin=_exports.DataProviderMixin=_exports.ControlStateMixin=_exports.ColumnResizingMixin=_exports.ColumnReorderingMixin=_exports.ColumnBaseMixin=_exports.CheckboxElement=_exports.ArrayDataProviderMixin=_exports.ActiveItemMixin=_exports.A11yMixin=_exports.$version=_exports.$vaadinUsageStatistics=_exports.$vaadinThemePropertyMixin=_exports.$vaadinThemableMixin=_exports.$vaadinGridTemplatizer=_exports.$vaadinGridStylingMixin=_exports.$vaadinGridSortMixin=_exports.$vaadinGridSelectionMixin=_exports.$vaadinGridScroller=_exports.$vaadinGridScrollMixin=_exports.$vaadinGridRowDetailsMixin=_exports.$vaadinGridKeyboardNavigationMixin=_exports.$vaadinGridFilterMixin=_exports.$vaadinGridEventContextMixin=_exports.$vaadinGridDynamicColumnsMixin=_exports.$vaadinGridDragAndDropMixin=_exports.$vaadinGridDataProviderMixin=_exports.$vaadinGridColumnResizingMixin=_exports.$vaadinGridColumnReorderingMixin=_exports.$vaadinGridColumn=_exports.$vaadinGridArrayDataProviderMixin=_exports.$vaadinGridActiveItemMixin=_exports.$vaadinGridA11yMixin=_exports.$vaadinGrid=_exports.$vaadinElementMixin=_exports.$vaadinDevelopmentModeDetector=_exports.$vaadinControlStateMixin=_exports.$vaadinCheckbox=_exports.$paperButtonBehavior=_exports.$ironList=void 0;(0,_bbbbcSegmentTracker.Polymer)({is:"iron-request",hostAttributes:{hidden:!0},properties:{/**
     * A reference to the XMLHttpRequest instance used to generate the
     * network request.
     *
     * @type {XMLHttpRequest}
     */xhr:{type:Object,notify:!0,readOnly:!0,value:function(){return new XMLHttpRequest}},/**
     * A reference to the parsed response body, if the `xhr` has completely
     * resolved.
     *
     * @type {*}
     * @default null
     */response:{type:Object,notify:!0,readOnly:!0,value:function(){return null}},/**
     * A reference to the status code, if the `xhr` has completely resolved.
     */status:{type:Number,notify:!0,readOnly:!0,value:0},/**
     * A reference to the status text, if the `xhr` has completely resolved.
     */statusText:{type:String,notify:!0,readOnly:!0,value:""},/**
     * A promise that resolves when the `xhr` response comes back, or rejects
     * if there is an error before the `xhr` completes.
     * The resolve callback is called with the original request as an argument.
     * By default, the reject callback is called with an `Error` as an argument.
     * If `rejectWithRequest` is true, the reject callback is called with an
     * object with two keys: `request`, the original request, and `error`, the
     * error object.
     *
     * @type {Promise}
     */completes:{type:Object,readOnly:!0,notify:!0,value:function(){return new Promise(function(resolve,reject){this.resolveCompletes=resolve;this.rejectCompletes=reject}.bind(this))}},/**
     * An object that contains progress information emitted by the XHR if
     * available.
     *
     * @default {}
     */progress:{type:Object,notify:!0,readOnly:!0,value:function(){return{}}},/**
     * Aborted will be true if an abort of the request is attempted.
     */aborted:{type:Boolean,notify:!0,readOnly:!0,value:!1},/**
     * Errored will be true if the browser fired an error event from the
     * XHR object (mainly network errors).
     */errored:{type:Boolean,notify:!0,readOnly:!0,value:!1},/**
     * TimedOut will be true if the XHR threw a timeout event.
     */timedOut:{type:Boolean,notify:!0,readOnly:!0,value:!1}},/**
   * Succeeded is true if the request succeeded. The request succeeded if it
   * loaded without error, wasn't aborted, and the status code is ≥ 200, and
   * < 300, or if the status code is 0.
   *
   * The status code 0 is accepted as a success because some schemes - e.g.
   * file:// - don't provide status codes.
   *
   * @return {boolean}
   */get succeeded(){if(this.errored||this.aborted||this.timedOut){return!1}var status=this.xhr.status||0;// Note: if we are using the file:// protocol, the status code will be 0
// for all outcomes (successful or otherwise).
return 0===status||200<=status&&300>status},/**
   * Sends an HTTP request to the server and returns a promise (see the
   * `completes` property for details).
   *
   * The handling of the `body` parameter will vary based on the Content-Type
   * header. See the docs for iron-ajax's `body` property for details.
   *
   * @param {{
   *   url: string,
   *   method: (string|undefined),
   *   async: (boolean|undefined),
   *   body:
   * (ArrayBuffer|ArrayBufferView|Blob|Document|FormData|null|string|undefined|Object),
   *   headers: (Object|undefined),
   *   handleAs: (string|undefined),
   *   jsonPrefix: (string|undefined),
   *   withCredentials: (boolean|undefined),
   *   timeout: (number|undefined),
   *   rejectWithRequest: (boolean|undefined)}} options -
   *   - url The url to which the request is sent.
   *   - method The HTTP method to use, default is GET.
   *   - async By default, all requests are sent asynchronously. To send
   * synchronous requests, set to false.
   *   -  body The content for the request body for POST method.
   *   -  headers HTTP request headers.
   *   -  handleAs The response type. Default is 'text'.
   *   -  withCredentials Whether or not to send credentials on the request.
   * Default is false.
   *   -  timeout - Timeout for request, in milliseconds.
   *   -  rejectWithRequest Set to true to include the request object with
   * promise rejections.
   * @return {Promise}
   */send:function(options){var xhr=this.xhr;if(0<xhr.readyState){return null}xhr.addEventListener("progress",function(progress){this._setProgress({lengthComputable:progress.lengthComputable,loaded:progress.loaded,total:progress.total});// Webcomponents v1 spec does not fire *-changed events when not connected
this.fire("iron-request-progress-changed",{value:this.progress})}.bind(this));xhr.addEventListener("error",function(error){this._setErrored(!0);this._updateStatus();var response=options.rejectWithRequest?{error:error,request:this}:error;this.rejectCompletes(response)}.bind(this));xhr.addEventListener("timeout",function(error){this._setTimedOut(!0);this._updateStatus();var response=options.rejectWithRequest?{error:error,request:this}:error;this.rejectCompletes(response)}.bind(this));xhr.addEventListener("abort",function(){this._setAborted(!0);this._updateStatus();var error=new Error("Request aborted."),response=options.rejectWithRequest?{error:error,request:this}:error;this.rejectCompletes(response)}.bind(this));// Called after all of the above.
xhr.addEventListener("loadend",function(){this._updateStatus();this._setResponse(this.parseResponse());if(!this.succeeded){var error=new Error("The request failed with status code: "+this.xhr.status),response=options.rejectWithRequest?{error:error,request:this}:error;this.rejectCompletes(response);return}this.resolveCompletes(this)}.bind(this));this.url=options.url;var isXHRAsync=!1!==options.async;xhr.open(options.method||"GET",options.url,isXHRAsync);var acceptType={json:"application/json",text:"text/plain",html:"text/html",xml:"application/xml",arraybuffer:"application/octet-stream"}[options.handleAs],headers=options.headers||Object.create(null),newHeaders=Object.create(null);for(var key in headers){newHeaders[key.toLowerCase()]=headers[key]}headers=newHeaders;if(acceptType&&!headers.accept){headers.accept=acceptType}Object.keys(headers).forEach(function(requestHeader){if(/[A-Z]/.test(requestHeader)){_bbbbcSegmentTracker.Base._error("Headers must be lower case, got",requestHeader)}xhr.setRequestHeader(requestHeader,headers[requestHeader])},this);if(isXHRAsync){xhr.timeout=options.timeout;var handleAs=options.handleAs;// If a JSON prefix is present, the responseType must be 'text' or the
// browser won’t be able to parse the response.
if(!!options.jsonPrefix||!handleAs){handleAs="text"}// In IE, `xhr.responseType` is an empty string when the response
// returns. Hence, caching it as `xhr._responseType`.
xhr.responseType=xhr._responseType=handleAs;// Cache the JSON prefix, if it exists.
if(!!options.jsonPrefix){xhr._jsonPrefix=options.jsonPrefix}}xhr.withCredentials=!!options.withCredentials;var body=this._encodeBodyObject(options.body,headers["content-type"]);xhr.send(/**
                 @type {ArrayBuffer|ArrayBufferView|Blob|Document|FormData|
                         null|string|undefined}
               */body);return this.completes},/**
   * Attempts to parse the response body of the XHR. If parsing succeeds,
   * the value returned will be deserialized based on the `responseType`
   * set on the XHR.
   *
   * @return {*} The parsed response,
   * or undefined if there was an empty response or parsing failed.
   */parseResponse:function(){var xhr=this.xhr,responseType=xhr.responseType||xhr._responseType,preferResponseText=!this.xhr.responseType,prefixLen=xhr._jsonPrefix&&xhr._jsonPrefix.length||0;try{switch(responseType){case"json":// If the xhr object doesn't have a natural `xhr.responseType`,
// we can assume that the browser hasn't parsed the response for us,
// and so parsing is our responsibility. Likewise if response is
// undefined, as there's no way to encode undefined in JSON.
if(preferResponseText||xhr.response===void 0){// Try to emulate the JSON section of the response body section of
// the spec: https://xhr.spec.whatwg.org/#response-body
// That is to say, we try to parse as JSON, but if anything goes
// wrong return null.
try{return JSON.parse(xhr.responseText)}catch(_){console.warn("Failed to parse JSON sent from "+xhr.responseURL);return null}}return xhr.response;case"xml":return xhr.responseXML;case"blob":case"document":case"arraybuffer":return xhr.response;case"text":default:{// If `prefixLen` is set, it implies the response should be parsed
// as JSON once the prefix of length `prefixLen` is stripped from
// it. Emulate the behavior above where null is returned on failure
// to parse.
if(prefixLen){try{return JSON.parse(xhr.responseText.substring(prefixLen))}catch(_){console.warn("Failed to parse JSON sent from "+xhr.responseURL);return null}}return xhr.responseText}}}catch(e){this.rejectCompletes(new Error("Could not parse response. "+e.message))}},/**
   * Aborts the request.
   */abort:function(){this._setAborted(!0);this.xhr.abort()},/**
   * @param {*} body The given body of the request to try and encode.
   * @param {?string} contentType The given content type, to infer an encoding
   *     from.
   * @return {*} Either the encoded body as a string, if successful,
   *     or the unaltered body object if no encoding could be inferred.
   */_encodeBodyObject:function(body,contentType){if("string"==typeof body){return body;// Already encoded.
}var bodyObj=/** @type {Object} */body;switch(contentType){case"application/json":return JSON.stringify(bodyObj);case"application/x-www-form-urlencoded":return this._wwwFormUrlEncode(bodyObj);}return body},/**
   * @param {Object} object The object to encode as x-www-form-urlencoded.
   * @return {string} .
   */_wwwFormUrlEncode:function(object){if(!object){return""}var pieces=[];Object.keys(object).forEach(function(key){// TODO(rictic): handle array values here, in a consistent way with
//   iron-ajax params.
pieces.push(this._wwwFormUrlEncodePiece(key)+"="+this._wwwFormUrlEncodePiece(object[key]))},this);return pieces.join("&")},/**
   * @param {*} str A key or value to encode as x-www-form-urlencoded.
   * @return {string} .
   */_wwwFormUrlEncodePiece:function(str){// Spec says to normalize newlines to \r\n and replace %20 spaces with +.
// jQuery does this as well, so this is likely to be widely compatible.
if(null===str||str===void 0||!str.toString){return""}return encodeURIComponent(str.toString().replace(/\r?\n/g,"\r\n")).replace(/%20/g,"+")},/**
   * Updates the status code and status text.
   */_updateStatus:function(){this._setStatus(this.xhr.status);this._setStatusText(this.xhr.statusText===void 0?"":this.xhr.statusText)}});(0,_bbbbcSegmentTracker.Polymer)({is:"iron-ajax",/**
   * Fired before a request is sent.
   *
   * @event iron-ajax-presend
   */ /**
       * Fired when a request is sent.
       *
       * @event request
       */ /**
           * Fired when a request is sent.
           *
           * @event iron-ajax-request
           */ /**
               * Fired when a response is received.
               *
               * @event response
               */ /**
                   * Fired when a response is received.
                   *
                   * @event iron-ajax-response
                   */ /**
                       * Fired when an error is received.
                       *
                       * @event error
                       */ /**
                           * Fired when an error is received.
                           *
                           * @event iron-ajax-error
                           */hostAttributes:{hidden:!0},properties:{/**
     * The URL target of the request.
     */url:{type:String},/**
     * An object that contains query parameters to be appended to the
     * specified `url` when generating a request. If you wish to set the body
     * content when making a POST request, you should use the `body` property
     * instead.
     */params:{type:Object,value:function(){return{}}},/**
     * The HTTP method to use such as 'GET', 'POST', 'PUT', or 'DELETE'.
     * Default is 'GET'.
     */method:{type:String,value:"GET"},/**
     * HTTP request headers to send.
     *
     * Example:
     *
     *     <iron-ajax
     *         auto
     *         url="http://somesite.com"
     *         headers='{"X-Requested-With": "XMLHttpRequest"}'
     *         handle-as="json"></iron-ajax>
     *
     * Note: setting a `Content-Type` header here will override the value
     * specified by the `contentType` property of this element.
     */headers:{type:Object,value:function(){return{}}},/**
     * Content type to use when sending data. If the `contentType` property
     * is set and a `Content-Type` header is specified in the `headers`
     * property, the `headers` property value will take precedence.
     *
     * Varies the handling of the `body` param.
     */contentType:{type:String,value:null},/**
     * Body content to send with the request, typically used with "POST"
     * requests.
     *
     * If body is a string it will be sent unmodified.
     *
     * If Content-Type is set to a value listed below, then
     * the body will be encoded accordingly.
     *
     *    * `content-type="application/json"`
     *      * body is encoded like `{"foo":"bar baz","x":1}`
     *    * `content-type="application/x-www-form-urlencoded"`
     *      * body is encoded like `foo=bar+baz&x=1`
     *
     * Otherwise the body will be passed to the browser unmodified, and it
     * will handle any encoding (e.g. for FormData, Blob, ArrayBuffer).
     *
     * @type
     * (ArrayBuffer|ArrayBufferView|Blob|Document|FormData|null|string|undefined|Object)
     */body:{type:Object,value:null},/**
     * Toggle whether XHR is synchronous or asynchronous. Don't change this
     * to true unless You Know What You Are Doing™.
     */sync:{type:Boolean,value:!1},/**
     * Specifies what data to store in the `response` property, and
     * to deliver as `event.detail.response` in `response` events.
     *
     * One of:
     *
     *    `text`: uses `XHR.responseText`.
     *
     *    `xml`: uses `XHR.responseXML`.
     *
     *    `json`: uses `XHR.responseText` parsed as JSON.
     *
     *    `arraybuffer`: uses `XHR.response`.
     *
     *    `blob`: uses `XHR.response`.
     *
     *    `document`: uses `XHR.response`.
     */handleAs:{type:String,value:"json"},/**
     * Set the withCredentials flag on the request.
     */withCredentials:{type:Boolean,value:!1},/**
     * Set the timeout flag on the request.
     */timeout:{type:Number,value:0},/**
     * If true, automatically performs an Ajax request when either `url` or
     * `params` changes.
     */auto:{type:Boolean,value:!1},/**
     * If true, error messages will automatically be logged to the console.
     */verbose:{type:Boolean,value:!1},/**
     * The most recent request made by this iron-ajax element.
     *
     * @type {Object|undefined}
     */lastRequest:{type:Object,notify:!0,readOnly:!0},/**
     * The `progress` property of this element's `lastRequest`.
     *
     * @type {Object|undefined}
     */lastProgress:{type:Object,notify:!0,readOnly:!0},/**
     * True while lastRequest is in flight.
     */loading:{type:Boolean,notify:!0,readOnly:!0},/**
     * lastRequest's response.
     *
     * Note that lastResponse and lastError are set when lastRequest finishes,
     * so if loading is true, then lastResponse and lastError will correspond
     * to the result of the previous request.
     *
     * The type of the response is determined by the value of `handleAs` at
     * the time that the request was generated.
     *
     * @type {Object}
     */lastResponse:{type:Object,notify:!0,readOnly:!0},/**
     * lastRequest's error, if any.
     *
     * @type {Object}
     */lastError:{type:Object,notify:!0,readOnly:!0},/**
     * An Array of all in-flight requests originating from this iron-ajax
     * element.
     */activeRequests:{type:Array,notify:!0,readOnly:!0,value:function(){return[]}},/**
     * Length of time in milliseconds to debounce multiple automatically
     * generated requests.
     */debounceDuration:{type:Number,value:0,notify:!0},/**
     * Prefix to be stripped from a JSON response before parsing it.
     *
     * In order to prevent an attack using CSRF with Array responses
     * (http://haacked.com/archive/2008/11/20/anatomy-of-a-subtle-json-vulnerability.aspx/)
     * many backends will mitigate this by prefixing all JSON response bodies
     * with a string that would be nonsensical to a JavaScript parser.
     *
     */jsonPrefix:{type:String,value:""},/**
     * By default, iron-ajax's events do not bubble. Setting this attribute will
     * cause its request and response events as well as its iron-ajax-request,
     * -response,  and -error events to bubble to the window object. The vanilla
     * error event never bubbles when using shadow dom even if this.bubbles is
     * true because a scoped flag is not passed with it (first link) and because
     * the shadow dom spec did not used to allow certain events, including
     * events named error, to leak outside of shadow trees (second link).
     * https://www.w3.org/TR/shadow-dom/#scoped-flag
     * https://www.w3.org/TR/2015/WD-shadow-dom-20151215/#events-that-are-not-leaked-into-ancestor-trees
     */bubbles:{type:Boolean,value:!1},/**
     * Changes the [`completes`](iron-request#property-completes) promise chain
     * from `generateRequest` to reject with an object
     * containing the original request, as well an error message.
     * If false (default), the promise rejects with an error message only.
     */rejectWithRequest:{type:Boolean,value:!1},_boundHandleResponse:{type:Function,value:function(){return this._handleResponse.bind(this)}}},observers:["_requestOptionsChanged(url, method, params.*, headers, contentType, "+"body, sync, handleAs, jsonPrefix, withCredentials, timeout, auto)"],created:function(){this._boundOnProgressChanged=this._onProgressChanged.bind(this)},/**
   * The query string that should be appended to the `url`, serialized from
   * the current value of `params`.
   *
   * @return {string}
   */get queryString(){var queryParts=[],param,value;for(param in this.params){value=this.params[param];param=window.encodeURIComponent(param);if(Array.isArray(value)){for(var i=0;i<value.length;i++){queryParts.push(param+"="+window.encodeURIComponent(value[i]))}}else if(null!==value){queryParts.push(param+"="+window.encodeURIComponent(value))}else{queryParts.push(param)}}return queryParts.join("&")},/**
   * The `url` with query string (if `params` are specified), suitable for
   * providing to an `iron-request` instance.
   *
   * @return {string}
   */get requestUrl(){var queryString=this.queryString,url=this.url||"";if(queryString){var bindingChar=0<=url.indexOf("?")?"&":"?";return url+bindingChar+queryString}return url},/**
   * An object that maps header names to header values, first applying the
   * the value of `Content-Type` and then overlaying the headers specified
   * in the `headers` property.
   *
   * @return {Object}
   */get requestHeaders(){var headers={},contentType=this.contentType;if(null==contentType&&"string"===typeof this.body){contentType="application/x-www-form-urlencoded"}if(contentType){headers["content-type"]=contentType}var header;if("object"===typeof this.headers){for(header in this.headers){headers[header]=this.headers[header].toString()}}return headers},_onProgressChanged:function(event){this._setLastProgress(event.detail.value)},/**
   * Request options suitable for generating an `iron-request` instance based
   * on the current state of the `iron-ajax` instance's properties.
   *
   * @return {{
   *   url: string,
   *   method: (string|undefined),
   *   async: (boolean|undefined),
   *   body:
   * (ArrayBuffer|ArrayBufferView|Blob|Document|FormData|null|string|undefined|Object),
   *   headers: (Object|undefined),
   *   handleAs: (string|undefined),
   *   jsonPrefix: (string|undefined),
   *   withCredentials: (boolean|undefined)}}
   */toRequestOptions:function(){return{url:this.requestUrl||"",method:this.method,headers:this.requestHeaders,body:this.body,async:!this.sync,handleAs:this.handleAs,jsonPrefix:this.jsonPrefix,withCredentials:this.withCredentials,timeout:this.timeout,rejectWithRequest:this.rejectWithRequest}},/**
   * Performs an AJAX request to the specified URL.
   *
   * @return {!IronRequestElement}
   */generateRequest:function(){var request=/** @type {!IronRequestElement} */document.createElement("iron-request"),requestOptions=this.toRequestOptions();this.push("activeRequests",request);request.completes.then(this._boundHandleResponse).catch(this._handleError.bind(this,request)).then(this._discardRequest.bind(this,request));var evt=this.fire("iron-ajax-presend",{request:request,options:requestOptions},{bubbles:this.bubbles,cancelable:!0});if(evt.defaultPrevented){request.abort();request.rejectCompletes(request);return request}if(this.lastRequest){this.lastRequest.removeEventListener("iron-request-progress-changed",this._boundOnProgressChanged)}request.addEventListener("iron-request-progress-changed",this._boundOnProgressChanged);request.send(requestOptions);this._setLastProgress(null);this._setLastRequest(request);this._setLoading(!0);this.fire("request",{request:request,options:requestOptions},{bubbles:this.bubbles,composed:!0});this.fire("iron-ajax-request",{request:request,options:requestOptions},{bubbles:this.bubbles,composed:!0});return request},_handleResponse:function(request){if(request===this.lastRequest){this._setLastResponse(request.response);this._setLastError(null);this._setLoading(!1)}this.fire("response",request,{bubbles:this.bubbles,composed:!0});this.fire("iron-ajax-response",request,{bubbles:this.bubbles,composed:!0})},_handleError:function(request,error){if(this.verbose){_bbbbcSegmentTracker.Base._error(error)}if(request===this.lastRequest){this._setLastError({request:request,error:error,status:request.xhr.status,statusText:request.xhr.statusText,response:request.xhr.response});this._setLastResponse(null);this._setLoading(!1)}// Tests fail if this goes after the normal this.fire('error', ...)
this.fire("iron-ajax-error",{request:request,error:error},{bubbles:this.bubbles,composed:!0});this.fire("error",{request:request,error:error},{bubbles:this.bubbles,composed:!0})},_discardRequest:function(request){var requestIndex=this.activeRequests.indexOf(request);if(-1<requestIndex){this.splice("activeRequests",requestIndex,1)}},_requestOptionsChanged:function(){this.debounce("generate-request",function(){if(null==this.url){return}if(this.auto){this.generateRequest()}},this.debounceDuration)}});const template=_bbbbcSegmentTracker.html$1`<iron-iconset-svg name="icons" size="24">
<svg><defs>
<g id="3d-rotation"><path d="M7.52 21.48C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32zm.89-6.52c-.19 0-.37-.03-.52-.08-.16-.06-.29-.13-.4-.24-.11-.1-.2-.22-.26-.37-.06-.14-.09-.3-.09-.47h-1.3c0 .36.07.68.21.95.14.27.33.5.56.69.24.18.51.32.82.41.3.1.62.15.96.15.37 0 .72-.05 1.03-.15.32-.1.6-.25.83-.44s.42-.43.55-.72c.13-.29.2-.61.2-.97 0-.19-.02-.38-.07-.56-.05-.18-.12-.35-.23-.51-.1-.16-.24-.3-.4-.43-.17-.13-.37-.23-.61-.31.2-.09.37-.2.52-.33.15-.13.27-.27.37-.42.1-.15.17-.3.22-.46.05-.16.07-.32.07-.48 0-.36-.06-.68-.18-.96-.12-.28-.29-.51-.51-.69-.2-.19-.47-.33-.77-.43C9.1 8.05 8.76 8 8.39 8c-.36 0-.69.05-1 .16-.3.11-.57.26-.79.45-.21.19-.38.41-.51.67-.12.26-.18.54-.18.85h1.3c0-.17.03-.32.09-.45s.14-.25.25-.34c.11-.09.23-.17.38-.22.15-.05.3-.08.48-.08.4 0 .7.1.89.31.19.2.29.49.29.86 0 .18-.03.34-.08.49-.05.15-.14.27-.25.37-.11.1-.25.18-.41.24-.16.06-.36.09-.58.09H7.5v1.03h.77c.22 0 .42.02.6.07s.33.13.45.23c.12.11.22.24.29.4.07.16.1.35.1.57 0 .41-.12.72-.35.93-.23.23-.55.33-.95.33zm8.55-5.92c-.32-.33-.7-.59-1.14-.77-.43-.18-.92-.27-1.46-.27H12v8h2.3c.55 0 1.06-.09 1.51-.27.45-.18.84-.43 1.16-.76.32-.33.57-.73.74-1.19.17-.47.26-.99.26-1.57v-.4c0-.58-.09-1.1-.26-1.57-.18-.47-.43-.87-.75-1.2zm-.39 3.16c0 .42-.05.79-.14 1.13-.1.33-.24.62-.43.85-.19.23-.43.41-.71.53-.29.12-.62.18-.99.18h-.91V9.12h.97c.72 0 1.27.23 1.64.69.38.46.57 1.12.57 1.99v.4zM12 0l-.66.03 3.81 3.81 1.33-1.33c3.27 1.55 5.61 4.72 5.96 8.48h1.5C23.44 4.84 18.29 0 12 0z"></path></g>
<g id="accessibility"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"></path></g>
<g id="accessible"><circle cx="12" cy="4" r="2"></circle><path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"></path></g>
<g id="account-balance"><path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"></path></g>
<g id="account-balance-wallet"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
<g id="account-box"><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"></path></g>
<g id="account-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></g>
<g id="add"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g>
<g id="add-alert"><path d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72C7.37 5.03 5.12 7.75 5.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z"></path></g>
<g id="add-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>
<g id="add-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>
<g id="add-circle-outline"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="add-shopping-cart"><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"></path></g>
<g id="alarm"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>
<g id="alarm-add"><path d="M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z"></path></g>
<g id="alarm-off"><path d="M12 6c3.87 0 7 3.13 7 7 0 .84-.16 1.65-.43 2.4l1.52 1.52c.58-1.19.91-2.51.91-3.92 0-4.97-4.03-9-9-9-1.41 0-2.73.33-3.92.91L9.6 6.43C10.35 6.16 11.16 6 12 6zm10-.28l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM2.92 2.29L1.65 3.57 2.98 4.9l-1.11.93 1.42 1.42 1.11-.94.8.8C3.83 8.69 3 10.75 3 13c0 4.97 4.02 9 9 9 2.25 0 4.31-.83 5.89-2.2l2.2 2.2 1.27-1.27L3.89 3.27l-.97-.98zm13.55 16.1C15.26 19.39 13.7 20 12 20c-3.87 0-7-3.13-7-7 0-1.7.61-3.26 1.61-4.47l9.86 9.86zM8.02 3.28L6.6 1.86l-.86.71 1.42 1.42.86-.71z"></path></g>
<g id="alarm-on"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-1.46-5.47L8.41 12.4l-1.06 1.06 3.18 3.18 6-6-1.06-1.06-4.93 4.95z"></path></g>
<g id="all-out"><path d="M16.21 4.16l4 4v-4zm4 12l-4 4h4zm-12 4l-4-4v4zm-4-12l4-4h-4zm12.95-.95c-2.73-2.73-7.17-2.73-9.9 0s-2.73 7.17 0 9.9 7.17 2.73 9.9 0 2.73-7.16 0-9.9zm-1.1 8.8c-2.13 2.13-5.57 2.13-7.7 0s-2.13-5.57 0-7.7 5.57-2.13 7.7 0 2.13 5.57 0 7.7z"></path></g>
<g id="android"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"></path></g>
<g id="announcement"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"></path></g>
<g id="apps"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></g>
<g id="archive"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></g>
<g id="arrow-back"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g>
<g id="arrow-downward"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></g>
<g id="arrow-drop-down"><path d="M7 10l5 5 5-5z"></path></g>
<g id="arrow-drop-down-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 12l-4-4h8l-4 4z"></path></g>
<g id="arrow-drop-up"><path d="M7 14l5-5 5 5z"></path></g>
<g id="arrow-forward"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></g>
<g id="arrow-upward"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path></g>
<g id="aspect-ratio"><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>
<g id="assessment"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g>
<g id="assignment"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></g>
<g id="assignment-ind"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"></path></g>
<g id="assignment-late"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 15h-2v-2h2v2zm0-4h-2V8h2v6zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></g>
<g id="assignment-return"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 12h-4v3l-5-5 5-5v3h4v4z"></path></g>
<g id="assignment-returned"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 15l-5-5h3V9h4v4h3l-5 5z"></path></g>
<g id="assignment-turned-in"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>
<g id="attachment"><path d="M2 12.5C2 9.46 4.46 7 7.5 7H18c2.21 0 4 1.79 4 4s-1.79 4-4 4H9.5C8.12 15 7 13.88 7 12.5S8.12 10 9.5 10H17v2H9.41c-.55 0-.55 1 0 1H18c1.1 0 2-.9 2-2s-.9-2-2-2H7.5C5.57 9 4 10.57 4 12.5S5.57 16 7.5 16H17v2H7.5C4.46 18 2 15.54 2 12.5z"></path></g>
<g id="autorenew"><path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"></path></g>
<g id="backspace"><path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"></path></g>
<g id="backup"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>
<g id="block"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"></path></g>
<g id="book"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>
<g id="bookmark"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>
<g id="bookmark-border"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>
<g id="bug-report"><path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"></path></g>
<g id="build"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"></path></g>
<g id="cached"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"></path></g>
<g id="camera-enhance"><path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-1l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z"></path></g>
<g id="cancel"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g>
<g id="card-giftcard"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>
<g id="card-membership"><path d="M20 2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h4v5l4-2 4 2v-5h4c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zm0 13H4v-2h16v2zm0-5H4V4h16v6z"></path></g>
<g id="card-travel"><path d="M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4v-2h16v2zm0-5H4V8h3v2h2V8h6v2h2V8h3v6z"></path></g>
<g id="change-history"><path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"></path></g>
<g id="check"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></g>
<g id="check-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
<g id="check-box-outline-blank"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="check-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
<g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g>
<g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>
<g id="chrome-reader-mode"><path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"></path></g>
<g id="class"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>
<g id="clear"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
<g id="close"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
<g id="cloud"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"></path></g>
<g id="cloud-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14H8c-1.66 0-3-1.34-3-3s1.34-3 3-3l.14.01C8.58 8.28 10.13 7 12 7c2.21 0 4 1.79 4 4h.5c1.38 0 2.5 1.12 2.5 2.5S17.88 16 16.5 16z"></path></g>
<g id="cloud-done"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17 15.18 9l1.41 1.41L10 17z"></path></g>
<g id="cloud-download"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"></path></g>
<g id="cloud-off"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"></path></g>
<g id="cloud-queue"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"></path></g>
<g id="cloud-upload"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>
<g id="code"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></g>
<g id="compare-arrows"><path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"></path></g>
<g id="content-copy"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></g>
<g id="content-cut"><path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z"></path></g>
<g id="content-paste"><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"></path></g>
<g id="copyright"><path d="M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01-.66-.5-1.08-.66-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35.72.69 1.2.91 1.05.34 1.7.34c.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63.56-.58.74-.94.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="create"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>
<g id="create-new-folder"><path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"></path></g>
<g id="credit-card"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>
<g id="dashboard"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></g>
<g id="date-range"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path></g>
<g id="delete"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></g>
<g id="delete-forever"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></g>
<g id="delete-sweep"><path d="M15 16h4v2h-4zm0-8h7v2h-7zm0 4h6v2h-6zM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10zM14 5h-3l-1-1H6L5 5H2v2h12z"></path></g>
<g id="description"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path></g>
<g id="dns"><path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>
<g id="done"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></g>
<g id="done-all"><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path></g>
<g id="donut-large"><path d="M11 5.08V2c-5 .5-9 4.81-9 10s4 9.5 9 10v-3.08c-3-.48-6-3.4-6-6.92s3-6.44 6-6.92zM18.97 11H22c-.47-5-4-8.53-9-9v3.08C16 5.51 18.54 8 18.97 11zM13 18.92V22c5-.47 8.53-4 9-9h-3.03c-.43 3-2.97 5.49-5.97 5.92z"></path></g>
<g id="donut-small"><path d="M11 9.16V2c-5 .5-9 4.79-9 10s4 9.5 9 10v-7.16c-1-.41-2-1.52-2-2.84s1-2.43 2-2.84zM14.86 11H22c-.48-4.75-4-8.53-9-9v7.16c1 .3 1.52.98 1.86 1.84zM13 14.84V22c5-.47 8.52-4.25 9-9h-7.14c-.34.86-.86 1.54-1.86 1.84z"></path></g>
<g id="drafts"><path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z"></path></g>
<g id="eject"><path d="M5 17h14v2H5zm7-12L5.33 15h13.34z"></path></g>
<g id="error"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></g>
<g id="error-outline"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="euro-symbol"><path d="M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1 0 .34.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z"></path></g>
<g id="event"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path></g>
<g id="event-seat"><path d="M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z"></path></g>
<g id="exit-to-app"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>
<g id="expand-less"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></g>
<g id="expand-more"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></g>
<g id="explore"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"></path></g>
<g id="extension"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"></path></g>
<g id="face"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"></path></g>
<g id="favorite"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></g>
<g id="favorite-border"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path></g>
<g id="feedback"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"></path></g>
<g id="file-download"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>
<g id="file-upload"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"></path></g>
<g id="filter-list"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></g>
<g id="find-in-page"><path d="M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z"></path></g>
<g id="find-replace"><path d="M11 6c1.38 0 2.63.56 3.54 1.46L12 10h6V4l-2.05 2.05C14.68 4.78 12.93 4 11 4c-3.53 0-6.43 2.61-6.92 6H6.1c.46-2.28 2.48-4 4.9-4zm5.64 9.14c.66-.9 1.12-1.97 1.28-3.14H15.9c-.46 2.28-2.48 4-4.9 4-1.38 0-2.63-.56-3.54-1.46L10 12H4v6l2.05-2.05C7.32 17.22 9.07 18 11 18c1.55 0 2.98-.51 4.14-1.36L20 21.49 21.49 20l-4.85-4.86z"></path></g>
<g id="fingerprint"><path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"></path></g>
<g id="first-page"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path></g>
<g id="flag"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path></g>
<g id="flight-land"><path d="M2.5 19h19v2h-19zm7.18-5.73l4.35 1.16 5.31 1.42c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l1.6.43 5.31 1.43z"></path></g>
<g id="flight-takeoff"><path d="M2.5 19h19v2h-19zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 1.82 3.16.77 1.33 1.6-.43 5.31-1.42 4.35-1.16L21 11.49c.81-.23 1.28-1.05 1.07-1.85z"></path></g>
<g id="flip-to-back"><path d="M9 7H7v2h2V7zm0 4H7v2h2v-2zm0-8c-1.11 0-2 .9-2 2h2V3zm4 12h-2v2h2v-2zm6-12v2h2c0-1.1-.9-2-2-2zm-6 0h-2v2h2V3zM9 17v-2H7c0 1.1.89 2 2 2zm10-4h2v-2h-2v2zm0-4h2V7h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zM5 7H3v12c0 1.1.89 2 2 2h12v-2H5V7zm10-2h2V3h-2v2zm0 12h2v-2h-2v2z"></path></g>
<g id="flip-to-front"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3c0 1.1.89 2 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9c-1.11 0-2 .9-2 2v10c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z"></path></g>
<g id="folder"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></g>
<g id="folder-open"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"></path></g>
<g id="folder-shared"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z"></path></g>
<g id="font-download"><path d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"></path></g>
<g id="forward"><path d="M12 8V4l8 8-8 8v-4H4V8z"></path></g>
<g id="fullscreen"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path></g>
<g id="fullscreen-exit"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path></g>
<g id="g-translate"><path d="M20 5h-9.12L10 2H4c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h7l1 3h8c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zM7.17 14.59c-2.25 0-4.09-1.83-4.09-4.09s1.83-4.09 4.09-4.09c1.04 0 1.99.37 2.74 1.07l.07.06-1.23 1.18-.06-.05c-.29-.27-.78-.59-1.52-.59-1.31 0-2.38 1.09-2.38 2.42s1.07 2.42 2.38 2.42c1.37 0 1.96-.87 2.12-1.46H7.08V9.91h3.95l.01.07c.04.21.05.4.05.61 0 2.35-1.61 4-3.92 4zm6.03-1.71c.33.6.74 1.18 1.19 1.7l-.54.53-.65-2.23zm.77-.76h-.99l-.31-1.04h3.99s-.34 1.31-1.56 2.74c-.52-.62-.89-1.23-1.13-1.7zM21 20c0 .55-.45 1-1 1h-7l2-2-.81-2.77.92-.92L17.79 18l.73-.73-2.71-2.68c.9-1.03 1.6-2.25 1.92-3.51H19v-1.04h-3.64V9h-1.04v1.04h-1.96L11.18 6H20c.55 0 1 .45 1 1v13z"></path></g>
<g id="gavel"><path d="M1 21h12v2H1zM5.245 8.07l2.83-2.827 14.14 14.142-2.828 2.828zM12.317 1l5.657 5.656-2.83 2.83-5.654-5.66zM3.825 9.485l5.657 5.657-2.828 2.828-5.657-5.657z"></path></g>
<g id="gesture"><path d="M4.59 6.89c.7-.71 1.4-1.35 1.71-1.22.5.2 0 1.03-.3 1.52-.25.42-2.86 3.89-2.86 6.31 0 1.28.48 2.34 1.34 2.98.75.56 1.74.73 2.64.46 1.07-.31 1.95-1.4 3.06-2.77 1.21-1.49 2.83-3.44 4.08-3.44 1.63 0 1.65 1.01 1.76 1.79-3.78.64-5.38 3.67-5.38 5.37 0 1.7 1.44 3.09 3.21 3.09 1.63 0 4.29-1.33 4.69-6.1H21v-2.5h-2.47c-.15-1.65-1.09-4.2-4.03-4.2-2.25 0-4.18 1.91-4.94 2.84-.58.73-2.06 2.48-2.29 2.72-.25.3-.68.84-1.11.84-.45 0-.72-.83-.36-1.92.35-1.09 1.4-2.86 1.85-3.52.78-1.14 1.3-1.92 1.3-3.28C8.95 3.69 7.31 3 6.44 3 5.12 3 3.97 4 3.72 4.25c-.36.36-.66.66-.88.93l1.75 1.71zm9.29 11.66c-.31 0-.74-.26-.74-.72 0-.6.73-2.2 2.87-2.76-.3 2.69-1.43 3.48-2.13 3.48z"></path></g>
<g id="get-app"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>
<g id="gif"><path d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zm10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"></path></g>
<g id="grade"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>
<g id="group-work"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9.5 8c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8zm6.5 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>
<g id="help"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path></g>
<g id="help-outline"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path></g>
<g id="highlight-off"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="history"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>
<g id="home"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></g>
<g id="hourglass-empty"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"></path></g>
<g id="hourglass-full"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"></path></g>
<g id="http"><path d="M4.5 11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5v2zm2.5-.5h1.5V15H10v-4.5h1.5V9H7v1.5zm5.5 0H14V15h1.5v-4.5H17V9h-4.5v1.5zm9-1.5H18v6h1.5v-2h2c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5zm0 2.5h-2v-1h2v1z"></path></g>
<g id="https"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></g>
<g id="important-devices"><path d="M23 11.01L18 11c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-9c0-.55-.45-.99-1-.99zM23 20h-5v-7h5v7zM20 2H2C.89 2 0 2.89 0 4v12c0 1.1.89 2 2 2h7v2H7v2h8v-2h-2v-2h2v-2H2V4h18v5h2V4c0-1.11-.9-2-2-2zm-8.03 7L11 6l-.97 3H7l2.47 1.76-.94 2.91 2.47-1.8 2.47 1.8-.94-2.91L15 9h-3.03z"></path></g>
<g id="inbox"><path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z"></path></g>
<g id="indeterminate-check-box"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"></path></g>
<g id="info"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></g>
<g id="info-outline"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></g>
<g id="input"><path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"></path></g>
<g id="invert-colors"><path d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"></path></g>
<g id="label"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"></path></g>
<g id="label-outline"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></g>
<g id="language"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path></g>
<g id="last-page"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path></g>
<g id="launch"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>
<g id="lightbulb-outline"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path></g>
<g id="line-style"><path d="M3 16h5v-2H3v2zm6.5 0h5v-2h-5v2zm6.5 0h5v-2h-5v2zM3 20h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM3 12h8v-2H3v2zm10 0h8v-2h-8v2zM3 4v4h18V4H3z"></path></g>
<g id="line-weight"><path d="M3 17h18v-2H3v2zm0 3h18v-1H3v1zm0-7h18v-3H3v3zm0-9v4h18V4H3z"></path></g>
<g id="link"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>
<g id="list"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path></g>
<g id="lock"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></g>
<g id="lock-open"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"></path></g>
<g id="lock-outline"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"></path></g>
<g id="low-priority"><path d="M14 5h8v2h-8zm0 5.5h8v2h-8zm0 5.5h8v2h-8zM2 11.5C2 15.08 4.92 18 8.5 18H9v2l3-3-3-3v2h-.5C6.02 16 4 13.98 4 11.5S6.02 7 8.5 7H12V5H8.5C4.92 5 2 7.92 2 11.5z"></path></g>
<g id="loyalty"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7zm11.77 8.27L13 19.54l-4.27-4.27C8.28 14.81 8 14.19 8 13.5c0-1.38 1.12-2.5 2.5-2.5.69 0 1.32.28 1.77.74l.73.72.73-.73c.45-.45 1.08-.73 1.77-.73 1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.32-.73 1.77z"></path></g>
<g id="mail"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>
<g id="markunread"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>
<g id="markunread-mailbox"><path d="M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"></path></g>
<g id="menu"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>
<g id="more-horiz"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="more-vert"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="motorcycle"><path d="M19.44 9.03L15.41 5H11v2h3.59l2 2H5c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.46 0 4.45-1.69 4.9-4h1.65l2.77-2.77c-.21.54-.32 1.14-.32 1.77 0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.65-1.97-4.77-4.56-4.97zM7.82 15C7.4 16.15 6.28 17 5 17c-1.63 0-3-1.37-3-3s1.37-3 3-3c1.28 0 2.4.85 2.82 2H5v2h2.82zM19 17c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path></g>
<g id="move-to-inbox"><path d="M19 3H4.99c-1.11 0-1.98.9-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10zm-3-5h-2V7h-4v3H8l4 4 4-4z"></path></g>
<g id="next-week"><path d="M20 7h-4V5c0-.55-.22-1.05-.59-1.41C15.05 3.22 14.55 3 14 3h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm1 13.5l-1-1 3-3-3-3 1-1 4 4-4 4z"></path></g>
<g id="note-add"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"></path></g>
<g id="offline-pin"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4 1.9 1.9 5.3-5.3L17 7.3 10.3 14z"></path></g>
<g id="opacity"><path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z"></path></g>
<g id="open-in-browser"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z"></path></g>
<g id="open-in-new"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>
<g id="open-with"><path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"></path></g>
<g id="pageview"><path d="M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.39.7C9.01 16 7 13.99 7 11.5S9.01 7 11.5 7 16 9.01 16 11.5c0 .88-.26 1.69-.7 2.39l2.91 2.9-1.42 1.42z"></path></g>
<g id="pan-tool"><path d="M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.26-1.23 1.3-1.25c.22-.19.49-.29.79-.29.22 0 .42.06.6.16.04.01 4.31 2.46 4.31 2.46V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v7h1V1.5c0-.83.67-1.5 1.5-1.5S15 .67 15 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"></path></g>
<g id="payment"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>
<g id="perm-camera-mic"><path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v-2.09c-2.83-.48-5-2.94-5-5.91h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 2.97-2.17 5.43-5 5.91V21h7c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-6 8c0 1.1-.9 2-2 2s-2-.9-2-2V9c0-1.1.9-2 2-2s2 .9 2 2v4z"></path></g>
<g id="perm-contact-calendar"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z"></path></g>
<g id="perm-data-setting"><path d="M18.99 11.5c.34 0 .67.03 1 .07L20 0 0 20h11.56c-.04-.33-.07-.66-.07-1 0-4.14 3.36-7.5 7.5-7.5zm3.71 7.99c.02-.16.04-.32.04-.49 0-.17-.01-.33-.04-.49l1.06-.83c.09-.08.12-.21.06-.32l-1-1.73c-.06-.11-.19-.15-.31-.11l-1.24.5c-.26-.2-.54-.37-.85-.49l-.19-1.32c-.01-.12-.12-.21-.24-.21h-2c-.12 0-.23.09-.25.21l-.19 1.32c-.3.13-.59.29-.85.49l-1.24-.5c-.11-.04-.24 0-.31.11l-1 1.73c-.06.11-.04.24.06.32l1.06.83c-.02.16-.03.32-.03.49 0 .17.01.33.03.49l-1.06.83c-.09.08-.12.21-.06.32l1 1.73c.06.11.19.15.31.11l1.24-.5c.26.2.54.37.85.49l.19 1.32c.02.12.12.21.25.21h2c.12 0 .23-.09.25-.21l.19-1.32c.3-.13.59-.29.84-.49l1.25.5c.11.04.24 0 .31-.11l1-1.73c.06-.11.03-.24-.06-.32l-1.07-.83zm-3.71 1.01c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>
<g id="perm-device-information"><path d="M13 7h-2v2h2V7zm0 4h-2v6h2v-6zm4-9.99L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"></path></g>
<g id="perm-identity"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path></g>
<g id="perm-media"><path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"></path></g>
<g id="perm-phone-msg"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z"></path></g>
<g id="perm-scan-wifi"><path d="M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3zm1 13h-2v-6h2v6zm-2-8V6h2v2h-2z"></path></g>
<g id="pets"><circle cx="4.5" cy="9.5" r="2.5"></circle><circle cx="9" cy="5.5" r="2.5"></circle><circle cx="15" cy="5.5" r="2.5"></circle><circle cx="19.5" cy="9.5" r="2.5"></circle><path d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"></path></g>
<g id="picture-in-picture"><path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"></path></g>
<g id="picture-in-picture-alt"><path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"></path></g>
<g id="play-for-work"><path d="M11 5v5.59H7.5l4.5 4.5 4.5-4.5H13V5h-2zm-5 9c0 3.31 2.69 6 6 6s6-2.69 6-6h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H6z"></path></g>
<g id="polymer"><path d="M19 4h-4L7.11 16.63 4.5 12 9 4H5L.5 12 5 20h4l7.89-12.63L19.5 12 15 20h4l4.5-8z"></path></g>
<g id="power-settings-new"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"></path></g>
<g id="pregnant-woman"><path d="M9 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm7 9c-.01-1.34-.83-2.51-2-3 0-1.66-1.34-3-3-3s-3 1.34-3 3v7h2v5h3v-5h3v-4z"></path></g>
<g id="print"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"></path></g>
<g id="query-builder"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>
<g id="question-answer"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"></path></g>
<g id="radio-button-checked"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="radio-button-unchecked"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>
<g id="receipt"><path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"></path></g>
<g id="record-voice-over"><circle cx="9" cy="9" r="4"></circle><path d="M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.76-9.64l-1.68 1.69c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27zM20.07 2l-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74L20.07 16c3.9-3.89 3.91-9.95 0-14z"></path></g>
<g id="redeem"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>
<g id="redo"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"></path></g>
<g id="refresh"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></g>
<g id="remove"><path d="M19 13H5v-2h14v2z"></path></g>
<g id="remove-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></g>
<g id="remove-circle-outline"><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
<g id="remove-shopping-cart"><path d="M22.73 22.73L2.77 2.77 2 2l-.73-.73L0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38c-.5.36-.83.95-.83 1.62 0 1.1.89 2 1.99 2 .67 0 1.26-.33 1.62-.84L21.46 24l1.27-1.27zM7.42 15c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h2.36l2 2H7.42zm8.13-2c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H6.54l9.01 9zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z"></path></g>
<g id="reorder"><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"></path></g>
<g id="reply"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g>
<g id="reply-all"><path d="M7 8V5l-7 7 7 7v-3l-4-4 4-4zm6 1V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g>
<g id="report"><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"></path></g>
<g id="report-problem"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
<g id="restore"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>
<g id="restore-page"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 16c-2.05 0-3.81-1.24-4.58-3h1.71c.63.9 1.68 1.5 2.87 1.5 1.93 0 3.5-1.57 3.5-3.5S13.93 9.5 12 9.5c-1.35 0-2.52.78-3.1 1.9l1.6 1.6h-4V9l1.3 1.3C8.69 8.92 10.23 8 12 8c2.76 0 5 2.24 5 5s-2.24 5-5 5z"></path></g>
<g id="room"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>
<g id="rounded-corner"><path d="M19 19h2v2h-2v-2zm0-2h2v-2h-2v2zM3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm0-4h2V3H3v2zm4 0h2V3H7v2zm8 16h2v-2h-2v2zm-4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm-8 0h2v-2H7v2zm-4 0h2v-2H3v2zM21 8c0-2.76-2.24-5-5-5h-5v2h5c1.65 0 3 1.35 3 3v5h2V8z"></path></g>
<g id="rowing"><path d="M8.5 14.5L4 19l1.5 1.5L9 17h2l-2.5-2.5zM15 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 20.01L18 24l-2.99-3.01V19.5l-7.1-7.09c-.31.05-.61.07-.91.07v-2.16c1.66.03 3.61-.87 4.67-2.04l1.4-1.55c.19-.21.43-.38.69-.5.29-.14.62-.23.96-.23h.03C15.99 6.01 17 7.02 17 8.26v5.75c0 .84-.35 1.61-.92 2.16l-3.58-3.58v-2.27c-.63.52-1.43 1.02-2.29 1.39L16.5 18H18l3 3.01z"></path></g>
<g id="save"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></g>
<g id="schedule"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>
<g id="search"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></g>
<g id="select-all"><path d="M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2zM7 17h10V7H7v10zm2-8h6v6H9V9z"></path></g>
<g id="send"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></g>
<g id="settings"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></g>
<g id="settings-applications"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z"></path></g>
<g id="settings-backup-restore"><path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"></path></g>
<g id="settings-bluetooth"><path d="M11 24h2v-2h-2v2zm-4 0h2v-2H7v2zm8 0h2v-2h-2v2zm2.71-18.29L12 0h-1v7.59L6.41 3 5 4.41 10.59 10 5 15.59 6.41 17 11 12.41V20h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 3.83l1.88 1.88L13 7.59V3.83zm1.88 10.46L13 16.17v-3.76l1.88 1.88z"></path></g>
<g id="settings-brightness"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02zM8 16h2.5l1.5 1.5 1.5-1.5H16v-2.5l1.5-1.5-1.5-1.5V8h-2.5L12 6.5 10.5 8H8v2.5L6.5 12 8 13.5V16zm4-7c1.66 0 3 1.34 3 3s-1.34 3-3 3V9z"></path></g>
<g id="settings-cell"><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM16 .01L8 0C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V2c0-1.1-.9-1.99-2-1.99zM16 16H8V4h8v12z"></path></g>
<g id="settings-ethernet"><path d="M7.77 6.76L6.23 5.48.82 12l5.41 6.52 1.54-1.28L3.42 12l4.35-5.24zM7 13h2v-2H7v2zm10-2h-2v2h2v-2zm-6 2h2v-2h-2v2zm6.77-7.52l-1.54 1.28L20.58 12l-4.35 5.24 1.54 1.28L23.18 12l-5.41-6.52z"></path></g>
<g id="settings-input-antenna"><path d="M12 5c-3.87 0-7 3.13-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.87-3.13-7-7-7zm1 9.29c.88-.39 1.5-1.26 1.5-2.29 0-1.38-1.12-2.5-2.5-2.5S9.5 10.62 9.5 12c0 1.02.62 1.9 1.5 2.29v3.3L7.59 21 9 22.41l3-3 3 3L16.41 21 13 17.59v-3.3zM12 1C5.93 1 1 5.93 1 12h2c0-4.97 4.03-9 9-9s9 4.03 9 9h2c0-6.07-4.93-11-11-11z"></path></g>
<g id="settings-input-component"><path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></g>
<g id="settings-input-composite"><path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></g>
<g id="settings-input-hdmi"><path d="M18 7V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3H5v6l3 6v3h8v-3l3-6V7h-1zM8 4h8v3h-2V5h-1v2h-2V5h-1v2H8V4z"></path></g>
<g id="settings-input-svideo"><path d="M8 11.5c0-.83-.67-1.5-1.5-1.5S5 10.67 5 11.5 5.67 13 6.5 13 8 12.33 8 11.5zm7-5c0-.83-.67-1.5-1.5-1.5h-3C9.67 5 9 5.67 9 6.5S9.67 8 10.5 8h3c.83 0 1.5-.67 1.5-1.5zM8.5 15c-.83 0-1.5.67-1.5 1.5S7.67 18 8.5 18s1.5-.67 1.5-1.5S9.33 15 8.5 15zM12 1C5.93 1 1 5.93 1 12s4.93 11 11 11 11-4.93 11-11S18.07 1 12 1zm0 20c-4.96 0-9-4.04-9-9s4.04-9 9-9 9 4.04 9 9-4.04 9-9 9zm5.5-11c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-2 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path></g>
<g id="settings-overscan"><path d="M12.01 5.5L10 8h4l-1.99-2.5zM18 10v4l2.5-1.99L18 10zM6 10l-2.5 2.01L6 14v-4zm8 6h-4l2.01 2.5L14 16zm7-13H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>
<g id="settings-phone"><path d="M13 9h-2v2h2V9zm4 0h-2v2h2V9zm3 6.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 9v2h2V9h-2z"></path></g>
<g id="settings-power"><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm2-22h-2v10h2V2zm3.56 2.44l-1.45 1.45C16.84 6.94 18 8.83 18 11c0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2.17 1.16-4.06 2.88-5.12L7.44 4.44C5.36 5.88 4 8.28 4 11c0 4.42 3.58 8 8 8s8-3.58 8-8c0-2.72-1.36-5.12-3.44-6.56zM15 24h2v-2h-2v2z"></path></g>
<g id="settings-remote"><path d="M15 9H9c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V10c0-.55-.45-1-1-1zm-3 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7.05 6.05l1.41 1.41C9.37 6.56 10.62 6 12 6s2.63.56 3.54 1.46l1.41-1.41C15.68 4.78 13.93 4 12 4s-3.68.78-4.95 2.05zM12 0C8.96 0 6.21 1.23 4.22 3.22l1.41 1.41C7.26 3.01 9.51 2 12 2s4.74 1.01 6.36 2.64l1.41-1.41C17.79 1.23 15.04 0 12 0z"></path></g>
<g id="settings-voice"><path d="M7 24h2v-2H7v2zm5-11c1.66 0 2.99-1.34 2.99-3L15 4c0-1.66-1.34-3-3-3S9 2.34 9 4v6c0 1.66 1.34 3 3 3zm-1 11h2v-2h-2v2zm4 0h2v-2h-2v2zm4-14h-1.7c0 3-2.54 5.1-5.3 5.1S6.7 13 6.7 10H5c0 3.41 2.72 6.23 6 6.72V20h2v-3.28c3.28-.49 6-3.31 6-6.72z"></path></g>
<g id="shop"><path d="M16 6V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H2v13c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6h-6zm-6-2h4v2h-4V4zM9 18V9l7.5 4L9 18z"></path></g>
<g id="shop-two"><path d="M3 9H1v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2H3V9zm15-4V3c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H5v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5h-5zm-6-2h4v2h-4V3zm0 12V8l5.5 3-5.5 4z"></path></g>
<g id="shopping-basket"><path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>
<g id="shopping-cart"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></g>
<g id="sort"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path></g>
<g id="speaker-notes"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 14H6v-2h2v2zm0-3H6V9h2v2zm0-3H6V6h2v2zm7 6h-5v-2h5v2zm3-3h-8V9h8v2zm0-3h-8V6h8v2z"></path></g>
<g id="speaker-notes-off"><path d="M10.54 11l-.54-.54L7.54 8 6 6.46 2.38 2.84 1.27 1.73 0 3l2.01 2.01L2 22l4-4h9l5.73 5.73L22 22.46 17.54 18l-7-7zM8 14H6v-2h2v2zm-2-3V9l2 2H6zm14-9H4.08L10 7.92V6h8v2h-7.92l1 1H18v2h-4.92l6.99 6.99C21.14 17.95 22 17.08 22 16V4c0-1.1-.9-2-2-2z"></path></g>
<g id="spellcheck"><path d="M12.45 16h2.09L9.43 3H7.57L2.46 16h2.09l1.12-3h5.64l1.14 3zm-6.02-5L8.5 5.48 10.57 11H6.43zm15.16.59l-8.09 8.09L9.83 16l-1.41 1.41 5.09 5.09L23 13l-1.41-1.41z"></path></g>
<g id="star"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>
<g id="star-border"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>
<g id="star-half"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>
<g id="stars"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path></g>
<g id="store"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"></path></g>
<g id="subdirectory-arrow-left"><path d="M11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z"></path></g>
<g id="subdirectory-arrow-right"><path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"></path></g>
<g id="subject"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"></path></g>
<g id="supervisor-account"><path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z"></path></g>
<g id="swap-horiz"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></g>
<g id="swap-vert"><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"></path></g>
<g id="swap-vertical-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z"></path></g>
<g id="system-update-alt"><path d="M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V5.49h6V3.5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z"></path></g>
<g id="tab"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h10v4h8v10z"></path></g>
<g id="tab-unselected"><path d="M1 9h2V7H1v2zm0 4h2v-2H1v2zm0-8h2V3c-1.1 0-2 .9-2 2zm8 16h2v-2H9v2zm-8-4h2v-2H1v2zm2 4v-2H1c0 1.1.9 2 2 2zM21 3h-8v6h10V5c0-1.1-.9-2-2-2zm0 14h2v-2h-2v2zM9 5h2V3H9v2zM5 21h2v-2H5v2zM5 5h2V3H5v2zm16 16c1.1 0 2-.9 2-2h-2v2zm0-8h2v-2h-2v2zm-8 8h2v-2h-2v2zm4 0h2v-2h-2v2z"></path></g>
<g id="text-format"><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"></path></g>
<g id="theaters"><path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path></g>
<g id="thumb-down"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path></g>
<g id="thumb-up"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"></path></g>
<g id="thumbs-up-down"><path d="M12 6c0-.55-.45-1-1-1H5.82l.66-3.18.02-.23c0-.31-.13-.59-.33-.8L5.38 0 .44 4.94C.17 5.21 0 5.59 0 6v6.5c0 .83.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.91l2.26-5.29c.07-.17.11-.36.11-.55V6zm10.5 4h-6.75c-.62 0-1.15.38-1.38.91l-2.26 5.29c-.07.17-.11.36-.11.55V18c0 .55.45 1 1 1h5.18l-.66 3.18-.02.24c0 .31.13.59.33.8l.79.78 4.94-4.94c.27-.27.44-.65.44-1.06v-6.5c0-.83-.67-1.5-1.5-1.5z"></path></g>
<g id="timeline"><path d="M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z"></path></g>
<g id="toc"><path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"></path></g>
<g id="today"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path></g>
<g id="toll"><path d="M15 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zM3 12c0-2.61 1.67-4.83 4-5.65V4.26C3.55 5.15 1 8.27 1 12s2.55 6.85 6 7.74v-2.09c-2.33-.82-4-3.04-4-5.65z"></path></g>
<g id="touch-app"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"></path></g>
<g id="track-changes"><path d="M19.07 4.93l-1.41 1.41C19.1 7.79 20 9.79 20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-4.08 3.05-7.44 7-7.93v2.02C8.16 6.57 6 9.03 6 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.66-.67-3.16-1.76-4.24l-1.41 1.41C15.55 9.9 16 10.9 16 12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.86 1.28-3.41 3-3.86v2.14c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V2h-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07z"></path></g>
<g id="translate"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></g>
<g id="trending-down"><path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"></path></g>
<g id="trending-flat"><path d="M22 12l-4-4v3H3v2h15v3z"></path></g>
<g id="trending-up"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></g>
<g id="turned-in"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>
<g id="turned-in-not"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>
<g id="unarchive"><path d="M20.55 5.22l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.15.55L3.46 5.22C3.17 5.57 3 6.01 3 6.5V19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.49-.17-.93-.45-1.28zM12 9.5l5.5 5.5H14v2h-4v-2H6.5L12 9.5zM5.12 5l.82-1h12l.93 1H5.12z"></path></g>
<g id="undo"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"></path></g>
<g id="unfold-less"><path d="M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z"></path></g>
<g id="unfold-more"><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path></g>
<g id="update"><path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79 2.73 2.71 7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58 3.51-3.47 9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z"></path></g>
<g id="verified-user"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>
<g id="view-agenda"><path d="M20 13H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm0-10H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z"></path></g>
<g id="view-array"><path d="M4 18h3V5H4v13zM18 5v13h3V5h-3zM8 18h9V5H8v13z"></path></g>
<g id="view-carousel"><path d="M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z"></path></g>
<g id="view-column"><path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"></path></g>
<g id="view-day"><path d="M2 21h19v-3H2v3zM20 8H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zM2 3v3h19V3H2z"></path></g>
<g id="view-headline"><path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"></path></g>
<g id="view-list"><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"></path></g>
<g id="view-module"><path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"></path></g>
<g id="view-quilt"><path d="M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z"></path></g>
<g id="view-stream"><path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z"></path></g>
<g id="view-week"><path d="M6 5H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm14 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-7 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1z"></path></g>
<g id="visibility"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></g>
<g id="visibility-off"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></g>
<g id="warning"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>
<g id="watch-later"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"></path></g>
<g id="weekend"><path d="M21 10c-1.1 0-2 .9-2 2v3H5v-3c0-1.1-.9-2-2-2s-2 .9-2 2v5c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2zm-3-5H6c-1.1 0-2 .9-2 2v2.15c1.16.41 2 1.51 2 2.82V14h12v-2.03c0-1.3.84-2.4 2-2.82V7c0-1.1-.9-2-2-2z"></path></g>
<g id="work"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path></g>
<g id="youtube-searched-for"><path d="M17.01 14h-.8l-.27-.27c.98-1.14 1.57-2.61 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 3-6.5 6.5H2l3.84 4 4.16-4H6.51C6.51 7 8.53 5 11.01 5s4.5 2.01 4.5 4.5c0 2.48-2.02 4.5-4.5 4.5-.65 0-1.26-.14-1.82-.38L7.71 15.1c.97.57 2.09.9 3.3.9 1.61 0 3.08-.59 4.22-1.57l.27.27v.79l5.01 4.99L22 19l-4.99-5z"></path></g>
<g id="zoom-in"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm2.5-4h-2v2H9v-2H7V9h2V7h1v2h2v1z"></path></g>
<g id="zoom-out"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"></path></g>
</defs></svg>
</iron-iconset-svg>`;document.head.appendChild(template.content);const PaperButtonBehaviorImpl={properties:{/**
     * The z-depth of this element, from 0-5. Setting to 0 will remove the
     * shadow, and each increasing number greater than 0 will be "deeper"
     * than the last.
     *
     * @attribute elevation
     * @type number
     * @default 1
     */elevation:{type:Number,reflectToAttribute:!0,readOnly:!0}},observers:["_calculateElevation(focused, disabled, active, pressed, receivedFocusFromKeyboard)","_computeKeyboardClass(receivedFocusFromKeyboard)"],hostAttributes:{role:"button",tabindex:"0",animated:!0},_calculateElevation:function(){var e=1;if(this.disabled){e=0}else if(this.active||this.pressed){e=4}else if(this.receivedFocusFromKeyboard){e=3}this._setElevation(e)},_computeKeyboardClass:function(receivedFocusFromKeyboard){this.toggleClass("keyboard-focus",receivedFocusFromKeyboard)},/**
   * In addition to `IronButtonState` behavior, when space key goes down,
   * create a ripple down effect.
   *
   * @param {!KeyboardEvent} event .
   */_spaceKeyDownHandler:function(event){_bbbbcSegmentTracker.IronButtonStateImpl._spaceKeyDownHandler.call(this,event);// Ensure that there is at most one ripple when the space key is held down.
if(this.hasRipple()&&1>this.getRipple().ripples.length){this._ripple.uiDownAction()}},/**
   * In addition to `IronButtonState` behavior, when space key goes up,
   * create a ripple up effect.
   *
   * @param {!KeyboardEvent} event .
   */_spaceKeyUpHandler:function(event){_bbbbcSegmentTracker.IronButtonStateImpl._spaceKeyUpHandler.call(this,event);if(this.hasRipple()){this._ripple.uiUpAction()}}};/** @polymerBehavior */_exports.PaperButtonBehaviorImpl=PaperButtonBehaviorImpl;const PaperButtonBehavior=[_bbbbcSegmentTracker.IronButtonState,_bbbbcSegmentTracker.IronControlState,_bbbbcSegmentTracker.PaperRippleBehavior,PaperButtonBehaviorImpl];_exports.PaperButtonBehavior=PaperButtonBehavior;var paperButtonBehavior={PaperButtonBehaviorImpl:PaperButtonBehaviorImpl,PaperButtonBehavior:PaperButtonBehavior};_exports.$paperButtonBehavior=paperButtonBehavior;const template$1=_bbbbcSegmentTracker.html$1`
<custom-style>
  <style is="custom-style">
    html {

      --shadow-transition: {
        transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      };

      --shadow-none: {
        box-shadow: none;
      };

      /* from http://codepen.io/shyndman/pen/c5394ddf2e8b2a5c9185904b57421cdb */

      --shadow-elevation-2dp: {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
      };

      --shadow-elevation-3dp: {
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
                    0 1px 8px 0 rgba(0, 0, 0, 0.12),
                    0 3px 3px -2px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-4dp: {
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                    0 1px 10px 0 rgba(0, 0, 0, 0.12),
                    0 2px 4px -1px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-6dp: {
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                    0 1px 18px 0 rgba(0, 0, 0, 0.12),
                    0 3px 5px -1px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-8dp: {
        box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
                    0 3px 14px 2px rgba(0, 0, 0, 0.12),
                    0 5px 5px -3px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-12dp: {
        box-shadow: 0 12px 16px 1px rgba(0, 0, 0, 0.14),
                    0 4px 22px 3px rgba(0, 0, 0, 0.12),
                    0 6px 7px -4px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-16dp: {
        box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
                    0  6px 30px 5px rgba(0, 0, 0, 0.12),
                    0  8px 10px -5px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-24dp: {
        box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
                    0 9px 46px 8px rgba(0, 0, 0, 0.12),
                    0 11px 15px -7px rgba(0, 0, 0, 0.4);
      };
    }
  </style>
</custom-style>`;template$1.setAttribute("style","display: none;");document.head.appendChild(template$1.content);const template$2=_bbbbcSegmentTracker.html$1`
<dom-module id="paper-material-styles">
  <template>
    <style>
      html {
        --paper-material: {
          display: block;
          position: relative;
        };
        --paper-material-elevation-1: {
          @apply --shadow-elevation-2dp;
        };
        --paper-material-elevation-2: {
          @apply --shadow-elevation-4dp;
        };
        --paper-material-elevation-3: {
          @apply --shadow-elevation-6dp;
        };
        --paper-material-elevation-4: {
          @apply --shadow-elevation-8dp;
        };
        --paper-material-elevation-5: {
          @apply --shadow-elevation-16dp;
        };
      }
      .paper-material {
        @apply --paper-material;
      }
      .paper-material[elevation="1"] {
        @apply --paper-material-elevation-1;
      }
      .paper-material[elevation="2"] {
        @apply --paper-material-elevation-2;
      }
      .paper-material[elevation="3"] {
        @apply --paper-material-elevation-3;
      }
      .paper-material[elevation="4"] {
        @apply --paper-material-elevation-4;
      }
      .paper-material[elevation="5"] {
        @apply --paper-material-elevation-5;
      }

      /* Duplicate the styles because of https://github.com/webcomponents/shadycss/issues/193 */
      :host {
        --paper-material: {
          display: block;
          position: relative;
        };
        --paper-material-elevation-1: {
          @apply --shadow-elevation-2dp;
        };
        --paper-material-elevation-2: {
          @apply --shadow-elevation-4dp;
        };
        --paper-material-elevation-3: {
          @apply --shadow-elevation-6dp;
        };
        --paper-material-elevation-4: {
          @apply --shadow-elevation-8dp;
        };
        --paper-material-elevation-5: {
          @apply --shadow-elevation-16dp;
        };
      }
      :host(.paper-material) {
        @apply --paper-material;
      }
      :host(.paper-material[elevation="1"]) {
        @apply --paper-material-elevation-1;
      }
      :host(.paper-material[elevation="2"]) {
        @apply --paper-material-elevation-2;
      }
      :host(.paper-material[elevation="3"]) {
        @apply --paper-material-elevation-3;
      }
      :host(.paper-material[elevation="4"]) {
        @apply --paper-material-elevation-4;
      }
      :host(.paper-material[elevation="5"]) {
        @apply --paper-material-elevation-5;
      }
    </style>
  </template>
</dom-module>`;template$2.setAttribute("style","display: none;");document.head.appendChild(template$2.content);const template$3=_bbbbcSegmentTracker.html$1`
  <style include="paper-material-styles">
    :host {
      @apply --layout-vertical;
      @apply --layout-center-center;

      background: var(--paper-fab-background, var(--accent-color));
      border-radius: 50%;
      box-sizing: border-box;
      color: var(--text-primary-color);
      cursor: pointer;
      height: 56px;
      min-width: 0;
      outline: none;
      padding: 16px;
      position: relative;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      width: 56px;
      z-index: 0;

      /* NOTE: Both values are needed, since some phones require the value \`transparent\`. */
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-tap-highlight-color: transparent;

      @apply --paper-fab;
    }

    [hidden] {
      display: none !important;
    }

    :host([mini]) {
      width: 40px;
      height: 40px;
      padding: 8px;

      @apply --paper-fab-mini;
    }

    :host([disabled]) {
      color: var(--paper-fab-disabled-text, var(--paper-grey-500));
      background: var(--paper-fab-disabled-background, var(--paper-grey-300));

      @apply --paper-fab-disabled;
    }

    iron-icon {
      @apply --paper-fab-iron-icon;
    }

    span {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;

      @apply --paper-fab-label;
    }

    :host(.keyboard-focus) {
      background: var(--paper-fab-keyboard-focus-background, var(--paper-pink-900));
    }

    :host([elevation="1"]) {
      @apply --paper-material-elevation-1;
    }

    :host([elevation="2"]) {
      @apply --paper-material-elevation-2;
    }

    :host([elevation="3"]) {
      @apply --paper-material-elevation-3;
    }

    :host([elevation="4"]) {
      @apply --paper-material-elevation-4;
    }

    :host([elevation="5"]) {
      @apply --paper-material-elevation-5;
    }
  </style>

  <iron-icon id="icon" hidden\$="{{!_computeIsIconFab(icon, src)}}" src="[[src]]" icon="[[icon]]"></iron-icon>
  <span hidden\$="{{_computeIsIconFab(icon, src)}}">{{label}}</span>
`;template$3.setAttribute("strip-whitespace","");/**
                                                 Material design: [Floating Action
                                                 Button](https://www.google.com/design/spec/components/buttons-floating-action-button.html)
                                                                                               `paper-fab` is a floating action button. It contains an image placed in the
                                                 center and comes in two sizes: regular size and a smaller size by applying the
                                                 attribute `mini`. When the user touches the button, a ripple effect emanates
                                                 from the center of the button.
                                                                                               You may import `iron-icons` to use with this element, or provide a URL to a
                                                 custom icon. See `iron-iconset` for more information about how to use a custom
                                                 icon set.
                                                                                               Example:
                                                                                                   <script type="module">
                                                     import '@polymer/iron-icons/iron-icons.js';
                                                   </script>
                                                                                                   <paper-fab icon="add"></paper-fab>
                                                   <paper-fab mini icon="favorite"></paper-fab>
                                                   <paper-fab src="star.png"></paper-fab>
                                                                                               
                                                 ### Styling
                                                                                               The following custom properties and mixins are available for styling:
                                                                                               Custom property | Description | Default
                                                 ----------------|-------------|----------
                                                 `--paper-fab-background` | The background color of the button | `--accent-color`
                                                 `--paper-fab-keyboard-focus-background` | The background color of the button when focused | `--paper-pink-900`
                                                 `--paper-fab-disabled-background` | The background color of the button when it's disabled | `--paper-grey-300`
                                                 `--paper-fab-disabled-text` | The text color of the button when it's disabled | `--paper-grey-500`
                                                 `--paper-fab` | Mixin applied to the button | `{}`
                                                 `--paper-fab-mini` | Mixin applied to a mini button | `{}`
                                                 `--paper-fab-disabled` | Mixin applied to a disabled button | `{}`
                                                 `--paper-fab-iron-icon` | Mixin applied to the iron-icon within the button | `{}`
                                                 `--paper-fab-label` | Mixin applied to the label within the button | `{}`
                                                                                               @group Paper Elements
                                                 @demo demo/index.html
                                                 */(0,_bbbbcSegmentTracker.Polymer)({_template:template$3,is:"paper-fab",behaviors:[PaperButtonBehavior],properties:{/**
     * The URL of an image for the icon. If the src property is specified,
     * the icon property should not be.
     */src:{type:String,value:""},/**
     * Specifies the icon name or index in the set of icons available in
     * the icon's icon set. If the icon property is specified,
     * the src property should not be.
     */icon:{type:String,value:""},/**
     * Set this to true to style this is a "mini" FAB.
     */mini:{type:Boolean,value:!1,reflectToAttribute:!0},/**
     * The label displayed in the badge. The label is centered, and ideally
     * should have very few characters.
     */label:{type:String,observer:"_labelChanged"}},_labelChanged:function(){this.setAttribute("aria-label",this.label)},_computeIsIconFab:function(icon,src){return 0<icon.length||0<src.length}});/**
     * @polymerMixin
     */const ThemePropertyMixin=superClass=>class VaadinThemePropertyMixin extends superClass{static get properties(){return{/**
       * Helper property with theme attribute value facilitating propagation
       * in shadow DOM. Allows using `theme$="[[theme]]"` in the template.
       *
       * @protected
       */theme:{type:String,readOnly:!0}}}/** @protected */attributeChangedCallback(name,oldValue,newValue){super.attributeChangedCallback(name,oldValue,newValue);if("theme"===name){this._setTheme(newValue)}}};_exports.ThemePropertyMixin=ThemePropertyMixin;var vaadinThemePropertyMixin={ThemePropertyMixin:ThemePropertyMixin};_exports.$vaadinThemePropertyMixin=vaadinThemePropertyMixin;const ThemableMixin=superClass=>class VaadinThemableMixin extends ThemePropertyMixin(superClass){/** @protected */static finalize(){super.finalize();const template=this.prototype._template,hasOwnTemplate=this.template&&this.template.parentElement&&this.template.parentElement.id===this.is,inheritedTemplate=Object.getPrototypeOf(this.prototype)._template;if(inheritedTemplate&&!hasOwnTemplate){// The element doesn't define its own template -> include the theme modules from the inherited template
Array.from(inheritedTemplate.content.querySelectorAll("style[include]")).forEach(s=>{this._includeStyle(s.getAttribute("include"),template)})}this._includeMatchingThemes(template)}/** @protected */static _includeMatchingThemes(template){const domModule=_bbbbcSegmentTracker.DomModule,modules=domModule.prototype.modules;let hasThemes=!1;const defaultModuleName=this.is+"-default-theme";Object.keys(modules).sort((moduleNameA,moduleNameB)=>{const vaadinA=0===moduleNameA.indexOf("vaadin-"),vaadinB=0===moduleNameB.indexOf("vaadin-"),vaadinThemePrefixes=["lumo-","material-"],vaadinThemeA=0<vaadinThemePrefixes.filter(prefix=>0===moduleNameA.indexOf(prefix)).length,vaadinThemeB=0<vaadinThemePrefixes.filter(prefix=>0===moduleNameB.indexOf(prefix)).length;if(vaadinA!==vaadinB){// Include vaadin core styles first
return vaadinA?-1:1}else if(vaadinThemeA!==vaadinThemeB){// Include vaadin theme styles after that
return vaadinThemeA?-1:1}else{// Lastly include custom styles so they override all vaadin styles
return 0}}).forEach(moduleName=>{if(moduleName!==defaultModuleName){const themeFor=modules[moduleName].getAttribute("theme-for");if(themeFor){themeFor.split(" ").forEach(themeForToken=>{if(new RegExp("^"+themeForToken.split("*").join(".*")+"$").test(this.is)){hasThemes=!0;this._includeStyle(moduleName,template)}})}}});if(!hasThemes&&modules[defaultModuleName]){// No theme modules found, include the default module if it exists
this._includeStyle(defaultModuleName,template)}}/** @private */static _includeStyle(moduleName,template){if(template&&!template.content.querySelector(`style[include="${moduleName}"]`)){const styleEl=document.createElement("style");styleEl.setAttribute("include",moduleName);template.content.appendChild(styleEl)}}};_exports.ThemableMixin=ThemableMixin;var vaadinThemableMixin={ThemableMixin:ThemableMixin};/**
   @license
   Copyright (c) 2017 Vaadin Ltd.
   This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   */ /**
       * A private mixin to avoid problems with dynamic properties and Polymer Analyzer.
       * No need to expose these properties in the API docs.
       * @polymerMixin
       */_exports.$vaadinThemableMixin=vaadinThemableMixin;const TabIndexMixin=superClass=>class VaadinTabIndexMixin extends superClass{static get properties(){var properties={/**
       * Internal property needed to listen to `tabindex` attribute changes.
       *
       * For changing the tabindex of this component use the native `tabIndex` property.
       * @private
       */tabindex:{type:Number,value:0,reflectToAttribute:!0,observer:"_tabindexChanged"}};if(window.ShadyDOM){// ShadyDOM browsers need the `tabIndex` in order to notify when the user changes it programmatically.
properties.tabIndex=properties.tabindex}return properties}},ControlStateMixin=superClass=>class VaadinControlStateMixin extends TabIndexMixin(superClass){static get properties(){return{/**
       * Specify that this control should have input focus when the page loads.
       */autofocus:{type:Boolean},/**
       * Stores the previous value of tabindex attribute of the disabled element
       */_previousTabIndex:{type:Number},/**
       * If true, the user cannot interact with this element.
       */disabled:{type:Boolean,observer:"_disabledChanged",reflectToAttribute:!0},_isShiftTabbing:{type:Boolean}}}ready(){this.addEventListener("focusin",e=>{if(e.composedPath()[0]===this){this._focus(e)}else if(-1!==e.composedPath().indexOf(this.focusElement)&&!this.disabled){this._setFocused(!0)}});this.addEventListener("focusout",e=>this._setFocused(!1));// In super.ready() other 'focusin' and 'focusout' listeners might be
// added, so we call it after our own ones to ensure they execute first.
// Issue to watch out: when incorrect, <vaadin-combo-box> refocuses the
// input field on iOS after “Done” is pressed.
super.ready();// This fixes the bug in Firefox 61 (https://bugzilla.mozilla.org/show_bug.cgi?id=1472887)
// where focusout event does not go out of shady DOM because composed property in the event is not true
const ensureEventComposed=e=>{if(!e.composed){e.target.dispatchEvent(new CustomEvent(e.type,{bubbles:!0,composed:!0,cancelable:!1}))}};this.shadowRoot.addEventListener("focusin",ensureEventComposed);this.shadowRoot.addEventListener("focusout",ensureEventComposed);this.addEventListener("keydown",e=>{if(!e.defaultPrevented&&9===e.keyCode){if(e.shiftKey){// Flag is checked in _focus event handler.
this._isShiftTabbing=!0;HTMLElement.prototype.focus.apply(this);this._setFocused(!1);// Event handling in IE is asynchronous and the flag is removed asynchronously as well
setTimeout(()=>this._isShiftTabbing=!1,0)}else{// Workaround for FF63-65 bug that causes the focus to get lost when
// blurring a slotted component with focusable shadow root content
// https://bugzilla.mozilla.org/show_bug.cgi?id=1528686
// TODO: Remove when safe
const firefox=window.navigator.userAgent.match(/Firefox\/(\d\d\.\d)/);if(firefox&&63<=parseFloat(firefox[1])&&66>parseFloat(firefox[1])&&this.parentNode&&this.nextSibling){const fakeTarget=document.createElement("input");fakeTarget.style.position="absolute";fakeTarget.style.opacity=0;fakeTarget.tabIndex=this.tabIndex;this.parentNode.insertBefore(fakeTarget,this.nextSibling);fakeTarget.focus();fakeTarget.addEventListener("focusout",()=>this.parentNode.removeChild(fakeTarget))}}}});if(this.autofocus&&!this.focused&&!this.disabled){window.requestAnimationFrame(()=>{this._focus();this._setFocused(!0);this.setAttribute("focus-ring","")})}this._boundKeydownListener=this._bodyKeydownListener.bind(this);this._boundKeyupListener=this._bodyKeyupListener.bind(this)}/**
     * @protected
     */connectedCallback(){super.connectedCallback();document.body.addEventListener("keydown",this._boundKeydownListener,!0);document.body.addEventListener("keyup",this._boundKeyupListener,!0)}/**
     * @protected
     */disconnectedCallback(){super.disconnectedCallback();document.body.removeEventListener("keydown",this._boundKeydownListener,!0);document.body.removeEventListener("keyup",this._boundKeyupListener,!0);// in non-Chrome browsers, blur does not fire on the element when it is disconnected.
// reproducible in `<vaadin-date-picker>` when closing on `Cancel` or `Today` click.
if(this.hasAttribute("focused")){this._setFocused(!1)}}_setFocused(focused){if(focused){this.setAttribute("focused","")}else{this.removeAttribute("focused")}// focus-ring is true when the element was focused from the keyboard.
// Focus Ring [A11ycasts]: https://youtu.be/ilj2P5-5CjI
if(focused&&this._tabPressed){this.setAttribute("focus-ring","")}else{this.removeAttribute("focus-ring")}}_bodyKeydownListener(e){this._tabPressed=9===e.keyCode}_bodyKeyupListener(){this._tabPressed=!1}/**
     * Any element extending this mixin is required to implement this getter.
     * It returns the actual focusable element in the component.
     */get focusElement(){window.console.warn(`Please implement the 'focusElement' property in <${this.localName}>`);return this}_focus(e){if(this._isShiftTabbing){return}this.focusElement.focus();this._setFocused(!0)}/**
     * Moving the focus from the host element causes firing of the blur event what leads to problems in IE.
     * @private
     */focus(){if(!this.focusElement||this.disabled){return}this.focusElement.focus();this._setFocused(!0)}/**
     * Native bluring in the host element does nothing because it does not have the focus.
     * In chrome it works, but not in FF.
     * @private
     */blur(){this.focusElement.blur();this._setFocused(!1)}_disabledChanged(disabled){this.focusElement.disabled=disabled;if(disabled){this.blur();this._previousTabIndex=this.tabindex;this.tabindex=-1;this.setAttribute("aria-disabled","true")}else{if("undefined"!==typeof this._previousTabIndex){this.tabindex=this._previousTabIndex}this.removeAttribute("aria-disabled")}}_tabindexChanged(tabindex){if(tabindex!==void 0){this.focusElement.tabIndex=tabindex}if(this.disabled&&this.tabindex){// If tabindex attribute was changed while checkbox was disabled
if(-1!==this.tabindex){this._previousTabIndex=this.tabindex}this.tabindex=tabindex=void 0}if(window.ShadyDOM){this.setProperties({tabIndex:tabindex,tabindex:tabindex})}}/**
     * @protected
     */click(){if(!this.disabled){super.click()}}};/**
    * Polymer.IronControlState is not a proper 2.0 class, also, its tabindex
    * implementation fails in the shadow dom, so we have this for vaadin elements.
    * @polymerMixin
    */_exports.ControlStateMixin=ControlStateMixin;var vaadinControlStateMixin={ControlStateMixin:ControlStateMixin};_exports.$vaadinControlStateMixin=vaadinControlStateMixin;const DEV_MODE_CODE_REGEXP=/\/\*\*\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,FlowClients=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function isMinified(){function test(){/** vaadin-dev-mode:start
    return false;
    vaadin-dev-mode:end **/return!0}return uncommentAndRun(test)}function isDevelopmentMode(){try{if(isForcedDevelopmentMode()){return!0}if(!isLocalhost()){return!1}if(FlowClients){return!isFlowProductionMode()}return!isMinified()}catch(e){// Some error in this code, assume production so no further actions will be taken
return!1}}function isForcedDevelopmentMode(){return localStorage.getItem("vaadin.developmentmode.force")}function isLocalhost(){return 0<=["localhost","127.0.0.1"].indexOf(window.location.hostname)}function isFlowProductionMode(){if(FlowClients){const productionModeApps=Object.keys(FlowClients).map(key=>FlowClients[key]).filter(client=>client.productionMode);if(0<productionModeApps.length){return!0}}return!1}function uncommentAndRun(callback,args){if("function"!==typeof callback){return}const match=DEV_MODE_CODE_REGEXP.exec(callback.toString());if(match){try{// requires CSP: script-src 'unsafe-eval'
callback=new Function(match[1])}catch(e){// eat the exception
console.log("vaadin-development-mode-detector: uncommentAndRun() failed",e)}}return callback(args)}// A guard against polymer-modulizer removing the window.Vaadin
// initialization above.
window.Vaadin=window.Vaadin||{};/**
                                            * Inspects the source code of the given `callback` function for
                                            * specially-marked _commented_ code. If such commented code is found in the
                                            * callback source, uncomments and runs that code instead of the callback
                                            * itself. Otherwise runs the callback as is.
                                            *
                                            * The optional arguments are passed into the callback / uncommented code,
                                            * the result is returned.
                                            *
                                            * See the `isMinified()` function source code in this file for an example.
                                            *
                                            */const runIfDevelopmentMode=function(callback,args){if(window.Vaadin.developmentMode){return uncommentAndRun(callback,args)}};_exports.runIfDevelopmentMode=runIfDevelopmentMode;if(window.Vaadin.developmentMode===void 0){window.Vaadin.developmentMode=isDevelopmentMode()}var vaadinDevelopmentModeDetector={runIfDevelopmentMode:runIfDevelopmentMode};_exports.$vaadinDevelopmentModeDetector=vaadinDevelopmentModeDetector;function maybeGatherAndSendStats(){/** vaadin-dev-mode:start
                                    (function () {
                                    'use strict';
                                    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                                    return typeof obj;
                                    } : function (obj) {
                                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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
                                    var getPolymerVersion = function getPolymerVersion() {
                                    return window.Polymer && window.Polymer.version;
                                    };
                                    var StatisticsGatherer = function () {
                                    function StatisticsGatherer(logger) {
                                      classCallCheck(this, StatisticsGatherer);
                                       this.now = new Date().getTime();
                                      this.logger = logger;
                                    }
                                     createClass(StatisticsGatherer, [{
                                      key: 'frameworkVersionDetectors',
                                      value: function frameworkVersionDetectors() {
                                        return {
                                          'Flow': function Flow() {
                                            if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
                                              var flowVersions = Object.keys(window.Vaadin.Flow.clients).map(function (key) {
                                                return window.Vaadin.Flow.clients[key];
                                              }).filter(function (client) {
                                                return client.getVersionInfo;
                                              }).map(function (client) {
                                                return client.getVersionInfo().flow;
                                              });
                                              if (flowVersions.length > 0) {
                                                return flowVersions[0];
                                              }
                                            }
                                          },
                                          'Vaadin Framework': function VaadinFramework() {
                                            if (window.vaadin && window.vaadin.clients) {
                                              var frameworkVersions = Object.values(window.vaadin.clients).filter(function (client) {
                                                return client.getVersionInfo;
                                              }).map(function (client) {
                                                return client.getVersionInfo().vaadinVersion;
                                              });
                                              if (frameworkVersions.length > 0) {
                                                return frameworkVersions[0];
                                              }
                                            }
                                          },
                                          'AngularJs': function AngularJs() {
                                            if (window.angular && window.angular.version && window.angular.version) {
                                              return window.angular.version.full;
                                            }
                                          },
                                          'Angular': function Angular() {
                                            if (window.ng) {
                                              var tags = document.querySelectorAll("[ng-version]");
                                              if (tags.length > 0) {
                                                return tags[0].getAttribute("ng-version");
                                              }
                                              return "Unknown";
                                            }
                                          },
                                          'Backbone.js': function BackboneJs() {
                                            if (window.Backbone) {
                                              return window.Backbone.VERSION;
                                            }
                                          },
                                          'React': function React() {
                                            var reactSelector = '[data-reactroot], [data-reactid]';
                                            if (!!document.querySelector(reactSelector)) {
                                              // React does not publish the version by default
                                              return "unknown";
                                            }
                                          },
                                          'Ember': function Ember() {
                                            if (window.Em && window.Em.VERSION) {
                                              return window.Em.VERSION;
                                            } else if (window.Ember && window.Ember.VERSION) {
                                              return window.Ember.VERSION;
                                            }
                                          },
                                          'jQuery': function (_jQuery) {
                                            function jQuery() {
                                              return _jQuery.apply(this, arguments);
                                            }
                                             jQuery.toString = function () {
                                              return _jQuery.toString();
                                            };
                                             return jQuery;
                                          }(function () {
                                            if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined) {
                                              return jQuery.prototype.jquery;
                                            }
                                          }),
                                          'Polymer': function Polymer() {
                                            var version = getPolymerVersion();
                                            if (version) {
                                              return version;
                                            }
                                          },
                                          'LitElement': function LitElement() {
                                            var version = window.litElementVersions && window.litElementVersions[0];
                                            if (version) {
                                              return version;
                                            }
                                          },
                                          'LitHtml': function LitHtml() {
                                            var version = window.litHtmlVersions && window.litHtmlVersions[0];
                                            if (version) {
                                              return version;
                                            }
                                          },
                                          'Vue.js': function VueJs() {
                                            if (window.Vue) {
                                              return window.Vue.version;
                                            }
                                          }
                                        };
                                      }
                                    }, {
                                      key: 'getUsedVaadinElements',
                                      value: function getUsedVaadinElements(elements) {
                                        var version = getPolymerVersion();
                                        var elementClasses = void 0;
                                        if (version && version.indexOf('2') === 0) {
                                          // Polymer 2: components classes are stored in window.Vaadin
                                          elementClasses = Object.keys(window.Vaadin).map(function (c) {
                                            return window.Vaadin[c];
                                          }).filter(function (c) {
                                            return c.is;
                                          });
                                        } else {
                                          // Polymer 3: components classes are stored in window.Vaadin.registrations
                                          elementClasses = window.Vaadin.registrations || [];
                                        }
                                        elementClasses.forEach(function (klass) {
                                          var version = klass.version ? klass.version : "0.0.0";
                                          elements[klass.is] = { version: version };
                                        });
                                      }
                                    }, {
                                      key: 'getUsedVaadinThemes',
                                      value: function getUsedVaadinThemes(themes) {
                                        ['Lumo', 'Material'].forEach(function (themeName) {
                                          var theme;
                                          var version = getPolymerVersion();
                                          if (version && version.indexOf('2') === 0) {
                                            // Polymer 2: themes are stored in window.Vaadin
                                            theme = window.Vaadin[themeName];
                                          } else {
                                            // Polymer 3: themes are stored in custom element registry
                                            theme = customElements.get('vaadin-' + themeName.toLowerCase() + '-styles');
                                          }
                                          if (theme && theme.version) {
                                            themes[themeName] = { version: theme.version };
                                          }
                                        });
                                      }
                                    }, {
                                      key: 'getFrameworks',
                                      value: function getFrameworks(frameworks) {
                                        var detectors = this.frameworkVersionDetectors();
                                        Object.keys(detectors).forEach(function (framework) {
                                          var detector = detectors[framework];
                                          try {
                                            var version = detector();
                                            if (version) {
                                              frameworks[framework] = { version: version };
                                            }
                                          } catch (e) {}
                                        });
                                      }
                                    }, {
                                      key: 'gather',
                                      value: function gather(storage) {
                                        var storedStats = storage.read();
                                        var gatheredStats = {};
                                        var types = ["elements", "frameworks", "themes"];
                                         types.forEach(function (type) {
                                          gatheredStats[type] = {};
                                          if (!storedStats[type]) {
                                            storedStats[type] = {};
                                          }
                                        });
                                         var previousStats = JSON.stringify(storedStats);
                                         this.getUsedVaadinElements(gatheredStats.elements);
                                        this.getFrameworks(gatheredStats.frameworks);
                                        this.getUsedVaadinThemes(gatheredStats.themes);
                                         var now = this.now;
                                        types.forEach(function (type) {
                                          var keys = Object.keys(gatheredStats[type]);
                                          keys.forEach(function (key) {
                                            if (!storedStats[type][key] || _typeof(storedStats[type][key]) != _typeof({})) {
                                              storedStats[type][key] = { firstUsed: now };
                                            }
                                            // Discards any previously logged version number
                                            storedStats[type][key].version = gatheredStats[type][key].version;
                                            storedStats[type][key].lastUsed = now;
                                          });
                                        });
                                         var newStats = JSON.stringify(storedStats);
                                        storage.write(newStats);
                                        if (newStats != previousStats && Object.keys(storedStats).length > 0) {
                                          this.logger.debug("New stats: " + newStats);
                                        }
                                      }
                                    }]);
                                    return StatisticsGatherer;
                                    }();
                                    var StatisticsStorage = function () {
                                    function StatisticsStorage(key) {
                                      classCallCheck(this, StatisticsStorage);
                                       this.key = key;
                                    }
                                     createClass(StatisticsStorage, [{
                                      key: 'read',
                                      value: function read() {
                                        var localStorageStatsString = localStorage.getItem(this.key);
                                        try {
                                          return JSON.parse(localStorageStatsString ? localStorageStatsString : '{}');
                                        } catch (e) {
                                          return {};
                                        }
                                      }
                                    }, {
                                      key: 'write',
                                      value: function write(data) {
                                        localStorage.setItem(this.key, data);
                                      }
                                    }, {
                                      key: 'clear',
                                      value: function clear() {
                                        localStorage.removeItem(this.key);
                                      }
                                    }, {
                                      key: 'isEmpty',
                                      value: function isEmpty() {
                                        var storedStats = this.read();
                                        var empty = true;
                                        Object.keys(storedStats).forEach(function (key) {
                                          if (Object.keys(storedStats[key]).length > 0) {
                                            empty = false;
                                          }
                                        });
                                         return empty;
                                      }
                                    }]);
                                    return StatisticsStorage;
                                    }();
                                    var StatisticsSender = function () {
                                    function StatisticsSender(url, logger) {
                                      classCallCheck(this, StatisticsSender);
                                       this.url = url;
                                      this.logger = logger;
                                    }
                                     createClass(StatisticsSender, [{
                                      key: 'send',
                                      value: function send(data, errorHandler) {
                                        var logger = this.logger;
                                         if (navigator.onLine === false) {
                                          logger.debug("Offline, can't send");
                                          errorHandler();
                                          return;
                                        }
                                        logger.debug("Sending data to " + this.url);
                                         var req = new XMLHttpRequest();
                                        req.withCredentials = true;
                                        req.addEventListener("load", function () {
                                          // Stats sent, nothing more to do
                                          logger.debug("Response: " + req.responseText);
                                        });
                                        req.addEventListener("error", function () {
                                          logger.debug("Send failed");
                                          errorHandler();
                                        });
                                        req.addEventListener("abort", function () {
                                          logger.debug("Send aborted");
                                          errorHandler();
                                        });
                                        req.open("POST", this.url);
                                        req.setRequestHeader("Content-Type", "application/json");
                                        req.send(data);
                                      }
                                    }]);
                                    return StatisticsSender;
                                    }();
                                    var StatisticsLogger = function () {
                                    function StatisticsLogger(id) {
                                      classCallCheck(this, StatisticsLogger);
                                       this.id = id;
                                    }
                                     createClass(StatisticsLogger, [{
                                      key: '_isDebug',
                                      value: function _isDebug() {
                                        return localStorage.getItem("vaadin." + this.id + ".debug");
                                      }
                                    }, {
                                      key: 'debug',
                                      value: function debug(msg) {
                                        if (this._isDebug()) {
                                          console.info(this.id + ": " + msg);
                                        }
                                      }
                                    }]);
                                    return StatisticsLogger;
                                    }();
                                    var UsageStatistics = function () {
                                    function UsageStatistics() {
                                      classCallCheck(this, UsageStatistics);
                                       this.now = new Date();
                                      this.timeNow = this.now.getTime();
                                      this.gatherDelay = 10; // Delay between loading this file and gathering stats
                                      this.initialDelay = 24 * 60 * 60;
                                       this.logger = new StatisticsLogger("statistics");
                                      this.storage = new StatisticsStorage("vaadin.statistics.basket");
                                      this.gatherer = new StatisticsGatherer(this.logger);
                                      this.sender = new StatisticsSender("https://tools.vaadin.com/usage-stats/submit", this.logger);
                                    }
                                     createClass(UsageStatistics, [{
                                      key: 'maybeGatherAndSend',
                                      value: function maybeGatherAndSend() {
                                        var _this = this;
                                         if (localStorage.getItem(UsageStatistics.optOutKey)) {
                                          return;
                                        }
                                        this.gatherer.gather(this.storage);
                                        setTimeout(function () {
                                          _this.maybeSend();
                                        }, this.gatherDelay * 1000);
                                      }
                                    }, {
                                      key: 'lottery',
                                      value: function lottery() {
                                        return Math.random() <= 0.05;
                                      }
                                    }, {
                                      key: 'currentMonth',
                                      value: function currentMonth() {
                                        return this.now.getYear() * 12 + this.now.getMonth();
                                      }
                                    }, {
                                      key: 'maybeSend',
                                      value: function maybeSend() {
                                        var firstUse = Number(localStorage.getItem(UsageStatistics.firstUseKey));
                                        var monthProcessed = Number(localStorage.getItem(UsageStatistics.monthProcessedKey));
                                         if (!firstUse) {
                                          // Use a grace period to avoid interfering with tests, incognito mode etc
                                          firstUse = this.timeNow;
                                          localStorage.setItem(UsageStatistics.firstUseKey, firstUse);
                                        }
                                         if (this.timeNow < firstUse + this.initialDelay * 1000) {
                                          this.logger.debug("No statistics will be sent until the initial delay of " + this.initialDelay + "s has passed");
                                          return;
                                        }
                                        if (this.currentMonth() <= monthProcessed) {
                                          this.logger.debug("This month has already been processed");
                                          return;
                                        }
                                        localStorage.setItem(UsageStatistics.monthProcessedKey, this.currentMonth());
                                        // Use random sampling
                                        if (this.lottery()) {
                                          this.logger.debug("Congratulations, we have a winner!");
                                        } else {
                                          this.logger.debug("Sorry, no stats from you this time");
                                          return;
                                        }
                                         this.send();
                                      }
                                    }, {
                                      key: 'send',
                                      value: function send() {
                                        // Ensure we have the latest data
                                        this.gatherer.gather(this.storage);
                                         // Read, send and clean up
                                        var data = this.storage.read();
                                        data["firstUse"] = Number(localStorage.getItem(UsageStatistics.firstUseKey));
                                        data["usageStatisticsVersion"] = UsageStatistics.version;
                                        var info = 'This request contains usage statistics gathered from the application running in development mode. \n\nStatistics gathering is automatically disabled and excluded from production builds.\n\nFor details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.\n\n\n\n';
                                        var self = this;
                                        this.sender.send(info + JSON.stringify(data), function () {
                                          // Revert the 'month processed' flag
                                          localStorage.setItem(UsageStatistics.monthProcessedKey, self.currentMonth() - 1);
                                        });
                                      }
                                    }], [{
                                      key: 'version',
                                      get: function get$1() {
                                        return '2.0.8';
                                      }
                                    }, {
                                      key: 'firstUseKey',
                                      get: function get$1() {
                                        return 'vaadin.statistics.firstuse';
                                      }
                                    }, {
                                      key: 'monthProcessedKey',
                                      get: function get$1() {
                                        return 'vaadin.statistics.monthProcessed';
                                      }
                                    }, {
                                      key: 'optOutKey',
                                      get: function get$1() {
                                        return 'vaadin.statistics.optout';
                                      }
                                    }]);
                                    return UsageStatistics;
                                    }();
                                    try {
                                    window.Vaadin = window.Vaadin || {};
                                    window.Vaadin.usageStatsChecker = window.Vaadin.usageStatsChecker || new UsageStatistics();
                                    window.Vaadin.usageStatsChecker.maybeGatherAndSend();
                                    } catch (e) {
                                    // Intentionally ignored as this is not a problem in the app being developed
                                    }
                                    }());
                                     vaadin-dev-mode:end **/}const usageStatistics=function(){if("function"===typeof runIfDevelopmentMode){return runIfDevelopmentMode(maybeGatherAndSendStats)}};_exports.usageStatistics=usageStatistics;var vaadinUsageStatistics={usageStatistics:usageStatistics};_exports.$vaadinUsageStatistics=vaadinUsageStatistics;if(!window.Vaadin){window.Vaadin={}}/**
   * Array of Vaadin custom element classes that have been finalized.
   */window.Vaadin.registrations=window.Vaadin.registrations||[];// Use the hack to prevent polymer-modulizer from converting to exports
window.Vaadin.developmentModeCallback=window.Vaadin.developmentModeCallback||{};window.Vaadin.developmentModeCallback["vaadin-usage-statistics"]=function(){if(usageStatistics){usageStatistics()}};let statsJob;/**
               * @polymerMixin
               */const ElementMixin=superClass=>class VaadinElementMixin extends superClass{/** @protected */static _finalizeClass(){super._finalizeClass();// Registers a class prototype for telemetry purposes.
if(this.is){window.Vaadin.registrations.push(this);if(window.Vaadin.developmentModeCallback){statsJob=_bbbbcSegmentTracker.Debouncer.debounce(statsJob,_bbbbcSegmentTracker.idlePeriod,()=>{window.Vaadin.developmentModeCallback["vaadin-usage-statistics"]()});(0,_bbbbcSegmentTracker.enqueueDebouncer)(statsJob)}}}ready(){super.ready();if(null===document.doctype){console.warn("Vaadin components require the \"standards mode\" declaration. Please add <!DOCTYPE html> to the HTML document.")}}};_exports.ElementMixin=ElementMixin;var vaadinElementMixin={ElementMixin:ElementMixin};_exports.$vaadinElementMixin=vaadinElementMixin;class CheckboxElement extends ElementMixin(ControlStateMixin(ThemableMixin((0,_bbbbcSegmentTracker.GestureEventListeners)(_bbbbcSegmentTracker.PolymerElement)))){static get template(){return _bbbbcSegmentTracker.html$1`
    <style>
      :host {
        display: inline-block;
      }

      :host([hidden]) {
        display: none !important;
      }

      label {
        display: inline-flex;
        align-items: baseline;
        outline: none;
      }

      [part="checkbox"] {
        position: relative;
        display: inline-block;
        flex: none;
      }

      input[type="checkbox"] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: inherit;
        margin: 0;
      }

      :host([disabled]) {
        -webkit-tap-highlight-color: transparent;
      }
    </style>

    <label>
      <span part="checkbox">
        <input type="checkbox" checked="{{checked::change}}" disabled\$="[[disabled]]" indeterminate="{{indeterminate::change}}" role="presentation" tabindex="-1">
      </span>

      <span part="label">
        <slot></slot>
      </span>
    </label>
`}static get is(){return"vaadin-checkbox"}static get version(){return"2.2.10"}static get properties(){return{/**
       * True if the checkbox is checked.
       */checked:{type:Boolean,value:!1,notify:!0,observer:"_checkedChanged",reflectToAttribute:!0},/**
       * Indeterminate state of the checkbox when it's neither checked nor unchecked, but undetermined.
       * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Indeterminate_state_checkboxes
       */indeterminate:{type:Boolean,notify:!0,observer:"_indeterminateChanged",reflectToAttribute:!0,value:!1},/**
       * The value given to the data submitted with the checkbox's name to the server when the control is inside a form.
       */value:{type:String,value:"on"},_nativeCheckbox:{type:Object}}}constructor(){super();/**
              * @type {string}
              * Name of the element.
              */this.name}get name(){return this.checked?this._storedName:""}set name(name){this._storedName=name}ready(){super.ready();this.setAttribute("role","checkbox");this._nativeCheckbox=this.shadowRoot.querySelector("input[type=\"checkbox\"]");this.addEventListener("click",this._handleClick.bind(this));this._addActiveListeners();const attrName=this.getAttribute("name");if(attrName){this.name=attrName}this.shadowRoot.querySelector("[part~=\"label\"]").querySelector("slot").addEventListener("slotchange",this._updateLabelAttribute.bind(this));this._updateLabelAttribute()}_updateLabelAttribute(){const label=this.shadowRoot.querySelector("[part~=\"label\"]"),assignedNodes=label.firstElementChild.assignedNodes();if(this._isAssignedNodesEmpty(assignedNodes)){label.setAttribute("empty","")}else{label.removeAttribute("empty")}}_isAssignedNodesEmpty(nodes){// The assigned nodes considered to be empty if there is no slotted content or only one empty text node
return 0===nodes.length||1==nodes.length&&nodes[0].nodeType==Node.TEXT_NODE&&""===nodes[0].textContent.trim()}_checkedChanged(checked){if(this.indeterminate){this.setAttribute("aria-checked","mixed")}else{this.setAttribute("aria-checked",checked)}}_indeterminateChanged(indeterminate){if(indeterminate){this.setAttribute("aria-checked","mixed")}else{this.setAttribute("aria-checked",this.checked)}}_addActiveListeners(){// DOWN
this._addEventListenerToNode(this,"down",e=>{if(this.__interactionsAllowed(e)){this.setAttribute("active","")}});// UP
this._addEventListenerToNode(this,"up",()=>this.removeAttribute("active"));// KEYDOWN
this.addEventListener("keydown",e=>{if(this.__interactionsAllowed(e)&&32===e.keyCode){e.preventDefault();this.setAttribute("active","")}});// KEYUP
this.addEventListener("keyup",e=>{if(this.__interactionsAllowed(e)&&32===e.keyCode){e.preventDefault();this._toggleChecked();this.removeAttribute("active");if(this.indeterminate){this.indeterminate=!1}}})}/** @protected */get focusElement(){return this.shadowRoot.querySelector("input")}/**
     * True if users' interactions (mouse or keyboard)
     * should toggle the checkbox
     */__interactionsAllowed(e){if(this.disabled){return!1}// https://github.com/vaadin/vaadin-checkbox/issues/63
if("a"===e.target.localName){return!1}return!0}_handleClick(e){if(this.__interactionsAllowed(e)){if(!this.indeterminate){if(e.composedPath()[0]!==this._nativeCheckbox){e.preventDefault();this._toggleChecked()}}else{/*
         * Required for IE 11 and Edge.
         * See issue here: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7344418/
         */this.indeterminate=!1;e.preventDefault();this._toggleChecked()}}}_toggleChecked(){this.checked=!this.checked;this.dispatchEvent(new CustomEvent("change",{composed:!1,bubbles:!0}))}/**
     * Fired when the user commits a value change.
     *
     * @event change
     */}_exports.CheckboxElement=CheckboxElement;customElements.define(CheckboxElement.is,CheckboxElement);var vaadinCheckbox={CheckboxElement:CheckboxElement};_exports.$vaadinCheckbox=vaadinCheckbox;class Lumo extends HTMLElement{static get version(){return"1.5.0"}}_exports.Lumo=Lumo;customElements.define("vaadin-lumo-styles",Lumo);var version={Lumo:Lumo};_exports.$version=version;const $_documentContainer=document.createElement("template");$_documentContainer.innerHTML=`<custom-style>
  <style>
    html {
      /* Base (background) */
      --lumo-base-color: #FFF;

      /* Tint */
      --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);
      --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);
      --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);
      --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);
      --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);
      --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);
      --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);
      --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);
      --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);
      --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);
      --lumo-tint: #FFF;

      /* Shade */
      --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);
      --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);
      --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);
      --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);
      --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);
      --lumo-shade-50pct: hsla(214, 45%, 20%, 0.5);
      --lumo-shade-60pct: hsla(214, 43%, 19%, 0.61);
      --lumo-shade-70pct: hsla(214, 42%, 18%, 0.72);
      --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);
      --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);
      --lumo-shade: hsl(214, 35%, 15%);

      /* Contrast */
      --lumo-contrast-5pct: var(--lumo-shade-5pct);
      --lumo-contrast-10pct: var(--lumo-shade-10pct);
      --lumo-contrast-20pct: var(--lumo-shade-20pct);
      --lumo-contrast-30pct: var(--lumo-shade-30pct);
      --lumo-contrast-40pct: var(--lumo-shade-40pct);
      --lumo-contrast-50pct: var(--lumo-shade-50pct);
      --lumo-contrast-60pct: var(--lumo-shade-60pct);
      --lumo-contrast-70pct: var(--lumo-shade-70pct);
      --lumo-contrast-80pct: var(--lumo-shade-80pct);
      --lumo-contrast-90pct: var(--lumo-shade-90pct);
      --lumo-contrast: var(--lumo-shade);

      /* Text */
      --lumo-header-text-color: var(--lumo-contrast);
      --lumo-body-text-color: var(--lumo-contrast-90pct);
      --lumo-secondary-text-color: var(--lumo-contrast-70pct);
      --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
      --lumo-disabled-text-color: var(--lumo-contrast-30pct);

      /* Primary */
      --lumo-primary-color: hsl(214, 90%, 52%);
      --lumo-primary-color-50pct: hsla(214, 90%, 52%, 0.5);
      --lumo-primary-color-10pct: hsla(214, 90%, 52%, 0.1);
      --lumo-primary-text-color: var(--lumo-primary-color);
      --lumo-primary-contrast-color: #FFF;

      /* Error */
      --lumo-error-color: hsl(3, 100%, 61%);
      --lumo-error-color-50pct: hsla(3, 100%, 60%, 0.5);
      --lumo-error-color-10pct: hsla(3, 100%, 60%, 0.1);
      --lumo-error-text-color: hsl(3, 92%, 53%);
      --lumo-error-contrast-color: #FFF;

      /* Success */
      --lumo-success-color: hsl(145, 80%, 42%); /* hsl(144,82%,37%); */
      --lumo-success-color-50pct: hsla(145, 76%, 44%, 0.55);
      --lumo-success-color-10pct: hsla(145, 76%, 44%, 0.12);
      --lumo-success-text-color: hsl(145, 100%, 32%);
      --lumo-success-contrast-color: #FFF;
    }
  </style>
</custom-style><dom-module id="lumo-color">
  <template>
    <style>
      [theme~="dark"] {
        /* Base (background) */
        --lumo-base-color: hsl(214, 35%, 21%);

        /* Tint */
        --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);
        --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);
        --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);
        --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);
        --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);
        --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);
        --lumo-tint-60pct: hsla(214, 82%, 90%, 0.6);
        --lumo-tint-70pct: hsla(214, 87%, 92%, 0.7);
        --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);
        --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);
        --lumo-tint: hsl(214, 100%, 98%);

        /* Shade */
        --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);
        --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);
        --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);
        --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);
        --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);
        --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);
        --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);
        --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);
        --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);
        --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);
        --lumo-shade: hsl(214, 33%, 13%);

        /* Contrast */
        --lumo-contrast-5pct: var(--lumo-tint-5pct);
        --lumo-contrast-10pct: var(--lumo-tint-10pct);
        --lumo-contrast-20pct: var(--lumo-tint-20pct);
        --lumo-contrast-30pct: var(--lumo-tint-30pct);
        --lumo-contrast-40pct: var(--lumo-tint-40pct);
        --lumo-contrast-50pct: var(--lumo-tint-50pct);
        --lumo-contrast-60pct: var(--lumo-tint-60pct);
        --lumo-contrast-70pct: var(--lumo-tint-70pct);
        --lumo-contrast-80pct: var(--lumo-tint-80pct);
        --lumo-contrast-90pct: var(--lumo-tint-90pct);
        --lumo-contrast: var(--lumo-tint);

        /* Text */
        --lumo-header-text-color: var(--lumo-contrast);
        --lumo-body-text-color: var(--lumo-contrast-90pct);
        --lumo-secondary-text-color: var(--lumo-contrast-70pct);
        --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
        --lumo-disabled-text-color: var(--lumo-contrast-30pct);

        /* Primary */
        --lumo-primary-color: hsl(214, 86%, 55%);
        --lumo-primary-color-50pct: hsla(214, 86%, 55%, 0.5);
        --lumo-primary-color-10pct: hsla(214, 90%, 63%, 0.1);
        --lumo-primary-text-color: hsl(214, 100%, 70%);
        --lumo-primary-contrast-color: #FFF;

        /* Error */
        --lumo-error-color: hsl(3, 90%, 63%);
        --lumo-error-color-50pct: hsla(3, 90%, 63%, 0.5);
        --lumo-error-color-10pct: hsla(3, 90%, 63%, 0.1);
        --lumo-error-text-color: hsl(3, 100%, 67%);

        /* Success */
        --lumo-success-color: hsl(145, 65%, 42%);
        --lumo-success-color-50pct: hsla(145, 65%, 42%, 0.5);
        --lumo-success-color-10pct: hsla(145, 65%, 42%, 0.1);
        --lumo-success-text-color: hsl(145, 85%, 47%);
      }

      html {
        color: var(--lumo-body-text-color);
        background-color: var(--lumo-base-color);
      }

      [theme~="dark"] {
        color: var(--lumo-body-text-color);
        background-color: var(--lumo-base-color);
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: var(--lumo-header-text-color);
      }

      a {
        color: var(--lumo-primary-text-color);
      }

      blockquote {
        color: var(--lumo-secondary-text-color);
      }

      code,
      pre {
        background-color: var(--lumo-contrast-10pct);
        border-radius: var(--lumo-border-radius-m);
      }
    </style>
  </template>
</dom-module><dom-module id="lumo-color-legacy">
  <template>
    <style include="lumo-color">
      :host {
        color: var(--lumo-body-text-color) !important;
        background-color: var(--lumo-base-color) !important;
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer.content);/* Only needed for IE11 when you want to use the dark palette inside the light palette */ /*
                                                                                                                                                    FIXME(polymer-modulizer): the above comments were extracted
                                                                                                                                                    from HTML and may be out of place here. Review them and
                                                                                                                                                    then delete this comment!
                                                                                                                                                  */;const $_documentContainer$1=document.createElement("template");$_documentContainer$1.innerHTML=`<custom-style>
  <style>
    html {
      /* Border radius */
      --lumo-border-radius-s: 0.25em; /* Checkbox, badge, date-picker year indicator, etc */
      --lumo-border-radius-m: var(--lumo-border-radius, 0.25em); /* Button, text field, menu overlay, etc */
      --lumo-border-radius-l: 0.5em; /* Dialog, notification, etc */
      --lumo-border-radius: 0.25em; /* Deprecated */

      /* Shadow */
      --lumo-box-shadow-xs: 0 1px 4px -1px var(--lumo-shade-50pct);
      --lumo-box-shadow-s: 0 2px 4px -1px var(--lumo-shade-20pct), 0 3px 12px -1px var(--lumo-shade-30pct);
      --lumo-box-shadow-m: 0 2px 6px -1px var(--lumo-shade-20pct), 0 8px 24px -4px var(--lumo-shade-40pct);
      --lumo-box-shadow-l: 0 3px 18px -2px var(--lumo-shade-20pct), 0 12px 48px -6px var(--lumo-shade-40pct);
      --lumo-box-shadow-xl: 0 4px 24px -3px var(--lumo-shade-20pct), 0 18px 64px -8px var(--lumo-shade-40pct);

      /* Clickable element cursor */
      --lumo-clickable-cursor: default;
    }
  </style>
</custom-style>`;document.head.appendChild($_documentContainer$1.content);const $_documentContainer$2=_bbbbcSegmentTracker.html$1`<dom-module id="lumo-checkbox" theme-for="vaadin-checkbox">
  <template>
    <style include="lumo-checkbox-style lumo-checkbox-effects">
      /* IE11 only */
      ::-ms-backdrop,
      [part="checkbox"] {
        line-height: 1;
      }
    </style>
  </template>
</dom-module><dom-module id="lumo-checkbox-style">
  <template>
    <style>
      :host {
        -webkit-tap-highlight-color: transparent;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: default;
        outline: none;
      }

      [part="label"]:not([empty]) {
        margin: 0.1875em 0.875em 0.1875em 0.375em;
      }

      [part="checkbox"] {
        width: calc(1em + 2px);
        height: calc(1em + 2px);
        margin: 0.1875em;
        position: relative;
        border-radius: var(--lumo-border-radius);
        background-color: var(--lumo-contrast-20pct);
        transition: transform 0.2s cubic-bezier(.12, .32, .54, 2), background-color 0.15s;
        pointer-events: none;
        line-height: 1.2;
      }

      :host([indeterminate]) [part="checkbox"],
      :host([checked]) [part="checkbox"] {
        background-color: var(--lumo-primary-color);
      }

      /* Needed to align the checkbox nicely on the baseline */
      [part="checkbox"]::before {
        content: "\\2003";
      }

      /* Checkmark */
      [part="checkbox"]::after {
        content: "";
        display: inline-block;
        width: 0;
        height: 0;
        border: 0 solid var(--lumo-primary-contrast-color);
        border-width: 0.1875em 0 0 0.1875em;
        box-sizing: border-box;
        transform-origin: 0 0;
        position: absolute;
        top: 0.8125em;
        left: 0.5em;
        transform: scale(0.55) rotate(-135deg);
        opacity: 0;
      }

      :host([checked]) [part="checkbox"]::after {
        opacity: 1;
        width: 0.625em;
        height: 1.0625em;
      }

      /* Indeterminate checkmark */

      :host([indeterminate]) [part="checkbox"]::after {
        transform: none;
        opacity: 1;
        top: 45%;
        height: 10%;
        left: 22%;
        right: 22%;
        width: auto;
        border: 0;
        background-color: var(--lumo-primary-contrast-color);
        transition: opacity 0.25s;
      }

      /* Focus ring */

      :host([focus-ring]) [part="checkbox"] {
        box-shadow: 0 0 0 3px var(--lumo-primary-color-50pct);
      }

      /* Disabled */

      :host([disabled]) {
        pointer-events: none;
        color: var(--lumo-disabled-text-color);
      }

      :host([disabled]) [part="label"] ::slotted(*) {
        color: inherit;
      }

      :host([disabled]) [part="checkbox"] {
        background-color: var(--lumo-contrast-10pct);
      }

      :host([disabled]) [part="checkbox"]::after {
        border-color: var(--lumo-contrast-30pct);
      }

      :host([indeterminate][disabled]) [part="checkbox"]::after {
        background-color: var(--lumo-contrast-30pct);
      }
    </style>
  </template>
</dom-module><dom-module id="lumo-checkbox-effects">
  <template>
    <style>
      /* Transition the checkmark if activated with the mouse (disabled for grid select-all this way) */
      :host(:hover) [part="checkbox"]::after {
        transition: width 0.1s, height 0.25s;
      }

      /* Used for activation "halo" */
      [part="checkbox"]::before {
        color: transparent;
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background-color: inherit;
        transform: scale(1.4);
        opacity: 0;
        transition: transform 0.1s, opacity 0.8s;
      }

      /* Hover */

      :host(:not([checked]):not([indeterminate]):not([disabled]):hover) [part="checkbox"] {
        background-color: var(--lumo-contrast-30pct);
      }

      /* Disable hover for touch devices */
      @media (pointer: coarse) {
        :host(:not([checked]):not([indeterminate]):not([disabled]):hover) [part="checkbox"] {
          background-color: var(--lumo-contrast-20pct);
        }
      }

      /* Active */

      :host([active]) [part="checkbox"] {
        transform: scale(0.9);
        transition-duration: 0.05s;
      }

      :host([active][checked]) [part="checkbox"] {
        transform: scale(1.1);
      }

      :host([active]:not([checked])) [part="checkbox"]::before {
        transition-duration: 0.01s, 0.01s;
        transform: scale(0);
        opacity: 0.4;
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer$2.content);var IOS=navigator.userAgent.match(/iP(?:hone|ad;(?: U;)? CPU) OS (\d+)/),IOS_TOUCH_SCROLLING=IOS&&8<=IOS[1],DEFAULT_PHYSICAL_COUNT=3,ANIMATION_FRAME=_bbbbcSegmentTracker.animationFrame,IDLE_TIME=_bbbbcSegmentTracker.idlePeriod,MICRO_TASK=_bbbbcSegmentTracker.microTask;const PolymerIronList=(0,_bbbbcSegmentTracker.Class)({behaviors:[_bbbbcSegmentTracker.IronResizableBehavior,_bbbbcSegmentTracker.IronScrollTargetBehavior],/**
   * The ratio of hidden tiles that should remain in the scroll direction.
   * Recommended value ~0.5, so it will distribute tiles evenly in both directions.
   */_ratio:.5,/**
   * The padding-top value for the list.
   */_scrollerPaddingTop:0,/**
   * This value is the same as `scrollTop`.
   */_scrollPosition:0,/**
   * The sum of the heights of all the tiles in the DOM.
   */_physicalSize:0,/**
   * The average `offsetHeight` of the tiles observed till now.
   */_physicalAverage:0,/**
   * The number of tiles which `offsetHeight` > 0 observed until now.
   */_physicalAverageCount:0,/**
   * The Y position of the item rendered in the `_physicalStart`
   * tile relative to the scrolling list.
   */_physicalTop:0,/**
   * The number of items in the list.
   */_virtualCount:0,/**
   * The estimated scroll height based on `_physicalAverage`
   */_estScrollHeight:0,/**
   * The scroll height of the dom node
   */_scrollHeight:0,/**
   * The height of the list. This is referred as the viewport in the context of list.
   */_viewportHeight:0,/**
   * The width of the list. This is referred as the viewport in the context of list.
   */_viewportWidth:0,/**
   * An array of DOM nodes that are currently in the tree
   * @type {?Array<!TemplatizerNode>}
   */_physicalItems:null,/**
   * An array of heights for each item in `_physicalItems`
   * @type {?Array<number>}
   */_physicalSizes:null,/**
   * A cached value for the first visible index.
   * See `firstVisibleIndex`
   * @type {?number}
   */_firstVisibleIndexVal:null,/**
   * A Polymer collection for the items.
   * @type {?Polymer.Collection}
   */_collection:null,/**
   * A cached value for the last visible index.
   * See `lastVisibleIndex`
   * @type {?number}
   */_lastVisibleIndexVal:null,/**
   * The max number of pages to render. One page is equivalent to the height of the list.
   */_maxPages:2,/**
   * The virtual index of the focused item.
   */_focusedVirtualIndex:-1,/**
   * The maximum items per row
   */_itemsPerRow:1,/**
   * The height of the row in grid layout.
   */_rowHeight:0,/**
   * The cost of stamping a template in ms.
   */_templateCost:0,/**
   * The bottom of the physical content.
   */get _physicalBottom(){return this._physicalTop+this._physicalSize},/**
   * The bottom of the scroll.
   */get _scrollBottom(){return this._scrollPosition+this._viewportHeight},/**
   * The n-th item rendered in the last physical item.
   */get _virtualEnd(){return this._virtualStart+this._physicalCount-1},/**
   * The height of the physical content that isn't on the screen.
   */get _hiddenContentSize(){var size=this.grid?this._physicalRows*this._rowHeight:this._physicalSize;return size-this._viewportHeight},/**
   * The maximum scroll top value.
   */get _maxScrollTop(){return this._estScrollHeight-this._viewportHeight+this._scrollOffset},/**
   * The largest n-th value for an item such that it can be rendered in `_physicalStart`.
   */get _maxVirtualStart(){var virtualCount=this._convertIndexToCompleteRow(this._virtualCount);return Math.max(0,virtualCount-this._physicalCount)},set _virtualStart(val){val=this._clamp(val,0,this._maxVirtualStart);if(this.grid){val=val-val%this._itemsPerRow}this._virtualStartVal=val},get _virtualStart(){return this._virtualStartVal||0},/**
   * The k-th tile that is at the top of the scrolling list.
   */set _physicalStart(val){val=val%this._physicalCount;if(0>val){val=this._physicalCount+val}if(this.grid){val=val-val%this._itemsPerRow}this._physicalStartVal=val},get _physicalStart(){return this._physicalStartVal||0},/**
   * The k-th tile that is at the bottom of the scrolling list.
   */get _physicalEnd(){return(this._physicalStart+this._physicalCount-1)%this._physicalCount},set _physicalCount(val){this._physicalCountVal=val},get _physicalCount(){return this._physicalCountVal||0},/**
   * An optimal physical size such that we will have enough physical items
   * to fill up the viewport and recycle when the user scrolls.
   *
   * This default value assumes that we will at least have the equivalent
   * to a viewport of physical items above and below the user's viewport.
   */get _optPhysicalSize(){return 0===this._viewportHeight?1/0:this._viewportHeight*this._maxPages},/**
   * True if the current list is visible.
   */get _isVisible(){return!!(this.offsetWidth||this.offsetHeight)},/**
   * Gets the index of the first visible item in the viewport.
   *
   * @type {number}
   */get firstVisibleIndex(){var idx=this._firstVisibleIndexVal;if(null==idx){var physicalOffset=this._physicalTop+this._scrollOffset;idx=this._iterateItems(function(pidx,vidx){physicalOffset+=this._getPhysicalSizeIncrement(pidx);if(physicalOffset>this._scrollPosition){return this.grid?vidx-vidx%this._itemsPerRow:vidx}// Handle a partially rendered final row in grid mode
if(this.grid&&this._virtualCount-1===vidx){return vidx-vidx%this._itemsPerRow}})||0;this._firstVisibleIndexVal=idx}return idx},/**
   * Gets the index of the last visible item in the viewport.
   *
   * @type {number}
   */get lastVisibleIndex(){var idx=this._lastVisibleIndexVal;if(null==idx){if(this.grid){idx=Math.min(this._virtualCount,this.firstVisibleIndex+this._estRowsInView*this._itemsPerRow-1)}else{var physicalOffset=this._physicalTop+this._scrollOffset;this._iterateItems(function(pidx,vidx){if(physicalOffset<this._scrollBottom){idx=vidx}physicalOffset+=this._getPhysicalSizeIncrement(pidx)})}this._lastVisibleIndexVal=idx}return idx},get _scrollOffset(){return this._scrollerPaddingTop},attached:function(){this._debounce("_render",this._render,ANIMATION_FRAME);// `iron-resize` is fired when the list is attached if the event is added
// before attached causing unnecessary work.
this.listen(this,"iron-resize","_resizeHandler")},detached:function(){this.unlisten(this,"iron-resize","_resizeHandler")},/**
   * Invoke this method if you dynamically update the viewport's
   * size or CSS padding.
   *
   * @method updateViewportBoundaries
   */updateViewportBoundaries:function(){var styles=window.getComputedStyle(this);this._scrollerPaddingTop=this.scrollTarget===this?0:parseInt(styles["padding-top"],10);this._isRTL=!!("rtl"===styles.direction);this._viewportWidth=this.$.items.offsetWidth;this._viewportHeight=this._scrollTargetHeight;this.grid&&this._updateGridMetrics()},/**
   * Recycles the physical items when needed.
   */_scrollHandler:function(){var scrollTop=Math.max(0,Math.min(this._maxScrollTop,this._scrollTop)),delta=scrollTop-this._scrollPosition,isScrollingDown=0<=delta;// Track the current scroll position.
this._scrollPosition=scrollTop;// Clear indexes for first and last visible indexes.
this._firstVisibleIndexVal=null;this._lastVisibleIndexVal=null;// Random access.
if(Math.abs(delta)>this._physicalSize&&0<this._physicalSize){delta=delta-this._scrollOffset;var idxAdjustment=Math.round(delta/this._physicalAverage)*this._itemsPerRow;this._virtualStart=this._virtualStart+idxAdjustment;this._physicalStart=this._physicalStart+idxAdjustment;// Estimate new physical offset.
this._physicalTop=Math.floor(this._virtualStart/this._itemsPerRow)*this._physicalAverage;this._update()}else if(0<this._physicalCount){var reusables=this._getReusables(isScrollingDown);if(isScrollingDown){this._physicalTop=reusables.physicalTop;this._virtualStart=this._virtualStart+reusables.indexes.length;this._physicalStart=this._physicalStart+reusables.indexes.length}else{this._virtualStart=this._virtualStart-reusables.indexes.length;this._physicalStart=this._physicalStart-reusables.indexes.length}this._update(reusables.indexes,isScrollingDown?null:reusables.indexes);this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,0),MICRO_TASK)}},/**
   * Returns an object that contains the indexes of the physical items
   * that might be reused and the physicalTop.
   *
   * @param {boolean} fromTop If the potential reusable items are above the scrolling region.
   */_getReusables:function(fromTop){var ith,offsetContent,physicalItemHeight,idxs=[],protectedOffsetContent=this._hiddenContentSize*this._ratio,virtualStart=this._virtualStart,virtualEnd=this._virtualEnd,physicalCount=this._physicalCount,top=this._physicalTop+this._scrollOffset,bottom=this._physicalBottom+this._scrollOffset,scrollTop=this._scrollTop,scrollBottom=this._scrollBottom;if(fromTop){ith=this._physicalStart;offsetContent=scrollTop-top}else{ith=this._physicalEnd;offsetContent=bottom-scrollBottom}// eslint-disable-next-line no-constant-condition
while(!0){physicalItemHeight=this._getPhysicalSizeIncrement(ith);offsetContent=offsetContent-physicalItemHeight;if(idxs.length>=physicalCount||offsetContent<=protectedOffsetContent){break}if(fromTop){// Check that index is within the valid range.
if(virtualEnd+idxs.length+1>=this._virtualCount){break}// Check that the index is not visible.
if(top+physicalItemHeight>=scrollTop-this._scrollOffset){break}idxs.push(ith);top=top+physicalItemHeight;ith=(ith+1)%physicalCount}else{// Check that index is within the valid range.
if(0>=virtualStart-idxs.length){break}// Check that the index is not visible.
if(top+this._physicalSize-physicalItemHeight<=scrollBottom){break}idxs.push(ith);top=top-physicalItemHeight;ith=0===ith?physicalCount-1:ith-1}}return{indexes:idxs,physicalTop:top-this._scrollOffset}},/**
   * Update the list of items, starting from the `_virtualStart` item.
   * @param {!Array<number>=} itemSet
   * @param {!Array<number>=} movingUp
   */_update:function(itemSet,movingUp){if(itemSet&&0===itemSet.length||0===this._physicalCount){return}this._manageFocus();this._assignModels(itemSet);this._updateMetrics(itemSet);// Adjust offset after measuring.
if(movingUp){while(movingUp.length){var idx=movingUp.pop();this._physicalTop-=this._getPhysicalSizeIncrement(idx)}}this._positionItems();this._updateScrollerSize()},_isClientFull:function(){return 0!=this._scrollBottom&&this._physicalBottom-1>=this._scrollBottom&&this._physicalTop<=this._scrollPosition},/**
   * Increases the pool size.
   */_increasePoolIfNeeded:function(count){var nextPhysicalCount=this._clamp(this._physicalCount+count,DEFAULT_PHYSICAL_COUNT,this._virtualCount-this._virtualStart);nextPhysicalCount=this._convertIndexToCompleteRow(nextPhysicalCount);var delta=nextPhysicalCount-this._physicalCount,nextIncrease=Math.round(.5*this._physicalCount);if(0>delta){return}if(0<delta){var ts=window.performance.now();// Concat arrays in place.
[].push.apply(this._physicalItems,this._createPool(delta));// Push 0s into physicalSizes. Can't use Array.fill because IE11 doesn't support it.
for(var i=0;i<delta;i++){this._physicalSizes.push(0)}this._physicalCount=this._physicalCount+delta;// Update the physical start if it needs to preserve the model of the focused item.
// In this situation, the focused item is currently rendered and its model would
// have changed after increasing the pool if the physical start remained unchanged.
if(this._physicalStart>this._physicalEnd&&this._isIndexRendered(this._focusedVirtualIndex)&&this._getPhysicalIndex(this._focusedVirtualIndex)<this._physicalEnd){this._physicalStart=this._physicalStart+delta}this._update();this._templateCost=(window.performance.now()-ts)/delta;nextIncrease=Math.round(.5*this._physicalCount)}// The upper bounds is not fixed when dealing with a grid that doesn't
// fill it's last row with the exact number of items per row.
if(this._virtualEnd>=this._virtualCount-1||0===nextIncrease){// Do nothing.
}else if(!this._isClientFull()){this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,nextIncrease),MICRO_TASK)}else if(this._physicalSize<this._optPhysicalSize){// Yield and increase the pool during idle time until the physical size is optimal.
this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,this._clamp(Math.round(50/this._templateCost),1,nextIncrease)),IDLE_TIME)}},/**
   * Renders the a new list.
   */_render:function(){if(!this.isAttached||!this._isVisible){return}if(0!==this._physicalCount){var reusables=this._getReusables(!0);this._physicalTop=reusables.physicalTop;this._virtualStart=this._virtualStart+reusables.indexes.length;this._physicalStart=this._physicalStart+reusables.indexes.length;this._update(reusables.indexes);this._update();this._increasePoolIfNeeded(0)}else if(0<this._virtualCount){// Initial render
this.updateViewportBoundaries();this._increasePoolIfNeeded(DEFAULT_PHYSICAL_COUNT)}},/**
   * Called when the items have changed. That is, reassignments
   * to `items`, splices or updates to a single item.
   */_itemsChanged:function(change){if("items"===change.path){this._virtualStart=0;this._physicalTop=0;this._virtualCount=this.items?this.items.length:0;this._collection=this.items&&void 0?(void 0).get(this.items):null;this._physicalIndexForKey={};this._firstVisibleIndexVal=null;this._lastVisibleIndexVal=null;this._physicalCount=this._physicalCount||0;this._physicalItems=this._physicalItems||[];this._physicalSizes=this._physicalSizes||[];this._physicalStart=0;if(this._scrollTop>this._scrollOffset){this._resetScrollPosition(0)}this._removeFocusedItem();this._debounce("_render",this._render,ANIMATION_FRAME)}},/**
   * Executes a provided function per every physical index in `itemSet`
   * `itemSet` default value is equivalent to the entire set of physical indexes.
   *
   * @param {!function(number, number)} fn
   * @param {!Array<number>=} itemSet
   */_iterateItems:function(fn,itemSet){var pidx,vidx,rtn,i;if(2===arguments.length&&itemSet){for(i=0;i<itemSet.length;i++){pidx=itemSet[i];vidx=this._computeVidx(pidx);if(null!=(rtn=fn.call(this,pidx,vidx))){return rtn}}}else{pidx=this._physicalStart;vidx=this._virtualStart;for(;pidx<this._physicalCount;pidx++,vidx++){if(null!=(rtn=fn.call(this,pidx,vidx))){return rtn}}for(pidx=0;pidx<this._physicalStart;pidx++,vidx++){if(null!=(rtn=fn.call(this,pidx,vidx))){return rtn}}}},/**
   * Returns the virtual index for a given physical index
   *
   * @param {number} pidx Physical index
   * @return {number}
   */_computeVidx:function(pidx){if(pidx>=this._physicalStart){return this._virtualStart+(pidx-this._physicalStart)}return this._virtualStart+(this._physicalCount-this._physicalStart)+pidx},/**
   * Updates the height for a given set of items.
   *
   * @param {!Array<number>=} itemSet
   */_updateMetrics:function(itemSet){// Make sure we distributed all the physical items
// so we can measure them.
_bbbbcSegmentTracker.flush?(0,_bbbbcSegmentTracker.flush)():(0,_bbbbcSegmentTracker.flush$1)();var newPhysicalSize=0,oldPhysicalSize=0,prevAvgCount=this._physicalAverageCount,prevPhysicalAvg=this._physicalAverage;this._iterateItems(function(pidx,vidx){oldPhysicalSize+=this._physicalSizes[pidx];this._physicalSizes[pidx]=this._physicalItems[pidx].offsetHeight;newPhysicalSize+=this._physicalSizes[pidx];this._physicalAverageCount+=this._physicalSizes[pidx]?1:0},itemSet);if(this.grid){this._updateGridMetrics();this._physicalSize=Math.ceil(this._physicalCount/this._itemsPerRow)*this._rowHeight}else{oldPhysicalSize=1===this._itemsPerRow?oldPhysicalSize:Math.ceil(this._physicalCount/this._itemsPerRow)*this._rowHeight;this._physicalSize=this._physicalSize+newPhysicalSize-oldPhysicalSize;this._itemsPerRow=1}// Update the average if it measured something.
if(this._physicalAverageCount!==prevAvgCount){this._physicalAverage=Math.round((prevPhysicalAvg*prevAvgCount+newPhysicalSize)/this._physicalAverageCount)}},/**
   * Updates the position of the physical items.
   */_positionItems:function(){this._adjustScrollPosition();var y=this._physicalTop;this._iterateItems(function(pidx,vidx){this.translate3d(0,y+"px",0,this._physicalItems[pidx]);y+=this._physicalSizes[pidx]})},_getPhysicalSizeIncrement:function(pidx){if(!this.grid){return this._physicalSizes[pidx]}if(this._computeVidx(pidx)%this._itemsPerRow!==this._itemsPerRow-1){return 0}return this._rowHeight},/**
   * Adjusts the scroll position when it was overestimated.
   */_adjustScrollPosition:function(){var deltaHeight=0===this._virtualStart?this._physicalTop:Math.min(this._scrollPosition+this._physicalTop,0);// Note: the delta can be positive or negative.
if(0!==deltaHeight){this._physicalTop=this._physicalTop-deltaHeight;var scrollTop=this._scrollTop;// juking scroll position during interial scrolling on iOS is no bueno
if(!IOS_TOUCH_SCROLLING&&0<scrollTop){this._resetScrollPosition(scrollTop-deltaHeight)}}},/**
   * Sets the position of the scroll.
   */_resetScrollPosition:function(pos){if(this.scrollTarget&&0<=pos){this._scrollTop=pos;this._scrollPosition=this._scrollTop}},/**
   * Sets the scroll height, that's the height of the content,
   *
   * @param {boolean=} forceUpdate If true, updates the height no matter what.
   */_updateScrollerSize:function(forceUpdate){if(this.grid){this._estScrollHeight=this._virtualRowCount*this._rowHeight}else{this._estScrollHeight=this._physicalBottom+Math.max(this._virtualCount-this._physicalCount-this._virtualStart,0)*this._physicalAverage}forceUpdate=forceUpdate||0===this._scrollHeight;forceUpdate=forceUpdate||this._scrollPosition>=this._estScrollHeight-this._physicalSize;forceUpdate=forceUpdate||this.grid&&this.$.items.style.height<this._estScrollHeight;// Amortize height adjustment, so it won't trigger large repaints too often.
if(forceUpdate||Math.abs(this._estScrollHeight-this._scrollHeight)>=this._viewportHeight){this.$.items.style.height=this._estScrollHeight+"px";this._scrollHeight=this._estScrollHeight}},/**
   * Scroll to a specific index in the virtual list regardless
   * of the physical items in the DOM tree.
   *
   * @method scrollToIndex
   * @param {number} idx The index of the item
   */scrollToIndex:function(idx){if("number"!==typeof idx||0>idx||idx>this.items.length-1){return}_bbbbcSegmentTracker.flush?(0,_bbbbcSegmentTracker.flush)():(0,_bbbbcSegmentTracker.flush$1)();// Items should have been rendered prior scrolling to an index.
if(0===this._physicalCount){return}idx=this._clamp(idx,0,this._virtualCount-1);// Update the virtual start only when needed.
if(!this._isIndexRendered(idx)||idx>=this._maxVirtualStart){this._virtualStart=this.grid?idx-2*this._itemsPerRow:idx-1}this._manageFocus();this._assignModels();this._updateMetrics();// Estimate new physical offset.
this._physicalTop=Math.floor(this._virtualStart/this._itemsPerRow)*this._physicalAverage;var currentTopItem=this._physicalStart,currentVirtualItem=this._virtualStart,targetOffsetTop=0,hiddenContentSize=this._hiddenContentSize;// scroll to the item as much as we can.
while(currentVirtualItem<idx&&targetOffsetTop<=hiddenContentSize){targetOffsetTop=targetOffsetTop+this._getPhysicalSizeIncrement(currentTopItem);currentTopItem=(currentTopItem+1)%this._physicalCount;currentVirtualItem++}this._updateScrollerSize(!0);this._positionItems();this._resetScrollPosition(this._physicalTop+this._scrollOffset+targetOffsetTop);this._increasePoolIfNeeded(0);// clear cached visible index.
this._firstVisibleIndexVal=null;this._lastVisibleIndexVal=null},/**
   * Reset the physical average and the average count.
   */_resetAverage:function(){this._physicalAverage=0;this._physicalAverageCount=0},/**
   * A handler for the `iron-resize` event triggered by `IronResizableBehavior`
   * when the element is resized.
   */_resizeHandler:function(){this._debounce("_render",function(){// clear cached visible index.
this._firstVisibleIndexVal=null;this._lastVisibleIndexVal=null;// Skip the resize event on touch devices when the address bar slides up.
this.updateViewportBoundaries();if(this._isVisible){// Reinstall the scroll event listener.
this.toggleScrollListener(!0);this._resetAverage();this._render()}else{// Uninstall the scroll event listener.
this.toggleScrollListener(!1)}},ANIMATION_FRAME)},/**
   * Converts a random index to the index of the item that completes it's row.
   * Allows for better order and fill computation when grid == true.
   */_convertIndexToCompleteRow:function(idx){// when grid == false _itemPerRow can be unset.
this._itemsPerRow=this._itemsPerRow||1;return this.grid?Math.ceil(idx/this._itemsPerRow)*this._itemsPerRow:idx},_isIndexRendered:function(idx){return idx>=this._virtualStart&&idx<=this._virtualEnd},_getPhysicalIndex:function(vidx){return(this._physicalStart+(vidx-this._virtualStart))%this._physicalCount},_clamp:function(v,min,max){return Math.min(max,Math.max(min,v))},_debounce:function(name,cb,asyncModule){this._debouncers=this._debouncers||{};this._debouncers[name]=_bbbbcSegmentTracker.Debouncer.debounce(this._debouncers[name],asyncModule,cb.bind(this));(0,_bbbbcSegmentTracker.enqueueDebouncer)(this._debouncers[name])}});_exports.PolymerIronList=PolymerIronList;var ironList={PolymerIronList:PolymerIronList};/**
   @license
   Copyright (c) 2017 Vaadin Ltd.
   This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   */ /**
       * @polymerMixin
       */_exports.$ironList=ironList;const A11yMixin=superClass=>class A11yMixin extends superClass{static get observers(){return["_a11yUpdateGridSize(size, _columnTree, _columnTree.*)"]}_a11yGetHeaderRowCount(_columnTree){return _columnTree.filter(level=>level.some(col=>col._headerTemplate||col.headerRenderer||col.path||col.header)).length}_a11yGetFooterRowCount(_columnTree){return _columnTree.filter(level=>level.some(col=>col._headerTemplate||col.headerRenderer)).length}_a11yUpdateGridSize(size,_columnTree){if(size===void 0||_columnTree===void 0){return}const bodyColumns=_columnTree[_columnTree.length-1];this.$.table.setAttribute("aria-rowcount",size+this._a11yGetHeaderRowCount(_columnTree)+this._a11yGetFooterRowCount(_columnTree));this.$.table.setAttribute("aria-colcount",bodyColumns&&bodyColumns.length||0);this._a11yUpdateHeaderRows();this._a11yUpdateFooterRows()}_a11yUpdateHeaderRows(){Array.from(this.$.header.children).forEach((headerRow,index)=>headerRow.setAttribute("aria-rowindex",index+1))}_a11yUpdateFooterRows(){Array.from(this.$.footer.children).forEach((footerRow,index)=>footerRow.setAttribute("aria-rowindex",this._a11yGetHeaderRowCount(this._columnTree)+this.size+index+1))}_a11yUpdateRowRowindex(row,index){row.setAttribute("aria-rowindex",index+this._a11yGetHeaderRowCount(this._columnTree)+1)}_a11yUpdateRowSelected(row,selected){// Jaws reads selection only for rows, NVDA only for cells
row.setAttribute("aria-selected",!!selected);Array.from(row.children).forEach(cell=>cell.setAttribute("aria-selected",!!selected))}_a11yUpdateRowLevel(row,level){row.setAttribute("aria-level",level+1)}_a11yUpdateRowDetailsOpened(row,detailsOpened){Array.from(row.children).forEach(cell=>{if("boolean"===typeof detailsOpened){cell.setAttribute("aria-expanded",detailsOpened)}else{if(cell.hasAttribute("aria-expanded")){cell.removeAttribute("aria-expanded")}}})}_a11ySetRowDetailsCell(row,detailsCell){Array.from(row.children).forEach(cell=>{if(cell!==detailsCell){cell.setAttribute("aria-controls",detailsCell.id)}})}_a11yUpdateCellColspan(cell,colspan){cell.setAttribute("aria-colspan",+colspan)}_a11yUpdateSorters(){Array.from(this.querySelectorAll("vaadin-grid-sorter")).forEach(sorter=>{let cellContent=sorter.parentNode;while(cellContent&&"vaadin-grid-cell-content"!==cellContent.localName){cellContent=cellContent.parentNode}if(cellContent&&cellContent.assignedSlot){const cell=cellContent.assignedSlot.parentNode;cell.setAttribute("aria-sort",{asc:"ascending",desc:"descending"}[sorter.direction+""]||"none")}})}};_exports.A11yMixin=A11yMixin;var vaadinGridA11yMixin={A11yMixin:A11yMixin};/**
   @license
   Copyright (c) 2017 Vaadin Ltd.
   This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   */ /**
       * @polymerMixin
       */_exports.$vaadinGridA11yMixin=vaadinGridA11yMixin;const ActiveItemMixin=superClass=>class ActiveItemMixin extends superClass{static get properties(){return{/**
       * The item user has last interacted with. Turns to `null` after user deactivates
       * the item by re-interacting with the currently active item.
       */activeItem:{type:Object,notify:!0,value:null}}}ready(){super.ready();this.$.scroller.addEventListener("click",this._onClick.bind(this));this.addEventListener("cell-activate",this._activateItem.bind(this))}_activateItem(e){const model=e.detail.model,clickedItem=model?model.item:null;if(clickedItem){this.activeItem=!this._itemsEqual(this.activeItem,clickedItem)?clickedItem:null}}// we need to listen to click instead of tap because on mobile safari, the
// document.activeElement has not been updated (focus has not been shifted)
// yet at the point when tap event is being executed.
_onClick(e){if(e.defaultPrevented){// Something has handled this click already, e. g., <vaadin-grid-sorter>
return}const path=e.composedPath(),cell=path[path.indexOf(this.$.table)-3];if(!cell||-1<cell.getAttribute("part").indexOf("details-cell")){return}const cellContent=cell._content,activeElement=this.getRootNode().activeElement,cellContentHasFocus=cellContent.contains(activeElement)&&(// MSIE bug: flex children receive focus. Make type & attributes check.
!this._ie||this._isFocusable(activeElement));if(!cellContentHasFocus&&!this._isFocusable(e.target)){this.dispatchEvent(new CustomEvent("cell-activate",{detail:{model:this.__getRowModel(cell.parentElement)}}))}}_isFocusable(target){if(!target.parentNode){return!1}const focusables=Array.from(target.parentNode.querySelectorAll("[tabindex], button, input, select, textarea, object, iframe, label, a[href], area[href]")).filter(element=>"cell body-cell"!==element.getAttribute("part")),isFocusableElement=-1!==focusables.indexOf(target);return!target.disabled&&isFocusableElement}};_exports.ActiveItemMixin=ActiveItemMixin;var vaadinGridActiveItemMixin={ActiveItemMixin:ActiveItemMixin};_exports.$vaadinGridActiveItemMixin=vaadinGridActiveItemMixin;const ArrayDataProviderMixin=superClass=>class ArrayDataProviderMixin extends superClass{static get properties(){return{/**
       * An array containing the items which will be stamped to the column template
       * instances.
       */items:Array}}static get observers(){return["_itemsChanged(items, items.*, isAttached)"]}_itemsChanged(items,splices,isAttached){if(!isAttached){return}if(!Array.isArray(items)){if(items===void 0||null===items){this.size=0}if(this.dataProvider===this._arrayDataProvider){this.dataProvider=void 0}return}this.size=items.length;this.dataProvider=this.dataProvider||this._arrayDataProvider;this.clearCache();this._ensureFirstPageLoaded()}_arrayDataProvider(opts,cb){let items=(Array.isArray(this.items)?this.items:[]).slice(0);if(this._filters&&this._checkPaths(this._filters,"filtering",items)){items=this._filter(items)}this.size=items.length;if(opts.sortOrders.length&&this._checkPaths(this._sorters,"sorting",items)){items=items.sort(this._multiSort.bind(this))}const start=opts.page*opts.pageSize,end=start+opts.pageSize,slice=items.slice(start,end);cb(slice,items.length)}/**
     * Check array of filters/sorters for paths validity, console.warn invalid items
     * @param {Array}  arrayToCheck The array of filters/sorters to check
     * @param {string} action       The name of action to include in warning (filtering, sorting)
     * @param {Array}  items
     */_checkPaths(arrayToCheck,action,items){if(!items.length){return!1}let result=!0;for(var i in arrayToCheck){const path=arrayToCheck[i].path;// skip simple paths
if(!path||-1===path.indexOf(".")){continue}const parentProperty=path.replace(/\.[^\.]*$/,"");// a.b.c -> a.b
if(_bbbbcSegmentTracker.Base.get(parentProperty,items[0])===void 0){console.warn(`Path "${path}" used for ${action} does not exist in all of the items, ${action} is disabled.`);result=!1}}return result}_multiSort(a,b){return this._sorters.map(sort=>{if("asc"===sort.direction){return this._compare(_bbbbcSegmentTracker.Base.get(sort.path,a),_bbbbcSegmentTracker.Base.get(sort.path,b))}else if("desc"===sort.direction){return this._compare(_bbbbcSegmentTracker.Base.get(sort.path,b),_bbbbcSegmentTracker.Base.get(sort.path,a))}return 0}).reduce((p,n)=>{return p?p:n},0)}_normalizeEmptyValue(value){if(0<=[void 0,null].indexOf(value)){return""}else if(isNaN(value)){return value.toString()}else{return value}}_compare(a,b){a=this._normalizeEmptyValue(a);b=this._normalizeEmptyValue(b);if(a<b){return-1}if(a>b){return 1}return 0}_filter(items){return items.filter((item,index)=>{return 0===this._filters.filter(filter=>{const value=this._normalizeEmptyValue(_bbbbcSegmentTracker.Base.get(filter.path,item)),filterValueLowercase=this._normalizeEmptyValue(filter.value).toString().toLowerCase();return-1===value.toString().toLowerCase().indexOf(filterValueLowercase)}).length})}};_exports.ArrayDataProviderMixin=ArrayDataProviderMixin;var vaadinGridArrayDataProviderMixin={ArrayDataProviderMixin:ArrayDataProviderMixin};_exports.$vaadinGridArrayDataProviderMixin=vaadinGridArrayDataProviderMixin;const ColumnReorderingMixin=superClass=>class ColumnReorderingMixin extends(0,_bbbbcSegmentTracker.GestureEventListeners)(superClass){static get properties(){return{/**
       * Set to true to allow column reordering.
       */columnReorderingAllowed:{type:Boolean,value:!1},_orderBaseScope:{type:Number,value:1e7}}}static get observers(){return["_updateOrders(_columnTree, _columnTree.*)"]}ready(){super.ready();(0,_bbbbcSegmentTracker.addListener)(this,"track",this._onTrackEvent);this._reorderGhost=this.shadowRoot.querySelector("[part=\"reorder-ghost\"]");this.addEventListener("touchstart",this._onTouchStart.bind(this));this.addEventListener("touchmove",this._onTouchMove.bind(this));this.addEventListener("touchend",this._onTouchEnd.bind(this));this.addEventListener("contextmenu",this._onContextMenu.bind(this))}_onContextMenu(e){if(this.hasAttribute("reordering")){e.preventDefault()}}_onTouchStart(e){// Touch event, delay activation by 100ms
this._startTouchReorderTimeout=setTimeout(()=>{this._onTrackStart({detail:{x:e.touches[0].clientX,y:e.touches[0].clientY}})},100)}_onTouchMove(e){if(this._draggedColumn){e.preventDefault()}clearTimeout(this._startTouchReorderTimeout)}_onTouchEnd(){clearTimeout(this._startTouchReorderTimeout);this._onTrackEnd()}_onTrackEvent(e){if("start"===e.detail.state){const path=e.composedPath(),headerCell=path[path.indexOf(this.$.header)-2];if(!headerCell||!headerCell._content){// Not a header column
return}const activeElement=this.getRootNode().activeElement;if(headerCell._content.contains(this.getRootNode().activeElement)&&(!this._ie||!this._isFocusable(activeElement))){// Something was focused inside the cell
return}if(this.$.scroller.hasAttribute("column-resizing")){// Resizing is in progress
return}if(!this._touchDevice){// Not a touch device
this._onTrackStart(e)}}else if("track"===e.detail.state){this._onTrack(e)}else if("end"===e.detail.state){this._onTrackEnd(e)}}_onTrackStart(e){if(!this.columnReorderingAllowed){return}// Cancel reordering if there are draggable nodes on the event path
const path=e.path||(0,_bbbbcSegmentTracker.dom)(e).path;if(path&&path.filter(node=>node.hasAttribute&&node.hasAttribute("draggable"))[0]){return}const headerCell=this._cellFromPoint(e.detail.x,e.detail.y);if(!headerCell||-1===headerCell.getAttribute("part").indexOf("header-cell")){return}this._toggleAttribute("reordering",!0,this);this._draggedColumn=headerCell._column;while(1===this._draggedColumn.parentElement.childElementCount){// This is the only column in the group, drag the whole group instead
this._draggedColumn=this._draggedColumn.parentElement}this._setSiblingsReorderStatus(this._draggedColumn,"allowed");this._draggedColumn._reorderStatus="dragging";this._updateGhost(headerCell);this._reorderGhost.style.visibility="visible";this._updateGhostPosition(e.detail.x,this._touchDevice?e.detail.y-50:e.detail.y);this._autoScroller()}_onTrack(e){if(!this._draggedColumn){// Reordering didn’t start. Skip this event.
return}const targetCell=this._cellFromPoint(e.detail.x,e.detail.y);if(!targetCell){return}const targetColumn=this._getTargetColumn(targetCell,this._draggedColumn);if(this._isSwapAllowed(this._draggedColumn,targetColumn)&&this._isSwappableByPosition(targetColumn,e.detail.x)){this._swapColumnOrders(this._draggedColumn,targetColumn)}this._updateGhostPosition(e.detail.x,this._touchDevice?e.detail.y-50:e.detail.y);this._lastDragClientX=e.detail.x}_onTrackEnd(){if(!this._draggedColumn){// Reordering didn’t start. Skip this event.
return}this._toggleAttribute("reordering",!1,this);this._draggedColumn._reorderStatus="";this._setSiblingsReorderStatus(this._draggedColumn,"");this._draggedColumn=null;this._lastDragClientX=null;this._reorderGhost.style.visibility="hidden";this.dispatchEvent(new CustomEvent("column-reorder",{detail:{columns:this._getColumnsInOrder()}}))}_getColumnsInOrder(){return this._columnTree.slice(0).pop().filter(c=>!c.hidden).sort((b,a)=>b._order-a._order)}_cellFromPoint(x,y){x=x||0;y=y||0;if(!this._draggedColumn){this._toggleAttribute("no-content-pointer-events",!0,this.$.scroller)}let cell;if(_bbbbcSegmentTracker.useShadow){cell=this.shadowRoot.elementFromPoint(x,y)}else{cell=document.elementFromPoint(x,y);// Workaround a FF58 bug
if("vaadin-grid-cell-content"===cell.localName){cell=cell.assignedSlot.parentNode}}this._toggleAttribute("no-content-pointer-events",!1,this.$.scroller);// Make sure the element is actually a cell
if(cell&&cell._column){return cell}}_updateGhostPosition(eventClientX,eventClientY){const ghostRect=this._reorderGhost.getBoundingClientRect(),targetLeft=eventClientX-ghostRect.width/2,targetTop=eventClientY-ghostRect.height/2,_left=parseInt(this._reorderGhost._left||0),_top=parseInt(this._reorderGhost._top||0);// // This is where we want to position the ghost
// Reposition the ghost
this._reorderGhost._left=_left-(ghostRect.left-targetLeft);this._reorderGhost._top=_top-(ghostRect.top-targetTop);this._reorderGhost.style.transform=`translate(${this._reorderGhost._left}px, ${this._reorderGhost._top}px)`}_getInnerText(e){if(e.localName){// Custom implementation needed since IE11 doesn't respect the spec in case of hidden elements
if("none"===getComputedStyle(e).display){return""}else{return Array.from(e.childNodes).map(n=>this._getInnerText(n)).join("")}}else{return e.textContent}}_updateGhost(cell){const ghost=this._reorderGhost;ghost.textContent=this._getInnerText(cell._content);const style=window.getComputedStyle(cell);["boxSizing","display","width","height","background","alignItems","padding","border","flex-direction","overflow"].forEach(propertyName=>ghost.style[propertyName]=style[propertyName]);return ghost}_updateOrders(columnTree,splices){if(columnTree===void 0||splices===void 0){return}// Set order numbers to top-level columns
columnTree[0].forEach((column,index)=>column._order=(index+1)*this._orderBaseScope)}_setSiblingsReorderStatus(column,status){Array.from(column.parentNode.children).filter(child=>/column/.test(child.localName)&&this._isSwapAllowed(child,column)).forEach(sibling=>sibling._reorderStatus=status)}_autoScroller(){if(this._lastDragClientX){const rightDiff=this._lastDragClientX-this.getBoundingClientRect().right+50,leftDiff=this.getBoundingClientRect().left-this._lastDragClientX+50;if(0<rightDiff){this.$.table.scrollLeft+=rightDiff/10}else if(0<leftDiff){this.$.table.scrollLeft-=leftDiff/10}this._scrollHandler()}if(this._draggedColumn){this.async(this._autoScroller,10)}}_isSwapAllowed(column1,column2){if(column1&&column2){const differentColumns=column1!==column2,sameParent=column1.parentElement===column2.parentElement,sameFrozen=column1.frozen===column2.frozen;return differentColumns&&sameParent&&sameFrozen}}_isSwappableByPosition(targetColumn,clientX){const targetCell=Array.from(this.$.header.querySelectorAll("tr:not([hidden]) [part~=\"cell\"]")).filter(cell=>targetColumn.contains(cell._column))[0],sourceCellRect=this.$.header.querySelector("tr:not([hidden]) [reorder-status=dragging]").getBoundingClientRect(),targetRect=targetCell.getBoundingClientRect();if(targetRect.left>sourceCellRect.left){return clientX>targetRect.right-sourceCellRect.width}else{return clientX<targetRect.left+sourceCellRect.width}}_swapColumnOrders(column1,column2){const _order=column1._order;column1._order=column2._order;column2._order=_order;this._updateLastFrozen();this._updateFirstAndLastColumn()}_getTargetColumn(targetCell,draggedColumn){if(targetCell&&draggedColumn){let candidate=targetCell._column;while(candidate.parentElement!==draggedColumn.parentElement&&candidate!==this){candidate=candidate.parentElement}if(candidate.parentElement===draggedColumn.parentElement){return candidate}else{return targetCell._column}}}};_exports.ColumnReorderingMixin=ColumnReorderingMixin;var vaadinGridColumnReorderingMixin={ColumnReorderingMixin:ColumnReorderingMixin};_exports.$vaadinGridColumnReorderingMixin=vaadinGridColumnReorderingMixin;const ColumnResizingMixin=superClass=>class ColumnResizingMixin extends(0,_bbbbcSegmentTracker.GestureEventListeners)(superClass){ready(){super.ready();const scroller=this.$.scroller;(0,_bbbbcSegmentTracker.addListener)(scroller,"track",this._onHeaderTrack.bind(this));// Disallow scrolling while resizing
scroller.addEventListener("touchmove",e=>scroller.hasAttribute("column-resizing")&&e.preventDefault());// Disable contextmenu on any resize separator.
scroller.addEventListener("contextmenu",e=>"resize-handle"==e.target.getAttribute("part")&&e.preventDefault());// Disable native cell focus when resizing
scroller.addEventListener("mousedown",e=>"resize-handle"===e.target.getAttribute("part")&&e.preventDefault())}_onHeaderTrack(e){const handle=e.target;if("resize-handle"===handle.getAttribute("part")){const cell=handle.parentElement;let column=cell._column;this._toggleAttribute("column-resizing",!0,this.$.scroller);// Get the target column to resize
while("vaadin-grid-column-group"===column.localName){column=Array.prototype.slice.call(column._childColumns,0).sort(function(a,b){return a._order-b._order}).filter(function(column){return!column.hidden}).pop()}const columnRowCells=Array.from(this.$.header.querySelectorAll("[part~=\"row\"]:last-child [part~=\"cell\"]"));var targetCell=columnRowCells.filter(cell=>cell._column===column)[0];// Resize the target column
if(targetCell.offsetWidth){var style=window.getComputedStyle(targetCell),minWidth=10+parseInt(style.paddingLeft)+parseInt(style.paddingRight)+parseInt(style.borderLeftWidth)+parseInt(style.borderRightWidth)+parseInt(style.marginLeft)+parseInt(style.marginRight);column.width=Math.max(minWidth,targetCell.offsetWidth+e.detail.x-targetCell.getBoundingClientRect().right)+"px";column.flexGrow=0}// Fix width and flex-grow for all preceding columns
columnRowCells.sort(function(a,b){return a._column._order-b._column._order}).forEach(function(cell,index,array){if(index<array.indexOf(targetCell)){cell._column.width=cell.offsetWidth+"px";cell._column.flexGrow=0}});if("end"===e.detail.state){this._toggleAttribute("column-resizing",!1,this.$.scroller)}// Notify resize
this._resizeHandler()}}};_exports.ColumnResizingMixin=ColumnResizingMixin;var vaadinGridColumnResizingMixin={ColumnResizingMixin:ColumnResizingMixin};_exports.$vaadinGridColumnResizingMixin=vaadinGridColumnResizingMixin;class GridTemplatizer extends class extends _bbbbcSegmentTracker.PolymerElement{}{static get is(){return"vaadin-grid-templatizer"}static get properties(){return{dataHost:Object,template:Object,_templateInstances:{type:Array,value:function(){return[]}},_parentPathValues:{value:function(){return{}}},_grid:Object}}static get observers(){return["_templateInstancesChanged(_templateInstances.*, _parentPathValues.*)"]}constructor(){super();this._instanceProps={detailsOpened:!0,index:!0,item:!0,selected:!0,expanded:!0,level:!0}}createInstance(){this._ensureTemplatized();const instance=new this._TemplateClass({});this.addInstance(instance);return instance}addInstance(instance){if(-1===this._templateInstances.indexOf(instance)){this._templateInstances.push(instance);requestAnimationFrame(()=>this.notifyPath("_templateInstances.*",this._templateInstances))}}removeInstance(instance){const index=this._templateInstances.indexOf(instance);this.splice("_templateInstances",index,1)}_ensureTemplatized(){if(!this._TemplateClass){this._TemplateClass=(0,_bbbbcSegmentTracker.templatize)(this.template,this,{instanceProps:this._instanceProps,parentModel:!0,forwardHostProp:function(prop,value){this._forwardParentProp(prop,value);if(this._templateInstances){this._templateInstances.forEach(inst=>inst.notifyPath(prop,value))}},notifyInstanceProp:function(inst,prop,value){if("index"===prop||"item"===prop){// We don’t need a change notification for these.
return}const originalProp=`__${prop}__`;// Notify for only user-action changes, not for scrolling updates. E. g.,
// if `detailsOpened` is different from `__detailsOpened__`, which was set during render.
if(inst[originalProp]===value){return}inst[originalProp]=value;const row=Array.from(this._grid.$.items.children).filter(row=>this._grid._itemsEqual(row._item,inst.item))[0];if(row){Array.from(row.children).forEach(cell=>{if(cell._instance){cell._instance[originalProp]=value;cell._instance.notifyPath(prop,value)}})}const itemPrefix="item.";if(Array.isArray(this._grid.items)&&0===prop.indexOf(itemPrefix)){const itemsIndex=this._grid.items.indexOf(inst.item),path=prop.slice(itemPrefix.length);this._grid.notifyPath(`items.${itemsIndex}.${path}`,value)}const gridCallback=`_${prop}InstanceChangedCallback`;if(this._grid&&this._grid[gridCallback]){this._grid[gridCallback](inst,value)}}})}}_forwardParentProp(prop,value){this._parentPathValues[prop]=value;this._templateInstances.forEach(inst=>inst.notifyPath(prop,value))}_templateInstancesChanged(t,p){let index,count;if("_templateInstances"===t.path){// Iterate all instances
index=0;count=this._templateInstances.length}else if("_templateInstances.splices"===t.path){// Iterate only new instances
index=t.value.index;count=t.value.addedCount}else{return}Object.keys(this._parentPathValues||{}).forEach(keyName=>{for(var i=index;i<index+count;i++){this._templateInstances[i].set(keyName,this._parentPathValues[keyName])}})}}_exports.Templatizer=GridTemplatizer;customElements.define(GridTemplatizer.is,GridTemplatizer);var vaadinGridTemplatizer={Templatizer:GridTemplatizer};_exports.$vaadinGridTemplatizer=vaadinGridTemplatizer;const ColumnBaseMixin=superClass=>class ColumnBaseMixin extends superClass{static get properties(){return{/**
       * When set to true, the column is user-resizable.
       * @default false
       */resizable:{type:Boolean,value:function(){if("vaadin-grid-column-group"===this.localName){return}const parent=this.parentNode;if(parent&&"vaadin-grid-column-group"===parent.localName){return parent.resizable||!1}else{return!1}}},_headerTemplate:{type:Object},_footerTemplate:{type:Object},/**
       * When true, the column is frozen. When a column inside of a column group is frozen,
       * all of the sibling columns inside the group will get frozen also.
       */frozen:{type:Boolean,value:!1},/**
       * When set to true, the cells for this column are hidden.
       */hidden:{type:Boolean},/**
       * Text content to display in the header cell of the column.
       */header:{type:String},/**
       * Aligns the columns cell content horizontally.
       * Supported values: "start", "center" and "end".
       */textAlign:{type:String},_lastFrozen:{type:Boolean,value:!1},_order:Number,_reorderStatus:Boolean,_emptyCells:Array,_headerCell:Object,_footerCell:Object,_grid:Object,/**
       * Custom function for rendering the header content.
       * Receives two arguments:
       *
       * - `root` The header cell content DOM element. Append your content to it.
       * - `column` The `<vaadin-grid-column>` element.
       */headerRenderer:Function,/**
       * Custom function for rendering the footer content.
       * Receives two arguments:
       *
       * - `root` The footer cell content DOM element. Append your content to it.
       * - `column` The `<vaadin-grid-column>` element.
       */footerRenderer:Function}}static get observers(){return["_widthChanged(width, _headerCell, _footerCell, _cells.*)","_frozenChanged(frozen, _headerCell, _footerCell, _cells.*)","_flexGrowChanged(flexGrow, _headerCell, _footerCell, _cells.*)","_pathOrHeaderChanged(path, header, _headerCell, _footerCell, _cells.*, renderer, headerRenderer, _bodyTemplate, _headerTemplate)","_textAlignChanged(textAlign, _cells.*, _headerCell, _footerCell)","_orderChanged(_order, _headerCell, _footerCell, _cells.*)","_lastFrozenChanged(_lastFrozen)","_setBodyTemplateOrRenderer(_bodyTemplate, renderer, _cells, _cells.*)","_setHeaderTemplateOrRenderer(_headerTemplate, headerRenderer, _headerCell)","_setFooterTemplateOrRenderer(_footerTemplate, footerRenderer, _footerCell)","_resizableChanged(resizable, _headerCell)","_reorderStatusChanged(_reorderStatus, _headerCell, _footerCell, _cells.*)","_hiddenChanged(hidden, _headerCell, _footerCell, _cells.*)"]}/** @protected */connectedCallback(){super.connectedCallback();this._bodyTemplate&&(this._bodyTemplate.templatizer._grid=this._grid);this._headerTemplate&&(this._headerTemplate.templatizer._grid=this._grid);this._footerTemplate&&(this._footerTemplate.templatizer._grid=this._grid);this._templateObserver.flush();if(!this._bodyTemplate){// The observer might not have triggered if the tag is empty. Run manually.
this._templateObserver.callback()}requestAnimationFrame(()=>{this._allCells.forEach(cell=>{if(!cell._content.parentNode){this._grid&&this._grid.appendChild(cell._content)}})})}/** @protected */disconnectedCallback(){super.disconnectedCallback();requestAnimationFrame(()=>{if(!this._findHostGrid()){this._allCells.forEach(cell=>{if(cell._content.parentNode){cell._content.parentNode.removeChild(cell._content)}})}});this._gridValue=void 0}_findHostGrid(){let el=this;// Custom elements extending grid must have a specific localName
while(el&&!/^vaadin.*grid(-pro)?$/.test(el.localName)){el=el.assignedSlot?el.assignedSlot.parentNode:el.parentNode}return el||void 0}get _grid(){if(!this._gridValue){this._gridValue=this._findHostGrid()}return this._gridValue}get _allCells(){return[].concat(this._cells||[]).concat(this._emptyCells||[]).concat(this._headerCell).concat(this._footerCell).filter(cell=>cell)}constructor(){super();this._templateObserver=new _bbbbcSegmentTracker.FlattenedNodesObserver(this,info=>{this._headerTemplate=this._prepareHeaderTemplate();this._footerTemplate=this._prepareFooterTemplate();this._bodyTemplate=this._prepareBodyTemplate()})}_prepareHeaderTemplate(){return this._prepareTemplatizer(this._findTemplate(!0)||null,{})}_prepareFooterTemplate(){return this._prepareTemplatizer(this._findTemplate(!1,!0)||null,{})}_prepareBodyTemplate(){return this._prepareTemplatizer(this._findTemplate()||null)}_prepareTemplatizer(template,instanceProps){if(template&&!template.templatizer){const templatizer=new GridTemplatizer;templatizer._grid=this._grid;templatizer.dataHost=this.dataHost;templatizer._instanceProps=instanceProps||templatizer._instanceProps;templatizer.template=template;template.templatizer=templatizer}return template}_renderHeaderAndFooter(){if(this.headerRenderer){this.__runRenderer(this.headerRenderer,this._headerCell)}if(this.footerRenderer){this.__runRenderer(this.footerRenderer,this._footerCell)}}__runRenderer(renderer,cell,rowData){const args=[cell._content,this];if(rowData&&rowData.item){args.push(rowData)}renderer.apply(this,args)}__setColumnTemplateOrRenderer(template,renderer,cells){if(template&&renderer){throw new Error("You should only use either a renderer or a template")}cells.forEach(cell=>{const model=this._grid.__getRowModel(cell.parentElement);if(renderer){cell._renderer=renderer;if(model.item||renderer===this.headerRenderer||renderer===this.footerRenderer){this.__runRenderer(renderer,cell,model)}}else if(cell._template!==template){cell._template=template;cell._content.innerHTML="";template.templatizer._grid=template.templatizer._grid||this._grid;const inst=template.templatizer.createInstance();cell._content.appendChild(inst.root);cell._instance=inst;if(model.item){cell._instance.setProperties(model)}}})}_setBodyTemplateOrRenderer(template,renderer,cells,splices){if((template||renderer)&&cells){this.__setColumnTemplateOrRenderer(template,renderer,cells)}}_setHeaderTemplateOrRenderer(headerTemplate,headerRenderer,headerCell){if((headerTemplate||headerRenderer)&&headerCell){this.__setColumnTemplateOrRenderer(headerTemplate,headerRenderer,[headerCell])}}_setFooterTemplateOrRenderer(footerTemplate,footerRenderer,footerCell){if((footerTemplate||footerRenderer)&&footerCell){this.__setColumnTemplateOrRenderer(footerTemplate,footerRenderer,[footerCell]);this._grid.__updateHeaderFooterRowVisibility(footerCell.parentElement)}}_selectFirstTemplate(header=!1,footer=!1){return _bbbbcSegmentTracker.FlattenedNodesObserver.getFlattenedNodes(this).filter(node=>"template"===node.localName&&node.classList.contains("header")===header&&node.classList.contains("footer")===footer)[0]}_findTemplate(header,footer){const template=this._selectFirstTemplate(header,footer);if(template){if(this.dataHost){// set dataHost to the context where template has been defined
template._rootDataHost=this.dataHost._rootDataHost||this.dataHost}}return template}_flexGrowChanged(flexGrow,headerCell,footerCell,cells){if(this.parentElement&&this.parentElement._columnPropChanged){this.parentElement._columnPropChanged("flexGrow")}this._allCells.forEach(cell=>cell.style.flexGrow=flexGrow)}_orderChanged(order,headerCell,footerCell,cells){this._allCells.forEach(cell=>cell.style.order=order)}_widthChanged(width,headerCell,footerCell,cells){if(this.parentElement&&this.parentElement._columnPropChanged){this.parentElement._columnPropChanged("width")}this._allCells.forEach(cell=>cell.style.width=width);// Force a reflow to workaround browser issues causing double scrollbars to grid
// https://github.com/vaadin/vaadin-grid/issues/1586
if(this._grid&&this._grid.__forceReflow){this._grid.__forceReflow()}}_frozenChanged(frozen,headerCell,footerCell,cells){if(this.parentElement&&this.parentElement._columnPropChanged){this.parentElement._columnPropChanged("frozen",frozen)}this._allCells.forEach(cell=>this._toggleAttribute("frozen",frozen,cell));this._grid&&this._grid._frozenCellsChanged&&this._grid._frozenCellsChanged()}_lastFrozenChanged(lastFrozen){this._allCells.forEach(cell=>this._toggleAttribute("last-frozen",lastFrozen,cell));if(this.parentElement&&this.parentElement._columnPropChanged){this.parentElement._lastFrozen=lastFrozen}}_pathOrHeaderChanged(path,header,headerCell,footerCell,cells,renderer,headerRenderer,bodyTemplate,headerTemplate){const hasHeaderText=header!==void 0;if(!headerRenderer&&!headerTemplate&&hasHeaderText&&headerCell){this.__setTextContent(headerCell._content,header)}if(path&&cells.value){if(!renderer&&!bodyTemplate){const pathRenderer=(root,owner,{item})=>this.__setTextContent(root,this.get(path,item));this.__setColumnTemplateOrRenderer(void 0,pathRenderer,cells.value)}if(!headerRenderer&&!headerTemplate&&!hasHeaderText&&headerCell&&null!==header){this.__setTextContent(headerCell._content,this._generateHeader(path))}}if(headerCell){this._grid.__updateHeaderFooterRowVisibility(headerCell.parentElement)}}__setTextContent(node,textContent){node.textContent!==textContent&&(node.textContent=textContent)}_generateHeader(path){return path.substr(path.lastIndexOf(".")+1).replace(/([A-Z])/g,"-$1").toLowerCase().replace(/-/g," ").replace(/^./,match=>match.toUpperCase())}_toggleAttribute(name,bool,node){if(node.hasAttribute(name)===!bool){if(bool){node.setAttribute(name,"")}else{node.removeAttribute(name)}}}_reorderStatusChanged(reorderStatus,headerCell,footerCell,cells){this._allCells.forEach(cell=>cell.setAttribute("reorder-status",reorderStatus))}_resizableChanged(resizable,headerCell){if(resizable===void 0||headerCell===void 0){return}if(headerCell){[headerCell].concat(this._emptyCells).forEach(cell=>{if(cell){const existingHandle=cell.querySelector("[part~=\"resize-handle\"]");if(existingHandle){cell.removeChild(existingHandle)}if(resizable){const handle=document.createElement("div");handle.setAttribute("part","resize-handle");cell.appendChild(handle)}}})}}_textAlignChanged(textAlign,_cells,_headerCell,_footerCell){if(textAlign===void 0){return}if(-1===["start","end","center"].indexOf(textAlign)){console.warn("textAlign can only be set as \"start\", \"end\" or \"center\"");return}let textAlignFallback;if("ltr"===getComputedStyle(this._grid).direction){if("start"===textAlign){textAlignFallback="left"}else if("end"===textAlign){textAlignFallback="right"}}else{if("start"===textAlign){textAlignFallback="right"}else if("end"===textAlign){textAlignFallback="left"}}this._allCells.forEach(cell=>{cell._content.style.textAlign=textAlign;if(getComputedStyle(cell._content).textAlign!==textAlign){cell._content.style.textAlign=textAlignFallback}})}_hiddenChanged(hidden,headerCell,footerCell,cells){if(this.parentElement&&this.parentElement._columnPropChanged){this.parentElement._columnPropChanged("hidden",hidden)}this._allCells.forEach(cell=>this._toggleAttribute("hidden",hidden,cell));if(!!hidden!==!!this._previousHidden&&this._grid){this._grid._updateLastFrozen&&this._grid._updateLastFrozen();this._grid.notifyResize&&this._grid.notifyResize();this._grid._resetKeyboardNavigation&&this._grid._resetKeyboardNavigation()}this._previousHidden=hidden}};/**
    * A `<vaadin-grid-column>` is used to configure how a column in `<vaadin-grid>`
    * should look like.
    *
    * See `<vaadin-grid>` documentation and demos for instructions and examples on how
    * to configure the `<vaadin-grid-column>`.
    * ```
    *
    * @memberof Vaadin
    * @mixes Vaadin.Grid.ColumnBaseMixin
    */_exports.ColumnBaseMixin=ColumnBaseMixin;class GridColumnElement extends ColumnBaseMixin(_bbbbcSegmentTracker.PolymerElement){static get is(){return"vaadin-grid-column"}static get properties(){return{/**
       * Width of the cells for this column.
       */width:{type:String,value:"100px"},/**
       * Flex grow ratio for the cell widths. When set to 0, cell width is fixed.
       */flexGrow:{type:Number,value:1},/**
       * Custom function for rendering the cell content.
       * Receives three arguments:
       *
       * - `root` The cell content DOM element. Append your content to it.
       * - `column` The `<vaadin-grid-column>` element.
       * - `rowData` The object with the properties related with
       *   the rendered item, contains:
       *   - `rowData.index` The index of the item.
       *   - `rowData.item` The item.
       *   - `rowData.expanded` Sublevel toggle state.
       *   - `rowData.level` Level of the tree represented with a horizontal offset of the toggle button.
       *   - `rowData.selected` Selected state.
       */renderer:Function,/**
       * Path to an item sub-property whose value gets displayed in the column body cells.
       * The property name is also shown in the column header if an explicit header or renderer isn't defined.
       */path:{type:String},/**
       * Automatically sets the width of the column based on the column contents when this is set to `true`.
       *
       * For performance reasons the column width is calculated automatically only once when the grid items
       * are rendered for the first time and the calculation only considers the rows which are currently
       * rendered in DOM (a bit more than what is currently visible). If the grid is scrolled, or the cell
       * content changes, the column width might not match the contents anymore.
       *
       * Hidden columns are ignored in the calculation and their widths are not automatically updated when
       * you show a column that was initially hidden.
       *
       * You can manually trigger the auto sizing behavior again by calling `grid.recalculateColumnWidths()`.
       *
       * The column width may still grow larger when `flexGrow` is not 0.
       */autoWidth:{type:Boolean,value:!1},_bodyTemplate:{type:Object},_cells:Array}}}_exports.GridColumnElement=GridColumnElement;customElements.define(GridColumnElement.is,GridColumnElement);var vaadinGridColumn={ColumnBaseMixin:ColumnBaseMixin,GridColumnElement:GridColumnElement};_exports.$vaadinGridColumn=vaadinGridColumn;const ItemCache=class ItemCache{constructor(grid,parentCache,parentItem){this.grid=grid;this.parentCache=parentCache;this.parentItem=parentItem;this.itemCaches={};this.items={};this.effectiveSize=0;this.size=0;this.pendingRequests={}}isLoading(){return Object.keys(this.pendingRequests).length||Object.keys(this.itemCaches).filter(index=>{return this.itemCaches[index].isLoading()})[0]}getItemForIndex(index){const{cache,scaledIndex}=this.getCacheAndIndex(index);return cache.items[scaledIndex]}updateSize(){this.effectiveSize=!this.parentItem||this.grid._isExpanded(this.parentItem)?this.size+Object.keys(this.itemCaches).reduce((prev,curr)=>{const subCache=this.itemCaches[curr];subCache.updateSize();return prev+subCache.effectiveSize},0):0}ensureSubCacheForScaledIndex(scaledIndex){if(!this.itemCaches[scaledIndex]){const subCache=new ItemCache(this.grid,this,this.items[scaledIndex]);this.itemCaches[scaledIndex]=subCache;this.grid._loadPage(0,subCache)}}getCacheAndIndex(index){let thisLevelIndex=index;const keys=Object.keys(this.itemCaches);for(var i=0;i<keys.length;i++){const expandedIndex=+keys[i],subCache=this.itemCaches[expandedIndex];if(thisLevelIndex<=expandedIndex){return{cache:this,scaledIndex:thisLevelIndex}}else if(thisLevelIndex<=expandedIndex+subCache.effectiveSize){return subCache.getCacheAndIndex(thisLevelIndex-expandedIndex-1)}thisLevelIndex-=subCache.effectiveSize}return{cache:this,scaledIndex:thisLevelIndex}}};/**
    * @polymerMixin
    */_exports.ItemCache=ItemCache;const DataProviderMixin=superClass=>class DataProviderMixin extends superClass{static get properties(){return{/**
       * Number of items fetched at a time from the dataprovider.
       */pageSize:{type:Number,value:50,observer:"_pageSizeChanged"},/**
       * Function that provides items lazily. Receives arguments `params`, `callback`
       *
       * `params.page` Requested page index
       *
       * `params.pageSize` Current page size
       *
       * `params.filters` Currently applied filters
       *
       * `params.sortOrders` Currently applied sorting orders
       *
       * `params.parentItem` When tree is used, and sublevel items
       * are requested, reference to parent item of the requested sublevel.
       * Otherwise `undefined`.
       *
       * `callback(items, size)` Callback function with arguments:
       *   - `items` Current page of items
       *   - `size` Total number of items. When tree sublevel items
       *     are requested, total number of items in the requested sublevel.
       *     Optional when tree is not used, required for tree.
       */dataProvider:{type:Object,notify:!0,observer:"_dataProviderChanged"},/**
       * `true` while data is being requested from the data provider.
       */loading:{type:Boolean,notify:!0,readOnly:!0,reflectToAttribute:!0},_cache:{type:Object,value:function(){const cache=new ItemCache(this);return cache}},/**
       * Path to an item sub-property that identifies the item.
       */itemIdPath:{type:String,value:null},/**
       * An array that contains the expanded items.
       */expandedItems:{type:Object,notify:!0,value:()=>[]}}}static get observers(){return["_sizeChanged(size)","_expandedItemsChanged(expandedItems.*)"]}_sizeChanged(size){const delta=size-this._cache.size;this._cache.size+=delta;this._cache.effectiveSize+=delta;this._effectiveSize=this._cache.effectiveSize}_updateRowItem(item,el){el.children.forEach(cell=>{cell._instance&&(cell._instance.item=item)})}_getItem(index,el){if(index>=this._effectiveSize){return}el.index=index;const{cache,scaledIndex}=this._cache.getCacheAndIndex(index),item=cache.items[scaledIndex];if(item){this._toggleAttribute("loading",!1,el);this._updateItem(el,item);if(this._isExpanded(item)){cache.ensureSubCacheForScaledIndex(scaledIndex)}}else{this._toggleAttribute("loading",!0,el);this._loadPage(this._getPageForIndex(scaledIndex),cache)}}_pagesForPhysicalItems(){// TODO: potentially heavy operation to run first visible index,
// reconsider if performance issues occur on data binding / scrolling.
// TODO: _vidxOffset shouldn't be read from here.
const firstVisiblePage=this._getPageForIndex(this._firstVisibleIndex+this._vidxOffset);return[firstVisiblePage].concat(this._physicalItems.filter(row=>row.index).items(row=>this._getPageForIndex(row.index))).reduce((prev,curr)=>{if(-1===prev.indexOf(curr)){prev.push(curr)}return prev},[])}_expandedInstanceChangedCallback(inst,value){if(inst.item===void 0){return}if(value){this.expandItem(inst.item)}else{this.collapseItem(inst.item)}}/**
     * Returns a value that identifies the item. Uses `itemIdPath` if available.
     * Can be customized by overriding.
     */getItemId(item){return this.itemIdPath?this.get(this.itemIdPath,item):item}_isExpanded(item){return this.expandedItems&&-1<this._getItemIndexInArray(item,this.expandedItems)}_expandedItemsChanged(e){this._cache.updateSize();this._effectiveSize=this._cache.effectiveSize;this._assignModels()}/**
     * Expands the given item tree.
     */expandItem(item){if(!this._isExpanded(item)){this.push("expandedItems",item)}}/**
     * Collapses the given item tree.
     */collapseItem(item){if(this._isExpanded(item)){this.splice("expandedItems",this._getItemIndexInArray(item,this.expandedItems),1)}}_getIndexLevel(index){let{cache}=this._cache.getCacheAndIndex(index),level=0;while(cache.parentCache){cache=cache.parentCache;level++}return level}_canPopulate(){return this._hasData&&this._columnTree}_loadPage(page,cache){// make sure same page isn't requested multiple times.
if(!cache.pendingRequests[page]&&this.dataProvider){this._setLoading(!0);cache.pendingRequests[page]=!0;const params={page,pageSize:this.pageSize,sortOrders:this._mapSorters(),filters:this._mapFilters(),parentItem:cache.parentItem};this.dataProvider(params,(items,size)=>{if(size!==void 0){cache.size=size}else{if(params.parentItem){cache.size=items.length}}// Populate the cache with new items
items.forEach((item,itemsIndex)=>{const itemIndex=page*this.pageSize+itemsIndex;cache.items[itemIndex]=item;if(this._isExpanded(item)){// Force synchronous data request for expanded item sub-cache
cache.ensureSubCacheForScaledIndex(itemIndex)}});this._hasData=!0;delete cache.pendingRequests[page];if(!this._cache.isLoading()){// All active requests have finished, update the effective size and rows
this._setLoading(!1);this._cache.updateSize();this._effectiveSize=this._cache.effectiveSize;Array.from(this.$.items.children).filter(row=>!row.hidden).forEach(row=>{const cachedItem=this._cache.getItemForIndex(row.index);if(cachedItem){this._toggleAttribute("loading",!1,row);this._updateItem(row,cachedItem)}});this._increasePoolIfNeeded(0)}this.__setInitialColumnWidths()})}}_getPageForIndex(index){return Math.floor(index/this.pageSize)}/**
     * Clears the cached pages and reloads data from dataprovider when needed.
     */clearCache(){this._cache=new ItemCache(this);Array.from(this.$.items.children).forEach(row=>{Array.from(row.children).forEach(cell=>{// Force data system to pick up subproperty changes
cell._instance&&cell._instance._setPendingProperty("item",{},!1)})});this._cache.size=this.size||0;this._cache.updateSize();this._hasData=!1;this._assignModels();if(!this._effectiveSize){this._loadPage(0,this._cache)}}_flushItemsDebouncer(){if(this._debouncerLoad){this._debouncerLoad.flush()}}_pageSizeChanged(pageSize,oldPageSize){if(oldPageSize!==void 0&&pageSize!==oldPageSize){this.clearCache()}}_checkSize(){if(this.size===void 0&&0===this._effectiveSize){console.warn("The <vaadin-grid> needs the total number of items"+" in order to display rows. Set the total number of items"+" to the `size` property, or provide the total number of items"+" in the second argument of the `dataProvider`\u2019s `callback` call.")}}_dataProviderChanged(dataProvider,oldDataProvider){if(oldDataProvider!==void 0){this.clearCache()}if(dataProvider&&this.items&&this.items.length){// Fixes possibly invalid cached lastVisibleIndex value in <iron-list>
this._scrollToIndex(this._firstVisibleIndex)}this._ensureFirstPageLoaded();this._debouncerCheckSize=_bbbbcSegmentTracker.Debouncer.debounce(this._debouncerCheckSize,_bbbbcSegmentTracker.timeOut.after(2e3),this._checkSize.bind(this));this._scrollHandler()}_ensureFirstPageLoaded(){if(!this._hasData){// load data before adding rows to make sure they have content when
// rendered for the first time.
this._loadPage(0,this._cache,()=>{const hadData=this._hasData;this._hasData=!0;if(!hadData){this.notifyResize()}})}}_itemsEqual(item1,item2){return this.getItemId(item1)===this.getItemId(item2)}_getItemIndexInArray(item,array){let result=-1;array.forEach((i,idx)=>{if(this._itemsEqual(i,item)){result=idx}});return result}};_exports.DataProviderMixin=DataProviderMixin;var vaadinGridDataProviderMixin={ItemCache:ItemCache,DataProviderMixin:DataProviderMixin};/**
   @license
   Copyright (c) 2019 Vaadin Ltd.
   This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   */_exports.$vaadinGridDataProviderMixin=vaadinGridDataProviderMixin;const DropMode={BETWEEN:"between",ON_TOP:"on-top",ON_TOP_OR_BETWEEN:"on-top-or-between",ON_GRID:"on-grid"},DropLocation={ON_TOP:"on-top",ABOVE:"above",BELOW:"below",EMPTY:"empty"},DragAndDropMixin=superClass=>class DragAndDropMixin extends superClass{static get properties(){return{/**
       * Defines the locations within the Grid row where an element can be dropped.
       *
       * Possible values are:
       * - `between`: The drop event can happen between Grid rows.
       * - `on-top`: The drop event can happen on top of Grid rows.
       * - `on-top-or-between`: The drop event can happen either on top of or between Grid rows.
       * - `on-grid`: The drop event will not happen on any specific row, it will show the drop target outline around the whole grid.
       */dropMode:String,/**
       * Marks the grid's rows to be available for dragging.
       */rowsDraggable:Boolean,/**
       * A function that filters dragging of specific grid rows. The return value should be false
       * if dragging of the row should be disabled.
       *
       * Receives one argument:
       * - `rowData` The object with the properties related with
       *   the rendered item, contains:
       *   - `rowData.index` The index of the item.
       *   - `rowData.item` The item.
       *   - `rowData.expanded` Sublevel toggle state.
       *   - `rowData.level` Level of the tree represented with a horizontal offset of the toggle button.
       *   - `rowData.selected` Selected state.
       */dragFilter:Function,/**
       * A function that filters dropping on specific grid rows. The return value should be false
       * if dropping on the row should be disabled.
       *
       * Receives one argument:
       * - `rowData` The object with the properties related with
       *   the rendered item, contains:
       *   - `rowData.index` The index of the item.
       *   - `rowData.item` The item.
       *   - `rowData.expanded` Sublevel toggle state.
       *   - `rowData.level` Level of the tree represented with a horizontal offset of the toggle button.
       *   - `rowData.selected` Selected state.
       */dropFilter:Function,__dndAutoScrollThreshold:{value:50}}}static get observers(){return["_dragDropAccessChanged(rowsDraggable, dropMode, dragFilter, dropFilter)"]}ready(){super.ready();this.$.table.addEventListener("dragstart",this._onDragStart.bind(this));this.$.table.addEventListener("dragend",this._onDragEnd.bind(this));this.$.table.addEventListener("dragover",this._onDragOver.bind(this));this.$.table.addEventListener("dragleave",this._onDragLeave.bind(this));this.$.table.addEventListener("drop",this._onDrop.bind(this));this.$.table.addEventListener("dragenter",e=>{if(this.dropMode){e.preventDefault();e.stopPropagation()}})}_onDragStart(e){if(this.rowsDraggable){let row=e.target;if("vaadin-grid-cell-content"===row.localName){// The draggable node is the cell content element on browsers that support native shadow
row=row.assignedSlot.parentNode.parentNode}if(row.parentNode!==this.$.items){return}e.stopPropagation();this._toggleAttribute("dragging-rows",!0,this);if(this._safari){// Safari doesn't get proper drag images from transformed
// elements so we need to switch to top temporarily
const transform=row.style.transform;row.style.top=/translateY\((.*)\)/.exec(transform)[1];row.style.transform="none";requestAnimationFrame(()=>{row.style.top="";row.style.transform=transform})}const rowRect=row.getBoundingClientRect();if(!window.ShadyDOM){if(this._ios){e.dataTransfer.setDragImage(row)}else{e.dataTransfer.setDragImage(row,e.clientX-rowRect.left,e.clientY-rowRect.top)}}let rows=[row];if(this._isSelected(row._item)){rows=this.__getViewportRows().filter(row=>this._isSelected(row._item)).filter(row=>!this.dragFilter||this.dragFilter(this.__getRowModel(row)))}// Set the default transfer data
e.dataTransfer.setData("text",this.__formatDefaultTransferData(rows));row.setAttribute("dragstart",1<rows.length?rows.length:"");this.updateStyles({"--_grid-drag-start-x":`${e.clientX-rowRect.left+20}px`,"--_grid-drag-start-y":`${e.clientY-rowRect.top+10}px`});requestAnimationFrame(()=>{row.removeAttribute("dragstart");this.updateStyles({"--_grid-drag-start-x":"","--_grid-drag-start-y":""})});const event=new CustomEvent("grid-dragstart",{detail:{draggedItems:rows.map(row=>row._item),setDragData:(type,data)=>e.dataTransfer.setData(type,data),setDraggedItemsCount:count=>row.setAttribute("dragstart",count)}});event.originalEvent=e;this.dispatchEvent(event)}}_onDragEnd(e){this._toggleAttribute("dragging-rows",!1,this);e.stopPropagation();const event=new CustomEvent("grid-dragend");event.originalEvent=e;this.dispatchEvent(event)}_onDragLeave(e){e.stopPropagation();this._clearDragStyles()}_onDragOver(e){if(this.dropMode){this._dropLocation=void 0;this._dragOverItem=void 0;if(this.__dndAutoScroll(e.clientY)){this._clearDragStyles();return}let row=e.composedPath().filter(node=>"tr"===node.localName)[0];if(!this._effectiveSize||this.dropMode===DropMode.ON_GRID){// The grid is empty or "on-grid" drop mode was used, always default to "empty"
this._dropLocation=DropLocation.EMPTY}else if(!row||row.parentNode!==this.$.items){// The dragover didn't occur on a body row but the grid has items
if(row){// The dragover occurred over a header/footer row
return}else if(this.dropMode===DropMode.BETWEEN||this.dropMode===DropMode.ON_TOP_OR_BETWEEN){// The drop mode allows setting the last row as the drag over item
row=Array.from(this.$.items.children).filter(row=>!row.hidden).pop();this._dropLocation=DropLocation.BELOW}else{// Drop mode on-top used but the dragover didn't occur over one of the existing rows
return}}else{// The dragover occurred on a body row, determine the drop location from coordinates
const rowRect=row.getBoundingClientRect();this._dropLocation=DropLocation.ON_TOP;if(this.dropMode===DropMode.BETWEEN){const dropAbove=e.clientY-rowRect.top<rowRect.bottom-e.clientY;this._dropLocation=dropAbove?DropLocation.ABOVE:DropLocation.BELOW}else if(this.dropMode===DropMode.ON_TOP_OR_BETWEEN){if(e.clientY-rowRect.top<rowRect.height/3){this._dropLocation=DropLocation.ABOVE}else if(e.clientY-rowRect.top>2*(rowRect.height/3)){this._dropLocation=DropLocation.BELOW}}}if(row&&row.hasAttribute("drop-disabled")){this._dropLocation=void 0;return}e.stopPropagation();e.preventDefault();if(this._dropLocation===DropLocation.EMPTY){this._toggleAttribute("dragover",!0,this)}else if(row){this._dragOverItem=row._item;if(row.getAttribute("dragover")!==this._dropLocation){row.setAttribute("dragover",this._dropLocation)}}else{this._clearDragStyles()}}}__dndAutoScroll(clientY){if(this.__dndAutoScrolling){return!0}const headerBottom=this.$.header.getBoundingClientRect().bottom,footerTop=this.$.footer.getBoundingClientRect().top,topDiff=headerBottom-clientY+this.__dndAutoScrollThreshold,bottomDiff=clientY-footerTop+this.__dndAutoScrollThreshold;let scrollTopDelta=0;if(0<bottomDiff){scrollTopDelta=2*bottomDiff}else if(0<topDiff){scrollTopDelta=2*-topDiff}if(scrollTopDelta){const scrollTop=this.$.table.scrollTop;this.$.table.scrollTop+=scrollTopDelta;const scrollTopChanged=scrollTop!==this.$.table.scrollTop;if(scrollTopChanged){this.__dndAutoScrolling=!0;// Disallow more auto-scrolls within 20ms
setTimeout(()=>this.__dndAutoScrolling=!1,20);this._scrollHandler();return!0}}}__getViewportRows(){const headerBottom=this.$.header.getBoundingClientRect().bottom,footerTop=this.$.footer.getBoundingClientRect().top;return Array.from(this.$.items.children).filter(row=>{const rowRect=row.getBoundingClientRect();return rowRect.bottom>headerBottom&&rowRect.top<footerTop})}_clearDragStyles(){this.removeAttribute("dragover");Array.from(this.$.items.children).forEach(row=>row.removeAttribute("dragover"))}_onDrop(e){if(this.dropMode){e.stopPropagation();e.preventDefault();const dragData=e.dataTransfer.types&&Array.from(e.dataTransfer.types).map(type=>{return{type,data:e.dataTransfer.getData(type)}});this._clearDragStyles();const event=new CustomEvent("grid-drop",{bubbles:e.bubbles,cancelable:e.cancelable,detail:{dropTargetItem:this._dragOverItem,dropLocation:this._dropLocation,dragData}});event.originalEvent=e;this.dispatchEvent(event)}}__formatDefaultTransferData(rows){return rows.map(row=>{return Array.from(row.children).filter(cell=>!cell.hidden&&-1===cell.getAttribute("part").indexOf("details-cell")).sort((a,b)=>{return a._column._order>b._column._order?1:-1}).map(cell=>cell._content.textContent.trim()).filter(content=>content).join("\t")}).join("\n")}_dragDropAccessChanged(rowsDraggable,dropMode,dragFilter,dropFilter){this.filterDragAndDrop()}/**
     * Runs the `dragFilter` and `dropFilter` hooks for the visible cells.
     * If the filter depends on varying conditions, you may need to
     * call this function manually in order to update the draggability when
     * the conditions change.
     */filterDragAndDrop(){Array.from(this.$.items.children).filter(row=>!row.hidden).forEach(row=>{this._filterDragAndDrop(row,this.__getRowModel(row))})}_filterDragAndDrop(row,rowData){const dragDisabled=!this.rowsDraggable||this.dragFilter&&!this.dragFilter(rowData),dropDisabled=!this.dropMode||this.dropFilter&&!this.dropFilter(rowData),draggableElements=window.ShadyDOM?[row]:Array.from(row.children).map(cell=>cell._content);draggableElements.forEach(e=>{if(dragDisabled){e.removeAttribute("draggable")}else{e.setAttribute("draggable",!0)}});this._toggleAttribute("drag-disabled",dragDisabled,row);this._toggleAttribute("drop-disabled",dropDisabled,row)}/**
     * Fired when starting to drag grid rows.
     *
     * @event grid-dragstart
     * @param {Object} originalEvent The native dragstart event
     * @param {Object} detail
     * @param {Object} detail.draggedItems the items in the visible viewport that are dragged
     * @param {Function} detail.setDraggedItemsCount Overrides the default number shown in the drag image on multi row drag.
     * Parameter is of type number.
     * @param {Function} detail.setDragData Sets dataTransfer data for the drag operation.
     * Note that "text" is the only data type supported by all the browsers the grid currently supports (including IE11).
     * The function takes two parameters:
     * - type:string The type of the data
     * - data:string The data
     */ /**
         * Fired when the dragging of the rows ends.
         *
         * @event grid-dragend
         * @param {Object} originalEvent The native dragend event
         */ /**
             * Fired when a drop occurs on top of the grid.
             *
             * @event grid-drop
             * @param {Object} originalEvent The native drop event
             * @param {Object} detail
             * @param {Object} detail.dropTargetItem The item of the grid row on which the drop occurred.
             * @param {string} detail.dropLocation The position at which the drop event took place relative to a row.
             * Depending on the dropMode value, the drop location can be one of the following
             * - `on-top`: when the drop occurred on top of the row
             * - `above`: when the drop occurred above the row
             * - `below`: when the drop occurred below the row
             * - `empty`: when the drop occurred over the grid, not relative to any specific row
             * @param {string} detail.dragData An array of items with the payload as a string representation as the
             * `data` property and the type of the data as `type` property.
             */};_exports.DragAndDropMixin=DragAndDropMixin;var vaadinGridDragAndDropMixin={DragAndDropMixin:DragAndDropMixin};_exports.$vaadinGridDragAndDropMixin=vaadinGridDragAndDropMixin;const DynamicColumnsMixin=superClass=>class DynamicColumnsMixin extends superClass{ready(){super.ready();this._addNodeObserver()}_hasColumnGroups(columns){for(let i=0;i<columns.length;i++){if("vaadin-grid-column-group"===columns[i].localName){return!0}}return!1}_getChildColumns(el){return _bbbbcSegmentTracker.FlattenedNodesObserver.getFlattenedNodes(el).filter(this._isColumnElement)}_flattenColumnGroups(columns){return columns.map(col=>{if("vaadin-grid-column-group"===col.localName){return this._getChildColumns(col)}else{return[col]}}).reduce((prev,curr)=>{return prev.concat(curr)},[])}_getColumnTree(){for(var rootColumns=_bbbbcSegmentTracker.FlattenedNodesObserver.getFlattenedNodes(this).filter(this._isColumnElement),_columnTree=[],c=rootColumns;;){_columnTree.push(c);if(!this._hasColumnGroups(c)){break}c=this._flattenColumnGroups(c)}return _columnTree}_updateColumnTree(){var columnTree=this._getColumnTree();if(!this._arrayEquals(columnTree,this._columnTree)){this._columnTree=columnTree}}_addNodeObserver(){this._observer=new _bbbbcSegmentTracker.FlattenedNodesObserver(this,info=>{const rowDetailsTemplate=info.addedNodes.filter(n=>"template"===n.localName&&n.classList.contains("row-details"))[0];if(rowDetailsTemplate&&this._rowDetailsTemplate!==rowDetailsTemplate){this._rowDetailsTemplate=rowDetailsTemplate}if(0<info.addedNodes.filter(this._isColumnElement).length||0<info.removedNodes.filter(this._isColumnElement).length){this._updateColumnTree()}this._debouncerCheckImports=_bbbbcSegmentTracker.Debouncer.debounce(this._debouncerCheckImports,_bbbbcSegmentTracker.timeOut.after(2e3),this._checkImports.bind(this));this._ensureFirstPageLoaded()})}_arrayEquals(arr1,arr2){if(!arr1||!arr2||arr1.length!=arr2.length){return!1}for(var i=0,l=arr1.length;i<l;i++){// Check if we have nested arrays
if(arr1[i]instanceof Array&&arr2[i]instanceof Array){// recurse into the nested arrays
if(!this._arrayEquals(arr1[i],arr2[i])){return!1}}else if(arr1[i]!=arr2[i]){return!1}}return!0}_checkImports(){["vaadin-grid-column-group","vaadin-grid-filter","vaadin-grid-filter-column","vaadin-grid-tree-toggle","vaadin-grid-selection-column","vaadin-grid-sort-column","vaadin-grid-sorter"].forEach(elementName=>{var element=this.querySelector(elementName);if(element&&!(element instanceof _bbbbcSegmentTracker.PolymerElement)){console.warn(`Make sure you have imported the required module for <${elementName}> element.`)}})}_updateFirstAndLastColumn(){Array.from(this.shadowRoot.querySelectorAll("tr")).forEach(row=>this._updateFirstAndLastColumnForRow(row))}_updateFirstAndLastColumnForRow(row){Array.from(row.querySelectorAll("[part~=\"cell\"]:not([part~=\"details-cell\"])")).sort((a,b)=>{return a._column._order-b._column._order}).forEach((cell,cellIndex,children)=>{this._toggleAttribute("first-column",0===cellIndex,cell);this._toggleAttribute("last-column",cellIndex===children.length-1,cell)})}_isColumnElement(node){return node.nodeType===Node.ELEMENT_NODE&&/\bcolumn\b/.test(node.localName)}};_exports.DynamicColumnsMixin=DynamicColumnsMixin;var vaadinGridDynamicColumnsMixin={DynamicColumnsMixin:DynamicColumnsMixin};/**
   @license
   Copyright (c) 2018 Vaadin Ltd.
   This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   */ /**
       * @polymerMixin
       */_exports.$vaadinGridDynamicColumnsMixin=vaadinGridDynamicColumnsMixin;const EventContextMixin=superClass=>class EventContextMixin extends superClass{/**
   * Returns an object with context information about the event target:
   * - `item`: the data object corresponding to the targeted row (not specified when targeting header or footer)
   * - `column`: the column element corresponding to the targeted cell (not specified when targeting row details)
   * - `section`: whether the event targeted the body, header, footer or details of the grid
   *
   * These additional properties are included when `item` is specified:
   * - `index`: the index of the item
   * - `selected`: the selected state of the item
   * - `detailsOpened`: whether the row details are open for the item
   * - `expanded`: the expanded state of the tree toggle
   * - `level`: the tree hierarchy level
   *
   * The returned object is populated only when a grid cell, header, footer or row details is found in `event.composedPath()`.
   * This means mostly mouse and keyboard events. If such a grid part is not found in the path, an empty object is returned.
   * This may be the case eg. if the event is fired on the `<vaadin-grid>` element and not any deeper in the DOM, or if
   * the event targets the empty part of the grid body.
   */getEventContext(event){const context={},path=event.composedPath(),cell=path[path.indexOf(this.$.table)-3];if(!cell){return context}context.section=["body","header","footer","details"].filter(section=>-1<cell.getAttribute("part").indexOf(section))[0];if(cell._column){context.column=cell._column}if("body"===context.section||"details"===context.section){Object.assign(context,this.__getRowModel(cell.parentElement))}return context}};_exports.EventContextMixin=EventContextMixin;var vaadinGridEventContextMixin={EventContextMixin:EventContextMixin};/**
   @license
   Copyright (c) 2017 Vaadin Ltd.
   This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   */ /**
       * @polymerMixin
       */_exports.$vaadinGridEventContextMixin=vaadinGridEventContextMixin;const FilterMixin=superClass=>class FilterMixin extends superClass{static get properties(){return{_filters:{type:Array,value:function(){return[]}}}}ready(){super.ready();this.addEventListener("filter-changed",this._filterChanged.bind(this))}_filterChanged(e){if(-1===this._filters.indexOf(e.target)){this._filters.push(e.target)}e.stopPropagation();if(this.dataProvider){this.clearCache()}}_mapFilters(){return this._filters.map(filter=>{return{path:filter.path,value:filter.value}})}};_exports.FilterMixin=FilterMixin;var vaadinGridFilterMixin={FilterMixin:FilterMixin};/**
   @license
   Copyright (c) 2017 Vaadin Ltd.
   This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   */ /**
       * @polymerMixin
       */_exports.$vaadinGridFilterMixin=vaadinGridFilterMixin;const KeyboardNavigationMixin=superClass=>class KeyboardNavigationMixin extends superClass{static get properties(){return{_headerFocusable:{type:Object,observer:"_focusableChanged"},_itemsFocusable:{type:Object,observer:"_focusableChanged"},_footerFocusable:{type:Object,observer:"_focusableChanged"},_navigatingIsHidden:Boolean,_focusedItemIndex:{type:Number,value:0},_focusedColumnOrder:Number}}ready(){super.ready();if(this._ios||this._android){// Disable keyboard navigation on mobile devices
return}this.addEventListener("keydown",this._onKeyDown);this.addEventListener("focusin",this._onFocusIn);this.addEventListener("focusout",this._onFocusOut);// When focus goes from cell to another cell, focusin/focusout events do
// not escape the grid’s shadowRoot, thus listening inside the shadowRoot.
this.$.table.addEventListener("focusin",this._onCellFocusIn.bind(this));this.$.table.addEventListener("focusout",this._onCellFocusOut.bind(this));this.addEventListener("mousedown",()=>{this._toggleAttribute("navigating",!1,this);this._isMousedown=!0});this.addEventListener("mouseup",()=>this._isMousedown=!1)}_focusableChanged(focusable,oldFocusable){if(oldFocusable){oldFocusable.setAttribute("tabindex","-1")}if(focusable){focusable.setAttribute("tabindex","0")}}_onKeyDown(e){// Ensure standard key value, unified across browsers
let key=e.key;if("Up"===key||"Down"===key||"Left"===key||"Right"===key){// MSIE & Edge
key="Arrow"+key}if("Esc"===key){// MSIE & Edge
key="Escape"}if("Spacebar"===key){// MSIE
key=" "}let keyGroup;switch(key){case"ArrowUp":case"ArrowDown":case"ArrowLeft":case"ArrowRight":case"PageUp":case"PageDown":case"Home":case"End":keyGroup="Navigation";break;case"Enter":case"Escape":case"F2":keyGroup="Interaction";break;case"Tab":keyGroup="Tab";break;case" ":keyGroup="Space";break;}this._detectInteracting(e);if(this.hasAttribute("interacting")&&"Interaction"!==keyGroup){// When in the interacting mode, only the “Interaction” keys are handled.
keyGroup=void 0}if(keyGroup){this[`_on${keyGroup}KeyDown`](e,key)}}_ensureScrolledToIndex(index){const targetRowInDom=Array.from(this.$.items.children).filter(child=>child.index===index)[0];if(!targetRowInDom){this._scrollToIndex(index)}}_onNavigationKeyDown(e,key){e.preventDefault();function indexOfChildElement(el){return Array.prototype.indexOf.call(el.parentNode.children,el)}const visibleItemsCount=this._lastVisibleIndex-this._firstVisibleIndex-1;let dx=0,dy=0;switch(key){case"ArrowRight":dx=1;break;case"ArrowLeft":dx=-1;break;case"Home":dx=-Infinity;e.ctrlKey&&(dy=-Infinity);break;case"End":dx=1/0;e.ctrlKey&&(dy=1/0);break;case"ArrowDown":dy=1;break;case"ArrowUp":dy=-1;break;case"PageDown":dy=visibleItemsCount;break;case"PageUp":dy=-visibleItemsCount;break;}const activeCell=e.composedPath()[0],columnIndex=indexOfChildElement(activeCell),isRowDetails=this._elementMatches(activeCell,"[part~=\"details-cell\"]"),activeRow=activeCell.parentNode,activeRowGroup=activeRow.parentNode,maxRowIndex=(activeRowGroup===this.$.items?this._effectiveSize:activeRowGroup.children.length)-1,rowIndex=activeRowGroup===this.$.items?this._focusedItemIndex!==void 0?this._focusedItemIndex:activeRow.index:indexOfChildElement(activeRow);// Index of the destination row
let dstRowIndex=Math.max(0,Math.min(rowIndex+dy,maxRowIndex)),dstIsRowDetails=!1;// Row details navigation logic
if(activeRowGroup===this.$.items){const item=activeRow._item,dstItem=this._cache.getItemForIndex(dstRowIndex);// Should we navigate to row details?
if(isRowDetails){dstIsRowDetails=0===dy}else{dstIsRowDetails=1===dy&&this._isDetailsOpened(item)||-1===dy&&dstRowIndex!==rowIndex&&this._isDetailsOpened(dstItem)}// Should we navigate between details and regular cells of the same row?
if(dstIsRowDetails!==isRowDetails&&(1===dy&&dstIsRowDetails||-1===dy&&!dstIsRowDetails)){dstRowIndex=rowIndex}}// Header and footer could have hidden rows, e. g., if none of the columns
// or groups on the given column tree level define template. Skip them
// in vertical keyboard navigation.
if(activeRowGroup!==this.$.items){if(dstRowIndex>rowIndex){while(dstRowIndex<maxRowIndex&&activeRowGroup.children[dstRowIndex].hidden){dstRowIndex++}}else if(dstRowIndex<rowIndex){while(0<dstRowIndex&&activeRowGroup.children[dstRowIndex].hidden){dstRowIndex--}}}// _focusedColumnOrder is memoized — this is to ensure predictable
// navigation when entering and leaving detail and column group cells.
if(this._focusedColumnOrder===void 0){if(isRowDetails){this._focusedColumnOrder=0}else{this._focusedColumnOrder=this._getColumns(activeRowGroup,rowIndex)[columnIndex]._order}}// Find orderedColumnIndex — the index of order closest matching the
// original _focusedColumnOrder in the sorted array of orders
// of the visible columns on the destination row.
const dstColumns=this._getColumns(activeRowGroup,dstRowIndex),dstSortedColumnOrders=dstColumns.filter(c=>!c.hidden).map(c=>c._order).sort((b,a)=>b-a),maxOrderedColumnIndex=dstSortedColumnOrders.length-1,orderedColumnIndex=dstSortedColumnOrders.indexOf(dstSortedColumnOrders.slice(0).sort((b,a)=>Math.abs(b-this._focusedColumnOrder)-Math.abs(a-this._focusedColumnOrder))[0]),dstOrderedColumnIndex=0===dy&&isRowDetails?orderedColumnIndex:Math.max(0,Math.min(orderedColumnIndex+dx,maxOrderedColumnIndex));if(dstOrderedColumnIndex!==orderedColumnIndex){// Horizontal movement invalidates stored _focusedColumnOrder
this._focusedColumnOrder=void 0}// Ensure correct vertical scroll position, destination row is visible
if(activeRowGroup===this.$.items){this._ensureScrolledToIndex(dstRowIndex)}// This has to be set after scrolling, otherwise it can be removed by
// `_preventScrollerRotatingCellFocus(item, index)` during scrolling.
this._toggleAttribute("navigating",!0,this);const columnIndexByOrder=dstColumns.reduce((acc,col,i)=>(acc[col._order]=i,acc),{}),dstColumnIndex=columnIndexByOrder[dstSortedColumnOrders[dstOrderedColumnIndex]],dstRow=activeRowGroup===this.$.items?Array.from(activeRowGroup.children).filter(el=>el.index===dstRowIndex)[0]:activeRowGroup.children[dstRowIndex];if(!dstRow){return}// Here we go!
const dstCell=dstIsRowDetails?Array.from(dstRow.children).filter(el=>this._elementMatches(el,"[part~=\"details-cell\"]"))[0]:dstRow.children[dstColumnIndex];this._scrollHorizontallyToCell(dstCell);if(activeRowGroup===this.$.items){// When scrolling with repeated keydown, sometimes FocusEvent listeners
// are too late to update _focusedItemIndex. Ensure next keydown
// listener invocation gets updated _focusedItemIndex value.
this._focusedItemIndex=dstRowIndex}if(activeRowGroup===this.$.items){const dstRect=dstCell.getBoundingClientRect(),footerTop=this.$.footer.getBoundingClientRect().top,headerBottom=this.$.header.getBoundingClientRect().bottom;if(dstRect.bottom>footerTop){this.$.table.scrollTop+=dstRect.bottom-footerTop;this._scrollHandler()}else if(dstRect.top<headerBottom){this.$.table.scrollTop-=headerBottom-dstRect.top;this._scrollHandler()}}dstCell.focus()}_parseEventPath(path){const tableIndex=path.indexOf(this.$.table);return{rowGroup:path[tableIndex-1],row:path[tableIndex-2],cell:path[tableIndex-3]}}_onInteractionKeyDown(e,key){const localTarget=e.composedPath()[0],localTargetIsTextInput="input"===localTarget.localName&&!/^(button|checkbox|color|file|image|radio|range|reset|submit)$/i.test(localTarget.type);let wantInteracting;switch(key){case"Enter":wantInteracting=this.hasAttribute("interacting")?!localTargetIsTextInput:!0;break;case"Escape":wantInteracting=!1;break;case"F2":wantInteracting=!this.hasAttribute("interacting");break;}const{cell}=this._parseEventPath(e.composedPath());if(this.hasAttribute("interacting")!==wantInteracting){if(wantInteracting){const focusTarget=cell._content.querySelector("[focus-target]")||cell._content.firstElementChild;if(focusTarget){e.preventDefault();focusTarget.focus();this._toggleAttribute("interacting",!0,this);this._toggleAttribute("navigating",!1,this)}}else{e.preventDefault();this._focusedColumnOrder=void 0;cell.focus();this._toggleAttribute("interacting",!1,this);this._toggleAttribute("navigating",!0,this)}}}_predictFocusStepTarget(srcElement,step){const tabOrder=[this.$.table,this._headerFocusable,this._itemsFocusable,this._footerFocusable,this.$.focusexit];let index=tabOrder.indexOf(srcElement);index+=step;while(0<=index&&index<=tabOrder.length-1&&(!tabOrder[index]||tabOrder[index].parentNode.hidden)){index+=step}return tabOrder[index]}_onTabKeyDown(e){const focusTarget=this._predictFocusStepTarget(e.composedPath()[0],e.shiftKey?-1:1);if(focusTarget===this.$.table){// The focus is about to exit the grid to the top.
this.$.table.focus()}else if(focusTarget===this.$.focusexit){// The focus is about to exit the grid to the bottom.
this.$.focusexit.focus()}else if(focusTarget===this._itemsFocusable){let itemsFocusTarget=focusTarget;const targetRow=this._itemsFocusable.parentNode;this._ensureScrolledToIndex(this._focusedItemIndex);if(targetRow.index!==this._focusedItemIndex){// The target row, which is about to be focused next, has been
// assigned with a new index since last focus, probably because of
// scrolling. Focus the row for the stored focused item index instead.
const columnIndex=Array.from(targetRow.children).indexOf(this._itemsFocusable),focusedItemRow=Array.from(this.$.items.children).filter(row=>row.index===this._focusedItemIndex)[0];if(focusedItemRow){itemsFocusTarget=focusedItemRow.children[columnIndex]}}e.preventDefault();itemsFocusTarget.focus()}else{e.preventDefault();focusTarget.focus()}this._toggleAttribute("navigating",!0,this)}_onSpaceKeyDown(e){e.preventDefault();const cell=e.composedPath()[0];if(cell._content&&cell._content.firstElementChild){const wasNavigating=this.hasAttribute("navigating");cell._content.firstElementChild.click();this._toggleAttribute("navigating",wasNavigating,this)}else{this.dispatchEvent(new CustomEvent("cell-activate",{detail:{model:this.__getRowModel(cell.parentElement)}}))}}_onFocusIn(e){if(!this._isMousedown){this._toggleAttribute("navigating",!0,this)}const rootTarget=e.composedPath()[0];if(rootTarget===this.$.table||rootTarget===this.$.focusexit){// The focus enters the top (bottom) of the grid, meaning that user has
// tabbed (shift-tabbed) into the grid. Move the focus to
// the first (the last) focusable.
this._predictFocusStepTarget(rootTarget,rootTarget===this.$.table?1:-1).focus();this._toggleAttribute("interacting",!1,this)}else{this._detectInteracting(e)}}_onFocusOut(e){this._toggleAttribute("navigating",!1,this);this._detectInteracting(e)}_onCellFocusIn(e){this._detectInteracting(e);if(3===e.composedPath().indexOf(this.$.table)){const cell=e.composedPath()[0];this._activeRowGroup=cell.parentNode.parentNode;if(this._activeRowGroup===this.$.header){this._headerFocusable=cell}else if(this._activeRowGroup===this.$.items){this._itemsFocusable=cell}else if(this._activeRowGroup===this.$.footer){this._footerFocusable=cell}// Inform cell content of the focus (used in <vaadin-grid-sorter>)
cell._content.dispatchEvent(new CustomEvent("cell-focusin",{bubbles:!1}))}this._detectFocusedItemIndex(e)}_onCellFocusOut(e){if(3===e.composedPath().indexOf(this.$.table)){const cell=e.composedPath()[0];// Inform cell content of the focus (used in <vaadin-grid-sorter>)
cell._content.dispatchEvent(new CustomEvent("cell-focusout",{bubbles:!1}))}}_detectInteracting(e){this._toggleAttribute("interacting",e.composedPath().some(el=>"vaadin-grid-cell-content"===el.localName),this)}_detectFocusedItemIndex(e){const{rowGroup,row}=this._parseEventPath(e.composedPath());if(rowGroup===this.$.items){this._focusedItemIndex=row.index}}_preventScrollerRotatingCellFocus(item,index){if(item.index===this._focusedItemIndex&&this.hasAttribute("navigating")&&this._activeRowGroup===this.$.items){// Focused item has went, hide navigation mode
this._navigatingIsHidden=!0;this._toggleAttribute("navigating",!1,this)}if(index===this._focusedItemIndex&&this._navigatingIsHidden){// Focused item is back, restore navigation mode
this._navigatingIsHidden=!1;this._toggleAttribute("navigating",!0,this)}}_getColumns(rowGroup,rowIndex){let columnTreeLevel=this._columnTree.length-1;if(rowGroup===this.$.header){columnTreeLevel=rowIndex}else if(rowGroup===this.$.footer){columnTreeLevel=this._columnTree.length-1-rowIndex}return this._columnTree[columnTreeLevel]}_resetKeyboardNavigation(){if(this.$.header.firstElementChild){this._headerFocusable=Array.from(this.$.header.firstElementChild.children).filter(el=>!el.hidden)[0]}if(this.$.items.firstElementChild){const firstVisibleIndexRow=this._iterateItems((pidx,vidx)=>{if(this._firstVisibleIndex===vidx){return this.$.items.children[pidx]}});if(firstVisibleIndexRow){this._itemsFocusable=Array.from(firstVisibleIndexRow.children).filter(el=>!el.hidden)[0]}}if(this.$.footer.firstElementChild){this._footerFocusable=Array.from(this.$.footer.firstElementChild.children).filter(el=>!el.hidden)[0]}}_scrollHorizontallyToCell(dstCell){if(dstCell.hasAttribute("frozen")||this._elementMatches(dstCell,"[part~=\"details-cell\"]")){// These cells are, by design, always visible, no need to scroll.
return}const dstCellRect=dstCell.getBoundingClientRect(),dstRow=dstCell.parentNode,dstCellIndex=Array.from(dstRow.children).indexOf(dstCell),tableRect=this.$.table.getBoundingClientRect();let leftBoundary=tableRect.left,rightBoundary=tableRect.right;for(let i=dstCellIndex-1;0<=i;i--){const cell=dstRow.children[i];if(cell.hasAttribute("hidden")||this._elementMatches(cell,"[part~=\"details-cell\"]")){continue}if(cell.hasAttribute("frozen")){leftBoundary=cell.getBoundingClientRect().right;break}}for(let i=dstCellIndex+1;i<dstRow.children.length;i++){const cell=dstRow.children[i];if(cell.hasAttribute("hidden")||this._elementMatches(cell,"[part~=\"details-cell\"]")){continue}if(cell.hasAttribute("frozen")){rightBoundary=cell.getBoundingClientRect().left;break}}if(dstCellRect.left<leftBoundary){this.$.table.scrollLeft+=Math.round(dstCellRect.left-leftBoundary)}if(dstCellRect.right>rightBoundary){this.$.table.scrollLeft+=Math.round(dstCellRect.right-rightBoundary)}}_elementMatches(el,query){return el.matches?el.matches(query):-1!==Array.from(el.parentNode.querySelectorAll(query)).indexOf(el)}};_exports.KeyboardNavigationMixin=KeyboardNavigationMixin;var vaadinGridKeyboardNavigationMixin={KeyboardNavigationMixin:KeyboardNavigationMixin};_exports.$vaadinGridKeyboardNavigationMixin=vaadinGridKeyboardNavigationMixin;class GridOuterScrollerElement extends class extends _bbbbcSegmentTracker.PolymerElement{}{static get template(){return _bbbbcSegmentTracker.html$1`
    <style>
      :host {
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        box-sizing: border-box;
        overflow: auto;
      }

      :host([passthrough]) {
        pointer-events: none;
      }
    </style>

    <slot></slot>
`}static get is(){return"vaadin-grid-outer-scroller"}static get properties(){return{scrollTarget:{type:Object},scrollHandler:{type:Object},passthrough:{type:Boolean,reflectToAttribute:!0,value:!0},outerScrolling:Boolean,noScrollbars:Boolean,_touchDevice:Boolean}}ready(){super.ready();this.addEventListener("scroll",()=>this._syncScrollTarget());this.parentElement.addEventListener("mousemove",this._onMouseMove.bind(this));// for some reason scroll bars are hidden in iOS if this style is
// added in stylesheets or before attaching.
this.style.webkitOverflowScrolling="touch";this.addEventListener("mousedown",_=>this.outerScrolling=!0);this.addEventListener("mouseup",_=>{this.outerScrolling=!1;this.scrollHandler._scrollHandler()})}_onMouseMove(e){// Ignore mousemove events on touch devices
if(!this._touchDevice){if(this.noScrollbars&&this.parentElement.hasAttribute("scroll-period")){this.passthrough=e.offsetY<=this.clientHeight-20&&e.offsetX<=this.clientWidth-20}else{this.passthrough=e.offsetY<=this.clientHeight&&e.offsetX<=this.clientWidth}}}syncOuterScroller(){this.scrollTop=this.scrollTarget.scrollTop;this.scrollLeft=this.scrollTarget.scrollLeft}_syncScrollTarget(){requestAnimationFrame(()=>{this.scrollTarget.scrollTop=this.scrollTop;this.scrollTarget.scrollLeft=this.scrollLeft;this.scrollHandler._scrollHandler()})}}customElements.define(GridOuterScrollerElement.is,GridOuterScrollerElement);const RowDetailsMixin=superClass=>class RowDetailsMixin extends superClass{static get properties(){return{/**
       * An array containing references to items with open row details.
       */detailsOpenedItems:{type:Array,value:function(){return[]}},_rowDetailsTemplate:Object,/**
       * Custom function for rendering the content of the row details.
       * Receives three arguments:
       *
       * - `root` The row details content DOM element. Append your content to it.
       * - `grid` The `<vaadin-grid>` element.
       * - `rowData` The object with the properties related with
       *   the rendered item, contains:
       *   - `rowData.index` The index of the item.
       *   - `rowData.item` The item.
       */rowDetailsRenderer:Function,_detailsCells:{type:Array}}}static get observers(){return["_detailsOpenedItemsChanged(detailsOpenedItems.*, _rowDetailsTemplate, rowDetailsRenderer)","_rowDetailsTemplateOrRendererChanged(_rowDetailsTemplate, rowDetailsRenderer)"]}_rowDetailsTemplateOrRendererChanged(rowDetailsTemplate,rowDetailsRenderer){if(rowDetailsTemplate&&rowDetailsRenderer){throw new Error("You should only use either a renderer or a template for row details")}if(rowDetailsTemplate||rowDetailsRenderer){if(rowDetailsTemplate&&!rowDetailsTemplate.templatizer){var templatizer=new GridTemplatizer;templatizer._grid=this;templatizer.dataHost=this.dataHost;templatizer.template=rowDetailsTemplate;rowDetailsTemplate.templatizer=templatizer}if(this._columnTree){// Only update the rows if the column tree has already been initialized
Array.from(this.$.items.children).forEach(row=>{if(!row.querySelector("[part~=details-cell]")){this._updateRow(row,this._columnTree[this._columnTree.length-1]);this._a11yUpdateRowDetailsOpened(row,!1)}// Clear any old template instances
delete row.querySelector("[part~=details-cell]")._instance})}if(this.detailsOpenedItems.length){Array.from(this.$.items.children).forEach(this._toggleDetailsCell,this);this._update()}}}_detailsOpenedItemsChanged(changeRecord,rowDetailsTemplate,rowDetailsRenderer){if("detailsOpenedItems.length"===changeRecord.path||!changeRecord.value){// Let’s avoid duplicate work of both “.splices” and “.length” updates.
return}Array.from(this.$.items.children).forEach(row=>{this._toggleDetailsCell(row,row._item);this._a11yUpdateRowDetailsOpened(row,this._isDetailsOpened(row._item));this._toggleAttribute("details-opened",this._isDetailsOpened(row._item),row)})}_configureDetailsCell(cell){cell.setAttribute("part","cell details-cell");// Freeze the details cell, so that it does not scroll horizontally
// with the normal cells. This way it looks less weird.
this._toggleAttribute("frozen",!0,cell)}_toggleDetailsCell(row,item){const cell=row.querySelector("[part~=\"details-cell\"]");if(!cell){return}const detailsHidden=!this._isDetailsOpened(item),hiddenChanged=!!cell.hidden!==detailsHidden;if(!cell._instance&&!cell._renderer||cell.hidden!==detailsHidden){cell.hidden=detailsHidden;if(detailsHidden){row.style.removeProperty("padding-bottom")}else{if(this.rowDetailsRenderer){cell._renderer=this.rowDetailsRenderer;cell._renderer.call(this,cell._content,this,{index:row.index,item:item})}else if(this._rowDetailsTemplate&&!cell._instance){// Stamp the template
cell._instance=this._rowDetailsTemplate.templatizer.createInstance();cell._content.innerHTML="";cell._content.appendChild(cell._instance.root);this._updateItem(row,item)}(0,_bbbbcSegmentTracker.flush)();row.style.setProperty("padding-bottom",`${cell.offsetHeight}px`);requestAnimationFrame(()=>this.notifyResize())}}if(hiddenChanged){this._updateMetrics();this._positionItems()}}_updateDetailsCellHeights(){Array.from(this.$.items.querySelectorAll("[part~=\"details-cell\"]:not([hidden])")).forEach(cell=>{cell.parentElement.style.setProperty("padding-bottom",`${cell.offsetHeight}px`)})}_isDetailsOpened(item){return this.detailsOpenedItems&&-1!==this._getItemIndexInArray(item,this.detailsOpenedItems)}/**
     * Open the details row of a given item.
     */openItemDetails(item){if(!this._isDetailsOpened(item)){this.push("detailsOpenedItems",item)}}/**
     * Close the details row of a given item.
     */closeItemDetails(item){if(this._isDetailsOpened(item)){this.splice("detailsOpenedItems",this._getItemIndexInArray(item,this.detailsOpenedItems),1)}}_detailsOpenedInstanceChangedCallback(instance,value){if(super._detailsOpenedInstanceChangedCallback){super._detailsOpenedInstanceChangedCallback(instance,value)}if(value){this.openItemDetails(instance.item)}else{this.closeItemDetails(instance.item)}}};_exports.RowDetailsMixin=RowDetailsMixin;var vaadinGridRowDetailsMixin={RowDetailsMixin:RowDetailsMixin};_exports.$vaadinGridRowDetailsMixin=vaadinGridRowDetailsMixin;const ScrollMixin=superClass=>class ScrollMixin extends superClass{get _timeouts(){return{SCROLL_PERIOD:1e3,WHEEL_SCROLLING:200,SCROLLING:100,IGNORE_WHEEL:500}}static get properties(){return{// Cached array of frozen cells
_frozenCells:{type:Array,value:function(){return[]}},_scrollbarWidth:{type:Number,value:function(){// Create the measurement node
var scrollDiv=document.createElement("div");scrollDiv.style.width="100px";scrollDiv.style.height="100px";scrollDiv.style.overflow="scroll";scrollDiv.style.position="absolute";scrollDiv.style.top="-9999px";document.body.appendChild(scrollDiv);// Get the scrollbar width
var scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth;// Delete the DIV
document.body.removeChild(scrollDiv);return scrollbarWidth}},_rowWithFocusedElement:Element,_deltaYAcc:{type:Number,value:0}}}static get observers(){return["_scrollHeightUpdated(_estScrollHeight)"]}// Override (from iron-scroll-target-behavior) to avoid document scroll
set _scrollTop(top){this.$.table.scrollTop=top}get _scrollTop(){return this.$.table.scrollTop}ready(){super.ready();this.scrollTarget=this.$.table;this.addEventListener("wheel",e=>{this._wheelScrolling=!0;this._debouncerWheelScrolling=_bbbbcSegmentTracker.Debouncer.debounce(this._debouncerWheelScrolling,_bbbbcSegmentTracker.timeOut.after(this._timeouts.WHEEL_SCROLLING),()=>this._wheelScrolling=!1);this._onWheel(e)});this.$.table.addEventListener("scroll",e=>{if(this.$.outerscroller.outerScrolling){e.stopImmediatePropagation()}},!0);this.$.items.addEventListener("focusin",e=>{const itemsIndex=e.composedPath().indexOf(this.$.items);this._rowWithFocusedElement=e.composedPath()[itemsIndex-1]});this.$.items.addEventListener("focusout",()=>this._rowWithFocusedElement=void 0)}_onWheel(e){if(e.ctrlKey||this._hasScrolledAncestor(e.target,e.deltaX,e.deltaY)){return}var table=this.$.table,deltaY=e.deltaY;if(1===e.deltaMode){// Mode 1 == scrolling by lines instead of pixels
deltaY*=this._physicalAverage}if(this._wheelAnimationFrame){// Skip new wheel events while one is being processed
this._deltaYAcc+=deltaY;e.preventDefault();return}deltaY+=this._deltaYAcc;this._deltaYAcc=0;this._wheelAnimationFrame=!0;this._debouncerWheelAnimationFrame=_bbbbcSegmentTracker.Debouncer.debounce(this._debouncerWheelAnimationFrame,_bbbbcSegmentTracker.animationFrame,()=>this._wheelAnimationFrame=!1);var momentum=Math.abs(e.deltaX)+Math.abs(deltaY);if(this._canScroll(table,e.deltaX,deltaY)){e.preventDefault();table.scrollTop+=deltaY;table.scrollLeft+=e.deltaX;this._scrollHandler();this._hasResidualMomentum=!0;this._ignoreNewWheel=!0;this._debouncerIgnoreNewWheel=_bbbbcSegmentTracker.Debouncer.debounce(this._debouncerIgnoreNewWheel,_bbbbcSegmentTracker.timeOut.after(this._timeouts.IGNORE_WHEEL),()=>this._ignoreNewWheel=!1)}else if(this._hasResidualMomentum&&momentum<=this._previousMomentum||this._ignoreNewWheel){e.preventDefault()}else if(momentum>this._previousMomentum){this._hasResidualMomentum=!1}this._previousMomentum=momentum}/**
     * Determines if the element has an ancestor prior to this
     * cell content that handles the scroll delta
     */_hasScrolledAncestor(el,deltaX,deltaY){if("vaadin-grid-cell-content"===el.localName){return!1}else if(this._canScroll(el,deltaX,deltaY)&&-1!==["auto","scroll"].indexOf(getComputedStyle(el).overflow)){return!0}else if(el!==this&&el.parentElement){return this._hasScrolledAncestor(el.parentElement,deltaX,deltaY)}}/**
     * Determines if the the given scroll deltas can be applied to the element
     * (fully or partially)
     */_canScroll(el,deltaX,deltaY){return 0<deltaY&&el.scrollTop<el.scrollHeight-el.offsetHeight||0>deltaY&&0<el.scrollTop||0<deltaX&&el.scrollLeft<el.scrollWidth-el.offsetWidth||0>deltaX&&0<el.scrollLeft}_scheduleScrolling(){if(!this._scrollingFrame){// Defer setting state attributes to avoid Edge hiccups
this._scrollingFrame=requestAnimationFrame(()=>this._toggleAttribute("scrolling",!0,this.$.scroller))}this._debounceScrolling=_bbbbcSegmentTracker.Debouncer.debounce(this._debounceScrolling,_bbbbcSegmentTracker.timeOut.after(this._timeouts.SCROLLING),()=>{cancelAnimationFrame(this._scrollingFrame);delete this._scrollingFrame;this._toggleAttribute("scrolling",!1,this.$.scroller);if(!this.$.outerscroller.outerScrolling){this._reorderRows()}});if(!this._scrollPeriodFrame){this._scrollPeriodFrame=requestAnimationFrame(()=>this._toggleAttribute("scroll-period",!0,this.$.scroller))}this._debounceScrollPeriod=_bbbbcSegmentTracker.Debouncer.debounce(this._debounceScrollPeriod,_bbbbcSegmentTracker.timeOut.after(this._timeouts.SCROLL_PERIOD),()=>{cancelAnimationFrame(this._scrollPeriodFrame);delete this._scrollPeriodFrame;this._toggleAttribute("scroll-period",!1,this.$.scroller)})}_afterScroll(){this._translateStationaryElements();if(!this.hasAttribute("reordering")){this._scheduleScrolling()}const os=this.$.outerscroller;if(!this._ios&&(this._wheelScrolling||os.passthrough)){os.syncOuterScroller()}if(this._ios){// Enable vertical rubberband feedback
const overScroll=Math.max(-os.scrollTop,0)||Math.min(0,os.scrollHeight-os.scrollTop-os.offsetHeight);this.$.items.style.transform=`translateY(${overScroll}px)`}this._updateOverflow()}_updateOverflow(){// Set overflow styling attributes
let overflow="";const table=this.$.table;if(table.scrollTop<table.scrollHeight-table.clientHeight){overflow+=" bottom"}if(0<table.scrollTop){overflow+=" top"}if(table.scrollLeft<table.scrollWidth-table.clientWidth){overflow+=" right"}if(0<table.scrollLeft){overflow+=" left"}this._debounceOverflow=_bbbbcSegmentTracker.Debouncer.debounce(this._debounceOverflow,_bbbbcSegmentTracker.animationFrame,()=>{const value=overflow.trim();if(0<value.length&&this.getAttribute("overflow")!==value){this.setAttribute("overflow",value)}else if(0==value.length&&this.hasAttribute("overflow")){this.removeAttribute("overflow")}})}// correct order needed for preserving correct tab order between cell contents.
_reorderRows(){const body=this.$.items,items=body.querySelectorAll("tr");if(!items.length){return}const adjustedVirtualStart=this._virtualStart+this._vidxOffset,targetRow=this._rowWithFocusedElement||Array.from(items).filter(row=>!row.hidden)[0];// Which row to use as a target?
if(!targetRow){// All rows are hidden, don't reorder
return}// Where the target row should be?
const targetPhysicalIndex=targetRow.index-adjustedVirtualStart,delta=Array.from(items).indexOf(targetRow)-targetPhysicalIndex;// Reodrer the DOM elements to keep the target row at the target physical index
if(0<delta){for(let i=0;i<delta;i++){body.appendChild(items[i])}}else if(0>delta){for(let i=items.length+delta;i<items.length;i++){body.insertBefore(items[i],items[0])}}}_frozenCellsChanged(){this._debouncerCacheElements=_bbbbcSegmentTracker.Debouncer.debounce(this._debouncerCacheElements,_bbbbcSegmentTracker.microTask,()=>{Array.from(this.root.querySelectorAll("[part~=\"cell\"]")).forEach(function(cell){cell.style.transform=""});this._frozenCells=Array.prototype.slice.call(this.$.table.querySelectorAll("[frozen]"));this._translateStationaryElements()});this._updateLastFrozen()}_updateLastFrozen(){if(!this._columnTree){return}const columnsRow=this._columnTree[this._columnTree.length-1].slice(0);columnsRow.sort((a,b)=>{return a._order-b._order});const lastFrozen=columnsRow.reduce((prev,col,index)=>{col._lastFrozen=!1;return col.frozen&&!col.hidden?index:prev},void 0);if(lastFrozen!==void 0){columnsRow[lastFrozen]._lastFrozen=!0}}_translateStationaryElements(){if(this._edge&&!this._scrollbarWidth){// Fixed mode (Tablet Edge)
this.$.items.style.transform=this._getTranslate(-this._scrollLeft||0,-this._scrollTop||0);this.$.footer.style.transform=this.$.header.style.transform=this._getTranslate(-this._scrollLeft||0,0)}else{this.$.footer.style.transform=this.$.header.style.transform=this._getTranslate(0,this._scrollTop)}for(var frozenCellTransform=this._getTranslate(this._scrollLeft,0),i=0;i<this._frozenCells.length;i++){this._frozenCells[i].style.transform=frozenCellTransform}}_getTranslate(x,y){return"translate("+x+"px,"+y+"px)"}_scrollHeightUpdated(_estScrollHeight){this.$.outersizer.style.top=this.$.fixedsizer.style.top=_estScrollHeight+"px"}};_exports.ScrollMixin=ScrollMixin;var vaadinGridScrollMixin={ScrollMixin:ScrollMixin};_exports.$vaadinGridScrollMixin=vaadinGridScrollMixin;class GridScrollerElement extends PolymerIronList{static get is(){return"vaadin-grid-scroller"}static get properties(){return{size:{type:Number,notify:!0},_vidxOffset:{value:0}}}static get observers(){return["_effectiveSizeChanged(_effectiveSize)"]}connectedCallback(){super.connectedCallback();this._scrollHandler()}/**
    * @protected
    */_updateScrollerItem(item,index){}/**
                                      * @protected
                                      */_afterScroll(){}/**
                    * @protected
                    */_getRowTarget(){}/**
                     * @protected
                     */_createScrollerRows(){}/**
                           * @protected
                           */_canPopulate(){}/**
                    * @private
                    */scrollToIndex(index){this._warnPrivateAPIAccess("scrollToIndex");if(0<index){this._pendingScrollToIndex=null}if(!parseInt(this.$.items.style.borderTopWidth)&&0<index){// Schedule another scroll to be invoked once init is complete
this._pendingScrollToIndex=index}this._scrollingToIndex=!0;index=Math.min(Math.max(index,0),this._effectiveSize-1);this.$.table.scrollTop=index/this._effectiveSize*(this.$.table.scrollHeight-this.$.table.offsetHeight);this._scrollHandler();if(this._accessIronListAPI(()=>this._maxScrollTop)&&this._virtualCount<this._effectiveSize){this._adjustVirtualIndexOffset(1e6)}this._accessIronListAPI(()=>super.scrollToIndex(index-this._vidxOffset));this._scrollHandler();// Ensure scroll position
const row=Array.from(this.$.items.children).filter(child=>child.index===index)[0];if(row){const headerOffset=row.getBoundingClientRect().top-this.$.header.getBoundingClientRect().bottom;if(1<Math.abs(headerOffset)){this.$.table.scrollTop+=headerOffset;this._scrollHandler()}}this._scrollingToIndex=!1}_effectiveSizeChanged(size){let fvi,fviOffset=0;// first visible (adjusted) index
this._iterateItems((pidx,vidx)=>{if(vidx===this._firstVisibleIndex){const row=this._physicalItems[pidx];fvi=row.index;fviOffset=row.getBoundingClientRect().top}});if(this.items&&size<this.items.length){// Size was reduced, scroll to 0 first
this._scrollTop=0}if(!Array.isArray(this.items)){// Edge/IE seems to have the lowest maximum
const maxVirtualItems=this._edge||this._ie?3e4:1e5;this.items={length:Math.min(size,maxVirtualItems)}}this._accessIronListAPI(()=>super._itemsChanged({path:"items"}));this._virtualCount=Math.min(this.items.length,size)||0;if(0===this._scrollTop){this._accessIronListAPI(()=>this._scrollToIndex(Math.min(size-1,fvi)));this._iterateItems((pidx,vidx)=>{const row=this._physicalItems[pidx];if(row.index===fvi){this.$.table.scrollTop+=Math.round(row.getBoundingClientRect().top-fviOffset)}// Restore keyboard focus to the right cell
if(row.index===this._focusedItemIndex&&this._itemsFocusable&&this.$.items.contains(this.shadowRoot.activeElement)){const cellIndex=Array.from(this._itemsFocusable.parentElement.children).indexOf(this._itemsFocusable);row.children[cellIndex].focus()}})}this._assignModels();requestAnimationFrame(()=>this._update())}_positionItems(){this._adjustScrollPosition();let rePosition;if(isNaN(this._physicalTop)){rePosition=!0;this._physicalTop=0}let y=this._physicalTop;this._iterateItems((pidx,vidx)=>{this._physicalItems[pidx].style.transform=`translateY(${y}px)`;y+=this._physicalSizes[pidx]});if(rePosition){this._scrollToIndex(0)}}_increasePoolIfNeeded(count){if(0===count&&this._scrollingToIndex||!this._canPopulate()||!this._effectiveSize){return}if(!this._initialPoolCreated){this._initialPoolCreated=!0;super._increasePoolIfNeeded(25)}else if(this._optPhysicalSize!==1/0){this._debounceIncreasePool=_bbbbcSegmentTracker.Debouncer.debounce(this._debounceIncreasePool,_bbbbcSegmentTracker.animationFrame,()=>{this._updateMetrics();const remainingPhysicalSize=this._optPhysicalSize-this._physicalSize;let estimatedMissingRowCount=Math.ceil(remainingPhysicalSize/this._physicalAverage);if(this._physicalCount+estimatedMissingRowCount>this._effectiveSize){// Do not increase the physical item count above the this._effectiveSize
estimatedMissingRowCount=Math.max(0,this._effectiveSize-this._physicalCount)}if(this._physicalSize&&0<estimatedMissingRowCount){super._increasePoolIfNeeded(estimatedMissingRowCount);// Ensure the rows are in order after increasing pool
this.__reorderChildNodes()}})}}__reorderChildNodes(){const childNodes=Array.from(this.$.items.childNodes),rowsInOrder=!!childNodes.reduce((inOrder,current,currentIndex,array)=>{if(0===currentIndex||array[currentIndex-1].index===current.index-1){return inOrder}},!0);if(!rowsInOrder){childNodes.sort((row1,row2)=>{return row1.index-row2.index}).forEach(row=>this.$.items.appendChild(row))}}_createPool(size){const fragment=document.createDocumentFragment(),physicalItems=this._createScrollerRows(size);physicalItems.forEach(inst=>fragment.appendChild(inst));this._getRowTarget().appendChild(fragment);// Weird hack needed to get Safari to actually distribute slots
const content=this.querySelector("[slot]");if(content){const slot=content.getAttribute("slot");content.setAttribute("slot","foo-bar");content.setAttribute("slot",slot)}this._updateHeaderFooterMetrics();(0,_bbbbcSegmentTracker.afterNextRender)(this,()=>this.notifyResize());return physicalItems}/**
     * Assigns the data models to a given set of items.
     * @param {!Array<number>=} itemSet
     */_assignModels(itemSet){this._iterateItems((pidx,vidx)=>{const el=this._physicalItems[pidx];this._toggleAttribute("hidden",vidx>=this._effectiveSize,el);this._updateScrollerItem(el,vidx+(this._vidxOffset||0))},itemSet)}_scrollHandler(){const delta=this.$.table.scrollTop-this._scrollPosition;this._accessIronListAPI(super._scrollHandler);const oldOffset=this._vidxOffset;if(this._accessIronListAPI(()=>this._maxScrollTop)&&this._virtualCount<this._effectiveSize){this._adjustVirtualIndexOffset(delta)}if(this._vidxOffset!==oldOffset){this._update()}this._afterScroll()}_adjustVirtualIndexOffset(delta){if(1e4<Math.abs(delta)){if(this._noScale){this._noScale=!1;return}const scale=this.$.table.scrollTop/(this.$.table.scrollHeight-this.$.table.offsetHeight),offset=scale*this._effectiveSize;this._vidxOffset=Math.round(offset-scale*this._virtualCount)}else{// Make sure user can always swipe/wheel scroll to the start and end
const oldOffset=this._vidxOffset||0,threshold=1e3,maxShift=100;// At start
if(0===this._scrollTop){this._vidxOffset=0;if(oldOffset!==this._vidxOffset){super.scrollToIndex(0)}}else if(this.firstVisibleIndex<threshold&&0<this._vidxOffset){this._vidxOffset-=Math.min(this._vidxOffset,maxShift);if(oldOffset!==this._vidxOffset){super.scrollToIndex(this.firstVisibleIndex+(oldOffset-this._vidxOffset))}this._noScale=!0}// At end
const maxOffset=this._effectiveSize-this._virtualCount;if(this._scrollTop>=this._maxScrollTop&&0<this._maxScrollTop){this._vidxOffset=maxOffset;if(oldOffset!==this._vidxOffset){super.scrollToIndex(this._virtualCount)}}else if(this.firstVisibleIndex>this._virtualCount-threshold&&this._vidxOffset<maxOffset){this._vidxOffset+=Math.min(maxOffset-this._vidxOffset,maxShift);if(oldOffset!==this._vidxOffset){super.scrollToIndex(this.firstVisibleIndex-(this._vidxOffset-oldOffset))}this._noScale=!0}}}_accessIronListAPI(cb){this._warnPrivateAPIAccessAsyncEnabled=!1;const returnValue=cb.apply(this);this._debouncerWarnPrivateAPIAccess=_bbbbcSegmentTracker.Debouncer.debounce(this._debouncerWarnPrivateAPIAccess,_bbbbcSegmentTracker.animationFrame,()=>this._warnPrivateAPIAccessAsyncEnabled=!0);return returnValue}/* Allow iron-list to access its APIs from debounced callbacks without warns */_debounceRender(cb,asyncModule){super._debounceRender(()=>this._accessIronListAPI(cb),asyncModule)}/* Warn when iron-list APIs are being accessed directly */_warnPrivateAPIAccess(apiName){if(this._warnPrivateAPIAccessAsyncEnabled){console.warn(`Accessing private API (${apiName})!`)}}_render(){this._accessIronListAPI(super._render)}_createFocusBackfillItem(){/* Ignore */}_multiSelectionChanged(){/* Ignore */}clearSelection(){/* Ignore */}_itemsChanged(){/* Ignore */}_manageFocus(){/* Ignore */}_removeFocusedItem(){/* Ignore */}get _firstVisibleIndex(){return this._accessIronListAPI(()=>super.firstVisibleIndex)}get _lastVisibleIndex(){return this._accessIronListAPI(()=>super.lastVisibleIndex)}_scrollToIndex(index){this._accessIronListAPI(()=>this.scrollToIndex(index))}get firstVisibleIndex(){this._warnPrivateAPIAccess("firstVisibleIndex");return super.firstVisibleIndex}set firstVisibleIndex(value){this._warnPrivateAPIAccess("firstVisibleIndex");super.firstVisibleIndex=value}get lastVisibleIndex(){this._warnPrivateAPIAccess("lastVisibleIndex");return super.lastVisibleIndex}set lastVisibleIndex(value){this._warnPrivateAPIAccess("lastVisibleIndex");super.lastVisibleIndex=value}updateViewportBoundaries(){this._warnPrivateAPIAccess("updateViewportBoundaries");super.updateViewportBoundaries.apply(this,arguments)}_resizeHandler(){super._resizeHandler();(0,_bbbbcSegmentTracker.flush)()}}_exports.ScrollerElement=GridScrollerElement;customElements.define(GridScrollerElement.is,GridScrollerElement);var vaadinGridScroller={ScrollerElement:GridScrollerElement};/**
   @license
   Copyright (c) 2017 Vaadin Ltd.
   This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
   */ /**
       * @polymerMixin
       */_exports.$vaadinGridScroller=vaadinGridScroller;const SelectionMixin=superClass=>class SelectionMixin extends superClass{static get properties(){return{/**
       * An array that contains the selected items.
       */selectedItems:{type:Object,notify:!0,value:()=>[]}}}static get observers(){return["_selectedItemsChanged(selectedItems.*)"]}_isSelected(item){return this.selectedItems&&-1<this._getItemIndexInArray(item,this.selectedItems)}/**
     * Selects the given item.
     *
     * @method selectItem
     * @param {Object} item The item object
     */selectItem(item){if(!this._isSelected(item)){this.push("selectedItems",item)}}/**
     * Deselects the given item if it is already selected.
     *
     * @method deselect
     * @param {Object} item The item object
     */deselectItem(item){const index=this._getItemIndexInArray(item,this.selectedItems);if(-1<index){this.splice("selectedItems",index,1)}}/**
     * Toggles the selected state of the given item.
     *
     * @method toggle
     * @param {Object} item The item object
     */_toggleItem(item){const index=this._getItemIndexInArray(item,this.selectedItems);if(-1===index){this.selectItem(item)}else{this.deselectItem(item)}}_selectedItemsChanged(e){if(this.$.items.children.length&&("selectedItems"===e.path||"selectedItems.splices"===e.path)){Array.from(this.$.items.children).forEach(row=>{this._updateItem(row,row._item)})}}_selectedInstanceChangedCallback(instance,value){if(super._selectedInstanceChangedCallback){super._selectedInstanceChangedCallback(instance,value)}if(value){this.selectItem(instance.item)}else{this.deselectItem(instance.item)}}};_exports.SelectionMixin=SelectionMixin;var vaadinGridSelectionMixin={SelectionMixin:SelectionMixin};_exports.$vaadinGridSelectionMixin=vaadinGridSelectionMixin;const SortMixin=superClass=>class SortMixin extends superClass{static get properties(){return{/**
       * When `true`, all `<vaadin-grid-sorter>` are applied for sorting.
       */multiSort:{type:Boolean,value:!1},_sorters:{type:Array,value:function(){return[]}},_previousSorters:{type:Array,value:function(){return[]}}}}ready(){super.ready();this.addEventListener("sorter-changed",this._onSorterChanged);// With Polymer 2 & shady the 'sorter-changed' listener isn't guaranteed to be registered
// before child <vaadin-grid-sorter>'s upgrade and fire the events. The following
// makes sure that 'sorter-changed' is fired for all <vaadin-grid-sorter> elements
// after this (<vaadin-grid>) is ready (and the listeners are active).
if(window.ShadyDOM){_bbbbcSegmentTracker.microTask.run(()=>{const sorters=this.querySelectorAll("vaadin-grid-sorter");Array.from(sorters).forEach(sorter=>{// Don't try to fire if the sorter hasn't been upgraded yet
if(sorter instanceof _bbbbcSegmentTracker.PolymerElement){sorter.dispatchEvent(new CustomEvent("sorter-changed",{bubbles:!0,composed:!0}))}})})}}_onSorterChanged(e){const sorter=e.target;this._removeArrayItem(this._sorters,sorter);sorter._order=null;if(this.multiSort){if(sorter.direction){this._sorters.unshift(sorter)}this._sorters.forEach((sorter,index)=>sorter._order=1<this._sorters.length?index:null,this)}else{if(sorter.direction){this._sorters.forEach(sorter=>{sorter._order=null;sorter.direction=null});this._sorters=[sorter]}}e.stopPropagation();if(this.dataProvider&&// No need to clear cache if sorters didn't change
JSON.stringify(this._previousSorters)!==JSON.stringify(this._mapSorters())){this.clearCache()}this._a11yUpdateSorters();this._previousSorters=this._mapSorters()}_mapSorters(){return this._sorters.map(sorter=>{return{path:sorter.path,direction:sorter.direction}})}_removeArrayItem(array,item){const index=array.indexOf(item);if(-1<index){array.splice(index,1)}}};_exports.SortMixin=SortMixin;var vaadinGridSortMixin={SortMixin:SortMixin};_exports.$vaadinGridSortMixin=vaadinGridSortMixin;const VaadinGridStyles=document.createElement("dom-module");// NOTE(web-padawan): https://github.com/vaadin/vaadin-grid/issues/1514
VaadinGridStyles.appendChild(_bbbbcSegmentTracker.html$1`
  <style>
    @keyframes vaadin-grid-appear {
      to {
        opacity: 1;
      }
    }

    :host {
      display: block;
      animation: 1ms vaadin-grid-appear;
      height: 400px;
      flex: 1 1 auto;
      align-self: stretch;
      position: relative;
    }

    :host([hidden]) {
      display: none !important;
    }

    #scroller {
      display: block;
      transform: translateY(0);
      width: auto;
      height: auto;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    :host([height-by-rows]) {
      height: auto;
      align-self: flex-start;
      flex-grow: 0;
      width: 100%;
    }

    :host([height-by-rows]) #scroller {
      width: 100%;
      height: 100%;
      position: relative;
    }

    #table {
      display: block;
      width: 100%;
      height: 100%;
      overflow: auto;
      z-index: -2;
      position: relative;
      outline: none;
    }

    #header {
      display: block;
      position: absolute;
      top: 0;
      width: 100%;
    }

    th {
      text-align: inherit;
    }

    /* Safari doesn't work with "inherit" */
    [safari] th {
      text-align: initial;
    }

    #footer {
      display: block;
      position: absolute;
      bottom: 0;
      width: 100%;
    }

    #items {
      display: block;
      width: 100%;
      position: relative;
      z-index: -1;
    }

    #items,
    #outersizer,
    #fixedsizer {
      border-top: 0 solid transparent;
      border-bottom: 0 solid transparent;
    }

    [part~="row"] {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }

    [part~="row"][loading] [part~="body-cell"] ::slotted(vaadin-grid-cell-content) {
      opacity: 0;
    }

    #items [part~="row"] {
      position: absolute;
    }

    #items [part~="row"]:empty {
      height: 1em;
    }

    [part~="cell"]:not([part~="details-cell"]) {
      flex-shrink: 0;
      flex-grow: 1;
      box-sizing: border-box;
      display: flex;
      width: 100%;
      position: relative;
      align-items: center;
      padding: 0;
      white-space: nowrap;
    }

    [part~="details-cell"] {
      position: absolute;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 0;
    }

    [part~="cell"] ::slotted(vaadin-grid-cell-content) {
      display: block;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [hidden] {
      display: none !important;
    }

    [frozen] {
      z-index: 2;
      will-change: transform;
    }

    #outerscroller {
      /* Needed (at least) for Android Chrome */
      z-index: 0;
    }

    #scroller:not([safari]) #outerscroller {
      /* Needed for Android Chrome (#1020). Can't be applied to Safari
      since it would re-introduce the sub-pixel overflow bug (#853) */
      will-change: transform;
    }

    [no-scrollbars]:not([safari]):not([firefox]) #outerscroller,
    [no-scrollbars][safari] #table,
    [no-scrollbars][firefox] #table {
      overflow: hidden;
    }

    [no-scrollbars]:not([safari]):not([firefox]) #outerscroller {
      pointer-events: none;
    }

    /* Reordering styles */
    :host([reordering]) [part~="cell"] ::slotted(vaadin-grid-cell-content),
    :host([reordering]) [part~="resize-handle"],
    #scroller[no-content-pointer-events] [part~="cell"] ::slotted(vaadin-grid-cell-content) {
      pointer-events: none;
    }

    [part~="reorder-ghost"] {
      visibility: hidden;
      position: fixed;
      pointer-events: none;
      opacity: 0.5;

      /* Prevent overflowing the grid in Firefox */
      top: 0;
      left: 0;
    }

    :host([reordering]) {
      -moz-user-select: none;
      -webkit-user-select: none;
      user-select: none;
    }

    #scroller[ie][column-reordering-allowed] [part~="header-cell"] {
      -ms-user-select: none;
    }

    :host([reordering]) #outerscroller {
      -webkit-overflow-scrolling: auto !important;
    }

    /* Resizing styles */
    [part~="resize-handle"] {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      cursor: col-resize;
      z-index: 1;
    }

    [part~="resize-handle"]::before {
      position: absolute;
      content: "";
      height: 100%;
      width: 35px;
      transform: translateX(-50%);
    }

    [last-column] [part~="resize-handle"]::before,
    [last-frozen] [part~="resize-handle"]::before {
      width: 18px;
      transform: none;
      right: 0;
    }

    #scroller[column-resizing] {
      -ms-user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      user-select: none;
    }

    /* Sizer styles */
    .sizer {
      display: flex;
      position: relative;
      width: 100%;
      visibility: hidden;
    }

    .sizer [part~="details-cell"] {
      display: none !important;
    }

    .sizer [part~="cell"][hidden] {
      display: none !important;
    }

    .sizer [part~="cell"] {
      display: block;
      flex-shrink: 0;
      line-height: 0;
      margin-top: -1em;
      height: 0 !important;
      min-height: 0 !important;
      max-height: 0 !important;
      padding: 0 !important;
    }

    .sizer [part~="cell"]::before {
      content: "-";
    }

    .sizer [part~="cell"] ::slotted(vaadin-grid-cell-content) {
      display: none !important;
    }

    /* Fixed mode (Tablet Edge) */
    #fixedsizer {
      position: absolute;
    }

    :not([edge][no-scrollbars]) #fixedsizer {
      display: none;
    }

    [edge][no-scrollbars] {
      /* Any value other than ‘none’ for the transform results in the creation of both a stacking context and
      a containing block. The object acts as a containing block for fixed positioned descendants. */
      transform: translateZ(0);
      overflow: hidden;
    }

    [edge][no-scrollbars] #header,
    [edge][no-scrollbars] #footer {
      position: fixed;
    }

    [edge][no-scrollbars] #items {
      position: fixed;
      width: 100%;
      will-change: transform;
    }
  </style>
`);const safari=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),firefox=-1<navigator.userAgent.toLowerCase().indexOf("firefox");if(safari||firefox){const scrollingStyles=document.createElement("style");scrollingStyles.textContent=`
    [scrolling][safari] #outerscroller,
    [scrolling][firefox] #outerscroller {
      pointer-events: auto;
    }

    [ios] #outerscroller {
      pointer-events: auto;
      z-index: -3;
    }

    [ios][scrolling] #outerscroller {
      z-index: 0;
    }
  `;VaadinGridStyles.querySelector("template").content.appendChild(scrollingStyles)}VaadinGridStyles.register("vaadin-grid-styles");/**
                                                 @license
                                                 Copyright (c) 2018 Vaadin Ltd.
                                                 This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
                                                 */ /**
                                                     * @polymerMixin
                                                     */const StylingMixin=superClass=>class StylingMixin extends superClass{static get properties(){return{/**
       * A function that allows generating CSS class names for grid cells
       * based on their row and column. The return value should be the generated
       * class name as a string, or multiple class names separated by whitespace
       * characters.
       *
       * Receives two arguments:
       * - `column` The `<vaadin-grid-column>` element (`undefined` for details-cell).
       * - `rowData` The object with the properties related with
       *   the rendered item, contains:
       *   - `rowData.index` The index of the item.
       *   - `rowData.item` The item.
       *   - `rowData.expanded` Sublevel toggle state.
       *   - `rowData.level` Level of the tree represented with a horizontal offset of the toggle button.
       *   - `rowData.selected` Selected state.
       */cellClassNameGenerator:Function}}static get observers(){return["__cellClassNameGeneratorChanged(cellClassNameGenerator)"]}__cellClassNameGeneratorChanged(cellClassGenerator){this.generateCellClassNames()}/**
     * Runs the `cellClassNameGenerator` for the visible cells.
     * If the generator depends on varying conditions, you need to
     * call this function manually in order to update the styles when
     * the conditions change.
     */generateCellClassNames(){Array.from(this.$.items.children).filter(row=>!row.hidden).forEach(row=>this._generateCellClassNames(row,this.__getRowModel(row)))}_generateCellClassNames(row,rowData){Array.from(row.children).forEach(cell=>{if(cell.__generatedClasses){cell.__generatedClasses.forEach(className=>cell.classList.remove(className))}if(this.cellClassNameGenerator){const result=this.cellClassNameGenerator(cell._column,rowData);cell.__generatedClasses=result&&result.split(" ").filter(className=>0<className.length);if(cell.__generatedClasses){cell.__generatedClasses.forEach(className=>cell.classList.add(className))}}})}};_exports.StylingMixin=StylingMixin;var vaadinGridStylingMixin={StylingMixin:StylingMixin};_exports.$vaadinGridStylingMixin=vaadinGridStylingMixin;const TOUCH_DEVICE=(()=>{try{document.createEvent("TouchEvent");return!0}catch(e){return!1}})();/**
       *
       * `<vaadin-grid>` is a free, high quality data grid / data table Web Component. The content of the
       * the grid can be populated in two ways: imperatively by using renderer callback function and
       * declaratively by using Polymer's Templates.
       *
       * ### Quick Start
       *
       * Start with an assigning an array to the [`items`](#/elements/vaadin-grid#property-items) property to visualize your data.
       *
       * Use the [`<vaadin-grid-column>`](#/elements/vaadin-grid-column) element to configure the grid columns. Set `path` and `header`
       * shorthand properties for the columns to define what gets rendered in the cells of the column.
       *
       * #### Example:
       * ```html
       * <vaadin-grid>
       *   <vaadin-grid-column path="name.first" header="First name"></vaadin-grid-column>
       *   <vaadin-grid-column path="name.last" header="Last name"></vaadin-grid-column>
       *   <vaadin-grid-column path="email"></vaadin-grid-column>
       * </vaadin-grid>
       * ```
       *
       * For custom content `vaadin-grid-column` element provides you with three types of `renderer` callback functions: `headerRenderer`,
       * `renderer` and `footerRenderer`.
       *
       * Each of those renderer functions provides `root`, `column`, `rowData` arguments when applicable.
       * Generate DOM content, append it to the `root` element and control the state
       * of the host element by accessing `column`. Before generating new content,
       * users are able to check if there is already content in `root` for reusing it.
       *
       * Renderers are called on initialization of new column cells and each time the
       * related row data is updated. DOM generated during the renderer call can be reused
       * in the next renderer call and will be provided with the `root` argument.
       * On first call it will be empty.
       *
       * #### Example:
       * ```html
       * <vaadin-grid>
       *   <vaadin-grid-column></vaadin-grid-column>
       *   <vaadin-grid-column></vaadin-grid-column>
       *   <vaadin-grid-column></vaadin-grid-column>
       * </vaadin-grid>
       * ```
       * ```js
       * const grid = document.querySelector('vaadin-grid');
       * grid.items = [{'name': 'John', 'surname': 'Lennon', 'role': 'singer'},
       *               {'name': 'Ringo', 'surname': 'Starr', 'role': 'drums'}];
       *
       * const columns = grid.querySelectorAll('vaadin-grid-column');
       *
       * columns[0].headerRenderer = function(root) {
       *   root.textContent = 'Name';
       * };
       * columns[0].renderer = function(root, column, rowData) {
       *   root.textContent = rowData.item.name;
       * };
       *
       * columns[1].headerRenderer = function(root) {
       *   root.textContent = 'Surname';
       * };
       * columns[1].renderer = function(root, column, rowData) {
       *   root.textContent = rowData.item.surname;
       * };
       *
       * columns[2].headerRenderer = function(root) {
       *   root.textContent = 'Role';
       * };
       * columns[2].renderer = function(root, column, rowData) {
       *   root.textContent = rowData.item.role;
       * };
       * ```
       *
       * Alternatively, the content can be provided with Polymer's Templates:
       *
       * #### Example:
       * ```html
       * <vaadin-grid items='[{"name": "John", "surname": "Lennon", "role": "singer"},
       * {"name": "Ringo", "surname": "Starr", "role": "drums"}]'>
       *   <vaadin-grid-column>
       *     <template class="header">Name</template>
       *     <template>[[item.name]]</template>
       *   </vaadin-grid-column>
       *   <vaadin-grid-column>
       *     <template class="header">Surname</template>
       *     <template>[[item.surname]]</template>
       *   </vaadin-grid-column>
       *   <vaadin-grid-column>
       *     <template class="header">Role</template>
       *     <template>[[item.role]]</template>
       *   </vaadin-grid-column>
       * </vaadin-grid>
       * ```
       *
       * The following helper elements can be used for further customization:
       * - [`<vaadin-grid-column-group>`](#/elements/vaadin-grid-column-group)
       * - [`<vaadin-grid-filter>`](#/elements/vaadin-grid-filter)
       * - [`<vaadin-grid-sorter>`](#/elements/vaadin-grid-sorter)
       * - [`<vaadin-grid-selection-column>`](#/elements/vaadin-grid-selection-column)
       * - [`<vaadin-grid-tree-toggle>`](#/elements/vaadin-grid-tree-toggle)
       *
       * __Note that the helper elements must be explicitly imported.__
       * If you want to import everything at once you can use the `all-imports.html` bundle.
       *
       * A column template can be decorated with one the following class names to specify its purpose
       * - `header`: Marks a header template
       * - `footer`: Marks a footer template
       * - `row-details`: Marks a row details template
       *
       * The following built-in template variables can be bound to inside the column templates:
       * - `[[index]]`: Number representing the row index
       * - `[[item]]` and it's sub-properties: Data object (provided by a data provider / items array)
       * - `{{selected}}`: True if the item is selected (can be two-way bound)
       * - `{{detailsOpened}}`: True if the item has row details opened (can be two-way bound)
       * - `{{expanded}}`: True if the item has tree sublevel expanded (can be two-way bound)
       * - `[[level]]`: Number of the tree sublevel of the item, first level-items have 0
       *
       * ### Lazy Loading with Function Data Provider
       *
       * In addition to assigning an array to the items property, you can alternatively
       * provide the `<vaadin-grid>` data through the
       * [`dataProvider`](#/elements/vaadin-grid#property-dataProvider) function property.
       * The `<vaadin-grid>` calls this function lazily, only when it needs more data
       * to be displayed.
       *
       * See the [`dataProvider`](#/elements/vaadin-grid#property-dataProvider) in
       * the API reference below for the detailed data provider arguments description,
       * and the “Assigning Data” page in the demos.
       *
       * __Note that expanding the tree grid's item will trigger a call to the `dataProvider`.__
       *
       * __Also, note that when using function data providers, the total number of items
       * needs to be set manually. The total number of items can be returned
       * in the second argument of the data provider callback:__
       *
       * ```javascript
       * grid.dataProvider = function(params, callback) {
       *   var url = 'https://api.example/data' +
       *       '?page=' + params.page +        // the requested page index
       *       '&per_page=' + params.pageSize; // number of items on the page
       *   var xhr = new XMLHttpRequest();
       *   xhr.onload = function() {
       *     var response = JSON.parse(xhr.responseText);
       *     callback(
       *       response.employees, // requested page of items
       *       response.totalSize  // total number of items
       *     );
       *   };
       *   xhr.open('GET', url, true);
       *   xhr.send();
       * };
       * ```
       *
       * __Alternatively, you can use the `size` property to set the total number of items:__
       *
       * ```javascript
       * grid.size = 200; // The total number of items
       * grid.dataProvider = function(params, callback) {
       *   var url = 'https://api.example/data' +
       *       '?page=' + params.page +        // the requested page index
       *       '&per_page=' + params.pageSize; // number of items on the page
       *   var xhr = new XMLHttpRequest();
       *   xhr.onload = function() {
       *     var response = JSON.parse(xhr.responseText);
       *     callback(response.employees);
       *   };
       *   xhr.open('GET', url, true);
       *   xhr.send();
       * };
       * ```
       *
       * ### Styling
       *
       * The following shadow DOM parts are available for styling:
       *
       * Part name | Description
       * ----------------|----------------
       * `row` | Row in the internal table
       * `cell` | Cell in the internal table
       * `header-cell` | Header cell in the internal table
       * `body-cell` | Body cell in the internal table
       * `footer-cell` | Footer cell in the internal table
       * `details-cell` | Row details cell in the internal table
       * `resize-handle` | Handle for resizing the columns
       * `reorder-ghost` | Ghost element of the header cell being dragged
       *
       * The following state attributes are available for styling:
       *
       * Attribute    | Description | Part name
       * -------------|-------------|------------
       * `loading` | Set when the grid is loading data from data provider | :host
       * `interacting` | Keyboard navigation in interaction mode | :host
       * `navigating` | Keyboard navigation in navigation mode | :host
       * `overflow` | Set when rows are overflowing the grid viewport. Possible values: `top`, `bottom`, `left`, `right` | :host
       * `reordering` | Set when the grid's columns are being reordered | :host
       * `dragover` | Set when the grid (not a specific row) is dragged over | :host
       * `dragging-rows` : Set when grid rows are dragged  | :host
       * `reorder-status` | Reflects the status of a cell while columns are being reordered | cell
       * `frozen` | Frozen cell | cell
       * `last-frozen` | Last frozen cell | cell
      * * `first-column` | First visible cell on a row | cell
       * `last-column` | Last visible cell on a row | cell
       * `selected` | Selected row | row
       * `expanded` | Expanded row | row
       * `details-opened` | Row with details open | row
       * `loading` | Row that is waiting for data from data provider | row
       * `odd` | Odd row | row
       * `first` | The first body row | row
       * `dragstart` | Set for one frame when drag of a row is starting. The value is a number when multiple rows are dragged | row
       * `dragover` | Set when the row is dragged over | row
       * `drag-disabled` | Set to a row that isn't available for dragging | row
       * `drop-disabled` | Set to a row that can't be dropped on top of | row
       *
       * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
       *
       * @memberof Vaadin
       * @mixes Vaadin.ThemableMixin
       * @mixes Vaadin.Grid.A11yMixin
       * @mixes Vaadin.Grid.ActiveItemMixin
       * @mixes Vaadin.Grid.ArrayDataProviderMixin
       * @mixes Vaadin.Grid.ColumnResizingMixin
       * @mixes Vaadin.Grid.DataProviderMixin
       * @mixes Vaadin.Grid.DynamicColumnsMixin
       * @mixes Vaadin.Grid.FilterMixin
       * @mixes Vaadin.Grid.RowDetailsMixin
       * @mixes Vaadin.Grid.ScrollMixin
       * @mixes Vaadin.Grid.SelectionMixin
       * @mixes Vaadin.Grid.SortMixin
       * @mixes Vaadin.Grid.KeyboardNavigationMixin
       * @mixes Vaadin.Grid.ColumnReorderingMixin
       * @mixes Vaadin.Grid.EventContextMixin
       * @mixes Vaadin.Grid.StylingMixin
       * @mixes Vaadin.Grid.DragAndDropMixin
       * @demo demo/index.html
       */class GridElement extends ElementMixin(ThemableMixin(DataProviderMixin(ArrayDataProviderMixin(DynamicColumnsMixin(ActiveItemMixin(ScrollMixin(SelectionMixin(SortMixin(RowDetailsMixin(KeyboardNavigationMixin(A11yMixin(FilterMixin(ColumnReorderingMixin(ColumnResizingMixin(EventContextMixin(DragAndDropMixin(StylingMixin(GridScrollerElement)))))))))))))))))){static get template(){return _bbbbcSegmentTracker.html$1`
    <style include="vaadin-grid-styles"></style>

    <div id="scroller" no-scrollbars\$="[[!_scrollbarWidth]]" wheel-scrolling\$="[[_wheelScrolling]]" safari\$="[[_safari]]" ios\$="[[_ios]]" loading\$="[[loading]]" edge\$="[[_edge]]" firefox\$="[[_firefox]]" ie\$="[[_ie]]" column-reordering-allowed\$="[[columnReorderingAllowed]]">

      <table id="table" role="grid" aria-multiselectable="true" tabindex="0">
        <caption id="fixedsizer" class="sizer" part="row"></caption>
        <thead id="header" role="rowgroup"></thead>
        <tbody id="items" role="rowgroup"></tbody>
        <tfoot id="footer" role="rowgroup"></tfoot>
      </table>

      <div part="reorder-ghost"></div>
      <vaadin-grid-outer-scroller id="outerscroller" _touch-device="[[_touchDevice]]" scroll-target="[[scrollTarget]]" scroll-handler="[[_this]]" no-scrollbars="[[!_scrollbarWidth]]">
        <div id="outersizer" class="sizer" part="row"></div>
      </vaadin-grid-outer-scroller>
    </div>

    <!-- The template needs at least one slot or else shady doesn't distribute -->
    <slot name="nodistribute"></slot>

    <div id="focusexit" tabindex="0"></div>
`}static get is(){return"vaadin-grid"}static get version(){return"5.4.7"}static get observers(){return["_columnTreeChanged(_columnTree, _columnTree.*)"]}static get properties(){return{_this:{type:Object,value:function(){return this}},_safari:{type:Boolean,value:/^((?!chrome|android).)*safari/i.test(navigator.userAgent)},_ios:{type:Boolean,value:/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream},_edge:{type:Boolean,value:"undefined"!==typeof CSS&&CSS.supports("(-ms-ime-align:auto)")},_ie:{type:Boolean,value:!!(navigator.userAgent.match(/Trident/)&&!navigator.userAgent.match(/MSIE/))},_firefox:{type:Boolean,value:-1<navigator.userAgent.toLowerCase().indexOf("firefox")},_android:{type:Boolean,value:/android/i.test(navigator.userAgent)},_touchDevice:{type:Boolean,value:TOUCH_DEVICE},/**
       * If true, the grid's height is defined by the number of its rows.
       */heightByRows:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_heightByRowsChanged"}}}constructor(){super();this.addEventListener("animationend",this._onAnimationEnd)}__hasRowsWithClientHeight(){return!!Array.from(this.$.items.children).filter(row=>row.clientHeight).length}__setInitialColumnWidths(){if(!this._initialColumnWidthsSet&&this.__hasRowsWithClientHeight()){this._initialColumnWidthsSet=!0;this.recalculateColumnWidths()}}/**
     * @param {Array<Vaadin.GridColumnElement>} cols the columns to auto size based on their content width
     */_recalculateColumnWidths(cols){// Note: The `cols.forEach()` loops below could be implemented as a single loop but this has been
// split for performance reasons to batch these similar actions [write/read] together to avoid
// unnecessary layout trashing.
// [write] Set automatic width for all cells (breaks column alignment)
cols.forEach(col=>{col.width="auto";col._origFlexGrow=col.flexGrow;col.flexGrow=0});// [read] Measure max cell width in each column
cols.forEach(col=>{col._currentWidth=0;// Note: _allCells only contains cells which are currently rendered in DOM
col._allCells.forEach(c=>{const cellWidth=Math.ceil(c.getBoundingClientRect().width);col._currentWidth=Math.max(col._currentWidth,cellWidth)})});// [write] Set column widths to fit widest measured content
cols.forEach(col=>{col.width=`${col._currentWidth}px`;col.flexGrow=col._origFlexGrow;col._currentWidth=void 0;col._origFlexGrow=void 0})}/**
     * Updates the `width` of all columns which have `autoWidth` set to `true`.
     */recalculateColumnWidths(){if(!this._columnTree){return;// No columns
}const cols=this._getColumns().filter(col=>!col.hidden&&col.autoWidth);this._recalculateColumnWidths(cols)}_createScrollerRows(count){const rows=[];for(var i=0;i<count;i++){const row=document.createElement("tr");row.setAttribute("part","row");row.setAttribute("role","row");if(this._columnTree){this._updateRow(row,this._columnTree[this._columnTree.length-1],"body",!1,!0)}rows.push(row)}if(this._columnTree){this._columnTree[this._columnTree.length-1].forEach(c=>c.notifyPath&&c.notifyPath("_cells.*",c._cells))}(0,_bbbbcSegmentTracker.beforeNextRender)(this,()=>{this._updateFirstAndLastColumn();this._resetKeyboardNavigation()});return rows}_getRowTarget(){return this.$.items}_createCell(tagName){const contentId=this._contentIndex=this._contentIndex+1||0,slotName="vaadin-grid-cell-content-"+contentId,cellContent=document.createElement("vaadin-grid-cell-content");cellContent.setAttribute("slot",slotName);const cell=document.createElement(tagName);cell.id=slotName.replace("-content-","-");cell.setAttribute("tabindex","-1");cell.setAttribute("role","td"===tagName?"gridcell":"columnheader");const slot=document.createElement("slot");slot.setAttribute("name",slotName);cell.appendChild(slot);cell._content=cellContent;// With native Shadow DOM, mousedown on slotted element does not focus
// focusable slot wrapper, that is why cells are not focused with
// mousedown. Workaround: listen for mousedown and focus manually.
cellContent.addEventListener("mousedown",()=>{if(window.chrome){// Chrome bug: focusing before mouseup prevents text selection, see http://crbug.com/771903
const mouseUpListener=()=>{if(!cellContent.contains(this.getRootNode().activeElement)){cell.focus()}// If focus is in the cell content — respect it, do not change.
document.removeEventListener("mouseup",mouseUpListener,!0)};document.addEventListener("mouseup",mouseUpListener,!0)}else{// Focus on mouseup, on the other hand, removes selection on Safari.
// Watch out sync focus removal issue, only async focus works here.
setTimeout(()=>{if(!cellContent.contains(this.getRootNode().activeElement)){cell.focus()}})}});return cell}_updateRow(row,columns,section,isColumnRow,noNotify){section=section||"body";const contentsFragment=document.createDocumentFragment();Array.from(row.children).forEach(cell=>cell._vacant=!0);row.innerHTML="";if("outersizer"!==row.id&&"fixedsizer"!==row.id){row.hidden=!0}columns.forEach((column,index)=>{let cell;if("body"===section){// Body
column._cells=column._cells||[];cell=column._cells.filter(cell=>cell._vacant)[0];if(!cell){cell=this._createCell("td");column._cells.push(cell)}cell.setAttribute("part","cell body-cell");row.appendChild(cell);if(index===columns.length-1&&(this._rowDetailsTemplate||this.rowDetailsRenderer)){// Add details cell as last cell to body rows
this._detailsCells=this._detailsCells||[];const detailsCell=this._detailsCells.filter(cell=>cell._vacant)[0]||this._createCell("td");if(-1===this._detailsCells.indexOf(detailsCell)){this._detailsCells.push(detailsCell)}if(!detailsCell._content.parentElement){contentsFragment.appendChild(detailsCell._content)}this._configureDetailsCell(detailsCell);row.appendChild(detailsCell);this._a11ySetRowDetailsCell(row,detailsCell);detailsCell._vacant=!1}if(column.notifyPath&&!noNotify){column.notifyPath("_cells.*",column._cells)}}else{// Header & footer
const tagName="header"===section?"th":"td";if(isColumnRow||"vaadin-grid-column-group"===column.localName){cell=column[`_${section}Cell`]||this._createCell(tagName);cell._column=column;row.appendChild(cell);column[`_${section}Cell`]=cell}else{column._emptyCells=column._emptyCells||[];cell=column._emptyCells.filter(cell=>cell._vacant)[0]||this._createCell(tagName);cell._column=column;row.appendChild(cell);if(-1===column._emptyCells.indexOf(cell)){column._emptyCells.push(cell)}}cell.setAttribute("part",`cell ${section}-cell`);this.__updateHeaderFooterRowVisibility(row)}if(!cell._content.parentElement){contentsFragment.appendChild(cell._content)}cell._vacant=!1;cell._column=column});// Might be empty if only cache was used
this.appendChild(contentsFragment);this._frozenCellsChanged();this._updateFirstAndLastColumnForRow(row)}__updateHeaderFooterRowVisibility(row){if(!row){return}const visibleRowCells=Array.from(row.children).filter(cell=>{const column=cell._column;if(column._emptyCells&&-1<column._emptyCells.indexOf(cell)){// The cell is an "empty cell"  -> doesn't block hiding the row
return!1}if(row.parentElement===this.$.header){if(column.headerRenderer||column._headerTemplate){// The cell is the header cell of a column that has a header renderer
// or a header template -> row should be visible
return!0}if(null===column.header){// The column header is explicilty set to null -> doesn't block hiding the row
return!1}if(column.path||column.header!==void 0){// The column has an explicit non-null header or a path that generates a header
// -> row should be visible
return!0}}else{if(column.footerRenderer||column._footerTemplate){// The cell is the footer cell of a column that has a footer renderer
// or a footer template -> row should be visible
return!0}}});if(row.hidden!==!visibleRowCells.length){row.hidden=!visibleRowCells.length;this.notifyResize()}}_updateScrollerItem(row,index){this._preventScrollerRotatingCellFocus(row,index);if(!this._columnTree){return}this._toggleAttribute("first",0===index,row);this._toggleAttribute("odd",index%2,row);this._a11yUpdateRowRowindex(row,index);this._getItem(index,row)}_columnTreeChanged(columnTree,splices){Array.from(this.$.items.children).forEach(row=>this._updateRow(row,columnTree[columnTree.length-1]));while(this.$.header.children.length<columnTree.length){const headerRow=document.createElement("tr");headerRow.setAttribute("part","row");headerRow.setAttribute("role","row");this.$.header.appendChild(headerRow);const footerRow=document.createElement("tr");footerRow.setAttribute("part","row");footerRow.setAttribute("role","row");this.$.footer.appendChild(footerRow)}while(this.$.header.children.length>columnTree.length){this.$.header.removeChild(this.$.header.firstElementChild);this.$.footer.removeChild(this.$.footer.firstElementChild)}Array.from(this.$.header.children).forEach((headerRow,index)=>this._updateRow(headerRow,columnTree[index],"header",index===columnTree.length-1));Array.from(this.$.footer.children).forEach((footerRow,index)=>this._updateRow(footerRow,columnTree[columnTree.length-1-index],"footer",0===index));// Sizer rows
this._updateRow(this.$.outersizer,columnTree[columnTree.length-1]);this._updateRow(this.$.fixedsizer,columnTree[columnTree.length-1]);this._resizeHandler();this._frozenCellsChanged();this._updateFirstAndLastColumn();this._resetKeyboardNavigation();this._a11yUpdateHeaderRows();this._a11yUpdateFooterRows()}_updateItem(row,item){row._item=item;const model=this.__getRowModel(row);this._toggleAttribute("selected",model.selected,row);this._a11yUpdateRowSelected(row,model.selected);this._a11yUpdateRowLevel(row,model.level);this._toggleAttribute("expanded",model.expanded,row);if(this._rowDetailsTemplate||this.rowDetailsRenderer){this._toggleDetailsCell(row,item)}this._generateCellClassNames(row,model);this._filterDragAndDrop(row,model);Array.from(row.children).forEach(cell=>{if(cell._renderer){const owner=cell._column||this;cell._renderer.call(owner,cell._content,owner,model)}else if(cell._instance){cell._instance.__detailsOpened__=model.detailsOpened;cell._instance.__selected__=model.selected;cell._instance.__level__=model.level;cell._instance.__expanded__=model.expanded;cell._instance.setProperties(model)}});this._debouncerUpdateHeights=_bbbbcSegmentTracker.Debouncer.debounce(this._debouncerUpdateHeights,_bbbbcSegmentTracker.timeOut.after(1),()=>{this._updateMetrics();this._positionItems();this._updateScrollerSize()})}_resizeHandler(){this._updateDetailsCellHeights();this._accessIronListAPI(super._resizeHandler,!0);this._updateHeaderFooterMetrics()}_updateHeaderFooterMetrics(){const headerHeight=this.$.header.clientHeight+"px",footerHeight=this.$.footer.clientHeight+"px";[this.$.outersizer,this.$.fixedsizer,this.$.items].forEach(element=>{element.style.borderTopWidth=headerHeight;element.style.borderBottomWidth=footerHeight});(0,_bbbbcSegmentTracker.afterNextRender)(this.$.header,()=>{if(this._pendingScrollToIndex){this._scrollToIndex(this._pendingScrollToIndex)}})}_onAnimationEnd(e){// ShadyCSS applies scoping suffixes to animation names
if(0===e.animationName.indexOf("vaadin-grid-appear")){this._render();this._updateHeaderFooterMetrics();e.stopPropagation();this.notifyResize();this.__setInitialColumnWidths()}}_toggleAttribute(name,bool,node){if(node.hasAttribute(name)===!bool){if(bool){node.setAttribute(name,"")}else{node.removeAttribute(name)}}}__getRowModel(row){return{index:row.index,item:row._item,level:this._getIndexLevel(row.index),expanded:this._isExpanded(row._item),selected:this._isSelected(row._item),detailsOpened:!!(this._rowDetailsTemplate||this.rowDetailsRenderer)&&this._isDetailsOpened(row._item)}}/**
     * Manually invoke existing renderers for all the columns
     * (header, footer and body cells) and opened row details.
     */render(){if(this._columnTree){// header and footer renderers
this._columnTree.forEach(level=>{level.forEach(column=>column._renderHeaderAndFooter())});// body and row details renderers
this._update()}}/**
     * Updates the computed metrics and positioning of internal grid parts
     * (row/details cell positioning etc). Needs to be invoked whenever the sizing of grid
     * content changes asynchronously to ensure consistent appearance (e.g. when a
     * contained image whose bounds aren't known beforehand finishes loading).
     */notifyResize(){super.notifyResize()}_heightByRowsChanged(value,oldValue){if(value||oldValue){this.notifyResize()}}__forceReflow(){this._debouncerForceReflow=_bbbbcSegmentTracker.Debouncer.debounce(this._debouncerForceReflow,_bbbbcSegmentTracker.animationFrame,()=>{this.$.scroller.style.overflow="hidden";setTimeout(()=>this.$.scroller.style.overflow="")})}}/**
   * Fired when the columns in the grid are reordered.
   *
   * @event column-reorder
   * @param {Object} detail
   * @param {Object} detail.columns the columns in the new order
   */_exports.GridElement=GridElement;customElements.define(GridElement.is,GridElement);var vaadinGrid={GridElement:GridElement};_exports.$vaadinGrid=vaadinGrid;const $_documentContainer$3=document.createElement("template");$_documentContainer$3.innerHTML=`<custom-style>
  <style>
    @font-face {
      font-family: 'lumo-icons';
      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAABEgAAsAAAAAIiwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADsAAABUIIslek9TLzIAAAFEAAAAQwAAAFZAIUuKY21hcAAAAYgAAAD4AAADrsCU8d5nbHlmAAACgAAAC2MAABd4h9To2WhlYWQAAA3kAAAAMQAAADYSnCkuaGhlYQAADhgAAAAdAAAAJAbpA35obXR4AAAOOAAAABAAAACspBAAAGxvY2EAAA5IAAAAWAAAAFh55IAsbWF4cAAADqAAAAAfAAAAIAFKAXBuYW1lAAAOwAAAATEAAAIuUUJZCHBvc3QAAA/0AAABKwAAAelm8SzVeJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiBmg4gCACY7BUgAeJxjYGS+yDiBgZWBgamKaQ8DA0MPhGZ8wGDIyAQUZWBlZsAKAtJcUxgcXjG+0mIO+p/FEMUcxDANKMwIkgMABn8MLQB4nO3SWW6DMABF0UtwCEnIPM/zhLK8LqhfXRybSP14XUYtHV9hGYQwQBNIo3cUIPkhQeM7rib1ekqnXg981XuC1qvy84lzojleh3puxL0hPjGjRU473teloEefAUNGjJkwZcacBUtWrNmwZceeA0dOnLlw5cadB09elPGhGf+j0NTI/65KfXerT6JhqKnpRKtgOpuqaTrtKjPUlqHmhto21I7pL6i6hlqY3q7qGWrfUAeGOjTUkaGODXViqFNDnRnq3FAXhro01JWhrg11Y6hbQ90Z6t5QD4Z6NNSToZ4N9WKoV0O9GerdUB+G+jTUl6GWRvkL24BkEXictVh9bFvVFb/nxvbz+7Rf/N6zHcd2bCfP+Wgc1Z9N0jpNnEL6kbRVS6HA2hQYGh9TGR1CbCqa2rXrWOkQE/sHNJgmtZvoVNZqE1B1DNHxzTQxCehUTYiJTQyENui0qSLezr3PduyQfgmRWOfde8+9551z7rnn/O4jLoJ/bRP0UaKQMLFJjpBAvphLZC3Dk0ok7WBzR2/upJs7Ryw/nfFbln/uuN/apCvwrKLrSvUqRufbm5pn0fs0w4gYxnGVP6qHnO4bWiDQGQgwtS6lm3lB3QoX1M2vwEmuzirF39y+Es2+DJ8d1pkyqBIqoze3D1+Zz4DrFoazxI8dWwMrDlZ2DMqQAR9AROsJU+2cmlTPazTco52F1xTa2a2+K8vvq92dVHmtLoPeQX/AZPRYGthDYOeZjBjKoFsVGulR3lWU95WeCK44qHU7MhWUGUKZDT3oKUcG2GWuh+EDDfUYA/jhAhl0TOsJNYSEu7mQmi3UzfXwZKA4BsVsHLXQYGgRW95uEtpJ1Vfn9XiLriRBlFEqxsDjA09yCNUoQxxwd7KWSTt2y3GTKiflqHRSoWZc3m11Wa/fJdFgXD4sSYfleJBKd8GMz7J8dZn/cGRCcKGDnA2Ge3fKzcvlnTDNthGWLXzX/WaXtUAmRgeLlHSr30r0G9UTXMb0AtmwzOoy73fkSlHZkduw/TYuU9cAD4YutPoxTTsA3797wVr4Z/1NC5zARHr4vtxJjxIfiZMhMkbWk+14BnJZKwqGZwDfswLyxWDSg11rFLJF7Nopxjd1h1/QOT+oezgfu3Yq+Hk+duf5x+40o1GTkaIgikK/IEnC6aYxCUBaZJSN4XTYFjU/YMNIKqJwhDGOCCI8FDXnXmXjtGhGJyShqjAOnBOkW2JG9S7GgYeMWAU5JzhnWmBOaOM+CKEPoqSfFDC2Unq+DLlUgUVUFFLZGJg6jtlojsdsa8kPObPuJdi5dnBdBsLJMGTWDa4t2JvtwuPo9s+Y86suv/W33QG1rAaOAUV+vx4K6f2D04PVKlC7WLSrZzAi45ZV6lIC7WoXqmRyvUqoVwrzUoVsIjeTXWQv+RH5GTlBXiB/In8ln0IbBCAFOajAJrgZYyOHWqOfUe/aHjI12R6OQo1jCgt215l+4f6XPb+0MNou0V+43n2F77tSfRb24d7zitgnKmvYHs69zugaPvBwv6ioXkb2LdL65Atw51uLkXlu1bhMMRcXSPcYoqKIRlh34lQP8/5JbuUFye4vxD6/6MxFF11C0uVLr9Ulgw44tS3pMViNLUExbycFgLIct+QDMibRimx1ydUz8FXZiuOIDBOMVX2nUZc+huNE5XUJ81uiJoiabwqaVF0uacKbau/pl4R2VW0XXlJra6boVrYG646TF5NYzwy4vjENVrDlcNpZPl8DH6XX8XWCx0mvWVZY6KFLrvsY66/zPict5FnxaNUR/juvZCM3TvD60E2W1tZizbXTPDuabcm0nbbzpWKpmA1ayBQ8giedLUM+A0kNjBjQjmuYz7YrgIXYvmF63ZLBwSXrpn9Tb9wwdd/U1H0PMQK3XcO8ul3WT7PyPPdpy0TemKxNRcJNauiXJnnUDpUppQWs4SnUIy0EESGYqJYQLGHxzaGWwVIaS6Y7mQFM8ZjYDQ3axjf61SWjU33JwOZA1pwaG1L9mzf71aHRdX1JHw6Fp0aXhNwbqyeGNg4NbdzGCBxoz4ZXjy4Nu69Zr6sDY6vMrLU5nA1P8JkbdWXJ6ERfMryvNh1JfQ9+T4dIhGvK9w3dxjBBzatsQ/MlOHVIDnYpDz6odAXlQ01t2Pa5Iafd8MMpxAeDKP0C6CjgVLT5osB6icUx01lWjXxzT/GyRF2welEM5Z/7jG3VjQ1SrNn5IbyzOG5dobB3/QHxyZvsXcoz8IoEwS7plCg+zxHQk424q9BfEpkESJbFHQusDBSWFkuBkoPO0kLKwRVYjxGXlHTcTDQMJ/H6TX9afkO7mnraTO1feTnZAXLu4cp7HAXMmNG1yeFk9TgS/NHhZR/4QoBTr/ZB+6hCgyl15Nq1UbN6nE1/ZnP1U2cizCBpvs8cJQZJ4LkYx5N/yZPAUZNQQ0V4f3BQllWrK3YRzl30dOT6RVn2upNur6woSa8CqpdT/aKnBM4o3jNur9d9xqtUT6veBEt9Ca9at+ERzEEhUkR8sa5mQ4aVvJoVeEA8zI4ei5mULXFGyU7z/6TAeYLVcpzSWZY8PYYF5yrTV60sT0+XV141vX++Wf16V2bFeGVPZXxFpkvyeKTWLlzfW0mnKxsY6Y3294/0998SCfX1blm5pbcvFGlq/r07MRAMhYIDiW5JFKWW3vdrEpCsZSJG+om7Zu/PSScZJhNkLbmW5Wsr12pWqW5zKtlwRS4bFOxUw17mCzy6lskCDl1WYOGWDYrADrMA7BDDweWWNd5koiJnR1dz+ytLP2q0SqPB1lnK2ccB7RYe4FSoPks3iB3t4txTSHctb2sy1ivk0pvHuCNm6w1f6wxv3+OCgN78LqdQnUVh7R0oTAp0zOf2rbW770Vu5C2dIyGdTnHo8zSji7dppj0USoVCz+lhRMTh53Teq9VbGfbjuSbAooSdXayY4PYHg374C6f7gl1B/DXuJ4/QXxOBdJFJspFsI3egpoWUUCjlTIFnNYNl+ZyZKmBeYKGHkD1QyDlhaKbKwKcIJqJ4TLJ2OmdY/JWXae4DdGBw8HZ7eXcgFF2zr2SoalDry5iKqoa0Puhe3hPQ2s3elTYM+MI+n3rK0KgL7/La3GeMLt6m7u912vGnvtORiIa0qBmhqVi+XW9XNBmqb8eVgKzIHfGI5bNoG7X0UCzeISmqIcO/nY8FH7U8avX9fx/ST+hx0sezPw9Qy8Mum3GWf2N4Uy/yIYGVBXbJHWIZp7dfTcptdMTr9Qmq7DaiK/ukqCL4kt4RUfS5XPnMtmT22/mQFqF7emSqtrlu8SVElxDRJrZODkpuwe0VfTfjdEp1f7A7v+fozNBXUJ/6WTuK2TtFlpFVZAZ3LcFvUi1Z2p2YT+EMAkGJVStOzLTAPg4IqWIAlzRSjOBkl2zxj3TKycpzT/MnvX3uaSMWM+gU0rkXjohhefVRMaps3/kLMSKv23lT23uxQrkQjyOJleMDsdhAnD6ZGElWZ5MjCXzCE/hkWX+WF4knzGhVOyK2eQZekV3eyo0zL8kuYWCnDCvjjhAkcTPOBDXVdoav3HVcFnQjLvtV9S2p0zA6JegPwMQxt+yFb3ll9zGlq/5dRKb3cEyQYoaNYpharJ7xCB7AWxsLY3jjZXY0XsZj0Wjwc9I6PP/dKABnCZaqHpaZEACxk4ZeLZSKNgZABl+lYQX1sJQOSX3n6r410evcoud5JeAGUXVP9H1tZOKejTq4Ono0z0erro1FrnOpohva1d/hTdtVsQdKN5W9RlT3NjD0nznyKNTgKAMfWNWcyodV0IGLPIHOF0o4JyqufaK4z6WIIzuGh3d8c8cwQg8ER+OVxyrjdm8vNuhts4LoOihGxIMuUdgzwiYN7xhh1+oZnJNuTG7gQZvu4XWZ9GAZZjGEubwePqYhtKDTH+9VQkl17/iGybsnJ+8+sKtyPrcll9ty65Zsdst/9iqpEKh7M5VdBxh3csOdNc6tW3I1uyM1PzOXegSOrLFsFNI2O27M+TF2ApnN9MUv5ud6LjxIvEQnHRzxIu4IsA9MLFkJn2tcZoZ7ON7dXe7ujrc8HrusPKamlqXwd77lQUuLpilau4PUMapueBb7irU4RoUXEYXuVuIGlRGmOp+2lNkaRPVziOqmlaZvaqG4dFgSj0jxEJWrv12IUWntmw+rfQarRE0Aph4ocI6nlUlGqs+u3/+T/ethW62PpHp2eHbZstnh/wOO95yDAHicY2BkYGAAYi2NOJ94fpuvDNzML4AiDNc/fzqEoP+/Zp7KdAvI5WBgAokCAGkcDfgAAAB4nGNgZGBgDvqfBSRfMAAB81QGRgZUoA0AVvYDbwAAAHicY2BgYGB+MTQwAM8EJo8AAAAAAE4AmgDoAQoBLAFOAXABmgHEAe4CGgKcAugEmgS8BNYE8gUOBSoFegXQBf4GRAZmBrYHGAeQCBgIUghqCP4JRgm+CdoKBAo8CoIKuArwC1ALlgu8eJxjYGRgYNBmTGEQZQABJiDmAkIGhv9gPgMAGJQBvAB4nG2RPU7DMBiG3/QP0UoIBGJh8QILavozdmRo9w7d09RpUzlx5LgVvQMn4BAcgoEzcAgOwVvzSZVQbcnf48fvFysJgGt8IcJxROiG9TgauODuj5ukG+EW+UG4jR4ehTv0Q+EunjER7uEWmk+IWpc0d3gVbuAKb8JN+nfhFvlDuI17fAp36L+Fu1jgR7iHp+jF7Arbz1Nb1nO93pnEncSJFtrVuS3VKB6e5EyX2iVer9TyoOr9eux9pjJnCzW1pdfGWFU5u9WpjzfeV5PBIBMfp7aAwQ4FLPrIkbKWqDHn+67pDRK4s4lzbsEux5qHvcIIMb/nueSMyTKkE3jWFdNLHLjW2PPmMa1Hxn3GjGW/wjT0HtOG09JU4WxLk9LH2ISuiv9twJn9y8fh9uIXI+BknAAAAHicbY7ZboMwEEW5CVBCSLrv+76kfJRjTwHFsdGAG+Xvy5JUfehIHp0rnxmNN/D6ir3/a4YBhvARIMQOIowQY4wEE0yxiz3s4wCHOMIxTnCKM5zjApe4wjVucIs73OMBj3jCM17wije84wMzfHqJ0EVmUkmmJo77oOmrHvfIRZbXsTCZplTZldlgb3TYGVHProwFs11t1A57tcON2rErR3PBqcwF1/6ctI6k0GSU4JHMSS6WghdJQ99sTbfuN7QLJ9vQ37dNrgyktnIxlDYLJNuqitpRbYWKFNuyDT6pog6oOYKHtKakeakqKjHXpPwlGRcsC+OqxLIiJpXqoqqDMreG2l5bv9Ri3TRX+c23DZna9WFFgmXuO6Ps1Jm/w6ErW8N3FbHn/QC444j0AA==) format('woff');
      font-weight: normal;
      font-style: normal;
    }

    html {
      --lumo-icons-align-center: "\\ea01";
      --lumo-icons-align-left: "\\ea02";
      --lumo-icons-align-right: "\\ea03";
      --lumo-icons-angle-down: "\\ea04";
      --lumo-icons-angle-left: "\\ea05";
      --lumo-icons-angle-right: "\\ea06";
      --lumo-icons-angle-up: "\\ea07";
      --lumo-icons-arrow-down: "\\ea08";
      --lumo-icons-arrow-left: "\\ea09";
      --lumo-icons-arrow-right: "\\ea0a";
      --lumo-icons-arrow-up: "\\ea0b";
      --lumo-icons-bar-chart: "\\ea0c";
      --lumo-icons-bell: "\\ea0d";
      --lumo-icons-calendar: "\\ea0e";
      --lumo-icons-checkmark: "\\ea0f";
      --lumo-icons-chevron-down: "\\ea10";
      --lumo-icons-chevron-left: "\\ea11";
      --lumo-icons-chevron-right: "\\ea12";
      --lumo-icons-chevron-up: "\\ea13";
      --lumo-icons-clock: "\\ea14";
      --lumo-icons-cog: "\\ea15";
      --lumo-icons-cross: "\\ea16";
      --lumo-icons-download: "\\ea17";
      --lumo-icons-dropdown: "\\ea18";
      --lumo-icons-edit: "\\ea19";
      --lumo-icons-error: "\\ea1a";
      --lumo-icons-eye: "\\ea1b";
      --lumo-icons-eye-disabled: "\\ea1c";
      --lumo-icons-menu: "\\ea1d";
      --lumo-icons-minus: "\\ea1e";
      --lumo-icons-ordered-list: "\\ea1f";
      --lumo-icons-phone: "\\ea20";
      --lumo-icons-photo: "\\ea21";
      --lumo-icons-play: "\\ea22";
      --lumo-icons-plus: "\\ea23";
      --lumo-icons-redo: "\\ea24";
      --lumo-icons-reload: "\\ea25";
      --lumo-icons-search: "\\ea26";
      --lumo-icons-undo: "\\ea27";
      --lumo-icons-unordered-list: "\\ea28";
      --lumo-icons-upload: "\\ea29";
      --lumo-icons-user: "\\ea2a";
    }
  </style>
</custom-style>`;document.head.appendChild($_documentContainer$3.content);/* NOTICE: Generated with 'gulp icons' */ /*
                                                                                                    FIXME(polymer-modulizer): the above comments were extracted
                                                                                                    from HTML and may be out of place here. Review them and
                                                                                                    then delete this comment!
                                                                                                    */;const $_documentContainer$4=document.createElement("template");$_documentContainer$4.innerHTML=`<custom-style>
  <style>
    html {
      --lumo-size-xs: 1.625rem;
      --lumo-size-s: 1.875rem;
      --lumo-size-m: 2.25rem;
      --lumo-size-l: 2.75rem;
      --lumo-size-xl: 3.5rem;

      /* Icons */
      --lumo-icon-size-s: 1.25em;
      --lumo-icon-size-m: 1.5em;
      --lumo-icon-size-l: 2.25em;
      /* For backwards compatibility */
      --lumo-icon-size: var(--lumo-icon-size-m);
    }
  </style>
</custom-style>`;document.head.appendChild($_documentContainer$4.content);const $_documentContainer$5=document.createElement("template");$_documentContainer$5.innerHTML=`<custom-style>
  <style>
    html {
      /* Square */
      --lumo-space-xs: 0.25rem;
      --lumo-space-s: 0.5rem;
      --lumo-space-m: 1rem;
      --lumo-space-l: 1.5rem;
      --lumo-space-xl: 2.5rem;

      /* Wide */
      --lumo-space-wide-xs: calc(var(--lumo-space-xs) / 2) var(--lumo-space-xs);
      --lumo-space-wide-s: calc(var(--lumo-space-s) / 2) var(--lumo-space-s);
      --lumo-space-wide-m: calc(var(--lumo-space-m) / 2) var(--lumo-space-m);
      --lumo-space-wide-l: calc(var(--lumo-space-l) / 2) var(--lumo-space-l);
      --lumo-space-wide-xl: calc(var(--lumo-space-xl) / 2) var(--lumo-space-xl);

      /* Tall */
      --lumo-space-tall-xs: var(--lumo-space-xs) calc(var(--lumo-space-xs) / 2);
      --lumo-space-tall-s: var(--lumo-space-s) calc(var(--lumo-space-s) / 2);
      --lumo-space-tall-m: var(--lumo-space-m) calc(var(--lumo-space-m) / 2);
      --lumo-space-tall-l: var(--lumo-space-l) calc(var(--lumo-space-l) / 2);
      --lumo-space-tall-xl: var(--lumo-space-xl) calc(var(--lumo-space-xl) / 2);
    }
  </style>
</custom-style>`;document.head.appendChild($_documentContainer$5.content);const $_documentContainer$6=document.createElement("template");$_documentContainer$6.innerHTML=`<custom-style>
  <style>
    html {
      /* Font families */
      --lumo-font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

      /* Font sizes */
      --lumo-font-size-xxs: .75rem;
      --lumo-font-size-xs: .8125rem;
      --lumo-font-size-s: .875rem;
      --lumo-font-size-m: 1rem;
      --lumo-font-size-l: 1.125rem;
      --lumo-font-size-xl: 1.375rem;
      --lumo-font-size-xxl: 1.75rem;
      --lumo-font-size-xxxl: 2.5rem;

      /* Line heights */
      --lumo-line-height-xs: 1.25;
      --lumo-line-height-s: 1.375;
      --lumo-line-height-m: 1.625;
    }

  </style>
</custom-style><dom-module id="lumo-typography">
  <template>
    <style>
      html {
        font-family: var(--lumo-font-family);
        font-size: var(--lumo-font-size, var(--lumo-font-size-m));
        line-height: var(--lumo-line-height-m);
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* Can’t combine with the above selector because that doesn’t work in browsers without native shadow dom */
      :host {
        font-family: var(--lumo-font-family);
        font-size: var(--lumo-font-size, var(--lumo-font-size-m));
        line-height: var(--lumo-line-height-m);
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      small,
      [theme~="font-size-s"] {
        font-size: var(--lumo-font-size-s);
        line-height: var(--lumo-line-height-s);
      }

      [theme~="font-size-xs"] {
        font-size: var(--lumo-font-size-xs);
        line-height: var(--lumo-line-height-xs);
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-weight: 600;
        line-height: var(--lumo-line-height-xs);
        margin-top: 1.25em;
      }

      h1 {
        font-size: var(--lumo-font-size-xxxl);
        margin-bottom: 0.75em;
      }

      h2 {
        font-size: var(--lumo-font-size-xxl);
        margin-bottom: 0.5em;
      }

      h3 {
        font-size: var(--lumo-font-size-xl);
        margin-bottom: 0.5em;
      }

      h4 {
        font-size: var(--lumo-font-size-l);
        margin-bottom: 0.5em;
      }

      h5 {
        font-size: var(--lumo-font-size-m);
        margin-bottom: 0.25em;
      }

      h6 {
        font-size: var(--lumo-font-size-xs);
        margin-bottom: 0;
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }

      p,
      blockquote {
        margin-top: 0.5em;
        margin-bottom: 0.75em;
      }

      a {
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      hr {
        display: block;
        align-self: stretch;
        height: 1px;
        border: 0;
        padding: 0;
        margin: var(--lumo-space-s) calc(var(--lumo-border-radius-m) / 2);
        background-color: var(--lumo-contrast-10pct);
      }

      blockquote {
        border-left: 2px solid var(--lumo-contrast-30pct);
      }

      b,
      strong {
        font-weight: 600;
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer$6.content);const $_documentContainer$7=_bbbbcSegmentTracker.html$1`<dom-module id="lumo-grid" theme-for="vaadin-grid">
  <template>
    <style>
      :host {
        font-family: var(--lumo-font-family);
        font-size: var(--lumo-font-size-m);
        line-height: var(--lumo-line-height-s);
        color: var(--lumo-body-text-color);
        background-color: var(--lumo-base-color);
        box-sizing: border-box;
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: transparent;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        /* For internal use only */
        --_lumo-grid-border-color: var(--lumo-contrast-20pct);
        --_lumo-grid-secondary-border-color: var(--lumo-contrast-10pct);
        --_lumo-grid-border-width: 1px;
        --_lumo-grid-selected-row-color: var(--lumo-primary-color-10pct);
      }

      /* No (outer) border */

      :host(:not([theme~="no-border"])) {
        border: var(--_lumo-grid-border-width) solid var(--_lumo-grid-border-color);
      }

      /* Cell styles */

      [part~="cell"] {
        min-height: var(--lumo-size-m);
        background-color: var(--lumo-base-color);
      }

      [part~="cell"] ::slotted(vaadin-grid-cell-content) {
        cursor: default;
        padding: var(--lumo-space-xs) var(--lumo-space-m);
      }

      /* Apply row borders by default and introduce the "no-row-borders" variant */
      :host(:not([theme~="no-row-borders"])) [part~="cell"]:not([part~="details-cell"]) {
        border-top: var(--_lumo-grid-border-width) solid var(--_lumo-grid-secondary-border-color);
      }

      /* Hide first body row top border */
      :host(:not([theme~="no-row-borders"])) [part="row"][first] [part~="cell"]:not([part~="details-cell"]) {
        border-top: 0;
        min-height: calc(var(--lumo-size-m) - var(--_lumo-grid-border-width));
      }

      /* Focus-ring */

      [part~="cell"]:focus {
        outline: none;
      }

      :host([navigating]) [part~="cell"]:focus::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        box-shadow: inset 0 0 0 2px var(--lumo-primary-color-50pct);
      }

      /* Drag and Drop styles */
      :host([dragover])::after {
        content: "";
        position: absolute;
        z-index: 100;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        box-shadow: inset 0 0 0 2px var(--lumo-primary-color-50pct);
      }

      [part~="row"][dragover] {
        z-index: 100 !important;
      }

      [part~="row"][dragover] [part~="cell"] {
        overflow: visible;
      }

      [part~="row"][dragover] [part~="cell"]::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: calc(var(--_lumo-grid-border-width) + 2px);
        pointer-events: none;
        background: var(--lumo-primary-color-50pct);
      }

      :host([theme~="no-row-borders"]) [dragover] [part~="cell"]::after {
        height: 2px;
      }

      [part~="row"][dragover="below"] [part~="cell"]::after {
        top: 100%;
        bottom: auto;
        margin-top: -1px;
      }

      [part~="row"][dragover="above"] [part~="cell"]::after {
        top: auto;
        bottom: 100%;
        margin-bottom: -1px;
      }

      [part~="row"][details-opened][dragover="below"] [part~="cell"]:not([part~="details-cell"])::after,
      [part~="row"][details-opened][dragover="above"] [part~="details-cell"]::after {
        display: none;
      }

      [part~="row"][dragover][dragover="on-top"] [part~="cell"]::after {
        height: 100%;
      }

      [part~="row"][dragstart] {
        /* Add bottom-space to the row so the drag number doesn't get clipped. Needed for IE/Edge */
        border-bottom: 100px solid transparent;
        z-index: 100 !important;
        opacity: 0.9;
      }

      [part~="row"][dragstart] [part~="cell"] {
        border: none !important;
        box-shadow: none !important;
      }

      [part~="row"][dragstart] [part~="cell"][last-column] {
        border-radius: 0 var(--lumo-border-radius-s) var(--lumo-border-radius-s) 0;
      }

      [part~="row"][dragstart] [part~="cell"][first-column] {
        border-radius: var(--lumo-border-radius-s) 0 0 var(--lumo-border-radius-s);
      }

      [ios] [part~="row"][dragstart] [part~="cell"] {
        background: var(--lumo-primary-color-50pct);
      }

      #scroller:not([ios]) [part~="row"][dragstart]:not([dragstart=""])::after {
        display: block;
        position: absolute;
        left: var(--_grid-drag-start-x);
        top: var(--_grid-drag-start-y);
        z-index: 100;
        content: attr(dragstart);
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: calc(var(--lumo-space-xs) * 0.8);
        color: var(--lumo-error-contrast-color);
        background-color: var(--lumo-error-color);
        border-radius: var(--lumo-border-radius-m);
        font-family: var(--lumo-font-family);
        font-size: var(--lumo-font-size-xxs);
        line-height: 1;
        font-weight: 500;
        text-transform: initial;
        letter-spacing: initial;
        min-width: calc(var(--lumo-size-s) * 0.7);
        text-align: center;
      }

      /* Headers and footers */

      [part~="header-cell"] ::slotted(vaadin-grid-cell-content),
      [part~="footer-cell"] ::slotted(vaadin-grid-cell-content),
      [part~="reorder-ghost"] {
        font-size: var(--lumo-font-size-s);
        font-weight: 500;
      }

      [part~="footer-cell"] ::slotted(vaadin-grid-cell-content) {
        font-weight: 400;
      }

      [part="row"]:only-child [part~="header-cell"] {
        min-height: var(--lumo-size-xl);
      }

      /* Header borders */

      /* Hide first header row top border */
      :host(:not([theme~="no-row-borders"])) [part="row"]:first-child [part~="header-cell"] {
        border-top: 0;
      }

      [part="row"]:last-child [part~="header-cell"] {
        border-bottom: var(--_lumo-grid-border-width) solid transparent;
      }

      :host(:not([theme~="no-row-borders"])) [part="row"]:last-child [part~="header-cell"] {
        border-bottom-color: var(--_lumo-grid-secondary-border-color);
      }

      /* Overflow uses a stronger border color */
      :host([overflow~="top"]) [part="row"]:last-child [part~="header-cell"] {
        border-bottom-color: var(--_lumo-grid-border-color);
      }

      /* Footer borders */

      [part="row"]:first-child [part~="footer-cell"] {
        border-top: var(--_lumo-grid-border-width) solid transparent;
      }

      :host(:not([theme~="no-row-borders"])) [part="row"]:first-child [part~="footer-cell"] {
        border-top-color: var(--_lumo-grid-secondary-border-color);
      }

      /* Overflow uses a stronger border color */
      :host([overflow~="bottom"]) [part="row"]:first-child [part~="footer-cell"] {
        border-top-color: var(--_lumo-grid-border-color);
      }

      /* Column reordering */

      :host([reordering]) [part~="cell"] {
        background: linear-gradient(var(--lumo-shade-20pct), var(--lumo-shade-20pct)) var(--lumo-base-color);
      }

      :host([reordering]) [part~="cell"][reorder-status="allowed"] {
        background: var(--lumo-base-color);
      }

      :host([reordering]) [part~="cell"][reorder-status="dragging"] {
        background: linear-gradient(var(--lumo-contrast-5pct), var(--lumo-contrast-5pct)) var(--lumo-base-color);
      }

      [part~="reorder-ghost"] {
        opacity: 0.85;
        box-shadow: var(--lumo-box-shadow-s);
        /* TODO Use the same styles as for the cell element (reorder-ghost copies styles from the cell element) */
        padding: var(--lumo-space-s) var(--lumo-space-m) !important;
      }

      /* Column resizing */

      [part="resize-handle"] {
        width: 3px;
        background-color: var(--lumo-primary-color-50pct);
        opacity: 0;
        transition: opacity 0.2s;
      }

      :host(:not([reordering])) *:not([column-resizing]) [part~="cell"]:hover [part="resize-handle"],
      [part="resize-handle"]:active {
        opacity: 1;
        transition-delay: 0.15s;
      }

      /* Column borders */

      :host([theme~="column-borders"]) [part~="cell"]:not([last-column]):not([part~="details-cell"]) {
        border-right: var(--_lumo-grid-border-width) solid var(--_lumo-grid-secondary-border-color);
      }

      /* Frozen columns */

      [last-frozen] {
        border-right: var(--_lumo-grid-border-width) solid transparent;
        overflow: hidden;
      }

      :host([overflow~="left"]) [part~="cell"][last-frozen]:not([part~="details-cell"]) {
        border-right-color: var(--_lumo-grid-border-color);
      }

      /* Row stripes */

      :host([theme~="row-stripes"]) [part~="row"]:not([odd]) [part~="body-cell"],
      :host([theme~="row-stripes"]) [part~="row"]:not([odd]) [part~="details-cell"] {
        background-image: linear-gradient(var(--lumo-contrast-5pct), var(--lumo-contrast-5pct));
        background-repeat: repeat-x;
      }

      /* Selected row */

      /* Raise the selected rows above unselected rows (so that box-shadow can cover unselected rows) */
      :host(:not([reordering])) [part~="row"][selected] {
        z-index: 1;
      }

      :host(:not([reordering])) [part~="row"][selected] [part~="body-cell"]:not([part~="details-cell"]) {
        background-image: linear-gradient(var(--_lumo-grid-selected-row-color), var(--_lumo-grid-selected-row-color));
        background-repeat: repeat;
      }

      /* Cover the border of an unselected row */
      :host(:not([theme~="no-row-borders"])) [part~="row"][selected] [part~="cell"]:not([part~="details-cell"]) {
        box-shadow: 0 var(--_lumo-grid-border-width) 0 0 var(--_lumo-grid-selected-row-color);
      }

      /* Compact */

      :host([theme~="compact"]) [part="row"]:only-child [part~="header-cell"] {
        min-height: var(--lumo-size-m);
      }

      :host([theme~="compact"]) [part~="cell"] {
        min-height: var(--lumo-size-s);
      }

      :host([theme~="compact"]) [part="row"][first] [part~="cell"]:not([part~="details-cell"]) {
        min-height: calc(var(--lumo-size-s) - var(--_lumo-grid-border-width));
      }

      :host([theme~="compact"]) [part~="cell"] ::slotted(vaadin-grid-cell-content) {
        padding: var(--lumo-space-xs) var(--lumo-space-s);
      }

      /* Wrap cell contents */

      :host([theme~="wrap-cell-content"]) [part~="cell"] ::slotted(vaadin-grid-cell-content) {
        white-space: normal;
      }
    </style>
  </template>
</dom-module><dom-module theme-for="vaadin-checkbox" id="vaadin-grid-select-all-checkbox-lumo">
  <template>
    <style>
      :host(.vaadin-grid-select-all-checkbox) {
        font-size: var(--lumo-font-size-m);
      }
   </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer$7.content);class MembersView extends _bbbbcSegmentTracker.PolymerElement{static get template(){return _bbbbcSegmentTracker.html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }

    paper-fab {
        position: fixed;
        right: 25px;
        bottom: 30px;
    }
      </style>

      <iron-ajax
        id="getMembersAjax"
        auto
        url="http://127.0.0.1:5000/api/v1.0/members"
        method="get"
        handle-as="json"
        last-response="{{members}}">
      </iron-ajax>

      <div class="card">
        <h1>Members</h1>
        <vaadin-grid theme="no-border" aria-label="Member Table" items="[[members.members]]">
          <vaadin-grid-column width="60px" flex-grow="0" text-align="center">
            <template><iron-image style="width:50px; height:50px; background-color: blue; display: block; " width="30" height="30" sizing="cover" preload fade src="https://dgalywyr863hv.cloudfront.net/pictures/athletes/308150/139501/1/medium.jpg"></iron-image></template>
          </vaadin-grid-column>
          <vaadin-grid-column>
            <template class="header">Name</template>
            <template>[[item.first_name]] [[item.last_name]]</template>
          </vaadin-grid-column>
          <vaadin-grid-column text-align="center">
            <template class="header">Current Handicap</template>
            <template>1.0</template>
          </vaadin-grid-column>
          <vaadin-grid-column flex-grow="0" >
            <!-- Strava link -->
            <template><a href="https://www.strava.com/athletes/[[item.id]]" target="blank"><paper-icon-button icon="open-in-browser" title="show in strava"></paper-icon-button></a></template>
          </vaadin-grid-column>
          <vaadin-grid-column flex-grow="0" >
            <!-- Resync Activities -->
            <template><paper-icon-button icon="cached" title="resync activities" disabled></paper-icon-button></template>
          </vaadin-grid-column>
          <vaadin-grid-column flex-grow="0" >
            <!-- Disconnect/Delete -->
            <template><paper-icon-button icon="delete" title="delete" disabled></paper-icon-button></template>
          </vaadin-grid-column>
        </vaadin-grid>

        <paper-fab icon="add"></paper-fab>

      </div>
    `}}window.customElements.define("members-view",MembersView)});