export default class ClickOutside {
    private html: HTMLElement;
    public dataValue: string;
    private element: HTMLElement | null;
    private eventUser: string;
    private callbackRemove: () => void;

    constructor(
        element: HTMLElement,
        dataValue: string,
        eventUser: string,
        callbackRemove: () => void
    ) {
        this.element = element;
        this.html = document.documentElement;
        this.dataValue = dataValue;
        this.eventUser = eventUser;
        this.callbackRemove = callbackRemove;

        this.handleOutside = this.handleOutside.bind(this);
    }

    handleOutside(event: Event) {
        // Verifica se o elemento não contém o item clicado
        if (!this.element?.contains(event.target as HTMLElement)) {
            this.element?.removeAttribute(this.dataValue);
            this.html.removeEventListener(this.eventUser, this.handleOutside);

            // O callback remove é para remover estilos ou algo do genero usado para o elemento aparecer na tela
            this.callbackRemove();
        }
    }

    removeEventClickOutside() {
        this.html.removeEventListener(this.eventUser, this.handleOutside);
        this.element?.removeAttribute(this.dataValue);
    }

    addEventClickOutside() {
        if (!this.element?.hasAttribute(this.dataValue)) {
            setTimeout(() => {
                // adicionando evento no documento, mas por causa da fase de booble, coloca dentro do setTimeout
                this.html.addEventListener(this.eventUser, this.handleOutside);
            });

            // define o valor do atributo como vazio
            this.element?.setAttribute(this.dataValue, "");
        }
    }

    init() {
        if (this.element) {
            this.addEventClickOutside();
        }

        return this;
    }
}