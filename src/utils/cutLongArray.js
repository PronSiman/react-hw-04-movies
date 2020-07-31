const cutList = arr => (arr.length < 10 ? arr : arr.splice(0, 10));

export default cutList;
