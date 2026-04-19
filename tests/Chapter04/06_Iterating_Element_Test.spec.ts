import { test, expect } from '@playwright/test';


test("Iterating matching elements in playwright", async ({ page }) => {
    await page.goto('https://github.com/BakkappaN');
    const repositoryLink = await page.$$('.repo'); 
    console.log(`For Each Style`)
    for (const project of repositoryLink){
        const projectName = await project.textContent();
        console.log(`Project Name is : ${projectName}`);
    }
    console.log(`ArrayList For Loop Style`);
    console.log("Top 5 Repositories are :")
    for(let i=0 ; i<5 ; i++){
        const projectName = await repositoryLink[i].textContent();
        console.log(`Project ${i+1} is : ${projectName}`);
    }
    console.log(`For with nth Element Style`);
    const repositoryLink2 = await page.locator('.repo'); 
    const total = await repositoryLink2.count();
    for(let i=0 ; i<total ; i++){
        const projectName = await repositoryLink2.nth(i).textContent();
        console.log(`Project ${i+1} is : ${projectName}`);
    }

});