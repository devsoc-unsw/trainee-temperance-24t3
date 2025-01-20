import puppeteer from "puppeteer";
import { customCategories } from "./categoryHelpers.js";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const apiKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, apiKey)

let colesUrl = [
    "https://www.coles.com.au/browse/pantry/international-foods",
    "https://www.coles.com.au/browse/meat-seafood/game",
    "https://www.coles.com.au/browse/meat-seafood/beef-veal",
    "https://www.coles.com.au/browse/meat-seafood/lamb",
    "https://www.coles.com.au/browse/meat-seafood/mince",
    "https://www.coles.com.au/browse/meat-seafood/organic-meat",
    "https://www.coles.com.au/browse/meat-seafood/pork",
    "https://www.coles.com.au/browse/meat-seafood/hams-bacon",
    "https://www.coles.com.au/browse/meat-seafood/coles-made-easy-range",
    "https://www.coles.com.au/browse/meat-seafood/bbq-sausages-burgers",
    "https://www.coles.com.au/browse/meat-seafood/poultry",
    "https://www.coles.com.au/browse/meat-seafood/seafood",
    "https://www.coles.com.au/browse/bakery/instore-bakery-breads-and-rolls",
    "https://www.coles.com.au/browse/bakery/instore-bakery-sweet-treats",
    "https://www.coles.com.au/browse/bakery/packaged-bread-rolls-and-buns",
    "https://www.coles.com.au/browse/bakery/packaged-breads",
    "https://www.coles.com.au/browse/bakery/packaged-breakfast-snacks",
    "https://www.coles.com.au/browse/bakery/packaged-cakes-sweet-treats",
    "https://www.coles.com.au/browse/bakery/packaged-flat-bread-wraps-and-pizza-bases",
    "https://www.coles.com.au/browse/bakery/gluten-free-range",
    "https://www.coles.com.au/browse/bakery/chilled-cakes-desserts",
    "https://www.coles.com.au/browse/bakery/christmas-bakery",
    "https://www.coles.com.au/browse/bakery/vegan-range",
    "https://www.coles.com.au/browse/dairy-eggs-fridge/cream-custard",
    "https://www.coles.com.au/browse/dairy-eggs-fridge/cheese",
    "https://www.coles.com.au/browse/dairy-eggs-fridge/long-life-milk",
    "https://www.coles.com.au/browse/dairy-eggs-fridge/yoghurt",
    "https://www.coles.com.au/browse/dairy-eggs-fridge/dairy-desserts",
    "https://www.coles.com.au/browse/dairy-eggs-fridge/butter-margarine",
    "https://www.coles.com.au/browse/dairy-eggs-fridge/eggs",
    "https://www.coles.com.au/browse/dairy-eggs-fridge/dips-pate",
    "https://www.coles.com.au/browse/dairy-eggs-fridge/ready-to-eat-meals",
    "https://www.coles.com.au/browse/dairy-eggs-fridge/fresh-pasta-sauces",
    "https://www.coles.com.au/browse/dairy-eggs-fridge/vegetarian-vegan",
    "https://www.coles.com.au/browse/dairy-eggs-fridge/milk",
    "https://www.coles.com.au/browse/pantry/baking",
    "https://www.coles.com.au/browse/pantry/breakfast",
    "https://www.coles.com.au/browse/pantry/jams-honey-spreads",
    "https://www.coles.com.au/browse/pantry/tea",
    "https://www.coles.com.au/browse/pantry/herbs-spices",
    "https://www.coles.com.au/browse/pantry/confectionery",
    "https://www.coles.com.au/browse/pantry/chips-crackers-snacks",
    "https://www.coles.com.au/browse/pantry/pasta-rice-legumes-grains",
    "https://www.coles.com.au/browse/pantry/coffee",
    "https://www.coles.com.au/browse/frozen/frozen-vegetables",
    "https://www.coles.com.au/browse/frozen/frozen-fruit",
    "https://www.coles.com.au/browse/frozen/frozen-desserts",
    "https://www.coles.com.au/browse/frozen/ice-cream",
    "https://www.coles.com.au/browse/drinks/sports-drinks",
    "https://www.coles.com.au/browse/drinks/energy-drinks",
    "https://www.coles.com.au/browse/drinks/soft-drinks",
    "https://www.coles.com.au/browse/drinks/cold-drinks",
    "https://www.coles.com.au/browse/drinks/coffee-drinks",
    "https://www.coles.com.au/browse/drinks/non-alcoholic",
    "https://www.coles.com.au/browse/drinks/water",
    "https://www.coles.com.au/browse/drinks/iced-tea",
    "https://www.coles.com.au/browse/drinks/juice",
    "https://www.coles.com.au/browse/drinks/tea-drinks",
    "https://www.coles.com.au/browse/drinks/cordials",
    "https://www.coles.com.au/browse/drinks/flavoured-milk",
    "https://www.coles.com.au/browse/baby/nappies-nappy-pants",
    "https://www.coles.com.au/browse/baby/baby-formula",
    "https://www.coles.com.au/browse/baby/baby-feeding",
    "https://www.coles.com.au/browse/baby/baby-meal-time",
    "https://www.coles.com.au/browse/baby/baby-toddler-food",
    "https://www.coles.com.au/browse/baby/baby-wipes",
    "https://www.coles.com.au/browse/baby/bath-skincare",
    "https://www.coles.com.au/browse/baby/bottles-feeding",
]


