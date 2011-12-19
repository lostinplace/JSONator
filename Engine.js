/// <reference path="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.1-vsdoc.js" />
var ObjectFromJSON;
function engine() {
    $.extend({
        keys: function (obj) {
            var a = [];
            $.each(obj, function (k) { a.push(k) });
            return a;
        }
    })
    function FindKeys(anObject, aValue) {
        var keyArr = Object.keys(anObject),
            resultArr=[];
        for (var i = 0; i < keyArr.length; i++) {
            if (anObject[keyArr[i]] === aValue) resultArr.push(keyArr[i]);
        }
        return 'undefined';
    }

    function ParseJSON(anObject) {
        try {
            switch (typeof (anObject)) {
                case "string":
                    anObject = JSON.parse(anObject);
                default:
                    return ($('<div/>').append(ProcessObject(anObject, 0)));
                    break;
            }
        } catch (e) {
            return 'invalid json';
        }
    }
    function ProcessObject(anObject, anIndex) {
        var objType = typeof (anObject),
            tmpOutput = $('<div class="Value"/>'),
            tmpInput = $('<input/>').attr({
                'value': JSON.stringify(anObject),
                'name': anIndex
            });
        switch (objType) {
            case "string":
                tmpInput.attr('type', 'text');
                break;
            case "boolean":
                tmpInput.attr('type', 'checkbox');
                tmpInput.attr('checked', anObject === true);
                break;
            case "number":
                tmpInput.attr('type', 'number');
                break;
            case "object":
                tmpInput.attr('type', 'hidden');
                if ($.isArray(anObject)) {
                    var contentDiv = $('<ol class="ArrayContents" />');
                    for (var i = 0; i < anObject.length; i++) {
                        $('<li/>').append(ProcessObject(anObject[i], i)).appendTo(contentDiv);
                    }
                    contentDiv.appendTo(tmpOutput);
                    objType = 'array';
                } else if (anObject != null) {
                    var propertyList = $('<ul class="ObjectProperties"/>');
                    var tmpArr = $.keys(anObject);
                    for (var i = 0; i < tmpArr.length; i++) {
                        var tmpDiv = $('<div class="ObjectProperty"/>');
                        $('<label/>').append($('<span/>').text(tmpArr[i]))
                            .append(':')
                            .append(
                                $('<input type="hidden"/>').attr({
                                    'name': i,
                                    'value': tmpArr[i]
                                })
                            ).appendTo(tmpDiv);
                        ProcessObject(anObject[tmpArr[i]], tmpArr[i]).appendTo(tmpDiv);
                        tmpDiv.appendTo(tmpOutput);
                    }
                    propertyList.appendTo(tmpOutput);
                } else {
                    tmpInput.attr('type', 'text');
                }
                break;
            default:
                break;
        }
        tmpInput.appendTo(tmpOutput)
        return tmpOutput.addClass(objType);
    }
    ObjectFromJSON = ParseJSON;
}
$(engine);