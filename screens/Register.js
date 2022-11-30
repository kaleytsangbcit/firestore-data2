import { Text, View, Button, Image, TextInput } from 'react-native';
import { collection, addDoc, setDoc, getDocs, getFirestore, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Register(){
    const [fn, setFN] = useState("");
    const [age, setAge] = useState("");
    const [ava, setAva] = useState("");
    const [em, setEmail] = useState("");
    const [ps, setPS] = useState("");

    //age, fullname, avatar url
    const AddUser = async () => {

        if(fn && age && ava && em && ps){
            const auth= getAuth();
            const result = await createUserWithEmailAndPassword(auth, em, ps);
            console.log(result.user)

            const db = getFirestore();
            // Add a new document with a generated id
            // const docRef = await addDoc(collection(db, "users"), {
            //     fullname: fn,
            //     age:age,
            //     avatar: ava
            // });
            // console.log("Document written with ID: ", docRef.id);
            const userRef = doc(db, 'users', result.user.uid);
            setDoc(
                userRef, 
                { 
                    fullname: fn,
                    age:age,
                    avatar: ava,
                }, 
                { merge: true }
            );
        } else {
            alert('fill in all textfields')
        }
    }

    return(
        <View>
            <TextInput value={fn} placeholder="Fullname" onChangeText={(txt)=>setFN(txt)} />
            <TextInput value={age} placeholder="Age" onChangeText={(txt)=>setAge(txt)} />
            <TextInput value={ava} placeholder="Avatar" onChangeText={(txt)=>setAva(txt)} />
            <TextInput value={em} placeholder="Email" onChangeText={(txt)=>setEmail(txt)} />
            <TextInput value={ps} placeholder="Password" onChangeText={(txt)=>setPS(txt)} />
            <Button title="Add" onPress={()=>AddUser()} />
        </View>
    );
}