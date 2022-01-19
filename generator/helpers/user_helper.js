var db = require('../config/connection')
var collection = require('../config/collection')

module.exports = {
    getProfile:(id)=>{
        console.log('hai profile')
        return new Promise(async(resolve,reject)=>{
            let member=await db.get().collection(collection.MEMBER_COLLECTION).findOne({regId:id})
            resolve(member)
        })
    }  
    
}