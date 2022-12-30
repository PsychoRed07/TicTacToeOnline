// Importing the css for the info
import "./css/info.css";

const Info = ({elapsedTurn}) => {

	return (
        <div>
            <div className="info">
                <div className="text">Player 1: X</div>
                <div className="text">Player 2: O</div>
            </div>
            <div className="info">
                <div className="text">Turn : {elapsedTurn}</div>
            </div>
        </div>
	)
}

export default Info;
