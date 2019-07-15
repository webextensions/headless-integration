#!/usr/bin/env node

const
    path = require('path');

const
    express = require('express'),
    expressApp = express(),
    serveStatic = require('serve-static');

const
    logger = require('note-down');

const
    portNumber = 3100;

expressApp.use(
    serveStatic(
        path.join(__dirname, 'http-pub')
    )
);

expressApp.listen(portNumber, function () {
    let localIpAddressesAndHostnames = [];
    try {
        localIpAddressesAndHostnames = require('local-ip-addresses-and-hostnames').getLocalIpAddressesAndHostnames();
    } catch (e) {
        // do nothing
    }
    if (localIpAddressesAndHostnames.length) {
        logger.info(
            '\nheadless-integration-server is available at any of the following addresses:\n' +
            (function (localIpAddressesAndHostnames) {
                let addresses = [].concat(localIpAddressesAndHostnames);
                addresses = addresses.map(function (item) {
                    return `    http://${item}:${portNumber}/`;
                });
                return addresses.join('\n');
            }(localIpAddressesAndHostnames)) +
            '\n'
        );
    } else {
        logger.info(`\nheadless-integration-server is running at port ${portNumber}`);
    }

    if (!module.parent) {
        logger.info('\nPress CTRL+C to stop the server\n');
    }

    logger.verbose(`headless-integration-server is running for directory:\n    ${process.cwd()}\n`);
});
