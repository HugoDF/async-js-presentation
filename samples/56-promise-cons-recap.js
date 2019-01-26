fn()
  .then((data) => Promise.all([
    data,
    myOtherAsyncFn(data),
  ]))
  .then(([data, secondData]) => {})
