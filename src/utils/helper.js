// stuff I copied from stackoverflow; bless them all.

export const v_price = (amount, currency = 'INR') => {
    return (parseFloat(amount))
        .toLocaleString('en-IN', {
            style: 'currency',
            currency: currency,
        });
};

export const updateQueryParams = (uri, key, value) => {
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");
    if (value === undefined) {
        if (uri.match(re)) {
            return uri.replace(re, '$1$2');
        } else {
            return uri;
        }
    } else {
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            var hash = '';
            if (uri.indexOf('#') !== -1) {
                hash = uri.replace(/.*#/, '#');
                uri = uri.replace(/#.*/, '');
            }
            var separator = uri.indexOf('?') !== -1 ? "&" : "?";
            return uri + separator + key + "=" + value + hash;
        }
    }
};

export const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const getAllQueryParams = () => {
    let qd = {};

    window.location.search
        .substr(1)
        .split("&")
        .forEach(function(item) {
            let k = item.split("=")[0],
                v = decodeURIComponent(item.split("=")[1]);
                
            (k in qd) ? qd[k].push(v) : qd[k] = [v]
        });

    return qd;
};

export const removeParamFromQuery = (search = window.location.search, param) => {
    let s = new URLSearchParams(search); s.delete(param);
        s = s.toString();

    if( s.length ) {
        s = (s[0] !== '?') ? '?'+s : s;
    }

    return s;
};