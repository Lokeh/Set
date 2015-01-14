!(function () {
	"use strict";

	QUnit.test('set checking', function (assert) {
		var table = [
				{
					'color': "green",
					'number': 3,
					'shading': "solid",
					'shape': "oval"
				},
				{
					'color': "red",
					'number': 3,
					'shading': "solid",
					'shape': "diamond"
				},
				{
					'color': "purple",
					'number': 3,
					'shading': "solid",
					'shape': "squiggle"
				},
				{
					'color': "purple",
					'number': 2,
					'shading': "solid",
					'shape': "squiggle"
				}
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

		equal(deck.length, 81, "81 cards generated");
	});
})();