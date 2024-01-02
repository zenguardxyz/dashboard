import{M as E,I as ae,J as q,N as ce}from"./index-5397f0bd.js";const fe=r=>JSON.stringify(r,(t,s)=>typeof s=="bigint"?s.toString()+"n":s),ue=r=>{const t=/([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g,s=r.replace(t,'$1"$2n"$3');return JSON.parse(s,(c,f)=>typeof f=="string"&&f.match(/^\d+n$/)?BigInt(f.substring(0,f.length-1)):f)};function he(r){if(typeof r!="string")throw new Error(`Cannot safe json parse value of type ${typeof r}`);try{return ue(r)}catch{return r}}function L(r){return typeof r=="string"?r:fe(r)||""}const de="PARSE_ERROR",le="INVALID_REQUEST",pe="METHOD_NOT_FOUND",ye="INVALID_PARAMS",$="INTERNAL_ERROR",S="SERVER_ERROR",be=[-32700,-32600,-32601,-32602,-32603],R={[de]:{code:-32700,message:"Parse error"},[le]:{code:-32600,message:"Invalid Request"},[pe]:{code:-32601,message:"Method not found"},[ye]:{code:-32602,message:"Invalid params"},[$]:{code:-32603,message:"Internal error"},[S]:{code:-32e3,message:"Server error"}},V=S;function me(r){return be.includes(r)}function U(r){return Object.keys(R).includes(r)?R[r]:R[V]}function ve(r){const t=Object.values(R).find(s=>s.code===r);return t||R[V]}function Ee(r,t,s){return r.message.includes("getaddrinfo ENOTFOUND")||r.message.includes("connect ECONNREFUSED")?new Error(`Unavailable ${s} RPC url at ${t}`):r}var ge={},b={},M;function we(){if(M)return b;M=1,Object.defineProperty(b,"__esModule",{value:!0}),b.isBrowserCryptoAvailable=b.getSubtleCrypto=b.getBrowerCrypto=void 0;function r(){return(E===null||E===void 0?void 0:E.crypto)||(E===null||E===void 0?void 0:E.msCrypto)||{}}b.getBrowerCrypto=r;function t(){const c=r();return c.subtle||c.webkitSubtle}b.getSubtleCrypto=t;function s(){return!!r()&&!!t()}return b.isBrowserCryptoAvailable=s,b}var m={},j;function Re(){if(j)return m;j=1,Object.defineProperty(m,"__esModule",{value:!0}),m.isBrowser=m.isNode=m.isReactNative=void 0;function r(){return typeof document>"u"&&typeof navigator<"u"&&navigator.product==="ReactNative"}m.isReactNative=r;function t(){return typeof process<"u"&&typeof process.versions<"u"&&typeof process.versions.node<"u"}m.isNode=t;function s(){return!r()&&!t()}return m.isBrowser=s,m}(function(r){Object.defineProperty(r,"__esModule",{value:!0});const t=ae;t.__exportStar(we(),r),t.__exportStar(Re(),r)})(ge);function k(r=3){const t=Date.now()*Math.pow(10,r),s=Math.floor(Math.random()*Math.pow(10,r));return t+s}function _e(r=6){return BigInt(k(r))}function Ae(r,t,s){return{id:s||k(),jsonrpc:"2.0",method:r,params:t}}function Ne(r,t){return{id:r,jsonrpc:"2.0",result:t}}function Te(r,t,s){return{id:r,jsonrpc:"2.0",error:Oe(t,s)}}function Oe(r,t){return typeof r>"u"?U($):(typeof r=="string"&&(r=Object.assign(Object.assign({},U(S)),{message:r})),typeof t<"u"&&(r.data=t),me(r.code)&&(r=ve(r.code)),r)}class G{}class Fe extends G{constructor(t){super()}}class Pe extends G{constructor(){super()}}class Be extends Pe{constructor(t){super()}}const Se="^https?:",De="^wss?:";function xe(r){const t=r.match(new RegExp(/^\w+:/,"gi"));if(!(!t||!t.length))return t[0]}function X(r,t){const s=xe(r);return typeof s>"u"?!1:new RegExp(t).test(s)}function N(r){return X(r,Se)}function He(r){return X(r,De)}function Je(r){return new RegExp("wss?://localhost(:d{2,5})?").test(r)}function z(r){return typeof r=="object"&&"id"in r&&"jsonrpc"in r&&r.jsonrpc==="2.0"}function qe(r){return z(r)&&"method"in r}function Ce(r){return z(r)&&(Ie(r)||W(r))}function Ie(r){return"result"in r}function W(r){return"error"in r}class $e extends Be{constructor(t){super(t),this.events=new q.EventEmitter,this.hasRegisteredEventListeners=!1,this.connection=this.setConnection(t),this.connection.connected&&this.registerEventListeners()}async connect(t=this.connection){await this.open(t)}async disconnect(){await this.close()}on(t,s){this.events.on(t,s)}once(t,s){this.events.once(t,s)}off(t,s){this.events.off(t,s)}removeListener(t,s){this.events.removeListener(t,s)}async request(t,s){return this.requestStrict(Ae(t.method,t.params||[],t.id||_e().toString()),s)}async requestStrict(t,s){return new Promise(async(c,f)=>{if(!this.connection.connected)try{await this.open()}catch(o){f(o)}this.events.on(`${t.id}`,o=>{W(o)?f(o.error):c(o.result)});try{await this.connection.send(t,s)}catch(o){f(o)}})}setConnection(t=this.connection){return t}onPayload(t){this.events.emit("payload",t),Ce(t)?this.events.emit(`${t.id}`,t):this.events.emit("message",{type:t.method,data:t.params})}onClose(t){t&&t.code===3e3&&this.events.emit("error",new Error(`WebSocket connection closed abnormally with code: ${t.code} ${t.reason?`(${t.reason})`:""}`)),this.events.emit("disconnect")}async open(t=this.connection){this.connection===t&&this.connection.connected||(this.connection.connected&&this.close(),typeof t=="string"&&(await this.connection.open(t),t=this.connection),this.connection=this.setConnection(t),await this.connection.open(),this.registerEventListeners(),this.events.emit("connect"))}async close(){await this.connection.close()}registerEventListeners(){this.hasRegisteredEventListeners||(this.connection.on("payload",t=>this.onPayload(t)),this.connection.on("close",t=>this.onClose(t)),this.connection.on("error",t=>this.events.emit("error",t)),this.connection.on("register_error",t=>this.onClose()),this.hasRegisteredEventListeners=!0)}}var B={exports:{}};(function(r,t){var s=typeof self<"u"?self:E,c=function(){function o(){this.fetch=!1,this.DOMException=s.DOMException}return o.prototype=s,new o}();(function(o){(function(l){var p={searchParams:"URLSearchParams"in o,iterable:"Symbol"in o&&"iterator"in Symbol,blob:"FileReader"in o&&"Blob"in o&&function(){try{return new Blob,!0}catch{return!1}}(),formData:"FormData"in o,arrayBuffer:"ArrayBuffer"in o};function Q(e){return e&&DataView.prototype.isPrototypeOf(e)}if(p.arrayBuffer)var K=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],Y=ArrayBuffer.isView||function(e){return e&&K.indexOf(Object.prototype.toString.call(e))>-1};function g(e){if(typeof e!="string"&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function D(e){return typeof e!="string"&&(e=String(e)),e}function A(e){var n={next:function(){var i=e.shift();return{done:i===void 0,value:i}}};return p.iterable&&(n[Symbol.iterator]=function(){return n}),n}function u(e){this.map={},e instanceof u?e.forEach(function(n,i){this.append(i,n)},this):Array.isArray(e)?e.forEach(function(n){this.append(n[0],n[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(n){this.append(n,e[n])},this)}u.prototype.append=function(e,n){e=g(e),n=D(n);var i=this.map[e];this.map[e]=i?i+", "+n:n},u.prototype.delete=function(e){delete this.map[g(e)]},u.prototype.get=function(e){return e=g(e),this.has(e)?this.map[e]:null},u.prototype.has=function(e){return this.map.hasOwnProperty(g(e))},u.prototype.set=function(e,n){this.map[g(e)]=D(n)},u.prototype.forEach=function(e,n){for(var i in this.map)this.map.hasOwnProperty(i)&&e.call(n,this.map[i],i,this)},u.prototype.keys=function(){var e=[];return this.forEach(function(n,i){e.push(i)}),A(e)},u.prototype.values=function(){var e=[];return this.forEach(function(n){e.push(n)}),A(e)},u.prototype.entries=function(){var e=[];return this.forEach(function(n,i){e.push([i,n])}),A(e)},p.iterable&&(u.prototype[Symbol.iterator]=u.prototype.entries);function T(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function x(e){return new Promise(function(n,i){e.onload=function(){n(e.result)},e.onerror=function(){i(e.error)}})}function Z(e){var n=new FileReader,i=x(n);return n.readAsArrayBuffer(e),i}function ee(e){var n=new FileReader,i=x(n);return n.readAsText(e),i}function te(e){for(var n=new Uint8Array(e),i=new Array(n.length),d=0;d<n.length;d++)i[d]=String.fromCharCode(n[d]);return i.join("")}function C(e){if(e.slice)return e.slice(0);var n=new Uint8Array(e.byteLength);return n.set(new Uint8Array(e)),n.buffer}function I(){return this.bodyUsed=!1,this._initBody=function(e){this._bodyInit=e,e?typeof e=="string"?this._bodyText=e:p.blob&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:p.formData&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:p.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():p.arrayBuffer&&p.blob&&Q(e)?(this._bodyArrayBuffer=C(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):p.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(e)||Y(e))?this._bodyArrayBuffer=C(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||(typeof e=="string"?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):p.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},p.blob&&(this.blob=function(){var e=T(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?T(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(Z)}),this.text=function(){var e=T(this);if(e)return e;if(this._bodyBlob)return ee(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(te(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},p.formData&&(this.formData=function(){return this.text().then(se)}),this.json=function(){return this.text().then(JSON.parse)},this}var re=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function ne(e){var n=e.toUpperCase();return re.indexOf(n)>-1?n:e}function v(e,n){n=n||{};var i=n.body;if(e instanceof v){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,n.headers||(this.headers=new u(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,!i&&e._bodyInit!=null&&(i=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=n.credentials||this.credentials||"same-origin",(n.headers||!this.headers)&&(this.headers=new u(n.headers)),this.method=ne(n.method||this.method||"GET"),this.mode=n.mode||this.mode||null,this.signal=n.signal||this.signal,this.referrer=null,(this.method==="GET"||this.method==="HEAD")&&i)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(i)}v.prototype.clone=function(){return new v(this,{body:this._bodyInit})};function se(e){var n=new FormData;return e.trim().split("&").forEach(function(i){if(i){var d=i.split("="),h=d.shift().replace(/\+/g," "),a=d.join("=").replace(/\+/g," ");n.append(decodeURIComponent(h),decodeURIComponent(a))}}),n}function ie(e){var n=new u,i=e.replace(/\r?\n[\t ]+/g," ");return i.split(/\r?\n/).forEach(function(d){var h=d.split(":"),a=h.shift().trim();if(a){var _=h.join(":").trim();n.append(a,_)}}),n}I.call(v.prototype);function y(e,n){n||(n={}),this.type="default",this.status=n.status===void 0?200:n.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in n?n.statusText:"OK",this.headers=new u(n.headers),this.url=n.url||"",this._initBody(e)}I.call(y.prototype),y.prototype.clone=function(){return new y(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new u(this.headers),url:this.url})},y.error=function(){var e=new y(null,{status:0,statusText:""});return e.type="error",e};var oe=[301,302,303,307,308];y.redirect=function(e,n){if(oe.indexOf(n)===-1)throw new RangeError("Invalid status code");return new y(null,{status:n,headers:{location:e}})},l.DOMException=o.DOMException;try{new l.DOMException}catch{l.DOMException=function(n,i){this.message=n,this.name=i;var d=Error(n);this.stack=d.stack},l.DOMException.prototype=Object.create(Error.prototype),l.DOMException.prototype.constructor=l.DOMException}function O(e,n){return new Promise(function(i,d){var h=new v(e,n);if(h.signal&&h.signal.aborted)return d(new l.DOMException("Aborted","AbortError"));var a=new XMLHttpRequest;function _(){a.abort()}a.onload=function(){var w={status:a.status,statusText:a.statusText,headers:ie(a.getAllResponseHeaders()||"")};w.url="responseURL"in a?a.responseURL:w.headers.get("X-Request-URL");var P="response"in a?a.response:a.responseText;i(new y(P,w))},a.onerror=function(){d(new TypeError("Network request failed"))},a.ontimeout=function(){d(new TypeError("Network request failed"))},a.onabort=function(){d(new l.DOMException("Aborted","AbortError"))},a.open(h.method,h.url,!0),h.credentials==="include"?a.withCredentials=!0:h.credentials==="omit"&&(a.withCredentials=!1),"responseType"in a&&p.blob&&(a.responseType="blob"),h.headers.forEach(function(w,P){a.setRequestHeader(P,w)}),h.signal&&(h.signal.addEventListener("abort",_),a.onreadystatechange=function(){a.readyState===4&&h.signal.removeEventListener("abort",_)}),a.send(typeof h._bodyInit>"u"?null:h._bodyInit)})}return O.polyfill=!0,o.fetch||(o.fetch=O,o.Headers=u,o.Request=v,o.Response=y),l.Headers=u,l.Request=v,l.Response=y,l.fetch=O,Object.defineProperty(l,"__esModule",{value:!0}),l})({})})(c),c.fetch.ponyfill=!0,delete c.fetch.polyfill;var f=c;t=f.fetch,t.default=f.fetch,t.fetch=f.fetch,t.Headers=f.Headers,t.Request=f.Request,t.Response=f.Response,r.exports=t})(B,B.exports);var Le=B.exports;const F=ce(Le),Ue={Accept:"application/json","Content-Type":"application/json"},Me="POST",H={headers:Ue,method:Me},J=10;class Ve{constructor(t,s=!1){if(this.url=t,this.disableProviderPing=s,this.events=new q.EventEmitter,this.isAvailable=!1,this.registering=!1,!N(t))throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);this.url=t,this.disableProviderPing=s}get connected(){return this.isAvailable}get connecting(){return this.registering}on(t,s){this.events.on(t,s)}once(t,s){this.events.once(t,s)}off(t,s){this.events.off(t,s)}removeListener(t,s){this.events.removeListener(t,s)}async open(t=this.url){await this.register(t)}async close(){if(!this.isAvailable)throw new Error("Connection already closed");this.onClose()}async send(t,s){this.isAvailable||await this.register();try{const c=L(t),o=await(await F(this.url,Object.assign(Object.assign({},H),{body:c}))).json();this.onPayload({data:o})}catch(c){this.onError(t.id,c)}}async register(t=this.url){if(!N(t))throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);if(this.registering){const s=this.events.getMaxListeners();return(this.events.listenerCount("register_error")>=s||this.events.listenerCount("open")>=s)&&this.events.setMaxListeners(s+1),new Promise((c,f)=>{this.events.once("register_error",o=>{this.resetMaxListeners(),f(o)}),this.events.once("open",()=>{if(this.resetMaxListeners(),typeof this.isAvailable>"u")return f(new Error("HTTP connection is missing or invalid"));c()})})}this.url=t,this.registering=!0;try{if(!this.disableProviderPing){const s=L({id:1,jsonrpc:"2.0",method:"test",params:[]});await F(t,Object.assign(Object.assign({},H),{body:s}))}this.onOpen()}catch(s){const c=this.parseError(s);throw this.events.emit("register_error",c),this.onClose(),c}}onOpen(){this.isAvailable=!0,this.registering=!1,this.events.emit("open")}onClose(){this.isAvailable=!1,this.registering=!1,this.events.emit("close")}onPayload(t){if(typeof t.data>"u")return;const s=typeof t.data=="string"?he(t.data):t.data;this.events.emit("payload",s)}onError(t,s){const c=this.parseError(s),f=c.message||c.toString(),o=Te(t,f);this.events.emit("payload",o)}parseError(t,s=this.url){return Ee(t,s,"HTTP")}resetMaxListeners(){this.events.getMaxListeners()>J&&this.events.setMaxListeners(J)}}export{Ve as H,Fe as I,$e as J,he as a,Je as b,ge as c,qe as d,Ce as e,Te as f,Ne as g,Ie as h,He as i,W as j,Ae as k,_e as l,k as m,Ee as p,L as s};
