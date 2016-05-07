/*! ngstorage 0.3.10 | Copyright (c) 2015 Gias Kay Lee | MIT License */!function(a,b){"use strict";"function"==typeof define&&define.amd?define(["angular"],b):a.hasOwnProperty("angular")?b(a.angular):"object"==typeof exports&&(module.exports=b(require("angular")))}(this,function(a){"use strict";function b(b){return function(){var c="ngStorage-";this.setKeyPrefix=function(a){if("string"!=typeof a)throw new TypeError("[ngStorage] - "+b+"Provider.setKeyPrefix() expects a String.");c=a};var d=a.toJson,e=a.fromJson;this.setSerializer=function(a){if("function"!=typeof a)throw new TypeError("[ngStorage] - "+b+"Provider.setSerializer expects a function.");d=a},this.setDeserializer=function(a){if("function"!=typeof a)throw new TypeError("[ngStorage] - "+b+"Provider.setDeserializer expects a function.");e=a},this.get=function(a){return e(window[b].getItem(c+a))},this.set=function(a,e){return window[b].setItem(c+a,d(e))},this.$get=["$rootScope","$window","$log","$timeout","$document",function(f,g,h,i,j){function k(a){var b;try{b=g[a]}catch(c){b=!1}if(b&&"localStorage"===a){var d="__"+Math.round(1e7*Math.random());try{localStorage.setItem(d,d),localStorage.removeItem(d)}catch(c){b=!1}}return b}var l,m,n=c.length,o=k(b)||(h.warn("This browser does not support Web Storage!"),{setItem:a.noop,getItem:a.noop,removeItem:a.noop}),p={$default:function(b){for(var c in b)a.isDefined(p[c])||(p[c]=a.copy(b[c]));return p.$sync(),p},$reset:function(a){for(var b in p)"$"===b[0]||delete p[b]&&o.removeItem(c+b);return p.$default(a)},$sync:function(){for(var a,b=0,d=o.length;d>b;b++)(a=o.key(b))&&c===a.slice(0,n)&&(p[a.slice(n)]=e(o.getItem(a)))},$apply:function(){var b;if(m=null,!a.equals(p,l)){b=a.copy(l),a.forEach(p,function(e,f){a.isDefined(e)&&"$"!==f[0]&&(o.setItem(c+f,d(e)),delete b[f])});for(var e in b)o.removeItem(c+e);l=a.copy(p)}}};return p.$sync(),l=a.copy(p),f.$watch(function(){m||(m=i(p.$apply,100,!1))}),g.addEventListener&&g.addEventListener("storage",function(b){if(b.key){var d=j[0];d.hasFocus&&d.hasFocus()||c!==b.key.slice(0,n)||(b.newValue?p[b.key.slice(n)]=e(b.newValue):delete p[b.key.slice(n)],l=a.copy(p),f.$apply())}}),g.addEventListener&&g.addEventListener("beforeunload",function(){p.$apply()}),p}]}}return a=a&&a.module?a:window.angular,a.module("ngStorage",[]).provider("$localStorage",b("localStorage")).provider("$sessionStorage",b("sessionStorage"))});
!function(){"use strict";var e=angular.module("cc.base",["ngMaterial","ngMdIcons"]);e.config(["$mdThemingProvider",function(e){e.definePalette("cosmic-warn",e.extendPalette("red",{500:"c31b09",contrastDefaultColor:"dark"})),e.theme("default").primaryPalette("deep-purple").accentPalette("amber"),e.theme("warn").primaryPalette("cosmic-warn").accentPalette("orange")}]),e.value("gameInitials",["E","A","C","D","I","S"]),e.filter("gameName",function(){var e={E:"Encounter",A:"Alliance",C:"Conflict",D:"Dominion",I:"Incursion",S:"Storm"};return function(n){return"Cosmic "+e[n]}}),e.component("cosmicDrawer",{template:'\n<md-sidenav md-whiteframe="2" class ="md-sidenav-left" md-component-id="left">\n	<md-toolbar class ="md-tall">\n		<div class ="md-toolbar-tools">\n			<h2>Cosmic Companion</h2>\n		</div>\n	</md-toolbar>\n	<md-content>\n		<md-list>\n			<md-list-item><md-button href="index.html">Home</md-button></md-list-item>\n			<md-subheader class ="md-no-sticky">Tools</md-subheader>\n			<md-list-item><md-button href="generator.html" ng-disabled="$ctrl.page === \'generator\'">Alien Generator</md-button></md-list-item>\n			<md-list-item><md-button href="reference.html" ng-disabled="$ctrl.page === \'reference\'">Alien Reference</md-button></md-list-item>\n			<md-list-item>\n				<a href="https://play.google.com/store/apps/details?id=net.fmorel.cosmicgenerator">\n					<img src="icons/playstore_badge.png" />\n				</a>\n			</md-list-item>\n		</md-list>\n	</md-content>\n</md-sidenav>\n      ',bindings:{page:"<"}}),e.component("cosmicToolbar",{template:'\n<md-toolbar class ="md-hue-2">\n  <div class ="md-toolbar-tools">\n    <md-button class ="md-icon-button" ng-click="$ctrl.drawer.open()" aria-label="Settings">\n      <ng-md-icon icon="menu" style="fill:#fff;"></ng-md-icon>\n    </md-button>\n    <h2>{{$ctrl.title}}</h2>\n  </div>\n</md-toolbar>\n      ',bindings:{title:"<",drawer:"<"}}),e.controller("NavDrawer",["$mdSidenav",function(e){this.open=function(){e("left").open()}}]),e.filter("groupBy",[function(){function e(n,t,i){if(t.length<1)return[{value:"",items:n}];var r={},a=t[i];n.forEach(function(e){var n=e[a];r[n]=r[n]||[],r[n].push(e)});var o=Object.keys(r).map(function(e){return{value:e,items:r[e]}});return t[i+1]&&(o=o.map(function(n){return{value:n.value,items:e(n.items,t,i+1)}})),o}return function(n,t){return e(n,t,0)}}])}(),function(){"use strict";var e=angular.module("cc.aliens",["ngMaterial"]);e.config(["$mdThemingProvider",function(e){e.definePalette("alien-green",e.extendPalette("green",{500:"189247",contrastDefaultColor:"light"})),e.definePalette("alien-yellow",e.extendPalette("deep-orange",{500:"c39c07"})),e.definePalette("alien-red",e.extendPalette("red",{500:"c31b09",contrastDefaultColor:"light"})),e.theme("alien0").primaryPalette("alien-green").accentPalette("deep-purple"),e.theme("alien1").primaryPalette("alien-yellow").accentPalette("deep-purple"),e.theme("alien2").primaryPalette("alien-red").accentPalette("deep-purple")}]),e.factory("alienData",["$http",function(e){var n={},t=[],i={name:"",game:"",power:"",level:0,description:"",setup:""};return{init:function(){return e.get("data/aliens.json").then(function(e){return e.data.list.forEach(function(e){n[e.name]=e,t.push(e.name)}),t.sort(),t.slice(0)})},get:function(e){return n[e]||i},getMatching:function(e,n,t,i){return this.getMatchingNames(e,n,t,i).map(this.get)},getMatchingNames:function(e,i,r,a){var o=t.filter(function(t){return e[n[t].level]&&i[n[t].game]});return r&&r.length&&(o=o.filter(function(e){return r.indexOf(e)<0})),a&&"none"!==a&&(o=o.filter(function(e){return!n[e].setup||"color"===a&&"color"!==n[e].setup})),o}}}]),e.filter("levelClass",function(){var e=["success","warning","danger"];return function(n){return e[n]}}),e.filter("levelStars",function(){var e=["★","★★","★★★"];return function(n){return e[n]}}),e.filter("levelName",function(){var e=["Green","Yellow","Red"];return function(n){return e[n]}}),e.component("alienPanel",{bindings:{alien:"<item"},template:'\n<md-card>\n	<md-card-content class ="alien-head">\n		<md-button class ="md-alien{{::$ctrl.alien.level}}-theme md-raised md-primary" ng-click="$ctrl.opened = !$ctrl.opened">{{$ctrl.opened ? \'-\': \'+\'}}</md-button>\n		<h2 class ="md-alien{{::$ctrl.alien.level}}-theme md-title alien-fg-{{::$ctrl.alien.level}}">{{::$ctrl.alien.name}}</h2>\n		<p class ="md-subhead clear">{{::$ctrl.alien.power}}</p>\n	</md-card-content>\n	<md-card-footer class ="alien-bar alien-bg-{{::$ctrl.alien.level}}">\n		<span class ="alien-panel-game">C{{::$ctrl.alien.game}}</span>\n		<span class ="alien-panel-level">{{::$ctrl.alien.level | levelStars}}</span>\n		<span ng-if="::($ctrl.alien.setup || $ctrl.alien.restriction)">⚠</span>\n		<span class ="clear"></span>\n	</md-card-footer>\n	<md-card-footer ng-if="$ctrl.opened" class ="alien-desc md-body-1" ng-bind-html="::$ctrl.alien.description">\n	</md-card-footer>\n</md-card>\n      ',controller:["$sce",function(e){"string"==typeof this.alien.description&&(this.alien.description=e.trustAsHtml(this.alien.description))}]}),e.component("alienLevelOptions",{bindings:{options:"=",save:"="},template:"\n<md-card-content>\n  <h4 class =\"md-title\">Levels to include</h4>\n  <md-checkbox ng-change=\"$ctrl.save('complexities')\" ng-model=\"$ctrl.options[level]\" ng-repeat=\"(level, name) in ::['Green','Yellow','Red']\"\n  ng-class =\"::'md-primary md-alien'+level+'-theme'\">{{::name}}</md-checkbox>\n</md-card-content>\n      "}),e.component("alienGameOptions",{bindings:{options:"=",save:"="},template:"\n<md-card-content>\n  <h4 class =\"md-title\">Games to include</h4>\n  <md-checkbox ng-change=\"$ctrl.save('game')\" ng-model=\"$ctrl.options[game]\" ng-repeat=\"game in ::['E', 'A', 'C', 'D', 'I', 'S']\"\n  class =\"md-primary\">{{::game | gameName}}</md-checkbox>\n</md-card-content>\n      "})}(),function(){"use strict";function e(e){var n=[],t=[],i=[],r=[],a=function(t){var a=Math.floor(Math.random()*r.length);if(r[a]){var o=r.splice(a,1)[0];n.push(o);var l=e.get(o);if(t&&l.restriction)for(var s=l.restriction.split(","),c=0;c<s.length;c++){var m=r.indexOf(s[c]);m>-1&&i.push(r.splice(m,1)[0])}return o}},o=function(){t=t.concat(n,i),i=[],n=[]},l=function(){r=r.concat(n,i),n=[],i=[]},s=function(e){var n=e,t=r.length;return t>0&&n>t&&(n=t),1>n&&(n=1),n},c=function(t,i){void 0===i&&(i=!1),o();for(var r=0;t>r;r++){var c=a(i);if(!c)break}return n.length<t?(l(),{aliens:[],message:"Not enough potential aliens left."+(i?' It\'s possible that the "Prevent conflicts" option is preventing me from displaying remaining aliens.':"")}):{aliens:n.sort().map(e.get),message:"Choices:",limit:s(t)}};return{reset:function(a,o,l,s){return r=e.getMatchingNames(a,o,l,s),t=[],n=[],i=[],{aliens:[],message:"List reset."}},getAllGiven:function(){return o(),{aliens:t.sort().map(e.get),message:"Aliens given out so far:"}},getChooseLimit:s,draw:c,hide:function(){return{aliens:[],message:"Choices hidden."}},show:function(){var t=n.map(function(e){return e[0].toLowerCase()});return t.indexOf((prompt("Enter the first initial of one of the aliens you were given, then click OK.")||"").toLowerCase())<0?{aliens:[],message:"Wrong letter."}:{aliens:n.sort().map(e.get),message:"Choices:"}},redo:function(e,n){return void 0===n&&(n=!1),confirm("Redo?")?(l(),c(e,n)):void 0},getDisabledActions:function(e,i){return{draw:r.length<e,hide:1>i,show:!(n.length>0&&1>i),redo:n.length<=0||0>=i,reset:n.length<=0&&t.length<=0}},getStatus:function(){var e=n.length+t.length+i.length;return e+" of "+(e+r.length)+" drawn."},init:e.init}}function n(e,n,t){function i(n){n&&(a.state=n.message,a.aliensToShow=n.aliens,n.limit&&(a.settings.numToChoose=n.limit,e.numToChoose=n.limit),a.status=t.getStatus(),a.disabled=t.getDisabledActions(a.settings.numToChoose,a.aliensToShow.length))}function r(){var e=a.settings;i(t.reset(e.complexities,e.games,e.namesExcluded,e.setupLevel)),a.restrictNumToChoose()}var a=this,o={complexities:[!0,!0,!0],games:{E:!0},namesExcluded:[],setupLevel:"none",numToChoose:2,preventConflicts:!0,version:n};e.$default(o),(!e.version||e.version<n)&&(e.$reset(o),e.version=n),a.settings=e,a.status="0 of 0 drawn.",a.state="Loading aliens...",a.aliensToShow=[],a.disabled={draw:!0,hide:!0,show:!0,redo:!0,reset:!0},a.saveSetting=function(e){r()};var l=0;a.reset=function(){confirm("Reset list of aliens?")?r():l++,l>2&&(i(t.getAllGiven()),l=0)},a.restrictNumToChoose=function(){a.settings.numToChoose=t.getChooseLimit(a.settings.numToChoose),e.numToChoose=a.settings.numToChoose},a.draw=function(){i(t.draw(a.settings.numToChoose,a.settings.preventConflicts))},a.hide=function(){i(t.hide())},a.show=function(){i(t.show())},a.redo=function(){i(t.redo(a.settings.numToChoose,a.settings.preventConflicts))},t.init().then(function(e){a.namesAll=e}).then(r)}angular.module("cc.aliens.generator",["ngAria","cc.base","cc.aliens","ngStorage","ngMaterial"]).config(["$compileProvider","$localStorageProvider",function(e,n){e.debugInfoEnabled(!1),n.setKeyPrefix("aliengen")}]).constant("generatorVersion",2).service("GeneratorService",["alienData",e]).controller("GeneratorCtrl",["$localStorage","generatorVersion","GeneratorService",n])}(),function(){"use strict";function e(e,n,t){function i(){var n=e.getMatching(r.complexities,r.games);r.alienGroups=t(n,r.groupPref)}var r=this;n.$default({complexities:[!0,!0,!0],games:{E:!0},orderPref:["name"],groupPref:["game","level"]}),r.complexities=n.complexities,r.games=n.games,r.orderPref=n.orderPref,r.groupPref=n.groupPref,r.alienGroups=[],r.change=function(e){i()},e.init().then(i)}angular.module("cc.aliens.reference",["cc.base","cc.aliens","ngStorage","ngAria","ngMaterial"]).config(["$compileProvider","$localStorageProvider",function(e,n){e.debugInfoEnabled(!1),n.setKeyPrefix("alienref")}]).controller("AlienReference",["alienData","$localStorage","groupByFilter",e])}();