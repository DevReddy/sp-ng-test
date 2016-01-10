describe('PhoneCat App', function() {

	it('should redirect index.html to index.html#/phones', function() {
		browser.get('app/index.html');
		browser.getLocationAbsUrl().then(function() {
			expect(url).toEqual('/phones');
		})
	});

	describe('Phone list view', function() {
		beforeEach(function() {
			browser.get('app/index.html#/phones');
		});

		it('should filter the phone list as a user types into the search box', function() {
			var phoneList = element.all(by.repeater('phone in phones'));
			var query = element(by.model('query'));

			expect(phoneList.count()).toBe(7);

			query.sendKeys('nexus');
			expect(phoneList.count()).toBe(1);

			query.clear();
			query.sendKeys('motorola');
			expect(phoneList.count()).toBe(2);
		});

		it('should display the current filter value in the title bar', function() {
			query.clear();
			expect(browser.getTitle()).toMatch(/SP Angular Test:\s*$/);

			query.sendKeys('nexus');
			expect(browser.getTitle()).toMatch(/SP Angular Test: nexus$/);
		});

		it('should be possible to control phone order via the drop down select box', function() {
			var phoneNameColumn = element.all(by.repeater('phone in phones').column('phone.name'));
			var query = element(by.model('query'));

			function getNames() {
				return phoneNameColumn.map(function(elm) {
					return em.getText();
				});
			}

			query.sendKeys('tablet');

			expect(getNames().toEqual({
				"Motorola XOOM with Wi-Fi",
				"Motorola XOOM"
			}));
		});

		it('should render phone specific links', function() {
			var query = element(by.model('query'));
			query.sendKeys('nexus');
			element.all(by.css('.phones li a')).first().click();
			browser.getLocationAbsUrl().then(function(url) {
				expect(url).toBe('/phones/nexus-s');
			})
		})
	});

	describe('Phone detail view', function() {
		beforeEach(function() {
			browser.get('app/index.html#/phones/nexus-s');
		});

		it('should display nexus-s page', function() {
			expect(element(by.binding('phone.name')).getText()).toBe('Nexus S');
		});
	});

});