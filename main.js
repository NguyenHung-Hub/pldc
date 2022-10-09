import { chapter1 } from "./data/chapter1.js";
import { chapter2 } from "./data/chapter2.js";
import { chapter3 } from "./data/chapter3.js";
import { chapter4 } from "./data/chapter4.js";

let questions = [...chapter1];
window.addEventListener("DOMContentLoaded", (event) => {
    let answerItem = document.querySelectorAll(".answer-item");
    const questionsBox = document.querySelector(".questions-box");
    let select = document.querySelector("#select");
    let selectChapter = document.querySelector("#select-chapter");
    let selectMode = document.querySelector("#select-mode");

    const answersA = document.querySelector(".answer-A");
    const answersB = document.querySelector(".answer-B");
    const answersC = document.querySelector(".answer-C");
    const answersD = document.querySelector(".answer-D");

    const nextBtn = document.querySelector(".next-btn");

    var indexQuestion = 1;
    let arrQuestions = [];
    let isChoose = false;
    let questionNumber = eval(select.value);
    let isSort = selectMode.value === "sequence" ? true : false;

    // select.

    function init() {
        if (questionNumber > 100) {
            arrQuestions = Array.from(Array(questions.length - 1).keys());
            if (isSort == false) {
                arrQuestions = arrQuestions.sort(() => Math.random() - 0.5);
            }
        } else {
            arrQuestions = randomInteger(questionNumber, isSort);
        }
        renderQuestion(questions[arrQuestions[0]]);

        console.log(arrQuestions);
        console.log({
            number: select.value,
            chapter: selectChapter.value,
            mode: selectMode.value,
            total: questions.length,
            isSort,
            questionNumber,
            isChoose,
        });
    }
    init();

    select.addEventListener("change", () => {
        questionNumber = eval(select.value);
        indexQuestion = 1;
        document.querySelector(
            ".index-question"
        ).innerText = `Câu số ${indexQuestion}/${questionNumber}`;
        init();
    });

    selectChapter.addEventListener("change", () => {
        switch (selectChapter.value) {
            case "all": {
                questions = [
                    ...chapter1,
                    ...chapter2,
                    ...chapter3,
                    ...chapter4,
                ];
                select.innerHTML = `
                    <option value="10">10 câu</option>
                    <option value="20">20 câu</option>
                    <option value="40">40 câu</option>
                    <option value="60">60 câu</option>
                    <option value="100">100 câu</option>
                    <option value="142">All-142</option>
                    `;
                break;
            }

            case "1": {
                questions = [...chapter1];
                select.innerHTML = `
                    <option value="10">10 câu</option>
                    <option value="${chapter1.length}">${chapter1.length} câu</option>
                `;
                break;
            }
            case "2": {
                questions = [...chapter2];
                select.innerHTML = `
                    <option value="10">10 câu</option>
                    <option value="${chapter2.length}">${chapter2.length} câu</option>
                `;
                break;
            }
            case "3": {
                questions = [...chapter3];
                select.innerHTML = `
                    <option value="10">10 câu</option>
                    <option value="${chapter3.length}">${chapter3.length} câu</option>
                `;
                break;
            }
            case "4": {
                questions = [...chapter4];
                select.innerHTML = `
                    <option value="10">10 câu</option>
                    <option value="${chapter4.length}">${chapter4.length} câu</option>
                `;
                break;
            }

            default: {
                questions = [...chapter1];
                select.innerHTML = `
                    <option value="10">10 câu</option>
                    <option value="${chapter1.length}">${chapter1.length} câu</option>
                `;
                break;
            }
        }

        init();
    });
    selectMode.addEventListener("change", () => {
        isSort = selectMode.value === "sequence" ? true : false;
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

            document.querySelector(
                ".index-question"
            ).innerText = `Câu số ${indexQuestion}/${questionNumber}`;
            // document.querySelector(
            //     ".index-chapter"
            // ).innerText = `Chương ${questions[i].chapter}`;
        }
        reset();
    });

    function reset() {
        document
            .querySelectorAll(".answer-item")
            .forEach((ele) => (ele.style.backgroundColor = "#eee"));
        isChoose = false;
    }

    function randomInteger(size, isSort) {
        const arrInt = [];
        let rndInt = Math.floor(Math.random() * questions.length) + 0;
        arrInt.push(rndInt);

        for (let i = 0; i < size - 1; i++) {
            do {
                rndInt = Math.floor(Math.random() * questions.length) + 0;
            } while (arrInt.includes(rndInt));
            arrInt.push(rndInt);
        }
        if (isSort) {
            arrInt.sort(function (a, b) {
                return a - b;
            });
        }

        return arrInt;
    }

    function renderQuestion(question) {
        questionsBox.innerText = `Chương ${question.chapter} - ${question.question}`;

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
            item.style.backgroundColor = "#9BBBD5";
            isChoose = true;
        }

        let temp = questions[i].correct.toUpperCase();
        document.querySelector(`.answer-${temp}`).style.backgroundColor =
            "#56D956";
    }
});
