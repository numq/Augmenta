from augmentation.blur import BlurAugmentation, MotionBlurAugmentation, GaussianBlurAugmentation, \
    GlassBlurAugmentation, AdvancedBlurAugmentation, MedianBlurAugmentation, DefocusAugmentation, ZoomBlurAugmentation
from augmentation.crops import RandomCropAugmentation, CenterCropAugmentation, CropAugmentation, \
    RandomResizedCropAugmentation, RandomCropFromBordersAugmentation
from augmentation.dropout import ChannelDropoutAugmentation, CoarseDropoutAugmentation, \
    GridDropoutAugmentation
from augmentation.geometric import RandomScaleAugmentation, LongestMaxSizeAugmentation, \
    SmallestMaxSizeAugmentation, ResizeAugmentation, RotateAugmentation, RandomRotate90Augmentation, \
    SafeRotateAugmentation, ElasticTransformAugmentation, PerspectiveAugmentation, AffineAugmentation, \
    VerticalFlipAugmentation, HorizontalFlipAugmentation, FlipAugmentation, TransposeAugmentation, \
    OpticalDistortionAugmentation, GridDistortionAugmentation, PadIfNeededAugmentation, D4Augmentation
from augmentation.transforms import NormalizeAugmentation, RandomGammaAugmentation, \
    RandomGridShuffleAugmentation, HueSaturationValueAugmentation, RGBShiftAugmentation, GaussNoiseAugmentation, \
    CLAHEAugmentation, ChannelShuffleAugmentation, InvertImgAugmentation, ToGrayAugmentation, ToSepiaAugmentation, \
    ImageCompressionAugmentation, RandomBrightnessContrastAugmentation, RandomSnowAugmentation, \
    RandomGravelAugmentation, RandomRainAugmentation, RandomFogAugmentation, RandomSunFlareAugmentation, \
    RandomShadowAugmentation, RandomToneCurveAugmentation, LambdaAugmentation, ISONoiseAugmentation, \
    SolarizeAugmentation, EqualizeAugmentation, PosterizeAugmentation, DownscaleAugmentation, \
    MultiplicativeNoiseAugmentation, FancyPCAAugmentation, ColorJitterAugmentation, SharpenAugmentation, \
    EmbossAugmentation, SuperpixelsAugmentation, RingingOvershootAugmentation, UnsharpMaskAugmentation, \
    PixelDropoutAugmentation, SpatterAugmentation, ChromaticAberrationAugmentation, MorphologicalAugmentation

blur = [
    BlurAugmentation(),
    MotionBlurAugmentation(),
    GaussianBlurAugmentation(),
    GlassBlurAugmentation(),
    AdvancedBlurAugmentation(),
    MedianBlurAugmentation(),
    DefocusAugmentation(),
    ZoomBlurAugmentation(),
]

crops = [
    RandomCropAugmentation(),
    CenterCropAugmentation(),
    CropAugmentation(),
    RandomResizedCropAugmentation(),
    RandomCropFromBordersAugmentation(),
]

dropout = [
    ChannelDropoutAugmentation(),
    CoarseDropoutAugmentation(),
    GridDropoutAugmentation(),
]

geometric = [
    RandomScaleAugmentation(),
    LongestMaxSizeAugmentation(),
    SmallestMaxSizeAugmentation(),
    ResizeAugmentation(),
    RotateAugmentation(),
    RandomRotate90Augmentation(),
    SafeRotateAugmentation(),
    ElasticTransformAugmentation(),
    PerspectiveAugmentation(),
    AffineAugmentation(),
    VerticalFlipAugmentation(),
    HorizontalFlipAugmentation(),
    FlipAugmentation(),
    TransposeAugmentation(),
    OpticalDistortionAugmentation(),
    GridDistortionAugmentation(),
    PadIfNeededAugmentation(),
    D4Augmentation(),
]

transforms = [
    NormalizeAugmentation(),
    RandomGammaAugmentation(),
    RandomGridShuffleAugmentation(),
    HueSaturationValueAugmentation(),
    RGBShiftAugmentation(),
    GaussNoiseAugmentation(),
    CLAHEAugmentation(),
    ChannelShuffleAugmentation(),
    InvertImgAugmentation(),
    ToGrayAugmentation(),
    ToSepiaAugmentation(),
    ImageCompressionAugmentation(),
    RandomBrightnessContrastAugmentation(),
    RandomSnowAugmentation(),
    RandomGravelAugmentation(),
    RandomRainAugmentation(),
    RandomFogAugmentation(),
    RandomSunFlareAugmentation(),
    RandomShadowAugmentation(),
    RandomToneCurveAugmentation(),
    LambdaAugmentation(),
    ISONoiseAugmentation(),
    SolarizeAugmentation(),
    EqualizeAugmentation(),
    PosterizeAugmentation(),
    DownscaleAugmentation(),
    MultiplicativeNoiseAugmentation(),
    FancyPCAAugmentation(),
    ColorJitterAugmentation(),
    SharpenAugmentation(),
    EmbossAugmentation(),
    SuperpixelsAugmentation(),
    RingingOvershootAugmentation(),
    UnsharpMaskAugmentation(),
    PixelDropoutAugmentation(),
    SpatterAugmentation(),
    ChromaticAberrationAugmentation(),
    MorphologicalAugmentation(),
]

augmentations = {augmentation.id: augmentation for augmentation in blur + crops + dropout + geometric + transforms}
