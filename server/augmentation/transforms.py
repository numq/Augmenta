from albumentations import (Normalize, RandomGamma, RandomGridShuffle, HueSaturationValue, RGBShift, GaussNoise, CLAHE,
                            ChannelShuffle, InvertImg, ToGray, ToRGB, ToSepia, ImageCompression,
                            RandomBrightnessContrast, RandomSnow, RandomGravel, RandomRain, RandomFog, RandomSunFlare,
                            RandomShadow, RandomToneCurve, Lambda, ISONoise, Solarize, Equalize, Posterize, Downscale,
                            MultiplicativeNoise, FancyPCA, ColorJitter, Sharpen, Emboss, Superpixels, RingingOvershoot,
                            UnsharpMask, PixelDropout, Spatter, ChromaticAberration, Morphological, PlanckianJitter)

from augmentation.augmentation import Augmentation

category = 'transforms'


class NormalizeAugmentation(Augmentation):
    def __init__(self):
        super().__init__('normalize', 'Normalize', category)

    def generate(self, image):
        return Normalize(p=1, mean=.5)(image=image)['image']


class RandomGammaAugmentation(Augmentation):
    def __init__(self):
        super().__init__('random_gamma', 'Random Gamma', category)

    def generate(self, image):
        return RandomGamma(p=1)(image=image)['image']


class RandomGridShuffleAugmentation(Augmentation):
    def __init__(self):
        super().__init__('random_grid_shuffle', 'Random Grid Shuffle', category)

    def generate(self, image):
        return RandomGridShuffle(p=1)(image=image)['image']


class HueSaturationValueAugmentation(Augmentation):
    def __init__(self):
        super().__init__('hue_saturation_value', 'Hue Saturation Value', category)

    def generate(self, image):
        return HueSaturationValue(p=1)(image=image)['image']


class RGBShiftAugmentation(Augmentation):
    def __init__(self):
        super().__init__('rgb_shift', 'RGB Shift', category)

    def generate(self, image):
        return RGBShift(p=1)(image=image)['image']


class GaussNoiseAugmentation(Augmentation):
    def __init__(self):
        super().__init__('gauss_noise', 'Gauss Noise', category)

    def generate(self, image):
        return GaussNoise(p=1)(image=image)['image']


class CLAHEAugmentation(Augmentation):
    def __init__(self):
        super().__init__('clahe', 'CLAHE', category)

    def generate(self, image):
        return CLAHE(p=1)(image=image)['image']


class ChannelShuffleAugmentation(Augmentation):
    def __init__(self):
        super().__init__('channel_shuffle', 'Channel Shuffle', category)

    def generate(self, image):
        return ChannelShuffle(p=1)(image=image)['image']


class InvertImgAugmentation(Augmentation):
    def __init__(self):
        super().__init__('invert_img', 'Invert Image', category)

    def generate(self, image):
        return InvertImg(p=1)(image=image)['image']


class ToGrayAugmentation(Augmentation):
    def __init__(self):
        super().__init__('to_gray', 'To Gray', category)

    def generate(self, image):
        return ToGray(p=1)(image=image)['image']


class ToRGBAugmentation(Augmentation):
    def __init__(self):
        super().__init__('to_rgb', 'To RGB', category)

    def generate(self, image):
        return ToRGB(p=1)(image=image)['image']


class ToSepiaAugmentation(Augmentation):
    def __init__(self):
        super().__init__('to_sepia', 'To Sepia', category)

    def generate(self, image):
        return ToSepia(p=1)(image=image)['image']


class ImageCompressionAugmentation(Augmentation):
    def __init__(self):
        super().__init__('image_compression', 'Image Compression', category)

    def generate(self, image):
        return ImageCompression(p=1)(image=image)['image']


class RandomBrightnessContrastAugmentation(Augmentation):
    def __init__(self):
        super().__init__('random_brightness_contrast', 'Random Brightness Contrast', category)

    def generate(self, image):
        return RandomBrightnessContrast(p=1)(image=image)['image']


class RandomSnowAugmentation(Augmentation):
    def __init__(self):
        super().__init__('random_snow', 'Random Snow', category)

    def generate(self, image):
        return RandomSnow(p=1)(image=image)['image']


class RandomGravelAugmentation(Augmentation):
    def __init__(self):
        super().__init__('random_gravel', 'Random Gravel', category)

    def generate(self, image):
        return RandomGravel(p=1)(image=image)['image']


class RandomRainAugmentation(Augmentation):
    def __init__(self):
        super().__init__('random_rain', 'Random Rain', category)

    def generate(self, image):
        return RandomRain(p=1)(image=image)['image']


class RandomFogAugmentation(Augmentation):
    def __init__(self):
        super().__init__('random_fog', 'Random Fog', category)

    def generate(self, image):
        return RandomFog(p=1)(image=image)['image']


