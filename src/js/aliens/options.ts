export let Games = `
<md-card-content>
<h4 class ="md-title">Games to include</h4>
<md-checkbox ng-change="$ctrl.save()" ng-model="$ctrl.options[game]" ng-repeat="game in ::['E', 'A', 'C', 'D', 'I', 'S']"
class ="md-primary">{{::game | gameName}}</md-checkbox>
</md-card-content>
`;

export let Levels = `
<md-card-content>
<h4 class ="md-title">Levels to include</h4>
<md-checkbox ng-change="$ctrl.save()" ng-model="$ctrl.options[level]" ng-repeat="(level, name) in ::['Green','Yellow','Red']"
ng-class ="::'md-primary md-alien'+level+'-theme'">{{::name}}</md-checkbox>
</md-card-content>
`;