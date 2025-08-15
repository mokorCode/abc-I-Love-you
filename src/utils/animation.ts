export function easeOut(progress:number) {
    return -1 * (progress-1) ** 2 + 1;
}