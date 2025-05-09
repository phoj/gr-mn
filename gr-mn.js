var http=require("http")
var https=require("https")
var message="startTime:"+new Date().toLocaleString('zh-CN',{timeZone:'Asia/Taipei'})
var pbfObj={},statistic
var minZ=0

fetch('https://raw.githubusercontent.com/wbjon/2510/main/0-18.txt')
.then(res=>{if(res.status!=200)console.error('錯誤碼',res.status);return res.text()})
.then(data=>{
 const arr=data.split('\n')
 console.log('欲讀取圖磚共',arr.length)
 statistic={CURRENT:[0,''],SUMMATION:arr.length,startTIME:'',HIT:0,HITratio:'',MISS:0,EXPIRED:0,endTIME:'',ERROR:{timeout:0,error:0}}
 for(const item of arr){
  const path=item.split('/')
  if(!pbfObj[path[0]])pbfObj[path[0]]={}
  if(!pbfObj[path[0]][path[1]])pbfObj[path[0]][path[1]]=[]
  pbfObj[path[0]][path[1]].push(+path[2])
 }
 console.log(Object.keys(pbfObj))
 check(minZ)
}).catch(err=>console.log("請求0-18.txt錯誤",err))

async function check(z){
 let sum=0,end
 if(z==minZ)statistic.startTIME=new Date().toLocaleString('zh-CN',{timeZone:'Asia/Taipei'})
 for(let x in pbfObj[z]){
  for(let y of pbfObj[z][x]){
   const url=`https://grmn.iqiq.cc/${z}/${x}/${y}.pbf`
   sum++;statistic.CURRENT[0]++;statistic.CURRENT[1]=url
   await new Promise(resolve=>{
    if(sum<=20)resolve()
    const req=https.get(url,{timeout:10000},res=>{res.destroy()
     let status=res.statusCode
     if(status!=200){
      if(!statistic.ERROR.hasOwnProperty(status))statistic.ERROR[status]=0
      statistic.ERROR[status]++
     }
     else{
      status=res.headers['cf-cache-status']
      if(!statistic.hasOwnProperty(status))statistic[status]=0
      statistic[status]++
      let ray=res.headers['cf-ray']
      ray=ray.split('-')[1]
      if(!statistic.hasOwnProperty(ray))statistic[ray]=0
      statistic[ray]++
     }
     isOk()
    }).on('error',err=>{if(!req.destroyed)statistic.ERROR.error++;isOk()})
    req.on('timeout',()=>{req.destroy(new Error('check timeout'));statistic.ERROR.timeout++})//req.destroy()會再觸發res.on('error'
    function isOk(){sum--;resolve();statistic.HITratio=((statistic.HIT||0)/statistic.CURRENT[0]*100).toFixed(2)+' %';loop()}
   })
  }
 }
 end=true;loop()
 function loop(){
  if(end&&sum==0){
   if(z==18){
    const sheet=data=>{
     fetch('https://script.google.com/macros/s/AKfycbwC42_mTmRl9XV5KTrWbU9o2mjAHJC3X_xj2VqEld9iLkGdrrQXI75xQ81V4hlEY473gA/exec?console='+encodeURIComponent(data))
     .then(res=>{if(res.status!=200){console.log('sheet status:',res.status);sheet(data)}}).catch(e=>{console.log('sheet error:',e);sheet(data)})
    }
    statistic.endTIME=new Date().toLocaleString('zh-CN',{timeZone:'Asia/Taipei'})
    sheet('gr-mn'+JSON.stringify(statistic))
    statistic={CURRENT:[0,''],SUMMATION:statistic.SUMMATION,startTIME:'',HIT:0,HITratio:'',MISS:0,EXPIRED:0,endTIME:'',ERROR:{timeout:0,error:0}};check(minZ)
   }else check(++z)}
 }
}

http.createServer((req,res)=>res.end(JSON.stringify(statistic))).listen(8080)

