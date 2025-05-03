export let renWorks = {
  /**
   *
   * @param {string} selector
   * @returns {HTMLElement}
   */
  get(selector) {
    let element = document.querySelector(selector);
    if (element == null || element == undefined) {
      throw new Error(
        `Cannot find an element with the identifier ${selector}. Perhaps it has not loaded in or does not exist.`,
      );
    }
    return element;
  },
  /**
   * @param {string} selector
   * @returns {HTMLElement|null}
   */
  // Can return a null-like value, unlike get()
  unsafeGet(selector) {
    return document.querySelector(selector);
  },
  /**
   *
   * @param {HTMLElement|Document} parent
   * @param {string} selector
   * @returns {HTMLElement[]}
   */
  qa(parent, selector) {
    return parent.querySelectorAll(selector);
  },
  /**
   * @param {(answer: string) => {}} fn
   * @param {string} msg
   * @param {string} defaultAnswer
   */
  beseech(msg, fn, defaultAnswer) {
    let dialogue = this.createNewElementWithAttributes("dialog", {
      style: "color: black;",
    });
    let msgElem = this.createNewElementWithAttributes(
      "p",
      {},
      msg || "Please supply a valid msg value.",
    );
    let textinput = document.createElement("input");
    textinput.type = "text";
    let confirmBtn = this.createNewElementWithAttributes(
      "button",
      {
        type: "button",
      },
      "Confirm",
    );
    function runFn() {
      if (renWorks.RemoveXFromString(textinput.value, " ")) {
        fn(textinput.value);
      } else {
        fn(defaultAnswer);
      }
      dialogue.close();
    }
    confirmBtn.onclick = () => {
      runFn();
    };
    textinput.onkeydown = (event) => {
      if (event.key === "Enter") {
        runFn();
      }
    };
    dialogue.appendChild(msgElem);
    dialogue.appendChild(textinput);
    dialogue.appendChild(confirmBtn);
    document.body.appendChild(dialogue);
    dialogue.showModal();
  },
  /**
   * @param {(answer: string) => {}} fn
   * @param {string[]} options
   * @param {string} msg
   */
  beseechDropDown(options, msg, fn) {
    let dialogue = document.createElement("dialog");
    let dropdown = document.createElement("select");
    let text = this.cnewa("p", {}, msg);
    let btn = this.cnewa("button", {}, "Confirm");
    btn.onclick = () => {
      fn(dropdown.options[dropdown.selectedIndex].innerText);
      dialogue.close();
    };
    this.enumerate(options, (option) => {
      dropdown.appendChild(
        this.createNewElementWithAttributes(
          "option",
          {
            name: option,
          },
          option,
        ),
      );
    });
    dialogue.appendChild(text);
    dialogue.appendChild(dropdown);
    dialogue.appendChild(btn);
    document.body.appendChild(dialogue);
    dialogue.showModal();
  },

  /**
   *
   * @param {any[]} collection
   * @param {(value, index) => void} fn
   */
  enumerate(collection, fn) {
    for (let i = 0; i < collection.length; i++) {
      fn(collection[i], i);
    }
  },
  /**
   *
   * @param {{}[]} array
   * @param {string[]} propertyAndDesiredValue
   */
  // ["name", "test"] -> Look for property "name" with value "test"
  matchingObj(array, propertyAndDesiredValue) {
    let desired = null;
    this.enumerate(array, (obj) => {
      if (obj[propertyAndDesiredValue[0]] == propertyAndDesiredValue[1]) {
        desired = obj;
      }
    });
    if (desired == null) {
      throw new Error("No such object found.");
    }
    return desired;
  },
  /**
   *
   * @param {string} type
   */
  createNewElementWithAttributes(type, attributes, optionalTextContent) {
    let element = document.createElement(type);
    if (optionalTextContent != null) {
      element.innerText = optionalTextContent;
    }
    for (let i = 0; i < Object.keys(attributes).length; i++) {
      element.setAttribute(
        Object.keys(attributes)[i],
        Object.values(attributes)[i],
      );
    }
    return element;
  },
  // Alias for createNewElementWithAttributes()
  /**
   *
   * @param {string} type
   * @param {string} attrib
   * @param {string} text
   * @returns {HTMLElement}
   */
  cnewa(type, attrib, text) {
    return this.createNewElementWithAttributes(type, attrib, text);
  },
  /**
   *
   * @param {string} string
   * @param {string} X
   * @returns {void}
   */
  mutRemoveXFromString(string, X) {
    string = string.replaceAll(X, "");
  },
  /**
  *
  * @param {string} string
  * @param {string} X
  @returns {string}
  */
  RemoveXFromString(string, X) {
    return string.replaceAll(X, "");
  },
  /**
   *
   * @param {Array<number>} array
   */
  sorted(array) {
    array.sort((a, b) => {
      return a - b;
    });
    return array;
  },
  // Tests if the supplied value is not valid, e.g null. If that is the case, it will run the fn() function that was supplied.
  // Returns [v, successValue]
  /**
   *
   * @param {any} v
   * @param {Function} fn
   * @returns {Array<any>}
   */
  test(v, fn) {
    if (v === null || v === undefined || isNaN(v)) {
      fn();
      return [v, false];
    }
    return [v, true];
  },
  /**
   *
   * @param {string} msg
   * @param {(accepted) => {}} fn
   * @param {string|null} denyButtonDisplay
   * @param {string|null} acceptButtonDisplay
   */
  // Alternative to the window.confirm() function.
  confirm(msg, fn, acceptButtonDisplay, denyButtonDisplay) {
    let dialogue = this.cnewa("dialog", {}, null);
    let text = this.cnewa("h3", {}, msg);
    let accept = this.cnewa("button", {}, acceptButtonDisplay || "Accept");
    let deny = this.cnewa("button", {}, denyButtonDisplay || "Deny");
    accept.onclick = () => {
      fn(true);
      return;
    };
    deny.onclick = () => {
      fn(false);
      return;
    };
    dialogue.appendChild(text);
    dialogue.appendChild(accept);
    dialogue.appendChild(deny);
    document.body.appendChild(dialogue);
    dialogue.showModal();
  },
};
function styleOneElement(style, className, newStyle) {
  let styleText = `.${className} {${style}}`;
  let duplicate = false;
  renWorks.enumerate(renWorks.qa(document.body, "style"), (styleElement) => {
    if (styleElement.innerHTML === styleText) {
      duplicate = true;
    }
  });
  newStyle.innerHTML = styleText;
  if (!duplicate) {
    document.body.appendChild(newStyle);
  }
}
// Run styling on all elements
function styleDocument() {
  let allElements = renWorks.qa(document, "*");
  renWorks.enumerate(allElements, (element) => {
    let itsAttributes = Array.from(element.attributes);
    renWorks.enumerate(itsAttributes, (attribute) => {
      let name = attribute.name;
      let value = attribute.nodeValue;
      switch (name) {
        case "div-centered-absolute":
          let newStyle = document.createElement("style");
          if (element.className === "") {
            throw new Error(`The div ${element.outerHTML} needs a class name.`);
          }
          styleOneElement(
            "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);",
            element.className,
            newStyle,
          );
          break;
        case "div-centered-flex":
          if (element.className === "") {
            throw new Error(`The div ${element.outerHTML} needs a class name.`);
          }
          styleOneElement(
            `display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;`,
            element.className,
            document.createElement("style"),
          );
          break;
      }
    });
  });
}
styleDocument();
export default renWorks;
