import e from "express"
import fetch from "node-fetch"
import moment from "moment-timezone";
import { MongoClient } from "mongodb";


const mClient = async () => {
    const uri = "mongodb+srv://admin:Adsi2022@arc02.2lutz.mongodb.net/LocalTest?retryWrites=true&w=majority";
  
    const client = new MongoClient(uri);
  
    return client;
  };

async function ram(){
    // var today=moment().format('YYYY-MM-DD')
    // var pastday=moment().subtract(1,"days").format('YYYY-MM-DD')
    var today="2022-12-23"

    await fetch(`https://partner.api.explorads.com/get-report/get-hourly-rs1-report`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email":"simona@bidder.media",
            "password":"BidderExp2022!",
            "startDate":`${today}`,
            "endDate":`${today}`,
            "reportType":"rs1"
        })
    })
    .then(response => response.json())
    // .then(response => console.log(JSON.stringify(response)))
    .then(function(response){
        console.log(response)
        var mock=response.map((element,i, srcArray)=>{
            if (element.hour < 10) {
                var hh="0" + element.hour;
              } else {
                 var hh=element.hour;
              }

              if(element.hour >1){
                var ss= element.earnings_eur - srcArray[i - 1]?.earnings_eur
                var tt=element.ad_requests - srcArray[i - 1]?.ad_requests
                var uu=element.clicks-srcArray[i - 1]?.clicks
            }else{
                var ss=element.earnings_eur
                var tt=element.ad_requests
                var uu=element.clicks
            }
            return{
                E_date:element.date,
                E_hour:(element.hour < 10) ? "0" + element.hour : element.hour,
                E_country_name:element.country_name,
                E_adset_id:element.custom_channel_name,
                E_ad_requests:element.ad_requests,
                E_clicks:element.clicks,
                E_Rev:element.earnings_eur,
                E_Rpc:element.rpc,
                E_page_views:element.page_views,
                E_impressions:element.individual_ad_impressions,
                E_matched_requests:element.matched_ad_requests,
                E_clicks_ratio:element.clicks_spam_ratio,
                converted_date:moment(element.date +" "+(element.hour < 10) ? "0" + element.hour : element.hour).tz("America/Los_Angeles").utc().format("YYYY-MM-DD HH"),
                
            }
        })
        console.log(mock)


       
        async function db(){
                const client = await mClient()
                        //    console.log("slope", slope)
                           await client.connect()
                        //    await client.db("LocalTest").collection("explore_live").deleteMany({E_date:today});
                        //    E_date:today
    
                        //    await client.db("LocalTest").collection("explore_live").insertMany(mock)
            
                          console.log("data in DB",length)
                          client.close()
              }
             db()
    })
}
ram()