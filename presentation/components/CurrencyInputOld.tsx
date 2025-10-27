import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
const FixedMaskedInput = MaskedInput as unknown as React.ComponentType<any>;

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

    return <FixedMaskedInput mask={currencyMask} {...props} />;
};