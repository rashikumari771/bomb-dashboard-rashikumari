import React, { useMemo, useState } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useBombStats from '../../hooks/useBombStats';
import useLpStats from '../../hooks/useLpStats';
import useLpStatsBTC from '../../hooks/useLpStatsBTC';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usebShareStats from '../../hooks/usebShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
// import { Bomb as bombTesting } from '../../bomb-finance/deployments/deployments.testing.json';
//import { Bomb as bombProd } from '../../bomb-finance/deployments/deployments.mainnet.json';
import { roundAndFormatNumber } from '../../0x';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import { Box, Button, Card, CardContent, Divider, Typography, Grid, Flex, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';
import { Alert } from '@material-ui/lab';
import { IoCloseOutline } from 'react-icons/io5';
import { BiLoaderAlt } from 'react-icons/bi';
import { makeStyles } from '@material-ui/core/styles';
import useBombFinance from '../../hooks/useBombFinance';
//import { ReactComponent as IconTelegram } from '../../assets/img/telegram.svg';
import { Helmet } from 'react-helmet';
import BombImage from '../../assets/img/bomb.png';

//import useBombMaxiStats from '../../hooks/useBombMaxiStats';

import HomeImage from '../../assets/img/background.jpg';
import theme from '../../theme';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;
const TITLE = 'bomb invastment';

// const BackgroundImage = createGlobalStyle`
//   body {
//     background-color: grey;
//     background-size: cover !important;
//   }
// `;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      // marginTop: '10px'
    },
  },
}));

const list = [
    {logo:"",name:"$BOMB",currentSupply:"8.67M",totalSupply:"60.9k",price:{dollar:"$0.24", bitcoin:"1.05BTCB"}},
    {logo:"",name:"$BSHARE",currentSupply:"11.4k",totalSupply:"8.49m",price:{dollar:"$300", bitcoin:"13000BTCB"}},
    {logo:"",name:"$BBOND",currentSupply:"20.00K",totalSupply:"179k",price:{dollar:"$0.28", bitcoin:"1.15BTCB"}}]

