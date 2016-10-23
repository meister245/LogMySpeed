from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String

from model.base import Base


class Room(Base):
    __tablename__ = 'room'

    room_id = Column(Integer, primary_key=True, autoincrement=True)
    room_number = Column(Integer, unique=True, nullable=False)
    floor_number = Column(Integer, nullable=False)
    conn_type = Column(String(10), nullable=False)

    tests = relationship("SpeedTest", uselist=True, backref="SpeedTest", cascade="save-update")

    def to_dict(self):
        output_dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        output_dict['tests'] = [speedtest.to_dict() for speedtest in self.tests]

        return output_dict
