nutils = {};

nutils.arrayMove = function (array, index, newIndex) {
    if (newIndex >= array.length) {
        var k = newIndex - array.length;
        while ((k--) + 1) {
            array.push(undefined);
        }
    }
	
    array.splice(newIndex, 0, array.splice(index, 1)[0]);
};

nutils.inBounds = function(x, y, bx, by, bw, bh){
	return x > bx && x < bx+bw && y > by && y < by+bh;
};
