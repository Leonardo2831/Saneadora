import DocumentSaneadora from "./document-saneadora/NewDocument.js";
import eventSelect from "./inputs/eventSelect.js";
import initSaneadoraDocument from "./saneadora/initSaneadora.js";
// new document
var newDocument = new DocumentSaneadora("[data-new='saneadora']", '[data-modal="cancel"]', '[data-modal="new"]', "[data-modal='new-saneadora']", '[data-content="textFinal"]', ["[data-tab]", "[data-form]", "[data-tableInfos]", "activeNav"], "hidden");
newDocument.init();
eventSelect();
initSaneadoraDocument("http://localhost:3000/saneadoras", '[data-tableInfos="cadastro"]', '[data-tableInfos="onus"]', '[data-tableInfos="numeros"]', '[data-tableInfos="estremacao"]', '[data-content="textFinal"]', '[data-save="saneadora"]', '[data-init="saneadora"]');
