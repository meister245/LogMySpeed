from model.room_model import Room


class DBService:
    def __init__(self, session):
        self.db = session

    def get_items(self, conn_type):
        items = self.db.query(Room) \
            .order_by(Room.floor_number, Room.room_number) \
            .filter(Room.conn_type == conn_type) \
            .all()
        return items