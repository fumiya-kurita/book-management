import Book from "./Book"
import "./BookList.css"
import { useState } from "react"

type Props = {
    books: Book
    onCheck: (books: Book) => void
}

const Input = ({ books, onCheck }: Props) => {

    const [displayDetail, setDisplayDetail] = useState(false)
    const check = () => {
        onCheck(books)
    }



    return (
        <>
            <tr className={books.check ? "check-books" : "click"} onChange={check} >
                <td><input type="checkbox" className="check" /></td>
                <td >{books.title}</td>
                <td >{books.author}</td>
                <td >{books.price}</td>
                <td>
                    <a className={displayDetail ? "arrow_up" : "arrow_down"} onClick={
                        () => {
                            if (displayDetail === true) {
                                setDisplayDetail(false)
                            } else {
                                setDisplayDetail(true)
                            }
                        }} />
                    {displayDetail ? <div>{books.detail}</div> : ""}
                </td>
            </tr >
        </>
    )
}
export default Input