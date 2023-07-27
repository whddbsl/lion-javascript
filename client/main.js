/* global gsap */

import {
  tiger,
  getNode as $,
  renderUserCard,
  changeColor,
  delayP,
  renderSnipper,
  renderEmptyCard,
  attr,
  clearContents,
} from './lib/index.js';

// [phase-1]
// 1. tiger 함수를 사용해서 user를 가져와 주세요.
// 2. 함수 안으로 넣기
// 3. 유저 데이터 랜더링 
//      - html template을 만든다. 
//      - 유저 data를 넘겨주기.
//      - inserLast 사용하기.
// 4. 함수 분리 하기 


// [phase-2]
// 1. 에러가 발생 했을 때 
// 2. empty svg를 생성하고 랜더링 해주세요 
// 3. 함수 분리


// [phase-3]
// json-server 구성
// data 설계
// get, delete 통신 localhost
// delete => 리랜더링(clear,render)

const userCardInner = $('.user-card-inner');

async function renderUserList() {
  renderSnipper(userCardInner);

  try {
    await delayP();

    gsap.to('loadingSpinner', {
      opacity: 0,
      onComplete() {
        $('.loadingSpinner').remove();
      },
    });

    const response = await tiger.get('http://localhost:3000/users');

    const userData = response.data;

    userData.forEach((item) => renderUserCard(userCardInner, item));

    changeColor('.user-card');

    gsap.to('.user-card', {
      x: 0,
      opacity: 1,
      stagger: 0.1,
    });
  } catch (err) {
    renderEmptyCard(userCardInner);
  }

  // 어디에 랜더링 할껀데? 어떤 데이터를 랜더링 할껀데?
}

renderUserList();

// 버튼을 클릭했을 때 해당 article의 id 값을 가져옴

// - 이벤트 위임
// - button 선택하기 -> 클릭한 대상의 가장  가까운.. method
// - attr(), dataset
function handleDelete(e) {
  // closest가 자기 자신도 찾을 수 있기 때문에 클릭 시 e.target의 button과 article을 찾을 수 있는 것
  const button = e.target.closest('button');
  const article = e.target.closest('article');

  if (!button || !article) return;

  const id = attr(article, 'data-index').slice(5);

  tiger.delete(`http://localhost:3000/users/${id}`)
  .then(() => {
    clearContents(userCardInner);
    renderUserList()
  });
}
userCardInner.addEventListener('click', handleDelete);
