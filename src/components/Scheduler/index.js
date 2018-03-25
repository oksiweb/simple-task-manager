import React, { Component } from 'react';

import Styles from './styles.scss';

import Task from '../Task';

class Scheduler extends Component {
    constructor () {
        super();
        this.addTask = this.addTask.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.addPriority = this.addPriority.bind(this);
    }

  state = {
      tasks:            [],
      enterText:        '',
      checked:          false,
      priorityTasks:    [],
      unimportantTasks: [],
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
          text:     enterText,
          priority: false,
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
              if (text === task.text) {
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

  render () {
      const { tasks, enterText } = this.state;

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
                                  deleteTask = { this.deleteTask }
                                  key = { idx }
                                  priority = { task.priority }
                                  text = { task.text }
                              />
                          ))}
                      </ul>
                  </section>
                  <footer>
                      <span />
                      <code />
                  </footer>
              </main>
          </div>
      );
  }
}

export default Scheduler;
