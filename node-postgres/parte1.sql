with
x as (
	select v.venue_id, v.venue_name, concat(v.city_name, ', ', v.country_name)as address, v.capacity, m.match_id, m.win_type, b.innings_no, sum(b.runs_scored) + sum(b.extra_runs) as score
	from venue as v, match as m, ball_by_ball as b
	where v.venue_id = m.venue_id and m.match_id = b.match_id
	group by v.venue_id, m.match_id, b.innings_no),
y as (
	select venue_id, venue_name, address, capacity, count(*)/2 as num_matches, max(score) as highest_score, min(score) as least_score, sum(case when win_type = 'runs' then 1 else 0 end)/2 as inn1wins, sum(case when win_type = 'wickets' then 1 else 0 end)/2 as inn2wins, sum(case when win_type is null then 1 else 0 end)/2 as tied
	from x group by venue_id, venue_name, address, capacity),
z as (
	select venue_id, max(score)+1 as highest_score_chased
	from x where win_type = 'wickets' and innings_no = 1
	group by venue_id),
w as (select y.*, z.highest_score_chased from y natural left outer join z order by y.venue_id)
select * from w where venue_id = $1;