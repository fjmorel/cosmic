!function(t){function e(e){for(var i,o,a=e[0],l=e[1],c=e[2],d=0,m=[];d<a.length;d++)o=a[d],s[o]&&m.push(s[o][0]),s[o]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);for(u&&u(e);m.length;)m.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],i=!0,a=1;a<n.length;a++){var l=n[a];0!==s[l]&&(i=!1)}i&&(r.splice(e--,1),t=o(o.s=n[0]))}return t}var i={},s={1:0},r=[];function o(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},o.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var a=window.webpackJsonp=window.webpackJsonp||[],l=a.push.bind(a);a.push=e,a=a.slice();for(var c=0;c<a.length;c++)e(a[c]);var u=l;r.push([184,0]),n()}({127:function(t,e,n){"use strict";var i=this&&this.__decorate||function(t,e,n,i){var s,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(r<3?s(o):r>3?s(e,n,o):s(e,n))||o);return r>3&&o&&Object.defineProperty(e,n,o),o},s=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),o=n(59),a=function(){function t(t){var e=this,n=[],i=[],s=[],r=[],o=0;function a(e){void 0===e&&(e=!1);var i=Math.floor(Math.random()*r.length);if(r[i]){var o=r.splice(i,1)[0];if(n.push(o),e){var a=t.get(o);if(a.restriction)for(var l=a.restriction.split(","),c=0;c<l.length;c++){var u=r.indexOf(l[c]);u>-1&&s.push(r.splice(u,1)[0])}}return o}}function l(){i=i.concat(n,s),s=[],n=[]}function c(){r=r.concat(n,s),n=[],s=[]}e.reset=function(t){return r=t,i=[],n=[],s=[],o=0,{aliens:[],message:"List reset."}},e.getAllGiven=function(){return l(),{aliens:i,message:"Aliens given out so far:"}},e.getChooseLimit=function(t){var e=t,n=r.length;return n>0&&e>n&&(e=n),e<1&&(e=1),e},e.draw=function(t,i){void 0===i&&(i=!1),l();for(var s=0;s<t;s++){if(!a(i))break}return n.length<t?(c(),{aliens:[],message:"Not enough potential aliens left."+(i?' It\'s possible that the "Prevent conflicts" option is preventing me from displaying remaining aliens.':"")}):{aliens:n,message:"Choices:",limit:e.getChooseLimit(t)}},e.hide=function(){return{aliens:[],message:"Choices hidden."}},e.show=function(){return n.map(function(t){return t[0].toLowerCase()}).indexOf((prompt("Enter the first initial of one of the aliens you were given, then click OK.")||"").toLowerCase())<0?{aliens:[],message:"Wrong letter."}:{aliens:n,message:"Choices:"}},e.redo=function(t,i){return void 0===i&&(i=!1),confirm("Redo?")?(c(),o++,e.draw(t,i)):{aliens:n,message:"Choices:"}},e.getDisabledActions=function(t,e){return{draw:r.length<t,hide:e<1,show:!(n.length>0&&e<1),redo:n.length<=0||e<=0,reset:n.length<=0&&i.length<=0}},e.getStatus=function(){var t=n.length+i.length+s.length;return t+" of "+(t+r.length)+" drawn. "+o+" redos so far."}}return t=i([r.Injectable(),s("design:paramtypes",[o.AlienService])],t)}();e.AlienGeneratorService=a},182:function(t,e){t.exports='<mat-sidenav-container>\r\n\t<mat-sidenav #leftnav>\r\n\t\t<cosmic-drawer [page]="\'generator\'"></cosmic-drawer>\r\n\t</mat-sidenav>\r\n\t<div id="content">\r\n\t\t<mat-toolbar class="mat-primary">\r\n\t\t\t<button mat-button (click)="leftnav.toggle()">\r\n\t\t\t\t<mat-icon>menu</mat-icon>\r\n\t\t\t</button>&nbsp;\r\n\t\t\t<h1>Game Generator</h1>\r\n\t\t</mat-toolbar>\r\n\t\t<div id="container">\r\n\t\t\t<game-options [games]="settings.games" (onSelected)="onSelectGame($event)"></game-options>\r\n\t\t\t<level-options [levels]="settings.levels" (onSelected)="onSelectLevel($event)"></level-options>\r\n\t\t\t<mat-card>\r\n\t\t\t\t<mat-card-title>Game Setup</mat-card-title>\r\n\t\t\t\t<mat-radio-group [(ngModel)]="settings.setupLevel" (change)="change()">\r\n\t\t\t\t\t<mat-radio-button value="" class="mat-primary">Remove none</mat-radio-button>\r\n\t\t\t\t\t<mat-radio-button value="color" class="mat-primary">Remove those requiring extra color</mat-radio-button>\r\n\t\t\t\t\t<mat-radio-button value="all" class="mat-primary">Remove all</mat-radio-button>\r\n\t\t\t\t</mat-radio-group>\r\n\t\t\t</mat-card>\r\n\t\t\t<mat-card>\r\n\t\t\t\t<mat-card-title>Exclude by name</mat-card-title>\r\n\t\t\t\t<mat-select multiple [(ngModel)]="settings.namesExcluded" (change)="change()" placeholder="Select names">\r\n\t\t\t\t\t<mat-option *ngFor="let name of namesAll" [value]="name">{{name}}</mat-option>\r\n\t\t\t\t</mat-select>\r\n\t\t\t</mat-card>\r\n\t\t\t<mat-card>\r\n\t\t\t\t<mat-card-title>How to choose</mat-card-title>\r\n\t\t\t\t<mat-input-container>\r\n\t\t\t\t\t<input matInput type="number" [(ngModel)]="settings.numToChoose" placeholder="Choices per player" step="1" min="1" (change)="restrictNumToChoose()">\r\n\t\t\t\t</mat-input-container>\r\n\t\t\t\t<div>\r\n\t\t\t\t\t<mat-checkbox class="mat-primary" (change)="saveSettings()" [(ngModel)]="settings.preventConflicts">Prevent conflicts (like Oracle vs. Magician)</mat-checkbox>\r\n\t\t\t\t</div>\r\n\t\t\t</mat-card>\r\n\t\t</div>\r\n\t\t<mat-toolbar id="gen-actions">\r\n\t\t\t<span class="space-right alien-0-theme">\r\n\t\t\t\t<button mat-raised-button class="mat-accent" (click)="draw()" [disabled]="disabled.draw">Draw</button>\r\n\t\t\t</span>\r\n\t\t\t<span class="">\r\n\t\t\t\t<button mat-raised-button class="mat-primary" (click)="hide()" [disabled]="disabled.hide">\r\n\t\t\t\t\t<mat-icon>visibility_off</mat-icon>&nbsp;Hide</button>\r\n\t\t\t</span>\r\n\t\t\t<span class="space-right">\r\n\t\t\t\t<button mat-raised-button class="mat-primary" (click)="show()" [disabled]="disabled.show">\r\n\t\t\t\t\t<mat-icon>visibility</mat-icon>&nbsp;Show</button>\r\n\t\t\t</span>\r\n\t\t\t<span class="space-right alien-1-theme">\r\n\t\t\t\t<button mat-raised-button class="mat-accent" (click)="redo();" [disabled]="disabled.redo">\r\n\t\t\t\t\t<mat-icon>history</mat-icon>&nbsp;Redo</button>\r\n\t\t\t</span>\r\n\t\t\t<span class="space-right alien-2-theme">\r\n\t\t\t\t<button mat-raised-button class="mat-accent" (click)="reset()" [disabled]="disabled.reset">\r\n\t\t\t\t\t<mat-icon>replay</mat-icon>&nbsp;Reset</button>\r\n\t\t\t</span>\r\n\t\t</mat-toolbar>\r\n\t\t<p class="mat-body-1" id="gen-status">{{status}} {{state}}</p>\r\n\t\t<alien-grid [aliens]="aliensToShow"></alien-grid>\r\n\t</div>\r\n</mat-sidenav-container>'},183:function(t,e,n){"use strict";var i=this&&this.__decorate||function(t,e,n,i){var s,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(r<3?s(o):r>3?s(e,n,o):s(e,n))||o);return r>3&&o&&Object.defineProperty(e,n,o),o},s=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),o=n(59),a=n(127),l=n(81),c=function(){function t(t,e,n){var i=this;this.Aliens=t,this.Generator=e,this.Storage=n,this.settings={levels:[],games:{},namesExcluded:[],setupLevel:"",numToChoose:2,preventConflicts:!0},this.disabled={draw:!0,hide:!0,show:!0,redo:!0,reset:!0},this.aliensToShow=[],this.NOT_RESET=0,this.draw=function(){return i.setState(i.Generator.draw(i.settings.numToChoose,i.settings.preventConflicts))},this.hide=function(){return i.setState(i.Generator.hide())},this.show=function(){return i.setState(i.Generator.show())},this.redo=function(){return i.setState(i.Generator.redo(i.settings.numToChoose,i.settings.preventConflicts))},this.reset=function(){confirm("Reset list of aliens?")?i.change():i.NOT_RESET++,i.NOT_RESET>2&&(i.setState(i.Generator.getAllGiven()),i.NOT_RESET=0)},this.restrictNumToChoose=function(){i.settings.numToChoose=i.Generator.getChooseLimit(i.settings.numToChoose),i.saveSettings()}}return t.prototype.ngOnInit=function(){var t=this;this.Aliens.init.subscribe(function(e){t.namesAll=e,t.settings=t.Storage.get("settings"),t.settings||(t.settings={}),t.settings.levels||(t.settings.levels=[!0,!0,!0]),t.settings.games||(t.settings.games={Encounter:!0}),t.settings.namesExcluded||(t.settings.namesExcluded=[]),t.settings.setupLevel||(t.settings.setupLevel=""),t.settings.numToChoose||(t.settings.numToChoose=2),void 0===t.settings.preventConflicts&&(t.settings.preventConflicts=!0),t.change()})},t.prototype.change=function(){if(this.settings){var t=this.Aliens.getMatchingNames(this.settings.levels,this.settings.games,this.settings.namesExcluded,this.settings.setupLevel);this.setState(this.Generator.reset(t)),this.restrictNumToChoose()}},t.prototype.onSelectGame=function(t){this.settings.games=t,this.change()},t.prototype.onSelectLevel=function(t){this.settings.levels=t,this.change()},t.prototype.saveSettings=function(){this.Storage.set("settings",this.settings)},t.prototype.setState=function(t){var e=this;t&&(this.state=t.message,this.aliensToShow=t.aliens.map(function(t){return e.Aliens.get(t)}),t.limit&&(this.settings.numToChoose=t.limit),this.status=this.Generator.getStatus(),this.disabled=this.Generator.getDisabledActions(this.settings.numToChoose,this.aliensToShow.length))},t=i([r.Component({selector:"aliens-generator-app",styles:["\n\t\t#container { display: flex; flex: auto; flex-wrap: wrap; align-content: stretch; }\n\t\tmat-radio-button { display: block; margin: 16px 0; }\n\t\t#gen-actions { padding: 0 8px; }\n\t\t#gen-status { margin: 16px; }\n\t\t.space-right { margin-right: 16px; }\n\t"],template:n(182)}),s("design:paramtypes",[o.AlienService,a.AlienGeneratorService,l.LocalStorageService])],t)}();e.AlienGeneratorPage=c},184:function(t,e,n){"use strict";var i=this&&this.__decorate||function(t,e,n,i){var s,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(r<3?s(o):r>3?s(e,n,o):s(e,n))||o);return r>3&&o&&Object.defineProperty(e,n,o),o};Object.defineProperty(e,"__esModule",{value:!0});var s=n(0),r=n(20),o=n(11),a=n(70),l=n(95),c=n(81),u=n(183),d=n(127),m=n(59),p=function(){function t(){}return t=i([s.NgModule({imports:[r.BrowserModule,l.NoopAnimationsModule,o.FormsModule,a.HttpClientModule,c.LocalStorageModule.withConfig({prefix:"alien-gen",storageType:"localStorage"}),m.ThemingModule],declarations:[u.AlienGeneratorPage,m.CosmicDrawerComponent,m.GameOptionsComponent,m.LevelOptionsComponent,m.AlienCardComponent,m.AlienGridComponent,m.LevelNamePipe,m.LevelStarsPipe],bootstrap:[u.AlienGeneratorPage],providers:[m.AlienService,d.AlienGeneratorService]})],t)}();m.startApp(p)}});