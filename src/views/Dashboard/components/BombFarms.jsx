import React, { useMemo } from 'react'
import { Grid, Paper, Button, Box } from '@material-ui/core'
import useTotalValueLocked from '../../../hooks/useTotalValueLocked';
import useBank from '../../../hooks/useBank';
import useStatsForPool from '../../../hooks/useStatsForPool';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useEarnings from '../../../hooks/useEarnings';
import useShareStats from '../../../hooks/usebShareStats';
import useBombStats from '../../../hooks/useBombStats';
import { getDisplayBalance } from '../../../utils/formatBalance';
import { roundAndFormatNumber } from '../../../0x';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useBombFinance from '../../../hooks/useBombFinance';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useWithdrawCheck from '../../../hooks/boardroom/useWithdrawCheck';
import useClaimRewardCheck from '../../../hooks/boardroom/useClaimRewardCheck';
import useRedeemOnBoardroom from '../../../hooks/useRedeemOnBoardroom';
import useHarvest from '../../../hooks/useHarvest';
import Bank from '../../Bank';




const BombFarms = () => {
     const TVL = useTotalValueLocked();
     const bank1 = useBank('BombBtcbLPBShareRewardPool');
     const statsOnPool1 = useStatsForPool(bank1);
     const tShareStats = useShareStats();
     const stakedBalance = useStakedBalanceOnBoardroom();
     const bombFinance = useBombFinance();
     const earnings = useEarnings(Bank.contract, Bank.earnTokenName, Bank.poolId);


     const bombStats = useBombStats();
     const tokenStats1 = bank1.earnTokenName === 'BSHARE' ? tShareStats : bombStats;
     const stakedBalance1 = useStakedBalance(bank1.contract, bank1.poolId);
     const earnings1 = useEarnings(bank1.contract, bank1.earnTokenName, bank1.poolId);
     const [approveStatus, approve] = useApprove(bombFinance.BSHARE, bombFinance.contracts.Boardroom.address);

     const canWithdraw = useWithdrawCheck();
     const canClaimReward = useClaimRewardCheck();
     const { onReward } = useHarvest(Bank);
     const { onRedeem } = useRedeemOnBoardroom();
     const tokenPriceInDollars1 = useMemo(
          () => (tokenStats1 ? Number(tokenStats1.priceInDollars).toFixed(2) : null),
          [tokenStats1],
     );
     const earnedInDollars1 = (Number(tokenPriceInDollars1) * Number(getDisplayBalance(earnings1))).toFixed(2);
     const bank2 = useBank('BshareBnbLPBShareRewardPool');
     const statsOnPool2 = useStatsForPool(bank2);
     const stakedBalance2 = useStakedBalance(bank2.contract, bank2.poolId);
     const earnings2 = useEarnings(bank2.contract, bank2.earnTokenName, bank2.poolId);
     const tokenStats2 = bank2.earnTokenName === 'BSHARE' ? tShareStats : bombStats;
     const tokenPriceInDollars2 = useMemo(
          () => (tokenStats2 ? Number(tokenStats2.priceInDollars).toFixed(2) : null),
          [tokenStats2],
     );
     const earnedInDollars2 = (Number(tokenPriceInDollars2) * Number(getDisplayBalance(earnings2))).toFixed(2);

     const bombFarms = {
          TVL: TVL,
          bank1: bank1,
          statsOnPool1: statsOnPool1,
          stakedBalance1: stakedBalance1,
          earnings1: earnings1,
          earnedInDollars1: earnedInDollars1,
          bank2: bank2,
          statsOnPool2: statsOnPool2,
          stakedBalance2: stakedBalance2,
          earnings2: earnings2,
          earnedInDollars2: earnedInDollars2,
     };
     return (
          <Grid>
               <Paper style={{ width: "100%", margin: "0 1rem 0.3rem 0" }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                         <div style={{ padding: "0.5rem" }}>
                              <h2>Bomb Farms</h2>
                              <div style={{ margin: "0", fontSize: "0.9rem" }}>Stake your LP tokens in our farms to start earning $BSHARE </div>
                         </div>
                         <Button
                              variant='outlined' style={{ borderColor: "white", marginRight: '0.5rem', marginTop: "0.5rem" }}
                              onClick={onReward}
                         // disabled={earnings.eq(0) || !canClaimReward}
                         > Claim All</Button>
                    </div>


                    <Box style={{ margin: "0rem 1rem" }}>
                         <Grid container>
                              <Grid sm={8}>
                                   <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "5px", margin: "0.5rem" }}>
                                        <h3>BOMB-BTCB</h3>
                                        <span style={{ padding: "3px", color: "white", background: "green", fontSize: "12px" }}>Recommanded</span>
                                   </div>
                              </Grid>
                              <Grid sm={4} style={{ textAlign: "end", verticalAlign: "bottom", display: 'flex', alignItems: "center", justifyContent: "flex-end" }} >
                                   <div style={{ padding: "0 0.5rem" }}> TVL: ${roundAndFormatNumber(Number(bombFarms.TVL), 2)}
                                   </div>
                              </Grid>
                              <hr color='white' style={{ width: "98%" }} />
                         </Grid>
                         <Grid container style={{ padding: "0.5rem" }}>
                              <Grid sm={2}>
                                   <div>Daily Returns</div>
                                   <h4>{bombFarms.bank1.closedForStaking ? '0.00' : bombFarms.statsOnPool1?.dailyAPR}%</h4>
                              </Grid>
                              <Grid sm={2}>
                                   <div>Your Stake</div>
                                   <h4>
                                        {getDisplayBalance(bombFarms.stakedBalance1, bombFarms.bank1.depositToken.decimal)}

                                   </h4>
                                   <div>=${bombFarms.stakeearnedInDollars1}</div>
                              </Grid>
                              <Grid sm={2}>
                                   <div>Earned</div>
                                   <h4>{getDisplayBalance(bombFarms.earnings1)}</h4>
                                   <div>=${bombFarms.earnedInDollars1}</div>
                              </Grid>
                              <Grid sm={6} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }} >
                                   <Button variant='outlined' style={{ width: "20%", borderColor: "white" }}
                                        // disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                                        onClick={approve}> Deposit
                                   </Button>
                                   <Button variant='outlined' style={{ width: "20%", borderColor: "white" }}
                                        // disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                                        onClick={onRedeem}
                                   >
                                        Withdraw
                                   </Button>

                                   <Button variant='outlined'
                                        style={{ width: "40%", borderColor: "white" }}
                                        onClick={onReward}
                                   // disabled={earnings.eq(0) || !canClaimReward}
                                   > Claim Rewards</Button>
                              </Grid>
                         </Grid>
                    </Box>
                    <Box style={{ margin: "0rem 1rem" }}>
                         <Grid container>
                              <Grid sm={8}>
                                   <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "5px", margin: "0.5rem" }}>
                                        <h3>BSHARE-BNB</h3>
                                        <span style={{ padding: "3px", color: "white", background: "green", fontSize: "12px" }}>Recommanded</span>
                                   </div>
                              </Grid>
                              <Grid sm={4} style={{ textAlign: "end", verticalAlign: "bottom", display: 'flex', alignItems: "flex-end", justifyContent: "flex-end" }} >
                                   <div style={{ padding: "0 0.5rem" }}> TVL: ${roundAndFormatNumber(Number(bombFarms.TVL), 2)}
                                   </div>
                              </Grid>
                              <hr color='white' style={{ width: "98%" }} />
                         </Grid>
                         <Grid container style={{ padding: "0.5rem" }}>
                              <Grid sm={2}>
                                   <div>Daily Returns</div>
                                   <h4>{bombFarms.bank2.closedForStaking ? '0.00' : bombFarms.statsOnPool2?.dailyAPR}%</h4>
                              </Grid>
                              <Grid sm={2}>
                                   <div>Your Stake</div>
                                   <h4>
                                        {getDisplayBalance(bombFarms.stakedBalance2, bombFarms.bank2.depositToken.decimal)}

                                   </h4>
                                   <div>=${bombFarms.stakeearnedInDollars2}</div>
                              </Grid>
                              <Grid sm={2}>
                                   <div>Earned</div>
                                   <h4>
                                        {getDisplayBalance(bombFarms.earnings2)}

                                   </h4>
                                   <div>=${bombFarms.earnedInDollars2}</div>
                              </Grid>
                              <Grid sm={6} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }} >
                                   <Button variant='outlined' style={{ width: "20%", borderColor: "white" }}
                                        // disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                                        onClick={approve} > Deposit</Button>
                                   <Button variant='outlined' style={{ width: "20%", borderColor: "white" }}
                                        // disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                                        onClick={onRedeem}
                                   >
                                        Withdraw
                                   </Button>
                                   <Button variant='outlined'
                                        style={{ width: "40%", borderColor: "white" }}
                                        onClick={onReward}
                                   // disabled={earnings.eq(0) || !canClaimReward}
                                   > Claim Rewards</Button>
                              </Grid>
                         </Grid>

                    </Box>
               </Paper>
          </Grid>)
}

export default BombFarms