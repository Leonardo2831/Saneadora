import DocumentSaneadora from "./document-saneadora/NewDocument.js";
import eventSelect from "./inputs/eventSelect.js";
import initSaneadoraDocument from "./saneadora/initSaneadora.js";
import LoadMatriculas from "./saneadora/ViewSaneadora.js";
// new document
var newDocument = new DocumentSaneadora("[data-new='saneadora']", '[data-modal="cancel"]', '[data-modal="new"]', "[data-modal='new-saneadora']", '[data-content="textFinal"]', ["[data-tab]", "[data-form]", "[data-tableInfos]", "activeNav"], "hidden");
newDocument.init();
eventSelect();
// menu saneadora
var loadMatriculas = new LoadMatriculas('[data-button="viewMatriculas"]', '[data-modal="viewMatriculas"]', '[data-close="viewMatriculas"]', "http://localhost:3000/saneadoras", '[data-load="matriculas"]', '[data-result="saneadora"]', '[data-modal="verifyDelete"]', '[data-button="deleteCancel"]', '[data-button="deleteAccept"]', '[data-tableInfos="cadastro"]', '[data-tableInfos="onus"]', '[data-tableInfos="numeros"]', '[data-tableInfos="estremacao"]', '[data-content="textFinal"]', '[data-save="saneadora"]');
loadMatriculas.init();
initSaneadoraDocument("http://localhost:3000/saneadoras", '[data-tableInfos="cadastro"]', '[data-tableInfos="onus"]', '[data-tableInfos="numeros"]', '[data-tableInfos="estremacao"]', '[data-content="textFinal"]', '[data-save="saneadora"]', '[data-init="saneadora"]');
