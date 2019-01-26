myAsyncFn()
  .then((data) =>
    myOtherAsyncFn(data)
      .then(
        ([data, secondData]) =>
          Promise.all([
            fun(data, secondData),
            fn(data, secondData),
          ])
      )
  )
  .catch((err) => handle(err))
