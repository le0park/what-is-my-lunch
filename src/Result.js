import React, {Fragment, useMemo} from 'react';
import foods from './static/foods.json'
import restaurants from './static/restaurants.json';
import {TYPE_FOOD, TYPE_RESTAURANT} from "./variables";

/**
 *
 * @param {string} type
 * @param {object[]} filters
 * @param {string} filters.type
 * @param {number} filters.score
 * @returns {JSX.Element}
 * @constructor
 */
const Result = ({ type, filters = []}) => {
    const data = useMemo(() => {
        if (type === TYPE_FOOD) {
            return foods;
        } else if (type === TYPE_RESTAURANT) {
            return restaurants;
        } else {
            return [];
        }
    }, [type]);

    const result = useMemo(() => {
        let result = data;
        filters.forEach(
            ({ type, score }) => result = result.filter(answer => answer.scores[type] === score));

        return result;
    } ,[data, filters]);

    switch(type) {
        case TYPE_FOOD: {
            return (
                result.map(r => (
                    <Fragment key={r.name}>
                        <a href={`https://map.naver.com/v5/search/${r.name}`} target="_blank">
                            {r.name}
                        </a> <br />
                    </Fragment>
                ))
            );
        }
        case TYPE_RESTAURANT: {
            return (
                result.map(r => (
                    <Fragment key={r.name}>
                        <a href={`https://map.naver.com/v5/search/${r.name}`} target="_blank">
                            {r.name} / {r.recommends?.map(f => <>{f.name} </>)} <br />
                        </a> <br />
                    </Fragment>
                ))
            );
        }
        default:
            return <></>;
    }
};

export default Result;
