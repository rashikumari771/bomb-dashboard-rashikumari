import React, { useMemo, useCallback } from 'react'
import { Grid, Paper, Button } from '@material-ui/core'
import useBondStats from '../../../hooks/useBondStats';
import useBombFinance from '../../../hooks/useBombFinance';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../../utils/formatBalance';
import { useTransactionAdder } from '../../../state/transactions/hooks';
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP';
import { BOND_REDEEM_PRICE_BN } from '../../../bomb-finance/constants';


const Bonds = () => {
     const bondStat = useBondStats();
     const cashPrice = useCashPriceInLastTWAP();
     const bombFinance = useBombFinance();
     const bondBalance = useTokenBalance(bombFinance?.BBOND);
     const addTransaction = useTransactionAdder();
     const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);




     const handleRedeemBonds = useCallback(
          async (amount) => {
               const tx = await bombFinance?.redeemBonds(amount);
               addTransaction(tx, { summary: `Redeem ${amount} BBOND` });
          },
          [bombFinance, addTransaction],
     );

     const handleBuyBonds = useCallback(
          async (amount) => {
               const tx = await bombFinance?.buyBonds(amount);
               addTransaction(tx, {
                    summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
               });
          },
          [bombFinance, addTransaction],
     );


     const bonds = {
          bondStat: bondStat,
          bombFinance: bombFinance,
          bondBalance: bondBalance,
     };
     return (

          <Grid>
               <Paper style={{ width: "100%", marginTop: "1rem" }}>

                    <Grid sm={12} style={{ padding: '0.5rem' }}>
                         <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "5px", margin: "0.5rem" }}>
                              <h3>Bonds </h3>
                         </div>
                         <div style={{ margin: "0 0.5rem", fontSize: "0.9rem" }}>BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</div>
                    </Grid>
                    <Grid container style={{ display: "flex", alignItems: "center", padding: "1rem" }}>
                         <Grid sm={3}>
                              <div>Current Price (Bomb)^2</div>
                              <h3>BBond = {Number(bonds.bondStat?.tokenInFtm).toFixed(4) || '-'} BTCB</h3>
                         </Grid>
                         <Grid sm={3}>
                              <div>Available to redeem:</div>
                              <h3>{getDisplayBalance(bonds.bondBalance)}</h3>
                         </Grid>
                         <Grid sm={6}  >
                              <div style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                   <div>
                                        <div>Purchase Bond</div>
                                        <div>Bomb is over peg</div>
                                   </div>
                                   <Button variant='outlined' style={{ borderColor: "white", width: "30%" }} onClick={handleBuyBonds}
                                   // disabled={!bondStat || isBondRedeemable}
                                   >
                                        Purchase
                                   </Button>
                              </div>
                              <hr />
                              <div style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                   <div>Redem Bomb</div>
                                   <Button variant='outlined' style={{ borderColor: "white", width: "30%" }} onClick={handleRedeemBonds}
                                   // disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}
                                   >
                                        Redeem
                                   </Button>
                              </div>

                         </Grid>

                    </Grid>

               </Paper>
          </Grid>
     )
}

export default Bonds