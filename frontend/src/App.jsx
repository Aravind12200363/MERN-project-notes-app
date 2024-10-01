// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "./App.css";
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import Fab from '@mui/material/Fab';
// import Zoom from '@mui/material/Zoom';
// import HighlightIcon from '@mui/icons-material/Highlight'; // Correct for MUI v5
//  // Remove this line


// const apiUrl = '/api/notes';
// const App = () => {
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState({ title: '', content: '' });
//   const [error, setError] = useState(null);
//   const [isExpanded, setExpanded] = useState(false);
//   useEffect(() => {
//     fetchNotes();
//   }, []);

  
//   const fetchNotes = async () => {
//     try {
//       const response = await axios.get(apiUrl);
//       setNotes(response.data);
//       setError(null);
//     } catch (err) {
//       setError("Failed to fetch notes");
//       console.error(err);
//     }
//   };
  
//   const addNote = async (e) => {
//     e.preventDefault();
//     const requestBody = {
//       title: newNote.title,
//       content: newNote.content,
//     };
  
//     try {
//       const response = await axios.post(apiUrl, requestBody);
//       setNotes([...notes, response.data]);
//       setNewNote({ title: "", content: "" });
//       setError(null);
//     } catch (err) {
//       setError("Failed to add note");
//       console.error(err);
//     }
//   };
  
//   const deleteNote = async (id) => {
//     try {
//       await axios.delete(`${apiUrl}/${id}`);
//       setNotes(notes.filter((note) => note._id !== id));
//       setError(null);
//     } catch (err) {
//       setError("Failed to delete note");
//       console.error(err);
//     }
//   };
  
  
//     const [dateTime, setDateTime] = useState(new Date());
  
//     useEffect(() => {
//       const timer = setInterval(() => {
//         setDateTime(new Date());
//       }, 1000); // Update every second
  
//       return () => clearInterval(timer); // Cleanup the interval on component unmount
//     }, []);
//   function expand() {
//     setExpanded(true);
//   }
  
//   return (
//     <div>

//       <header>
//         <h1> 
//           <HighlightIcon/>
//           Todo List
//           </h1>
//           </header>
//       <form  className="create-note">
//        {isExpanded && ( 
//           <input
//           value={newNote.title}
//           onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
//           placeholder="Title"
//         />
//         )}
//         <textarea
//           value={newNote.content}
//           onClick={expand}
//           onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
//           placeholder="Take a note"
//           rows={isExpanded ? 3 : 1}
//         ></textarea>
//          <Zoom in={isExpanded}>
//           <Fab onClick={addNote}>
//             <AddIcon />
//           </Fab>
//         </Zoom>
//         {/* <Fab onClick="submit"><AddIcon /></Fab> */}
//       </form>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
    
//       <ul>
//         {notes.map((note) => (
//           <div className='note'>
//           {/* <li  key={note._id}> */}
//             <h3>{note.title}</h3>
//             <p>{note.content}</p>
//             <button onClick={() => deleteNote(note._id)}><DeleteIcon /></button>
//           {/* </li> */}
//           </div>
//         ))}
//       </ul>
//       <footer>
//       <p>Copyright ⓒ {dateTime.toLocaleString()}</p>
//     </footer>
//     </div>
//   );
// };

// export default App;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import HighlightIcon from '@mui/icons-material/Highlight';

const apiUrl = '/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [error, setError] = useState(null);
  const [isExpanded, setExpanded] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(function () {
    fetchNotes();
  }, []);

  useEffect(function () {
    const timer = setInterval(function () {
      setDateTime(new Date());
    }, 1000); // Update every second

    return function () {
      clearInterval(timer); // Cleanup the interval on component unmount
    };
  }, []);

  function fetchNotes() {
    axios
      .get(apiUrl)
      .then(function (response) {
        setNotes(response.data);
        setError(null);
      })
      .catch(function (err) {
        setError("Failed to fetch notes");
        console.error(err);
      });
  }

  function addNote(e) {
    e.preventDefault();

    const requestBody = {
      title: newNote.title,
      content: newNote.content,
    };

    axios
      .post(apiUrl, requestBody)
      .then(function (response) {
        setNotes([...notes, response.data]);
        setNewNote({ title: "", content: "" });
        setError(null);
      })
      .catch(function (err) {
        setError("Failed to add note");
        console.error(err);
      });
  }

  function deleteNote(id) {
    axios
      .delete(`${apiUrl}/${id}`)
      .then(function () {
        setNotes(notes.filter(function (note) {
          return note._id !== id;
        }));
        setError(null);
      })
      .catch(function (err) {
        setError("Failed to delete note");
        console.error(err);
      });
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <header>
        <h1>
          <HighlightIcon />
          Notes App
        </h1>
      </header>

      <form className="create-note">
        {isExpanded && (
          <input
            value={newNote.title}
            onChange={function (e) {
              setNewNote({ ...newNote, title: e.target.value });
            }}
            placeholder="Title"
          />
        )}
        <textarea
          value={newNote.content}
          onClick={expand}
          onChange={function (e) {
            setNewNote({ ...newNote, content: e.target.value });
          }}
          placeholder="Take a note"
          rows={isExpanded ? 3 : 1}
        ></textarea>
        <Zoom in={isExpanded}>
          <Fab onClick={addNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {notes.map(function (note) {
          return (
            <div className='note' key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={function () {
                deleteNote(note._id);
              }}>
                <DeleteIcon />
              </button>
            </div>
          );
        })}
      </ul>

      <footer>
        <p>Copyright ⓒ {dateTime.toLocaleString()}</p>
      </footer>
    </div>
  );
}

export default App;
