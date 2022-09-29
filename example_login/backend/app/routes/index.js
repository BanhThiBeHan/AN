const auth  = require('./auth.routes')
const users = require('./users.routes')
const music = require('./music.routes')
module.exports = {
    auth,
    users,
    music,
}