import { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

const PriceInput = forwardRef<NumericFormatProps, { disabled:boolean, onChange: any }>(
  (props, ref) => {
    return (
      <NumericFormat
        {...props}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        decimalScale={2}
        fixedDecimalScale
        allowNegative={false}
        getInputRef={ref}
      />
    );
  }
);

export default PriceInput;
