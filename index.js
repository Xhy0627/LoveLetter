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
// 调用合约
function callContract(requestParam){
    let params = {
        method:'unburden2',
        contract:account,
        sender:account,
        param:{
            //userName:account,
			var account =document.getElementById("account").value;
			var to =document.getElementById("to").value;
			var unburdenInfo =document.getElementById("submit").value;
			var time =document.getElementById("time").value;
            userInfo:JSON.stringify({account:account,to: to, unburdenInfo :unburdenInfo, time:time})
        }
    }

   /* if(keystore == null){
        alert('请先创建账户')
        return
    }*/
   /* let privateKey = Wallet.recover(password,keystore)
    let privateKeyStr = Tool.buf2hex(privateKey)

    Contract.callContract(params,privateKeyStr)
        .then(response=>{
            console.log({response})
           // document.getElementById('pushTransaction').innerHTML = JSON.stringify(response)
        }).catch(error=>{
            console.log({error})
            document.getElementById('pushTransaction').innerHTML = JSON.stringify(error)
        })*/
}

// 写信
function pushTransaction(){
    console.log("unburden2")
    callContract()
}

// 获取信息
function getTransactions(){
   //  callContract()
    let url =  config.baseUrl + '/common/query'
    let params = {
        contract:account,
        object:'getUnburden1',
        key:account
    }
	
    fetch(url,{
        method:'POST',
        body:JSON.stringify(params)
    }).then(function(response){return response.json()})	
    .then(function(response){
        document.getElementById('getUnburden1').innerHTML = JSON.stringify(response)
		var data= JSON.stringify(response)
		document.getElementById('account').innerHTML = data.account
		document.getElementById('to').innerHTML = data.to
		document.getElementById('unburdenInfo').innerHTML = data.unburdenInfo
		document.getElementById('time').innerHTML = data.time
    }).catch(function(error){
        document.getElementById('getTransaction').innerHTML = JSON.stringify(error)
    })
}