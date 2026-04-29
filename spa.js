function loadApp(which) {
    const frame = document.getElementById("appFrame");
    
    if (which === "mem") {
        frame.src = "memoria.html";
    } else if (which === "ttt") {
        frame.src = "tictactoe.html";
    }
}

window.onload = function() {
    loadApp('mem');
};