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
		 
		 
		// Loop throug each feed, checking if it's defined

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Loop throug each feed, checking if the URL is defined and not empty

        it('has a defined and not empty URL', function () {
            for(let feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        // Loop throug each feed, checking if it has name defined and not empty

        it('has a defined and not empty URL', function () {
            for(let feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    //This suite is all about the menu
	
    describe('Menu', function() {
		
		
		// Checks if there's a class mennu-hidden defined
		
		it('is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
		});			
		
		
		//Checks if clicking on the icon changes the menu-hidden prop
		
		it('changes visibility after click', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
	});


    //This suite is all about the Initial Entries
	
    describe('Initial Entries', function() {
		
		//Since loadFeed() is asynchronous we need to make sure loadFeed goes first
		
		beforeEach(function(done) {
            loadFeed(0, done);
        });

		
		//Checks if there is at least one element in the 'feed' container
		
        it('has entries', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
		
	});

	
	//This suite is all about the New Feed Selection
	
    describe('New Feed Selection', function() {
		
		 beforeEach(function(done) {
            loadFeed(1, function() {
                oldFeed = $('.feed').html();
                loadFeed(0, function(){
					newFeed = $('.feed').html();
					done();
				});
            });
        });
		
		 
		// Checks if new feed is loaded and the content actually changes
		
        it('loaded a new feed, different from the old one', function() {
            expect(newFeed).not.toBe(oldFeed);
        });
		
	});
}());
