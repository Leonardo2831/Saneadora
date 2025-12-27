import AddCommentItem from "./AddCommentItem.js";
import ClickOutside from "../ClickOutside.js";
import CopyTextItem from "./CopyTextItem.js";
var clickOutside = null;
var copyTextItem = null;
var addCommentItem = null;
function openMenuClickRight(event) {
    addCommentItem = null;
    copyTextItem = null;
    clickOutside = null;
    var menuClickRight = document.querySelector('[data-menu="clickRight"]');
    var cellTable = event.target.closest("[data-menu]");
    if (!menuClickRight || !cellTable)
        return;
    event.preventDefault();
    menuClickRight.classList.add("show");
    var pointers = {
        x: event.pageX,
        y: event.pageY,
    };
    menuClickRight.style.left = "".concat(pointers.x + 10, "px");
    menuClickRight.style.top = "".concat(pointers.y - menuClickRight.offsetHeight - 10, "px");
    clickOutside = new ClickOutside(menuClickRight, "data-outside", "click", function () {
        menuClickRight.classList.remove("show");
        clickOutside = null;
    });
    clickOutside.init();
    copyTextItem = new CopyTextItem(event, '[data-aside="clipBoard"]', '[data-button="copy"]', menuClickRight, "[data-menu]", 1500);
    copyTextItem.init();
    addCommentItem = new AddCommentItem(event, '[data-button="addComment"]', "[data-menu]", '[data-commentMenu]', 'Escreva seu comentário...');
    addCommentItem.init();
}
export function removeEventMenuClickRight() {
    window.removeEventListener("contextmenu", openMenuClickRight);
}
export function addEventMenuClickRight() {
    window.addEventListener("contextmenu", openMenuClickRight);
}
