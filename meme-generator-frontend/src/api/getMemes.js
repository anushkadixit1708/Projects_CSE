import axios from 'axios';

const getData  = async () => {
    try{
        let data = await axios.get("https://api.imgflip.com/get_memes")
        data = data.data.data.memes
        return data
    } catch(err){
        console.log("Error in getData function: " + err)
    }
  }

// const getData = axios.get("https://api.imgflip.com/get_memes").then(x => return x)
export {getData}