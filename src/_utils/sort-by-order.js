/**
 * Takes a collection and returns it back in ascending order
 *
 * @param {Array} collection The 11ty collection
 * @returns {Array} the sorted collection
 */
module.exports = collection =>
    collection.sort((a, b) =>
        a.data.order > b.data.order ? 1 : -1
    );
