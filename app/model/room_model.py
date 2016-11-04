from sqlalchemy import Column, Integer

from base import Base


class Room(Base):
    __tablename__ = 'room'

    room_id = Column(Integer, primary_key=True, autoincrement=True)
    room_number = Column(Integer, nullable=False)
    floor_number = Column(Integer, nullable=False)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def from_dict(self, request_data):
        return Room(room_number=request_data.get('roomNumber'),
                    floor_number=request_data.get('floorNumber'))
