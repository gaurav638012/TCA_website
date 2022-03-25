-- returns data for batsman match_wise for first innings

`select sum(B.runs_scored) as runs,
(select C.player_name from player as C where C.player_id = B.striker) as p_name,
(select count(*) from ball_by_ball as C where C.striker = B.striker and C.runs_scored = 4 and C.match_id = $1) as fours,
 (select count(*) from ball_by_ball as C where C.striker = B.striker and C.runs_scored = 6 and C.match_id = $1) as sixs,
  (select count(*) from ball_by_ball as C where C.striker = B.striker  and C.match_id = $1) as balls
from ball_by_ball as B
where  B.innings_no = 2 and B.match_id = $1
group by B.striker`

`select count(distinct B.over_id) as overs,
sum(runs_scored) as runs,
(select C.player_name from player as C where C.player_id = B.bowler) as p_name,
(select count(*) from ball_by_ball as C where C.match_id = $1 and C.bowler = B.bowler and 
C.out_type is not null and C.out_type not in ('run out','retired hurt')
) as wickets, 
sum(extra_runs) as extras
from ball_by_ball as B 
where B.innings_no = 1 and B.match_id = $1
group by B.bowler`

'
select (select sum(A.runs_scored+A.extra_runs) from ball_by_ball as A where C.match_id = $1 and C.innings_no = 1 and C.over_id = over_id )
from ball_by_ball as B
where B.innings_no = 1 and B.match_id = $1
group by over_id order by 
where 
'

`
select over_id,sum(runs_scored+extra_runs) as runs
from ball_by_ball as B
where B.innings_no = $2 and B.match_id = $1
group by over_id order by over_id 
`

`
select distinct over_id 
from ball_by_ball as B
where match_id = $1 and innings_no = $2 and (out_type is not null)
`


`
select  (select count(*) from ball_by_ball as C where C.match_id = $1 and C.runs_scored = 1 and C.innings_no = $2) as ones,
(select count(*) from ball_by_ball as C where C.match_id = $1 and C.runs_scored = 2 and C.innings_no = $2)*2 as twos,
(select count(*) from ball_by_ball as C where C.match_id = $1 and C.runs_scored = 3 and C.innings_no = $2)*3 as threes,
(select count(*) from ball_by_ball as C where C.match_id = $1 and C.runs_scored = 4 and C.innings_no = $2)*4 as fours,
(select count(*) from ball_by_ball as C where C.match_id = $1 and C.runs_scored = 6 and C.innings_no = $2)*6 as sixes,
(select sum(extra_runs) from ball_by_ball as C where C.match_id = $1 and C.innings_no = $2) as extras
from ball_by_ball as B
where B.match_id = $1 and B.innings_no = $2 and ball_id = 1 and over_id = 1
`

`
with runs_sum as 
(
select sum(B.runs_scored) as runs,
    (select C.player_name from player as C where C.player_id = B.striker) as p_name,
    (select count(*) from ball_by_ball as C where C.striker = B.striker and C.runs_scored = 4 and C.match_id = $1) as fours,
     (select count(*) from ball_by_ball as C where C.striker = B.striker and C.runs_scored = 6 and C.match_id = $1) as sixes,
      (select count(*) from ball_by_ball as C where C.striker = B.striker  and C.match_id = $1) as balls
    from ball_by_ball as B
    where  B.innings_no = $2 and B.match_id = $1
    group by B.striker
)
select runs,p_name,balls from
(select runs_sum.*,RANK() over (order by runs DESC ,balls) as rank 
from runs_sum) as temp
where rank<4 and runs>0
`

