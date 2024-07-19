import Preset from "./Preset";
import {failure, Result, success} from "../result/Result";

class PresetService {
    private readonly storage: Storage = localStorage;

    private parsePresets = (jsonString: string): Result<Preset[], string> => {
        try {
            return success(JSON.parse(jsonString) as Preset[]);
        } catch (error) {
            return failure(`Error parsing presets JSON: ${error}`);
        }
    };

    private jsonifyPresets = (presets: Preset[]): string => JSON.stringify(presets);

    public async getAll(): Promise<Result<Preset[], string>> {
        try {
            const presetsJSON = this.storage.getItem('presets') || '[]';
            return this.parsePresets(presetsJSON);
        } catch (error) {
            return failure(`Error getting presets: ${error}`);
        }
    }

    public async save(preset: Preset): Promise<Result<Preset, string>> {
        try {
            const presetsJSON = this.storage.getItem('presets') || '[]';
            const presets = this.parsePresets(presetsJSON);
            if (presets.isFailure) {
                return failure(presets.error);
            }
            presets.value.push(preset);
            this.storage.setItem('presets', this.jsonifyPresets(presets.value));
            return success(preset);
        } catch (error) {
            return failure(`Error saving preset: ${error}`);
        }
    }

    public async remove(preset: Preset): Promise<Result<Preset, string>> {
        try {
            const presetsJSON = this.storage.getItem('presets') || '[]';
            const presets = this.parsePresets(presetsJSON);
            if (presets.isFailure) {
                return failure(presets.error);
            }
            const filteredPresets = presets.value.filter(p => p.id !== preset.id);
            this.storage.setItem('presets', this.jsonifyPresets(filteredPresets));
            return success(preset);
        } catch (error) {
            return failure(`Error deleting preset: ${error}`);
        }
    }
}

export default PresetService;