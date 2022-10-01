const Queue = require('bull')

module.exports = function(redis_connection_string){
    return new Queue("whatsapp", redis_connection_string)
}