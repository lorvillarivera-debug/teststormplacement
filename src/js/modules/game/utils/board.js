export const orientations = (startpos, endpos, columns, numobjects) => {
  const full_sf = columns / 19
  const translations = []
  const rotations = []
  const length_sfs = []

  // Boustrophedon: even rows run left-to-right, odd rows right-to-left.
  const visualCol = (r, c) => (r % 2 === 0 ? c : columns - 1 - c)

  for (let i = 0; i < numobjects; i++) {
    var anchorCol = visualCol(endpos[i][0], endpos[i][1])
    var tipCol = visualCol(startpos[i][0], startpos[i][1])
    var desiredlength = (((976.3 / columns * (startpos[i][0] - endpos[i][0])) ** 2 + ((976.3 / columns) * (tipCol - anchorCol)) ** 2) ** 0.5)
    var length_sf = desiredlength / (full_sf * 915)
    var translation = [(((976.3 / columns) * (columns - 1 - endpos[i][0]) / full_sf) / length_sf), (((976.3 / columns) * anchorCol / full_sf) / length_sf)];

    var rotation = Math.atan2(anchorCol - tipCol, endpos[i][0] - startpos[i][0])

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

export const initialise = (numsnakes, columns, board, minSize = 0) => {
    var snakestartpos = [];
    var snakeendpos = [];
    var snakex = 0;
    var snakey = 0;
    for (let i = 0; i <numsnakes; i++) {
        snakex = Math.round((columns-1) * Math.random())
        snakey = Math.round((columns-1) * Math.random())
        // console.log(snakex)
        // console.log(snakey)
        if ((snakex == 0 && snakey == 0) || (snakex == columns-1 && snakey == columns-1) || (board[snakex][snakey].number == -1) || (board[snakex][snakey].number == 1)) {
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

    // SVG perpendicular-extent ratio (snake/ladder width / natural length).
    const visualCol = (r, c) => (r % 2 === 0 ? c : columns - 1 - c)
    const perpRatio = 144 / 915

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

        var valid = !((board[snakex][snakey].number == -1) || (board[snakex][snakey].number == 1))

        if (valid && minSize > 0) {
            const ax = visualCol(snakex, snakey)
            const ay = (columns - 1) - snakex
            const tx = visualCol(snakestartpos[i][0], snakestartpos[i][1])
            const ty = (columns - 1) - snakestartpos[i][0]
            const dx = tx - ax
            const dy = ty - ay
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < minSize) {
                valid = false
            } else {
                // Perpendicular displacement of the SVG's right edge from the anchor-tip line.
                const px = perpRatio * dy
                const py = perpRatio * (-dx)
                const trx = ax + px
                const tryy = ay + py
                const brx = tx + px
                const bry = ty + py
                if (trx < 0 || trx > columns || tryy < 0 || tryy > columns ||
                    brx < 0 || brx > columns || bry < 0 || bry > columns) {
                    valid = false
                }
            }
        }

        if (!valid) {
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
        orientations: orientations(snakestartpos, snakeendpos, columns, numsnakes),
        startpos: snakestartpos,
        endpos: snakeendpos
    };
}