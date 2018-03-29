import React, { Component } from 'react';

import Checkbox from '../../theme/assets/Checkbox';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Delete from '../../theme/assets/Delete';

import Styles from './styles.scss';
import palette from '../../theme/palette.scss';

class Task extends Component {
    constructor (props) {
        super(props);
        this.deleteTask = this.deleteTask.bind(this);
        this.addPriority = this.addPriority.bind(this);
        this.makeCompleted = this.makeCompleted.bind(this);
        this.makeInputEditable = this.makeInputEditable.bind(this);
        this.changeMessage = this.changeMessage.bind(this);
        this.handleEnterKey = this.handleEnterKey.bind(this);
    }

  state = {
      isEditing: false,
      text:      this.props.text,
  };

  deleteTask () {
      const { deleteTask, text } = this.props;

      deleteTask(text);
  }

  addPriority () {
      const { addPriority, text, priority } = this.props;

      addPriority(text, priority);
  }

  makeCompleted () {
      const { makeCompleted, text, completed } = this.props;

      makeCompleted(text, completed);
  }

  makeInputEditable () {
      const { completed } = this.props;

      if (!completed) {
          this.setState(() => ({
              isEditing: true,
          }));
      }
  }

  changeMessage (e) {
      this.setState({
          text: e.target.value,
      });
  }

  handleEnterKey (e) {
      if (e.key === 'Enter') {
          const { isEditing, text } = this.state;
          const { id } = this.props;

          this.setState({
              isEditing: !isEditing,
          });
          if (isEditing === true) {
              const { makeTaskEditable } = this.props;

              makeTaskEditable(text, id);
          }
      }
  }

  render () {
      const { text, priority, completed } = this.props;
      const { isEditing } = this.state;

      return (
          <li className = { Styles.task }>
              <div>
                  <Checkbox
                      checked = { completed }
                      color1 = { palette.blue }
                      color2 = { palette.white }
                      onClick = { this.makeCompleted }
                  />

                  {isEditing ? (
                      <input
                          autoFocus
                          disabled = { !isEditing }
                          type = 'text'
                          value = { this.state.text }
                          onChange = { this.changeMessage }
                          onKeyPress = { this.handleEnterKey }
                      />
                  ) : (
                      <span>{text}</span>
                  )}
              </div>
              <div>
                  <Star
                      checked = { priority }
                      color1 = { palette.blue }
                      color2 = { palette.blue }
                      onClick = { this.addPriority }
                  />
                  <Edit
                      color1 = { palette.blue }
                      color2 = { palette.blue }
                      onClick = { this.makeInputEditable }
                  />
                  <Delete
                      color1 = { palette.blue }
                      color2 = { palette.blue }
                      onClick = { this.deleteTask }
                  />
              </div>
          </li>
      );
  }
}

export default Task;
