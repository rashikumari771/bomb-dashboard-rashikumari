import React, { useMemo } from 'react'
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';

import HomeImage from '../../assets/img/background.jpg';
import BombFInanceSummary from './components/BombFInanceSummary';
import InvestmentSummary from './components/InvestmentSummary';
import BombFarms from './components/BombFarms';
import Bonds from './components/Bonds';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

const Dashboard = () => {
     return (
          <Page>
               <BackgroundImage />
               <BombFInanceSummary />
               <InvestmentSummary />
               <BombFarms />
               <Bonds />
          </Page>
     )
}

export default Dashboard