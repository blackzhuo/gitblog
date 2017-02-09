/* 
 * web worker
 */
if (window.Worker) {
    console.log('support web worker');
    var worker = new Worker('work.js');
    // worker.postMessage('work');
    worker.postMessage({
        method: 'each',
        args: ['work']
    });
    worker.addEventListener('message', function(e) {
        console.log(e.data);
        worker.terminate();
    }, false);
    worker.addEventListener('error', function(e) {
        console.log(e);
    }, false);
} else {
    console.log('not support web worker');
}