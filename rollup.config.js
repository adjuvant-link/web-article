'use strict';

// load libs
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import json from '@rollup/plugin-json';
import html from '@rollup/plugin-html';


// load constants
import { SUBDIRECTORY, ONION_ADDRESS, DOMAIN, TITLE, DESCRIPTION, AUTHOR, THUMBNAIL_FILEPATH } from './src/constants.json';


const production = !process.env.ROLLUP_WATCH;

function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true
            });

            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        }
    };
}

const metas = [
    { 'http-equiv': "onion-location", 'content': `${ONION_ADDRESS}${SUBDIRECTORY}` },
    { 'itemprop': 'name', 'content': TITLE },
    { 'itemprop': 'description', 'content': DESCRIPTION },
    { 'itemprop': 'image', 'content': `${DOMAIN}${SUBDIRECTORY}${THUMBNAIL_FILEPATH}` },
    { 'property': 'og:url', 'content': `${DOMAIN}${SUBDIRECTORY}` },
    { 'property': 'og:title', 'content': TITLE },
    { 'property': 'og:type', 'content': 'article' },
    { 'property': 'og:article:publisher', 'content': AUTHOR },
    { 'property': 'og:image', 'content': `${DOMAIN}${SUBDIRECTORY}${THUMBNAIL_FILEPATH}` },
    { 'property': 'og:site_name', 'content': AUTHOR },
    { 'property': 'og:description', 'content': DESCRIPTION },
    { 'name': 'title', 'content': TITLE },
    { 'name': 'author', 'content': AUTHOR },
    { 'name': 'description', 'content': DESCRIPTION },
    { 'name': 'twitter:card', 'content': 'summary_large_image' },
    { 'name': 'twitter:site', 'content': `@${AUTHOR}` },
    { 'name': 'twitter:title', 'content': TITLE },
    { 'name': 'twitter:description', 'content': DESCRIPTION },
    { 'name': 'twitter:creator', 'content': `@${AUTHOR}` },
    { 'name': 'twitter:image:src', 'content': `${DOMAIN}${SUBDIRECTORY}${THUMBNAIL_FILEPATH}` },
    { 'name': 'msapplication-TileImage', 'content': `${DOMAIN}${SUBDIRECTORY}${THUMBNAIL_FILEPATH}` }
]

const htmlOptions = {
    template: async ({ attributes, files, meta, publicPath, title }) => {
        
        const script = (files.js || []).map(({ fileName }) => {
            return `        <script defer src='${fileName}'></script>`;
        }).join("\n");

        const css = (files.css || []).map(({ fileName }) => {
            return `        <link rel='stylesheet' href='${fileName}'>`;
        }).join("\n");

        const _metas = (metas || []).map(attribute => {
            const keys = Object.keys(attribute);
            return `        <meta ${keys.map(key => `${key}="${attribute[key]}"`).join(' ')}>`
        }).join("\n");

        return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content="width=device-width,initial-scale=1,user-scalable=no">
        
        <link rel="icon" type="image/x-icon" href="${SUBDIRECTORY}favicon.ico">
        
        <title>${TITLE}</title>

${css}

${script} 

${_metas}        
    </head>
    <body>
    </body>
</html>
        `;
    },
};

export default {
    input: 'src/main.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/bundle.js'
    },
    plugins: [
        svelte({
            emitCss: false,
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !production
            }
        }),
        // we'll extract any component CSS out into
        // a separate file - better for performance
        css({ output: 'bundle.css' }),

        // to import json files
        json({
            compact: true
        }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte']
        }),
        commonjs(),

        // to build html files
        html(htmlOptions),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser()
    ],
    watch: {
        clearScreen: false
    },
    onwarn ( warning, warn ) {
        // ignore d3 circular dependency warnings
        if(warning.code === 'CIRCULAR_DEPENDENCY' && warning.importer.includes('d3')){
            return;
        }
    },
};
