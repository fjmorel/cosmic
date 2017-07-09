import { Pipe, PipeTransform } from "@angular/core";

/* Turns 0/1/2 into Green/Yellow/Red */
@Pipe({ name: "levelName" })
export class LevelNamePipe implements PipeTransform {
	public transform(level: number): string { return names[level]; }
}
const names = ["Green", "Yellow", "Red"];