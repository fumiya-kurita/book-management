import React, { useState, useEffect, ReactEventHandler } from "react";
import Book from "./Book"
import Books from "./Books.json"
import "./Search.css"

type Props = {
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>
    setSelectedBooks: React.Dispatch<React.SetStateAction<number>>
}

const Search = ({ setBooks, setSelectedBooks }: Props) => {
    const books = Books.book
    const [inputValue, setInputValue] = useState("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const search = () => {
        //入力がない場合、すべて表示する
        if (inputValue === "") {
            return setBooks(books)
        }
        console.log(inputValue)

        //検索（小文字、大文字関係ない）
        const searchedBooks = books.filter(book =>
            book.title.toUpperCase().includes(inputValue.toUpperCase())
        )
        console.log(searchedBooks)

        setSelectedBooks(0)
        setBooks(searchedBooks)
    }

    return (
        <>
            <span className="search">書籍検索</span>
            <input
                className="search-books"
                type="text"
                placeholder="search books"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button className="search-button" onClick={search}>検索</button>
        </>
    )
}

export default Search