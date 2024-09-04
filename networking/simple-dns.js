const dns = require("node:dns/promises");

(async () => {
  const result = await dns.lookup("IPWatchdog.com");
  console.log(result);
})();
