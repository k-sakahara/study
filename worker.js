const isPrime = function(num){
  // if(num<2){return false} //2未満は^素数ですけど判定しません
  // else if(num === 2){return true}  //2は素数ですけど判定しません
  // else

  // if(num %2 == 0){return false}; //偶数は検証しません 奇数だけ入れてください

  const sqrtNum = Math.sqrt(num);
  for(let i = 3; i<sqrtNum; i+=2){
    if(num%i === 0){
      return false;
    }
  }
  return true;
}


self.addEventListener("message",function(e){
  const startTime = performance.now();

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

  const endTime = performance.now();

  postMessage({result : resultArr, msec : endTime - startTime});
});
