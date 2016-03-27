"use strict";!function(a,b){"function"==typeof define&&define.amd?define(["angular"],b):a.hasOwnProperty("angular")?b(a.angular):"object"==typeof exports&&(module.exports=b(require("angular")))}(this,function(a){function b(b){return function(){var c="ngStorage-";this.setKeyPrefix=function(a){if("string"!=typeof a)throw new TypeError("[ngStorage] - "+b+"Provider.setKeyPrefix() expects a String.");c=a};var d=a.toJson,e=a.fromJson;this.setSerializer=function(a){if("function"!=typeof a)throw new TypeError("[ngStorage] - "+b+"Provider.setSerializer expects a function.");d=a},this.setDeserializer=function(a){if("function"!=typeof a)throw new TypeError("[ngStorage] - "+b+"Provider.setDeserializer expects a function.");e=a},this.get=function(a){return e(window[b].getItem(c+a))},this.set=function(a,e){return window[b].setItem(c+a,d(e))},this.$get=["$rootScope","$window","$log","$timeout","$document",function(f,g,h,i,j){function k(a){var b;try{b=g[a]}catch(c){b=!1}if(b&&"localStorage"===a){var d="__"+Math.round(1e7*Math.random());try{localStorage.setItem(d,d),localStorage.removeItem(d)}catch(c){b=!1}}return b}var l,m,n=c.length,o=k(b)||(h.warn("This browser does not support Web Storage!"),{setItem:a.noop,getItem:a.noop,removeItem:a.noop}),p={$default:function(b){for(var c in b)a.isDefined(p[c])||(p[c]=a.copy(b[c]));return p.$sync(),p},$reset:function(a){for(var b in p)"$"===b[0]||delete p[b]&&o.removeItem(c+b);return p.$default(a)},$sync:function(){for(var a,b=0,d=o.length;d>b;b++)(a=o.key(b))&&c===a.slice(0,n)&&(p[a.slice(n)]=e(o.getItem(a)))},$apply:function(){var b;if(m=null,!a.equals(p,l)){b=a.copy(l),a.forEach(p,function(e,f){a.isDefined(e)&&"$"!==f[0]&&(o.setItem(c+f,d(e)),delete b[f])});for(var e in b)o.removeItem(c+e);l=a.copy(p)}}};return p.$sync(),l=a.copy(p),f.$watch(function(){m||(m=i(p.$apply,100,!1))}),g.addEventListener&&g.addEventListener("storage",function(b){if(b.key){var d=j[0];d.hasFocus&&d.hasFocus()||c!==b.key.slice(0,n)||(b.newValue?p[b.key.slice(n)]=e(b.newValue):delete p[b.key.slice(n)],l=a.copy(p),f.$apply())}}),g.addEventListener&&g.addEventListener("beforeunload",function(){p.$apply()}),p}]}}return a=a&&a.module?a:window.angular,a.module("ngStorage",[]).provider("$localStorage",b("localStorage")).provider("$sessionStorage",b("sessionStorage"))}),function(){var a=angular.module("cc.base",["ngMaterial","ngMdIcons"]);a.config(["$mdThemingProvider",function(a){a.definePalette("cosmic-warn",a.extendPalette("red",{500:"c31b09",contrastDefaultColor:"dark"})),a.theme("default").primaryPalette("deep-purple").accentPalette("amber"),a.theme("warn").primaryPalette("cosmic-warn").accentPalette("orange")}]),a.value("gameInitials",["E","A","C","D","I","S"]),a.filter("gameName",function(){var a={E:"Encounter",A:"Alliance",C:"Conflict",D:"Dominion",I:"Incursion",S:"Storm"};return function(b){return"Cosmic "+a[b]}}),a.component("cosmicDrawer",{template:'\n<md-sidenav md-whiteframe="2" class ="md-sidenav-left" md-component-id="left">\n	<md-toolbar class ="md-tall">\n		<div class ="md-toolbar-tools">\n			<h2>Cosmic Companion</h2>\n		</div>\n	</md-toolbar>\n	<md-content>\n		<md-list>\n			<md-list-item><md-button href="index.html">Home</md-button></md-list-item>\n			<md-subheader class ="md-no-sticky">Tools</md-subheader>\n			<md-list-item><md-button href="generator.html" ng-disabled="$ctrl.page === \'generator\'">Alien Generator</md-button></md-list-item>\n			<md-list-item><md-button href="reference.html" ng-disabled="$ctrl.page === \'reference\'">Alien Reference</md-button></md-list-item>\n			<md-list-item>\n				<a href="https://play.google.com/store/apps/details?id=net.fmorel.cosmicgenerator">\n					<img src="icons/playstore_badge.png" />\n				</a>\n			</md-list-item>\n		</md-list>\n	</md-content>\n</md-sidenav>\n      ',bindings:{page:"<"}}),a.component("cosmicToolbar",{template:'\n<md-toolbar class ="md-hue-2">\n  <div class ="md-toolbar-tools">\n    <md-button class ="md-icon-button" ng-click="$ctrl.drawer.open()" aria-label="Settings">\n      <ng-md-icon icon="menu" style="fill:#fff;"></ng-md-icon>\n    </md-button>\n    <h2>{{$ctrl.title}}</h2>\n  </div>\n</md-toolbar>\n      ',bindings:{title:"<",drawer:"<"}}),a.controller("NavDrawer",["$mdSidenav",function(a){this.open=function(){a("left").open()}}]),a.filter("groupBy",[function(){function a(b,c,d){if(c.length<1)return{value:"",items:b};var e={},f=c[d];b.forEach(function(a){var b=a[f];e[b]=e[b]||[],e[b].push(a)});var g=Object.keys(e).map(function(a){return{value:a,items:e[a]}});return c[d+1]&&(g=g.map(function(b){return{value:b.value,items:a(b.items,c,d+1)}})),g}return function(b,c){return a(b,c,0)}}])}(),function(){var a=angular.module("cc.aliens",["ngMaterial"]);a.config(["$mdThemingProvider",function(a){a.definePalette("alien-green",a.extendPalette("green",{500:"189247",contrastDefaultColor:"light"})),a.definePalette("alien-yellow",a.extendPalette("deep-orange",{500:"c39c07"})),a.definePalette("alien-red",a.extendPalette("red",{500:"c31b09",contrastDefaultColor:"light"})),a.theme("alien0").primaryPalette("alien-green").accentPalette("deep-purple"),a.theme("alien1").primaryPalette("alien-yellow").accentPalette("deep-purple"),a.theme("alien2").primaryPalette("alien-red").accentPalette("deep-purple")}]),a.factory("alienData",["$http",function(a){var b={},c=[];return{init:function(){return a.get("data/aliens.json").then(function(a){return a.data.list.forEach(function(a){b[a.name]=a,c.push(a.name)}),c.sort(),c.slice(0)})},get:function(a){return b[a]||{}},getMatching:function(a,c,d,e){return this.getMatchingNames(a,c,d,e).map(function(a){return b[a]})},getMatchingNames:function(a,d,e,f){var g=c.filter(function(c){return a[b[c].level]&&d[b[c].game]});return e&&e.length&&(g=g.filter(function(a){return e.indexOf(a)<0})),f&&"none"!==f&&(g=g.filter(function(a){return!b[a].setup||"color"===f&&"color"!==b[a].setup})),g}}}]),a.filter("levelClass",function(){var a=["success","warning","danger"];return function(b){return a[b]}}),a.filter("levelStars",function(){var a=["★","★★","★★★"];return function(b){return a[b]}}),a.filter("levelName",function(){var a=["Green","Yellow","Red"];return function(b){return a[b]}}),a.component("alienPanel",{bindings:{alien:"<item"},template:'\n<md-card>\n	<md-card-content class ="alien-head">\n		<md-button class ="md-alien{{::$ctrl.alien.level}}-theme md-raised md-primary" ng-click="$ctrl.opened = !$ctrl.opened">{{$ctrl.opened ? \'-\': \'+\'}}</md-button>\n		<h2 class ="md-alien{{::$ctrl.alien.level}}-theme md-title alien-fg-{{::$ctrl.alien.level}}">{{::$ctrl.alien.name}}</h2>\n		<p class ="md-subhead clear">{{::$ctrl.alien.power}}</p>\n	</md-card-content>\n	<md-card-footer class ="alien-bar alien-bg-{{::$ctrl.alien.level}}">\n		<span class ="alien-panel-game">C{{::$ctrl.alien.game}}</span>\n		<span class ="alien-panel-level">{{::$ctrl.alien.level | levelStars}}</span>\n		<span ng-if="::($ctrl.alien.setup || $ctrl.alien.restriction)">⚠</span>\n		<span class ="clear"></span>\n	</md-card-footer>\n	<md-card-footer ng-if="$ctrl.opened" class ="alien-desc md-body-1" ng-bind-html="::$ctrl.alien.description">\n	</md-card-footer>\n</md-card>\n      ',controller:["$sce",function(a){"string"==typeof this.alien.description&&(this.alien.description=a.trustAsHtml(this.alien.description))}]}),a.component("alienLevelOptions",{bindings:{options:"=",save:"="},template:"\n<md-card-content>\n  <h4 class =\"md-title\">Levels to include</h4>\n  <md-checkbox ng-change=\"$ctrl.save('complexities')\" ng-model=\"$ctrl.options[level]\" ng-repeat=\"(level, name) in ::['Green','Yellow','Red']\"\n  ng-class =\"::'md-primary md-alien'+level+'-theme'\">{{::name}}</md-checkbox>\n</md-card-content>\n      "}),a.component("alienGameOptions",{bindings:{options:"=",save:"="},template:"\n<md-card-content>\n  <h4 class =\"md-title\">Games to include</h4>\n  <md-checkbox ng-change=\"$ctrl.save('game')\" ng-model=\"$ctrl.options[game]\" ng-repeat=\"game in ::['E', 'A', 'C', 'D', 'I', 'S']\"\n  class =\"md-primary\">{{::game | gameName}}</md-checkbox>\n</md-card-content>\n      "})}(),function(){var a=angular.module("cc.aliens.generator",["ngAria","cc.base","cc.aliens","ngStorage","ngMaterial"]);a.constant("generatorVersion",2),a.service("GeneratorService",["alienData",function(a){var b={},c=[],d=[],e=[],f=[];b.reset=function(b,g,h,i){return f=a.getMatchingNames(b,g,h,i),d=[],c=[],e=[],{aliens:[],message:"List reset."}};var g=function(b){var d=Math.floor(Math.random()*f.length);if(f[d]){var g=f.splice(d,1)[0];c.push(g);var h=a.get(g);if(b&&h.restriction)for(var i=h.restriction.split(","),j=0;j<i.length;j++){var k=f.indexOf(i[j]);k>-1&&e.push(f.splice(k,1)[0])}return g}},h=function(){d=d.concat(c,e),e=[],c=[]},i=function(){f=f.concat(c,e),c=[],e=[]};return b.getAllGiven=function(){return h(),{aliens:d.sort().map(a.get),message:"Aliens given out so far:"}},b.getChooseLimit=function(a){var b=a,c=f.length;return c>0&&b>c&&(b=c),1>b&&(b=1),b},b.draw=function(d){h();for(var e=0;d>e;e++){var f=g();if(!f)break}return c.length<d?(i(),{aliens:[],message:"Not enough potential aliens left."+(b.settings.preventConflicts?' It\'s possible that the "Prevent conflicts" option is preventing me from displaying remaining aliens.':"")}):{aliens:c.sort().map(a.get),message:"Choices:",limit:b.getChooseLimit(d)}},b.hide=function(){return{aliens:[],state:"Choices hidden."}},b.show=function(){var b=c.map(function(a){return a[0].toLowerCase()});return b.indexOf((prompt("Enter the first initial of one of the aliens you were given, then click OK.")||"").toLowerCase())<0?{aliens:[],state:"Wrong letter."}:{aliens:c.map(a.get),message:"Choices:"}},b.redo=function(a){return confirm("Redo?")?(i(),b.draw(a)):void 0},b.getDisabledActions=function(a,b){return{draw:f.length<a,hide:1>b,show:!(c.length>0&&1>b),redo:c.length<=0||0>=b,reset:c.length<=0&&d.length<=0}},b.getStatus=function(){var a=c.length+d.length+e.length;return a+" of "+(a+f.length)+" drawn."},b.init=a.init,b}]),a.controller("GeneratorCtrl",["$localStorage","generatorVersion","GeneratorService",function(a,b,c){var d=this,e={complexities:[!0,!0,!0],games:{E:!0},namesExcluded:[],setupLevel:"none",numToChoose:2,preventConflicts:!0,version:2};a.$default(e),(!a.version||a.version<b)&&(a.$reset(e),a.version=b),d.settings=a,d.status="0 of 0 drawn.",d.state="Loading aliens...",d.aliensToShow=[],d.disabled={draw:!0,hide:!0,show:!0,redo:!0,reset:!0};var f=function(b){b&&(d.state=b.message,d.aliensToShow=b.aliens,b.limit&&(d.settings.numToChoose=b.limit,a.numToChoose=b.limit),d.status=c.getStatus(),d.disabled=c.getDisabledActions(d.settings.numToChoose,d.aliensToShow.length))},g=function(){var a=d.settings;f(c.reset(a.complexities,a.games,a.namesExcluded,a.setupLevel)),d.restrictNumToChoose()};d.saveSetting=function(b){a[b]=d.settings[b],g()};var h=0;d.reset=function(){confirm("Reset list of aliens?")?g():h++,h>2&&(f(c.getAllGiven()),h=0)},d.restrictNumToChoose=function(){d.settings.numToChoose=c.getChooseLimit(d.settings.numToChoose),a.numToChoose=d.settings.numToChoose},d.draw=function(){f(c.draw(d.settings.numToChoose))},d.hide=function(){f(c.hide())},d.show=function(){f(c.show())},d.redo=function(){f(c.redo(d.settings.numToChoose))},c.init().then(function(a){d.namesAll=a}).then(g)}])}(),function(){var a=angular.module("cc.aliens.reference",["cc.base","cc.aliens","ngStorage","ngAria","ngMaterial"]);a.controller("AlienReference",["alienData","$localStorage","groupByFilter",function(a,b,c){var d=this;b.$default({complexities:[!0,!0,!0],games:{E:!0},orderPref:["name"],groupPref:["game","level"]}),d.complexities=b.complexities,d.games=b.games,d.orderPref=b.orderPref,d.groupPref=b.groupPref,d.alienGroups=[];var e=function(){var b=a.getMatching(d.complexities,d.games);d.alienGroups=c(b,d.groupPref)};d.change=function(a){a&&(b[a]=d[a]),e()},a.init().then(e)}])}();