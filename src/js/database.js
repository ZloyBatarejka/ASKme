// https://askme-a22dc.firebaseio.com/
import $ from "./base";
import renderPage from "./renderPage";
import Axios from "axios";
class Firebase {
  static create() {
    const input = document.querySelector(`[data-purpose="question"]`);
    const text = input.value;
    const date = $.getNicerDate(new Date());
    const question = {
      text,
      date
    };
    const url = "https://askme-a22dc.firebaseio.com/questions.json";
    input.value = "";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(question),
      headers: {
        "Content-Type": "application/json"
      }
    });
    $.addToLocalStorage(question);
  }
  static getQuestions() {
    return fetch("https://askme-a22dc.firebaseio.com/questions.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => data.json())
      .then(data => data);
  }
  static getPosts() {
    return fetch("https://askme-a22dc.firebaseio.com/posts.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => data.json())
      .then(data => Array.from(Object.values(data)));
  }
  static createPost(post) {
    const url = "https://askme-a22dc.firebaseio.com/posts.json";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  static delete(key) {
    const url = "https://askme-a22dc.firebaseio.com/questions.json";
    Axios.delete(`https://askme-a22dc.firebaseio.com/questions/${key}.json`);
  }
  static autoWihPasswordAndEmail(email, password) {
    const apiKey = "AIzaSyCy_XBbjgieOvywWfFYW3-6_g3wAsen3ig";
    return fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data.idToken) {
          localStorage.setItem("token", JSON.stringify(data.idToken));
          return data.idToken;
        }
      });
  }

  static AuthFormHandler() {
    const loginInput = document.querySelector("[data-purpose='login']");
    const passwordInput = document.querySelector("[data-purpose='password']");
    Firebase.autoWihPasswordAndEmail(
      loginInput.value,
      passwordInput.value
    ).then(token => {
      if (token) {
        renderPage(token);
      }
    });
    loginInput.value = "";
    passwordInput.value = "";
  }
}

export default Firebase;
