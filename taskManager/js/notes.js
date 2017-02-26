var Task = React.createClass({
    render: function() {
        return (
            <li className={"task" + " " +  this.props.stateTask}>
              <label>
                <input type = "checkbox" onClick = {this.props.onCompleted}/>
                {this.props.children}
              </label>
              <span className="delete-task" onClick={this.props.onDelete}> × </span>
            </li>
        );
    }
});

var FilterTasks = React.createClass({

    render: function() {
        var filter = this.props.filter;
        switch(filter) {
          case "all":
            var item1 = "active";
            break;
          case "new":
            var item2 = "active";
            break;
          case "completed":
            var item3 = "active";
            break;
        }
        return (
            <div className="filter">
                <span
                  className={"filterItem " + item1}
                  data-filter = "all"
                  onClick = {this.props.onTaskFilter}>
                  All
                </span>
                <span
                  className={"filterItem " + item2}
                  data-filter = "new"
                  onClick = {this.props.onTaskFilter}>
                  New
                </span>
                <span
                  className={"filterItem " + item3}
                  data-filter = "completed"
                  onClick = {this.props.onTaskFilter}>
                  Comleted
                </span>
            </div>
        );
    }
});

var TasksEditor = React.createClass({
    getInitialState: function() {
        return {
            text: '',
        };
    },

    handleTextChange: function(event) {
        this.setState({ text: event.target.value });
    },

    handleTaskAdd: function() {
        var newTask = {
            text: this.state.text,
            stateTask: 'new',
            id: Date.now()
        };

        this.props.onTaskAdd(newTask);
        this.setState({ text: '' });
    },

    render: function() {
        return (
            <div className="task-editor">
                <textarea
                    placeholder="Enter your task here..."
                    rows={3}
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <button className="add-button" onClick={this.handleTaskAdd}>Add</button>
            </div>
        );
    }
});

var TaskList = React.createClass({

    render: function() {
        var onTaskDelete = this.props.onTaskDelete;
        var tasks = this.props.tasks;
        var onTaskCompleted = this.props.onTaskCompleted;
        return (
            <ul className="tasks-grid">
                {
                    tasks.map(function(task){
                        return (
                            <Task
                                key={task.id}
                                stateTask = {task.stateTask}
                                onCompleted = {onTaskCompleted.bind(null, task)}
                                onDelete={onTaskDelete.bind(null, task)}>
                                {task.text}
                            </Task>
                        );
                    })
                }
            </ul>
        );
    }
});

var TasksApp = React.createClass({
    getInitialState: function() {
        return {
            tasks: [],
            filterTasks: [],
            isFilter: false,
            filter: "all"
        };
    },

    componentDidMount: function() {
        var localTasks = JSON.parse(localStorage.getItem('tasks'));
        if (localTasks) {
            this.setState({ tasks: localTasks });
        }
    },

    componentDidUpdate: function() {
        this._updateLocalStorage();
    },

    handleTaskCompleted: function(task) {
        var taskId = task.id;
        var newTasks = this.state.tasks.map(function(el) {
          if (el.id == taskId) {
            if (el.stateTask == "new") {
              el.stateTask = "completed";
            } else {
              el.stateTask = "new";
            }

          }
          return el;
        });
        this.setState({ tasks: newTasks }, function(){if (this.state.isFilter) {
            this.handleTaskFilter(this.state.filter);
        }});
    },

    handleTaskDelete: function(task) {
        var taskId = task.id;
        var newTasks = this.state.tasks.filter(function(task) {
            return task.id !== taskId;
        });
        this.setState({ tasks: newTasks }, function(){if (this.state.isFilter) {
            this.handleTaskFilter(this.state.filter);
        }});
    },

    handleTaskFilter: function(event) {
      if (event.target == undefined) {
        var filter = this.state.filter;
      } else {
        var filter = event.target.dataset.filter;
      }
      if (filter == 'new' || filter == 'completed') {
          var dispayedTasks = this.state.tasks.filter(function(el) {
            return filter == el.stateTask;
          });
          this.setState({isFilter: true});
      } else if (filter == 'all') {
        this.setState({isFilter: false});
      }
      this.setState({filterTasks: dispayedTasks, filter: filter});
    },

    handleTaskAdd: function(newTask) {
        var newTasks = this.state.tasks.slice();
        newTasks.unshift(newTask);
        this.setState({ tasks: newTasks }, function(){if (this.state.isFilter) {
            this.handleTaskFilter(this.state.filter);
        }});
    },

    render: function() {
        return (
            <div className="tasks-app">
                <h2 className="app-header">Task manager</h2>
                <TasksEditor onTaskAdd={this.handleTaskAdd} />
                <TaskList
                  tasks={this.state.isFilter ? this.state.filterTasks : this.state.tasks}
                  onTaskCompleted = {this.handleTaskCompleted}
                  onTaskDelete={this.handleTaskDelete}
                />
                <FilterTasks
                  tasks={this.state.tasks}
                  onTaskFilter = {this.handleTaskFilter}
                  filter = {this.state.filter}/>
            </div>
        );
    },

    _updateLocalStorage: function() {
        var tasks = JSON.stringify(this.state.tasks);
        localStorage.setItem('tasks', tasks);
    }
});

ReactDOM.render(
    <TasksApp />,
    document.getElementById('mount-point')
);
