export const StringHelpers = {
    /**
     * Checks if a string is empty or consists only of whitespace
     * @param value - The string to check
     * @returns boolean - True if the string is empty or whitespace
     */
    isNullOrWhitespace: (value: string | null | undefined): boolean => {
        return (
            value === null ||
            value === undefined ||
            (typeof value === "string" && value.trim().length === 0)
        );
    },

    /**
     * Removes empty, null, or undefined values from an object
     * @param obj - The object to clean
     * @returns Record<string, any> - The cleaned object
     */
    cleanObject: (obj: Record<string, any>): Record<string, any> => {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            if (value !== null && value !== undefined && !StringHelpers.isNullOrWhitespace(value)) {
                acc[key] = value;
            }
            return acc;
        }, {} as Record<string, any>);
    },

    /**
     * Creates a search filter object from search keys and term
     * @param searchTerm - The search term
     * @param searchKeys - Array of keys to search
     * @returns Record<string, string> - The search filter object
     */
    createSearchFilter: (searchTerm: string, searchKeys: string[]): Record<string, string> => {
        return searchKeys.reduce((acc, key) => ({ ...acc, [key]: searchTerm }), {});
    }
};