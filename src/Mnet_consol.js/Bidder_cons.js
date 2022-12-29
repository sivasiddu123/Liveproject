// import { response } from "express";
import { response } from "express";
import fetch from "node-fetch";
// import { mClient } from "../mclient";
import {MongoClient} from "mongodb";

const mClient = async () => {
    const uri = "mongodb+srv://admin:Adsi2022@arc02.2lutz.mongodb.net/LocalTest?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    return client;
};
async function sum(){
const drone =fetch('https://api-pubconsole.media.net/v2/reports', {
    method: 'POST',
    headers: {
        'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcHViY29uc29sZS5tZWRpYS5uZXQiLCJzdWIiOiI4Q1UyUjFKWTciLCJpYXQiOjE2NzAzNjc2NzQsImV4cCI6MTY3MDQ1NDA3NCwiYXVkIjpbXX0.JwM48HnbjZds0L4T1j4eA-4ynppyOPT6yfSXna4v1W_M08qcAIdv9sxyrdSaLtYhMHzYWOcPcH-1NPX6XLER2sha5M9GH392QCE4GqPRG3y-N3ws4zwXdNK_MGSveMbApZGJcCZcS60OOOuiuIsZShRU0Hy70LHSB5PBv4a_SyFQtVbxo2-V348N0LbcChDXkgJnpj4Xc78__fDl5qeYTYe6dS91vjVIPv7dJHb-NZYGJtHIu9VqmxGhHciuWfN9yCoPmISjPncJ1Fq8lAitZ-jTzFhhYty18GxOGCqFxZyx7M5WUjXEHxcjuOoseKfZ1ROPgnIQqz7Yh8jcgyp-IB-mDKnNWJOhiyGgkIDIKrZ_zu3y-UabBsRZHmzuyGhAyA4OX_AWgdNVURyFEVNaflyjic9mBNXtR2OiC36MilIRWrYEfKhY7ZwX0exDRnvfwMnAB8bL-Pn-mZFzqUpcpmr-5A5DlyrA6nNoNzUGpIV4s8T_mxUygJW2udeVQKsKwE5WfTaMNmGQawMlGZkGsC3lU-FU9aCXZ2Pdg2qi19-f9RsefMdTehr023qmENHey1myc7r06SvYZQPVoUp20cKx95WaYbhpjB3R9WQIbabR8fS2J2aaStpyuHUjGPFpgB97yUx77iihkBmmQSRtfrICviHzsrk98wO1O7GhxR4',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "start_date":"20221203",
        "end_date":"20221203",
        "pagination": {
        "page_no": "1",
        "page_size": 5000
                      },
       "group_by":["date","site","channel","channel_name2","channel_name3"]
   })
})
// .then(response => response.json())
// .then(response=>console.log(JSON.stringify(response)))
.then(response=>response.json())
.then (function(response){
// console.log(response.data.rows)
var slow=response.data.rows;
// console.log(slow.length)
var reqire= slow.map((element)=>{
    return{

        Source:"Bidder",
        date:element.date,
        adset_id:element.channelName3,
        Domain:element.site,
        Rev:element.estimated_revenue,
        impressions:element.impressions,
        ad_clicks:element.ad_clicks,
        ctr:element.ctr,
        rpc:element.rpc,
        rpm:element.rpm
    }
})
const flow= async ()=>{
    const client = await mClient()

    //    console.log("slope", slope)
       await client.connect()
       await client.db("LocalTest").collection("Mdaily_ABD").deleteMany({date:"2022-12-03",Source:"Bidder"});
       
       await client.db("LocalTest").collection("Mdaily_ABD").insertMany(reqire)
    //   const data = await client.db("LocalTest").collection("sope").find({}).toArray()
      console.log("data in db",reqire.length)
      client.close()
}
flow()
})

}
sum()


