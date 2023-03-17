const bcrypt = require('bcrypt')

const data = {
    users:[
        {
            "email":"kakashihatake@gmail.com",
            "password":bcrypt.hashSync('IchaIcha', 8),
            "followers":[],
            "following":[],
        },
        {
            "email":"narutouzumaki@gmail.com",
            "password":bcrypt.hashSync('sasuke', 8),
            "followers":[],
            "following":[],
        }
    ]
}

module.exports = data