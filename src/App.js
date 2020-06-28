import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './components/BookList'
import SearchBook from './components/SearchBook'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount = () => {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books: books });
      })
  }

  changeShelf = (book, shelf) => {
    if (shelf === 'none') {
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id)
      }))
    } else {
      book.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id).concat(book)
      }))
    }
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookList
              books={this.state.books}
              changeShelf={this.changeShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBook
              books={this.state.books}
              changeShelf={this.changeShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
