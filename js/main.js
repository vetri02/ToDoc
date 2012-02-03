var toDo = {
    init: function() {

        this.taskval = null;
        this.textar = '<p class="charLeft">Maximum character limit is <span id="charsLeft">70</span></p><textarea name="taskAddition" id="task' + this.taskNo + '" class="textA" placeholder="Add Task Here..."></textarea>';

        this.width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        this.height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

        this.containerHeight = this.height - 190;

        $("#content").css('min-height', this.containerHeight);

        $("#done").click(function() {
            toDo.done();
        });
        $("#add").click(function() {
            toDo.addTask();
        });
        $("#back").click(function() {
            toDo.goBack()
            })
            $("#delete").click(function() {
            toDo.deleteTask();
        });
        $("#save").click(function() {
            toDo.setVal();
        });

        $("#content").delegate("ul.taskList li", "click", function() {
            if ($(this).find("input[type=checkbox]").prop("checked")) {
                $(this).find("input[type=checkbox]").prop("checked", false);
                $(this).removeClass('strike');
                toDo.check($(this).find("input[type=checkbox]"), false);
            } else {
                $(this).find("input[type=checkbox]").prop("checked", true);
                $(this).addClass('strike');
                toDo.check($(this).find("input[type=checkbox]"), true);
            }

        });

        this.showList();

    },
    showList: function() {
        $('#content').html('<div class="task">Task List</div><ul class="taskList"></ul>');
        var p = amplify.store();
        for (var key in p) {
            if (p.hasOwnProperty(key)) {
                this.taskNo = key;
                var pval = p[key];
                for (key in pval) {
                    if (pval.hasOwnProperty(key)) {
                        this.taskval = pval.val;
                        this.taskDone = pval.done;
                    }
                }
                if (pval.done === "true") {
                    this.taskLi = '<li class="strike"><input checked="true" type="checkbox" name="todo' + this.taskNo + '" value="' + this.taskNo + '" id="todo' + this.taskNo + '"><label for="todo' + this.taskNo + '">Check' + this.taskNo + '</label><span class="listInd">' + this.taskval + '</span></li>';

                } else {
                    this.taskLi = '<li><input type="checkbox" name="todo' + this.taskNo + '" value="' + this.taskNo + '" id="todo' + this.taskNo + '"><label for="todo' + this.taskNo + '">Check' + this.taskNo + '</label><span class="listInd">' + this.taskval + '</span></li>';
                }

                $('ul.taskList').append(this.taskLi);
            }
        }
    },
    goBack: function() {
        $('.main').show();
        $('.taskEditAdd').hide();

        this.showList();

    },
    addTask: function() {
        $('.taskEditAdd').show();
        $('.taskEditAdd .edit').hide();
        $('.main').hide();

        $('#content').html(this.textar);
        $('.textA').stop().limit('70');

    },
    deleteTask: function() {
        this.checkedLength = $("#content input:checked").length;
        $("#content input:checked").each(
                function() {
                var chVal = $(this).val();
                amplify.store(chVal, null)
            })
            this.goBack();
    },
    edit: function() {
        console.info("edit");
    },
    setVal: function() {
        var p = amplify.store();
        var arr = [];
        for (var key in p) {
            arr.push(parseInt(key));
        }
        this.maxKey = Math.max.apply(Math, arr);
        if (this.maxKey > 0) {
            this.taskNo = this.maxKey + 1;
            toDo.getVal();
        } else {
            this.taskNo = 1;
            toDo.getVal();
        }
        this.goBack();

    },
    getVal: function() {
        this.taskval = $("textarea").attr('value');
        if (this.taskval != '' && this.taskval != null) {
            amplify.store(this.taskNo, {
                val: this.taskval,
                done: "false"
            });

        }
    },
    check: function(item, strikeVal) {
        if (strikeVal) {
            amplify.store(item.prop('value'), {
                val: item.siblings("span.listInd").html(),
                done: "true"
            });
        } else {
            amplify.store(item.prop('value'), {
                val: item.siblings("span.listInd").html(),
                done: "false"
            });
        }

    }

};

$(document).ready(function() {
    toDo.init();
});