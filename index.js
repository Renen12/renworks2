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
export let Styling = {
  /**
   *
   * @param {Function} fn
   */
  runStyling(fn) {
    fn();
  },
  /**
   *
   * @param {HTMLElement} element
   */
  center(element) {
    let attributes = Array.from(element.attributes);
  },
};
export default renWorks;
