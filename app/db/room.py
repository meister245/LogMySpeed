from sqlalchemy import Column, Integer

from ..db.base import Base


class Room(Base):
    __tablename__ = 'room'

    room_id = Column(Integer, primary_key=True, autoincrement=True)
    room_number = Column(Integer, nullable=False)
    floor_number = Column(Integer, nullable=False)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    @staticmethod
    def from_dict(**kwargs):
        return Room(room_number=kwargs.get('roomNumber'), floor_number=kwargs.get('floorNumber'))
