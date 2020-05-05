(function(){
    function buildQuiz(){
        //var to store html output
        const output = [];

        //for each question
        myQuestions.forEach((currentQuestion, questionNumber) => {
            //var to store the list of possible answers
            const answers = [];
            //and for each available answer
            for(letter in currentQuestion.answers){
                //adding html radio buttons to options
                answers.push(
                    `<label>
                        <input type = "radio" name = "question${questionNumber}" value = "${letter}"></input>
                        ${letter}:
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            
            // add this questions and its answers to the output
            output.push(
                `<div class="slide">
                <div class = "question">
                ${currentQuestion.question}</div>
                <div class ="answers">
                ${answers.join('')}</div>
                </div>`
            );
        }
    );

    //finally combine our ouput list into a string of html and put on page
        quizContainer.innerHTML = output.join('');
}

    function showResults(){
        //gather answers container from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        //keep track of users answers
        let numCorrect = 0;

        //for each question
        myQuestions.forEach((correctQuestion, questionNumber) => {
            //find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
            
            //if answer is correct
            if(userAnswer === correctQuestion.correctAnswer){
                //add to the number of coorect answers
                numCorrect++;

                //color the answer green
                answerContainers[questionNumber].style.color = 'white';
                answerContainers[questionNumber].style.backgroundColor = 'lightgreen';
            }
            //if answer is wrong or blank
            else{
                //color the answer red
                answerContainers[questionNumber].style.color = 'white';
                answerContainers[questionNumber].style.backgroundColor = 'red';
            }
        }
        );

        //show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if(currentSlide === 0) {
            previousButton.style.display = 'none';
        }
        else {
            previousButton.style.display = 'inline-block';
        }
        if(currentSlide === slides.length-1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
        else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
        };

        function showNextSlide() {
            showSlide(currentSlide + 1);
        }

        function showPreviousSlide() {
            showSlide(currentSlide - 1);
        }

    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
        {question: "which of the following is not a reserved word in javascript?",
        answers: {
            a: "interface",
            b: "throws",
            c: "program",
        }, 
        correctAnswer: "c"
    },
    {
        question: "which of these is a javascript package manager?",
        answers: {
            a: "typescript",
            b: "jnodejs",
            c: "npm",
        }, 
        correctAnswer: "c"
    } ,
    {
        question: "inside which element do we put javascript?",
        answers: {
            a: "scripting",
            b: "jQuery",
            c: "script",
        }, 
        correctAnswer: "c"
    },  
    {
        question: "what is the correct syntax for reffering to an external javascript file?",
        answers: {
            a: "script src='xxx.js'",
            b: "script href='xxx.js'",
            c: "script name='xxx.js'",
        }, 
        correctAnswer: "a"
    },
    {question: "how do you call a function named 'myFunction?",
        answers: {
            a: "myFunction()",
            b: "call myfunction()",
            c: "call function myFunction()",
        }, 
        correctAnswer: "a"
    },
    ];

    //kick off
    buildQuiz();

    //pagination
    const previousButton = document.getElementById("previous");
    const nextButton =document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showSlide(currentSlide);

    //event listeners
    submitButton.addEventListener('click', showResults);

    previousButton.addEventListener('click', showPreviousSlide);

    nextButton.addEventListener('click', showNextSlide);
})();



