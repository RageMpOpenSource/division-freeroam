module.exports = {
    clamp: function(value, min, max) {
        return value <= min ? min : value >= max ? max : value;
    }
}