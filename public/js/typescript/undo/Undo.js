import UseState from "./UseState.js";
var Undo = /** @class */ (function () {
    function Undo(observationItem, optionsObserver) {
        var _this = this;
        this.observerMutationTables = function () {
            // Pega a tabela de agora
            var current = document.querySelector(_this.observationItemSelector);
            // Clona ela para não afetar a atual e salva no estado
            if (current)
                _this.setState(current.cloneNode(true));
        };
        this.observationItemSelector = observationItem;
        this.observationItem = document.querySelector(observationItem);
        this.optionsObserver = optionsObserver;
        this.observer = null;
        var useState = new UseState(this.observationItem.cloneNode(true));
        this.setState = useState.setState;
        this.lastState = useState.lastState;
    }
    Undo.prototype.addObserver = function (observerItem) {
        // Cria o observer
        var observer = new MutationObserver(this.observerMutationTables);
        observer.observe(observerItem, this.optionsObserver);
        this.observer = observer;
    };
    Undo.prototype.addEventWindowKey = function () {
        var _this = this;
        // Adiciona o evento de teclado no window
        window.addEventListener("keydown", function (event) {
            var _a, _b, _c;
            // Verifica se a tecla pressionada é a Z e se a tecla ctrl está pressionada
            if (!event.ctrlKey || event.key.toLowerCase() !== "z")
                return;
            // Pega a tabela atual e desconecta o observer dessa tabela
            var tablesContent = document.querySelector(_this.observationItemSelector);
            (_a = _this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
            // Pega o estado anterior (o ultimo salvo)
            var prev = _this.lastState();
            if (!prev) {
                // Se não houver estado anterior, volta para a tabela original
                if (tablesContent)
                    (_b = _this.observer) === null || _b === void 0 ? void 0 : _b.observe(tablesContent, _this.optionsObserver);
                return;
            }
            // Clona o elemento para não mudar o estado atual e bugar o observer
            var restore = prev.cloneNode(true);
            if (tablesContent)
                tablesContent.replaceWith(restore);
            (_c = _this.observer) === null || _c === void 0 ? void 0 : _c.observe(tablesContent, _this.optionsObserver);
        });
    };
    Undo.prototype.init = function () {
        if (this.observationItem) {
            this.addObserver(this.observationItem);
            this.addEventWindowKey();
        }
        return this;
    };
    return Undo;
}());
export default Undo;
