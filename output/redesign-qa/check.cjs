/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node browser QA script. */
const path = require('node:path');
const os = require('node:os');
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')); }
const { chromium } = playwright;
const assert = require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage();page.setDefaultTimeout(10000); const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1440,390,320,768]){
 await page.setViewportSize({width,height:900}); await page.goto('http://localhost:3000');await page.locator('.hero h1').waitFor();await page.evaluate(()=>document.fonts.ready);
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${width}`);
 const logo=await page.locator('.retail-logo').boundingBox();assert(Math.abs(logo.x+logo.width/2-width/2)<1);
 assert.equal(await page.locator('.customer-review').count(),6);
 assert.equal(await page.locator('.shipping-banner').innerText(),'FREE SHIPPING on orders over 100 RON');
 await page.locator('#philosophy-title').waitFor();
 const copy=await page.locator('.philosophy-copy').boundingBox(); const photo=await page.locator('.philosophy-image').boundingBox();
 if(width>800) assert(copy.x<photo.x); else assert(copy.y<photo.y);
 await page.evaluate(()=>scrollTo(0,900));await page.waitForTimeout(100);
 const banner=await page.locator('.shipping-banner').boundingBox();const header=await page.locator('.retail-header-inner').boundingBox();assert.equal(banner.y,0);assert.equal(banner.height,34);assert.equal(header.y,34);assert.equal(header.height,width<=640?68:80);
 await page.evaluate(()=>scrollTo(0,0));
 await page.screenshot({path:`output/redesign-qa/home-${width}.png`,fullPage:true});
 await page.getByRole('button',{name:'Open navigation',exact:true}).click();await page.waitForTimeout(300);assert.equal(await page.evaluate(()=>document.body.style.overflow),'hidden');
 await page.screenshot({path:`output/redesign-qa/menu-${width}.png`});
 await page.keyboard.press('Escape');await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
 assert.equal(await page.getByRole('button',{name:'Open navigation',exact:true}).evaluate(e=>e===document.activeElement),true);
 await page.getByRole('button',{name:'Open navigation',exact:true}).click();await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Dryness',exact:true}).click();await page.waitForURL('**/shop?concern=dryness');assert.equal(await page.locator('.shipping-banner').count(),1);assert.equal(await page.locator('dialog[open]').count(),0);
}
await page.getByRole('button',{name:'Open product search'}).click();await page.getByLabel('Search by product name or brand').fill('Beauty of Joseon');await page.getByRole('button',{name:'Search products',exact:true}).click();await page.waitForURL('**/shop?q=*');await page.locator('.catalog-search-status').waitFor();assert((await page.locator('.catalog-search-status').innerText()).includes('Beauty of Joseon'));
await page.goto('http://localhost:3000/products/beauty-of-joseon-glow-deep-serum');assert.equal(await page.locator('.shipping-banner').count(),1);await page.getByRole('button',{name:'Add to Cart',exact:true}).click();await page.getByRole('button',{name:'Open demo cart, 1 items'}).click();await page.locator('.cart-total').waitFor();assert((await page.locator('.cart-content').innerText()).includes('75'));
await page.getByRole('button',{name:'Remove Glow Deep Serum from cart'}).click();await page.getByText('Your cart is ready for a little care.').waitFor();await page.keyboard.press('Escape');
await page.getByRole('button',{name:'Add to Favorites',exact:true}).click();assert.equal(await page.getByRole('button',{name:'Remove from Favorites',exact:true}).getAttribute('aria-pressed'),'true');
await page.goto('http://localhost:3000'); const fav=page.locator('.carousel-slide:not([data-clone="true"]) .product-favourite').first();await fav.focus();await page.waitForTimeout(200);const previousFav=await fav.getAttribute('aria-pressed');await fav.click();await page.waitForTimeout(150);assert.notEqual(await fav.getAttribute('aria-pressed'),previousFav);
const track=page.locator('.carousel-track');const before=await track.getAttribute('style');await page.locator('.carousel-controls button').last().click();await page.waitForTimeout(600);assert.notEqual(await track.getAttribute('style'),before);
await page.setViewportSize({width:390,height:900});const reviews=page.locator('.customer-reviews-grid').first();await reviews.evaluate(e=>e.scrollTo({left:e.clientWidth,behavior:'instant'}));assert(await reviews.evaluate(e=>e.scrollLeft)>0);
await page.getByRole('button',{name:'Newsletter',exact:true}).click();await page.getByLabel('Email address').fill('demo@example.com');await page.getByRole('button',{name:'Subscribe',exact:true}).click();await page.getByRole('status').filter({hasText:'Your email has not been sent or saved.'}).waitFor();await page.keyboard.press('Escape');
assert.deepEqual(errors,[]);console.log('PASS: responsive layout, centered logo, menu/filter navigation, Escape/focus/scroll lock, search, demo cart, favourites, carousel, reviews swipe, newsletter; no browser errors.');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

