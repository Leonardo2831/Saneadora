import ClickOutside from "../ClickOutside.js";
var AddCommentItem = /** @class */ (function () {
    function AddCommentItem(eventClickRight, buttonAddComment, datasetMenuRight, comment, textStandard) {
        this.eventClickRight = eventClickRight;
        this.datasetMenuRight = datasetMenuRight;
        this.buttonAddComment = document.querySelector(buttonAddComment);
        this.comment = document.querySelector(comment);
        this.textStandard = textStandard;
        this.clickOutside = null;
        this.addEventComment = this.addEventComment.bind(this);
        this.openComment = this.openComment.bind(this);
        this.clickOutside = null;
    }
    AddCommentItem.prototype.openComment = function (event) {
        var _this = this;
        var buttonComment = event.target.closest('[data-comment="button"]');
        if (!buttonComment)
            return;
        event.stopPropagation();
        var commentValue = buttonComment.getAttribute("title") || "";
        this.comment.innerHTML = commentValue.replace("\n", "<br>");
        this.comment.classList.add("show");
        var pointers = {
            x: event.pageX,
            y: event.pageY,
        };
        this.comment.style.left = "".concat(pointers.x + 20, "px");
        this.comment.style.top = "".concat(pointers.y - this.comment.offsetHeight - 20, "px");
        this.clickOutside = new ClickOutside(this.comment, "data-outside", "click", function () {
            if (buttonComment) {
                buttonComment.setAttribute("title", _this.comment.innerHTML.replace("<br>", "\n") || "");
            }
            _this.comment.classList.remove("show");
            _this.clickOutside = null;
        });
        this.clickOutside.init();
    };
    AddCommentItem.prototype.createButtonComment = function (textComment) {
        var _a;
        var button = document.createElement("button");
        var classButton = [
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
        (_a = button.classList).add.apply(_a, classButton);
        button.setAttribute("title", textComment);
        button.setAttribute("data-comment", "button");
        // Adicionando imagem ao botão de comentário
        var img = document.createElement("img");
        img.src = "public/images/icons/comment.svg";
        img.alt = "Adicionar Comentário";
        img.classList.add("w-4", "h-4");
        button.appendChild(img);
        return button;
    };
    AddCommentItem.prototype.addEventComment = function () {
        var tableCell = this.eventClickRight.target.closest(this.datasetMenuRight);
        var buttonComment = tableCell === null || tableCell === void 0 ? void 0 : tableCell.querySelector('[data-comment="button"]');
        if (!buttonComment) {
            buttonComment = this.createButtonComment(this.textStandard);
            tableCell === null || tableCell === void 0 ? void 0 : tableCell.appendChild(buttonComment);
        }
        if (!this.comment || !buttonComment || !tableCell)
            return;
        // verify exist class relative
        if (!tableCell.classList.contains("relative"))
            tableCell.classList.add("relative");
        window.removeEventListener("click", this.openComment);
        window.addEventListener("click", this.openComment);
    };
    AddCommentItem.prototype.addEventButtonComment = function () {
        var _a;
        (_a = this.buttonAddComment) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.addEventComment);
    };
    AddCommentItem.prototype.init = function () {
        if (this.buttonAddComment)
            this.addEventButtonComment();
        return this;
    };
    return AddCommentItem;
}());
export default AddCommentItem;
