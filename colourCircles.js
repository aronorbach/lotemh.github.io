var CirclesManager = function () {

    var ctx;
    var clickTime = 0;
    var mousePosition;


    function init() {
        var div = document.createElement('div');
        div.id = "colourCircles";
        var message = document.createElement('h1');
        message.id = "message";
        message.innerHTML = "click on the screen";
        div.appendChild(message);
        var canvasNode = document.createElement('canvas');
        canvasNode.id = "canvas";
        div.appendChild(canvasNode);
        document.getElementById("pages").appendChild(div);
        canvasNode.width = window.screen.width;
        canvasNode.height = window.screen.height;
        ctx = canvasNode.getContext('2d');

        canvasNode.onmousedown = _onMouseDown;
        canvasNode.onmouseup = _onMouseUp;

        setTimeout(function () {
            document.querySelector('#message').innerHTML = "";
        }, 5000);
    }

    var circleId = 0;

    function _onMouseDown(event) {
        updateCurrentCircle();
        startCountingClickTime();
        mousePosition = {x: event.x, y: event.y};
    }

    function startCountingClickTime() {
        clickTime = Date.now();
    }

    function updateCurrentCircle() {
        circleId++;
    }

    function _onMouseUp() {
        stopCountingClickTime();
        createAnimation();
    }

    function stopCountingClickTime() {
        clickTime = Date.now() - clickTime;
    }

    function createAnimation() {
        var animationStep = 1;
        var currentCircleId = circleId;

        clickTime = adjustClickTime(clickTime);
        var stepInterval = clickTime;
        var radius = clickTime;
        var initialColour = getXPositionInHexBase(mousePosition.x);

        (function () {
            if (animationStep >= 15 || circleId !== currentCircleId) return;
            drawCircle(radius, animationStep++, initialColour);
            setTimeout(requestAnimationFrame.bind(null, arguments.callee), stepInterval);
        })();
    }

    function adjustClickTime(clickTime) {
        return clickTime * 0.5;
    }

    function drawCircle(radius, colourLevel, baseColour) {
        var canvas = document.getElementById("canvas");
        ctx.beginPath();
        ctx.arc(mousePosition.x - canvas.offsetLeft, mousePosition.y - canvas.offsetTop, radius, 0, Math.PI * 2);
        ctx.fillStyle = getColour(colourLevel, mousePosition.x, baseColour);
        ctx.fill();
        ctx.stroke();
    }

    function getColour(colourLevel, mouseX, baseColour) {
        colourLevel = colourLevel * 16;
        baseColour = updateBaseColour(baseColour, colourLevel);
        var colourFunc = (mouseX < getMidScreen().x) ? getColourGreenToYellow : getColourOrangeToYellow;
        return colourFunc(baseColour, colourLevel);
    }

    function getMidScreen() {
        return {
            x: window.screen.width / 2,
            y: window.screen.height / 2
        }
    }

    function updateBaseColour(baseColour, step) {
        baseColour += step;
        if (baseColour > 255) baseColour = 255;
        return baseColour;
    }

    function getXPositionInHexBase(x) {
        var value;
        if (x < getMidScreen().x) {
            value = x / (window.screen.width / 2);
        }
        else {
            value = x / (window.screen.width);
            value = 1.5 - value;
        }
        return Math.round(value * 255);
    }

    function getColourGreenToYellow(baseColour, numOfAnimationStep) {
        return 'rgb(' + baseColour + ',255,' + numOfAnimationStep + ')';
    }

    function getColourOrangeToYellow(baseColour, numOfAnimationStep) {
        return 'rgb(255,' + baseColour + ',' + numOfAnimationStep + ')';
    }

    return {
        start: init
    }
};