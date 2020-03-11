import createModal from "./modal.js";
import Firebase from "./database";
import renderPage from "./renderPage";
export default function renderMenu(token) {
  const navigation = document.querySelector("#navigation");
  navigation.innerHTML = "";
  if (token) {
    try {
      document.querySelector(".ymodal").remove();
    } catch {
      null;
    }
    let $nav = document.createElement("nav");
    $nav.classList.add("navbar", "navbar-expand-lg", "navbar-dark", "bg-dark");
    $nav.innerHTML = `
        <a href="" class="brand navbar-brand logo" href="#">Batarejka</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class=" collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navigation navbar-nav mr-auto">
          <li class="nav-item" ><span data-info>Info</span></li>
          <li class="nav-item" ><span data-logout>Logout</span></li>
            </li>
          </ul>
        </div>
        `;
    navigation.append($nav);
    document.querySelector("[data-info]").addEventListener("click", () => {
      const options = {
        title: "Information",
        buttons: [],
        inputs: [],
        content: [
          " ASkme project",
          "Firebase server and host",
          "Portofolio: https://zloybatarejka.github.io/portofolio/",
          "Email: zshon@yandex.ru"
        ]
      };
      createModal(options);
    });
    document.querySelector("[data-logout]").addEventListener("click", () => {
      localStorage.removeItem("token");
      renderPage(false);
    });
  } else {
    let $nav = document.createElement("nav");
    $nav.classList.add("navbar", "navbar-expand-lg", "navbar-dark", "bg-dark");
    $nav.innerHTML = `
        <a href="" class="brand navbar-brand logo" href="#">Batarejka</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class=" collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navigation navbar-nav mr-auto">
            <li class="nav-item" ><span data-info>Info</span></li>
            <li class="nav-item" ><span data-ask>ASk</span></li>
            <li class="nav-item" ><span data-login>Login</span></li>
            </li>
          </ul>
        </div>
        `;
    navigation.append($nav);
    document.querySelector("[data-ask]").addEventListener("click", () => {
      const options = {
        title: "Type your question",
        buttons: [
          {
            text: "ASk",
            style: "dark",
            onclick: Firebase.create,
            close: true
          }
        ],
        inputs: [
          {
            text: "Question:",
            data: "question",
            type: "text"
          }
        ],
        content: false
      };
      createModal(options);
    });
    document.querySelector("[data-info]").addEventListener("click", () => {
      const options = {
        title: "Information",
        buttons: [],
        inputs: [],
        content: [
          "login/pass: admin@yandex.ru/123456",
          " ASkme project",
          "Firebase server and host",
          "Portofolio: https://zloybatarejka.github.io/portofolio/"
        ]
      };
      createModal(options);
    });
    document.querySelector("[data-login]").addEventListener("click", () => {
      const options = {
        title: "Login",
        buttons: [
          {
            text: "Login",
            style: "dark",
            onclick: Firebase.AuthFormHandler,
            close: false
          }
        ],
        inputs: [
          {
            text: "Login",
            data: "login",
            type: "text"
          },
          {
            text: "Password",
            data: "password",
            type: "password"
          }
        ],
        content: false
      };
      createModal(options);
    });
  }
}

{
  /* <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
<a href="" class="brand navbar-brand logo" href="#">Batarejka</a>
<button
  class="navbar-toggler"
  type="button"
  data-toggle="collapse"
  data-target="#navbarSupportedContent"
  aria-controls="navbarSupportedContent"
  aria-expanded="false"
  aria-label="Toggle navigation"
>
  <span class="navbar-toggler-icon"></span>
</button>
<div class=" collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navigation navbar-nav mr-auto">
    <li class="nav-item" ><span data-info>Info</span></li>
    <li class="nav-item" ><span data-ask>ASk</span></li>
    <li class="nav-item" ><span data-login>Login</span></li>
    </li>
  </ul>
</div>
</nav> */
}
