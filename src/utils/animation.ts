export function easeOut(progress: number) {
  return -1 * (progress - 1) ** 2 + 1;
}
export function easeIn(progress: number) {
  return progress ** 2;
}
export function linear(progress: number) {
  return progress;
}
