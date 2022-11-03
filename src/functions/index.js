const convertDateToDateTime = (date) => {
    return new Date(date).toLocaleString().split('T')[0];
};
export { convertDateToDateTime };