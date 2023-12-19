import React, { useState } from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
  updateAuthenication,
  updateToken,
  updateUserData,
} from "../../store/slices/preLoginSlice";
import AddSongModal from "../AddSong";
import { SidebarListing, Svgs } from "./constants";
function Song({ title, source, addedOn, thumbnail, selectSong }) {
  return (
    <div className="song">
      <div className="thumbnail">
        <img src={thumbnail} width="100%" height="100%" />
      </div>
      <div className="title">{title}</div>
      <div className="source">{source}</div>
      <div className="addedOn">{addedOn}</div>
      <div className="playButton" onClick={selectSong}>
       {Svgs("player")}
      </div>
      <div className="delete">
       {Svgs("delete")}
      </div>
    </div>
  );
}
const SongList = () => {
  const dispatch = useDispatch();
  const [songs, setSongs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState({});
  const [selectedIndex,setIndex]=useState(0)
  const Logout = () => {
    dispatch(updateAuthenication(false));
    dispatch(updateToken(""));
    dispatch(updateUserData({}));
  };
  const Addsong = (song) => {
    setSongs([...songs, song]);
  };
  const SetSelectedSong=(song,index)=>{
    setSelectedSong(song)
    setIndex(index)
  }
  const handleClickNext=()=>{
    if (selectedIndex<songs.length-1) {
        SetSelectedSong(songs[selectedIndex+1],selectedIndex+1)
    }
  }
  const  handleClickPrevious=()=>{
    if (selectedIndex>0) {
        SetSelectedSong(songs[selectedIndex-1],selectedIndex-1)
    }
  }

  return (
    <>
      <AddSongModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        Addsong={Addsong}
      />
      <div className="song-container">
        <header>
          <nav>
            <div>
              First-level Menu / Second-level Menu / Current Page
              <h4>Songs</h4>
            </div>
            <div>
              <button className="add-song" onClick={() => setModalOpen(true)}>
                Add Song
              </button>
            </div>
          </nav>
        </header>
        <aside>
          <h1 className="sidebar-heading">Logo</h1>
          <div className="sidebar-listing">
           {Array.isArray(SidebarListing) && SidebarListing.length>0 && SidebarListing.map((item)=>( <div className="sidebar-listing-each">
             {Svgs(item?.icon)}
             {item?.title}
            </div>))}
          </div>
          <div className="logout-button" onClick={Logout}>
           {Svgs('logout')}
            Logout
          </div>
        </aside>
        <div className="songList">
          {Array.isArray(songs) && songs.length > 0
            ? songs.map((song, index) => (
                <Song
                  key={index}
                  title={song.title}
                  source={song.source}
                  addedOn={song.addedOn}
                  thumbnail={song?.thumbnail}
                  selectSong={() => SetSelectedSong(song,index)}
                />
              ))
            : "No Songs "}
        </div>
        <div className="player">
            {console.log({selectedSong})}
          {selectedSong?.source && (
            <AudioPlayer
              autoPlay
              src={selectedSong?.songLink}
              onPlay={(e) => console.log("onPlay")}
              header={<h4>{selectedSong?.title}</h4>}
              layout="horizontal"
              onClickNext={handleClickNext}
              onClickPrevious={handleClickPrevious}
              crossOrigin="anonymous"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SongList;
