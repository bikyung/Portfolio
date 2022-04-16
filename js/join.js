const form = document.querySelector("#member");
const btnSubmit = form.querySelector("input[type=submit]");

btnSubmit.addEventListener("click", (e) => {
  if(!isTxt('id',5)) e.preventDefault();
  if(!isPwd('pwd1','pwd2',10)) e.preventDefault();
  if(!isName('name')) e.preventDefault();
  if(!isNickName('nickName')) e.preventDefault();
  if(!isEmail('email',10)) e.preventDefault();
  if(!isGender('gender')) e.preventDefault();
  if(!isAddress('address')) e.preventDefault();
  if(!isPhone('call')) e.preventDefault();
});

function isTxt(name, len) {
  const input = form.querySelector(`[name=${name}]`);
  const txt = input.value.trim();
  console.log(txt.length)
  if(txt.length > len) {
    return true;
  } else {
    const errMsg = document.querySelector('.idText');

    errMsg.innerText = `텍스트를 ${len} 글자이상 입력하세요.`;
    errMsg.style.color = 'red';
    return false;
  }
}

function isPwd(name1, name2, len) {
  const pwd1 = form.querySelector(`[name=${name1}]`);
  const pwd2 = form.querySelector(`[name=${name2}]`);
  const pwd1_val = pwd1.value;
  const pwd2_val = pwd2.value;

  const num = /[0-9]/;
  const eng = /[a-zA-Z]/;
  const spc = /[!@#$%^&*()<>]/;

  if(pwd1_val === pwd2_val && num.test(pwd1_val) && eng.test(pwd1_val) && spc.test(pwd1_val) && pwd1_val.length > len) {
    return true;
  } else {
    const errMsg = document.querySelectorAll('.pwdText');

    for (const input of errMsg) {
      input.innerText = `비밀번호를 ${len} 글자 이상, 영문,숫자,특수문자를 포함하여 동일하게 입력하세요.`;
      input.style.color = 'red';
    }
    return false;
  }
}

function isName(name) {
  const input = form.querySelector(`[name=${name}]`);
  const txt = input.value.trim();

  if(txt !== '') {
    return true;
  } else {
    const errMsg = document.querySelector('.nameText')
    errMsg.innerText = '이름을 입력하세요.';
    errMsg.style.color = 'red';
  }
}


function isNickName(name) {
  const input = form.querySelector(`[name=${name}]`);
  const txt = input.value.trim();

  if(txt !== '') {
    const errMsgs = input.closest('td').querySelectorAll('p');
    if(errMsgs.length > 0) input.closest('td').querySelector('p').remove();
    return true;
  } else {
    const errMsgs = input.closest('td').querySelectorAll('p');
    if(errMsgs.length > 0) input.closest('td').querySelector('p').remove();

    const errMsg = document.createElement('p');
    errMsg.append('닉네임을 입력해 주세요.');
    errMsg.style.color = 'red';
    input.closest('td').append(errMsg);
    return false;
  }
}

function isEmail(name, len) {
  const input = form.querySelector(`[name=${name}]`);
  const txt = input.value.trim();

  if(txt.length > len && /@/.test(txt)) {
    return true;
  } else {

    const errMsg = document.querySelector('.emailText');
    errMsg.innerText = '@를 포함한 이메일을 주소를 제대로 입력 하세요.';
    errMsg.style.color = 'red';
    return false;
  }
}

function isGender(name) {
  const inputs = form.querySelectorAll(`[name=${name}]`)
  let isChecked = false; 

  for (const input of inputs) {
    if(input.checked) isChecked = true; 
  }

  if(isChecked) {
    const errMsgs = inputs[0].closest('td').querySelectorAll('p');
    if(errMsgs.length > 0) inputs[0].closest('td').querySelector('p').remove();
    return true;
  } else {
    const errMsgs = inputs[0].closest('td').querySelectorAll('p');
    if(errMsgs.length > 0) inputs[0].closest('td').querySelector('p').remove();

    const errMsg = document.createElement('p');
    errMsg.append('성별을 체크해주세요.')
    errMsg.style.color = 'red';
    inputs[0].closest('td').append(errMsg);
    return false;
  }
}

function isAddress(name) {
  const input = form.querySelector(`[name=${name}]`);
  const txt = input.value.trim();

  if(txt !== '') {
    const errMsgs = input.closest('td').querySelectorAll('p');
    if(errMsgs.length >0) input.closest('td').querySelector('p').remove();

    return true;

  } else {
    const errMsgs = input.closest('td').querySelectorAll('p');
    if(errMsgs.length >0) input.closest('td').querySelector('p').remove();

    const errMsg = document.createElement('p');
    errMsg.append('주소를 잘못 입력하셨습니다.');
    errMsg.style.color = 'red';
    input.closest('td').append(errMsg);
  }
}

function isPhone(name) {
  const input = form.querySelector(`[name=${name}]`);
  const txt = input.value.trim();

  if(txt !== '') {
    const errMsgs = input.closest('td').querySelectorAll('p');
    if(errMsgs.length >0) input.closest('td').querySelector('p').remove();

    return true;

  } else {
    const errMsgs = input.closest('td').querySelectorAll('p');
    if(errMsgs.length >0) input.closest('td').querySelector('p').remove();

    const errMsg = document.createElement('p');
    errMsg.append('번호를 입력해주세요');
    errMsg.style.color = 'red';
    input.closest('td').append(errMsg);
  }
}