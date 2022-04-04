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
    return axios({ url, method, data, validateStatus: false })
}

test('Should get books', async function () {
    const book1 = await booksService.saveBook(createBook())
    const book2 = await booksService.saveBook(createBook())
    const book3 = await booksService.saveBook(createBook())
    const response = await request('http://localhost:3000/books', 'get')
    expect(response.status).toBe(200)
    const books = response.data
    expect(books).toHaveLength(3)
    await booksService.deleteBook(book1.id)
    await booksService.deleteBook(book2.id)
    await booksService.deleteBook(book3.id)
})

test('Should save books', async function () {
    const data = createBook()
    const response = await request('http://localhost:3000/books', 'post', data)
    expect(response.status).toBe(201)
    const book = response.data
    expect(book.title).toBe(data.title)
    expect(book.sinopse).toBe(data.sinopse)
    await booksService.deleteBook(book.id)
})

test('Should not save books', async function () {
    const data = createBook()
    const response1 = await request('http://localhost:3000/books', 'post', data)
    const response2 = await request('http://localhost:3000/books', 'post', data)
    expect(response2.status).toBe(409)
    const book = response1.data
    await booksService.deleteBook(book.id)
})

test('Should update a book', async function () {
    const book = await booksService.saveBook(createBook())
    book.title = faker.animal.type(),
    book.sinopse = faker.lorem.paragraph(),
    book.author = faker.name.findName(),
    book.ano_pub = faker.date.past()
    const response = await request(`http://localhost:3000/books/${book.id}`, 'put', book)
    expect(response.status).toBe(204)
    const updatedBook = await booksService.getBook(book.id)
    expect(updatedBook.title).toBe(book.title)
    expect(updatedBook.sinopse).toBe(book.sinopse)
    await booksService.deleteBook(book.id)
})

test('Should not update a book', async function () {
    const book = {
        id: 1
    }
    const response = await request(`http://localhost:3000/books/${book.id}`, 'put', book)
    expect(response.status).toBe(404)
})

test('Should delete a book', async function () {
    const book = await booksService.saveBook(createBook())
    const response = await request(`http://localhost:3000/books/${book.id}`, 'delete')
    expect(response.status).toBe(204)
    const books = await booksService.getBooks()
    expect(books).toHaveLength(0)
})