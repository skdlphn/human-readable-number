function toReadable (number = 0, externalCall = true) {
    return externalCall && number === 0 ? 'zero'
        : number < 10 ? digitToWord(number)
            : number < 20 ? teenToWord(number - 10)
                : number < 100 ? tenPowerTwo(number)
                    : number < 1000 ? tenPowerX(number, 100)
                        : number < Math.pow(10,6) ? tenPowerX(number, 1000) : '';
};

digitToWord = (number) => {
    const _0_9 = ['','one','two','three','four',
        'five','six','seven','eight','nine'];
    return _0_9[number];
};

teenToWord = (teen) => {
    const _10_19 =
        ['ten','eleven','twelve','thirteen', 'fourteen','fifteen','sixteen',
            'seventeen','eighteen','nineteen'];
    return _10_19[teen];
};

tensToWord = (tens) => {
    const _20_90 = ['twenty','thirty','forty','fifty',
        'sixty','seventy','eighty','ninety'];
    return _20_90[tens - 2];
};

tenPowerTwo = (number) => {
    const digit = number % 10;
    return tensToWord((number - digit) / 10) + digitWithoutZero(digit);
};

tenPowerX = (number, power ) => {
    const remainder = number % power;
    const powerWord = power === 100 ? " hundred" : power === 1000 ? " thousand" : '';
    const hundredMultipleNoSpace = remainder === 0 ? "" : " ";
    return toReadable((number - remainder) / power, false) + powerWord + hundredMultipleNoSpace + toReadable(remainder, false);
};

digitWithoutZero = (digit) => digit === 0 ? '' : ' ' + digitToWord(digit);

tenToThePowerToWord = (ten) => {
    const _10x2_10x6 = ['','',' hundred',' thousand',' million',' milliard',' billion'];
    return _10x2_10x6[ten];
};

module.exports = toReadable;
