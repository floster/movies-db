import { useState } from "react";

export const useFetch = (callback: () => Promise<void>) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            await callback();
        } catch (error) {
            console.error('⚠️⚠️⚠️', error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    return [fetchData, isLoading, error];
}