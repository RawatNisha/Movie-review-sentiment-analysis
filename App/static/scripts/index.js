async function getResult(event) {
	event.preventDefault();
	let input = document.getElementById("input");
	let outputSection = document.getElementById("outputSection");
	let validationOutput = document.getElementById("validationOutput");
	let filteredText = document.getElementById("filteredText");
	let tokens = document.getElementById("tokens");
	if (input.value == "") {
		window.alert("Please Enter Your Sentiment First");
	} else {
		window.alert(
			"please Wait We are going to Perform some Machine Learning Task......."
		);
		try {
			let response = await fetch("/getresult", {
				method: "POST",
				headers: {
					"Content-Type": "Application/json",
				},
				body: JSON.stringify({
					review: input.value,
				}),
			});
			
			let result = await response.json();
			console.log(result);
			window.alert("result is fetched and shown below");
			outputSection.style.display = "flex";
			validationOutput.style.display = "none";
			filteredText.style.display = "none";
			tokens.style.display = "none";
			
			let positiveResult = document.getElementById("positiveResult");
			let nagativeResult = document.getElementById("nagativeResult");
			let defaultResult = document.getElementById("default");
			let neutralResult = document.getElementById("neutralResult");
			if (!!result.data) {
				if (result.data == "Positive") {
					positiveResult.style.display = "flex";
					nagativeResult.style.display = "none";
					defaultResult.style.display = "none";
					neutralResult.style.display = "none";
				} else if (result.data == "Negative") {
					positiveResult.style.display = "none";
					nagativeResult.style.display = "flex";
					defaultResult.style.display = "none";
					neutralResult.style.display = "none";
				} else {
					positiveResult.style.display = "none";
					nagativeResult.style.display = "none";
					neutralResult.style.display = "flex";
					defaultResult.style.display = "none";
				}
			} else {
				positiveResult.style.display = "none";
				nagativeResult.style.display = "none";
				defaultResult.style.display = "flex";
				neutralResult.style.display = "none";
			}
		} catch (error) {
			console.log(error);
		}
	}
}

function clearInput(event) {
	document.getElementById("input").value = "";
}

async function validateTheScript(event) {
	event.preventDefault();
	let input = document.getElementById("input");
	let outputSection = document.getElementById("outputSection");
	let validationOutput = document.getElementById("validationOutput");
	let filteredText = document.getElementById("filteredText");
	let tokens = document.getElementById("tokens");
	if (input.value == "") {
		window.alert("Please Enter Your Sentiment First");
	} else {
		window.alert(
			"please Wait We are going to Perform some NLP Task......."
		);
		try {
			let response = await fetch("/validate", {
				method: "POST",
				headers: {
					"Content-Type": "Application/json",
				},
				body: JSON.stringify({
					review: input.value,
				}),
			});
			let result = await response.json();
			console.log(result);
			outputSection.style.display = "none";
			validationOutput.style.display = "flex";
			filteredText.style.display = "none";
			tokens.style.display = "none";
			if (!!result.data) {
				if (result.data == "Valid") {
					validationOutput.innerHTML=`
					<div class="validation">
							<img src="https://topmeaning.com/english/images/img/EN/v/valid.jpg" alt="">
							<h1>
								This text looks like valid English text
							</h1>
						</div>
					`
				} else {
					validationOutput.innerHTML=`
					<div class="validation">
							<img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Close_Icon_Dark-512.png" alt="">
							<h1>
								This text is not valid as per  English text
							</h1>
						</div>
					`
				}
			} else {
				window.alert("Some Error occured")
			}
		} catch (error) {
			console.log(error);
		}
	}
}

async function filterTheScript(event) {
	event.preventDefault();
	let input = document.getElementById("input");
	let outputSection = document.getElementById("outputSection");
	let validationOutput = document.getElementById("validationOutput");
	let filteredText = document.getElementById("filteredText");
	let tokens = document.getElementById("tokens");
	if (input.value == "") {
		window.alert("Please Enter Your Sentiment First");
	} else {
		window.alert(
			"please Wait We are going to Perform some NLP Task......."
		);
		try {
			let response = await fetch("/filterthetext", {
				method: "POST",
				headers: {
					"Content-Type": "Application/json",
				},
				body: JSON.stringify({
					review: input.value,
				}),
			});
			let result = await response.json();
			console.log(result);
			window.alert("result is fetched and shown below");
			outputSection.style.display = "none";
			validationOutput.style.display = "none";
			filteredText.style.display = "flex";
			tokens.style.display = "none";
			if (!!result.data) {
				if (result.data == "ERROR") {
					filteredText.innerHTML=`
					<h3>Filtered Text : </h3>
						<h5>
							Some Error Occured
						</h5>
					`
				} else {
					filteredText.innerHTML=`
					<h3>Filtered Text : </h3>
						<h5>
							${result.data}
						</h5>
					`
				}
			} else {
				window.alert("Some Error occured")
			}
		} catch (error) {
			console.log(error);
		}
	}
}


async function getTokens(event) {
	event.preventDefault();
	let input = document.getElementById("input");
	let outputSection = document.getElementById("outputSection");
	let validationOutput = document.getElementById("validationOutput");
	let filteredText = document.getElementById("filteredText");
	let tokens = document.getElementById("tokens");
	if (input.value == "") {
		window.alert("Please Enter Your Sentiment First");
	} else {
		window.alert(
			"please Wait We are going to Perform some NLP Task......."
		);
		try {
			let response = await fetch("/tokenize", {
				method: "POST",
				headers: {
					"Content-Type": "Application/json",
				},
				body: JSON.stringify({
					review: input.value,
				}),
			});
			let result = await response.json();
			console.log(result);
			window.alert("result is fetched and shown below");
			outputSection.style.display = "none";
			validationOutput.style.display = "none";
			filteredText.style.display = "none";
			tokens.style.display = "flex";
			if (!!result.data) {
				if (result.data == "ERROR") {
					tokens.innerHTML=`
					<h3>Tokens of given Text:</h3>
					<h5>
							Some Error Occured
						</h5>
					`
				} else {
					tokens.innerHTML=`
					<h3>Tokens of given Text:</h3>
					<h5>
							${result.data}
						</h5>
					`
				}
			} else {
				window.alert("Some Error occured")
			}
		} catch (error) {
			console.log(error);
		}
	}
}

