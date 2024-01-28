
// piano
     const getFileNamePiano = (index) => {
          return `piano-${index}`;

     }
     const getPianoURL = (index) => {
          return `./audios/grandpiano/${getFileNamePiano(index)}.mp3`;
     }
     let pianoKeys = [];
     for(let i = 0; i < 72; i++){
          const audio = new Audio(getPianoURL(i));
          audio.currentTime = 0;
          audio.volume = 0.4; 
          pianoKeys.push(audio);
     };
     const playPiano = (index) => {
          pianoKeys[index].currentTime = 0;
          pianoKeys[index].play();
     };

// Piano C //
     const getPianoCURL = (index) => {
          return `./audios/grandpiano-C/${getFileNamePiano(index)}.mp3`;
     }
     let pianoCKeys = [];
     for(let i = 0; i < 18; i++){
          const audio = new Audio(getPianoCURL(i));
          audio.currentTime = 0;
          audio.volume = 0.5; 
          pianoCKeys.push(audio);
     };
     const playPianoC = (index) => {
          pianoCKeys[index].currentTime = 0;
          pianoCKeys[index].play();
     };

// Piano D //
     const getPianoDURL = (index) => {
          return `./audios/grandpiano-D/${getFileNamePiano(index)}.mp3`;
     }
     let pianoDKeys = [];
     for(let i = 0; i < 18; i++){
          const audio = new Audio(getPianoDURL(i));
          audio.currentTime = 0;
          audio.volume = 0.5; 
          pianoDKeys.push(audio);
     };
     const playPianoD = (index) => {
          pianoDKeys[index].currentTime = 0;
          pianoDKeys[index].play();
     };

// Piano E //
     const getPianoEURL = (index) => {
          return `./audios/grandpiano-E/${getFileNamePiano(index)}.mp3`;
     }
     let pianoEKeys = [];
     for(let i = 0; i < 18; i++){
          const audio = new Audio(getPianoEURL(i));
          audio.currentTime = 0;
          audio.volume = 0.5; 
          pianoEKeys.push(audio);
     };
     const playPianoE = (index) => {
          pianoEKeys[index].currentTime = 0;
          pianoEKeys[index].play();
     };

// Piano F //
     const getPianoFURL = (index) => {
          return `./audios/grandpiano-F/${getFileNamePiano(index)}.mp3`;
     }
     let pianoFKeys = [];
     for(let i = 0; i < 18; i++){
          const audio = new Audio(getPianoFURL(i));
          audio.currentTime = 0;
          audio.volume = 0.5; 
          pianoFKeys.push(audio);
     };
     const playPianoF = (index) => {
          pianoFKeys[index].currentTime = 0;
          pianoFKeys[index].play();
     };

     // Piano F#m //
     const getPianoFsharpmURL = (index) => {
          return `./audios/grandpiano-Fsharpm/${getFileNamePiano(index)}.mp3`;
     }
     let pianoFsharpmKeys = [];
     for(let i = 0; i < 18; i++){
          const audio = new Audio(getPianoFsharpmURL(i));
          audio.currentTime = 0;
          audio.volume = 0.5; 
          pianoFsharpmKeys.push(audio);
     };
     const playPianoFsharpm = (index) => {
          pianoFsharpmKeys[index].currentTime = 0;
          pianoFsharpmKeys[index].play();
     };

// Piano G //
     const getPianoGURL = (index) => {
          return `./audios/grandpiano-G/${getFileNamePiano(index)}.mp3`;
     }
     let pianoGKeys = [];
     for(let i = 0; i < 18; i++){
          const audio = new Audio(getPianoGURL(i));
          audio.currentTime = 0;
          audio.volume = 0.5; 
          pianoGKeys.push(audio);
     };
     const playPianoG = (index) => {
          pianoGKeys[index].currentTime = 0;
          pianoGKeys[index].play();
     };

// Piano A //
     const getPianoAURL = (index) => {
          return `./audios/grandpiano-A/${getFileNamePiano(index)}.mp3`;
     }
     let pianoAKeys = [];
     for(let i = 0; i < 18; i++){
          const audio = new Audio(getPianoAURL(i));
          //audio.currentTime = 0;
          audio.volume = 0.5; 
          pianoAKeys.push(audio);
     };
     const playPianoA = (index) => {
          pianoAKeys[index].currentTime = 0;
          pianoAKeys[index].play();
     };

     // Piano Am //
     const getPianoAmURL = (index) => {
          return `./audios/grandpiano-Am/${getFileNamePiano(index)}.mp3`;
     }
     let pianoAmKeys = [];
     for(let i = 0; i < 18; i++){
          const audio = new Audio(getPianoAmURL(i));
          //audio.currentTime = 0;
          audio.volume = 0.5; 
          pianoAmKeys.push(audio);
     };
     const playPianoAm = (index) => {
          pianoAmKeys[index].currentTime = 0;
          pianoAmKeys[index].play();
     };

     // Piano B //
     const getPianoBURL = (index) => {
          return `./audios/grandpiano-B/${getFileNamePiano(index)}.mp3`;
     }
     let pianoBKeys = [];
     for(let i = 0; i < 18; i++){
          const audio = new Audio(getPianoBURL(i));
          //audio.currentTime = 0;
          audio.volume = 0.5; 
          pianoBKeys.push(audio);
     };
     const playPianoB = (index) => {
          pianoBKeys[index].currentTime = 0;
          pianoBKeys[index].play();
     };
     
     // Piano Bm //
     const getPianoBmURL = (index) => {
          return `./audios/grandpiano-Bm/${getFileNamePiano(index)}.mp3`;
     }
     let pianoBmKeys = [];
     for(let i = 0; i < 18; i++){
          const audio = new Audio(getPianoBmURL(i));
          //audio.currentTime = 0;
          audio.volume = 0.5; 
          pianoBmKeys.push(audio);
     };
     const playPianoBm = (index) => {
          pianoBmKeys[index].currentTime = 0;
          pianoBmKeys[index].play();
     };

     // piano major
     const getPianoMajorURL = (index) => {
          return `./audios/grandpiano-major/${getFileNamePiano(index)}.mp3`;
     }
     let pianoMajorKeys = [];
     for(let i = 0; i < 43; i++){
          const audio = new Audio(getPianoMajorURL(i));
          audio.currentTime = 0;
          audio.volume = 0.5; 
          pianoMajorKeys.push(audio);
     };
     const playPianoMajor = (index) => {
          pianoMajorKeys[index].currentTime = 0;
          pianoMajorKeys[index].play();
     };

