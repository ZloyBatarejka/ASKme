export default $ = {
  getNicerDate: getNicerDate,
  addToLocalStorage: addToLocalStorage,
  getFromLocalStorage: getFromLocalStorage,
  animation_speed: 400
};
import { addQuestionRow } from "./hashqDrawer";
function getNicerDate(date) {
  date = new Date(date);
  const niceDate = `${("0" + date.getHours()).slice(-2)}:${(
    "0" +
    (date.getMinutes() + 1)
  ).slice(-2)}, ${("0" + date.getDate()).slice(-2)}.${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}.${date.getFullYear()}`;
  return niceDate;
}
function addToLocalStorage(question) {
  const all = getFromLocalStorage();
  all.push(question);
  localStorage.setItem("questions", JSON.stringify(all));
}
function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("questions") || "[]");
}
