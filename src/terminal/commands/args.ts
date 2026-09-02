import type { ArgToken } from './types';

/** First flag with the given name, or undefined. */
export function getFlag(args: ArgToken[], name: string): string | undefined {
  const flag = args.find((a) => a.type === 'flag' && a.name.toLowerCase() === name.toLowerCase());
  return flag?.value;
}

/** True if any flag with the given name was supplied (value ignored). */
export function hasFlag(args: ArgToken[], name: string): boolean {
  return args.some((a) => a.type === 'flag' && a.name.toLowerCase() === name.toLowerCase());
}

/** Positional argument at the given zero-based index. */
export function getPositional(args: ArgToken[], index: number): string | undefined {
  const arg = args.find((a) => a.type === 'value' && a.index === index);
  return arg?.value;
}

/** All positional arguments, in order. */
export function getPositionals(args: ArgToken[]): string[] {
  return args
    .filter((a): a is Extract<ArgToken, { type: 'value' }> => a.type === 'value')
    .sort((a, b) => a.index - b.index)
    .map((a) => a.value);
}
