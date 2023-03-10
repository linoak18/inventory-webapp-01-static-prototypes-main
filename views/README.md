# Part 01: Prototyping our web pages 

> You can view these example prototype pages on [the Github Pages site.](https://atcs-wang.github.io/inventory-webapp-01-static-prototypes/)

## (1.1) Why are we using a front-end framework like Materialize?

To help avoid spending too much time on making our web pages look good, we will utilize [Materialize](https://materializecss.com/), a front-end "framework", to do a lot of the design work and decisions for us. It is an open-source library of CSS and JS that can be easily used in any web page. By incorporating Materialize's preset classes (and a short bit of JS script or two), your HTML elements will be styled to have that bold, user-friendly, "material" design that was popularized by Google product designers. Materialize can also help make pages more "responsive", or adaptive to the user's device, be it a laptop or tablet or mobile phone.

## (1.2) Building the static prototype pages

There are three HTML pages. Each was first generated with the Emmet abbreviation in VSCode (simply create an empty HTML file, type `!` and hit enter) before filling in the head and body with content. The style/layout of the content was largely done with Materialize, with a little bit of custom CSS.

### (1.2.1) Materialize features used

For all 3 pages, the relevant parts of the Materialize library are "imported" at various points. 

Materialize's CSS and Google's material icons are linked in the `<head>`:

```html
    <!-- Materialize CSS and Icons-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

At the bottom of the `<body>` of `stuff.html` and `item.html` is a link to Materialize's JS, and a short "auto-initialize" script:

```html
    <!-- Materialize JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

    <!-- initialize Materialize elements -->
    <script> M.AutoInit();</script>
```

The main content of the pages are found in the `<body>`, above the scripts. Each page uses a number of Materialize features in its content. Relevant documentation from the [Materialize website](https://materializecss.com/) is linked for each feature.

- Every page:
    - Surrounding container `<div>` to lightly center all main content. | [container documentation](https://materializecss.com/grid.html#grid-container)
    - Headings | [headers documentation](https://materializecss.com/typography.html#headers)
    - Stylized `<button>` elements or anchor `<a>` elements that are styled like buttons | [button documentation](https://materializecss.com/buttons.html)
    - "Waves" effects applied to various elements, largely buttons. | [waves effect documentation](https://materializecss.com/waves.html)
    - Icons (`<i>`) - (Materialize supports Google's Material Icons) | [icons documentation](https://materializecss.com/icons.html)

- `index.html`, the Home page
    - Simple greeting in a heading | [headers documentation](https://materializecss.com/typography.html#headers)
    - Link-"button" to the Stuff page | ([button documentation](https://materializecss.com/buttons.html))

- `stuff.html`, the Stuff inventory page 
    - Table of info for each item (name & quantity). | [table documentation](https://materializecss.com/table.html)
    - "INFO / EDIT" link-"button" to Item detail page and "DELETE" link-"button" (non-functional) for each item | [button documentation](https://materializecss.com/buttons.html)
    - "Add Item" form that contains:
        - Text and number inputs for name quantity | [form inputs documentation](https://materializecss.com/text-inputs.html )
        - a form submit button | [button documentation](https://materializecss.com/buttons.html#submit)
        - The form layout is done via Materialize's Grid system. | [grid documentation](https://materializecss.com/grid.html#grid-intro)

- `item.html`, the Item detail page
    - Similar to `stuff.html`, all item info in a table (name & quantity & description) | [table documentation](https://materializecss.com/table.html)
    - Text size/layout is responsive to screen size/layout. | [flow text documentation](https://materializecss.com/typography.html#flow)
    - "DELETE" link-"button" (non-functional) | [button documentation](https://materializecss.com/buttons.html)
    - Modal ("pop-up" mini-window) | [modal documentation](https://materializecss.com/modals.html)
        - "EDIT" link-"button" outside the modal that triggers showing the modal.
        - "NEVER MIND" button inside the modal that closes the modal. 
    - "Edit Item" form inside the modal - similar to the "Add Item" form in `stuff.html` with an additional input for description | [form inputs documentation](https://materializecss.com/text-inputs.html )

> A great way to see what Materialize is doing for the page is to temporarily remove or comment out the links to the Materialize CSS/JS.

You may notice that our prototypes currently lack a navigation bar (aka "navbar") which is a common feature of many webapps, displaying at the top of every page. This omission is only temporary but purposeful - we will add one later when we have better techniques for reducing code repetition. However, if you wanted to add one now, you can read the [Materialize navbar documentation](https://materializecss.com/navbar.html).

### (1.2.2) Custom CSS features

In both the `stuff.html` and `item.html` pages, there is a small internal CSS stylesheet to set a few custom styles. The CSS is identical for both pages.

```css
    /* these make the forms pop a little with a border that highlights when interacting with form inputs */
    form {
        border: solid 2px lightgrey;
        padding: 10px;
        border-radius: 5px;
    }

    form:focus-within {
        border-color: orange;
    }
    /* this makes the table rows change color when your mouse hovers over them */
    tr:hover {
        background-color: #F0F0F0;
    }
```
> You might be wondering why this example isn't using external stylesheets or JS scripts, especially when there is repetition. We'll refactor a little bit later, but for now its easier keeping everything related to one page in one file. However, if you wish to organize your CSS and JS into external files, go right ahead!

## (1.3) Viewing and Testing the prototype pages locally.

These example prototype pages are published online via [the Github Pages site.](https://atcs-wang.github.io/inventory-webapp-01-static-prototypes/)

However, as you write HTML files on your computer, you'll want to see how they'd look in the browser without having to publish them first. 

Here are 2 ways you can view your pages locally:
1) Enter the *full file path* of your HTML file into the URL bar of your browser. 
    - An easy way to get that path is to right-click the file in VSCode's Explorer and choose **"Copy Path"**; then paste it into your browser's URL bar. 
    - Note that any changes to your file do not automatically update the page in the browser; refresh to see any updates. 
3) Install the VSCode Extension **"Live Server"**  (by Ritwick Dey). Then, right-click on your file and choose **"Open with Live Server"**.
    - This starts a simple web server on your computer, serving files ONLY in the VSCode project folder. (Right-click on any HTML file and choose "Stop Live Server" to stop the server).
    - This web server is only accessible locally to your own web browser: notice the URL contains the special "localhost" IP address (`127.0.0.1`), which refers to your own computer. The port number after the colon (likely `5500`) refers to the specific server process.
    - The best part of Live Server is that any *changes to your HTML file will result in an automatic refresh to your browser page!*

## (1.4) Optional: Publishing your prototypes with Github Pages

Althoug prototypes aren't a fully working webapp yet, you can still publish your own prototypes on the web!

You can use [Github Pages](https://pages.github.com/) to easily publish any Github repository as a simple website.  The process is fairly simple:
1) Create a public Github repository with your HTML pages.
2) Go to that repo's webpage, and go to the **Settings** tab. 
3) In the **Pages** section (left nav menu), under **Source** choose your main (or master) branch. 
4) The publishing process will take a few minutes. Once published, you can click the provided URL ( of the form `https://<USERNAME>.github.io/<REPONAME>/`) to see your homepage (`index.html`)
6) Any pushed commits to that main branch will update the published website (after a few minutes delay).

Github Pages creates a *static file server* for your webpage, which handles simple HTTP requests for your files. 

> Technically, you only get one static web server per account. If you have multiple website repositories, they are all on one website domain, `<USERNAME>.github.io` but organized by repository name in the URL path, as if in separate "folders".

> Note, as you navigate your website, that the path of the URL corresponds contains the repository and name of the HTML files. The exception is the `index.html` - Pages interprets a URL without a file as as request for an `index.html` in that repository. That's why the provided URL, of the form `https://<USERNAME>.github.io/<REPONAME>/`, will display your `index.html` as the homepage. 

## (1.5) Conclusion:

In the next lesson, we'll discuss what a web server does and build our own.

Next up: [Part 02: Web app server setup and basics](https://github.com/atcs-wang/inventory-webapp-02-app-server-basics)

