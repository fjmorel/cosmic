export const Bindings = { title: "<", drawer: "<" };

export const template = `
<md-toolbar class ="md-hue-2">
  <div class ="md-toolbar-tools">
    <md-button class ="md-icon-button" ng-click="$ctrl.drawer.open()" aria-label="Settings">
      <ng-md-icon icon="menu" style="fill:#fff;"></ng-md-icon>
    </md-button>
    <h2>{{$ctrl.title}}</h2>
  </div>
</md-toolbar>
`;