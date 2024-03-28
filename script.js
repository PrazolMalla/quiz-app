const container = document.querySelector('.container')


// ***** Show Question Function*********
const showQuestions = function(data){
    const html = `<p>${data.title}</p>
                <button class="editBtn" onclick="editQuestion('${data.id}')">Edit</button>;
                <button class="delete" onclick = "deleteQuestion('${data.id}')">Delete</button>`;
    container.insertAdjacentHTML('beforeend',html);
}

// ***** Get Question Function*********
const getQuestion = function(){
    fetch(`http://localhost:3000/questions`)
    .then((response) => response.json())
    .then((data)=> {
        for(i = 0 ;i< data.length;i++){
            showQuestions(data[i]);
        }
    })

}

// ***** Delete Function*********
const deleteQuestion = function(id){
    fetch(`http://localhost:3000/questions/${id}`,{
        method:'DELETE',
    })
}

// ****** Add Function***********
const addQuestion = function(newQuestion){
    fetch(`http://localhost:3000/questions/${newQuestion.id}`)
    .then(response => {
        if(response.ok){
            alert(`Question with ${newQuestion.id} already exist`);
        }
        else{
            fetch(`http://localhost:3000/questions`,{
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(newQuestion),
            })
        }
    })
    
    
}

window.addEventListener('load',getQuestion);
// getQuestion();

document.getElementById('add-form').addEventListener('submit',function(e){
    e.preventDefault();
    let id = document.getElementById('id').value;
    let title = document.getElementById('question').value;
    let correctAnswer = document.getElementById('correctAns').value;
    let opt1 = document.getElementById('opt1').value;
    let opt2 = document.getElementById('opt2').value;
    let opt3 = document.getElementById('opt3').value;
    let opt4 = document.getElementById('opt4').value;
    let level = document.getElementById('level').value;
    let newQuestion = {id:id,title:title,
    correctAnswer:correctAnswer,options:[opt1,opt2,opt3,opt4],
    level:level    
    };
    addQuestion(newQuestion);
    
})


const editQuestion = function(id){
    document.querySelector('.edit').classList.remove('invisible');
    document.querySelector('.edit').classList.add('visible');
    document.querySelector('.add').classList.add('invisible');
    fetch(`http://localhost:3000/questions/${id}`).then(response=>response.json()).then(data =>{
        document.getElementById('edit-id').value = data.id;
        document.getElementById('edit-question').value = data.title;
        document.getElementById('edit-correctAns').value = data.correctAnswer;
        document.getElementById('edit-opt1').value=data.options[0];
        document.getElementById('edit-opt2').value=data.options[1];
        document.getElementById('edit-opt3').value=data.options[2];
        document.getElementById('edit-opt4').value=data.options[3];
        document.getElementById('level').value = data.level
    })
    
    document.getElementById('edit-form').addEventListener('submit',function(e){
        e.preventDefault();
        

        let id = document.getElementById('edit-id').value;
        let title = document.getElementById('edit-question').value;
        let correctAnswer = document.getElementById('edit-correctAns').value;
        let opt1 = document.getElementById('edit-opt1').value;
        let opt2 = document.getElementById('edit-opt2').value;
        let opt3 = document.getElementById('edit-opt3').value;
        let opt4 = document.getElementById('edit-opt4').value;
        let level = document.getElementById('edit-level').value;
        let updatedQuestion = {id:id,title:title,
        correctAnswer:correctAnswer,options:[opt1,opt2,opt3,opt4],
        
        };
        fetch(`http://localhost:3000/questions/${id}`,{
            method:'PATCH',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(updatedQuestion),
        })
        document.querySelector('.add').classList.remove('invisible');
        document.querySelector('.add').classList.add('visible');
        document.querySelector('.edit').classList.add('invisible'); 
    })

    
}

