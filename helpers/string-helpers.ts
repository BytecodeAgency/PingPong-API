export const stringToNumber = (textToConvert: string): number => {
    const decimalRadix = 10;
    const convertedNumber = parseInt(textToConvert, decimalRadix);
    return convertedNumber;
};
