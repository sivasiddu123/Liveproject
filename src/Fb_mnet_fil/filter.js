import {MongoClient} from "mongodb";
import moment from "moment";

const mClient=async function () {
    const uri = "mongodb+srv://admin:Adsi2022@arc02.2lutz.mongodb.net/LocalTest?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
  
    return client;
};

async function abc(){
    var twodays=moment().subtract(1,"days").format("YYYY-MM-DD");
    var today=moment().format("YYYY-MM-DD");
    var acc_number = process.argv[2];
    var timez=process.argv[3];
    var fb=[];
    var media=["siddu"]
    var shop=[]
    var all=[]
const client=await mClient();
await client.connect();

const facebook=await client.db("LocalTest").collection("fb_Acc").find({"date_start":today,"acc_number":acc_number}).toArray();
fb.push(...facebook)
// console.log(facebook.length)
const mnet=await client.db("LocalTest").collection("Mnet_ABD").find({"date": { $gte:twodays, $lte:today}}).toArray()
media.push(...mnet)
if(timez="BST"){
    shop.push(fb.adset_id===media.adset_id && fb.BSTHour===media.BSTHour && fb.BSTDate===media.BSTDate)
}else{
    console.log("notpossible")
}
// console.log(shop.length)
var swipe=shop.map((element)=>{
    return{
        acc_number:element.acc_number,
        time_zone:element.time_zone,
        spend:element.spend,
        f_leads:element.leads,
        cpc:element.cpc,
        clicks:element.clicks,
        campaign_name:element.campaign_name,
        adset_id:element.adset_id,
        f_impressions:element.impressions,
        hourly_stats_aggregated_by_advertiser_time_zone:element.hourly_stats_aggregated_by_advertiser_time_zone,
        date_start:element.date_start,
        f_hour:element.hour,
        date:moment(element.date).format('YYYY-MM-DD'),
        channelName:element.channelName,
        channelName2:element.channelName2,
        channelName3:element.adset_id,
        m_conv_totalClicks:element.totalClicks,
        estimatedRevenue:element.estimatedRevenue,
        m_hour:element.m_hour,
        Profit:(element.estimatedRevenue-element.spend).toFixed(2) ? (element.estimatedRevenue-element.spend).toFixed(2):"0",
        Margin:element.estimatedRevenue=='0' || element.spend=='0' ? '0' : (((element.estimatedRevenue-element.spend)/element.spend)*100).toFixed(2),
        CPL:element.spend == '0' || element.leads == '0' ? '0' : (element.spend/element.leads).toFixed(2),
        Mcpl:isFinite((element.spend/element.totalClicks).toFixed(2)) ? (element.spend/element.totalClicks).toFixed(2) : "0",
        Rpc:element.estimatedRevenue=='0' || element.clicks=='0'? '0' : (element.estimatedRevenue/element.clicks).toFixed(2) 
    }
})
// console.log(swipe.length)
all.push(...swipe)
// console.log(all.length)
async function slim(){
    const client=await mClient()

       await client.connect()
    //    await client.db("LocalTest").collection("filter-fbm").deleteMany({date:today})
    //    await client.db("LocalTest").collection("filter-fbm").insertMany(all)

       // await client.db("LocalTest").collection("Moment_fb").deleteMany({})
       console.log("data in DB",all.length)
       client.close()
   }
   await slim()
}
abc()