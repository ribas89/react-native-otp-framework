import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';

import type { OTPWrapperProps } from './OTPTypes';

export const OTPWrapper: React.FC<OTPWrapperProps> = ({
  value: propValue,
  InputElement = TextInput,
  length = 6,
  onChange,
}) => {
  const getValue = (stringValue?: string) => {
    if (stringValue) return stringValue.split('').slice(0, length);
    if (propValue) return propValue.split('').slice(0, length);

    return Array(length).fill('');
  };

  const [arrayValue, setArrayValue] = useState(getValue());

  useEffect(() => {
    setArrayValue(getValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propValue]);

  const inputRefs = useRef<any>({});

  const focusInput = (input: any) => {
    if (!input) return;
    if (input.root?.input?.focus) return input.root.input.focus();
    if (input.focus) return input.focus();
  };

  const blurInput = (input: any) => {
    if (!input) return;
    if (input.root?.input?.blur) return input.root.input.blur();
    if (input.focus) return input.blur();
  };

  const callOnChange = (newValue: any) => {
    const valueString = newValue.join('');
    const completed = valueString.length === length;
    onChange?.({
      value: newValue,
      oldValue: arrayValue,
      valueString,
      completed,
    });

    setArrayValue(newValue);
  };

  const oneChar = ({ value, index }: any) => {
    const newValue = arrayValue.map((_v, i) => (i !== index ? _v : value));
    callOnChange(newValue);
    if (!!value && index < length - 1) {
      focusInput(inputRefs.current['input' + (index + 1)]);
    }
  };

  const allChars = ({ value, index }: any) => {
    const newValue = arrayValue.map((_v, i) => value[i]);
    callOnChange(newValue);
    blurInput(inputRefs.current['input' + index]);
  };

  return (
    <>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <InputElement
            key={index}
            value={arrayValue[index]}
            ref={(r: any) => (inputRefs.current['input' + index] = r)}
            selectTextOnFocus
            onChangeText={(value: string) => {
              if (!value) {
                return oneChar({ value: '', index });
              }

              if (value.length === 2) {
                const leftValue = value.replace(
                  new RegExp(arrayValue[index]),
                  ''
                );
                return oneChar({
                  value: leftValue[leftValue.length - 1],
                  index,
                });
              }

              if (value.length < length) {
                return oneChar({ value: value[value.length - 1], index });
              }

              return allChars({ value, index });
            }}
          />
        ))}
    </>
  );
};
