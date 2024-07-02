let puzzleSpecs = [
/*
	{
		number: 28,
		publishedOn: "dd Mmm 24",
		wordSpec: [undefined, "ADELE", "DEADEN", "DUNDEE", "LAUDED", "DENUDE"],
		hintSpec: ["I", [2, 5]],
		solutionSpec: [undefined, [4, 2], [2, 1], [5, 2], [1, 1], [3, 1]],
		featuredWordBlurb:
			"Frenchman Louis Rèard was an automobile engineer ... and a clothing designer! " +
			"In 1946, he launched the BIKINI. He named it after the BIKINI Atoll (in the Marshall Islands), where a nuclear bomb had recently been tested."
	},

	{
		number: 27,
		publishedOn: "dd Mmm 24",
		wordSpec: [undefined, "EGGNOG", "OREGON", "GORGON", "GEORGE", "ORANGE"],
		hintSpec: ["I", [2, 5]],
		solutionSpec: [undefined, [5, 1], [2, 1], [4, 2], [1, 2], [3, 2]],
		featuredWordBlurb:
			"Frenchman Louis Rèard was an automobile engineer ... and a clothing designer! " +
			"In 1946, he launched the BIKINI. He named it after the BIKINI Atoll (in the Marshall Islands), where a nuclear bomb had recently been tested."
	},

	{
		number: 26,
		publishedOn: "dd Mmm 24",
		wordSpec: [undefined, "COCOON", "ROCOCO", "CORONA", "RACOON", "CACAO"],
		hintSpec: ["I", [2, 5]],
		solutionSpec: [undefined, [5, 1], [4, 2], [3, 2], [1, 2], [2, 2]],
		featuredWordBlurb:
			"Frenchman Louis Rèard was an automobile engineer ... and a clothing designer! " +
			"In 1946, he launched the BIKINI. He named it after the BIKINI Atoll (in the Marshall Islands), where a nuclear bomb had recently been tested."
	},
*/
	{
		number: 25,
		publishedOn: "2 Jul 24",
		wordSpec: [undefined, "MAPPED", "CAMPED", "DECAMP", "DEEMED", "MADCAP"],
		hintSpec: ["E", [5, 2]],
		solutionSpec: [undefined, [1, 2], [3, 1], [2, 2], [5, 1], [4, 2]],
		featuredWordBlurb:
			"D<span style=\"font-variant:small-caps\">e</span>C<span style=\"font-variant:small-caps\">amp</span> is a surname of French/Dutch origin. " +
			"For people who ‘worked the field’. " +
			"So, equivalent to the English ‘Farmer’."
	},
	{
		number: 24,
		publishedOn: "20 Jun 24",
		wordSpec: [undefined, "RENEGE", "GERMANE", "GREENE", "EMERGE", "MEAGRE"],
		hintSpec: ["E", [5, 7]],
		solutionSpec: [undefined, [4, 1], [3, 1], [5, 2], [1, 2], [2, 1]],
		featuredWordBlurb:
			"Graham GREENE saw himself as a writer of serious novels and ‘entertainments’. " +
			"The Power and the Glory is an example of the former; the title comes from the Lord’s Prayer. " +
			"Our Man in Havana, a spy thriller, is in the latter category."
	},
	{
		number: 23,
		publishedOn: "11 Jun 24",
		wordSpec: [undefined, "UNSEEN", "SPELLS", "NELLIE", "LUPINE", "SENILE"],
		hintSpec: ["E", [5, 6]],
		solutionSpec: [undefined, [4, 2], [2, 2], [5, 1], [1, 1], [3, 1]],
		featuredWordBlurb:
			"To Bombay a travelling circus came<br>" +
			"They brought an intelligent elephant and Nellie was her name<br>" +
			"One dark night she slipped her iron chain<br>" +
			"And off she ran to Hindustan and was never seen again"
	},




	{
		number: 22,
		publishedOn: "22 Mar 24",
		wordSpec: [undefined, "MISFIT", "INKING", "BIKINI", "NITWIT", "KINGPIN"],
		hintSpec: ["I", [2, 5]],
		solutionSpec: [undefined, [2, 1], [1, 2], [4, 1], [5, 2], [3, 1]],
		featuredWordBlurb:
			"Frenchman Louis Rèard was an automobile engineer ... and a clothing designer! " +
			"In 1946, he launched the BIKINI. He named it after the BIKINI Atoll (in the Marshall Islands), where a nuclear bomb had recently been tested."
	},
	{
		number: 21,
		publishedOn: "2 Feb 24",
		wordSpec: [undefined, "ANDREA", "ARLENE", "JANICE", "SERENA", "ELAINE"],
		hintSpec: ["N", [2, 5]],
		solutionSpec: [undefined, [3, 1], [4, 2], [1, 1], [5, 1], [2, 1]],
		featuredWordBlurb:
			"It seems the first JANICE was born in 1899. " +
			"She was the eponymous heroine of the novel JANICE Meredith by the American author Paul Leicester Ford."
	},
	{
		number: 20,
		publishedOn: "15 Mar 24",
		wordSpec: [undefined, "CAESAR", "SENATE", "SENECA", "SCENES", "SEANCE"],
		hintSpec: ["E", [2, 6]],
		solutionSpec: [undefined, [5, 2], [2, 1], [3, 1], [4, 2], [1, 2]],
		featuredWordBlurb:
			"SENECA was twice ordered to kill himself! When Caligula was offended by his success as an orator! " +
			"(He survived because he was very ill and deemed to be as good as dead.) And when Nero decided he was part of an assassination plot."
	},
	{
		number: 19,
		publishedOn: "8 Mar 24",
		wordSpec: [undefined, "NITRIC", "INGRID", "RISHI", "RIMINI", "CRITIC"],
		hintSpec: ["I", [2, 6]],
		solutionSpec: [undefined, [4, 1], [1, 2], [2, 2], [5, 1], [3, 2]],
		featuredWordBlurb:
			"RISHI Sunak's occupancy of the Number 10 throne may be a little precarious, but he'll always be able to sit comfortably in his Richmond seat. " +
			"The Yorkshire constituency has been held by the Tories for over 100 years."
	},
	{
		number: 18,
		publishedOn: "1 Mar 24",
		wordSpec: [undefined, "KNEELER", "NICKEL", "KENKEN", "ENCORE", "KEENER"],
		hintSpec: ["E", [5, 2]],
		solutionSpec: [undefined, [4, 1], [1, 2], [2, 1], [3, 2], [5, 1]],
		featuredWordBlurb:
			"KENKEN is a Sudoku-like puzzle. Invented in Japan in 2004. " +
			"The puzzle has an arithmetic element as well as a logic element. This duality is making it a classroom hit!"
	},
	{
		number: 17,
		publishedOn: "23 Feb 24",
		wordSpec: [undefined, "QUEUES", "QUICHE", "QUEBEC", "SEQUEL", "UNIQUE"],
		hintSpec: ["U", [1, 2]],
		solutionSpec: [undefined, [4, 1], [5, 1], [2, 1], [3, 2], [1, 2]],
		featuredWordBlurb:
			"In 1995, QUEBEC very nearly set out on the path to independence. "+
			"A referendum asking whether or not the province should separate from Canada resulted in a 49.42%-50.58% Yes-No verdict. " +
			"Just 54,288 votes in it! Turnout was 93.52%!"
	},
	{
		number: 16,
		publishedOn: "16 Feb 24",
		wordSpec: [undefined, "ROTTER", "TORPOR", "OPORTO", "RESORT", "PRESTO"],
		hintSpec: ["T", [3, 6]],
		solutionSpec: [undefined, [4, 2], [2, 2], [5, 2], [3, 1], [1, 1]],
		featuredWordBlurb:
			"OPORTO or Porto is Portugal's second city. " +
			"It lies in the north of the country on the Douro River estuary. Port wine is produced in the Douro valley."
	},
	{
		number: 15,
		publishedOn: "9 Feb 24",
		wordSpec: [undefined, "HOBNOB", "HOODOO", "AUROCHS", "BOOHOO", "HURRAH"],
		hintSpec: ["O", [5, 3]],
		solutionSpec: [undefined, [3, 2], [5, 2], [4, 1], [2, 1], [1, 1]],
		featuredWordBlurb:
			"AUROCHS is a cattle species. Now extinct. " +
			"Its massive horns - up to 80cm in length - ensured it was heavily hunted. " +
			"Considered to be the wild ancestor of modern domestic cattle. AUROCHS is both the singular and the plural."
	},
	{
		number: 14,
		publishedOn: "9 Jun 23",
		wordSpec: [undefined, "BOURNE", "BOLERO", "OBERON", "BONBON", "NOBLER"],
		hintSpec: ["O", [3, 3]],
		solutionSpec: [undefined, [5, 1], [2, 2], [1, 2], [4, 1], [3, 2]],
		featuredWordBlurb:
			"In A Midsummer Night's Dream, OBERON is king of the Fairies. He spends much " +
			"of the play engaged in a dispute with his wife Titania, the Fairy queen. " +
			"It all ends well though."
	},
	{
		number: 13,
		publishedOn: "2 Jun 23",
		wordSpec: [undefined, "SALAMI", "MIASMA", "MALALA", "MIAMI", "MAMMAL"],
		hintSpec: ["M", [5, 5]],
		solutionSpec: [undefined, [5, 1], [4, 2], [2, 1], [3, 2], [1, 2]],
		featuredWordBlurb:
			"At the age of 17, MALALA Yousafzai, from Pakistan, was awarded the Nobel Peace " +
			"Prize for her female education activism. When she was 14, she survived an " +
			"attempt by the Taliban to assassinate her (she was shot in the head)."
	},
	{
		number: 12,
		publishedOn: "26 May 23",
		wordSpec: [undefined, "EXCESS", "SEXIER", "XERXES", "SUSSEX", "EXCISE"],
		hintSpec: ["E", [3, 6]],
		solutionSpec: [undefined, [2, 1], [3, 2], [4, 1], [5, 2], [1, 2]],
		featuredWordBlurb:
			"In 490 BC, Persian King Darius I failed in his attempt to invade Greece. He " +
			"was defeated at the Battle of Marathon. Ten years later, his son, XERXES I, " +
			"succeeded, razing Athens in the process."
	},
	{
		number: 11,
		publishedOn: "19 May 23",
		wordSpec: [undefined, "EILEEN", "ELAINE", "IRENE", "ELOISE", "LESLIE"],
		hintSpec: ["E", [3, 2]],
		solutionSpec: [undefined, [5, 1], [3, 2], [2, 2], [4, 1], [1, 2]],
		featuredWordBlurb:
			"IRENE is derived from the Greek word for 'peace'; Eirene was the Greek goddess " +
			"of Peace. Remember 'Flashdance... What a Feeling'?"
	},
	{
		number: 10,
		publishedOn: "31 Mar 23",
		wordSpec: [undefined, "COTTON", "MOTOWN", "TROMSO", "CROONS", "ROCOCO"],
		hintSpec: ["O", [3, 4]],
		solutionSpec: [undefined, [2, 2], [5, 1], [1, 1], [3, 2], [4, 2]],
		featuredWordBlurb:
			"TROMSO, or more accurately Tromsø, is a city in Norway. Lying north of the " +
			"Arctic Circle, it sits (mostly) on an island. In Danish, 'ø' is the word for 'island'!"
	},
	{
		number: 9,
		publishedOn: "24 Mar 23",
		wordSpec: [undefined, "INVENT", "INDIAN", "VIVIAN", "VINNIE", "VITAMIN"],
		hintSpec: ["I", [1, 2]],
		solutionSpec: [undefined, [4, 2], [3, 1], [5, 1], [2, 2], [1, 1]],
		featuredWordBlurb:
			"Sir VIVIAN Richards played for the West Indies cricket team between 1974 " +
			"and 1991. He is widely regarded as one of the greatest batsmen of all time."
	},
	{
		number: 8,
		publishedOn: "17 Mar 23",
		wordSpec: [undefined, "USURER", "RUSHES", "SUISSE", "USHERS", "RUFUS"],
		hintSpec: ["U", [2, 3]],
		solutionSpec: [undefined, [4, 1], [2, 2], [1, 2], [5, 1], [3, 2]],
		featuredWordBlurb:
			"In English, it's Switzerland; in French, SUISSE; in German, Schweiz; in " +
			"Italian, Svizzera. Officially, it's Confoederatio Helvetica (CH) - the Latin name."
	},
	{
		number: 7,
		publishedOn: "10 Mar 23",
		wordSpec: [undefined, "NEPHEW", "HAPPEN", "YAHWEH", "PHOEBE", "PEAHEN"],
		hintSpec: ["E", [3, 6]],
		solutionSpec: [undefined, [3, 2], [4, 1], [1, 1], [5, 1], [2, 2]],
		featuredWordBlurb:
			"The Old Testament (Exodus 3) reveals 'YHWH' as the personal name of God. The " +
			"name is vocalised as YAHWEH or, in English, Jehovah."
	},
	{
		number: 6,
		publishedOn: "3 Mar 23",
		wordSpec: [undefined, "NORMAN", "NELSON", "NGUYEN", "NEESON", "MENDES"],
		hintSpec: ["N", [1, 7]],
		solutionSpec: [undefined, [3, 1], [5, 1], [1, 2], [4, 2], [2, 1]],
		featuredWordBlurb:
			"NGUYEN is by far the most common surname in Vietnam - over 30% " +
			"of people bear it. In the US, in 2010, NGUYEN was the 38th most common surname."
	},
	{
		number: 5,
		publishedOn: "24 Feb 23",
		wordSpec: [undefined, "ANKARA", "ANNIKA", "UKRAINE", "KEEGAN", "KRAKEN"],
		hintSpec: ["A", [2, 6]],
		solutionSpec: [undefined, [4, 2], [1, 2], [5, 1], [2, 2], [3, 1]],
		featuredWordBlurb:
			"Dedicated to Volodymyr and his people."
	},
	{
		number: 4,
		publishedOn: "17 Feb 23",
		wordSpec: [undefined, "ENDING", "ENGINE", "GINSENG", "GENIES", "ENSIGN"],
		hintSpec: ["N", [2, 3]],
		solutionSpec: [undefined, [1, 1], [3, 1], [2, 1], [5, 2], [4, 1]],
		featuredWordBlurb:
			"GINSENG: A plant found in China and North America. In China and Korea, " +
			"root extracts have long been used for medicinal purposes. " +
			"It's pretty big business."
	},
	{
		number: 3,
		publishedOn: "10 Feb 23",
		wordSpec: [undefined, "SICILY", "RIMINI", "MIMICS", "CHILLI", "CITRIC"],
		hintSpec: ["I", [3, 3]],
		solutionSpec: [undefined, [3, 2], [2, 1], [4, 1], [5, 2], [1, 1]],
		featuredWordBlurb:
			"SICILY: largest island in the Med. The Strait of Messina separates it " +
			"from the Italian mainland. At one point, the waterway is just two miles " +
			"wide. Mount Etna sits on the east coast."
	},
	{
		number: 2,
		publishedOn: "3 Feb 23",
		wordSpec: [undefined, "HELVE", "CHEETAH", "HEARSE", "HEALER", "HASSLE"],
		hintSpec: ["E", [4, 3]],
		solutionSpec: [undefined, [1, 2], [4, 1], [5, 1], [2, 1], [3, 1]],
		featuredWordBlurb:
			"HELVE: the handle of a hand tool such as an axe or a hammer."
	},
	{
		number: 1,
		publishedOn: "27 Jan 23",
		wordSpec: [undefined, "ROWENA", "RENATA", "ROSALEE", "LEANNA", "RAMONA"],
		hintSpec: ["N", [2, 5]],
		solutionSpec: [undefined, [4, 1], [5, 1], [1, 1], [2, 1], [3, 1]],
		featuredWordBlurb:
			"ROWENA is not a common name. But it wasn't even uncommon until Lady " +
			"Rowena appeared, as a main character, in Sir Walter Scott's Ivanhoe (1820)!"
	}
];

