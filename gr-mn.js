var http=require("http")
var https=require("https")
var readline=require('readline')
var port=8080
var message="startTime:"+new Date().toLocaleString('zh-TW',{timeZone:'Asia/Taipei'})+"(online_port:"+port+")"
var mjpg16="https://www.googleapis.com/drive/v3/files/1bFWa4-Sys39hCXneKAdoRPUrsfy60eH5?alt=media",
    mjpg17="https://www.googleapis.com/drive/v3/files/1i3B9uUW9fMmZMMN8r77bwL0A2mrkRGOl?alt=media",
    mjpg18A="https://www.googleapis.com/drive/v3/files/1SD5kv-52YRgMoyQX7Py_rV-A8dulN-Pk?alt=media",
    mjpg18B="https://www.googleapis.com/drive/v3/files/1UQKx7pJ5YjwbnjZlrBnyPLugjJazXV3w?alt=media",
    mjpg18C="https://www.googleapis.com/drive/v3/files/17APAqQ_NbAWdMMjD7mFBt4f5i8hbJCzP?alt=media",
    mjpg18D="https://www.googleapis.com/drive/v3/files/1B91QPrQ_9kmY5mFWP9_-IoP6QJ5cCZ-g?alt=media"
var mapJsonCompress={}

const headBuffer=Buffer.from('/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAEAAQADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwA='
                             ,'base64')
var auth;getAuth()
setInterval(getAuth,300000)
function getAuth(){
 //fetch('https://script.google.com/macros/s/AKfycbwC42_mTmRl9XV5KTrWbU9o2mjAHJC3X_xj2VqEld9iLkGdrrQXI75xQ81V4hlEY473gA/exec?node')
 fetch('https://id-oa.onrender.com/')
 .then(res=>res.text()).then(data=>{auth=data.split("\n").pop();console.log(auth)})
}

https.get('https://raw.githubusercontent.com/phoj/gr-mn/main/16_x_y_[42].txt',res=>{
 const rl=readline.createInterface({input:res,crlfDelay:Infinity})
 rl.on('line',line=>{
  const xy42=line.split('/'),arr42=xy42[2].split(',').map(Number)
  if(!mapJsonCompress[xy42[0]])mapJsonCompress[xy42[0]]={}
  mapJsonCompress[xy42[0]][xy42[1]]=arr42
 })
 rl.on('close',()=>{
  console.log('讀取16_x_y_[42].txt完成')/*
  let sum=0
  for(const[key,value] of Object.entries(mapJsonCompress)){sum++
   if(sum>10)break
   console.log(key,value)
  }*/
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
 const arr=req.url.split('/')
 if(arr.length!=4||!/^\d+$/.test(arr[2])||!/^\d+$/.test(arr[3])){res.end(message);return}

 //res.end(message);return



 var z=+arr[1],x=+arr[2],y=+arr[3]
 const url=mapUrl(),rangeArr=url.split('&')
 res.writeHead(200,{"access-control-allow-origin":"*"})
 if(rangeArr.length==3){
  https.get(url,{headers:{Authorization:auth,Range:`bytes=${rangeArr[1]}-${rangeArr[2]}`}},
   function(res1){
                  if(res1.statusCode!=206){console.log("請求google statusCode",res1.statusCode);res1.destroy();res.end();return}
                  let chunks=[headBuffer]
                  res1.on("data",function(data){chunks.push(data)})
                  res1.on("end",function(){res.end(Buffer.concat(chunks))})
                  res1.on("error",e=>{console.log("請求google res錯誤",e);res.end()})
                 }).on("error",e=>{console.log("請求google req錯誤",e);res.end()})
  return
 }
 fetch(url).then(res1=>res1.arrayBuffer()).then(buf=>res.end(buf)).catch(e=>{console.log('fetch錯誤',e);res.end()})
 function mapUrl(){
  var garminUrl="https://maptile.garmin.com.tw/numaps/latest"
  var grmn=[],n=Math.pow(2,z)//2的幾次方
  if(z<16){
   for(let i=0;i<z;i++){
    n/=2
    const xx=parseInt(x/n),yy=parseInt(y/n)
    if(xx==1&&yy==0){grmn[i]="/g"}
    else if(xx==0&&yy==0){grmn[i]="/r"}
    else if(xx==0&&yy==1){grmn[i]="/m"}
    else if(xx==1&&yy==1){grmn[i]="/n"}
    x=x%n
    y=y%n
   }
   for(const i in grmn)garminUrl+=grmn[i]
   garminUrl+=".png"
  }
  else{let xMod,yMod,index
   switch(z){
    case 16:
     garminUrl=mjpg16
     index=0
     break
    case 17:
     garminUrl=mjpg17
     xMod=x%2,yMod=y%2
     index=(xMod*2+yMod+1)*2
     x=Math.floor(x/2);y=Math.floor(y/2)
     break
    default:
     if(x<=218913)garminUrl=mjpg18A//Z18，min:217108、max:219914
     else if(218914<=x&&x<=219145)garminUrl=mjpg18B
     else if(219146<=x&&x<=219402)garminUrl=mjpg18C
     else if(219403<=x)garminUrl=mjpg18D
     xMod=x%4,yMod=y%4
     index=(xMod*4+yMod+5)*2
     x=Math.floor(x/4);y=Math.floor(y/4)
   }
   if(!(mapJsonCompress[x]&&mapJsonCompress[x][y]&&mapJsonCompress[x][y][index+1]))return mjpg16+`&${mapJsonCompress[54962][28075][0]}&${mapJsonCompress[54962][28075][1]}`
   garminUrl+=`&${mapJsonCompress[x][y][index]}&${mapJsonCompress[x][y][index+1]}`
  }
  return garminUrl
 }
}//proxyHandle


http.createServer(proxyHandle).listen(port)
