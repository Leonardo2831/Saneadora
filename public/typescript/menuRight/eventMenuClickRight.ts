import AddCommentItem from "./AddCommentItem.js";
import ClickOutside from "../ClickOutside.js";
import CopyTextItem from "./CopyTextItem.js";

let clickOutside: ClickOutside | null = null;
let copyTextItem: CopyTextItem | null = null;
let addCommentItem: AddCommentItem | null = null;

function openMenuClickRight(event: MouseEvent): void {
    addCommentItem = null;
    copyTextItem = null;
    clickOutside = null;

    const menuClickRight = document.querySelector(
        '[data-menu="clickRight"]'
    ) as HTMLElement;
    const cellTable = (event.target as HTMLElement).closest(
        "[data-menu]"
    ) as HTMLElement;
    if (!menuClickRight || !cellTable) return;

    event.preventDefault();

    menuClickRight.classList.add("show");

    const pointers = {
        x: event.pageX,
        y: event.pageY,
    };

    menuClickRight.style.left = `${pointers.x + 10}px`;
    menuClickRight.style.top = `${
        pointers.y - menuClickRight.offsetHeight - 10
    }px`;

    clickOutside = new ClickOutside(
        menuClickRight,
        "data-outside",
        "click",
        () => {
            menuClickRight.classList.remove("show");
            clickOutside = null;
        }
    );
    clickOutside.init();

    copyTextItem = new CopyTextItem(
        event,
        '[data-aside="clipBoard"]',
        '[data-button="copy"]',
        menuClickRight,
        "[data-menu]",
        1500
    );
    copyTextItem.init();

    addCommentItem = new AddCommentItem(
        event,
        '[data-button="addComment"]',
        "[data-menu]",
        '[data-commentMenu]',
        'Escreva seu comentário...',
    );
    addCommentItem.init();
}

export function removeEventMenuClickRight() {
    window.removeEventListener("contextmenu", openMenuClickRight);
}

export function addEventMenuClickRight(): void {
    window.addEventListener("contextmenu", openMenuClickRight);
}
