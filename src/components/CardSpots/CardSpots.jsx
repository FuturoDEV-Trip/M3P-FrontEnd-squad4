
import "./CardSpots.css";
import { useSpots } from "../../hooks/useSpots";
import { Link } from "react-router-dom";

Link;
function CardSpots() {
  const spots = useSpots();

  return (
    <div className="Grid-Category">
      <div className="card-categorias">
        {spots.map((spot) => (
          <div className="card-category" key={spot.id}>
            <Link to={`/local/${spot.id}`}>
              <div className="card-categoria-txt">
                <span>{spot.name} </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardSpots;
