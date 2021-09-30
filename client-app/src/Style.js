import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`

  display: flex;
  color: white;
  text-decoration:none;
  font-weight: bold;
  margin-right: 5px;
  align-items:flex-start;
  margin-left: 20px;
  line-height: 50px;
  font-size:20px;

  &:hover {
    text-decoration: underline;
  }
`;



export default styled;