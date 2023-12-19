// components/AddSongModal.js
import React, { useState } from 'react';
import './index.css';

function AddSongModal({ isOpen, onClose , Addsong }) {
  const [songName, setSongName] = useState('');
  const [songLink, setSongLink] = useState('');
  const [songSource, setSongSource] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  if (!isOpen) {
    return null;
  }
  function getTodayDate() {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    let year = today.getFullYear();

    return day + '/' + month + '/' + year;
}
const urlCreate=(file)=>{
let url= URL.createObjectURL(thumbnail)
return url.slice(5)
}

  const handleSubmit = (e) => {
    e.preventDefault();
    let data={
        title:songName,
        source:songSource,
        thumbnail:URL.createObjectURL(thumbnail),
        songLink,
        addedOn:getTodayDate()
    }
    console.log({data})
    
    Addsong(data)
    // Here you would handle the submission of the song data
    console.log(songName, songLink, songSource, thumbnail);
    onClose(); 
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Song</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Song Name
            <input className='add-song-input' type="text" value={songName} onChange={e => setSongName(e.target.value)} />
          </label>
          <label>
            Song Link
            <input  className='add-song-input' type="text" value={songLink} onChange={e => setSongLink(e.target.value)} />
          </label>
          <label>
            Song Source
            <input  className='add-song-input' type="text" value={songSource} onChange={e => setSongSource(e.target.value)} />
          </label>
          <label>
            Click to Upload Profile Thumbnail
            <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
          </label>
          <p>Image has to be of aspect ratio 1:1 with a size of 3000 pixels x 3000 pixels</p>
          <div className="modal-footer">
            <button type="button" className='add-song-cancel' onClick={onClose}>Cancel</button>
            <button type="submit" className='add-song-submit'>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSongModal;
