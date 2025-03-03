// Добавим анимацию при прокрутке
function toggleService(id) {
    const content = document.getElementById(`service-${id}`);
    const header = content.previousElementSibling;
    const arrow = header.querySelector('.arrow');

    if (content.style.display === "block") {
        content.style.display = "none";
        header.classList.remove('active');
        arrow.textContent = "▼";
    } else {
        content.style.display = "block";
        header.classList.add('active');
        arrow.textContent = "▲";
    }
}