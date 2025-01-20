import puppeteer from "puppeteer";
import { customCategories } from "./categoryHelpers.js";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const apiKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, apiKey)

let wooliesUrl = [
   // "https://www.woolworths.com.au/shop/browse/poultry-meat-seafood/meat",
   // "https://www.woolworths.com.au/shop/browse/poultry-meat-seafood/poultry",
   // "https://www.woolworths.com.au/shop/browse/poultry-meat-seafood/bbq-meat-seafood",
   // "https://www.woolworths.com.au/shop/browse/poultry-meat-seafood/seafood",
   // "https://www.woolworths.com.au/shop/browse/bakery/in-store-bakery",
   // "https://www.woolworths.com.au/shop/browse/bakery/packaged-bread-bakery",
   // "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/cheese",
   // "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/milk",
   // "https://www.woolworths.com.au/shop/browse/pantry/long-life-milk",
   // "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/yoghurt",
   // "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/cream-custard-desserts",
   // "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/eggs-butter-margarine/butter-margarine",
   // "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/eggs-butter-margarine/eggs",
   // "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/dips-pate",
   // "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/ready-to-eat-meals",
   // "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/fresh-pasta-sauces",
   // "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/vegetarian-vegan",
   // "https://www.woolworths.com.au/shop/browse/pantry/breakfast-spreads",
   // "https://www.woolworths.com.au/shop/browse/drinks/coffee",
   // "https://www.woolworths.com.au/shop/browse/drinks/tea",
   // "https://www.woolworths.com.au/shop/browse/pantry/baking",
   // "https://www.woolworths.com.au/shop/browse/pantry/herbs-spices",
   // "https://www.woolworths.com.au/shop/browse/snacks-confectionery",
   // "https://www.woolworths.com.au/shop/browse/pantry/pasta-rice-grains",
   // "https://www.woolworths.com.au/shop/browse/freezer/frozen-vegetables",
   // "https://www.woolworths.com.au/shop/browse/freezer/frozen-fruit",
   // "https://www.woolworths.com.au/shop/browse/freezer/ice-cream",
   // "https://www.woolworths.com.au/shop/browse/freezer/frozen-desserts",
   // "https://www.woolworths.com.au/shop/browse/baby/nappies",
   // "https://www.woolworths.com.au/shop/browse/baby/baby-formula-toddler-milk",
   // "https://www.woolworths.com.au/shop/browse/baby/baby-food",
   // "https://www.woolworths.com.au/shop/browse/baby/wipes-changing",
   // "https://www.woolworths.com.au/shop/browse/baby/bath-skincare",
   // "https://www.woolworths.com.au/shop/browse/baby/bottles-baby-feeding",
   // "https://www.woolworths.com.au/shop/browse/drinks/chilled-drinks",
   // "https://www.woolworths.com.au/shop/browse/drinks/sports-energy-drinks",
   // "https://www.woolworths.com.au/shop/browse/drinks/soft-drinks",
   // "https://www.woolworths.com.au/shop/browse/drinks/water",
   // "https://www.woolworths.com.au/shop/browse/drinks/cordials-juices-iced-teas",
   // "https://www.woolworths.com.au/shop/browse/drinks/flavoured-milk",
   // "https://www.woolworths.com.au/shop/browse/drinks/long-life-milk",
   // "https://www.woolworths.com.au/shop/browse/drinks/low-non-alcoholic-drinks",
   // "https://www.woolworths.com.au/shop/browse/drinks/coffee",
]

// TODO: 1> CHANGE CODE FOR QUERYING SPECIFIC STORE ITEMS         [v]
//       2> CHANGE CODE TO UPDATE PRICE INSTEAD OF CATEGORIES     [] untested
//       3> INSERT INTO DATABASE IF ITEM NOT REGISTERED YET       [] untested
//       4> IMPLEMENT HASH TABLE TO KEEP TRACK OF ITEMS           [v]
//       5> IMPLEMENT HASH TABLE FOR NEW ITEMS (CATEGORY PURPOSES)[v]
//       6> SCRAPE PRICE, DESC, NAME, ETC                         [v]

function getItemQuantity(listedPrice, pricePerWeight) {
   	const slashSplit = pricePerWeight.split("/");

   	const price = parseFloat(slashSplit[0].replace('$', ''));
   	const weightInGrams = slashSplit[1].replace('K', '000').replace('L', '000ML').replace('ML', '').replace('G', '');
   	return Math.round((listedPrice/price) * weightInGrams);
}

