const TestMoneroDaemonRpc = require("./TestMoneroDaemonRpc");
const TestMoneroWalletRpc = require("./TestMoneroWalletRpc")
const TestMoneroWalletLocal = require("./TestMoneroWalletLocal")

// test daemon rpc
//new TestMoneroDaemonRpc().runTests({
//  testNotifications: true
//});

// test wallet rpc
new TestMoneroWalletRpc().runTests({
  testNonSends: false,
  liteMode: true, // skips some lengthy tests // TODO: lengthy tests still need to be runnable but getting test timeout
  testSends: false,
  testResets: false,
  testNotifications: true
});

//// test wallet local
//new TestMoneroWalletLocal().runTests({
//  testNonSends: false,
//  testSends: false,
//  testResets: false,
//  testNotifications: false
//});
//
//// test wallet equality
//require("./TestMoneroWalletEquality");
//
//// test core utils
//require("./TestMoneroCoreUtils");
//
//// test boolean set (data structure used by wallet to track progress)
//require("./TestBooleanSet");
//
//// test sample code for readme
//require("./TestSampleCode");
//
// test scratchpad
//require("./Scratchpad");