var arr
get()
function get(){
 fetch('https://raw.githubusercontent.com/wbjon/2510/main/0-18.txt')
 .then(res=>{console.log(res.status);return res.text()})
 .then(data=>{
  arr=data.split('\n')
  console.log('欲讀取圖磚共',arr.length)
 }).catch(err=>console.log("請求0-18.txt錯誤",err))
 //setTimeout(get,3000)
}