// TODO: 1> CHANGE CODE FOR QUERYING SPECIFIC STORE ITEMS         []
//       2> CHANGE CODE TO UPDATE PRICE INSTEAD OF CATEGORIES     []
//       3> INSERT INTO DATABASE IF ITEM NOT REGISTERED YET       []
//       4> FIGURE OUT PROXY FOR COLES                            []
//       5> IMPLEMENT HASH TABLE TO KEEP TRACK OF ITEMS           []
//       6> IMPLEMENT HASH TABLE FOR NEW ITEMS (CATEGORY PURPOSES)[]
//       7> SCRAPE PRICE, DESC, NAME, ETC                         []


async function scrapeColes() {
	// Launch the browser and open a new blank page
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: false
	});
	const page = await browser.newPage();

	// Navigate the page to a URL.
	await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36')
	await page.setExtraHTTPHeaders({
		'Accept-Language': 'en'
	})
	await page.setJavaScriptEnabled(true);

	await page.goto('https://www.coles.com.au/');
	await page.locator('a.shop-categories').setTimeout(120000).click();
	await page.locator('.coles-targeting-NavigationListNavigationWrapper').wait();
	let toBrowse = await page.$$eval('#categories-navlist > nav > ul > li > a', anc => {
		return anc.map(a => a.href)
	})
	toBrowse = toBrowse.slice(4, toBrowse.length - 1);
	console.log(toBrowse)

	let nextPage;

	for (const link of colesUrl) {
		await page.goto(link);
		// await page.locator('#coles-targeting-browse-content-container > nav > ul').setTimeout(3000).wait();

		const paginationExists = await page.evaluate(() => {
			const exists = document.querySelector('#coles-targeting-browse-content-container > nav > ul');
			return exists? true: false
		});

		let paginationLen

		if (paginationExists) {
			paginationLen = await page.$$eval('#coles-targeting-browse-content-container > nav > ul > li', li => li.length);
		}
		const currUrl = page.url().split("/");
		
		do{
			await page.locator('#coles-targeting-product-tiles > section').setTimeout(600000).wait();

			const currentItems = await page.evaluate(() => {
				const productElements = document.querySelectorAll('#coles-targeting-product-tiles > section');
				console.log(productElements !== null)
				return Array.from(productElements).map((product) => {
				const anchor = product.querySelector('div.sc-5f8418d3-11.cwppzA.coles-targeting-ProductTileHeaderWrapper header div.product__image_area a');
				const image = product.querySelector('span img');
				const dashSplit = anchor.href.split("-");

				return {id: Number(dashSplit[dashSplit.length-1]), img: image.src};
				});
			});

			for (const i of currentItems) {
				// 1> CHANGE CODE FOR QUERYING SPECIFIC STORE ITEMS
				const row = await supabase.from('products').select('category').eq('id', i.id).eq('store', 'coles');
				if (row.data.length < 1) {
				console.log(i.id);
				continue;
				}

				let oldCat = row.data[0].category;

				const set = new Set(oldCat);

				let tempCat = currUrl[currUrl.length - 1];
				tempCat = customCategories[tempCat]? customCategories[tempCat]: tempCat;
				if (typeof(tempCat) !== 'string') {
				for (const i of tempCat) set.add(i);
				} else {
				set.add(tempCat);
				}

				oldCat = Array.from(set);
				const { error } = await supabase
				.from('products')
				.update({ category: oldCat })
				.eq('id', i.id)
				.eq("store", 'coles')

				if (error) throw Error;
			}

			nextPage = await page.evaluate((paginationLen, paginationExists) => {
				if (!paginationExists) return null;
				const nextPageLink = document.querySelector(`#coles-targeting-browse-content-container > nav > ul > li:nth-child(${paginationLen}) > a`);
				return nextPageLink? nextPageLink.href: null;
			}, paginationLen, paginationExists);
			
			if (nextPage) await page.goto(nextPage);
		} while (nextPage)
	}

	await browser.close();
}
 
await scrapeColes();