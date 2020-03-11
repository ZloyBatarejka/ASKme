import Firebase from "./database";
import $ from "./base";
import drawHashq from "./hashqDrawer";
export default function postDrawer() {
  const $postContainer = document.createElement("div");
  document.querySelector("#content").append($postContainer);
  $postContainer.classList.add("container", "post-container");
  Firebase.getPosts().then(data => {
    data.reverse().forEach(item => {
      const $questionRow = document.createElement("div");
      $questionRow.classList.add("row");
      const $col = document.createElement("div");
      $col.classList.add("col-md-12", "post-col");
      $col.innerHTML = `
        <div class="post-card">
        <div class="post-question">
        <p>${item.question}</p>
        <p>${item.questionDate}</p>
        </div>
        <div class="post-answer">
        <p>Batarejka: ${item.answer}</p>
        <p>${item.answerDate}</p>
        </div>
        </div>
        `;
      $questionRow.append($col);
      $postContainer.append($questionRow);
    });
    document.querySelector("#content").append($postContainer);
    drawHashq.draw(JSON.parse(localStorage.getItem("questions") || "[]"));
  });
  return 1;
}
