import PropTypes from "prop-types";
import "./components.css";

export default function ToggleButton({ children, isToggled, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`toggle-button ${isToggled ? "on" : "off"}`}
    >
      {children}
    </button>
  );
}

ToggleButton.propTypes = {
  children: PropTypes.node,
  isToggled: PropTypes.bool,
  onClick: PropTypes.func,
};
