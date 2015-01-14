var set = window.set || {};

// if set is empty (not included twice)
if (Object.getOwnPropertyNames(set).length == 0) {
	// Here we go
	(function () {
		"use strict";

		set.types = {
			'shape': ["oval", "squiggle", "diamond"],
			'color': ["red", "green", "purple"],
			'number': [1, 2, 3],
			'shading': ["solid", "striped", "open"],
			// Finds the differences in a collection of types
			'diff': function (typeSet) {
				if (typeSet.length !== 3) return undefined;

				// Create temporary array, then sort it.
				var _typeSet = typeSet;
				_typeSet.sort();

				// Return the amount of differences in the array - 2 (all different), 1 (one difference), 0 (all equal)
				return typeSet.reduce(function (prev, cur, i, arr) {
					return prev - (arr[i] === arr[i+1]);
				}, 2);
			},
			// Matches a collection of type values
			// `typeSet` must be all the same type
			// e.g. match([ 1, 1, 2 ]) = false;
			//		match([ "oval", "oval", "oval"]) = true
			'match': function (typeSet) {
				// If typeSet only has one difference, return false. Else (all different, or all equal), return true.
				return this.diff(typeSet) !== 1;
			}
		};



		// Returns a new Card object
		//
		// set.Card({
		// 	'shape': 'squiggle',
		// 	'color': 'purple',
		// 	'number': 1,
		//	'shading': 'solid'
		// });
		set.Card = function (params) {
			return {
				'shape': params.shape,
				'color': params.color,
				'number': params.number,
				'shading': params.shading
			};
		};

		// Create a global, shuffled deck for us to use
		set.Deck = (function () {
			var deck = Array(81),
				types = set.types;

			// Borrowed from http://stackoverflow.com/questions/15298912/javascript-generating-combinations-from-n-arrays-with-m-elements
			function cartesian() {
				var r = [], arg = arguments, max = arg.length-1;
				function helper(arr, i) {
					for (var j=0, l=arg[i].length; j<l; j++) {
						var a = arr.slice(0); // clone arr
						a.push(arg[i][j])
						if (i==max) {
							r.push(a);
						}
						else {
							helper(a, i+1);
						}
					}
				}
				helper([], 0);
				return r;
			}

			// Fisher-Yates shuffle. Borrowed from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
			function shuffle(array) {
				var currentIndex = array.length, temporaryValue, randomIndex ;

				// While there remain elements to shuffle...
				while (0 !== currentIndex) {

					// Pick a remaining element...
					randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex -= 1;

					// And swap it with the current element.
					temporaryValue = array[currentIndex];
					array[currentIndex] = array[randomIndex];
					array[randomIndex] = temporaryValue;
				}

				return array;
			}

			// Take the cartesian product of the type arrays, map it to our Card function to create the deck, and then shuffle it
			return shuffle(cartesian(types.shape, types.color, types.shading, types.number).map(function (el, i, arr) {
				return set.Card({ 'shape': el[0], 'color': el[1], 'shading': el[2], 'number': el[3] });
			}, this));
		})();


		// Check if 3 cards make a set
		set.check = function (cards) { // cards = Cards[3]
			if (cards.length !== 3) return undefined;

			var typeSets = [],
				types = set.types;

			Object.keys(this.Card({})).forEach(function (type) {
				typeSets.push([cards[0][type], cards[1][type], cards[2][type]]);
			});

			return typeSets.every(function (el) {
				return types.match(el);
			});
		};
	})();
}