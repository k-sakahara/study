function isPrime(num){
  // if(num<2){return false}
  // else if(num === 2){return true}  //2以下のチェック省略
  // else
  if(num %2 == 0){return false};
  let sqrtNum = Math.sqrt(num);
  for(let i = 3; i<sqrtNum; i+=2){
    if(num%i === 0){
      return false;
    }
  }
  return true;
}


self.addEventListener("message",function(e){
  let amo = Number(e.data);
  let count = 0;
  let resultArr = [];
  resultArr.push(2);
  count++; //2以外は奇数だけチェックしたいから2が邪魔


  for(var i = 3; count < amo; i=i+2){
    if(isPrime(i)){
      resultArr.push(i);
      count++;
    }
  }
  // console.log(resultArr);
  postMessage(resultArr);
});
