import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

export default function AuthForm({ isLogin, onsubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const {
    email: emailIsValid,
    confirmEmail: emailIsDontMatch,
    password: passwordIsValid,
    confirmPassword: passwordIsDontMatch,
  } = credentialsInvalid;

  function updateInput(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        //girilen değeri yani email'i set etmiş oluyoruz.
        setEnteredEmail(enteredValue);
        break;

      case "password":
        setEnteredPassword(enteredValue);
        break;

      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;

      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onsubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.container}>
      <Input
        label="Email"
        keyboardType="email-address"
        onUpdateValue={updateInput.bind(this, "email")}
        value={enteredEmail}
        isInvalid={emailIsValid}
      />
      {!isLogin && (
        <Input
          label="Email Doğrulama"
          keyboardType="email-address"
          onUpdateValue={updateInput.bind(this, "confirmEmail")}
          value={enteredConfirmEmail}
          isInvalid={emailIsDontMatch}
        />
      )}
      <Input
        label="Şifre"
        secure
        onUpdateValue={updateInput.bind(this, "password")}
        value={enteredPassword}
        isInvalid={passwordIsValid}
      />
      {!isLogin && (
        <Input
          label="Şifre Doğrulama"
          secure
          onUpdateValue={updateInput.bind(this, "confirmPassword")}
          value={enteredConfirmPassword}
          isInvalid={passwordIsDontMatch}
        />
      )}
      <View>
        <Button onPress={submitHandler}>
          {isLogin ? "Giriş Yap" : "Kayıt Ol"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});
