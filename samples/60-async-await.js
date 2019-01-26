(async () => {
  try {
    const data = await myAsyncFn();
    const secondData = await myOtherAsyncFn(data);
    const final = await Promise.all([
      fun(data, secondData),
      fn(data, secondData),
    ]);
    /* do anything else */
  } catch (err) {
    handle(err);
  }
})();
