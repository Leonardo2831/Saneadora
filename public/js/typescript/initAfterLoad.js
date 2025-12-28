import NewText from "./generate-text/NewText.js";
import eventRadioInput from "./inputs/eventRadioInput.js";
import initValueInputs from "./inputs/initValueInputs.js";
import Search from "./inputs/Search.js";
import SearchMatriculas from "./inputs/SearchMatriculas.js";
import ValidateCPF from "./inputs/validarCPF.js";
import AddPeopleEstremacao from "./newValuesTable/AddPeopleEstremacao.js";
import CreateNewValue from "./newValuesTable/CreateNewValue.js";
import NewInfoEstremacao from "./newValuesTable/NewInfoEstremacao.js";
import NewNumber from "./newValuesTable/NewNumber.js";
import NewOnus from "./newValuesTable/NewOnus.js";
import NewPeopleDocument from "./newValuesTable/NewPeopleDocument.js";
import SaveSaneadora from "./saneadora/SaveSaneadora.js";
import sumValue from "./sumValues.js";
export default function initAfterLoad() {
    var _a;
    // save saneadora
    var saveSaneadora = new SaveSaneadora("[data-save='saneadora']", '[data-notification="save"]', '[data-tableInfos="cadastro"]', '[data-tableInfos="onus"]', '[data-tableInfos="numeros"]', '[data-tableInfos="estremacao"]', '[data-content="textFinal"]', '[data-save-result="saneadora"]', "http://localhost:3000/saneadoras", { childList: true, subtree: true, characterData: true });
    saveSaneadora.init();
    // ctrl + z
    // const undoEvent : Undo = new Undo("[data-content='tables']", { childList: true, subtree: true, characterData: true });
    // undoEvent.init();
    // new value in table cadastro
    var newValueCadstro = new CreateNewValue('[data-button="add"]', '[data-modal="newValue"]', '[data-button="newValue"]', '[data-button="newCancel"]', '[data-content="percentBase"]', "activeBaseCalc");
    newValueCadstro.init();
    // create new people
    var newPeople = new NewPeopleDocument('[data-input="nameCadastro"]', '[data-inputCPF="cpfCadastro"]', '[data-select="stateCadastro"]', '[data-input="nameConjugeCadastro"]', '[data-inputCPF="cpfConjugeCadastro"]', '[data-input="atoCadastro"]', '[data-button="addCadastro"]', '[data-contentColumns="cadastro"]', '[data-input="areaCadastro"]', newValueCadstro, '[data-input="valorBaseCadastro"]');
    newPeople.init();
    // verify base calc in cadastro
    var modalNewValue = document.querySelector('[data-formContent="cadastro"]');
    var classBaseCalc = "activeBaseCalc";
    var contentPercentBase = document.querySelector('[data-content="percentBase"]');
    eventRadioInput(modalNewValue, classBaseCalc, contentPercentBase);
    // verify base calc in modal new value
    var modalNewValueTable = document.querySelector('[data-modal="newValue"]');
    var contentPercentBaseModal = modalNewValueTable.querySelector('[data-content="percentBase"]');
    if (modalNewValueTable && contentPercentBaseModal) {
        eventRadioInput(modalNewValueTable, classBaseCalc, contentPercentBaseModal);
    }
    // create new onus
    var newOnus = new NewOnus('[data-content="onus"]', '[data-input="nameOnus"]', '[data-inputCPF="onus"]', '[data-select="onus"]', '[data-inputAto="onus"]', '[data-button="addOnus"]');
    newOnus.init();
    // create new number
    var newNumber = new NewNumber('[data-content="numbers"]', '[data-input="number"]', '[data-inputCPF="numbers"]', '[data-select="numbers"]', '[data-inputAto="numbers"]', '[data-button="addNumbers"]');
    newNumber.init();
    // add people estremacao
    var addPeopleEstremacao = new AddPeopleEstremacao('[data-modal="newPeopleEstremacao"]', '[data-input="nameEstremacao"]', '[data-inputCPF="cpfEstremacao"]', '[data-input="nameConjugeEstremacao"]', '[data-input="cpfConjugeEstremacao"]', '[data-button="new-peopleEstremacao"]', '[data-button="new-cancelEstremacao"]', '[data-button="addPeopleEstremacao"]');
    addPeopleEstremacao.init();
    // new extremacao info
    var newInfoEstremacao = new NewInfoEstremacao('[data-inputName="estremacao"]', '[data-inputCPF="cpfEstremacao"]', '[data-select="stateEstremacao"]', '[data-inputName="conjugeEstremacao"]', '[data-inputCPF="cpfConjugeEstremacao"]', '[data-input="atoEstremacao"]', '[data-input="areaEstremada"]', '[data-input="newMatricula"]', '[data-button="addEstremacao"]', '[data-formContent="estremacao"]', '[data-tableContent="estremacao"]', addPeopleEstremacao);
    newInfoEstremacao.init();
    // validate CPFs
    var validateCPFs = new ValidateCPF("[data-input='cpf']", "invalid");
    validateCPFs.init();
    // search bar
    var search = new Search("[data-table='items']", "[data-input='search']", "selectedSearch", "animationEnter");
    search.init();
    // search matriculas
    var searchMatriculas = new SearchMatriculas("[data-content='matriculas']", "[data-input='search-matriculas']", "find", "hidden");
    searchMatriculas.init();
    // modal generate text
    var generateText = new NewText('[data-content="textFinal"]', '[data-modal="generateText"]', "show-generateText", '[data-close="generateText"]', '[data-button="generateText"]', '[data-button="createInitialText"]', '[data-initial="textMatricula"]', {
        modules: {
            syntax: true,
            toolbar: "#toolbar-container",
        },
        formats: [
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "code-block",
            "header",
            "list",
            "indent",
            "link",
            "image",
            "color",
            "background",
            "font",
            "size",
            "align",
            "direction",
            "script",
        ],
        placeholder: "Escreva o início da matrícula e sua origem.",
        theme: "snow",
    });
    generateText.init();
    var areaMatricula = document.querySelector('[data-real="area"]');
    var _b = ((_a = areaMatricula.textContent) === null || _a === void 0 ? void 0 : _a.match(/([0-9]+[.,]?[0-9]*)+|[a-zA-Z]+/g)) ||
        [], unitArea = _b[1];
    // calculando a área
    sumValue('[data-area="total"]', '[data-sum="area"]', unitArea);
    // calculando porcentagem
    sumValue('[data-area="percent"]', '[data-sum="percent"]', "%");
    initValueInputs();
}
