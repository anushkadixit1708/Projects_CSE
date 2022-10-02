//import FirebaseKeys from './config'

import firebase from 'firebase/app'
import 'firebase/auth';


class Fire{

    constructor(){
        var FirebaseKeys={
            apiKey: "AIzaSyCDTEI-MA71rMgk_9dsMbCPCp_B8BCi3IY",
            authDomain: "unipro-dac65.firebaseapp.com",
            projectId: "unipro-dac65",
            storageBucket: "unipro-dac65.appspot.com",
            messagingSenderId: "604354314570",
            appId: "1:604354314570:web:fb64a8f6c04211a2d3c1b3"
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(FirebaseKeys);
          }
    }

    addPost =async({text,localUri})=>{
        const remoteUri=await this.uploadPhotoAsync(localUri,`photos/${this.uid}/${Date.now()}`)
        return new Promise((res,rej)=>{
            this.firestore.collection('posts').add({
                text,
                uid:this.uid,
                timestamp:this.timestamp,
                image:remoteUri
            })
            .then(ref=>{
                res(ref)
            })
            .catch(error=>{
                rej(error)
            })
            
        })
    }

    uploadPhotoAsync =async (uri,filename)=>{
        const path=`photos/${this.uid}/${Date.now()}.jpg`
    

    return new Promise(async(res,rej)=>{ 
        const response=await fetch(uri)
        const file=await response.blob()
        let upload =firebase.storage().ref(filename).put(file)
        upload.on('state_changed',snapshot=>{},err=>{
            rej(err)
        },
        async()=>{
            const url=await upload.snapshot.ref.getDownloadURL()
            res(url)
        })
    })
}

signOut=()=>{
    firebase.auth().signOut()
}

createUSer=async user=>{
    let remoteUri=null
    try{
        await firebase.auth().createUserWithEmailAndPassword(user.email,user.password )
        let db=this.firestore.collection('users').doc(this.uid)
        db.set({
            name:user.name,
            email:user.email,
            avatar:null,
            posts:0,
            followers:0,
            following:0
        })
        if(user.avatar){
            remoteUri=await this.uploadPhotoAsync(user.avatar,`avatars/${this.uid}`)
            db.set({avatar:remoteUri},{merge:true})
        }
    }
    catch(error){
        alert("Error:",error.message)
    }
}

    get firestore(){
        return firebase.firestore()
    }
    get uid(){
        return (firebase.auth().currentUser||{}).uid
    }
    get timestamp(){
        return Date.now()
    }
}
Fire.shared= new Fire()
export default Fire