export const format = (num: number | null) => {
    if (num != null) {
        return num.toLocaleString('fr-CA', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }
    return '';
}