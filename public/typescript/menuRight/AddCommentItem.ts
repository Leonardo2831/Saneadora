import ClickOutside from "../ClickOutside.js";

export default class AddCommentItem {
    private eventClickRight: MouseEvent;

    private datasetMenuRight: string;

    private buttonAddComment: HTMLElement | null;
    private comment: HTMLElement;
    private textStandard: string;

    private clickOutside: ClickOutside | null;

    constructor(
        eventClickRight: MouseEvent,
        buttonAddComment: string,
        datasetMenuRight: string,
        comment: string,
        textStandard: string
    ) {
        this.eventClickRight = eventClickRight;

        this.datasetMenuRight = datasetMenuRight;

        this.buttonAddComment = document.querySelector(buttonAddComment);
        this.comment = document.querySelector(comment) as HTMLElement;
        this.textStandard = textStandard;

        this.clickOutside = null;

        this.addEventComment = this.addEventComment.bind(this);
        this.openComment = this.openComment.bind(this);

        this.clickOutside = null;
    }

    openComment(event: MouseEvent): void {
        const buttonComment = (event.target as HTMLElement).closest(
            '[data-comment="button"]'
        ) as HTMLElement;
        if (!buttonComment) return;

        event.stopPropagation();

        const commentValue: string = buttonComment.getAttribute("title") || "";

        this.comment.innerHTML = commentValue.replace("\n", "<br>");
        this.comment.classList.add("show");

        const pointers = {
            x: event.pageX,
            y: event.pageY,
        };

        this.comment.style.left = `${pointers.x + 20}px`;
        this.comment.style.top = `${
            pointers.y - this.comment.offsetHeight - 20
        }px`;

        this.clickOutside = new ClickOutside(
            this.comment,
            "data-outside",
            "click",
            () => {
                if (buttonComment) {
                    buttonComment.setAttribute(
                        "title",
                        this.comment.innerHTML.replace("<br>", "\n") || ""
                    );
                }
                this.comment.classList.remove("show");
                this.clickOutside = null;
            }
        );
        this.clickOutside.init();
    }

    createButtonComment(textComment: string): HTMLElement {
        const button = document.createElement("button");
        const classButton = [
            "absolute",
            "top-2",
            "right-2",
            "cursor-pointer",
            "rounded-md",
            "bg-yellow-100",
            "border",
            "border-yellow-600",
            "p-[5px]",
            "shadow-xl",
        ];
        button.classList.add(...classButton);
        button.setAttribute("title", textComment);
        button.setAttribute("data-comment", "button");

        // Adicionando imagem ao botão de comentário
        const img = document.createElement("img");
        img.src = "public/images/icons/comment.svg";
        img.alt = "Adicionar Comentário";
        img.classList.add("w-4", "h-4");

        button.appendChild(img);

        return button;
    }

    addEventComment(): void {
        const tableCell = (this.eventClickRight.target as HTMLElement).closest(
            this.datasetMenuRight
        );

        let buttonComment = tableCell?.querySelector(
            '[data-comment="button"]'
        ) as HTMLElement;
        if (!buttonComment) {
            buttonComment = this.createButtonComment(this.textStandard);
            tableCell?.appendChild(buttonComment);
        }

        if (!this.comment || !buttonComment || !tableCell) return;

        // verify exist class relative

        if (!tableCell.classList.contains("relative"))
            tableCell.classList.add("relative");

        window.removeEventListener("click", this.openComment);
        window.addEventListener("click", this.openComment);
    }

    addEventButtonComment() {
        this.buttonAddComment?.addEventListener("click", this.addEventComment);
    }

    init() {
        if (this.buttonAddComment) this.addEventButtonComment();

        return this;
    }
}
