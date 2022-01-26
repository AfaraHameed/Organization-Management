var db = require('../config/connection')
var collection = require('../config/collection')
var bcrypt = require('bcrypt')
module.exports = {

    addMember : (member)=>{
        console.log( member )
        return new Promise(async(resolve,reject)=>{

            member.password = await bcrypt.hash(member.password,10)
            db.get().collection('member').insertOne(member).then((data)=>{
                resolve(data)
        })
       
        })
    },
    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.MEMBER_COLLECTION).findOne({ regId: userData.regId })
            if (user) {
                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                    
                        console.log('login success')
                        response.user = user
                        response.status = true
                        resolve(response)
                    }
                    else {
                        console.log('password incorrect')
                        resolve({ status: false })
                    }
                })
            }
            else {
                console.log('login failed')
                resolve({ status: false })
            }
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
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.INSTALLMENT_COLLECTION).insertOne(installment).then((response)=>{
                resolve(installment)
            })
           
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
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.LOAN_WITHDRAWAL).insertOne(loan).then((loan)=>{
                resolve(loan)
            })
           
        })
    },
    insertLoanInstallment:(loanInstallment)=>{
        return new Promise(async(resolve,reject)=>{
            loanInstallment.amount = parseInt(loanInstallment.amount)
            await db.get().collection(collection.LOAN_INSTALLMENT).insertOne(loanInstallment)
           // resolve(loan)

       
            let balance_loan = await db.get().collection(collection.LOAN_WITHDRAWAL).aggregate([
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



        
      
    })
    
    
},

updateLoanWithdrawal:(balance_loan,loanbody)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.LOAN_WITHDRAWAL).updateOne({RegId:loanbody.RegId},
            {
            $set:
            {amount:balance_loan}
            }
        ).then((balance_loan)=>{
            
            resolve(balance_loan)
        })
       

    })
},
getLoanWithdrawal:(loanbody)=>{
    return new Promise(async(resolve,reject)=>{
        let balance = await db.get().collection(collection.LOAN_WITHDRAWAL).find({RegId:loanbody.RegId}).toArray()
       console.log('balance loasn is:'+balance)
        resolve(balance)
    })
   
},
getLoanWithdrawalMembers:()=>{
    return new Promise(async(resolve,reject)=>{
        let members = await db.get().collection(collection.LOAN_WITHDRAWAL).find().toArray()
        resolve(members)
    })

},
deleteLoanWithdrawal:(loanbody)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.LOAN_WITHDRAWAL).deleteOne({RegId:loanbody.RegId}).then((result)=>{
            resolve(result)
        })
        
    })
},
deleteLoanInstallment:(loanbody)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.LOAN_INSTALLMENT).deleteMany({RegId:loanbody.RegId}).then((result)=>{
            console.log('deleting loan installment record')
            resolve(result)
    
        })
       
    })

},
getTotalMonthlyInstallment:(regId)=>{
    return new Promise(async(resolve,reject)=>{
        console.log("hai total"+regId)
        let sum = await db.get().collection(collection.INSTALLMENT_COLLECTION).aggregate(
            [
                {
                    $match: {
                           RegId: regId
                    }
                 },
                {
                    $group : 
                    {
                        _id : "$RegId", sum : {$sum : {'$convert': { 'input': '$amount', 'to': 'int' }}}
                    }
                },
                {
                    $project: {
                           sum: 1
                  }
                }
                
        ]).toArray()
            
            console.log('sum:'+sum)
            resolve(sum)
        
    })
},
memberDetailLoanBalance:(regId)=>{
    return new Promise(async(resolve,reject)=>{
        let balance = await db.get().collection(collection.LOAN_WITHDRAWAL).find({RegId:regId}).toArray()
       console.log('balance loasn is:'+balance)
        resolve(balance)
    })
   
},
getEachMembers:(RegId)=>{
    return new Promise(async(resolve,reject)=>{
        let member =await db.get().collection(collection.MEMBER_COLLECTION).findOne({regId:RegId})
        console.log(RegId)
        console.log('member:'+member)
        resolve(member)
    })
    },
    updateMember:(member)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.MEMBER_COLLECTION).updateOne({regId:member.regId},
                {
                $set:
                {userName:member.userName,email:member.email,phone:member.phone,regId:member.regId,role:member.role}
                }
            ).then((balance_loan)=>{
                
                resolve(balance_loan)
            })
           
    
        })
    },
    getMonthlyInstallmentByYear:(RegId,body)=>{
        return new Promise(async(resolve,reject)=>{
            year=body.year
            console.log('regId '+RegId)
            console.log('year '+body.year)
            // let installment = await db.get().collection(collection.INSTALLMENT_COLLECTION).find({$expr: {
            //     $and: [
            //         {
            //             RegId:RegId
            //         }
            //         ,
            //       {
            //         "$eq": [
            //           {
            //             "$year": "$date"
            //           },
            //           year
            //         ]
            //       }
            //     ]
            //   }}).toArray()
            
            let installment = await db.get().collection(collection.INSTALLMENT_COLLECTION).aggregate([ {
                $project: {
                   date: {
                      $dateFromString: {
                         dateString: '$date',
                        
                      }
                   }
                }
            },
            {
                $project:{
                    date:1,
                    Year: {
                        $year: "$date"
                      },
                      Month: {
                        $month: "$date"
                      }
                      
                      },
                      
                }
            }
           ,
           
                {
                    $match:{
                        // $and:[
                        //     {RegId:RegId},
                        //     {
                        //         name:"helo"
                        //     }
                        // ]
                        RegId:RegId,
                        name:"helo"
                    }
                },
                {
                    $project:{
                       // date:1,Year:1
                       amount:1
                    }
                }
              ]).toArray()
              console.log("installment"+installment.amount)
             // console.log("installment"+installment[0].Year)
            resolve(installment)
        })
    },
    getLoanInstallment:(regId)=>{
        return new Promise(async(resolve,reject)=>{
            console.log('regId '+regId)
            let LoanInstallment = await db.get().collection(collection.LOAN_INSTALLMENT).find({RegId:regId}).toArray()
            console.log(LoanInstallment)
            resolve(LoanInstallment)
        })

    },
    getTotalLoanInstallment:(regId,)=>{
        return new Promise(async(resolve,reject)=>{
            console.log("hai total"+regId)
            let sum = await db.get().collection(collection.LOAN_INSTALLMENT).aggregate(
                [
                    {
                        $match: {
                               RegId: regId
                        }
                     },
                    {
                        $group : 
                        {
                            _id : "$RegId", sum : {$sum : {'$convert': { 'input': '$amount', 'to': 'int' }}}
                        }
                    },
                    {
                        $project: {
                               sum: 1
                      }
                    }
                    
            ]).toArray()
                
                console.log('sum:'+sum)
                resolve(sum)
            
        })
    },
    getLoanWithdrawal:(regId)=>{
        return new Promise(async(resolve,reject)=>{
            let balance = await db.get().collection(collection.LOAN_WITHDRAWAL).find({RegId:regId}).toArray()
           console.log('balance loasn is:'+balance)
            resolve(balance)
        })
       
    }
}