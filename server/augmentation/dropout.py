from albumentations import (ChannelDropout, CoarseDropout, GridDropout, XYMasking)

from augmentation.augmentation import Augmentation

category = 'dropout'


class ChannelDropoutAugmentation(Augmentation):
    def __init__(self):
        super().__init__('channel_dropout', 'Channel Dropout', category)

    def generate(self, image):
        return ChannelDropout(p=1)(image=image)['image']


class CoarseDropoutAugmentation(Augmentation):
    def __init__(self):
        super().__init__('coarse_dropout', 'Coarse Dropout', category)

    def generate(self, image):
        return CoarseDropout(p=1)(image=image)['image']


class GridDropoutAugmentation(Augmentation):
    def __init__(self):
        super().__init__('grid_dropout', 'Grid Dropout', category)

    def generate(self, image):
        return GridDropout(p=1)(image=image)['image']


class XYMaskingAugmentation(Augmentation):
    def __init__(self):
        super().__init__('xy_masking', 'XY Masking', category)

    def generate(self, image):
        return XYMasking(p=1)(image=image)['image']
