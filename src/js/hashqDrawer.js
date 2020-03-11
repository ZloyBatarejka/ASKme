const hashControler = {
  draw: drawHashq,
  addRow: addQuestionRow
};

function drawHashq(array) {
  const content = document.querySelector("#content");
  const $section = document.createElement("section");
  $section.classList.add("hashq");
  const $div = document.createElement("div");
  $div.classList.add("container");
  $div.classList.add("hashq-container");

  $section.append($div);
  const $h1 = document.createElement("h1");
  $h1.classList.add("hashq-title");
  array.length > 0
    ? ($h1.textContent = "Ваши последние вопросы")
    : ($h1.textContent = "Вы пока не задвали вопросов");
  $div.append($h1);
  const $container = document.createElement("div");
  $container.classList.add("questionContainer");
  $div.append($container);
  addQuestionRow(array, $container);
  content.append($section);
}
export function addQuestionRow(array, $div) {
  array.forEach((item, index) => {
    const $row = document.createElement("div");
    $row.classList.add("row");
    $row.classList.add("question");
    const $col = document.createElement("div");
    $col.classList.add("col-12");
    $col.classList.add("questionCard");
    $row.append($col);
    const $ptext = document.createElement("p");
    const $pdate = document.createElement("p");
    $ptext.textContent = item.text;
    $pdate.textContent = item.date;
    $col.append($ptext);
    $col.append($pdate);
    $div.append($row);
  });
}

export default hashControler;
