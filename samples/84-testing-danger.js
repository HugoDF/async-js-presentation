const runCodeUnderTest = async () => {
  throw new Error();
};

test('it should pass', async () => {
  doSomeSetup();

  await runCodeUnderTest();
  // the following never gets run
  doSomeCleanup();
})
