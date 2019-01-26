myAsyncFn((err, data) => {
  if (err) dealWithIt(err);
  doSomethingWith(data);
})
