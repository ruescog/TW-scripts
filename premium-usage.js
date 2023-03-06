// ==UserScript==
// @name         premium-usage
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  Display another column to indicate if it is useful to use the -20% premium version.
// @author       MEMEN
// @match        https://*.guerrastribales.es/*&screen=main
// @icon         <$ICON$>
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var ppAValue = sessionStorage.getItem("ppAValue")
    if(!ppAValue) {
        ppAValue = prompt("PP average value: ")
        sessionStorage.setItem("ppAValue", ppAValue)
    }
    
    var updateButton = document.createElement("img")
    updateButton.src = "https://dses.innogamescdn.com/asset/59fb2ca0/graphic/buildings/market.png"
    updateButton.title = "Update PP value"
    updateButton.onclick = function(){
        ppAValue = prompt("PP average value: ")
        sessionStorage.setItem("ppAValue", ppAValue)
        location.reload()
    }
    
    var spanPremium = document.createElement("span")
    spanPremium.classList.add("icon") ; spanPremium.classList.add("header") ; spanPremium.classList.add("premium")
    
    var buildingsTable = document.getElementById("buildings").firstElementChild
    var header = document.createElement("th")
    
    header.appendChild(spanPremium)
    header.appendChild(updateButton)
    buildingsTable.firstChild.appendChild(header)

    for(var i = 1, n = buildingsTable.childElementCount; i < n; i++){
        var element = buildingsTable.children[i]
        var totalResourceCost = element.childElementCount == 7 ? parseInt(element.children[1].innerText) + parseInt(element.children[2].innerText) + parseInt(element.children[3].innerText) : null
        var resultIcon = document.createElement("td")
        resultIcon.innerHTML = totalResourceCost && totalResourceCost * 0.2 / ppAValue > 30 ? "<a class='order_feature coinbag-free'/>" : "<a class = 'cancel-icon solo evt-confirm'/>"
        element.appendChild(resultIcon)
    }
})();
