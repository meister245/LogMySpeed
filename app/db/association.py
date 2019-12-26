from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship, backref

from ..db.base import Base


class Association(Base):
    __tablename__ = 'association'

    assoc_id = Column(Integer, primary_key=True, autoincrement=True)
    room_id = Column(Integer, ForeignKey('room.room_id'))
    conn_id = Column(Integer, ForeignKey('connection.conn_id'))
    test_id = Column(Integer, ForeignKey('speedtest.test_id'))

    room = relationship('Room', backref=backref('assoc'))
    connection = relationship('Connection', backref=backref('assoc'))
    test = relationship('SpeedTest', backref=backref('assoc'))
