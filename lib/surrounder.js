/*
 * @author Korkeat W. <khasathan@gmail.com>
 */

'use strict';

var validate_list = function (list) {
    if (!(list instanceof Array)) {
        throw new Error('input 1 should be array/list');
    }
};

var validate_string = function (str) {
    if (typeof str !== 'string') {
        throw new Error('input 2 should be string');
    }
};

var build_regex = function (pattern) {
    var buf = [],
        char,
        i;

    for (i in pattern) {
        if (pattern.hasOwnProperty(i)) {
            char = pattern[i];
            buf.push(char);
        }
    }

    return new RegExp(buf.join('(</?strong>)?'));
};

var filter_input = function (in1, in2) {
    var cleaned = [],
        token,
        token_len,
        start,
        end,
        sub,
        i,
        j;

    for (i = 0; i < in1.length; i += 1) {
        token = in1[i];
        token_len = token.length;

        for (j = 0; j < in2.length; j += 1) {
            start = j;
            end = j + (token_len - 1);
            sub = in2.substring(start, end + 1);

            if (token === sub && cleaned.indexOf(token) === -1) {
                cleaned.push(token);
            }
        }
    }

    return cleaned;
};

var Surrounder = function () {
    return this;
};

Surrounder.prototype.surround = function (in1, in2) {
    validate_list(in1);
    validate_string(in2);

    var buf2 = [],
        mark_open = '<strong>',
        mark_close = '</strong>',
        in1_cleaned = filter_input(in1, in2),
        token,
        token_ind,
        re,
        cur_text,
        matcher;

    if (in1_cleaned.length === 0 || in1_cleaned.length !== in1.length) {
        return in2;
    }

    for (token_ind = 0; token_ind < in1.length; token_ind += 1) {
        token = in1[token_ind];
        re = build_regex(token);
        cur_text = buf2.length === 0 ? in2 : buf2[buf2.length - 1];
        matcher = cur_text.match(re);

        if (matcher !== null && matcher[0] !== undefined) {
            buf2.push(cur_text.replace(re, mark_open + matcher[0] + mark_close));
        } else {
            buf2.push(cur_text.replace(re, mark_open + token + mark_close));
        }
    }

    return buf2.pop();
};

module.exports.Surrounder = Surrounder;
