// Declarando a variável global ExcelJS para evitar erros de tipo
declare const ExcelJS: any;

interface CellData {
    value: string | number;
    color?: string; // Hex ARGB color
}

interface ExportRow {
    cells: CellData[];
}

interface PersonGroup {
    rows: ExportRow[];
}

export default class ExportTable {
    buttonExport: HTMLButtonElement | null;

    // Selectors
    selectorCadastro: string;
    selectorOnus: string;
    selectorNumbers: string;
    selectorEstremacao: string;

    constructor(
        buttonExport: string,
        selectorCadastro: string,
        selectorOnus: string,
        selectorNumbers: string,
        selectorEstremacao: string
    ) {
        this.buttonExport = document.querySelector(buttonExport);

        // Store selectors instead of elements
        this.selectorCadastro = selectorCadastro;
        this.selectorOnus = selectorOnus;
        this.selectorNumbers = selectorNumbers;
        this.selectorEstremacao = selectorEstremacao;

        this.createExportTable = this.createExportTable.bind(this);
    }

    // Auxiliar para mapear classes CSS para cores ARGB do Excel
    private getColorFromElement(element: Element | null): string | undefined {
        if (!element) return undefined;
        // Mapeamento de Cores (ARGB)
        // Verde (table-value-green e variantes) -> LightGreen
        if (
            element.classList.contains("table-value-green") ||
            element.classList.contains("table-value-limon")
        )
            return "FF90EE90";
        // Vermelho (table-value-red) -> LightCoral
        if (element.classList.contains("table-value-red")) return "FFF08080";
        // Azul (table-value-blue) -> LightBlue
        if (element.classList.contains("table-value-blue")) return "FFADD8E6";
        // Cinza (table-value-gray) -> LightGray
        if (element.classList.contains("table-value-gray")) return "FFD3D3D3";

        return undefined;
    }

    // Helper to get value and color from a container (e.g., a div with an input inside)
    private getValueAndColor(container: Element): CellData {
        const input = container.querySelector(
            "input.table-value, div.table-value"
        );
        let val = "";

        if (input) {
            if (input instanceof HTMLInputElement) val = input.value;
            else val = input.textContent?.trim() || "";
        }

        // Robust color detection by querying classes within the cell container
        // Priority: Orange > Red > Green > Blue > Gray to handle overrides if any
        let color: string | undefined = undefined;

        if (container.querySelector(".table-value-orange")) {
            color = "FFFFA500"; // Orange
        } else if (container.querySelector(".table-value-red")) {
            color = "FFF08080"; // LightCoral
        } else if (
            container.querySelector(".table-value-green") ||
            container.querySelector(".table-value-limon")
        ) {
            color = "FF90EE90"; // LightGreen
        } else if (container.querySelector(".table-value-blue")) {
            color = "FFADD8E6"; // LightBlue
        } else if (container.querySelector(".table-value-gray")) {
            color = "FFD3D3D3"; // LightGray
        }

        return { value: val, color };
    }

