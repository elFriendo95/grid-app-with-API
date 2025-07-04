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
        const col = Math.floor(x / this.tileSize);
        const row = Math.floor(y / this.tileSize);
        return {row: row, col: col};
    }
    offsetGrid(x,y){
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
        const origin = this.getTile[0][0];
        //then offset grid by dx and dy
        this.offsetGrid(x-origin.x,y-origin.y);
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
}
function changeTileColor(tile){
    if(tile.color==='red'){
        tile.color = 'white';
    }
    else if(tile.color==='white'){
        tile.color = 'red';
    }
}
//render of tile works
//render of grid works
const renderer=new Renderer(canvas);
const grid = new TileGrid(10,10,50);
//grid.offsetGrid(100,100);
renderer.renderGrid(grid);
canvas.addEventListener(
    'click',
    (event)=>{
        console.log(event.offsetX,event.offsetY);
        const tile = grid.getTileFromXY(event.offsetX,event.offsetY);
        changeTileColor(grid.tiles[tile.row][tile.col]);
        renderer.renderGrid(grid);
    }
);
console.log(canvas.width,canvas.height);

