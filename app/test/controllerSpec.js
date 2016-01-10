describe('PhoneCat controllers', function() {

	beforeEach(module('phonecatApp'));

	describe('PhoneListCtrl', function() {
		var scope;
		var ctrl;
		var $httpBackend;

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET('phones/phones.json')
				.respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

			$scope = $rootScope.$new();
			ctrl = $controller('PhoneListCtrl', {$scope: scope});
		}));

		it('should create "phones" model with 7 phones', function() {
			expect(scope.phones.length).toBe(7);
		});

		it('should set the default value of orderProp model', function() {
			expect(scope.orderProp).toBe('age');
		});

		it('should create "phones" model with 2 phones fetched from xhr', function() {
			expect(scope.phones).toBeUndefined();
			$httpBackend.flush();

			expect(scope.phones).toEqual([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
		});
	});

	describe('PhoneDetailCtrl', function() {
		var scope;
		var $httpBackend;
		var ctrl;

		beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET('phones/nexus-s.json').respond({name: 'Nexus S'});

			$routeParams.phoneId = 'nexus-s';
			scope = $rootScope.$new();
			ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
		}));

		it('should fetch phone detail', function() {
			expect(scope.phone).toBeUndefined();
			$httpBackend.flush();

			expect(scope.phone).toEqual({name: 'Nexus S'});
		});
	});

});