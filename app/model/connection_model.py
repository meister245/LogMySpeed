from sqlalchemy.orm import relationship, backref
from sqlalchemy import Column, Integer, String

from base import Base
from association import room_conn
from room_model import Room
from speedtest_model import  SpeedTest

room_obj = Room()
test_obj = SpeedTest()

class Connection(Base):
    __tablename__ = 'connection'

    conn_id = Column(Integer, primary_key=True, autoincrement=True)
    conn_type = Column(String(10), nullable=False)

    rooms = relationship('Room', secondary=room_conn, backref=backref('connections', uselist=True),
                         cascade="save-update")
    tests = relationship('SpeedTest', backref=backref('connection', uselist=True), cascade="save-update")

    def to_dict(self):
        conn_dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        conn_dict['rooms'] = [room.to_dict() for room in self.rooms]
        conn_dict['tests'] = [test.to_dict() for test in self.tests]

        return conn_dict

    def from_dict(self, request_data):
        conn_obj = Connection(conn_type=request_data.get('connType'),
                              rooms=[],
                              tests=[])

        conn_obj.rooms = [room_obj.from_dict(room) for room in request_data.get("rooms", [])]
        conn_obj.tests = [test_obj.from_dict(test) for test in request_data.get("tests", [])]

        return conn_obj
