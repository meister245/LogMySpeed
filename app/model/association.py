from sqlalchemy import Table, Column, Integer, ForeignKey

from base import Base

association = Table('association', Base.metadata,
    Column('id_room', Integer, ForeignKey('room.room_id')),
    Column('id_connection', Integer, ForeignKey('connection.conn_id')),
    Column('id_test', Integer, ForeignKey('speedtest.test_id')))
