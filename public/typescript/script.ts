import DocumentSaneadora from "./document-saneadora/NewDocument.js";
import eventSelect from "./inputs/eventSelect.js";
import ExportTable from "./export-table/ExportTable.js";
import NewUpdate from "./NewUpadte.js";
import initSaneadoraDocument from "./saneadora/initSaneadora.js";
import LoadMatriculas from "./saneadora/ViewSaneadora.js";

// new document
const newDocument = new DocumentSaneadora(
    "[data-new='saneadora']",
    '[data-modal="cancel"]',
    '[data-modal="new"]',
    "[data-modal='new-saneadora']",
    '[data-content="textFinal"]',
    ["[data-tab]", "[data-form]", "[data-tableInfos]", "activeNav"],
    "hidden"
);
newDocument.init();

eventSelect();

// menu saneadora
const loadMatriculas: LoadMatriculas = new LoadMatriculas(
    '[data-button="viewMatriculas"]',
    '[data-modal="viewMatriculas"]',
    '[data-close="viewMatriculas"]',
    "http://localhost:3000/saneadoras",
    '[data-load="matriculas"]',
    '[data-result="saneadora"]',
    '[data-modal="verifyDelete"]',
    '[data-button="deleteCancel"]',
    '[data-button="deleteAccept"]',
    '[data-tableInfos="cadastro"]',
    '[data-tableInfos="onus"]',
    '[data-tableInfos="numeros"]',
    '[data-tableInfos="estremacao"]',
    '[data-content="textFinal"]',
    '[data-save="saneadora"]'
);
loadMatriculas.init();

const newUpdate = new NewUpdate(
    '[data-modal="news"]',
    '[data-button="news"]',
    '[data-close="news"]',
    '[data-delete="newsAlert"]'
);
newUpdate.init();

initSaneadoraDocument(
    "http://localhost:3000/saneadoras",
    '[data-tableInfos="cadastro"]',
    '[data-tableInfos="onus"]',
    '[data-tableInfos="numeros"]',
    '[data-tableInfos="estremacao"]',
    '[data-content="textFinal"]',
    '[data-save="saneadora"]',
    '[data-init="saneadora"]'
);

const exportTable: ExportTable = new ExportTable(
    '[data-export="table"]',
    '[data-tableInfos="cadastro"]',
    '[data-tableInfos="onus"]',
    '[data-tableInfos="numeros"]',
    '[data-tableInfos="estremacao"]'
);
exportTable.init();