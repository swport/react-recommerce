import React, { useContext, useState } from 'react';
import axios from '../../utils/axios';
import { useInfiniteQuery, useQuery } from 'react-query';
import ProductListItem from '../../components/ProductListItem';
import Loader from '../../components/Loader';
import { CartContext } from '../../context/CartContext';
import { ProductContext } from '../../context/ProductContext';
import { useHistory } from 'react-router';

export default function ProductListing() {

    const history = useHistory();

    const {
        addItem,
        itemQtyDecrease,
        items: cartItems
    } = useContext(CartContext);

    const {
        filters: defaultFilters,
        filters_qs,
        refreshWithFilters
    } = useContext(ProductContext);

    // selected filters
    const [selectedFilters, setSelectedFilters] = useState(defaultFilters);

    // type_id: some type like Brand
    // option_id: some option like Hats
    const onChangeFilter = (item) => {
        const filter_type_id = item.getAttribute('data-filter_type');
        const option_id      = item.getAttribute('data-option_id');

        setSelectedFilters({
            ...selectedFilters,
            [filter_type_id]: selectedFilters[filter_type_id]
                ? item.checked
                    ? [...selectedFilters[filter_type_id], option_id]
                    : selectedFilters[filter_type_id].filter(el => el !== option_id)
                : item.checked
                    ? [option_id]
                    : []
        });
    };

    const onFilter = () => {
        refreshWithFilters(selectedFilters);
    };

    // load items
    const {
        status,
        data,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(
        ['shop-page-listing', filters_qs],
        async ({ pageParam = 1, queryKey }) => {
            const { data } = await axios.get(
                `/api/products/hats?page=${pageParam}${queryKey[1] ? `&${queryKey[1]}` : ''}`
            );
            return data;
        },
        {
            getPreviousPageParam: data => data.pagination.prevPage ?? false,
            getNextPageParam: data => data.pagination.nextPage ?? false
        }
    );

    // load filters
    const {
        data: filters,
        isError: filterFetchError,
        isLoading: filtersLoading
    } = useQuery('shop-filters-hat', async () => {
        try {
            const { data } = await axios.get('/api/filters/hats');
            return data;
        } catch (err) {
            console.log("err: ", err);
        }
    });

    return (
        <>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-9">
                    <h2 className="fw-bold offset-1 offset-md-0">
                        Products
                    </h2>
                </div>
            </div>
            <div className="row">

                <div className="col-md-3">

                    <a className="navbar-light offset-1 offset-md-0 d-block d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        <span className="ms-2">Fitler</span>
                    </a>

                    <div style={{top:'70px'}} className="d-none d-md-block sticky-top">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="fw-bold">Filters</h4>
                            <button onClick={onFilter} className="btn btn-sm btn-primary fw-bold">
                                Filter
                            </button>
                        </div>
                        {filtersLoading ? (
                            <Loader />
                        ) :
                            filters.map(({id, name, options}) => (
                                <div key={id} className="mt-2 card">
                                    <div className="card-header">
                                        {name}
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            {options.map((option) => (
                                                <li key={option.id} className="list-group-item">
                                                    <input
                                                        id={`filter_${id}_${option.id}`}
                                                        data-filter_type={id}
                                                        data-option_id={option.id}
                                                        type="checkbox"
                                                        onChange={(e) => onChangeFilter(e.target)}
                                                    />
                                                    <label htmlFor={`filter_${id}_${option.id}`} className="ms-2">{option.title}</label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>))
                        }
                    </div>
                </div>

                <div className="col-md-9">
                    <div className="row clearfix">
                        {status === 'loading' ? (
                            <Loader />
                        ) : status === 'error' ? (
                            <h3>There was an error loading content :/</h3>
                        ) : (
                            data.pages.map(({ items, pagination }) => (
                                <React.Fragment key={pagination.nextPage}>
                                    {items.map(product => (
                                        <div key={product.id} className="col-10 offset-1 col-sm-8 offset-sm-2 offset-md-0 col-md-6 col-lg-4 d-flex">
                                            <ProductListItem
                                                key={product.id}
                                                product={product}
                                                items={cartItems}
                                                addItem={addItem}
                                                itemQtyDecrease={itemQtyDecrease} />
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))
                        )}
                    </div>
                    <button
                            disabled={!hasNextPage || isFetchingNextPage}
                            onClick={() => fetchNextPage()}
                            className="mt-4 offset-1 offset-sm-2 offset-md-0 fw-bold btn btn-primary btn-md"
                        >
                        {isFetchingNextPage
                            ? 'Loading...'
                            : hasNextPage
                            ? 'Load more'
                            : 'That is all we got ;)'}
                    </button>
                </div>

            </div>
        </>
    );
}