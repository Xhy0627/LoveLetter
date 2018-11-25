var BottosWalletSDK = window.BottosWalletSDK
const config = {
    baseUrl:'http://192.168.52.130:8689/v1',
    version:1
}
var SDK = new BottosWalletSDK(config)
var Tool = SDK.Tool
var Wallet = SDK.Wallet
var Contract = SDK.Contract
var Api = SDK.Api

let account = 'd690667607'
let password = 'DZS113155'
let keystore = {"crypto":{"cipher":"aes-128-ctr","cipherparams":{"iv":"4e9a9aedb3093ccf187d32d86ed0ab6c"},"ciphertext":"61e8c35baf1c63f9ec7f4e399c117bd97395857c53ba36abf354b9e4c1723a00","kdf":"scrypt","kdfparams":{"dklen":32,"n":65536,"p":1,"r":8,"salt":"e3aff242b9beddcbcd6eb0ee2641e37a192a461a6b327db534030501414a9805"},"mac":"7715b3ac342e1866bf0a2f39abee30d81297ed8a5972bff98d0f20f80f923d32"},"id":"da7ee5c4-7b30-4a60-87f5-7a0bda5f2d96","version":3,"account":"d690667607"}

// 创建账户
function createAccount(){
    console.log("createAccount")
    let params = {account:account,password:password}
    Wallet.createAccount(params)
        .then(response=>{
            keystore = response
            document.getElementById('createAccount').innerHTML = JSON.stringify(response)
        }).catch(error=>{
            console.log({error})
            document.getElementById('createAccount').innerHTML = JSON.stringify(error)

        })
}

// 调用合约
function callContract(requestParam){
    let params = {
        method:'reguser',
        contract:'d690667607',
        sender:account,
        param:{
            userName:'d690667607',
            userInfo:JSON.stringify({height:'110120',age:18})
        }
    }

    if(keystore == null){
        alert('请先创建账户')
        return
    }
    let privateKey = Wallet.recover(password,keystore)
    let privateKeyStr = Tool.buf2hex(privateKey)

    Contract.callContract(params,privateKeyStr)
        .then(response=>{
            console.log({response})
            document.getElementById('pushTransaction').innerHTML = JSON.stringify(response)
        }).catch(error=>{
            console.log({error})
            document.getElementById('pushTransaction').innerHTML = JSON.stringify(error)
        })
}

// 发布联系人
function pushTransaction(){
    console.log("pushTransaction")
    callContract()
}

// 读取联系人
function getTransaction(){
    console.log("getTransaction")
    // callContract()
    let url =  config.baseUrl + '/common/query'
    let params = {
        contract:'d690667607',
        object:'getuserinfo',
        key:'d690667607'

    }

    fetch(url,{
        method:'POST',
        body:JSON.stringify(params)
    }).then(function(response){return response.json()})   
    .then(function(response){
        document.getElementById('getTransaction').innerHTML = JSON.stringify(response)
    }).catch(function(error){
        document.getElementById('getTransaction').innerHTML = JSON.stringify(error)
    })
}