import queryString from 'query-string';

const getQueryParams = string => queryString.parse(string);

export default getQueryParams;
