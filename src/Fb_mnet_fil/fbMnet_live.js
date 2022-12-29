import fetch from "node-fetch";
import {MongoClient} from "mongodb";
import moment from "moment";

const mClient = async () => {
    const uri = "mongodb+srv://admin:Adsi2022@arc02.2lutz.mongodb.net/LocalTest?retryWrites=true&w=majority";
  
    const client = new MongoClient(uri);
  
    return client;
  };
  const client = await mClient()
    await client.connect()
    // var today=moment().format("YYYY-MM-DD")
    var today="2022-12-04"
    var fb_id=process.argv[2];
    const data = await client.db("LocalTest").collection("fb_Acc").find({date_start:today,acc_number:fb_id}).project({_id:0}).toArray()
    console.log(data.length)
    const mnet = await client.db("LocalTest").collection("Mnet_ABD").find({date:today}).project({_id:0}).toArray()
    console.log(mnet.length) 
    // date:today

    // console.log(data.length,mnet.length)
var count=0
var filter=[]
var dataf = []
async function ram(){
    for(var i=0;i<data.length;i++){
        for(var j=0;j<mnet.length;j++){
            if (data[i].adset_id === mnet[j].adset_id && data[i].date === mnet[j].BSTDate && data[i].hour === mnet[j].BSTHour && data[i].month === mnet[j].BSTMonth){
                count=count+1
                // console.log(data[i],mnet[j])
                const fb=data[i];
                const media=mnet[j]
                var a = {...fb,...media}
                filter.push(a);
                // console.log(filter.length)
            }
        }
    }
    var swipe=filter.map((element)=>{
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
    // console.log(swipe)
    dataf.push(...swipe)
} 
await ram()
    
async function rom() {
        const client = await mClient()
    //   console.log("slope", slope)
      await client.connect()
    //   await client.db("LocalTest").collection("filter-fbm").deleteMany({date:today})
    //   await client.db("LocalTest").collection("filter-fbm").insertMany(swipe)
     // const data = await client.db("LocalTest").collection("sope").find({}).toArray()
     console.log(dataf.length)

     client.close()
     }
     rom()

  
