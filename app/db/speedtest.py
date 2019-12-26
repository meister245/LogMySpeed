from datetime import datetime

from sqlalchemy import Column, Integer, Float, String

from ..db.base import Base


class SpeedTest(Base):
    __tablename__ = 'speedtest'

    test_id = Column(Integer, primary_key=True, autoincrement=True)
    nickname = Column(String(30), nullable=False)
    device_type = Column(String(20), nullable=False)
    download_speed = Column(Float, nullable=False)
    remote_addr = Column(String(32), nullable=False)
    test_date = Column(Integer, nullable=False)

    def to_dict(self):
        test_dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        test_dict['test_date'] = Base.format_date(test_dict['test_date'])

        return test_dict

    @staticmethod
    def from_dict(**kwargs):
        return SpeedTest(nickname=kwargs.get('nickname', 'N/A'), device_type=kwargs.get('deviceType'),
                         download_speed=kwargs.get('downloadSpeed'), remote_addr=kwargs.get('remote_addr'),
                         test_date=datetime.now())
