/** This is a browser-console dependent question game.
 *
 * Please try this game out in your browser.
 * Note that you need to see the browsers console in order to play.
 *
 * In order to be able to be used as a plug-in the code is written as IIFE
 *
 * @author Marcus Klingborg
 */

(function () {
  function Question (question, answers, correct) {
    this.question = question
    this.answers = answers
    this.correct = correct
  }

  Question.prototype.displayQuestion = function () {
    console.log(this.question)

    for (let i = 0; i < this.answers.length; i++) {
      console.log(i + ': ' + this.answers[i])
    }
  }

  Question.prototype.checkAnswer = function (ans, callback) {
    let sc
    if (ans === this.correct) {
      console.log('Correct!')
      sc = callback(true)
    } else {
      console.log('Wrong answer, try again.')
      sc = callback(false)
    }

    this.displayScore(sc)
  }

  Question.prototype.displayScore = function (score) {
    console.log('Your current score is: ' + score)
    console.log('----------------------------------')
  }

  let q1 = new Question('What is the name of Darth Malaks sith Master?',
    ['Darth Revan',
      'Darth Kreia',
      'Darth Vader',
      'Bastilla'],
    0)
  let q2 = new Question('From which battle do we count the years in Star Wars?',
    ['The battle on the forest moon of Endor.',
      'The battle of Yavin IV.',
      'The end of the Clone Wars.',
      'The battle of Malachor V.'],
    1)
  let q3 = new Question('Which is the best Star Wars game ever made?',
    ['Jedi Knight Academy',
      'Battlefront II (the old one)',
      'Any of the Lego Star Wars games',
      'Star Wars: Knights of the old Republic'],
    3)

  let questions = [q1, q2, q3]

  function score () {
    let sc = 0
    return function (correct) {
      if (correct) {
        sc++
      }
      return sc
    }
  }

  let keepScore = score ()

  function nextQuestion () {
    let n = Math.floor(Math.random() * questions.length)

    questions[n].displayQuestion()

    let answer = prompt('Please select the correct answer.')

    if (answer !== 'exit') {
      questions[n].checkAnswer(parseInt(answer), keepScore)

      nextQuestion()
    }
  }

  nextQuestion()
})()
