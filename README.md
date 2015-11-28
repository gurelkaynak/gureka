# Frontend for ultramicroblog

ultramicroblog is here: https://github.com/gurelkaynak/ultramicroblog

Frontend using Flask python microframework (http://flask.pocoo.org/) and React js from facebook (http://facebook.github.io/react/)  

# JSX Compilation with Babel

```bash
npm install babel-preset-es2015 babel-preset-react
babel --presets es2015,react --watch src/ --out-dir build/
```

# Minify Js with Closure Compiler

```bash
java -jar compiler.jar --js blog.js --js_output_file blog.min.js
```
