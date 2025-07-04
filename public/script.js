const canvas = document.getElementById('canvas');

class Tile{
    constructor(x,y,size,color){
        this.x = x;
        this.y = y;
        this.size=size;
        this.color = color;
    }
    setCoordinates(x, y) {
        this.x = x;
        this.y = y;
    }
}


class TileGrid {
    constructor(rows, cols, tileSize) {
        this.rows = rows;
        this.cols = cols;
        this.tileSize = tileSize;
        this.offsetX = 0;  // Track grid offset
        this.offsetY = 0;
        this.tiles = [];
        this.generateGrid();
    }
    
    generateGrid() {
        for(let row = 0; row < this.rows; row++) {
            const tileRow = [];
            for(let col = 0; col < this.cols; col++) {
                // Swap i and j to proper x,y coordinates
                const tile = new Tile(
                    col * this.tileSize,  // x position (columns)
                    row * this.tileSize,  // y position (rows)
                    this.tileSize,
                    'red'
                );
                tileRow.push(tile);
            }
            this.tiles.push(tileRow);
        }
    }
    getTileFromXY(x,y){
         // Subtract the grid's offset before calculating row/col
        const adjustedX = x - this.offsetX;
        const adjustedY = y - this.offsetY;
        const col = Math.floor(adjustedX / this.tileSize);
        const row = Math.floor(adjustedY / this.tileSize);
        return { row: row, col: col };
    }
    offsetGrid(x,y){
        this.offsetX += x;//changes offset of the grid
        this.offsetY += y;
        //this function should offset grid by x and y
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.cols;j++){
                this.tiles[i][j].x += x;
                this.tiles[i][j].y += y;
            }
        }
    }
    moveGrid(x,y){
        //first get origin(top left corner)
        const origin = this.tiles[0][0];
        //then offset grid by dx and dy
        console.log(this.tiles);
        this.offsetGrid(x-origin.x,y-origin.y);
        console.log(this.tiles);
    }
    scaleGrid(newSize){
     this.tileSize = newSize;
     this.tiles = [];
     this.generateGrid();
    }
}

class Renderer{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.defaultColor = 'white';
        this.borderColor = 'black';   
    }
    clear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
    renderTile(tile){
        this.ctx.fillStyle = tile.color || this.defaultColor;
        this.ctx.strokeStyle = this.borderColor;
        this.ctx.fillRect(tile.x, tile.y, tile.size, tile.size);
        this.ctx.strokeRect(tile.x, tile.y, tile.size, tile.size);
    }
    renderGrid(grid){
        for(let i=0;i<grid.rows;i++){
            for(let j=0;j<grid.cols;j++){
                this.renderTile(grid.tiles[i][j]);
            }
        }
    }
    changeTileColor(tile){
    if(tile.color==='red'){
        tile.color = 'white';
    }
    else if(tile.color==='white'){
        tile.color = 'red';
    }
}
}
//need to change here
/*function changeTileColor(tile){
    if(tile.color==='red'){
        tile.color = 'white';
    }
    else if(tile.color==='white'){
        tile.color = 'red';
    }
}*/



//render of tile works
//render of grid works
const renderer=new Renderer(canvas);
const grid = new TileGrid(10,10,50);
//grid.offsetGrid(100,100);

canvas.addEventListener(
    'click',
    (event)=>{
        const tile = grid.getTileFromXY(event.offsetX,event.offsetY);
        //changeTileColor(grid.tiles[tile.row][tile.col]);
        renderer.changeTileColor(grid.tiles[tile.row][tile.col]);
        renderer.renderGrid(grid);
    }
);
grid.scaleGrid(25);
grid.moveGrid(100,100);
renderer.renderGrid(grid);

