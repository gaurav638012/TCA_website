create sequence if not exists auto_increment_id_seq;
alter table venue alter venue_id set default nextval('auto_increment_id_seq');
select setval('auto__increment_id_seq', 119);