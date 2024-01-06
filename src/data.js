const javascript = `const Code = function Home() {
	return (
		<div className='grid grid-cols-8'>
			<Sidebar />
			<HomeContent />
			<div className='px-5 py-14 col-span-6 h-screen overflow-auto scroll'>
				<h1 className='text-6xl font-poppins font-extrabold text-gray-800 my-10'>Content</h1>
				{data.map((d) => (
					<Element key={d.id} {...d} />
				))}
			</div>
		</div>
	);
};`;

const python = `# Solve the quadratic equation ax**2 + bx + c = 0

# import complex math module
import cmath

a = 1
b = 5
c = 6

# calculate the discriminant
d = (b**2) - (4*a*c)

# find two solutions
sol1 = (-b-cmath.sqrt(d))/(2*a)
sol2 = (-b+cmath.sqrt(d))/(2*a)

print('The solution are {0} and {1}'.format(sol1,sol2))
`;

const php = `<!DOCTYPE html>
<html>
<body>

<h1>Developer News</h1>

<?php echo "The Best PHP Examples"; ?>

</body>
</html> `;
export const data = [
	{
		title: "This is Topic 1",
		id: "#topic1",
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
		javascript,
		php,
		python,
	},
	{
		title: "This is Topic 2",
		id: "#topic2",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "This is Topic 3",
		id: "#topic3",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "This is Topic 4",
		id: "#topic4",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "This is Topic 5",
		id: "#topic5",
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
		javascript,
		php,
		python,
	},
	{
		title: "This is Topic 6",
		id: "#topic6",
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
		javascript,
		php,
		python,
	},
	{
		title: "This is Topic 7",
		id: "#topic7",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "This is Topic 8",
		id: "#topic8",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "This is Topic 9",
		id: "#topic9",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "This is Topic 10",
		id: "#topic10",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "This is Topic 11",
		id: "#topic11",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "This is Topic 12",
		id: "#topic12",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "This is Topic 13",
		id: "#topic13",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "This is Topic 14",
		id: "#topic14",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "This is Topic 15",
		id: "#topic15",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "This is Topic 16",
		id: "#topic16",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "This is Topic 17",
		id: "#topic17",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
	{
		title: "This is Topic 18",
		id: "#topic18",
		javascript,
		php,
		python,
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae et ullam dolores veritatis deleniti tenetur inventore sunt temporibus cum debitis similique totam vitae provident, libero nesciunt nostrum numquam, amet eligendi tempora nulla. Numquam, rerum mollitia vitae et porro eius deserunt ut tempore facilis, fugiat minima. Consectetur illo tempore minima necessitatibus.",
	},
];
