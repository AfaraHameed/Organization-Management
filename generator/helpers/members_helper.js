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
    },
    insertLoanInstallment:(loanInstallment)=>{
        return new Promise(async(resolve,reject)=>{
            loanInstallment.amount = parseInt(loanInstallment.amount)
            db.get().collection(collection.LOAN_INSTALLMENT).insertOne(loanInstallment)
           // resolve(loan)

       
            let balance_loan = db.get().collection(collection.LOAN_WITHDRAWAL).aggregate([
                {
                $match:
                 { RegId: loanInstallment.RegId  }
                },
                 {
                    $project: {
                        loan_balance: { $subtract: [{'$convert': { 'input': '$amount', 'to': 'int' }}, loanInstallment.amount ] }
                    }
                },
                {
                    $set:{
                        amount:'$loan_balance'
                    }
                }
            
        ]).toArray()
        resolve(balance_loan)



        
        //     db.get().collection(collection.LOAN_WITHDRAWAL).updateOne({ RegId: loanInstallment.RegId },
        //         {$set:
        //         {
        //             //amount:{ $subtract: [{'$convert': { 'input': '$amount', 'to': 'int' }}, loanInstallment.amount ] } 
        //        amount:{$subtract:['$amount',loanInstallment.amount ]}
        //         }
        //     })
            
        //     resolve(loanInstallment)
        // })
    })
    // updateLoanWithdrawal:(loan)=>{
    //     return new Promise(async(resolve,reject)=>{
    //         console.log("update hai")
    //         db.get().collection(collection.LOAN_WITHDRAWAL).updateOne({ RegId: loan.RegId },
    //         {
    //              $subtract: ["amount", loan.amount ] 
    //         }).then((response) => {
    //             resolve(true)
    //         })

    //     })
       

    // }
    
},

updateLoanWithdrawal:(balance_loan,loanbody)=>{
    return new Promise(async(resolve,reject)=>{
        db.get().collection(collection.LOAN_WITHDRAWAL).updateOne({RegId:loanbody.RegId},
            {
            $set:
            {amount:balance_loan}
            }
        )
        resolve(balance_loan)

    })
},
getLoanWithdrawal:(loanbody)=>{
    return new Promise(async(resolve,reject)=>{
        let balance = db.get().collection(collection.LOAN_WITHDRAWAL).find({RegId:loanbody.RegId}).toArray()
       console.log('balance loasn is:'+balance)
        resolve(balance)
    })
   
},
getLoanWithdrawalMembers:()=>{
    return new Promise(async(resolve,reject)=>{
        let members = db.get().collection(collection.LOAN_WITHDRAWAL).find().toArray()
        resolve(members)
    })

}
}