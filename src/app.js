// window.onload = function(){ ES6 적용전 코드 
window.onload = () =>{ // ES6 적용 코드 
    // 페이지 로드시 localStorage에서 값을 가져와서 출력 
    // 동일한 기능을 하는 걸 함수로 묶어서 개발하는게 좋다. 
    // 나중에 개발하고나서 코드 리뷰를 하면면서 함수 묶으면 좋음
    try {
        // Array.isArray
        let todo = JSON.parse(localStorage.getItem('todo')) || [];
        let check = 0
        // todo값이 배열인지 아닌지만 확인하는 코드도 추가돼야 할거같음 
        if (Array.isArray(todo) == true){
            // 아래는 배열 순회 코드 
            for(let key in todo){
                // key 의 타입은 String 임 
                if ((typeof todo[key] != "undefined") && (todo[key].length > 0)){
                    if ((typeof todo[key] != "undefined") && (todo[key].length > 0)){
                        check = 0;
                    }else{
                        check = 1;
                    }
                }
            }
            if (check == 0){
                displayArray(todo);
            }else{
                console.error('정상적인 접근이 아닙니다.');
            }
        }else{
            console.error('정상적인 접근이 아닙니다.');
        }
        
    } catch (error) {
        console.error('Error parsing JSON from localStorage:', error.message);
        // 이 경우에는 새로운 배열로 초기화할 수 있음
        let todo = [];
        displayArray(todo);
    }
}

function showValue() {
    let inputValue = document.getElementById('inputData').value;
    console.log('inputValue:', inputValue);
    
    let inputLength = inputValue.length;
    
    // 로컬스토리지에서 'todo' 키로 저장된 배열 가져오기 
    let storedArray = JSON.parse(window.localStorage.getItem('todo')) || [];

    let maxLength = 0;

    storedArray.forEach((item, index, storedArray) => {
        if (maxLength < item.length){
            maxLength = item.length;
            console.log('maxLength: ', maxLength);
        }
    });

    let container = document.querySelector('.container');

    if (inputLength >= maxLength){
        container.style.width = `${80 + (inputLength * 10)}px`;
    }else{
        container.style.width = `${80 + (maxLength * 10)}px`;
    }

    container.style.height = `80 + ${(storedArray.length+1) * 20}px`;
    console.log('storedArray:', storedArray);
    
    // 입력값을 배열에 추가함
    storedArray.push(inputValue)

    // localStorage에 값을 저장 
    window.localStorage.setItem('todo', JSON.stringify(storedArray));

    // 입력 필드 초기화 
    document.getElementById('inputData').value = '';

    // 배열 화면에 출력
    displayArray(storedArray);
}

function displayArray(array){
    console.log('displayArray');
    let list = document.getElementById('todoList');
    list.innerHTML = ''; // 기존 리스트 초기화 

    let maxLength = 0;
    
    for(let i = 0; i < array.length; i++){
        if (maxLength < array[i].length){
            maxLength=array[i].length;
            console.log('maxLength: ', maxLength);
        }
    }
    // css에서 클래스 지정하는 함수 
    let container = document.querySelector('.container');
    
    // 삭제하는 기능

    // 템플릿 리터럴 적용
    container.style.width = `${450 + (maxLength * 10)}px`;
    container.style.height = `${80 + ((array.length+1) * 20)}px`;
    
    console.log('array:', array);

    array.forEach(function(item, index){
        // 새로운 리스트 아이템 생성  
        let listItem = document.createElement('li'); 
        // li를 만들고 이를 참조하는 리스트 생성
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        

        let label = document.createElement('label');
        label.textContent = item;

        let deleteButton = document.createElement('button');
        deleteButton.type = "button";
        deleteButton.classList.add('deleteButton');
        deleteButton.textContent = 'x';
        deleteButton.addEventListener('click', function(){
            deleteValue(index);

        });

        listItem.appendChild(label)
        listItem.appendChild(checkbox)
        listItem.appendChild(deleteButton)
        // 리스트에 추가 
        list.appendChild(listItem);
    });
}

function deleteValue(index){

    console.log('hi', index);
    let storedArray = JSON.parse(window.localStorage.getItem('todo')) || [];
    storedArray.splice(index, 1);
    window.localStorage.setItem('todo', JSON.stringify(storedArray));
    displayArray(storedArray);

}