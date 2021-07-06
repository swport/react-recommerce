import mock from '../utils/mock';

mock.onPost('/api/login').reply(200, {
    token: {
        id: '39202PIUIKKW87OOK-998JIPPL-9d0dj',
        validFor: 480 // seconds
    },
    user: {
        id: 3121,
        name: 'John Smith',
        email: 'john.doe@email.com'
    }
});

// verify token and return user
mock.onPost('/api/me').reply(200, {
    user: {
        id: 3121,
        name: 'John Smith',
        email: 'john.doe@email.com'
    }
});