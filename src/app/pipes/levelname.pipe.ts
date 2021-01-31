import { Pipe, PipeTransform } from '@angular/core';

const names = ['Green', 'Yellow', 'Red'];

/* Turns 0/1/2 into Green/Yellow/Red */
@Pipe({ name: 'levelName' })
export class LevelNamePipe implements PipeTransform {
  public transform(level: number) { return names[level]; }
}
