import drawHashq from "./hashqDrawer";
import renderMenu from "./renderMenu";
import Firebase from "./database";
import questionDrawer from "./questionDrawer";
import postDrawer from "./postsDrawer";

export default function renderPage(token) {
  const content = document.querySelector("#content");
  content.innerHTML = "";
  if (token) {
    renderMenu(token);
    questionDrawer();
  } else {
    postDrawer();
    renderMenu(false);
  }
}
