export const Bindings = { options: "=", save: "=" };

export const Games = `
<md-card-content>
	<h4 class ="md-title">Games to include</h4>
	<md-checkbox ng-change="$ctrl.save()" ng-model="$ctrl.options[game]" ng-repeat="game in ::['Encounter','Alliance','Conflict','Dominion','Eons','Incursion','Storm']"
	class ="md-primary">{{::game}}</md-checkbox>
</md-card-content>
`;

export const Levels = `
<md-card-content>
	<h4 class ="md-title">Levels to include</h4>
	<md-checkbox ng-change="$ctrl.save()" ng-model="$ctrl.options[level]" ng-repeat="(level, name) in ::['Green','Yellow','Red']"
	ng-class ="::'md-primary md-alien'+level+'-theme'">{{::name}}</md-checkbox>
</md-card-content>
`;