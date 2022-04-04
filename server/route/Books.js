const express = require('express')
const router = express.Router()
const booksService = require('../service/Books')

router.get('/books', async function (req, res){
    const books = await booksService.getBooks()
    res.json(books)
})

router.post('/books', async function (req, res){
    const book = req.body
    try {
        const newBook = await booksService.saveBook(book)
        res.status(201).json(newBook)
    } catch (e) {
        res.status(409).send(e.message)
    }
})
router.put('/books/:id', async function (req, res){
    const book = req.body
    try {
        await booksService.updateBook(req.params.id, book)
        res.status(204).end()
    } catch (e) {
        res.status(404).send(e.message)
    }
})

router.delete('/books/:id', async function (req, res){
    await booksService.deleteBook(req.params.id)
    res.status(204).end()
})

module.exports = router