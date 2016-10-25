from datetime import datetime

from sqlalchemy import Column, Integer, Float, String, Date, ForeignKeyConstraint

from model.base import Base


class SpeedTest(Base):
    __tablename__ = 'speedtest'

    test_id = Column(Integer, primary_key=True, autoincrement=True)
    room_id = Column(Integer, nullable=False)
    nickname = Column(String(15), nullable=True)
    device_type = Column(String(10), nullable=False)
    download_speed = Column(Float, nullable=False)
    test_date = Column(Date, nullable=False)

    __table_args__ = (
        ForeignKeyConstraint(['room_id'], ['room.room_id']),
    )

    def to_dict(self):
        speedtest_dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        speedtest_dict['test_date'] = datetime.strftime(speedtest_dict['test_date'], '%Y-%m-%d')
        return speedtest_dict
