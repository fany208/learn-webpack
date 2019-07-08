module.exports = {
    entry: {
        /*入口文件，记得带上目录，否则会找不到文件*/
        app: './app.js'
    },
    output: {
        /*filename里的[name][hash]等都是占位符，还有其他的可以自行查阅。不指定filename的话，webpack会有默认的文件名，一般是模块的id加hash前8位。eg：0.wer32re3.js*/
        // filename: '[name].[hash:8].js'
        filename: 'app.bundle.js',

        /*
        * webpack在打包过程中一般是爸同步的模块打包到一起，如果遇到异步的模块，就相当于新开一个入口，生成新的模块文件。
        * 例如本例子中的amd.js是异步，所以在打包过程中会生成连个bundle文件。
        * 上面的filename指定主入口文件对应生成的bundle文件名称
        * 下面的chunkFilename就是针对这种异步模块配置对应的文件名
        *
        * Q：怎么自定义这个异步模块的名称？
        * */
        chunkFilename: '[id].bundle.js'
    }
}
