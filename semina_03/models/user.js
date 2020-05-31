const pool = require('../modules/pool');
const table = 'User';

const user = {
  // 회원가입
  signup: async (id, name, password, salt, email) => {
    const fields = 'userId, name, password, salt, email';
    const questions = `?, ?, ?, ?, ?`;
    const values = [id, name, password, salt, email];
    const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
    try {
      const result = await pool.queryParamArr(query, values);
      const insertId = result.insertId;
      return insertId;
    } catch (err) {
      if (err.errno == 1062) {
        console.log('signup ERROR : ', err.errno, err.code);
        return -1;
      }
      console.log('signup ERROR : ', err);
      throw err;
    }
  },

  // 유저 확인
  checkUser: async (id) => {
    const query = `SELECT * FROM ${table} WHERE userId ="${id}"`;
    try {
      const result = await pool.queryParam(query);
      if (result.length === 0) {
        return false;
      } else return true;
    } catch (err) {
      throw err;
    }
  },

  // 로그인
  signin: async (id, password) => {},
};

module.exports = user;
