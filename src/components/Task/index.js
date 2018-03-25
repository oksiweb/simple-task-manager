import React, { Component } from 'react';

import Checkbox from '../../theme/assets/Checkbox';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Delete from '../../theme/assets/Delete';

import Styles from './styles.scss';
import palette from '../../theme/palette.scss';

class Task extends Component {
    constructor () {
        super();
        this.deleteTask = this.deleteTask.bind(this);
        this.addPriority = this.addPriority.bind(this);
        this.makeCompleted = this.makeCompleted.bind(this);
    }

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

    render () {
        const { text, priority, completed } = this.props;

        return (
            <li className = { Styles.task }>
                <Checkbox
                    checked = { completed }
                    color1 = { palette.blue }
                    color2 = { palette.white }
                    onClick = { this.makeCompleted }
                />
                <span>{text}</span>
                <div>
                    <Star
                        checked = { priority }
                        color1 = { palette.blue }
                        color2 = { palette.blue }
                        onClick = { this.addPriority }
                    />
                    <Edit color1 = { palette.blue } color2 = { palette.blue } />
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