class RandomSunFlareAugmentation(Augmentation):
    def __init__(self):
        super().__init__('random_sun_flare', 'Random Sun Flare', category)

    def generate(self, image):
        return RandomSunFlare(p=1)(image=image)['image']


class RandomShadowAugmentation(Augmentation):
    def __init__(self):
        super().__init__('random_shadow', 'Random Shadow', category)

    def generate(self, image):
        return RandomShadow(p=1)(image=image)['image']


class RandomToneCurveAugmentation(Augmentation):
    def __init__(self):
        super().__init__('random_tone_curve', 'Random Tone Curve', category)

    def generate(self, image):
        return RandomToneCurve(p=1)(image=image)['image']


class LambdaAugmentation(Augmentation):
    def __init__(self):
        super().__init__('lambda', 'Lambda', category)

    def generate(self, image):
        return Lambda(p=1)(image=image)['image']


class ISONoiseAugmentation(Augmentation):
    def __init__(self):
        super().__init__('iso_noise', 'ISO Noise', category)

    def generate(self, image):
        return ISONoise(p=1)(image=image)['image']


class SolarizeAugmentation(Augmentation):
    def __init__(self):
        super().__init__('solarize', 'Solarize', category)

    def generate(self, image):
        return Solarize(p=1)(image=image)['image']


class EqualizeAugmentation(Augmentation):
    def __init__(self):
        super().__init__('equalize', 'Equalize', category)

    def generate(self, image):
        return Equalize(p=1)(image=image)['image']


class PosterizeAugmentation(Augmentation):
    def __init__(self):
        super().__init__('posterize', 'Posterize', category)

    def generate(self, image):
        return Posterize(p=1)(image=image)['image']


class DownscaleAugmentation(Augmentation):
    def __init__(self):
        super().__init__('downscale', 'Downscale', category)

    def generate(self, image):
        return Downscale(p=1)(image=image)['image']


class MultiplicativeNoiseAugmentation(Augmentation):
    def __init__(self):
        super().__init__('multiplicative_noise', 'Multiplicative Noise', category)

    def generate(self, image):
        return MultiplicativeNoise(p=1)(image=image)['image']


class FancyPCAAugmentation(Augmentation):
    def __init__(self):
        super().__init__('fancy_pca', 'Fancy PCA', category)

    def generate(self, image):
        return FancyPCA(p=1)(image=image)['image']


class ColorJitterAugmentation(Augmentation):
    def __init__(self):
        super().__init__('color_jitter', 'Color Jitter', category)

    def generate(self, image):
        return ColorJitter(p=1)(image=image)['image']


class SharpenAugmentation(Augmentation):
    def __init__(self):
        super().__init__('sharpen', 'Sharpen', category)

    def generate(self, image):
        return Sharpen(p=1)(image=image)['image']


class EmbossAugmentation(Augmentation):
    def __init__(self):
        super().__init__('emboss', 'Emboss', category)

    def generate(self, image):
        return Emboss(p=1)(image=image)['image']


class SuperpixelsAugmentation(Augmentation):
    def __init__(self):
        super().__init__('superpixels', 'Superpixels', category)

    def generate(self, image):
        return Superpixels(p=1)(image=image)['image']


class RingingOvershootAugmentation(Augmentation):
    def __init__(self):
        super().__init__('ringing_overshoot', 'Ringing Overshoot', category)

    def generate(self, image):
        return RingingOvershoot(p=1)(image=image)['image']


class UnsharpMaskAugmentation(Augmentation):
    def __init__(self):
        super().__init__('unsharp_mask', 'Unsharp Mask', category)

    def generate(self, image):
        return UnsharpMask(p=1)(image=image)['image']


class PixelDropoutAugmentation(Augmentation):
    def __init__(self):
        super().__init__('pixel_dropout', 'Pixel Dropout', category)

    def generate(self, image):
        return PixelDropout(p=1)(image=image)['image']


class SpatterAugmentation(Augmentation):
    def __init__(self):
        super().__init__('spatter', 'Spatter', category)

    def generate(self, image):
        return Spatter(p=1)(image=image)['image']


class ChromaticAberrationAugmentation(Augmentation):
    def __init__(self):
        super().__init__('chromatic_aberration', 'Chromatic Aberration', category)

    def generate(self, image):
        return ChromaticAberration(p=1)(image=image)['image']


class MorphologicalAugmentation(Augmentation):
    def __init__(self):
        super().__init__('morphological', 'Morphological', category)

    def generate(self, image):
        return Morphological(p=1)(image=image)['image']


class PlanckianJitterAugmentation(Augmentation):
    def __init__(self):
        super().__init__('planckian_jitter', 'Planckian Jitter', category)

    def generate(self, image):
        return PlanckianJitter(p=1)(image=image)['image']
