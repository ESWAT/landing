(function() {
  app.service('Utils', function() {
    return {
      erf: function(x) {
        var a1, a2, a3, a4, a5, p, sign, t, y;
        a1 = 0.254829592;
        a2 = -0.284496736;
        a3 = 1.421413741;
        a4 = -1.453152027;
        a5 = 1.061405429;
        p = 0.3275911;
        sign = (x < 0 ? -1 : 1);
        x = Math.abs(x);
        t = 1.0 / (1.0 + p * x);
        y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
        return sign * y;
      }
    };
  });

}).call(this);
