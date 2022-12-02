// customer_guid=EC84F725-70B1-43E7-AECC-1C4E6B0CBBA6&customer_key=8CUT7W83R
import { xml2json } from "xml-js";
import axios from "axios";
import { MongoClient } from "mongodb";
// import moment from "moment";
import moment from "moment-timezone";

const mClient = async () => {
    const uri = "mongodb+srv://admin:Adsi2022@arc02.2lutz.mongodb.net/LocalTest?retryWrites=true&w=majority";
  
    const client = new MongoClient(uri);
  
    return client;
  };
  var today1= moment().format('YYYY-MM-DD')
  var yesterday = moment().subtract(1, "days").format("MM/DD/YYYY")
    var today = moment().format("MM/DD/YYYY")
  // var today="11/30/2022"
  // var yesterday="11/30/2022"
async function abc(){
  var dd=[];
async function sum(){
    var pages=[]
    const response =await axios.get(`https://pubconsole.media.net/api/reports/v1/hourly-channel-wise?customer_guid=EC84F725-70B1-43E7-AECC-1C4E6B0CBBA6&customer_key=8CUT7W83R&from_date=${yesterday}&to_date=${today}&page_size=5000&page_number=1`)
    
    // console.log("res", response.data)
    var result = xml2json(response.data, { compact: true, ignoreComment: true, spaces: 4 });
    var json = JSON.parse(result);
    var siddu=json.reportStats.statsData.reportItem
    // console.log("str", json.reportStats._attributes.totalPages)
    var len = parseInt(json.reportStats._attributes.totalPages)
    // console.log(json)
    pages.push(...siddu)
    // console.log(pages.length)      

    for(var i=2;i<=len;i++){
        const response2 =await axios.get(`https://pubconsole.media.net/api/reports/v1/hourly-channel-wise?customer_guid=EC84F725-70B1-43E7-AECC-1C4E6B0CBBA6&customer_key=8CUT7W83R&from_date=${yesterday}&to_date=${today}&page_size=5000&page_number=${i}`)

        var result = xml2json(response2.data, { compact: true, ignoreComment: true, spaces: 4 });
        var json = JSON.parse(result);
        var siddu2=json.reportStats.statsData.reportItem
        pages.push(...siddu2)
    }
    // console.log(pages)
    var mnet2 = pages.map((element) => {
    const ST = new Date(element._attributes.date);
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
        return {
          date:moment(element._attributes.date).format('YYYY-MM-DD'),
          name:"Digital",
          delet_date:today1,
          m_hour:moment(element._attributes.date).format('HH'),
          channelName:element._attributes.channelName,
          channelName2:element._attributes.channelName2,
          adset_id:element._attributes.channelName3,
          impressions:element._attributes.impressions,
          totalClicks:element._attributes.totalClicks,
          estimatedRevenue:element._attributes.estimatedRevenue.slice(1,5),
          // CDTDate:moment(element._attributes.date).tz("America/Chicago").format("DD"),
          // CDTMonth:moment(element._attributes.date).tz("America/Chicago").format("MM"),
          // CDTHour:moment(element._attributes.date).tz("America/Chicago").format("HH"),
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
  // console.log("shoe",mnet2)
  dd.push(...mnet2)
}
await sum();
// console.log(dd)
async function db(){
  const client = await mClient()
          //    console.log("slope", slope)
             await client.connect()
             await client.db("LocalTest").collection("Mnet_ABD").deleteMany({name:"Digital",delet_date:today1});
            // //  moment_mnet
          //   {name:"Adsi",delet_date:today}
             
             await client.db("LocalTest").collection("Mnet_ABD").insertMany(dd)
          //   const data = await client.db("LocalTest").collection("sope").find({}).toArray()
            console.log("data in DB",dd.length)
            client.close()
}
await db()
}
abc()