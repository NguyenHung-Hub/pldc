import { questions } from "./data2.js";

window.addEventListener("DOMContentLoaded", (event) => {
    let answerItem = document.querySelectorAll(".answer-item");
    const questionsBox = document.querySelector(".questions-box");
    let select = document.querySelector("#select");

    const answersA = document.querySelector(".answer-A");
    const answersB = document.querySelector(".answer-B");
    const answersC = document.querySelector(".answer-C");
    const answersD = document.querySelector(".answer-D");

    const nextBtn = document.querySelector(".next-btn");

    var indexQuestion = 1;
    let arrQuestions = [];
    let isChoose = false;
    let questionNumber = eval(select.value);

    function init() {
        arrQuestions = randomInteger(questionNumber);
        renderQuestion(questions[arrQuestions[0]]);
    }
    init();

    select.addEventListener("change", () => {
        questionNumber = eval(select.value);
        console.log(questionNumber);
        indexQuestion = 1;
        document.querySelector(
            ".info"
        ).innerText = `Câu số ${indexQuestion}/${questionNumber}`;
        init();
    });

    nextBtn.addEventListener("click", () => {
        if (!isChoose) {
            alert("Chưa chọn đáp án!!!");
            return;
        }

        if (indexQuestion == arrQuestions.length) {
            alert(
                `Đã trả lời hết ${arrQuestions.length} câu hỏi.\n Chọn lại số câu hỏi khác hoặc reload trang`
            );
        } else {
            let i = arrQuestions[indexQuestion++];
            renderQuestion(questions[i]);
        }

        document.querySelector(
            ".info"
        ).innerText = `Câu số ${indexQuestion}/${questionNumber}`;

        reset();
    });

    function reset() {
        document
            .querySelectorAll(".answer-item")
            .forEach((ele) => (ele.style.backgroundColor = "#282a36"));
        isChoose = false;
    }

    function randomInteger(size) {
        const arrInt = [];
        let rndInt = Math.floor(Math.random() * questions.length) + 0;
        arrInt.push(rndInt);

        for (let i = 0; i < size - 1; i++) {
            do {
                rndInt = Math.floor(Math.random() * questions.length) + 0;
            } while (arrInt.includes(rndInt));
            arrInt.push(rndInt);
        }
        arrInt.sort(function (a, b) {
            return a - b;
        });

        console.log({ arrInt });

        return arrInt;
    }

    function renderQuestion(question) {
        questionsBox.innerText = `${question.question}`;

        answersA.innerText = " " + (question.answer.a || "null");
        answersB.innerText = " " + (question.answer.b || "null");
        answersC.innerText = " " + (question.answer.c || "null");
        answersD.innerText = " " + (question.answer.d || "null");
    }

    answerItem.forEach((item) =>
        item.addEventListener("click", function () {
            handlerClick(this);
        })
    );
    function handlerClick(item) {
        let i = arrQuestions[indexQuestion - 1];
        console.log({
            handlerClick: questions[i],
            correct: questions[i].correct,
            item,
        });
        if (isChoose) {
            alert("Bạn đã chọn rồi !!! Hãy bấm Next");
        } else {
            item.style.backgroundColor = "#6272a4";
            isChoose = true;
        }

        let temp = questions[i].correct.toUpperCase();
        console.log(temp);
        document.querySelector(`.answer-${temp}`).style.backgroundColor =
            "#50fa7b";
    }
});
