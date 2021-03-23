import React, { useState, useEffect } from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage';



function Chatroom() {
    const [text, setText] = useState("")
    const [userId, setUserId] = useState("")
    const [localMessages, setLocalMessages] = useState([])
    const [localImage, setLocalImage] = useState(null)

    const firestore = firebase.firestore()
    const storage = firebase.storage()
    useEffect( () => {
        setUserId(firebase.auth()?.currentUser?.uid)
        var query = firestore.collection('Chats').orderBy("timestamp", "asc");
        query.onSnapshot({
            next: (querySnapshot) => {
                let messages = []
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, '=>', doc.data());
                    messages.push(doc.data())
                });
                setLocalMessages(messages)
            },
        });
    }, [firestore]);

    return (
        <div>
            <div style={{ display: 'flex', flex: 1, height: '100vh', flexDirection: 'column' }}>
                <div style={{ flex: 1, marginLeft: 24, marginRight: 24, overflow: 'auto', marginBottom: 24 }}>
                    {localMessages.map((localMessage) => (
                    <div style={{ display: 'flex', flex: 1, justifyContent: userId === localMessage.uid ? 'flex-end' : 'flex-start' }}>
                        <div style={{
                            minHeight: 52,
                            width: 600,
                            backgroundColor: userId === localMessage.uid ? 'blue' : 'red',
                            marginTop: 24,
                            paddingLeft: 24,
                            paddingRight: 24,
                            borderRadius: 12 }}>
                                <p>{localMessage.content}</p>
                                {localMessage?.image && localMessage.image.length > 0 &&
                                    <img style={{ width: '100%', height: 'auto', marginBottom: 24 }} src={localMessage.image} alt="" />}
                            </div>
                    </div>
                    ))}
                </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 24 }}>
                <form style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1, }}
                    onSubmit={async (e) => {
                        e.preventDefault()
                        const timestamp = Date.now();
                        let image =''
                        const content = text;
                        const uid = userId;
                        if (localImage) {
                            const uniqueLocalImage = `${localImage.name}_${Math.random().toString(36)}`
                            const uploadTask = storage.ref(`/images/${uniqueLocalImage}`).put(localImage)
                            uploadTask.on('state_changed',
                            () => {},
                            () => {},
                            async () => {
                                const fireBaseUrl = await storage.ref('images').child(uniqueLocalImage).getDownloadURL()
                                const message = { content, timestamp, uid, image: fireBaseUrl }
                                const docRef = await firestore.collection("Chats").add(message)
                            })
                        } else {
                            const message = { content, timestamp, uid, image }
                            const docRef = await firestore.collection("Chats").add(message)
                        }

                        setText("")
                        setLocalImage(null)
                    }}>
                    <input style={{ 
                        flex: 11,
                        height: 32, 
                        fontSize: 28
                        }} type="text" value={text} onChange={(value) => {
                            setText(value.target.value)
                        }} />
                    <input
                        key={Date.now()}
                        style={{ flex: 1 }}
                        type="file"
                        onChange={(e) => {
                            const image = e.target.files[0]
                            setLocalImage(image)
                        }}
                        />
                    <button type='submit' style={{
                        flex: 1,
                        backgroundColor: 'blue',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 18,
                        borderWidth: 0
                    }} >Send</button> 
                    </form>
            </div>
        </div>
        </div>
    );
}

export default Chatroom;