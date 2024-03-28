const container = document.querySelector('.container');
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
                <button class="opt">${data[i].options[0]}</button>
                <button class="opt">${data[i].options[1]}</button>
                <button class="opt">${data[i].options[2]}</button>
                <button class="opt">${data[i].options[3]}</button>
                <br>
                <br>`
    container.innerHTML = html;
    const optBtns = document.querySelectorAll('.opt')

    optBtns.forEach(opt=>opt.addEventListener('click',function(){
        if(data[i].correctAnswer === opt.innerHTML){
            opt.classList.add('bg-color-green')
        }else{
            opt.classList.add('bg-color-red')
            console.log(`the correct Ans is ${data.correctAnswer}`)
        }
        
        optBtns.forEach(opt=>{
            if(opt.innerHTML === data[i].correctAnswer){
                opt.classList.add('bg-color-green')
            }
            opt.disabled=true})
    }))
    
    
}