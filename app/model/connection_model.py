from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship, backref

from base import Base
from association import association

class Connection(Base):
    __tablename__ = 'connection'

    conn_id = Column(Integer, primary_key=True, autoincrement=True)
    conn_type = Column(String(10), nullable=False)

    rooms = relationship('Room', secondary=association, backref=backref('connections', uselist=True),
                         cascade="save-update")

    tests = relationship('SpeedTest', secondary=association, backref=backref('connection', uselist=True),
                         cascade="save-update")


    def to_dict(self):
        conn_dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        conn_dict['rooms'] = [room.to_dict() for room in self.rooms]
        conn_dict['tests'] = [test.to_dict() for test in self.tests]

        return conn_dict

    def from_dict(self, request_data):
        conn_obj = Connection(conn_type=request_data.get('connType'),
                              rooms=[],
                              tests=[])
        return conn_obj
