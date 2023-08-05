export const useGlobalVariables = () => {
    if (typeof window !== 'undefined') {
        return {
            history: window.history,
        }
    }

    return {}
}
