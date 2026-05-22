export const orientations = (startpos, endpos, columns, numobjects) => {
  const full_sf = columns / 19
  const translations = []
  const rotations = []
  const length_sfs = []
 
  for (let i = 0; i < numobjects; i++) {
    var desiredlength = (((976.3 / columns * (startpos[i][0] - endpos[i][0])) ** 2 + ((976.3 / columns) * (startpos[i][1] - endpos[i][1])) ** 2) ** 0.5)
    var length_sf = desiredlength / (full_sf * 915)
    var translation = [(976.3 / columns) * endpos[i][0], (976.3 / columns) * endpos[i][1]]
    var translation = [(((976.3 / columns) * endpos[i][0] / full_sf) / length_sf), (((976.3 / columns) * endpos[i][1] / full_sf) / length_sf)];
   
    if ((startpos[i][0] - endpos[i][0]) == 0) {
      var rotation = -Math.PI * 0.5
    }
    else {
      rotation = -Math.atan((startpos[i][1] - endpos[i][1]) / (startpos[i][0] - endpos[i][0]))
    }
    translations.push(translation)
    rotations.push(rotation)
    length_sfs.push(length_sf)
   
  }
 
  // console.log(translations);
  // console.log(length_sfs)
  // console.log(rotations)
  // console.log(endpos) //actual start
  // console.log(startpos) //actual end
  
//   return { full_sf, length_sfs, translations, rotations };

  return Array.from({ length: numobjects }).map((_, idx) => ({
    translate: translations[idx],
    rotate: rotations[idx],
    length_sf: length_sfs[idx]
  }));
};

export const initBoard = size => Array.from({ length: size }, () => Array(size).fill({number : 0}));

export const initialise = (numsnakes, columns, board) => {
    var snakestartpos = [];
    var snakeendpos = [];
    var snakex = 0;
    var snakey = 0;
    for (let i = 0; i <numsnakes; i++) {
        snakex = Math.round((columns-1) * Math.random())
        snakey = Math.round((columns-1) * Math.random())
        // console.log(snakex)
        // console.log(snakey)
        if ((snakex == 0 && snakey == 0) || (snakex == columns-1 && snakey == columns-1) || (board[snakex][snakey].number == -1)) {
            // numsnakes = numsnakes + 1;
            // counter = counter + 1
            i = i -1;
        }
        else {
        snakestartpos.push([snakex, snakey]);
        board[snakex][snakey] = {number : -1}
        }
    }
   
    // console.log(snakestartpos)
    // numsnakes = numsnakes - counter
   
    for (let i = 0; i <numsnakes; i++) {
        // console.log(snakestartpos[i][1])
        snakex =  Math.round((snakestartpos[i][0]) * Math.random())
        if (snakex == snakestartpos[i][0]) {
          snakey = Math.round((snakestartpos[i][1]) * Math.random())
        }
        else {
          snakey = Math.round((columns-1) * Math.random())
        }
       
        // console.log(snakex)
        // console.log(snakey)
       
        if ((board[snakex][snakey].number == -1) || (board[snakex][snakey].number == 1)) {
            i = i -1
        }
        else {
          snakeendpos.push([snakex, snakey]);
          board[snakex][snakey] = {number : 1}
        }
    }

    // for (i = 0; i <numsnakes; i++) {
    //     snakey = Math.round();
   
    // console.log(snakeendpos);
    // console.log(snakestartpos);
    // }
    return {
        board,
        orientations: orientations(snakestartpos, snakeendpos, columns, numsnakes)
    };
}