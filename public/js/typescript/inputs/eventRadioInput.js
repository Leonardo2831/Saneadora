function changeViewModalBase(event, classModal, contentPercent) {
    var target = event.currentTarget;
    contentPercent.classList.remove(classModal);
    if (target.value === "%")
        contentPercent.classList.add(classModal);
}
export default function eventRadioInput(modal, classModal, contentPercent) {
    var inputsRadio = modal.querySelectorAll('input[type="radio"]');
    inputsRadio.forEach(function (inputRadio) {
        inputRadio.addEventListener("change", function (event) {
            changeViewModalBase(event, classModal, contentPercent);
        });
    });
}