const Dashboard = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const bombFtmLpStats = useLpStatsBTC('BOMB-BTCB-LP');
  const bShareFtmLpStats = useLpStats('BSHARE-BNB-LP');
  const bombStats = useBombStats();
  const bShareStats = usebShareStats();
  const tBondStats = useBondStats();
  const bombFinance = useBombFinance();
  // const bombmaxi = useBombMaxiStats('0xd6f52e8ab206e59a1e13b3d6c5b7f31e90ef46ef000200000000000000000028');

  // console.log(bombmaxi);
  // let bomb;
  // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  //   bomb = bombTesting;
  // } else {
  //   bomb = bombProd;
  // }

  const buyBombAddress = //'https://app.1inch.io/#/56/swap/BTCB/BOMB';
    //  'https://pancakeswap.finance/swap?inputCurrency=0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c&outputCurrency=' +
    'https://app.bogged.finance/bsc/swap?tokenIn=0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c&tokenOut=0x522348779DCb2911539e76A1042aA922F9C47Ee3';
  //https://pancakeswap.finance/swap?outputCurrency=0x531780FAcE85306877D7e1F05d713D1B50a37F7A';
  const buyBShareAddress = //'https://app.1inch.io/#/56/swap/BNB/BSHARE';
    'https://app.bogged.finance/bsc/swap?tokenIn=BNB&tokenOut=0x531780FAcE85306877D7e1F05d713D1B50a37F7A';
  const buyBusmAddress =
    'https://app.bogged.finance/bsc/swap?tokenIn=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&tokenOut=0x6216B17f696B14701E17BCB24Ec14430261Be94A';
  const bombLPStats = useMemo(() => (bombFtmLpStats ? bombFtmLpStats : null), [bombFtmLpStats]);
  const bshareLPStats = useMemo(() => (bShareFtmLpStats ? bShareFtmLpStats : null), [bShareFtmLpStats]);
  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
  const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);

  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const bSharePriceInBNB = useMemo(
    () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
    [bShareStats],
  );
  const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const bombLpZap = useZap({ depositTokenName: 'BOMB-BTCB-LP' });
  const bshareLpZap = useZap({ depositTokenName: 'BSHARE-BNB-LP' });

  const [onPresentBombZap, onDissmissBombZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissBombZap();
      }}
      tokenName={'BOMB-BTCB-LP'}
    />,
  );

  const [onPresentBshareZap, onDissmissBshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissBshareZap();
      }}
      tokenName={'BSHARE-BNB-LP'}
    />,
  );

  const [modal, setModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const openModal = () => {
    setModal(!modal);
  };

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };

  // const [onPresentIntroVid] = useModal(
  //   <grid>
  //     <Paper>
  //       <div>
  //         <iframe
  //           width="560"
  //           height="315"
  //           src="https://www.youtube.com/embed/nhCWmmRNNhc"
  //           title="YouTube video player"
  //           frameborder="0"
  //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //           allowfullscreen
  //         ></iframe>
  //       </div>
  //     </Paper>
  //   </grid>,
  // );

  return (
    <Page>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <BackgroundImage />
      <Grid container spacing={3}>
        
        {/* Explanation text */}
        <Grid item xs={12} sm={14}>
          <Paper>
            <Box p={4} style={{ textAlign: 'center', color:"white" }}>
              <div style={{fontWeight:"600", fontSize:20, marginBottom:10}}>Bomb Finance Summary</div>
         <div style={{height:1, backgroundColor:"#999", marginBottom:12}} />
         <div className='f' style={{  justifyContent:"space-between"}}>
            <div>
              <div className='f' style={{fontSize:12, color:"#ccc", justifyContent:"space-evenly",paddingBottom:4, marginLeft:120, borderBottom:"solid #888 1px"}}>
                <div style={{marginRight:12, paddingTop:20}}>Current Supply</div>
                <div style={{marginRight:12, paddingTop:20}}>Total Supply</div>
                <div style={{marginRight:12, paddingTop:20}}>Price</div>
              </div>
              {list.map((item, idx) => (<div key={idx} className='f' style={{borderBottom:"solid #888 1px", marginLeft:40}}>
                <div style={{paddingTop:10, paddingBottom:10, width: 100}}> {item.name} </div> 
                <div style={{paddingTop:10, paddingBottom:10, width: 100}}> {item.currentSupply} </div>
                <div style={{paddingTop:10, paddingBottom:10, width: 100}}> {item.totalSupply} </div>
                <div style={{paddingTop:10,fontSize:18, paddingBottom:10, width: 120}}><div>{item.price.dollar}</div><div>{item.price.bitcoin}</div></div>
                </div>))}
            </div>
            <div >
              <div>
              Current Epoch
              </div>
              <div style={{fontSize:44}}>
                256
              </div>
              <hr />
              <div style={{fontSize:44}}>
                03:36:38
              </div>
              <div>
              Next Epoch in
              </div>
              <hr />
              <div style={{color:'#aaa'}}>
              Live TWAP: <span style={{color:"greenyellow"}}>1.17</span>
              </div>
              <div style={{color:'#aaa'}}>
              TVL: <span style={{color:"greenyellow"}}>$5.002.412</span>
              </div>
              <div style={{color:'#aaa'}}>
              Last Epoch TWAP: <span style={{color:"greenyellow"}}>1.22</span>
              </div>
            </div>
         </div>
            </Box>
          </Paper>
        </Grid>

        <div className='f' style={{width:"80vw", marginTop:10}}>
          <Box style={{width:"60%",marginLeft:20, marginRight:20}}>
            <div style={{textAlign:"right", marginBottom:12}}>
              <a href="#" style={{color:'cyan'}}>
             Read Investment Strategy {">"}
              </a>
            </div>
            <div style={{paddingTop:8, paddingBottom:8,textAlign:"center", backgroundColor:"cyan"}}>
              INVEST NOW
            </div>
            <div className='f' style={{gap:3, marginTop:8, marginBottom:6}}>
    <div style={{paddingTop:8, paddingBottom:8,textAlign:"center", backgroundColor:"#aaaaaa99", flexGrow:1}}><a href='http://discord.bomb.money/' style={{color:'white'}}>
       Chats on Discord
      </a>
       </div>
    <div style={{paddingTop:8, paddingBottom:8,textAlign:"center", backgroundColor:"#aaaaaa99", flexGrow:1}}><a href="https://docs.bomb.money/" style={{color:'white'}}>Read Docs</a></div>
            </div>
            <Paper style={{height:170, borderRadius:10, padding:14}}>
            <div  className='f' style={{justifyContent:"space-between",marginLeft:6, marginRight:6,paddingBottom:4, borderBottom:"solid #999 0.8px"}}>
       Boardroom  <div>TVL: $1,008,430</div>
        </div>
        <div style={{textAlign:"right", fontSize:12, marginTop:8}}>Total Staked: 7232</div>
        <div style={{display:'flex', justifyContent:"space-between", padding:10}}>
          <div>Daily Returns <br /> 2%</div>
          <div>Your Stake</div>
          <div>Earned</div>
          <div style={{borderRadius:100, padding:'2px 8px', border:"solid #999 0.8px", height:"fit-content"}}>Deposit</div>
          <div style={{borderRadius:100, padding:'2px 8px', border:"solid #999 0.8px", height:"fit-content"}}>Withdraw</div>
        </div>
            </Paper>
            </Box>
          <Paper style={{width:"40%", height:285, borderRadius:10, padding:15, fontSize:20}}>
            Latest News
          </Paper>
        </div>

      </Grid>
      <Paper style={{padding:24, borderRadius:12, marginInline:10, marginTop: 40}}>
    <div className='f' style={{justifyContent:"space-between"}}>
      <span style={{fontSize:22}}>
      Bomb Farms
      </span>
    <div style={{borderRadius:100, padding:'2px 8px', border:"solid #999 0.8px"}}>Claim All</div>
    </div>
    <div style={{fontSize:12, marginBottom:20}}>Stake your LP tokens in our farms to start earning $BSHARE </div>
      <div  className='f' style={{justifyContent:"space-between",marginLeft:6, marginRight:6,paddingBottom:4, borderBottom:"solid #999 0.8px"}}>
        BOMB-BTCB 
        <div>TVL: $1,008,430</div>
        </div>
        <div style={{textAlign:"right"}}>Total Staked: 7232</div>
        <div style={{display:'flex', justifyContent:"space-between", padding:20}}>
          <div>Daily Returns <br /> 2%</div>
          <div>Your Stake</div>
          <div>Earned</div>
          <div style={{borderRadius:100, padding:'2px 8px', border:"solid #999 0.8px", height:"fit-content"}}>Deposit</div>
          <div style={{borderRadius:100, padding:'2px 8px', border:"solid #999 0.8px", height:"fit-content"}}>Withdraw</div>
          <div style={{borderRadius:100, padding:'2px 8px', border:"solid #999 0.8px", height:"fit-content"}}>Claim reward</div>
        </div>
        <div  className='f' style={{justifyContent:"space-between",marginLeft:6, marginRight:6,paddingBottom:4, borderBottom:"solid #999 0.8px"}}>
        BESHARE BNB
        <div>TVL: $1,008,430</div>
        
      </div>
      <div style={{display:'flex', justifyContent:"space-between", padding:20}}>
          <div>Daily Returns <br /> 2%</div>
          <div>Your Stake</div>
          <div>Earned</div>
          <div style={{borderRadius:100, padding:'2px 8px', border:"solid #999 0.8px", height:"fit-content"}}>Deposit</div>
          <div style={{borderRadius:100, padding:'2px 8px', border:"solid #999 0.8px", height:"fit-content"}}>Withdraw</div>
          <div style={{borderRadius:100, padding:'2px 8px', border:"solid #999 0.8px", height:"fit-content"}}>Claim reward</div>
        </div>
      </Paper>
      {/* <Paper style={{padding:18, borderRadius:12, marginInline:10, marginTop: 20}}>
    <div className='f'><span style={{fontSize:22}}>
      Bomb Farms
      </span>
      </div>
    <div style={{fontSize:12}}>Stake your LP tokens in our farms to start earning $BSHARE</div>
    <div  className='f' style={{justifyContent:"space-between"}}>
    BOMB-BTCB 
    <div>TVL: $1,008,430</div>
    </div>
    <div  className='f' style={{justifyContent:"space-between"}}>
    BOMB-BTCB 
    <div>TVL: $1,008,430</div>
    </div>
      </Paper> */}
    </Page>
  );
};

export default Dashboard;
