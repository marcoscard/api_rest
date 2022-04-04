const axios = require('axios')
const booksService = require('../service/Books')
const { faker } = require('@faker-js/faker')

const createBook = function () {
    return book = {
    title: faker.commerce.product(),
    sinopse: faker.lorem.paragraph(),
    author: faker.name.findName(),
    ano_pub: faker.date.past()
    }
}

const request = function (url, method, data) {
    return axios({ url, method, data })
}

test('Should get books', async function () {
    const book1 = await booksService.saveBook(createBook())
    const book2 = await booksService.saveBook(createBook())
    const book3 = await booksService.saveBook(createBook())
    const response = await request('http://localhost:3000/books', 'get')
    const books = response.data
    expect(books).toHaveLength(3)
    await booksService.deleteBook(book1.id)
    await booksService.deleteBook(book2.id)
    await booksService.deleteBook(book3.id)
})

test('Should save books', async function () {
    const data = createBook()
    const response = await request('http://localhost:3000/books', 'post', data)
    const book = response.data
    expect(book.title).toBe(data.title)
    expect(book.sinopse).toBe(data.sinopse)
    await booksService.deleteBook(book.id)
})

test.only('Should update a books', async function () {
    const book = await booksService.saveBook(createBook())
    book = {
        title: faker.animal.type(),
        sinopse: faker.lorem.paragraph(),
        author: faker.name.findName(),
        ano_pub: faker.date.past()
    }
    await request(`http://localhost:3000/books${book.id}`, 'put', book)
    const updatedBook = await booksService.getBooks(book.id)
    expect(updatedBook.title).toBe(book.title)
    expect(updatedBook.sinopse).toBe(book.sinopse)
    await booksService.deleteBook(book.id)
})