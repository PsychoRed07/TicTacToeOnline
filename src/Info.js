// Importing the css for the info
import "./css/info.css";

const Info = ({elapsedTurn, player}) => {

	return (
        <div>
            <div className="info">
                <div className="text">You are playing {player}</div>
            </div>
            <div className="info">
                <div className="text">Turn : {elapsedTurn}</div>
            </div>
        </div>
	)
}

export default Info;
