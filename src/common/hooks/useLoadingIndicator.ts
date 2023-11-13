import { useState } from "react";

const useLoadingIndicator = () => {
    const [isLoading, setLoading] = useState(false);

    function enableLoading() {
        setLoading(true);
    }

    function disableLoading() {
        setLoading(false);
    }

    return {
        isLoading,
        enableLoading,
        disableLoading,
    }
};

export default useLoadingIndicator;