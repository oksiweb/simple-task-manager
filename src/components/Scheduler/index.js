import React, { Component } from 'react';

import Styles from './styles.scss';
import palette from '../../theme/palette.scss';

import Checkbox from '../../theme/assets/Checkbox';
import Task from '../Task';

class Scheduler extends Component {
    constructor () {
        super();
        this.addTask = this.addTask.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.addPriority = this.addPriority.bind(this);
        this.makeCompleted = this.makeCompleted.bind(this);
        this.makeAllCompleted = this.makeAllCompleted.bind(this);
    }

  state = {
      tasks:        [],
      enterText:    '',
      checked:      false,
      completedAll: false,
  };

  addTask (e) {
      e.preventDefault();
      const value = e.target.value;

      if (value.length < 47) {
          this.setState(() => ({
              enterText: value,
          }));
      }
  }

  submitForm (e) {
      e.preventDefault();

      const { enterText } = this.state;

      const newTask = {
          text:      enterText,
          priority:  false,
          completed: false,
      };

      if (enterText) {
          this.setState(({ tasks }) => ({
              tasks:     [newTask, ...tasks].sort((a, b) => b.priority - a.priority),
              enterText: '',
          }));
      }
  }

  deleteTask (text) {
      this.setState(({ tasks }) => ({
          tasks: tasks.filter((task) => task.text !== text),
      }));
  }

  addPriority (text, priority) {
      const todos = this.state.tasks
          .map((task) => {
              if (text === task.text && !task.completed) {
                  task.priority = !priority;

                  return task;
              }

              return task;
          })
          .sort((a, b) => b.priority - a.priority);

      this.setState(() => ({
          tasks: todos,
      }));
  }

  makeCompleted (text, completed) {
      const { tasks } = this.state;
      const todos = tasks
          .map((task) => {
              if (text === task.text) {
                  task.completed = !completed;

                  return task;
              }

              return task;
          })
          .sort((a, b) => a.completed - b.completed);

      this.setState(() => ({
          tasks: todos,
      }));
  }

  makeAllCompleted () {
      const { completedAll } = this.state;
      const todos = this.state.tasks.map((task) => {
          if (completedAll) {
              task.completed = false;
          } else {
              task.completed = true;
          }

          return task;
      });

      this.setState(() => ({
          tasks:        todos,
          completedAll: !completedAll,
      }));
  }

  render () {
      const { tasks, enterText, completedAll } = this.state;

      return (
          <div className = { Styles.scheduler }>
              <main>
                  <header>
                      <h1>Планировщик задач</h1>
                      <input type = 'text' />
                  </header>
                  <section>
                      <form onSubmit = { this.submitForm }>
                          <input type = 'text' value = { enterText } onChange = { this.addTask } />
                          <button disabled = { !enterText }>Добавить задачу</button>
                      </form>
                      <ul>
                          {tasks.map((task, idx) => (
                              <Task
                                  addPriority = { this.addPriority }
                                  completed = { task.completed }
                                  deleteTask = { this.deleteTask }
                                  key = { idx }
                                  makeCompleted = { this.makeCompleted }
                                  priority = { task.priority }
                                  text = { task.text }
                              />
                          ))}
                      </ul>
                  </section>
                  <footer>
                      <Checkbox
                          checked = { completedAll }
                          color1 = { palette.black }
                          color2 = { palette.white }
                          onClick = { this.makeAllCompleted }
                      />
                      <code>Все задачи выполнены</code>
                  </footer>
              </main>
          </div>
      );
  }
}

export default Scheduler;
