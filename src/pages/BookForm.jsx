import { useState } from "react"
// import useNavigate
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'

function BookForm() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [pages, setPages] = useState("")
  const {id} = useParams()
  const { bookstores, updateBookstore } = useOutletContext()
  // call useNavigate hook to get navigate function 
  const navigate = useNavigate()

  const bookstore = bookstores.find(store => store.id === id)
  
  if (!bookstore) { return <h2>Bookstore not found.</h2>}


  const handleSubmit = (e) => {
    e.preventDefault()
    const newBook = { 
        id: uuidv4(),
        title, 
        author, 
        pages: parseInt(pages) 
    }
    console.log(newBook)
    fetch(`http://localhost:4000/bookstores${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({books: [...bookstore.books, newBook]})
    })
    .then(r => {
        if (!r.ok) { throw new Error("failed to add book") }
        return r.json()
    })
    .then(updatedBookstore => {
        updateBookstore(updatedBookstore)
        // navigate to new book page
        navigate(`/bookstores${id}/books${newBook.id}`)
    })
    .catch(console.log)
  }

  return (
    <div>
      <h2>Add New Book 📚</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  )
}

export default BookForm