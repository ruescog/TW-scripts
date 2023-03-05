ppMValue = prompt("PP average value:" )

buildingsTable = document.getElementById("buildings").firstElementChild
header = document.createElement("th")
header.innerText = "Use the\n-20% option?"
buildingsTable.firstChild.appendChild(header)

for(i = 1, n = 12; i < n; i++){
	element = buildingsTable.children[i]
	totalResourceCost = parseInt(element.children[1].innerText) + parseInt(element.children[2].innerText) + parseInt(element.children[3].innerText)

	resultIcon = document.createElement("td")
	resultIcon.innerHTML = totalResourceCost * 0.2 / ppMValue > 30 ? "<a class='order_feature coinbag-free'/>" : "<a class = 'cancel-icon solo evt-confirm'/>"
	element.appendChild(resultIcon)
}
