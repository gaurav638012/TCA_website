with x as (
	(select match_id, 1 as innings, (select A.team_id from team as A where 
	(A.team_id = toss_winner and toss_name = 'bat') or (A.team_id = team1 and team2 = toss_winner and toss_name = 'field') or (A.team_id = team2 and team1 = toss_winner and toss_name = 'field')) 
	from match group by match_id)
	union
	(select match_id, 2 as innings, (select A.team_id from team as A where 
	(A.team_id = toss_winner and toss_name = 'field') or (A.team_id = team1 and team2 = toss_winner and toss_name = 'bat') or (A.team_id = team2 and team1 = toss_winner and toss_name = 'bat')) 
	from match group by match_id)),
y as (
	select match_id, innings_no, sum(runs_scored) + sum(extra_runs) as runs, max(over_id) as final_over
	from ball_by_ball group by match_id, innings_no),
w as (
	select y.match_id, x.team_id, y.runs, y.final_over
	from y, x where y.match_id = x.match_id and y.innings_no = x.innings),
v as (
	select w1.match_id, w1.team_id, w1.runs as teamruns, w1.final_over as team_over, w2.team_id as opp, w2.runs as oppruns, w2.final_over as opp_over
	from w as w1, w as w2
	where w1.match_id = w2.match_id and w1.team_id <> w2.team_id),
u as (
	select v.match_id, v.team_id, v.teamruns, v.team_over, v.oppruns, v.opp_over, (CASE when m.match_winner = v.team_id then 1 else 0 end) as win, (CASE when m.match_winner = v.opp then 1 else 0 end) as loss,(CASE when m.win_type is null then 1 else 0 end) as tie, m.season_year
	from v, match as m
	where v.match_id = m.match_id),
t as (
	select team_id, count(*) as Mat, sum(win) as Won, sum(loss) as Lost, sum(tie) as Tied, (sum(teamruns)*1.0)/(sum(team_over)*1.0) - ((sum(oppruns)*1.0)/(sum(opp_over)*1.0)) as nr
	from u where season_year = $1
	group by team_id)
select team.team_name, t.mat, t.won, t.lost, t.tied, round(t.nr, 3) as nr, 2*t.won + t.tied as pts
from team, t where team.team_id = t.team_id
order by pts desc, nr desc;