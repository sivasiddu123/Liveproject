import { MongoClient } from "mongodb";

const mClient = async () => {
    const uri = "mongodb+srv://admin:Adsi2022@arc02.2lutz.mongodb.net/LocalTest?retryWrites=true&w=majority";
  
    const client = new MongoClient(uri);
  
    return client;
  };
  const client = await mClient()
    await client.connect()
    // var today=moment().format("YYYY-MM-DD")
    // var today="2022-12-24"
    // var fb_id=process.argv[2];
    const google = await client.db("LocalTest").collection("google_live").find({date:"2022-12-24"}).project({_id:0}).toArray()
    // console.log(google)
    const explore = await client.db("LocalTest").collection("explore_live").find({E_date: {$gte: "2022-12-23",$lte: "2022-12-24"}}).project({_id:0}).toArray()
    // console.log(explore.length)
var count=0;
var mix=[]
    async function bom(){
       for(var i=0;i<google.length;i++){
        for(var j=0;j<explore.length;j++){
            if(google[i].adset_id===explore[j].E_adset_id && google[i].convert_date===explore[j].converted_date){
                count=count+1;
                var pp={...google[i],...explore[j]}
                mix.push(pp) 
            }  
        }
       }
       console.log(mix.length)
       async function db(){
        const client = await mClient()
                //    console.log("slope", slope)
                   await client.connect()
                   await client.db("LocalTest").collection("goo_exp_live").deleteMany({});
                
                   
                   await client.db("LocalTest").collection("goo_exp_live").insertMany(mix)
    
                  console.log("data in DB",mix.length)
                  client.close()
      }
     db()
    }
    bom()



