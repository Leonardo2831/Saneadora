export default function eventSelect() {
    var selects = document.querySelectorAll("select");
    selects.forEach(function (select) {
        select.addEventListener("focus", function () {
            try {
                if (select.showPicker)
                    select.showPicker();
                else
                    select.size = select.options.length;
            }
            catch (_a) {
                console.warn("Interact with the screen to open the selector options");
            }
        });
        select.addEventListener("blur", function () {
            if (!select.showPicker)
                select.size = 1;
        });
    });
}
