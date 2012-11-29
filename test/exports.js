describe("forecast.js exports", function () {
    it("forecast object", function () {
        expect(window.forecast).not.toBe(undefined);
        expect(typeof window.forecast).toBe('object');
    });
    it("forecast.HoltWinters function", function () {
        expect(typeof window.forecast.HoltWinters).toBe('function');
    });
});
