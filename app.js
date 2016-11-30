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

// Classes

/*var Question = function() {
  question: "",
  choices: ['', '', '', ''],
  answer: ''
}
*/



// Validations


// make sure an answer is chosen

function validateRadio() {

    $('.submit-button').on('click', function() {
        if ($('input[type=radio]:checked').length > 0 || state.currentQuestion == 0) {
            return true;
        } else {
            $('.error').show();
            return false;
        }
    });
}



//is answer correct? if so, correctAnswers++

function evaluateAnswer() {
    $('.submit-button').on('click', function() {
        var a = document.getElementsByName('${state.questions.indexOf()}');
        for (i = 0; i < a.length; i++) {
            if (a[i].checked) {
                if (a[i].value == $(state.questions[currentQuestion - 1].answer)) {
                    state.correctAnswers++;
                    break;
                }
            }
        }
    });
}





function evalProgress() {
  console.log(state.currentQuestion);
    if (state.currentQuestion === 0) {
        state.progress = state.progressStates[0];
    } else if (state.currentQuestion > state.questions.length) {
        state.progress = state.progressStates[2];
    } else {
        state.progress = state.progressStates[1];
    };
    return state.progress;
}




// Render Functions

function buttonToggle() {


    $('.container').on('click', '.next-button', function() {
        $(this).hide();
        $(this).siblings('.submit-button').show();
    });

    $('.container').on('click', '.submit-button', function() {
        if (validateRadio() != false) {
            $(this).siblings('.next-button').show();
            $(this).hide();
        }
    });
}

function renderProgress() {
    evalProgress();

    function createProgressTemplate() {
      var progress = state.progress;
      var correctAnswers = state.correctAnswers;
      var progressHtml = `<p>Progress: ${progress}
    Score: ${correctAnswers}</p>`;

      $('.progress').html(progressHtml);
    }
    createProgressTemplate();

    $('.next-button').on('click', function(event) {
        evalProgress();

        createProgressTemplate();
    });
}



function renderNextQuestion() {

    $('.next-button').on('click', function(event) {
      if (state.currentQuestion === state.questions.length-1) {

      }

        var question = state.questions[state.currentQuestion++];
        var questionHtml = `<p>${question.question}</p><form name="answerList">`;
        var answers = question.choices.map(function(choice) {
            return `<input type="radio" name="${state.questions.indexOf()}" id="${choice}.indexOf()" value="${choice}.indexOf()" required >
        <label for="${choice}.indexOf()">${choice}</label><br>`;
        }).join('');
        questionHtml += answers;
        questionHtml += `</form>`;
        $('.questions').html(questionHtml);
        $('.error').hide();
    });
    //renderProgress();
}



// Execute

$('document').ready(function() {

    renderProgress();
    renderNextQuestion();
    validateRadio();
    buttonToggle();
    evaluateAnswer();









});
