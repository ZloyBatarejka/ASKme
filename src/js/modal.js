function _createModalHTML(options) {
  const modal = document.createElement("div");
  modal.classList.add("ymodal");
  const html = `
  <div class="modal-overlay" data-close="true">
    <div class="modal-window">
      <div class="modal-header">
        <h1>${options.title}</h1>
        <span class="modal-close" data-close="true">&#10008;</span>
      </div>
      <form>
      <div class="modal-body">
      </div>
      </form>
    </div>
  </div>
  `;
  modal.innerHTML = html;
  const inputs = _createInputsHTML(options.inputs);
  const content = _createContentHTML(options.content);
  const footer = _createFooterHTML(options.buttons);
  addToBody(content);
  addToBody(inputs);
  addFooter(footer);

  document.body.append(modal);

  return modal;

  function addToBody(content) {
    if (content) {
      modal
        .querySelector(".modal-body")
        .insertAdjacentElement("beforeend", content);
    }
  }
  function addFooter(content) {
    if (content) {
      content.appendAfter(modal.querySelector(".modal-body"));
    }
  }
}

function _createFooterHTML(buttons) {
  if (!buttons.length) {
    return null;
  }
  const modalFooter = document.createElement("div");
  modalFooter.classList.add("modal-footer");
  buttons.forEach(item => {
    let $button = document.createElement("button");
    $button.classList.add("btn");
    $button.classList.add(`btn-${item.style}`);
    $button.textContent = item.text;
    $button.dataset.close = item.close;
    $button.onclick = event => {
      event.preventDefault();
      item.onclick();
    };
    modalFooter.appendChild($button);
  });
  return modalFooter;
}
function _createContentHTML(content) {
  if (!content.length) {
    return null;
  }
  const $content = document.createElement("div");
  $content.classList.add("modal-text-content");
  content.forEach(item => {
    const $p = document.createElement("p");
    $p.textContent = item;
    $content.append($p);
  });
  return $content;
}

function _createInputsHTML(inputs) {
  if (!inputs.length) {
    return null;
  }
  const inputFooter = document.createElement("div");
  inputFooter.classList.add("modal-input");
  inputs.forEach(input => {
    let $inputStr = document.createElement("div");
    $inputStr.classList.add("input-str");
    let $input = document.createElement("input");
    $input.dataset.purpose = input.data;
    $input.type = input.type;
    let $tag = document.createElement("p");
    $tag.textContent = input.text;
    $inputStr.append($tag);
    $inputStr.append($input);
    inputFooter.append($inputStr);
  });
  return inputFooter;
}

function setModal(options) {
  const ANIMATION_SPEED = 250;
  const modal = _createModalHTML(options);
  const ui = {
    open() {
      modal.classList.add("open");
    },
    close() {
      modal.classList.remove("open");
    },
    destroy() {
      this.close();
      setTimeout(() => {
        modal.remove();
      }, ANIMATION_SPEED);
    }
  };
  const listener = event => {
    if (event.target.dataset.close == "true") {
      ui.destroy();
    }
  };
  modal.addEventListener("click", listener);
  return ui;
}

function createModal(options) {
  const promise = new Promise(resolve => {
    let newModal = setModal(options);
    setTimeout(() => {
      resolve(newModal);
    }, 0);
  });
  promise.then(newModal => newModal.open());
}
function noon() {}
Element.prototype.appendAfter = function(element) {
  element.parentNode.insertBefore(this, element.nextSibling);
};
export default createModal;
