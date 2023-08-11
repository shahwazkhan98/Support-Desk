import { Link } from "react-router-dom"

const BackButton = ({url}) => {
  return (
    <>
      <div className="back-button">
        <Link to={url} className="btn back btn-reverse btn-back">
          Back
        </Link>
      </div>
    </>
  );
}

export default BackButton