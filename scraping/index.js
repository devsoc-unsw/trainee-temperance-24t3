import puppeteer from "puppeteer";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const apiKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, apiKey);

// Launch the browser and open a new blank page
const browser = await puppeteer.launch();
const page = await browser.newPage();


//
// TODO: -refactor using python bcs this doesn't work !!!!!!!
//

// Navigate the page to a URL.
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36')
await page.setExtraHTTPHeaders({
   'Accept-Language': 'en'
})
await page.setJavaScriptEnabled(true)
await page.goto('https://hotprices.org/data/latest-canonical.coles.compressed.json.gz');

let  fullText = await page.$eval('pre', el => el.textContent);
const colesData = JSON.parse(fullText);
console.log("new items from coles:");
colesData.forEach(async item => {
   const row = await supabase
               .from('products')
               .select('price')
               .eq('id', item.id)
               .eq('store', 'coles')
   const target = row.data;

   if (!target) {
      console.log(item.id);
      
      const { error } = await supabase
         .from('products')
         .insert({
         id: item.id,
         name: item.name,
         description: item.description,
         price: item.price,
         is_weighted: item.isWeighted,
         unit: item.unit,
         quantity: item.quantity,
         store: item.store,
         category: [],
         image: `https://www.coles.com.au/_next/image?url=https://productimages.coles.com.au/productimages/${JSON.stringify(item.id)[0]}/${item.id}.jpg&w=640&q=90`
      })

      // console.log(`inserting: ${item.id}` + error)

      if (error) {
         console.log(`ERROR INSERTING ${item.id}, ${item.name}`)
         console.log(error)
         throw Error;
      }

   } else {
      // target.price = item.price;
      if (target[0].price !== item.price) console.log(`updating ${item.id} from ${target[0].price} to ${item.price}`)
      const { error } = await supabase
        .from('products')
        .update({ price: item.price })
        .eq('id', item.id)
        .eq("store", 'coles')

      // console.log(`updating: ${item.id}` + error)

      if (error) {
         console.log(`ERROR UPDATING ${item.id}, ${item.name}`)
         console.log(error);
         throw Error;
      }
   }
});

await page.goto('https://hotprices.org/data/latest-canonical.woolies.compressed.json.gz');

fullText = await page.$eval('pre', el => el.textContent);
console.log("new items from woolies:");
const wooliesData = JSON.parse(fullText);
wooliesData.forEach(async item => {
   const row = await supabase
               .from('products')
               .select()
               .eq('id', item.id)
               .eq('store', 'woolies')
   const target = row.data;

   if (!target) {
      console.log(item.id);

      const { error } = await supabase
         .from('products')
         .insert({
         id: item.id,
         name: item.name,
         description: item.description.includes("<br>")? (item.description.replace(/<br>/, " ")).trim(): item.description,
         price: item.price,
         isWeighted: item.isWeighted,
         unit: item.unit,
         quantity: item.quantity,
         store: item.store,
         category: [],
         image: `https://assets.woolworths.com.au/images/1005/${item.id}.jpg?impolicy=wowsmkqiema&w=260&h=260`
      })

      if (error) {
         console.log(`ERROR INSERTING ${item.id}, ${item.name}`)
         throw Error;
      }

   } else {
      const { error } = await supabase
        .from('products')
        .update({ price: item.price })
        .eq('id', item.id)
        .eq("store", 'woolies')

      if (error) {
         console.log(`ERROR UPDATING ${item.id}, ${item.name}`)
         console.log(error);
         throw Error;
      }
   }

   if (target && target.image === '') {
      target.image = `https://assets.woolworths.com.au/images/1005/${target.id}.jpg?impolicy=wowsmkqiema&w=260&h=260`
      const { error } = await supabase
        .from('products')
        .update({ image: `https://assets.woolworths.com.au/images/1005/${target.id}.jpg?impolicy=wowsmkqiema&w=260&h=260`})
        .eq('id', item.id)
        .eq("store", 'woolies')

      if (error) {
         console.log(`ERROR UPDATING ${item.id}, ${item.name}`)
         console.log(error);
         throw Error;
      }
   }
});

data.sort((a, b) => {
   if (a.store === b.store) {
     return 0;
   } else if (a.store === 'coles') {
     return -1;
   } else {
     return 1
   }
 });;


await browser.close();