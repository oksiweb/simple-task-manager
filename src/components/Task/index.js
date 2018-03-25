import React, { Component } from 'react';

import Checkbox from '../../theme/assets/Checkbox';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Delete from '../../theme/assets/Delete';

import Styles from './styles.scss';
import palette from '../../theme/palette.scss';

class Task extends Component {
    render () {
        const { task } = this.props;

        return (
            <li className = { Styles.task }>
                <Checkbox color1 = { palette.blue } color2 = { palette.white } />
                <span>{task}</span>
                <div>
                    <Star color1 = { palette.blue } color2 = { palette.blue } />
                    <Edit color1 = { palette.blue } color2 = { palette.blue } />
                    <Delete color1 = { palette.blue } color2 = { palette.blue } />
                </div>
            </li>
        );
    }
}

export default Task;
