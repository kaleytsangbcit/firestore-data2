import { Text, View, Button, Image, TextInput } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, getDocs, getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';

export default function Login(){
    const [em, setEmail] = useState("");
    const [ps, setPS] = useState("");
    
    const SignIn = async () => {
        const auth= getAuth();
        const result = await createUserWithEmailAndPassword(auth, em, ps);
    }

    return(
        <View>
            <TextInput value={em} placeholder="Email" onChangeText={(txt)=>setEmail(txt)} />
            <TextInput value={ps} placeholder="Password" onChangeText={(txt)=>setPS(txt)} />
            <Button title="Sign In" onPress={()=>SignIn()} />
        </View>
    );
}