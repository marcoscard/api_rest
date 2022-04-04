const { func } = require('../infra/database')
const database = require('../infra/database')

exports.getBooks = function () {
    return database.query('select * from shelf.books')
}

exports.getBook = function (id) {
    return database.oneOrNone('select * from shelf.books where id = $1', [id])
}

exports.getBookByTitle = function (title) {
    return database.oneOrNone('select * from shelf.books where title = $1', [title])
}

exports.saveBook = function (book) {
    return database.one('insert into shelf.books (title, sinopse, author, ano_pub) values ($1, $2, $3, $4) returning *', [book.title, book.sinopse, book.author, book.ano_pub])
}

exports.deleteBook = function (id) {
    return database.none('delete from shelf.books where id = $1', [id])
}

exports.updateBook = function (id, book) {
    return database.none('update shelf.books set title = $1, sinopse = $2, author = $3, ano_pub = $4 where id = $5', [book.title, book.sinopse, book.author, book.ano_pub, book.id])
}