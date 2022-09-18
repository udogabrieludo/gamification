import * as React from "react";
import "./PageFiller.scss";
import PropTypes from "prop-types";
import { Empty } from "antd";
import Spinner from "../Spinner/Spinner";
function PageFiller({ className, loading, description }) {
  return (
    <div
      className="pageFiller"
    >
      {loading ? (
        <Spinner />
      ) : (
        <Empty description={description} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
}

PageFiller.propTypes = {
  className: PropTypes.string,
};
export default PageFiller;
