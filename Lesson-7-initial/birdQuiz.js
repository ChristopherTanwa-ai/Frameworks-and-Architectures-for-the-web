import { Answer, Question, Quiz } from "./quiz.js";

export function getQuiz() {
  let answers1 = [
    new Answer(
      "Ostrich",
      "Ostrich description",
      "/images/_1firstTest/Ostrich.jpg"
    ),
    new Answer("Emu", "Emu description", "/images/_1firstTest/Emu.jpg"),
    new Answer(
      "Peregrine Falcon",
      "Peregrine Falcon description",
      "/images/_1firstTest/Falco_peregrinus.jpg"
    ),
    new Answer(
      "Penguin",
      "Penguin description",
      "/images/_1firstTest/penguin.jpg"
    ),
  ];

  let questions = [
    new Question("What bird is the fastest on land? - 1", answers1, 0),
  ];

  return new Quiz("Bird Quiz", questions);
}


export function answers(){
  let string = "";

          for(i=0;i<Quiz.questions[0].answers.length;i++){
            let answer = Quiz.questions[0].answers[i];
            string += `<a href='/_4lose.html'> <figure class='answer'><img src='${answer.imgUrl}' /><figcaption>${answer.text}</figcaption></figure></a> `
          }
  return string;
}