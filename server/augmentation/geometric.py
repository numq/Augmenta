from albumentations import (RandomScale, LongestMaxSize, SmallestMaxSize, Resize, Rotate, RandomRotate90, SafeRotate,
                            ElasticTransform, Perspective, Affine, PiecewiseAffine, VerticalFlip, HorizontalFlip, Flip,
                            Transpose, OpticalDistortion, GridDistortion, PadIfNeeded, D4)

from augmentation.augmentation import Augmentation

category = 'geometric'


class RandomScaleAugmentation(Augmentation):
    def __init__(self):
        super().__init__('random_scale', 'Random Scale', category)

    def generate(self, image):
        return RandomScale(p=1)(image=image)['image']


class LongestMaxSizeAugmentation(Augmentation):
    def __init__(self):
        super().__init__('longest_max_size', 'Longest Max Size', category)

    def generate(self, image):
        return LongestMaxSize(p=1)(image=image)['image']


class SmallestMaxSizeAugmentation(Augmentation):
    def __init__(self):
        super().__init__('smallest_max_size', 'Smallest Max Size', category)

    def generate(self, image):
        return SmallestMaxSize(p=1)(image=image)['image']


class ResizeAugmentation(Augmentation):
    def __init__(self):
        super().__init__('resize', 'Resize', category)

    def generate(self, image):
        height, width = image.shape[:2]
        return Resize(p=1, width=width, height=height)(image=image)['image']


class RotateAugmentation(Augmentation):
    def __init__(self):
        super().__init__('rotate', 'Rotate', category)

    def generate(self, image):
        return Rotate(p=1)(image=image)['image']


class RandomRotate90Augmentation(Augmentation):
    def __init__(self):
        super().__init__('random_rotate_90', 'Random Rotate 90', category)

    def generate(self, image):
        return RandomRotate90(p=1)(image=image)['image']


class SafeRotateAugmentation(Augmentation):
    def __init__(self):
        super().__init__('safe_rotate', 'Safe Rotate', category)

    def generate(self, image):
        return SafeRotate(p=1)(image=image)['image']


class ElasticTransformAugmentation(Augmentation):
    def __init__(self):
        super().__init__('elastic_transform', 'Elastic Transform', category)

    def generate(self, image):
        return ElasticTransform(p=1)(image=image)['image']


class PerspectiveAugmentation(Augmentation):
    def __init__(self):
        super().__init__('perspective', 'Perspective', category)

    def generate(self, image):
        return Perspective(p=1)(image=image)['image']


class AffineAugmentation(Augmentation):
    def __init__(self):
        super().__init__('affine', 'Affine', category)

    def generate(self, image):
        return Affine(p=1)(image=image)['image']


class PiecewiseAffineAugmentation(Augmentation):
    def __init__(self):
        super().__init__('piecewise_affine', 'Piecewise Affine', category)

    def generate(self, image):
        return PiecewiseAffine(p=1)(image=image)['image']


class VerticalFlipAugmentation(Augmentation):
    def __init__(self):
        super().__init__('vertical_flip', 'Vertical Flip', category)

    def generate(self, image):
        return VerticalFlip(p=1)(image=image)['image']


class HorizontalFlipAugmentation(Augmentation):
    def __init__(self):
        super().__init__('horizontal_flip', 'Horizontal Flip', category)

    def generate(self, image):
        return HorizontalFlip(p=1)(image=image)['image']


class FlipAugmentation(Augmentation):
    def __init__(self):
        super().__init__('flip', 'Flip', category)

    def generate(self, image):
        return Flip(p=1)(image=image)['image']


class TransposeAugmentation(Augmentation):
    def __init__(self):
        super().__init__('transpose', 'Transpose', category)

    def generate(self, image):
        return Transpose(p=1)(image=image)['image']


class OpticalDistortionAugmentation(Augmentation):
    def __init__(self):
        super().__init__('optical_distortion', 'Optical Distortion', category)

    def generate(self, image):
        return OpticalDistortion(p=1)(image=image)['image']


class GridDistortionAugmentation(Augmentation):
    def __init__(self):
        super().__init__('grid_distortion', 'Grid Distortion', category)

    def generate(self, image):
        return GridDistortion(p=1)(image=image)['image']


class PadIfNeededAugmentation(Augmentation):
    def __init__(self):
        super().__init__('pad_if_needed', 'Pad If Needed', category)

    def generate(self, image):
        return PadIfNeeded(p=1)(image=image)['image']


class D4Augmentation(Augmentation):
    def __init__(self):
        super().__init__('d4', 'D4', category)

    def generate(self, image):
        return D4(p=1)(image=image)['image']
