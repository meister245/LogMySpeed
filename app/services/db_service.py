from model.room_model import Room


class DBService:
    def __init__(self, session):
        self.db = session

    def get_items(self, offset=0, limit=20):
        items = self.db.query(Room) \
            .offset(offset) \
            .limit(limit) \
            .all()
        return items