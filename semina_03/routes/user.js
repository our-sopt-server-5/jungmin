var express = require('express');
var router = express.Router();
let User = require('../models/db');
let { sc, rm, au } = require('../modules');

/*
 회원가입 
 url: localhost:3000/user/signup
 method : POST 
*/
router.post('/signup', async (req, res) => {
  // req body 값을 읽어온다.
  const { id, name, password, email } = req.body;
  // 새로운 user을 등록한다.
  if (!id || !name || !password || !email) {
    res.status(sc.BAD_REQUEST).send(au.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
    return;
  }

  if (User.filter((user) => user.id == id).length > 0) {
    res.status(sc.BAD_REQUEST).send(au.fail(sc.BAD_REQUEST, rm.ALREADY_ID));
    return;
  }

  await User.push(id, name, password, email);
  // 응답 메시지를 보낸다.
  res.status(sc.OK).send(User);
});

/*
 로그인
 url: localhost:3000/user/signin
 method : POST 
*/

router.post('signin', async (req, res) => {
  const { id, password } = req.body;

  // data null 값 확인
  if (!id || !password) {
    res.status(sc.BAD_REQUEST).send(au.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
    return;
  }

  // 존재하는 아이디인지 확인
  const user = User.filter((user) => user.id == id);
  if (user.length == 0) {
    res.status(sc.BAD_REQUEST).send(au.fail(sc.BAD_REQUEST, rm.NO_USER));
    return;
  }

  // 비밀번호 체크
  if (user[0].password != password) {
    res.status(sc.BAD_REQUEST).send(au.fail(sc.BAD_REQUEST, rm.MISS_MATCH_PW));
    return;
  }

  // 로그인 성공 시
  res.status(sc.OK).send(au.success(sc.OK, rm.LOGIN_SUCCESS));
});

/*
  프로필 조회 구현하기
  method: GET
  URL : localhost:3000/user/profile/:id
*/
router.get('/profile/:id', async (req, res) => {
  const userId = req.params;
  console.log(userId.id);

  try {
    // id 존재하는지 체크
    const CheckId = User.filter((user) => user.id == userId.id);

    if (CheckId.length == 0) {
      res.status(sc.BAD_REQUEST).send(au.fail(sc.BAD_REQUEST, rm.NO_USER));
      return;
    } else {
      // 로그인 성공 시
      res.status(sc.OK).send(au.success(sc.OK, rm.READ_PROFILE_SUCCESS));
    }
  } catch (err) {
    res.status(sc.INTERNAL_SERVER_ERROR).send(au.fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    return;
  }
});
module.exports = router;
