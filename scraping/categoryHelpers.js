// TODO: - Deal with Coles' categories too
//       - kms
export const customCategories = {
    'beer-wine-spirits': 'alcohol',
    'liquor': 'alcohol',
    'bbq-sausages-burgers': 'bbq',
    'bbq-meat-seafood': 'bbq',
    'breakfast-spreads': 'breakfast and spreads',
    'breakfast': 'breakfast and spreads',
    'jams-honey-spreads': 'breakfast and spreads',
    'butter-margarine': 'butter and margarine',
    'baby-formula-toddler-milk': 'baby food',
    'baby-formula': 'baby food',
    'baby-feeding': 'baby food',
    'baby-meal-time': 'baby food',
    'baby-toddler-food': 'baby food',
    'baby-food': 'baby food',
    'bath-skincare': 'bath and skincare',
    'bottles-baby-feeding': 'bottles and feeding',
    'bottles-feeding': 'bottles and feeding',
    'coffee-drinks': 'coffee',
    'chilled-drinks': 'cold drinks',
    'cold-drinks': 'cold drinks',
    'confectionery': 'snacks and confectionary',
    'chips-crackers-snacks': 'snacks and confectionary',
    'cream-custard-desserts': 'cream, custard and desserts',
    'cream-custard': 'cream, custard and desserts',
    'dairy-desserts': 'cream, custard and desserts',
    'dairy-eggs-fridge': 'dairy, eggs and fridge',
    'deli-chilled-meals': 'deli',
    'dips-pate': 'dips and pate',
    'fresh-pasta-sauces': 'freash pasta and sauces',
    'fruit-veg': 'fruit and vegetables',
    'fruit-vegetables': 'fruit and vegetables',
    'frozen-vegetables': 'frozen fruit and veg',
    'frozen-fruit': 'frozen fruit and veg',
    'ice-cream': 'frozen desserts',
    'frozen-desserts': 'frozen desserts',
    'beauty-personal-care': 'health and beauty',
    'health-beauty': 'health and beauty',
    'health-wellness': 'health and beauty',
    'herbs-spices': 'herbs and spices',
    'electronics': 'household',
    'cleaning-maintenance': 'household',
    'home-lifestyle': 'household',
    'in-store-bakery': 'in store bakery',
    'in-store-bakery-breads-and-rolls': 'in store bakery',
    'in-store-bakery-sweet-treats': 'in store bakery',
    'international-foods': 'international food',
    'low-non-alcoholic-drinks': 'low-non-alcoholic drinks',
    'non-alcoholic': 'low-non-alcoholic drinks',
    'long-life-milk': 'milk',
    'flavoured-milk': 'milk',
    'game': 'meat',
    'pork': 'meat',
    'beef-veal': 'meat',
    'lamb': 'meat',
    'mince': 'meat',
    'hams-bacon': 'meat',
    'organic-meat': 'meat',
    'coles-made-easy-range': 'meat',
    'meat-seafood': 'meat, poultry and seafood',
    'nappies-nappy-pants': 'nappies',
    'pasta-rice-grains': 'pasta, rice, grains and legumes',
    'pasta-rice-legumes-grains': 'pasta, rice, grains and legumes',
    'packaged-bread-rolls-and-buns': 'prepared bread',
    'packaged-breads': 'prepared bread',
    'packaged-breakfast-snacks': 'prepared bread',
    'packaged-cakes-sweet-treats': 'prepared bread',
    'packaged-flat-bread-wraps-and-pizza-bases': 'prepared bread',
    'gluten-free-range': 'prepared bread',
    'chilled-cakes-desserts': 'prepared bread',
    'christmas-bakery': 'prepared bread',
    'vegan-range': 'prepared bread',
    'packaged-bread-bakery': 'prepared bread',
    'ready-to-eat-meals': 'ready to eat meals',
    'sports-energy-drinks': 'sports and energy drinks',
    'soft-drinks': 'soft drinks',
    'sports-drinks': 'sports-energy-drinks',
    'cordials-juices-iced-teas': 'tea and juices',
    'iced-tea': 'tea and juices',
    'juice': 'tea and juices',
    'tea-drinks': 'tea and juices',
    'cordials': 'tea and juices',
    'vegetarian-vegan': 'vegetarian and vegan',
    'wipes-changing': 'wipes',
    'baby-wipes': 'wipes',
    'snacks-confectionery': ['snacks and confectionary', 'pantry'],
    'lunch-box': ['snacks and confectionary', 'pantry'],
    'tea': ['tea', 'tea and juices'],
}

function testFunction(tempCat) {
    const set = new Set([])

    const real = customCategories[tempCat]? customCategories[tempCat]: tempCat
    if (typeof(real) !== 'string') {
        for (const i of real) set.add(i);
    } else {
        set.add(real);
    }

    const arr = Array.from(set);
    console.log(arr);
}

// testFunction('tea');
// testFunction('beer-wine-spirits');
// testFunction('water');