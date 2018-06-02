import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import '../styles/home.css';

const Home = () => {
  return(
    <CSSTransitionGroup
      transitionName="homeTransition"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>
      <div>Home</div>
    </CSSTransitionGroup>
  );
}

export default Home;
