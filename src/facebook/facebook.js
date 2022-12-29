import fetch from "node-fetch";
import {MongoClient} from "mongodb";
// const moment = require('moment-timezone');
import moment from "moment-timezone";



const mClient = async () => {
    const uri = "mongodb+srv://admin:Adsi2022@arc02.2lutz.mongodb.net/LocalTest?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
  
    return client;
  };

async function sum(){
   var acc_number = process.argv[2];
var time_zone = process.argv[3];
// var yesterdays = moment().subtract(0, "days").format("YYYY-MM-DD")
// var today = moment().format("YYYY-MM-DD")
var today = "2022-12-03"



const response =await fetch(`https://graph.facebook.com/v14.0/act_${acc_number}/insights?fields=campaign_id,campaign_name&level=campaign&limit=500&filtering=[{%22field%22:%22spend%22,%22operator%22:%22GREATER_THAN%22,%22value%22:%220%22}]&time_range={"since":"${today}","until":"${today}"}&access_token=EAAJ7FZCCkYdMBAG0TePhZBFH8pOjNLIrPiWY6N1FY9Daps8VXcJhdmIZAPKCWEiSNnxNwTkOOweblp2p8Rv07BLAilW7SSCZBQpgmz9JtwBodAApWRmRgZCZATeNOjCtiK1SzeK3LMCtmr6mNBDgZCuJZBArPzV9NAl0KakTGhoSDkzfxa9fgWA8`)


   .then(function(response){
      return response.json();
   })
   .then(function(demo){
      // console.log("data", demo.data)
      var campsids = demo.data.map((element) => {
         return element.campaign_id
      })
var newArr = [];
var arr2=[];
var count = 0;
for (var i = 0; i<campsids.length; i++){
        count ++;
        if(count%10 === 0){
       newArr.push(arr2);
         arr2= []
        }
        arr2.push(campsids[i])
      //   console.log(newArr)  
      
      // console.log(arr2);
}
      newArr.push(arr2);
      arr2=[];
      var count = 0
      var final=[]

      // console.log("ver", newArr)
      for(var i=0;i< newArr.length;i++){
         // console.log("i",i)
         // newArr[i];
         var fbid=newArr[i];
         // console.log(newArr);
      
         async function idsum(){
            await fetch(`https://graph.facebook.com/v14.0/act_${acc_number}/insights?breakdowns=hourly_stats_aggregated_by_advertiser_time_zone&fields=clicks,adset_id,campaign_id,campaign_name,adset_name,ad_id,ad_name,spend,inline_link_clicks,impressions,attribution_setting,cpc,actions&filtering=[{"field":"campaign.id","operator":"IN", "value":[${fbid}]}]&level=adset&time_range={"since":"${today}","until":"${today}"}&limit=10000&access_token=EAAJ7FZCCkYdMBAG0TePhZBFH8pOjNLIrPiWY6N1FY9Daps8VXcJhdmIZAPKCWEiSNnxNwTkOOweblp2p8Rv07BLAilW7SSCZBQpgmz9JtwBodAApWRmRgZCZATeNOjCtiK1SzeK3LMCtmr6mNBDgZCuJZBArPzV9NAl0KakTGhoSDkzfxa9fgWA8`)
            .then(function(ids){
                const resData =  ids.json()
                return resData
             })
             .then (function(reply){
                  var swipe=reply.data
                  var filter=swipe.map((element)=>{
                     var leads = 0;
                     if (element.actions) {
                        element.actions.forEach((action) => {
                          if (action.action_type === "offsite_conversion.fb_pixel_lead") {
                            leads = leads + parseInt(action.value);
                          }
                        });
                      }

                      const ST = new Date(element.date_start);
                     const UTCTime = new Date(
                        Date.UTC(
                        ST.getFullYear(),
                        ST.getMonth(),
                        ST.getDate(),
                        ST.getHours(),
                        ST.getMinutes(),
                        ST.getSeconds()
                        )
                     );
                     const BST_time = moment(UTCTime).tz("Europe/London");
                     const EDT_time = moment(UTCTime).tz("America/New_York");
                     const GMT_time = moment(UTCTime).tz("Africa/Accra");
                     const IST_time = moment(UTCTime).tz("Asia/Kolkata");
                     const MST_time = moment(UTCTime).tz("America/Dawson");
                     const PDT_time = moment(UTCTime).tz("America/Los_Angeles");
                     const CDT_time = moment(UTCTime).tz("America/Chicago");
                     return{
                        acc_number:acc_number,
                        time_zone:time_zone,
                        spend:element.spend,
                        leads:leads,
                        cpc:element.cpc ? element.cpc : '0',
                        clicks:element.clicks,
                        campaign_name:element.campaign_name,
                        adset_id:element.adset_id,
                        impressions:element.impressions,
                        hourly_stats_aggregated_by_advertiser_time_zone:element.hourly_stats_aggregated_by_advertiser_time_zone,
                        date_start:element.date_start,
                        hour:element.hourly_stats_aggregated_by_advertiser_time_zone.split(":")[0],
                        date:element.date_start.split("-")[2],
                        month:element.date_start.split("-")[1],
                        delet_date:today,
                        EDT_timestamp: EDT_time.format("YYYY-MM-DD"),
                        EDTHour: moment(EDT_time).format("HH"),
                        EDTDate: moment(EDT_time).format("DD"),
                        EDTMonth: moment(EDT_time).format("MM"),
                        BST_timestamp: BST_time.format("YYYY-MM-DD"),
                        BSTHour: moment(BST_time).format("HH"),
                        BSTDate: moment(BST_time).format("DD"),
                        BSTMonth: moment(BST_time).format("MM"),
                        MST_timestamp: MST_time.format("YYYY-MM-DD"),
                        MSTHour: moment(MST_time).format("HH"),
                        MSTDate: moment(MST_time).format("DD"),
                        MSTMonth: moment(MST_time).format("MM"),
                        GMT_timestamp: GMT_time.format("YYYY-MM-DD"),
                        GMTHour: moment(GMT_time).format("HH"),
                        GMTDate: moment(GMT_time).format("DD"),
                        GMTMonth: moment(GMT_time).format("MM"),
                        UTC_timestamp: moment(UTCTime).format("YYYY-MM-DD"),
                        UTCHour: moment(UTCTime).format("HH"),
                        UTCDate: moment(UTCTime).format("DD"),
                        UTCMonth: moment(UTCTime).format("MM"),
                        PDT_timestamp: PDT_time.format("YYYY-MM-DD"),
                        PDTHour: moment(PDT_time).format("HH"),
                        PDTDate: moment(PDT_time).format("DD"),
                        PDTMonth: moment(PDT_time).format("MM"),
                        IST_timestamp: IST_time.format("YYYY-MM-DD"),
                        ISTHour: moment(IST_time).format("HH"),
                        ISTDate: moment(IST_time).format("DD"),
                        ISTMonth: moment(IST_time).format("MM"),
                        CDT_timestamp: CDT_time.format("YYYY-MM-DD"),
                        CDTHour: moment(CDT_time).format("HH"),
                        CDTDate: moment(CDT_time).format("DD"),
                        CDTMonth: moment(CDT_time).format("MM"),
                     }
                  })
                 
               //  console.log("data", i)
                final.push(...filter)
               })  
        }
        var z = 0
        async function aa(){
         await idsum()
         z = z + 1
         
         if (z === newArr.length){
            // console.log("hs")
            // console.log(final)

            async function slim(){
               const client=await mClient()
      
                  await client.connect()
                  await client.db("LocalTest").collection("fb_Acc").deleteMany({acc_number:acc_number,delet_date:today})
                  await client.db("LocalTest").collection("fb_Acc").insertMany(final)
      
                  // await client.db("LocalTest").collection("Moment_fb").deleteMany({})
                  console.log("data in DB",final.length)
                  client.close()
              }
              slim()
         }

        }
        aa()
        }
        
      //   console.log(final)
      })
    }sum()
   