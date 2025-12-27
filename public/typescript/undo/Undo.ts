import UseState from "./UseState.js";

export default class Undo{
    private observationItemSelector : string;

    private observationItem : HTMLElement;
    private setState : (state : HTMLElement) => void;
    private lastState : () => HTMLElement | null;
    private optionsObserver : MutationObserverInit;
    private observer : MutationObserver | null;

    constructor(observationItem : string, optionsObserver : MutationObserverInit){
        this.observationItemSelector = observationItem;
        this.observationItem = document.querySelector(observationItem) as HTMLElement;
        this.optionsObserver = optionsObserver;
        this.observer = null;

        const useState = new UseState<HTMLElement>(this.observationItem.cloneNode(true) as HTMLElement);
        this.setState = useState.setState;
        this.lastState = useState.lastState;
    }

    observerMutationTables = () => {
        // Pega a tabela de agora
        const current = document.querySelector(this.observationItemSelector) as HTMLElement;
        // Clona ela para não afetar a atual e salva no estado
        if(current) this.setState(current.cloneNode(true) as HTMLElement);
    };

    addObserver(observerItem : HTMLElement){
        // Cria o observer
        const observer = new MutationObserver(this.observerMutationTables);
        observer.observe(observerItem, this.optionsObserver);

        this.observer = observer;
    }

    addEventWindowKey(){
        // Adiciona o evento de teclado no window
        window.addEventListener("keydown", (event : KeyboardEvent) => {
            
            // Verifica se a tecla pressionada é a Z e se a tecla ctrl está pressionada
            if(!event.ctrlKey || event.key.toLowerCase() !== "z") return;

            // Pega a tabela atual e desconecta o observer dessa tabela
            const tablesContent = document.querySelector(this.observationItemSelector) as HTMLElement;
            this.observer?.disconnect();

            // Pega o estado anterior (o ultimo salvo)
            const prev = this.lastState();
            
            if(!prev) {
                // Se não houver estado anterior, volta para a tabela original
                if(tablesContent) this.observer?.observe(tablesContent, this.optionsObserver);
                return;
            }

            // Clona o elemento para não mudar o estado atual e bugar o observer
            const restore = prev.cloneNode(true) as HTMLElement;
            if(tablesContent) tablesContent.replaceWith(restore);

            this.observer?.observe(tablesContent, this.optionsObserver);
        });
    }

    init(){
        if(this.observationItem){
            this.addObserver(this.observationItem);
            this.addEventWindowKey();
        }

        return this;
    }
}