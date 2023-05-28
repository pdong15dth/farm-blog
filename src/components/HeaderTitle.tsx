import React from "react";

interface HeaderTitleProps {
  title: string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title }) => {
  return (
    <div className="block-header">
      <div className="row">
        <div className="col-lg-5 col-md-8 col-sm-12">
          <h2>{title}</h2>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">
                <i className="icon-home"></i>
              </a>
            </li>
            <li className="breadcrumb-item active">{title}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderTitle;
