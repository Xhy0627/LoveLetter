// JS contract
Duktape.modSearch = function (id) {
    var name;
    var src;
    var found = false;
    name = './vm/duktape/js_lib/' + id + '.js';
    src = load_js(name);
    if (typeof src === 'string') {
        print('loaded ECMAScript:', name);
        found = true;
    };
    if (!found) {
        throw new Error('module not found: ' + id);
    };
    return src;
}

var Bottos = require('index')
var Lib = Bottos.Lib
var Storage = Bottos.Storage
var console = Bottos.console




//表白方法
//1.表白者 输入地址 以及表白信息 选择贺卡
//最终将信息存储在链上 在geiUnburden导出信息
function unburden1() {
  var params = Lib.getParams()
  var table = "unburden1"//table是否可以随意命名
  var key = params.account //获取信息
  //key=""; 赋的值 是从页面获取
  //序列化
  var packStr = Lib.getPack(params)
  //send
  //发送给链
  Storage.set(table,key,packStr)//将adress
  return 0
}


function unburden2(){
  var params = Lib.getParams()
  var table = "unburden2"//table是否可以随意命名
  var key = params.to //获取信息
  //key=""; 赋的值 是从页面获取
  //序列化
  var packStr = Lib.getPack(params)
  //send
  //发送给链
  Storage.set(table,key,packStr)//将adress
  return 0
}

function getUnburden2() {
  var params = Lib.getParams()
  var contract = params.to
  var table = "unburden"
  var key = params.to
  //call
  //从链上读取信息
  var userinfo = Storage.get(contract,table,key)
  //反序列化
  var unpacnObj = Lib.getUnpack(userinfo.binValue)

  print(JSON.stringify(unpacnObj))
  //输出string

  return 0
}
//
function getUnburden1() {
  var params = Lib.getParams()
  var contract = params.account
  var table = "unburden"
  var key = params.account
  //call
  //从链上读取信息
  var userinfo = Storage.get(contract,table,key)
  //反序列化
  var unpacnObj = Lib.getUnpack(userinfo.binValue)

  print(JSON.stringify(unpacnObj))
  //输出string

  return 0
}



// // regist user
// function reguser(){
//     var params = Lib.getParams()
//     var table = "users"
//     var key = params.account
//
//     //key=""; 赋的值 是从页面获取
//     //序列化
//     var packStr = Lib.getPack(params)
//     //send
//     //发送给链
//     Storage.set(table,key,packStr)
//     ret