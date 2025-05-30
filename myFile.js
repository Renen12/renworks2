/**
 *
 * @param {string} string
 * @returns {Array<String>}
 */
function splitString(string) {
  return string.split(",");
}
import { renWorks } from "./renWorks.js";
let item = renWorks.Result("Hello, World!");
// Try removing the call to unwrap()!
let x = splitString(item.unwrap());
console.log(x);
