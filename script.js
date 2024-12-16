const socket = io();
const board = document.getElementById('board');
let currentPlayer = 'X';

// Create the 3x3 grid
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    board.appendChild(cell);
}

board.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell') && !e.target.textContent) {
        e.target.textContent = currentPlayer;
        e.target.classList.add('taken');

        // Emit move to server
        socket.emit('move', { index: e.target.dataset.index, player: currentPlayer });

        // Toggle player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
});

// Listen for moves from other players
socket.on('move', (data) => {
    const cell = board.querySelector(`[data-index="${data.index}"]`);
    if (cell && !cell.textContent) {
        cell.textContent = data.player;
        cell.classList.add('taken');
        currentPlayer = data.player === 'X' ? 'O' : 'X';
    }
});
