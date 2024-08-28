const buttons = document.querySelectorAll("button");
const result = document.querySelector(".result");

let operator = ''; // 연산자 입력
let v1 = ''; //이전 값
let v2 = ''; // 최근값
let signToggle = 0; //부호 전환 클릭 횟수 추적

//연산자 선언
let calculate = (n1, operator, n2) => {
    let result = 0;
    n1 = parseFloat(n1);
    n2 = parseFloat(n2);
    switch (operator) {
        case '+':
            result = n1 + n2;
            break;
        case '-':
            result = n1 - n2;
            break;
        case '*':
            result = n1 * n2;
            break;
        case '/':
            result = n1 / n2;
            break;
        default:
            break;
    }
    return String(result);
}

// 버튼 클릭 이벤트 처리
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;
        if (button.classList.contains('btn-number')) { //숫자 클릭
            if (operator === '') {
                v1 += value;
                result.innerText = v1;
            } else {
                v2 += value;
                result.innerText = v2;
            }
        } else if (button.classList.contains('btn-operate')) { //기호 클릭
            if (value === "=") {
                if (v1 && v2 && operator) {
                    result.innerText = calculate(v1, operator, v2);
                    v1 = result.innerText;
                    v2 = '';
                    operator = '';
                }
            } else {
                operator = value;
            }
        } 
        else if(button.classList.contains('btn-sign')){ //부호 클릭
            signToggle++;
            const targetValue = operator === '' ? v1 : v2;

            if (targetValue) {
                const currentNumber = parseFloat(targetValue);
                const newNumber = -currentNumber;
                if (operator === '') {
                    v1 = String(newNumber);
                    result.innerText = v1;
                } else {
                    v2 = String(newNumber);
                    result.innerText = v2;
                }
            }
        }else if (button.classList.contains('btn-AC')) { //전체 초기화
            v1 = '';
            v2 = '';
            operator = '';
            result.innerText = '0';
        } else if (button.classList.contains('btn-delete')) { //최근 입력값 삭제
            if (v2 !== '') {
                v2 = v2.slice(0, -1);
                result.innerText = v2 || '0';
            } else if (operator !== '') {
                operator = '';
            } else {
                v1 = v1.slice(0, -1);
                result.innerText = v1 || '0';
            }
        }
    });
});
