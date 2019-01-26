myAsyncFn((err, data) => {
  if (err) handle(err)
  myOtherAsyncFn(data, (err, secondData) => {
    // Missing error handling!
    fun(data, secondData, (err) => {
      if (err) handle(err)
    })
    fn(data, secondData, (err) => {
      if (err) handle(err)
    })
  })
})
