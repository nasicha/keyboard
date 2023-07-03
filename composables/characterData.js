export default {
	layouts: [
		{state: 0, name: "default", value: "abc", shiftValue: "ABC", nextValue: "123" },
		{state: 1, name: "symbols", value: "123", shiftValue: "?!%", nextValue: "☻" },
    {state: 2, name: "emoji", value: "☻", shiftValue: "★", nextValue: "abc" },
	],
	characterGroupsQWERTY: [
		{
			key: "0",
			characters: [
				{ key: 1, value: "t", valueShift: "T" },
				{ key: 2, value: "h", valueShift: "H" },
				{ key: 3, value: "?", valueShift: "!" },
				{ key: 4, value: ".", valueShift: "," },
			],
		},
		{
			key: "1",
			characters: [
				{ key: 1, value: "y", valueShift: "Y" },
				{ key: 2, value: "g", valueShift: "G" },
				{ key: 3, value: "r", valueShift: "R" },
				{
					key: 4,
					value: "e",
					valueShift: "E",
					diacritics: ["é", "è", "ê", "ë"],
				},
			],
		},
		{
			key: "2",
			characters: [
				{ key: 1, value: "i", valueShift: "I" },
				{ key: 2, value: "p", valueShift: "P" },
				{ key: 3, value: "o", valueShift: "O" },
				{ key: 4, value: "u", valueShift: "U" },
			],
		},
		{
			key: "3",
			characters: [
				{ key: 1, value: "k", valueShift: "K" },
				{ key: 2, value: "l", valueShift: "L" },
				{ key: 3, value: "j", valueShift: "J" },
				{ key: 4, value: "m", valueShift: "M" },
			],
		},
		{
			key: "4",
			characters: [
				{ key: 1, value: "b", valueShift: "B" },
				{ key: 2, value: "n", valueShift: "N" },
				{ key: 3, value: "v", valueShift: "V" },
				{ key: 4, value: "c", valueShift: "C" },
			],
		},
		{
			key: "5",
			characters: [
				{ key: 1, value: "d", valueShift: "D" },
				{ key: 2, value: "f", valueShift: "F" },
				{ key: 3, value: "x", valueShift: "X" },
				{ key: 4, value: "z", valueShift: "Z" },
			],
		},
		{
			key: "6",
			characters: [
				{ key: 1, value: "q", valueShift: "Q" },
				{ key: 2, value: "w", valueShift: "W" },
				{ key: 3, value: "s", valueShift: "S" },
				{
					key: 4,
					value: "a",
					valueShift: "A",
					diacritics: ["á", "à", "â", "ä", "ã", "å", "æ"],
				},
			],
		},
	],
	characterGroupsAlphabetical: [
		{
			key: "0",
			characters: [
				{
					key: 1,
					value: "e",
					valueShift: "E",
					diacritics: ["é", "è", "ê", "ë"],
				},
				{ key: 2, value: "f", valueShift: "F" },
				{ key: 3, value: "?", valueShift: "!" },
				{ key: 4, value: ".", valueShift: "," },
			],
		},
		{
			key: "1",
			characters: [
				{
					key: 1,
					value: "a",
					valueShift: "A",
					diacritics: ["á", "à", "â", "ä", "ã", "å", "æ"],
				},
				{ key: 2, value: "b", valueShift: "B" },
				{ key: 3, value: "c", valueShift: "C" },
				{ key: 4, value: "d", valueShift: "D" },
			],
		},
		{
			key: "2",
			characters: [
				{ key: 1, value: "g", valueShift: "G" },
				{ key: 2, value: "h", valueShift: "H" },
				{ key: 3, value: "i", valueShift: "I" },
				{ key: 4, value: "j", valueShift: "J" },
			],
		},
		{
			key: "3",
			characters: [
				{ key: 1, value: "k", valueShift: "K" },
				{ key: 2, value: "l", valueShift: "L" },
				{ key: 3, value: "m", valueShift: "M" },
				{ key: 4, value: "n", valueShift: "N" },
			],
		},
		{
			key: "4",
			characters: [
				{ key: 1, value: "o", valueShift: "O" },
				{ key: 2, value: "p", valueShift: "P" },
				{ key: 3, value: "q", valueShift: "Q" },
				{ key: 4, value: "r", valueShift: "R" },
			],
		},
		{
			key: "5",
			characters: [
				{ key: 1, value: "s", valueShift: "S" },
				{ key: 2, value: "t", valueShift: "T" },
				{ key: 3, value: "u", valueShift: "U" },
				{ key: 4, value: "v", valueShift: "V" },
			],
		},
		{
			key: "6",
			characters: [
				{ key: 1, value: "w", valueShift: "W" },
				{ key: 2, value: "x", valueShift: "X" },
				{ key: 3, value: "y", valueShift: "Y" },
				{ key: 4, value: "z", valueShift: "Z" },
			],
		},
	],
	characterGroupsSymbols: [
		{
			key: "0",
			characters: [
				{ key: 1, value: "-", valueShift: "-" },
				{ key: 2, value: "!", valueShift: "¡" },
				{ key: 3, value: "?", valueShift: "¿" },
				{ key: 4, value: ".", valueShift: "," },
			],
		},
		{
			key: "1",
			characters: [
				{ key: 1, value: "0", valueShift: "0" },
				{ key: 2, value: "2", valueShift: "2" },
				{ key: 3, value: "3", valueShift: "3" },
				{ key: 4, value: "1", valueShift: "1" },
			],
		},
		{
			key: "2",
			characters: [
				{ key: 1, value: "8", valueShift: "8" },
				{ key: 2, value: ":", valueShift: ";" },
				{ key: 3, value: "\'", valueShift: '\"' },
				{ key: 4, value: "9", valueShift: "9" },
			],
		},
		{
			key: "3",
			characters: [
				{ key: 1, value: "+", valueShift: "" },
				{ key: 2, value: "-", valueShift: "" },
				{ key: 3, value: "*", valueShift: "" },
				{ key: 4, value: "/", valueShift: "" },
			],
		},
		{
			key: "4",
			characters: [
				{ key: 1, value: "$", valueShift: "" },
				{ key: 2, value: "€", valueShift: "" },
				{ key: 3, value: "#", valueShift: "" },
				{ key: 4, value: "%", valueShift: "" },
			],
		},
		{
			key: "5",
			characters: [
				{ key: 1, value: "@", valueShift: "" },
				{ key: 2, value: "&", valueShift: "" },
				{ key: 3, value: "(", valueShift: "[" },
				{ key: 4, value: ")", valueShift: "]" },
			],
		},
		{
			key: "6",
			characters: [
				{ key: 1, value: "4", valueShift: "4" },
				{ key: 2, value: "6", valueShift: "6" },
				{ key: 3, value: "7", valueShift: "7" },
				{ key: 4, value: "5", valueShift: "5" },
			],
		},
	],
	characterGroupsEmoji: [
		{
			key: "0",
			characters: [
				{ key: 1, value: "😀", valueShift: "" },
				{ key: 2, value: "", valueShift: "" },
				{ key: 3, value: "?", valueShift: "!" },
				{ key: 4, value: ".", valueShift: "," },
			],
		},
		{
			key: "1",
			characters: [
				{ key: 1, value: "", valueShift: "" },
				{ key: 2, value: "", valueShift: "" },
				{ key: 3, value: "", valueShift: "" },
				{ key: 4, value: "", valueShift: "" },
			],
		},
		{
			key: "2",
			characters: [
				{ key: 1, value: "", valueShift: "" },
				{ key: 2, value: "", valueShift: "" },
				{ key: 3, value: "", valueShift: "" },
				{ key: 4, value: "", valueShift: "" },
			],
		},
		{
			key: "3",
			characters: [
				{ key: 1, value: "", valueShift: "" },
				{ key: 2, value: "", valueShift: "" },
				{ key: 3, value: "", valueShift: "" },
				{ key: 4, value: "", valueShift: "" },
			],
		},
		{
			key: "4",
			characters: [
				{ key: 1, value: "", valueShift: "" },
				{ key: 2, value: "", valueShift: "" },
				{ key: 3, value: "", valueShift: "" },
				{ key: 4, value: "", valueShift: "" },
			],
		},
		{
			key: "5",
			characters: [
				{ key: 1, value: "", valueShift: "" },
				{ key: 2, value: "", valueShift: "" },
				{ key: 3, value: "", valueShift: "" },
				{ key: 4, value: "", valueShift: "" },
			],
		},
		{
			key: "6",
			characters: [
				{ key: 1, value: "", valueShift: "" },
				{ key: 2, value: "", valueShift: "" },
				{ key: 3, value: "", valueShift: "" },
				{ key: 4, value: "", valueShift: "" },
			],
		},
	],
};
