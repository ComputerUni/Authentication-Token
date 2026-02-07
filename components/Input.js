import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

export default function Input({
  label,
  keyboardType,
  onUpdateValue,
  value,
  secure,
  isInvalid,
}) {
  return (
    <View style={[styles.input, isInvalid && styles.inputInvalid]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize="none"
        keyboardType={keyboardType}
        onChangeText={onUpdateValue}
        value={value}
        secureTextEntry={secure}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#CBD5F5",
    borderRadius: 18,
    marginHorizontal: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 10,
    width: 300,
    alignSelf: "center",
  },

  inputInvalid: {
    borderColor: "red",
    borderWidth: 1,
  },

  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#4B5563",
  },
});
