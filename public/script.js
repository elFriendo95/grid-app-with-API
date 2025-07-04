const canvas = document.getElementById('canvas');

class Tile{
    constructor(x,y,size,color){
        this.x = x;
        this.y = y;
        this.size=size;
        this.color = color;
    }
    //i am here
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
    moveGrid(x,y){
        //this function should oofset grid by x and y

        
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
