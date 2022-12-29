// import { response } from "express";
import { response } from "express";
import fetch from "node-fetch";
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
        'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcHViY29uc29sZS5tZWRpYS5uZXQiLCJzdWIiOiI4Q1VUN1c4M1IiLCJpYXQiOjE2NzAzNjc2NzQsImV4cCI6MTY3MDQ1NDA3NCwiYXVkIjpbXX0.KgKVat9Fe6C5GK4g23KFjPYhZhaLjvrG2t0S-Hb0xWbokxMZEXP4TlvoQh3Dm6UkmOjaG7eyIJlB2ibP-INPpIbOnYax1RdtzFekxq6GCt73wmrpvmGfcKO-SZgYzm2Qli8Bf_K4SR3ni8OdAXi3xe1EByRtNfbHvZCnzfV1x-9cnhWqUrMAXjeyhl4z2VY5WRse5wQTo1BoRD8tKLCy-q_EdY03QvpaXtp3Zsjtz257H9hqGiWHoZMX8Qv_wsZAG2CvnQt48Kit65PYMXqCtHeZZlp5GtLB5pGGHWF5L2AcgAeQDxWp8-zf1rEm5NwkUTMa1qUDlZK5AGT4wnnkZGrlUrZ3Xv50AX73YsC3OdEdqCjixePxs4Ddw0PtSqsqv694nGh5FafXcusA1-XQFLYjHyhC6hAXJPCeIZdbC6iUKYIeD6okO_qelUpHbAWjlxuW4foJsxdZFRagsTIoE-TzvjyRdohfrRfujDl4K_KG4MJDQzlGALqW9WUwfGHqjfyXd2H1S6_RJjA_4y4LzkhbbQkA_M7Yz6ndIijfSjNE4mhYl42NAEBmCr_BG_0yYkCK6HGIQT65q3KjP0twGgq40Cm-oSv2MVy-Jge8YXR6Boe-Dtm3OcPd-2EsQNh4XUR4_T1NDdx-8DwrRD61V-9tE0Ri0rIK681KwOC589Q',
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

        Source:"Digital",
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
       await client.db("LocalTest").collection("Mdaily_ABD").deleteMany({date:"2022-12-03",Source:"Digital"});
       
       await client.db("LocalTest").collection("Mdaily_ABD").insertMany(reqire)
    //   const data = await client.db("LocalTest").collection("sope").find({}).toArray()
      console.log("data in db",reqire.length)
      client.close()
}
flow()

})
}
sum()