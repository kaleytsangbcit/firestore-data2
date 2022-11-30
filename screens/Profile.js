import { Text, View, Button, Image, TextInput } from 'react-native';
import { collection, addDoc, setDoc, getDocs, getFirestore, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";

export default function Profile({navigation}){
    const [fn, setFN] = useState("");
    const [age, setAge] = useState("");
    const [ava, setAva] = useState("");

    const GetUser = async () => {
        const myself = getAuth()
        if(!myself.currentUser){
            alert("Not logged in")
            return;
        }
        const db = getFirestore();
        //const docRef = doc(db, "users", "6JojjmEUnnRAQAmKNOpz");
        const docRef = doc(db, "users", myself.currentUser.uid);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const user = docSnap.data();
            setFN(user.fullname);
            setAge(user.age);
            setAva(user.avatar);
        } else {
        // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    
    useEffect(() => {
        GetUser();
    }, []);

    if (fn === ""){
        return <Text>Retriving data</Text>
    }

    return(
        <View>
            <Text>{fn} - {age}</Text>
            <Image source={{uri:ava}} style={{width:100, height: 100}} />
            <Button title='Edit User' onPress={() => {
                const myself = getAuth();
                navigation.navigate({
                    name:"Edit",
                    params:{id: myself.currentUser.uid}
            })}
            } />
        </View>
    );
}