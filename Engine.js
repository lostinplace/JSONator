/// <reference path="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.1-vsdoc.js" />
function engine() {
    var parent;
    function ProcessObject(anObject, aParentDiv, aParent) {
        var objType = typeof (anObject),
                    tmpOutput = $('<div class="ValueDiv"/>');
        switch (objType) {
            case "string":
            case "number":
                if(typeof(aParent=="array"))
                var parentInput = aParentDiv.find('input[name="propName"]'),
                    tmpInput = $('<input/>').attr('name', parentInput.val() || aParent.indexOf(anObject));
                parentInput.live('change', function (e) {
                    tmpInput.attr('name', parentInput.val())
                });
                tmpInput.val(anObject);
            case "boolean":
                tmpInput.attr('type', 'checkbox');
                tmpInput.attr('checked', anObject === true);
                tmpInput.appendTo(tmpOutput)
                break;
            case "object":
                break;
            case "array":
                for (var i in anObject) {
                    tmpOutput.append(i);
                }
                break;
            default:
                break;
        }
        return tmpOutput;
    }
}
$(engine);