//#region node_modules/.nitro/vite/services/ssr/assets/seo-jqMf855H.js
var BRAND = {
	name: "RECURSION LABS",
	shortName: "Recursion Labs",
	tagline: "Engineering Ideas. Building Tomorrow.",
	description: "RECURSION LABS is a premium boutique technology consultancy delivering software engineering, artificial intelligence, machine learning, product engineering, cloud solutions, and digital consulting for enterprise organisations.",
	email: "recursionlabs1@gmail.com",
	phone: "+91 8252123642",
	locations: [
		"Patna",
		"Delhi",
		"Bhubaneswar",
		"Chennai",
		"Jaipur"
	],
	founded: "2026",
	url: "https://recursionlabs.co"
};
var PRACTICES = [
	"Software Engineering",
	"Artificial Intelligence",
	"Machine Learning",
	"Product Engineering",
	"Cloud Solutions",
	"Business Automation",
	"UI/UX",
	"Digital Consulting"
];
var SOCIAL_LINKS = [
	{
		label: "LinkedIn",
		href: "#"
	},
	{
		label: "X / Twitter",
		href: "#"
	},
	{
		label: "GitHub",
		href: "#"
	},
	{
		label: "Dribbble",
		href: "#"
	}
];
var SITE_URL = BRAND.url;
function absoluteUrl(path) {
	return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
function pageTitle(page) {
	return page ? `${page} — ${BRAND.name}` : `${BRAND.name} — ${BRAND.tagline}`;
}
function defaultMeta(page) {
	const title = page?.title ? pageTitle(page.title) : pageTitle();
	const description = page?.description ?? BRAND.description;
	const canonical = absoluteUrl(page?.path ?? "/");
	return {
		meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				name: "author",
				content: BRAND.name
			},
			{
				name: "theme-color",
				content: "#0a0e1a"
			},
			...page?.noindex ? [{
				name: "robots",
				content: "noindex, nofollow"
			}] : [],
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: canonical
			},
			{
				property: "og:site_name",
				content: BRAND.name
			},
			{
				property: "og:image",
				content: absoluteUrl("/og-image.svg")
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				property: "og:image:alt",
				content: `${BRAND.name} — Premium Technology Consultancy`
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: title
			},
			{
				name: "twitter:description",
				content: description
			},
			{
				name: "twitter:image",
				content: absoluteUrl("/og-image.svg")
			}
		],
		links: [{
			rel: "canonical",
			href: canonical
		}]
	};
}
function organizationSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: BRAND.name,
		url: SITE_URL,
		logo: absoluteUrl("/logo-full.png"),
		description: BRAND.description,
		email: BRAND.email,
		telephone: BRAND.phone,
		foundingDate: BRAND.founded,
		sameAs: [],
		address: [
			{
				"@type": "PostalAddress",
				addressLocality: "Patna",
				addressCountry: "IN"
			},
			{
				"@type": "PostalAddress",
				addressLocality: "Delhi",
				addressCountry: "IN"
			},
			{
				"@type": "PostalAddress",
				addressLocality: "Bhubaneswar",
				addressCountry: "IN"
			},
			{
				"@type": "PostalAddress",
				addressLocality: "Chennai",
				addressCountry: "IN"
			},
			{
				"@type": "PostalAddress",
				addressLocality: "Jaipur",
				addressCountry: "IN"
			}
		],
		contactPoint: {
			"@type": "ContactPoint",
			telephone: BRAND.phone,
			contactType: "customer service",
			email: BRAND.email,
			areaServed: "IN"
		}
	};
}
function websiteSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: BRAND.name,
		url: SITE_URL,
		description: BRAND.description,
		publisher: {
			"@type": "Organization",
			name: BRAND.name
		}
	};
}
function breadcrumbSchema(items) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: item.name,
			item: absoluteUrl(item.path)
		}))
	};
}
function personSchema(person) {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: person.name,
		jobTitle: person.role,
		description: person.bio,
		email: person.email,
		url: absoluteUrl(`/team/${person.slug}`),
		worksFor: {
			"@type": "Organization",
			name: BRAND.name
		},
		...person.photo ? { image: person.photo } : {}
	};
}
function contactPageSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "ContactPage",
		name: `Contact — ${BRAND.name}`,
		url: absoluteUrl("/contact"),
		description: `Contact ${BRAND.name} for enterprise technology consulting.`,
		mainEntity: {
			"@type": "Organization",
			name: BRAND.name,
			email: BRAND.email,
			telephone: BRAND.phone
		}
	};
}
//#endregion
export { breadcrumbSchema as a, organizationSchema as c, SOCIAL_LINKS as i, personSchema as l, PRACTICES as n, contactPageSchema as o, SITE_URL as r, defaultMeta as s, BRAND as t, websiteSchema as u };
