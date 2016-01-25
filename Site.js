/**
 * Created by lotem on 7/2/2014.
 */

window.onload = function () {

    document.getElementById("animatedSquareBtn").runPage = (new SquareManager()).start;
    document.getElementById("circlesBtn").runPage = (new CirclesManager).start;

    hideAllDivs();
    var menu = document.getElementById('menu');
    menu.style.width = window.screen.width;
    var buttons = menu.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function (event) {
            hideAllDivs();
            event.target.runPage();
        }
    }


    function hideAllDivs() {
        var pages = document.getElementById("pages");
        if (pages.firstChild)
            pages.firstChild.remove();
    }

};