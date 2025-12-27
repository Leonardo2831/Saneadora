export default function arrayContentRow(table: HTMLElement | null): string[][] {
    let textRow: string[][] = [];
    if (table?.children?.length) {
        textRow = Array.from(table?.children).map((childItem: Element) => {
            return Array.from(childItem.children).map((item: Element) => {
                return (
                    item.getAttribute("aria-label") ||
                    item.textContent.trim() ||
                    ""
                );
            });
        });
    }

    return textRow;
}