import React, { Component } from 'react';


import Styles from './styles.scss';

import Task from '../Task';

class Scheduler extends Component {
    constructor () {
        super();
        this.addTask = this.addTask.bind(this);
        this.submitForm = this.submitForm.bind(this);
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

      if (enterText) {
          this.setState(({ tasks }) => ({
              tasks: [
                  {
                      text:    enterText,
                      checked: false,
                  },
                  ...tasks
              ],
              enterText: '',
          }));
      }
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
                          {tasks.map((task, idx) => <Task key = { idx } task = { task.text } />)}
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
