import { useEffect } from "react";
import useLoadingIndicator from "./useLoadingIndicator";

const usePageUnloadIndicator = () => {
    const { isLoading, enableLoading } = useLoadingIndicator();

    useEffect(() => {
        window.addEventListener("beforeunload", enableLoading);

        return () =>
            window.removeEventListener("beforeunload", enableLoading);
    }, [enableLoading]);

    return { isLoading }
};

export default usePageUnloadIndicator;