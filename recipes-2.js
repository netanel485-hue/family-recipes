/* part 2: sides, breads, breakfast & muffins */
window.RECIPES.push(

{ id:'potato-kugel', cat:'side', src:'A', photos:['6561'], tags:['potato','shabbat'], credit:'Jaimee Geller',
  title:{he:'קוגל תפוחי אדמה', en:'Potato Kugel'},
  ing:{en:['1/2 cup oil','8 medium potatoes, peeled and quartered','2 medium onions, quartered','2.5 tbsp sugar','5 eggs, beaten','1 tbsp kosher salt','1 tsp pepper'], he:['חצי כוס שמן','8 תפוחי אדמה בינוניים מקולפים ומרובעים','2 בצלים בינוניים מרובעים','2.5 כפות סוכר','5 ביצים טרופות','כף מלח גס','כפית פלפל']},
  steps:{en:[],he:[]}, inc:1, tw:[['קוגל תפוחי אדמה פריך','crispy potato kugel'],['לביבות תפוחי אדמה','potato latkes']] },

{ id:'yapchik', cat:'side', src:'A', photos:['6562'], tags:['potato','meat','shabbat'], credit:'Jaimee Geller',
  title:{he:'יאפצ\'יק (קוגל תפוחי אדמה עם בשר)', en:'Yapchits (Yapchik)'},
  ing:{en:['8 large potatoes','1 onion','7 eggs','1 cup water','1/4 cup olive oil','1 tbsp + 1 tsp salt','1.2 pounds meat'], he:['8 תפוחי אדמה גדולים','בצל','7 ביצים','כוס מים','רבע כוס שמן זית','כף + כפית מלח','כ-550 גרם בשר (1.2 פאונד)']},
  steps:{en:['Combine everything in a bowl.','Bake uncovered at 425°F (about 220°C) for 1.5 hours.','Lower the oven to 200° (as written), cover and bake up to 6 more hours.'], he:['לערבב הכול בקערה.','לאפות בלי כיסוי ב-425°F (כ-220°C) שעה וחצי.','להוריד את התנור ל-200° (כך כתוב בכרטיס), לכסות ולאפות עד 6 שעות נוספות.']},
  note:{he:'ה-200° בכרטיס כנראה במעלות צלזיוס; בדקו לפי התנור שלכם.', en:'The 200° on the card is probably Celsius – check against your oven.'} },

{ id:'sweet-chili-eggplant', cat:'side', src:'B', photos:['6579'], tags:['vegetable','eggplant'],
  title:{he:'חצילים בצ\'ילי מתוק', en:'Sweet Chili Eggplant'},
  ing:{en:['2 eggplants','1/2 cup sweet chili sauce','1/2 cup honey','5 garlic cloves, sliced','1 tbsp water','1 tbsp lemon juice','1 tbsp paprika','1 tbsp sugar','1/2 tsp salt','1/2 tsp pepper'], he:['2 חצילים','חצי כוס רוטב צ\'ילי מתוק','חצי כוס דבש','5 שיני שום פרוסות','כף מים','כף מיץ לימון','כף פפריקה','כף סוכר','חצי כפית מלח','חצי כפית פלפל']},
  steps:{en:['Mix everything together and bake at 175° (as written – Celsius) for about 1 hour 15 minutes, or 1.5 hours if needed.'], he:['לערבב הכול ולאפות ב-175° (כפי שכתוב בכרטיס – צלזיוס) כשעה ורבע, ואם צריך עד שעה וחצי.']},
  tw:[['חצילים בטחינה','eggplant with tahini'],['חצילים בתנור בדבש','honey roasted eggplant']] },

{ id:'sweet-potato-kugel', cat:'side', src:'B', photos:['6600'], tags:['sweet-potato','shabbat'],
  title:{he:'קוגל בטטה', en:'Sweet Potato Kugel'},
  ing:{en:['2 sweet potatoes, boiled and mashed','1/2 cup flour','1/2 cup sugar','1/2 cup oil','2 eggs','Dash vanilla','Dash cinnamon','1/2 packet baking powder (1 tsp)'], he:['2 בטטות מבושלות ומעוכות','חצי כוס קמח','חצי כוס סוכר','חצי כוס שמן','2 ביצים','קורטוב וניל','קורטוב קינמון','חצי שקית אבקת אפייה (כפית)']},
  steps:{en:['Mix everything and bake at 350°F (175°C) for about 1.5 hours.'], he:['לערבב הכול ולאפות ב-175°C (350°F) כשעה וחצי.']},
  note:{he:'כתוב בכרטיס: עדיף להכפיל את המתכון ולאפות בתבנית גדולה.', en:'Card tip: better to double the recipe in a bigger pan.'} },

{ id:'green-beans-tomato', cat:'side', src:'B', photos:['6601'], tags:['vegetable','vegan'],
  title:{he:'שעועית ירוקה ברוטב עגבניות', en:'Green Beans in Tomato Sauce'},
  ing:{en:['1 tbsp olive oil','1 onion, chopped','3–4 cloves garlic, chopped','3 tomatoes','1 tbsp sugar','Tomato paste + water','Salt and pepper','Green beans'], he:['כף שמן זית','בצל קצוץ','3–4 שיני שום קצוצות','3 עגבניות','כף סוכר','רסק עגבניות + מים','מלח ופלפל','שעועית ירוקה']},
  steps:{en:['Fry the onion and garlic in the oil.','Add the tomatoes, sugar, tomato paste with water, salt and pepper, and cook 1/2 hour to 1 hour.','Add the green beans and cook more, until cooked.'], he:['לטגן בשמן את הבצל והשום.','להוסיף עגבניות, סוכר, רסק עם מים, מלח ופלפל ולבשל חצי שעה עד שעה.','להוסיף את השעועית ולבשל עוד עד שמתבשלת.']},
  tw:[['שעועית ירוקה בשום','garlicky green beans'],['לוביה ברוטב עגבניות','black eyed peas in tomato sauce']] },

{ id:'veg-kishke', cat:'side', src:'B', photos:['6602'], tags:['cholent','vegetarian','shabbat'],
  title:{he:'קישקע צמחי לחמין', en:'Veggie Kishke for Cholent'},
  ing:{en:['1 sautéed onion','3/4 cup flour','1/2 cup water','1/4 cup oil','Salt, pepper, paprika, cumin'], he:['בצל מטוגן אחד','שלושה רבעי כוס קמח','חצי כוס מים','רבע כוס שמן','מלח, פלפל, פפריקה, כמון']},
  steps:{en:['Mix everything together.','Roll it in wax (parchment) paper and place into the cholent.'], he:['לערבב הכול.','ללפף בנייר אפייה ולהניח בתוך החמין.']},
  tw:[['חמין','cholent'],['קישקע','kishke']] },

{ id:'babka', cat:'bread', src:'A', photos:['6563'], tags:['yeast','chocolate'], credit:'Jaime Geller (filling)',
  title:{he:'בבקה שוקולד', en:'Chocolate Babka'},
  ing:{en:['Challah dough (from Allrecipes – see Challah recipes)','FILLING: 1/4 cup butter (or oil)','1/4 cup cocoa powder','1/2 tsp cinnamon','80 g chocolate','TOP: egg wash and crumble (sugar, flour, oil or butter)'], he:['בצק חלה (מ-Allrecipes – ראו מתכוני חלה)','למילוי: רבע כוס חמאה (או שמן)','רבע כוס קקאו','חצי כפית קינמון','80 גרם שוקולד','להגשה: שטיפת ביצה ופירורים (סוכר, קמח, שמן או חמאה)']},
  steps:{en:['Make the challah dough.','Melt all the filling ingredients in a pot.','Roll the dough out thin, spread with the filling and roll up. Make 2.','Twist them and place in an English cake pan.','Top with egg wash and the crumble topping.'], he:['להכין את בצק החלה.','להמיס בסיר את כל מרכיבי המילוי.','לרדד את הבצל דק, למרוח במילוי וללפף. להכין 2.','לטוות ולהניח בתבנית אנגלית.','למרוח ביצה ולפזר פירורים.']},
  note:{he:'לא כתובים זמן וטמפרטורת אפייה.', en:'Baking time and temperature are not written.'},
  tw:[['בבקה שוקולד ופקאן','chocolate pecan babka'],['בבקה קינמון','cinnamon babka']] },

{ id:'cinnamon-buns', cat:'bread', src:'A', photos:['6574'], tags:['yeast','pioneer-woman'], credit:'The Pioneer Woman',
  title:{he:'סינבון (לחמניות קינמון)', en:'Cinnamon Buns'},
  ing:{en:['DOUGH: 2 cups milk','1/2 cup oil','1/2 cup sugar','0.25 oz yeast','4 cups + 1/2 cup flour','1/2 tsp baking powder (heaping)','1/2 tsp baking soda','1/2 tbsp salt','FILLING: butter, sugar and cinnamon','ICING: 1/2 cup icing sugar + 1/2–1 tbsp milk'], he:['לבצק: 2 כוסות חלב','חצי כוס שמן','חצי כוס סוכר','7 גרם שמרים (0.25 אונקיה)','4 כוסות + חצי כוס קמח','חצי כפית אבקת אפייה (גדושה)','חצי כפית סודה לשתייה','חצי כף מלח','למילוי: חמאה, סוכר וקינמון','לציפוי: חצי כוס אבקת סוכר + חצי עד כף חלב']},
  steps:{en:['Heat the milk, sugar and oil to just below a boil. Set aside to cool to warm. Sprinkle the yeast on top and let sit 1 minute.','Add 4 cups flour, cover with a towel and let rise 1 hour.','Add 1/2 cup flour, baking powder, baking soda and salt. Use the dough right away, or refrigerate up to 3 days (punch it down if it gets too high).','Roll out the dough, spread with butter and sprinkle sugar and cinnamon. Roll up and cut.','Place in the pan without overcrowding. Cover and let rise 20 minutes.','Bake at 375°F (190°C) 15–17 minutes until golden brown.','Drizzle with the icing.'], he:['לחמם חלב, סוכר ושמן עד מעט לפני רתיחה. להניח להתקרר עד פושר. לפזר את השמרים ולהמתין דקה.','להוסיף 4 כוסות קמח, לכסות במגבת ולהניח לתפוח שעה.','להוסיף חצי כוס קמח, אבקת אפייה, סודה ומלח. אפשר להשתמש בבצק מיד או לשמור במקרר עד 3 ימים (להקפיץ אם תפח יותר מדי).','לרדד את הבצק, למרוח חמאה ולפזר סוכר וקינמון. ללפף ולחתוך.','לסדר בתבנית בלי לדחוס. לכסות ולהניח לתפוח 20 דקות.','לאפות ב-190°C (375°F) 15–17 דקות עד להזהבה.','לטפטף את הציפוי.']},
  tw:[['סינבון אקספרס','quick cinnamon rolls'],['לחמניות קינמון ופקאן','pecan sticky buns']] },

{ id:'challah-sweet', cat:'bread', src:'B', photos:['6633','6634'], tags:['challah','shabbat','yeast'], group:'challah', serves:{he:'למכונת לחם – חצי מתכון', en:'For a bread machine, do 1/2 recipe'},
  title:{he:'חלה מתוקה', en:'Sweet Challah'},
  ing:{en:['2 cups warm water','3 tbsp dry yeast','1/2 cup sugar','8½ cups flour (as written)','1 egg','1/2 cup canola oil','1/2 cup honey','A little less than 1 tbsp salt'], he:['2 כוסות מים פושרים','3 כפות שמרים יבשים','חצי כוס סוכר','8½ כוסות קמח (כפי שנראה בכרטיס)','ביצה','חצי כוס שמן קנולה','חצי כוס דבש','קצת פחות מכף מלח']},
  steps:{en:['Mix warm water, yeast, sugar and 1 cup flour. Let sit 20 minutes.','Mix in oil, honey, salt and egg.','Add 1 cup of flour at a time, mixing in between each cup.','Let rise 2–3 hours. Knead and shape into braids. Let rise 1 more hour.','Egg wash the top and add topping.','Bake at 350°F (175°C) for 25–30 minutes.'], he:['לערבב מים פושרים, שמרים, סוכר וכוס קמח. להניח 20 דקות.','להוסיף שמן, דבש, מלח וביצה.','להוסיף כוס קמח בכל פעם, ולערבב בין הכוסות.','להתפיח 2–3 שעות. ללוש ולקלוע. להתפיח עוד שעה.','למרוח ביצה ולהוסיף תוספת מעל.','לאפות ב-175°C (350°F) 25–30 דקות.']} },

{ id:'challah-sil', cat:'bread', src:'B', photos:['6635'], tags:['challah','shabbat','yeast'], group:'challah', credit:'Sister-in-law',
  title:{he:'חלה (של הגיסה)', en:"Challah (Sister-in-law's)"},
  ing:{en:['1.5 cups warm water','3 eggs (beaten)','3/4 cup oil','1/2 cup sugar','6 cups flour','Salt (amount unclear on the card – about 4 tsp)','1.5 tbsp yeast (2 packets)','CINNAMON SUGAR: 1/2 stick margarine, soft','1/2 cup sugar','3/4 cup flour','Cinnamon'], he:['כוס וחצי מים פושרים','3 ביצים טרופות','שלושה רבעי כוס שמן','חצי כוס סוכר','6 כוסות קמח','מלח (הכמות לא ברורה בכרטיס – בערך 4 כפיות)','1.5 כפות שמרים (2 שקיות)','פירורי קינמון: חצי מקל מרגרינה רכה','חצי כוס סוכר','שלושה רבעי כוס קמח','קינמון']},
  steps:{en:[],he:[]}, inc:1, note:{he:'כמות המלח לא קריאה בבירור – בדקו מול הצילום.', en:'The amount of salt is hard to read – check the photo.'} },

{ id:'challah-allrecipes', cat:'bread', src:'B', photos:['6636'], tags:['challah','shabbat','yeast'], group:'challah', credit:'Allrecipes',
  title:{he:'חלה (Allrecipes)', en:'Challah (Allrecipes)'},
  ing:{en:['1 cup warm water','1/2 cup sugar','1 tbsp honey','1/2 cup vegetable oil','2½ tsp salt','2 eggs (room temp)','4.5 cups flour (was 4)','2.5 tsp yeast (was 2¼)'], he:['כוס מים פושרים','חצי כוס סוכר','כף דבש','חצי כוס שמן','2½ כפיות מלח','2 ביצים (בטמפרטורת החדר)','4.5 כוסות קמח (במקור 4)','2.5 כפיות שמרים (במקור 2¼)']},
  steps:{en:[],he:[]}, inc:1 },

{ id:'challah-big', cat:'bread', src:'B', photos:['6637'], tags:['challah','shabbat','yeast'], group:'challah',
  title:{he:'חלה – כמות גדולה (פתק)', en:'Challah – big batch (sticky note)'},
  ing:{en:['1.5 cups warm water','3/4 cup sugar','1.5 tbsp honey','3/4 cup vegetable oil','3¾ tsp salt','3 eggs','6¾ cups flour','3¾ tsp yeast'], he:['כוס וחצי מים פושרים','שלושה רבעי כוס סוכר','1.5 כפות דבש','שלושה רבעי כוס שמן','3¾ כפיות מלח','3 ביצים','6¾ כוסות קמח','3¾ כפיות שמרים']},
  steps:{en:[],he:[]}, inc:1, note:{he:'פתק צהוב שהודבק על כרטיס ריק.', en:'A sticky note stuck onto a blank card.'} },

{ id:'oat-waffles', cat:'breakfast', src:'A', photos:['6556'], tags:['waffles','oats'], group:'waffles',
  title:{he:'וופלים משיבולת שועל', en:'Oat Waffles'},
  ing:{en:['2/3 cup melted butter','2 eggs','1¾ cups milk','1 tsp vanilla','1⅓ cups oat flour','1/4 cup cornstarch','2 tbsp maple syrup (or sugar)','2 tsp baking powder','1/2 tsp baking soda','1/2 tsp salt'], he:['שני שליש כוס חמאה מומסת','2 ביצים','1¾ כוסות חלב','כפית וניל','1⅓ כוסות קמח שיבולת שועל','רבע כוס עמילן תירס','2 כפות סירופ מייפל (או סוכר)','2 כפיות אבקת אפייה','חצי כפית סודה לשתייה','חצי כפית מלח']},
  steps:{en:[],he:[]}, inc:1 },

{ id:'waffles', cat:'breakfast', src:'A', photos:['6559'], tags:['waffles'], group:'waffles',
  title:{he:'וופלים', en:'Waffles'},
  ing:{en:['2 eggs','2 cups flour','1/2 cup oil','1 tbsp sugar','4 tsp baking powder','1/4 tsp salt','1/2 tsp vanilla','1¾ cups milk'], he:['2 ביצים','2 כוסות קמח','חצי כוס שמן','כף סוכר','4 כפיות אבקת אפייה','רבע כפית מלח','חצי כפית וניל','1¾ כוסות חלב']},
  steps:{en:[],he:[]}, inc:1 },

{ id:'pancakes', cat:'breakfast', src:'B', photos:['6585'], tags:['pancakes'],
  title:{he:'פנקייק', en:'Pancakes'},
  ing:{en:['DRY: 1½ cups flour','3 tbsp sugar','1½ tsp baking powder','1/2 tsp salt','1/4 tsp baking soda','WET: 1 cup + 2 tbsp milk','4 tbsp melted butter','1 egg'], he:['יבשים: 1½ כוסות קמח','3 כפות סוכר','1½ כפיות אבקת אפייה','חצי כפית מלח','רבע כפית סודה לשתייה','רטובים: כוס + 2 כפות חלב','4 כפות חמאה מומסת','ביצה']},
  steps:{en:['Mix the dry ingredients (1) in one bowl and the wet ones (2) in another.','Combine 1 + 2 together.'], he:['לערבב את היבשים (1) בקערה אחת ואת הרטובים (2) בקערה אחרת.','לשלב 1 + 2 יחד.']},
  tw:[['פנקייק בננה','banana pancakes'],['פנקייק עם חמאה ומייפל','buttermilk pancakes']] },

{ id:'muffins-lemon', cat:'breakfast', src:'A', photos:['6571'], tags:['muffins','lemon'], group:'muffins',
  title:{he:'מאפינס לימון', en:'Lemon Muffins'},
  ing:{en:['2 eggs','1 cup + 2 tbsp sugar','1/2 cup oil','1 tsp vanilla','Zest and juice of a lemon','1⅓ cups flour','1½ tsp baking powder','Pinch of salt'], he:['2 ביצים','כוס + 2 כפות סוכר','חצי כוס שמן','כפית וניל','גרידה ומיץ של לימון','1⅓ כוסות קמח','1½ כפיות אבקת אפייה','קמצוץ מלח']},
  steps:{en:['Mix the liquids (with the sugar), then add the dry ingredients.','Bake 25–35 minutes.'], he:['לערבב את הנוזלים (עם הסוכר) ואז להוסיף את היבשים.','לאפות 25–35 דקות.']} },

{ id:'muffins-blueberry', cat:'breakfast', src:'A', photos:['6576'], tags:['muffins','blueberry'], group:'muffins',
  title:{he:'מאפינס אוכמניות עם פירורים', en:'Blueberry Muffins (crumble)'},
  ing:{en:['1.5 cups flour (210 g)','3/4 cup sugar (150 g)','1 packet baking powder','1/2 tsp salt','1/3 cup oil (65 g)','1 egg','1/3 cup milk (85 g)','1 cup blueberries','CRUMBLE: 50 g soft butter, 50 g flour, 50 g sugar'], he:['1.5 כוסות קמח (210 גרם)','3/4 כוס סוכר (150 גרם)','שקית אבקת אפייה','חצי כפית מלח','שליש כוס שמן (65 גרם)','ביצה','שליש כוס חלב (85 גרם)','כוס אוכמניות','לפירורים: 50 גרם חמאה רכה, 50 גרם קמח, 50 גרם סוכר']},
  steps:{en:['Make the muffin batter, fold in the blueberries, and top with the crumble.','Bake 20 minutes at 180°C.'], he:['להכין את בלילת המאפינס, לשלב את האוכמניות ולפזר פירורים מעל.','לאפות 20 דקות ב-180°C.']} },

{ id:'muffins-carrot', cat:'breakfast', src:'B', photos:['6603'], tags:['muffins','carrot'], group:'muffins',
  title:{he:'מאפינס גזר', en:'Carrot Muffins'},
  ing:{en:['1 cup flour','1/2 cup oil','1 cup brown sugar','1 tsp vanilla','2 eggs','1 tsp baking powder','1 capful lemon juice','3 medium carrots, grated'], he:['כוס קמח','חצי כוס שמן','כוס סוכר חום','כפית וניל','2 ביצים','כפית אבקת אפייה','פקק מיץ לימון','3 גזרים בינוניים מגורדים']},
  steps:{en:['Mix all the ingredients, then stir in the carrots.','Bake about 15 minutes.'], he:['לערבב את כל המרכיבים ואז לקפל פנימה את הגזר.','לאפות כ-15 דקות.']},
  note:{he:'לא כתובה טמפרטורת אפייה.', en:'Baking temperature not written.'} },

{ id:'muffins-banana', cat:'breakfast', src:'B', photos:['6611'], tags:['muffins','banana'], group:'muffins',
  title:{he:'מאפינס בננה', en:'Banana Muffins'},
  ing:{en:['3 bananas','1 egg','Add after: 1½ cups flour, 1 tsp baking powder, 1 tsp baking soda, 1/2 tsp salt','3/4 cup sugar','1/3 cup oil'], he:['3 בננות','ביצה','להוסיף בסוף: 1½ כוסות קמח, כפית אבקת אפייה, כפית סודה לשתייה, חצי כפית מלח','שלושה רבעי כוס סוכר','שליש כוס שמן']},
  steps:{en:['Mash the bananas and mix with the egg, sugar and oil.','Add the flour mixture last.','Bake 20–25 minutes.'], he:['למעוך את הבננות ולערבב עם הביצה, הסוכר והשמן.','להוסיף בסוף את תערובת הקמח.','לאפות 20–25 דקות.']},
  note:{he:'לא כתובה טמפרטורת אפייה.', en:'Baking temperature not written.'} }

);
