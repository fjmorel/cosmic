import { Alien } from './types';

export interface IGroupedItems<T> {
  value: string;
  items: T[] | IGroupedItems<T>[];
}

/** Group objects by given array of fields */
export const groupItems = (list: Alien[], gFields: Alien.MandatoryProperties, sFields: Alien.MandatoryProperties, level: number = 0): IGroupedItems<Alien>[] => {
  if(gFields.length < 1) { return [{ value: '', items: list }]; }

  // group objects by property
  const grouped: Record<string, Alien[]> = {};
  const field = gFields[level];
  list.forEach((item) => {
    const group = item[field];
    grouped[group] = grouped[group] || [];
    grouped[group].push(item);
  });

  // generate array with named groups
  let result: IGroupedItems<Alien>[] = Object.keys(grouped).sort().map(group => ({ value: group, items: grouped[group] }));

  // if more fields to group by, go deeper
  if(gFields[level + 1]) {
    result = result.map(group => ({ value: group.value, items: groupItems(group.items as Alien[], gFields, sFields, level + 1) }));
  }

  return result;
};
