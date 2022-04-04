const database = require('../infra/database')

exports.getBooks = function () {
    return database.query('select * from shelf.books')
}

exports.saveBook = function (book) {
    return database.one('insert into shelf.books (title, sinopse, author, ano_pub) values ($1, $2, $3, $4) returning *', [book.title, book.sinopse, book.author, book.ano_pub])
}

exports.deleteBook = function (id) {
    return database.none('delete from shelf.books where id = $1', [id])
}