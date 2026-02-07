import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import AuthContent from "../components/AuthContent";
import Loading from "../components/Loading";
import { login } from "../util/auth";
import { AuthContext } from "../store/authContext";

export default function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authContext = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authContext.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Giriş Yapılamadı!",
        "Lütfen bilgilerinizi tekrar kontrol ediniz."
      );
    }

    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <Loading message="Giriş Yapılıyor..." />;
  }
  return (
    <View>
      <AuthContent isLogin onAuthenticate={loginHandler} />
    </View>
  );
}

const styles = StyleSheet.create({});
