import { type ObjectType } from '@/interface/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getKeys(input: ObjectType) {
  return Object.keys(input);
}

export function getMappedValue(array: Array<ObjectType>, key: string) {
  return array.map((item: ObjectType) => item[key]);
}
