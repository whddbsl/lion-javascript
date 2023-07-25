import { getNode } from "../dom/getNode.js";


function delay(callback, timeout = 1000){
    setTimeout(callback,timeout);
}


const first = getNode('.first');
const second = getNode('.second');



// delay(()=>{
//     first.style.top = '-100px';
//     console.log(1);
//     delay(()=>{
//         first.style.transform = 'rotate(360deg)'
//         console.log(2);
//         delay(()=>{
//             first.style.top = '0'
//             second.style.top = '0'
//             console.log(3);
//         })
//         second.style.top = '100px'
//     })
// })

// delayP 함수를 실행하면 리턴되는 값이 promise 객체
function delayP(){

    return new Promise((resolve, reject) => {
        resolve('성공입니다!')
    })

}

delayP().then((result)=>{
    console.log(result);
})


