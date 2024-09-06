import axios, {AxiosRequestConfig} from "axios";
import Augmentation from "./Augmentation";
import InputImage from "../input/InputImage";
import OutputImage from "../output/OutputImage";
import {v4} from "uuid";
import axiosRetry from "axios-retry";
import {failure, Result, success} from "../result/Result";

class AugmentationService {
    private readonly urlScheme: string = (window as any).REACT_APP_AUGMENTATION_SERVICE_URL_SCHEME;
    private readonly host: string = (window as any).REACT_APP_AUGMENTATION_SERVICE_HOST;
    private readonly port: string = (window as any).REACT_APP_AUGMENTATION_SERVICE_PORT;
    private readonly baseUrl = `${this.urlScheme}://${this.host}:${this.port}/`;
    private readonly client = axios.create({baseURL: this.baseUrl});

    constructor() {
        axiosRetry(this.client, {retries: Infinity});
    }

    public async getAugmentations(): Promise<Result<Augmentation[], string>> {
        try {
            const response = await this.client.get("augmentations");
            const augmentations = response.data.augmentations.map((augmentation: any) => new Augmentation(augmentation.id, augmentation.name, augmentation.category)).sort((a: Augmentation, b: Augmentation) => a.category.localeCompare(b.category) && a.name.localeCompare(b.name));
            return success(augmentations);
        } catch (error) {
            return failure(`Failed to get augmentations: ${error}`);
        }
    }

    public async generate(augmentation: Augmentation, image: InputImage, signal?: AbortSignal): Promise<Result<OutputImage, string>> {
        try {
            const config: AxiosRequestConfig = {};
            config.signal = signal;
            const response = await this.client.post("generate", {
                augmentation_id: augmentation.id,
                image_data: image.data,
            }, config);

            const imgStr = response.data.image_data;
            const name = `${image.name}_${augmentation.name}_${v4()}.png`.toLowerCase();
            const outputImage = new OutputImage(v4(), name, imgStr, augmentation, image);
            return success(outputImage);
        } catch (error) {
            return failure(`Failed to generate image: ${error}`);
        }
    }
}

export default AugmentationService;