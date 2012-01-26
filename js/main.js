var toDo = {
	init:function(){
		
		this.taskNo = 1;
		this.taskval = null;
		this.textar = '<textarea name="taskAddition" id="task'+this.taskNo+'" placeholder="Add Task Here..."></textarea>';
		this.taskLi = '<li><input type="checkbox" name="todo'+this.taskNo+'" value="'+this.taskNo+'" id="todo'+this.taskNo+'"><label for="todo'+this.taskNo+'">Check'+this.taskNo+'</label>xzvzx</li>';
		
		$("#done").click(function(){toDo.done();});
		$("#add").click(function(){toDo.addTask();});
		$("#delete").click(function(){toDo.deleteTask();});
	},
	done:function(){
		console.log("done");
	},
	addTask:function(){
		console.log("add");
		$('.taskEditAdd').show();
		$('.taskEditAdd .edit').hide();
		$('.main').hide();
		
		$('#content').html(this.textar);
		$("#save").click(function() {
			toDo.setVal();
		});
		
	},
	deleteTask:function(){
		console.log("delete");
	},
	edit:function(){
		console.log("edit");
	},
	setVal:function(){
		this.taskval = $("textarea").attr('value');
		if(this.taskval != '' && this.taskval != null){
			//store.set('task', { no: this.taskNo, val: this.taskval })
			amplify.store('task'+this.taskNo+'', this.taskval);
			var p = amplify.store();
			//var arr = $.makeArray(p);
			for (var key in p) {
			  if (p.hasOwnProperty(key)) {
			    console.log(key + ":" + p[key]);
			  }
			}
		}		
	}
	
};

$(document).ready(function(){
	toDo.init();
});