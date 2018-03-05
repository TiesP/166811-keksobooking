const types = [`flat`, `house`, `bungalo`, `palace`];
const features = [`dishwasher`, `elevator`, `conditioner`, `parking`, `washer`, `wifi`];

const schema = [
  {'name': `title`, 'required': true, 'type': `string`, 'min': 30, 'max': 140},
  {'name': `type`, 'required': true, 'type': `string`, 'enum': types},
  {'name': `price`, 'required': true, 'type': `number`, 'min': 1, 'max': 100000},
  {'name': `address`, 'required': true, 'type': `string`, 'max': 100},
  {'name': `timein`, 'required': true, 'type': `time`},
  {'name': `timeout`, 'required': true, 'type': `time`},
  {'name': `rooms`, 'required': true, 'type': `number`, 'min': 0, 'max': 1000},
  {'name': `features`, 'type': `array`, 'enum': features, 'noDuplicates': true},
  {'name': `avatar`, 'type': `string`},
  {'name': `preview`, 'type': `string`},
  {'name': `name`, 'type': `string`}
];

const checkField = (field, data, errors) => {
  if (!isExist(field.name, data, field.required)) {
    errors.push({'name': field.name, 'error': `отсутствует обязательное поле`});
    return;
  }
  const value = data[field.name];
  if (!checkType(value, field.type)) {
    errors.push({'name': field.name, 'error': `неверный тип, должен быть ${field.type}`});
    return;
  }
  if (!checkMin(value, field.min, field.type)) {
    errors.push({'name': field.name, 'error': `значение меньше минимального ${field.min}`});
  }
  if (!checkMax(value, field.max, field.type)) {
    errors.push({'name': field.name, 'error': `значение больше максимального ${field.max}`});
  }
  if (value && field.type === `array`) {
    if (!noDuplicates(value, field.noDuplicates)) {
      errors.push({'name': field.name, 'error': `есть дубли в списке`});
    }
    if (field.enum) {
      for (let i = 0; i < value.length; i++) {
        if (!checkEnum(value[i], field.enum)) {
          errors.push({'name': field.name, 'error': `значение ${value[i]} не из числа возможных: ${field.enum}`});
        }
      }
    }
  } else {
    if (value && field.enum && !checkEnum(value, field.enum)) {
      errors.push({'name': field.name, 'error': `значение не из числа возможных: ${field.enum}`});
    }
  }
};

const validateSchema = (data) => {
  const errors = [];

  for (let i = 0; i < schema.length; i++) {
    checkField(schema[i], data, errors);
  }
  return errors;
};

const isExist = (fieldName, obj, required) => {
  if (required) {
    return fieldName in obj;
  }
  return true;
};

const checkType = (fieldValue, type) => {
  if (!fieldValue) {
    return true;
  }
  if (!type) {
    return true;
  }
  switch (type) {
    case `array`:
      return Array.isArray(fieldValue);
    case `time`:
      return isTime(fieldValue);
    default:
      return (typeof fieldValue === type);
  }
};

const checkMin = (fieldValue, min, type) => {
  if (!min) {
    return true;
  }
  if (type === `string`) {
    return fieldValue.length >= min;
  }
  return fieldValue >= min;
};

const checkMax = (fieldValue, max, type) => {
  if (!max) {
    return true;
  }
  if (type === `string`) {
    return fieldValue.length <= max;
  }
  return fieldValue <= max;
};

const checkEnum = (fieldValue, possibleValues) => {
  if (!possibleValues) {
    return true;
  }
  return possibleValues.indexOf(fieldValue) !== -1;
};

const noDuplicates = (checkArr, mustNoDuplicates) => {
  if (!mustNoDuplicates) {
    return true;
  }
  if (!checkArr) {
    return true;
  }
  const arr = [];
  for (let i = 0; i < checkArr.length; i++) {
    if (arr.indexOf(checkArr[i]) === -1) {
      arr.push(checkArr[i]);
    } else {
      return false;
    }
  }
  return true;
};

const isTime = (fieldValue) => {
  if (!checkType(fieldValue, `string`)) {
    return false;
  }
  if (fieldValue[2] !== `:`) {
    return false;
  }
  const hours = parseInt(fieldValue.substring(0, 2), 10);
  const minuts = parseInt(fieldValue.substring(3, 5), 10);
  if (!checkMin(hours, 0)) {
    return false;
  }
  if (!checkMax(hours, 23)) {
    return false;
  }
  if (!checkMin(minuts, 0)) {
    return false;
  }
  if (!checkMax(minuts, 59)) {
    return false;
  }
  return true;
};

module.exports = {
  validateSchema,
  isExist,
  checkType,
  checkMin,
  checkMax,
  checkEnum,
  noDuplicates,
  isTime
};
