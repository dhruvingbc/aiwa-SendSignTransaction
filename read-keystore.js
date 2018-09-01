const fs = require("fs");

fs.readFile(
  'C:/API_Garage/aion/aion-v0.3.0.284fa1e-2018-08-21/aion/keystore/UTC--2018-08-30T224602.528Z--a0bbff7af1e2f4939f4e2df2418d42f7be895ac2061403ac2ececf695b2d08bf',
  (err, data) => {
    console.log(`data => ${JSON.parse(data)}`);
  }
);
