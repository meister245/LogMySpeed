from sqlalchemy import Column, Integer, Float, String, Date, ForeignKeyConstraint, UniqueConstraint, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Room(Base):
    __tablename__ = 'room'

    room_id = Column(Integer, primary_key=True, autoincrement=True)
    room_number = Column(Integer, unique=True, nullable=False)
    floor = Column(Integer, nullable=False)

    speedtest = relationship("SpeedTest", uselist=True, backref="room")


class SpeedTest(Base):
    __tablename__ = 'speedtest'

    test_id = Column(Integer, primary_key=True, autoincrement=True)
    room_id = Column(Integer, nullable=False)
    conn_type = Column(String(10), nullable=False)
    speed = Column(Float, nullable=False)
    test_date = Column(Date, nullable=False)

    __table_args__ = (
        ForeignKeyConstraint(['room_id'], ['room.room_id']),
    )

engine = create_engine('sqlite:///speedmap.sqlite')

Base.metadata.create_all(engine)