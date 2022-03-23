export type OTPWrapperOnChange = {
  value: string[];
  oldValue: string[];
  valueString: string;
  completed: boolean;
};

export type OTPWrapperProps = {
  value?: string;
  InputElement?: any;
  length: number;
  onChange?: (params: OTPWrapperOnChange) => void;
};

export type useOTPProps = {
  onHash?: (hash: string) => void;
  onCodeFound?: (code: string) => void;
  smsReceived?: (data: any) => void;
  codeSearchRegex?: RegExp;
};
