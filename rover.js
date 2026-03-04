const directions = ['N', 'E', 'S', 'W'];

function turnLeft(facing){
    return directions[(directions.indexOf(facing)+3)%4]
}
function turnRight(facing){
    return directions[(directions.indexOf(facing)+1)%4]
}

function moveForward(x,y,facing, plateau, occupiedPositions){
    let nx=x, ny=y;
    if(facing==='N') ny++;
    else if(facing==='E') nx++;
    else if(facing==='S') ny--;
    else if(facing==='W') nx--;

    if(nx<0 || nx>plateau.x || ny<0 || ny>plateau.y){
        throw new Error(`rover went out of bounds trying to move to (${nx},${ny})`)
    }
    if(occupiedPositions.has(`${nx},${ny}`)){
        throw new Error(`Collision detected at (${nx}, ${ny}) — another rover is already there`)
    }
    return {x:nx, y:ny}
}

function runRover(rover, plateau, occupiedPositions=new Set()){
    let {x,y,facing}=rover;
    for (cmd of rover.instructions){
        if(cmd==='L') facing=turnLeft(facing);
        else if(cmd==='R') facing=turnRight(facing);
        else if(cmd==='M'){
            const pos = moveForward(x,y,facing,plateau, occupiedPositions)
            x=pos.x;
            y=pos.y;
        }
    }
    return {x,y,facing}
}
module.exports = { runRover }