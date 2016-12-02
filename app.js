// State

var state = {
    currentQuestion: 0,
    correctAnswers: 0,
    progress: 'not-started',
    progressStates: ['not-started', 'in-progress', 'completed'],


    questions: [{
        question: "What year did The Beatles first travel to the US?",
        choices: ['1962', '1973', '1956', '1964'],
        answer: '1964'
    }, {
        question: "Who was The Beatles first drummer?",
        choices: ['Pete Best', 'John Bonham', 'Ringo Star', 'Carlos Santana'],
        answer: 'Pete Best'
    }, {
        question: "Who founded The Rolling Stones?",
        choices: ['Keith Richards', 'Brian Jones', 'Mick Jagger', 'Ron Wood'],
        answer: 'Brian Jones'
    }, {
        question: "Who was the drummer for Cream?",
        choices: ['Keith Moon', 'Ginger Baker', 'Richard Starkey', 'Bill Ward'],
        answer: 'Ginger Baker'
    }, {
        question: "Who was the bassist for Led Zeppelin?",
        choices: ['Flea', 'Chas Chandler', 'John Paul Jones', 'Jack Bruce'],
        answer: 'John Paul Jones'
    }, ]
};

// Validations

function validateRadioEvent() {
    $('.submit-button').on('click', validateRadio);
}

function validateRadio() {
    if ($('input[type=radio]:checked').length > 0 || state.currentQuestion == 0) {
        return true;
    } else {
        $('.error').show();
        return false;
    }
}

function checkAnswer() {
    var choice = $(`input[name=${state.questions.indexOf()}]:checked`).val();
    if (choice === state.questions[state.currentQuestion-1].answer) {
        state.correctAnswers++;
        $('.correct').show();
    } else if (choice !== state.questions[state.currentQuestion-1].answer) {
        $('.incorrect').show();
    } else {
        $('.error').show();
    }
}

function evalProgress() {
    if (state.currentQuestion === 0) {
        state.progress = state.progressStates[0];
    } else if (state.currentQuestion > state.questions.length) {
        state.progress = state.progressStates[2];
    } else {
        state.progress = state.progressStates[1];
    };
    return state.progress;
}

// Render Functions/Event Listeners

function renderInit() {
    if (state.currentQuestion === 0) {

        var initHtml = `How well do you know rock history?
                Let's find out!`;

        $('.questions').html(initHtml);
    }
}

function buttonToggle() {


    $('.container').on('click', '.next-button', function() {
        if (state.currentQuestion > state.questions.length) {
            $(this).text("restart quiz");
            $(this).siblings('.submit-button').hide();
            state.currentQuestion = 0;
        } else if (state.currentQuestion <= state.questions.length) {
            $(this).hide();
            $(this).siblings('.submit-button').show();
        }
    });

    $('.container').on('click', '.submit-button', function() {
        if (validateRadio() != false && state.currentQuestion < state.questions.length) {
            $(this).hide();
            $(this).siblings('.next-button').show().text("next");
        } else if (validateRadio() != false && state.currentQuestion === state.questions.length) {
            $(this).hide();
            $(this).siblings('.next-button').show().text("show results");
        }
    });
}

function renderProgress() {
    evalProgress();
    createProgressTemplate();
}

function createProgressTemplate() {
    var progress = state.progress;
    var correctAnswers = state.correctAnswers;
    if (state.currentQuestion > state.questions.length) {
        var progressHtml = `<p>Progress: ${progress} |
    Score: ${correctAnswers}/${state.questions.length}</p>`;
    } else {
        var progressHtml = `<p>Progress: ${progress} |
    Question ${state.currentQuestion} of ${state.questions.length} |
    Score: ${correctAnswers}/${state.questions.length}</p>`;
    }
    $('.progress').html(progressHtml);
}

function evaluateAnswerEvent() {
    $('.submit-button').on('click', checkAnswer);
    
}

function renderNextQuestion() {
    $('.next-button').on('click', function(event) {
        $('.incorrect').hide();
        $('.correct').hide();
        if (state.currentQuestion < state.questions.length) {
            var question = state.questions[state.currentQuestion];
            var questionHtml = `<p>${question.question}</p><form class="form-field" name="answerList">`;
            var answers = question.choices.map(function(choice) {
                return `<input type="radio" name="${state.questions.indexOf()}" id="${choice}.indexOf()" value="${choice}" required >
            <label for="${choice}.indexOf()">${choice}</label><br>`;
            }).join('');
            questionHtml += answers;
            questionHtml += `</form>`;
            $('.questions').html(questionHtml);
            $('.error').hide();
        }

        state.currentQuestion++;

        evalProgress();
        createProgressTemplate();
    });
}



function renderResults() {
    $('.next-button').on('click', function(event) {
        if (state.currentQuestion > state.questions.length) {

            var resultsHtml = `<p>You answered ${state.correctAnswers} questions correctly out of ${state.questions.length} questions.
            Your score is   ${state.correctAnswers / state.questions.length * 100}%</p>`;

            $('.questions').html(resultsHtml);
        }
    });
}

// Execute

$('document').ready(function() {
    renderInit();
    renderProgress();
    renderNextQuestion();
    validateRadioEvent();
    buttonToggle();
    evaluateAnswerEvent();
    renderResults();



});
