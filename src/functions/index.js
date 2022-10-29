const convertDateToDateTime = (date) => {
    return new Date(date).toLocaleString().split(',')[0];
};
export { convertDateToDateTime };