const URL = 'https://jsonplaceholder.typicode.com/users';

const defaultOptions = {
  method: 'GET',
  body: null,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

export const tiger = async (options) => {
  const { url, ...restOptions } = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(url, restOptions);

  if (response.ok) {
    response.data = await response.json();
  }

  return response;
};

const response = await tiger({
  url: URL,
});

const userData = response.data;

// console.log(userData);

// console.log( userData );

// userData.forEach((item)=>{
// console.log( item );
// })

// const data = await tiger('https://www.naver.com');

// console.log( data.data );

// await tiger('www.naver.com')

// const response = await fetch('https://jsonplaceholder.typicode.com/user')

// console.log( response );

// if(response.ok){
//   const data = await response.json();
//   console.log( data );
// }

tiger.get = (url,options)=>{
    return tiger({
      url,
      ...options
    })
  }
  
  tiger.post = (url,body,options)=>{
    return tiger({
      method:'POST',
      url,
      body:JSON.stringify(body),
      ...options
    })
  }
  
  tiger.delete = (url,options)=>{
    return tiger({
      method:'DELETE',
      url,
      ...options
    })
  }
  
  tiger.put = (url,body,options)=>{
    return tiger({
      method:'PUT',
      url,
      body:JSON.stringify(body),
      ...options
    })
  }
// const response = await fetch('https://pokeapi.co/api/v2/pokemon/30')

// console.log(response);
// if(response.ok){
//     const data =  await response.json();
//     console.log(data);
// }

/*
fetch하면 프라미스 객체
앞에 await 하면 리스폰스 객체
await 함수 자체가 async로 설정되어야 사용 가능
await가 하는 일?
1. 코드의 실행 흐름 제어
- fetch(url)이 resolve, reject 반환 전까지 아래 코드 실행 X
2. 응답을 반환 (response도 promise 객체)

 */