`
with wicket_sum as
(
select (select count(*) from ball_by_ball as C where C.match_id = $1 and C.bowler = B.bowler ) as balls,
    sum(runs_scored) as runs,
    (select C.player_name from player as C where C.player_id = B.bowler) as p_name,
    (select count(*) from ball_by_ball as C where C.match_id = $1 and C.bowler = B.bowler and 
    C.out_type is not null and C.out_type not in ('run out','retired hurt')
    ) as wickets, 
    sum(extra_runs) as extras
    from ball_by_ball as B 
    where B.innings_no = $2 and B.match_id = $1
    group by B.bowler
)
select p_name,wickets,runs,balls from
(select wicket_sum.*,RANK() over (order by wickets DESC ,runs,balls) as rank 
from wicket_sum) as temp
where rank<4 and wickets>0
`

`
select *
from player
where player_id = $1
`

`
with runs_per_match as (
  select match_id,sum(runs_scored) as runs
  from ball_by_ball as B
  where  B.striker = $1 
  group by match_id order by match_id
),
dismissal as (
  select count(*) as counter
  from ball_by_ball as B
  where B.striker = $1 and (out_type is not null) 
),
runs_taken as (
  select sum(runs_scored) as runs from ball_by_ball as B where striker =$1
),
balls_faced as (
  select count(*) as balls from ball_by_ball where striker = $1
)
select distinct (select count(distinct match_id) from player_match as A where A.player_id = $1) as match_count,
R.runs as runs,
(select sum(runs_scored) from ball_by_ball as B where B.striker = P.player_id and B.runs_scored = 4) as fours,
(select sum(runs_scored) from ball_by_ball as B where B.striker = P.player_id and B.runs_scored = 6) as sixes,
(select count(*) from runs_per_match as A where A.runs>=50) as fifties,
(select max(A.runs) from runs_per_match as A ) as high_score,
(select R.runs*1.0/counter from dismissal) as average,
(select R.runs*100.0/balls from balls_faced) as strike_rate
from player as P,runs_taken as R
where P.player_id = $1 
`

`
select match_id,sum(runs_scored) as runs
  from ball_by_ball as B
  where  B.striker = 8
  group by match_id order by match_id
`



`
with wickets_per_match as (
  select match_id,count(*) as wickets
  from ball_by_ball as B
  where  B.bowler = 14 and (out_type is not null) and (out_type not in ('run out','retired hurt'))
  group by match_id order by match_id
),
overs_per_match as (
  select match_id,count(distinct over_id) as over_p
  from ball_by_ball as B
  where B.bowler = 14 
  group by match_id order by match_id
),
runs_given as (
  select sum(runs_scored+extra_runs) as runs from ball_by_ball as B where bowler = 14
),
overs_bowled as (
  select sum(over_p) as overs from overs_per_match
)
select distinct (select count(distinct match_id) from overs_per_match as A where A.over_p>0) as match_count,
  R.runs as runs,
(select sum(wickets) from wickets_per_match) as wickets,
O.overs as overs,
(select count(*) from ball_by_ball as B where B.bowler = 14) as balls,
R.runs*1.0/O.overs  as economy,
(select count(*) from wickets_per_match where wickets>=5) as haul5
from player as P,runs_given as R,overs_bowled as O
where P.player_id = 8
`

`
with wickets_per_match as (
  select match_id,count(*) as wickets
  from ball_by_ball as B
  where  B.bowler = 14 and (out_type is not null) and (out_type not in ('run out','retired hurt'))
  group by match_id order by match_id
),
runs_per_match as (
  select match_id,sum(runs_scored+extra_runs) as runs
  from ball_by_ball as B
  where  B.bowler = 14 
  group by match_id order by match_id
)
select R.match_id,R.runs,W.wickets
from wickets_per_match as W,runs_per_match as R
where W.match_id = R.match_id
`

`
with one_match as (
  select B.player_id
  from 
  (select count(distinct match_id) as counter,player_id from player_match group by player_id) as B
  where B.counter<2
),
no_of_outs as (
  select count(*) as outs,striker
  from ball_by_ball,one_match 
  where (out_type is not null) and one_match.player_id = striker
  group by striker
)
select sum(runs_scored),outs
from ball_by_ball,no_of_outs
where ball_by_ball.striker = no_of_outs.striker

`

Matches

Runs

wickets

overs

balls

Economy

Five Wickets