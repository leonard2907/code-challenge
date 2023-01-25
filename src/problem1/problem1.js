// Iterative method
var sum_to_n_a = function(n) {
    var result = 0
    for (let i = 1; i <= n; i++) {
        result += i
    }
    return result
};

// Recursive method
var sum_to_n_b = function(n) {
    if (n == 1) {
        return 1
    } else {
        return n + sum_to_n_b(n - 1)
    }
};

// Mathematics sum of arithmetic sequence
var sum_to_n_c = function(n) {
    return n * (1 + n) / 2
};