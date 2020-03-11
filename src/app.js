import "./css/styles.css";
import createModal from "./js/modal.js";
import Firebase from "./js/database";
import drawHashq from "./js/hashqDrawer";
import renderPage from "./js/renderPage";
let token = localStorage.getItem("token");
if (token) {
  renderPage(token);
} else {
  renderPage(false);
}
