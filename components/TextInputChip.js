import React, { memo } from 'react';
import { StyleSheet, Text, TextInput as NativeInput } from 'react-native';
import { Input, Item, Label } from 'native-base';
import { theme } from '../core/theme';

const TextInputChip = ({ label, errorText, ...props }) => (
  <>
    <Item floatingLabel style={styles.container}>
      <Label style={styles.label}>{label}</Label>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        {...props}
      />
    </Item>
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    backgroundColor :'#d1cfcf',
    width: '100%',
  },
  input: {
    width: '100%',
    color: theme.colors.surface,
  },
  label: {
    color: theme.colors.darkGrey,
    paddingLeft: 4, 
  },
  error: {
    width: '100%',
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
  },
});

export default memo(TextInputChip);