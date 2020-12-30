import React from "react";
import Container from "react-bootstrap/Container";

const SingleContent = ({ title, para1, para2, link }) => {
  return (
    <>
      <div className="Info__videoder">
        <Container>
          <h4 className="title">{title} :-</h4>
          <div className="content">
            <p>{para1}</p>
            {para2 && (
              <p>
                {para2}

                {link && (
                  <a href={link} target="_blank" rel="noreferrer">
                    {link}
                  </a>
                )}
              </p>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default SingleContent;
