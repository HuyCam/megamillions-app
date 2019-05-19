export const mode = {
    FULL: 'FULL_RANGE',
    RANGE50: 'RANGE50',
    RANGE100: 'RANGE100'
};

export const fetchData = (data) => {
    return {
        data,
        type: 'DATA'
    }
};

export const enableMode = (mode) => {
    return {
        type: mode,
    }
}