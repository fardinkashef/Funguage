import React, { useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
// import { Tooltip } from "bootstrap/dist/js/bootstrap.esm.min.js";
function Ttest() {
  //   React.useEffect(() => {
  //     (function () {
  //       var tooltipTriggerList = [].slice.call(
  //         document.querySelectorAll('[data-bs-toggle="tooltip"]')
  //       );
  //       var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  //         return new Tooltip(tooltipTriggerEl);
  //       });
  //     })();
  //   }, []);
  return (
    <div>
      <button
        type="button"
        className="tt btn btn-secondary"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Tooltip on top"
      >
        Tooltip on top
      </button>
      <button
        type="button"
        className="tt btn btn-secondary"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
        title="Tooltip on right"
      >
        Tooltip on right
      </button>
      <button
        type="button"
        className="tt btn btn-secondary"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Tooltip on bottom"
      >
        Tooltip on bottom
      </button>
      <button
        type="button"
        className="tt btn btn-secondary"
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        title="Tooltip on left"
      >
        Tooltip on left
      </button>
    </div>
  );
}
export default Ttest;
