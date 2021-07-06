import React, { createContext, useReducer } from 'react';
import { useHistory } from 'react-router';

export const ProductContext = createContext();

const initialState = {
    filters: {},
    filters_qs: '', // filter query string
    category: null
};

function productReducer(state, action) {
    switch (action.type) {
        case 'SET_FILTERS':
            return {
                ...state,
                filters: action.payload.filters,
                filters_qs: action.payload.filters_qs
            };
    }

    return state;
}

export default function ProductProvider({ children }) {
    const [state, dispatch] = useReducer(
        productReducer,
        initialState,
        function() {

            //boot filters from url
            console.log("search:", window.location.search);

            return initialState;
        }
    );

    const history = useHistory();

    // push a new state
    // with these filters
    const refreshWithFilters = (selectedFilters) => {

        // size, brand, etc
        const filter_types = Object.keys(selectedFilters);
        
        const search = history.location.search;

        const filters = {};

        // remove filters from query params
        // let filters_qs = removeParamFromQuery(
        //     search, 'filters[]'
        // );

        const query_builder = new URLSearchParams(search);

        // it wouldn't decode by default
        query_builder.delete('filters');
        query_builder.delete('filters[]');
        query_builder.delete('filters%5B%5D');

        // filters_qs += (filters_qs === '') ? '?' : '';

        // sort it to avoid different query strings for same set of filters
        // and generate a fitler query string to be appended in the url
        filter_types.sort()
            .forEach(filter_type => {
                if( selectedFilters[filter_type].length ) {
                    // sort all selected "sizes or brands"
                    let sortedOptions =
                        selectedFilters[filter_type].sort();

                    filters[filter_type] = sortedOptions;

                    // we're trying to have array of arrays in the url the way flipkart does
                    // filters[]=encodeURI(size[]=small)&filters[]=encodeURI(size[]=large)
                    sortedOptions.forEach((filter_val) => {
                        query_builder.append(
                            'filters[]',
                            encodeURI(`${filter_type}[]=${filter_val}`)
                        );
                    });
                }
            });

        let filters_qs = query_builder.toString();

        if( filters_qs.length ) {
            filters_qs = '?'+filters_qs;
        }

        filters_qs = encodeURI(filters_qs);

        if( filters_qs !== state.filters_qs ) {
            history.push(
                history.location.pathname + filters_qs
            );
    
            dispatch({ type: 'SET_FILTERS', payload: {filters, filters_qs} });
        }
    };

    return (
        <ProductContext.Provider value={{
            ...state,
            search: history.location.search,
            refreshWithFilters
        }}>
            {children}
        </ProductContext.Provider>
    );
}