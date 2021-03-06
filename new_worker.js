self.addEventListener("message",function(e){
  const startTime = performance.now();

  let amo = Number(e.data);
  let resultArr = [];

  //worker(余り以外)いくつ作るか
  const workersLength = 100;
  //何個のworkerから値が返ってきた?
  let successWorkerCount = 0;
  //何個のworkerから値が返ってくれば完了?
  const completeWorkerCount = workersLength+1;
  //1つのworkerにいくつの値を渡せばよいか?
  const child_amo = Math.floor(amo/workersLength);
  //あまりはいくつか
  const surplus_amo = amo%workersLength;

  //child_amoを計算するようのworker生成
  const workers = [];
  for(var i = 0; i<workersLength; i++){//4つのworkerを生成する
    workers.push( new Worker("workerchild.js") );
    workers[i].postMessage({amo:child_amo,start:i*child_amo+1});
    workers[i].addEventListener("message",function(e){ //child_workerから受け取った時の処理
      resultArr.push(...e.data)
      successWorkerCount++;
      if(successWorkerCount === completeWorkerCount){ //すべてのworkerから値が帰ってきた時
        const endTime = performance.now();
        console.log(resultArr);
        postMessage({result : resultArr, msec : endTime - startTime});
      }
    });
  }//endFor

  //surplus_amoを計算するようのworker生成
  const surplusWorker = new Worker("workerchild.js");
  surplusWorker.postMessage({amo:surplus_amo,start:workersLength*child_amo+1});
  surplusWorker.addEventListener("message",function(){
    resultArr.push(...e.data);
    successWorkerCount++;
    if(successWorkerCount === completeWorkerCount){ //すべてのworkerから値が帰ってきた時
      const endTime = performance.now();
      console.log(resultArr);
      postMessage({result : resultArr, msec : endTime - startTime});
    }
  });

});
