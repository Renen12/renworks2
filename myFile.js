import { renWorks } from "./renWorks.js";
function render(value) {
   renWorks.removeChildrenFromParent( renWorks.get(".main"))
    renWorks.get(".main").appendChild(renWorks.cnewa("h1", {}, value));
}
let asyncItem = renWorks.connect(render);
asyncItem.data = "Hello, World!";
setTimeout(() => {
    asyncItem.data = "Hello again, World!";
}, 4000);