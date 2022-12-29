import axios from "axios";
import moment from "moment-timezone";
import fetch from "node-fetch";
import { MongoClient } from "mongodb";


const mClient = async () => {
    const uri = "mongodb+srv://admin:Adsi2022@arc02.2lutz.mongodb.net/LocalTest?retryWrites=true&w=majority";
  
    const client = new MongoClient(uri);
  
    return client;
  };

//   var today=moment().subtract(1,"days").format("YYYY-MM-DD")
var today="2022-12-23"
  var acc_number=process.argv[2]
async function ram(){
await fetch(`https://googleads.googleapis.com/v10/customers/${acc_number}/googleAds:searchStream`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'developer-token':'6ONGdlhXF3D9TOcCK5I9tQ',
        'login-customer-id':'4327722731',
        'Authorization':'Bearer ya29.a0AX9GBdXcNQvUqQuRsdZX9rieV4LEqIYZen1GSBYEppMcMz6jfBvuaQdMWcd8PxtoYQBurYgJItf_xYV4KvCJLSgcWjcpR-yXoJt_FaShiL-QIwkXUVyeZ5vtu0JoMEpXGUctLG_IZK_mNxxgWXnEs63K-E8jlzC1WwaCgYKAXUSAQASFQHUCsbCUbE5ngDFB_a1iJ4xNlP97w0169'
    },
    body: JSON.stringify({
        'query': `SELECT campaign.name, campaign.status, campaign.advertising_channel_type, metrics.clicks, metrics.impressions, metrics.ctr,  metrics.average_cpc, metrics.cost_micros, metrics.all_conversions_from_interactions_rate, metrics.conversions, metrics.cost_per_conversion, segments.date,segments.hour FROM campaign WHERE segments.date BETWEEN '${today}' AND '${today}'`
    })
})
.then(response => response.json())
// .then(response => console.log(JSON.stringify(response)))
.then(function(response){
    var slow=response[0].results
    // console.log(slow)
    var slope=slow.map((element)=>{
        if(element.segments.hour < 10){
            var hh="0"+ element.segments.hour
        }else{
            var hh=element.segments.hour
        }
        
        return{
            date:element.segments.date,
            account_num:element.campaign.resourceName.split("/")[1],
            status:element.campaign.status,
            adset_id:element.campaign.name.split(" ")[0],
            g_clicks:element.metrics.clicks,
            g_conversions:element.metrics.conversions,
            g_spend:((element.metrics.costMicros)/1000000).toFixed(2),
            g_CTR:element.metrics.ctr.toFixed(2),
            g_All_conversions:element.metrics.allConversionsFromInteractionsRate ? element.metrics.allConversionsFromInteractionsRate.toFixed(2) :"0" ,
            g_avgCPC:((element.metrics.averageCpc)/1000000).toFixed(2),
            g_impressions:element.metrics.impressions,
            g_hour:hh,
            convert_date:element.segments.date +" "+ hh
            

        }
    })
// console.log(slope)
async function db(){
    const client = await mClient()
            //    console.log("slope", slope)
               await client.connect()
               await client.db("LocalTest").collection("google_live").deleteMany({date:today,account_num:acc_number});
            
               
               await client.db("LocalTest").collection("google_live").insertMany(slope)

              console.log("data in DB",slope.length)
              client.close()
  }
 db()
})
}
ram()
