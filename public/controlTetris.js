// testing code
const blockFall = (i) => {
    setTimeout(() => {
        cls();
        drawBlock(5,i,"blue");
        blockFall(i + 1);
    }, 1000);
}

blockFall(0);