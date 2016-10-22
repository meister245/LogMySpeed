from sqlalchemy import Column, Integer
from sqlalchemy.orm import relationship

from model.base import Base


class Room(Base):
    __tablename__ = 'room'

    room_id = Column(Integer, primary_key=True, autoincrement=True)
    room_number = Column(Integer, unique=True, nullable=False)
    floor = Column(Integer, nullable=False)

    speedtest = relationship("SpeedTest", uselist=True, backref="room", cascade="save-update")
