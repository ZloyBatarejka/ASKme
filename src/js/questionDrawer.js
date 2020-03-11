import Firebase from "./database";
import $ from "./base";
export default function questionDrawer() {
  const content = document.querySelector("#content");
  const $questionContainer = document.createElement("div");
  $questionContainer.classList.add("container", "question-container");
  Firebase.getQuestions().then(data => {
    const array = [];
    for (let item in data) {
      const question = {
        key: item,
        text: data[item].text,
        date: data[item].date
      };
      array.push(question);
    }
    if (array.length) {
      array.forEach(item => {
        const $questionRow = document.createElement("div");
        $questionRow.classList.add("row", "question-row");
        const $col = document.createElement("div");
        $col.classList.add("col-md-12", "question-col");
        $col.innerHTML = `
            <div class="question-body">
              <p class="question-text">${item.text}</p>
              <p class="question-date">${item.date}</p>
            </div>
            <div class="question-answer">
              <input type="text" class="question-answer-input " data-input="true"/>
              <button data-id=${item.key} class="btn btn-primary question-answer-btn">Answer</button> 
            </div>
        `;
        $questionRow.append($col);
        $questionContainer.append($questionRow);
      });
    } else {
      noQuestions();
    }
    let answerButtons = document.querySelectorAll("[data-id]");
    let postBody;
    answerButtons.forEach(item => {
      item.addEventListener("click", () => {
        const parentNode = item.closest(".question-row");
        postBody = {
          question: parentNode.querySelector(".question-text").textContent,
          questionDate: parentNode.querySelector(".question-date").textContent,
          answer: parentNode.querySelector(".question-answer-input").value,
          answerDate: $.getNicerDate(new Date())
        };
      });
      item.addEventListener("click", event => {
        item.closest(".question-row").classList.add("faded");
        setTimeout(() => {
          item.closest(".question-row").remove();
        }, $.animation_speed);
        Firebase.createPost(postBody);
        Firebase.delete(event.target.dataset.id);
      });
    });
  });
  content.append($questionContainer);
  function noQuestions() {
    const $no = document.createElement("p");
    $no.classList.add("no-questions");
    $no.textContent = "На данный момент новых вопрос нет";
    $questionContainer.append($no);
  }
}
