export default class CopyTextItem {
    private eventCopy: MouseEvent;

    private clipAlert: HTMLElement | null;
    private menuRightClick: HTMLElement;

    private buttonCopy: HTMLElement | null;

    private timeAnimation: number;

    private dataCopyItem: string;
    private classShowMenu: string;
    private classError: string;

    constructor(
        eventCopy: MouseEvent,
        clipAlert: string,
        buttonCopy: string,
        menuRightClick: HTMLElement,
        dataCopyItem: string,
        timeAnimation: number,
        classShowMenu?: string,
        classError?: string
    ) {
        this.eventCopy = eventCopy;

        this.clipAlert = document.querySelector(clipAlert);

        this.menuRightClick = menuRightClick;

        this.buttonCopy = document.querySelector(buttonCopy);
        this.timeAnimation = timeAnimation;

        this.dataCopyItem = dataCopyItem;

        this.classShowMenu = classShowMenu || "show";
        this.classError = classError || "error";

        this.copyText = this.copyText.bind(this);
    }

    async copyText() {
        try {
            const valueCell = (this.eventCopy.target as HTMLElement).closest(
                this.dataCopyItem
            ) as HTMLElement;
            if (!valueCell) throw new Error("Value cell not found");
            if (!this.clipAlert) throw new Error("Clip alert not found");

            await navigator.clipboard.writeText(
                valueCell.getAttribute("aria-label") || ""
            );

            this.clipAlert.classList.remove(
                this.classShowMenu,
                this.classError
            );
            this.clipAlert.classList.add(this.classShowMenu);
            this.clipAlert.textContent =
                "Copiado para a área de transferência.";

            setTimeout(() => {
                this.clipAlert?.classList.remove(this.classShowMenu);
            }, this.timeAnimation);
        } catch (error) {
            console.log(error);

            if (!this.clipAlert) throw new Error("Clip alert not found");

            this.clipAlert.classList.remove(
                this.classShowMenu,
                this.classError
            );

            this.clipAlert.classList.add(this.classShowMenu, this.classError);
            this.clipAlert.textContent = "Erro ao copiar!";

            setTimeout(() => {
                this.clipAlert?.classList.remove(
                    this.classShowMenu,
                    this.classError
                );
            }, this.timeAnimation);
        }
    }

    init() {
        if (this.menuRightClick && this.buttonCopy)
            this.buttonCopy.addEventListener("click", this.copyText);

        return this;
    }
}
