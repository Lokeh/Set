!(function () {
	"use strict";

	QUnit.test('set checking', function (assert) {
		var table = [
				set.Card({
					'color': "green",
					'number': 3,
					'shading': "solid",
					'shape': "oval"
				}),
				set.Card({
					'color': "red",
					'number': 3,
					'shading': "solid",
					'shape': "diamond"
				}),
				set.Card({
					'color': "purple",
					'number': 3,
					'shading': "solid",
					'shape': "squiggle"
				}),
				set.Card({
					'color': "purple",
					'number': 2,
					'shading': "solid",
					'shape': "squiggle"
				})
		];

		ok(set.check([
			table[1],
			table[0],
			table[2]
		]), "Correct set checked correctly");
		ok(!set.check([
			table[1],
			table[0],
			table[3]
		]), "Incorrect set checked correctly");
	});

	QUnit.test('deck', function (assert) {
		var deck = set.Deck();

		equal(deck.length(), 81, "81 cards generated");

		var deck1 = set.Deck(), deck2 = set.Deck();
		deepEqual(deck1.draw(), deck2.draw(), "New decks are always equal.")
		
		deck1 = set.Deck().shuffle(), deck2 = set.Deck().shuffle();
		notDeepEqual(deck1.draw(), deck2.draw(), "Shuffled decks are (probably) distinct.")
	});
})();