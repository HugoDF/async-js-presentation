async function run() {
  const data = await myAsyncFn();
  const secondData = await myOtherAsyncFn(data);
  const final = await Promise.all([
    fun(data, secondData),
    fn(data, secondData),
  ]);

  return final
}
