let curans = ""
let histor = [];
let membernum = 0;
function checktheletter(ans){
  let xans = "";
  ans = ans.toUpperCase();
  for(let i = 0 ;i<ans.length;i++){
    if(ans.charCodeAt(i)<=68 & ans.charCodeAt(i)>=65){
      xans+=ans[i];
    }
  }
  return xans;
}

document.getElementById("save").addEventListener("click",function(){
  if(document.getElementById("curans").value === null){
    alert("正確答案尚未輸入")
  }
  else{
    let curan = document.getElementById("curans").value;
    curans = checktheletter(curan);
    for(let i =1;i<=curans.length;i++){
      histor.push(0);
    }
    alert("正確答案已更新")
    membernum=0;
    histor = [];
  }
})

document.getElementById("check").addEventListener("click" , function(){
  if(curans === "")alert("請先輸入正確答案")
  else if(document.getElementById("stdans").value === null){
    alert("答案尚未輸入")
  }
  else{
    stdans = document.getElementById("stdans").value;
    stdans = checktheletter(stdans);
    let arr = [];
    if(stdans.length!==curans.length){
      alert("輸入的答案數量不對")
    }
    else{
      for(let i = 0;i<curans.length;i++){
        if(stdans[i]!==curans[i]){
          arr.push(i+1);
        }
      }
      showthesta(arr);
      //alert("對完答案了!");
    }
  }
})

function showthesta(arr){
  let show = document.getElementById("show");
  let prin = "";
  console.log(arr);
  membernum+=1;
  if(document.getElementById("sele").value === "聽力"){
    for(let i in arr){
      histor[arr[i]]++;
      prin+=arr[i]+" ";
    }
  }
  else{
    for(let i in arr){
      prin+=`1${arr[i]} `;
    }
  }
  if(arr.length === 0){
    show.innerHTML = `
    <p>全對!</p>
    <button id="back">下一位</button>`;
  }
  else{
    show.innerHTML = `
  <p>錯題如下:</p>
  <p>${prin}</p>
  <button id="back">下一位</button>`;
  }
  document.getElementById("back").addEventListener("click" ,function(){
    document.getElementById("stdans").value = "";
    document.getElementById("show").innerHTML = "";
    document.getElementById("stdans").click;
  })
}
document.getElementById("analyze").addEventListener("click",function(){
  let reslut = new Map();
  for(let i in histor){
    reslut.set(i,histor[i])
  }
  console.log(reslut);
  let arrat = Array.from(reslut);
  let mapSort1 = arrat.sort((a, b) => b[1] - a[1]);
  console.log(mapSort1 , typeof(mapSort1));
  let prin = "";
 
  if(document.getElementById("sele").value === "聽力"){
    for(let i in mapSort1){
      if(i>=mapSort1.length*0.3)break;
      prin+=mapSort1[i][0]+" ";
      console.log(i)
    }
  }
  else{
    for(let i in mapSort1){
      if(i>=mapSort1.length*0.2)break;
      prin+=`1${mapSort1[i][0]} `;
    }
  }
  document.getElementById("show").innerHTML=`
  <p>共有${membernum}筆資料</p>
  <p>前20%錯題如下:</p>
  <p>${prin}</p>`
})