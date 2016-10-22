from model.base import Base

from sqlalchemy import Column, Integer, Float, String, Date, ForeignKeyConstraint


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
