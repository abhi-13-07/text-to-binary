const input = document.getElementById("input");
const output = document.getElementById("output");
const convertButton = document.getElementById("convert-btn");
const swapButton = document.getElementById("swap-btn");

let inputMode = "string";

swapButton.addEventListener("click", () => {
	changeInputMode();
});

convertButton.addEventListener("click", () => {
	const value = input.value;

	if (!value) return alert("Please enter some input");

	if (inputMode === "string") {
		output.value = convertTextToBinary(value);
	} else {
		output.value = convertBinaryToText(value.split(" "));
	}
});

input.addEventListener("input", e => {
	const value = e.target.value;

	if (inputMode === "string") return;

	if (!value) return;

	if (!/[01]+$/g.test(value)) {
		alert("Invalid Binary");
	}
});

function changeInputMode() {
	const inputLabel = document
		.getElementsByClassName("input-container")[0]
		.querySelector("h2");
	const outputLabel = document
		.getElementsByClassName("output-container")[0]
		.querySelector("h2");

	if (inputMode === "string") {
		inputLabel.innerText = "Binary Input";
		outputLabel.innerText = "Text Output";

		input.placeholder = "Enter binary here";
		inputMode = "binary";
	} else {
		inputLabel.innerText = "Text Input";
		outputLabel.innerText = "Binary Output";

		input.placeholder = "Enter Text here";
		inputMode = "string";
	}
	input.value = "";
	output.value = "";
}

function convertTextToBinary(str, i = 0) {
	const ascii = getASCIIValue(str.charAt(i));

	if (i === str.length - 1) return decimalToBinary(ascii);

	return decimalToBinary(ascii) + " " + convertTextToBinary(str, ++i);
}

function convertBinaryToText([first, ...rest]) {
	const ascii = binaryToDecimal(+first);

	if (rest.length === 0) return getCharacter(ascii);

	return getCharacter(ascii) + convertBinaryToText(rest);
}

function decimalToBinary(num) {
	let binary = [];

	while (num > 0) {
		let r = num % 2;
		binary.push(r);
		num = Math.floor(num / 2);
	}

	return binary.reverse().join("");
}

function binaryToDecimal(binary) {
	let decimal = 0;
	let i = 0;

	while (binary > 0) {
		let r = binary % 10;
		decimal = decimal + r * 2 ** i;
		binary = Math.floor(binary / 10);
		i++;
	}

	return decimal;
}

function getCharacter(ascii) {
	return String.fromCharCode(ascii);
}

function getASCIIValue(char) {
	return char.charCodeAt(0);
}
