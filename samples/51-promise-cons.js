.then((data) => Promise.all([
  data,
  myOtherAsyncFn(data),
])
