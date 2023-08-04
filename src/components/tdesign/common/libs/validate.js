import {
	isBoolean,
	isObject,
	isEmpty,
	isNumber
} from 'lodash-es'
import {
	merge
} from "../../common/libs/utils"


const pattern = {
	email: /^\S+?@\S+?\.\S+?$/,
	idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
	url: new RegExp(
		"^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
		'i'),
	date: "/(^(y{4}|y{2})[.\/-](m{1,2})[.\/-](d{1,2})$)|(^(m{1,2})[.\/-](d{1,2})[.\/-]((y{4}|y{2})$))|(^(d{1,2})[.\/-](m{1,2})[.\/-]((y{4}|y{2})$))/gi"
};

const default_date_options = {
	format: 'YYYY/MM/DD',
	delimiters: ['/', '-'],
	strictMode: false,
};

/**
 * 计算字符串字符的长度并可以截取字符串。
 * @param str 传入字符串
 * @param maxCharacter 规定最大字符串长度
 * @returns 当没有传入maxCharacter时返回字符串字符长度，当传入maxCharacter时返回截取之后的字符串和长度。
 */
function getCharacterLength(str, maxCharacter) {
	const hasMaxCharacter = isNumber(maxCharacter);
	if (!str || str.length === 0) {
		if (hasMaxCharacter) {
			return {
				length: 0,
				characters: str,
			};
		}
		return 0;
	}
	let len = 0;
	for (let i = 0; i < str.length; i++) {
		let currentStringLength = 0;
		if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
			currentStringLength = 2;
		} else {
			currentStringLength = 1;
		}
		if (hasMaxCharacter && len + currentStringLength > maxCharacter) {
			return {
				length: len,
				characters: str.slice(0, i),
			};
		}
		len += currentStringLength;
	}
	if (hasMaxCharacter) {
		return {
			length: len,
			characters: str,
		};
	}
	return len;
}

/**
 * `{} / [] / '' / undefined / null` 等内容被认为是空； 0 和 false 被认为是正常数据，部分数据的值就是 0 或者 false
 * @param {Object} val
 */
export function isValueEmpty(val) {
	const type = Object.prototype.toString.call(val);
	const typeMap = {
		Date: '[object Date]',
	};
	if (type === typeMap.Date) {
		return false;
	}
	return isObject(val) ? isEmpty(val) : ['', undefined, null].includes(val);
}

function zip(date, format) {
	const zippedArr = [],
		len = Math.min(date.length, format.length);

	for (let i = 0; i < len; i++) {
		zippedArr.push([date[i], format[i]]);
	}

	return zippedArr;
}

/**
 * 检查是否是有效日期
 * // https://github.com/validatorjs/validator.js
 * @param {Object} val
 * @param {Object} options
 */
export function isDate(val, options) {
	if (typeof options === 'string') {
		options = merge({
			format: options
		}, default_date_options);
	} else {
		options = merge(options, default_date_options)
	}
	//
	if (typeof val === 'string' && pattern.date.test(val)) {
		const formatDelimiter = options.delimiters
			.find(delimiter => options.format.indexOf(delimiter) !== -1);
		const dateDelimiter = options.strictMode ?
			formatDelimiter :
			options.delimiters.find(delimiter => val.indexOf(delimiter) !== -1);
		const dateAndFormat = zip(
			val.split(dateDelimiter),
			options.format.toLowerCase().split(formatDelimiter)
		);
		const dateObj = {};

		for (const [dateWord, formatWord] of dateAndFormat) {
			if (dateWord.length !== formatWord.length) {
				return false;
			}

			dateObj[formatWord.charAt(0)] = dateWord;
		}

		let fullYear = dateObj.y;

		if (dateObj.y.length === 2) {
			const parsedYear = parseInt(dateObj.y, 10);

			if (isNaN(parsedYear)) {
				return false;
			}

			const currentYearLastTwoDigits = new Date().getFullYear() % 100;

			if (parsedYear < currentYearLastTwoDigits) {
				fullYear = `20${dateObj.y}`;
			} else {
				fullYear = `19${dateObj.y}`;
			}
		}

		return new Date(`${fullYear}-${dateObj.m}-${dateObj.d}`).getDate() === +dateObj.d;
	}

	if (!options.strictMode) {
		return Object.prototype.toString.call(val) === '[object Date]' && isFinite(val);
	}

	return false;
}

const VALIDATE_MAP = {
	date: (val) => isDate(val),
	url: (val) => typeof val === 'string' && !!val.match(pattern.url),
	email: (val) => typeof val === 'string' && !!val.match(pattern.email) && val.length < 255,
	required: (val) => !isValueEmpty(val),
	whitespace: (val) => !(/^\s+$/.test(val) || val === ''),
	boolean: (val) => isBoolean(val),
	max: (val, num) =>
		isNumber(val) ? val <= num : (getCharacterLength(val)) <= num,
	min: (val, num) =>
		isNumber(val) ? val >= num : (getCharacterLength(val)) >= num,
	len: (val, num) => getCharacterLength(val) === num,
	number: (val) => isNumber(val),
	enum: (val, strs) => strs.includes(val),
	idcard: (val) => typeof val === 'string' && !!val.match(pattern.idcard),
	telnumber: (val) => /^1[3-9]\d{9}$/.test(val),
	pattern: (val, regexp) => regexp.test(val),
	// 自定义校验规则，可能是异步校验
	validator: (val, validate) => validate(val),
};

/**
 * 校验某一条数据的某一条规则，一种校验规则不满足则不再进行校验。
 * @param value 值
 * @param rule 校验规则
 * @returns 两种校验结果，一种是内置校验规则的校验结果哦，二种是自定义校验规则（validator）的校验结果
 */
export async function validateOneRule(value, rule) {
	let validateResult = {
		result: true
	};
	const keys = Object.keys(rule);
	let vOptions;
	let vValidateFun;
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		// 非必填选项，值为空，非自定义规则：无需校验，直接返回 true
		if (!rule.required && isValueEmpty(value) && !rule.validator) {
			return validateResult;
		}
		const validateRule = VALIDATE_MAP[key];
		// 找到一个校验规则，则无需再找，因为参数只允许对一个规则进行校验
		if (validateRule && (rule[key] || rule[key] === 0)) {
			// rule 值为 true 则表示没有校验参数，只是对值进行默认规则校验
			vOptions = rule[key] === true ? undefined : rule[key];
			vValidateFun = validateRule;
			break;
		}
	}
	// @ts-ignore
	if (vValidateFun) {
		validateResult = await vValidateFun(value, vOptions);
		// 如果校验不通过，则返回校验不通过的规则
		if (isBoolean(validateResult)) {
			return {
				...rule,
				result: validateResult
			};
		}
		// 校验结果为 CustomValidateObj，只有自定义校验规则会存在这种情况
		if (isObject(validateResult)) {
			return validateResult;
		}
	}
	return validateResult;
}

// 单个数据进行全规则校验，校验成功也可能会有 message
export async function validate(value, rules) {
	const all = rules.map((rule) => validateOneRule(value, rule));
	const result = await Promise.all(all);
	return result;
}