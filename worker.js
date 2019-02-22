const newWorkerViaBlob = function(relativePath) { //localでnew workerできるようになる
  var baseURL = window.location.href.replace(/\\/g, '/').replace(/\/[^\/]*$/, '/');
  var array = ['importScripts("' + baseURL + relativePath + '");'];
  var blob = new Blob(array, {type: 'text/javascript'});
  var url = window.URL.createObjectURL(blob);
  return new Worker(url);
};

self.addEventListener("message",function(e){
  const startTime = performance.now();

  let amo = Number(e.data);
  let resultArr = [];

  //worker(余り以外)いくつ作るか
  const workersLength = 4;
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
    workers.push( newWorkerViaBlob("worker_child.js") );
    workers[i].postMessage({amo:child_amo,
                            start:i*child_amo);
    workers[i].addEventListener("message",function(e){ //child_workerから受け取った時の処理
      resultArr.push(e.data)
      successWorkerCount++;
      if(successWorkerCount === completeWorkerCount){ //すべてのworkerから値が帰ってきた時
        const endTime = performance.now();
        postMessage({result : resultArr, msec : endTime - startTime});
      }
    });
  }//endFor

  //surplus_amoを計算するようのworker生成
  const surplusWorker = newWorkerViaBlob("worker_child.js");
  surplusWorker.postMessage({amo:surplus_amo,start:workersLength*child_amo+1});
  surplusWorker.addEventListener("message"){
    resultArr.push(e.data);
    successWorkerCount++;
    if(successWorkerCount === completeWorkerCount){ //すべてのworkerから値が帰ってきた時
      const endTime = performance.now();
      postMessage({result : resultArr, msec : endTime - startTime});
    }
  }

});
