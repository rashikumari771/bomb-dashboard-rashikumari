import React, { useMemo } from 'react'
import { Box, Grid, Paper } from '@material-ui/core';
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';
import ProgressCountdown from '../../Boardroom/components/ProgressCountdown';
import moment from 'moment';
// hooks imports
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';
import useBombStats from '../../../hooks/useBombStats';
import useCashPriceInEstimatedTWAP from '../../../hooks/useCashPriceInEstimatedTWAP';
import useTotalValueLocked from '../../../hooks/useTotalValueLocked';
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP';
import useBombFinance from '../../../hooks/useBombFinance';
import usebShareStats from '../../../hooks/usebShareStats';
import useBondStats from '../../../hooks/useBondStats';

// image imports
import MetamaskFox from '../../../assets/img/metamask-fox.svg'
import bombImg from '../../../assets/img/bomb.png'
import bshareImage from '../../../assets/img/bshares.png'
import bbondImg from '../../../assets/img/bbond.png'
// utils imports
import { roundAndFormatNumber } from '../../../0x';


const BombFInanceSummary = () => {

     let currentEpoch = useCurrentEpoch();
     let { to } = useTreasuryAllocationTimes();
     const cashStat = useCashPriceInEstimatedTWAP();
     const livetwap = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
     const lastCashStat = useCashPriceInLastTWAP();
     const lasttwap = (Number(lastCashStat) / 100000000000000).toFixed(4);
     const bombFinance = useBombFinance();
     const bombStats = useBombStats();
     const bBondStats = useBondStats();

     // bomb share data
     const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
     const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);
     const bombPriceInDollars = useMemo(
          () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
          [bombStats],
     );
     const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
     // bshare data
     let bShareStats = usebShareStats();
     const bShareCirculatingSupply = useMemo(
          () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
          [bShareStats],
     );
     const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);
     const bSharePriceInDollars = useMemo(
          () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
          [bShareStats],
     );

     const bSharePriceInBNB = useMemo(
          () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
          [bShareStats],
     );
     //bbond data
     const bBondCirculatingSupply = useMemo(
          () => (bBondStats ? String(bBondStats.circulatingSupply) : null),
          [bBondStats],
     );
     const bBondTotalSupply = useMemo(() => (bBondStats ? String(bBondStats.totalSupply) : null), [bBondStats]);

     const bBondPriceInDollars = useMemo(
          () => (bBondStats ? Number(bBondStats.priceInDollars).toFixed(2) : null),
          [bBondStats],
     );
     const bBondPriceInBNB = useMemo(() => (bBondStats ? Number(bBondStats.tokenInFtm).toFixed(4) : null), [bBondStats]);

     //summary object
     const bombFinSummmery = {
          bomb: {
               currentSupply: bombCirculatingSupply,
               totalSupply: bombTotalSupply,
               price: { indollar: bombPriceInDollars, inbnb: bombPriceInBNB },
          },
          bshare: {
               currentSupply: bShareCirculatingSupply,
               totalSupply: bShareTotalSupply,
               price: { indollar: bSharePriceInDollars, inbnb: bSharePriceInBNB },
          },
          bbond: {
               currentSupply: bBondCirculatingSupply,
               totalSupply: bBondTotalSupply,
               price: { indollar: bBondPriceInDollars, inbnb: bBondPriceInBNB },
          },
     };



     const tvl = useTotalValueLocked();

     return (
          <Grid container
               style={{ display: 'flex', justifyContent: 'center', verticalAlign: 'middle', overflow: 'hidden' }}
          >
               <Paper style={{ width: "100%", padding: "1rem" }}>
                    <h2 style={{ textAlign: "center", }}>Bomb Finance Summary</h2>
                    <hr style={{ width: "95%" }} />
                    <Box style={{ display: "flex", alignItems: 'center', justifyContent: 'space-around' }}>
                         <Grid container spacing={1} sm={8} >
                              <Grid container item spacing={1} >
                                   <Grid item sm={1} style={{ display: "flex", alignItems: "center" }}></Grid>

                                   <Grid item sm={2} style={{ display: "flex", alignItems: "center" }}></Grid>
                                   <Grid item sm={2} style={{ display: "flex", alignItems: "center" }}>Current Supply</ Grid>
                                   <Grid item sm={2} style={{ display: "flex", alignItems: "center" }}>Total Supply</Grid>
                                   <Grid item sm={2} style={{ display: "flex", alignItems: "center" }}>Price</Grid>
                                   <Grid item sm={2} style={{ display: "flex", alignItems: "center" }}>

                                   </Grid>
                                   <Grid item sm={1} style={{ display: "flex", alignItems: "center" }}></Grid>


                              </Grid>
                              <hr style={{ width: "80%" }} />


                              <Grid container item spacing={1}>
                                   <Grid item sm={1} style={{ display: "flex", alignItems: "center" }} ></Grid>

                                   <Grid item sm={2} style={{ display: "flex", alignItems: "center" }} >
                                        <img
                                             onClick={() => {
                                                  bombFinance.watchAssetInMetamask('BOMB');
                                             }}
                                             alt="metamask fox"
                                             style={{ width: '25px' }}
                                             src={bombImg}
                                        />
                                        $BOMB</Grid>
                                   <Grid item sm={2} style={{ display: "flex", alignItems: "center" }}>{roundAndFormatNumber(bombFinSummmery.bomb.currentSupply, 2)}M</Grid>
                                   <Grid item sm={2} style={{ display: "flex", alignItems: "center" }}>{roundAndFormatNumber(bombFinSummmery.bomb.totalSupply, 2)}K</ Grid>
                                   <Grid item sm={2} style={{ display: "flex", flexDirection: "column" }}>
                                        <div>${roundAndFormatNumber(bombFinSummmery.bomb.price.indollar, 2)}</div>
                                        <div>{roundAndFormatNumber(bombFinSummmery.bomb.price.inbnb, 2)}BTCB</div>
                                   </Grid>
                                   <Grid item sm={2} style={{ display: "flex", alignItems: "center" }}>
                                        <img src={MetamaskFox} sizes={2} height="40px" alt="" onClick={() => {
                                             bombFinance.watchAssetInMetamask('BOMB');
                                        }} />
                                   </Grid>
                                   <Grid item sm={1} style={{ display: "flex", alignItems: "center" }}></Grid>


                              </Grid>
                              <hr style={{ width: "80%" }} />


                              <Grid container item spacing={1}>
                                   <Grid item sm={1} style={{ display: "flex", alignItems: "center" }}></Grid>

                                   <Grid item sm={2} style={{ display: "flex", alignItems: "center" }} >
                                        <img
                                             onClick={() => {
                                                  bombFinance.watchAssetInMetamask('BSHARE');
                                             }}
                                             alt="metamask fox"
                                             style={{ width: '25px' }}
                                             src={bshareImage}
                                        />
                                        $BSHARE</Grid>
                                   <Grid item sm={2} style={{ display: "flex", alignItems: "center" }}>{roundAndFormatNumber(bombFinSummmery.bshare.currentSupply, 2)}M</Grid>
                                   <Grid item sm={2} style={{ display: "flex", alignItems: "center" }}>{roundAndFormatNumber(bombFinSummmery.bshare.totalSupply, 2)}K</ Grid>
                                   <Grid item sm={2} style={{ display: "flex", flexDirection: "column" }}>
                                        <div>${roundAndFormatNumber(bombFinSummmery.bshare.price.indollar, 2)}</div>
                                        <div>{roundAndFormatNumber(bombFinSummmery.bshare.price.indollar, 2)}BTCB</div>
                                   </Grid>
                                   <Grid item sm={2} style={{ display: "flex", alignItems: "center" }} >
                                        <img src={MetamaskFox} sizes={2} height="40px" alt="" onClick={() => {
                                             bombFinance.watchAssetInMetamask('BSHARE');
                                        }} />
                                   </Grid>
                                   <Grid item sm={1} style={{ display: "flex", alignItems: "center" }}></Grid>

                              </Grid>
                              <hr style={{ width: "80%" }} />

                              <Grid container item spacing={1}>
                                   <Grid item sm={1} style={{ display: "flex", alignItems: "center" }}></Grid>

                                   <Grid item sm={2} style={{ display: "flex", alignItems: "center" }} >
                                        <img
                                             onClick={() => {
                                                  bombFinance.watchAssetInMetamask('BBOND');
                                             }}
                                             alt="metamask fox"
                                             style={{ width: '25px' }}
                                             src={bbondImg}
                                        />$BBOND</Grid>
                                   <Grid item sm={2} style={{ display: "flex", alignItems: "center" }}>{roundAndFormatNumber(bombFinSummmery.bbond.currentSupply, 2)}M</Grid>
                                   <Grid item sm={2} style={{ display: "flex", alignItems: "center" }}>{roundAndFormatNumber(bombFinSummmery.bbond.totalSupply, 2)}K</ Grid>
                                   <Grid item sm={2} style={{ display: "flex", flexDirection: "column" }}>
                                        <div>${roundAndFormatNumber(bombFinSummmery.bshare.price.indollar, 2)}</div>
                                        <div>{roundAndFormatNumber(bombFinSummmery.bshare.price.inbnb, 2)}BTCB</div>
                                   </Grid>
                                   <Grid item sm={2} style={{ display: "flex", alignItems: "center" }}>
                                        <img src={MetamaskFox} sizes={2} height="40px" alt="" onClick={() => {
                                             bombFinance.watchAssetInMetamask('BBOND');
                                        }} />
                                   </Grid>
                                   <Grid item sm={1} style={{ display: "flex", alignItems: "center" }}></Grid>

                              </Grid>
                         </Grid>
                         <Grid sm={4}>
                              <div>
                                   <h3>Current Epoch</h3>
                                   <h1>{Number(currentEpoch)}</h1>
                              </div>
                              <hr />
                              <div>
                                   <h1>
                                        <ProgressCountdown
                                             className="Bfs_number"
                                             base={moment().toDate()}
                                             hideBar={true}
                                             deadline={to}
                                             description="Next Epoch"
                                             style={{ textAlign: "left !important" }}
                                        />
                                   </h1>

                                   <h3>Next Epoch in</h3>
                              </div>
                              <hr />
                              <div>
                                   <div>Live TWAP: <span style={{ color: "green" }}>{livetwap}</span></div>
                                   <div>TVL: <span style={{ color: "green" }}>${roundAndFormatNumber(Number(tvl), 2)}</span> </div>
                                   <div>Last Epoc TWAP: <span style={{ color: "green" }}> {lasttwap}</span> </div>
                              </div>
                         </Grid>
                    </Box>
               </Paper>
          </Grid>
     )
}

export default BombFInanceSummary