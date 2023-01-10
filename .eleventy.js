module.exports = function (config) {
    const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

    config.addPlugin(eleventyNavigationPlugin);

    const sortByOrder = require('./src/_utils/sort-by-order.js');

    // Returns portfolio items, sorted by display order
    config.addCollection('portfolio', collection => {
        return sortByOrder(collection.getFilteredByGlob('./src/portfolio/*.md'))
    });

    // Set markdown footnote processor
    const markdownIt = require("markdown-it");
    const markdownItFootnote = require("markdown-it-footnote");

    let markdownOptions = {
        html: true, // Enable HTML tags in source
        linkify: true // Autoconvert URL-like text to links
    };

    // Configure the library with options
    const markdownLib = markdownIt(markdownOptions).use(markdownItFootnote);
    // Set the library to process Markdown files
    config.setLibrary("md", markdownLib);

    return {
        dir: {
            input: 'src',
            output: '_site'
        }
    };
};
