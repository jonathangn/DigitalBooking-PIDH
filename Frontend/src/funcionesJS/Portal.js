import { Component } from "react";
import ReactDOM from "react-dom";

export default class Portal extends Component {
  constructor() {
    super();
    this.el = document.createElement("div");
  }

  componentDidMount = () => {
    const portalRoot = document.getElementById("portal");
    if (portalRoot) {
      portalRoot.appendChild(this.el);
    }
  };

  componentWillUnmount = () => {
    const portalRoot = document.getElementById("portal");
    if (portalRoot && this.el.parentNode === portalRoot) {
      portalRoot.removeChild(this.el);
    }
  };

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}
