// ==UserScript==
// @name         premium-usage
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Display another column to indicate if it is useful to use the -20% premium version.
// @author       MEMEN
// @match        https://*.guerrastribales.es/*&screen=main
// @icon         <$ICON$>
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var ppMValue = prompt("PP average value:" )

    var buildingsTable = document.getElementById("buildings").firstElementChild
    var header = document.createElement("th")
    header.innerText = "Use the\n-20% option?"
    buildingsTable.firstChild.appendChild(header)

    for(var i = 1, n = 12; i < n; i++){
        var element = buildingsTable.children[i]
        var totalResourceCost = element.childElementCount == 7 ? parseInt(element.children[1].innerText) + parseInt(element.children[2].innerText) + parseInt(element.children[3].innerText) : null
        var resultIcon = document.createElement("td")
        resultIcon.innerHTML = totalResourceCost && totalResourceCost * 0.2 / ppMValue > 30 ? "<a class='order_feature coinbag-free'/>" : "<a class = 'cancel-icon solo evt-confirm'/>"
        element.appendChild(resultIcon)
    }
})();
