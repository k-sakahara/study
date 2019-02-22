const isPrime = function(num){
  if(num<2){return false}
  else if(num === 2){return true}
  // else if(num %2 == 0){return false};

  const sqrtNum = Math.sqrt(num);
  for(let i = 3; i<sqrtNum; i+=2){
    if(num%i === 0){
      return false;
    }
  }
  return true;
}


self.addEventListener("message",function(e){ //e.data.amo = amo // e.data.start = start
  let amo = Number(e.data.amo);
  let count = 0;
  let resultArr = [];
  const start = e.data.start % 2 === 0 ? e.data.start+1 : e.data.start;


  for(var i = start; count < amo; i=i+2){
    if(isPrime(i)){
      resultArr.push(i);
      count++;
    }
  }
  // console.log(resultArr);
  postMessage(resultArr);
});
