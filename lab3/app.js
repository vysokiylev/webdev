/**
 * Created by Lev on 22.10.2017.
 */
var settings = {};

// Размер ячейки
settings.cellSize = 10;
// размеры canvas
settings.canvasWidth = window.innerWidth -
    (window.innerWidth % settings.cellSize) + settings.cellSize;
settings.canvasHeight = window.innerHeight -
    (window.innerHeight % settings.cellSize) + settings.cellSize;

// Время между обновлениями
settings.interval = 200;
settings.intervalId = null;

// Добавляем canvas на страницу
function addCanvas() {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    canvas.setAttribute('width', settings.canvasWidth);
    canvas.setAttribute('height', settings.canvasWidth);
    document.body.appendChild(canvas);

    return canvas.getContext('2d');
}

// Создаем массив нулей соответсвующий количеству клеточек
function setZeros() {
    var rows, cols;
    var zeros = [];
    var tmpArr;

    rows = settings.canvasHeight / settings.cellSize;
    cols = settings.canvasWidth / settings.cellSize;

    for (var i = 0; i < rows; i++) {
        tmpArr = [];
        for (var j = 0; j < cols; j++) {
            tmpArr[j] = 0;
        }
        zeros[i] = tmpArr;
    }
    zeros.rows = rows;
    zeros.cols = cols;

    return zeros;
}

// Случайно заполняем некоторые ячейки единицами
function initCells(cells) {

    for (var i = 0; i < cells.rows; i++) {
        for (var j = 0; j < cells.cols; j++) {
            if (Math.random() < 0.5) {
                cells[i][j] = 1;
            }
        }
    }

    return cells;
}

// Отрисовываем ячейки в canvas
function drawCells(context, cells) {
    var x, y;

    for (var i = 0; i < cells.rows; i++) {
        for (var j = 0; j < cells.cols; j++) {
            if (cells[i][j] === 1) {
                context.fillStyle = '#999';
            } else {
                context.fillStyle = '#DDD';
            }

            y = i * settings.cellSize;
            x = j * settings.cellSize;
            context.fillRect(x, y,
                settings.cellSize, settings.cellSize);
        }
    }
}

function copyCells(source, dest) {

    for (var i = 0; i < source.rows; i++) {
        for (j = 0; j < source.cols; j++) {
            dest[i][j] = source[i][j];
        }
    }

    return dest;
}

// обновляем ячейки ячейками следующего поколения
function update(cells) {
    var oldCells, liveNeighbors;
    var minCol, maxCol, minRow, maxRow;

    oldCells = copyCells(cells, setZeros());

    for (var i = 0; i < cells.rows; i++) {
        for (var j = 0; j < cells.cols; j++) {
            liveNeighbors = 0;

            minRow = Math.max(0, i - 1);
            maxRow = Math.min(cells.rows, i + 2);
            minCol = Math.max(0, j - 1);
            maxCol = Math.min(cells.cols, j + 2);

            for (var k = minRow; k < maxRow; k++) {
                for (var l = minCol; l < maxCol; l++) {
                    if (oldCells[k][l] === 1) {
                        liveNeighbors++;
                    }
                }
            }

            // ячейка была жива в предыдущем поколении
            if (oldCells[i][j] === 1) {
                liveNeighbors--;

                // ячейка умирает в следующем поколении
                if (liveNeighbors !== 2 && liveNeighbors !== 3) {
                    cells[i][j] = 0;
                }
            } else {
                // мертвая ячейка оживает
                if (liveNeighbors === 3) {
                    cells[i][j] = 1;
                }
            }
        }
    }

    return cells;
}

// Начальное состояние игры
function initSim() {
    settings.cells = initCells(setZeros());
}

// Запуск игры
function runSim() {
    var cells = settings.cells;
    var context = settings.context;

    update(cells);
    drawCells(context, cells);
}

// убрать подсказку
function clearHelp() {
    var div = document.getElementById('help-box');
    if (div) {
        document.body.removeChild(div);
    }
}


// показать подсказку на 5 сек.
function showHelp() {

    clearHelp();

    var div = document.createElement('div');
    div.setAttribute('id', 'help-box');

    div.innerHTML = '<p>Нажмите &lt;пробел&gt; для паузы/старта.</p>';
    div.innerHTML += '<p>Нажмите&lt;n&gt; для шага во время паузы.</p>';
    div.innerHTML += '<p>Нажмите &lt;r&gt; чтобы начать сначала.</p>';

    document.body.appendChild(div);

    window.setTimeout(clearHelp, 5000);
}

// Обработчик нажатия клавиш
function onKeyPress(event) {
    var key = String.fromCharCode(event.charCode);

    // пробел пауза/старт
    if (key === ' ') {
        if (settings.intervalId) {
            window.clearInterval(settings.intervalId);
            settings.intervalId = null;
        } else {
            settings.intervalId = window.setInterval(runSim,
                settings.interval);
        }

        // n для шага
    } else if (key === 'n') {
        runSim();

        // r для перезапуска
    } else if (key === 'r') {
        window.clearInterval(settings.intervalId);
        initSim();
        settings.intervalId = window.setInterval(runSim,
            settings.interval);

        // ? для подсказки
    } else if (key === '?') {
        showHelp();
    }
}

window.onload = function () {
    settings.context = addCanvas();

    initSim();
    settings.intervalId = window.setInterval(runSim, settings.interval);

    window.onkeypress = onKeyPress;
};
