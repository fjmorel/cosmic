!function(){function e(e){return function(e){if(Array.isArray(e))return i(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||n(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){var i;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(i=n(e))||t&&e&&"number"==typeof e.length){i&&(e=i);var a=0,o=function(){};return{s:o,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,r=!0,s=!1;return{s:function(){i=e[Symbol.iterator]()},n:function(){var e=i.next();return r=e.done,e},e:function(e){s=!0,c=e},f:function(){try{r||null==i.return||i.return()}finally{if(s)throw c}}}}function n(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function a(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function o(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{0:function(e,t,n){e.exports=n("zUnb")},zUnb:function(n,i,a){"use strict";a.r(i);var r,s,l,b=a("cUpR"),u=a("8Y7J"),m=a("IheW"),h=a("s7LF"),f=a("omvX"),d=a("Dxy4"),g=a("PDjf"),p=a("pMoy"),v=a("Tj54"),R=a("e6WT"),Q=a("SqCe"),y=a("zQhy"),w=a("ZTz/"),C=a("q7Ft"),S=a("l0rg"),k=a("pkqg"),B=a("iInd"),M=((r=function e(){c(this,e)}).\u0275fac=function(e){return new(e||r)},r.\u0275cmp=u.Gb({type:r,selectors:[["cosmic-app"]],decls:1,vars:0,template:function(e,t){1&e&&u.Nb(0,"router-outlet")},directives:[B.d],encapsulation:2}),r),T=a("un/a"),O=a("lJxs"),L=a("UXun"),A=((s=function e(t){c(this,e);var n={},i=[];this.init$=t.get("data/aliens2.json").pipe(Object(T.a)(3),Object(O.a)(function(e){return e.list.forEach(function(e){n[e.name]=e,i.push(e.name)}),i.sort(),i.slice(0)}),Object(L.a)()),this.get=function(e){return n[e]},this.getMatchingNames=function(e,t,a,o){return i.filter(function(i){var c=n[i];return e[c.level]&&t[c.game]&&(!a||!a.length||a.indexOf(i)<0)&&(!o||!c.setup||"color"===o&&"color"!==c.setup)})}}).\u0275fac=function(e){return new(e||s)(u.Vb(m.a))},s.\u0275prov=u.Ib({token:s,factory:s.\u0275fac,providedIn:"root"}),s),E=a("BSbQ"),G=((l=function e(t){var n=this;c(this,e),this.route=t,this.route.url.subscribe(function(e){n.page=e[0].path})}).\u0275fac=function(e){return new(e||l)(u.Mb(B.a))},l.\u0275cmp=u.Gb({type:l,selectors:[["cosmic-drawer"]],decls:17,vars:2,consts:[[1,"mat-primary"],["mat-button","","routerLink","/"],["mat-button","","routerLink","/generator",3,"disabled"],["mat-button","","routerLink","/reference",3,"disabled"],["href","https://play.google.com/store/apps/details?id=net.fmorel.cosmicgenerator"],["src","icons/playstore_badge.png"]],template:function(e,t){1&e&&(u.Rb(0,"mat-toolbar",0),u.Rb(1,"h2"),u.tc(2,"Cosmic Companion"),u.Qb(),u.Qb(),u.Rb(3,"mat-list"),u.Rb(4,"mat-list-item"),u.Rb(5,"a",1),u.tc(6,"Home"),u.Qb(),u.Qb(),u.Nb(7,"mat-divider"),u.Rb(8,"mat-list-item"),u.Rb(9,"a",2),u.tc(10,"Alien Generator"),u.Qb(),u.Qb(),u.Rb(11,"mat-list-item"),u.Rb(12,"a",3),u.tc(13,"Alien Reference"),u.Qb(),u.Qb(),u.Rb(14,"mat-list-item"),u.Rb(15,"a",4),u.Nb(16,"img",5),u.Qb(),u.Qb(),u.Qb()),2&e&&(u.Bb(9),u.hc("disabled","generator"===t.page),u.Bb(3),u.hc("disabled","reference"===t.page))},directives:[S.a,Q.a,Q.b,d.a,B.b,E.a],encapsulation:2}),l),N=a("SVse");function F(e,t){if(1&e){var n=u.Sb();u.Rb(0,"mat-list-item"),u.Rb(1,"mat-checkbox",1),u.Yb("change",function(){return u.lc(n),u.cc().select()})("ngModelChange",function(e){u.lc(n);var i=t.$implicit;return u.cc().games[i]=e}),u.tc(2),u.Qb(),u.Qb()}if(2&e){var i=t.$implicit,a=u.cc();u.Bb(1),u.hc("ngModel",a.games[i]),u.Bb(1),u.uc(i)}}var I,j,x=((I=function(){function e(){c(this,e),this.change=new u.n,this.games={},this.names=["Encounter","Alliance","Conflict","Dominion","Eons","Incursion","Storm"]}return o(e,[{key:"select",value:function(){this.change.emit(this.games)}}]),e}()).\u0275fac=function(e){return new(e||I)},I.\u0275cmp=u.Gb({type:I,selectors:[["cosmic-game-options"]],inputs:{games:"games"},outputs:{change:"change"},decls:5,vars:1,consts:[[4,"ngFor","ngForOf"],[1,"mat-primary",3,"ngModel","change","ngModelChange"]],template:function(e,t){1&e&&(u.Rb(0,"mat-card"),u.Rb(1,"mat-card-title"),u.tc(2,"Games to include"),u.Qb(),u.Rb(3,"mat-list"),u.sc(4,F,3,2,"mat-list-item",0),u.Qb(),u.Qb()),2&e&&(u.Bb(4),u.hc("ngForOf",t.names))},directives:[g.a,g.i,Q.a,N.i,Q.b,p.a,h.h,h.j],encapsulation:2}),I),Y=["Green","Yellow","Red"],$=((j=function(){function e(){c(this,e)}return o(e,[{key:"transform",value:function(e){return Y[e]}}]),e}()).\u0275fac=function(e){return new(e||j)},j.\u0275pipe=u.Lb({name:"levelName",type:j,pure:!0}),j);function P(e,t){if(1&e){var n=u.Sb();u.Rb(0,"mat-list-item",1),u.Rb(1,"mat-checkbox",2),u.Yb("change",function(){return u.lc(n),u.cc().select()})("ngModelChange",function(e){u.lc(n);var i=t.$implicit;return u.cc().levels[i]=e}),u.tc(2),u.dc(3,"levelName"),u.Qb(),u.Qb()}if(2&e){var i=t.$implicit,a=u.cc();u.hc("ngClass","alien-"+i+"-theme"),u.Bb(1),u.hc("ngModel",a.levels[i]),u.Bb(1),u.uc(u.ec(3,3,i))}}var D,U,_=function(){return[0,1,2]},H=((D=function(){function e(){c(this,e),this.change=new u.n,this.levels=[]}return o(e,[{key:"select",value:function(){this.change.emit(this.levels.slice(0))}}]),e}()).\u0275fac=function(e){return new(e||D)},D.\u0275cmp=u.Gb({type:D,selectors:[["alien-level-options"]],inputs:{levels:"levels"},outputs:{change:"change"},decls:5,vars:2,consts:[[3,"ngClass",4,"ngFor","ngForOf"],[3,"ngClass"],[1,"mat-primary",3,"ngModel","change","ngModelChange"]],template:function(e,t){1&e&&(u.Rb(0,"mat-card"),u.Rb(1,"mat-card-title"),u.tc(2,"Levels to include"),u.Qb(),u.Rb(3,"mat-list"),u.sc(4,P,4,5,"mat-list-item",0),u.Qb(),u.Qb()),2&e&&(u.Bb(4),u.hc("ngForOf",u.ic(1,_)))},directives:[g.a,g.i,Q.a,N.i,Q.b,N.h,p.a,h.h,h.j],pipes:[$],encapsulation:2}),D),z=a("Q2Ze"),J=["\u2605","\u2605\u2605","\u2605\u2605\u2605"],q=((U=function(){function e(){c(this,e)}return o(e,[{key:"transform",value:function(e){return J[e]}}]),e}()).\u0275fac=function(e){return new(e||U)},U.\u0275pipe=u.Lb({name:"levelStars",type:U,pure:!0}),U);function K(e,t){1&e&&(u.Rb(0,"span"),u.Rb(1,"mat-icon"),u.tc(2,"warning"),u.Qb(),u.Qb())}function V(e,t){if(1&e&&u.Nb(0,"div",9),2&e){var n=u.cc().$implicit;u.hc("innerHTML",n.description,u.mc)}}function W(e,t){if(1&e&&(u.Rb(0,"div",5),u.Rb(1,"span"),u.tc(2),u.Qb(),u.Qb()),2&e){var n=u.cc().$implicit;u.Bb(2),u.uc(n.player)}}function X(e,t){if(1&e&&(u.Rb(0,"div",5),u.Rb(1,"span"),u.tc(2),u.Qb(),u.Qb()),2&e){var n=u.cc().$implicit;u.Bb(2),u.uc(n.mandatory)}}function Z(e,t){if(1&e&&(u.Rb(0,"div",5),u.Rb(1,"span"),u.tc(2),u.Qb(),u.Qb()),2&e){var n=u.cc().$implicit;u.Bb(2),u.vc("Phases: ",n.phases.split(",").join(", "),"")}}function ee(e,t){if(1&e){var n=u.Sb();u.Rb(0,"div"),u.Rb(1,"mat-card",1),u.Rb(2,"mat-card-header"),u.Rb(3,"div",2),u.Rb(4,"button",3),u.Yb("click",function(){u.lc(n);var e=t.$implicit,i=u.cc();return i.opened[e.name]=!i.opened[e.name]}),u.Rb(5,"mat-icon"),u.tc(6),u.Qb(),u.Qb(),u.Qb(),u.Rb(7,"mat-card-title",4),u.tc(8),u.Qb(),u.Rb(9,"mat-card-subtitle"),u.tc(10),u.Qb(),u.Qb(),u.Rb(11,"mat-card-footer"),u.Rb(12,"div",5),u.Rb(13,"span"),u.tc(14),u.Qb(),u.sc(15,K,3,0,"span",6),u.Rb(16,"span"),u.tc(17),u.dc(18,"levelStars"),u.Qb(),u.Qb(),u.sc(19,V,1,1,"div",7),u.sc(20,W,3,1,"div",8),u.sc(21,X,3,1,"div",8),u.sc(22,Z,3,1,"div",8),u.Qb(),u.Qb(),u.Qb()}if(2&e){var i=t.$implicit,a=u.cc();u.Bb(1),u.hc("ngClass","alien-"+i.level+"-theme"),u.Bb(5),u.uc(a.opened[i.name]?"remove":"add"),u.Bb(2),u.uc(i.name),u.Bb(2),u.uc(i.power),u.Bb(4),u.uc(i.game),u.Bb(1),u.hc("ngIf",i.setup||i.restriction),u.Bb(2),u.uc(u.ec(18,11,i.level)),u.Bb(2),u.hc("ngIf",a.opened[i.name]),u.Bb(1),u.hc("ngIf",a.opened[i.name]&&i.player),u.Bb(1),u.hc("ngIf",a.opened[i.name]&&i.mandatory),u.Bb(1),u.hc("ngIf",a.opened[i.name]&&i.phases)}}var te,ne=((te=function e(){c(this,e),this.opened={}}).\u0275fac=function(e){return new(e||te)},te.\u0275cmp=u.Gb({type:te,selectors:[["alien-grid"]],inputs:{aliens:"aliens"},decls:1,vars:1,consts:[[4,"ngFor","ngForOf"],[3,"ngClass"],["mat-card-avatar",""],["mat-raised-button","",1,"mat-accent",3,"click"],[1,"alien-fg"],[1,"bar","alien-bg"],[4,"ngIf"],["class","desc",3,"innerHTML",4,"ngIf"],["class","bar alien-bg",4,"ngIf"],[1,"desc",3,"innerHTML"]],template:function(e,t){1&e&&u.sc(0,ee,23,13,"div",0),2&e&&u.hc("ngForOf",t.aliens)},directives:[N.i,g.a,N.h,g.f,g.c,d.b,v.a,g.i,g.h,g.e,N.j],pipes:[q],encapsulation:2}),te),ie=a("UhP/");function ae(e,t){if(1&e&&(u.Rb(0,"mat-option",24),u.tc(1),u.Qb()),2&e){var n=t.$implicit;u.hc("value",n),u.Bb(1),u.uc(n)}}var oe,ce=((oe=function(){function n(i,a){var o=this;c(this,n),this.Aliens=i,this.Storage=a,this.settings={levels:[!0,!0,!0],games:{Encounter:!0},namesExcluded:[],setupLevel:"",numToChoose:2,preventConflicts:!0},this.disabled={draw:!0,hide:!0,show:!0,redo:!0,reset:!0},this.aliensToShow=[],this.NOT_RESET=0,this.hide=function(){return o.setState([],"Choices hidden.")};var r=[],s=[],l=[],b=[],u=0;this.drawOne=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=Math.floor(Math.random()*b.length);if(b[n]){var a=b.splice(n,1)[0];if(r.push(a),e){var o=i.get(a);if(o.restriction){var c,s=t(o.restriction.split(","));try{for(s.s();!(c=s.n()).done;){var u=c.value,m=b.indexOf(u);m>-1&&l.push(b.splice(m,1)[0])}}catch(h){s.e(h)}finally{s.f()}}}return a}},this.makePickFinal=function(){var t;(t=s).push.apply(t,e(r).concat(e(l))),l=[],r=[]},this.undo=function(){var t;(t=b).push.apply(t,e(r).concat(e(l))),l=[],r=[]},this.getChooseLimit=function(e){var t=e,n=b.length;return n>0&&t>n&&(t=n),t<1&&(t=1),t},this.draw=function(){o.makePickFinal();for(var e=0;e<o.settings.numToChoose&&o.drawOne(o.settings.preventConflicts);e++);r.length<o.settings.numToChoose?(o.undo(),o.setState([],"Not enough potential aliens left."+(o.settings.preventConflicts?' It\'s possible that the "Prevent conflicts" option is preventing me from displaying remaining aliens.':""))):o.setState(r,"Choices:",o.getChooseLimit(o.settings.numToChoose))},this.show=function(){r.map(function(e){return e[0].toLowerCase()}).indexOf((prompt("Enter the first initial of one of the aliens you were given, then click OK.")||"").toLowerCase())<0?o.setState([],"Wrong letter."):o.setState(r,"Choices: ")},this.redo=function(){confirm("Redo?")&&(o.undo(),u++,o.draw())},this.getDisabledActions=function(e,t){return{draw:b.length<e,hide:t<1,show:!(r.length>0&&t<1),redo:r.length<=0||t<=0,reset:r.length<=0&&s.length<=0}},this.getStatus=function(){var e=r.length+s.length+l.length;return e+" of "+(e+b.length)+" drawn. "+u+" redos so far."},this.change=function(){if(o.settings){var e=o.Aliens.getMatchingNames(o.settings.levels,o.settings.games,o.settings.namesExcluded,o.settings.setupLevel);b=e,s=[],r=[],l=[],u=0,o.restrictNumToChoose(),o.setState([],"List reset.")}},this.reset=function(){confirm("Reset list of aliens?")?o.change():o.NOT_RESET++,o.NOT_RESET>2&&(o.makePickFinal(),o.setState(s,"Aliens given out so far:"),o.NOT_RESET=0)}}return o(n,[{key:"ngOnInit",value:function(){var e=this;this.Aliens.init$.subscribe(function(t){e.namesAll=t;var n=e.Storage.get("cosmic.alien-gensettings");n&&(n.levels&&(e.settings.levels=n.levels),n.games&&(e.settings.games=n.games),n.namesExcluded&&(e.settings.namesExcluded=n.namesExcluded),n.setupLevel&&(e.settings.setupLevel=n.setupLevel),n.numToChoose&&(e.settings.numToChoose=n.numToChoose),void 0!==n.preventConflicts&&(e.settings.preventConflicts=n.preventConflicts)),e.change()})}},{key:"restrictNumToChoose",value:function(){this.settings.numToChoose=this.getChooseLimit(this.settings.numToChoose),this.saveSettings()}},{key:"onSelectGame",value:function(e){this.settings.games=e,this.change()}},{key:"onSelectLevel",value:function(e){this.settings.levels=e,this.change()}},{key:"saveSettings",value:function(){this.Storage.set("cosmic.alien-gensettings",this.settings)}},{key:"setState",value:function(e,t,n){var i=this;this.state=t,this.aliensToShow=e.map(function(e){return i.Aliens.get(e)}),n&&(this.settings.numToChoose=n),this.status=this.getStatus(),this.disabled=this.getDisabledActions(this.settings.numToChoose,this.aliensToShow.length)}}]),n}()).\u0275fac=function(e){return new(e||oe)(u.Mb(A),u.Mb(k.a))},oe.\u0275cmp=u.Gb({type:oe,selectors:[["alien-generator"]],decls:66,vars:15,consts:[["leftnav",""],[1,"mat-primary"],["mat-button","",3,"click"],["id","gen-options"],[3,"games","change"],[3,"levels","change"],[3,"ngModel","ngModelChange","change"],["value","",1,"mat-primary"],["value","color",1,"mat-primary"],["value","all",1,"mat-primary"],["multiple","","placeholder","Select names",3,"ngModel","ngModelChange","selectionChange"],[3,"value",4,"ngFor","ngForOf"],["matInput","","type","number","placeholder","Choices per player","step","1","min","1",3,"ngModel","ngModelChange","change"],[1,"mat-primary",3,"ngModel","change","ngModelChange"],["id","gen-actions"],[1,"space-right","alien-0-theme"],["mat-raised-button","",1,"mat-accent",3,"disabled","click"],[1,""],["mat-raised-button","",1,"mat-primary",3,"disabled","click"],[1,"space-right"],[1,"space-right","alien-1-theme"],[1,"space-right","alien-2-theme"],["id","gen-status",1,"mat-body-1"],[3,"aliens"],[3,"value"]],template:function(e,t){if(1&e){var n=u.Sb();u.Rb(0,"mat-sidenav-container"),u.Rb(1,"mat-sidenav",null,0),u.Nb(3,"cosmic-drawer"),u.Qb(),u.Rb(4,"div"),u.Rb(5,"mat-toolbar",1),u.Rb(6,"button",2),u.Yb("click",function(){return u.lc(n),u.kc(2).toggle()}),u.Rb(7,"mat-icon"),u.tc(8,"menu"),u.Qb(),u.Qb(),u.tc(9,"\xa0 "),u.Rb(10,"h1"),u.tc(11,"Game Generator"),u.Qb(),u.Qb(),u.Rb(12,"div",3),u.Rb(13,"cosmic-game-options",4),u.Yb("change",function(e){return t.onSelectGame(e)}),u.Qb(),u.Rb(14,"alien-level-options",5),u.Yb("change",function(e){return t.onSelectLevel(e)}),u.Qb(),u.Rb(15,"mat-card"),u.Rb(16,"mat-card-title"),u.tc(17,"Game Setup"),u.Qb(),u.Rb(18,"mat-radio-group",6),u.Yb("ngModelChange",function(e){return t.settings.setupLevel=e})("change",function(){return t.change()}),u.Rb(19,"mat-radio-button",7),u.tc(20,"Remove none"),u.Qb(),u.Rb(21,"mat-radio-button",8),u.tc(22,"Remove those requiring extra color"),u.Qb(),u.Rb(23,"mat-radio-button",9),u.tc(24,"Remove all"),u.Qb(),u.Qb(),u.Qb(),u.Rb(25,"mat-card"),u.Rb(26,"mat-card-title"),u.tc(27,"Exclude by name"),u.Qb(),u.Rb(28,"mat-form-field"),u.Rb(29,"mat-select",10),u.Yb("ngModelChange",function(e){return t.settings.namesExcluded=e})("selectionChange",function(){return t.change()}),u.sc(30,ae,2,2,"mat-option",11),u.Qb(),u.Qb(),u.Qb(),u.Rb(31,"mat-card"),u.Rb(32,"mat-card-title"),u.tc(33,"How to choose"),u.Qb(),u.Rb(34,"mat-form-field"),u.Rb(35,"input",12),u.Yb("ngModelChange",function(e){return t.settings.numToChoose=e})("change",function(){return t.restrictNumToChoose()}),u.Qb(),u.Qb(),u.Rb(36,"div"),u.Rb(37,"mat-checkbox",13),u.Yb("change",function(){return t.saveSettings()})("ngModelChange",function(e){return t.settings.preventConflicts=e}),u.tc(38,"Prevent conflicts (like Oracle vs. Magician)"),u.Qb(),u.Qb(),u.Qb(),u.Qb(),u.Rb(39,"mat-toolbar",14),u.Rb(40,"span",15),u.Rb(41,"button",16),u.Yb("click",function(){return t.draw()}),u.tc(42,"Draw"),u.Qb(),u.Qb(),u.Rb(43,"span",17),u.Rb(44,"button",18),u.Yb("click",function(){return t.hide()}),u.Rb(45,"mat-icon"),u.tc(46,"visibility_off"),u.Qb(),u.tc(47,"\xa0Hide"),u.Qb(),u.Qb(),u.Rb(48,"span",19),u.Rb(49,"button",18),u.Yb("click",function(){return t.show()}),u.Rb(50,"mat-icon"),u.tc(51,"visibility"),u.Qb(),u.tc(52,"\xa0Show"),u.Qb(),u.Qb(),u.Rb(53,"span",20),u.Rb(54,"button",16),u.Yb("click",function(){return t.redo()}),u.Rb(55,"mat-icon"),u.tc(56,"history"),u.Qb(),u.tc(57,"\xa0Redo"),u.Qb(),u.Qb(),u.Rb(58,"span",21),u.Rb(59,"button",16),u.Yb("click",function(){return t.reset()}),u.Rb(60,"mat-icon"),u.tc(61,"replay"),u.Qb(),u.tc(62,"\xa0Reset"),u.Qb(),u.Qb(),u.Qb(),u.Rb(63,"p",22),u.tc(64),u.Qb(),u.Nb(65,"alien-grid",23),u.Qb(),u.Qb()}2&e&&(u.Bb(13),u.hc("games",t.settings.games),u.Bb(1),u.hc("levels",t.settings.levels),u.Bb(4),u.hc("ngModel",t.settings.setupLevel),u.Bb(11),u.hc("ngModel",t.settings.namesExcluded),u.Bb(1),u.hc("ngForOf",t.namesAll),u.Bb(5),u.hc("ngModel",t.settings.numToChoose),u.Bb(2),u.hc("ngModel",t.settings.preventConflicts),u.Bb(4),u.hc("disabled",t.disabled.draw),u.Bb(3),u.hc("disabled",t.disabled.hide),u.Bb(5),u.hc("disabled",t.disabled.show),u.Bb(5),u.hc("disabled",t.disabled.redo),u.Bb(5),u.hc("disabled",t.disabled.reset),u.Bb(5),u.wc("",t.status," ",t.state,""),u.Bb(1),u.hc("aliens",t.aliensToShow))},directives:[C.b,C.a,G,S.a,d.b,v.a,x,H,g.a,g.i,y.b,h.h,h.j,y.a,z.b,w.a,N.i,R.a,h.k,h.b,p.a,ne,ie.g],encapsulation:2}),oe),re=function e(t,n,i){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;if(n.length<1)return[{value:"",items:t}];var o={},c=n[a];t.forEach(function(e){var t=e[c];o[t]=o[t]||[],o[t].push(e)});var r=Object.keys(o).sort().map(function(e){return{value:e,items:o[e]}});return n[a+1]&&(r=r.map(function(t){return{value:t.value,items:e(t.items,n,i,a+1)}})),r};function se(e,t){if(1&e&&(u.Rb(0,"div"),u.Rb(1,"h2",9),u.tc(2),u.dc(3,"levelName"),u.dc(4,"levelStars"),u.Qb(),u.Nb(5,"alien-grid",10),u.Qb()),2&e){var n=t.$implicit,i=u.cc().$implicit;u.Bb(2),u.xc("Cosmic ",i.value," - ",u.ec(3,4,n.value)," ",u.ec(4,6,n.value),""),u.Bb(3),u.hc("aliens",n.items)}}function le(e,t){if(1&e&&(u.Rb(0,"div",7),u.sc(1,se,6,8,"div",8),u.Qb()),2&e){var n=t.$implicit;u.Bb(1),u.hc("ngForOf",n.items)}}var be,ue,me,he,fe=[{path:"",component:(ue=function e(){c(this,e)},ue.\u0275fac=function(e){return new(e||ue)},ue.\u0275cmp=u.Gb({type:ue,selectors:[["cosmic-home"]],decls:34,vars:0,consts:[[1,"mat-primary"],["id","home-cards"],["routerLink","/generator","mat-raised-button","",1,"mat-primary"],["routerLink","/reference","mat-raised-button","",1,"mat-primary"],["href","https://play.google.com/store/apps/details?id=net.fmorel.cosmicgenerator","mat-raised-button","",1,"mat-primary"],["mat-button","","href","//www.fmorel.net"]],template:function(e,t){1&e&&(u.Rb(0,"mat-toolbar",0),u.Rb(1,"h2"),u.tc(2,"Cosmic Companion"),u.Qb(),u.Qb(),u.Rb(3,"div",1),u.Rb(4,"mat-card"),u.Rb(5,"mat-card-title"),u.tc(6,"Alien Generator"),u.Qb(),u.Rb(7,"mat-card-content"),u.Rb(8,"p"),u.tc(9,"Let a random number generator give you choices to start a game of Cosmic Encounter."),u.Qb(),u.Qb(),u.Rb(10,"mat-card-actions"),u.Rb(11,"a",2),u.tc(12,"Use Generator"),u.Qb(),u.Qb(),u.Qb(),u.Rb(13,"mat-card"),u.Rb(14,"mat-card-title"),u.tc(15,"Alien Reference"),u.Qb(),u.Rb(16,"mat-card-content"),u.Rb(17,"p"),u.tc(18,"Look up aliens by game and/or level for easy reference."),u.Qb(),u.Qb(),u.Rb(19,"mat-card-actions"),u.Rb(20,"a",3),u.tc(21,"View Reference"),u.Qb(),u.Qb(),u.Qb(),u.Rb(22,"mat-card"),u.Rb(23,"mat-card-title"),u.tc(24,"Android App"),u.Qb(),u.Rb(25,"mat-card-content"),u.Rb(26,"p"),u.tc(27,"Companion for Cosmic Encounter is available on the Google Play Store, and includes both the Alien Generator and Reference tools."),u.Qb(),u.Qb(),u.Rb(28,"mat-card-actions"),u.Rb(29,"a",4),u.tc(30,"Download from Google Play"),u.Qb(),u.Qb(),u.Qb(),u.Qb(),u.Rb(31,"mat-toolbar",0),u.Rb(32,"a",5),u.tc(33,"Return home"),u.Qb(),u.Qb())},directives:[S.a,g.a,g.i,g.d,g.b,B.b,d.a],encapsulation:2}),ue)},{path:"generator",component:ce},{path:"reference",component:(be=function(){function e(t,n){c(this,e),this.Aliens=t,this.Storage=n}return o(e,[{key:"ngOnInit",value:function(){var e=this;this.levels=this.Storage.get("cosmic.alien-reflevels")||[!0,!0,!0],this.games=this.Storage.get("cosmic.alien-refgames")||{Encounter:!0},this.Aliens.init$.subscribe(function(){e.refresh()})}},{key:"onSelectGame",value:function(e){this.Storage.set("cosmic.alien-refgames",e),this.games=e,this.refresh()}},{key:"onSelectLevel",value:function(e){this.Storage.set("cosmic.alien-reflevels",e),this.levels=e,this.refresh()}},{key:"refresh",value:function(){this.groups=re(this.Aliens.getMatchingNames(this.levels,this.games).map(this.Aliens.get),["game","level"],["name"])}}]),e}(),be.\u0275fac=function(e){return new(e||be)(u.Mb(A),u.Mb(k.a))},be.\u0275cmp=u.Gb({type:be,selectors:[["alien-reference"]],decls:33,vars:3,consts:[["leftnav",""],[1,"mat-primary"],["mat-button","",3,"click"],["id","ref-options"],[3,"games","change"],[3,"levels","change"],["id","ref-output",4,"ngFor","ngForOf"],["id","ref-output"],[4,"ngFor","ngForOf"],[1,"mat-h2"],[3,"aliens"]],template:function(e,t){if(1&e){var n=u.Sb();u.Rb(0,"mat-sidenav-container"),u.Rb(1,"mat-sidenav",null,0),u.Nb(3,"cosmic-drawer"),u.Qb(),u.Rb(4,"div"),u.Rb(5,"mat-toolbar",1),u.Rb(6,"button",2),u.Yb("click",function(){return u.lc(n),u.kc(2).toggle()}),u.Rb(7,"mat-icon"),u.tc(8,"menu"),u.Qb(),u.Qb(),u.tc(9,"\xa0 "),u.Rb(10,"h1"),u.tc(11,"Alien Reference"),u.Qb(),u.Qb(),u.Rb(12,"div",3),u.Rb(13,"cosmic-game-options",4),u.Yb("change",function(e){return t.onSelectGame(e)}),u.Qb(),u.Rb(14,"alien-level-options",5),u.Yb("change",function(e){return t.onSelectLevel(e)}),u.Qb(),u.Rb(15,"mat-card"),u.Rb(16,"mat-card-title"),u.tc(17,"Sort by"),u.Qb(),u.Rb(18,"ol"),u.Rb(19,"li"),u.tc(20,"Game"),u.Qb(),u.Rb(21,"li"),u.tc(22,"Level"),u.Qb(),u.Rb(23,"li"),u.tc(24,"Name"),u.Qb(),u.Qb(),u.Rb(25,"mat-card-title"),u.tc(26,"Group by"),u.Qb(),u.Rb(27,"ol"),u.Rb(28,"li"),u.tc(29,"Game"),u.Qb(),u.Rb(30,"li"),u.tc(31,"Level"),u.Qb(),u.Qb(),u.Qb(),u.Qb(),u.sc(32,le,2,1,"div",6),u.Qb(),u.Qb()}2&e&&(u.Bb(13),u.hc("games",t.games),u.Bb(1),u.hc("levels",t.levels),u.Bb(18),u.hc("ngForOf",t.groups))},directives:[C.b,C.a,G,S.a,d.b,v.a,x,H,g.a,g.i,N.i,ne],pipes:[$,q],encapsulation:2}),be)},{path:"**",redirectTo:"",pathMatch:"full"}],de=((he=function e(){c(this,e)}).\u0275mod=u.Kb({type:he}),he.\u0275inj=u.Jb({factory:function(e){return new(e||he)},imports:[[B.c.forRoot(fe,{useHash:!0})],B.c]}),he),ge=((me=function e(){c(this,e)}).\u0275mod=u.Kb({type:me,bootstrap:[M]}),me.\u0275inj=u.Jb({factory:function(e){return new(e||me)},providers:[],imports:[[b.a,f.b,h.d,m.b,k.b,de,S.b,g.g,d.c,C.c,v.b,Q.c,y.c,p.b,R.b,w.b]]}),me);Object(u.T)(),b.c().bootstrapModule(ge).catch(function(e){return console.log(e)})},zn8P:function(e,t){function n(e){return Promise.resolve().then(function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t})}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id="zn8P"}},[[0,0,5]]])}();