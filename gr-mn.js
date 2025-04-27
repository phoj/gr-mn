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
    mjpg18D="https://www.googleapis.com/drive/v3/files/1B91QPrQ_9kmY5mFWP9_-IoP6QJ5cCZ-g?alt=media",
z_x_y_42txt='https://www.googleapis.com/drive/v3/files/1MSyrMKuFQGV8RXvmkgR8w9d-Q4mMZK45?alt=media'
var mapJsonCompress={}
const headBuffer=Buffer.from('/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAEAAQADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwA='
                             ,'base64')
var blank,position=0,total=Infinity

https.get('https://raw.githubusercontent.com/wbjon/2510/main/16/54962/28075.jpg',res=>{
 const chunks=[]
 res.on('data',chunk=>chunks.push(chunk))
 res.on('end',()=>{
  blank=Buffer.concat(chunks);
  console.log('16/54962/28075.jpg空圖大小',blank.length,'bytes')
 })
})

var auth;getAuth()
setInterval(getAuth,300000)
function getAuth(){
 fetch('https://script.google.com/macros/s/AKfycbwC42_mTmRl9XV5KTrWbU9o2mjAHJC3X_xj2VqEld9iLkGdrrQXI75xQ81V4hlEY473gA/exec?node')
 .then(res=>res.text()).then(data=>{
  data=data.split("\n").pop();console.log(data)
  if(auth){auth=data;return};auth=data
  https.get(z_x_y_42txt,{headers:{Authorization:auth}},res=>{
   const rl=readline.createInterface({input:res,crlfDelay:Infinity})
   rl.on('line',line=>{
    const xy42=line.split('/'),arr42=xy42[2].split(',').map(Number)//map(Number)將字串陣列轉為數字陣列
    if(!mapJsonCompress[xy42[0]])mapJsonCompress[xy42[0]]={}
    mapJsonCompress[xy42[0]][xy42[1]]=arr42
   })
   rl.on('close',()=>{
console.log('讀取16_x_y_[42].txt完成')
let sum=0
for(const[key,value] of Object.entries(mapJsonCompress)){sum++
 if(sum>10)break
 console.log(key,value)
}

})
  })
 }).catch(e=>console.log('getAuth錯誤',e))
}




