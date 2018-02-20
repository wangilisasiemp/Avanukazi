var express=require('express');
var router=express.Router();

//require all controller modules
var book_controller=require('../controllers/bookController');
var genre_controller=require('../controllers/genreController');
var bookinstance_controller=require('../controllers/bookinstanceController');
var author_controller=require('../controllers/authorController');

///BOOK ROUTES ///

//GET catalog home page
router.get('/',book_controller.index);

//GET request for creating a book. Note : this must come before routes that display book(uses id)
router.get('/book/create',book_controller.book_create_get);

//POST Request for creating a book
router.post('/book/create',book_controller.book_create_post);

//GET Request to delete a book
router.get('/book/:/id/delete',book_controller.book_delete_get);

//POST request to delete a book
router.post('/book/:id/delete',book_controller.book_delete_post);

//GET request to update a book
router.get('/book/:id/update',book_controller.book_update_get);

//POST request to update a book
router.post('/book/:id/update',book_controller.book_update_post);

//GET request for one book
router.get('/book/:id',book_controller.book_detail);

//GET Request for all books
router.get('/books',book_controller.book_list);



///AUTHOR ROUTES///


//GET request for creating an author : note: this must come before route for id(i.e. diplay author)
router.get('/author/create',author_controller.author_create_get);

//POST request for creating an author
router.post('/author/create',author_controller.author_create_post);

//GET Request for deleting an author
router.get('/author/:id/delete',author_controller.author_delete_get);

//POST Request for deleting an author
router.post('/author/:id/delete',author_controller.author_delete_post);

//GET Request for updating an author
router.get('/author/:id/update',author_controller.author_update_get);

//POST Request for updating an author
router.post('/author/:id/update',author_controller.author_update_post);

//Get request for an author
router.get('/author/:id',author_controller.authorDetail);

//Get request for a list of all the authors
router.get('/authors',author_controller.authorList);

///GENRE ROUTES ///

//Get request to create a genre
router.get('/genre/create',genre_controller.genre_create_get);

//POST request to create a genre
router.post('/genre/create',genre_controller.genre_create_post);

//GET request to delete a genre
router.get('/genre/:id/delete',genre_controller.genre_delete_get);

//POST request to delete a genre
router.post('/genre/:id/delete',genre_controller.genre_delete_post);

//GET request to update a genre
router.get('/genre/:id/update',genre_controller.genre_update_get);

//POST request to update a genre
router.post('/genre/:id/update',genre_controller.genre_update_post);

//GET request to display a specific genre
router.get('/genre/:id',genre_controller.genre_detail);

//GET request to display all genres
router.get('/genres',genre_controller.genres_list);

///BOOKINSTANCE ROUTES///

//GET request to create a bookinstance Note : this must come before routes that display book instance
router.get('/bookinstance/create',bookinstance_controller.bookinstance_create_get);

//POST request to create a bookinstance 
router.post('/bookinstance/create',bookinstance_controller.bookinstance_create_post);

//GET request to delete a bookinstance
router.get('/bookinstance/:id/delete',bookinstance_controller.bookinstance_delete_get);

//POST request to delete a book instance
router.post('/bookinstance/:id/delete',bookinstance_controller.bookinstance_delete_post);

//GET request to update a bookinstance
router.get('/bookinstance/:id/update',bookinstance_controller.bookinstance_update_get);

//POST request to update a bookinstance 
router.post('/bookinstance/:id/update',bookinstance_controller.bookinstance_update_post);

//Get request to display a book instance detail
router.get('/bookinstance/:id',bookinstance_controller.bookinstance_Detail);

//Get request to display a list of all book instances
router.get('/bookinstances',bookinstance_controller.bookinstance_List);

module.exports=router;

