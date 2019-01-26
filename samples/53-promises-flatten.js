myAsyncFn()
  .then((data) => Promise.all([
    data,
    myOtherAsyncFn(data),
  ]))
  .then(([data, secondData]) => Promise.all([
    fun(data, secondData),
    fn(data, secondData),
  ]))
  .then(/* do anything else */)
  .catch((err) => handle(err))
