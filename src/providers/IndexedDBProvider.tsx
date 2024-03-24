import { createContext, useEffect, useState } from 'react';
import { CardType, ExistedCardType } from '../components/MainPage/CardList/Card/Card.types'

const defaultValues = {
    db: null,
    data: [],
    databaseName: 'Notes',
    storeName: 'MyNotes',
}
type ProviderType = {
    db: IDBDatabase | null,
    data: ExistedCardType[] | [],
    databaseName: string,
    storeName: string
}

type IndexedDBContextType  = {
    providerData: ProviderType,
    addRecord: (record: CardType) => Promise<unknown>,
    deleteRecord: (key: number) => Promise<unknown>,
    updateRecord: (key: number, updatedRecord: CardType) => Promise<unknown>
}


const IndexedDBContext = createContext<IndexedDBContextType>({
    providerData: defaultValues,
    addRecord: (record: CardType) => new Promise(() => null),
    deleteRecord: (key: number) => new Promise(() => null),
    updateRecord: (key: number) => new Promise(() => null)
});

type Props = {
    children: JSX.Element
}

const IndexedDBProvider = ({ children }: Props) => {
    const [providerData, setProviderData] = useState<ProviderType>(defaultValues);

    useEffect(() => {
        const openDB = () => {
            return new Promise<{db: IDBDatabase,data: ExistedCardType[]}>((resolve, reject) => {
                const openRequest = indexedDB.open(providerData.databaseName, 1);

                openRequest.onupgradeneeded = function () {
                    const db = openRequest.result;
                    if (!db.objectStoreNames.contains(providerData.storeName)) {
                        db.createObjectStore(providerData.storeName, { keyPath: 'id', autoIncrement: true });
                    }
                };

                openRequest.onsuccess = function () {
                    const db = openRequest.result;

                    const transaction = db.transaction(providerData.storeName, 'readonly');
                    const store = transaction.objectStore(providerData.storeName);
                    const getRequest = store.getAll();

                    getRequest.onsuccess = function () {
                        resolve({
                            db: db,
                            data: getRequest.result
                        });
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
            .then(res => {
                setProviderData({
                    ...providerData,
                    db: res.db,
                    data: res.data
                });
            })
            .catch(error => {
                console.error('Error opening IndexedDB:', error);
            });

        return () => {
            if (providerData.db) {
                providerData.db.close();
            }
        };
        // eslint-disable-next-line
    }, []);

    const addRecord = async (record: CardType) => {

        return new Promise(async (resolve, reject) => {
            const transaction = providerData.db!.transaction(providerData.storeName, 'readwrite');
            const store = transaction.objectStore(providerData.storeName);

            try {
                const request = store.add({
                    ...record,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                request.onsuccess = function () {
                    setProviderData({ ...providerData, data: [...providerData.data, { ...record, id: Number(request.result)}] });
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

    const deleteRecord = async (key: number) => {
        return new Promise(async (resolve, reject) => {
            const transaction = providerData.db!.transaction(providerData.storeName, 'readwrite');
            const store = transaction.objectStore(providerData.storeName);

            const getRequest = store.getAllKeys();
            getRequest.onsuccess = async function () {
                const keys = getRequest.result;
                if (keys.find(item => item === Number(key))) {
                    const deleteRequest = store.delete(key);

                    deleteRequest.onsuccess = function () {
                        setProviderData({
                            ...providerData,
                            data: providerData.data?.filter?.(item => item.id !== key)
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

    const updateRecord = async (key: number, updatedRecord: CardType): Promise<string> => {
        return new Promise((resolve, reject) => {
            const transaction = providerData.db!.transaction(providerData.storeName, 'readwrite');
            const store = transaction.objectStore(providerData.storeName);
            const getRequest = store.get(key);

            getRequest.onsuccess = function () {
                const existingRecord = getRequest.result;
                if (existingRecord) {
                    const updatedData = {
                        ...existingRecord,
                        ...updatedRecord,
                        updatedAt: new Date()
                    };
                    const updateRequest = store.put(updatedData);

                    updateRequest.onsuccess = function () {
                        setProviderData({ ...providerData, data: providerData.data?.map(item => item.id === key ? updatedData : item) });
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
        <IndexedDBContext.Provider value={{providerData, addRecord, deleteRecord, updateRecord}}>
            {children}
        </IndexedDBContext.Provider>
    );
};

export { IndexedDBContext, IndexedDBProvider };