import { Typography, IconButton } from '@mui/material';
import { useState, useEffect, setState } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

const WordPlayer = ({ word, lang }) => {
  const debug = true;
  const baseUrl = 'https://testcalst.hf.ntnu.no';
  const [url, setUrl] = useState('');
  const [play, setPlay] = useState(false);
  const [audio, setAudio] = useState(new Audio(null));

  useEffect(() => {
    if (word) {
      let mp3Url;
      if (!debug) {
        fetch(`${baseUrl}/api/v1/search?text=${word}&l2=3`).then((c) => {
          console.log(c);
        });
      } else {
        mp3Url = `${process.env.PUBLIC_URL}/assets/${word}.mp3`;
      }
      setUrl(mp3Url);
      console.log(mp3Url);
      setAudio(new Audio(mp3Url));
    }
  }, []);

  const togglePlay = () => {
    audio.currentTime = 0;
    audio.play();
  };

  return (
    <div>
      <Typography>
        <IconButton aria-label="play" color="primary" onClick={() => togglePlay()}>
          <PlayCircleIcon />
        </IconButton>
        {word}
      </Typography>
    </div>
  );
};

export default WordPlayer;
