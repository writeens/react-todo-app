function colors(){
    let colors = [
        "#005876", 
        "#FFB800", 
        "#60D9BD", 
        "#FF2C51", 
        "#7995FF", 
        "#C260CB",
        "#00CEE1",
        "#F58700",
        "#A2D580"]
        let rndIndex = Math.floor(Math.random() * colors.length)
        return colors[rndIndex];
}

export default colors;