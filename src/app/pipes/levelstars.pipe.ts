import { Pipe, PipeTransform } from '@angular/core';

/* Turns 0/1/2 into 1/2/3 stars */
@Pipe({ name: 'levelStars' })
export class LevelStarsPipe implements PipeTransform {
  public transform(level: number) { return stars[level]; }
}
const stars = ['★', '★★', '★★★'];
