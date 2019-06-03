/* private */
const _getEncodedValue = (value) => {
  return Array.isArray(value) ?
      value.map(encodeURIComponent) :
      encodeURIComponent(value);
};

/* private */
const _mergeEach = (key, value, url): void => {

  const EXISTENT_PARAM_PATTERN = new RegExp(`([?&])${key}=(.*?)(&|$)`, 'i');
  const separator = url.href.indexOf('?') > -1 ? '&' : '?';
  const _already = EXISTENT_PARAM_PATTERN.test(url.href);

  if (_already) {
    return url.href = url.href.replace(
      EXISTENT_PARAM_PATTERN,
      `$1${key}=$2,${_getEncodedValue(value)}$3`
    );
  }

  url.href += separator +
    encodeURIComponent(key) +
    '=' +
    _getEncodedValue(value);

  return;
};

/**
  * Given a DTO with the following properties:
  *
  * prop1: string[] | number[] | boolean[] ...
  * prop2: string | number | boolean ...
  *
  * this parser will generate a query with the format below:
  *
  * &prop1=prop1_val1&prop1=prop1_val2&prop2=prop2_val
*/
const getRedundant = (dto: any): string => {

  let query = '';

  for (const prop in dto) {

    if (!dto.hasOwnProperty(prop)) { continue; }

    if (Array.isArray(dto[prop])) {

      dto[prop].forEach((val, i) => {
        query += `&${prop}=${_getEncodedValue(dto[prop][i])}`;
      });

      continue;
    }

    query += `&${prop}=${_getEncodedValue(dto[prop])}`;
  }

  return query;
};

/**
  * Given a DTO with the following properties:
  *
  * prop1: string[] | number[] | boolean[] ...
  * prop2: string | number | boolean ...
  *
  * this parser will update the url passed in with the format below:
  *
  * &prop1=prop1_val1,prop1_val2&prop2=prop2_val
*/
const mergeInUrl = (dto: any, url: { href: string }): void => {

  for (const param in dto) {
    _mergeEach(param, dto[param], url);
  }
};

/**
  * Given an array with the following objects structure:
  *
  * params = [
  *   { key: 'propName1', value: 'propValue1' },
  *   { key: 'propName1', value: 'propValue2' }
  * ]
  *
  * this factory will generate a DTO object to use in getRedundant function.
  *
  * Common use case should be:
  *
  *   getRedundant(getParamDTOFromArray(params))
*/
const getParamDTOFromArray = (params: { key: string, value: string }[]) => {

  const paramDTO = {};

  params.forEach(param => {

    if (!paramDTO.hasOwnProperty(param.key)) {
      paramDTO[param.key] = param.value;
      return;
    }

    if (!Array.isArray(paramDTO[param.key])) {
      paramDTO[param.key] = [paramDTO[param.key], param.value];
      return;
    }

    paramDTO[param.key].push(param.value);

  });

  return paramDTO;
};

export { getRedundant, mergeInUrl, getParamDTOFromArray }
