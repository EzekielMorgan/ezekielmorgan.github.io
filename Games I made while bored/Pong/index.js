const Constraints = {
    Y: {
        Min: 10,
        Max: 645
    }
}

const BallLimits = {
    X: {
        Min: 0,
        Max: 1230
    },
    Y: {
        Min: 0,
        Max: 670
    },
    CheckPaddleCollision: {
        Left: 40,
        Right: 1190
    }
}

const BallSpawn = {
    X: 635,
    Y: 335,
}

const BallSpawnMargin = {
    X: 100,
    Y: 200
}

let PointDebounce = 60

let MoveMult = .5

class Player {
    /**
     * @param {HTMLElement} Paddle 
     * @param {string} Up 
     * @param {string} Down 
     * @param {String} Shift 
     */
    constructor(Paddle, Up, Down, FastUp, FastDown) {
        this.#Paddle = Paddle
        this.#Up = Up
        this.#Down = Down

        console.log("Init Player")

        document.addEventListener("keydown", (Key) => {
            if (Key.code == Up) {
                this.#Movement.Up = true
            } else if (Key.code == Down) {
                this.#Movement.Down = true
            } else if (Key.code == FastUp) {
                this.#Movement.FastUp = true
            } else if (Key.code == FastDown) {
                this.#Movement.FastDown = true
            }
        });

        document.addEventListener("keyup", (Key) => {
            if (Key.code == Up) {
                this.#Movement.Up = false
            } else if (Key.code == Down) {
                this.#Movement.Down = false
            } else if (Key.code == FastUp) {
                this.#Movement.FastUp = false
            } else if (Key.code == FastDown) {
                this.#Movement.FastDown = false
            }
        });

        let lastLog = {
            Up: false,
            Down: false
        }

        setInterval(() => {
            this.Position = parseFloat(Paddle.style.top)
            if (this.#Movement.Up === true && this.#Movement.Down == true) {
                // No Movement
            } else if (this.#Movement.FastUp === true && this.#Movement.FastDown === true) {
                // No Movement
            } else if (this.#Movement.Up === true && this.#Movement.Down === false) {
                // Move Up
                this.#MoveUp()
            } else if (this.#Movement.Up === false && this.#Movement.Down === true) {
                // Move Down
                this.#MoveDown()
            } else if (this.#Movement.FastUp === true && this.#Movement.FastDown === false) {
                // Move Up
                this.#MoveUp()
            } else if (this.#Movement.FastUp === false && this.#Movement.FastDown === true) {
                // Move Down
                this.#MoveDown()
            } else if (this.#Movement.Up === false && this.#Movement.Down === false) {
                // No Movement
            } else if (this.#Movement.FastUp === false && this.#Movement.FastDown === false) {
                // No Movement
            }
        }, 1000 / 60);
    }

    #Paddle = undefined

    #Up = undefined
    #Down = undefined

    #Movement = {
        Up: false,
        Down: false,
        FastUp: false,
        FastDown: false
    }

    Position = 0

    Score = 0

    #MoveUp = () => {
        let Y = this.#Paddle.style.top | parseFloat(this.#Paddle.style.top)
        Y -= 5 * (this.#Movement.FastUp && 2 || 1)
        Y = Math.max(Y, Constraints.Y.Min)

        this.#Paddle.style = `top: ${Y}px;`
    }

    #MoveDown = () => {
        let Y = this.#Paddle.style.top | parseFloat(this.#Paddle.style.top)
        Y += 5 * (this.#Movement.FastDown && 2 || 1)
        Y = Math.min(Y, Constraints.Y.Max)

        this.#Paddle.style = `top: ${Y}px;`
    }
}

class Ball {

    /**
     * @param {HTMLElement} Ball 
     * @param {Player} Player1 
     * @param {Player} Player2 
     * @param {(LeftPlayer) => ()} OnPoint 
     */
    constructor(Ball, Player1, Player2, OnPoint) {

        this.#Ball = Ball

        this.#P1 = Player1
        this.#P2 = Player2

        this.OnPoint = OnPoint

        this.#SpawnBall()

        this.Position.X = parseFloat(Ball.style.left)
        this.Position.Y = parseFloat(Ball.style.top)

        setInterval(() => {
            this.Position.X = parseFloat(Ball.style.left)
            this.Position.Y = parseFloat(Ball.style.top)

            if (PointDebounce <= -6000) {
                MoveMult = 1
                if (PointDebounce <= -9000) {
                    MoveMult = 2
                    if (PointDebounce <= -12000) {
                        MoveMult = 3
                        if (PointDebounce <= -15000) {
                            MoveMult = 4
                        }
                    }
                }
            } else {
                MoveMult = .5
            }
            this.#ProcessMove()
        }, 1000 / 60);
    }

