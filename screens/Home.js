
import { Text, View, Button, Image, ScrollView } from 'react-native';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useState } from 'react';

export default function Home({navigation}) {
    const [users, setUsers] = useState([]);

    const GetData = async ()=> {
        const db = getFirestore();
        //dosomething
        const querySnapshot = await getDocs(collection(db, "users"));
        const dbusers = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            dbusers.push({
                ...doc.data(),
                id:doc.id
            });
        });
        setUsers([
            ...dbusers
        ]);
    }

  return (
    <View>
        <Button title='Get Data' onPress={() => GetData()} />
        <Button title='Sign In' onPress={() => navigation.navigate("Login")} />
        <Button title='Profile' onPress={() => navigation.navigate("Profile")} />
        <Button title='Add User' onPress={() => navigation.navigate("Register")} />
        <ScrollView>
            <View>
            {users.map(o=><View key={o.id}>
                <Image source={{uri:o.avatar}} style={{width:100, height: 100}} />
                <Text>{o.id} - {o.fullname}</Text>

                <Button title='Edit User' onPress={() => navigation.navigate({
                    name:"Edit",
                    params:{id: o.id}
                })} />
                </View>
                )}
            </View>
        </ScrollView>
    </View>
  );
}
