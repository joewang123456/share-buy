// process.env.PUBLIC_URL = '//s1.xmcdn.com/lib/credit-score-manage/last/build/'  //---线上资源

//测试环境发布时，应该保证版本号与后台的index.html , package.json版本号一致
process.env.PUBLIC_URL = '//static2.test.ximalaya.com/source/share-buy/0.1.1/build/' //---测试资源
const webpack = require('webpack');
const config = require('./../webpack.prod');
function build() {
    let compiler = webpack(config);
    compiler.run((err, stats) => {
        if (err) {
            console.log('build--------error');
            console.log(error);
        } else {
            console.log('build--------success');
        }
    });
}

build();