    #Ball

    #P1
    #P2

    #SpawnBall = () => {
        let SpawnPosRaw = {
            X: BallSpawn.X + Math.round((Math.random() - .5) * (BallSpawnMargin.X * 2)),
            Y: BallSpawn.Y + Math.round((Math.random() - .5) * (BallSpawnMargin.Y * 2))
        }

        let SpawnPosRounded = {
            X: (Math.round( (SpawnPosRaw.X * 2) / 10) * 10) / 2,
            Y: (Math.round( (SpawnPosRaw.Y * 2) / 10) * 10) / 2,
        }

        this.#Ball.style = `top: ${SpawnPosRounded.Y}px; left: ${SpawnPosRounded.X}px;`

        let RandomDirection = {
            Left: Math.random() > .5,
            Up: Math.random() > .5
        }

        this.#Movement.Left = RandomDirection.Left
        this.#Movement.Up = RandomDirection.Up

        PointDebounce = 60
    }

    #CheckWallCollision = () => {
        // Bottom Collision
        if (this.Position.Y >= BallLimits.Y.Max) {
            this.#Movement.Up = true
        }

        // Top Collision
        if (this.Position.Y <= BallLimits.Y.Min) {
            this.#Movement.Up = false
        }
    }

    #CheckPlayerCollision = () => {
        // Left Collision
        if (this.Position.X <= BallLimits.CheckPaddleCollision.Left) {
            let Dif = this.Position.Y - this.#P1.Position
            if ((Dif >= -40) && (Dif <=60)) {
                this.#Movement.Left = false
            }
        }

        // Right Collision
        if (this.Position.X >= BallLimits.CheckPaddleCollision.Right) {
            let Dif = this.Position.Y - this.#P2.Position
            if ((Dif >= -40) && (Dif <=60)) {
                this.#Movement.Left = true
            }
        }
    }

    #CheckPointCollision = (X) => {
        // Left Collision
        if (X <= BallLimits.X.Min) {
            return [true,false]
        }

        // Right Collision
        if (X >= BallLimits.X.Max) {
            return [true,true]
        }

        return [false,false]
    }

    #CheckCollision = () => {
        this.#CheckWallCollision()
        this.#CheckPlayerCollision()
        this.#CheckPointCollision()
    }

    #ProcessMove = () => {
        PointDebounce -= 1
        if (PointDebounce > 0) {
            return
        }
        this.#CheckCollision()

        let NewPos = {
            X: this.Position.X,
            Y: this.Position.Y,
        }

        if (this.#Movement.Up) {
            NewPos.Y -= 5 * MoveMult
        } else {
            NewPos.Y += 5 * MoveMult
        }

        if (this.#Movement.Left) {
            NewPos.X -= 5 * MoveMult
        } else {
            NewPos.X += 5 * MoveMult
        }
        
        let newStyle = `top: ${NewPos.Y}px; left: ${NewPos.X}px;`

        let [Point,Left] = this.#CheckPointCollision(NewPos.X)

        if (Point) {
            this.#SpawnBall()
            this.#Movement.Left = Left

            this.OnPoint(Left)
        } else {
            this.#Ball.style = newStyle
        }
    }

    Position = {
        X: 0,
        Y: 0
    }

    #Movement = {
        Up: false,
        Left: false
    }
}


document.addEventListener("DOMContentLoaded", () => {
    /*
    
    Init Player 1
    
    */

    let Player1_Paddle = document.getElementById("PLR_L")

    console.log(Player1_Paddle)

    let Player1 = new Player(Player1_Paddle, "KeyW", "KeyS","KeyE","KeyD")
    /*
    
    Init Player 2
    
    */

    let Player2_Paddle = document.getElementById("PLR_R")

    console.log(Player2_Paddle)

    let Player2 = new Player(Player2_Paddle, "KeyO", "KeyL","KeyI","KeyK")

    /*

    Init Ball

    */

    let Ball_Element = document.getElementById("Ball")

    let Plr1Score = document.getElementById("Plr1Score_Value")
    let Plr2Score = document.getElementById("Plr2Score_Value")

    let PongBall = new Ball(Ball_Element, Player1, Player2, (LeftPlayer) => {
        if (LeftPlayer) {
            Player1.Score ++
            Plr1Score.innerHTML = `${Player1.Score}<br/>Points<br/>Normal:<br/>W & S<br/><br/>Fast:<br/>E & D`
        } else {
            Player2.Score ++
            Plr2Score.innerHTML = `${Player2.Score}<br/>Points<br/>Normal:<br/>O & L<br/><br/>Fast:<br/>I & K`
        }
    })
})
