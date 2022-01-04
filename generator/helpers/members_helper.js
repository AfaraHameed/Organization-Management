var db = require('../config/connection')
var collection = require('../config/collection')

module.exports = {

    addMember : (member,callback)=>{
        console.log( member )
        db.get().collection('member').insertOne(member).then((data)=>{
            callback(true)
        })
    },
    getMembers:()=>{
        
        return new Promise(async(resolve,reject)=>{
            let members =await db.get().collection(collection.MEMBER_COLLECTION).find().toArray()
            resolve(members)
        })
    } 
    
}