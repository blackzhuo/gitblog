/*
 * work
 */
function doSomething(args) {
    return args.join('-');
}
self.addEventListener('message', function(e) {
    // self.postMessage('You said: ' + e.data);
    var method = e.data.method;
    var args = e.data.args;
    var reply = doSomething(args);
    self.postMessage({
        method: method,
        reply: reply
    });
    self.close();
}, false);