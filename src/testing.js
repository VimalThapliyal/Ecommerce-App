import React from "react";
import styled from "styled-components";

export const Testing = () => {
  return (
    <Wrapper>
      <h3>Hello world</h3>
      <p>Hello people</p>
      <div className="article">
        <p>this is article</p>
      </div>
      <button>click me</button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h3 {
    color: red;
  }
  .article {
    p {
      color: red;
    }
  }
  p {
    color: blue;
  }
`;
