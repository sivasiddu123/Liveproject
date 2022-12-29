import moment from "moment-timezone";
import {MongoClient} from "mongodb";

const mClient = async () => {
    const uri = "mongodb+srv://admin:Adsi2022@arc02.2lutz.mongodb.net/LocalTest?retryWrites=true&w=majority";
  
    const client = new MongoClient(uri);
    return client;
  }; 
//   var today=moment().format("YYYY-MM-DD")
  var acc_number=process.argv[2]

  const client = await mClient()
    await client.connect()
    const data = await client.db("LocalTest").collection("fb_Acc").aggregate([{
    
        $match:
        {
            date_start: {
                $gte:"2022-12-03",$lte:"2022-12-03"
            }
        }
    },

    {$group:{_id:"$adset_id" , spend:{$sum:{'$toDouble':"$spend"}},leads:{$sum:{'$toDouble':"$leads"}},impressions:{$sum:{'$toDouble':"$impressions"}},campaign_name:{'$first': '$campaign_name'},clicks:{$sum:{'$toDouble':"$clicks"}},acc_number:{'$first': '$acc_number'},time_zone:{'$first': '$time_zone'},date_start:{'$first': '$date_start'},date:{'$first': '$date'},month:{'$first': '$month'},time_zone:{'$first': '$time_zone'},BST_timestamp:{'$first':'$BST_timestamp'},BST_date:{'$first':'$BSTDate'},BST_month:{'$first':'$BSTMonth'}}}

    ]).toArray()
    // console.log(data)

    var swipe=data.map((element)=>{
        return{
            Acc_number:element.acc_number,
            Adset_id:element._id,
            Spend:element.spend.toFixed(2),
            campaign_name:element.campaign_name,
            fb_lead:element.leads,
            Impressions:element.impressions,
            Clicks:element.clicks,
            Acc_timezone:element.time_zone,
            Account_date:element.date_start,
            BST_timestamp:element.BST_timestamp,
            // delet_date:today
        }
    })
    // console.log(swipe)
    async function slim(){
        const client=await mClient()

           await client.connect()
           await client.db("LocalTest").collection("fb_consolidate").deleteMany({acc_number:acc_number})
        //    acc_number:acc_number,delet_date:today
           await client.db("LocalTest").collection("fb_consolidate").insertMany(swipe)

           // await client.db("LocalTest").collection("Moment_fb").deleteMany({})
           console.log("data in DB",swipe.length)
           client.close()
       }
       slim()
    


  