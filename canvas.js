// https://stackoverflow.com/a/23095818/15355402
function random_rgba() {
    // var o = Math.round, r = Math.random, s = 255;
    // return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
    let colorArray = ["#F2668B", "#025E73", "#011F26", "#026873", "#03A688"]
    return colorArray[Math.floor(Math.random() * 8)]
}

const canvas = document.getElementById("canvas")
let innerW = window.innerWidth
let innerH = window.innerHeight
canvas.width = innerW
canvas.height = innerH

let c = canvas.getContext("2d")


let mouse = {
    x: null,
    y: null
}

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x
    mouse.y = event.y
})

window.addEventListener("size", () => {
    innerW = window.innerWidth
    innerH = window.innerHeight
})

// Draw an arch
function Circle(x, y, r, minR, dx, dy, strokeColor, fillColor) {
    this.x = x
    this.y = y
    this.r = r
    this.minR = minR
    this.dx = dx
    this.dy = dy
    this.strokeColor = strokeColor
    this.fillColor = fillColor

    this.draw = () => {
        c.beginPath()
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        c.strokeStyle = strokeColor
        c.fillStyle = fillColor
        // c.stroke()
        c.fill()
    }

    this.update = () => {
        if ((this.x + this.r) > innerW || (this.x - this.r) < 0) {
            this.dx = -this.dx
        }
        if ((this.y + this.r) > innerH || (this.y - this.r) < 0) {
            this.dy = -this.dy
        }
        this.x += this.dx
        this.y += this.dy

        // Grow Radius
        // console.log(mouse)
        if ((mouse.x - this.x < 50) && (mouse.x - this.x > -50) && (mouse.y - this.y < 50) && (mouse.y - this.y > -50)) {
            if (this.r < 60) {
                this.r += 1
            }
        } else if (this.r > 8) {
            this.r -= 1
        }

        this.draw()
    }

}

const allCircle = []
for (let i = 0; i < 800; i++) {
    dx = (Math.random() - 0.5) * 5
    dy = (Math.random() - 0.5) * 5
    r = Math.random() * 20 + 1
    minR = (Math.random() * 20 + 1)
    x = Math.random() * innerW
    y = Math.random() * innerH
    strokeColor = random_rgba()
    fillColor = random_rgba()

    const newCircle = new Circle(x, y, r, minR, dx, dy, strokeColor, fillColor)
    allCircle.push(newCircle)
}

const animate = () => {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerW, innerH)

    allCircle.forEach(circle => {
        circle.update()
    })
}

animate()