logEvent('Страница загружена');

/**
 * Переменная для хранения экземпляра пикселя.
 */
var pixel;
/**
 * Коллбек, который вызовет vk js api после своей загрузки.
 */
window.vkAsyncInit = function() {
  logEvent('VK JS API загружено');
  /**
   * Инициализация пикселя ВКонтакте
   */
  pixel = new VK.Pixel('VK-RTRG-96471-nQaGP');

  /**
   * Генерация простого события посещения текущей страницы. Если найдутся аудитории с подходящими правилами,
   * то пользователь будет в них добавлен.
   */
  pixel.Hit();
  logEvent('Сгенерировано простое событие посещения страницы');

  $('.form, .form .input, .form .button').removeAttr('disabled');
  $('.loading').remove();
};

/**
 * Установка обработчика клика по кнопке
 *
 * Также можно использовать атрибут onclick тега button в html-разметке.
 *
 * Например:
 * <button onclick="pixel.Event('click-save-button')">Сохранить</button>
 */
$('.button').click(function () {
    /**
     * Делаем кнопку и поля для ввода неактивными
     */
    $('.form .input, .form .button').attr('disabled', 'disabled');

    /**
     * Меняем текст на кнопке на понятный пользователю
     */
    $(this).text('Сохранено');

    /**
     * Генерируем событие нажатия на кнопку. Если найдутся аудитории с подхяодщими правилами,
     * то пользователь будет в них добавлен.
     */
    pixel.Event('click-save-button');
    logEvent('Сгенерировано событие нажатия на кнопку');
});

/**
 * В этой переменной будем запоминать, начал ли уже пользователь заполнять форму.
 */
var formFillStarted = false;

/**
 * Установка обработчика изменения любого из полей для ввода
 */
$('.input').change(function () {
    /**
     * Проверяем, начинал ли уже пользователь заполнять форму раньше, чтобы не отправлять несколько одинаковых событий.
     */
    if (!formFillStarted) {
        /**
         * Добавляем пользователя в конкретную аудиторию по её ID. Например, "Начавшие заполнять форму".
         */
        pixel.Add(22936871);
        logEvent('Отправлен запрос на добавление пользователя в аудиторию 22936871');

        /**
         * Запоминаем, что пользователь начал заполнять форму.
         */
        formFillStarted = true;
    }
});

/**
 * Простая функция для наглядного отображения происходящего на странице
 * @param text
 */
function logEvent(text) {
    /**
     * Создаём элемент, хрянящий информационное сообщение, и добавляем его в контейнер.
     */
    var $log = $('.log');
    var $logItem = $('<div>').addClass('log__item').append(
        $('<div>').addClass('log__item-time').text(new Date())
    ).append(
        $('<div>').addClass('log__item-text').text(text)
    );
    $log.append($logItem);
}
