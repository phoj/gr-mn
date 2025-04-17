var http=require("http")
var message="startTime:"+new Date().toLocaleString('zh-CN',{timeZone:'Asia/Taipei'})

var arr
get()
function get(){
 fetch('https://raw.githubusercontent.com/wbjon/2510/main/0-18.txt')
 .then(res=>{if(res.status!=200)console.error('錯誤碼',res.status);return res.text()})
 .then(data=>{
  arr=data.split('\n')
  console.log('欲讀取圖磚共',arr.length)
  arr.length=0
 }).catch(err=>console.log("請求0-18.txt錯誤",err))
 setTimeout(get,3000)
}



http.createServer(function(req,res){
 if(req.url=='/favicon.ico'){res.end();return}
 res.writeHead(200,{"content-type":"text/plain;charset=utf-8"})
 res.end(message)
}).listen(8080)


