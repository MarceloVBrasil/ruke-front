import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

export const CurrencyInputOld = (props: any) => {
    const currencyMask = createNumberMask({
        prefix: "R$ ",
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ".",
        allowDecimal: true,
        decimalSymbol: ",",
        requireDecimal: false,
        decimalLimit: 2,
        allowNegative: false,
    });

    return <MaskedInput mask={currencyMask} {...props} />;
};