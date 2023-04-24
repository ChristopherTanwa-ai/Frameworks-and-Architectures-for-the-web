export class User {
    constructor(firstName, familyName) {
        this.firstName = firstName
        this.familyName = familyName
    }
}

export class Answer {
    constructor(text, description, imgURL) {
        this.text = text
        this.description = description
        this.imgURL = imgURL
    }
}

export class Question {
    constructor(questionText, answers = [], correctAnswer) {
        this.questionText = questionText
        this.answers = answers
        this.correctAnswer = correctAnswer
    }
}

export class Quiz {
    constructor(quizName, questions = []) {
        this.quizName = quizName
        this.questions = questions
    }

    get currentUser() {
        return this.user
    }

    set currentUser(user) {
        this.user = user
    }
}

