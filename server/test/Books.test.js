const axios = require('axios')
const { response } = require('express')

test('Should get books', async function () {
    const response = await axios({
        url: 'http://localhost:3000/books',
        method: 'get'
    })
    const books = response.data
    expect(books).toHaveLength(3)
    const [firstBook] = books
    expect(firstBook.id).toBe(1)
    expect(firstBook.title).toBe('Livro Métodos')
})