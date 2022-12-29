import {MongoClient} from "mongodb";
import moment from "moment";

const mClient = async () => {
    const uri = "mongodb+srv://admin:Adsi2022@arc02.2lutz.mongodb.net/LocalTest?retryWrites=true&w=majority";
  
    const client = new MongoClient(uri);
  
    return client;
  };
  async function jam(){
  var today="2022-12-03"
  var fb_id=process.argv[2];
  const client = await mClient()

    await client.connect()
    const data = await client.db("LocalTest").collection("fb_consolidate").find({Account_date:today,Acc_number:fb_id}).project({_id:0}).toArray()
    console.log(data.length)
    const mnet = await client.db("LocalTest").collection("Mdaily_ABD").find({date:today}).project({_id:0}).toArray()
    console.log(mnet.length)
    var count=0
    var filter=[]

// var dataf = []

    for(var i=0;i<data.length;i++){
        for(var j=0;j<mnet.length;j++){
            if (data[i].BST_timestamp === mnet[j].date && data[i].Adset_id === mnet[j].adset_id){
                count=count+1
                // console.log(data[i],mnet[j])
                const fb=data[i];
                const media=mnet[j]
                var a = {...fb,...media}
                filter.push(a)
               
                // console.log(filter)
                var main=filter.map((element)=>{
                    return{
                        Acc_number:element.Acc_number,
                        Domain:element.Domain,
                        Source:element.Source,
                        Campaign_name:element.campaign_name,
                        Adset_id:element.Adset_id,
                        Acc_timezone:element.Acc_timezone,
                        date:element.date,
                        Account_date:element.Account_date,
                        BST_timestamp:element.BST_timestamp,
                        channel:element.channel,
                        Spend:element.Spend,
                        Rev:element.Rev.toFixed(2),
                        Profit:(element.Rev-element.Spend).toFixed(2),
                        Margin:(((element.Rev-element.Spend)/element.Spend)*100).toFixed(2),
                        Fb_lead:element.fb_lead,
                        Fb_clicks:element.Clicks,
                        Conversions:element.ad_clicks,
                        Cpl:element.Spend == '0' || element.fb_lead == '0' ? '0' : (element.Spend/element.fb_lead).toFixed(2),
                        Mcpl:element.Spend == '0' || element .ad_clicks == '0' ? '0' : (element.Spend/element.ad_clicks).toFixed(2),
                        Rpc:element.Rev == '0' || element.ad_clicks == '0' ? '0' :(element.Rev/element.ad_clicks).toFixed(2),
                        Cpc:element.Spend == '0' || element.Clicks == '0' ? '0' :(element.Spend/element.Clicks).toFixed(2),
                        Pctr:element.ad_clicks == '0' || element.Clicks == '0' ? '0' :((element.ad_clicks/element.Clicks)*100).toFixed(2)
                    }
                })
                // console.log(main,"data")
            }}}
     const consolidate= async()=>{
        const client = await mClient()
        await client.connect()
        await client.db("LocalTest").collection("daily_filter_fbm").deleteMany({date:today})
        await client.db("LocalTest").collection("daily_filter_fbm").insertMany(main)
        console.log("data",main.length)
        client.close()
     }     
     await consolidate() 
    } jam()
    
  