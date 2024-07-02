import "../Styles/Spinner.css";


function Spinner({text}) {


    return(
        <div className="spinner-container">
            <div className="spinner"></div>
            <span>{text?text: "Creating your account"}</span>
        </div>
    );
};
export default Spinner;