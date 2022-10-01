
var axios = require("axios");
var qs = require("qs");const sendMessage = (text, phone) => {
    
  var data = qs.stringify({
    channel: "whatsapp",
    source: "917834811114",
    destination: phone,
    message: `{"type":"text","text":"${text}"}`,
    "src.name": "Virtualization",
  });
  var config = {
    method: "post",
    url: "https://api.gupshup.io/sm/api/v1/msg",
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
      apikey: "l5mrdryfaovm27rjeat6mzfobs4ysxwm",
      "cache-control": "no-cache",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

module.exports = sendMessage