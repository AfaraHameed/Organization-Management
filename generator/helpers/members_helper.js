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
    } ,
    getNameEmail:(RegId)=>{
        return new Promise(async(resolve,reject)=>{
            console.log('hai')
            console.log(RegId)
            let member = await db.get().collection(collection.MEMBER_COLLECTION).find({regId:RegId}).toArray()
            resolve(member)
        })
    },
    insertInstallment:(installment)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collection.INSTALLMENT_COLLECTION).insertOne(installment)
            resolve(installment)
        })
    },
    getMonthlyInstallment:(RegId)=>{
    return new Promise(async(resolve,reject)=>{
        console.log('regId '+RegId)
        let installment = await db.get().collection(collection.INSTALLMENT_COLLECTION).find({RegId:RegId}).toArray()
        resolve(installment)
    })
    },
    insertLoan:(loan)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collection.LOAN_WITHDRAWAL).insertOne(loan)
            resolve(loan)
        })
    }
    
}