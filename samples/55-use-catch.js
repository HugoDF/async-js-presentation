myAsyncFn()
  .then(
    (data) => myOtherAsyncFn(data)
  )
  .catch((err) => handle(err));
