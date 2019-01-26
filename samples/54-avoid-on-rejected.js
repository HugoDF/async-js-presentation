myAsyncFn()
  .then(
    (data) => myOtherAsyncFn(data),
    (err) => handle(err)
  );
