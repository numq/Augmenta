class Augmentation:
    def __init__(self, id: str, name: str, category: str):
        self.id = id
        self.name = name
        self.category = category

    def generate(self, *args, **kwargs):
        pass

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category
        }
