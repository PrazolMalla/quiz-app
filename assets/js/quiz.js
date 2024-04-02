const questionContainer = document.querySelector('.question-container');
const questionSelection = document.querySelector('.questions-section')
const nextBtn = document.querySelector('.next');
const levelContainer = document.querySelector('.level-container');
const startBtn = document.querySelector('#start-game');
const leaderBoardBtn = document.querySelector('#leaderboard');
const mainContainer = document.querySelector('.welcome-container');
const levelBtns = document.querySelectorAll('.level');
const resultBtn =document.querySelector('.result');
const backBtn1 = document.querySelector('.back-1')
const backBtn2 = document.querySelector('.back-2')
let score;

backBtn1.addEventListener('click',function(){
    levelContainer.classList.remove('visible');
    levelContainer.classList.add('invisible');
    mainContainer.classList.remove('invisible');
    mainContainer.classList.add('visible');
})

backBtn2.addEventListener('click',function(){
    levelContainer.classList.add('visible');
    levelContainer.classList.remove('invisible');
    questionContainer.classList.add('invisible');
    questionContainer.classList.remove('visible');
})


startBtn.addEventListener('click',function(){
    levelContainer.classList.remove('invisible');
    levelContainer.classList.add('visible');
    mainContainer.classList.add('invisible');
})

levelBtns.forEach(levelBtn => levelBtn.addEventListener('click',function(){
    levelContainer.classList.add('invisible');
    levelContainer.classList.remove('visible');
    questionContainer.classList.add('visible');
    questionContainer.classList.remove('invisible');
    let i = 0
    viewQuestion(levelBtn.innerHTML,i);
}))


// * viewQuestion function is used to fetch the question according to the level such as easy medium hard and showQuestion func is called to show 
// * one question at a time 
function viewQuestion(option,i){
    score = 0
    fetch(`http://localhost:3000/questions?level=${option}`)
    .then((response)=>response.json())
    .then((data)=>{
        showQuestion(data,i,option)
        nextBtn.addEventListener('click',function(){
            if(i<(data.length-1)){
                i +=1;
                console.log(i);
                showQuestion(data,i,option);
            }
            
            if (i === (data.length-1)){
                
            }
        })
    })
}




// * Show the question and displays the option in buttons when the button is clicked the checkans function is called
function showQuestion(data,i,option){
    const html = `
                <p style="text-align:center;font-size:1.2rem">Level:${option} <br> ${i+1}/${data.length}</p>
                <p class="question">${data[i].title}</p>
                <div class="cta">
                    <button class="opt btn-1">${data[i].options[0]}</button>
                    <button class="opt btn-1">${data[i].options[1]}</button>
                    <button class="opt btn-1">${data[i].options[2]}</button>
                    <button class="opt btn-1">${data[i].options[3]}</button>
                </div>
                
                <br>
                <br>
                `
    questionSelection.innerHTML = html;
    
    const optBtns = document.querySelectorAll('.opt')

    optBtns.forEach(opt=>opt.addEventListener('click',function(){
        if(data[i].correctAnswer === opt.innerHTML){
            opt.classList.add('bg-color-green');
            score +=1;
        }else{
            opt.classList.add('bg-color-red');

        }
        
        optBtns.forEach(opt=>{
            if(opt.innerHTML === data[i].correctAnswer){
                opt.classList.add('bg-color-green');
            }
            opt.classList.add('disabled')
            opt.disabled=true})
    }))
    
    
}


resultBtn.addEventListener('click',function(){
    questionSelection.insertAdjacentHTML('beforeend',`Score:${score}`)
})