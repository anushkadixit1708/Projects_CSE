const cheerio = require('cheerio');
var express = require('express'); 
const axios = require('axios');
const fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
const puppeteer = require('puppeteer');
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');
var app     = express(); 

app.set('view engine' , 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const writeStream = fs.createWriteStream('data.csv');

function scrapping(productURL){
    const dataa = [];
    return new Promise((resolve) => {
      axios.get(productURL)
      .then((response) => {
        const $ = cheerio.load(response.data);
                // Load the review comments
                const reviews = $('.review');
                    reviews.each((i, w) => {
                        // Find the review comments
                        const textReview = $(w).find('.review-text').text().replace(/\s\s+/g, '');
                        // Write Row To CSV
                        writeStream.write(`${textReview}\n`);
                        //pushing data in array
                        dataa.push(`${textReview}` );
                    });
            // console.log(dataa);
            // console.log('data saved!');
            resolve(dataa)
              
      }).catch(function (err) {
        console.log(err);
    })
 })
}

const mlOutput = async (arrayData)=>{
    const temp = arrayData.map(elem => {
        return axios.get('https://afrd.herokuapp.com/', {
            params: {
            query:elem
            }
        }).then ((resp)=> {
            return resp.data;
        }).catch((error)=>{return error});
    })

    const values = await Promise.all(temp)
    console.log(values)
    const prediction = [];
    const confidence = [];
    values.forEach(val => {
        prediction.push(val.prediction);
        confidence.push(val.confidence);
    })
    return [prediction, confidence];
};

async function getoutput(productURL){
    let result = 0;
    let fakeReview = 0;
    let percentFakeReview;
    let averageConfidence;
    const dataa = await scrapping(productURL);
    const [prediction, confidence] = await mlOutput(dataa);
    // console.log(prediction, confidence);
    for(let j=0; j <prediction.length; j++){
        if(prediction[j]==1){
          result += confidence[j];
          fakeReview += 1;
        }
      }
      percentFakeReview = ((fakeReview)/(prediction.length))*100;
      averageConfidence = result/fakeReview;
      console.log("sum of confidence ="+ result,"No of fake reviews ="+ fakeReview,"percentage of fake review ="+ percentFakeReview,"average confidence =" + averageConfidence, "for URl =" + productURL);
      if(percentFakeReview >= 65){
        let message = "Very high number of fake reviews";
        let message2 = "Product not recomended for purchase";
      }else{
        message = "Low number of fake reviews";
        message2 = "Product recomended for purchase";
      }
      let jsondata = {"percentFakeReview" : percentFakeReview, "averageConfidence" : averageConfidence, "fakeReview" : fakeReview,
       "message" : message, "messasge2" : message2};
      return jsondata;
      // console.log(jsondata);
};

// for tracking price
async function configureBrowser(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  return page;
}

async function checkPrice(page) {
  await page.reload();
  let html = await page.evaluate(() => document.body.innerHTML);
  // console.log(html);

  $('#priceblock_dealprice', html).each(function() {
      let dollarPrice = $(this).text();
      // console.log(dollarPrice);
      let currentPrice = Number(dollarPrice.replace(/[^0-9.-]+/g,""));

      if (currentPrice < 300) {
          console.log("BUY!!!! " + currentPrice);
          sendNotification(currentPrice);
      }
  });
}

async function startTracking(url) {
  const page = await configureBrowser(url);

  let job = new CronJob('* */30 * * * *', function() { //runs every 30 minutes in this config
    checkPrice(page);
  }, null, true, null, null, true);
  job.start();
}

async function sendNotification(price) {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '@gmail.com',
      pass: '***'
    }
  });

  let textToSend = 'Price dropped to ' + price;
  let htmlText = `<a href=\"${url}\">Link</a>`;

  let info = await transporter.sendMail({
    from: '"Price Tracker" <@gmail.com>',
    to: '',
    subject: 'Price dropped to ' + price, 
    text: textToSend,
    html: htmlText
  });

  console.log("Message sent: %s", info.messageId);
}


//routes  
app.get("/form", (req,res)=>{
  res.render('collectURL');
});

app.get("/", (req,res)=>{
  res.render('index');
});

app.post('/result', async(req, res)=> {
  // console.log(req.body.link);
  // startTracking(req.body.link);
  try{
    
    let data = await getoutput(req.body.link);
    // res.send(data);
    // console.log(data);
    res.render('form', {percentFakeReview : data.percentFakeReview, averageConfidence : data.averageConfidence, fakeReview : data.fakeReview, message : data.message, messasge2 : data.message2 });

  }catch(err){
    throw err;
  }
  
  // console.log(data);
  
});
  
app.use((err,req,res,next)=>{
  res.send(err);
})

let port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log("listening to port 3000");
})