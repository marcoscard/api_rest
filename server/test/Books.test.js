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

test('Should get books', async function () {
    const book1 = await booksService.saveBook(createBook())
    const book2 = await booksService.saveBook(createBook())
    const book3 = await booksService.saveBook(createBook())
    const response = await axios({
        url: 'http://localhost:3000/books',
        method: 'get'
    })
    const books = response.data
    expect(books).toHaveLength(3)
    await booksService.deleteBook(book1.id)
    await booksService.deleteBook(book2.id)
    await booksService.deleteBook(book3.id)
})