import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './screens/Home';
import RegisterScreen from './screens/Register';
import EditScreen from './screens/Edit';
import LoginScreen from './screens/Login';
import ProfileScreen from './screens/Profile';

const Stack = createStackNavigator();

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCBxaalXOhpj5LxDIa7U1kmw2c6rxefutc",
  authDomain: "login-with-firebase-1102.firebaseapp.com",
  projectId: "login-with-firebase-1102",
  storageBucket: "login-with-firebase-1102.appspot.com",
  messagingSenderId: "111797970394",
  appId: "1:111797970394:web:de8e04ff79d69086fd0ce3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen  name="Home" component={HomeScreen} />
        <Stack.Screen  name="Login" component={LoginScreen} />
        <Stack.Screen  name="Register" component={RegisterScreen} />
        <Stack.Screen  name="Edit" component={EditScreen} />
        <Stack.Screen  name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
