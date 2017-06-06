# phoneMask
Mask for input. It's work on Android!

Use:

var input = document.getElementByID('myInput');

var mask = '+7 (___) ___-__-__';

mask(input, mask);

OR

var input = document.getElementByID('myInput');

var mask = '+7 (***) ***-**-**';

var symbol = '*';

mask(input, mask, symbol);
