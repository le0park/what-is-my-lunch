import React, {useMemo} from 'react';
import foods from './static/foods.json'
import restaurants from './static/restaurants.json';
import {TYPE_FOOD, TYPE_RESTAURANT} from "./variables";
import Button from "react-bootstrap/Button";

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
                    <div key={r.name} className="d-grid gap-2">
                        <a href={`https://map.naver.com/v5/search/${r.name}`} target="_blank" >
                            <Button variant="outline-primary" className="w-100">{r.name}</Button>
                        </a> <br />
                    </div>
                ))
            );
        }
        case TYPE_RESTAURANT: {
            return (
                result.map(r => (
                    <div key={r.name} className="d-flex flex-column">
                        <a href={`https://map.naver.com/v5/search/${r.name}`} target="_blank">
                            <Button variant="outline-primary" className="w-100">
                                {r.name}<br/>
                                {r.recommends?.map(f => <>{f.name} </>)}
                            </Button>
                            <br />
                        </a> <br />
                    </div>
                ))
            );
        }
        default:
            return <></>;
    }
};

export default Result;
