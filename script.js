const cardsArr = [
	{
		name: "camel",
		img: "camel.png",
		id: 0,
	},
	{
		name: "goat",
		img: "goat.png",
		id: 1,
	},
	{
		name: "ferret",
		img: "ferret.png",
		id: 2,
	},
	{
		name: "giraffe",
		img: "giraffe.png",
		id: 3,
	},

	{
		name: "parrot",
		img: "parrot.png",
		id: 4,
	},
	{
		name: "cat",
		img: "cat.png",
		id: 5,
	},
];

start(cardsArr);

function start(cards) {
	let mainCount = 0;
	let count = 0;
	let activeElementsList = [];
	let activeElementsIdList = [];

	const body = document.querySelector("body");
	const randomList = createRandomList(cards);

	createCardsList(body, randomList);

	const cardsList = document.querySelectorAll(".card");

	cardsList.forEach((item) => {
		if (mainCount < cards.length) {
			item.addEventListener("click", async (e) => {
				const activeCard = e.target.closest(".card");

				if (activeCard.classList.contains("active")) {
					return;
				}

				if (count < 2) {
					showCard(e.target.closest(".card"));
					count += 1;
					activeElementsIdList.push(activeCard.dataset.id);
					activeElementsList.push(activeCard);

					if (
						count === 2 &&
						activeElementsIdList.length &&
						+activeElementsIdList[0] !== +activeElementsIdList[1] &&
						mainCount !== cards.length
					) {
						hideCards(activeElementsList);
						resetTemp();
					}

					if (
						count === 2 &&
						activeElementsIdList.length &&
						+activeElementsIdList[0] === +activeElementsIdList[1] &&
						mainCount !== cards.length
					) {
						mainCount += 1;
						resetTemp();
					}

					if (mainCount === cards.length) {
						finish(body);
					}
				}
			});
		}
	});

	function resetTemp() {
		count = 0;
		activeElementsList = [];
		activeElementsIdList = [];
	}
}

function shuffle(arr) {
	let array = arr;
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
}

function createRandomList(list) {
	const fullList = [...list, ...list];
	const newFullList = shuffle(fullList);

	return newFullList;
}

function createCardsList(body, list) {
	let cardsHtml = "<div class='wrapper'>";

	for (let item of list) {
		cardsHtml += `	
			<div class="card" data-id="${item.id}">
				<div class="card_front">
					<img src="img/question.png" alt="placeholder" >
				</div>
				<div class="card_back">
					<img src="img/${item.img}" alt="${item.name}" >
				</div>
			</div>
		`;
	}

	cardsHtml += "</div>";
	body.innerHTML = cardsHtml;
}

function finish(body) {
	let finishHtml = `
		<div class="finish">
			<img width="500" height="500" src="img/finish.png" alt="finish" />
			<button type="button" id="playAgainBtn" class="btn">
				Play again
			</button>
		</div>;
	`;

	setTimeout(() => {
		body.innerHTML = finishHtml;

		const playBtn = document.querySelector("#playAgainBtn");
		playBtn.addEventListener("click", () => {
			start(cardsArr);
		});
	}, 500);
}

function showCard(target) {
	target.classList.add("active");
}

function hideCards(list) {
	setTimeout(() => {
		for (let item of list) {
			item.classList.remove("active");
		}
	}, 1000);
}
