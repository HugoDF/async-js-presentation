myAsyncFn((err, data) => {
  if (err) handle(err)
  myOtherAsyncFn(data, (err, secondData) => {
    fun(data, secondData, (err) => {
      if (err) handle(err)
    })
    fn(data, secondData, (err) => {
      if (err) handle(err)
    })
  })
})
