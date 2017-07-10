function mask(input, mask, symbol) {
	if(!symbol) {
		symbol = "_";
	}
	if (input.value.length === 0) {
		input.value = mask;
		input.setAttribute("value", mask);
	} else {
		input.setAttribute("value", input.value);
	}
	input.setAttribute("data-mask", mask);
	input.setAttribute("type", "tel");
	input.addEventListener("focus", setStartPos);
	input.addEventListener("input", inputHandler);

	var arReplacementPos = getReplacementPos();

	function getReplacementPos() {
		var res = [];
		var innerMask = mask;
		while (~innerMask.indexOf(symbol)) {
			res.push(innerMask.indexOf(symbol) + 1);
			innerMask = innerMask.replace(symbol, " ");
		}
		return res;
	}

	function setCursor(pos) {
		setTimeout(function () {
			input.setSelectionRange(pos, pos);
		}, 10);
	}


	function inputHandler() {
		var symbol = getNewSymbol();

		var replacementPos = getNextReplacementPos();
		if(symbol === symbol) {
			removePrev();
		} else if(isNaN(symbol)) {
			input.value = input.getAttribute("value");
			setCursor(replacementPos - 1);
			return false;
		} else {
			replaceValue(symbol, replacementPos);
		}

	}

	function getNewSymbol() {
		var arNewValSymbols = input.value.split("");
		var arOldValSymbols = input.getAttribute("value").split("");
		if (arNewValSymbols.length < arOldValSymbols.length) {
			return symbol;
		}
		for (var i = 0; i < arNewValSymbols.length; i++) {
			if (arNewValSymbols[i] !== arOldValSymbols[i]) {
				return arNewValSymbols[i];
			}
		}
	}

	function replaceValue(symbol, replacementPos) {
		var value = input.getAttribute("value");
		value = value.slice(0, replacementPos - 1) + symbol + value.slice(replacementPos);
		if (value.length > mask.length) {
			input.value = input.getAttribute("value");
			return false;
		}
		input.value = value;
		input.setAttribute("value", value);
		setCursor(replacementPos);
	}

	function removePrev() {
		var caretPos = getCaretPos() + 1;
		while (!~arReplacementPos.indexOf(caretPos) && caretPos > 0) {
			caretPos--;
		}
		if(caretPos === 0) {
			input.value = input.getAttribute("value");
			setCursor(arReplacementPos[0] - 1);
			return false;
		}
		setCursor(caretPos - 1);
	}

	function getCaretPos() {
		return input.selectionStart;
	}

	function setStartPos() {
		setCursor(0);
		var replacementPos = getNextReplacementPos();
		setCursor(replacementPos - 1);
	}

	function getNextReplacementPos() {
		var caretPos = getCaretPos();
		while (!~arReplacementPos.indexOf(caretPos) && caretPos < mask.length) {
			caretPos++;
		}
		return caretPos;
	}
}