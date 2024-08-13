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
  list = [],
  onValuesChange,
  placeholder,
}: {
  disabled: boolean;
  values: number[];
  list: { id: number; name: string }[];
  onValuesChange: (id: number[]) => void;
  placeholder: string;
}) => {
  const [localValue, setLocalValue] = useState<string[]>([]);

  useEffect(() => {
    setLocalValue(values.map((item) => String(item)));
  }, [values]);

  return (
    <MultiSelector values={localValue} onValuesChange={(string_array) => {
      onValuesChange(string_array.map(item => Number(item)))
      setLocalValue(string_array)
    }}>
      <MultiSelectorTrigger options={list.map(item => ({ id: item.id, name: item.name }))}>
        <MultiSelectorInput disabled={disabled} placeholder={placeholder} />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {list.map((item) => (
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
