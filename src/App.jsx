import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import { ChoreItem } from './choreItem'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [chore, setChore] = useState('')
  const [choreList, setChoreLIst] = useState([])

  useEffect(() => {
    // inlude_docs=true grabs all docs and containers, otherwise it will only grab 
    const url = 'http://localhost:5984/enlift/_all_docs?include_docs=true';
    const options = {
      auth: {
        username: 'admin',
        password: 'Password'
      }
    };
    axios.get( url, options )
      .then(response => {
        // Set the documents state to the response data
        setChoreLIst(response.data.rows)
      })
      .catch(error => {
        console.error('Error:', error.response.data);
      });
  }, []);
  console.log(choreList);
  const handleSubmit = (event) => {
    event.preventDefault()
    // URL
    const url = 'http://localhost:5984/enlift/'
    // Sending input
    const data = {
      chore: chore
    };
    // authorization
    const options = {
      auth: {
        username: 'admin',
        password: 'Password'
      }
    };
    // Posting to DB
    axios.post( url, data, options )
    .then(response => {
      // Set the documents state to the response data
      
    })
    .catch(error => {
      console.error('Error:', error.response.data);
    });
  }

  console.log(choreList);
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <h1>Create a new document</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={chore}
            onChange={event => setChore(event.target.value)}
          />
        </label>
        <button type="submit">Create</button>
      </form>
      <ul>
        {
          choreList.map((chore) => (
            <ChoreItem key={chore.id} choreId ={ chore.id } revision={chore.value.rev} chore={chore.doc.chore} />
          ))
        }
      </ul>
    </div>
  )
}

export default App
