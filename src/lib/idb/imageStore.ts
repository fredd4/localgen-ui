import { GeneratedImage } from "@/types";
import {
  IndexedDBManager,
  type DatabaseConfig,
  type StoreItem,
} from "./universalIndexedDBOperations";

const IMAGES_DB_NAME = "ImageStore";
const IMAGES_STORE_NAME = "images";
const IMAGES_DB_VERSION = 1;

interface Image extends StoreItem {
  key: string;
  image: GeneratedImage;
}

const dbConfig: DatabaseConfig = {
  name: IMAGES_DB_NAME,
  version: IMAGES_DB_VERSION,
  stores: {
    [IMAGES_STORE_NAME]: {
      keyPath: "key",
      autoIncrement: false,
    },
  },
};

const dbManager = new IndexedDBManager(dbConfig);

export const getImage = async (key: string): Promise<GeneratedImage> => {
  const item = await dbManager.getItem<Image>(IMAGES_STORE_NAME, key);
  if (!item) {
    throw new Error(`Image with key "${key}" not found`);
  }
  return item.image;
};

export const addImage = async (image: GeneratedImage): Promise<void> => {
  try {
    await dbManager.saveItem<Image>(IMAGES_STORE_NAME, {
      key: image.id,
      image,
    });
  } catch (error) {
    throw new Error(`Failed to save image with key "${image.id}": ${error}`);
  }
};

export const removeImage = async (key: string): Promise<void> => {
  try {
    await dbManager.deleteItem(IMAGES_STORE_NAME, key);
  } catch (error) {
    throw new Error(`Failed to remove image for key "${key}": ${error}`);
  }
};

export const clearImages = async (): Promise<void> => {
  try {
    await dbManager.clearStore(IMAGES_STORE_NAME);
  } catch (error) {
    throw new Error(`Failed to clear images store: ${error}`);
  }
};

export const hasImage = async (key: string): Promise<boolean> => {
  const item = await dbManager.getItem<Image>(IMAGES_STORE_NAME, key);
  return !!item;
};

export const getAllImages = async (): Promise<GeneratedImage[]> => {
  const items = await dbManager.getAllItems<Image>(IMAGES_STORE_NAME);
  return items.map((item) => item.image);
};

export const getImagesCount = async (): Promise<number> => {
  const count = await dbManager.countItems(IMAGES_STORE_NAME);
  return count;
};
