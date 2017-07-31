/**
 * Created by hien.tran on 5/29/2017.
 */
import run from './run';
import runServer from './runServer';
import clean from './clean';
import copy from './copy';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import WriteFilePlugin from 'write-file-webpack-plugin';
import webpackConfig from './webpack.config';
import browserSync from 'browser-sync';

const isDebug = !process.argv.includes('--release');
process.argv.push('--watch');

const [clientConfig, serverConfig] = webpackConfig;

async function start() {
  await run(clean);
  await run(copy);
  await new Promise((resolve) => {
    serverConfig.plugins.push(new WriteFilePlugin({ log: false }));

    const bundler = webpack(webpackConfig);
    const wpMiddleware = webpackDevMiddleware(bundler, {
      // IMPORTANT: webpack middleware can't access config,
      // so we should provide publicPath by ourselves
      publicPath: clientConfig.output.publicPath,

      // Pretty colored output
      stats: clientConfig.stats,

      // For other settings see
      // https://webpack.github.io/docs/webpack-dev-middleware
    });
    const hotMiddleware = webpackHotMiddleware(bundler.compilers[0]);

    let handleBundleComplete = async () => {
      handleBundleComplete = stats => !stats.stats[1].compilation.errors.length && runServer();

      const server = await runServer();
      const bs = browserSync.create();

      bs.init({
        ...isDebug ? {} : { notify: false, ui: false },

        proxy: {
          target: server.host,
          middleware: [wpMiddleware, hotMiddleware],
          proxyOptions: {
            xfwd: true,
          },
        },
      }, resolve);
    };

    bundler.plugin('done', stats => handleBundleComplete(stats));
  });
}

export default start;