import { useEffect } from 'react';
import {
  DeviceEventEmitter,
  EmitterSubscription,
  Platform,
} from 'react-native';
import RnSmsRetriever, { SMS_EVENT } from 'rn-sms-retriever';

import type { useOTPProps } from './OTPTypes';

export const useSMSRetriever = ({
  onHash,
  onCodeFound,
  smsReceived,
  codeSearchRegex,
}: useOTPProps) => {
  useEffect(() => {
    let smsListener: undefined | EmitterSubscription;
    const getCode = (data: any) => {
      const { message } = data || {};

      if (!codeSearchRegex || !message) return false;

      const matches = (message as string).match(codeSearchRegex);

      if (matches?.length !== 2) return false;

      const code = matches[1];

      return code;
    };

    const retrieveMessage = (data: any) => {
      const code = getCode(data);

      if (!code) return smsReceived?.({ data });

      smsReceived?.({ data, code });
      return onCodeFound?.(code);
    };

    if (Platform.OS === 'android') {
      RnSmsRetriever.startSmsRetriever().then((success) => {
        if (!success) return;
        smsListener = DeviceEventEmitter.addListener(
          SMS_EVENT,
          retrieveMessage
        );
      });

      RnSmsRetriever.getAppHash().then((hash) => onHash?.(hash));
    }

    return () => {
      smsListener?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