    /**
     * Extrai dados de uma estrutura baseada em DIVs (usada na seção Cadastro).
     */
    private dataFromDivs(container: HTMLElement): PersonGroup[] {
        const groups: PersonGroup[] = [];
        const items = container.querySelectorAll(".children-style-cell");

        items.forEach((item) => {
            const groupRows: ExportRow[] = [];

            // Extract Basic Info
            const headerVal =
                item.querySelector("header")?.textContent?.trim() || "";

            // Select all data-menu/column containers
            const menus = item.querySelectorAll("div[data-menu]");

            // Expected indices:
            // 0: Name, 1: CPF, 2: NameConj, 3: CPFConj
            // 4..N-3: Area History Items
            // N-2: Total Area
            // N-1: Percent

            if (menus.length < 6) return; // Malformed structure

            const name = menus[0].querySelector("input")?.value || "";
            const cpf = menus[1].querySelector("input")?.value || "";
            const nameConj = menus[2].querySelector("input")?.value || "";
            const cpfConj = menus[3].querySelector("input")?.value || "";

            // Total and Percent (Last 2 items)
            const totalIndex = menus.length - 2;
            const percentIndex = menus.length - 1;

            const totalData = this.getValueAndColor(menus[totalIndex]);
            const percentData = this.getValueAndColor(menus[percentIndex]);

            // History Items (Index 4 to totalIndex - 1)
            const historyStartIndex = 4;
            const historyEndIndex = totalIndex;

            const historyItems: Element[] = [];
            for (let i = historyStartIndex; i < historyEndIndex; i++) {
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
            } else {
                // Create a row for each history item
                historyItems.forEach((histItem, index) => {
                    const areaData = this.getValueAndColor(histItem);

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
                    } else {
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
    }

    /**
     * Extrai dados de Table Rows (TRs).
     */
    private dataFromTableRows(
        container: HTMLElement,
        type: "onus" | "numbers" | "estremacao"
    ): PersonGroup[] {
        // Table rows usually don't have the history complexity of Cadastro,
        // but let's standardize the return type.
        const groups: PersonGroup[] = [];
        const trs = container.querySelectorAll("tr");

        trs.forEach((tr) => {
            const rowData: CellData[] = [];
            const tds = tr.querySelectorAll("td");
            tds.forEach((td) => {
                const input = td.querySelector("input");
                const select = td.querySelector("select");
                const divValue = td.querySelector(".table-value");

                if (input) rowData.push({ value: input.value });
                else if (select) rowData.push({ value: select.value });
                else if (divValue)
                    rowData.push({
                        value: divValue.textContent?.trim() || "",
                        color: this.getColorFromElement(divValue),
                    });
                else rowData.push({ value: td.textContent?.trim() || "" });
            });

            groups.push({ rows: [{ cells: rowData }] });
        });
        return groups;
    }

    // Helper to extract special Estremacao header data from Cadastro section
    private getEstremacaoHeaderData(container: HTMLElement): string[][] | null {
        // Search for ALL headers that act as Estremacao headers
        // These headers typically contain "Matrícula" and "Área" info and are not the small cell headers (which are typically just R.X)
        const headers = container.querySelectorAll("header");
        const extractedHeaders: string[][] = [];

        for (let i = 0; i < headers.length; i++) {
            const h = headers[i];
            // Filter out small cell headers (e.g., inside .children-style-cell)
            // Estremacao headers usually have data-matricula or specific text structure
            if (h.closest(".children-style-cell")) continue;

            // Check if it's a valid Estremacao header (active or history/opaque)
            if (
                h.textContent?.includes("Matrícula") ||
                h.textContent?.includes("Área")
            ) {
                const matricula =
                    h.querySelector("[data-matricula]")?.textContent?.trim() ||
                    "-";
                // Area might be in data-real="area" or just text.
                // In NewEstremacao.ts, it puts it in [data-real="area"]
                const area = h.querySelector('[data-real="area"]')
                    ? h.querySelector('[data-real="area"]')?.textContent?.trim()
                    : h.innerText
                          .split("Área:")[1]
                          ?.split("Área Somada")[0]
                          ?.trim() || "-"; // Fallback parsing

                // Extract only if meaningful
                if (matricula !== "-" || area !== "-") {
                    extractedHeaders.push([
                        `Matrícula: ${matricula}`,
                        `Área: ${area}`,
                    ]);
                }
            }
        }
        return extractedHeaders.length > 0 ? extractedHeaders : null;
    }

    async createExportTable() {
        // Query elements at runtime
        const sectionCadastro = document.querySelector(
            this.selectorCadastro
        ) as HTMLElement;
        const sectionOnus = document.querySelector(
            this.selectorOnus
        ) as HTMLElement;
        const sectionNumbers = document.querySelector(
            this.selectorNumbers
        ) as HTMLElement;
        const sectionEstremacao = document.querySelector(
            this.selectorEstremacao
        ) as HTMLElement;

        const wb = new ExcelJS.Workbook();
        // Create only ONE worksheet for all tables
        const ws = wb.addWorksheet("Saneadora");
        let hasData = false;
        let currentRowIndex = 1; // Cursor to track where to insert the next table

        const processSection = (
            groups: PersonGroup[],
            title: string,
            headers: string[],
            specialHeadersData: string[][] | null = null
        ) => {
            if (groups.length === 0) return;

            hasData = true;

            // Title of the section (e.g. "Cadastro", "Ônus")
            const titleRow = ws.getRow(currentRowIndex++);
            const titleCell = titleRow.getCell(1);
            titleCell.value = title;
            titleCell.font = { bold: true, size: 14 };
            // Merge title cell for better appearance
            ws.mergeCells(currentRowIndex - 1, 1, currentRowIndex - 1, 8);

            // 1. Special Header for Estremacao (if present)
            if (specialHeadersData && specialHeadersData.length > 0) {
                specialHeadersData.forEach((headerData) => {
                    const specialRow = ws.getRow(currentRowIndex++);
                    headerData.forEach((text, idx) => {
                        // Spread info.
                        const targetCol = idx * 4 + 1; // Col 1 and Col 5
                        const cell = specialRow.getCell(targetCol);
                        cell.value = text;
                        cell.font = { bold: true, color: { argb: "FF006400" } }; // Dark Green Text

                        // Merge
                        ws.mergeCells(
                            currentRowIndex - 1,
                            targetCol,
                            currentRowIndex - 1,
                            targetCol + 3
                        );
                    });

                    // Apply Very Light Green Background to the whole row range
                    for (let c = 1; c <= 8; c++) {
                        const cell = specialRow.getCell(c);
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
            const headerRow = ws.getRow(currentRowIndex++);
            headers.forEach((h, i) => {
                const cell = headerRow.getCell(i + 1);
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
            groups.forEach((group) => {
                const startRow = currentRowIndex;

                group.rows.forEach((row) => {
                    const excelRow = ws.getRow(currentRowIndex);
                    row.cells.forEach((cellData, colIndex) => {
                        const cell = excelRow.getCell(colIndex + 1);
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

                const endRow = currentRowIndex - 1;

                // Merge Logic
                if (endRow > startRow) {
                    // Merge Cols 1-5 (Basic Info)
                    for (let c = 1; c <= 5; c++) {
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

        // Define Headers
        const headersCadastro = [
            "Ato",
            "Nome Pessoa",
            "CPF Pessoa",
            "Nome Cônjuge",
            "CPF Cônjuge",
            "Área",
            "Total Área",
            "% Pessoa",
        ];
        const headersOnus = [
            "Ato",
            "Nome",
            "CPF",
            "Tipo",
            "Status",
            "Situação",
        ];
        const headersNumbers = ["Ato", "Número", "CPF", "Tipo"];
        const headersEstremacao = [
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
            const specialData = this.getEstremacaoHeaderData(sectionCadastro);
            processSection(
                this.dataFromDivs(sectionCadastro),
                "Cadastro",
                headersCadastro,
                specialData
            );
        }

        if (sectionOnus) {
            processSection(
                this.dataFromTableRows(sectionOnus, "onus"),
                "Ônus",
                headersOnus
            );
        }

        if (sectionNumbers) {
            processSection(
                this.dataFromTableRows(sectionNumbers, "numbers"),
                "Números Cadastrais",
                headersNumbers
            );
        }

        if (sectionEstremacao) {
            processSection(
                this.dataFromTableRows(sectionEstremacao, "estremacao"),
                "Estremação",
                headersEstremacao
            );
        }

        // Adjust widths globally
        ws.columns.forEach((column: any) => {
            column.width = 25;
        });

        const matricula: string =
            sectionCadastro
                ?.querySelector("[data-matricula]")
                ?.textContent?.trim() || "";

        if (hasData) {
            const buffer = await wb.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `Saneadora Tabela ${matricula}.xlsx`;
            link.click();
            URL.revokeObjectURL(link.href);
        } else {
            console.warn("Nenhuma tabela visível ou com dados para exportar.");
            alert("Não há dados visíveis para exportar nas seções ativas.");
        }
    }

    init() {
        if (this.buttonExport) {
            this.buttonExport.addEventListener("click", this.createExportTable);
        }
        return this;
    }
}
