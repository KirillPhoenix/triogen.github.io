function toggleAnswer(questionElement) {
    // Находим следующий элемент после вопроса
    const answerElement = questionElement.nextElementSibling;
    
    // Проверяем, что ответ скрыт, и переключаем его видимость
    if (answerElement.style.display === "none" || answerElement.style.display === "") {
        answerElement.style.display = "block"; // Показать ответ
    } else {
        answerElement.style.display = "none"; // Скрыть ответ
    }
}