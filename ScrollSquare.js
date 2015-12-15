var SquareManager = function () {

    var canvas;
    var canvasContext;
    var gap = 3;

    return {
        start: init
    };

    function init() {
        var div = document.createElement('div');
        div.id = "scrollSquare";
        var message = document.createElement('h1');
        message.innerHTML = "SCROLL ME";
        div.appendChild(message);
        var canvasNode = document.createElement('canvas');
        canvasNode.id = "scrollCanvas";
        div.appendChild(canvasNode);
        document.getElementById("pages").appendChild(div);
        canvas = document.getElementById('scrollCanvas');
        canvas.height = window.screen.height + 500;
        canvas.width = window.screen.height;
        canvasContext = canvas.getContext('2d');
        window.addEventListener('scroll', changeGap, false);
        requestAnimationFrame(frame);
    }

    function drawRectOfType(x, edge, func) {
        func.call(canvasContext, x + 40, x - 40, edge, edge);
    }

    function changeGap() {
        gap = 3 + window.scrollY * 25 / (document.body.offsetHeight - window.innerHeight);
    }

    function frame(t) {
        for (i = gap, j = canvas.width - (gap * 2); i < canvas.width / 2; i += gap * 3, j -= gap * 6) {
            drawRectOfType(i + 5 * Math.sin(t / 1000), j, canvasContext.fillRect);
            drawRectOfType(i + 5 * Math.sin(2 * t / 1000), j - (gap * 2), canvasContext.clearRect);
            drawRectOfType(i + (gap * 2) + 5 * Math.sin(3 * t / 1000), j - (gap * 4), canvasContext.fillRect);
            drawRectOfType(i + (gap * 3) + 5 * Math.sin(3 * t / 1000), j - (gap * 6), canvasContext.clearRect);
        }
        requestAnimationFrame(frame);
    }

};
