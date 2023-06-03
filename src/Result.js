import React, {useMemo} from 'react';
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
        filters.forEach(({ type, score }) => result.filter(answer => answer.scores[type] === score));

        return result;
    } ,[filters]);

    console.log(result);

    return (
        <div>
            <h3>기분에 따른 식당 추천 </h3>

            {result.map(r => (
                <>
                    {r.name} / {r.recommends?.map(f => <>{f.name} </>)} <br />
                </>
            ))}
        </div>
    );
};

export default Result;
