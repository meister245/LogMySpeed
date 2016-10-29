from sqlalchemy import Table, Column, Integer, ForeignKey

from base import Base

room_conn = Table('room_conn', Base.metadata,
    Column('id_room', Integer, ForeignKey('room.room_id')),
    Column('id_connection', Integer, ForeignKey('connection.conn_id'))
)
