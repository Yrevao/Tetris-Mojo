// box factory
const newBox = (locked, color, effect) => {
    // color is css color
    // locked tells if the box needs to be moved down by gravity or if it's settled
    // graphical effects applied to the box, mainly changing color a bit to indicate that the box is locking in place
    return {
        color,
        locked,
        effect
    }
}

// box 2d array factory
const newGrid = (rows, cols) => {
    let outGrid = [];

    for (let i = 0; i < rows; i++) {
        let row = [];

        for (let j = 0; j < cols; j++) {
            row.push(null);
        }

        outGrid.push(row);
    }

    return outGrid;
}

// color factory
const newColor = (r, g, b) => {
    return {
        r,
        g,
        b
    }
}

// place input onto base at x, y
const stamp = (x, y, base, input) => {
    for(let i = x; i < x + input.length; i++)

        for(let j = y; j < y + input[i-x].length; j++) {

            if(i < base.length && j < base[0].length && i >= 0 && j >= 0) {

                if(base[i][j] == null && input[i-x][j-y] != null)

                    base[i][j] = input[i-x][j-y];
            }
        }
    return base;
}

// check if input will collide with collFunc data on base
const checkBoxColl = (x, y, base, input) => {
    // check that the x and y are widthin the base
    if(x < base.length && y < base[0].length) {
        // check if there is a collision widthin the area of the input on the base at x and y
        for(let i = x; i < x + input.length; i++) {

            for(let j = y; j < y + input[0].length; j++) {
                checkBase = base
                checkInput = input[i-x][j-y]
                
                // check in the bounds of the base
                if(i < base.length && j < base[0].length && i >= 0 && j >= 0) {

                    // if there's nothing to hit then go to the next index
                    if(checkBase == null || checkInput == null)
                        continue;

                    // if the input will hit a locked base box then a collision will occour
                    if(checkBase.locked && !checkInput.locked)
                        return true;
                }
                // check if the input part that's out of bounds is empty
                else if(i-x >= 0 && j-y >= 0) {

                    if(checkInput != null) 
                        return true;
                }
            }
        }
        return false;
    }
    return true;
}

// used to store grids for i, j, l, o, s, t, z blocks with 4 rotations hardcoded, also provides id to color/letter arrays
const blockStore = (() => {
    const i = (rot) => {
        let block = newGrid(4, 4);
        const blockBox = newBox(false, newColor(0,255,255), null);
        switch(rot) {
            case 0:
                    block[0][1] = blockBox;
                    block[1][1] = blockBox;
                    block[2][1] = blockBox;
                    block[3][1] = blockBox;
                break;
            case 1:
                    block[2][0] = blockBox;
                    block[2][1] = blockBox;
                    block[2][2] = blockBox;
                    block[2][3] = blockBox;
                break;
            case 2:
                    block[0][2] = blockBox;
                    block[1][2] = blockBox;
                    block[2][2] = blockBox;
                    block[3][2] = blockBox;
                break;
            case 3:
                    block[1][0] = blockBox;
                    block[1][1] = blockBox;
                    block[1][2] = blockBox;
                    block[1][3] = blockBox;
                break;
        }
        return block;
    }
    const j = (rot) => {
        let block = newGrid(3, 3);
        const blockBox = newBox(false, newColor(0,0,255), null);
        block[1][1] = blockBox;
        switch(rot) {
            case 0:
                    block[0][0] = blockBox;
                    block[0][1] = blockBox;
                    block[2][1] = blockBox;
                break;
            case 1:
                    block[1][0] = blockBox;
                    block[2][0] = blockBox;
                    block[1][2] = blockBox;
                break;
            case 2:
                    block[0][1] = blockBox;
                    block[2][1] = blockBox;
                    block[2][2] = blockBox;
                break;
            case 3:
                    block[1][0] = blockBox;
                    block[0][2] = blockBox;
                    block[1][2] = blockBox;
                break;
        }
        return block;
    }
    const l = (rot) => {
        let block = newGrid(3, 3);
        const blockBox = newBox(false, newColor(255,170,0), null);
        block[1][1] = blockBox;
        switch(rot) {
            case 0:
                    block[2][0] = blockBox;
                    block[0][1] = blockBox;
                    block[2][1] = blockBox;
                break;
            case 1:
                    block[1][0] = blockBox;
                    block[2][2] = blockBox;
                    block[1][2] = blockBox;
                break;
            case 2:
                    block[0][1] = blockBox;
                    block[2][1] = blockBox;
                    block[0][2] = blockBox;
                break;
            case 3:
                    block[1][0] = blockBox;
                    block[0][0] = blockBox;
                    block[1][2] = blockBox;
                break;
        }
        return block;
    }
    const o = (rot) => {
        let block = newGrid(3, 3);
        const blockBox = newBox(false, newColor(255,255,0), null);
        block[1][0] = blockBox;
        block[2][0] = blockBox;
        block[1][1] = blockBox;
        block[2][1] = blockBox;
        return block;
    }
    const s = (rot) => {
        let block = newGrid(3, 3);
        const blockBox = newBox(false, newColor(0,255,0), null);
        block[1][1] = blockBox;
        switch(rot) {
            case 0:
                    block[1][0] = blockBox;
                    block[2][0] = blockBox;
                    block[0][1] = blockBox;
                break;
            case 1:
                    block[1][0] = blockBox;
                    block[2][1] = blockBox;
                    block[2][2] = blockBox;
                break;
            case 2:
                    block[0][2] = blockBox;
                    block[1][2] = blockBox;
                    block[2][1] = blockBox;
                break;
            case 3:
                    block[0][0] = blockBox;
                    block[0][1] = blockBox;
                    block[1][2] = blockBox;
                break;
        }
        return block;
    }
    const t = (rot) => {
        let block = newGrid(3, 3);
        const blockBox = newBox(false, newColor(153,0,254), null);
        block[1][1] = blockBox;
        switch(rot) {
            case 0:
                    block[1][0] = blockBox;
                    block[0][1] = blockBox;
                    block[2][1] = blockBox;
                break;
            case 1:
                    block[1][0] = blockBox;
                    block[2][1] = blockBox;
                    block[1][2] = blockBox;
                break;
            case 2:
                    block[0][1] = blockBox;
                    block[2][1] = blockBox;
                    block[1][2] = blockBox;
                break;
            case 3:
                    block[1][0] = blockBox;
                    block[0][1] = blockBox;
                    block[1][2] = blockBox;
                break;
        }
        return block;
    }
    const z = (rot) => {
        let block = newGrid(3, 3);
        const blockBox = newBox(false, newColor(255,0,0), null);
        block[1][1] = blockBox;
        switch(rot) {
            case 0:
                    block[0][0] = blockBox;
                    block[1][0] = blockBox;
                    block[2][1] = blockBox;
                break;
            case 1:
                    block[2][0] = blockBox;
                    block[2][1] = blockBox;
                    block[1][2] = blockBox;
                break;
            case 2:
                    block[0][1] = blockBox;
                    block[2][2] = blockBox;
                    block[1][2] = blockBox;
                break;
            case 3:
                    block[1][0] = blockBox;
                    block[0][1] = blockBox;
                    block[0][2] = blockBox;
                break;
        }
        return block;
    }
    
    const idToLetter = [i, j, l, o, s, t, z];
    const idToColor = [newColor(0,255,255), newColor(0,0,255), newColor(255,170,0), newColor(255,255,0), newColor(0,255,0), newColor(153,0,254), newColor(255,0,0)];
    
    return {
        i,
        j,
        l,
        o,
        s,
        t,
        z,
        index,
        colorIndex
    };
})();