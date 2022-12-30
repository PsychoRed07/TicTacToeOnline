// Importing the required components
import Board from './Board';
import Info from "./Info";
import Chat from './Chat';


// Importing the CSS File
import "./css/app.css";

// Importing the useState hook
import { useState } from 'react';

function App() {

	// Creating a reset state, which indicates whether
	// the game should be reset or not
	const [reset, setReset] = useState(false);

	// Creating a winner state, which indicates
	// the current winner
	const [winner, setWinner] = useState('');

	// Sets the reset property to true
	// which starts the chain
	// reaction of resetting the board
	const resetBoard = () => {
		setReset(true);
	};

    const [elapsedTurn, setElapsedTurn] = useState(0);

	return (
		<div className="App">
			{/* Shrinks the popup when there is no winner */}
			<div className={`winner ${winner !== '' ? '' : 'shrink'}`}>
				{/* Display the current winner */}
				<div className='winner-text'>{winner}</div>
				{/* Button used to reset the board */}
				<button onClick={() => resetBoard()}>
					Reset Board
				</button>
			</div>
			{/* Custom made board component comprising of
			the tic-tac-toe board */}
            <div className='col1'>
			<Board reset={reset} setReset={setReset} winner={winner} setWinner={setWinner} elapsedTurn={elapsedTurn} setElapsedTurn={setElapsedTurn}/>
            <Info elapsedTurn={elapsedTurn}/>
            </div>
            <div className='col2'>
            <Chat />
            </div>
		</div>
	);
}

export default App;
