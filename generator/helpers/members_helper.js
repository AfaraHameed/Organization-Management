var db = require('../config/connection')

module.exports = {

    addMember : (member,callback)=>{
        console.log( member )
        db.get().collection('member').insertOne(member).then((data)=>{
            callback(true)
        })
    }
}