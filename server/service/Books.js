const booksData = require('../data/Books')

exports.getBooks = function () {
    return booksData.getBooks()
}