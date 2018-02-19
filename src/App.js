import React from 'react'
import SearchPage from './SearchPage'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {

/*books will simply be all the books that exist on the page. The books that are not
marked as 'none'. The 'currentlyReading' and 'wantToRead' and 'read' categories will
be controlled as a state in the ListBooks component. Based on that state the books from the
books[] array will render in different headings, but all this code will live in the ListBooks
file*/
    books:[]
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook = (book, shelf) => {


    this.setState((state) => ({
      books: state.books.filter((b) => b.id !== book.id)
    }))

    BooksAPI.update(book, shelf).then(
      BooksAPI.get(book.id).then(book => {

        this.setState((state) => ({
          books: state.books.filter((b) => b.id !== book.id)
        }))

        this.setState(state => ({
          books: state.books.concat([ book ])
        }))
      })
    )

  }

  render() {
    //BooksAPI.getAll().then(stuff => console.log(stuff))
    return (
      <div className="app">
        <div>
        <Route exact path="/" render={() => (
          <div>
            <ListBooks
              showSearchPage={this.state.showSearchPage}
              books={this.state.books}
              onUpdateBook={this.updateBook}/>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
        <Route path="/search" render={() => (
          <SearchPage
            books={this.state.books}
            onUpdateBook={this.updateBook}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
