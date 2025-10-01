type InnerObject = {
    valor: number;
    [key: string]: any; // Adjust as needed for your inner object structure
};

type State = {
    [key: string]: {
        value: InnerObject[];
        changed: boolean;
    };
};

export function getPositiveChangedValues<T extends State>(state: T): Partial<Record<keyof T, InnerObject[]>> {
    const result: Partial<Record<keyof T, InnerObject[]>> = {};

    Object.entries(state).forEach(([key, { value, changed }]) => {
        if (changed) {
            const checkedItems = value.filter(item => item.valor > 0);
            if (checkedItems.length > 0) {
                result[key as keyof T] = checkedItems;
            }
        }
    });

    return result;
}