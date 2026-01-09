var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ExportTable = /** @class */ (function () {
    function ExportTable(buttonExport, selectorCadastro, selectorOnus, selectorNumbers, selectorEstremacao) {
        this.buttonExport = document.querySelector(buttonExport);
        // Store selectors instead of elements
        this.selectorCadastro = selectorCadastro;
        this.selectorOnus = selectorOnus;
        this.selectorNumbers = selectorNumbers;
        this.selectorEstremacao = selectorEstremacao;
        this.createExportTable = this.createExportTable.bind(this);
    }
    // Auxiliar para mapear classes CSS para cores ARGB do Excel
    ExportTable.prototype.getColorFromElement = function (element) {
        if (!element)
            return undefined;
        // Mapeamento de Cores (ARGB)
        // Verde (table-value-green e variantes) -> LightGreen
        if (element.classList.contains("table-value-green") ||
            element.classList.contains("table-value-limon"))
            return "FF90EE90";
        // Vermelho (table-value-red) -> LightCoral
        if (element.classList.contains("table-value-red"))
            return "FFF08080";
        // Azul (table-value-blue) -> LightBlue
        if (element.classList.contains("table-value-blue"))
            return "FFADD8E6";
        // Cinza (table-value-gray) -> LightGray
        if (element.classList.contains("table-value-gray"))
            return "FFD3D3D3";
        return undefined;
    };
    // Helper to get value and color from a container (e.g., a div with an input inside)
    ExportTable.prototype.getValueAndColor = function (container) {
        var _a;
        var input = container.querySelector("input.table-value, div.table-value");
        var val = "";
        if (input) {
            if (input instanceof HTMLInputElement)
                val = input.value;
            else
                val = ((_a = input.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
        }
        // Robust color detection by querying classes within the cell container
        // Priority: Orange > Red > Green > Blue > Gray to handle overrides if any
        var color = undefined;
        if (container.querySelector(".table-value-orange")) {
            color = "FFFFA500"; // Orange
        }
        else if (container.querySelector(".table-value-red")) {
            color = "FFF08080"; // LightCoral
        }
        else if (container.querySelector(".table-value-green") ||
            container.querySelector(".table-value-limon")) {
            color = "FF90EE90"; // LightGreen
        }
        else if (container.querySelector(".table-value-blue")) {
            color = "FFADD8E6"; // LightBlue
        }
        else if (container.querySelector(".table-value-gray")) {
            color = "FFD3D3D3"; // LightGray
        }
        return { value: val, color: color };
    };
    /**
     * Extrai dados de uma estrutura baseada em DIVs (usada na seção Cadastro).
     */
    ExportTable.prototype.dataFromDivs = function (container) {
        var _this = this;
        var groups = [];
        var items = container.querySelectorAll(".children-style-cell");
        items.forEach(function (item) {
            var _a, _b, _c, _d, _e, _f;
            var groupRows = [];
            // Extract Basic Info
            var headerVal = ((_b = (_a = item.querySelector("header")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
            // Select all data-menu/column containers
            var menus = item.querySelectorAll("div[data-menu]");
            // Expected indices:
            // 0: Name, 1: CPF, 2: NameConj, 3: CPFConj
            // 4..N-3: Area History Items
            // N-2: Total Area
            // N-1: Percent
            if (menus.length < 6)
                return; // Malformed structure
            var name = ((_c = menus[0].querySelector("input")) === null || _c === void 0 ? void 0 : _c.value) || "";
            var cpf = ((_d = menus[1].querySelector("input")) === null || _d === void 0 ? void 0 : _d.value) || "";
            var nameConj = ((_e = menus[2].querySelector("input")) === null || _e === void 0 ? void 0 : _e.value) || "";
            var cpfConj = ((_f = menus[3].querySelector("input")) === null || _f === void 0 ? void 0 : _f.value) || "";
            // Total and Percent (Last 2 items)
            var totalIndex = menus.length - 2;
            var percentIndex = menus.length - 1;
            var totalData = _this.getValueAndColor(menus[totalIndex]);
            var percentData = _this.getValueAndColor(menus[percentIndex]);
            // History Items (Index 4 to totalIndex - 1)
            var historyStartIndex = 4;
            var historyEndIndex = totalIndex;
            var historyItems = [];
            for (var i = historyStartIndex; i < historyEndIndex; i++) {
                historyItems.push(menus[i]);
            }
            // If no history items found (unlikely if valid), create at least one row with empty area
            if (historyItems.length === 0) {
                groupRows.push({
                    cells: [
                        { value: headerVal },
                        { value: name },
                        { value: cpf },
                        { value: nameConj },
                        { value: cpfConj },
                        { value: "" }, // Empty Area
                        totalData,
                        percentData,
                    ],
                });
            }
            else {
                // Create a row for each history item
                historyItems.forEach(function (histItem, index) {
                    var areaData = _this.getValueAndColor(histItem);
                    // First row contains all data. Subsequent rows only contain Area (others are merged/empty)
                    if (index === 0) {
                        groupRows.push({
                            cells: [
                                { value: headerVal },
                                { value: name },
                                { value: cpf },
                                { value: nameConj },
                                { value: cpfConj },
                                areaData,
                                totalData,
                                percentData,
                            ],
                        });
                    }
                    else {
                        // Subsequent rows: Empty basic info and totals (will be merged visually)
                        groupRows.push({
                            cells: [
                                { value: "" },
                                { value: "" },
                                { value: "" },
                                { value: "" },
                                { value: "" },
                                areaData,
                                { value: "" },
                                { value: "" },
                            ],
                        });
                    }
                });
            }
            groups.push({ rows: groupRows });
        });
        return groups;
    };
    /**
     * Extrai dados de Table Rows (TRs).
     */
    ExportTable.prototype.dataFromTableRows = function (container, type) {
        var _this = this;
        // Table rows usually don't have the history complexity of Cadastro,
        // but let's standardize the return type.
        var groups = [];
        var trs = container.querySelectorAll("tr");
        trs.forEach(function (tr) {
            var rowData = [];
            var tds = tr.querySelectorAll("td");
            tds.forEach(function (td) {
                var _a, _b;
                var input = td.querySelector("input");
                var select = td.querySelector("select");
                var divValue = td.querySelector(".table-value");
                if (input)
                    rowData.push({ value: input.value });
                else if (select)
                    rowData.push({ value: select.value });
                else if (divValue)
                    rowData.push({
                        value: ((_a = divValue.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "",
                        color: _this.getColorFromElement(divValue),
                    });
                else
                    rowData.push({ value: ((_b = td.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "" });
            });
            groups.push({ rows: [{ cells: rowData }] });
        });
        return groups;
    };
    // Helper to extract special Estremacao header data from Cadastro section
    ExportTable.prototype.getEstremacaoHeaderData = function (container) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        // Search for ALL headers that act as Estremacao headers
        // These headers typically contain "Matrícula" and "Área" info and are not the small cell headers (which are typically just R.X)
        var headers = container.querySelectorAll("header");
        var extractedHeaders = [];
        for (var i = 0; i < headers.length; i++) {
            var h = headers[i];
            // Filter out small cell headers (e.g., inside .children-style-cell)
            // Estremacao headers usually have data-matricula or specific text structure
            if (h.closest(".children-style-cell"))
                continue;
            // Check if it's a valid Estremacao header (active or history/opaque)
            if (((_a = h.textContent) === null || _a === void 0 ? void 0 : _a.includes("Matrícula")) ||
                ((_b = h.textContent) === null || _b === void 0 ? void 0 : _b.includes("Área"))) {
                var matricula = ((_d = (_c = h.querySelector("[data-matricula]")) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()) ||
                    "-";
                // Area might be in data-real="area" or just text.
                // In NewEstremacao.ts, it puts it in [data-real="area"]
                var area = h.querySelector('[data-real="area"]')
                    ? (_f = (_e = h.querySelector('[data-real="area"]')) === null || _e === void 0 ? void 0 : _e.textContent) === null || _f === void 0 ? void 0 : _f.trim()
                    : ((_h = (_g = h.innerText
                        .split("Área:")[1]) === null || _g === void 0 ? void 0 : _g.split("Área Somada")[0]) === null || _h === void 0 ? void 0 : _h.trim()) || "-"; // Fallback parsing
                // Extract only if meaningful
                if (matricula !== "-" || area !== "-") {
                    extractedHeaders.push([
                        "Matr\u00EDcula: ".concat(matricula),
                        "\u00C1rea: ".concat(area),
                    ]);
                }
            }
        }
        return extractedHeaders.length > 0 ? extractedHeaders : null;
    };
    ExportTable.prototype.createExportTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sectionCadastro, sectionOnus, sectionNumbers, sectionEstremacao, wb, ws, hasData, currentRowIndex, processSection, headersCadastro, headersOnus, headersNumbers, headersEstremacao, specialData, matricula, buffer, blob, link;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        sectionCadastro = document.querySelector(this.selectorCadastro);
                        sectionOnus = document.querySelector(this.selectorOnus);
                        sectionNumbers = document.querySelector(this.selectorNumbers);
                        sectionEstremacao = document.querySelector(this.selectorEstremacao);
                        wb = new ExcelJS.Workbook();
                        ws = wb.addWorksheet("Saneadora");
                        hasData = false;
                        currentRowIndex = 1;
                        processSection = function (groups, title, headers, specialHeadersData) {
                            if (specialHeadersData === void 0) { specialHeadersData = null; }
                            if (groups.length === 0)
                                return;
                            hasData = true;
                            // Title of the section (e.g. "Cadastro", "Ônus")
                            var titleRow = ws.getRow(currentRowIndex++);
                            var titleCell = titleRow.getCell(1);
                            titleCell.value = title;
                            titleCell.font = { bold: true, size: 14 };
                            // Merge title cell for better appearance
                            ws.mergeCells(currentRowIndex - 1, 1, currentRowIndex - 1, 8);
                            // 1. Special Header for Estremacao (if present)
                            if (specialHeadersData && specialHeadersData.length > 0) {
                                specialHeadersData.forEach(function (headerData) {
                                    var specialRow = ws.getRow(currentRowIndex++);
                                    headerData.forEach(function (text, idx) {
                                        // Spread info.
                                        var targetCol = idx * 4 + 1; // Col 1 and Col 5
                                        var cell = specialRow.getCell(targetCol);
                                        cell.value = text;
                                        cell.font = { bold: true, color: { argb: "FF006400" } }; // Dark Green Text
                                        // Merge
                                        ws.mergeCells(currentRowIndex - 1, targetCol, currentRowIndex - 1, targetCol + 3);
                                    });
                                    // Apply Very Light Green Background to the whole row range
                                    for (var c = 1; c <= 8; c++) {
                                        var cell = specialRow.getCell(c);
                                        cell.fill = {
                                            type: "pattern",
                                            pattern: "solid",
                                            fgColor: { argb: "FFE2EFDA" }, // Very Light Green
                                        };
                                        cell.border = {
                                            top: { style: "thin" },
                                            left: { style: "thin" },
                                            bottom: { style: "thin" },
                                            right: { style: "thin" },
                                        };
                                    }
                                });
                            }
                            // 2. Main Headers
                            var headerRow = ws.getRow(currentRowIndex++);
                            headers.forEach(function (h, i) {
                                var cell = headerRow.getCell(i + 1);
                                cell.value = h;
                                cell.fill = {
                                    type: "pattern",
                                    pattern: "solid",
                                    fgColor: { argb: "FFCCCCCC" },
                                };
                                cell.font = { bold: true };
                                cell.border = {
                                    top: { style: "thin" },
                                    left: { style: "thin" },
                                    bottom: { style: "thin" },
                                    right: { style: "thin" },
                                };
                                cell.alignment = { horizontal: "center" };
                            });
                            // 3. Data Rows
                            groups.forEach(function (group) {
                                var startRow = currentRowIndex;
                                group.rows.forEach(function (row) {
                                    var excelRow = ws.getRow(currentRowIndex);
                                    row.cells.forEach(function (cellData, colIndex) {
                                        var cell = excelRow.getCell(colIndex + 1);
                                        cell.value = cellData.value;
                                        if (cellData.color) {
                                            cell.fill = {
                                                type: "pattern",
                                                pattern: "solid",
                                                fgColor: { argb: cellData.color },
                                            };
                                        }
                                        cell.border = {
                                            top: { style: "thin" },
                                            left: { style: "thin" },
                                            bottom: { style: "thin" },
                                            right: { style: "thin" },
                                        };
                                        cell.alignment = {
                                            wrapText: true,
                                            vertical: "middle",
                                            horizontal: "left",
                                        };
                                    });
                                    currentRowIndex++;
                                });
                                var endRow = currentRowIndex - 1;
                                // Merge Logic
                                if (endRow > startRow) {
                                    // Merge Cols 1-5 (Basic Info)
                                    for (var c = 1; c <= 5; c++) {
                                        ws.mergeCells(startRow, c, endRow, c);
                                    }
                                    // Merge Totals if they exist (7, 8 for Cadastro)
                                    if (title === "Cadastro") {
                                        ws.mergeCells(startRow, 7, endRow, 7);
                                        ws.mergeCells(startRow, 8, endRow, 8);
                                    }
                                }
                            });
                            // Add padding (2 empty rows) between tables
                            currentRowIndex += 2;
                        };
                        headersCadastro = [
                            "Ato",
                            "Nome Pessoa",
                            "CPF Pessoa",
                            "Nome Cônjuge",
                            "CPF Cônjuge",
                            "Área",
                            "Total Área",
                            "% Pessoa",
                        ];
                        headersOnus = [
                            "Ato",
                            "Nome",
                            "CPF",
                            "Tipo",
                            "Status",
                            "Situação",
                        ];
                        headersNumbers = ["Ato", "Número", "CPF", "Tipo"];
                        headersEstremacao = [
                            "Ato",
                            "Nome Pessoa",
                            "CPF Pessoa",
                            "Nome Cônjuge",
                            "CPF Cônjuge",
                            "Área",
                            "Matrícula",
                        ];
                        // Process Sections Sequentially
                        if (sectionCadastro) {
                            specialData = this.getEstremacaoHeaderData(sectionCadastro);
                            processSection(this.dataFromDivs(sectionCadastro), "Cadastro", headersCadastro, specialData);
                        }
                        if (sectionOnus) {
                            processSection(this.dataFromTableRows(sectionOnus, "onus"), "Ônus", headersOnus);
                        }
                        if (sectionNumbers) {
                            processSection(this.dataFromTableRows(sectionNumbers, "numbers"), "Números Cadastrais", headersNumbers);
                        }
                        if (sectionEstremacao) {
                            processSection(this.dataFromTableRows(sectionEstremacao, "estremacao"), "Estremação", headersEstremacao);
                        }
                        // Adjust widths globally
                        ws.columns.forEach(function (column) {
                            column.width = 25;
                        });
                        matricula = ((_b = (_a = sectionCadastro === null || sectionCadastro === void 0 ? void 0 : sectionCadastro.querySelector("[data-matricula]")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
                        if (!hasData) return [3 /*break*/, 2];
                        return [4 /*yield*/, wb.xlsx.writeBuffer()];
                    case 1:
                        buffer = _c.sent();
                        blob = new Blob([buffer], {
                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        });
                        link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = "Saneadora Tabela ".concat(matricula, ".xlsx");
                        link.click();
                        URL.revokeObjectURL(link.href);
                        return [3 /*break*/, 3];
                    case 2:
                        console.warn("Nenhuma tabela visível ou com dados para exportar.");
                        alert("Não há dados visíveis para exportar nas seções ativas.");
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExportTable.prototype.init = function () {
        if (this.buttonExport) {
            this.buttonExport.addEventListener("click", this.createExportTable);
        }
        return this;
    };
    return ExportTable;
}());
export default ExportTable;
