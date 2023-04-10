type SettingKey = keyof typeof defaultSettings;

export class Settings {
  private static defaultSettings = {
    requestPromptSuggestions: true,
    backendBaseURL: 'http://localhost:3000',
  };

  private static isValidProperty(property: SettingKey): boolean {
    if (!Settings.defaultSettings.hasOwnProperty(property)) {
      console.error(`Settings: Invalid property "${property}"`);
      return false;
    }
    return true;
  }

  static async get(property: SettingKey): Promise<any> {
    if (!Settings.isValidProperty(property)) {
      return;
    }

    try {
      const result = await browser.storage.sync.get(property);
      if (result[property] !== undefined)
        return result[property]
      else
        return Settings.defaultSettings[property];
    } catch (error) {
      console.error(`Settings: Error getting property "${property}":`, error);
      throw error;
    }
  }

  static getDefault(property: SettingKey): any {
    if (!Settings.isValidProperty(property)) {
      return;
    }

    return Settings.defaultSettings[property];
  }

  static async set(property: SettingKey, value: any): Promise<void> {
    if (!Settings.isValidProperty(property)) {
      return;
    }

    try {
      await browser.storage.sync.set({ [property]: value });
    } catch (error) {
      console.error(`Settings: Error setting property "${property}" to value "${value}":`, error);
      throw error;
    }
  }

  static async clear(): Promise<void> {
    try {
      await browser.storage.sync.set(Settings.defaultSettings);
    } catch (error) {
      console.error("Settings: Error resetting settings to default values:", error);
      throw error;
    }
  }
}
