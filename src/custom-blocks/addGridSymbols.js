'use strict';

module.exports = function (processor) {

    // This will allow to use this <!-- build:gridSymbol[:target] <value> --> syntax

    processor.registerBlockType('gridSymbol', function (content, block, blockLine, blockContent) {

        return content.replace(blockLine, block.asset);

    });
};