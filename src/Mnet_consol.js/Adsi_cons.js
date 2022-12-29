// import { response } from "express";
// import { response } from "express";
import { MongoClient } from "mongodb";
import fetch from "node-fetch";


const mClient = async () => {
    const uri = "mongodb+srv://admin:Adsi2022@arc02.2lutz.mongodb.net/LocalTest?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    return client;
};

async function sum(){
const drone =fetch('https://api-pubconsole.media.net/v2/reports', {
    method: 'POST',
    headers: {
        'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcHViY29uc29sZS5tZWRpYS5uZXQiLCJzdWIiOiI4Q1VGMzUzVTUiLCJpYXQiOjE2NzAzNjc2NzQsImV4cCI6MTY3MDQ1NDA3NCwiYXVkIjpbXX0.DDXrOEzF6kAxqGjWY4_hGfx8D3k740FRUFg2p1UeXwK0LhPrOLefmf_5K2Xo2sfAj_sNu_u4ZnX4KN0l7gC8SneUbAgKMiS--ajlSYgiVUoYWHB81ot3gBN09cwK7MAbjLzIMHNrAU1yevJA9X4fFUFZZHxmXPcxJNPDpfqTk7p8B6x_kTvQlmU81okSBBrsROcs2ywlbJwQp5DbEf9n2A1Oum5m70Zr3EMVZ4O9sS_NagiKtPIEaBfxXkbWxOOa_iqMH4IisJbNEBQYkMML4DeuxIAMmyFTuoEzk18bff7ciTEI1-DxhyRERXMY9RfwH2yU1Zz3JSdBq7wW0q18Ze2mOJ_xl_NflsRWY61rzHnjbs318hqguTRiZD_2kwUv6Pxobv_KCk1jzP6EyPstA1crdaor29Tq04oftdmZmaJXOKt-N-pkkzq6x3YCXs7GHs_GGl0DtJW3Vy4eX9RlXvKVGE93ypf5DjcvyydYaMEn9PDQPyEOzCl-7TY5h8ITc8LVcPEoDLOd5bxu_Hh_s_eFIK4qmznCIz3dYYRrIAx8Dp2a-vhtp5TmhlsE8V03PV2HxBY5zoJCduH95Q-496KXuRqlG-ED30uronRk0sBw0nJz5yxqqv9spGSQpr95ira_CxtffX30a3KGi5IXh_Zvs8jqJ64ktYgwus5fxDM',
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

        Source:"Adsi",
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
// console.log(reqire)
async function flow(){
    const client = await mClient()

    //    console.log("slope", slope)
       await client.connect()
       await client.db("LocalTest").collection("Mdaily_ABD").deleteMany({date:"2022-12-03",Source:"Adsi"});
       
       await client.db("LocalTest").collection("Mdaily_ABD").insertMany(reqire)
    //   const data = await client.db("LocalTest").collection("sope").find({}).toArray()
      console.log("data in db",reqire.length)
      client.close()
} flow()
})


}
sum()