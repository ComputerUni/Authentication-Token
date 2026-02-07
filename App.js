import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import AuthContextProvider, { AuthContext } from "./store/authContext";
import { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Loading from "./components/Loading";

const Stack = createNativeStackNavigator();

//NormalStack fonksiyonu authenticate olmadan önce olan ekranı gösterecek yani giriş yapılmadan önceki ekran anlamına geliyor.
function NormalStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#E0E7FF" },
        headerTintColor: "#4338CA",
        contentStyle: {
          backgroundColor: "#E0E7FF",
        },
      }}
    >
      <Stack.Screen
        options={{ headerTitle: "Kullanıcı Girişi" }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerTitle: "Kayıt Ol" }}
        name="Signup"
        component={SignupScreen}
      />
    </Stack.Navigator>
  );
}

function AfterAuthenticatedStack() {
  const authContext = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#E0E7FF" },
        headerTintColor: "#4338CA",
        contentStyle: {
          backgroundColor: "#E0E7FF",
        },
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: "Anasayfa",
          headerRight: () => (
            <Pressable
              onPress={!authContext.isLoading ? authContext.logout : null}
              disabled={authContext.isLoading}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Ionicons name="exit" size={24} color="#4338CA" />
            </Pressable>
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authContext = useContext(AuthContext);
  if (authContext.isLoading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor="#fff" />
      {!authContext.isAuthenticated && <NormalStack />}
      {authContext.isAuthenticated && <AfterAuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  pressed: {
    opacity: 0.5,
  },
});
