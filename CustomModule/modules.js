const showName = (name) => {
    return name;
}

const showEmail = (email) => {
    return email;
}

const showCity = (city) => {
    return city;
}

// either we can export one by one like:

// we'll use single exports (module.exports) when we want only one thing to export
// else either use module.exports.anyNameWhileExporting = function/variable
// or use module.exports = {}

// module.exports = showName;
// module.exports.showCityName = showCity;
// // module.exports = showEmail; // it'll create error while using it file 
// module.exports.showEmail = showEmail;

// use module.exports at once for all things:

// here exports is object
module.exports = {
    showName,
    showEmail,
    showCityName:showCity
}