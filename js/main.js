var toDo = {
    init: function () {

        this.taskval = null;
        this.textar = '<p class="charLeft">You have <span id="charsLeft"></span> chars left.</p><textarea name="taskAddition" id="task' + this.taskNo + '" class="textA" placeholder="Add Task Here..."></textarea>';

        $("#done").click(function () {
            toDo.done();
        });
        $("#add").click(function () {
            toDo.addTask();
        });
        $("#back").click(function () {
            toDo.goBack()
        })
        $("#delete").click(function () {
            toDo.deleteTask();
        });
        $("#save").click(function () {
            toDo.setVal();
        });

        $("#content").delegate("ul.taskList li input[type=checkbox]", "click", function () {
            $(this).parent().toggleClass('strike');
        });

        $("#content").delegate("ul.taskList li span.listInd", "click", function () {
        	if($(this).siblings("input[type=checkbox]").prop("checked")){
            	$(this).siblings("input[type=checkbox]").prop("checked", false);
            	$(this).parent().removeClass('strike');
            }else{
            	$(this).siblings("input[type=checkbox]").prop("checked", true);
            	$(this).parent().addClass('strike');
            }
            
        });

        this.showList();

    },
    showList: function () {
        $('#content').html('<ul class="taskList"></ul>');
        var p = amplify.store();
        //var arr = $.makeArray(p);
        console.log(p);
        for (var key in p) {
            if (p.hasOwnProperty(key)) {
                this.taskNo = key;
                var pval = p[key];
                console.log(typeof(this.taskval));
                for (key in pval){
                	if (pval.hasOwnProperty(key)) {
                		console.log(pval.val);
                		console.log(pval.done);
                		this.taskval = pval.val;
                	}
                }
                this.taskLi = '<li><input type="checkbox" name="todo' + this.taskNo + '" value="' + this.taskNo + '" id="todo' + this.taskNo + '"><label for="todo' + this.taskNo + '">Check' + this.taskNo + '</label><span class="listInd">' + this.taskval + '</span></li>';
                $('ul.taskList').append(this.taskLi);
                //$('ul.taskList li input[type=checkbox]').click(function(){
                //$(this).parent().toggleClass('strike');
                //});
                //console.log(key + ":" + p[key]);
            }
        }
    },
    goBack: function () {
        console.info("back");
        $('.main').show();
        $('.taskEditAdd').hide();

        this.showList();


    },
    addTask: function () {
        console.info("add");
        $('.taskEditAdd').show();
        $('.taskEditAdd .edit').hide();
        $('.main').hide();

        $('#content').html(this.textar);
        $('.textA').limit('70', '#charsLeft');


    },
    deleteTask: function () {
        console.info("delete");
        this.checkedLength = $("#content input:checked").length;
        $("#content input:checked").each(

        function () {
            var chVal = $(this).val();
            amplify.store(chVal, null)
        })
        this.goBack();
    },
    edit: function () {
        console.info("edit");
    },
    setVal: function () {
        console.info("setVal");
        var p = amplify.store();
        var arr = [];
        console.log(p);
        for (var key in p) {
            arr.push(parseInt(key));
        }
        this.maxKey = Math.max.apply(Math, arr);
        if (this.maxKey > 0) {
            //console.info(this.taskNo+'if');
            this.taskNo = this.maxKey + 1;
            console.info(this.taskNo + 'ifafter');
            toDo.getVal();
        } else {
            console.info(this.taskNo + 'else');
            this.taskNo = 1;
            toDo.getVal();
        }
        this.goBack();

    },
    getVal: function () {
        this.taskval = $("textarea").attr('value');
        if (this.taskval != '' && this.taskval != null) {
            //amplify.store(this.taskNo, this.taskval);

            amplify.store( this.taskNo, { 
  				val: this.taskval, done: "false" 
			});

        }
    },
    check: function () {

    }

};

$(document).ready(function () {
    toDo.init();
});