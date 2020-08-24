let chat, rxn;
let snipe, react, spam;
let go, stop;

snipe = () => {
	console.log("subtree modified:");
	let msg = chat.children[chat.childElementCount - 2];
	let user = msg.getElementsByClassName('da-username');
	if (user[0]) {
		user = user[0].innerText;
		if (user  === "Mudamaid 68") {
			console.log('possible roll');

			let want = false;
			let name = msg.getElementsByClassName('da-embedAuthorName');
			let data = msg.getElementsByClassName('da-embedDescription');

			if (name[0]) {
				name = name[0].innerText;
				if (name === "Luigi" || name === "Waluigi") {
					want = true;
				}
			}
			if (data[0] && !want) {
				data = data[0].innerText.split("\n");
				for (let x of data) {
					let two = x.split(" ");
					if (two[0] === "Claims:") {
						let num = parseInt(two[1].substring(1));
						if (num <= 100) {
							want = true;
							break;
						}
					}
				}
			}
			if (want) {
				let reactions = msg.getElementsByClassName('da-reactionInner');
				if (reactions[0]) {
					if (reactions[0].getElementsByClassName('da-reactionCount')[0].innerHTML == "1") {
						// reactions[0].click(); // this doesn't work and I don't know why
						rxn = reactions[0];
						console.log("snipe");
					}
				}
			}
		}
	}
}

react = () => {
	if (rxn) {
		console.log('rxn');
		rxn.click();
		rxn = undefined;
	}
}


go = () => {
    chat = document.getElementsByClassName('da-scrollerInner')[0];
    chat.addEventListener('DOMSubtreeModified', snipe);
    spam = setInterval(react, 10);
}

stop = () => {
	clearInterval(spam);
	chat.removeEventListener('DOMSubtreeModified', snipe);
}