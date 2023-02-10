import React, { useMemo } from 'react'
import useTotalValueLocked from '../../../hooks/useTotalValueLocked';
import useBombStats from '../../../hooks/useBombStats';
import useTotalStakedOnBoardroom from '../../../hooks/useTotalStakedOnBoardroom';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useFetchBoardroomAPR from '../../../hooks/useFetchBoardroomAPR';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useBombFinance from '../../../hooks/useBombFinance';
import useHarvest from '../../../hooks/useHarvest';
import useWithdrawCheck from '../../../hooks/boardroom/useWithdrawCheck';
import useClaimRewardCheck from '../../../hooks/boardroom/useClaimRewardCheck';
import useRedeemOnBoardroom from '../../../hooks/useRedeemOnBoardroom';

import { getDisplayBalance } from '../../../utils/formatBalance';
import { Grid, Button, Paper } from '@material-ui/core';
import { roundAndFormatNumber } from '../../../0x';
import Bank from '../../Bank';

const InvestmentSummary = () => {
     const TVL = useTotalValueLocked();
     const bombStats = useBombStats();
     const totalStaked = useTotalStakedOnBoardroom();
     const stakedBalance = useStakedBalanceOnBoardroom();
     const earnings = useEarningsOnBoardroom();
     const boardroomAPR = useFetchBoardroomAPR();
     const bombFinance = useBombFinance();
     const [approveStatus, approve] = useApprove(bombFinance.BSHARE, bombFinance.contracts.Boardroom.address);
     const canWithdraw = useWithdrawCheck();
     const canClaimReward = useClaimRewardCheck();
     const { onRedeem } = useRedeemOnBoardroom();
     const { onReward } = useHarvest(Bank);




     const tokenPriceInDollars = useMemo(
          () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : 0),
          [bombStats],
     );
     const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

     const boardroom = {
          TVL: TVL,
          bombStats: bombStats,
          totalStaked: totalStaked,
          stakedBalance: stakedBalance,
          earnings: earnings,
          earnedInDollars: earnedInDollars,
          tokenPriceInDollars: tokenPriceInDollars
     };
     console.log(boardroom)

     return (
          <Grid container
               style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', margin: "1rem 0" }}
          >
               <Grid container sm={8}   >
                    <a href="#" style={{ width: "100%", padding: "0 1rem", textAlign: "right" }}>Read Investement Strategy &gt;</a>
                    <Button variant='contained' style={{ background: 'rgb(135, 206, 235)', width: "100%", margin: "0.5rem 1rem 0.3rem 0" }}>Invest Now</Button>
                    <div style={{ width: "100%", margin: "0rem 1rem 0.5rem 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                         <Button variant='contained' style={{ flex: "1", margin: "0.5rem 0.5rem 0.5rem 0" }}>Chat on Discord</Button>
                         <Button variant='contained' style={{ flex: "1", margin: "0.5rem 0 0.5rem 0" }}>Read Docs</Button>
                    </div>
                    <Paper style={{ width: "100%", margin: "0 1rem 0.3rem 0" }}>
                         <Grid container>
                              <Grid sm={8}>
                                   <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "5px", margin: "0.5rem" }}>
                                        <h3>Boardroom </h3>
                                        <span style={{ padding: "3px", color: "white", background: "green", fontSize: "12px" }}>Recommanded</span>
                                   </div>
                                   <div style={{ margin: "0 0.5rem", fontSize: "0.9rem" }}>Stake BSHARE and earn BOMB every epoch</div>
                              </Grid>
                              <Grid sm={4} style={{ textAlign: "end", verticalAlign: "bottom", display: 'flex', alignItems: "flex-end", justifyContent: "flex-end" }} >
                                   <div style={{ padding: "0 0.5rem" }}> TVL: ${roundAndFormatNumber(Number(boardroom.TVL), 2)}
                                   </div>
                              </Grid>
                              <hr color='white' style={{ width: "98%" }} />
                              <Grid sm={12} style={{ display: 'block', width: "100%" }} >
                                   <div style={{ padding: "0 0.5rem", float: "right" }}> Total Staked: {getDisplayBalance(boardroom.totalStaked)}
                                   </div>
                              </Grid>
                         </Grid>
                         <Grid container style={{ padding: "0.5rem" }}>
                              <Grid sm={3}>
                                   <div>Daily Returns</div>
                                   <h4>{boardroomAPR.toFixed(2)}%</h4>
                              </Grid>
                              <Grid sm={3}>
                                   <div>Your Stake</div>
                                   <h4>{getDisplayBalance(boardroom.stakedBalance)}</h4>
                                   <div>{`≈ $${boardroom.tokenPriceInDollars}`}</div>
                              </Grid>
                              <Grid sm={2}>
                                   <div>Earned</div>
                                   <h4>{getDisplayBalance(boardroom.earnings)}</h4>
                                   <div>{`≈ $${boardroom.earnedInDollars}`}</div>
                              </Grid>
                              <Grid sm={4}>
                                   <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <Button variant='outlined' style={{ width: "47%", borderColor: "white" }}
                                             // disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                                             onClick={approve} > Deposit &emsp;
                                        </Button>
                                        <Button variant='outlined' style={{ width: "47%", borderColor: "white" }}
                                             // disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                                             onClick={onRedeem}> Withdraw</Button>
                                   </div>
                                   <Button variant='outlined'

                                        style={{ width: "100%", borderColor: "white", marginTop: "0.5rem" }}
                                        onClick={onReward}
                                   // disabled={earnings.eq(0) || !canClaimReward}
                                   > Claim Rewards</Button>
                              </Grid>
                         </Grid>
                    </Paper>
               </Grid>
               <Grid container sm={4}>
                    <Paper style={{ width: "100%", height: "100%", padding: "0.5rem" }}>
                         <h2>
                              Latest News
                         </h2>
                    </Paper>
               </Grid>


          </Grid>
     )
}

export default InvestmentSummary