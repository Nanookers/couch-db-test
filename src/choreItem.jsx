import React from 'react'
import axios from 'axios'

export const ChoreItem = ( { chore, choreId }) => {

    const updateInfo = (event) => {
        const url = `http://localhost:5984/enlift/${choreId}`
        
        const options = {
            auth: {
              username: 'admin',
              password: 'Password'
            }
        };

        axios.get(url, options)
        .then(response => {
          const data = response.data;
          data.chore = 'done';
          axios.put(url, data, { ...options, params: { rev: data._rev } })
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error('error:', error.response.data);
            });
        })
        .catch(error => {
          console.error('error:', error.response.data);
        });
    }

    const deleteInfo = () => {

        const url = `http://localhost:5984/enlift/${choreId}`

        const options = {
            auth: {
              username: 'admin',
              password: 'Merlin92(('
            }
        };
        
        axios.get(url, options)
        .then(response => {
          const rev = response.data._rev;
    
          axios.delete(url, { ...options, params: { rev } })
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error('error:', error.response.data);
            });
        })
        .catch(error => {
          console.error('error:', error.response.data);
        });
    }

    const getRevisions = (event) => {
        event.preventDefault()
        // Grabs the rev info for the specific object. So this just shows the past revisions and if the are active.
        // const url = 'http://localhost:5984/enlift/abe7f1376527327b671172fd2800b2d6?revs_info=true';
        const url = 'http://localhost:5984/enlift/abe7f1376527327b671172fd2800b2d6?rev=1-9650436d57e5bc66dd9d7317baf9765e'

        const options = {
            auth: {
              username: 'admin',
              password: 'Merlin92(('
            }
        };
        axios.get( url, options )
        .then(response => {
          // Set the documents state to the response data
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    }


    return (
        <>
            <div key={choreId} className="thisSelection">
                <li key={choreId}>{chore}</li>
                <button onClick={updateInfo} >Edit</button>
                <button onClick={deleteInfo} >Delete</button>
                <button onClick={getRevisions} >Revisions</button>
            </div>
        </>
  )
}
