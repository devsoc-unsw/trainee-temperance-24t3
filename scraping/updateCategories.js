import puppeteer from "puppeteer";
import data from "./items.json" with {type: 'json'};
import { customCategories } from "./categoryHelpers.js";
import {writeFileSync} from "fs"
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const apiKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, apiKey)

let wooliesUrl = [
   "https://www.woolworths.com.au/shop/browse/poultry-meat-seafood/meat",
   "https://www.woolworths.com.au/shop/browse/poultry-meat-seafood/poultry",
   "https://www.woolworths.com.au/shop/browse/poultry-meat-seafood/bbq-meat-seafood",
   "https://www.woolworths.com.au/shop/browse/poultry-meat-seafood/seafood",
   "https://www.woolworths.com.au/shop/browse/bakery/in-store-bakery",
   "https://www.woolworths.com.au/shop/browse/bakery/packaged-bread-bakery",
   "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/cheese",
   "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/milk",
   "https://www.woolworths.com.au/shop/browse/pantry/long-life-milk",
   "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/yoghurt",
   "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/cream-custard-desserts",
   "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/eggs-butter-margarine/butter-margarine",
   "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/eggs-butter-margarine/eggs",
   "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/dips-pate",
   "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/ready-to-eat-meals",
   "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/fresh-pasta-sauces",
   "https://www.woolworths.com.au/shop/browse/dairy-eggs-fridge/vegetarian-vegan",
   "https://www.woolworths.com.au/shop/browse/lunch-box",
   "https://www.woolworths.com.au/shop/browse/pantry/breakfast-spreads",
   "https://www.woolworths.com.au/shop/browse/drinks/coffee",
   "https://www.woolworths.com.au/shop/browse/drinks/tea",
   "https://www.woolworths.com.au/shop/browse/pantry/baking",
   "https://www.woolworths.com.au/shop/browse/pantry/herbs-spices",
   "https://www.woolworths.com.au/shop/browse/snacks-confectionery",
   "https://www.woolworths.com.au/shop/browse/pantry/pasta-rice-grains",
   "https://www.woolworths.com.au/shop/browse/freezer/frozen-vegetables",
   "https://www.woolworths.com.au/shop/browse/freezer/frozen-fruit",
   "https://www.woolworths.com.au/shop/browse/freezer/ice-cream",
   "https://www.woolworths.com.au/shop/browse/freezer/frozen-desserts",
   "https://www.woolworths.com.au/shop/browse/baby/nappies",
   "https://www.woolworths.com.au/shop/browse/baby/baby-formula-toddler-milk",
   "https://www.woolworths.com.au/shop/browse/baby/baby-food",
   "https://www.woolworths.com.au/shop/browse/baby/wipes-changing",
   "https://www.woolworths.com.au/shop/browse/baby/bath-skincare",
   "https://www.woolworths.com.au/shop/browse/baby/bottles-baby-feeding",
   "https://www.woolworths.com.au/shop/browse/drinks/chilled-drinks",
   "https://www.woolworths.com.au/shop/browse/drinks/sports-energy-drinks",
   "https://www.woolworths.com.au/shop/browse/drinks/soft-drinks",
   "https://www.woolworths.com.au/shop/browse/drinks/water",
   "https://www.woolworths.com.au/shop/browse/drinks/cordials-juices-iced-teas",
   "https://www.woolworths.com.au/shop/browse/drinks/flavoured-milk",
   "https://www.woolworths.com.au/shop/browse/drinks/long-life-milk",
   "https://www.woolworths.com.au/shop/browse/drinks/low-non-alcoholic-drinks",
   "https://www.woolworths.com.au/shop/browse/drinks/coffee",
]

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


async function scrapeWoolies() {
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

   await page.goto('https://www.woolworths.com.au/');
   await page.locator('.browseMenuDesktop').wait();
   await page.locator('.browseMenuDesktop').click();

   await page.locator('.category-list .ng-star-inserted').wait();

   const toBrowse = await page.evaluate(() => {
      const anchors = document.querySelectorAll('div.category-list.ng-star-inserted > a');
      return [].map.call(anchors, a => a.href);
   });

   const categories = toBrowse.slice(1, 20);
   categories.splice(5, 1);   // remove lunchbox

   // for (const i in categories) {
   //    wooliesUrl.push(categories[i]);
   // }
   wooliesUrl = wooliesUrl.concat(categories);

   let nextPage;

   // Credit to Isaac
   // Modified code from https://github.com/devsoc-unsw/trainee-bard-24t2/blob/main/scraping/src/index.js
   async function getCategoryItem() {
      await page.waitForSelector('wc-product-tile', {timeout: 180000});

      const currUrl = page.url().split("/");

      do {
         const currentItems = await page.evaluate(() => {
            const productElements = document.querySelectorAll('#search-content > div > shared-grid > div > div > shared-product-tile > shared-web-component-wrapper > wc-product-tile');

            return Array.from(productElements).map((product) => {
               const anchor = product.shadowRoot.querySelector('.product-tile-image a');
               const image = product.shadowRoot.querySelector('.product-tile-image a img');
               const slashSplit = anchor.href.split("/");
               
               return {id: Number(slashSplit[slashSplit.length-2]), img: image.src};
            });
         });

         for (const i of currentItems) {
            const target = data.find(obj => obj.id === i.id && obj.store === 'woolies');
            if (!target) {
               console.log(i.id);
               continue;
            }
            const set = new Set(target.category)

            let tempCat = currUrl[currUrl.length - 1]
            tempCat = customCategories[tempCat]? customCategories[tempCat]: tempCat
            if (typeof(tempCat) !== 'string') {
               for (const i of tempCat) set.add(i);
            } else {
               set.add(tempCat);
            }

            target.category = Array.from(set);
            target.image = i.img;
         }

         nextPage = await page.evaluate(() => {
            const nextButton = document.querySelector('.paging-next');
            if(nextButton) {
               return nextButton.href;
            }
            return null;
         });

         if (nextPage) {
            await page.goto(nextPage);
            await page.waitForSelector('wc-product-tile', {timeout: 60000});
         }
      } while (nextPage)
   }

   for (const i in wooliesUrl) {
      await page.goto(wooliesUrl[i]);
      await getCategoryItem();
   }
   
   await browser.close();
}

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
            const row = await supabase.from('products').select('category').eq('id', i.id).eq('store', 'coles');
            if (row.data.length < 1) {
               console.log(i.id);
               continue;
            }

            let oldCat = row.data[0].category;

            // const target = data.find(obj => obj.id === i.id && obj.store === 'coles');
            // if (!target) {
            //    console.log(i.id);
            //    continue;
            // }

            const set = new Set(oldCat)

            let tempCat = currUrl[currUrl.length - 1]
            tempCat = customCategories[tempCat]? customCategories[tempCat]: tempCat
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

            // target.category = Array.from(set);
            // target.image = i.img;
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
// await scrapeWoolies();


// const row = await supabase.from('products').select('category').eq('id', 25).eq('store', 'woolies');
// const oldCat = row.data[0].category;
// console.log(oldCat);

// const { error } = await supabase
//   .from('products')
//   .update({ category: oldCat })
//   .eq('id', 25)
//   .eq("store", 'woolies')

// console.log(error)