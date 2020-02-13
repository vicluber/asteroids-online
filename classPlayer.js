class Player
{
    constructor(name, id, displayWidth, displayHeigh, lifes, points)
    {
        this.displayWidth = displayWidth;
        this.displayHeigh = displayHeigh;
        this.id = id;
        this.name = name;
        this.lifes = lifes;
        this.points = points;
    }
}

module.exports = Player;
