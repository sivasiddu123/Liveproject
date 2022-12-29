import { access } from "fs"
import fetch from "node-fetch"
import { MongoClient } from "mongodb";

const mClient = async () => {
    const uri = "mongodb+srv://admin:Adsi2022@arc02.2lutz.mongodb.net/LocalTest?retryWrites=true&w=majority";
  
    const client = new MongoClient(uri);
  
    return client;
  };

async function google(){
fetch('https://www.googleapis.com/oauth2/v3/token', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "grant_type": "refresh_token",
        "client_id":"281053674849-f4h7lovcg6phana65q9rd55a8220kdjc.apps.googleusercontent.com",
        "client_secret": "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",
        "refresh_token":"1//04wmdTllc5i8sCgYIARAAGAQSNwF-L9IrrS6fUWpOGh9Cy0zIv7DAjSNIK1xqxZm7mu4dD2caGLjRWQcv1MiVCkr2VYONf_7zQ5c"
    })
})
.then(response => response.json())
// .then(response => console.log(JSON.stringify(response)))
.then(function(response){
    var slow=[response]
    // console.log(slow)
    var req=slow.map((element)=>{
        return{
            p2_acc_token:element.access_token
        }
    })
    // console.log(req)
    async function db(){
        const client = await mClient()
                //    console.log("slope", slope)
                   await client.connect()
                   await client.db("LocalTest").collection("Google_p2_acctoken").deleteMany({});
                
                   
                   await client.db("LocalTest").collection("Google_p2_acctoken").insertMany(req)

                  console.log("data in DB",req)
                  client.close()
      }
     db()
})

}google()