async function scrapeWoolies() {
	const checkedSet = new Set;
	const newItemSet = new Set;

	// Launch the browser and open a new blank page
	const browser = await puppeteer.launch({
		headless: true,
	});
	const page = await browser.newPage();

	// Navigate the page to a URL.
	await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36')
	await page.setExtraHTTPHeaders({
		'Accept-Language': 'en'
	})
	await page.setJavaScriptEnabled(true);

	await page.goto('https://www.woolworths.com.au/');
	await page.locator('.browseMenuDesktop').wait();
	await page.locator('.browseMenuDesktop').click();

	await page.locator('.category-list .ng-star-inserted').wait();

	let toBrowse = await page.evaluate(() => {
		const anchors = document.querySelectorAll('div.category-list.ng-star-inserted > a');
		return [].map.call(anchors, a => a.href);
	});

	toBrowse = toBrowse.slice(toBrowse.indexOf('https://www.woolworths.com.au/shop/browse/fruit-veg'), toBrowse.indexOf('https://www.woolworths.com.au/shop/browse/electronics') + 1); //remove seasonal categories
	wooliesUrl = wooliesUrl.concat(toBrowse);

	let nextPage;

	async function getCategoryItem() {
		// Credit to Isaac
		// Modified code from https://github.com/devsoc-unsw/trainee-bard-24t2/blob/main/scraping/src/index.js

		await page.waitForSelector('wc-product-tile', {timeout: 180000});

		const currUrl = page.url().split("/");

		const row = await supabase.from('woolies')
						.select('price, description')
						.eq('id', 10000000000)
						.maybeSingle();
		
		console.log(row)

		// do {
		// 	const currentItems = await page.evaluate(() => {
		// 	const productElements = document.querySelectorAll('#search-content > div > shared-grid > div > div > shared-product-tile > shared-web-component-wrapper > wc-product-tile');

		// 	return Array.from(productElements).map((product) => {
		// 		const anchor = product.shadowRoot.querySelector('.product-tile-image a');
		// 		const image = product.shadowRoot.querySelector('.product-tile-image a img');  
		// 		const price = product.shadowRoot.querySelector('div .primary');
		// 		const descContainer = product.shadowRoot.querySelector('div.title > a')

		// 		const slashSplit = anchor.href.split("/");
		// 		const desc = descContainer.innerText;
				
		// 		return {
		// 			id: Number(slashSplit[slashSplit.length-2]),
		// 			img: image.src,
		// 			price: price? price.innerText: null,
		// 			name: desc,
		// 			weigthed: /Per Kg/.test(desc)
		// 		};
		// 	});
		// 	});

		// 	for (const i of currentItems) {
		// 	checkedSet.add(i.id);

		// 	const row = await supabase.from('woolies')
		// 					.select('price, description')
		// 					.eq('id', i.id)
		// 					.maybeSingle();

		// 	if (!row.data) {
		// 	   newItemSet.add(i.id)

		// 	   let tempCat = currUrl[currUrl.length - 1]
		// 	   tempCat = customCategories[tempCat]? customCategories[tempCat]: tempCat

		// 	   const newProduct = {
		// 	      id: i.id,
		// 	      name: i.name,
		// 	      price: i.price,
		// 	      is_weighted: i.weighted,
		// 	      unit: i.unit,
		// 	      quantity: i.quantity,
		// 	      image: i.img,
		// 	      category: [tempCat]
		// 	   }

		// 	   // 3> INSERT INTO DATABASE IF ITEM NOT REGISTERED YET
		// 	   const {error} = await supabase
		// 	      .from('woolies')
		// 	      .insert(newProduct)

		// 	   if (error) throw Error;
		// 	}

		// 	// Update category if this item is newly added
		// 	if (newItemSet.has(i.id)) {
		// 	   let oldCat = row.data.category;

		// 	   const set = new Set(oldCat)

		// 	   let tempCat = currUrl[currUrl.length - 1]
		// 	   tempCat = customCategories[tempCat]? customCategories[tempCat]: tempCat
		// 	   if (typeof(tempCat) !== 'string') {
		// 	      for (const i of tempCat) set.add(i);
		// 	   } else {
		// 	      set.add(tempCat);
		// 	   }

		// 	   oldCat = Array.from(set);
		// 	   const { error } = await supabase
		// 	      .from('woolies')
		// 	      .update({ category: oldCat })
		// 	      .eq('id', i.id)
		// 	      .eq("store", 'coles')

		// 	   if (error) throw Error;
		// 	}

		// 	// Update price if necessary
		// 	}

		// 	nextPage = await page.evaluate(() => {
		// 	const nextButton = document.querySelector('.paging-next');
		// 	if(nextButton) {
		// 		return nextButton.href;
		// 	}
		// 	return null;
		// 	});

		// 	if (nextPage) {
		// 	await page.goto(nextPage, {waitUntil: "networkidle0"});
		// 	await page.waitForSelector('wc-product-tile', {timeout: 60000});
		// 	}
		// } while (nextPage)
	}

	for (const i in wooliesUrl) {
		await page.goto(wooliesUrl[i]);
		await getCategoryItem();
	}

	await browser.close();
}


await scrapeWoolies();