// key
     const getFileNameKey = (index) => {
          return `key-${index}`;
     }

     // Bell 
     const getBellURL = (index) => {
          return `./audios/bell/${getFileNameKey(index)}.mp3`;
     }
     let bellKeys = [];
     for(let i = 0; i < 61; i++){
          const audio = new Audio(getBellURL(i));
          audio.currentTime = 0;
          audio.volume = 0.5; 
          bellKeys.push(audio);
     };
     const playBell = (index) => {
          bellKeys[index].currentTime = 0;
          bellKeys[index].play();
     };
     
     // Bell Major 
     const getBellMajorURL = (index) => {
          return `./audios/bell-major/${getFileNameKey(index)}.mp3`;
     }
     let bellMajorKeys = [];
     for(let i = 0; i < 36; i++){
          const audio = new Audio(getBellMajorURL(i));
          audio.currentTime = 0;
          audio.volume = 0.5; 
          bellMajorKeys.push(audio);
     };
     const playBellMajor = (index) => {
          bellMajorKeys[index].currentTime = 0;
          bellMajorKeys[index].play();
     };
     
     // Bell C-Major 
     const getBellCURL = (index) => {
          return `./audios/bell-C/${getFileNameKey(index)}.mp3`;
     }
     let bellCKeys = [];
     for(let i = 0; i < 16; i++){
          const audio = new Audio(getBellCURL(i));
          audio.currentTime = 0;
          audio.volume = 0.5; 
          bellCKeys.push(audio);
     };
     const playBellC = (index) => {
          bellCKeys[index].currentTime = 0;
          bellCKeys[index].play();
     };

     //Bass
     const getBassURL = (index) => {
          return `./audios/bass/${getFileNameKey(index)}.mp3`;
     }
     let bassKeys = [];
     for(let i = 0; i < 15; i++){
          const audio = new Audio(getBassURL(i));
          audio.currentTime = 0;
          audio.volume = 0.5; 
          bassKeys.push(audio);
     };
     const playBass = (index) => {
          bassKeys[index].currentTime = 0;
          bassKeys[index].play();
     }

// Harp 
     const getHarpURL = (index) => {
          return `./audios/harp/${getFileNameKey(index)}.mp3`;
     }
     let harpKeys = [];
     for(let i = 0; i < 72; i++){
          const audio = new Audio(getHarpURL(i));
          audio.currentTime = 0;
          audio.volume = 0.5; 
          harpKeys.push(audio);
     };
     const playHarp = (index) => {
          harpKeys[index].currentTime = 0;
          harpKeys[index].play();
     };
     
     // Hickory Bells 
          const getHickorybellsURL = (index) => {
               return `./audios/hickorybells/${getFileNameKey(index)}.mp3`;
          }
          let hickorybellsKeys = [];
          for(let i = 0; i < 72; i++){
               const audio = new Audio(getHickorybellsURL(i));
               audio.currentTime = 0;
               audio.volume = 0.5; 
               hickorybellsKeys.push(audio);
          };
          const playHickorybells = (index) => {
               hickorybellsKeys[index].currentTime = 0;
               hickorybellsKeys[index].play();
          };
     
          // Glass Guitar 
          const getGlassGuitarURL = (index) => {
               return `./audios/glassguitar/${getFileNameKey(index)}.mp3`;
          }
          let glassguitarKeys = [];
          for(let i = 0; i < 72; i++){
               const audio = new Audio(getGlassGuitarURL(i));
               audio.currentTime = 0;
               audio.volume = 0.5; 
               glassguitarKeys.push(audio);
          };
          const playGlassGuitar = (index) => {
               glassguitarKeys[index].currentTime = 0;
               glassguitarKeys[index].play();
          };
  

export {
     playPiano, 
     playPianoMajor, 
     playPianoC,  
     playPianoD,  
     playPianoE,  
     playPianoF,  
     playPianoFsharpm,  
     playPianoG,  
     playPianoA,  
     playPianoAm,  
     playPianoB,  
     playPianoBm,  
     playBell, playBellMajor, playBellC, 
     playHarp, 
     playBass, 
     playHickorybells, 
     playGlassGuitar,
    
};