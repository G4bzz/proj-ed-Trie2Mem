import React, { useState } from 'react';
import Sound from 'react-sound';
import bgSound from './musica.mp3';

const Musica = ({
    handleSongLoading,
    handleSongPlaying,
    handleSongFinishedPlaying
}
) => {
    const [playMusic, setPlayMusic] = useState(false);
    const [playColor, setPlayColor] = useState('#fff');
    let timer = 0;

    if (playMusic===true){
        timer = Math.floor(Math.random() * 5000000); //pega uma posição aleatória da música
    }
    //componente que renderiza o botão de play music junto com o plugin react-sound
    return (
        <>
            <Sound
                url={bgSound}
                playStatus={playMusic === false? Sound.status.STOPPED : Sound.status.PLAYING}
                loop={true}
                volume={50}
                playFromPosition={timer}
                onLoading={handleSongLoading}
                onPlaying= {handleSongPlaying}
                onFinishedPlaying={handleSongFinishedPlaying}
            />
            <div className='botaoPlay'>
                <button onClick={() => {
                    setPlayMusic(!playMusic);
                    playColor === '#fff' ? setPlayColor('#274472') : setPlayColor('#fff')
                }} style={{color: playColor}}>▶</button>
            </div>
        </>
    )
}

export default Musica