var users = ['fritz@gmail.com', 'hans@gmail.com'];
var BLOCKED_STATES = ['blocked', 'inactive', 'temporarilyBlocked'];

function createUser(user) {
    if (user.password == null || user.password.length < 6 || !(/\d/.test(user.password))) {
        return 'invalid password for user';
    }
    if (!users.includes(user.name) && !BLOCKED_STATES.includes(user.state)) {
        insertUser(user);
    } else {
        return 'user can not be created';
    }
}

function insertUser(user) {
    console.log('insert ' + user.name);
}

describe('unit tests', function () {
    describe('password check', function () {
        beforeEach(function () {
            this.user = { };
            this.message = 'invalid password for user';
        });
        describe('password is null', function () {
            it('should return message', function () {
                this.user.password = null;
                expect(createUser(this.user)).toEqual(this.message);
            });
        });
        describe('password is too short', function () {
            it('should return message', function () {
                this.user.password = 'kurz4';
                expect(createUser(this.user)).toEqual(this.message);
            });
        });
        describe('password contains no number', function () {
            it('should return message', function () {
                this.user.password = 'nonumbers';
                expect(createUser(this.user)).toEqual(this.message);
            });
        });
        describe('password is valid', function () {
            it('should not return message', function () {
                this.user.password = 'valid4password';
                expect(createUser(this.user)).toEqual(undefined);
            });
        });
    });

    describe('user check', function () {
        beforeEach(function () {
            this.user = { password: 'valid4password' };
            this.message = 'user can not be created';
        });
        describe('user already exists', function () {
            it('should return message', function () {
                this.user.name = 'fritz@gmail.com';
                expect(createUser(this.user)).toEqual(this.message);
            });
        });
        describe('user is blocked', function () {
            it('should return message', function () {
                this.user.name = 'notexisting@mail.com';
                this.user.state = 'temporarilyBlocked';
                expect(createUser(this.user)).toEqual(this.message);
            });
        });
        describe('user not existing and not blocked', function () {
            it('should insert user', function () {
                this.user.name = 'notexisting@mail.com';
                this.user.state = 'active';
                expect(createUser(this.user)).toEqual(undefined);
            });
        });
    });
});
