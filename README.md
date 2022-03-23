# react-native-otp-framework

A framework to use your own input to create OTP one time passwords sms codes

## Installation

```sh
npm install react-native-otp-framework
```

## Example

```jsx
import * as React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { OTPWrapper, useSMSRetriever } from 'react-native-otp-framework';

const MyInput = React.forwardRef((props: any, ref: any) => {
  return (
    <View style={styles.inputView}>
      <TextInput
        style={[styles.input, props?.style]}
        ref={ref}
        underlineColorAndroid="transparent"
        keyboardType="number-pad"
        {...props}
      />
    </View>
  );
});

export default function App() {
  const [value, setValue] = React.useState('');
  const [hash, setHash] = React.useState('');

  useSMSRetriever({
    onHash: setHash,
    codeSearchRegex: /(\d{6})/,
    onCodeFound: setValue,
  });

  return (
    <View style={styles.container}>
      <View style={styles.hashView}>
        <Text>App hash</Text>
        <MyInput value={hash} />
      </View>

      <View style={styles.wrapper}>
        <OTPWrapper length={6} InputElement={MyInput} value={value} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hashView: {
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapper: {
    flexDirection: 'row',
  },
  inputView: {
    marginHorizontal: 4,
    minWidth: 48,
    backgroundColor: '#D6D8D9',
    borderBottomWidth: 2,
    borderBottomColor: '#757575',
    borderRadius: 4,
  },
  input: {
    textAlign: 'center',
    fontSize: 20,
    textDecorationLine: 'none',
  },
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
