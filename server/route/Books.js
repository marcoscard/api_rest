const express = require('express')
const router = express.Router()
const booksService = require('../service/Books')

router.get('/books', async function (req, res){
    const books = await booksService.getBooks()
    res.json(books)
})
router.get('/books/:id', async function (req, res){

})
router.post('/books', async function (req, res){

})
router.put('/books/:id', async function (req, res){

})
router.delete('/books/:id', async function (req, res){

})

module.exports = router