# Submission Notes 

These notes will be read by HubSpot developers. Drop us a line!


## Given more time, what would you have done differently?

A few things I could have done to improve UX:

* make the "years" dropdown a 2-handled range slider, or at least break year filters up into ranges (1890 - 1920, etc..)
* fuzzy-mathcing for string search (with a library), like [FuseJS](http://fusejs.io/)
* adding some kind of loading indicator to the filterable content module
* the bundle is massive (1.5MB+) and there are ways to cut it down (treeshake, code-splitting, drop libraries, etc...)
* could have done more with CSS, created more apparent pressed & active states, fancier transitions, etc.
* load webfonts differently to prevent FOUT

Some things that could improve workflow & dev experience:

* better React build - create-react-app, error overlays, etc..
* js sourcemaps
* linting JS & Scss
* drop gulp dependency, or at least use gulp file watchers to rebuild webpack bundle

And things that would improve code portability:

* all code challenge modules could and probably should be written to allow multiple instances

React:

* I wanted to do a React version of the filterable content also. Its in progress, and I want to finish it off anyway and use it as a chance to play with [PopmotionPose](https://popmotion.io/pose/)


## Is there anything else you'd like to let us know?

The Hubspot canvas design system & (web style guide)[https://www.hubspot.com/style-guide/get-started] are awesome! I was excited to see those, can't believe I didn't come across them earlier.  I've been really impressed overall with the brand refresh that's happened over the last year or so and the work the web team has done - love how consistent marketing pages are with the product UI.  Super-excited to have the chance to work with such a talented team on things like these.  Thanks for giving me a shot! 😁
