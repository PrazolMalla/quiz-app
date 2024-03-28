const container = document.querySelector('.container');

// function viewQuestion(option){
//     const easyQuestionsId = [];
//     const mediumQuestionsId =[];
//     const hardQuestionsId =[];
//     fetch('http://localhost:3000/questions')
//     .then((response)=>response.json())
//     .then((data)=>{
//         for(i=0;i<data.length;i++){
//             if(option.value===data[i].level){
//                 if(option.value==="easy"){
//                     easyQuestionsId.push(data[i].id)
//                 }else if(option.value==="medium"){
//                     mediumQuestionsId.push(data[i].id)
//                 }else if(option.value ==="hard"){
//                     hardQuestionsId.push(data[i].id)
//                 }
//             }
            
//         }
//         if(option.value==="easy"){
//             showQuestion(easyQuestionsId,0);
//         }else if(option.value==="medium"){
//             showQuestion(mediumQuestionsId,0);
//         }else if(option.value ==="hard"){
//             showQuestion(hardQuestionsId,0);
//         }


//     })
    
// }

// function showQuestion(questionId,i){
//     questionId = questionId;
//     i = i;
//     fetch(`http://localhost:3000/questions/${questionId[i]}`)
//     .then(response => response.json())
//     .then(data=>{
//         const html = `
//                     <p>${i+1}/${questionId.length}</p>
//                     <p>${data.title}</p>
//                     <button onclick="checkAns(${data})">${data.options[0]}</button>
//                     <button>${data.options[1]}</button>
//                     <button>${data.options[2]}</button>
//                     <button>${data.options[3]}</button>
//                     <br>
//                     <br>
//                     <button class="next" onclick="showQuestion([${questionId}],${i+1})">Next</button>`;
//         container.innerHTML = html;
        
//     })
// }

const nextBtn = document.querySelector('.next')
function viewQuestion(option){
    i = 0
    fetch(`http://localhost:3000/questions?level=${option.value}`)
    .then((response)=>response.json())
    .then((data)=>{
        showQuestion(data,i)
        nextBtn.addEventListener('click',function(){
            if(i<(data.length-1)){
                i = i +1;
                showQuestion(data,i)
            }
        })
    })
}


function showQuestion(data,i){
    const html = `
                <p>${i+1}/${data.length}</p>
                <p>${data[i].title}</p>
                <button>${data[i].options[0]}</button>
                <button>${data[i].options[1]}</button>
                <button>${data[i].options[2]}</button>
                <button>${data[i].options[3]}</button>
                <br>
                <br>`
                
    container.innerHTML = html;
}