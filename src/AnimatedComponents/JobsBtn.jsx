import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const JobsBtn = () => {
    return (
        <StyledWrapper>
            <NavLink to="/jobs" className="btn mt-4"> Find Jobs</NavLink>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .btn {
   display: inline-block;
   padding: 0.9rem 1.8rem;
   font-size: 16px;
   font-weight: 700;
   color: rgb(70, 140, 252);
   border: 3px solid rgb(70, 140, 252);
   cursor: pointer;
   position: relative;
   background-color: transparent;
   text-decoration: none;
   overflow: hidden;
   z-index: 1;
   font-family: inherit;
  }

  .btn::before {
   content: "";
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   background-color: rgb(70, 140, 252);
   transform: translateX(-100%);
   transition: all .3s;
   z-index: -1;
  }
   .btn:hover{
   color: #fff;
   }
  .btn:hover::before {
   transform: translateX(0);
  }`;

export default JobsBtn;
