/**
 * Videos Database can be added here.
 * You can add videos of your wish with different attributes
 * */
import { v4 as uuid } from "uuid";
// https://i.ytimg.com/vi/ewMksAbgdBI/maxresdefault.jpg

export const videos = [
	{
		_id: uuid(),
		title: "Awesome Video about Coding Awesome Video about Coding",
		views: 123,
		creator: "Soham Shah",
		thumbnail: "https://i.ytimg.com/vi/dd7BILZcYAY/mqdefault.jpg",
		src: "https://www.youtube.com/embed/dd7BILZcYAY",
		creatorProfile:
			"https://yt3.ggpht.com/ytc/AKedOLRJ8h5qd15qoFRQN5Db3gT7VOwBqvUJJEXvL-SY=s68-c-k-c0x00ffffff-no-rj",
		views: 12134,
	},
	{
		_id: uuid(),
		title: "Awesome Video about Coding",
		views: 123,
		creator: "Soham Shah",
		thumbnail: "https://i.ytimg.com/vi/uMYhjVwp0Fk/maxresdefault.jpg",
		src: "https://www.youtube.com/embed/kUkcQb-K3KU",
		creatorProfile:
			"https://yt3.ggpht.com/ytc/AKedOLSPEPJy_pwy2hYmyyrxk4flGAqOfoCfnz_z9viZZg=s48-c-k-c0x00ffffff-no-rj",
		views: 67000,
	},
	{
		_id: uuid(),
		title: "Awesome Video about Coding",
		views: 123,
		creator: "Soham Shah",
		thumbnail: "https://i.ytimg.com/vi/PNOQbz24_Bw/maxresdefault.jpg",
		src: "https://www.youtube.com/embed/-teoD5uM_8U",
		views: 2345,
	},
	{
		_id: uuid(),
		title: "Awesome Video about Coding",
		views: 123,
		creator: "Soham Shah",
		thumbnail: "https://i.ytimg.com/vi/cq2iTHoLrt0/maxresdefault.jpg",
		src: "https://www.youtube.com/embed/-teoD5uM_8U",
		views: 9000,
	},
	{
		_id: uuid(),
		title: "Awesome Video about Coding",
		views: 123,
		creator: "Soham Shah",
		thumbnail: "https://i.ytimg.com/vi/cTm93Vjuuc4/maxresdefault.jpg",
		src: "https://www.youtube.com/embed/-teoD5uM_8U",
		views: 2345,
	},
];
