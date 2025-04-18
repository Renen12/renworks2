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
   *
   * @param {HTMLElement|Document} parent
   * @param {string} selector
   * @returns {HTMLElement}
   */
  qa(parent, selector) {
    return parent.querySelectorAll(selector);
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
};
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
          let styleText = `.${element.className} { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);}`;
          let duplicate = false;
          renWorks.enumerate(
            renWorks.qa(document.body, "style"),
            (styleElement) => {
              if (styleElement.innerHTML === styleText) {
                duplicate = true;
              }
            },
          );
          newStyle.innerHTML = styleText;
          if (!duplicate) {
            document.body.appendChild(newStyle);
          }
          break;
      }
    });
  });
}
styleDocument();
export default renWorks;
