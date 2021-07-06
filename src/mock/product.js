import mock from '../utils/mock';

import { sections, shop_data } from '../data/categories';
import { getAllQueryParams } from '../utils/helper';

const qs = require('qs');

const apiUrl = '/api';

const perPage = 6; // per page items

// default product list
const productList = shop_data[0]; // hats

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, '%20'));
}

// get all categories
mock.onGet('/api/categories').reply(200, sections);

// get products list -- added pagination
mock.onGet(new RegExp(`${apiUrl}\/products\/*`)).reply(function (config) {
    console.log("config.url: ", getAllQueryParams(decodeURI(config.url)));
    // const filters = getParameterByName('filters', config.url);

    const data = { ...productList };

    const items = data.items; // items

    const totalItems = items.length;

    let thisPage = parseInt(getParameterByName('page', config.url));
    thisPage = thisPage ? thisPage : 1;

    const startIndex = (perPage * thisPage) - perPage;

    // slice items to fit for pagination
    data.items = items.slice(
        startIndex,
        startIndex + perPage
    );

    const totalPages = Math.ceil(totalItems / perPage);

    const nextPage = (thisPage + 1) > totalPages
        ? null
        : thisPage + 1;

    const prevPage = thisPage > 1
        ? thisPage - 1
        : null;

    data.pagination = {
        totalItems: totalItems,
        currentPage: thisPage,
        nextPage: nextPage,
        prevPage: prevPage,
        totalPages: totalPages
    };

    return [200, data];
});

mock.onGet(new RegExp(`${apiUrl}\/filters\/*`)).reply(function (config) {
    return [200, [
        {
            id: 21289,
            name: 'Brand',
            options: [
                {
                    id: 9982,
                    title: 'Hats'
                },
                {
                    id: 9980,
                    title: 'Pants'
                }
            ]
        },
        {
            id: 21200,
            name: 'Sizes',
            options: [
                {
                    id: 1109,
                    title: 'Large'
                },
                {
                    id: 7767,
                    title: 'Small'
                }
            ]
        }
    ]];
});