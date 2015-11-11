var text = "'I'm the cook,' he said, 'it's my job.'";

text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2');