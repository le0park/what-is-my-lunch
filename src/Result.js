import React, {Fragment, useMemo} from 'react';
import foods from './static/foods.json'

/**
 *
 * @param {object[]} filters
 * @param {string} filters.type
 * @param {number} filters.score
 * @returns {JSX.Element}
 * @constructor
 */
const Result = ({ filters = []}) => {
    const result = useMemo(() => {
        let result = foods;
        filters.forEach(
            ({ type, score }) => result = result.filter(answer => answer.scores[type] === score));

        return result;
    } ,[filters]);

    return (result.map(r => (
        <Fragment key={r.name}>
            {r.name} / {r.recommends?.map(f => <>{f.name} </>)} <br />
        </Fragment>
    )));
};

export default Result;
