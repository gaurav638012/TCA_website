DROP TABLE if exists slot_timings;
DROP TABLE if exists event_booking;
DROP TABLE if exists event_booking_staff;

--Team id and name
CREATE TABLE slot_timings (
    slot1 INT CHECK (slot1>=0),
    slot2 INT CHECK (slot1>=0),
    slot3 INT CHECK (slot1>=0),
    slot4 INT CHECK (slot1>=0)
);

CREATE TABLE event_booking(
    token varchar(40) primary key not null,
    first_name text,
    last_name text,
    phone varchar(15) not null,
    department text,
    rollno varchar(12) not null,
    email text,
    subscribed text,
    total_amount int,
    contribution int,
    extra_passes int,
    slot text,
    booking_time text
);

CREATE TABLE event_booking_staff(
    token varchar(40) primary key not null,
    name text,
    phone varchar(15) not null,
    department text,
    email text,
    subscribed text,
    total_amount int,
    contribution int,
    extra_passes int,
    slot text,
    booking_time text
);

insert into slot_timings values(70,70,70,70);
