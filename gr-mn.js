var http=require("http")
var https=require("https")
var readline=require('readline')
var port=8080
var message="startTime:"+new Date().toLocaleString('zh-TW',{timeZone:'Asia/Taipei'})+"(online_port:"+port+")"
var mapJsonCompress={}



https.get('https://raw.githubusercontent.com/phoj/gr-mn/main/16_x_y_[42].txt',res=>{
 const rl=readline.createInterface({input:res,crlfDelay:Infinity})
 rl.on('line',line=>{
  const xy42=line.split('/'),arr42=xy42[2].split(',')
  if(!mapJsonCompress[xy42[0]])mapJsonCompress[xy42[0]]={}
  mapJsonCompress[xy42[0]][xy42[1]]=arr42
 })
 rl.on('close',()=>{
  console.log('讀取完成')
  let sum=0
  for(const[key,value] of Object.entries(mapJsonCompress)){sum++
   if(sum>10)break
   console.log(key,value)
  }
 })
})





/*
fetch('https://raw.githubusercontent.com/phoj/gr-mn/main/16.txt')
.then(res=>{if(res.status!=200)console.error('錯誤碼',res.status);return res.text()})
.then(data=>{
 const arr=data.split('\n')
 console.log('zoom=16圖磚共',arr.length)
 for(const item of arr){
  const xy=item.split('/')
  if(!Obj16[xy[0]])Obj16[xy[0]]={}
  Obj16[xy[0]][xy[1]]=test
 }
 let sum=0
 for(const[key,value] of Object.entries(Obj16)){sum++
  if(sum>10)break
  console.log(key,value)
 }

}).catch(err=>console.log("請求16.txt錯誤",err))*/

var proxyHandle=function(req,res){
 res.writeHead(200,{"content-type":"text/plain;charset=utf-8"});res.end(message)
}//proxyHandle
http.createServer(proxyHandle).listen(port)
