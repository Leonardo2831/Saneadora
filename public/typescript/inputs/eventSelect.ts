export default function eventSelect() {
    const selects = document.querySelectorAll("select");

    selects.forEach((select) => {
        select.addEventListener("focus", () => {
            try {
                if (select.showPicker) select.showPicker();
                else select.size = select.options.length;
            } catch {
                console.warn(
                    "Interact with the screen to open the selector options"
                );
            }
        });

        select.addEventListener("blur", () => {
            if (!select.showPicker) select.size = 1;
        });
    });
}
