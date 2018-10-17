# HubSpot Web Team Exercise - Instructions

## Setup
1. Clone or download this repository (do not fork it).
2. Install [Node.js](https://nodejs.org/en/download/) and then run `npm install` on your project. We've included recommended packages in `package.json` for you to use, but feel free to add or remove any packages.
3. Set up a build tool (Gulp, WebPack, Grunt, etc.) to compile from the existing `/src` folder to a `/build` directory and run your site locally. If you prefer Gulp, we've included recommended tasks in `gulpfile.js` for you to use, but that file can be modified as much as you see fit.

If everything is set up properly, anyone should be able to fork your project, run `npm install`, and issue a start command (we recommend `npm start`) command from the command line to run your build tool and view your site from `localhost`.

**Spending too much time on step #3?** Skip it and focus on the exercises. When you submit your final assessment, please let us know why you skipped this build tool setup step in the `submission.md` file.

## Mockups

This code assessment is broken up into three exercises of increasing difficulty. All exercises should display on the same page.

### Mockup with collapsed filter

The mockup with all filters collapsed. See the section below for how the expanded filter dropdowns should appear.

<img src="http://cdn2.hubspot.net/hubfs/53/web_team/web-team-test/web-team-exercise_1.png" alt="Mockup" width="600" />

#### Mockup with expanded filter

Note the filter dropdown outlined in red.

<img src="http://cdn2.hubspot.net/hubfs/53/web_team/web-team-test/web-team-exercise_2.png" alt="Mockup_Hover" width="600" />

## Requirements
1. Without adding or removing HTML elements, style each of the following modules to match the above mockup. Fonts have been provided for you and can be found in the accompanying `/src/views/partials/_fonts.ejs` file. Do not add or remove any of the HTML elements in the `/src/views/partials/_testimonial.ejs`, `/src/views/partials/_cta.ejs`, or `/src/views/partials/_filterable-content.ejs` files. You may add attributes to the existing HTML elements, but don't add or remove any DOM elements, and don't edit a DOM element's tag name. Feel free to use CSS pseudoelements. All other files may be edited (e.g. `/src/views/pages/index.ejs`).
2. The page should be responsive. Use your best judgment for how narrow viewports should look.
3. Don't use any CSS frameworks (e.g. Bootstrap). You should use a preprocessor, such as Sass.
4. Focus on writing clean, reusable code.
5. While all the modules should be styled to match the mockup, some require some additional functionality:
    - **Exercise 2 - CTA Quote:**
        1. When clicking `Tell Me More`, fetch text from an API of your choice and update the text to the left of `Tell Me More`. (We recommend [the Chuck Norris jokes API](http://www.icndb.com/api/), but realize that might not be for everyone.)
    - **Exercise 3 - Filterable Content:**
        1. Use the provided `/src/js/data/data.json` file to generate filterable categories as well as the individual content elements within the `/src/views/partials/_filterable-content.ejs` HTML. The items should be alphabetized by title.
        2. **Dropdowns:** If multiple checkboxes are checked (e.g. _Mystery_ and _Drama_), items from **_both_** categories should display (e.g. all items tagged with either _Mystery_ or _Drama_).
        3. The `Clear Filters` functionality is mandatory.
6. Have fun with it! If you get stuck, that's OK. Get as far as you can.
7. Before submitting, answer the questions in `submission.md`.

#### Bonus Points
Want an extra challenge? Add some pizzazz to your page. **Note:** These steps are optional, but encouraged. :star2:

1. Feeling particularly good? Use ES6 or React components.
2. Replace Gulp and use WebPack as your build tool.
3. Add a search field and functionality to the filter module (example in mockup).
4. Add some of your favorite node modules to the project, or modify your build tool with anything that strikes your fancy.

## Submission
Be sure to fill out the `submission.md` file before submitting. Once complete, email either a) a zip of your work or b) a link to your GitHub repository to your recruiting specialist so they can send to the team.

## FAQs

**Do I have to setup a build tool (Gulp, WebPack, Grunt, etc.)?**

The build tool setup is part of the exercise, so we strongly encourage you to complete this step. If you absolutely can't set it up in time, skip that step and focus on the exercises in plain HTML/CSS/JS. When you submit your final assessment, please let us know why you skipped this build tool setup step in the `submission.md` file.

**What browsers should I support?**

We'll look for compatibility in the following browsers:

1. Google Chrome (latest version)
2. Mozilla Firefox (latest version)
3. Microsoft Edge (latest version)

**I'm running out of time! May I skip one of the exercises?**

Although we expect you to finish all the exercises, life happens. If you aren't able to finish on time, focus on `Exercise 3 - Filterable Content` and try to finish at least one other exercise. Then let us know why you skipped an exercise in the `submission.md` file.

**Should I make a separate page for each exercise?**

No thanks — we'd like to see all the exercises on one page. This single page should look as similar to the mockup as possible.