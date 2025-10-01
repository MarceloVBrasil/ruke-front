export function getFormChangedValues<T extends Record<string, any>>(state: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(state)
            .filter(([_, { changed }]) => changed)
            .map(([key, { value }]) => [key, value])
    ) as Partial<T>;
}
