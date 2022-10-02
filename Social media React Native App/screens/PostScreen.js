import React, { Component } from 'react';
import { View, Text,StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, PermissionsAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import Fire from '../Fire'
import Exif from 'react-native-exif'
import * as ImagePicker from 'expo-image-picker'
const firebase=require('firebase')
require('firebase/firestore')


export default class PostScreen extends Component {

  state={
    text:'',
    image:null,
    user:{}
  }

  unsubscribe=null

   componentDidMount(){
      const user=this.props.uid || Fire.shared.uid
      this.unsubscribe=Fire.shared.firestore.collection('users').doc(user).onSnapshot(doc=>{
        this.setState({user:doc.data()})
      })


   }

   componentWillUnmount(){
     this.unsubscribe()
   }

  getPhotoPermission=async ()=>{
    if(Constants.platform.ios){
      const {status}=await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if(status!='granted'){
        alert('We need permission to access your camera roll')
      }
      else{
        const granted=await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA_ROLL,{
            title:"Social App Camera Permission",
            message:"Social App needs access to your camera",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        )
      }
      if(granted!==PermissionsAndroid.RESULTS.GRANTED){
        alert('We need permission to access your camera roll')
      
      }
    }
  }

  handlePost=()=>{
    console.log(this.state.text);
    console.log(this.state.image);
    console.log(this.state.user.posts)
    var up_post=this.state.user.posts+1
    const user=this.props.uid || Fire.shared.uid
    console.log(user);
    console.log("//////////////////////////");
    

    
    

    Fire.shared.addPost({text:this.state.text.trim(),localUri:this.state.image})
    Fire.shared.firestore.collection('users').doc(user).update({
      posts: up_post,
    })
    
    
        .then(ref=>{
          this.setState({text:'',image:null})
          this.props.navigation.goBack()
        }).catch(error=>{
          alert(error.message)
        })
  }

  pickImage=async()=>{
    let result=await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      includeExif:true,
      allowsEditing:true,
      aspect:[4,3]
    })
    if(!result.cancelled){
      this.setState({image:result.uri}).then(image => {
        this.processDataImage(image);      
      });
    }
    console.log(result.uri);
    Exif.getExif(this.state.image)
    .then(msg => console.warn('OK: ' + JSON.stringify(msg)))
    .catch(msg => console.warn('ERROR: ' + msg))
    
  }
  processDataImage(image) {
    console.log("process image 1",image);    
    this.setState({
      currentProcessedImage: {
        uid: tools.generateUUID(),
        uri: image.path,
        exif:image.exif,
        id: this.state.imagesToSend.length
      },
      modalOrganeVisible: true
    })
    ;
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
            <Ionicons name='md-arrow-back' size={24}color='#D8D9DB'></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePost}>
            <Text style={{fontWeight:'700'}}>Post</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.inputContainer}>
          <Image source={{uri:this.state.user.avatar}} style={styles.avatar}/>
          <TextInput autoFocus={true}
          multiline={true}
          numberOfLines={4}
          style={{flex:1}}
          placeholder="Want to share something?"
          onChangeText={text=>this.setState({text})}
          value={this.state.text}></TextInput>

        </View>
        <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
          <Ionicons name="md-camera" size={32} color="#D8D9Db"/>

        </TouchableOpacity>
        <View style={{marginHorizontal:32,marginTop:32,height:300}}>
            <Image source={{uri:this.state.image}} style={{width:'100%',height:'100%'}}>

            </Image>
        </View>
      </SafeAreaView>
    );
  }
}

const styles=StyleSheet.create({
    container:{
        flex:1
       
      },
      header:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:32,
        paddingVertical:12,
        borderBottomWidth:1,
        marginTop:16,
        borderBottomColor:'#D8D9DB'
      },
      inputContainer:{
        margin:32,
        flexDirection:'row',
    
      },
      avatar:{
        width:48,
        height:48,
        borderRadius:24,
        marginRight:16
      },
      photo:{
        alignItems:'flex-end',
        marginHorizontal:32
      }
})
