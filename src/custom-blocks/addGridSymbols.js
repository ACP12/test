'use strict';

module.exports = function (processor) {

    // This will allow to use this <!-- build:gridSymbol[:target] <value> --> syntax

    processor.registerBlockType('gridSymbol', function (content, block, blockLine, blockContent) {

        var eems = '_' + block.asset + '__';
        var result = content.replace(blockLine, eems);

        return result;
    });
};