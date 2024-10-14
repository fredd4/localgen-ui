interface StoreConfig {
    keyPath?: string;
    autoIncrement?: boolean;
}

interface DatabaseConfig {
    name: string;
    version: number;
    stores: { [key: string]: StoreConfig };
}

type StoreItem = Record<string, unknown>;

class IndexedDBManager {
    private readonly dbConfig: DatabaseConfig;

    constructor(config: DatabaseConfig) {
        this.dbConfig = config;
    }

    private async openDatabase(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbConfig.name, this.dbConfig.version);

            request.onerror = (event: Event) => {
                console.error("Database error:", event);
                reject(new Error("Failed to open database"));
            };

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db = (event.target as IDBOpenDBRequest).result;
                Object.entries(this.dbConfig.stores).forEach(([storeName, config]) => {
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.createObjectStore(storeName, {
                            keyPath: config.keyPath,
                            autoIncrement: config.autoIncrement,
                        });
                    }
                });
            };
        });
    }

    private async runTransaction<T>(
        storeName: string,
        mode: IDBTransactionMode,
        callback: (store: IDBObjectStore) => IDBRequest<T> | Promise<T>
    ): Promise<T> {
        const db = await this.openDatabase();
        return new Promise<T>((resolve, reject) => {
            const transaction = db.transaction([storeName], mode);
            const store = transaction.objectStore(storeName);

            try {
                const request = callback(store);

                if (request instanceof IDBRequest) {
                    request.onsuccess = () => resolve(request.result);
                    request.onerror = () =>
                        reject(
                            new Error(
                                `Request error: ${request.error?.message ?? "Unknown error"}`
                            )
                        );
                } else {
                    request.then(resolve).catch(reject);
                }
            } catch (error) {
                reject(
                    new Error(`Callback execution error: ${(error as Error).message}`)
                );
            }

            transaction.oncomplete = () => db.close();
            transaction.onerror = (event) => {
                db.close();
                reject(
                    new Error(
                        `Transaction error: ${(event.target as IDBTransaction).error?.message ?? "Unknown error"}`
                    )
                );
            };
        });
    }

    async saveItem<T extends StoreItem>(
        storeName: string,
        item: T,
        key?: IDBValidKey
    ): Promise<IDBValidKey> {
        return this.runTransaction(storeName, "readwrite", (store) =>
            key ? store.put(item, key) : store.put(item)
        );
    }

    async getItem<T extends StoreItem>(
        storeName: string,
        key: IDBValidKey
    ): Promise<T | undefined> {
        return this.runTransaction<T | undefined>(
            storeName,
            "readonly",
            (store) => store.get(key) as IDBRequest<T | undefined>
        );
    }

    async updateItem<T extends StoreItem>(
        storeName: string,
        key: IDBValidKey,
        updates: Partial<T>
    ): Promise<IDBValidKey> {
        const item = await this.getItem<T>(storeName, key);
        return this.runTransaction(storeName, "readwrite", async (store) => {
            if (!item) {
                throw new Error("Item not found");
            }
            const updatedItem = { ...item, ...updates };
            const request = store.put(updatedItem, key);
            return new Promise<IDBValidKey>((resolve, reject) => {
                request.onsuccess = () => resolve(request.result);
                request.onerror = () =>
                    reject(new Error(request.error?.message ?? "Transaction failed"));
            });
        });
    }

    async deleteItem(storeName: string, key: IDBValidKey): Promise<void> {
        await this.runTransaction(storeName, "readwrite", (store) =>
            store.delete(key)
        );
    }

    async getAllItems<T extends StoreItem>(storeName: string): Promise<T[]> {
        return this.runTransaction(
            storeName,
            "readonly",
            (store) => store.getAll() as IDBRequest<T[]>
        );
    }

    async getAllKeys(storeName: string): Promise<IDBValidKey[]> {
        return this.runTransaction(storeName, "readonly", (store) =>
            store.getAllKeys()
        );
    }

    async clearStore(storeName: string): Promise<void> {
        await this.runTransaction(storeName, "readwrite", (store) => store.clear());
    }

    async removeByCondition<T extends StoreItem>(
        storeName: string,
        condition: (item: T) => boolean
    ): Promise<void> {
        const db = await this.openDatabase();
        const transaction = db.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);

        return new Promise<void>((resolve, reject) => {
            const request = store.openCursor();

            request.onsuccess = (event) => {
                const cursor = (event.target as IDBRequest<IDBCursorWithValue | null>)
                    .result;
                if (cursor) {
                    const item = cursor.value as T;
                    if (condition(item)) {
                        cursor.delete();
                    }
                    cursor.continue();
                } else {
                    resolve();
                }
            };

            request.onerror = () => reject(new Error("Failed to remove items"));

            transaction.oncomplete = () => db.close();
            transaction.onerror = () => {
                db.close();
                reject(new Error("Transaction failed"));
            };
        });
    }
}

export { IndexedDBManager, type DatabaseConfig, type StoreItem };
