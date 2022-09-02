export const format = (num: number) => {
    if (num != null) {
        return num.toLocaleString('fr-CA', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }
    return '';
}