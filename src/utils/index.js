const unixDateToDate = (unixDate) => {
    const dateObj = new Date(); 
    dateObj.setTime(unixDate * 1000);

    const dateString = dateObj.toLocaleString(); 
    return dateString

}

module.exports = { unixDateToDate }