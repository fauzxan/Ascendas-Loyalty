module.exports = {
    fuzzyFuzzer: function(length, mode) {
        const alphabets_lower = "abcdefghijklmnopqrstuvwxyz";
        const alphabets_capital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "1234567890";
        const characters = "`~!@#$%^&*()_+-={}|[]:;<>?,./\\\\";
        var input_pool_length = 0;
        var input_pool;
        var output = "";

        if (mode == "email") {
            input_pool = alphabets_capital + alphabets_lower + "`~!#$%^&*_+-={}|?./";
            input_pool_length = input_pool.length;
            var at_index = Math.floor(length/2);
            var dot_index = Math.floor(Math.random()*(length-at_index) + at_index - 2);
            for (i = 0; i < length; i++) {
                if (i == at_index) {
                    output += "@";
                } else if (i == dot_index) {
                    output += ".";
                } else if (i > at_index) {
                    input_pool = alphabets_capital + alphabets_lower + ".";
                    input_pool_length = input_pool.length;
                    output += input_pool.charAt(Math.floor(Math.random()*input_pool_length));
                } else {
                    output += input_pool.charAt(Math.floor(Math.random()*input_pool_length));
                }
            }

        } else {
            input_pool = alphabets_capital + alphabets_lower + numbers + characters;
            input_pool_length = input_pool.length;
            for (i = 0; i < length; i++) {
                output += input_pool.charAt(Math.floor(Math.random()*input_pool_length));
            }
        }
        return output;
    }
}