import React, { createContext, useCallback, useState } from 'react';
import { CardType } from '../components/MainPage/CardList/Card/Card.types'

const defaultValues = {
    db: null,
    data: [],
    databaseName: 'Notes',
    storeName: 'MyNotes',
}
type ProviderType = {
    db: IDBDatabase | null,
    data: CardType[] | [],
    databaseName: string,
    storeName: string
}

const IndexedDBContext = createContext<ProviderType>(defaultValues);

type Props = {
    children: JSX.Element
}

const IndexedDBProvider = ({ children }: Props) => {
    const [providerData, setProviderData] = useState<ProviderType>(defaultValues);

    useCallback(() => {
        const openDB = () => {
            return new Promise((resolve, reject) => {
                const openRequest = indexedDB.open(providerData.databaseName, 1);

                openRequest.onupgradeneeded = function () {
                    const db = openRequest.result;
                    if (!db.objectStoreNames.contains(providerData.storeName)) {
                        db.createObjectStore(providerData.storeName, { keyPath: 'id', autoIncrement: true });
                    }
                };

                openRequest.onsuccess = function () {
                    const db = openRequest.result;
                    setProviderData({
                        ...providerData,
                        db: db
                    });

                    const transaction = db.transaction(providerData.storeName, 'readonly');
                    const store = transaction.objectStore(providerData.storeName);
                    const getRequest = store.getAll();

                    getRequest.onsuccess = function () {
                        setProviderData({
                            ...providerData,
                            data: getRequest.result
                        });
                        resolve(db);
                    };

                    getRequest.onerror = function () {
                        reject(getRequest.error);
                    };
                };

                openRequest.onerror = function () {
                    reject(openRequest.error);
                };
            });
        };

        openDB()
            .catch(error => {
                console.error('Error opening IndexedDB:', error);
            });

        return () => {
            if (providerData.db) {
                providerData.db?.close();
            }
        };
        // eslint-disable-next-line
    }, []);

    const addRecord = async (record: CardType) => {
        return new Promise(async (resolve, reject) => {
            const transaction = providerData.db!.transaction(providerData.storeName, 'readwrite');
            const store = transaction.objectStore(providerData.storeName);

            try {
                const request = store.add(record);
                request.onsuccess = function () {
                    setProviderData({ ...providerData, data: [...providerData.data, record] });
                    resolve('Запись успешно добавлена');
                };

                request.onerror = function () {
                    reject(request.error);
                };
            } catch (error) {
                reject(error);
            }
        });
    };

    const deleteRecord = async (key: string) => {
        return new Promise(async (resolve, reject) => {
            const transaction = providerData.db!.transaction(providerData.storeName, 'readwrite');
            const store = transaction.objectStore(providerData.storeName);

            const getRequest = store.getAllKeys();
            getRequest.onsuccess = async function () {
                const keys = getRequest.result;
                if (keys[Number(key)]) {
                    const deleteRequest = store.delete(key);

                    deleteRequest.onsuccess = function () {
                        setProviderData({
                            ...providerData,
                            data: providerData.data?.filter?.(item => item.key !== key)
                        });
                        resolve('Last record deleted successfully');
                    };

                    deleteRequest.onerror = function () {
                        reject(deleteRequest.error);
                    };
                } else {
                    reject(new Error('No records to delete'));
                }
            };

            getRequest.onerror = function () {
                reject(getRequest.error);
            };
        });
    };

    const updateRecord = async (key: string, updatedRecord: CardType): Promise<string> => {
        return new Promise((resolve, reject) => {
            const transaction = providerData.db!.transaction(providerData.storeName, 'readwrite');
            const store = transaction.objectStore(providerData.storeName);
            const getRequest = store.get(key);

            getRequest.onsuccess = function () {
                const existingRecord = getRequest.result;
                if (existingRecord) {
                    const updatedData = { ...existingRecord, ...updatedRecord };
                    const updateRequest = store.put(updatedData);

                    updateRequest.onsuccess = function () {
                        resolve('Record updated successfully');
                    };

                    updateRequest.onerror = function () {
                        reject(updateRequest.error);
                    };
                } else {
                    reject(new Error('Record not found'));
                }
            };

            getRequest.onerror = function () {
                reject(getRequest.error);
            };
        });
    };

    return (
        <IndexedDBContext.Provider value={providerData}>
            {children}
        </IndexedDBContext.Provider>
    );
};

export { IndexedDBContext, IndexedDBProvider };