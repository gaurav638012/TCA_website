with
x as (
	select m.match_id, m.season_year, v.venue_id, v.venue_name, concat(v.city_name, ', ', v.country_name)as address, v.capacity, m.win_type, b.innings_no, sum(b.runs_scored) + sum(b.extra_runs) as score
	from venue as v, match as m, ball_by_ball as b
	where v.venue_id = m.venue_id and m.match_id = b.match_id
	group by v.venue_id, m.match_id, b.innings_no),
y as (
	select venue_id, season_year, round(avg(score), 2) as avg_score
	from x where innings_no = 1
	group by season_year, venue_id)
select season_year, avg_score from y where venue_id = $1;