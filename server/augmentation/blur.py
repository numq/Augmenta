from albumentations import (Blur, MotionBlur, GaussianBlur, GlassBlur, AdvancedBlur, MedianBlur, Defocus, ZoomBlur)

from augmentation.augmentation import Augmentation

category = 'blur'


class BlurAugmentation(Augmentation):
    def __init__(self):
        super().__init__('blur', 'Blur', category)

    def generate(self, image):
        return Blur(p=1)(image=image)['image']


class MotionBlurAugmentation(Augmentation):
    def __init__(self):
        super().__init__('motion_blur', 'Motion Blur', category)

    def generate(self, image):
        return MotionBlur(p=1)(image=image)['image']


class GaussianBlurAugmentation(Augmentation):
    def __init__(self):
        super().__init__('gaussian_blur', 'Gaussian Blur', category)

    def generate(self, image):
        return GaussianBlur(p=1)(image=image)['image']


class GlassBlurAugmentation(Augmentation):
    def __init__(self):
        super().__init__('glass_blur', 'Glass Blur', category)

    def generate(self, image):
        return GlassBlur(p=1)(image=image)['image']


class AdvancedBlurAugmentation(Augmentation):
    def __init__(self):
        super().__init__('advanced_blur', 'Advanced Blur', category)

    def generate(self, image):
        return AdvancedBlur(p=1)(image=image)['image']


class MedianBlurAugmentation(Augmentation):
    def __init__(self):
        super().__init__('median_blur', 'Median Blur', category)

    def generate(self, image):
        return MedianBlur(p=1)(image=image)['image']


class DefocusAugmentation(Augmentation):
    def __init__(self):
        super().__init__('defocus', 'Defocus', category)

    def generate(self, image):
        return Defocus(p=1)(image=image)['image']


class ZoomBlurAugmentation(Augmentation):
    def __init__(self):
        super().__init__('zoom_blur', 'Zoom Blur', category)

    def generate(self, image):
        return ZoomBlur(p=1)(image=image)['image']
