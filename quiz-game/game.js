const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let time=document.querySelector('#time')
let currentQuestion={}
let acceptingAnswers=true
let score=0
let questionCounter=0
let availableQuestions=[]

let questions =[
    {
        question: 'What is 3x3 ?',
        choice1: '4',
        choice2: '9',
        choice3: '6',
        choice4: '0',
        answer:2,
    },

    {
        question: 'What is 5+5 ?',
        choice1: '10',
        choice2: '25',
        choice3: '0',
        choice4: '1',
        answer:1,
    },

    {
        question: 'What is 24/3 ?',
        choice1: '7',
        choice2: '30',
        choice3: '8',
        choice4: '0',
        answer:3,
    },

    {
        question: 'What is 90-75 ?',
        choice1: '25',
        choice2: '165',
        choice3: '5',
        choice4: '15',
        answer:4,
    },

    {
        question: 'What is 6^6 ?',
        choice1: '46',
        choice2: '36',
        choice3: '66',
        choice4: '76',
        answer:2,
    }
]

const SCORE_POINTS=20
const MAX_QUESTIONS=5

startGame= () => {
    questionCounter=0
    score=0
    availableQuestions=[...questions]
    getNewQuestion()
}
let index=0;
let timer=0;
let interval=0;

let countDown = () => {
    if (timer===10) {
        clearInterval(interval);
        getNewQuestion();
    }
    else {
        timer++;
        time.innerText = timer;
}
}

getNewQuestion= () => {
    
    if (availableQuestions.length ===0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)
        return window.location.assign('end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width=`${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex= Math.floor(Math.random() * availableQuestions.length)
    currentQuestion= availableQuestions[questionsIndex]
    question.innerText=currentQuestion.question

    choices.forEach( choice =>{
        const number=choice.dataset['number']
        choice.innerText=currentQuestion['choice'+ number]
    })
    
    availableQuestions.splice(questionsIndex,1)
    timer=0;
    acceptingAnswers=true
    
}

choices.forEach(choice=>{
    choice.addEventListener('click', e=>{
        if(!acceptingAnswers) return

        acceptingAnswers=false
        const selectedChoice=e.target
        const selectedAnswer=selectedChoice.dataset['number']

        let classToApply=selectedAnswer==currentQuestion.answer ? 'correct' : 
        'incorrect'

        if(classToApply ==='correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            interval = setInterval(countDown, 1000);
            getNewQuestion()

        },400)
        clearInterval(interval);
    })
})

incrementScore=num=>{
    score +=num
    scoreText.innerText=score
}



/*setInterval(countDown,1000)*/

startGame()