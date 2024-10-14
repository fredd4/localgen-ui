import {
  IndexedDBManager,
  type DatabaseConfig,
  type StoreItem,
} from "./universalIndexedDBOperations";

const SETTINGS_DB_NAME = "SettingsStore";
const SETTINGS_STORE_NAME = "settings";
const SETTINGS_DB_VERSION = 1;

export const settings = ["api_key"];
type SettingKey = (typeof settings)[number];

interface Setting extends StoreItem {
  key: SettingKey;
  value: string;
}

const dbConfig: DatabaseConfig = {
  name: SETTINGS_DB_NAME,
  version: SETTINGS_DB_VERSION,
  stores: {
    [SETTINGS_STORE_NAME]: {
      keyPath: "key",
      autoIncrement: false,
    },
  },
};

const dbManager = new IndexedDBManager(dbConfig);

export const getSetting = async (key: SettingKey): Promise<string> => {
  const item = await dbManager.getItem<Setting>(SETTINGS_STORE_NAME, key);
  if (!item) {
    throw new Error(`Setting with key "${key}" not found`);
  }
  return item.value;
};

export const setSetting = async (
  key: SettingKey,
  value: string
): Promise<void> => {
  try {
    await dbManager.saveItem<Setting>(SETTINGS_STORE_NAME, { key, value });
  } catch (error) {
    throw new Error(`Failed to set value for key "${key}": ${error}`);
  }
};

export const removeSetting = async (key: SettingKey): Promise<void> => {
  try {
    await dbManager.deleteItem(SETTINGS_STORE_NAME, key);
  } catch (error) {
    throw new Error(`Failed to remove setting for key "${key}": ${error}`);
  }
};

export const clearSettings = async (): Promise<void> => {
  try {
    await dbManager.clearStore(SETTINGS_STORE_NAME);
  } catch (error) {
    throw new Error(`Failed to clear settings store: ${error}`);
  }
};

export const hasSetting = async (key: SettingKey): Promise<boolean> => {
  const item = await dbManager.getItem<Setting>(SETTINGS_STORE_NAME, key);
  return !!item;
};
