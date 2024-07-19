from albumentations import (RandomCrop, CenterCrop, Crop, RandomResizedCrop, RandomCropFromBorders)

from augmentation.augmentation import Augmentation

category = 'crops'


class RandomCropAugmentation(Augmentation):
    def __init__(self):
        super().__init__('random_crop', 'Random Crop', category)

    def generate(self, image):
        height, width = image.shape[:2]
        return RandomCrop(p=1, height=height, width=width)(image=image)['image']


class CenterCropAugmentation(Augmentation):
    def __init__(self):
        super().__init__('center_crop', 'Center Crop', category)

    def generate(self, image):
        height, width = image.shape[:2]
        return CenterCrop(p=1, height=height, width=width)(image=image)['image']


class CropAugmentation(Augmentation):
    def __init__(self):
        super().__init__('crop', 'Crop', category)

    def generate(self, image):
        height, width = image.shape[:2]
        return Crop(
            p=1,
            x_min=int(width * .1),
            y_min=int(height * .1),
            x_max=int(width * .9),
            y_max=int(height * .9))(image=image)['image']


class RandomResizedCropAugmentation(Augmentation):
    def __init__(self):
        super().__init__('random_resized_crop', 'Random Resized Crop', category)

    def generate(self, image):
        return RandomResizedCrop(p=1, size=image.shape[:2])(image=image)['image']


class RandomCropFromBordersAugmentation(Augmentation):
    def __init__(self):
        super().__init__('random_crop_from_borders', 'Random Crop From Borders', category)

    def generate(self, image):
        return RandomCropFromBorders(p=1)(image=image)['image']
