/**
 * Videos Database can be added here.
 * You can add videos of your wish with different attributes
 * */
import { v4 as uuid } from "uuid";
// https://i.ytimg.com/vi/ewMksAbgdBI/maxresdefault.jpg

export const videos = [
	{
		_id: uuid(),
		title: "DUNE | official trailer | world wide release",
		creator: "Warner Brothers",
		thumbnail: "https://i.ytimg.com/vi/8g18jFHCLXk/mqdefault.jpg",
		src: "https://www.youtube.com/embed/8g18jFHCLXk",
		creatorProfile:
			"https://yt3.ggpht.com/ytc/AKedOLTUnZtaiWtHHHFxqilQey0x3Psd8rRtiIDxyYgHCg=s48-c-k-c0x00ffffff-no-rj",
		views: 1213423787,
		category: "Movies",
		uploaded: new Date("Apr 06 2021 12:31:25"),
	},
	{
		_id: uuid(),
		title: "Arcane | Official Trailer | Netflix",
		creator: "Netflix",
		thumbnail: "https://i.ytimg.com/vi/fXmAurh012s/mqdefault.jpg",
		src: "https://www.youtube.com/embed/fXmAurh012s",
		creatorProfile:
			"https://yt3.ggpht.com/ytc/AKedOLTZzZv60B1v76eOC7TsEYZD_TMH2-H5KeYxkfXGBQ=s48-c-k-c0x00ffffff-no-rj",
		views: 121348,
		category: "Series",
		uploaded: new Date("Feb 23 2022 12:31:25"),
	},
	{
		_id: uuid(),
		title: "Steins;Gate the Movie: Load Region of Deja Vu - Official Trailer",
		views: 123,
		creator: "Madman Anime",
		thumbnail: "https://i.ytimg.com/vi/uMYhjVwp0Fk/maxresdefault.jpg",
		src: "https://www.youtube.com/embed/uMYhjVwp0Fk",
		creatorProfile:
			"https://yt3.ggpht.com/ytc/AKedOLSPEPJy_pwy2hYmyyrxk4flGAqOfoCfnz_z9viZZg=s48-c-k-c0x00ffffff-no-rj",
		views: 67000,
		category: "Anime",
		uploaded: new Date("May 12 2017 12:31:25"),
	},
	{
		_id: uuid(),
		title: "Neon Genesis Evangelion - Theatrical Trailer",
		creator: "SpaceSweeperUncut",
		thumbnail: "https://i.ytimg.com/vi/PNOQbz24_Bw/maxresdefault.jpg",
		src: "https://www.youtube.com/embed/PNOQbz24_Bw",
		creatorProfile:
			"https://yt3.ggpht.com/ytc/AKedOLR1xUQzRDQ8brz_n2zE5uCWakAGF8rTZclF2_vGUQ=s48-c-k-c0x00ffffff-no-rj",
		views: 3321348,
		category: "Anime",
		uploaded: new Date("Jun 02 2016 12:31:25"),
	},
	{
		_id: uuid(),
		title: "Dark Season 3 | Official Trailer | Netflix",
		creator: "Netflix",
		thumbnail: "https://i.ytimg.com/vi/cq2iTHoLrt0/maxresdefault.jpg",
		creatorProfile:
			"https://yt3.ggpht.com/ytc/AKedOLTZzZv60B1v76eOC7TsEYZD_TMH2-H5KeYxkfXGBQ=s48-c-k-c0x00ffffff-no-rj",
		src: "https://www.youtube.com/embed/cq2iTHoLrt0",
		views: 9000000,
		category: "Series",
		uploaded: new Date("Jun 02 2018 12:31:25"),
	},
	{
		_id: uuid(),
		title: "Ghost in the Shell: SAC_2045 Season 2 | Teaser Trailer | Netflix",
		creator: "Netflix",
		thumbnail: "https://i.ytimg.com/vi/cTm93Vjuuc4/maxresdefault.jpg",
		creatorProfile:
			"https://yt3.ggpht.com/ytc/AKedOLTZzZv60B1v76eOC7TsEYZD_TMH2-H5KeYxkfXGBQ=s48-c-k-c0x00ffffff-no-rj",
		src: "https://www.youtube.com/embed/cTm93Vjuuc4",
		views: 123,
		category: "Anime",
		uploaded: new Date("Dec 02 2018 11:31:25"),
	},
	{
		_id: uuid(),
		title: "Interstellar - Trailer - Official Warner Bros. UK",
		creator: "Warner Brothers",
		thumbnail: "https://i.ytimg.com/vi/zSWdZVtXT7E/mqdefault.jpg",
		src: "https://www.youtube.com/embed/zSWdZVtXT7E",
		creatorProfile:
			"https://yt3.ggpht.com/ytc/AKedOLTUnZtaiWtHHHFxqilQey0x3Psd8rRtiIDxyYgHCg=s48-c-k-c0x00ffffff-no-rj",
		views: 12134,
		category: "Movies",
		uploaded: new Date("Jul 17 2020 11:31:25"),
	},
	{
		_id: uuid(),
		title: "LOVE DEATH + ROBOTS | Official Trailer | Netflix",
		creator: "Netflix",
		thumbnail: "https://i.ytimg.com/vi/wUFwunMKa4E/maxresdefault.jpg",
		creatorProfile:
			"https://yt3.ggpht.com/ytc/AKedOLTZzZv60B1v76eOC7TsEYZD_TMH2-H5KeYxkfXGBQ=s48-c-k-c0x00ffffff-no-rj",
		src: "https://www.youtube.com/embed/wUFwunMKa4E",
		views: 9000,
		category: "Series",
		uploaded: new Date("Nov 25 2020 11:31:25"),
	},
];
