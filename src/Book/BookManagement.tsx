import { useState } from "react"
import Books from "./Books.json"
import BookList from "./BookList"
import Input from "./Input"
import Book from "./Book"
import Search from "./Search"
import "./BookManagement.css"
import { useModal } from 'react-hooks-use-modal'

const BookManagement = () => {
    const [books, setBooks] = useState<Book[]>(Books.book)
    //選択中のレコード数
    const [selectedBooks, setSelectedBooks] = useState(0)
    //削除ボタンの活性・非活性
    const [disableDeleteButton, setDisableDeleteButton] = useState(true)
    //追加ボタンの活性・非活性
    const [disableAddButton, setDisableAddButton] = useState(false)

    //キーの設定
    let keyNumber = books.length + 1
    const setKey = () => {
        if (keyNumber < 10) {
            return "00" + keyNumber
        } else if (keyNumber < 100)
            return "0" + keyNumber
        else {
            return String(keyNumber)
        }
    }

    //レコード追加
    const handleAdd = (title: string, author: string, price: string, detail: string) => {
        setBooks([...books, { key: setKey(), title, author, price, detail, check: false }])
        console.log(books)
    }

    //レコードチェック
    const handleCheck = (book: Book) => {
        const checkBooks = books.map(books => {
            if (books.key === book.key) {
                books.check = !books.check
            }
            return books
        })
        setBooks(checkBooks)

        const select = books.filter(books => books.check).length
        setSelectedBooks(select)
        //レコードが選択されている（されていない）場合、削除ボタンを活性（非活性）、追加ボタンを非活性（活性）にする
        if (select === 0) {
            setDisableDeleteButton(true)
            setDisableAddButton(false)
        } else {
            setDisableDeleteButton(false)
            setDisableAddButton(true)
        }
    }

    //レコード一括チェック
    const handleAllCheck = () => {
        const allCheckBooks = books.map(book => {
            for (book of books) {
                book.check = true
            }
            return book
        })
        setBooks(allCheckBooks)

        const selectAll = books.filter(books => books.check).length
        setSelectedBooks(selectAll)
        //レコードが選択されている（されていない）場合、削除ボタンを活性（非活性）、追加ボタンを非活性（活性）にする
        if (selectAll === 0) {
            setDisableDeleteButton(true)
            setDisableAddButton(false)
        } else {
            setDisableDeleteButton(false)
            setDisableAddButton(true)
        }
    }



    //レコード削除
    const handleDelete = () => {
        const undeletedItems = books.filter(book => !book.check)
        setBooks(undeletedItems)
        //レコードが削除されたら削除ボタンを非活性に
        setDisableDeleteButton(true)
        //レコードが削除されたら追加ボタンを活性に
        setDisableAddButton(false)
        //0個選択
        setSelectedBooks(0)
    }

    //モーダルの表示
    const [Modal, open, close, isOpen] = useModal("modal", {
        preventScroll: true,
        focusTrapOptions: {
            clickOutsideDeactivates: false
        },
    });
    //モーダルを閉じる
    const closeModal = () => {
        close();
    }

    return (
        <>
            <div className="BookList">
                <header>
                    <div>
                        <h3>書籍管理</h3>
                        <Search setBooks={setBooks} setSelectedBooks={setSelectedBooks} />
                        <button className={disableAddButton ? "add-button-true" : "add-button-false"} disabled={disableAddButton} onClick={open}>追加</button>
                        <button className={disableDeleteButton ? "delete-button-true" : "delete-button-false"} disabled={disableDeleteButton} onClick={handleDelete}>削除</button>
                    </div>
                </header>

                <table align="center" >
                    <tbody>
                        <tr>
                            <th>{selectedBooks != 0 ? <span>{selectedBooks}個選択中</span> : <span>一括選択<input type="checkbox" className="check" onChange={handleAllCheck} /></span>}</th>
                            <th>タイトル</th>
                            <th>著者</th>
                            <th>値段</th>
                            <th>詳細</th>
                        </tr>

                        {books.map(book => (
                            <BookList books={book} onCheck={handleCheck} key={book.key} />
                        ))}
                    </tbody>
                </table>

                <div id="modal">
                    <Modal>
                        <div className="showModal">
                            <span>ー 書籍の追加 ー</span>
                            <Input onAdd={handleAdd} closeModal={closeModal} />
                            <span className="batsu" onClick={close}></span>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default BookManagement