/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs defined and not empty', () => {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names defined and not empty', () => {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        })
    });

    /* DONE: Write a new test suite named "The menu" */
    describe('The menu', () => {
        /* DONE: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', () => {
            // element with 'slide-menu' class has to be child of element with 'menu-hidden' class
            const menuElement = document.getElementsByClassName('slide-menu')[0];
            expect(menuElement).toBeDefined();
            expect(menuElement.parentElement.classList.contains('menu-hidden')).toBe(true);
        })
        /* DONE: Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('toggles when menu icon gets clicked', () => {
            // using jQuery for tests: functions trigger, hasClass and others are jQuery functions

            // function to trigger click event on menu icon
            clickMenuIcon = () => {
                $('.menu-icon-link').trigger('click');
            }

            clickMenuIcon();
            // check if menu is visible: body doesn't have class 'menu-hidden'
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // trigger another click event on menu icon - menu should hide: bodu has a class 'menu-hidden'
            clickMenuIcon();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    /* DONE: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', () => {
        /* DONE: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach( (done) => {
            loadFeed(0, done);
        });

        it('should have at least single entry element in .feed container', (done) => {
            expect($('.feed').children()[0].classList.contains('entry-link')).toBe(true);
            done();
        })
    });

    /* DONE: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let firstHref, secondHref;
        beforeEach( (done) => {
            // load first feed ...
            loadFeed(0, () => {
                // this callback function is called only when async function loadFeed(0) returns success or error (see definition of loadFeed)
                // ... and save its first entry href to compare with second feed
                firstHref = $('.feed').children()[0].href;
                // when first feed loadFeed call is finished (it is: either with success or error, cause this callback only then is called ),
                // load second feed and save its first entry href
                loadFeed(1, () => {
                    secondHref = $('.feed').children()[0].href;
                    // only here, when second feed is loaded we signal jasmine to check expectation
                    done();
                })
            });
        });

        it('should change content displayed', (done) => {
            expect(firstHref).toBeDefined();
            expect(secondHref).toBeDefined();
            expect(firstHref).not.toEqual(secondHref);
            done();
        })
    });
}());
