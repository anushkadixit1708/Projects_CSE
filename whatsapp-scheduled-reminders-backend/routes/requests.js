const express = require("express");

const router = express.Router();
var axios = require("axios");
var qs = require("qs");
const sendMessage = require("../sendmessage");
const Queue = require('bull')
const queue = Queue("whatsapp",{ redis: { port: 6379, host: 'redis-server'} })

queue.process(function(job, done){
  sendMessage(job.data.text, job.data.phone)
  done()
})

router.post("/", (req, res) => {
  console.log(req.body);
    const text = req.body.text
    const phone = req.body.phone
   console.log(req.body.seconds)
    queue.add(req.body, {delay: req.body.seconds});
   

  res.sendStatus(200);
});


module.exports = router;
