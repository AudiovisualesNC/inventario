module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Inventario Salas';	// Replace your title here
                return args;
            });
    }
};