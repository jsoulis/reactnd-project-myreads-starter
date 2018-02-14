import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

class SearchPage extends React.Component {

  state = {
    query: '',
    searchBooks: [],
    oldBooks: []
  }

  updateQuery = (query, books) => {
    this.setState({ query: query.trim() })
    //BooksAPI.search(query).then(stuff => console.log(stuff))
    if(query)
    {
      BooksAPI.search(query).then((searchBooks) => {
        if(!searchBooks || searchBooks.error) {
          this.setState({searchBooks: []})
          this.setState({oldBooks: []})
        }
        else {
          var bookIds = []
          var searchIds = []
          for (var i = 0; i < books.length; i++)
          {
            bookIds[i] = books[i].id;
          }
          for (var i = 0; i < searchBooks.length; i++)
          {
            searchIds[i] = searchBooks[i].id;
          }
          var oldBooks = books.filter((b) => searchIds.includes(b.id))
          searchBooks = searchBooks.filter((b) => !bookIds.includes(b.id))
          this.setState({ searchBooks: searchBooks })
          this.setState({ oldBooks: oldBooks })
        }

      })
    }
  }

  render() {
    const { onUpdateBook, books } = this.props
    const { query, searchBooks, oldBooks } = this.state


    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value, books)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {oldBooks.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select defaultValue={book.shelf} onChange={(event) => onUpdateBook(book, event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
            {searchBooks.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select defaultValue={"none"} onChange={(event) => onUpdateBook(book, event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

    )
  }
}
export default SearchPage
