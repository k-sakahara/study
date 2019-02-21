function primeNumber (num) {
    //2 は素数なので true を返す
    if(num === 2) {
        return true;
    } else {
        for(i = 2; i < num; i++) {

        //2以上の数で割ったとき余りが0になれば false を返す。つまり素数ではない。
            if(num % i === 0) {
                return false;
                break;
            }

            //ループが最後まで行く、つまり割れる数がなかったら true を返す。つまり素数。
            if(i + 1 === num) {
                return true;
            }
        }
    }
}


self.addEventListener("message",function(e){
  let amo = Number(e.data);
  let count = 0;
  let resultArr = [];
  resultArr.push(2);
  count++; //2以外は奇数だけチェックしたいから2が邪魔


  for(var i = 3; count < amo; i=i+2){
    if(primeNumber(i)){
      resultArr.push(i);
      count++;
    }
  }
  // console.log(resultArr);
  postMessage(resultArr);
});
