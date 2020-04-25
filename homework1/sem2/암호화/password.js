const fs = require('fs');
const crypto = require('crypto');

/*const title = 'password';
const data = `mypassword!`;
fs.writeFile(`${title}.txt`, data, (err, data) => {
  if (err) return console.log(err.message);
  console.log(`${title} 패스워드 파일 생성 완료`);
});*/

fs.readFile(`${__dirname}/password.txt`, (err, data) => {
  if (err) return console.log(err.message);
  const pwd = `"${data}"`;
  console.log(pwd);

  const encrypt = (salt, password) => {
    crypto.pbkdf2(password, salt.toString(), 1, 32, 'sha512', (err, derivedKey) => {
      if (err) throw err;
      const hashed = derivedKey.toString('hex');
      console.log('salt : ', salt);
      console.log('hashed : ', hashed);
      const result = hashed;
      const title = 'hashed';
      fs.writeFile(`${title}.txt`, result, (err, data) => {
        if (err) return console.log(err.message);
        console.log(`${title} 해시 파일 생성 완료`);
      });
    });
  };

  const password = pwd;
  const salt = crypto.randomBytes(32).toString('hex');
  encrypt(salt, password);
  console.log(password);
  console.log(salt);
});
