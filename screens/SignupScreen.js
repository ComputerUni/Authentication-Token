import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import AuthContent from "../components/AuthContent";
import { createUser } from "../util/auth";
import Loading from "../components/Loading";
import { AuthContext } from "../store/authContext";

export default function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authContext = useContext(AuthContext);

  async function signUpHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authContext.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Kayıt Olma İşlemi Başarısız!",
        "Lütfen Bilgilerinizi Kontrol Ediniz"
      );
    }

    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <Loading message="Kullanıcı oluşturuluyor..." />;
  }

  return (
    <View>
      <AuthContent onAuthenticate={signUpHandler} />
    </View>
  );
}

const styles = StyleSheet.create({});
