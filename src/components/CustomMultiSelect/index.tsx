"use client";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/extension/multi-select";
import { useEffect, useState } from "react";

const CustomMultiSelect = ({
  disabled = false,
  values = [],
  onValuesChange,
  placeholder,
}: {
  disabled: boolean;
  values: { id: number; name: string }[];
  onValuesChange: (id: number[]) => void;
  placeholder: string;
}) => {
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    onValuesChange(value.map((item) => parseInt(item)));
  }, [value]);

  return (
    <MultiSelector values={value} onValuesChange={setValue}>
      <MultiSelectorTrigger options={values}>
        <MultiSelectorInput disabled={disabled} placeholder={placeholder} />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {values.map((item) => (
            <MultiSelectorItem key={item.id} value={item.id.toString()}>
              {item.name}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
};

export default CustomMultiSelect;
